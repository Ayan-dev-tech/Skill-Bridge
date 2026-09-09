"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  ShieldAlert,
  BookOpen,
  Briefcase,
  Award,
  BarChart3,
  User,
  Settings,
  GraduationCap,
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
import type { FacultyViewType } from "@/lib/faculty/types";

interface NavItem {
  id: FacultyViewType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

interface FacultySidebarProps {
  currentView: FacultyViewType;
  onSelectView: (view: FacultyViewType) => void;
  studentCount?: number;
  attentionCount?: number;
  onCloseMobile?: () => void;
}

export function FacultySidebar({
  currentView,
  onSelectView,
  studentCount,
  attentionCount,
  onCloseMobile,
}: FacultySidebarProps) {
  const sections: NavSection[] = [
    {
      title: "Main",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Students",
      items: [
        {
          id: "students",
          label: "My Students",
          icon: Users,
          badge: studentCount !== undefined && studentCount > 0 ? studentCount : undefined,
        },
        {
          id: "progress",
          label: "Student Progress",
          icon: TrendingUp,
          badge: attentionCount !== undefined && attentionCount > 0 ? `${attentionCount} alert` : undefined,
        },
      ],
    },
    {
      title: "Development",
      items: [
        {
          id: "skill-gaps",
          label: "Skill Gaps",
          icon: ShieldAlert,
        },
        {
          id: "learning",
          label: "Learning / Mentoring",
          icon: BookOpen,
        },
      ],
    },
    {
      title: "Opportunities",
      items: [
        {
          id: "applications",
          label: "Applications",
          icon: Briefcase,
        },
        {
          id: "placement",
          label: "Placement Progress",
          icon: Award,
        },
      ],
    },
    {
      title: "Insights",
      items: [
        {
          id: "reports",
          label: "Reports",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          id: "profile",
          label: "Profile",
          icon: User,
        },
        {
          id: "settings",
          label: "Settings",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-sidebar select-none">
      {/* Sidebar Header */}
      <SidebarHeader className="border-b border-border p-3">
        <div className="flex items-center gap-2.5 px-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="font-heading text-sm font-semibold tracking-tight text-foreground truncate">
              Faculty Portal
            </span>
            <span className="text-[11px] text-muted-foreground truncate">
              Academic Mentorship
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Sidebar Content with clean ScrollArea */}
      <SidebarContent className="p-0 overflow-hidden flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-3 p-2">
            {sections.map((section) => (
              <SidebarGroup key={section.title || "main"} className="p-0">
                {section.title && (
                  <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1">
                    {section.title}
                  </SidebarGroupLabel>
                )}
                <SidebarMenu className="gap-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          isActive={isActive}
                          onClick={() => {
                            onSelectView(item.id);
                            if (onCloseMobile) onCloseMobile();
                          }}
                          tooltip={item.label}
                          className="h-9 px-2 text-xs font-medium cursor-pointer"
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </SidebarMenuButton>
                        {item.badge !== undefined && (
                          <SidebarMenuBadge className="text-[10px] px-1.5 py-0.5 h-auto">
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

      {/* Sidebar Footer */}
      <SidebarFooter className="border-t border-border p-2">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/40 text-xs">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-bold">
            FM
          </div>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="font-medium text-foreground truncate">Faculty Mentor</span>
            <span className="text-[10px] text-muted-foreground truncate">Department Mentor</span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
