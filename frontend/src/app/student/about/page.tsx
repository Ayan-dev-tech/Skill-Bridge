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
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { Compass, ArrowRight, Building2, Users, Briefcase, GraduationCap } from "lucide-react";

export default function AboutSkillBridgePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200 motion-reduce:animate-none">
      {/* Page Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono border border-border bg-muted/30 text-muted-foreground uppercase">
          Institutional Overview
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          About Skill Bridge
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
          The structured competency and opportunity framework connecting higher education with corporate recruitment.
        </p>
      </div>

      {/* Primary Narrative Card */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground">
            The Core Concept
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Bridging the gap between general academic intent and specific industry readiness.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-xs leading-relaxed text-muted-foreground">
          <p className="text-foreground text-sm font-medium leading-relaxed">
            Skill Bridge is built around a simple idea: students often know the broad field
            they are interested in, but may not know which specific area within that field is
            right for them.
          </p>

          <p>
            Skill Bridge helps students discover those interests through guided questioning,
            evaluate their knowledge, understand their skill gaps, improve through relevant
            learning and mentoring opportunities, build a stronger professional profile, and
            connect with suitable internships and job opportunities.
          </p>

          <p>
            The platform creates a structured journey between students, educators, campuses,
            and industry so that skills and opportunities can be connected more effectively.
          </p>

          <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-md border border-border bg-muted/20 space-y-1">
              <span className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                <Users className="w-3.5 h-3.5" /> For Students
              </span>
              <p className="text-[11px] text-muted-foreground">
                Discovers specific niches and benchmarks verified competency for real hiring roles.
              </p>
            </div>

            <div className="p-3 rounded-md border border-border bg-muted/20 space-y-1">
              <span className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                <GraduationCap className="w-3.5 h-3.5" /> For Educators
              </span>
              <p className="text-[11px] text-muted-foreground">
                Provides actionable diagnostic analytics to align department coursework with market demand.
              </p>
            </div>

            <div className="p-3 rounded-md border border-border bg-muted/20 space-y-1">
              <span className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                <Briefcase className="w-3.5 h-3.5" /> For Industry
              </span>
              <p className="text-[11px] text-muted-foreground">
                Verifies genuine student capability beyond static resume claims with transparent audit trails.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-[11px] font-mono text-muted-foreground">
              Begin your journey at Milestone 1.
            </span>
            <Link
              href="/student/interest-finder"
              className={cn(buttonVariants({ size: "sm" }), "text-xs gap-1.5")}
            >
              <Compass className="w-3.5 h-3.5" />
              Launch Interest Finder
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
