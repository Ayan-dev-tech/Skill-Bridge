"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/navigation/global-header";
import { Briefcase, CheckCircle, Search } from "lucide-react";

export default function IndustryPortalPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    name: "Corporate Talent Lead",
    meta: "Partner Portal",
    email: "recruiter@company.com",
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("skill_bridge_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.fullName || parsed.email) {
            setUser({
              name: parsed.fullName || "Corporate Talent Lead",
              meta: parsed.role ? parsed.role.toUpperCase() : "Industry",
              email: parsed.email || "recruiter@company.com",
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
        portal="industry"
        breadcrumb={{
          section: "Corporate",
          title: "Talent Discovery",
        }}
        user={user}
        onLogout={handleLogout}
        notificationsCount={2}
        notificationItems={[
          {
            id: "notif-ind-1",
            title: "Candidate Matches",
            message: "18 candidates matched your Cloud Solutions Engineer requirement.",
          },
          {
            id: "notif-ind-2",
            title: "Partner Verification",
            message: "Corporate recruiter credentials active and verified.",
          },
        ]}
      />

      <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto space-y-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Industry Partner & Talent Discovery
          </h1>
          <p className="text-xs text-muted-foreground">
            Connect with certified student talent, post verified opportunities, and review competency benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-lg border border-border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Active Job Postings
              </span>
              <Briefcase className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold font-mono">8</p>
            <p className="text-xs text-muted-foreground">
              Open roles posted across engineering and product disciplines.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Candidate Applications
              </span>
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold font-mono">94</p>
            <p className="text-xs text-muted-foreground">
              Verified applications with demonstrated competency scores.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Partner Status
              </span>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-emerald-500">Verified</p>
            <p className="text-xs text-muted-foreground">
              Direct recruitment and campus drive rights authorized by Skill Bridge Admin.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
