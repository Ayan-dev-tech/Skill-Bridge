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
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  FileCheck,
  Award,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Eye,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import type { JobApplicationRecord } from "@/lib/applications/types";

interface ApplicationScreeningViewProps {
  onNavigateToInterviews?: () => void;
}

export function ApplicationScreeningView({ onNavigateToInterviews }: ApplicationScreeningViewProps) {
  const [applications, setApplications] = React.useState<JobApplicationRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "pending" | "shortlisted" | "rejected">("all");
  const [selectedPostFilter, setSelectedPostFilter] = React.useState<string>("all");

  // Selected Application for Detail Modal
  const [selectedApp, setSelectedApp] = React.useState<JobApplicationRecord | null>(null);
  const [screeningNotes, setScreeningNotes] = React.useState("");
  const [isUpdating, setIsUpdating] = React.useState(false);

  const fetchApplications = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/industry/applications");
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load candidate applications.");
      }
      setApplications(json.applications || []);
    } catch (err: unknown) {
      console.error("Fetch applications error:", err);
      setError(err instanceof Error ? err.message : "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleDecision = async (appId: string, decision: "shortlisted" | "rejected" | "screened") => {
    try {
      setIsUpdating(true);
      setError(null);
      const res = await fetch(`/api/industry/applications/${appId}/screening`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decision,
          notes: screeningNotes.trim() || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to record screening decision.");
      }
      setSuccessMessage(`Candidate application marked as ${decision}.`);
      setSelectedApp(null);
      setScreeningNotes("");
      await fetchApplications();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update decision.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Distinct posts for filter
  const postOptions = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const a of applications) {
      if (a.jobId && a.roleTitle) {
        map.set(a.jobId, a.roleTitle);
      }
    }
    return Array.from(map.entries());
  }, [applications]);

  // Filtered applications
  const filteredApps = React.useMemo(() => {
    return applications.filter((app) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = (app.applicantFullName || "").toLowerCase().includes(q);
        const matchesEmail = (app.applicantEmail || "").toLowerCase().includes(q);
        const matchesRole = (app.roleTitle || "").toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesRole) return false;
      }
      // Status filter
      if (statusFilter !== "all") {
        const curStatus = app.screeningStatus || "pending";
        if (curStatus !== statusFilter) return false;
      }
      // Post filter
      if (selectedPostFilter !== "all") {
        if (app.jobId !== selectedPostFilter) return false;
      }
      return true;
    });
  }, [applications, searchQuery, statusFilter, selectedPostFilter]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Application Screening
          </h1>
          <p className="text-xs text-muted-foreground">
            Review student applications for your hiring posts, verify credentials, evaluate test scores, and shortlist candidates for interviews.
          </p>
        </div>

        {onNavigateToInterviews && (
          <Button
            size="sm"
            variant="outline"
            onClick={onNavigateToInterviews}
            className="text-xs gap-1.5 self-start sm:self-auto"
          >
            <span>Interview Schedule</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>

      {/* Alerts */}
      {successMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-xs text-destructive flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search candidate name, email, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs pl-8 h-8"
            />
          </div>

          {postOptions.length > 0 && (
            <select
              value={selectedPostFilter}
              onChange={(e) => setSelectedPostFilter(e.target.value)}
              className="h-8 rounded-md border border-border bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Hiring Posts</option>
              {postOptions.map(([id, title]) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Screening status filter pills */}
        <div className="flex items-center gap-1 border border-border rounded-md p-0.5 bg-muted/30 text-xs w-full sm:w-auto overflow-x-auto">
          {(["all", "pending", "shortlisted", "rejected"] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-sm capitalize whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? "bg-background text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Candidates Table */}
      <Card className="border-border">
        <CardHeader className="p-4 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold">
              Applicants ({filteredApps.length})
            </CardTitle>
            <span className="text-[11px] text-muted-foreground font-mono">
              Industry Screening Authority
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              Loading candidate applications...
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Users className="w-8 h-8 text-muted-foreground mx-auto opacity-40" />
              <p className="text-xs font-semibold text-foreground">No applications found</p>
              <p className="text-[11px] text-muted-foreground max-w-sm mx-auto">
                {searchQuery || statusFilter !== "all" || selectedPostFilter !== "all"
                  ? "No candidate applications match the selected filter criteria."
                  : "Candidates will appear here as soon as students apply to your published hiring opportunities."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/30 font-medium text-muted-foreground">
                    <th className="p-3 pl-4">Candidate</th>
                    <th className="p-3">Hiring Opportunity</th>
                    <th className="p-3">Skill Match</th>
                    <th className="p-3">Documents</th>
                    <th className="p-3">Screening Status</th>
                    <th className="p-3">Applied Date</th>
                    <th className="p-3 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredApps.map((app) => {
                    const scrStatus = app.screeningStatus || "pending";
                    return (
                      <tr key={app.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4">
                          <p className="font-semibold text-foreground">
                            {app.applicantFullName || "Candidate"}
                          </p>
                          <p className="text-[11px] text-muted-foreground font-mono">
                            {app.applicantEmail || "—"}
                          </p>
                        </td>

                        <td className="p-3">
                          <p className="font-semibold text-foreground">
                            {app.roleTitle || "Engineering Role"}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {app.employmentType || app.type || "Full-time"}
                          </p>
                        </td>

                        <td className="p-3 font-mono">
                          {app.matchScoreAtApplication !== undefined ? (
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              {app.matchScoreAtApplication}%
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>

                        <td className="p-3">
                          {app.submittedDocumentTypes && app.submittedDocumentTypes.length > 0 ? (
                            <span className="text-[11px] text-foreground flex items-center gap-1 font-mono">
                              <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                              {app.submittedDocumentTypes.length} verified
                            </span>
                          ) : (
                            <span className="text-[11px] text-muted-foreground">Standard</span>
                          )}
                        </td>

                        <td className="p-3">
                          <Badge
                            variant={
                              scrStatus === "shortlisted"
                                ? "default"
                                : scrStatus === "rejected"
                                ? "destructive"
                                : "outline"
                            }
                            className="text-[10px] capitalize"
                          >
                            {scrStatus}
                          </Badge>
                        </td>

                        <td className="p-3 font-mono text-[11px] text-muted-foreground">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </td>

                        <td className="p-3 pr-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              size="xs"
                              variant="outline"
                              onClick={() => {
                                setSelectedApp(app);
                                setScreeningNotes(app.screeningNotes || "");
                              }}
                              className="text-xs h-7 gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Review</span>
                            </Button>

                            {scrStatus === "pending" && (
                              <>
                                <Button
                                  size="xs"
                                  onClick={() => handleDecision(app.id, "shortlisted")}
                                  className="text-xs h-7 bg-emerald-600 hover:bg-emerald-700 text-white"
                                  title="Shortlist for interview"
                                >
                                  <Check className="w-3 h-3 mr-0.5" /> Shortlist
                                </Button>
                                <Button
                                  size="xs"
                                  variant="ghost"
                                  onClick={() => handleDecision(app.id, "rejected")}
                                  className="text-xs h-7 text-destructive hover:text-destructive"
                                  title="Reject application"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review & Decision Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/20">
              <div className="space-y-0.5">
                <Badge variant="outline" className="text-[10px]">
                  Applicant Review
                </Badge>
                <h3 className="text-base font-bold text-foreground">
                  {selectedApp.applicantFullName || "Candidate"}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-lg border border-border bg-muted/20">
                  <span className="text-muted-foreground block font-mono">Role Applied</span>
                  <span className="font-semibold text-foreground">{selectedApp.roleTitle}</span>
                </div>
                <div className="p-2.5 rounded-lg border border-border bg-muted/20">
                  <span className="text-muted-foreground block font-mono">Skill Match</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                    {selectedApp.matchScoreAtApplication || "—"}%
                  </span>
                </div>
                <div className="p-2.5 rounded-lg border border-border bg-muted/20">
                  <span className="text-muted-foreground block font-mono">Email</span>
                  <span className="font-semibold text-foreground">{selectedApp.applicantEmail || "—"}</span>
                </div>
                <div className="p-2.5 rounded-lg border border-border bg-muted/20">
                  <span className="text-muted-foreground block font-mono">Phone</span>
                  <span className="font-semibold text-foreground">{selectedApp.applicantPhone || "—"}</span>
                </div>
              </div>

              {selectedApp.coverLetter && (
                <div className="space-y-1">
                  <span className="font-semibold text-foreground block">Cover Letter / Note</span>
                  <p className="p-3 rounded-md bg-muted/20 border border-border text-muted-foreground leading-relaxed italic">
                    &ldquo;{selectedApp.coverLetter}&rdquo;
                  </p>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedApp.portfolioUrl && (
                  <a
                    href={selectedApp.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-border bg-muted/40 hover:bg-muted text-primary"
                  >
                    <ExternalLink className="w-3 h-3" /> Portfolio
                  </a>
                )}
                {selectedApp.githubUrl && (
                  <a
                    href={selectedApp.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-border bg-muted/40 hover:bg-muted text-primary"
                  >
                    <ExternalLink className="w-3 h-3" /> GitHub
                  </a>
                )}
                {selectedApp.linkedinUrl && (
                  <a
                    href={selectedApp.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-border bg-muted/40 hover:bg-muted text-primary"
                  >
                    <ExternalLink className="w-3 h-3" /> LinkedIn
                  </a>
                )}
              </div>

              {/* Screening Notes input */}
              <div className="space-y-1.5 pt-2 border-t border-border">
                <label className="font-semibold text-foreground block">
                  Screening Evaluation Notes
                </label>
                <textarea
                  value={screeningNotes}
                  onChange={(e) => setScreeningNotes(e.target.value)}
                  placeholder="Record strengths, technical profile observations, or reasons for shortlisting..."
                  rows={3}
                  className="w-full rounded-md border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="p-4 border-t border-border flex items-center justify-between bg-muted/10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedApp(null)}
                className="text-xs"
              >
                Cancel
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isUpdating}
                  onClick={() => handleDecision(selectedApp.id, "rejected")}
                  className="text-xs"
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  disabled={isUpdating}
                  onClick={() => handleDecision(selectedApp.id, "shortlisted")}
                  className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Check className="w-3.5 h-3.5 mr-1" /> Shortlist Candidate
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
