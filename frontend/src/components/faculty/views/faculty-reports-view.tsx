"use client";

import * as React from "react";
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  RefreshCw,
  PieChart,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { FacultyReportsData } from "@/lib/faculty/types";

export function FacultyReportsView() {
  const [data, setData] = React.useState<FacultyReportsData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchReports = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/faculty/reports");
      if (!res.ok) throw new Error("Failed to load faculty reports");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        throw new Error(json.error || "Failed to load reports data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error connecting to reports API");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-44 rounded-lg" />
          <Skeleton className="h-44 rounded-lg" />
          <Skeleton className="h-44 rounded-lg" />
        </div>
        <Skeleton className="h-72 rounded-lg" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 text-center text-xs text-destructive">
        {error || "Unable to display reports."}
      </div>
    );
  }

  const { cohortSize, journeyStats, testScoreDistribution, skillGapByDomain, placementFunnel } = data;

  if (cohortSize === 0) {
    return (
      <div className="p-12 text-center text-xs text-muted-foreground">
        No active cohort data available to generate faculty reports.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Cohort Analytics & Academic Reports
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Aggregated institutional benchmarks and learning readiness diagnostics ({cohortSize} scholars in cohort).
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchReports} className="text-xs">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          Refresh Reports
        </Button>
      </div>

      {/* Journey Completion Rates */}
      <Card className="p-5 bg-card border-border space-y-4">
        <CardTitle className="text-sm font-semibold">Cohort Milestone Completion Rates</CardTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Verified", rate: journeyStats.verifiedRate },
            { label: "Interest Assessed", rate: journeyStats.interestCompletionRate },
            { label: "Benchmarked", rate: journeyStats.knowledgeTestRate },
            { label: "Gaps Analyzed", rate: journeyStats.skillGapRate },
            { label: "Active Learning", rate: journeyStats.learningActiveRate },
            { label: "Placed", rate: journeyStats.placementRate },
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg border border-border bg-muted/20 space-y-1.5 text-center">
              <span className="text-[11px] text-muted-foreground font-medium">{item.label}</span>
              <div className="text-xl font-bold font-mono text-foreground">{item.rate}%</div>
              <Progress value={item.rate} className="h-1 bg-muted" />
            </div>
          ))}
        </div>
      </Card>

      {/* Grid: Test Scores & Skill Gap Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Knowledge Benchmark Score Distribution */}
        <Card className="p-5 bg-card border-border space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Award className="h-4 w-4 text-emerald-500" />
              Technical Benchmark Performance
            </CardTitle>
            <Badge variant="outline" className="font-mono text-xs">
              Avg: {testScoreDistribution.averageScore}%
            </Badge>
          </div>
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distinction (&gt;= 80%)</span>
                <span className="font-mono font-semibold text-emerald-500">{testScoreDistribution.above80} scholars</span>
              </div>
              <Progress
                value={cohortSize > 0 ? (testScoreDistribution.above80 / cohortSize) * 100 : 0}
                className="h-2 bg-muted"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Proficient (60% - 79%)</span>
                <span className="font-mono font-semibold text-primary">{testScoreDistribution.between60And80} scholars</span>
              </div>
              <Progress
                value={cohortSize > 0 ? (testScoreDistribution.between60And80 / cohortSize) * 100 : 0}
                className="h-2 bg-muted"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Needs Remediation (&lt; 60%)</span>
                <span className="font-mono font-semibold text-destructive">{testScoreDistribution.below60} scholars</span>
              </div>
              <Progress
                value={cohortSize > 0 ? (testScoreDistribution.below60 / cohortSize) * 100 : 0}
                className="h-2 bg-muted"
              />
            </div>
          </div>
        </Card>

        {/* Skill Gap Concentration by Domain */}
        <Card className="p-5 bg-card border-border space-y-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <PieChart className="h-4 w-4 text-primary" />
            Skill Gap Concentration by Domain
          </CardTitle>
          {skillGapByDomain.length === 0 ? (
            <p className="text-xs text-muted-foreground py-6 text-center">
              No domain skill gap records available for analysis.
            </p>
          ) : (
            <div className="space-y-3 text-xs">
              {skillGapByDomain.map((d, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">{d.domain}</span>
                    <span className="font-mono text-muted-foreground">{d.count} diagnostics</span>
                  </div>
                  <Progress value={Math.min(100, d.count * 10)} className="h-2 bg-muted" />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Placement Conversion Summary */}
      <Card className="p-5 bg-card border-border space-y-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Career Placement Funnel Conversion
        </CardTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-lg border border-border bg-muted/20">
            <span className="text-xs text-muted-foreground">Total Applications</span>
            <div className="text-xl font-bold font-mono text-foreground mt-1">{placementFunnel.applied}</div>
          </div>
          <div className="p-3 rounded-lg border border-border bg-muted/20">
            <span className="text-xs text-muted-foreground">Shortlisted</span>
            <div className="text-xl font-bold font-mono text-amber-500 mt-1">{placementFunnel.shortlisted}</div>
          </div>
          <div className="p-3 rounded-lg border border-border bg-muted/20">
            <span className="text-xs text-muted-foreground">Interviews Scheduled</span>
            <div className="text-xl font-bold font-mono text-primary mt-1">{placementFunnel.interviewed}</div>
          </div>
          <div className="p-3 rounded-lg border border-border bg-muted/20">
            <span className="text-xs text-muted-foreground">Offers Selected</span>
            <div className="text-xl font-bold font-mono text-emerald-500 mt-1">{placementFunnel.selected}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
