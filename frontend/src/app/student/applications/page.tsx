"use client";

import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Briefcase,
  Calendar,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { JobApplication, ApplicationStatus } from "@/lib/applications/types";

const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; color: string; bg: string; border: string }
> = {
  applied: {
    label: "Applied",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  in_review: {
    label: "In Review",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  interview: {
    label: "Interview Scheduled",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  selected: {
    label: "Selected / Offered",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  rejected: {
    label: "Not Selected",
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
  },
  withdrawn: {
    label: "Withdrawn",
    color: "text-muted-foreground",
    bg: "bg-muted/30",
    border: "border-border",
  },
};

export default function ApplicationsPage() {
  const [loading, setLoading] = React.useState(true);
  const [applications, setApplications] = React.useState<JobApplication[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const fetchApplications = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/student/applications");
      const json = await res.json();
      if (json.success) {
        setApplications(json.applications || []);
      } else {
        setError(json.error || "Failed to load application telemetry.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Network error fetching applications.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto py-8 px-4 animate-pulse">
        <div className="h-8 bg-muted/40 rounded w-1/3" />
        <div className="h-32 bg-muted/20 rounded-xl border border-border" />
        <div className="space-y-3">
          <div className="h-24 bg-muted/20 rounded-xl border border-border" />
          <div className="h-24 bg-muted/20 rounded-xl border border-border" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-border bg-muted/40 text-xs font-mono text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            <span>Stage 08 &bull; Real-Time Tracking</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Track Applications
          </h1>
          <p className="text-xs text-muted-foreground">
            Monitor your submitted applications, technical screening rounds, and campus drive status.
          </p>
        </div>

        <Button asChild size="sm" className="text-xs shrink-0">
          <Link href="/student/opportunities">
            <Briefcase className="w-3.5 h-3.5 mr-1.5" />
            Explore Jobs & Internships
          </Link>
        </Button>
      </div>

      {/* 2. Error State */}
      {error && (
        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 3. Empty State (Visible with zero applications, no fake data) */}
      {applications.length === 0 ? (
        <Card className="border-border bg-card">
          <CardContent className="py-16 px-6 text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-muted/40 text-muted-foreground flex items-center justify-center mx-auto border border-border">
              <Send className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-lg font-bold text-foreground">
                No applications yet
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Applications you submit will appear here. When you apply to verified campus drives or partner internships, you can monitor your screening and interview milestones in real time.
              </p>
            </div>
            <div className="pt-2">
              <Button asChild size="default" className="text-xs gap-1.5">
                <Link href="/student/opportunities">
                  Explore Jobs & Internships
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* 4. Real Applications List */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Submitted Applications ({applications.length})
            </span>
          </div>

          <div className="space-y-3">
            {applications.map((app) => {
              const statusCfg =
                STATUS_CONFIG[app.status as ApplicationStatus] || STATUS_CONFIG.applied;

              return (
                <Card key={app.id} className="border-border bg-card hover:border-border/80 transition-all">
                  <CardHeader className="p-5 pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge className={`${statusCfg.bg} ${statusCfg.color} ${statusCfg.border} text-[10px]`}>
                            {statusCfg.label}
                          </Badge>
                          {app.matchScoreAtApplication && (
                            <span className="text-[10px] font-mono text-muted-foreground">
                              {app.matchScoreAtApplication}% Skill Match at submission
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-base font-bold text-foreground">
                          {app.roleTitle || app.position || "Engineering Role"}
                        </CardTitle>
                        <CardDescription className="text-xs text-muted-foreground flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{app.companyName}</span>
                          <span>&bull;</span>
                          <span>{app.location}</span>
                          <span>&bull;</span>
                          <span>{app.employmentType || app.type}</span>
                        </CardDescription>
                      </div>

                      <div className="text-right sm:self-center">
                        <span className="text-[11px] font-mono text-muted-foreground block">
                          Applied on {new Date(app.appliedAt).toLocaleDateString()}
                        </span>
                        {app.salaryRange && (
                          <span className="text-xs font-semibold text-foreground block mt-0.5">
                            {app.salaryRange}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {/* Interview Details (Section 4) */}
                  {app.interviewRounds && app.interviewRounds.length > 0 && (
                    <CardContent className="px-5 pb-4 pt-1 border-t border-border/60 mt-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block pt-2 mb-2">
                        Interview Schedule & Evaluation
                      </span>
                      <div className="space-y-2">
                        {app.interviewRounds.map((round) => (
                          <div
                            key={round.roundNumber}
                            className="p-3 rounded-lg border border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-foreground">{round.roundName}</span>
                                <Badge variant="outline" className="text-[10px]">
                                  {round.mode}
                                </Badge>
                                {round.decision && round.decision !== "pending" && (
                                  <Badge
                                    className={`text-[10px] ${
                                      round.decision === "passed"
                                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                        : "bg-destructive/10 text-destructive border-destructive/20"
                                    }`}
                                  >
                                    {round.decision.toUpperCase()}
                                  </Badge>
                                )}
                              </div>
                              {round.meetingLinkOrLocation && (
                                <p className="text-[11px] text-muted-foreground">
                                  Coordinates / Link: {round.meetingLinkOrLocation}
                                </p>
                              )}
                              {round.feedback && (
                                <p className="text-[11px] text-muted-foreground italic">
                                  &ldquo;{round.feedback}&rdquo;
                                </p>
                              )}
                            </div>
                            {round.scheduledAt && (
                              <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                                {new Date(round.scheduledAt).toLocaleString()}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}

                  {/* Final Offer Details (Section 5) */}
                  {app.status === "selected" && app.offerDetails && (
                    <CardContent className="px-5 pb-4 pt-1 border-t border-emerald-500/30 bg-emerald-500/5 mt-2">
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="space-y-0.5">
                          <span className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> Official Offer Received
                          </span>
                          <p className="text-[11px] text-emerald-800/80 dark:text-emerald-200/80">
                            Role: {app.offerDetails.offeredRole || app.roleTitle} &bull; Compensation: {app.offerDetails.offeredCompensation || app.salaryRange}
                          </p>
                          {app.offerDetails.notes && (
                            <p className="text-[11px] text-muted-foreground">
                              Note: {app.offerDetails.notes}
                            </p>
                          )}
                        </div>
                        {app.offerDetails.startDate && (
                          <span className="text-[10px] font-mono text-muted-foreground">
                            Start Date: {new Date(app.offerDetails.startDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  )}

                  {/* Application Timeline Events */}
                  {app.timeline && app.timeline.length > 0 && (
                    <CardContent className="px-5 pb-4 pt-1 border-t border-border/60 mt-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block pt-2 mb-2">
                        Status History
                      </span>
                      <div className="space-y-2">
                        {app.timeline.map((ev, idx: number) => {
                          const evTime = ev.timestamp || ev.date || app.appliedAt;
                          return (
                            <div key={ev.id || idx} className="flex items-start gap-2 text-xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <div>
                                  <span className="font-semibold text-foreground">
                                    {ev.title || "Status Updated"}
                                  </span>
                                  <p className="text-[11px] text-muted-foreground">
                                    {ev.description || ev.note || `Status transitioned to ${ev.status}`}
                                  </p>
                                </div>
                                <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                                  {new Date(evTime).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
