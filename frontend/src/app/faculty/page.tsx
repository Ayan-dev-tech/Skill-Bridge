"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/navigation/global-header";
import { BookOpen, GraduationCap, Award } from "lucide-react";

export default function FacultyPortalPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    name: "Dr. Faculty Mentor",
    meta: "Computer Science",
    email: "faculty@institution.edu",
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("skill_bridge_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.fullName || parsed.email) {
            setUser({
              name: parsed.fullName || "Dr. Faculty Mentor",
              meta: parsed.role ? parsed.role.toUpperCase() : "Faculty",
              email: parsed.email || "faculty@institution.edu",
            });
          }
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("skill_bridge_user");
      sessionStorage.removeItem("skill_bridge_admin");
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground select-none">
      <GlobalHeader
        portal="faculty"
        breadcrumb={{
          section: "Academic",
          title: "Curriculum & Mentorship",
        }}
        user={user}
        onLogout={handleLogout}
        notificationsCount={1}
        notificationItems={[
          {
            id: "notif-f-1",
            title: "Course Alignment",
            message: "Curriculum mapping updated for Sem 6 Advanced Software Engineering.",
          },
        ]}
      />

      <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto space-y-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Faculty Mentorship & Curriculum Governance
          </h1>
          <p className="text-xs text-muted-foreground">
            Monitor student cohort mastery, evaluate learning outcomes, and review industry benchmark curricula.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-lg border border-border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Assigned Cohorts
              </span>
              <GraduationCap className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold font-mono">6</p>
            <p className="text-xs text-muted-foreground">
              Undergraduate sections enrolled in active skill mastery tracks.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Curriculum Modules
              </span>
              <BookOpen className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold font-mono">28</p>
            <p className="text-xs text-muted-foreground">
              Courses aligned with verified industry tech stacks and practical labs.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Student Certifications
              </span>
              <Award className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold font-mono">412</p>
            <p className="text-xs text-muted-foreground">
              Verified competency certificates awarded to students this semester.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
