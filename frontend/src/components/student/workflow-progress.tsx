"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { studentWorkflowStages, WorkflowStage } from "@/lib/student-data";
import { Check, Compass, ChevronRight } from "lucide-react";

interface WorkflowProgressProps {
  currentStageId?: number;
  className?: string;
}

export function WorkflowProgress({
  currentStageId = 1,
  className = "",
}: WorkflowProgressProps) {
  const pathname = usePathname();

  // Identify active stage
  const activeStageIndex = React.useMemo(() => {
    const idx = studentWorkflowStages.findIndex((s) => pathname.startsWith(s.route));
    if (idx !== -1) return idx;
    const byId = studentWorkflowStages.findIndex((s) => s.id === currentStageId);
    return byId !== -1 ? byId : 0;
  }, [pathname, currentStageId]);

  const activeStage = studentWorkflowStages[activeStageIndex];
  const progressPercent = Math.round(((activeStageIndex + 1) / studentWorkflowStages.length) * 100);

  return (
    <section
      aria-label="Skill Bridge Student Journey Pipeline"
      className={`w-full py-4 border-b border-border/80 select-none ${className}`}
    >
      {/* Pipeline Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-5">
        <div className="space-y-0.5">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Skill Bridge Student Journey
          </p>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-foreground tracking-tight">
              Stage {activeStage.id} of {studentWorkflowStages.length}: {activeStage.name}
            </h2>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-medium border border-border bg-muted/40 text-foreground">
              Current Milestone
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
          <span>{activeStage.shortDescription}</span>
        </div>
      </div>

      {/* Desktop / Tablet Full-Width Edge-to-Edge Pipeline (>= 768px) */}
      <div className="hidden md:block w-full">
        <div className="relative w-full min-h-[72px]">
          {/* Continuous Connecting Line Background: passes through exact center (14px) of Node 1 to Node 7 */}
          <div
            className="absolute top-[13px] left-3.5 right-3.5 h-[2px] bg-border z-0"
            aria-hidden="true"
          />

          {/* Continuous Completed / Active Progress Line */}
          {activeStageIndex > 0 && (
            <div
              className="absolute top-[13px] left-3.5 h-[2px] bg-foreground z-0 transition-all duration-300 ease-out motion-reduce:transition-none"
              style={{
                width: `calc(${
                  (activeStageIndex / (studentWorkflowStages.length - 1)) * 100
                }% - ${activeStageIndex === studentWorkflowStages.length - 1 ? "0px" : "14px"})`,
              }}
              aria-hidden="true"
            />
          )}

          {/* Nodes Row: Spans from very left edge to very right edge */}
          <div className="relative z-10 flex justify-between items-start w-full">
            {studentWorkflowStages.map((stage, idx) => {
              const isCurrent = idx === activeStageIndex;
              const isPast = idx < activeStageIndex;

              // Node alignment: first node left-aligned, last node right-aligned, middle nodes centered
              const labelPositionClass =
                idx === 0
                  ? "left-0 text-left items-start"
                  : idx === studentWorkflowStages.length - 1
                  ? "right-0 text-right items-end"
                  : "left-1/2 -translate-x-1/2 text-center items-center";

              return (
                <div
                  key={stage.id}
                  className="relative flex flex-col items-center"
                  style={{ width: "28px" }}
                >
                  {/* Milestone Node */}
                  <Link
                    href={stage.route}
                    aria-current={isCurrent ? "step" : undefined}
                    className={`w-7 h-7 rounded-md flex items-center justify-center font-mono text-xs font-semibold transition-all duration-150 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isCurrent
                        ? "bg-foreground text-background shadow-xs ring-4 ring-foreground/15 font-bold"
                        : isPast
                        ? "bg-muted text-foreground border border-border hover:bg-muted/80"
                        : "bg-background text-muted-foreground border-2 border-border hover:border-foreground/40 hover:text-foreground"
                    }`}
                    title={`Stage ${stage.id}: ${stage.name}`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5" /> : stage.id}
                  </Link>

                  {/* Milestone Label (Centered under node without breaking edge bounds) */}
                  <div
                    className={`absolute top-9 w-24 flex flex-col ${labelPositionClass} pointer-events-none`}
                  >
                    <span
                      className={`text-[11px] leading-tight transition-colors line-clamp-2 ${
                        isCurrent
                          ? "font-semibold text-foreground"
                          : isPast
                          ? "font-medium text-foreground/80"
                          : "font-normal text-muted-foreground"
                      }`}
                    >
                      {stage.name}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">
                        Active
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile / Compact Responsive Layout (< 768px) */}
      <div className="md:hidden space-y-3">
        {/* Compact Progress Bar */}
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-foreground rounded-full transition-all duration-300 motion-reduce:transition-none"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Horizontal Swipeable Milestone Track */}
        <div className="overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            {studentWorkflowStages.map((stage, idx) => {
              const isCurrent = idx === activeStageIndex;
              const isPast = idx < activeStageIndex;

              return (
                <Link
                  key={stage.id}
                  href={stage.route}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                    isCurrent
                      ? "border-foreground bg-foreground text-background font-semibold"
                      : isPast
                      ? "border-border bg-muted/30 text-foreground"
                      : "border-border/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="font-mono text-[10px] w-4 text-center">
                    {isPast ? "✓" : stage.id}
                  </span>
                  <span>{stage.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
