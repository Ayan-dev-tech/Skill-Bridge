"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  TrendingUp,
  Briefcase,
  FileText,
  Compass,
  ClipboardCheck,
  Award,
  BarChart3,
  DownloadCloud,
  CheckCircle2,
  Bell,
  ShieldCheck,
  History,
  Settings,
  X,
} from "lucide-react";

export type AdminViewType =
  | "overview"
  | "students"
  | "faculty"
  | "industry"
  | "skill-library"
  | "skill-gaps"
  | "jobs"
  | "internships"
  | "courses"
  | "assessments"
  | "certifications"
  | "analytics"
  | "reports"
  | "approvals"
  | "notifications"
  | "admins"
  | "audit-logs"
  | "settings";

interface NavItem {
  id: AdminViewType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

interface AdminSidebarProps {
  currentView: AdminViewType;
  onSelectView: (view: AdminViewType) => void;
  pendingApprovalsCount?: number;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function AdminSidebar({
  currentView,
  onSelectView,
  pendingApprovalsCount = 4,
  mobileOpen = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const sections: NavSection[] = [
    {
      items: [{ id: "overview", label: "Overview", icon: LayoutDashboard }],
    },
    {
      title: "People",
      items: [
        { id: "students", label: "Students", icon: Users },
        { id: "faculty", label: "Faculty", icon: GraduationCap },
        { id: "industry", label: "Industry", icon: Building2 },
      ],
    },
    {
      title: "Skills",
      items: [
        { id: "skill-library", label: "Skill Library", icon: BookOpen },
        { id: "skill-gaps", label: "Skill Gaps", icon: TrendingUp },
      ],
    },
    {
      title: "Opportunities",
      items: [
        { id: "jobs", label: "Jobs", icon: Briefcase },
        { id: "internships", label: "Internships", icon: FileText },
      ],
    },
    {
      title: "Learning",
      items: [
        { id: "courses", label: "Courses", icon: Compass },
        { id: "assessments", label: "Assessments", icon: ClipboardCheck },
        { id: "certifications", label: "Certifications", icon: Award },
      ],
    },
    {
      title: "Insights",
      items: [
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "reports", label: "Reports", icon: DownloadCloud },
      ],
    },
    {
      title: "System",
      items: [
        {
          id: "approvals",
          label: "Approvals",
          icon: CheckCircle2,
          badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
        },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "admins", label: "Admins", icon: ShieldCheck },
        { id: "audit-logs", label: "Audit Logs", icon: History },
        { id: "settings", label: "Settings", icon: Settings },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-background border-r border-border text-foreground select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 h-14 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-md bg-foreground text-background font-bold text-xs flex items-center justify-center">
            S
          </div>
          <span className="font-semibold text-sm tracking-tight">SKILL BRIDGE</span>
        </div>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden text-muted-foreground hover:text-foreground p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Tree */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4 text-xs">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-0.5">
            {section.title && (
              <p className="px-2.5 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {section.title}
              </p>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectView(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                    isActive
                      ? "bg-foreground text-background shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                        isActive
                          ? "bg-background text-foreground"
                          : "bg-muted text-foreground border border-border"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / System Status */}
      <div className="p-3 border-t border-border bg-muted/20 text-[11px] text-muted-foreground flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <span>Admin Portal Live</span>
        </div>
        <span className="font-mono text-[10px]">v1.2.4</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 h-screen sticky top-0 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
