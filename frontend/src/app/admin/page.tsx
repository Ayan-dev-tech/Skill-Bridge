"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar, AdminViewType } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminLiveUpdates } from "@/lib/admin/use-admin-live-updates";

// Views
import { OverviewView } from "@/components/admin/views/overview-view";
import { StudentsView } from "@/components/admin/views/students-view";
import { FacultyView } from "@/components/admin/views/faculty-view";
import { IndustryView } from "@/components/admin/views/industry-view";
import { CampusView } from "@/components/admin/views/campus-view";
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

// Master Seed Data (Fallback & Defaults)
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

  // Live Realtime & Activity Hook
  const {
    data: liveData,
    isLoading: isLiveLoading,
    isRefreshing,
    lastSyncedAt,
    realtimeStatus,
    refreshData,
    handleApprovalAction,
    handleToggleFreeze,
  } = useAdminLiveUpdates();

  // Core Data Stores (with seed fallbacks)
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

  // Dynamic Pending Counter (prioritize live data)
  const pendingApprovalsCount =
    liveData?.stats.pendingApprovalsCount ??
    approvals.filter((a) => a.status === "pending").length;

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

  // Industry Partner Freeze Handler with Backend Sync & Live State
  const handleToggleIndustryFreeze = async (companyId: string) => {
    const target = industry.find((c) => c.id === companyId);
    if (!target) return;

    await handleToggleFreeze("company", companyId, target.companyName, target.isFrozen);

    // Also update local list
    setIndustry((prev) =>
      prev.map((c) => {
        if (c.id === companyId) {
          return {
            ...c,
            isFrozen: !c.isFrozen,
          };
        }
        return c;
      })
    );
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
    const liveMatch = liveData?.approvals.find((a) => a.id === id);
    if (liveMatch) {
      handleApprovalAction(liveMatch, "approved");
    } else {
      setApprovals((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "approved" } : a))
      );
    }
  };

  const handleRejectItem = (id: string) => {
    const liveMatch = liveData?.approvals.find((a) => a.id === id);
    if (liveMatch) {
      handleApprovalAction(liveMatch, "rejected");
    } else {
      setApprovals((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "rejected" } : a))
      );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
        {/* Persistent Desktop & Mobile Drawer Sidebar */}
        <AdminSidebar
          currentView={currentView}
          onSelectView={(v) => setCurrentView(v)}
          pendingApprovalsCount={pendingApprovalsCount}
          mobileOpen={mobileNavOpen}
          onCloseMobile={() => setMobileNavOpen(false)}
        />

        {/* Main Workspace Column */}
        <SidebarInset className="flex flex-col min-w-0 flex-1 h-full overflow-hidden">
          {/* Header with Live Telemetry & Sync */}
          <AdminHeader
            currentView={currentView}
            onOpenMobile={() => setMobileNavOpen(true)}
            onLogout={handleLogout}
            realtimeStatus={realtimeStatus}
            isRefreshing={isRefreshing}
            onRefresh={refreshData}
            lastSyncedAt={lastSyncedAt}
            notificationsCount={liveData?.notifications.length || 1}
            notificationItems={liveData?.notifications.map((n) => ({
              id: n.id,
              title: n.title,
              message: n.message,
              time: n.sentAt,
            }))}
          />

          {/* Clean ScrollArea for View Surface Content */}
          <ScrollArea className="flex-1 w-full min-h-0">
            <main className="p-4 md:p-6 max-w-7xl w-full mx-auto space-y-6">
              {isCheckingAuth || !isAuthenticated || (isLiveLoading && !liveData) ? (
                <div className="space-y-6 animate-pulse py-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-64 rounded-lg" />
                    <Skeleton className="h-8 w-32 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <Skeleton key={i} className="h-20 rounded-lg" />
                    ))}
                  </div>
                  <Skeleton className="h-96 w-full rounded-xl" />
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
                      liveOverview={liveData}
                      onApproveLiveItem={(item) => handleApprovalAction(item, "approved")}
                      onRejectLiveItem={(item) => handleApprovalAction(item, "rejected")}
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

                  {currentView === "campus" && (
                    <CampusView
                      campuses={liveData?.campusList || []}
                      onToggleFreeze={(type, id, name, isFrozen) =>
                        handleToggleFreeze("campus", id, name, isFrozen)
                      }
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
                      liveApprovals={liveData?.approvals}
                      onApproveLiveItem={(item) => handleApprovalAction(item, "approved")}
                      onRejectLiveItem={(item) => handleApprovalAction(item, "rejected")}
                      onApprovalsCountChange={(count) => {}}
                    />
                  )}

                  {currentView === "notifications" && <NotificationsView />}

                  {currentView === "admins" && <AdminsView />}

                  {currentView === "audit-logs" && <AuditLogsView />}

                  {currentView === "settings" && <SettingsView />}
                </>
              )}
            </main>
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
