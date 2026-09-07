"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/navigation/global-header";
import { Building2, Users, ShieldCheck } from "lucide-react";

export default function CampusPortalPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    name: "Campus Coordinator",
    meta: "Placement Cell",
    email: "admin@campus.edu",
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("skill_bridge_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.fullName || parsed.email) {
            setUser({
              name: parsed.fullName || "Campus Coordinator",
              meta: parsed.role ? parsed.role.toUpperCase() : "Campus",
              email: parsed.email || "admin@campus.edu",
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
        portal="campus"
        breadcrumb={{
          section: "Institutional",
          title: "Campus Placement Cell",
        }}
        user={user}
        onLogout={handleLogout}
        notificationsCount={2}
        notificationItems={[
          {
            id: "notif-c-1",
            title: "Campus Verified",
            message: "Institutional placement drive registry connected to Skill Bridge network.",
          },
          {
            id: "notif-c-2",
            title: "Student Cohort",
            message: "All verified department cohorts mapped to standard competency benchmarks.",
          },
        ]}
      />

      <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto space-y-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Campus Placement & Institutional Analytics
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage institutional campus drives, department competency telemetry, and student placement pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-lg border border-border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Active Campus Drives
              </span>
              <Building2 className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold font-mono">14</p>
            <p className="text-xs text-muted-foreground">
              Verified corporate partners scheduled for on-campus interviews.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Enrolled Students
              </span>
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold font-mono">1,248</p>
            <p className="text-xs text-muted-foreground">
              Students actively completing skills assessments and resume reviews.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Accreditation Status
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-emerald-500">Verified</p>
            <p className="text-xs text-muted-foreground">
              AICTE / NAAC benchmark alignment metrics active and updated.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
