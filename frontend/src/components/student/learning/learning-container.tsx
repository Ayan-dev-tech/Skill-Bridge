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
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  BookOpen,
  Users,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Shield,
  HeartPulse,
  Sun,
  Activity,
  FlaskConical,
  Lock,
  ArrowRight,
  Sparkles,
  Play,
  CheckCircle2,
  Clock,
  Layers,
  GraduationCap,
  Briefcase,
  FileText,
  Send,
  Calendar,
  Check,
  Upload,
  Bot,
  TrendingUp,
  UserCheck,
  FileCheck,
} from "lucide-react";
import type {
  AyushDevelopmentIntervention,
  AyushStudentDevelopmentPlan,
  AyushCompetencyHistoryRecord,
  DevelopmentPlanStatus,
} from "@/lib/ayush/types";
import type { RecommendedInterventionItem } from "@/lib/ayush/interventions";

// Canonical 5 AYUSH Career Roles for the Intervention Selector
const AYUSH_ROLE_OPTIONS = [
  {
    id: "ayush-clinical-research",
    label: "Clinical Research",
    fullName: "AYUSH Clinical Research",
    badge: "Advanced",
  },
  {
    id: "ayush-clinical-practice",
    label: "Clinical Practice",
    fullName: "AYUSH Clinical Practice (Medical Officer)",
    badge: "Applied",
  },
  {
    id: "ayush-research-assistant",
    label: "Research Assistant",
    fullName: "Junior Clinical Research Associate",
    badge: "Foundation",
  },
  {
    id: "ayush-pharma-quality-regulatory",
    label: "Pharma QC & Reg",
    fullName: "ASU Pharma QC & Regulatory Affairs",
    badge: "Applied",
  },
  {
    id: "ayush-wellness-yoga-therapy",
    label: "Yoga & Wellness",
    fullName: "Therapeutic Yoga & Wellness Specialist",
    badge: "Applied",
  },
];

export function LearningContainer() {
  const [selectedRoleId, setSelectedRoleId] = React.useState("ayush-clinical-research");
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [recommendations, setRecommendations] = React.useState<RecommendedInterventionItem[]>([]);
  const [activePlans, setActivePlans] = React.useState<AyushStudentDevelopmentPlan[]>([]);
  const [competencyHistory, setCompetencyHistory] = React.useState<AyushCompetencyHistoryRecord[]>([]);
  const [startingInterventionId, setStartingInterventionId] = React.useState<string | null>(null);

  // Evidence submission modal state
  const [activeEvidencePlan, setActiveEvidencePlan] = React.useState<AyushStudentDevelopmentPlan | null>(null);
  const [selectedPdfFile, setSelectedPdfFile] = React.useState<File | null>(null);
  const [evidenceText, setEvidenceText] = React.useState("");
  const [isSubmittingEvidence, setIsSubmittingEvidence] = React.useState(false);

  // Faculty Review modal state (enables faculty/mentor authoritative verification)
  const [activeFacultyReviewPlan, setActiveFacultyReviewPlan] = React.useState<AyushStudentDevelopmentPlan | null>(null);
  const [facultyRatingInput, setFacultyRatingInput] = React.useState<number>(3.5);
  const [facultyFeedbackInput, setFacultyFeedbackInput] = React.useState<string>("");
  const [isSubmittingFacultyReview, setIsSubmittingFacultyReview] = React.useState(false);

  // Fetch recommendations, active plans, and competency history
  const fetchInterventionsData = React.useCallback(async (roleId: string, isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // 1. Fetch recommendations and plans
      const res = await fetch(`/api/student/interventions?roleId=${encodeURIComponent(roleId)}`);
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Failed to load interventions (HTTP ${res.status})`);
      }
      const json = await res.json();
      setRecommendations(json.recommendations || []);
      setActivePlans(json.activePlans || []);

      // 2. Fetch competency progression history
      try {
        const histRes = await fetch("/api/student/interventions/competency-history");
        if (histRes.ok) {
          const histJson = await histRes.json();
          setCompetencyHistory(histJson.history || []);
        }
      } catch (hErr) {
        console.warn("Could not load competency history:", hErr);
      }
    } catch (err: unknown) {
      console.error("Failed to fetch interventions data:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    fetchInterventionsData(selectedRoleId);
  }, [selectedRoleId, fetchInterventionsData]);

  // Action: Start Intervention
  const handleStartIntervention = async (rec: RecommendedInterventionItem) => {
    try {
      setStartingInterventionId(rec.intervention.id);
      const res = await fetch("/api/student/interventions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "START",
          roleId: selectedRoleId,
          competencyId: rec.competencyId,
          interventionId: rec.intervention.id,
          baselineLevel: rec.baselineLevel,
          targetLevel: rec.targetLevel,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Could not start intervention.");
      }

      toast.success(`Started: ${rec.intervention.title}`);
      await fetchInterventionsData(selectedRoleId, true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to start intervention.");
    } finally {
      setStartingInterventionId(null);
    }
  };

  // Action: Submit PDF Evidence (Calls Step 9 Upload + OCR + AI Evaluation)
  const handleSubmitPdfEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEvidencePlan) return;

    if (!selectedPdfFile && !evidenceText.trim()) {
      toast.error("Please select a PDF document or enter documentation notes.");
      return;
    }

    try {
      setIsSubmittingEvidence(true);

      // If a PDF file is selected, use multipart upload-evidence endpoint
      if (selectedPdfFile) {
        const formData = new FormData();
        formData.append("planId", activeEvidencePlan.id);
        formData.append("file", selectedPdfFile);
        if (evidenceText.trim()) {
          formData.append("studentNotes", evidenceText.trim());
        }

        const res = await fetch("/api/student/interventions/upload-evidence", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to upload and evaluate PDF evidence.");
        }

        if (data.scanFailed || !data.aiEvaluation) {
          toast.info(
            "Document submitted successfully, but we couldn't read it automatically. Your document is still submitted and available for faculty review.",
            { duration: 6000 }
          );
        } else {
          const rating = data.aiEvaluation?.expectedRating;
          const conf = data.aiEvaluation?.confidence;
          toast.success(
            `Evidence submitted! AI Expected Rating: ${rating ? `${rating}/5` : "Computed"} (${conf ? `${conf}% confidence` : "Evaluated"}). Awaiting faculty verification.`
          );
        }
      } else {
        // Text-only fallback submission
        const res = await fetch("/api/student/interventions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "SUBMIT_EVIDENCE",
            planId: activeEvidencePlan.id,
            requiresEvidenceReview: true,
            evidenceSubmission: {
              evidenceText: evidenceText.trim(),
              submittedAt: new Date().toISOString(),
            },
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to submit evidence.");
        }

        toast.success("Evidence submitted successfully! Pending faculty verification.");
      }

      setActiveEvidencePlan(null);
      setSelectedPdfFile(null);
      setEvidenceText("");
      await fetchInterventionsData(selectedRoleId, true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to submit evidence.");
    } finally {
      setIsSubmittingEvidence(false);
    }
  };

  // Action: Authoritative Faculty Review & Final Rating (Step 10: Supports VERIFIED or REJECTED)
  const handleFacultyVerification = async (e: React.FormEvent, decision: "VERIFIED" | "REJECTED" = "VERIFIED") => {
    e.preventDefault();
    if (!activeFacultyReviewPlan) return;

    try {
      setIsSubmittingFacultyReview(true);
      const res = await fetch("/api/student/interventions/faculty-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: activeFacultyReviewPlan.id,
          facultyId: "fac-dr-anand-rao-aiia",
          decision,
          facultyFinalRating: decision === "VERIFIED" ? Number(facultyRatingInput) : undefined,
          facultyFeedback:
            facultyFeedbackInput.trim() ||
            (decision === "VERIFIED"
              ? "Competency verified per clinical trial protocol standards."
              : "Evidence submission does not meet clinical requirements. Please revise protocol and resubmit."),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to record faculty review.");
      }

      if (decision === "VERIFIED") {
        const v = data.verification;
        toast.success(`Verified! Rating: ${v.newRating}/5 (${v.improvementDelta >= 0 ? `+${v.improvementDelta}` : v.improvementDelta})`);
      } else {
        toast.info("Evidence marked as Rejected with feedback recorded.");
      }
      setActiveFacultyReviewPlan(null);
      await fetchInterventionsData(selectedRoleId, true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to record faculty verification.");
    } finally {
      setIsSubmittingFacultyReview(false);
    }
  };

  // Helper: map plan status to color badge
  const getStatusBadge = (status: DevelopmentPlanStatus) => {
    switch (status) {
      case "IN_PROGRESS":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1 text-[10px]">
            <Clock className="w-3 h-3" /> In Progress
          </Badge>
        );
      case "EVIDENCE_PENDING":
        return (
          <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30 gap-1 text-[10px]">
            <FileText className="w-3 h-3" /> Evidence Under Review
          </Badge>
        );
      case "VERIFIED":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1 text-[10px]">
            <CheckCircle2 className="w-3 h-3" /> Verified
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 gap-1 text-[10px]">
            <AlertCircle className="w-3 h-3" /> Rejected
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 gap-1 text-[10px]">
            <Check className="w-3 h-3" /> Completed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-[10px]">
            Recommended
          </Badge>
        );
    }
  };

  const getMaturityBadge = (maturity: string) => {
    switch (maturity) {
      case "Foundation":
        return <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-500 bg-blue-500/5">Foundation</Badge>;
      case "Applied":
        return <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-500 bg-amber-500/5">Applied</Badge>;
      case "Advanced":
        return <Badge variant="outline" className="text-[10px] border-rose-500/30 text-rose-500 bg-rose-500/5">Advanced</Badge>;
      default:
        return <Badge variant="outline" className="text-[10px]">{maturity}</Badge>;
    }
  };

  // Step 10: Simple Evidence Status Timeline for Student View
  const renderEvidenceTimeline = (plan: AyushStudentDevelopmentPlan) => {
    const isSubmitted = Boolean(plan.evidenceStatus || plan.evidenceFilePath);
    if (!isSubmitted && plan.status !== "EVIDENCE_PENDING" && plan.status !== "VERIFIED" && plan.status !== "REJECTED") {
      return null;
    }

    const isScanFailed = plan.extractionStatus === "SCAN_FAILED";
    const isAiReviewed = isSubmitted && !isScanFailed && plan.aiExpectedRating != null;
    const isUnderReview = plan.status === "EVIDENCE_PENDING";
    const isVerified = plan.status === "VERIFIED";
    const isRejected = plan.status === "REJECTED";

    return (
      <div className="p-2 rounded bg-muted/40 border border-border/60 space-y-1 text-[10px]">
        <div className="flex items-center justify-between font-semibold text-muted-foreground">
          <span>VERIFICATION PIPELINE</span>
          {plan.evidenceQuality && (
            <span className="font-mono text-[9px] uppercase px-1 py-0.5 rounded bg-background border border-border">
              {plan.evidenceQuality}
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1 text-center font-medium">
          <div className={`p-1 rounded ${isSubmitted ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold" : "bg-muted text-muted-foreground"}`}>
            1. Submitted
          </div>
          <div className={`p-1 rounded ${
            isAiReviewed
              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold"
              : isScanFailed
              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
              : "bg-muted text-muted-foreground"
          }`}>
            {isScanFailed ? "2. Scan Bypassed" : "2. AI Reviewed"}
          </div>
          <div className={`p-1 rounded ${
            isUnderReview
              ? "bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold animate-pulse"
              : isVerified || isRejected
              ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
              : "bg-muted text-muted-foreground"
          }`}>
            3. Faculty Review
          </div>
          <div className={`p-1 rounded ${
            isVerified
              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
              : isRejected
              ? "bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold"
              : "bg-muted text-muted-foreground"
          }`}>
            {isRejected ? "4. Rejected" : "4. Verified"}
          </div>
        </div>
      </div>
    );
  };

  const planMap = React.useMemo(() => {
    const map = new Map<string, AyushStudentDevelopmentPlan>();
    for (const plan of activePlans) {
      map.set(plan.interventionId, plan);
    }
    return map;
  }, [activePlans]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto py-8 px-4 animate-pulse">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-muted rounded" />
          <div className="h-9 w-96 bg-muted rounded" />
          <div className="h-4 w-72 bg-muted rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-44 bg-muted/40 rounded-xl border border-border" />
          <div className="h-44 bg-muted/40 rounded-xl border border-border" />
        </div>
        <div className="h-32 bg-muted/30 rounded-xl border border-border" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <Card className="border-border bg-card p-6 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold text-foreground">
              Unable to Load Development Interventions
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">{error}</CardDescription>
          </div>
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchInterventionsData(selectedRoleId, false)}
            >
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const selectedRole = AYUSH_ROLE_OPTIONS.find((r) => r.id === selectedRoleId) || AYUSH_ROLE_OPTIONS[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6 px-4">
      {/* ------------------------------------------------------------------ */}
      {/* 1. PAGE HEADER */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-muted/30 text-xs text-muted-foreground font-medium">
            <BookOpen className="w-3.5 h-3.5 text-foreground" />
            <span>Stage 5: AYUSH Development Interventions</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Learning & Development Interventions
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Bridge diagnosed competency gaps through PDF evidence submission, AI expected rating evaluation, and authoritative faculty verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchInterventionsData(selectedRoleId, true)}
            disabled={refreshing}
            className="text-xs h-9 gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Refreshing..." : "Sync Interventions"}
          </Button>
          <Button asChild variant="outline" size="sm" className="text-xs h-9 gap-1.5">
            <Link href="/student/skill-gap">Review Skill Gaps</Link>
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. TARGET ROLE SELECTOR */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Target AYUSH Career Pathway
          </span>
          <span className="text-xs text-muted-foreground">
            {recommendations.length} Active Recommendations
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {AYUSH_ROLE_OPTIONS.map((role) => {
            const isSelected = role.id === selectedRoleId;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-card text-muted-foreground border-border hover:bg-muted/40 hover:text-foreground"
                }`}
              >
                <span>{role.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {role.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. ACTIVE STUDENT DEVELOPMENT PLANS & EVIDENCE EVALUATION */}
      {/* ------------------------------------------------------------------ */}
      {activePlans.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader className="pb-3 border-b border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider">
                My Active Development Journey
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {activePlans.filter((p) => p.status === "VERIFIED").length} of {activePlans.length} Verified
              </span>
            </div>
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2 pt-1">
              <Activity className="w-5 h-5 text-primary shrink-0" />
              <span>In-Progress Interventions & Evidence Progress</span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Submit PDF artifacts for OCR extraction, view AI expected ratings, and receive faculty sign-offs.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activePlans.map((plan) => {
                const title = plan.intervention?.title || plan.competencyId;
                const provider = plan.intervention?.provider || "AYUSH Academic Directorate";
                const duration = plan.intervention?.estimatedDuration || "Flexible";
                const evidenceReq = plan.intervention?.evidenceRequired;

                return (
                  <div
                    key={plan.id}
                    className="p-4 rounded-lg border border-border/70 bg-muted/20 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        {getStatusBadge(plan.status)}
                        <span className="text-[11px] font-mono text-muted-foreground">
                          Lvl {plan.baselineLevel} &rarr; Lvl {plan.targetLevel}
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-foreground leading-snug">
                        {title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        {provider} &bull; {duration}
                      </p>

                      {evidenceReq && (
                        <div className="text-[11px] bg-muted/40 p-2.5 rounded border border-border/50 text-muted-foreground">
                          <span className="font-semibold text-foreground">Required Evidence: </span>
                          {evidenceReq}
                        </div>
                      )}

                      {/* --- STEP 10 VERIFICATION TIMELINE --- */}
                      {renderEvidenceTimeline(plan)}

                      {/* --- SCAN FAILED NOTICE --- */}
                      {plan.extractionStatus === "SCAN_FAILED" && (
                        <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/30 space-y-1.5 text-xs text-amber-800 dark:text-amber-300">
                          <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-400">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>Document Submitted (Manual Review Required)</span>
                          </div>
                          <p className="text-[11px] leading-relaxed">
                            Document submitted successfully, but we couldn't read it automatically. Your document is still submitted and available for faculty review.
                          </p>
                        </div>
                      )}

                      {/* --- REJECTED NOTICE & RESUBMIT ACTION --- */}
                      {plan.status === "REJECTED" && (
                        <div className="p-3 rounded-md bg-rose-500/10 border border-rose-500/30 space-y-2 text-xs text-rose-800 dark:text-rose-300">
                          <div className="flex items-center gap-1.5 font-semibold text-rose-700 dark:text-rose-400">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>Evidence Submission Rejected</span>
                          </div>
                          {plan.facultyFeedback && (
                            <p className="text-[11px] leading-relaxed italic">
                              &ldquo;{plan.facultyFeedback}&rdquo;
                            </p>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 gap-1 border-rose-500/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 w-full font-medium"
                            onClick={() => {
                              setActiveEvidencePlan(plan);
                              setSelectedPdfFile(null);
                              setEvidenceText("");
                            }}
                          >
                            <Upload className="w-3 h-3" />
                            Resubmit Revised Evidence
                          </Button>
                        </div>
                      )}

                      {/* --- AI EXPECTED RATING CARD --- */}
                      {plan.extractionStatus !== "SCAN_FAILED" && plan.aiExpectedRating != null && (
                        <div className="p-3 rounded-md bg-blue-500/5 border border-blue-500/20 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                              <Bot className="w-3.5 h-3.5" />
                              AI Expected Rating
                            </span>
                            <span className="text-xs font-mono font-bold text-foreground">
                              {plan.aiExpectedRating} / 5
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                            <span>Confidence: {plan.aiConfidence || 85}%</span>
                            <span>Range: {plan.aiEvaluation?.recommendedRange || "3.0 – 3.5"}</span>
                          </div>
                          {plan.aiEvaluation?.feedback && (
                            <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                              {plan.aiEvaluation.feedback}
                            </p>
                          )}
                          <span className="text-[10px] text-muted-foreground/80 italic block">
                            Recommendation only. Faculty verification required.
                          </span>
                        </div>
                      )}

                      {/* --- FACULTY FINAL RATING & MEASURABLE IMPROVEMENT --- */}
                      {plan.facultyFinalRating != null && (
                        <div className="p-3 rounded-md bg-emerald-500/5 border border-emerald-500/20 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                              <UserCheck className="w-3.5 h-3.5" />
                              Faculty Final Rating
                            </span>
                            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                              {plan.facultyFinalRating} / 5
                            </span>
                          </div>

                          {/* Measurable Improvement Delta Display */}
                          <div className="flex items-center justify-between bg-emerald-500/10 p-2 rounded text-[11px]">
                            <span className="text-muted-foreground">Competency Improvement:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-muted-foreground">
                                {plan.baselineLevel} &rarr; {plan.facultyFinalRating}
                              </span>
                              <Badge className="bg-emerald-600 text-white font-mono text-[10px] px-1.5 py-0">
                                +{(plan.facultyFinalRating - plan.baselineLevel).toFixed(1)}
                              </Badge>
                            </div>
                          </div>

                          {plan.facultyFeedback && (
                            <p className="text-[11px] text-muted-foreground italic">
                              &ldquo;{plan.facultyFeedback}&rdquo;
                            </p>
                          )}

                          {plan.verifiedAt && (
                            <div className="text-[10px] text-muted-foreground/80 flex items-center justify-between border-t border-emerald-500/20 pt-1">
                              <span>Verified by {plan.facultyId || "Faculty"}</span>
                              <span>
                                {new Date(plan.verifiedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-border/50">
                      {plan.status === "IN_PROGRESS" && (
                        <Button
                          size="sm"
                          className="text-xs h-8 gap-1.5 flex-1 font-medium"
                          onClick={() => {
                            setActiveEvidencePlan(plan);
                            setSelectedPdfFile(null);
                            setEvidenceText("");
                          }}
                        >
                          <Upload className="w-3.5 h-3.5" />
                          Upload PDF Evidence
                        </Button>
                      )}

                      {plan.status === "EVIDENCE_PENDING" && (
                        <div className="flex items-center justify-between w-full gap-2">
                          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
                            Awaiting Faculty Review
                          </span>
                          {/* Faculty review action button */}
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 gap-1 border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10"
                            onClick={() => {
                              setActiveFacultyReviewPlan(plan);
                              setFacultyRatingInput(plan.aiExpectedRating || plan.targetLevel || 3.5);
                              setFacultyFeedbackInput(
                                "Evidence meets clinical and protocol requirements for verified AYUSH practice."
                              );
                            }}
                          >
                            <UserCheck className="w-3 h-3" />
                            Faculty Review
                          </Button>
                        </div>
                      )}

                      {plan.status === "VERIFIED" && (
                        <div className="w-full flex items-center justify-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold py-1">
                          <CheckCircle2 className="w-4 h-4" />
                          Officially Verified & Recorded
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 4. HISTORICAL COMPETENCY IMPROVEMENT PROGRESSION */}
      {/* ------------------------------------------------------------------ */}
      {competencyHistory.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader className="pb-3 border-b border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider">
                Measurable Competency Ledger
              </span>
              <Badge variant="outline" className="text-[10px] text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                Verified Longitudinal Records
              </Badge>
            </div>
            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2 pt-1">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span>Competency Improvement History</span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Immutable record of evaluated baseline ratings, AI recommendations, and authoritative faculty sign-offs.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="divide-y divide-border/60 text-xs">
              {competencyHistory.map((hist) => (
                <div key={hist.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground font-mono">{hist.competencyId}</span>
                    <p className="text-[11px] text-muted-foreground">
                      Verified by {hist.evaluatorId || "Faculty"} &bull; {new Date(hist.verifiedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right text-[11px]">
                      <span className="text-muted-foreground">Baseline: {hist.previousRating}</span>
                      {hist.aiExpectedRating && (
                        <span className="text-muted-foreground ml-2">AI: {hist.aiExpectedRating}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-foreground text-xs">{hist.facultyFinalRating} / 5</span>
                      <Badge className="bg-emerald-600 text-white font-mono text-[10px] px-1.5 py-0">
                        +{hist.improvementDelta}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 5. RECOMMENDED INTERVENTIONS LIST */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>Recommended Competency Interventions</span>
            </h2>
            <p className="text-xs text-muted-foreground">
              Prioritized actions addressing deficits for {selectedRole.fullName}
            </p>
          </div>
          <Badge variant="outline" className="text-xs self-start sm:self-auto">
            {recommendations.length} Recommended
          </Badge>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => {
              const inv = rec.intervention;
              const existingPlan = planMap.get(inv.id);
              const isStarting = startingInterventionId === inv.id;

              return (
                <Card
                  key={inv.id}
                  className="border-border bg-card flex flex-col justify-between overflow-hidden hover:border-primary/40 transition-colors"
                >
                  <CardHeader className="p-4 pb-2 space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="text-[10px] font-semibold text-primary border-primary/30">
                          {inv.type}
                        </Badge>
                        {getMaturityBadge(inv.targetMaturity)}
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] uppercase font-semibold ${
                          rec.priority === "high"
                            ? "text-rose-500 border-rose-500/30 bg-rose-500/5"
                            : rec.priority === "medium"
                            ? "text-amber-500 border-amber-500/30 bg-amber-500/5"
                            : "text-muted-foreground border-border"
                        }`}
                      >
                        {rec.priority} Priority
                      </Badge>
                    </div>

                    <CardTitle className="text-sm font-semibold text-foreground leading-snug pt-1">
                      {inv.title}
                    </CardTitle>

                    <CardDescription className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {inv.description}
                    </CardDescription>

                    {/* Metadata Pill Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                        <span>{inv.estimatedDuration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                        <span className="capitalize">{inv.difficulty} Difficulty</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2">
                        <GraduationCap className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                        <span className="truncate">{inv.provider}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <div className="p-4 pt-2 space-y-3">
                    {/* Progression & Evidence summary */}
                    <div className="p-2.5 rounded-md bg-muted/30 border border-border/60 text-[11px] space-y-1.5">
                      <div className="flex items-center justify-between text-muted-foreground font-medium">
                        <span>Current: Level {rec.baselineLevel}</span>
                        <span className="text-foreground font-semibold">Target: Level {rec.targetLevel}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        <span className="font-semibold text-foreground block">Verification Deliverable:</span>
                        {inv.evidenceRequired}
                      </div>
                    </div>

                    {/* Action Button */}
                    {existingPlan ? (
                      <div className="flex items-center justify-between pt-1">
                        {getStatusBadge(existingPlan.status)}
                        {existingPlan.status === "IN_PROGRESS" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-8 gap-1"
                            onClick={() => {
                              setActiveEvidencePlan(existingPlan);
                              setSelectedPdfFile(null);
                              setEvidenceText("");
                            }}
                          >
                            <Upload className="w-3 h-3" />
                            Upload PDF Evidence
                          </Button>
                        )}
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleStartIntervention(rec)}
                        disabled={isStarting}
                        className="w-full text-xs h-9 gap-1.5 font-medium"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        {isStarting ? "Starting..." : "Start Intervention"}
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-border bg-card p-8 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-foreground">
                No Outstanding Competency Deficits Identified
              </h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                You have demonstrated required proficiency for {selectedRole.fullName}. Select another target pathway or proceed to clinical opportunities.
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 6. PDF EVIDENCE SUBMISSION MODAL */}
      {/* ------------------------------------------------------------------ */}
      {activeEvidencePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <Card className="max-w-lg w-full border-border bg-card shadow-xl animate-in fade-in zoom-in-95">
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px]">
                  PDF Evidence Upload & OCR
                </Badge>
                <button
                  onClick={() => {
                    setActiveEvidencePlan(null);
                    setSelectedPdfFile(null);
                  }}
                  className="text-muted-foreground hover:text-foreground text-sm font-bold"
                >
                  ✕
                </button>
              </div>
              <CardTitle className="text-base font-bold text-foreground pt-1">
                Upload Verification Evidence (PDF)
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {activeEvidencePlan.intervention?.title || "Intervention milestone"}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitPdfEvidence}>
              <CardContent className="p-4 space-y-3 text-xs">
                <div className="p-2.5 rounded bg-muted/30 border border-border/60 space-y-1">
                  <span className="font-semibold text-foreground block">
                    Deliverable Expected:
                  </span>
                  <p className="text-muted-foreground">
                    {activeEvidencePlan.intervention?.evidenceRequired ||
                      "Signed verification log, protocol file, or test result confirmation."}
                  </p>
                </div>

                {/* PDF File Picker */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    Select PDF Evidence File (Max 10 MB):
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedPdfFile(e.target.files[0]);
                      }
                    }}
                    className="w-full text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer border border-input rounded-md p-1"
                  />
                  {selectedPdfFile && (
                    <p className="text-[11px] text-muted-foreground">
                      Selected: <span className="font-semibold text-foreground">{selectedPdfFile.name}</span> ({(selectedPdfFile.size / 1024).toFixed(1)} KB)
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="font-semibold text-foreground">
                    Additional Clinical Context / Student Notes (Optional):
                  </label>
                  <textarea
                    rows={3}
                    value={evidenceText}
                    onChange={(e) => setEvidenceText(e.target.value)}
                    placeholder="Provide execution context, GCP certificate registration number, or trial registry reference ID..."
                    className="w-full rounded-md border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                  />
                </div>
              </CardContent>
              <div className="p-4 pt-0 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setActiveEvidencePlan(null);
                    setSelectedPdfFile(null);
                  }}
                  disabled={isSubmittingEvidence}
                  className="text-xs h-9"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmittingEvidence}
                  className="text-xs h-9 gap-1.5 font-medium"
                >
                  <Upload className="w-3.5 h-3.5" />
                  {isSubmittingEvidence ? "Processing OCR & AI..." : "Upload & Run AI Evaluation"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 7. FACULTY REVIEW MODAL (Authoritative Verification) */}
      {/* ------------------------------------------------------------------ */}
      {activeFacultyReviewPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <Card className="max-w-lg w-full border-border bg-card shadow-xl animate-in fade-in zoom-in-95">
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px] text-purple-600 border-purple-500/30">
                  Faculty Review
                </Badge>
                <button
                  onClick={() => setActiveFacultyReviewPlan(null)}
                  className="text-muted-foreground hover:text-foreground text-sm font-bold"
                >
                  ✕
                </button>
              </div>
              <CardTitle className="text-base font-bold text-foreground pt-1 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-purple-600" />
                <span>Authoritative Faculty Verification</span>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {activeFacultyReviewPlan.intervention?.title || "Intervention milestone"}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleFacultyVerification}>
              <CardContent className="p-4 space-y-3 text-xs">
                {/* Scan Failed Notice in Faculty Modal */}
                {activeFacultyReviewPlan.extractionStatus === "SCAN_FAILED" && (
                  <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-[11px] space-y-1 text-amber-800 dark:text-amber-300">
                    <span className="font-semibold text-amber-700 dark:text-amber-400 block">
                      Automatic Scan Unsuccessful:
                    </span>
                    <p className="text-muted-foreground text-[10px]">
                      The document text could not be extracted automatically. Please inspect the submitted PDF and provide your authoritative faculty evaluation.
                    </p>
                  </div>
                )}

                {/* AI Expected Reference */}
                {activeFacultyReviewPlan.aiExpectedRating != null && (
                  <div className="p-2.5 rounded bg-blue-500/5 border border-blue-500/20 text-[11px] space-y-1">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 block">
                      AI Expected Rating Reference:
                    </span>
                    <p className="text-muted-foreground">
                      AI predicted <span className="font-bold text-foreground">{activeFacultyReviewPlan.aiExpectedRating} / 5</span> ({activeFacultyReviewPlan.aiConfidence || 85}% confidence).
                    </p>
                    <p className="text-[10px] text-muted-foreground italic">
                      Faculty may override based on clinical discretion.
                    </p>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">
                    Faculty Final Rating (1.0 to 5.0):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1.0"
                    max="5.0"
                    value={facultyRatingInput}
                    onChange={(e) => setFacultyRatingInput(parseFloat(e.target.value) || 1.0)}
                    className="w-full rounded-md border border-input bg-background p-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                    required
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Baseline: {activeFacultyReviewPlan.baselineLevel} &bull; Target: {activeFacultyReviewPlan.targetLevel}
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="font-semibold text-foreground">
                    Faculty Evaluation Feedback / Endorsement Notes:
                  </label>
                  <textarea
                    rows={3}
                    value={facultyFeedbackInput}
                    onChange={(e) => setFacultyFeedbackInput(e.target.value)}
                    placeholder="Enter clinical assessment notes, protocol compliance remarks, or procedural feedback..."
                    className="w-full rounded-md border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                    required
                  />
                </div>
              </CardContent>
              <div className="p-4 pt-0 flex items-center justify-end gap-2 border-t border-border/40 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveFacultyReviewPlan(null)}
                  disabled={isSubmittingFacultyReview}
                  className="text-xs h-9"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isSubmittingFacultyReview}
                  onClick={(e) => handleFacultyVerification(e, "REJECTED")}
                  className="text-xs h-9 gap-1.5 font-medium border-rose-500/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  {isSubmittingFacultyReview ? "Processing..." : "Reject Evidence"}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={isSubmittingFacultyReview}
                  onClick={(e) => handleFacultyVerification(e, "VERIFIED")}
                  className="text-xs h-9 gap-1.5 font-medium bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isSubmittingFacultyReview ? "Signing Off..." : "Verify & Approve"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 8. ACCREDITED AYUSH PARTNER BODIES */}
      {/* ------------------------------------------------------------------ */}
      <Card className="border-border bg-muted/20">
        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm md:text-base font-bold text-foreground">
                Aligned with Apex AYUSH Research Councils
              </span>
            </div>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              All development interventions and evidence criteria are mapped to standardized directives from CCRAS, AIIA, Pharmacopoeia Commission for Indian Medicine (PCIM&H), and the Yoga Certification Board (YCB).
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="shrink-0 text-xs h-9 gap-1.5">
            <Link href="/student/skill-gap">
              <span>View Competency Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
