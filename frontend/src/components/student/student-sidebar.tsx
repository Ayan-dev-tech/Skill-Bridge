"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  ClipboardCheck,
  FileCheck,
  TrendingUp,
  BookOpen,
  FileText,
  Briefcase,
  Send,
  User,
  Settings,
  Info,
  X,
  Lock,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StudentProfileData, defaultStudentProfile } from "@/lib/student-data";
import { StudentProfileBadge } from "./student-profile-badge";
import type { CanonicalWorkflowState } from "@/lib/workflow/canonical-workflow";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isCurrentEntry?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface StudentSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  profile?: StudentProfileData;
  workflow?: CanonicalWorkflowState | null;
}

export function StudentSidebar({
  mobileOpen = false,
  onCloseMobile,
  profile = defaultStudentProfile,
  workflow = null,
}: StudentSidebarProps) {
  const pathname = usePathname();

  const sections: NavSection[] = [
    {
      title: "Main",
      items: [
        {
          name: "Dashboard",
          href: "/student/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Getting Started",
      items: [
        {
          name: "Document Submission",
          href: "/student/document-verification",
          icon: FileCheck,
        },
        {
          name: "Interest Finder",
          href: "/student/interest-finder",
          icon: Compass,
        },
        {
          name: "Knowledge Testing",
          href: "/student/knowledge-testing",
          icon: ClipboardCheck,
        },
      ],
    },
    {
      title: "Development",
      items: [
        {
          name: "Skill Gap & Suggestions",
          href: "/student/skill-gap",
          icon: TrendingUp,
        },
        {
          name: "Learning / Mentoring",
          href: "/student/learning",
          icon: BookOpen,
        },
        {
          name: "Resume Checker",
          href: "/student/resume-checker",
          icon: FileText,
        },
      ],
    },
    {
      title: "Opportunities",
      items: [
        {
          name: "Jobs & Internships",
          href: "/student/opportunities",
          icon: Briefcase,
        },
        {
          name: "Track Applications",
          href: "/student/applications",
          icon: Send,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          name: "Profile",
          href: "/student/profile",
          icon: User,
        },
        {
          name: "Settings",
          href: "/student/settings",
          icon: Settings,
        },
        {
          name: "About Skill Bridge",
          href: "/student/about",
          icon: Info,
        },
      ],
    },
  ];

  const initials = profile.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar select-none">
      {/* Brand Header */}
      <SidebarHeader className="h-16 md:h-[68px] flex-row items-center justify-between px-3 border-b border-sidebar-border shrink-0">
        <Link href="/student/dashboard" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-7 h-7 rounded-lg font-heading font-bold text-xs flex items-center justify-center bg-foreground text-background shadow-xs shrink-0">
            S
          </div>
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <span className="font-heading font-bold text-sm tracking-tight text-foreground whitespace-nowrap">
              SKILL BRIDGE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase font-semibold border-sidebar-border bg-sidebar-accent/60 text-muted-foreground whitespace-nowrap">
              Student
            </span>
          </div>
        </Link>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition-colors"
            aria-label="Close navigation drawer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </SidebarHeader>

      {/* Navigation Tree with clean ScrollArea inside SidebarContent */}
      <SidebarContent className="p-0 overflow-hidden flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-3 p-2">
            {sections.map((section, sIdx) => (
              <SidebarGroup key={sIdx} className="p-0 h-auto shrink-0">
                <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 px-2 py-1 h-7">
                  {section.title}
                </SidebarGroupLabel>
                <SidebarMenu className="gap-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href === "/student/dashboard" && pathname === "/student");

                    const matchingStage = workflow?.stages.find((s) => s.route === item.href);
                    const isStageLocked = matchingStage ? matchingStage.isLocked : false;
                    const isDashboardLocked =
                      item.href === "/student/dashboard" && workflow
                        ? !workflow.isVerificationCompleted
                        : false;
                    const isLocked = isStageLocked || isDashboardLocked;

                    if (isLocked) {
                      return (
                        <SidebarMenuItem key={item.href} className="h-auto shrink-0">
                          <SidebarMenuButton
                            tooltip={matchingStage?.lockedReason || `${item.name} (Locked)`}
                            disabled
                            className="opacity-40 cursor-not-allowed select-none"
                          >
                            <Icon className="size-4 shrink-0 text-muted-foreground/50" />
                            <span>{item.name}</span>
                            <Lock className="size-3 ml-auto text-muted-foreground/50 group-data-[collapsible=icon]:hidden" />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    }

                    return (
                      <SidebarMenuItem key={item.href} className="h-auto shrink-0">
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.name}
                        >
                          <Link
                            href={item.href}
                            onClick={() => {
                              if (onCloseMobile) onCloseMobile();
                            }}
                          >
                            <Icon className="size-4 shrink-0" />
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                        {item.isCurrentEntry && !isActive && (
                          <SidebarMenuBadge className="text-[9px] font-mono px-1.5 py-0.2 rounded-full border bg-muted/60 text-foreground border-border/80">
                            Start
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

      {/* Student Identity Footer */}
      <SidebarFooter className="p-2 border-t border-sidebar-border shrink-0">
        <div className="group-data-[collapsible=icon]:hidden">
          <StudentProfileBadge profile={profile} compact={true} />
        </div>
        <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center py-1">
          <Avatar className="size-8 rounded-md shrink-0">
            {profile.photoUrl && (
              <AvatarImage src={profile.photoUrl} alt={profile.fullName} />
            )}
            <AvatarFallback className="text-[10px] font-semibold bg-foreground text-background">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </SidebarFooter>

      {/* Interactive collapse rail */}
      <SidebarRail />
    </Sidebar>
  );
}
