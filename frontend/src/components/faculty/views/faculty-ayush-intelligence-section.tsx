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
import { Skeleton } from "@/components/ui/skeleton";
import {
  BrainCircuit,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  GraduationCap,
  Users,
  ShieldCheck,
  ArrowUpRight,
  RefreshCw,
  Sparkles,
  BookOpen,
} from "lucide-react";
import type { FacultyAyushIntelligenceData } from "@/lib/ayush/institution-intelligence";

export function FacultyAyushIntelligenceSection() {
  const [data, setData] = React.useState<FacultyAyushIntelligenceData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchIntelligence = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const headers: Record<string, string> = {};
      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("skill_bridge_user");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.id) headers["x-faculty-id"] = parsed.id;
          } catch {}
        }
      }

      const res = await fetch("/api/faculty/ayush-intelligence", { headers });
      const json = await res.json();
      if (res.ok && json.success) {
        setData(json.data);
      } else {
        setError(json.error || "Failed to load faculty intelligence.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error connecting to faculty intelligence API.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchIntelligence();
  }, [fetchIntelligence]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-muted/40 rounded w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-28 bg-muted/20 rounded-xl border border-border" />
          <div className="h-28 bg-muted/20 rounded-xl border border-border" />
          <div className="h-28 bg-muted/20 rounded-xl border border-border" />
          <div className="h-28 bg-muted/20 rounded-xl border border-border" />
        </div>
        <div className="h-64 bg-muted/20 rounded-xl border border-border" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <Card className="border-destructive/30 bg-destructive/5 p-6 text-center">
        <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
        <h3 className="text-sm font-semibold text-destructive">Faculty Intelligence Unavailable</h3>
        <p className="text-xs text-muted-foreground mt-1">{error || "Could not retrieve cohort intelligence."}</p>
        <Button variant="outline" size="sm" onClick={fetchIntelligence} className="mt-3 text-xs">
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          Retry
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Header & Primary Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-foreground">AYUSH Cohort Academic Intelligence</h2>
            <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              Verified Source of Truth
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Department of {data.department} &bull; {data.institution} &bull; {data.authorizedStudentCount} Authorized Scholars
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchIntelligence} className="text-xs self-start sm:self-auto">
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          Sync Intelligence
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-primary" />
            Authorized Scholars
          </span>
          <div className="text-2xl font-bold font-mono text-foreground mt-1">{data.authorizedStudentCount}</div>
          <p className="text-[10px] text-muted-foreground mt-0.5">Active assigned cohort</p>
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            Cohort Avg Readiness
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {data.cohortReadinessAverage}%
          </div>
          <Progress value={data.cohortReadinessAverage} className="h-1 bg-muted mt-2" />
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            Pending Reviews
          </span>
          <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
            {data.evidenceWorkload.pendingReviewCount}
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">Evidence awaiting verification</p>
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            Verified Milestones
          </span>
          <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">
            {data.evidenceWorkload.verifiedTotalCount}
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">Authoritative improvements</p>
        </Card>
      </div>

      {/* 2. Actionable Insights */}
      {data.actionableInsights.length > 0 && (
        <Card className="p-4 bg-emerald-500/5 border-emerald-500/20">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Actionable Academic Insights</h4>
              <ul className="space-y-1">
                {data.actionableInsights.map((insight, idx) => (
                  <li key={idx} className="text-xs text-foreground/90 leading-relaxed list-disc list-inside">
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* 3. Role Readiness Distribution */}
      <Card className="border-border bg-card">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold">Cohort Readiness Distribution by AYUSH Role</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Computed strictly from faculty-verified competency attainment across canonical AYUSH career roles.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.roleReadinessDistribution.map((role) => (
              <div key={role.roleId} className="p-3.5 rounded-lg border border-border bg-muted/20 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h5 className="text-xs font-bold text-foreground leading-tight">{role.roleTitle}</h5>
                  <Badge variant="secondary" className="text-[10px] font-mono shrink-0">
                    {role.averageReadiness}% Avg
                  </Badge>
                </div>
                <Progress value={role.averageReadiness} className="h-1.5 bg-muted" />
                <div className="flex items-center justify-between text-[10px] pt-1 text-muted-foreground font-mono">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Ready: {role.readyCount}</span>
                  <span className="text-amber-600 dark:text-amber-400">Dev: {role.developingCount}</span>
                  <span className="text-rose-600 dark:text-rose-400">Gap: {role.criticalGapCount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 4. Top Recurring Competency Gaps */}
      <Card className="border-border bg-card">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold">Top Recurring Competency Gaps in Cohort</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Prioritized competencies requiring targeted interventions or instructional focus.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="divide-y divide-border">
            {data.topRecurringGaps.map((gap) => (
              <div key={gap.competencyId} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">{gap.competencyName}</span>
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 font-mono">
                      {gap.category}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    Target: {gap.targetRating.toFixed(1)} &bull; Verified Avg: {gap.averageVerifiedRating.toFixed(1)} &bull; Gap: +{gap.averageGap.toFixed(1)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 text-[10px] font-mono">
                    {gap.studentsBelowTargetCount} Scholars Below Target
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 5. Students Needing Attention & Longitudinal Improvements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Students Needing Attention */}
        <Card className="border-border bg-card">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Scholars Needing Faculty Action
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Students with pending evidence reviews or critical role readiness gaps.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            {data.studentsNeedingAttention.length === 0 ? (
              <p className="text-xs text-muted-foreground py-6 text-center">No students currently require urgent review.</p>
            ) : (
              <div className="divide-y divide-border">
                {data.studentsNeedingAttention.map((student) => (
                  <div key={student.studentId} className="py-2.5 flex items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-foreground">{student.studentName}</p>
                      <p className="text-[10px] text-muted-foreground">{student.email}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">
                        Best Target: {student.topGapRole} ({student.readinessScore}%)
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {student.pendingEvidenceCount > 0 && (
                        <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px] font-mono">
                          {student.pendingEvidenceCount} Pending
                        </Badge>
                      )}
                      {student.criticalGapsCount > 0 && (
                        <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 text-[10px] font-mono">
                          {student.criticalGapsCount} Gaps
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Longitudinal Verified Improvements */}
        <Card className="border-border bg-card">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Longitudinal Verified Progress Trail
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Immutable historical evidence improvements verified over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            {data.longitudinalImprovements.length === 0 ? (
              <p className="text-xs text-muted-foreground py-6 text-center">No verified competency improvements recorded yet.</p>
            ) : (
              <div className="divide-y divide-border">
                {data.longitudinalImprovements.map((item) => (
                  <div key={item.id} className="py-2.5 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">{item.studentName}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {item.verifiedAt ? new Date(item.verifiedAt).toLocaleDateString() : "Recent"}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{item.competencyName}</p>
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-muted-foreground">
                        {item.previousRating.toFixed(1)} &rarr; {item.newRating.toFixed(1)}
                      </span>
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[9px] px-1 py-0 font-mono">
                        +{item.improvementDelta.toFixed(1)} Verified
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
