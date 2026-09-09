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
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/sonner";
import {
  Brain,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Target,
  Trophy,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  GraduationCap,
  Layers,
  BarChart3,
  Shield,
  Cpu,
  Cloud,
  Globe,
  Code2,
  FileCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  DifficultyLevel,
  DIFFICULTY_META,
  ClientQuestion,
  TestResult,
  QuestionComplexity,
  COMPLEXITY_DESCRIPTIONS,
} from "@/lib/knowledge-test/types";

// Domain icon map
const DOMAIN_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  security: Shield,
  "ai-ml": Cpu,
  cloud: Cloud,
  web: Globe,
  software: Code2,
};

interface TestHistoryItem {
  id: string;
  sessionId: string;
  domainName: string;
  specificInterest: string;
  difficulty: DifficultyLevel;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  performanceTier: string;
  completedAt: string;
}

interface ImmediateFeedback {
  questionId: string;
  isCorrect: boolean;
  correctOptionId: string;
  explanation: string;
}

function getAuthStudentId(): string {
  if (typeof window === "undefined") return "";
  const stored = sessionStorage.getItem("skill_bridge_user");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.id) return parsed.id;
    } catch {}
  }
  const match = document.cookie.match(/sb_student_id=([^;]+)/);
  if (match && match[1]) {
    return decodeURIComponent(match[1].trim());
  }
  return "";
}

export function KnowledgeTestContainer() {
  // Page Lifecycle State
  const [loading, setLoading] = React.useState(true);
  const [hasPrerequisite, setHasPrerequisite] = React.useState(false);
  const [interestProfile, setInterestProfile] = React.useState<{
    confirmedMainDomain: string;
    confirmedMainDomainId: string;
    confirmedSpecificInterest: string;
    confirmedAt: string;
  } | null>(null);

  // Difficulty selection
  const [selectedDifficulty, setSelectedDifficulty] =
    React.useState<DifficultyLevel>("intermediate");
  const [startingTest, setStartingTest] = React.useState(false);

  // Active Test State
  const [activeSessionId, setActiveSessionId] = React.useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = React.useState<ClientQuestion | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0);
  const [totalQuestions, setTotalQuestions] = React.useState(10);
  const [selectedOptionId, setSelectedOptionId] = React.useState<string | null>(null);
  const [submittingAnswer, setSubmittingAnswer] = React.useState(false);
  const [immediateFeedback, setImmediateFeedback] =
    React.useState<ImmediateFeedback | null>(null);

  // Timer
  const [questionStartTime, setQuestionStartTime] = React.useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = React.useState<number>(0);

  // Results State
  const [testResult, setTestResult] = React.useState<TestResult | null>(null);
  const [history, setHistory] = React.useState<TestHistoryItem[]>([]);
  const [viewingPastResult, setViewingPastResult] = React.useState(false);

  // Load initial state
  const loadInitialData = React.useCallback(async () => {
    try {
      setLoading(true);
      const sid = getAuthStudentId();
      const headers: Record<string, string> = sid ? { "x-student-id": sid } : {};
      const res = await fetch("/api/student/knowledge-test/result", { headers });
      if (!res.ok) throw new Error("Failed to fetch initial state");
      const data = await res.json();

      if (!data.hasPrerequisite && data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }

      setHasPrerequisite(data.hasPrerequisite);
      setInterestProfile(data.interestProfile);
      setHistory(data.history || []);

      if (data.activeSession) {
        // If an active session exists, resume it
        handleResumeSession(data.activeSession.sessionId, data.activeSession.difficulty);
      } else if (data.result && !activeSessionId) {
        setTestResult(data.result);
      }
    } catch (err) {
      console.error("Failed to load knowledge test data:", err);
    } finally {
      setLoading(false);
    }
  }, [activeSessionId]);

  React.useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Elapsed time tracker for active test
  React.useEffect(() => {
    if (!activeSessionId || testResult) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeSessionId, testResult]);

  // Resume an existing session
  const handleResumeSession = async (sessionId: string, difficulty: DifficultyLevel) => {
    try {
      setStartingTest(true);
      const sid = getAuthStudentId();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(sid ? { "x-student-id": sid } : {}),
      };
      const res = await fetch("/api/student/knowledge-test/start", {
        method: "POST",
        headers,
        body: JSON.stringify({ difficulty, restart: false }),
      });
      const data = await res.json();
      if (data.success) {
        setActiveSessionId(data.sessionId);
        setCurrentQuestion(data.question);
        setCurrentQuestionIdx(data.currentQuestionIndex || 0);
        setTotalQuestions(data.totalQuestions || 10);
        setSelectedDifficulty(data.difficulty);
        setTestResult(null);
        setQuestionStartTime(Date.now());
      }
    } catch (err) {
      console.error("Failed to resume session:", err);
    } finally {
      setStartingTest(false);
    }
  };

  // Start new test
  const handleStartTest = async (restart: boolean = true) => {
    try {
      setStartingTest(true);
      setSelectedOptionId(null);
      setImmediateFeedback(null);
      setElapsedSeconds(0);

      const sid = getAuthStudentId();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(sid ? { "x-student-id": sid } : {}),
      };

      const res = await fetch("/api/student/knowledge-test/start", {
        method: "POST",
        headers,
        body: JSON.stringify({ difficulty: selectedDifficulty, restart }),
      });

      const data = await res.json();
      if (data.success) {
        setActiveSessionId(data.sessionId);
        setCurrentQuestion(data.question);
        setCurrentQuestionIdx(0);
        setTotalQuestions(data.totalQuestions || 10);
        setTestResult(null);
        setQuestionStartTime(Date.now());
      } else {
        alert(data.message || "Could not start test");
      }
    } catch (err) {
      console.error("Error starting test:", err);
      alert("An error occurred while preparing your assessment.");
    } finally {
      setStartingTest(false);
    }
  };

  // Submit Answer
  const handleSubmitAnswer = async () => {
    if (!activeSessionId || !currentQuestion || !selectedOptionId) return;

    try {
      setSubmittingAnswer(true);
      const timeSpentMs = Date.now() - questionStartTime;
      const sid = getAuthStudentId();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(sid ? { "x-student-id": sid } : {}),
      };

      const res = await fetch("/api/student/knowledge-test/submit-answer", {
        method: "POST",
        headers,
        body: JSON.stringify({
          sessionId: activeSessionId,
          questionId: currentQuestion.id,
          selectedOptionId,
          timeSpentMs,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.error || "Failed to submit answer.");
        return;
      }

      // Store immediate feedback
      setImmediateFeedback(data.immediateFeedback);

      // If test completed, trigger confetti if proficient or above
      if (data.isCompleted && data.result) {
        setTestResult(data.result);
        setActiveSessionId(null);
        toast.success(`Assessment completed! Score: ${data.result.scorePercent}% (${data.result.performanceTier})`);
        if (["Proficient", "Strong", "Expert"].includes(data.result.performanceTier)) {
          try {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
          } catch {
            // ignore
          }
        }
        // Refresh history
        loadInitialData();
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
    } finally {
      setSubmittingAnswer(false);
    }
  };

  // Advance to next question after reviewing immediate feedback
  const handleProceedNext = () => {
    if (!activeSessionId) return;

    const sid = getAuthStudentId();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(sid ? { "x-student-id": sid } : {}),
    };

    // Fetch next state or advance
    fetch(`/api/student/knowledge-test/start`, {
      method: "POST",
      headers,
      body: JSON.stringify({ difficulty: selectedDifficulty, restart: false }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.question) {
          setCurrentQuestion(data.question);
          setCurrentQuestionIdx(data.currentQuestionIndex);
          setSelectedOptionId(null);
          setImmediateFeedback(null);
          setQuestionStartTime(Date.now());
        }
      });
  };

  // Helper formatting for timer
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const DomainIcon =
    interestProfile?.confirmedMainDomainId &&
    DOMAIN_ICONS[interestProfile.confirmedMainDomainId]
      ? DOMAIN_ICONS[interestProfile.confirmedMainDomainId]
      : Brain;

  // --------------------------------------------------------------------------
  // RENDER: LOADING STATE
  // --------------------------------------------------------------------------
  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-8">
        <div className="space-y-3">
          <Skeleton className="h-6 w-48 rounded" />
          <Skeleton className="h-8 w-96 rounded" />
          <Skeleton className="h-4 w-full max-w-xl rounded" />
        </div>
        <Card className="border-border">
          <CardContent className="p-8 space-y-4">
            <Skeleton className="h-6 w-1/3 rounded" />
            <Skeleton className="h-20 w-full rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Skeleton className="h-14 rounded-lg" />
              <Skeleton className="h-14 rounded-lg" />
              <Skeleton className="h-14 rounded-lg" />
              <Skeleton className="h-14 rounded-lg" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: PREREQUISITE GATE VIEW
  // --------------------------------------------------------------------------
  if (!hasPrerequisite) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-4">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-muted/30 text-xs text-muted-foreground font-medium">
          <Brain className="w-3.5 h-3.5 text-foreground" />
          <span>Stage 3: Knowledge Testing & Technical Benchmark</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Knowledge Testing & Technical Benchmark
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Skill Bridge assessments are not generic trivia quizzes. Every question is
            dynamically generated and calibrated to your confirmed technical focus domain.
          </p>
        </div>

        <Alert variant="warning" className="p-6">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <div className="space-y-3">
            <div>
              <AlertTitle className="text-base font-semibold text-foreground">
                Interest Finder Profile Required
              </AlertTitle>
              <AlertDescription className="text-sm leading-relaxed mt-1">
                Before we can evaluate your technical strengths and identify skill gaps, you must
                first complete the <strong>Interest Finder</strong> exploration (Stage 2).
                This identifies whether your assessment should test Cybersecurity, Cloud &
                DevOps, AI & Machine Learning, Web Systems, or Core Software Engineering.
              </AlertDescription>
            </div>

            <div className="pt-3 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Takes approximately 3–5 minutes to complete</span>
              </div>
              <Button asChild size="sm" className="w-full sm:w-auto">
                <Link href="/student/interest-finder">
                  Begin Interest Finder <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </Alert>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: ACTIVE TEST VIEW
  // --------------------------------------------------------------------------
  if (activeSessionId && currentQuestion && !testResult) {
    const progressPercent = Math.round((currentQuestionIdx / totalQuestions) * 100);
    const complexityInfo = COMPLEXITY_DESCRIPTIONS[currentQuestion.complexity];

    return (
      <div className="space-y-6 max-w-4xl mx-auto py-4">
        {/* Test Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-normal">
                Question {currentQuestion.questionNumber} of {totalQuestions}
              </Badge>
              <Badge
                variant="secondary"
                className="text-xs capitalize font-medium"
              >
                {selectedDifficulty}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs capitalize text-muted-foreground"
              >
                {complexityInfo?.label || currentQuestion.complexity}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {interestProfile?.confirmedMainDomain} &bull;{" "}
              {interestProfile?.confirmedSpecificInterest}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono bg-muted/40 px-2.5 py-1 rounded border border-border">
              <Clock className="w-3.5 h-3.5 text-foreground" />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => {
                if (confirm("Are you sure you want to abandon this test session? Your progress will not be saved.")) {
                  setActiveSessionId(null);
                  setCurrentQuestion(null);
                  loadInitialData();
                }
              }}
            >
              Exit Test
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>Assessment Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </div>

        {/* Question Card */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground mb-1">
              <span className="font-mono text-foreground font-medium">
                Concept Tag: #{currentQuestion.id.split("-").slice(-2).join("-")}
              </span>
              <span className="text-[11px] italic">{complexityInfo?.guideline}</span>
            </div>
            <CardTitle className="text-lg md:text-xl font-semibold text-foreground leading-relaxed">
              {currentQuestion.questionText}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Options List */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isRevealed = !!immediateFeedback;
                const isCorrectOpt = isRevealed && opt.id === immediateFeedback.correctOptionId;
                const isWrongSelection = isRevealed && isSelected && !immediateFeedback.isCorrect;

                let optionStyles =
                  "border-border hover:bg-muted/40 hover:border-foreground/30";
                if (isSelected && !isRevealed) {
                  optionStyles = "border-primary bg-primary/5 ring-1 ring-primary";
                }
                if (isRevealed) {
                  if (isCorrectOpt) {
                    optionStyles =
                      "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100";
                  } else if (isWrongSelection) {
                    optionStyles =
                      "border-rose-500 bg-rose-500/10 text-rose-950 dark:text-rose-100";
                  } else {
                    optionStyles = "border-border opacity-50";
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={isRevealed || submittingAnswer}
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 ${optionStyles}`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-mono font-bold shrink-0 mt-0.5 ${
                        isSelected && !isRevealed
                          ? "bg-primary text-primary-foreground"
                          : isCorrectOpt
                          ? "bg-emerald-600 text-white"
                          : isWrongSelection
                          ? "bg-rose-600 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-sm text-foreground flex-1 leading-relaxed">
                      {opt.text}
                    </span>
                    {isRevealed && isCorrectOpt && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {isRevealed && isWrongSelection && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Immediate Explanation Box */}
            {immediateFeedback && (
              <div
                className={`p-4 rounded-lg border text-xs space-y-2 mt-4 ${
                  immediateFeedback.isCorrect
                    ? "bg-emerald-500/5 border-emerald-500/30 text-emerald-950 dark:text-emerald-100"
                    : "bg-amber-500/5 border-amber-500/30 text-amber-950 dark:text-amber-100"
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold text-sm">
                  {immediateFeedback.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Correct Answer</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-amber-600" />
                      <span>Incorrect — Key Concept Explanation</span>
                    </>
                  )}
                </div>
                <p className="leading-relaxed opacity-90">
                  {immediateFeedback.explanation}
                </p>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-3 flex items-center justify-between border-t border-border mt-4">
              <span className="text-xs text-muted-foreground">
                {!selectedOptionId
                  ? "Select an option to proceed"
                  : immediateFeedback
                  ? "Review explanation before advancing"
                  : "Click submit to verify your answer"}
              </span>

              {!immediateFeedback ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOptionId || submittingAnswer}
                  className="min-w-[140px]"
                >
                  {submittingAnswer ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin mr-1.5" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Answer <ArrowRight className="w-4 h-4 ml-1.5" />
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={handleProceedNext} className="min-w-[140px]">
                  {currentQuestionIdx + 1 >= totalQuestions ? (
                    <>
                      View Final Benchmark <Trophy className="w-4 h-4 ml-1.5" />
                    </>
                  ) : (
                    <>
                      Next Question <ArrowRight className="w-4 h-4 ml-1.5" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: RESULTS VIEW (WHEN TEST IS COMPLETED OR VIEWING PAST RESULT)
  // --------------------------------------------------------------------------
  if (testResult && (!activeSessionId || viewingPastResult)) {
    const isPassing = testResult.scorePercent >= 60;

    return (
      <div className="space-y-6 max-w-4xl mx-auto py-4">
        {/* Editorial Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-muted/30 text-xs text-muted-foreground font-medium">
            <Trophy className="w-3.5 h-3.5 text-foreground" />
            <span>Benchmark Result & Diagnostic Analysis</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Knowledge Test Complete
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Your current knowledge level has been updated.
          </p>
        </div>

        {/* Score Overview Card */}
        <Card className="border-border">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Score Circular Metric */}
              <div className="flex flex-col items-center justify-center p-4 border rounded-xl bg-muted/10 text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold tracking-tight text-foreground">
                    {testResult.score ?? testResult.correctCount * 4}
                  </span>
                  <span className="text-xl text-muted-foreground font-medium">
                    / {testResult.maxScore ?? 40}
                  </span>
                </div>
                <span className="text-xs font-medium text-foreground mt-1">
                  {testResult.scorePercent}% Total Score
                </span>
                <span className="text-[11px] text-muted-foreground mt-0.5">
                  {testResult.correctCount} of {testResult.totalQuestions} Correct (4 pts/question)
                </span>
                <Badge
                  className="mt-3 capitalize text-xs"
                  variant={isPassing ? "default" : "secondary"}
                >
                  Status: {testResult.knowledgeLevel || testResult.performanceTier}
                </Badge>
              </div>

              {/* Assessment Context Summary */}
              <div className="md:col-span-2 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground text-base">
                    Diagnostic Interpretation
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {testResult.scorePercent >= 80
                      ? `Excellent command of ${testResult.domainName} concepts at the ${testResult.difficulty} level. You exhibit strong analytical reasoning and readiness for advanced technical problems.`
                      : testResult.scorePercent >= 60
                      ? `Solid foundational understanding across ${testResult.domainName} topics. You solve practical applications reliably but have opportunities to solidify nuanced edge cases.`
                      : `You have started exploring ${testResult.domainName}, and targeted review of core concepts will help prepare you for more advanced industry applications.`}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-2.5 rounded border border-border bg-muted/20">
                    <span className="text-muted-foreground block text-[11px]">Domain & Niche</span>
                    <span className="font-semibold text-foreground truncate block">
                      {testResult.domainName} &bull; {testResult.specificInterest}
                    </span>
                  </div>
                  <div className="p-2.5 rounded border border-border bg-muted/20">
                    <span className="text-muted-foreground block text-[11px]">Selected Difficulty</span>
                    <span className="font-semibold text-foreground capitalize">
                      {testResult.difficulty}
                    </span>
                  </div>
                  <div className="p-2.5 rounded border border-border bg-muted/20">
                    <span className="text-muted-foreground block text-[11px]">Completion Date</span>
                    <span className="font-medium text-foreground">
                      {testResult.completedAt
                        ? new Date(testResult.completedAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Recently completed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 mt-6 border-t border-border">
              {/* Strengths */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Demonstrated Strengths ({testResult.strengths.length})</span>
                </div>
                {testResult.strengths.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {testResult.strengths.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-1 rounded text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    Continue learning to develop your verified concept competencies.
                  </p>
                )}
              </div>

              {/* Weaknesses / Growth Areas */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5 text-amber-600" />
                  <span>Recommended Focus Areas ({testResult.weaknesses.length})</span>
                </div>
                {testResult.weaknesses.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {testResult.weaknesses.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-1 rounded text-xs bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    Outstanding result! No major conceptual deficits identified at this tier.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Breakdown Accordion / List */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground flex items-center justify-between">
              <span>Detailed Question-by-Question Breakdown</span>
              <span className="text-xs text-muted-foreground font-normal">
                10 Questions Evaluated
              </span>
            </CardTitle>
            <CardDescription className="text-xs">
              Review correct answers and technical explanations for each concept.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {testResult.questionBreakdown.map((item) => (
              <div
                key={item.questionNumber}
                className="p-3.5 rounded-lg border border-border bg-muted/10 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold ${
                        item.isCorrect
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                          : "bg-rose-500/20 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {item.questionNumber}
                    </span>
                    <span className="font-semibold text-foreground">
                      {item.conceptTag}
                    </span>
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {item.complexity}
                    </Badge>
                  </div>
                  <span
                    className={`font-semibold flex items-center gap-1 ${
                      item.isCorrect ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {item.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </>
                    )}
                  </span>
                </div>

                <p className="text-muted-foreground text-xs">{item.questionText}</p>

                <div className="pt-1.5 border-t border-border/60 space-y-1 text-[11px]">
                  <div>
                    <span className="text-muted-foreground">Your Answer: </span>
                    <span
                      className={
                        item.isCorrect
                          ? "text-emerald-600 font-medium"
                          : "text-rose-600 font-medium"
                      }
                    >
                      {item.selectedOption}
                    </span>
                  </div>
                  {!item.isCorrect && (
                    <div>
                      <span className="text-muted-foreground">Correct Answer: </span>
                      <span className="text-emerald-600 font-medium">
                        {item.correctOption}
                      </span>
                    </div>
                  )}
                  <p className="text-muted-foreground italic pt-1">
                    {item.explanation}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <Button
            variant="outline"
            onClick={() => {
              setViewingPastResult(false);
              setTestResult(null);
            }}
          >
            <RotateCcw className="w-4 h-4 mr-1.5" /> Take New Assessment
          </Button>

          <Button variant="outline" asChild>
            <Link href="/student/dashboard">
              Return to Dashboard
            </Link>
          </Button>

          <Button asChild>
            <Link href="/student/skill-gap">
              Proceed to Skill Gap Analysis <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: DIFFICULTY SELECTION & ENTRY VIEW
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-muted/30 text-xs text-muted-foreground font-medium">
          <Brain className="w-3.5 h-3.5 text-foreground" />
          <span>Stage 2: Knowledge Testing & Technical Benchmark</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Calibrate Your Technical Benchmark
        </h1>

        <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Select your current experience level. The selected difficulty genuinely shapes the
          depth and complexity of questions, from introductory definitions to practical
          systems troubleshooting and microarchitectural edge cases.
        </p>
      </div>

      {/* Target Focus Profile Banner */}
      {interestProfile && (
        <Card className="border-border bg-muted/10">
          <CardContent className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                <DomainIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">
                  Assessment Focus Domain
                </span>
                <p className="font-semibold text-foreground text-sm">
                  {interestProfile.confirmedMainDomain} &bull;{" "}
                  <span className="text-muted-foreground font-normal">
                    {interestProfile.confirmedSpecificInterest}
                  </span>
                </p>
              </div>
            </div>

            <Badge variant="outline" className="text-xs shrink-0 self-start sm:self-auto">
              Stage 1 Confirmed
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* Difficulty Selection Cards */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Select Experience Tier
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(["beginner", "intermediate", "advanced"] as DifficultyLevel[]).map((level) => {
            const meta = DIFFICULTY_META[level];
            const isSelected = selectedDifficulty === level;

            return (
              <div
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={`cursor-pointer rounded-xl border p-5 transition-all space-y-3 flex flex-col justify-between ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                    : "border-border bg-card hover:border-foreground/30 hover:bg-muted/30"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">
                      {meta.label}
                    </span>
                    {level === "intermediate" && (
                      <Badge variant="secondary" className="text-[10px]">
                        Recommended
                      </Badge>
                    )}
                    {level === "advanced" && (
                      <Badge variant="outline" className="text-[10px]">
                        Rigorous
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs font-medium text-muted-foreground italic">
                    &ldquo;{meta.tagline}&rdquo;
                  </p>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {meta.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-border/60 text-[11px] text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-mono font-medium text-foreground">10 MCQs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Composition:</span>
                    <span className="font-mono text-[10px]">
                      {meta.questionDistribution.fundamental}F /{" "}
                      {meta.questionDistribution.application}A /{" "}
                      {meta.questionDistribution.challenging}C
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-2">
        <Button
          size="lg"
          className="w-full md:w-auto px-8"
          disabled={startingTest}
          onClick={() => handleStartTest(true)}
        >
          {startingTest ? (
            <>
              <Brain className="w-4 h-4 animate-spin mr-2" /> Initializing Question Battery...
            </>
          ) : (
            <>
              Begin {DIFFICULTY_META[selectedDifficulty].label} Assessment{" "}
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>

      {/* Past History Table (if student has taken tests previously) */}
      {history.length > 0 && (
        <Card className="border-border mt-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center justify-between">
              <span>Your Previous Benchmark Attempts</span>
              <Badge variant="outline" className="text-xs font-normal">
                {history.length} Completed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border text-xs">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/20"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {item.domainName}
                      </span>
                      <Badge variant="outline" className="capitalize text-[10px]">
                        {item.difficulty}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Completed on {new Date(item.completedAt).toLocaleDateString()} &bull;{" "}
                      {item.correctCount}/{item.totalQuestions} correct
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="font-bold text-foreground text-sm">
                        {item.scorePercent}%
                      </span>
                      <span className="block text-[10px] text-muted-foreground">
                        {item.performanceTier}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs h-8 px-2"
                      onClick={async () => {
                        try {
                          const res = await fetch(
                            `/api/student/knowledge-test/result?resultId=${item.id}`
                          );
                          const d = await res.json();
                          if (d.success && d.result) {
                            setTestResult(d.result);
                            setViewingPastResult(true);
                          }
                        } catch (err) {
                          console.error("Failed to load historical result:", err);
                        }
                      }}
                    >
                      View Report <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
