"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { StudentSidebar } from "@/components/student/student-sidebar";
import { StudentHeader } from "@/components/student/student-header";
import { WorkflowProgress } from "@/components/student/workflow-progress";
import { StudentProfileData, defaultStudentProfile } from "@/lib/student-data";

import { StudentFooter } from "@/components/student/student-footer";

export default function StudentRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [profile, setProfile] = React.useState<StudentProfileData>(defaultStudentProfile);
  const [isClientReady, setIsClientReady] = React.useState(false);

  React.useEffect(() => {
    setIsClientReady(true);

    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("skill_bridge_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.fullName) {
            setProfile((prev) => ({
              ...prev,
              id: parsed.id || prev.id,
              fullName: parsed.fullName,
              email: parsed.email || prev.email,
            }));
          }
        } catch {
          // Keep default profile
        }
      }
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Persistent Desktop Sidebar & Mobile Drawer */}
      <StudentSidebar
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
        profile={profile}
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
          {/* Visual 7-Step Workflow Progression */}
          <WorkflowProgress />

          {/* Child Page Content with Tasteful Subtle Entry Motion */}
          <div className="min-h-[calc(100vh-22rem)] animate-in fade-in duration-200 motion-reduce:animate-none">
            {children}
          </div>
        </main>

        {/* Professional Application Footer */}
        <StudentFooter />
      </div>
    </div>
  );
}
