"use client";

import * as React from "react";
import { GlobalHeader } from "@/components/navigation/global-header";
import { AdminViewType } from "./admin-sidebar";

interface AdminHeaderProps {
  currentView: AdminViewType;
  onOpenMobile: () => void;
  onLogout: () => void;
}

const viewTitles: Record<AdminViewType, { section: string; title: string }> = {
  overview: { section: "Dashboard", title: "Overview" },
  students: { section: "People", title: "Student Management" },
  faculty: { section: "People", title: "Faculty Management" },
  industry: { section: "People", title: "Industry Partners" },
  "skill-library": { section: "Skills", title: "Skill Library" },
  "skill-gaps": { section: "Skills", title: "Skill Gap Analytics" },
  jobs: { section: "Opportunities", title: "Job Opportunities" },
  internships: { section: "Opportunities", title: "Internship Postings" },
  courses: { section: "Learning", title: "Courses & Curricula" },
  assessments: { section: "Learning", title: "Assessments Management" },
  certifications: { section: "Learning", title: "Certification Verification" },
  analytics: { section: "Insights", title: "Platform Analytics" },
  reports: { section: "Insights", title: "Data Reports & Exports" },
  approvals: { section: "System", title: "Centralized Approval Queue" },
  notifications: { section: "System", title: "System Broadcasts & Notifications" },
  admins: { section: "System", title: "Admin Management & Permissions" },
  "audit-logs": { section: "System", title: "System Audit Logs" },
  settings: { section: "System", title: "Platform Settings" },
};

export function AdminHeader({
  currentView,
  onOpenMobile,
  onLogout,
}: AdminHeaderProps) {
  const currentMeta = viewTitles[currentView] || { section: "Admin", title: "Dashboard" };

  return (
    <GlobalHeader
      portal="admin"
      breadcrumb={currentMeta}
      user={{
        name: "admin@gmail.com",
        meta: "Super Admin",
        email: "admin@gmail.com",
      }}
      onOpenMobile={onOpenMobile}
      onLogout={onLogout}
      notificationsCount={1}
      notificationItems={[
        {
          id: "notif-admin-1",
          title: "System Online",
          message: "Skill Bridge Admin console and operational telemetry active.",
        },
      ]}
    />
  );
}
