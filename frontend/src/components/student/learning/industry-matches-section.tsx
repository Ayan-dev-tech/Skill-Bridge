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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Building2,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import type { IndustryRoleMatchResult, IndustryMatchLevel } from "@/lib/ayush/types";

interface IndustryMatchesSectionProps {
  matches: IndustryRoleMatchResult[];
  loading?: boolean;
  onStartIntervention?: (interventionId: string) => void;
}

export function IndustryMatchesSection({
  matches,
  loading = false,
  onStartIntervention,
}: IndustryMatchesSectionProps) {
  const [expandedMatchId, setExpandedMatchId] = React.useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedMatchId((prev) => (prev === id ? null : id));
  };

  const getMatchBadge = (level: IndustryMatchLevel, isCriticalMissing: boolean) => {
    switch (level) {
      case "HIGH MATCH":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 px-2.5 py-0.5 text-xs font-semibold gap-1">
            <CheckCircle2 className="w-3 h-3" />
            HIGH MATCH
          </Badge>
        );
      case "STRONG MATCH":
        return (
          <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30 px-2.5 py-0.5 text-xs font-semibold gap-1">
            <TrendingUp className="w-3 h-3" />
            {isCriticalMissing ? "STRONG MATCH (GAP PENDING)" : "STRONG MATCH"}
          </Badge>
        );
      case "PARTIAL MATCH":
        return (
          <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 px-2.5 py-0.5 text-xs font-semibold gap-1">
            <Clock className="w-3 h-3" />
            PARTIAL MATCH
          </Badge>
        );
      case "LOW MATCH":
      default:
        return (
          <Badge className="bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30 px-2.5 py-0.5 text-xs font-semibold gap-1">
            <AlertTriangle className="w-3 h-3" />
            LOW MATCH
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <Card className="border-border bg-card shadow-xs animate-pulse p-6 space-y-4">
        <div className="h-6 w-56 bg-muted rounded" />
        <div className="h-4 w-80 bg-muted/60 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="h-40 bg-muted/40 rounded-xl" />
          <div className="h-40 bg-muted/40 rounded-xl" />
        </div>
      </Card>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <Card className="border-border bg-card p-6 text-center space-y-2">
        <Briefcase className="w-8 h-8 text-muted-foreground mx-auto" />
        <CardTitle className="text-sm font-bold text-foreground">No Industry Demands Active</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Industry role demands will appear here as employers post hiring requirements.
        </CardDescription>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <span>AYUSH Industry Role Matches</span>
            </h2>
            <Badge variant="outline" className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
              Verified Matching
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Employer-calibrated role matches computed strictly from faculty-verified competencies and real demand signals.
          </p>
        </div>
        <div className="text-xs text-muted-foreground font-mono self-start sm:self-auto">
          {matches.length} Industry Roles Ranked
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 gap-4">
        {matches.map((m) => {
          const isExpanded = expandedMatchId === m.demandId;
          const mainGap = m.missingCompetencies.length > 0 ? m.missingCompetencies[0] : null;

          return (
            <Card
              key={m.demandId}
              className={`border transition-all overflow-hidden bg-card ${
                m.matchScore >= 80
                  ? "border-emerald-500/40 shadow-xs"
                  : m.matchScore >= 65
                  ? "border-blue-500/30"
                  : "border-border"
              }`}
            >
              {/* Card Main Header */}
              <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {m.organization}
                    </span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <Badge variant="outline" className="text-[10px] uppercase font-mono">
                      {m.demandStatus}
                    </Badge>
                  </div>

                  <div className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    <span>{m.roleTitle}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground pt-0.5">
                    <span>
                      Critical Requirements:{" "}
                      <strong className="text-foreground">
                        {m.criticalRequirementsMet} of {m.criticalRequirementsTotal} met
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      Canonical Readiness:{" "}
                      <strong className="text-foreground font-mono">{m.roleReadinessScore}%</strong>
                    </span>
                  </div>

                  {/* Main Gap Pill */}
                  {mainGap && (
                    <div className="text-[11px] text-muted-foreground pt-1 flex items-center gap-1.5">
                      <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Main gap:
                      </span>
                      <span className="text-foreground font-medium">{mainGap.competencyName}</span>
                      <span>({mainGap.verifiedRating.toFixed(1)} / {mainGap.requiredRating.toFixed(1)})</span>
                    </div>
                  )}
                </div>

                {/* Match Score Gauge & Quick Actions */}
                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-border/60">
                  <div className="text-right">
                    <div className="text-2xl font-black text-foreground tracking-tight">
                      {m.matchScore}%
                    </div>
                    <div>{getMatchBadge(m.matchLevel, m.isCriticalMissing)}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleExpand(m.demandId)}
                      className="text-xs h-8 px-3 gap-1"
                    >
                      <span>{isExpanded ? "Hide Details" : "View Match"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </Button>

                    {m.nextBestAction && onStartIntervention && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => onStartIntervention(m.nextBestAction!.interventionId)}
                        className="text-xs h-8 px-3 gap-1 bg-primary text-primary-foreground shadow-xs"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Develop Skill</span>
                      </Button>
                    )}

                    <Button asChild size="sm" variant="ghost" className="text-xs h-8 px-2">
                      <Link href="/student/opportunities">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="px-4 sm:px-5 pb-1">
                <Progress value={m.matchScore} className="h-1.5" />
              </div>

              {/* Expandable Explanation Drawer */}
              {isExpanded && (
                <div className="p-4 sm:p-5 border-t border-border/60 bg-muted/20 space-y-4">
                  <div className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Match Explanation & Competency Breakdown
                  </div>

                  {/* Critical Requirement Alert if missing */}
                  {m.isCriticalMissing && (
                    <Alert className="border-amber-500/30 bg-amber-500/10 text-foreground py-2 text-xs">
                      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <div className="ml-2">
                        <AlertTitle className="text-xs font-bold text-amber-700 dark:text-amber-300">
                          Critical Requirement Gate
                        </AlertTitle>
                        <AlertDescription className="text-[11px] text-amber-700/90 dark:text-amber-300/90 mt-0.5">
                          This role is capped at <strong>STRONG MATCH</strong> because one or more essential competency requirements are not yet satisfied at the required standard.
                        </AlertDescription>
                      </div>
                    </Alert>
                  )}

                  {/* 2-column: Matched vs Remaining Gaps */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Matched Competencies */}
                    <div className="p-3 rounded-lg bg-background border border-border/80 space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Matching Verified Competencies ({m.matchedCompetencies.length})</span>
                      </div>
                      {m.matchedCompetencies.length === 0 ? (
                        <p className="text-muted-foreground italic text-[11px] py-1">
                          No competencies meet the required target rating yet.
                        </p>
                      ) : (
                        <div className="space-y-1.5">
                          {m.matchedCompetencies.map((c) => (
                            <div
                              key={c.competencyId}
                              className="p-2 rounded bg-muted/30 border border-border/50 flex items-center justify-between text-[11px]"
                            >
                              <div className="space-y-0.5">
                                <div className="font-medium text-foreground">{c.competencyName}</div>
                                <div className="text-muted-foreground text-[10px]">
                                  Verified: <strong className="text-emerald-600">{c.verifiedRating.toFixed(1)}</strong> / {c.requiredRating.toFixed(1)} required
                                </div>
                              </div>
                              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                                +{c.matchContribution}%
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Remaining Gaps */}
                    <div className="p-3 rounded-lg bg-background border border-border/80 space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <span>Remaining Skill Gaps ({m.missingCompetencies.length})</span>
                      </div>
                      {m.missingCompetencies.length === 0 ? (
                        <p className="text-emerald-600 dark:text-emerald-400 font-medium text-[11px] py-1">
                          ✓ All competency requirements met for this industry role!
                        </p>
                      ) : (
                        <div className="space-y-1.5">
                          {m.missingCompetencies.map((c) => (
                            <div
                              key={c.competencyId}
                              className={`p-2 rounded border flex items-center justify-between text-[11px] ${
                                c.isCritical ? "border-amber-500/40 bg-amber-500/[0.03]" : "border-border/50 bg-muted/30"
                              }`}
                            >
                              <div className="space-y-0.5">
                                <div className="font-medium text-foreground flex items-center gap-1.5">
                                  {c.isCritical && (
                                    <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 border-amber-500/50 text-amber-600">
                                      Critical
                                    </Badge>
                                  )}
                                  <span>{c.competencyName}</span>
                                </div>
                                <div className="text-muted-foreground text-[10px]">
                                  Current: {c.verifiedRating.toFixed(1)} → Required: <strong className="text-foreground">{c.requiredRating.toFixed(1)}</strong>
                                </div>
                              </div>
                              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">
                                Gap {c.gap.toFixed(1)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Next Best Action Card */}
                  {m.nextBestAction && (
                    <div className="p-3 rounded-lg border border-primary/30 bg-primary/[0.03] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-0.5">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-primary flex items-center gap-1 font-semibold">
                          <Zap className="w-3.5 h-3.5" />
                          Recommended Next Developmental Action
                        </div>
                        <div className="font-bold text-foreground">{m.nextBestAction.title}</div>
                        <div className="text-[11px] text-muted-foreground">
                          Directly bridges gap in <strong>{m.nextBestAction.competencyName}</strong> (Gap: {m.nextBestAction.gap.toFixed(1)}) • Est. Duration: {m.nextBestAction.estimatedDuration}
                        </div>
                      </div>

                      {onStartIntervention && (
                        <Button
                          size="sm"
                          onClick={() => onStartIntervention(m.nextBestAction!.interventionId)}
                          className="text-xs h-7 gap-1 shrink-0"
                        >
                          <span>Start Intervention</span>
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
