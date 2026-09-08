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
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
  XCircle,
  Plus,
  AlertCircle,
  Users,
  ChevronRight,
  Sparkles,
  Edit,
  X,
  Check,
} from "lucide-react";
import type { JobApplicationRecord } from "@/lib/applications/types";

interface InterviewEvaluationViewProps {
  onNavigateToFinalDecision?: () => void;
}

export function InterviewEvaluationView({ onNavigateToFinalDecision }: InterviewEvaluationViewProps) {
  const [applications, setApplications] = React.useState<JobApplicationRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  // Selected candidate for managing interview
  const [selectedApp, setSelectedApp] = React.useState<JobApplicationRecord | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  // Form fields for adding/updating an interview round
  const [roundName, setRoundName] = React.useState("Technical Round 1");
  const [roundMode, setRoundMode] = React.useState<"Virtual" | "In-person" | "Hybrid">("Virtual");
  const [scheduledDate, setScheduledDate] = React.useState("");
  const [scheduledTime, setScheduledTime] = React.useState("");
  const [meetingCoordinates, setMeetingCoordinates] = React.useState("https://meet.google.com/sb-eval");
  const [evaluationCriteria, setEvaluationCriteria] = React.useState("Core Algorithms & System Design");
  const [roundScore, setRoundScore] = React.useState<number>(80);
  const [roundFeedback, setRoundFeedback] = React.useState("");
  const [roundDecision, setRoundDecision] = React.useState<"pending" | "passed" | "failed">("passed");

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

  // Filter candidates who are shortlisted, interviewing, or selected
  const eligibleCandidates = React.useMemo(() => {
    return applications.filter(
      (a) =>
        a.screeningStatus === "shortlisted" ||
        a.status === "interview" ||
        a.status === "selected" ||
        (a.interviewRounds && a.interviewRounds.length > 0)
    );
  }, [applications]);

  const handleSaveRound = async () => {
    if (!selectedApp) return;
    try {
      setIsSaving(true);
      setError(null);

      const scheduledAt = scheduledDate
        ? new Date(`${scheduledDate}T${scheduledTime || "10:00"}:00`).toISOString()
        : undefined;

      const res = await fetch(`/api/industry/applications/${selectedApp.id}/interview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roundName: roundName.trim(),
          mode: roundMode,
          scheduledAt,
          meetingLinkOrLocation: meetingCoordinates.trim(),
          evaluationCriteria: evaluationCriteria.trim(),
          score: Number(roundScore),
          feedback: roundFeedback.trim(),
          decision: roundDecision,
          overallOutcome: "in_progress",
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to save interview round.");
      }

      setSuccessMessage(`Interview round saved for ${selectedApp.applicantFullName || "Candidate"}.`);
      setSelectedApp(null);
      await fetchApplications();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update interview.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Interview & Evaluation
          </h1>
          <p className="text-xs text-muted-foreground">
            Configure interview stages, schedule virtual/in-person discussions, evaluate candidate technical performance, and record authoritative round results.
          </p>
        </div>

        {onNavigateToFinalDecision && (
          <Button
            size="sm"
            variant="outline"
            onClick={onNavigateToFinalDecision}
            className="text-xs gap-1.5 self-start sm:self-auto"
          >
            <span>Final Selection & Offers</span>
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

      {/* Candidate Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-xs text-muted-foreground">
            Loading candidate interview schedules...
          </div>
        ) : eligibleCandidates.length === 0 ? (
          <Card className="col-span-full border-border p-8 text-center bg-card">
            <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-40" />
            <h3 className="text-sm font-semibold text-foreground">No shortlisted candidates yet</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Candidates who have been reviewed and shortlisted in the Application Screening section will appear here ready for interview scheduling.
            </p>
          </Card>
        ) : (
          eligibleCandidates.map((app) => {
            const rounds = app.interviewRounds || [];
            return (
              <Card key={app.id} className="border-border bg-card flex flex-col justify-between">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <CardTitle className="text-sm font-bold text-foreground">
                        {app.applicantFullName || "Candidate"}
                      </CardTitle>
                      <CardDescription className="text-[11px] text-muted-foreground">
                        {app.roleTitle} &bull; {app.applicantEmail}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {rounds.length} {rounds.length === 1 ? "Round" : "Rounds"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-1 space-y-3">
                  {rounds.length === 0 ? (
                    <div className="p-3 rounded-lg border border-dashed border-border text-center text-[11px] text-muted-foreground">
                      No interview rounds recorded yet.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {rounds.map((r) => (
                        <div
                          key={r.roundNumber}
                          className="p-2.5 rounded-lg border border-border bg-muted/20 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">{r.roundName}</span>
                            <Badge
                              className={`text-[9px] ${
                                r.decision === "passed"
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                  : r.decision === "failed"
                                  ? "bg-destructive/10 text-destructive border-destructive/20"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {r.decision ? r.decision.toUpperCase() : "PENDING"}
                            </Badge>
                          </div>
                          {r.scheduledAt && (
                            <p className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
                              <Calendar className="w-3 h-3" />
                              {new Date(r.scheduledAt).toLocaleString()}
                            </p>
                          )}
                          {r.feedback && (
                            <p className="text-[11px] text-muted-foreground italic line-clamp-1">
                              &ldquo;{r.feedback}&rdquo;
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>

                <div className="p-3 bg-muted/10 border-t border-border flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Status: {app.interviewStatus || "Pending"}
                  </span>
                  <Button
                    size="xs"
                    onClick={() => {
                      setSelectedApp(app);
                      setRoundName(`Technical Round ${(app.interviewRounds?.length || 0) + 1}`);
                      setRoundFeedback("");
                      setRoundScore(85);
                    }}
                    className="text-xs h-7 gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Configure Round</span>
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Interview Round Configuration Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/20">
              <div className="space-y-0.5">
                <Badge variant="outline" className="text-[10px]">
                  Interview Configuration
                </Badge>
                <h3 className="text-base font-bold text-foreground">
                  {selectedApp.applicantFullName || "Candidate"} &bull; {selectedApp.roleTitle}
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
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground block">Round Name</label>
                  <Input
                    value={roundName}
                    onChange={(e) => setRoundName(e.target.value)}
                    className="text-xs h-8"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground block">Interview Mode</label>
                  <select
                    value={roundMode}
                    onChange={(e) => setRoundMode(e.target.value as any)}
                    className="w-full h-8 rounded-md border border-border bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Virtual">Virtual Meeting</option>
                    <option value="In-person">In-person Campus/Office</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground block">Date</label>
                  <Input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="text-xs h-8"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground block">Time</label>
                  <Input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="text-xs h-8"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground block">
                  Meeting Link or Venue Details
                </label>
                <Input
                  value={meetingCoordinates}
                  onChange={(e) => setMeetingCoordinates(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="text-xs h-8"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground block">
                  Evaluation Criteria
                </label>
                <Input
                  value={evaluationCriteria}
                  onChange={(e) => setEvaluationCriteria(e.target.value)}
                  className="text-xs h-8"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground block">
                    Score (0–100)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={roundScore}
                    onChange={(e) => setRoundScore(Number(e.target.value))}
                    className="text-xs h-8"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground block">
                    Round Decision
                  </label>
                  <select
                    value={roundDecision}
                    onChange={(e) => setRoundDecision(e.target.value as any)}
                    className="w-full h-8 rounded-md border border-border bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="passed">Passed / Cleared</option>
                    <option value="pending">Pending Evaluation</option>
                    <option value="failed">Did Not Clear</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground block">
                  Interviewer Feedback & Notes
                </label>
                <textarea
                  value={roundFeedback}
                  onChange={(e) => setRoundFeedback(e.target.value)}
                  placeholder="Technical depth, problem-solving speed, behavioral clarity..."
                  rows={2}
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
              <Button
                size="sm"
                disabled={isSaving}
                onClick={handleSaveRound}
                className="text-xs"
              >
                <Check className="w-3.5 h-3.5 mr-1" />
                <span>Save Round Evaluation</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
