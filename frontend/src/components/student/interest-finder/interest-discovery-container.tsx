"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Compass,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Clock,
  Layers,
  Check,
  AlertCircle,
  Loader2,
  Cpu,
  Cloud,
  Globe,
  Shield,
  Code2,
} from "lucide-react";

interface OptionItem {
  id: string;
  label: string;
  text: string;
}

interface ClientQuestion {
  id: string;
  phase: 1 | 2;
  questionNumber: number;
  totalQuestionsEstimated: number;
  questionText: string;
  options: OptionItem[];
}

interface Phase1Result {
  discoveredDomainId: string;
  discoveredDomainName: string;
  explanation: string;
  confidence: number;
}

interface FinalProfileResult {
  mainDomainId: string;
  mainDomainName: string;
  specificInterest: string;
  explanation: string;
  confidence: number;
}

interface ConfirmedProfileData {
  id: string;
  confirmedMainDomain: string;
  confirmedMainDomainId: string;
  confirmedSpecificInterest: string;
  explanation: string;
  confidence: number;
  phase1AnswerCount: number;
  phase2AnswerCount: number;
  confirmedAt: string;
}

type ViewState =
  | "loading"
  | "intro"
  | "unverified_gate"
  | "phase1_question"
  | "phase1_reveal"
  | "phase2_question"
  | "final_profile"
  | "confirmed_view";

const domainIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "ai-ml": Cpu,
  cloud: Cloud,
  web: Globe,
  security: Shield,
  software: Code2,
};

export function InterestDiscoveryContainer() {
  const [viewState, setViewState] = React.useState<ViewState>("intro");
  const [currentQuestion, setCurrentQuestion] = React.useState<ClientQuestion | null>(null);
  const [selectedOptionId, setSelectedOptionId] = React.useState<string | null>(null);
  const [phase1Result, setPhase1Result] = React.useState<Phase1Result | null>(null);
  const [finalProfile, setFinalProfile] = React.useState<FinalProfileResult | null>(null);
  const [confirmedProfile, setConfirmedProfile] = React.useState<ConfirmedProfileData | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [studentId, setStudentId] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // 1. Initial Session & Profile Check on Mount (Browser Reload Recovery)
  React.useEffect(() => {
    async function loadSession() {
      try {
        let sid = "";
        if (typeof window !== "undefined") {
          const storedUser = sessionStorage.getItem("skill_bridge_user");
          if (storedUser) {
            try {
              const parsed = JSON.parse(storedUser);
              if (parsed.id) sid = parsed.id;
            } catch {
              // fallback
            }
          }
          if (!sid) {
            const match = document.cookie.match(/sb_student_id=([^;]+)/);
            if (match && match[1]) {
              sid = decodeURIComponent(match[1].trim());
            }
          }
        }
        setStudentId(sid);

        const res = await fetch("/api/student/interest-finder/session", {
          headers: sid ? { "x-student-id": sid } : {},
        });
        const data = await res.json();

        if (data.requiresVerification) {
          window.location.href = "/student/document-verification";
          return;
        }

        if (data.success) {
          if (data.confirmedProfile) {
            setConfirmedProfile(data.confirmedProfile);
            setViewState("confirmed_view");
            return;
          }

          if (data.activeSession && data.activeSession.status !== "confirmed") {
            const sess = data.activeSession;
            if (sess.status === "phase1_revealed" && sess.broadDomain) {
              setPhase1Result({
                discoveredDomainId: sess.broadDomain,
                discoveredDomainName: sess.broadDomain,
                explanation: "Your earlier answers indicated an aptitude for this domain.",
                confidence: 0.85,
              });
              setViewState("phase1_reveal");
              return;
            }
          }
        }
        setViewState("intro");
      } catch (err) {
        console.error("Failed to restore session:", err);
        setViewState("intro");
      }
    }

    loadSession();
  }, []);

  // 2. Start Discovery Journey
  const handleStartDiscovery = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/student/interest-finder/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-student-id": studentId,
        },
        body: JSON.stringify({ studentId }),
      });
      const data = await res.json();

      if (data.success && data.question) {
        setCurrentQuestion(data.question);
        setSelectedOptionId(null);
        setViewState("phase1_question");
      } else {
        setErrorMessage(data.error || "Unable to initialize questions. Please try again.");
      }
    } catch {
      setErrorMessage("Network connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Submit Answer & Advance
  const handleAnswerSubmit = async () => {
    if (!currentQuestion || !selectedOptionId) return;

    const selectedOpt = currentQuestion.options.find((o) => o.id === selectedOptionId);
    if (!selectedOpt) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/student/interest-finder/submit-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-student-id": studentId,
        },
        body: JSON.stringify({
          studentId,
          questionId: currentQuestion.id,
          questionText: currentQuestion.questionText,
          selectedOptionId: selectedOpt.id,
          selectedOptionText: selectedOpt.text,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMessage(data.error || "Failed to submit answer. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Handle Phase 1 Conclusion
      if (data.phase === 1 && data.isPhaseComplete) {
        setPhase1Result(data.evaluation);
        setViewState("phase1_reveal");
        setSelectedOptionId(null);
        setIsSubmitting(false);
        return;
      }

      // Handle Phase 2 Conclusion
      if (data.phase === 2 && data.isPhaseComplete) {
        setFinalProfile(data.evaluation);
        setViewState("final_profile");
        setSelectedOptionId(null);
        setIsSubmitting(false);
        return;
      }

      // Continue to next question (Phase 1 or 2)
      if (data.nextQuestion) {
        setCurrentQuestion(data.nextQuestion);
        setSelectedOptionId(null);
      }
    } catch {
      setErrorMessage("Connection issue. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Phase 1 Confirmation (Accept or Reject)
  const handlePhase1Decision = async (action: "accept" | "reject") => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/student/interest-finder/confirm-phase1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-student-id": studentId,
        },
        body: JSON.stringify({
          studentId,
          action,
          domainId: phase1Result?.discoveredDomainId,
        }),
      });
      const data = await res.json();

      if (!data.success) {
        setErrorMessage(data.error || "Failed to process selection.");
        setIsSubmitting(false);
        return;
      }

      if (action === "reject") {
        // Reset cleanly to intro
        setPhase1Result(null);
        setCurrentQuestion(null);
        setSelectedOptionId(null);
        setViewState("intro");
      } else {
        // Proceed to Phase 2 questions
        setCurrentQuestion(data.nextQuestion);
        setSelectedOptionId(null);
        setViewState("phase2_question");
      }
    } catch {
      setErrorMessage("Network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. Final Profile Confirmation
  const handleFinalProfileDecision = async (action: "confirm" | "explore_again") => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/student/interest-finder/confirm-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-student-id": studentId,
        },
        body: JSON.stringify({
          studentId,
          action,
          finalProfile,
        }),
      });
      const data = await res.json();

      if (!data.success) {
        setErrorMessage(data.error || "Failed to process profile confirmation.");
        setIsSubmitting(false);
        return;
      }

      if (action === "explore_again") {
        setFinalProfile(null);
        setCurrentQuestion(null);
        setPhase1Result(null);
        setSelectedOptionId(null);
        setViewState("intro");
      } else {
        setConfirmedProfile(data.profile);
        setViewState("confirmed_view");
      }
    } catch {
      setErrorMessage("Connection error while saving confirmation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // VIEW: LOADING STATE
  // =========================================================================
  if (viewState === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[360px] space-y-3 select-none">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        <p className="text-xs text-muted-foreground font-mono">
          Loading student discovery session...
        </p>
      </div>
    );
  }

  // =========================================================================
  // VIEW: CONFIRMED PROFILE OVERVIEW
  // =========================================================================
  if (viewState === "confirmed_view" && confirmedProfile) {
    const Icon = domainIcons[confirmedProfile.confirmedMainDomainId] || Layers;

    return (
      <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200 motion-reduce:animate-none select-none">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono border border-border bg-muted/40 text-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Milestone 1 Completed</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Your Confirmed Interest Profile
            </h1>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFinalProfileDecision("explore_again")}
            className="text-xs gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Explore Again
          </Button>
        </div>

        <Card className="border-border">
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-muted-foreground uppercase">
                    Primary Domain
                  </p>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {confirmedProfile.confirmedMainDomain}
                  </CardTitle>
                </div>
              </div>

              <Badge variant="outline" className="font-mono text-xs text-foreground bg-muted/20">
                {Math.round(confirmedProfile.confidence * 100)}% Confidence
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-5 space-y-5 text-xs">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                Discovered Technical Specialization
              </span>
              <p className="text-sm font-semibold text-foreground">
                {confirmedProfile.confirmedSpecificInterest}
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-border bg-muted/20 space-y-1.5 leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground text-xs uppercase tracking-wider">
                Discovery Rationale
              </span>
              <p className="text-[12px]">{confirmedProfile.explanation}</p>
            </div>

            <div className="pt-2 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-muted-foreground font-mono">
              <span>
                Verified through {confirmedProfile.phase1AnswerCount} blind scenarios and{" "}
                {confirmedProfile.phase2AnswerCount} specialization inquiries.
              </span>
              <span>
                Saved: {new Date(confirmedProfile.confirmedAt).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="p-4 rounded-lg border border-border bg-card/60 flex items-start gap-3 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Your interest profile is permanently stored and will be utilized in subsequent workflow
            milestones (such as Knowledge Testing and Curriculum Deficit Mapping).
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button variant="outline" asChild size="sm">
            <Link href="/student/dashboard">
              Return to Dashboard
            </Link>
          </Button>

          <Button asChild size="sm">
            <Link href="/student/knowledge-testing">
              Proceed to Knowledge Testing <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: INTRO / EXPLORATION OVERVIEW (No upfront domain selection!)
  // =========================================================================
  if (viewState === "unverified_gate") {
    return (
      <div className="max-w-xl mx-auto py-12 space-y-6">
        <Card className="border-border shadow-sm">
          <CardHeader className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl font-bold">Document Verification Required</CardTitle>
            <CardDescription className="text-sm">
              Document Verification must be completed before you can enter the Interest Finder.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Please upload your institutional credentials (Student ID Card or Academic Transcript) and complete the live face capture verification to proceed with your personalized technical journey.
            </p>
            <Button asChild className="w-full">
              <Link href="/student/document-verification">
                <span>Proceed to Document Verification</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (viewState === "intro") {
    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200 motion-reduce:animate-none select-none">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-muted/30 text-xs text-muted-foreground font-medium">
            <Compass className="w-3.5 h-3.5 text-foreground" />
            <span>Milestone 1: Adaptive Interest Discovery</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Let&apos;s discover what part of your chosen field interests you.
          </h1>

          <p className="text-xs md:text-sm text-muted-foreground max-w-3xl leading-relaxed">
            Students frequently know they are interested in technology, but do not know whether
            their real calling is Security, AI/ML, Cloud, Web, or Core Software Systems.
            Interest Finder does not ask you to guess your career. Instead, it presents realistic
            engineering challenges to discover your natural instincts.
          </p>
        </div>

        {/* Informational domain tags (unselected, purely exploratory) */}
        <div className="p-3.5 rounded-lg border border-border bg-muted/15 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Explores 5 Broad Engineering Disciplines
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">Stage 1 Discovery</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-md border border-border bg-card text-foreground font-medium text-[11px]">
              AI / Machine Learning
            </span>
            <span className="px-2.5 py-1 rounded-md border border-border bg-card text-foreground font-medium text-[11px]">
              Cloud &amp; Infrastructure
            </span>
            <span className="px-2.5 py-1 rounded-md border border-border bg-card text-foreground font-medium text-[11px]">
              Web &amp; Full-Stack Systems
            </span>
            <span className="px-2.5 py-1 rounded-md border border-border bg-card text-foreground font-medium text-[11px]">
              Cybersecurity &amp; Defense
            </span>
            <span className="px-2.5 py-1 rounded-md border border-border bg-card text-foreground font-medium text-[11px]">
              Software &amp; Core Systems
            </span>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-md border border-destructive/50 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-foreground mb-1">
                <span className="font-mono text-xs font-bold">1</span>
              </div>
              <CardTitle className="text-sm font-semibold text-foreground">
                Phase 1 — Blind Interest Discovery
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Situations, anomalies, and choices without domain labels.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground leading-relaxed">
              You will examine 4–7 engineering scenarios to identify whether you enjoy
              investigation, building, experimentation, optimization, or defensive analysis.
              Domain labels are completely hidden to preserve unbiased discovery.
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-foreground mb-1">
                <span className="font-mono text-xs font-bold">2</span>
              </div>
              <CardTitle className="text-sm font-semibold text-foreground">
                Phase 2 — Sub-Domain & Niche Exploration
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Targeted inquiries narrowing toward a specific specialization.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground leading-relaxed">
              Once a candidate domain is revealed and accepted by you, the system guides you through
              specialized inquiries to discover your exact technical niche.
            </CardContent>
          </Card>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-foreground">
                No technical preparation or memorization required
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                Takes approximately 5–7 minutes. Answer honestly according to what naturally piques
                your curiosity.
              </p>
            </div>

            <Button
              onClick={handleStartDiscovery}
              disabled={isSubmitting}
              className="text-xs font-semibold gap-1.5 transition-all duration-150 motion-reduce:transition-none active:scale-[0.98] shrink-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Preparing Engine...</span>
                </>
              ) : (
                <>
                  <span>Begin Interest Discovery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // =========================================================================
  // VIEW: PHASE 1 & PHASE 2 QUESTIONS
  // =========================================================================
  if (
    (viewState === "phase1_question" || viewState === "phase2_question") &&
    currentQuestion
  ) {
    const isPhase1 = currentQuestion.phase === 1;
    const progressPercent = Math.min(
      100,
      Math.round(
        (currentQuestion.questionNumber / currentQuestion.totalQuestionsEstimated) * 100
      )
    );

    return (
      <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200 motion-reduce:animate-none select-none">
        {/* Step Context & Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <Badge
              variant="outline"
              className="font-mono text-[11px] bg-muted/30 text-foreground border-border"
            >
              {isPhase1 ? "Phase 1: Blind Interest Discovery" : "Phase 2: Niche Exploration"}
            </Badge>

            <span className="font-mono text-[11px] text-muted-foreground">
              Question {currentQuestion.questionNumber} of ~{currentQuestion.totalQuestionsEstimated}
            </span>
          </div>

          <Progress value={progressPercent} className="h-1.5" />
        </div>

        {errorMessage && (
          <div className="p-3 rounded-md border border-destructive/50 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Question Card */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <p className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider mb-1">
              Engineering Scenario #{currentQuestion.questionNumber}
            </p>
            <CardTitle className="text-base md:text-lg font-semibold text-foreground leading-relaxed">
              {currentQuestion.questionText}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 pt-2">
            <div className="space-y-2.5">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;

                return (
                  <div
                    key={option.id}
                    onClick={() => setSelectedOptionId(option.id)}
                    className={`p-3.5 rounded-lg border text-xs cursor-pointer transition-all duration-150 motion-reduce:transition-none flex items-start gap-3 group ${
                      isSelected
                        ? "border-foreground bg-foreground/5 text-foreground ring-1 ring-foreground"
                        : "border-border bg-card hover:border-foreground/40 hover:bg-muted/30 text-foreground/90"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold shrink-0 transition-colors ${
                        isSelected
                          ? "bg-foreground text-background"
                          : "bg-muted text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {option.label}
                    </div>

                    <p className="leading-relaxed flex-1 pt-0.5">{option.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-mono">
                Select the option that best reflects your genuine impulse.
              </span>

              <Button
                onClick={handleAnswerSubmit}
                disabled={!selectedOptionId || isSubmitting}
                size="sm"
                className="text-xs font-semibold gap-1.5 transition-all duration-150 motion-reduce:transition-none active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // =========================================================================
  // VIEW: PHASE 1 REVEAL (Candidate Broad Domain Discovered)
  // =========================================================================
  if (viewState === "phase1_reveal" && phase1Result) {
    const Icon = domainIcons[phase1Result.discoveredDomainId] || Layers;

    return (
      <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200 motion-reduce:animate-none select-none">
        <div className="space-y-1.5">
          <Badge
            variant="outline"
            className="font-mono text-[11px] bg-muted/40 text-foreground border-border"
          >
            Discovery Milestone 1 Complete
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Broad Domain Identified
          </h1>
          <p className="text-xs text-muted-foreground">
            Based on your unprompted choices across the blind engineering scenarios.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-md border border-destructive/50 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Card className="border-border">
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Discovered Interest Area
                </p>
                <CardTitle className="text-lg font-bold text-foreground">
                  {phase1Result.discoveredDomainName}
                </CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4 space-y-4 text-xs leading-relaxed">
            <div className="space-y-1.5">
              <p className="font-semibold text-foreground text-xs uppercase tracking-wider">
                Why this area reflects your problem-solving style:
              </p>
              <p className="text-muted-foreground text-[12px] leading-relaxed">
                {phase1Result.explanation}
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-border bg-muted/20 space-y-2">
              <p className="font-medium text-foreground text-[12px]">
                Does this area sound interesting to you?
              </p>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                If yes, Phase 2 will present targeted inquiries to uncover your specific technical niche within this field.
              </p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePhase1Decision("reject")}
                disabled={isSubmitting}
                className="text-xs gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Not quite, explore again
              </Button>

              <Button
                size="sm"
                onClick={() => handlePhase1Decision("accept")}
                disabled={isSubmitting}
                className="text-xs font-semibold gap-1.5 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Loading Phase 2...</span>
                  </>
                ) : (
                  <>
                    <span>Yes, explore this domain</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // =========================================================================
  // VIEW: FINAL PROFILE (Phase 2 Completed)
  // =========================================================================
  if (viewState === "final_profile" && finalProfile) {
    const Icon = domainIcons[finalProfile.mainDomainId] || Layers;

    return (
      <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200 motion-reduce:animate-none select-none">
        <div className="space-y-1.5">
          <Badge
            variant="outline"
            className="font-mono text-[11px] bg-muted/40 text-foreground border-border"
          >
            Interest Profile Synthesized
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Your Discovered Interest Profile
          </h1>
          <p className="text-xs text-muted-foreground">
            Review your discovered technical specialization below.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-md border border-destructive/50 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Card className="border-border">
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Main Technical Domain
                  </p>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {finalProfile.mainDomainName}
                  </CardTitle>
                </div>
              </div>

              <Badge variant="outline" className="font-mono text-xs text-foreground bg-muted/20">
                {Math.round(finalProfile.confidence * 100)}% Match
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-4 space-y-4 text-xs">
            <div className="space-y-1">
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Specific Technical Focus / Niche
              </p>
              <p className="text-sm font-semibold text-foreground">
                {finalProfile.specificInterest}
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-border bg-muted/20 space-y-1 leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground text-xs uppercase tracking-wider">
                Why this fits you
              </span>
              <p className="text-[12px]">{finalProfile.explanation}</p>
            </div>

            <div className="p-3 rounded-lg border border-border bg-card space-y-1">
              <p className="font-medium text-foreground text-[12px]">Does this feel like you?</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Confirming this profile saves your verified interest direction and unlocks future
                milestone guidance.
              </p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFinalProfileDecision("explore_again")}
                disabled={isSubmitting}
                className="text-xs gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Explore Again
              </Button>

              <Button
                size="sm"
                onClick={() => handleFinalProfileDecision("confirm")}
                disabled={isSubmitting}
                className="text-xs font-semibold gap-1.5 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving Profile...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Yes, this fits me</span>
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
