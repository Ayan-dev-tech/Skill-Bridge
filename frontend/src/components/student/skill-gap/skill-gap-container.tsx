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
  TrendingUp,
  Brain,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Shield,
  Cpu,
  Cloud,
  Globe,
  Code2,
  BookOpen,
  Compass,
  ClipboardCheck,
  Target,
  Award,
  Layers,
  ChevronRight,
  Info,
} from "lucide-react";
import {
  SkillGapApiResponse,
  SkillGapAnalysisRecord,
  SkillGapItem,
  ProgramRecommendation,
} from "@/lib/skill-gap/types";

// Domain icon map
const DOMAIN_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  security: Shield,
  "ai-ml": Cpu,
  cloud: Cloud,
  web: Globe,
  software: Code2,
};

export function SkillGapContainer() {
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<SkillGapApiResponse | null>(null);

  const fetchSkillGap = React.useCallback(async (forceRefresh = false) => {
    try {
      if (forceRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const res = await fetch(
        `/api/student/skill-gap${forceRefresh ? "?refresh=true" : ""}`
      );
      const json: SkillGapApiResponse = await res.json();

      if (!res.ok && !json.isLocked) {
        throw new Error(json.error || "Failed to load skill gap analysis");
      }

      setData(json);
    } catch (err: unknown) {
      console.error("Skill Gap fetch error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while analyzing your skill gaps."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    fetchSkillGap();
  }, [fetchSkillGap]);

  // --------------------------------------------------------------------------
  // RENDER: LOADING STATE
  // --------------------------------------------------------------------------
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
        <div className="space-y-3">
          <div className="h-6 w-40 bg-muted rounded" />
          <div className="h-28 bg-muted/20 rounded-xl border border-border" />
          <div className="h-28 bg-muted/20 rounded-xl border border-border" />
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: ERROR STATE
  // --------------------------------------------------------------------------
  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-4">
        <Card className="border-destructive/30 bg-destructive/5 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground text-base">
                Unable to Generate Skill Analysis
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {error}
              </p>
            </div>
          </div>
        </Card>
        <div className="flex gap-3">
          <Button onClick={() => fetchSkillGap(true)} className="gap-2">
            <RefreshCw className="w-4 h-4" /> Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/student/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: LOCKED STATE (WORKFLOW GATING)
  // --------------------------------------------------------------------------
  if (data?.isLocked) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <Card className="border-border">
          <CardHeader className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold w-fit">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Milestone Locked</span>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Skill Gap Analysis is Locked
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              {data.lockedReason ||
                "Skill Gap & Suggestions is available only after completing Document Submission, Interest Finder, and Knowledge Testing."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="p-4 rounded-lg bg-muted/30 border border-border text-xs space-y-2 text-muted-foreground">
              <p className="font-semibold text-foreground">
                Required Progression Path:
              </p>
              <ol className="list-decimal list-inside space-y-1 pl-1">
                <li>Document Submission (ID, Photo, Academic Marksheet, ABC ID)</li>
                <li>Interest Finder (Confirmed engineering domain & niche)</li>
                <li>Knowledge Testing (Calibrated technical benchmark)</li>
                <li className="font-medium text-foreground">
                  Skill Gap & Suggestions (Current Stage)
                </li>
              </ol>
            </div>
            <Button asChild className="gap-2">
              <Link href={data.redirectUrl || "/student/knowledge-testing"}>
                Continue Onboarding Journey <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const analysis = data?.analysis;
  const direction = data?.direction;
  const snapshot = data?.knowledgeSnapshot;

  if (!analysis || !direction || !snapshot) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <Card className="border-border text-center p-8">
          <CardTitle>Analyzing Assessment Results...</CardTitle>
          <CardDescription className="mt-2">
            Please wait while we evaluate your technical profile.
          </CardDescription>
          <Button onClick={() => fetchSkillGap(true)} className="mt-4 gap-2">
            <RefreshCw className="w-4 h-4" /> Generate Analysis
          </Button>
        </Card>
      </div>
    );
  }

  const DomainIcon = DOMAIN_ICONS[direction.domainId] || Shield;
  const highPriorityGaps = analysis.skillGaps.filter(
    (g) => g.priority === "high"
  );
  const mediumPriorityGaps = analysis.skillGaps.filter(
    (g) => g.priority === "medium"
  );
  const lowPriorityGaps = analysis.skillGaps.filter((g) => g.priority === "low");

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6 px-4">
      {/* ------------------------------------------------------------------ */}
      {/* 1. PAGE HEADER */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-muted/30 text-xs text-muted-foreground font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-foreground" />
            <span>Stage 4: Skill Gap & Educator Recommendations</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Skill Gap Diagnosis & Suggestions
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Evidence-based curriculum gap analysis derived from your confirmed technical
            direction and calibrated benchmark performance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchSkillGap(true)}
            disabled={refreshing}
            className="text-xs h-9 gap-1.5"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Recalculating..." : "Recalculate Gaps"}
          </Button>
          <Button asChild size="sm" className="text-xs h-9 gap-1.5">
            <Link href="/student/learning">
              Next: Learning Tracks <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. DIRECTION & KNOWLEDGE SNAPSHOT (PERSISTED EVIDENCE) */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Current Direction */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider">
                Target Direction (Interest Finder)
              </span>
              <Badge variant="outline" className="text-[11px]">
                Confirmed
              </Badge>
            </div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2 pt-1 text-foreground">
              <DomainIcon className="w-5 h-5 text-primary shrink-0" />
              <span>{direction.nicheTitle}</span>
            </CardTitle>
            <CardDescription className="text-xs font-medium text-foreground">
              Domain: {direction.domainName}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {direction.explanation ? (
              <p className="text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-2.5 py-0.5">
                &ldquo;{direction.explanation}&rdquo;
              </p>
            ) : (
              <p className="text-muted-foreground leading-relaxed">
                Selected technical niche within {direction.domainName}.
              </p>
            )}
            <div className="pt-2 flex items-center justify-between border-t border-border/60 text-[11px] text-muted-foreground">
              <span>Source: Persisted Interest Profile</span>
              <Link
                href="/student/interest-finder"
                className="hover:underline text-foreground font-medium inline-flex items-center gap-0.5"
              >
                Review Direction <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Knowledge Snapshot */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider">
                Knowledge Snapshot (Testing)
              </span>
              <Badge variant="secondary" className="capitalize text-[11px]">
                {snapshot.difficulty} Level
              </Badge>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold tracking-tight text-foreground">
                  {snapshot.testScore}
                </span>
                <span className="text-sm text-muted-foreground font-medium">
                  / {snapshot.testMaxScore} pts ({snapshot.testScorePercent}%)
                </span>
              </div>
              <Badge
                className={`text-xs font-semibold ${
                  snapshot.testScorePercent >= 60
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                }`}
              >
                {snapshot.knowledgeLevel}
              </Badge>
            </div>
            <CardDescription className="text-xs text-muted-foreground pt-1">
              Answered {snapshot.correctCount} of {snapshot.totalQuestions} questions correctly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded border border-border bg-muted/10">
                <span className="text-muted-foreground block text-[10px]">
                  Demonstrated Strengths
                </span>
                <span className="font-semibold text-foreground truncate block mt-0.5">
                  {snapshot.strengths && snapshot.strengths.length > 0
                    ? snapshot.strengths[0]
                    : "Foundational concepts"}
                </span>
              </div>
              <div className="p-2 rounded border border-border bg-muted/10">
                <span className="text-muted-foreground block text-[10px]">
                  Immediate Growth Focus
                </span>
                <span className="font-semibold text-foreground truncate block mt-0.5">
                  {snapshot.weaknesses && snapshot.weaknesses.length > 0
                    ? snapshot.weaknesses[0]
                    : "Advanced applications"}
                </span>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-border/60 text-[11px] text-muted-foreground">
              <span>
                Completed:{" "}
                {snapshot.completedAt
                  ? new Date(snapshot.completedAt).toLocaleDateString()
                  : "Verified"}
              </span>
              <Link
                href="/student/knowledge-testing"
                className="hover:underline text-foreground font-medium inline-flex items-center gap-0.5"
              >
                View Full Benchmark <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. EXECUTIVE SUMMARY / DIAGNOSTIC INTERPRETATION */}
      {/* ------------------------------------------------------------------ */}
      <Card className="border-border bg-muted/10">
        <CardContent className="p-5 flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
            <Brain className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs md:text-sm">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
              Diagnostic Skill Synthesis
              {analysis.aiGenerated && (
                <Badge variant="outline" className="text-[10px] font-normal">
                  Calibrated Synthesis
                </Badge>
              )}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {analysis.executiveSummary}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* 4. IDENTIFIED SKILL GAPS (3 TO 6 PRIORITIZED ITEMS) */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span>Your Identified Skill Gaps</span>
              <Badge variant="secondary" className="text-xs">
                {analysis.skillGaps.length} Target Areas
              </Badge>
            </h2>
            <p className="text-xs text-muted-foreground">
              Prioritized deterministically by assessment performance, curriculum
              requirements, and role necessity.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              High: {highPriorityGaps.length}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Medium: {mediumPriorityGaps.length}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Low: {lowPriorityGaps.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {analysis.skillGaps.map((gap, index) => {
            const isHigh = gap.priority === "high";
            const isMedium = gap.priority === "medium";

            return (
              <Card
                key={gap.skillId}
                className="border-border hover:border-border/80 transition-colors bg-card"
              >
                <CardHeader className="pb-3 pt-4 px-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-muted-foreground">
                        0{index + 1}.
                      </span>
                      <CardTitle className="text-base font-semibold text-foreground">
                        {gap.skillName}
                      </CardTitle>
                      <Badge variant="outline" className="text-[10px]">
                        {gap.category}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        className={`text-xs font-semibold ${
                          isHigh
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                            : isMedium
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                            : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {gap.priorityLabel}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-5 pb-4 space-y-3 text-xs">
                  {/* Current Level vs Target Level Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-md bg-muted/20 border border-border">
                    <div>
                      <span className="text-muted-foreground block text-[10px]">
                        Current Assessed Level
                      </span>
                      <span className="font-semibold text-foreground block mt-0.5">
                        {gap.currentLevel}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">
                        Target Industry Level
                      </span>
                      <span className="font-semibold text-foreground block mt-0.5">
                        {gap.targetLevel}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">
                        Assessment Metric
                      </span>
                      <span className="font-semibold text-foreground block mt-0.5">
                        {gap.accuracyPercent !== null
                          ? `${gap.accuracyPercent}% Accuracy (${gap.correctCount}/${gap.testedCount} Correct)`
                          : "Curriculum Requirement"}
                      </span>
                    </div>
                  </div>

                  {/* Factual Assessment Evidence */}
                  <div className="space-y-1">
                    <span className="font-semibold text-foreground flex items-center gap-1.5 text-[11px]">
                      <ClipboardCheck className="w-3.5 h-3.5 text-muted-foreground" />
                      Assessment Evidence:
                    </span>
                    <p className="text-muted-foreground pl-5 leading-relaxed">
                      {gap.evidence}
                    </p>
                  </div>

                  {/* Why it Matters */}
                  <div className="space-y-1">
                    <span className="font-semibold text-foreground flex items-center gap-1.5 text-[11px]">
                      <Target className="w-3.5 h-3.5 text-muted-foreground" />
                      Why It Matters for {direction.nicheTitle}:
                    </span>
                    <p className="text-muted-foreground pl-5 leading-relaxed">
                      {gap.whyItMatters}
                    </p>
                  </div>

                  {/* Recommended Action */}
                  <div className="space-y-1">
                    <span className="font-semibold text-foreground flex items-center gap-1.5 text-[11px]">
                      <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                      Recommended Learning Action:
                    </span>
                    <p className="text-muted-foreground pl-5 leading-relaxed">
                      {gap.recommendedAction}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 5. RECOMMENDED LEARNING PARTNERS & PROGRAMS */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span>Recommended Learning Opportunities & Programs</span>
              <Badge variant="secondary" className="text-xs">
                {analysis.recommendations.length} Matched
              </Badge>
            </h2>
            <p className="text-xs text-muted-foreground">
              Matched strictly by coverage of your identified high-priority skill gaps.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground px-2 py-1 rounded bg-muted/20 border border-border">
            <Info className="w-3.5 h-3.5" />
            <span>Merit-based algorithmic matching &bull; No sponsored bias</span>
          </div>
        </div>

        {analysis.recommendations.length === 0 ? (
          <Card className="border-border p-6 text-center">
            <p className="text-sm text-muted-foreground">
              We couldn&apos;t find a closely matched learning opportunity yet. New
              verified curricula are indexed regularly.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {analysis.recommendations.map((rec) => {
              const program = rec.program;
              const isVerifiedPartner =
                program.verifiedStatus === "verified_partner";
              const isSampleProvider =
                program.verifiedStatus === "sample_provider";

              return (
                <Card
                  key={rec.programId}
                  className="border-border hover:border-border/80 transition-all flex flex-col justify-between bg-card"
                >
                  <CardHeader className="pb-3 px-5 pt-4 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide truncate block">
                        {program.educatorName}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Provider Status */}
                        {isVerifiedPartner ? (
                          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px]">
                            Verified Partner
                          </Badge>
                        ) : isSampleProvider ? (
                          <Badge
                            variant="secondary"
                            className="text-[10px] text-muted-foreground"
                          >
                            Sample Provider
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-[10px] text-muted-foreground"
                          >
                            External Opportunity
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <CardTitle className="text-base font-bold text-foreground leading-snug">
                        {program.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {program.description}
                      </CardDescription>
                    </div>

                    {/* Match Tier Badge & Explanation */}
                    <div className="pt-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`text-[11px] font-semibold ${
                            rec.matchTier === "Best Match"
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                              : rec.matchTier === "Strong Match"
                              ? "bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30"
                              : "bg-muted text-muted-foreground border border-border"
                          }`}
                        >
                          {rec.matchTier} &bull; {rec.matchScore}% Gap Coverage
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground italic border-l-2 border-primary/40 pl-2 mt-2 leading-relaxed">
                        {rec.matchExplanation}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="px-5 pb-5 pt-0 space-y-3.5">
                    {/* Program Metadata Tags */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-border/60">
                      <div>
                        <span className="text-muted-foreground block text-[10px]">
                          Delivery Type
                        </span>
                        <span className="font-medium text-foreground block">
                          {program.deliveryType}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[10px]">
                          Duration
                        </span>
                        <span className="font-medium text-foreground block">
                          {program.duration}
                        </span>
                      </div>
                    </div>

                    {/* Covered Gaps Pills */}
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                        Target Skills Addressed:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {rec.coveredGaps.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-muted/30 border border-border text-foreground font-medium"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* External Program Action */}
                    <div className="pt-2">
                      {program.programUrl ? (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full text-xs h-9 justify-center gap-1.5 hover:bg-muted"
                        >
                          <a
                            href={program.programUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Program Details
                            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                          </a>
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="outline"
                          size="sm"
                          className="w-full text-xs h-9"
                        >
                          Program Details Unavailable
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 6. NEXT MILESTONE INTEGRATION: LEARNING / MENTORING */}
      {/* ------------------------------------------------------------------ */}
      <Card className="border-border bg-card">
        <CardContent className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <Badge variant="outline" className="text-xs">
              Upcoming Milestone: Stage 5
            </Badge>
            <h3 className="text-lg md:text-xl font-bold text-foreground">
              Ready to Close Gaps with University Learning Tracks?
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Once you have reviewed your skill gaps and matched programs, continue
              into the Skill Bridge Learning & Mentorship module for interactive
              curricula and faculty guidance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <Button variant="outline" asChild className="text-xs h-10">
              <Link href="/student/dashboard">Return to Dashboard</Link>
            </Button>
            <Button asChild size="default" className="text-xs h-10 gap-1.5">
              <Link href="/student/learning">
                Start Learning Tracks <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
