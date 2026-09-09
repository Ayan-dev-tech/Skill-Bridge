"use client";

import * as React from "react";
import {
  GraduationCap,
  BookOpen,
  Building2,
  FileText,
  Users,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Clock,
  School,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { CampusDashboardSummary, CampusViewType } from "@/lib/campus/types";

interface CampusDashboardViewProps {
  onNavigate: (view: CampusViewType) => void;
}

export function CampusDashboardView({ onNavigate }: CampusDashboardViewProps) {
  const [data, setData] = React.useState<CampusDashboardSummary | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchDashboard = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const headers: Record<string, string> = {};
      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("skill_bridge_user");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.id) headers["x-campus-id"] = parsed.id;
          } catch {
            // ignore
          }
        }
      }

      const res = await fetch("/api/campus", { headers });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load campus dashboard data.");
      }
      setData(json);
    } catch (err: unknown) {
      console.error("Dashboard fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Editorial Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-border bg-muted/40 text-[11px] text-muted-foreground font-medium">
            <School className="w-3 h-3 text-foreground" />
            <span>{data?.institutionName || "Campus Operations"}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              INSTITUTIONAL NODE
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Campus Placement & Talent Overview
          </h1>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Real-time management and visibility across institutional student talent, faculty mentorship, connected industry drives, and placement conversion.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onNavigate("students")}
            className="text-xs gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Students</span>
          </Button>
          <Button
            size="sm"
            onClick={() => onNavigate("reports")}
            className="text-xs gap-1.5"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Placement Reports</span>
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-md border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <Button size="sm" variant="ghost" onClick={fetchDashboard} className="h-7 text-xs">
            Retry
          </Button>
        </div>
      )}

      {/* 6 Real Metric Cards required by prompt */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Students */}
        <Card
          className="border-border bg-card cursor-pointer hover:border-foreground/30 transition-colors"
          onClick={() => onNavigate("students")}
        >
          <CardHeader className="p-3.5 pb-1">
            <CardDescription className="text-[11px] font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Students</span>
              <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? <Skeleton className="h-7 w-12" /> : (data?.metrics.totalStudents ?? 0)}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Enrolled cohorts</p>
          </CardContent>
        </Card>

        {/* Total Faculty */}
        <Card
          className="border-border bg-card cursor-pointer hover:border-foreground/30 transition-colors"
          onClick={() => onNavigate("faculty")}
        >
          <CardHeader className="p-3.5 pb-1">
            <CardDescription className="text-[11px] font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Faculty</span>
              <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? <Skeleton className="h-7 w-12" /> : (data?.metrics.totalFaculty ?? 0)}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Academic mentors</p>
          </CardContent>
        </Card>

        {/* Active Hiring Posts */}
        <Card
          className="border-border bg-card cursor-pointer hover:border-foreground/30 transition-colors"
          onClick={() => onNavigate("industry")}
        >
          <CardHeader className="p-3.5 pb-1">
            <CardDescription className="text-[11px] font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Hiring Posts</span>
              <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? <Skeleton className="h-7 w-12" /> : (data?.metrics.activeHiringPosts ?? 0)}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Active opportunities</p>
          </CardContent>
        </Card>

        {/* Applications */}
        <Card
          className="border-border bg-card cursor-pointer hover:border-foreground/30 transition-colors"
          onClick={() => onNavigate("applications")}
        >
          <CardHeader className="p-3.5 pb-1">
            <CardDescription className="text-[11px] font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Applications</span>
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? <Skeleton className="h-7 w-12" /> : (data?.metrics.totalApplications ?? 0)}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Submissions tracked</p>
          </CardContent>
        </Card>

        {/* Shortlisted Students */}
        <Card
          className="border-border bg-card cursor-pointer hover:border-foreground/30 transition-colors"
          onClick={() => onNavigate("applications")}
        >
          <CardHeader className="p-3.5 pb-1">
            <CardDescription className="text-[11px] font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Shortlisted</span>
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? <Skeleton className="h-7 w-12" /> : (data?.metrics.shortlistedStudents ?? 0)}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Through screening</p>
          </CardContent>
        </Card>

        {/* Selected Students */}
        <Card
          className="border-border bg-card cursor-pointer hover:border-foreground/30 transition-colors"
          onClick={() => onNavigate("reports")}
        >
          <CardHeader className="p-3.5 pb-1">
            <CardDescription className="text-[11px] font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Selected</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? <Skeleton className="h-7 w-12" /> : (data?.metrics.selectedStudents ?? 0)}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Offers & placements</p>
          </CardContent>
        </Card>
      </div>

      {/* Placement Funnel & Quick Action Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placement Pipeline Status */}
        <Card className="border-border bg-card md:col-span-2">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Institutional Placement Pipeline
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  End-to-end stage conversion for participating students
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={() => onNavigate("applications")}
              >
                <span>View Pipeline</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="grid grid-cols-4 gap-2 pt-3">
              <div className="p-3 rounded-md bg-muted/40 border border-border text-center space-y-1">
                <p className="text-[10px] uppercase font-semibold text-muted-foreground">Applied</p>
                <p className="text-xl font-bold font-mono text-foreground">
                  {isLoading ? "—" : (data?.metrics.totalApplications ?? 0)}
                </p>
              </div>
              <div className="p-3 rounded-md bg-muted/40 border border-border text-center space-y-1">
                <p className="text-[10px] uppercase font-semibold text-muted-foreground">Shortlisted</p>
                <p className="text-xl font-bold font-mono text-foreground">
                  {isLoading ? "—" : (data?.metrics.shortlistedStudents ?? 0)}
                </p>
              </div>
              <div className="p-3 rounded-md bg-muted/40 border border-border text-center space-y-1">
                <p className="text-[10px] uppercase font-semibold text-muted-foreground">Interviewed</p>
                <p className="text-xl font-bold font-mono text-foreground">
                  {isLoading ? "—" : (data?.metrics.shortlistedStudents ?? 0)}
                </p>
              </div>
              <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
                <p className="text-[10px] uppercase font-semibold text-emerald-600 dark:text-emerald-400">Selected</p>
                <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {isLoading ? "—" : (data?.metrics.selectedStudents ?? 0)}
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-md bg-muted/30 border border-border flex items-start gap-2.5 text-xs text-muted-foreground">
              <Clock className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-foreground">Visibility Authority:</span> Industry partners manage requirements, interview schedules, and final hiring selections directly. Campus portal tracks outcomes and maintains academic audit trails.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Actions */}
        <Card className="border-border bg-card">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">
              Operational Portals
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Institutional coordination shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2 space-y-2">
            <button
              type="button"
              onClick={() => onNavigate("students")}
              className="w-full flex items-center justify-between p-2.5 rounded-md border border-border hover:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-muted flex items-center justify-center">
                  <GraduationCap className="w-3.5 h-3.5 text-foreground" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground leading-tight">Student Directory</p>
                  <p className="text-[10px] text-muted-foreground">Academics, skills & docs</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("faculty")}
              className="w-full flex items-center justify-between p-2.5 rounded-md border border-border hover:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-muted flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5 text-foreground" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground leading-tight">Faculty & Mentors</p>
                  <p className="text-[10px] text-muted-foreground">Departmental student assignments</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("industry")}
              className="w-full flex items-center justify-between p-2.5 rounded-md border border-border hover:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-muted flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5 text-foreground" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground leading-tight">Corporate Drives</p>
                  <p className="text-[10px] text-muted-foreground">Published hiring requirements</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("reports")}
              className="w-full flex items-center justify-between p-2.5 rounded-md border border-border hover:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-muted flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-foreground" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground leading-tight">Placement Analytics</p>
                  <p className="text-[10px] text-muted-foreground">Department & batch breakdowns</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Log */}
      <Card className="border-border bg-card">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold text-foreground">
            Recent Institutional Activities
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Authoritative application submissions and verification updates
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : !data?.recentActivity || data.recentActivity.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-border rounded-md">
              <p className="text-xs text-muted-foreground">No recent institutional activities logged yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {data.recentActivity.map((act) => (
                <div key={act.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="font-medium text-foreground truncate">{act.title}</span>
                    <span className="text-muted-foreground truncate hidden sm:inline">• {act.subtitle}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(act.timestamp).toLocaleDateString()}
                    </span>
                    <Badge variant="outline" className="text-[10px] py-0">
                      {act.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
