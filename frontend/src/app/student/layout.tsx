"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { StudentSidebar } from "@/components/student/student-sidebar";
import { StudentHeader } from "@/components/student/student-header";
import { WorkflowProgress } from "@/components/student/workflow-progress";
import { StudentProfileData, defaultStudentProfile } from "@/lib/student-data";
import { StudentFooter } from "@/components/student/student-footer";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CanonicalWorkflowState } from "@/lib/workflow/canonical-workflow";

export default function StudentRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [profile, setProfile] = React.useState<StudentProfileData>(defaultStudentProfile);
  const [workflow, setWorkflow] = React.useState<CanonicalWorkflowState | null>(null);
  const [isAuthorized, setIsAuthorized] = React.useState(true);

  const checkWorkflowAccess = React.useCallback(async () => {
    try {
      let sid = "";
      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("skill_bridge_user");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.id) {
              sid = parsed.id;
              if (parsed.fullName) {
                setProfile((prev) => ({
                  ...prev,
                  id: parsed.id,
                  fullName: parsed.fullName,
                  email: parsed.email || prev.email,
                }));
              }
            }
          } catch {
            // keep default
          }
        }
        if (!sid) {
          const match = document.cookie.match(/sb_student_id=([^;]+)/);
          if (match && match[1]) {
            sid = decodeURIComponent(match[1].trim());
          }
        }
      }

      if (!sid) {
        // Not authenticated
        setIsAuthorized(false);
        router.replace("/");
        return;
      }

      const res = await fetch(
        `/api/student/workflow/status?checkPath=${encodeURIComponent(pathname)}`,
        {
          headers: { "x-student-id": sid },
        }
      );
      const data = await res.json();

      if (data.success) {
        setWorkflow(data.workflow);

        if (data.routeCheck && !data.routeCheck.allowed && data.routeCheck.redirectUrl) {
          setIsAuthorized(false);
          router.replace(data.routeCheck.redirectUrl);
          return;
        }

        if (data.passportPhotoUrl) {
          setProfile((prev) => ({
            ...prev,
            photoUrl: data.passportPhotoUrl,
          }));
        }

        setIsAuthorized(true);
      }
    } catch (err) {
      console.error("Workflow access check error:", err);
    }
  }, [pathname, router]);

  React.useEffect(() => {
    checkWorkflowAccess();
  }, [checkWorkflowAccess]);

  const isDocVerification = pathname.startsWith("/student/document-verification");

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
        {/* Persistent Desktop Sidebar & Mobile Drawer */}
        <StudentSidebar
          profile={profile}
          workflow={workflow}
        />

        {/* Main Workspace Column */}
        <SidebarInset className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Header */}
          <StudentHeader
            profile={profile}
          />

          {/* Clean ScrollArea for Main Content and Footer */}
          <ScrollArea className="flex-1 w-full min-h-0">
            {/* Workflow Progression & Active Page Content */}
            <main
              className={`w-full mx-auto ${
                isDocVerification
                  ? "p-4 md:p-6 max-w-5xl space-y-6"
                  : "p-4 md:p-6 max-w-6xl space-y-6"
              }`}
            >
              {/* Visual Sequential Workflow Progression (omitted on document submission to avoid duplicate journey stepper) */}
              {!isDocVerification && <WorkflowProgress workflow={workflow} />}

              {/* Child Page Content or Redirecting Guard */}
              <div className="min-h-[calc(100vh-22rem)] animate-in fade-in duration-200 motion-reduce:animate-none">
                {!isAuthorized ? (
                  <div className="space-y-4 py-6 animate-pulse">
                    <Skeleton className="h-8 w-56 rounded-lg" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Skeleton className="h-28 rounded-xl" />
                      <Skeleton className="h-28 rounded-xl" />
                      <Skeleton className="h-28 rounded-xl" />
                    </div>
                    <Skeleton className="h-64 w-full rounded-xl" />
                  </div>
                ) : (
                  children
                )}
              </div>
            </main>

            {/* Professional Application Footer */}
            <StudentFooter />
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
