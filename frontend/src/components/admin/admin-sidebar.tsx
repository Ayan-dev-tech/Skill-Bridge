"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  School,
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
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export type AdminViewType =
  | "overview"
  | "students"
  | "faculty"
  | "industry"
  | "campus"
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
        { id: "campus", label: "Campus", icon: School },
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

  return (
    <Sidebar collapsible="icon">
      {/* Brand Header */}
      <SidebarHeader className="h-16 md:h-[68px] flex justify-center border-b border-sidebar-border px-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-foreground text-background font-heading font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
            S
          </div>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="font-heading font-bold text-sm tracking-tight text-foreground truncate">
              SKILL BRIDGE
            </span>
            <span className="text-[10px] font-mono uppercase font-semibold text-muted-foreground">
              Admin Portal
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation Content with ScrollArea */}
      <SidebarContent className="p-0 overflow-hidden flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-3 p-2">
            {sections.map((section, sIdx) => (
              <SidebarGroup key={sIdx} className="p-0 h-auto shrink-0">
                {section.title && (
                  <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 px-2 py-1 h-7">
                    {section.title}
                  </SidebarGroupLabel>
                )}
                <SidebarMenu className="gap-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                      <SidebarMenuItem key={item.id} className="h-auto shrink-0">
                        <SidebarMenuButton
                          isActive={isActive}
                          tooltip={item.label}
                          onClick={() => {
                            onSelectView(item.id);
                            if (onCloseMobile) onCloseMobile();
                          }}
                          className="gap-2.5"
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </SidebarMenuButton>
                        {item.badge !== undefined && (
                          <SidebarMenuBadge
                            className={
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground border border-border/80"
                            }
                          >
                            {item.badge}
                          </SidebarMenuBadge>
                        )}
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroup>
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>

      {/* Footer / System Telemetry */}
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground group-data-[collapsible=icon]:justify-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0" />
            <span className="font-mono text-[11px] group-data-[collapsible=icon]:hidden">
              Admin Portal Live
            </span>
          </div>
          <span className="font-mono text-[10px] group-data-[collapsible=icon]:hidden">
            v1.2.4
          </span>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
