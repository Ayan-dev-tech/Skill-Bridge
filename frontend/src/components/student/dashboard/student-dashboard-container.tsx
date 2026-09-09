"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import {
  Compass,
  ClipboardCheck,
  FileCheck,
  TrendingUp,
  BookOpen,
  FileText,
  Briefcase,
  Send,
  Lock,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Sparkles,
  AlertCircle,
  BarChart3,
  Award,
  Layers,
  GraduationCap,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import type { WorkflowStageStatus } from "@/lib/student-data";

interface DashboardStudent {
  id: string;
  name: string;
  email: string;
  university: string;
  department: string;
  currentSemester: number;
}

interface CurrentFocus {
  stage: number;
  title: string;
  subtitle: string;
  actionText: string;
  actionHref: string;
  status: WorkflowStageStatus;
}

interface InterestProfile {
  domainId: string;
  domainName: string;
  specificInterest: string;
  confidenceLevel: string;
  confirmedAt: string;
}

interface DashboardStatistics {
  knowledgeTestScore: number | null;
  knowledgeTestMaxScore: number;
  knowledgeTestPercent: number | null;
  knowledgeLevel: string | null;
  verifiedDocumentsCount: number;
  totalDocumentsCount: number;
  skillGapsIdentified: number;
  activeApplicationsCount: number;
}

interface SectionItem {
  id: string;
  stage: number;
  name: string;
  description: string;
  href: string;
  status: WorkflowStageStatus;
  lockReason: string | null;
}

interface DashboardData {
  student: DashboardStudent;
  currentFocus: CurrentFocus;
  interestProfile: InterestProfile | null;
  statistics: DashboardStatistics;
  sections: SectionItem[];
  isAdvancedVerified?: boolean;
}

const SECTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "interest-finder": Compass,
  "knowledge-testing": ClipboardCheck,
  documents: FileCheck,
  "skill-gap": TrendingUp,
  learning: BookOpen,
  resume: FileText,
  opportunities: Briefcase,
  applications: Send,
};

export function StudentDashboardContainer() {
  const router = useRouter();
  const [data, setData] = React.useState<DashboardData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchDashboardData = React.useCallback(async () => {
    try {
      setLoading(true);
      const headers: Record<string, string> = {};
      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("skill_bridge_user");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.id) headers["x-student-id"] = parsed.id;
          } catch {
            // ignore
          }
        }
      }

      const res = await fetch("/api/student/dashboard", { headers });
      const json = await res.json();
      if (json.requiresVerification && json.redirectUrl) {
        router.replace(json.redirectUrl);
        return;
      }
      if (json.success) {
        setData(json);
        setError(null);
      } else {
        setError(json.error || "Failed to load dashboard data");
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Network error while communicating with Skill Bridge services");
    } finally {
      setLoading(false);
    }
  }, [router]);

  React.useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto py-6 animate-pulse">
        <div className="h-10 bg-muted/40 rounded-lg w-1/3" />
        <div className="h-24 bg-muted/20 rounded-xl border border-border" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-28 bg-muted/20 rounded-xl border border-border" />
          <div className="h-28 bg-muted/20 rounded-xl border border-border" />
          <div className="h-28 bg-muted/20 rounded-xl border border-border" />
          <div className="h-28 bg-muted/20 rounded-xl border border-border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-44 bg-muted/20 rounded-xl border border-border" />
          <div className="h-44 bg-muted/20 rounded-xl border border-border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-40 bg-muted/20 rounded-xl border border-border" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Unable to Load Student Dashboard
        </h2>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button onClick={fetchDashboardData} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  const { student, currentFocus, interestProfile, statistics, sections } = data;

  // Calculate overall workflow progress percentage based on completed stages
  const completedCount = sections.filter((s) => s.status === "completed").length;
  const progressPercent = Math.round((completedCount / sections.length) * 100);

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      {/* 1. Header Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-border/80 bg-muted/40 text-xs font-mono text-muted-foreground shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>Student Verified Profile &bull; {student.id}</span>
            </div>
            {data.isAdvancedVerified && (
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Advanced Profile Verified &bull; Early access to Jobs & Internships unlocked</span>
              </div>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-foreground">
            Welcome back, {student.name}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            {student.department} &bull; {student.university} (Semester {student.currentSemester})
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {sections.find((s) => s.id === "interest-finder")?.status !== "locked" && (
            <Button variant="outline" size="sm" asChild className="rounded-full shadow-2xs">
              <Link href="/student/interest-finder" className="text-xs">
                <Compass className="w-3.5 h-3.5 mr-1.5" />
                Interest Explorer
              </Link>
            </Button>
          )}
          <Button size="sm" asChild className="rounded-full shadow-xs">
            <Link href={currentFocus.actionHref} className="text-xs">
              {currentFocus.actionText} <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* 2. 8-Stage Journey Progression Track */}
      <Card className="border border-border/80 bg-card shadow-xs rounded-xl">
        <CardHeader className="pb-3 pt-4 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-sm font-heading font-semibold tracking-tight text-foreground flex items-center gap-2">
                <Layers className="w-4 h-4 text-muted-foreground" />
                Skill Bridge Student Journey
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Sequential 8-stage career transition roadmap from exploration to industry placement.
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-medium text-foreground">
                {completedCount} of 8 Stages Complete ({progressPercent}%)
              </span>
            </div>
          </div>
          <Progress value={progressPercent} className="h-1.5 mt-2 rounded-full" />
        </CardHeader>

        <CardContent className="px-4 sm:px-6 pb-4 pt-1">
          {/* Milestone timeline steps */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
            {sections.map((sec) => {
              const isCurrent = sec.stage === currentFocus.stage;
              const isCompleted = sec.status === "completed";
              const isAvailable = sec.status === "available";
              const isLocked = sec.status === "locked";

              return (
                <Link
                  key={sec.id}
                  href={isLocked ? "#" : sec.href}
                  className={`group p-2.5 rounded-xl border text-left transition-all ${
                    isCurrent
                      ? "border-primary bg-primary/5 ring-1 ring-primary/60 shadow-2xs"
                      : isCompleted
                      ? "border-border/80 bg-muted/20 hover:bg-muted/40"
                      : isAvailable
                      ? "border-border/80 hover:border-foreground/30 hover:bg-muted/30"
                      : "border-border/40 bg-muted/10 opacity-50 cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    if (isLocked) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-mono font-semibold text-muted-foreground">
                      0{sec.stage}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : isCurrent ? (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                      </span>
                    ) : isLocked ? (
                      <Lock className="w-3 h-3 text-muted-foreground/60" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    )}
                  </div>
                  <p className="text-[11px] font-medium text-foreground truncate leading-tight">
                    {sec.name}
                  </p>
                  <span
                    className={`text-[9px] uppercase tracking-wider font-mono font-medium block mt-0.5 ${
                      isCompleted
                        ? "text-emerald-600 dark:text-emerald-400"
                        : isCurrent
                        ? "text-primary font-bold"
                        : isAvailable
                        ? "text-foreground/80"
                        : "text-muted-foreground/60"
                    }`}
                  >
                    {isCompleted
                      ? "Complete"
                      : isCurrent
                      ? "Active Focus"
                      : isAvailable
                      ? "Available"
                      : "Locked"}
                  </span>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 3. Real Account Statistics Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Knowledge Test Benchmark */}
        <Card className="border border-border/80 bg-card shadow-xs rounded-xl">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] font-mono font-medium uppercase tracking-wider">
                Technical Benchmark
              </span>
              <ClipboardCheck className="w-4 h-4 text-foreground/70" />
            </div>
            <div>
              {statistics.knowledgeTestScore !== null ? (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-foreground">
                    {statistics.knowledgeTestScore}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">
                    / {statistics.knowledgeTestMaxScore} Pts
                  </span>
                  <Badge variant="outline" className="ml-auto text-[10px] capitalize rounded-full">
                    {statistics.knowledgeLevel || "Calibrated"}
                  </Badge>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-heading font-semibold text-muted-foreground">
                    Not Taken
                  </span>
                  <Badge variant="secondary" className="ml-auto text-[10px] rounded-full">
                    Pending
                  </Badge>
                </div>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground leading-tight">
              {statistics.knowledgeTestPercent !== null
                ? `${statistics.knowledgeTestPercent}% diagnostic accuracy across 10 calibrated questions.`
                : "Complete Stage 2 to establish your baseline technical score."}
            </p>
          </CardContent>
        </Card>

        {/* Metric 2: Document Submission */}
        <Card className="border border-border/80 bg-card shadow-xs rounded-xl">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] font-mono font-medium uppercase tracking-wider">
                Document Submission
              </span>
              <FileCheck className="w-4 h-4 text-foreground/70" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-foreground">
                  {statistics.verifiedDocumentsCount}
                </span>
                <span className="text-xs text-muted-foreground">
                  / 4 Required Submitted
                </span>
                <Badge variant="outline" className="ml-auto text-[10px] rounded-full">
                  Stage 1
                </Badge>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground leading-tight">
              Required identification and academic documents submitted for your student profile.
            </p>
          </CardContent>
        </Card>

        {/* Metric 3: Skill Gap Analysis */}
        <Card className="border border-border/80 bg-card shadow-xs rounded-xl">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] font-mono font-medium uppercase tracking-wider">
                Skill Gap Matrix
              </span>
              <TrendingUp className="w-4 h-4 text-foreground/70" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl md:text-2xl font-heading font-bold tracking-tight text-foreground">
                  {statistics.skillGapsIdentified > 0
                    ? `${statistics.skillGapsIdentified} Gaps Calibrated`
                    : "Pending Stage 2"}
                </span>
                <Badge variant="secondary" className="ml-auto text-[10px] rounded-full">
                  Stage 4
                </Badge>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground leading-tight">
              AI comparison against current industry hiring requirements.
            </p>
          </CardContent>
        </Card>

        {/* Metric 4: Placement Applications */}
        <Card className="border border-border/80 bg-card shadow-xs rounded-xl">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] font-mono font-medium uppercase tracking-wider">
                Applications
              </span>
              <Briefcase className="w-4 h-4 text-foreground/70" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-foreground">
                  {statistics.activeApplicationsCount}
                </span>
                <span className="text-xs text-muted-foreground">Active Submissions</span>
                <Badge variant="outline" className="ml-auto text-[10px] rounded-full">
                  Stage 7-8
                </Badge>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground leading-tight">
              Track interviews, shortlists, and partner campus placements.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 4. Current Focus & Interest Profile Two-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Current Focus Active Callout */}
        <Card className="border-border bg-card flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Badge variant="default" className="text-[11px] font-mono">
                Stage 0{currentFocus.stage} Priority
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                Current Recommended Action
              </span>
            </div>
            <CardTitle className="text-lg font-bold text-foreground mt-2">
              {currentFocus.title}
            </CardTitle>
            <CardDescription className="text-xs leading-relaxed text-muted-foreground">
              {currentFocus.subtitle}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="p-3.5 rounded-lg border border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground">
                  Workflow Target
                </span>
                <p className="text-xs font-semibold text-foreground">
                  Stage {currentFocus.stage}: {currentFocus.title}
                </p>
              </div>
              <Button asChild size="sm" className="shrink-0">
                <Link href={currentFocus.actionHref}>
                  {currentFocus.actionText} <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Confirmed Interest Profile Card */}
        <Card className="border border-border/80 bg-card shadow-xs rounded-xl flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-[10px] font-mono rounded-full">
                Stage 01 Foundation
              </Badge>
              {interestProfile && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                </span>
              )}
            </div>
            <CardTitle className="text-lg font-heading font-bold text-foreground mt-2">
              {interestProfile ? interestProfile.specificInterest : "Interest Profile Not Calibrated"}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {interestProfile
                ? `Core Domain: ${interestProfile.domainName}`
                : "Discover your engineering strengths and establish your target specialization."}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            {interestProfile ? (
              <div className="space-y-3">
                <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Specialization Alignment:</span>
                    <span className="font-semibold text-foreground">
                      {interestProfile.confidenceLevel} Confidence
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Calibrated On:</span>
                    <span className="font-mono text-muted-foreground text-[11px]">
                      {new Date(interestProfile.confirmedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Button variant="outline" size="sm" asChild className="text-xs rounded-full shadow-2xs">
                    <Link href="/student/interest-finder">
                      <Compass className="w-3.5 h-3.5 mr-1.5" />
                      Retake Discovery Engine
                    </Link>
                  </Button>
                  {sections.find((s) => s.id === "knowledge-testing")?.status !== "locked" ? (
                    <Button size="sm" variant="ghost" asChild className="text-xs rounded-full">
                      <Link href="/student/knowledge-testing">
                        Proceed to Technical Benchmark <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" disabled className="text-xs opacity-60 rounded-full">
                      <Lock className="w-3.5 h-3.5 mr-1" /> Benchmark Locked
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-border/80 text-center space-y-2">
                <p className="text-xs text-muted-foreground">
                  You haven&apos;t confirmed your engineering interest profile yet. Complete the Interest Finder to unlock your personalized curriculum.
                </p>
                {sections.find((s) => s.id === "interest-finder")?.status !== "locked" ? (
                  <Button size="sm" asChild className="rounded-full shadow-xs">
                    <Link href="/student/interest-finder">
                      Start Interest Discovery <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </Button>
                ) : (
                  <Button size="sm" disabled className="opacity-60 rounded-full">
                    <Lock className="w-3.5 h-3.5 mr-1.5" /> Discovery Locked
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 5. All 8 Sections Complete Workflow Grid */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-bold tracking-tight text-foreground">
              Complete Skill Bridge Workflow
            </h2>
            <p className="text-xs text-muted-foreground">
              Every phase required for graduation readiness, skills certification, and campus hiring.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map((section) => {
            const Icon = SECTION_ICONS[section.id] || Layers;
            const isCompleted = section.status === "completed";
            const isInProgress = section.status === "in_progress";
            const isAvailable = section.status === "available";
            const isNotStarted = section.status === "not_started";
            const isLocked = section.status === "locked";

            return (
              <Card
                key={section.id}
                className={`border transition-all flex flex-col justify-between rounded-xl ${
                  isLocked
                    ? "border-border/60 bg-muted/10 opacity-70"
                    : isCompleted
                    ? "border-border/80 bg-card hover:border-border shadow-2xs"
                    : "border-border/80 bg-card hover:border-foreground/30 shadow-xs"
                }`}
              >
                <CardHeader className="p-4 pb-2 space-y-2">
                  <div className="flex items-start justify-between">
                    <div
                      className={`p-2 rounded-lg ${
                        isCompleted
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : isLocked
                          ? "bg-muted text-muted-foreground/50"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <Badge
                      variant={
                        isCompleted
                          ? "default"
                          : isInProgress
                          ? "default"
                          : isAvailable
                          ? "outline"
                          : "secondary"
                      }
                      className="text-[10px] font-mono capitalize rounded-full"
                    >
                      {isCompleted
                        ? "Completed"
                        : isInProgress
                        ? "In Progress"
                        : isAvailable
                        ? "Available"
                        : isNotStarted
                        ? "Not Started"
                        : "Locked"}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">
                      Stage 0{section.stage}
                    </span>
                    <CardTitle className="text-sm font-heading font-semibold text-foreground">
                      {section.name}
                    </CardTitle>
                  </div>

                  <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {section.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-4 pt-2">
                  {isLocked ? (
                    <div className="pt-2 border-t border-border/60">
                      <p className="text-[11px] text-muted-foreground/80 flex items-start gap-1.5 leading-tight">
                        <Lock className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />
                        <span>{section.lockReason || "Complete prior stages to unlock."}</span>
                      </p>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-muted-foreground">
                        {isCompleted ? "Stage Completed" : "Ready to Proceed"}
                      </span>
                      <Button variant="ghost" size="sm" asChild className="h-7 text-xs px-2.5 rounded-full">
                        <Link href={section.href}>
                          {isCompleted ? "Review" : "Open"} <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
