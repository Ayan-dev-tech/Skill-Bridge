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
  Building2,
  TrendingUp,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  Award,
  Layers,
} from "lucide-react";
import type { CampusAyushIntelligenceData } from "@/lib/ayush/institution-intelligence";

export function CampusAyushIntelligenceSection() {
  const [data, setData] = React.useState<CampusAyushIntelligenceData | null>(null);
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
            if (parsed.id) headers["x-campus-id"] = parsed.id;
          } catch {}
        }
      }

      const res = await fetch("/api/campus/ayush-intelligence", { headers });
      const json = await res.json();
      if (res.ok && json.success) {
        setData(json.data);
      } else {
        setError(json.error || "Failed to load campus intelligence.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error connecting to campus intelligence API.");
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
        <h3 className="text-sm font-semibold text-destructive">Institutional Intelligence Unavailable</h3>
        <p className="text-xs text-muted-foreground mt-1">{error || "Could not retrieve institutional intelligence."}</p>
        <Button variant="outline" size="sm" onClick={fetchIntelligence} className="mt-3 text-xs">
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          Retry
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">AYUSH Institutional Cohort Intelligence</h2>
            <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
              Campus Scoped
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {data.institutionName} &bull; {data.totalAyushStudents} Enrolled AYUSH Scholars
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
            <GraduationCap className="w-3.5 h-3.5 text-primary" />
            Enrolled Scholars
          </span>
          <div className="text-2xl font-bold font-mono text-foreground mt-1">{data.totalAyushStudents}</div>
          <p className="text-[10px] text-muted-foreground mt-0.5">Campus authorized students</p>
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            Overall Readiness Index
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {data.overallReadinessIndex}%
          </div>
          <Progress value={data.overallReadinessIndex} className="h-1 bg-muted mt-2" />
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
            Intervention Completion
          </span>
          <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">
            {data.interventionCompletionRate}%
          </div>
          <Progress value={data.interventionCompletionRate} className="h-1 bg-muted mt-2" />
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-purple-500" />
            Industry Match Ready
          </span>
          <div className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-1">
            {data.industryMatchReadiness.highlyMatchedCount}
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">&ge;75% Employer Match</p>
        </Card>
      </div>

      {/* Actionable Insights */}
      {data.actionableInsights.length > 0 && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-primary">Institutional Strategic Directives</h4>
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

      {/* Role Readiness Distribution */}
      <Card className="border-border bg-card">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold">Institutional AYUSH Role Readiness Profile</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Aggregate student readiness distribution across the 5 canonical AYUSH industry domains.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2">
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

      {/* Top Institutional Gaps & Longitudinal Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Institutional Competency Gaps */}
        <Card className="border-border bg-card">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold">Institutional Priority Skill Gaps</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Most prevalent developmental gaps across campus academic departments.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="divide-y divide-border">
              {data.topInstitutionalGaps.map((gap) => (
                <div key={gap.competencyId} className="py-2.5 flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-foreground">{gap.competencyName}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      Category: {gap.category} &bull; Target: {gap.targetRating.toFixed(1)} &bull; Verified Avg: {gap.averageVerifiedRating.toFixed(1)}
                    </p>
                  </div>
                  <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 text-[10px] font-mono shrink-0">
                    {gap.studentsBelowTargetCount} Scholars Below Target
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Longitudinal Cohort Progress */}
        <Card className="border-border bg-card">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-500" />
              Longitudinal Learning Progress Index
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Cumulative verified competency gains and evidence evaluation throughput.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
                <span className="text-[11px] text-muted-foreground">Total Verified Rating Gains</span>
                <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  +{data.longitudinalCohortProgress.totalRatingGains} pts
                </div>
              </div>
              <div className="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
                <span className="text-[11px] text-muted-foreground">Verification Throughput</span>
                <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">
                  {data.evidenceVerificationThroughput}%
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              Institutional scholars have completed <span className="font-semibold text-foreground">{data.longitudinalCohortProgress.verifiedMilestoneCount}</span> verified competency milestones, with an average competency rating improvement of <span className="font-semibold text-foreground">+{data.longitudinalCohortProgress.averageImprovementPerStudent}</span> points per enrolled student.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
