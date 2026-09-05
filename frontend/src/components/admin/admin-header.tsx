"use client";

import * as React from "react";
import { Menu, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
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
    <header className="sticky top-0 z-20 flex items-center justify-between px-6 h-14 border-b border-border bg-background/95 backdrop-blur-sm select-none">
      {/* Left: Mobile hamburger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="md:hidden text-muted-foreground hover:text-foreground p-1.5 rounded-md border border-border"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground hidden sm:inline">{currentMeta.section}</span>
          <span className="text-muted-foreground/50 hidden sm:inline">/</span>
          <span className="font-semibold text-foreground tracking-tight">{currentMeta.title}</span>
        </div>
      </div>

      {/* Right: Badge, ThemeToggle, Logout */}
      <div className="flex items-center gap-2.5">
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-muted/30 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
          <span className="font-medium text-foreground">admin@gmail.com</span>
          <span className="text-muted-foreground text-[11px]">(Super Admin)</span>
        </div>

        <ThemeToggle />

        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Log Out</span>
        </Button>
      </div>
    </header>
  );
}
