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
  BookOpen,
  Users,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Shield,
  Cpu,
  Cloud,
  Globe,
  Code2,
  Lock,
  ArrowRight,
  Compass,
  Sparkles,
  Play,
  CheckCircle2,
  Video,
  Clock,
  Layers,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import type {
  LearningApiResponse,
  LearningResourceItem,
  LearningFocusSummary,
  SuggestedFocusStep,
} from "@/lib/learning/types";

const DOMAIN_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  security: Shield,
  "ai-ml": Cpu,
  cloud: Cloud,
  web: Globe,
  software: Code2,
};

export function LearningContainer() {
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<LearningApiResponse | null>(null);

  const fetchLearningData = React.useCallback(async (forceRefresh = false) => {
    try {
      if (forceRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const res = await fetch(
        `/api/student/learning${forceRefresh ? "?refresh=true" : ""}`
      );
      const json: LearningApiResponse = await res.json();

      if (!res.ok && !json.isLocked) {
        throw new Error(json.error || "Failed to load learning resources.");
      }

      setData(json);
    } catch (err: unknown) {
      console.error("Learning fetch error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while loading learning resources."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    fetchLearningData();
  }, [fetchLearningData]);

  // --------------------------------------------------------------------------
  // RENDER: LOADING SKELETON
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
        <div className="space-y-4">
          <div className="h-6 w-48 bg-muted rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-64 bg-muted/20 rounded-xl border border-border" />
            <div className="h-64 bg-muted/20 rounded-xl border border-border" />
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: WORKFLOW LOCKED STATE
  // --------------------------------------------------------------------------
  if (data?.isLocked) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <Card className="border-border bg-card text-center p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold text-foreground">
              Learning & Mentoring is Locked
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              {data.lockedReason ||
                "Complete your prerequisite milestones to unlock your tailored curriculum and faculty mentoring."}
            </CardDescription>
          </div>
          <div className="pt-4">
            <Button asChild className="gap-2">
              <Link href={data.redirectTo || "/student/skill-gap"}>
                Continue Workflow <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: ERROR STATE
  // --------------------------------------------------------------------------
  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <Card className="border-border bg-card p-6 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold text-foreground">
              Unable to Load Learning Resources
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {error || "An unexpected error occurred while communicating with the service."}
            </CardDescription>
          </div>
          <div className="pt-2">
            <Button variant="outline" size="sm" onClick={() => fetchLearningData(false)}>
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const focus: LearningFocusSummary = data.learningFocus || {
    domainId: "general",
    domainName: "Engineering",
    nicheId: "general",
    nicheTitle: "Technical Focus",
    difficulty: "intermediate",
    scorePercent: 0,
    primaryGaps: [],
  };

  const steps: SuggestedFocusStep[] = data.suggestedSteps || [];
  const resources: LearningResourceItem[] = data.resources || [];
  const DomainIcon = DOMAIN_ICONS[focus.domainId] || Compass;

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6 px-4">
      {/* ------------------------------------------------------------------ */}
      {/* 1. PAGE HEADER */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-muted/30 text-xs text-muted-foreground font-medium">
            <BookOpen className="w-3.5 h-3.5 text-foreground" />
            <span>Stage 5: Learning & Mentoring</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Learning / Mentoring
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Build the skills you need through curated learning resources and guidance from experienced professionals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchLearningData(true)}
            disabled={refreshing}
            className="text-xs h-9 gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Refreshing..." : "Refresh Resources"}
          </Button>
          <Button asChild variant="outline" size="sm" className="text-xs h-9 gap-1.5">
            <Link href="/student/skill-gap">
              Review Skill Gaps
            </Link>
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. STUDENT LEARNING CONTEXT (DERIVED FROM SKILL GAP) */}
      {/* ------------------------------------------------------------------ */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider">
              Diagnostic Context
            </span>
            <Badge variant="secondary" className="capitalize text-[11px]">
              {focus.difficulty} Benchmark
            </Badge>
          </div>
          <CardTitle className="text-xl font-bold flex items-center gap-2 pt-1 text-foreground">
            <DomainIcon className="w-5 h-5 text-primary shrink-0" />
            <span>Your Learning Focus: {focus.nicheTitle}</span>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Domain: {focus.domainName} &bull; Tailored to close your diagnosed competency deficits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-xs">
          <p className="text-muted-foreground leading-relaxed">
            Based on your confirmed career direction and recent benchmark evaluation, these learning resources are curated specifically to help you resolve your high-priority and foundational gaps.
          </p>

          {focus.primaryGaps.length > 0 && (
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-foreground block mb-2">
                Recommended Focus Areas:
              </span>
              <div className="flex flex-wrap gap-2">
                {focus.primaryGaps.map((gap) => (
                  <Badge
                    key={gap.skillId}
                    variant="outline"
                    className={`text-xs py-1 px-2.5 font-medium flex items-center gap-1.5 ${
                      gap.priority === "high"
                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                        : gap.priority === "medium"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    <span className="capitalize">{gap.skillName}</span>
                    <span className="text-[10px] opacity-70">
                      ({gap.priority} Priority)
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* 3. LEARNING PLAN PREVIEW / SUGGESTED FOCUS STEPS */}
      {/* ------------------------------------------------------------------ */}
      {steps.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider">
                Sequential Roadmap
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {steps.length} Recommended Steps
              </span>
            </div>
            <CardTitle className="text-lg font-bold text-foreground">
              Your Suggested Focus
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Actionable progression designed to advance your target proficiency
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-3 rounded-lg border border-border/70 bg-muted/20 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary">
                      Step {step.stepNumber}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] uppercase font-semibold ${
                        step.priority === "high"
                          ? "text-rose-500 border-rose-500/30"
                          : "text-amber-500 border-amber-500/30"
                      }`}
                    >
                      {step.priority}
                    </Badge>
                  </div>
                  <h4 className="text-xs font-semibold text-foreground">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {step.action}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 4. ACTIVE LEARNING RESOURCES (REAL YOUTUBE VIDEOS) */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              <span>Curated Educational Video References</span>
            </h2>
            <p className="text-xs text-muted-foreground">
              Publicly available technical tutorials and practical walkthroughs aligned with your identified gaps
            </p>
          </div>
          {resources.length > 0 && (
            <Badge variant="outline" className="text-xs self-start sm:self-auto">
              {resources.length} {resources.length === 1 ? "Resource" : "Resources"} Available
            </Badge>
          )}
        </div>

        {/* Resources Render or Fallback / Empty States */}
        {resources.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((item) => (
                <Card
                  key={item.id}
                  className="border-border bg-card flex flex-col justify-between overflow-hidden hover:border-primary/40 transition-colors"
                >
                  <div>
                    {/* Video Thumbnail Header with Play Indicator */}
                    <div className="relative aspect-video w-full bg-muted overflow-hidden border-b border-border group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-foreground/90 text-background flex items-center justify-center shadow-md">
                          <Play className="w-4 h-4 ml-0.5 fill-current" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                        <Badge className="bg-black/70 text-white text-[10px] font-mono border-0 backdrop-blur-xs">
                          {item.channelTitle}
                        </Badge>
                      </div>
                    </div>

                    {/* Card Content */}
                    <CardHeader className="p-4 pb-2 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Badge
                          variant="outline"
                          className="text-[10px] font-semibold text-primary border-primary/30"
                        >
                          {item.skillName}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px] capitalize">
                          {item.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </div>

                  {/* Why this resource + External Link CTA */}
                  <div className="p-4 pt-2 space-y-3">
                    <div className="p-2.5 rounded-md bg-muted/30 border border-border/60 text-[11px] text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground block mb-0.5">
                        Why this resource:
                      </span>
                      {item.relevanceReason}
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full text-xs h-9 gap-1.5 hover:bg-muted font-medium"
                    >
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Watch ${item.title} on YouTube`}
                      >
                        <span>View on YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Note if fewer than 5 resources */}
            {data.message && (
              <p className="text-xs text-muted-foreground text-center py-2">
                {data.message}
              </p>
            )}
          </div>
        ) : (
          /* Empty or Unavailable API State */
          <Card className="border-border bg-card p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <Video className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-foreground">
                Learning references are temporarily unavailable
              </h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                {!data.isConfigured
                  ? "YouTube integration connects directly to real educational videos when configured with a server-side API key. Please check server configuration or retry later."
                  : "We couldn't retrieve matching video tutorials for your skill gaps right now. Click retry to refresh recommendations."}
              </p>
            </div>
            <div className="pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchLearningData(true)}
                disabled={refreshing}
                className="text-xs gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
                <span>Retry</span>
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 5. MENTORING SECTION — COMING SOON */}
      {/* ------------------------------------------------------------------ */}
      <Card className="border-border bg-card overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider">
                1-on-1 Faculty & Industry Guidance
              </span>
            </div>
            <Badge
              variant="outline"
              className="text-[11px] font-semibold border-amber-500/30 text-amber-500 bg-amber-500/10"
            >
              Coming Soon
            </Badge>
          </div>
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2 pt-1">
            <Users className="w-5 h-5 text-primary shrink-0" />
            <span>Mentoring & Personalized Advisory</span>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground leading-relaxed">
            Get personalized guidance from industry experts and experienced educators.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6 text-xs">
          <p className="text-muted-foreground leading-relaxed">
            Mentoring will connect you with experienced professionals and faculty members for one-on-one guidance based on your learning journey, skills, and career goals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-border/70 bg-muted/20 space-y-2">
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-foreground font-semibold">
                <Code2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-semibold text-foreground">
                Technical Portfolio & Code Reviews
              </h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Receive direct feedback on code quality, architecture, and project implementations from practicing engineers.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border/70 bg-muted/20 space-y-2">
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-foreground font-semibold">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-semibold text-foreground">
                Faculty Office Hours
              </h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Connect with departmental faculty for guidance on academic electives, foundational depth, and research pathways.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border/70 bg-muted/20 space-y-2">
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-foreground font-semibold">
                <Briefcase className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-semibold text-foreground">
                Mock Interviews & Career Prep
              </h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Practice technical assessments and behavioral interviews tailored to recruitment standards in your target niche.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-border/60 pt-4">
            <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>Mentorship matching is currently in active development for accredited institutions.</span>
            </div>
            <Button
              disabled
              variant="outline"
              size="sm"
              className="text-xs h-9 opacity-60 cursor-not-allowed select-none gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Coming Soon</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* 6. CURATED EDUCATION PARTNER ECOSYSTEM (EXTERNAL OPPORTUNITIES) */}
      {/* ------------------------------------------------------------------ */}
      <Card className="border-border bg-muted/20">
        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm md:text-base font-bold text-foreground">
                Looking for Accredited External Programs?
              </span>
            </div>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              You can also explore verified external training programs from organizations like OWASP, OpenSSF, Linux Foundation, and CNCF matched to your diagnosed gaps in Stage 4.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="shrink-0 text-xs h-9 gap-1.5">
            <Link href="/student/skill-gap">
              <span>View Partner Programs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
