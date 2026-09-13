"use client";

import * as React from "react";
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
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { AyushRoleReadiness, AyushReadinessLevel } from "@/lib/ayush/types";

interface RoleReadinessCardProps {
  readiness: AyushRoleReadiness | null;
  loading?: boolean;
  onStartIntervention?: (interventionId: string) => void;
}

export function RoleReadinessCard({
  readiness,
  loading = false,
  onStartIntervention,
}: RoleReadinessCardProps) {
  const [showTable, setShowTable] = React.useState(false);

  if (loading) {
    return (
      <Card className="border-border bg-card shadow-xs animate-pulse">
        <CardHeader className="pb-4">
          <div className="h-6 w-48 bg-muted rounded mb-2" />
          <div className="h-4 w-72 bg-muted/60 rounded" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-24 bg-muted/40 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-36 bg-muted/30 rounded-lg" />
            <div className="h-36 bg-muted/30 rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!readiness) {
    return null;
  }

  const getStatusBadge = (level: AyushReadinessLevel, isBlocked: boolean) => {
    switch (level) {
      case "READY":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 px-3 py-1 text-xs font-semibold gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            READY
          </Badge>
        );
      case "NEAR READY":
        return (
          <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30 px-3 py-1 text-xs font-semibold gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            {isBlocked ? "NEAR READY (CRITICAL BLOCKED)" : "NEAR READY"}
          </Badge>
        );
      case "DEVELOPING":
        return (
          <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 px-3 py-1 text-xs font-semibold gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            DEVELOPING
          </Badge>
        );
      case "NOT READY":
      default:
        return (
          <Badge className="bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30 px-3 py-1 text-xs font-semibold gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            NOT READY
          </Badge>
        );
    }
  };

  return (
    <Card className="border-border bg-card shadow-xs overflow-hidden">
      {/* Header with Title & Overall Gauge */}
      <CardHeader className="border-b border-border/50 pb-5 bg-muted/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                Authoritative Role Readiness
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                Faculty-Verified Basis
              </span>
            </div>
            <CardTitle className="text-xl md:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <span>{readiness.roleName}</span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Deterministic readiness computed from verified competencies, target levels, and transparent weighted contributions.
            </CardDescription>
          </div>

          <div className="flex items-center gap-4 bg-background/80 border border-border/80 px-4 py-3 rounded-xl shadow-xs">
            <div className="text-right">
              <div className="text-[10px] font-mono text-muted-foreground uppercase">Readiness Score</div>
              <div className="text-2xl font-black tracking-tight text-foreground">
                {readiness.overallScore}%
              </div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>{getStatusBadge(readiness.readinessLevel, readiness.isCriticalBlocked)}</div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="pt-3 space-y-1">
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>Overall Attainment</span>
            <span className="font-mono font-medium">{readiness.overallScore}/100</span>
          </div>
          <Progress value={readiness.overallScore} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-6">
        {/* CRITICAL COMPETENCY BLOCKER ALERT */}
        {readiness.isCriticalBlocked && (
          <Alert className="border-amber-500/30 bg-amber-500/10 text-foreground py-3">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div className="ml-2">
              <AlertTitle className="text-xs font-bold text-amber-700 dark:text-amber-300">
                Critical Competency Gate Active
              </AlertTitle>
              <AlertDescription className="text-xs text-amber-700/90 dark:text-amber-300/90 mt-1 space-y-1">
                <p>
                  This role cannot appear <strong>READY</strong> until critical competencies reach the minimum threshold (≥ target - 0.5):
                </p>
                <ul className="list-disc list-inside text-[11px] font-medium space-y-0.5">
                  {readiness.blockingCompetencies.map((b) => (
                    <li key={b.competencyId}>
                      <strong>{b.competencyName}</strong>: {b.verifiedRating.toFixed(1)}/5 verified (target: {b.targetRating}/5)
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </div>
          </Alert>
        )}

        {/* 2-COLUMN BREAKDOWN: Strongest vs Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Strongest Verified Competencies */}
          <div className="space-y-3 p-4 rounded-xl bg-muted/20 border border-border/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Strongest Verified Competencies
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">
                {readiness.strongestCompetencies.length} verified
              </span>
            </div>

            {readiness.strongestCompetencies.length === 0 ? (
              <p className="text-xs text-muted-foreground italic py-2">
                No competencies verified yet. Complete development interventions to establish faculty-verified ratings.
              </p>
            ) : (
              <div className="space-y-2">
                {readiness.strongestCompetencies.map((c) => (
                  <div
                    key={c.competencyId}
                    className="p-2.5 rounded-lg bg-background border border-border/70 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5 pr-2">
                      <div className="font-medium text-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="line-clamp-1">{c.competencyName}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                        <span>Verified: <strong className="text-foreground">{c.verifiedRating.toFixed(1)}</strong>/5</span>
                        <span>•</span>
                        <span>Target: {c.targetRating}/5</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                        +{c.readinessContribution}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Remaining Competency Gaps */}
          <div className="space-y-3 p-4 rounded-xl bg-muted/20 border border-border/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Remaining Competency Gaps
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">
                {readiness.remainingGaps.length} gaps
              </span>
            </div>

            {readiness.remainingGaps.length === 0 ? (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium py-2">
                ✓ All mapped competencies meet or exceed targets for this role!
              </p>
            ) : (
              <div className="space-y-2">
                {readiness.remainingGaps.slice(0, 4).map((c) => (
                  <div
                    key={c.competencyId}
                    className={`p-2.5 rounded-lg bg-background border text-xs flex items-center justify-between ${
                      c.isCritical ? "border-amber-500/40 bg-amber-500/[0.02]" : "border-border/70"
                    }`}
                  >
                    <div className="space-y-0.5 pr-2">
                      <div className="font-medium text-foreground flex items-center gap-1.5">
                        {c.isCritical && (
                          <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 border-amber-500/50 text-amber-600 dark:text-amber-400">
                            Critical
                          </Badge>
                        )}
                        <span className="line-clamp-1">{c.competencyName}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                        <span>{c.verifiedRating.toFixed(1)}/5 verified</span>
                        <span>→</span>
                        <span className="font-semibold text-foreground">{c.targetRating}/5 target</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">
                        Δ {c.gap.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 2-COLUMN: Latest Improvement & Next Best Action */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* Latest Verified Improvement */}
          <div className="p-4 rounded-xl border border-border/80 bg-background flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                Latest Verified Improvement
              </span>
              {readiness.latestImprovement ? (
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-foreground">
                    {readiness.latestImprovement.competencyName}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <span className="text-muted-foreground font-mono">
                      {readiness.latestImprovement.previousRating.toFixed(1)}
                    </span>
                    <span>→</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                      {readiness.latestImprovement.facultyFinalRating.toFixed(1)}
                    </span>
                    <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      +{readiness.latestImprovement.improvementDelta.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Verified on {new Date(readiness.latestImprovement.verifiedAt).toLocaleDateString()}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  No verified progression history yet.
                </p>
              )}
            </div>
            <div className="mt-3 pt-2 border-t border-border/50 text-[10px] text-muted-foreground flex items-center justify-between">
              <span>Verified Interventions</span>
              <strong className="text-foreground font-mono">{readiness.completedInterventionsCount} completed</strong>
            </div>
          </div>

          {/* Next Best Action */}
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/[0.03] flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-primary flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                Recommended Next Action
              </span>
              {readiness.nextBestInterventions.length > 0 ? (
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-foreground">
                    {readiness.nextBestInterventions[0].title}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Targets <strong>{readiness.nextBestInterventions[0].competencyName}</strong> (Gap: {readiness.nextBestInterventions[0].gap.toFixed(1)})
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Estimated duration: {readiness.nextBestInterventions[0].estimatedDuration}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  No pending intervention recommended for this role.
                </p>
              )}
            </div>

            {readiness.nextBestInterventions.length > 0 && onStartIntervention && (
              <div className="mt-3 pt-2 border-t border-primary/10 flex justify-end">
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => onStartIntervention(readiness.nextBestInterventions[0].interventionId)}
                  className="text-xs h-7 gap-1"
                >
                  <span>Start Action</span>
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Transparent Weight Formula Breakdown */}
        <div className="pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTable(!showTable)}
            className="text-xs text-muted-foreground hover:text-foreground h-8 px-2 gap-1"
          >
            {showTable ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{showTable ? "Hide" : "Show"} Transparent Contribution Formula Breakdown</span>
          </Button>

          {showTable && (
            <div className="mt-3 rounded-lg border border-border overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase font-mono text-[9px]">
                  <tr>
                    <th className="p-2">Competency</th>
                    <th className="p-2 text-center">Type</th>
                    <th className="p-2 text-center">Verified</th>
                    <th className="p-2 text-center">Target</th>
                    <th className="p-2 text-center">Attainment</th>
                    <th className="p-2 text-center">Weight</th>
                    <th className="p-2 text-right">Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {readiness.allCompetencies.map((comp) => (
                    <tr key={comp.competencyId} className="hover:bg-muted/20">
                      <td className="p-2 font-medium text-foreground">{comp.competencyName}</td>
                      <td className="p-2 text-center">
                        {comp.isCritical ? (
                          <Badge variant="outline" className="text-[9px] text-amber-600 border-amber-500/40">
                            Critical
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-[10px]">Standard</span>
                        )}
                      </td>
                      <td className="p-2 text-center font-mono">
                        {comp.verifiedRating > 0 ? (
                          <span className="text-emerald-600 font-bold">{comp.verifiedRating.toFixed(1)}</span>
                        ) : (
                          <span className="text-muted-foreground">0.0</span>
                        )}
                      </td>
                      <td className="p-2 text-center font-mono">{comp.targetRating}</td>
                      <td className="p-2 text-center font-mono">{(comp.normalizedAttainment * 100).toFixed(0)}%</td>
                      <td className="p-2 text-center font-mono">{(comp.weight * 100).toFixed(1)}%</td>
                      <td className="p-2 text-right font-mono font-bold text-foreground">
                        +{comp.readinessContribution.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
