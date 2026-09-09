"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlobalHeader } from "@/components/navigation/global-header";
import { FacultySidebar } from "@/components/faculty/faculty-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FacultyDashboardView } from "@/components/faculty/views/faculty-dashboard-view";
import { FacultyStudentsView } from "@/components/faculty/views/faculty-students-view";
import { FacultyProgressView } from "@/components/faculty/views/faculty-progress-view";
import { FacultySkillGapsView } from "@/components/faculty/views/faculty-skill-gaps-view";
import { FacultyLearningView } from "@/components/faculty/views/faculty-learning-view";
import { FacultyApplicationsView } from "@/components/faculty/views/faculty-applications-view";
import { FacultyReportsView } from "@/components/faculty/views/faculty-reports-view";
import { FacultyProfileView } from "@/components/faculty/views/faculty-profile-view";
import { FacultySettingsView } from "@/components/faculty/views/faculty-settings-view";
import type { FacultyViewType } from "@/lib/faculty/types";

function FacultyPortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Navigation state
  const initialView = (searchParams.get("view") as FacultyViewType) || "dashboard";
  const [currentView, setCurrentView] = React.useState<FacultyViewType>(initialView);
  const [selectedStudentId, setSelectedStudentId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const v = searchParams.get("view") as FacultyViewType;
    if (v) setCurrentView(v);
  }, [searchParams]);

  // User & Stats
  const [user, setUser] = React.useState({
    name: "Professor Jordan Lee",
    meta: "Computer Science",
    email: "faculty@institution.edu",
  });
  const [studentCount, setStudentCount] = React.useState<number>(0);
  const [attentionCount, setAttentionCount] = React.useState<number>(0);

  // Authorization State
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

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

      if (!sessionUser && !isAdminSession) {
        setIsAuthorized(false);
        setIsCheckingAuth(false);
        router.replace("/");
        return;
      }

      const role = sessionUser?.role;
      const isAdmin = Boolean(sessionUser?.isAdmin || isAdminSession);

      // Only faculty accounts and admins have access
      if (role === "faculty" || isAdmin) {
        setIsAuthorized(true);
        setIsCheckingAuth(false);

        if (sessionUser) {
          setUser({
            name: sessionUser.fullName || (isAdmin ? "Administrator" : "Professor Jordan Lee"),
            meta: isAdmin ? "ADMINISTRATOR" : (sessionUser.role ? sessionUser.role.toUpperCase() : "Faculty Mentor"),
            email: sessionUser.email || (isAdmin ? "admin@gmail.com" : "faculty@institution.edu"),
          });
        }

        // Fetch dashboard to populate student count and attention badges
        const headers: Record<string, string> = {};
        if (sessionUser?.id) headers["x-faculty-id"] = sessionUser.id;

        fetch("/api/faculty", { headers })
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.data?.metrics) {
              setStudentCount(data.data.metrics.assignedStudents || 0);
              setAttentionCount(data.data.metrics.studentsNeedingAttention || 0);
            }
          })
          .catch(() => {});
      } else {
        // Non-faculty roles redirected to their portals
        setIsAuthorized(false);
        setIsCheckingAuth(false);

        if (role === "student") {
          router.replace("/student/dashboard");
        } else if (role === "industry") {
          router.replace("/industry");
        } else if (role === "campus") {
          router.replace("/campus");
        } else {
          router.replace("/");
        }
      }
    }
  }, [router]);

  const handleSelectView = (view: FacultyViewType) => {
    setCurrentView(view);
    setSelectedStudentId(null);
    const params = new URLSearchParams(window.location.search);
    params.set("view", view);
    router.replace(`/faculty?${params.toString()}`, { scroll: false });
  };

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    setCurrentView("students");
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("skill_bridge_user");
      sessionStorage.removeItem("skill_bridge_admin");
      document.cookie = "sb_faculty_id=; path=/; max-age=0";
      document.cookie = "sb_admin=; path=/; max-age=0";
    }
    router.push("/");
  };

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-muted-foreground text-xs select-none">
        Validating Academic Credentials...
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  const breadcrumbMap: Record<FacultyViewType, { section: string; title: string }> = {
    dashboard: { section: "Academic", title: "Faculty Mentorship Dashboard" },
    students: { section: "Students", title: "My Assigned Scholars" },
    progress: { section: "Students", title: "Student Progress Journey" },
    "skill-gaps": { section: "Development", title: "Cohort Skill Gap Diagnostics" },
    learning: { section: "Development", title: "Curriculum Mentoring & Learning" },
    applications: { section: "Opportunities", title: "Career Applications Monitoring" },
    placement: { section: "Opportunities", title: "Placement Progression Funnel" },
    reports: { section: "Insights", title: "Cohort Academic Reports" },
    profile: { section: "Account", title: "Faculty Profile" },
    settings: { section: "Account", title: "Mentorship Settings" },
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="h-screen w-screen flex flex-col bg-background text-foreground select-none overflow-hidden">
        {/* Global Navigation Header */}
        <GlobalHeader
          portal="faculty"
          breadcrumb={breadcrumbMap[currentView] || { section: "Academic", title: "Faculty Portal" }}
          user={user}
          onLogout={handleLogout}
          notificationsCount={attentionCount > 0 ? 1 : 0}
          notificationItems={[
            ...(attentionCount > 0
              ? [
                  {
                    id: "notif-fac-attention",
                    title: "Scholars Needing Attention",
                    message: `${attentionCount} scholars flagged with critical skill gaps or test score alerts.`,
                    time: "Active",
                  },
                ]
              : []),
            {
              id: "notif-fac-cohort",
              title: "Curriculum Alignment",
              message: "Computer Science curriculum synchronized with active industry skill benchmarks.",
              time: "Ready",
            },
          ]}
        />

        <div className="flex-1 flex w-full min-h-0 overflow-hidden">
          {/* Faculty Sidebar */}
          <FacultySidebar
            currentView={currentView}
            onSelectView={handleSelectView}
            studentCount={studentCount}
            attentionCount={attentionCount}
          />

          {/* Main Content Area with Clean ScrollArea */}
          <SidebarInset className="flex-1 min-w-0 h-full p-0 border-0 overflow-hidden">
            <ScrollArea className="size-full">
              <div className="p-4 md:p-8 min-w-0 max-w-7xl mx-auto space-y-6">
                {currentView === "dashboard" && (
                  <FacultyDashboardView
                    onNavigate={handleSelectView}
                    onSelectStudent={handleSelectStudent}
                  />
                )}

                {currentView === "students" && (
                  <FacultyStudentsView initialSelectedStudentId={selectedStudentId} />
                )}

                {currentView === "progress" && (
                  <FacultyProgressView onSelectStudent={handleSelectStudent} />
                )}

                {currentView === "skill-gaps" && <FacultySkillGapsView />}

                {currentView === "learning" && <FacultyLearningView />}

                {currentView === "applications" && <FacultyApplicationsView />}

                {currentView === "placement" && <FacultyApplicationsView />}

                {currentView === "reports" && <FacultyReportsView />}

                {currentView === "profile" && <FacultyProfileView />}

                {currentView === "settings" && <FacultySettingsView />}
              </div>
            </ScrollArea>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function FacultyPortalPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-xs">
          Loading Faculty Portal...
        </div>
      }
    >
      <FacultyPortalContent />
    </React.Suspense>
  );
}
