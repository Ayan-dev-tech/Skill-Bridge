"use client";

import * as React from "react";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Building2,
  FileText,
  BarChart3,
  ShieldCheck,
  School,
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
import { CampusViewType } from "@/lib/campus/types";

interface NavItem {
  id: CampusViewType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

interface CampusSidebarProps {
  currentView: CampusViewType;
  onSelectView: (view: CampusViewType) => void;
  studentCount?: number;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function CampusSidebar({
  currentView,
  onSelectView,
  studentCount,
  onCloseMobile,
}: CampusSidebarProps) {
  const sections: NavSection[] = [
    {
      title: "Overview",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Academic Community",
      items: [
        {
          id: "students",
          label: "Students",
          icon: GraduationCap,
          badge: studentCount !== undefined && studentCount > 0 ? studentCount : undefined,
        },
        {
          id: "faculty",
          label: "Faculty & Mentors",
          icon: BookOpen,
        },
      ],
    },
    {
      title: "Corporate & Placements",
      items: [
        {
          id: "industry",
          label: "Industry & Hiring",
          icon: Building2,
        },
        {
          id: "applications",
          label: "Applications",
          icon: FileText,
        },
        {
          id: "reports",
          label: "Placement Reports",
          icon: BarChart3,
        },
      ],
    },
  ];

  const handleSelect = (viewId: CampusViewType) => {
    onSelectView(viewId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar select-none">
      {/* Campus Identity */}
      <SidebarHeader className="h-16 md:h-[68px] px-3 border-b border-sidebar-border flex-row items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center border border-sidebar-border shadow-2xs shrink-0">
            <School className="w-4 h-4 text-foreground" />
          </div>
          <div className="space-y-0.5 group-data-[collapsible=icon]:hidden">
            <p className="text-xs font-heading font-semibold tracking-tight text-foreground leading-none">
              Campus Portal
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium font-mono">
                Authorized Node
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation Sections with clean ScrollArea inside SidebarContent */}
      <SidebarContent className="p-0 overflow-hidden flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-3 p-2">
            {sections.map((sec, idx) => (
              <SidebarGroup key={idx} className="p-0 h-auto shrink-0">
                {sec.title && (
                  <SidebarGroupLabel className="px-2 py-1 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider h-7">
                    {sec.title}
                  </SidebarGroupLabel>
                )}
                <SidebarMenu className="gap-0.5">
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const active = currentView === item.id;
                    return (
                      <SidebarMenuItem key={item.id} className="h-auto shrink-0">
                        <SidebarMenuButton
                          isActive={active}
                          tooltip={item.label}
                          onClick={() => handleSelect(item.id)}
                        >
                          <Icon className="size-4 shrink-0" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                        {item.badge !== undefined && (
                          <SidebarMenuBadge className="text-[10px] px-1.5 py-0 h-4 rounded-full">
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

      {/* Institutional Footer Badge */}
      <SidebarFooter className="p-3 border-t border-sidebar-border bg-sidebar-accent/20 shrink-0">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground group-data-[collapsible=icon]:justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="truncate group-data-[collapsible=icon]:hidden">Verified College Node</span>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
