"use client";

import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Lock,
  ArrowLeft,
  Compass,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

interface StudentPlaceholderViewProps {
  title: string;
  section: string;
  workflowStep?: number;
  description: string;
  unlockPrerequisite: string;
  upcomingFeatures: string[];
}

export function StudentPlaceholderView({
  title,
  section,
  workflowStep,
  description,
  unlockPrerequisite,
  upcomingFeatures,
}: StudentPlaceholderViewProps) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb / Status Badge */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-muted/30 text-xs text-muted-foreground font-medium">
          <Clock className="w-3.5 h-3.5 text-foreground" />
          <span>
            {workflowStep ? `Stage ${workflowStep} of 7 • Scheduled Milestone` : section}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h1>

        <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>

      {/* Prerequisite & Scope Card */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-base font-bold text-foreground">
                Workflow Prerequisite Status
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Skill Bridge follows a sequential competency pipeline to ensure verified outcomes.
              </CardDescription>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border border-border bg-muted/30 text-muted-foreground">
              Phase 2 Roadmap
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 text-xs">
          <div className="p-3.5 rounded-lg border border-border bg-muted/20 flex items-start gap-3">
            <Lock className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Activation Requirement</p>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                {unlockPrerequisite}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
              Planned Capabilities for this Module:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {upcomingFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-md border border-border bg-card flex items-center gap-2 text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 shrink-0" />
                  <span className="text-[11px] leading-tight">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[11px] text-muted-foreground font-mono">
              Return to current workflow milestone to advance.
            </p>
            <Link
              href="/student/interest-finder"
              className="inline-flex items-center justify-center rounded-md text-xs font-semibold h-7 px-2.5 bg-foreground text-background hover:opacity-90 transition-opacity gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              Go to Interest Finder
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
