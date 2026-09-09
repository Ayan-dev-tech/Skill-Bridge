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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Award,
  TrendingUp,
  BarChart3,
  Users,
  CheckCircle2,
  XCircle,
  Briefcase,
  AlertCircle,
  Sparkles,
  Calendar,
  Filter,
  Search,
  Check,
  X,
  FileQuestion,
} from "lucide-react";
import type { JobApplicationRecord } from "@/lib/applications/types";
import type { IndustryHiringPostRecord } from "@/lib/industry/types";

export function FinalHiringAnalyticsView() {
  const [applications, setApplications] = React.useState<JobApplicationRecord[]>([]);
  const [posts, setPosts] = React.useState<IndustryHiringPostRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  // Filters
  const [selectedPostId, setSelectedPostId] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [timeRange, setTimeRange] = React.useState<"all" | "30d" | "90d">("all");

  const [selectedAppForOffer, setSelectedAppForOffer] = React.useState<JobApplicationRecord | null>(null);
  const [appToRejectFinal, setAppToRejectFinal] = React.useState<JobApplicationRecord | null>(null);
  const [offeredRole, setOfferedRole] = React.useState("");
  const [offeredComp, setOfferedComp] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [offerNotes, setOfferNotes] = React.useState("");
  const [isSubmittingOffer, setIsSubmittingOffer] = React.useState(false);

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [appRes, postRes] = await Promise.all([
        fetch("/api/industry/applications"),
        fetch("/api/industry/hiring"),
      ]);

      const appData = await appRes.json();
      const postData = await postRes.json();

      if (appData.success) {
        setApplications(appData.applications || []);
      }
      if (postData.success) {
        setPosts(postData.posts || []);
      }
    } catch (err: unknown) {
      console.error("Fetch analytics data error:", err);
      const msg = err instanceof Error ? err.message : "Failed to load hiring analytics.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle Final Decision
  const handleFinalDecision = async (decision: "selected" | "rejected", targetApp?: JobApplicationRecord) => {
    const target = targetApp || selectedAppForOffer;
    if (!target) return;
    try {
      setIsSubmittingOffer(true);
      setError(null);

      const res = await fetch(`/api/industry/applications/${target.id}/final-decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decision,
          offerDetails:
            decision === "selected"
              ? {
                  offeredRole: offeredRole.trim() || target.roleTitle,
                  offeredCompensation: offeredComp.trim() || target.salaryRange,
                  startDate: startDate || undefined,
                  notes: offerNotes.trim() || undefined,
                }
              : undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to finalize candidate hiring decision.");
      }

      if (decision === "selected") {
        toast.success(`Offer extended to ${target.applicantFullName || "candidate"}! Profile updated with placement.`);
      } else {
        toast.error(`Candidate ${target.applicantFullName || ""} marked as not selected.`);
      }
      setSelectedAppForOffer(null);
      setAppToRejectFinal(null);
      await fetchData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save final decision.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsSubmittingOffer(false);
    }
  };

  // Filtered Applications by Post, Time Range, and Search
  const filteredApplications = React.useMemo(() => {
    const now = Date.now();
    return applications.filter((a) => {
      if (selectedPostId !== "all" && a.jobId !== selectedPostId) return false;

      if (timeRange === "30d") {
        const diff = now - new Date(a.appliedAt).getTime();
        if (diff > 30 * 24 * 3600 * 1000) return false;
      } else if (timeRange === "90d") {
        const diff = now - new Date(a.appliedAt).getTime();
        if (diff > 90 * 24 * 3600 * 1000) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = (a.applicantFullName || "").toLowerCase().includes(q);
        const matchesRole = (a.roleTitle || "").toLowerCase().includes(q);
        if (!matchesName && !matchesRole) return false;
      }

      return true;
    });
  }, [applications, selectedPostId, timeRange, searchQuery]);

  // Real Funnel Pipeline Calculation
  const funnel = React.useMemo(() => {
    const total = filteredApplications.length;
    const screened = filteredApplications.filter(
      (a) => a.screeningStatus === "screened" || a.screeningStatus === "shortlisted" || a.status === "interview" || a.status === "selected"
    ).length;
    const shortlisted = filteredApplications.filter(
      (a) => a.screeningStatus === "shortlisted" || a.status === "interview" || a.status === "selected"
    ).length;
    const interviewed = filteredApplications.filter(
      (a) => (a.interviewRounds && a.interviewRounds.length > 0) || a.status === "interview" || a.status === "selected"
    ).length;
    const selected = filteredApplications.filter(
      (a) => a.status === "selected" || a.finalStatus === "selected"
    ).length;

    return [
      { stage: "Applications Received", count: total, pct: 100 },
      { stage: "Screened", count: screened, pct: total ? Math.round((screened / total) * 100) : 0 },
      { stage: "Shortlisted", count: shortlisted, pct: total ? Math.round((shortlisted / total) * 100) : 0 },
      { stage: "Interviewed", count: interviewed, pct: total ? Math.round((interviewed / total) * 100) : 0 },
      { stage: "Selected & Offered", count: selected, pct: total ? Math.round((selected / total) * 100) : 0 },
    ];
  }, [filteredApplications]);

  // Real Status Distribution
  const statusCounts = React.useMemo(() => {
    const counts: Record<string, number> = {
      Applied: 0,
      Screening: 0,
      Shortlisted: 0,
      Interview: 0,
      Selected: 0,
      Rejected: 0,
    };
    for (const a of filteredApplications) {
      if (a.status === "selected" || a.finalStatus === "selected") {
        counts.Selected += 1;
      } else if (a.status === "rejected" || a.screeningStatus === "rejected") {
        counts.Rejected += 1;
      } else if (a.status === "interview") {
        counts.Interview += 1;
      } else if (a.screeningStatus === "shortlisted") {
        counts.Shortlisted += 1;
      } else if (a.screeningStatus === "screened") {
        counts.Screening += 1;
      } else {
        counts.Applied += 1;
      }
    }
    return counts;
  }, [filteredApplications]);

  // Post Performance Breakdown
  const postPerformance = React.useMemo(() => {
    return posts.map((post) => {
      const apps = applications.filter((a) => a.jobId === post.id);
      const shortlisted = apps.filter((a) => a.screeningStatus === "shortlisted").length;
      const interviewed = apps.filter((a) => (a.interviewRounds && a.interviewRounds.length > 0) || a.status === "interview").length;
      const hired = apps.filter((a) => a.status === "selected" || a.finalStatus === "selected").length;
      return {
        id: post.id,
        roleTitle: post.roleTitle,
        openings: post.openings,
        applications: apps.length,
        shortlisted,
        interviewed,
        hired,
      };
    });
  }, [posts, applications]);

  // Selected post object for Knowledge Test check
  const selectedPostObj = React.useMemo(() => {
    return posts.find((p) => p.id === selectedPostId);
  }, [posts, selectedPostId]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Final Hiring & Interactive Analytics
          </h1>
          <p className="text-xs text-muted-foreground">
            Authoritative hiring selections, offer extensions, real-time application funnels, and recruitment performance telemetry.
          </p>
        </div>

        {/* Real Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedPostId}
            onChange={(e) => setSelectedPostId(e.target.value)}
            className="h-8 rounded-md border border-border bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Hiring Posts ({posts.length})</option>
            {posts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.roleTitle}
              </option>
            ))}
          </select>

          <div className="flex rounded-md border border-border bg-muted/40 p-0.5 text-xs">
            {(["all", "30d", "90d"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  timeRange === r
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Hiring Analytics Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <span className="text-[11px] text-muted-foreground uppercase font-medium">Total Applied</span>
            <p className="text-2xl font-bold font-mono text-foreground">{funnel[0].count}</p>
            <p className="text-[10px] text-muted-foreground">In selected scope</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <span className="text-[11px] text-muted-foreground uppercase font-medium">Interview Pipeline</span>
            <p className="text-2xl font-bold font-mono text-foreground">{funnel[3].count}</p>
            <p className="text-[10px] text-muted-foreground">Candidates evaluated</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <span className="text-[11px] text-muted-foreground uppercase font-medium">Offers / Selected</span>
            <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{funnel[4].count}</p>
            <p className="text-[10px] text-muted-foreground">Acquired placements</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <span className="text-[11px] text-muted-foreground uppercase font-medium">Conversion Rate</span>
            <p className="text-2xl font-bold font-mono text-foreground">
              {funnel[0].count ? ((funnel[4].count / funnel[0].count) * 100).toFixed(1) : "0.0"}%
            </p>
            <p className="text-[10px] text-muted-foreground">Applied to Offer</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Charts: Application Funnel & Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CHART 1: Application Funnel */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-primary" />
                1. Recruitment Funnel
              </CardTitle>
              <span className="text-[10px] font-mono text-muted-foreground">Live Telemetry</span>
            </div>
            <CardDescription className="text-xs text-muted-foreground">
              Progressive conversion through each screening and evaluation phase.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {funnel.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">{item.stage}</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-foreground">{item.count} candidates</span>
                    <span className="text-muted-foreground">({item.pct}%)</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(4, item.pct)}%` }}
                    title={`${item.stage}: ${item.count} (${item.pct}%)`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CHART 2: Status Distribution */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-primary" />
                2. Application Status Distribution
              </CardTitle>
              <span className="text-[10px] font-mono text-muted-foreground">Categorized</span>
            </div>
            <CardDescription className="text-xs text-muted-foreground">
              Exact volume breakdown according to authoritative database statuses.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {Object.entries(statusCounts).map(([status, count]) => {
              const maxVal = Math.max(1, ...Object.values(statusCounts));
              const pct = Math.round((count / maxVal) * 100);
              return (
                <div key={status} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{status}</span>
                    <span className="font-mono text-foreground font-semibold">{count}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        status === "Selected"
                          ? "bg-emerald-500"
                          : status === "Rejected"
                          ? "bg-destructive/80"
                          : status === "Interview"
                          ? "bg-amber-500"
                          : "bg-foreground/70"
                      }`}
                      style={{ width: `${count > 0 ? Math.max(6, pct) : 0}%` }}
                      title={`${status}: ${count}`}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* CHART 3: Hiring Performance by Post */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-primary" />
            3. Hiring Performance by Opportunity
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Compare application volume, shortlisted candidates, and final offers across each hiring post.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {postPerformance.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No hiring posts created yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="pl-4">Hiring Post</TableHead>
                  <TableHead>Openings</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Shortlisted</TableHead>
                  <TableHead>Interviewed</TableHead>
                  <TableHead className="pr-4">Hired / Offered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {postPerformance.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/20">
                    <TableCell className="pl-4 font-semibold text-foreground">{item.roleTitle}</TableCell>
                    <TableCell className="font-mono">{item.openings}</TableCell>
                    <TableCell className="font-mono font-semibold">{item.applications}</TableCell>
                    <TableCell className="font-mono">{item.shortlisted}</TableCell>
                    <TableCell className="font-mono">{item.interviewed}</TableCell>
                    <TableCell className="pr-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {item.hired} / {item.openings}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* CHART 4: Knowledge Test Analysis (ONLY when selected post has a test) */}
      {selectedPostObj?.knowledgeTest?.enabled && (
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <FileQuestion className="w-4 h-4 text-primary" />
                4. Knowledge Test Analysis & Assessment Metrics
              </CardTitle>
              <Badge variant="outline" className="text-[10px]">
                {selectedPostObj.knowledgeTest.selectedQuestionIds.length} Questions
              </Badge>
            </div>
            <CardDescription className="text-xs text-muted-foreground">
              Technical benchmark performance for {selectedPostObj.roleTitle}.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-border bg-muted/20">
              <span className="text-[10px] text-muted-foreground block font-mono">Test Title</span>
              <span className="font-semibold text-foreground">
                {selectedPostObj.knowledgeTest.testTitle || "Technical Evaluation"}
              </span>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/20">
              <span className="text-[10px] text-muted-foreground block font-mono">Approval Status</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 capitalize">
                {selectedPostObj.knowledgeTest.approvalStatus}
              </span>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/20">
              <span className="text-[10px] text-muted-foreground block font-mono">AI Relevance Score</span>
              <span className="font-semibold text-foreground font-mono">
                {selectedPostObj.knowledgeTest.aiReviewFeedback?.relevanceScore || 95}%
              </span>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/20">
              <span className="text-[10px] text-muted-foreground block font-mono">Total Candidates Assessed</span>
              <span className="font-semibold text-foreground font-mono">
                {filteredApplications.length}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CANDIDATE FINAL DECISION & OFFER ACTION TABLE */}
      <Card className="border-border">
        <CardHeader className="p-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-500" />
                Candidate Final Decision Console
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Extend formal offers to vetted candidates. Selection updates candidate profiles with verified acquired opportunities.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="pl-4">Candidate</TableHead>
                <TableHead>Opportunity</TableHead>
                <TableHead>Interview Rounds</TableHead>
                <TableHead>Final Decision Status</TableHead>
                <TableHead className="pr-4 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No candidate records found for current criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((app) => {
                  const isHired = app.status === "selected" || app.finalStatus === "selected";
                  const isRejected = app.status === "rejected" || app.finalStatus === "rejected";
                  return (
                    <TableRow key={app.id} className="hover:bg-muted/20">
                      <TableCell className="pl-4">
                        <p className="font-semibold text-foreground">{app.applicantFullName || "Candidate"}</p>
                        <p className="text-[11px] text-muted-foreground font-mono">{app.applicantEmail}</p>
                      </TableCell>

                      <TableCell>
                        <p className="font-semibold text-foreground">{app.roleTitle}</p>
                        <p className="text-[11px] text-muted-foreground">{app.employmentType || "Full-time"}</p>
                      </TableCell>

                      <TableCell className="font-mono">
                        {app.interviewRounds && app.interviewRounds.length > 0 ? (
                          <span className="text-foreground font-semibold">
                            {app.interviewRounds.length} round(s) evaluated
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>

                      <TableCell>
                        {isHired ? (
                          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Selected / Hired
                          </Badge>
                        ) : isRejected ? (
                          <Badge variant="destructive" className="text-[10px]">
                            <XCircle className="w-3 h-3 mr-1" /> Not Selected
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px]">
                            Pending Decision
                          </Badge>
                        )}
                      </TableCell>

                      <TableCell className="pr-4 text-right">
                        {!isHired && (
                          <Button
                            size="xs"
                            onClick={() => {
                              setSelectedAppForOffer(app);
                              setOfferedRole(app.roleTitle || "");
                              setOfferedComp(app.salaryRange || "Competitive");
                              setStartDate(new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split("T")[0]);
                            }}
                            className="text-xs h-7 gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Select & Extend Offer</span>
                          </Button>
                        )}
                        {isHired && (
                          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                            Placement Confirmed
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Offer Extension Modal */}
      {selectedAppForOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/20">
              <div className="space-y-0.5">
                <Badge variant="outline" className="text-[10px]">
                  Final Selection
                </Badge>
                <h3 className="text-base font-bold text-foreground">
                  Extend Official Offer &bull; {selectedAppForOffer.applicantFullName || "Candidate"}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppForOffer(null)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground block">Offered Job / Role Title</label>
                <Input
                  value={offeredRole}
                  onChange={(e) => setOfferedRole(e.target.value)}
                  className="text-xs h-8"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground block">Compensation / Stipend</label>
                  <Input
                    value={offeredComp}
                    onChange={(e) => setOfferedComp(e.target.value)}
                    placeholder="e.g. ₹8,50,000 / annum"
                    className="text-xs h-8"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground block">Intended Start Date</label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-xs h-8"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground block">
                  Offer Letter Notes / Congratulations
                </label>
                <textarea
                  value={offerNotes}
                  onChange={(e) => setOfferNotes(e.target.value)}
                  placeholder="We are pleased to offer you the position of..."
                  rows={3}
                  className="w-full rounded-md border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-[11px] text-emerald-800 dark:text-emerald-200">
                Notice: Confirming this selection will authoritatively record the candidate as <strong>Selected</strong> and immediately update the student&apos;s verified institutional profile with this Acquired Opportunity.
              </div>
            </div>

            <div className="p-4 border-t border-border flex items-center justify-between bg-muted/10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAppForOffer(null)}
                className="text-xs"
              >
                Cancel
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isSubmittingOffer}
                  onClick={() => setAppToRejectFinal(selectedAppForOffer)}
                  className="text-xs"
                >
                  Reject Candidate
                </Button>
                <Button
                  size="sm"
                  disabled={isSubmittingOffer}
                  onClick={() => handleFinalDecision("selected")}
                  className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Check className="w-3.5 h-3.5 mr-1" /> Confirm Selection & Offer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Destructive Action Alert Dialog for Final Rejection */}
      <AlertDialog
        open={Boolean(appToRejectFinal)}
        onOpenChange={(open) => !open && setAppToRejectFinal(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Decline Candidate for this Position?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark {appToRejectFinal?.applicantFullName || "this candidate"} as Not Selected for {appToRejectFinal?.roleTitle}? This decision will finalize their application process for this hiring opportunity.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (appToRejectFinal) {
                  handleFinalDecision("rejected", appToRejectFinal);
                }
              }}
            >
              Confirm Rejection
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
