"use client";

import * as React from "react";
import {
  Briefcase,
  Award,
  CheckCircle2,
  RefreshCw,
  Search,
  Users,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { FacultyPlacementOverview } from "@/lib/faculty/types";

export function FacultyApplicationsView() {
  const [data, setData] = React.useState<FacultyPlacementOverview | null>(null);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchApplications = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/faculty/applications");
      if (!res.ok) throw new Error("Failed to load applications");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        throw new Error(json.error || "Failed to load applications data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error connecting to applications API");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const filteredApps = (data?.applications || []).filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(search.toLowerCase()) ||
      app.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
      app.roleTitle.toLowerCase().includes(search.toLowerCase()) ||
      app.companyName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            Career Applications & Placement Progress
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Monitoring student scholar hiring pipeline and application outcomes across industry partners.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchApplications} className="text-xs">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          Refresh
        </Button>
      </div>

      {/* Role Notice Alert */}
      <Alert className="border-border bg-card text-foreground">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <AlertTitle className="text-xs font-semibold">Faculty Mentorship & Oversight Mode</AlertTitle>
        <AlertDescription className="text-xs text-muted-foreground mt-0.5">
          Industry partners exclusively manage applicant screening, interviews, and final hiring decisions.
          Faculty role provides academic advocacy, mentorship, and competency verification.
        </AlertDescription>
      </Alert>

      {/* Career Funnel Progression */}
      {data?.funnel && (
        <Card className="p-5 bg-card border-border space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Placement Conversion Funnel</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <div className="p-3 rounded-lg border border-border bg-muted/20">
              <span className="text-[11px] text-muted-foreground uppercase font-semibold">1. Eligible</span>
              <div className="text-xl font-bold font-mono text-foreground mt-1">{data.funnel.eligible}</div>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/20">
              <span className="text-[11px] text-muted-foreground uppercase font-semibold">2. Applied</span>
              <div className="text-xl font-bold font-mono text-foreground mt-1">{data.funnel.applied}</div>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/20">
              <span className="text-[11px] text-muted-foreground uppercase font-semibold">3. Shortlisted</span>
              <div className="text-xl font-bold font-mono text-amber-500 mt-1">{data.funnel.shortlisted}</div>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/20">
              <span className="text-[11px] text-muted-foreground uppercase font-semibold">4. Interviewed</span>
              <div className="text-xl font-bold font-mono text-primary mt-1">{data.funnel.interviewed}</div>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/20">
              <span className="text-[11px] text-muted-foreground uppercase font-semibold">5. Selected</span>
              <div className="text-xl font-bold font-mono text-emerald-500 mt-1">{data.funnel.selected}</div>
            </div>
            <div className="p-3 rounded-lg border border-border bg-emerald-500/10 border-emerald-500/30">
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold">6. Placed</span>
              <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">{data.funnel.placed}</div>
            </div>
          </div>
        </Card>
      )}

      {/* Applications Table */}
      <Card className="bg-card border-border overflow-hidden">
        <CardHeader className="py-3 px-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm font-semibold">Application Roster</CardTitle>
            <CardDescription className="text-xs">
              Live submission records for assigned department scholars ({filteredApps.length} applications)
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-full sm:w-48">
              <Input
                placeholder="Search scholar or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-xs h-8"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by Status"
              className="text-xs h-8 px-2 rounded-md border border-border bg-background text-foreground"
            >
              <option value="all">All Statuses</option>
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview">Interview</option>
              <option value="selected">Selected / Placed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : error ? (
            <div className="p-6 text-center text-xs text-destructive">{error}</div>
          ) : filteredApps.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No application records found matching filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs font-bold text-muted-foreground">Scholar</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Role Applied</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Company</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Applied Date</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground text-right">Stage Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApps.map((app) => (
                    <TableRow key={app.id} className="border-border hover:bg-muted/40 text-xs">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">{app.studentName}</span>
                          <span className="text-[10px] font-mono text-muted-foreground">{app.rollNumber}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{app.roleTitle}</TableCell>
                      <TableCell className="text-muted-foreground flex items-center gap-1.5 py-3">
                        <Building2 className="h-3.5 w-3.5 text-muted-foreground/70" />
                        {app.companyName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            app.status === "selected"
                              ? "default"
                              : app.status === "interview" || app.screeningStatus === "shortlisted"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-[10px] capitalize"
                        >
                          {app.screeningStatus === "shortlisted" && app.status === "applied"
                            ? "Shortlisted"
                            : app.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
