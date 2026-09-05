"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Compass,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Layers,
  Cpu,
  Cloud,
  Globe,
  Shield,
  Code2,
  CheckCircle2,
  ListOrdered,
  ChevronRight,
} from "lucide-react";
import { interestDomains, InterestDomain } from "@/lib/student-data";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const domainIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "ai-ml": Cpu,
  cloud: Cloud,
  web: Globe,
  security: Shield,
  software: Code2,
};

export function InterestFinderEntry() {
  const [selectedDomain, setSelectedDomain] = React.useState<InterestDomain | null>(null);
  const [showStartModal, setShowStartModal] = React.useState(false);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Editorial Header / Primary Proposition */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-muted/30 text-xs text-muted-foreground font-medium">
          <Compass className="w-3.5 h-3.5 text-foreground" />
          <span>Stage 1: Foundational Exploration</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Let&apos;s discover what part of your chosen field interests you.
        </h1>

        <p className="text-xs md:text-sm text-muted-foreground max-w-3xl leading-relaxed">
          You might already know you enjoy a broad domain such as Software, Cloud, Web, Security,
          or AI/ML—but engineering encompasses dozens of distinct specializations. Interest
          Finder does not pick a career for you; instead, it presents real-world engineering
          scenarios to illuminate the exact problems you find most engaging.
        </p>
      </div>

      {/* How It Works Progression Bar */}
      <Card className="border-border bg-muted/10">
        <CardContent className="p-4 md:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <ListOrdered className="w-3.5 h-3.5" /> How Interest Finder Works
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-mono text-[11px] font-bold text-foreground">01 / Consider Domain</span>
              <p className="font-semibold text-foreground">Choose a General Area</p>
              <p className="text-muted-foreground text-[11px] leading-normal">
                Identify a broad field you are curious about or already studying.
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[11px] font-bold text-foreground">02 / Scenario Inquiry</span>
              <p className="font-semibold text-foreground">Contextual Questions</p>
              <p className="text-muted-foreground text-[11px] leading-normal">
                Answer realistic engineering questions comparing practical problem preferences.
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[11px] font-bold text-foreground">03 / Sub-Discipline Match</span>
              <p className="font-semibold text-foreground">Discover Specific Focus</p>
              <p className="text-muted-foreground text-[11px] leading-normal">
                Identify specific sub-fields (e.g., MLOps, Application Security, or SRE).
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[11px] font-bold text-foreground">04 / Pathway Next Step</span>
              <p className="font-semibold text-foreground">Knowledge Testing</p>
              <p className="text-muted-foreground text-[11px] leading-normal">
                Proceed with clarity to benchmark your skills in that specific direction.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* The 5 Broad Technical Domains */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <div>
            <h2 className="text-base font-bold tracking-tight text-foreground">
              Explore Broad Technical Domains
            </h2>
            <p className="text-xs text-muted-foreground">
              Select any domain below to review its sub-disciplines and the types of problems examined during exploration.
            </p>
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">
            5 Core Engineering Disciplines
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {interestDomains.map((domain) => {
            const Icon = domainIcons[domain.id] || Layers;
            return (
              <Card
                key={domain.id}
                className="border-border hover:border-foreground/60 transition-all duration-150 motion-reduce:transition-none flex flex-col justify-between cursor-pointer group active:scale-[0.99]"
                onClick={() => setSelectedDomain(domain)}
              >
                <CardHeader className="p-4 pb-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1 group-hover:text-foreground">
                      Details <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold text-foreground">
                      {domain.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {domain.tagline}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-2 space-y-3 text-xs">
                  <p className="text-muted-foreground text-[11px] line-clamp-2 leading-relaxed">
                    {domain.description}
                  </p>

                  <div className="pt-2 border-t border-border space-y-1">
                    <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                      Includes Specializations:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {domain.subDisciplines.slice(0, 2).map((sub, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded text-[10px] border border-border bg-muted/30 text-muted-foreground"
                        >
                          {sub}
                        </span>
                      ))}
                      {domain.subDisciplines.length > 2 && (
                        <span className="text-[10px] text-muted-foreground font-mono self-center">
                          +{domain.subDisciplines.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Start Exploration Action Banner */}
      <Card className="border-border bg-card">
        <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-foreground">
              Ready to begin discovering your technical niche?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
              The Interest Finder takes approximately 6–8 minutes and asks no memorization questions—only situational preference scenarios.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Button
              onClick={() => setShowStartModal(true)}
              className="text-xs font-semibold gap-1.5 transition-all duration-150 motion-reduce:transition-none active:scale-[0.98]"
            >
              Begin Interest Exploration
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Domain Details Slideout Sheet */}
      <Sheet open={!!selectedDomain} onOpenChange={(open: boolean) => !open && setSelectedDomain(null)}>
        <SheetContent className="sm:max-w-lg w-full p-6 overflow-y-auto space-y-6">
          {selectedDomain && (
            <>
              <SheetHeader className="space-y-1 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-border bg-muted/40 w-fit">
                  Technical Domain Dossier
                </span>
                <SheetTitle className="text-xl font-bold">{selectedDomain.name}</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  {selectedDomain.tagline}
                </SheetDescription>
              </SheetHeader>

              <div className="p-4 rounded-lg border border-border bg-muted/20 text-xs space-y-1.5">
                <p className="font-semibold text-foreground uppercase tracking-wider">
                  Field Overview
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedDomain.description}
                </p>
              </div>

              {/* Sub-disciplines */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Sub-Disciplines Uncovered in this Track
                </p>
                <div className="space-y-1.5">
                  {selectedDomain.subDisciplines.map((sub, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-md border border-border bg-card flex items-center gap-2 text-xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                      <span className="font-medium text-foreground">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Exploratory Scenarios */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Sample Scenarios Considered
                </p>
                <div className="space-y-2">
                  {selectedDomain.keyQuestionsExamined.map((q, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-md border border-border bg-muted/20 text-xs text-muted-foreground space-y-1"
                    >
                      <span className="font-mono text-[10px] font-semibold text-foreground">
                        Scenario #{i + 1}
                      </span>
                      <p className="text-[11px] italic leading-normal text-foreground/90">
                        &ldquo;{q}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDomain(null)}
                  className="text-xs"
                >
                  Close Dossier
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedDomain(null);
                    setShowStartModal(true);
                  }}
                  className="text-xs gap-1"
                >
                  Start with this Domain
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Start Confirmation Modal / Readiness Callout */}
      <Sheet open={showStartModal} onOpenChange={(open: boolean) => setShowStartModal(open)}>
        <SheetContent className="sm:max-w-md w-full p-6 space-y-6">
          <SheetHeader className="space-y-1 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-border bg-muted/40 w-fit">
              Phase 1 Verification
            </span>
            <SheetTitle className="text-lg font-bold">
              Interest Finder Foundation Active
            </SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground">
              You are ready to begin the Interest Finder questionnaire.
            </SheetDescription>
          </SheetHeader>

          <div className="p-4 rounded-lg border border-border bg-muted/20 text-xs space-y-2">
            <p className="font-semibold text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Student Shell & Entry Initialized
            </p>
            <p className="text-muted-foreground leading-relaxed text-[11px]">
              The post-login Student UI foundation and Interest Finder entry experience have been established.
              The interactive question engine for Phase 2 will plug directly into this entry point.
            </p>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground text-xs uppercase tracking-wider">
              Exploration Rules:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>No right or wrong answers; choose what naturally interests you.</li>
              <li>Takes under 10 minutes to complete.</li>
              <li>Results can be refined at any point in your academic cycle.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <Button
              size="sm"
              onClick={() => setShowStartModal(false)}
              className="text-xs"
            >
              Acknowledged
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
