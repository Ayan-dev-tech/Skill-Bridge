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
import {
  Brain,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Trophy,
  AlertCircle,
  HelpCircle,
  GraduationCap,
  Layers,
  Award,
  BookOpen,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Flame,
  Stethoscope,
  Compass,
} from "lucide-react";
import confetti from "canvas-confetti";
import type {
  AssessmentConfig,
  AssessmentAttempt,
  ClientAssessmentQuestion,
  SkillPerformanceSummary,
} from "@/lib/assessment/types";

interface ResultData {
  attemptId: string;
  configName: string;
  examType: string;
  score: number;
  maxScore: number;
  scorePercent: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  totalQuestions: number;
  skillPerformance: Record<string, SkillPerformanceSummary>;
  subjectBreakdown: Array<{ subject: string; total: number; correct: number; accuracyPercent: number }>;
  topicBreakdown: Array<{ topic: string; total: number; correct: number; accuracyPercent: number }>;
  completedAt: string;
}

export function AyushAssessmentContainer() {
  // Available configs
  const [configs, setConfigs] = React.useState<AssessmentConfig[]>([]);
  const [selectedConfigId, setSelectedConfigId] = React.useState<string>("");
  const [loadingConfigs, setLoadingConfigs] = React.useState(true);

  // Active attempt state
  const [activeAttemptId, setActiveAttemptId] = React.useState<string | null>(null);
  const [activeConfig, setActiveConfig] = React.useState<{ name: string; timeLimitMinutes: number | null; questionCount: number } | null>(null);
  const [questions, setQuestions] = React.useState<ClientAssessmentQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<Record<string, string>>({});
  const [timeSpent, setTimeSpent] = React.useState<Record<string, number>>({});
  const [questionStartTime, setQuestionStartTime] = React.useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = React.useState<number>(0);

  // Status flags
  const [starting, setStarting] = React.useState(false);
  const [submittingCurrent, setSubmittingCurrent] = React.useState(false);
  const [completing, setCompleting] = React.useState(false);
  const [result, setResult] = React.useState<ResultData | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Load available assessment configs
  const loadConfigs = React.useCallback(async () => {
    try {
      setLoadingConfigs(true);
      const res = await fetch("/api/student/assessment/configs");
      const json = await res.json();
      if (json.success && Array.isArray(json.configs)) {
        setConfigs(json.configs);
        if (json.configs.length > 0) {
          setSelectedConfigId(json.configs[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to load configs:", err);
    } finally {
      setLoadingConfigs(false);
    }
  }, []);

  React.useEffect(() => {
    loadConfigs();
  }, [loadConfigs]);

  // Elapsed timer
  React.useEffect(() => {
    if (!activeAttemptId || result) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeAttemptId, result]);

  // Start Assessment
  const handleStartAssessment = async (configIdToStart?: string, restart = false) => {
    const cid = configIdToStart || selectedConfigId;
    if (!cid) return;

    try {
      setStarting(true);
      setError(null);
      const res = await fetch("/api/student/assessment/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ configId: cid, restart }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to start assessment");
      }

      setActiveAttemptId(data.attemptId);
      setActiveConfig(data.config);
      setQuestions(data.questions || []);
      setCurrentIndex(data.nextQuestionIndex || 0);
      setSelectedAnswers({});
      setResult(null);
      setElapsedSeconds(0);
      setQuestionStartTime(Date.now());
    } catch (err: any) {
      setError(err.message || "Could not launch assessment");
    } finally {
      setStarting(false);
    }
  };

  // Submit Answer for Current Question
  const handleSelectOption = (optionId: string) => {
    if (!questions[currentIndex]) return;
    const qid = questions[currentIndex].id;
    setSelectedAnswers((prev) => ({ ...prev, [qid]: optionId }));
  };

  const persistCurrentAnswer = async (nextIdx?: number) => {
    const currentQ = questions[currentIndex];
    if (!currentQ || !activeAttemptId) return;

    const chosenOptionId = selectedAnswers[currentQ.id];
    if (chosenOptionId) {
      const duration = Date.now() - questionStartTime;
      try {
        setSubmittingCurrent(true);
        await fetch("/api/student/assessment/submit-answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            attemptId: activeAttemptId,
            questionId: currentQ.id,
            selectedOptionId: chosenOptionId,
            timeSpentMs: duration,
          }),
        });
      } catch (err) {
        console.error("Error saving answer:", err);
      } finally {
        setSubmittingCurrent(false);
      }
    }

    if (typeof nextIdx === "number") {
      setCurrentIndex(nextIdx);
      setQuestionStartTime(Date.now());
    }
  };

  // Complete Assessment
  const handleFinishAssessment = async () => {
    if (!activeAttemptId) return;
    try {
      setCompleting(true);
      // Persist current question first if selected
      await persistCurrentAnswer();

      const res = await fetch("/api/student/assessment/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attemptId: activeAttemptId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to score assessment");
      }

      // Fetch full result breakdown
      const resultRes = await fetch(`/api/student/assessment/result?attemptId=${activeAttemptId}`);
      const resultJson = await resultRes.json();
      if (resultJson.success && resultJson.attempt) {
        setResult(resultJson.attempt);
        setActiveAttemptId(null);
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } else {
        // Fallback to returned scoring
        setResult({
          attemptId: activeAttemptId,
          configName: activeConfig?.name || "AYUSH Assessment",
          examType: "AYUSH",
          score: data.scoring.score,
          maxScore: data.scoring.maxScore,
          scorePercent: data.scoring.scorePercent,
          correctCount: data.scoring.correctCount,
          incorrectCount: data.scoring.incorrectCount,
          unattemptedCount: data.scoring.unattemptedCount,
          totalQuestions: data.scoring.totalQuestions,
          skillPerformance: data.scoring.skillPerformance || {},
          subjectBreakdown: data.scoring.subjectBreakdown || [],
          topicBreakdown: data.scoring.topicBreakdown || [],
          completedAt: new Date().toISOString(),
        });
        setActiveAttemptId(null);
      }
    } catch (err: any) {
      setError(err.message || "Failed to complete assessment");
    } finally {
      setCompleting(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder.toString().padStart(2, "0")}`;
  };

  // --------------------------------------------------------------------------
  // 1. ACTIVE ASSESSMENT TEST RUNNER VIEW
  // --------------------------------------------------------------------------
  if (activeAttemptId && questions.length > 0) {
    const currentQ = questions[currentIndex];
    const answeredCount = Object.keys(selectedAnswers).length;
    const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

    return (
      <div className="space-y-6 max-w-4xl mx-auto py-4">
        {/* Top Header & Timers */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-normal">
                Question {currentIndex + 1} of {questions.length}
              </Badge>
              <Badge variant="secondary" className="text-xs font-medium">
                {currentQ.examType}
              </Badge>
              <Badge variant="outline" className="text-xs text-muted-foreground">
                {currentQ.difficulty || "Standard"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {currentQ.subject} &bull; <span className="text-foreground">{currentQ.topic}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono bg-muted/40 px-2.5 py-1 rounded border border-border">
              <Clock className="w-3.5 h-3.5 text-foreground" />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => {
                if (confirm("Exit this assessment? You can resume from where you left off.")) {
                  setActiveAttemptId(null);
                  loadConfigs();
                }
              }}
            >
              Pause & Exit
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <span>
              Progress: {currentIndex + 1}/{questions.length}
            </span>
            <span>{answeredCount} Answered</span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </div>

        {/* Question Palette (Numbers) */}
        <div className="flex flex-wrap gap-1.5 p-2.5 rounded-lg border border-border bg-muted/15">
          {questions.map((q, idx) => {
            const isAnswered = !!selectedAnswers[q.id];
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => persistCurrentAnswer(idx)}
                className={`w-7 h-7 text-xs rounded font-medium transition-all ${
                  isCurrent
                    ? "bg-foreground text-background font-bold ring-2 ring-primary"
                    : isAnswered
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted"
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Question Card */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="space-y-3">
              {/* Scenario Context (if clinical or practical scenario) */}
              {currentQ.scenarioContext && (
                <div className="p-3.5 rounded-lg bg-primary/5 border border-primary/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-primary">
                    <Stethoscope className="w-4 h-4" />
                    <span>Clinical / Practical Scenario Context</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{currentQ.scenarioContext}</p>
                </div>
              )}

              <CardTitle className="text-base md:text-lg font-bold text-foreground leading-snug">
                {currentQ.questionText}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Options List — Strictly 4 Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 text-xs md:text-sm ${
                      isSelected
                        ? "border-primary bg-primary/10 text-foreground font-medium shadow-sm"
                        : "border-border bg-card hover:bg-muted/30 text-foreground"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-md font-mono text-xs shrink-0 font-bold ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation & Submit Bar */}
            <div className="pt-4 flex items-center justify-between border-t border-border mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => persistCurrentAnswer(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0 || submittingCurrent}
                className="gap-1.5 text-xs"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </Button>

              <div className="flex items-center gap-2">
                {currentIndex < questions.length - 1 ? (
                  <Button
                    size="sm"
                    onClick={() => persistCurrentAnswer(currentIndex + 1)}
                    disabled={submittingCurrent}
                    className="gap-1.5 text-xs"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleFinishAssessment}
                    disabled={completing}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 text-xs"
                  >
                    {completing ? (
                      <>
                        <Clock className="w-3.5 h-3.5 animate-spin mr-1" /> Scoring Attempt...
                      </>
                    ) : (
                      <>
                        Complete & View Results <Trophy className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 2. ASSESSMENT RESULT & SKILL INTELLIGENCE BREAKDOWN VIEW
  // --------------------------------------------------------------------------
  if (result) {
    const strengths = Object.values(result.skillPerformance).filter(
      (s) => (s.accuracyPercent ?? 0) >= 60
    );
    const gaps = Object.values(result.skillPerformance).filter(
      (s) => (s.accuracyPercent ?? 0) < 60
    );

    return (
      <div className="space-y-6 max-w-4xl mx-auto py-4">
        {/* Results Header Card */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs font-mono mb-1">
                  Completed &bull; {new Date(result.completedAt).toLocaleDateString()}
                </Badge>
                <CardTitle className="text-xl md:text-2xl font-bold text-foreground">
                  {result.configName}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Evaluation calibrated deterministically against the AYUSH Skill Taxonomy & PYQ Benchmark.
                </CardDescription>
              </div>

              <div className="text-right sm:border-l sm:border-border sm:pl-6">
                <p className="text-3xl md:text-4xl font-extrabold text-foreground font-mono">
                  {result.scorePercent}%
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {result.score} / {result.maxScore} Total Points
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 pt-0 space-y-6">
            {/* Quick Metric Tiles */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-muted/20 border border-border text-center text-xs">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
                  Correct
                </p>
                <p className="text-lg font-bold text-foreground font-mono">{result.correctCount}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-rose-600 dark:text-rose-400">
                  Incorrect
                </p>
                <p className="text-lg font-bold text-foreground font-mono">{result.incorrectCount}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                  Unattempted
                </p>
                <p className="text-lg font-bold text-foreground font-mono">{result.unattemptedCount}</p>
              </div>
            </div>

            {/* Strengths & Skill Gaps Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2 text-xs">
                <h3 className="font-bold text-foreground flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Demonstrated Strengths ({strengths.length})
                </h3>
                {strengths.length === 0 ? (
                  <p className="text-muted-foreground text-[11px]">
                    No proficiencies met the 60% strength threshold in this attempt.
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {strengths.map((s) => (
                      <div key={s.ayushSkillId} className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{s.skillName}</span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                          {s.accuracyPercent}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Gaps */}
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-2 text-xs">
                <h3 className="font-bold text-foreground flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <AlertCircle className="w-4 h-4" /> Identified Skill Gaps ({gaps.length})
                </h3>
                {gaps.length === 0 ? (
                  <p className="text-muted-foreground text-[11px]">
                    Excellent work! No significant gaps diagnosed in tested areas.
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {gaps.map((s) => (
                      <div key={s.ayushSkillId} className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{s.skillName}</span>
                        <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">
                          {s.accuracyPercent}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Subject & Topic Breakdown */}
            {result.subjectBreakdown && result.subjectBreakdown.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-border">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Subject & Syllabus Performance
                </h3>
                <div className="space-y-2">
                  {result.subjectBreakdown.map((subj) => (
                    <div
                      key={subj.subject}
                      className="p-3 rounded-lg border border-border bg-card space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{subj.subject}</span>
                        <span className="font-mono font-bold text-foreground">
                          {subj.accuracyPercent}% ({subj.correct}/{subj.total})
                        </span>
                      </div>
                      <Progress value={subj.accuracyPercent} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AYUSH Skill Performance Taxonomy Breakdown */}
            {Object.keys(result.skillPerformance).length > 0 && (
              <div className="space-y-3 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    AYUSH Skill Taxonomy Calibration
                  </h3>
                  <Badge variant="outline" className="text-[10px] uppercase font-mono">
                    Official Taxonomy
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.values(result.skillPerformance).map((skill) => (
                    <div
                      key={skill.ayushSkillId}
                      className="p-3 rounded-lg border border-border bg-card space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{skill.skillName}</span>
                        <span className="font-mono font-bold text-foreground">
                          {skill.accuracyPercent}%
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{skill.skillCategory}</p>
                      <Progress value={skill.accuracyPercent ?? 0} className="h-1" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setResult(null);
                  loadConfigs();
                }}
                className="gap-1.5 text-xs w-full sm:w-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake or Choose Another Assessment
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button asChild size="sm" variant="secondary" className="text-xs flex-1 sm:flex-initial">
                  <Link href="/student/skill-gap">
                    Skill Gap Suggestions <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </Button>
                <Button asChild size="sm" className="text-xs flex-1 sm:flex-initial">
                  <Link href="/student/profile">
                    View in Skill Passport <Award className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 3. SELECTION & LAUNCHPAD VIEW (NEET UG, AIAPGET PG, PRACTICAL SCENARIOS)
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-muted/30 text-xs text-muted-foreground font-medium">
          <Brain className="w-3.5 h-3.5 text-foreground" />
          <span>Stage 2: AYUSH Assessments & Technical Benchmark</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          AYUSH Knowledge & Clinical Assessment Benchmarks
        </h1>

        <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Select an authoritative benchmark assessment to measure your competencies across authentic
          NEET UG Pre-Medical foundations, AIAPGET PG Ayurveda entrance material, and clinical/practical
          safety scenarios. All results directly update your verified AYUSH Skill Passport.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Assessment Selection Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Available Assessment Streams
          </h2>
          <span className="text-xs text-muted-foreground font-mono">
            {configs.length} Configured Streams
          </span>
        </div>

        {loadingConfigs ? (
          <div className="space-y-3">
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-28 w-full rounded-xl" />
          </div>
        ) : configs.length === 0 ? (
          <div className="p-8 rounded-xl border border-dashed border-border text-center space-y-2">
            <Brain className="w-8 h-8 text-muted-foreground mx-auto opacity-40" />
            <p className="text-xs font-semibold text-foreground">No Active Assessments Available</p>
            <p className="text-[11px] text-muted-foreground">
              Assessment configurations are being initialized in the institution database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3.5">
            {configs.map((cfg) => {
              const isSelected = selectedConfigId === cfg.id;
              const isAiapget = cfg.examType === "AIAPGET_PG";
              const isNeet = cfg.examType === "NEET_UG";
              const isScenario = cfg.examType === "PRACTICAL_SCENARIO";

              return (
                <div
                  key={cfg.id}
                  onClick={() => setSelectedConfigId(cfg.id)}
                  className={`p-4 md:p-5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary"
                      : "border-border bg-card hover:bg-muted/30"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant={isSelected ? "default" : "secondary"}
                          className="text-[10px] font-mono uppercase font-bold"
                        >
                          {cfg.examType.replace("_", " ")}
                        </Badge>
                        {isScenario && (
                          <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px]">
                            Clinical Practice
                          </Badge>
                        )}
                        {isAiapget && (
                          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px]">
                            PG Ayurveda
                          </Badge>
                        )}
                        {isNeet && (
                          <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30 text-[10px]">
                            Pre-Medical
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-sm md:text-base font-bold text-foreground">
                        {cfg.name}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                        {cfg.description}
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0 space-y-1">
                      <div className="text-xs font-mono text-muted-foreground">
                        <span className="font-bold text-foreground">{cfg.questionCount}</span> Questions &bull;{" "}
                        <span>{cfg.timeLimitMinutes || 20} Mins</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedConfigId(cfg.id);
                          handleStartAssessment(cfg.id);
                        }}
                        disabled={starting}
                        className="gap-1 text-xs w-full sm:w-auto"
                      >
                        {starting && selectedConfigId === cfg.id ? (
                          <>
                            <Clock className="w-3.5 h-3.5 animate-spin mr-1" /> Initializing...
                          </>
                        ) : (
                          <>
                            Launch Assessment <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Institutional Evidence & Skill Passport Linkage Footer */}
      <div className="p-4 rounded-xl border border-border bg-muted/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <p className="font-semibold text-foreground flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Integrity Guaranteed & Official AYUSH Taxonomy
          </p>
          <p className="text-muted-foreground text-[11px]">
            Correct answers remain encrypted server-side and are scored deterministically upon final submission.
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="text-xs shrink-0">
          <Link href="/student/profile">
            View Skill Passport <Award className="w-3.5 h-3.5 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
