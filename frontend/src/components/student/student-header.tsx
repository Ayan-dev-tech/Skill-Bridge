"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, LogOut, Bell, User, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { StudentProfileData, defaultStudentProfile } from "@/lib/student-data";

interface StudentHeaderProps {
  onOpenMobile: () => void;
  profile?: StudentProfileData;
}

const pageTitles: Record<string, { section: string; title: string }> = {
  "/student": { section: "Main", title: "Student Dashboard" },
  "/student/dashboard": { section: "Main", title: "Student Dashboard" },
  "/student/document-verification": { section: "Student Portal", title: "Document Submission" },
  "/student/interest-finder": { section: "Getting Started", title: "Interest Finder" },
  "/student/knowledge-testing": { section: "Getting Started", title: "Knowledge Testing" },
  "/student/documents": { section: "Getting Started", title: "Document Verification" },
  "/student/skill-gap": { section: "Development", title: "Skill Gap & Suggestions" },
  "/student/learning": { section: "Development", title: "Learning / Mentoring" },
  "/student/resume": { section: "Development", title: "Resume Builder" },
  "/student/opportunities": { section: "Opportunities", title: "Jobs & Internships" },
  "/student/applications": { section: "Opportunities", title: "Track Applications" },
  "/student/profile": { section: "Account", title: "Student Profile" },
  "/student/settings": { section: "Account", title: "Account Settings" },
  "/student/about": { section: "Information", title: "About Skill Bridge" },
};

export function StudentHeader({
  onOpenMobile,
  profile = defaultStudentProfile,
}: StudentHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const notificationRef = React.useRef<HTMLDivElement>(null);

  const isDocVerification = pathname.startsWith("/student/document-verification");

  const currentMeta = pageTitles[pathname] || {
    section: "Student Portal",
    title: "Overview",
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("skill_bridge_user");
      sessionStorage.removeItem("skill_bridge_admin");
    }
    router.push("/");
  };

  // Close notifications popover on click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 h-14 border-b border-border bg-background/95 backdrop-blur-xs text-foreground select-none">
      {/* Left: Mobile hamburger & Breadcrumb occupying available space */}
      <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
        <button
          onClick={onOpenMobile}
          className="md:hidden h-8 w-8 inline-flex items-center justify-center text-muted-foreground hover:text-foreground rounded-md border border-border transition-colors duration-150 shrink-0"
          aria-label="Open sidebar navigation menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Typographic Breadcrumb */}
        <nav aria-label="Breadcrumbs" className="flex items-center text-xs truncate">
          <span className="text-muted-foreground font-normal hidden sm:inline truncate">
            {currentMeta.section}
          </span>
          <span className="text-muted-foreground/40 font-light mx-1.5 hidden sm:inline" aria-hidden="true">
            /
          </span>
          <span className="font-semibold text-foreground tracking-tight truncate">
            {currentMeta.title}
          </span>
        </nav>
      </div>

      {/* Right: Controls aligned with exact 32px height and uniform spacing */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Notifications Popover */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground transition-colors duration-150 relative bg-background"
            aria-label="View notifications"
            aria-expanded={showNotifications}
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-foreground" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 p-3 rounded-lg border border-border bg-card shadow-lg z-50 text-xs space-y-2 animate-in fade-in-0 duration-150 motion-reduce:animate-none text-foreground">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="font-semibold text-foreground">Notifications</span>
                <span className="text-[10px] text-muted-foreground font-mono">1 unread</span>
              </div>
              <div className="p-2.5 rounded border border-border bg-muted/20 space-y-1">
                <p className="font-medium text-foreground text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  Account Active
                </p>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Welcome to Skill Bridge. Complete your required documents to proceed.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button (h-8 w-8) */}
        <ThemeToggle className="h-8 w-8 rounded-md border border-border bg-background" />

        {/* Student Profile Identity Tag */}
        <div className="hidden lg:inline-flex items-center gap-2 h-8 px-2.5 rounded-md border border-border bg-muted/25 text-xs select-none">
          <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="font-medium text-foreground truncate max-w-[130px]">
            {profile.fullName}
          </span>
          <span className="text-muted-foreground font-normal text-[11px] font-mono shrink-0">
            Sem {profile.semester}
          </span>
        </div>

        {/* Sign Out Action Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="h-8 gap-1.5 px-2.5 text-xs text-muted-foreground hover:text-foreground border border-border transition-colors duration-150"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </header>
  );
}
