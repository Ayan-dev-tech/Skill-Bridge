"use client";

import * as React from "react";
import {
  Users,
  AlertTriangle,
  Compass,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Award,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Clock,
  Layers,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import type { FacultyDashboardSummary, FacultyViewType } from "@/lib/faculty/types";

interface FacultyDashboardViewProps {
  onNavigate: (view: FacultyViewType) => void;
  onSelectStudent?: (studentId: string) => void;
}

export function FacultyDashboardView({ onNavigate, onSelectStudent }: FacultyDashboardViewProps) {
  const [data, setData] = React.useState<FacultyDashboardSummary | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchDashboard = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/faculty");
      if (!res.ok) {
        throw new Error("Failed to load dashboard metrics");
      }
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        throw new Error(json.error || "Failed to load dashboard data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error connecting to faculty API");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-72 lg:col-span-2 rounded-lg" />
          <Skeleton className="h-72 rounded-lg" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Dashboard Error</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>{error || "Unable to display faculty dashboard."}</span>
            <Button variant="outline" size="sm" onClick={fetchDashboard} className="ml-4">
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { facultyProfile, metrics, journeyDistribution, recentActivity } = data;

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Academic Mentorship Dashboard
            </h1>
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
              {facultyProfile.department}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Monitoring {metrics.assignedStudents} assigned student scholars at {facultyProfile.institution}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchDashboard} className="text-xs">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Refresh Data
          </Button>
          <Button size="sm" onClick={() => onNavigate("students")} className="text-xs">
            <Users className="h-3.5 w-3.5 mr-1.5" />
            View Student Roster
          </Button>
        </div>
      </div>

      {/* Attention Alert if students need remediation */}
      {metrics.studentsNeedingAttention > 0 && (
        <Alert className="border-amber-500/30 bg-amber-500/10 text-foreground">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-sm font-semibold flex items-center justify-between">
            <span>{metrics.studentsNeedingAttention} Student Scholars Require Academic Intervention</span>
            <Button
              variant="link"
              size="sm"
              onClick={() => onNavigate("students")}
              className="text-amber-600 dark:text-amber-400 p-0 h-auto text-xs font-semibold"
            >
              Filter Scholars <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground mt-0.5">
            Identified with high-priority skill gaps or test scores below passing threshold. Review their learning plans.
          </AlertDescription>
        </Alert>
      )}

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Assigned Scholars
            </span>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-foreground">{metrics.assignedStudents}</span>
            <span className="text-[11px] text-muted-foreground">Department Cohort</span>
          </div>
          <div className="mt-3">
            <Progress value={100} className="h-1.5 bg-muted" />
          </div>
        </Card>

        <Card className="p-4 bg-card border-border hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Benchmarked
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-foreground">{metrics.knowledgeTestCompleted}</span>
            <span className="text-[11px] text-muted-foreground">
              ({metrics.assignedStudents > 0 ? Math.round((metrics.knowledgeTestCompleted / metrics.assignedStudents) * 100) : 0}%)
            </span>
          </div>
          <div className="mt-3">
            <Progress
              value={metrics.assignedStudents > 0 ? (metrics.knowledgeTestCompleted / metrics.assignedStudents) * 100 : 0}
              className="h-1.5 bg-muted"
            />
          </div>
        </Card>

        <Card className="p-4 bg-card border-border hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Skill Gaps Diagnosed
            </span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-foreground">{metrics.studentsWithSkillGaps}</span>
            <span className="text-[11px] text-muted-foreground">Active Diagnostics</span>
          </div>
          <div className="mt-3">
            <Progress
              value={metrics.assignedStudents > 0 ? (metrics.studentsWithSkillGaps / metrics.assignedStudents) * 100 : 0}
              className="h-1.5 bg-muted"
            />
          </div>
        </Card>

        <Card className="p-4 bg-card border-border hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Placement Placed
            </span>
            <Award className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-foreground">{metrics.placedCount}</span>
            <span className="text-[11px] text-muted-foreground">
              of {metrics.shortlistedCount} Shortlisted
            </span>
          </div>
          <div className="mt-3">
            <Progress
              value={metrics.shortlistedCount > 0 ? (metrics.placedCount / metrics.shortlistedCount) * 100 : 0}
              className="h-1.5 bg-muted"
            />
          </div>
        </Card>
      </div>

      {/* Development Journey Pipeline & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cohort Journey Progress */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Development Journey Pipeline</CardTitle>
                <CardDescription className="text-xs">
                  Progression across the 7 Skill-Bridge competency stages for authorized cohort
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("progress")} className="text-xs">
                Detailed View <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              {[
                { label: "1. Document Verification", count: journeyDistribution.documentVerification, color: "bg-blue-500" },
                { label: "2. Interest Finder", count: journeyDistribution.interestFinder, color: "bg-teal-500" },
                { label: "3. Knowledge Testing", count: journeyDistribution.knowledgeTesting, color: "bg-emerald-500" },
                { label: "4. Skill Gap Diagnostics", count: journeyDistribution.skillGapAnalysis, color: "bg-amber-500" },
                { label: "5. Learning & Mentoring", count: journeyDistribution.learning, color: "bg-violet-500" },
                { label: "6. Career Applications", count: journeyDistribution.applications, color: "bg-pink-500" },
                { label: "7. Placements", count: journeyDistribution.placed, color: "bg-indigo-500" },
              ].map((stage, idx) => {
                const percent = metrics.assignedStudents > 0
                  ? Math.round((stage.count / metrics.assignedStudents) * 100)
                  : 0;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">{stage.label}</span>
                      <span className="font-mono text-muted-foreground">
                        {stage.count} / {metrics.assignedStudents} ({percent}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${stage.color}`} style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Recent Student Activity
            </CardTitle>
            <CardDescription className="text-xs">
              Live milestones completed by your assigned scholars
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {recentActivity.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No recent activity recorded for assigned cohort.
              </div>
            ) : (
              <div className="space-y-3.5">
                {recentActivity.map((act) => (
                  <div key={act.id} className="flex items-start gap-3 text-xs border-b border-border/60 pb-3 last:border-0 last:pb-0">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {act.type === "application" ? (
                        <Briefcase className="h-3 w-3" />
                      ) : act.type === "test" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : act.type === "interest" ? (
                        <Compass className="h-3 w-3" />
                      ) : (
                        <Layers className="h-3 w-3" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-foreground truncate">{act.studentName}</span>
                        {act.statusBadge && (
                          <Badge variant="secondary" className="text-[9px] px-1 py-0 h-auto shrink-0">
                            {act.statusBadge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-[11px] truncate">{act.subtitle}</p>
                      <p className="text-[10px] text-muted-foreground/70">
                        {new Date(act.timestamp).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          onClick={() => onNavigate("skill-gaps")}
          className="p-4 bg-card border-border hover:border-primary/50 cursor-pointer transition-all hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-amber-500/10 text-amber-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Review Skill Gaps</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Analyze domain discrepancies and guide learning interventions
              </p>
            </div>
          </div>
        </Card>

        <Card
          onClick={() => onNavigate("learning")}
          className="p-4 bg-card border-border hover:border-primary/50 cursor-pointer transition-all hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-violet-500/10 text-violet-500">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Curriculum Mentoring</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Monitor student track completion and module milestones
              </p>
            </div>
          </div>
        </Card>

        <Card
          onClick={() => onNavigate("reports")}
          className="p-4 bg-card border-border hover:border-primary/50 cursor-pointer transition-all hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-500">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Cohort Reports</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Export benchmarking rates, placement outcomes, and analytics
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
