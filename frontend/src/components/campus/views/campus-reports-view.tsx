"use client";

import * as React from "react";
import {
  BarChart3,
  TrendingUp,
  Filter,
  CheckCircle2,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  AlertCircle,
  Download,
  Calendar,
  Layers,
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
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { PlacementReportData } from "@/lib/campus/types";

export function CampusReportsView() {
  const [reportData, setReportData] = React.useState<PlacementReportData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Filters
  const [selectedDept, setSelectedDept] = React.useState("all");
  const [selectedBatch, setSelectedBatch] = React.useState("all");
  const [activeTab, setActiveTab] = React.useState<"department" | "batch" | "industry" | "job">("department");

  const fetchReports = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (selectedDept !== "all") params.append("department", selectedDept);
      if (selectedBatch !== "all") params.append("batchYear", selectedBatch);

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

      const res = await fetch(`/api/campus/reports?${params.toString()}`, { headers });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load placement analytics.");
      }

      setReportData(json.report);
    } catch (err: unknown) {
      console.error("Reports fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to load placement reports.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedDept, selectedBatch]);

  React.useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Derived filter options
  const departmentOptions = React.useMemo(() => {
    if (!reportData?.byDepartment) return [];
    return reportData.byDepartment.map((d) => d.department);
  }, [reportData]);

  const batchOptions = React.useMemo(() => {
    if (!reportData?.byBatch) return [];
    return reportData.byBatch.map((b) => b.batchYear);
  }, [reportData]);

  const overview = reportData?.overview || {
    totalEligible: 0,
    totalApplied: 0,
    totalShortlisted: 0,
    totalInterviewed: 0,
    totalSelected: 0,
    totalPlaced: 0,
    placementRate: 0,
  };

  const funnelStages = [
    {
      stage: "1. Eligible Cohort",
      count: overview.totalEligible,
      pct: 100,
      color: "bg-primary",
    },
    {
      stage: "2. Applied",
      count: overview.totalApplied,
      pct: overview.totalEligible ? Math.round((overview.totalApplied / overview.totalEligible) * 100) : 0,
      color: "bg-amber-500",
    },
    {
      stage: "3. Shortlisted",
      count: overview.totalShortlisted,
      pct: overview.totalApplied ? Math.round((overview.totalShortlisted / overview.totalApplied) * 100) : 0,
      color: "bg-blue-500",
    },
    {
      stage: "4. Interviewed",
      count: overview.totalInterviewed,
      pct: overview.totalApplied ? Math.round((overview.totalInterviewed / overview.totalApplied) * 100) : 0,
      color: "bg-indigo-500",
    },
    {
      stage: "5. Selected & Placed",
      count: overview.totalSelected,
      pct: overview.totalApplied ? Math.round((overview.totalSelected / overview.totalApplied) * 100) : 0,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-border bg-muted/40 text-[11px] text-muted-foreground font-medium mb-1">
            <BarChart3 className="w-3 h-3 text-foreground" />
            <span>Placement Intelligence</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              {overview.placementRate}% Overall Placement Rate
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Placement Analytics & Institutional Reports
          </h1>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Real data telemetry tracking departmental placement velocity, corporate conversion benchmarks, and batch-wise hiring attainment.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="text-xs h-9 px-3 rounded-md border border-border bg-background text-foreground shrink-0"
          >
            <option value="all">All Departments</option>
            {departmentOptions.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="text-xs h-9 px-3 rounded-md border border-border bg-background text-foreground shrink-0"
          >
            <option value="all">All Batches</option>
            {batchOptions.map((batch) => (
              <option key={batch} value={batch}>
                Batch {batch}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-md border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <Button size="sm" variant="ghost" onClick={fetchReports} className="h-7 text-xs">
            Retry
          </Button>
        </div>
      )}

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="border-border bg-card">
          <CardContent className="p-3.5 space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-semibold">Eligible Pool</p>
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? <Skeleton className="h-7 w-12" /> : overview.totalEligible}
            </div>
            <p className="text-[10px] text-muted-foreground">Registered students</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-3.5 space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-semibold">Applied</p>
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? <Skeleton className="h-7 w-12" /> : overview.totalApplied}
            </div>
            <p className="text-[10px] text-muted-foreground">Applications filed</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-3.5 space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-semibold">Shortlisted</p>
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? <Skeleton className="h-7 w-12" /> : overview.totalShortlisted}
            </div>
            <p className="text-[10px] text-muted-foreground">Cleared screening</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-3.5 space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-semibold">Interviewed</p>
            <div className="text-2xl font-bold font-mono text-foreground">
              {isLoading ? <Skeleton className="h-7 w-12" /> : overview.totalInterviewed}
            </div>
            <p className="text-[10px] text-muted-foreground">Rounds scheduled</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-3.5 space-y-1">
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold">Selected</p>
            <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {isLoading ? <Skeleton className="h-7 w-12" /> : overview.totalSelected}
            </div>
            <p className="text-[10px] text-muted-foreground">Offers extended</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-3.5 space-y-1">
            <p className="text-[10px] text-primary uppercase font-semibold">Placement Rate</p>
            <div className="text-2xl font-bold font-mono text-primary">
              {isLoading ? <Skeleton className="h-7 w-12" /> : `${overview.placementRate}%`}
            </div>
            <p className="text-[10px] text-muted-foreground">Selected / Applied</p>
          </CardContent>
        </Card>
      </div>

      {/* Visual Placement Funnel */}
      <Card className="border-border bg-card">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Placement Pipeline Conversion Telemetry
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Progressive conversion attrition through academic recruitment phases
              </CardDescription>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">Live Telemetry</span>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-3 space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          ) : overview.totalEligible === 0 && overview.totalApplied === 0 ? (
            <div className="p-8 text-center border border-dashed border-border rounded-md">
              <p className="text-xs text-muted-foreground">No placement data available for current filters.</p>
            </div>
          ) : (
            funnelStages.map((stage, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">{stage.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-foreground">{stage.count} students</span>
                    <span className="text-[10px] text-muted-foreground font-mono w-10 text-right">
                      {stage.pct}%
                    </span>
                  </div>
                </div>
                <Progress value={stage.pct} className="h-2" />
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Interactive Breakdown Tabs: Department, Batch, Industry, Job */}
      <div className="space-y-3">
        <div className="flex items-center gap-1 border border-border rounded-lg p-1 bg-muted/20 w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("department")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === "department"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            By Department ({reportData?.byDepartment?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("batch")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === "batch"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            By Batch ({reportData?.byBatch?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("industry")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === "industry"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            By Industry ({reportData?.byIndustry?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("job")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === "job"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            By Job / Role ({reportData?.byJob?.length || 0})
          </button>
        </div>

        {/* Tab 1: Department Breakdown */}
        {activeTab === "department" && (
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/40 text-muted-foreground font-medium border-b border-border">
                    <tr>
                      <th className="p-3 pl-4">Department</th>
                      <th className="p-3 text-right">Eligible</th>
                      <th className="p-3 text-right">Applied</th>
                      <th className="p-3 text-right">Shortlisted</th>
                      <th className="p-3 text-right">Interviewed</th>
                      <th className="p-3 text-right">Selected</th>
                      <th className="p-3 pr-4 text-right">Placement Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {!reportData?.byDepartment || reportData.byDepartment.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-muted-foreground">
                          No departmental breakdown records found.
                        </td>
                      </tr>
                    ) : (
                      reportData.byDepartment.map((dept, idx) => {
                        const rate = dept.applied ? Math.round((dept.selected / dept.applied) * 100) : 0;
                        return (
                          <tr key={idx} className="hover:bg-muted/30 transition-colors">
                            <td className="p-3 pl-4 font-semibold text-foreground">{dept.department}</td>
                            <td className="p-3 text-right font-mono text-muted-foreground">{dept.eligible}</td>
                            <td className="p-3 text-right font-mono text-foreground">{dept.applied}</td>
                            <td className="p-3 text-right font-mono text-foreground">{dept.shortlisted}</td>
                            <td className="p-3 text-right font-mono text-foreground">{dept.interviewed}</td>
                            <td className="p-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                              {dept.selected}
                            </td>
                            <td className="p-3 pr-4 text-right">
                              <Badge
                                variant="outline"
                                className={`text-[10px] ${
                                  rate >= 50
                                    ? "text-emerald-600 border-emerald-500/30"
                                    : "text-muted-foreground border-border"
                                }`}
                              >
                                {rate}%
                              </Badge>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab 2: Batch Breakdown */}
        {activeTab === "batch" && (
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/40 text-muted-foreground font-medium border-b border-border">
                    <tr>
                      <th className="p-3 pl-4">Batch Year</th>
                      <th className="p-3 text-right">Eligible</th>
                      <th className="p-3 text-right">Applied</th>
                      <th className="p-3 text-right">Shortlisted</th>
                      <th className="p-3 text-right">Interviewed</th>
                      <th className="p-3 text-right">Selected</th>
                      <th className="p-3 pr-4 text-right">Placement Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {!reportData?.byBatch || reportData.byBatch.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-muted-foreground">
                          No batch breakdown records found.
                        </td>
                      </tr>
                    ) : (
                      reportData.byBatch.map((batch, idx) => {
                        const rate = batch.applied ? Math.round((batch.selected / batch.applied) * 100) : 0;
                        return (
                          <tr key={idx} className="hover:bg-muted/30 transition-colors">
                            <td className="p-3 pl-4 font-semibold text-foreground">Batch {batch.batchYear}</td>
                            <td className="p-3 text-right font-mono text-muted-foreground">{batch.eligible}</td>
                            <td className="p-3 text-right font-mono text-foreground">{batch.applied}</td>
                            <td className="p-3 text-right font-mono text-foreground">{batch.shortlisted}</td>
                            <td className="p-3 text-right font-mono text-foreground">{batch.interviewed}</td>
                            <td className="p-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                              {batch.selected}
                            </td>
                            <td className="p-3 pr-4 text-right">
                              <Badge variant="outline" className="text-[10px]">
                                {rate}%
                              </Badge>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab 3: Industry Breakdown */}
        {activeTab === "industry" && (
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/40 text-muted-foreground font-medium border-b border-border">
                    <tr>
                      <th className="p-3 pl-4">Company Name</th>
                      <th className="p-3">Industry Domain</th>
                      <th className="p-3 text-right">Openings</th>
                      <th className="p-3 text-right">Applied</th>
                      <th className="p-3 text-right">Shortlisted</th>
                      <th className="p-3 text-right">Interviewed</th>
                      <th className="p-3 pr-4 text-right">Selected</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {!reportData?.byIndustry || reportData.byIndustry.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-muted-foreground">
                          No corporate partner records found.
                        </td>
                      </tr>
                    ) : (
                      reportData.byIndustry.map((ind, idx) => (
                        <tr key={idx} className="hover:bg-muted/30 transition-colors">
                          <td className="p-3 pl-4 font-semibold text-foreground">{ind.companyName}</td>
                          <td className="p-3 text-muted-foreground">{ind.industryDomain}</td>
                          <td className="p-3 text-right font-mono text-muted-foreground">{ind.openings}</td>
                          <td className="p-3 text-right font-mono text-foreground">{ind.applied}</td>
                          <td className="p-3 text-right font-mono text-foreground">{ind.shortlisted}</td>
                          <td className="p-3 text-right font-mono text-foreground">{ind.interviewed}</td>
                          <td className="p-3 pr-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {ind.selected}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab 4: Job Breakdown */}
        {activeTab === "job" && (
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/40 text-muted-foreground font-medium border-b border-border">
                    <tr>
                      <th className="p-3 pl-4">Role Title</th>
                      <th className="p-3">Company</th>
                      <th className="p-3 text-right">Openings</th>
                      <th className="p-3 text-right">Applied</th>
                      <th className="p-3 text-right">Shortlisted</th>
                      <th className="p-3 text-right">Interviewed</th>
                      <th className="p-3 pr-4 text-right">Selected</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {!reportData?.byJob || reportData.byJob.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-muted-foreground">
                          No job-specific records found.
                        </td>
                      </tr>
                    ) : (
                      reportData.byJob.map((job, idx) => (
                        <tr key={idx} className="hover:bg-muted/30 transition-colors">
                          <td className="p-3 pl-4 font-semibold text-foreground">{job.roleTitle}</td>
                          <td className="p-3 text-muted-foreground">{job.companyName}</td>
                          <td className="p-3 text-right font-mono text-muted-foreground">{job.openings}</td>
                          <td className="p-3 text-right font-mono text-foreground">{job.applied}</td>
                          <td className="p-3 text-right font-mono text-foreground">{job.shortlisted}</td>
                          <td className="p-3 text-right font-mono text-foreground">{job.interviewed}</td>
                          <td className="p-3 pr-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {job.selected}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
