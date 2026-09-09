"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileQuestion,
  ShieldCheck,
  Briefcase,
  FileText,
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

export type IndustryViewType =
  | "dashboard"
  | "profile"
  | "hiring"
  | "screening"
  | "interview"
  | "analytics"
  | "students"
  | "question-bank";

interface NavItem {
  id: IndustryViewType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

interface IndustrySidebarProps {
  currentView: IndustryViewType;
  onSelectView: (view: IndustryViewType) => void;
  questionsCount?: number;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function IndustrySidebar({
  currentView,
  onSelectView,
  questionsCount,
  onCloseMobile,
}: IndustrySidebarProps) {
  const sections: NavSection[] = [
    {
      title: "Core Operations",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
        },
        {
          id: "hiring",
          label: "Hiring & Posts",
          icon: Briefcase,
        },
        {
          id: "profile",
          label: "Company Profile",
          icon: Building2,
        },
      ],
    },
    {
      title: "Recruitment Workflow",
      items: [
        {
          id: "screening",
          label: "Screening",
          icon: FileText,
        },
        {
          id: "interview",
          label: "Interviews",
          icon: ShieldCheck,
        },
        {
          id: "analytics",
          label: "Hiring & Analytics",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Talent & Assessment",
      items: [
        {
          id: "students",
          label: "Student Talent",
          icon: Users,
        },
        {
          id: "question-bank",
          label: "Question Bank",
          icon: FileQuestion,
          badge: questionsCount !== undefined && questionsCount > 0 ? questionsCount : undefined,
        },
      ],
    },
  ];

  const handleSelect = (viewId: IndustryViewType) => {
    onSelectView(viewId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar select-none">
      {/* Sidebar Header / Corporate Badge */}
      <SidebarHeader className="h-16 md:h-[68px] px-3 border-b border-sidebar-border flex-row items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-sidebar-accent flex items-center justify-center border border-sidebar-border/70 text-sidebar-primary shadow-2xs shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <div className="space-y-0.5 group-data-[collapsible=icon]:hidden">
            <p className="font-heading text-xs font-bold tracking-tight text-sidebar-foreground leading-none">
              Industry Portal
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                Verified Partner
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation Sections with ScrollArea inside SidebarContent */}
      <SidebarContent className="p-0 overflow-hidden flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-3 p-2">
            {sections.map((sec, idx) => (
              <SidebarGroup key={idx} className="p-0 h-auto shrink-0">
                {sec.title && (
                  <SidebarGroupLabel className="px-2 py-1 text-[10px] font-semibold text-muted-foreground/80 uppercase tracking-wider font-mono h-7">
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

      {/* Scope Footer Badge */}
      <SidebarFooter className="p-3 border-t border-sidebar-border bg-sidebar-accent/20 shrink-0">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground group-data-[collapsible=icon]:justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="truncate group-data-[collapsible=icon]:hidden">Skill Bridge Enterprise</span>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
