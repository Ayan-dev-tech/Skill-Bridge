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
  Sparkles,
  Lock,
} from "lucide-react";
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

  const isDocVerification = pathname.startsWith("/student/document-verification");

  const sidebarContent = (
    <div className="flex flex-col h-full select-none bg-background border-r border-border text-foreground">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 h-14 border-b border-border shrink-0">
        <Link href="/student/dashboard" className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-md font-bold text-xs flex items-center justify-center bg-foreground text-background">
            S
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight text-foreground">
              SKILL BRIDGE
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border uppercase font-semibold border-border bg-muted/40 text-muted-foreground">
              Student
            </span>
          </div>
        </Link>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1 rounded text-muted-foreground hover:text-foreground"
            aria-label="Close navigation drawer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Tree */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4 text-xs">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-0.5">
            <p className="px-2.5 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {section.title}
            </p>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href === "/student/dashboard" && pathname === "/student");

              const matchingStage = workflow?.stages.find((s) => s.route === item.href);
              const isStageLocked = matchingStage ? matchingStage.isLocked : false;
              const isDashboardLocked =
                item.href === "/student/dashboard" && workflow ? !workflow.isVerificationCompleted : false;
              const isLocked = isStageLocked || isDashboardLocked;

              if (isLocked) {
                return (
                  <div
                    key={item.href}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-md font-medium cursor-not-allowed select-none opacity-60 text-muted-foreground/40"
                    title={matchingStage?.lockedReason || "Locked until prerequisite milestones are completed."}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="w-4 h-4 shrink-0 text-muted-foreground/40" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <Lock className="w-3 h-3 shrink-0 text-muted-foreground/50" />
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md font-medium transition-colors ${
                    isActive
                      ? "bg-foreground text-background shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.isCurrentEntry && !isActive && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold border bg-muted text-foreground border-border">
                      Start
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Student Identity Footer */}
      <div className="p-3 border-t border-border shrink-0">
        <StudentProfileBadge profile={profile} compact={true} />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 h-screen sticky top-0 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
