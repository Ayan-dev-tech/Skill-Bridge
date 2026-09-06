"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { StudentSidebar } from "@/components/student/student-sidebar";
import { StudentHeader } from "@/components/student/student-header";
import { WorkflowProgress } from "@/components/student/workflow-progress";
import { StudentProfileData, defaultStudentProfile } from "@/lib/student-data";
import { StudentFooter } from "@/components/student/student-footer";
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

        setIsAuthorized(true);
      }
    } catch (err) {
      console.error("Workflow access check error:", err);
    }
  }, [pathname, router]);

  React.useEffect(() => {
    checkWorkflowAccess();
  }, [checkWorkflowAccess]);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Persistent Desktop Sidebar & Mobile Drawer */}
      <StudentSidebar
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
        profile={profile}
        workflow={workflow}
      />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Compact Authenticated Header */}
        <StudentHeader
          onOpenMobile={() => setMobileNavOpen(true)}
          profile={profile}
        />

        {/* Workflow Progression & Active Page Content */}
        <main className="flex-1 p-4 md:p-6 max-w-6xl w-full mx-auto space-y-6">
          {/* Visual Sequential Workflow Progression */}
          <WorkflowProgress workflow={workflow} />

          {/* Child Page Content or Redirecting Guard */}
          <div className="min-h-[calc(100vh-22rem)] animate-in fade-in duration-200 motion-reduce:animate-none">
            {!isAuthorized ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] space-y-3">
                <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                <p className="text-xs text-muted-foreground font-mono">
                  Verifying workflow authorization...
                </p>
              </div>
            ) : (
              children
            )}
          </div>
        </main>

        {/* Professional Application Footer */}
        <StudentFooter />
      </div>
    </div>
  );
}
