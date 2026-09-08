"use client";

import * as React from "react";
import {
  Briefcase,
  FileCheck,
  Users,
  Calendar,
  FileQuestion,
  ArrowRight,
  Sparkles,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Search,
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
import type { IndustryDashboardSummary } from "@/lib/industry/types";
import type { IndustryViewType } from "../industry-sidebar";

interface IndustryDashboardViewProps {
  onNavigate: (view: IndustryViewType) => void;
}

export function IndustryDashboardView({ onNavigate }: IndustryDashboardViewProps) {
  const [data, setData] = React.useState<IndustryDashboardSummary | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchDashboard = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/industry/dashboard");
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load dashboard data.");
      }
      setData(json.dashboard);
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
            <Building2 className="w-3 h-3 text-foreground" />
            <span>{data?.organizationName || "Corporate Partner"}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              {data?.status?.toUpperCase() || "VERIFIED"}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Hiring & Operations Overview
          </h1>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Monitor real-time recruitment metrics, manage technical question assessments, and discover certified engineering talent.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onNavigate("profile")}
            className="text-xs gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Profile</span>
          </Button>
          <Button
            size="sm"
            onClick={() => onNavigate("students")}
            className="text-xs gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Discover Talent</span>
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

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Active Hiring */}
        <Card className="border-border bg-card">
          <CardHeader className="p-3.5 pb-1">
            <CardDescription className="text-[11px] font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Active Hiring</span>
              <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? "—" : data?.metrics.activeHiring ?? 0}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Live campus drives</p>
          </CardContent>
        </Card>

        {/* Draft Hiring */}
        <Card className="border-border bg-card">
          <CardHeader className="p-3.5 pb-1">
            <CardDescription className="text-[11px] font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Draft Posts</span>
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? "—" : data?.metrics.draftHiring ?? 0}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Pending configuration</p>
          </CardContent>
        </Card>

        {/* Total Applications */}
        <Card className="border-border bg-card">
          <CardHeader className="p-3.5 pb-1">
            <CardDescription className="text-[11px] font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Applications</span>
              <FileCheck className="w-3.5 h-3.5 text-muted-foreground" />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? "—" : data?.metrics.totalApplications ?? 0}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Submitted by students</p>
          </CardContent>
        </Card>

        {/* Shortlisted Candidates */}
        <Card className="border-border bg-card">
          <CardHeader className="p-3.5 pb-1">
            <CardDescription className="text-[11px] font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Shortlisted</span>
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? "—" : data?.metrics.shortlistedCandidates ?? 0}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Cleared screening</p>
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card className="border-border bg-card">
          <CardHeader className="p-3.5 pb-1">
            <CardDescription className="text-[11px] font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Interviews</span>
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? "—" : data?.metrics.upcomingInterviews ?? 0}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Scheduled rounds</p>
          </CardContent>
        </Card>

        {/* Question Bank */}
        <Card className="border-border bg-card cursor-pointer hover:border-foreground/30 transition-colors" onClick={() => onNavigate("question-bank")}>
          <CardHeader className="p-3.5 pb-1">
            <CardDescription className="text-[11px] font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Question Bank</span>
              <FileQuestion className="w-3.5 h-3.5 text-muted-foreground" />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? "—" : data?.metrics.questionBankCount ?? 0}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Technical test items</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Card */}
        <Card className="border-border bg-card lg:col-span-1">
          <CardHeader className="p-4 pb-3 border-b border-border">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-foreground" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Direct access to recruitment and assessment modules
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <button
              type="button"
              onClick={() => onNavigate("hiring")}
              className="w-full flex items-center justify-between p-3 rounded-md border border-foreground/20 bg-muted/20 hover:bg-muted/40 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-foreground text-background flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Hiring & Post Configuration</p>
                  <p className="text-[11px] text-muted-foreground">Author job posts, qualifications, and test papers</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("screening")}
              className="w-full flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/40 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                  <Users className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Application Screening</p>
                  <p className="text-[11px] text-muted-foreground">Review incoming student applications and credentials</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("interview")}
              className="w-full flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/40 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                  <Clock className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Interview & Evaluation</p>
                  <p className="text-[11px] text-muted-foreground">Coordinate virtual rounds and log evaluations</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("analytics")}
              className="w-full flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/40 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Final Hiring & Analytics</p>
                  <p className="text-[11px] text-muted-foreground">Extend official offers and view live pipeline charts</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("question-bank")}
              className="w-full flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/40 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                  <FileQuestion className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Manage Question Bank</p>
                  <p className="text-[11px] text-muted-foreground">Author MCQ technical benchmark questions</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("students")}
              className="w-full flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/40 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                  <Users className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Student Talent Discovery</p>
                  <p className="text-[11px] text-muted-foreground">Search and filter verified student candidates</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("profile")}
              className="w-full flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/40 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Industry Profile</p>
                  <p className="text-[11px] text-muted-foreground">Manage company details, domain, and contacts</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>

        {/* Recent Hiring Activity */}
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader className="p-4 pb-3 border-b border-border flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">
                Recent Hiring Activity
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Real-time log of candidate applications and screening milestones
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchDashboard}
              className="text-xs h-7 text-muted-foreground"
            >
              Refresh
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            {isLoading ? (
              <div className="py-12 text-center text-xs text-muted-foreground">
                Loading activity stream...
              </div>
            ) : data?.recentActivity && data.recentActivity.length > 0 ? (
              <div className="divide-y divide-border">
                {data.recentActivity.map((act) => (
                  <div key={act.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                        {act.type === "interview" ? (
                          <Calendar className="w-4 h-4 text-foreground" />
                        ) : act.type === "shortlist" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <FileCheck className="w-4 h-4 text-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">{act.title}</p>
                        <p className="text-[11px] text-muted-foreground">{act.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {new Date(act.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Clean Real Empty State */
              <div className="py-12 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-muted mx-auto flex items-center justify-center text-muted-foreground">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-foreground">No recent hiring activity yet</p>
                  <p className="text-[11px] text-muted-foreground max-w-sm mx-auto">
                    When students apply to your campus hiring postings or complete technical assessments, updates will appear here.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigate("students")}
                  className="text-xs"
                >
                  Explore Available Talent
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
