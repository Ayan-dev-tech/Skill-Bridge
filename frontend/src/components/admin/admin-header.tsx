"use client";

import * as React from "react";
import { GlobalHeader, GlobalNotificationItem } from "@/components/navigation/global-header";
import { AdminViewType } from "./admin-sidebar";
import { RealtimeStatusInfo } from "@/lib/admin/types";
import { Button } from "@/components/ui/button";
import { RefreshCw, Radio } from "lucide-react";

interface AdminHeaderProps {
  currentView: AdminViewType;
  onOpenMobile: () => void;
  onLogout: () => void;
  realtimeStatus?: RealtimeStatusInfo;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  lastSyncedAt?: string;
  notificationsCount?: number;
  notificationItems?: GlobalNotificationItem[];
}

const viewTitles: Record<AdminViewType, { section: string; title: string }> = {
  overview: { section: "Dashboard", title: "Overview" },
  students: { section: "People", title: "Student Management" },
  faculty: { section: "People", title: "Faculty Management" },
  industry: { section: "People", title: "Industry Partners" },
  campus: { section: "People", title: "Campus Management" },
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
  realtimeStatus,
  isRefreshing = false,
  onRefresh,
  lastSyncedAt,
  notificationsCount = 1,
  notificationItems = [],
}: AdminHeaderProps) {
  const currentMeta = viewTitles[currentView] || { section: "Admin", title: "Dashboard" };

  const isRealtimeConnected = realtimeStatus?.status === "connected";
  const isRealtimeStandby = realtimeStatus?.status === "standby" || realtimeStatus?.status === "unconfigured";

  const defaultNotifications: GlobalNotificationItem[] = notificationItems.length > 0
    ? notificationItems
    : [
        {
          id: "notif-admin-1",
          title: "System Online",
          message: "Skill Bridge Admin console and operational telemetry active.",
        },
      ];

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
      notificationsCount={notificationsCount}
      notificationItems={defaultNotifications}
    >
      <div className="flex items-center gap-2 mr-1 sm:mr-2">
        {/* Realtime Status Telemetry Indicator */}
        <div
          className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
            isRealtimeConnected
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "bg-muted/40 border-border text-muted-foreground"
          }`}
          title={
            realtimeStatus?.message ||
            "Supabase Realtime not configured (Awaiting backend URL & anon key)"
          }
        >
          <Radio
            className={`w-3 h-3 ${
              isRealtimeConnected ? "text-emerald-500 animate-pulse" : "text-muted-foreground/70"
            }`}
          />
          <span>
            {isRealtimeConnected ? "Live Realtime" : "Realtime: Standby"}
          </span>
        </div>

        {/* Manual Sync / Refresh Button */}
        {onRefresh && (
          <Button
            variant="outline"
            size="xs"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="h-7 text-xs gap-1.5 px-2.5 text-muted-foreground hover:text-foreground"
            title={lastSyncedAt ? `Last synced at ${lastSyncedAt}` : "Refresh live database"}
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="hidden md:inline">Sync Live Data</span>
          </Button>
        )}
      </div>
    </GlobalHeader>
  );
}
