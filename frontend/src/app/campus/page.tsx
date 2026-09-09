"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlobalHeader } from "@/components/navigation/global-header";
import { CampusSidebar } from "@/components/campus/campus-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CampusDashboardView } from "@/components/campus/views/campus-dashboard-view";
import { CampusStudentsView } from "@/components/campus/views/campus-students-view";
import { CampusFacultyView } from "@/components/campus/views/campus-faculty-view";
import { CampusIndustryView } from "@/components/campus/views/campus-industry-view";
import { CampusApplicationsView } from "@/components/campus/views/campus-applications-view";
import { CampusReportsView } from "@/components/campus/views/campus-reports-view";
import type { CampusViewType } from "@/lib/campus/types";

function CampusPortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Navigation State
  const initialView = (searchParams.get("view") as CampusViewType) || "dashboard";
  const [currentView, setCurrentView] = React.useState<CampusViewType>(initialView);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  // User State
  const [user, setUser] = React.useState({
    name: "Campus Placement Director",
    meta: "Institutional Lead",
    email: "placement@campus.edu",
  });

  const [studentCount, setStudentCount] = React.useState<number>(0);

  // Authorization State
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

  // Load user session & enforce role authorization
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      let sessionUser: { id?: string; role?: string; fullName?: string; email?: string; isAdmin?: boolean } | null = null;
      const stored = sessionStorage.getItem("skill_bridge_user");
      if (stored) {
        try {
          sessionUser = JSON.parse(stored);
        } catch {
          // ignore
        }
      }

      const isAdminSession =
        sessionStorage.getItem("skill_bridge_admin") === "true" ||
        document.cookie.includes("sb_admin=true");

      // Not authenticated -> redirect to login
      if (!sessionUser && !isAdminSession) {
        setIsAuthorized(false);
        setIsCheckingAuth(false);
        router.replace("/");
        return;
      }

      const role = sessionUser?.role;
      const isAdmin = Boolean(sessionUser?.isAdmin || isAdminSession);

      // Check role authorization: only campus accounts and admins are permitted
      if (role === "campus" || isAdmin) {
        setIsAuthorized(true);
        setIsCheckingAuth(false);

        if (sessionUser) {
          setUser({
            name: sessionUser.fullName || (isAdmin ? "Administrator" : "Campus Placement Director"),
            meta: isAdmin ? "ADMINISTRATOR" : (sessionUser.role ? sessionUser.role.toUpperCase() : "Institutional Lead"),
            email: sessionUser.email || (isAdmin ? "admin@gmail.com" : "placement@campus.edu"),
          });
        }

        // Fetch dashboard to get student count for sidebar badge
        const headers: Record<string, string> = {};
        if (sessionUser?.id) headers["x-campus-id"] = sessionUser.id;

        fetch("/api/campus", { headers })
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.metrics?.totalStudents !== undefined) {
              setStudentCount(data.metrics.totalStudents);
            }
          })
          .catch(() => {});
      } else {
        // Non-campus roles: block and redirect to their respective portals
        setIsAuthorized(false);
        setIsCheckingAuth(false);

        if (role === "student") {
          router.replace("/student/dashboard");
        } else if (role === "industry") {
          router.replace("/industry");
        } else if (role === "faculty") {
          router.replace("/faculty");
        } else {
          router.replace("/");
        }
      }
    }
  }, [router]);

  // Update view from searchParams if user navigates back/forward
  React.useEffect(() => {
    const v = searchParams.get("view") as CampusViewType;
    if (
      v &&
      [
        "dashboard",
        "students",
        "faculty",
        "industry",
        "applications",
        "reports",
      ].includes(v)
    ) {
      setCurrentView(v);
    }
  }, [searchParams]);

  const handleSelectView = (view: CampusViewType) => {
    setCurrentView(view);
    const url = new URL(window.location.href);
    url.searchParams.set("view", view);
    window.history.pushState({}, "", url.toString());
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("skill_bridge_user");
      sessionStorage.removeItem("skill_bridge_admin");
    }
    router.push("/");
  };

  const getBreadcrumbTitle = () => {
    switch (currentView) {
      case "dashboard":
        return "Operational Dashboard";
      case "students":
        return "Student Management & Talent";
      case "faculty":
        return "Faculty & Academic Mentors";
      case "industry":
        return "Industry Drives & Hiring Requirements";
      case "applications":
        return "Placement Pipeline & Applications";
      case "reports":
        return "Placement Analytics & Reports";
      default:
        return "Campus Portal";
    }
  };

  if (isCheckingAuth || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-xs">
        Verifying Campus Authorization...
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="h-screen flex flex-col w-full bg-background text-foreground select-none overflow-hidden">
        {/* Global Header */}
        <GlobalHeader
          portal="campus"
          breadcrumb={{
            section: "Institutional",
            title: getBreadcrumbTitle(),
          }}
          user={user}
          onLogout={handleLogout}
          notificationsCount={2}
          notificationItems={[
            {
              id: "notif-c-1",
              title: "Authorized Campus Node",
              message: "Direct campus recruitment and student tracking verified.",
              time: "Active",
            },
            {
              id: "notif-c-2",
              title: "Placement Intelligence",
              message: "Departmental metrics updated with live candidate funnel.",
              time: "Active",
            },
          ]}
        />

        <div className="flex-1 flex w-full min-h-0 overflow-hidden">
          {/* Sidebar */}
          <CampusSidebar
            currentView={currentView}
            onSelectView={handleSelectView}
            studentCount={studentCount}
          />

          {/* Main Content Area with Clean ScrollArea */}
          <SidebarInset className="flex-1 min-w-0 h-full p-0 border-0 overflow-hidden">
            <ScrollArea className="size-full">
              <div className="p-4 md:p-8 min-w-0 max-w-7xl mx-auto space-y-6">
                {currentView === "dashboard" && (
                  <CampusDashboardView onNavigate={handleSelectView} />
                )}

                {currentView === "students" && <CampusStudentsView />}

                {currentView === "faculty" && <CampusFacultyView />}

                {currentView === "industry" && <CampusIndustryView />}

                {currentView === "applications" && <CampusApplicationsView />}

                {currentView === "reports" && <CampusReportsView />}
              </div>
            </ScrollArea>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function CampusPortalPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-xs">
          Loading Campus Portal...
        </div>
      }
    >
      <CampusPortalContent />
    </React.Suspense>
  );
}

