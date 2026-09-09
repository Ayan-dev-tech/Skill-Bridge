"use client";

import * as React from "react";
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Building2,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  X,
  ShieldCheck,
  Calendar,
  Layers,
  Award,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { CampusApplicationRecord, CampusApplicationStatus } from "@/lib/campus/types";

export function CampusApplicationsView() {
  const [applications, setApplications] = React.useState<CampusApplicationRecord[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Filters
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [deptFilter, setDeptFilter] = React.useState<string>("all");

  // Detail Modal
  const [selectedApp, setSelectedApp] = React.useState<CampusApplicationRecord | null>(null);

  const fetchApplications = React.useCallback(async (pageNum: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: String(pageNum),
        limit: "10",
      });

      if (search.trim()) params.append("search", search.trim());
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (deptFilter !== "all") params.append("department", deptFilter);

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

      const res = await fetch(`/api/campus/applications?${params.toString()}`, { headers });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load placement applications.");
      }

      setApplications(json.applications || []);
      setTotalCount(json.totalCount || 0);
      setPage(json.page || 1);
      setTotalPages(json.totalPages || 1);
    } catch (err: unknown) {
      console.error("Applications fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to load placement applications.");
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter, deptFilter]);

  React.useEffect(() => {
    fetchApplications(1);
  }, [fetchApplications]);

  const departments = React.useMemo(() => {
    const set = new Set<string>();
    applications.forEach((a) => {
      if (a.studentDepartment) set.add(a.studentDepartment);
    });
    return Array.from(set);
  }, [applications]);

  // Stage pipeline counts from current fetched list or overview
  const pipelineCounts = React.useMemo(() => {
    const counts = { applied: 0, shortlisted: 0, interviewed: 0, selected: 0, placed: 0 };
    applications.forEach((a) => {
      if (a.status === "placed") counts.placed++;
      else if (a.status === "selected") counts.selected++;
      else if (a.status === "interviewed") counts.interviewed++;
      else if (a.status === "shortlisted") counts.shortlisted++;
      else if (a.status === "applied") counts.applied++;
    });
    return counts;
  }, [applications]);

  const getStatusBadge = (status: CampusApplicationStatus) => {
    switch (status) {
      case "placed":
      case "selected":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 uppercase text-[10px]">
            {status}
          </Badge>
        );
      case "interviewed":
      case "shortlisted":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 uppercase text-[10px]">
            {status}
          </Badge>
        );
      case "applied":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 uppercase text-[10px]">
            Applied
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="text-destructive border-destructive/30 uppercase text-[10px]">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="uppercase text-[10px]">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-border bg-muted/40 text-[11px] text-muted-foreground font-medium mb-1">
            <Layers className="w-3 h-3 text-foreground" />
            <span>Placement Funnel</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-foreground font-semibold">{totalCount} Applications Tracked</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Application Pipeline & Stage Tracking
          </h1>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Live tracking across the placement continuum: Eligible → Applied → Shortlisted → Interviewed → Selected → Placed.
          </p>
        </div>

        {/* Read-Only Governance Banner */}
        <div className="p-2.5 rounded-md bg-muted/40 border border-border text-[11px] text-muted-foreground flex items-center gap-2 max-w-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Campus tracks verified progress. Final hiring status is managed exclusively by hiring partners.</span>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </div>
          <Button size="sm" variant="ghost" onClick={() => fetchApplications(page)} className="h-7 text-xs">
            Retry
          </Button>
        </Alert>
      )}

      {/* Stage Tracker Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <div
          onClick={() => setStatusFilter(statusFilter === "applied" ? "all" : "applied")}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            statusFilter === "applied"
              ? "bg-primary/10 border-primary text-primary"
              : "bg-card border-border hover:border-foreground/30"
          }`}
        >
          <p className="text-[10px] uppercase font-semibold text-muted-foreground">1. Applied</p>
          <p className="text-xl font-bold font-mono text-foreground">{pipelineCounts.applied}</p>
        </div>

        <div
          onClick={() => setStatusFilter(statusFilter === "shortlisted" ? "all" : "shortlisted")}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            statusFilter === "shortlisted"
              ? "bg-blue-500/10 border-blue-500 text-blue-600"
              : "bg-card border-border hover:border-foreground/30"
          }`}
        >
          <p className="text-[10px] uppercase font-semibold text-muted-foreground">2. Shortlisted</p>
          <p className="text-xl font-bold font-mono text-foreground">{pipelineCounts.shortlisted}</p>
        </div>

        <div
          onClick={() => setStatusFilter(statusFilter === "interviewed" ? "all" : "interviewed")}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            statusFilter === "interviewed"
              ? "bg-indigo-500/10 border-indigo-500 text-indigo-600"
              : "bg-card border-border hover:border-foreground/30"
          }`}
        >
          <p className="text-[10px] uppercase font-semibold text-muted-foreground">3. Interviewed</p>
          <p className="text-xl font-bold font-mono text-foreground">{pipelineCounts.interviewed}</p>
        </div>

        <div
          onClick={() => setStatusFilter(statusFilter === "selected" ? "all" : "selected")}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            statusFilter === "selected"
              ? "bg-emerald-500/10 border-emerald-500 text-emerald-600"
              : "bg-card border-border hover:border-foreground/30"
          }`}
        >
          <p className="text-[10px] uppercase font-semibold text-muted-foreground">4. Selected</p>
          <p className="text-xl font-bold font-mono text-foreground">{pipelineCounts.selected}</p>
        </div>

        <div
          onClick={() => setStatusFilter(statusFilter === "placed" ? "all" : "placed")}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            statusFilter === "placed"
              ? "bg-emerald-600/10 border-emerald-600 text-emerald-600"
              : "bg-card border-border hover:border-foreground/30"
          }`}
        >
          <p className="text-[10px] uppercase font-semibold text-muted-foreground">5. Placed</p>
          <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {pipelineCounts.placed}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-border bg-card">
        <CardContent className="p-3.5">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search candidate name, roll number, role, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 text-xs h-9"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs h-9 px-3 rounded-md border border-border bg-background text-foreground shrink-0"
              >
                <option value="all">All Pipeline Stages</option>
                <option value="applied">Applied</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interviewed">Interviewed</option>
                <option value="selected">Selected</option>
                <option value="placed">Placed</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="text-xs h-9 px-3 rounded-md border border-border bg-background text-foreground shrink-0"
              >
                <option value="all">All Departments</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              {(search || statusFilter !== "all" || deptFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("all");
                    setDeptFilter("all");
                  }}
                  className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card className="border-border bg-card">
        <CardHeader className="p-4 pb-2 border-b border-border flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">
              Candidate Applications ({totalCount})
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Page {page} of {totalPages || 1}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || isLoading}
              onClick={() => fetchApplications(page - 1)}
              className="h-7 px-2 text-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages || isLoading}
              onClick={() => fetchApplications(page + 1)}
              className="h-7 px-2 text-xs"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <FileText className="w-8 h-8 text-muted-foreground mx-auto" />
              <p className="text-sm font-medium text-foreground">No applications found</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No candidate submissions match your current search and stage criteria.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="w-full text-xs text-left">
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4">Student Candidate</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Corporate Partner & Role</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Pipeline Status</TableHead>
                    <TableHead className="pr-4 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="pl-4">
                        <div className="font-semibold text-foreground">{app.studentName}</div>
                        <div className="text-[11px] font-mono text-muted-foreground">
                          {app.studentRollNumber || "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] font-normal">
                          {app.studentDepartment || "General"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground">{app.roleTitle}</div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          <span>{app.companyName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {app.hiringType}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(app.status)}
                      </TableCell>
                      <TableCell className="pr-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedApp(app)}
                          className="h-7 text-xs gap-1 hover:bg-muted"
                        >
                          <span>Stage Details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Stage Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-card border border-border rounded-lg shadow-xl p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getStatusBadge(selectedApp.status)}
                  <span className="text-[11px] text-muted-foreground font-mono">{selectedApp.hiringType}</span>
                </div>
                <h2 className="text-base font-bold text-foreground">{selectedApp.roleTitle}</h2>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3 h-3" />
                  <span>{selectedApp.companyName}</span>
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedApp(null)}
                className="h-7 w-7 p-0 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Candidate Info */}
              <div className="p-3 rounded-md bg-muted/30 border border-border space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Candidate:</span>
                  <span className="font-semibold text-foreground">{selectedApp.studentName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Roll Number:</span>
                  <span className="font-mono text-foreground">{selectedApp.studentRollNumber || "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="text-foreground">{selectedApp.studentDepartment}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Batch:</span>
                  <span className="text-foreground">{selectedApp.studentBatchYear || "—"}</span>
                </div>
              </div>

              {/* Stage Breakdown */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Authoritative Recruitment Pipeline</h3>
                <div className="space-y-2">
                  <div className="p-2 rounded border border-border bg-card flex items-center justify-between">
                    <span>Initial Screening</span>
                    <Badge variant="outline" className="capitalize text-[10px]">
                      {selectedApp.screeningStatus || "completed"}
                    </Badge>
                  </div>
                  <div className="p-2 rounded border border-border bg-card flex items-center justify-between">
                    <span>Interview Stage</span>
                    <Badge variant="outline" className="capitalize text-[10px]">
                      {selectedApp.interviewStatus?.replace("_", " ") || "scheduled"}
                    </Badge>
                  </div>
                  <div className="p-2 rounded border border-border bg-card flex items-center justify-between">
                    <span>Industry Final Decision</span>
                    <Badge variant="outline" className="capitalize text-[10px]">
                      {selectedApp.finalStatus || "pending"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Offer Details if Selected/Placed */}
              {selectedApp.offerDetails?.offeredRole && (
                <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">Offer Recorded</p>
                  <p className="text-muted-foreground">
                    Role: <span className="text-foreground">{selectedApp.offerDetails.offeredRole}</span>
                  </p>
                  {selectedApp.offerDetails.offeredCompensation && (
                    <p className="text-muted-foreground">
                      Compensation: <span className="text-foreground">{selectedApp.offerDetails.offeredCompensation}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <Button size="sm" variant="outline" onClick={() => setSelectedApp(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
