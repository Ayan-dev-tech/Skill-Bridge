"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileQuestion,
  X,
  ShieldCheck,
  Briefcase,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type IndustryViewType = "dashboard" | "profile" | "hiring" | "students" | "question-bank";

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
  mobileOpen = false,
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

  const content = (
    <div className="flex flex-col h-full">
      {/* Sidebar Header / Corporate Badge */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center border border-border">
            <Briefcase className="w-4 h-4 text-foreground" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-semibold tracking-tight text-foreground leading-none">
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

        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-md hover:bg-muted text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
        {sections.map((sec, idx) => (
          <div key={idx} className="space-y-1">
            {sec.title && (
              <p className="px-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {sec.title}
              </p>
            )}
            <nav className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const active = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition-colors text-left",
                      active
                        ? "bg-muted text-foreground font-semibold"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Scope Footer Badge */}
      <div className="p-3 border-t border-border bg-muted/20">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="truncate">Skill Bridge Enterprise Access</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-56 border-r border-border bg-card/40 shrink-0 h-[calc(100vh-57px)] sticky top-[57px]">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative w-64 max-w-[80vw] bg-card border-r border-border h-full shadow-lg z-10 flex flex-col">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
