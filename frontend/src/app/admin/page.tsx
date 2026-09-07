"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminSidebar, AdminViewType } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

// Views
import { OverviewView } from "@/components/admin/views/overview-view";
import { StudentsView } from "@/components/admin/views/students-view";
import { FacultyView } from "@/components/admin/views/faculty-view";
import { IndustryView } from "@/components/admin/views/industry-view";
import { SkillLibraryView } from "@/components/admin/views/skill-library-view";
import { SkillGapsView } from "@/components/admin/views/skill-gaps-view";
import { OpportunitiesView } from "@/components/admin/views/opportunities-view";
import { LearningView } from "@/components/admin/views/learning-view";
import { AnalyticsView } from "@/components/admin/views/analytics-view";
import { ReportsView } from "@/components/admin/views/reports-view";
import { ApprovalsView } from "@/components/admin/views/approvals-view";
import {
  NotificationsView,
  AdminsView,
  AuditLogsView,
  SettingsView,
} from "@/components/admin/views/system-views";

// Master Seed Data
import {
  initialStudents,
  initialFaculty,
  initialIndustry,
  initialSkills,
  initialJobs,
  initialInternships,
  initialCertifications,
  initialApprovals,
  initialAuditLogs,
  StudentProfile,
  FacultyMember,
  IndustryPartner,
  SkillItem,
  JobListing,
  InternshipListing,
  CertificationRecord,
  ApprovalQueueItem,
  AuditLogItem,
} from "@/lib/admin-data";

export default function AdminPortalPage() {
  const router = useRouter();

  // Authentication check
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

  // Navigation State
  const [currentView, setCurrentView] = React.useState<AdminViewType>("overview");
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  // Core Data Stores
  const [students, setStudents] = React.useState<StudentProfile[]>(initialStudents);
  const [faculty, setFaculty] = React.useState<FacultyMember[]>(initialFaculty);
  const [industry, setIndustry] = React.useState<IndustryPartner[]>(initialIndustry);
  const [skills, setSkills] = React.useState<SkillItem[]>(initialSkills);
  const [jobs, setJobs] = React.useState<JobListing[]>(initialJobs);
  const [internships, setInternships] = React.useState<InternshipListing[]>(initialInternships);
  const [certifications, setCertifications] =
    React.useState<CertificationRecord[]>(initialCertifications);
  const [approvals, setApprovals] = React.useState<ApprovalQueueItem[]>(initialApprovals);
  const [auditLogs, setAuditLogs] = React.useState<AuditLogItem[]>(initialAuditLogs);

  // Dynamic Pending Counter
  const [pendingApprovalsCount, setPendingApprovalsCount] = React.useState(
    initialApprovals.filter((a) => a.status === "pending").length
  );

  // Session verification
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      let adminSession = sessionStorage.getItem("skill_bridge_admin");
      if (!adminSession && document.cookie.includes("sb_admin=true")) {
        sessionStorage.setItem("skill_bridge_admin", "true");
        adminSession = "true";
      }
      if (!adminSession) {
        router.push("/");
        return;
      }
      setIsAuthenticated(true);
      setIsCheckingAuth(false);
    }
  }, [router]);

  // Handle Logout
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("skill_bridge_admin");
      sessionStorage.removeItem("skill_bridge_user");
    }
    router.push("/");
  };

  // Student Status Handler
  const handleToggleStudentStatus = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === "active" ? "inactive" : "active";
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  // Faculty Status Handler
  const handleToggleFacultyStatus = (id: string) => {
    setFaculty((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const nextStatus = f.status === "verified" ? "deactivated" : "verified";
          return { ...f, status: nextStatus };
        }
        return f;
      })
    );
  };

  const handleApproveFaculty = (id: string) => {
    setFaculty((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "verified" } : f))
    );
  };

  // Industry Partner Freeze Handler with Backend Sync
  const handleToggleIndustryFreeze = async (companyId: string) => {
    const target = industry.find((c) => c.id === companyId);
    if (!target) return;

    const willFreeze = !target.isFrozen;
    const reason = willFreeze
      ? prompt(
          `Enter reason for freezing ${target.companyName} hiring:`,
          "Suspicious recruitment activity flagged by compliance"
        )
      : undefined;

    if (willFreeze && reason === null) return; // cancelled

    // Update local state
    setIndustry((prev) =>
      prev.map((c) => {
        if (c.id === companyId) {
          return {
            ...c,
            isFrozen: willFreeze,
            freezeReason: willFreeze ? reason || "Suspicious hiring behavior flagged" : undefined,
          };
        }
        return c;
      })
    );

    // Append to Audit Logs
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      actor: "Admin (admin@gmail.com)",
      action: willFreeze ? "Company Hiring Frozen" : "Company Hiring Restored",
      resource: `${target.companyName} (ID: ${target.id})`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      status: willFreeze ? "Flagged" : "Success",
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    // Backend endpoint call for persistent database sync
    try {
      await fetch("/api/admin/freeze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "company",
          id: companyId,
          reason: reason || undefined,
        }),
      });
    } catch (e) {
      console.warn("Backend sync notification failed:", e);
    }
  };

  const handleApproveIndustry = (companyId: string) => {
    setIndustry((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, status: "verified" } : c))
    );
  };

  // Skill Addition
  const handleAddSkill = (newSkill: SkillItem) => {
    setSkills((prev) => [newSkill, ...prev]);
  };

  // Approvals Quick Handlers
  const handleApproveItem = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "approved" } : a))
    );
    setPendingApprovalsCount((c) => Math.max(0, c - 1));
  };

  const handleRejectItem = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "rejected" } : a))
    );
    setPendingApprovalsCount((c) => Math.max(0, c - 1));
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Persistent Desktop & Mobile Drawer Sidebar */}
      <AdminSidebar
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
        pendingApprovalsCount={pendingApprovalsCount}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Sticky Header */}
        <AdminHeader
          currentView={currentView}
          onOpenMobile={() => setMobileNavOpen(true)}
          onLogout={handleLogout}
        />

        {/* View Surface Content */}
        <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto space-y-6">
          {isCheckingAuth || !isAuthenticated ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
              <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
              <p className="text-xs text-muted-foreground font-mono">
                Verifying administrative credentials...
              </p>
            </div>
          ) : (
            <>
              {currentView === "overview" && (
            <OverviewView
              students={students}
              faculty={faculty}
              industry={industry}
              jobs={jobs}
              internships={internships}
              certifications={certifications}
              approvals={approvals}
              auditLogs={auditLogs}
              onNavigate={(v) => setCurrentView(v)}
              onApprove={handleApproveItem}
              onReject={handleRejectItem}
            />
          )}

          {currentView === "students" && (
            <StudentsView
              students={students}
              onToggleStatus={handleToggleStudentStatus}
            />
          )}

          {currentView === "faculty" && (
            <FacultyView
              faculty={faculty}
              onToggleStatus={handleToggleFacultyStatus}
              onApprove={handleApproveFaculty}
            />
          )}

          {currentView === "industry" && (
            <IndustryView
              industry={industry}
              onToggleFreeze={handleToggleIndustryFreeze}
              onApprove={handleApproveIndustry}
            />
          )}

          {currentView === "skill-library" && (
            <SkillLibraryView
              skills={skills}
              onAddSkill={handleAddSkill}
            />
          )}

          {currentView === "skill-gaps" && <SkillGapsView />}

          {currentView === "jobs" && (
            <OpportunitiesView initialTab="jobs" />
          )}

          {currentView === "internships" && (
            <OpportunitiesView initialTab="internships" />
          )}

          {currentView === "courses" && (
            <LearningView initialTab="courses" />
          )}

          {currentView === "assessments" && (
            <LearningView initialTab="assessments" />
          )}

          {currentView === "certifications" && (
            <LearningView initialTab="certifications" />
          )}

          {currentView === "analytics" && <AnalyticsView />}

          {currentView === "reports" && <ReportsView />}

          {currentView === "approvals" && (
            <ApprovalsView
              onApprovalsCountChange={(count) => setPendingApprovalsCount(count)}
            />
          )}

          {currentView === "notifications" && <NotificationsView />}

          {currentView === "admins" && <AdminsView />}

          {currentView === "audit-logs" && <AuditLogsView />}

          {currentView === "settings" && <SettingsView />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
