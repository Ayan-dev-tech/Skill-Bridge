"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, LogOut, Bell, User, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export type PortalType = "student" | "campus" | "faculty" | "industry" | "admin";

export interface GlobalHeaderUser {
  name: string;
  meta?: string;
  email?: string;
  avatarUrl?: string;
}

export interface GlobalHeaderBreadcrumb {
  section?: string;
  title: string;
}

export interface GlobalNotificationItem {
  id: string;
  title: string;
  message: string;
  time?: string;
  read?: boolean;
}

export interface GlobalHeaderProps {
  /**
   * Portal identity: student, campus, faculty, industry, admin
   */
  portal: PortalType;
  /**
   * Optional custom portal label override (defaults to uppercase portal)
   */
  portalLabel?: string;
  /**
   * Destination link for the brand logo (defaults to portal root)
   */
  homeHref?: string;
  /**
   * Contextual breadcrumb (section / title)
   */
  breadcrumb?: GlobalHeaderBreadcrumb;
  /**
   * User profile data displayed on the right
   */
  user?: GlobalHeaderUser;
  /**
   * Callback to open mobile navigation drawer
   */
  onOpenMobile?: () => void;
  /**
   * Callback for sign out action
   */
  onLogout?: () => void;
  /**
   * Number of unread notifications
   */
  notificationsCount?: number;
  /**
   * Notification items for popover
   */
  notificationItems?: GlobalNotificationItem[];
  /**
   * Optional additional portal controls
   */
  children?: React.ReactNode;
  /**
   * Optional extra container styling
   */
  className?: string;
}

const defaultPortalHrefs: Record<PortalType, string> = {
  student: "/student/dashboard",
  campus: "/campus",
  faculty: "/faculty",
  industry: "/industry",
  admin: "/admin",
};

const defaultPortalLabels: Record<PortalType, string> = {
  student: "Student",
  campus: "Campus",
  faculty: "Faculty",
  industry: "Industry",
  admin: "Admin",
};

export function GlobalHeader({
  portal,
  portalLabel,
  homeHref,
  breadcrumb,
  user,
  onOpenMobile,
  onLogout,
  notificationsCount = 1,
  notificationItems,
  children,
  className = "",
}: GlobalHeaderProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const notificationRef = React.useRef<HTMLDivElement>(null);

  // Local fallback user state if none provided via props
  const [detectedUser, setDetectedUser] = React.useState<GlobalHeaderUser | null>(null);

  React.useEffect(() => {
    if (!user && typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("skill_bridge_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          setDetectedUser({
            name: parsed.fullName || parsed.name || parsed.email || "User",
            meta: parsed.role ? parsed.role.toUpperCase() : undefined,
            email: parsed.email,
          });
        } else if (sessionStorage.getItem("skill_bridge_admin")) {
          setDetectedUser({
            name: "admin@gmail.com",
            meta: "Super Admin",
            email: "admin@gmail.com",
          });
        }
      } catch {
        // keep empty
      }
    }
  }, [user]);

  const activeUser = user || detectedUser;

  const resolvedPortalLabel = portalLabel || defaultPortalLabels[portal];
  const resolvedHomeHref = homeHref || defaultPortalHrefs[portal];

  const handleSignOut = () => {
    if (onLogout) {
      onLogout();
      return;
    }
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("skill_bridge_user");
      sessionStorage.removeItem("skill_bridge_admin");
    }
    router.push("/");
  };

  // Close notifications popover on click outside or Escape key
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showNotifications]);

  const defaultNotifications: GlobalNotificationItem[] = [
    {
      id: "notif-default-1",
      title: "Account Active",
      message: `Welcome to the Skill Bridge ${resolvedPortalLabel} Portal. All verified systems are operating normally.`,
    },
  ];

  const itemsToRender = notificationItems || defaultNotifications;

  return (
    <header
      className={`sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 lg:px-8 h-16 md:h-[68px] border-b border-border/80 bg-background/90 backdrop-blur-md text-foreground select-none ${className}`}
      role="banner"
    >
      {/* ------------------------------------------------------------------ */}
      {/* LEFT: Mobile Toggle, Unified Brand Area & Portal Identity          */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
        {/* Sidebar Trigger (Collapse on Desktop / Drawer on Mobile) */}
        <SidebarTrigger className="h-9 w-9 inline-flex items-center justify-center text-muted-foreground hover:text-foreground rounded-lg border border-border/80 bg-card/60 transition-colors duration-150 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 [&_svg]:size-4" />

        {/* Fallback Mobile Drawer Trigger Button if outside SidebarProvider */}
        {onOpenMobile && (
          <button
            onClick={onOpenMobile}
            className="md:hidden h-9 w-9 inline-flex items-center justify-center text-muted-foreground hover:text-foreground rounded-lg border border-border/80 bg-card/60 transition-colors duration-150 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 in-[[data-slot=sidebar-wrapper]]:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        {/* Global Brand Identity & Portal Identifier */}
        <Link
          href={resolvedHomeHref}
          className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-lg"
          aria-label={`Skill Bridge ${resolvedPortalLabel} Portal Home`}
        >
          {/* Canonical Skill Bridge Icon Box */}
          <div className="w-8 h-8 rounded-lg font-heading font-bold text-sm flex items-center justify-center bg-foreground text-background shadow-xs shrink-0">
            S
          </div>

          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-base tracking-tight text-foreground whitespace-nowrap">
              SKILL BRIDGE
            </span>

            {/* Portal Badge */}
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border uppercase font-semibold border-border/80 bg-muted/60 text-muted-foreground whitespace-nowrap">
              {resolvedPortalLabel}
            </span>
          </div>
        </Link>

        {/* Contextual Breadcrumb (If Provided) */}
        {breadcrumb && (
          <nav
            aria-label="Breadcrumbs"
            className="hidden sm:flex items-center text-xs sm:text-sm truncate pl-3 border-l border-border/60 ml-2.5"
          >
            {breadcrumb.section && (
              <>
                <span className="text-muted-foreground font-normal hidden lg:inline truncate">
                  {breadcrumb.section}
                </span>
                <span
                  className="text-muted-foreground/40 font-light mx-1.5 hidden lg:inline"
                  aria-hidden="true"
                >
                  /
                </span>
              </>
            )}
            <span className="font-semibold text-foreground tracking-tight truncate max-w-[240px]">
              {breadcrumb.title}
            </span>
          </nav>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* RIGHT: Standardized Global Controls                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Optional Extra Portal Controls Slot */}
        {children}

        {/* Notifications Popover */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border/80 text-muted-foreground hover:text-foreground transition-colors duration-150 relative bg-card/60 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            aria-label="View notifications"
            aria-expanded={showNotifications}
          >
            <Bell className="w-4 h-4" />
            {notificationsCount > 0 && (
              <span
                className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary"
                aria-hidden="true"
              />
            )}
          </button>

          {showNotifications && (
            <div
              className="absolute right-0 mt-2 w-72 p-3.5 rounded-xl border border-border/80 bg-card shadow-md z-50 text-xs space-y-2 animate-in fade-in-0 duration-150 motion-reduce:animate-none text-card-foreground"
              role="dialog"
              aria-label="Notifications List"
            >
              <div className="flex items-center justify-between pb-2 border-b border-border/60">
                <span className="font-heading font-semibold text-foreground">Notifications</span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {notificationsCount} {notificationsCount === 1 ? "unread" : "unreads"}
                </span>
              </div>
              <div className="space-y-1.5 max-h-60 overflow-y-auto">
                {itemsToRender.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-2.5 rounded-lg border border-border/60 bg-muted/30 space-y-1"
                  >
                    <p className="font-medium text-foreground text-[11px] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      {notif.title}
                    </p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      {notif.message}
                    </p>
                    {notif.time && (
                      <p className="text-[10px] text-muted-foreground/60 pt-0.5 font-mono">
                        {notif.time}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle (Standardized 36x36px) */}
        <ThemeToggle className="h-9 w-9 rounded-lg border border-border/80 bg-card/60 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 [&_svg]:size-4" />

        {/* User Account / Profile Identifier */}
        {activeUser && (
          <div className="hidden sm:inline-flex items-center gap-2.5 h-9 px-3 rounded-full border border-border/80 bg-muted/40 text-xs select-none shadow-2xs">
            {activeUser.avatarUrl ? (
              <Avatar className="size-6 rounded-full shrink-0 border border-border/60">
                <AvatarImage src={activeUser.avatarUrl} alt={activeUser.name} />
                <AvatarFallback className="text-[10px] font-semibold">
                  {activeUser.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <User className="w-4 h-4 text-muted-foreground shrink-0" />
            )}
            <span className="font-medium text-foreground truncate max-w-[140px]">
              {activeUser.name}
            </span>
            {activeUser.meta && (
              <span className="text-muted-foreground font-normal text-[11px] font-mono shrink-0 uppercase">
                {activeUser.meta}
              </span>
            )}
          </div>
        )}

        {/* Unified Sign Out Action Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="h-9 gap-2 px-3.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border/80 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-full"
          aria-label="Sign out of Skill Bridge"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </header>
  );
}
