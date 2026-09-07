"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Briefcase,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Trash2,
  Search,
  Check,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { ATSAnalysisResult, ATSIssue, ATSRecommendation } from "@/lib/resume/types";

function ResumeCheckerContent() {
  const searchParams = useSearchParams();
  const prefilledRole = searchParams.get("jobRole") || "";
  const prefilledDesc = searchParams.get("jobDesc") || "";

  const [loading, setLoading] = React.useState(true);
  const [analyzing, setAnalyzing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [analysis, setAnalysis] = React.useState<ATSAnalysisResult | null>(null);

  // Form states
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [jobDescription, setJobDescription] = React.useState(prefilledDesc);
  const [targetRole, setTargetRole] = React.useState(prefilledRole);
  const [showJdInput, setShowJdInput] = React.useState(Boolean(prefilledDesc || prefilledRole));
  const [fileName, setFileName] = React.useState<string | null>(null);

  // Load existing analysis on mount if available
  React.useEffect(() => {
    async function loadExistingAnalysis() {
      try {
        setLoading(true);
        const res = await fetch("/api/student/resume/analyze");
        const json = await res.json();
        if (json.success && json.analysis) {
          setAnalysis(json.analysis);
          if (json.analysis.resumeFileName) {
            setFileName(json.analysis.resumeFileName);
          }
        }
      } catch (err) {
        console.error("Failed to load existing resume analysis:", err);
      } finally {
        setLoading(false);
      }
    }
    loadExistingAnalysis();
  }, []);

  // Handle PDF file selection
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const lowerName = file.name.toLowerCase();
    if (!lowerName.endsWith(".pdf")) {
      setError("Only PDF files are accepted. Please upload your resume as a .pdf file (maximum 5 MB).");
      setSelectedFile(null);
      setFileName(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File exceeds the 5 MB limit. Please upload a smaller PDF resume.");
      setSelectedFile(null);
      setFileName(null);
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
    setError(null);
  };

  // Submit PDF for ATS analysis
  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select a PDF resume to analyze.");
      return;
    }

    try {
      setAnalyzing(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", selectedFile);
      if (jobDescription.trim()) {
        formData.append("jobDescription", jobDescription.trim());
      }
      if (targetRole.trim()) {
        formData.append("targetRole", targetRole.trim());
      }

      const res = await fetch("/api/student/resume/analyze", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.analysis) {
        setAnalysis(json.analysis);
      } else {
        setError(json.error || "Analysis could not be completed. Please ensure the document is a valid resume.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Network error during analysis.");
    } finally {
      setAnalyzing(false);
    }
  };

  // Clear analysis
  const handleClear = async () => {
    try {
      await fetch("/api/student/resume/analyze", { method: "DELETE" });
      setAnalysis(null);
      setSelectedFile(null);
      setFileName(null);
    } catch (err) {
      console.error("Failed to clear analysis:", err);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-destructive";
  };

  const getScoreBadge = (tier: string) => {
    switch (tier) {
      case "Excellent":
        return <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">Excellent Fit</Badge>;
      case "Strong":
        return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">Strong Readiness</Badge>;
      case "Moderate":
        return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">Moderate Match</Badge>;
      default:
        return <Badge variant="destructive">Needs Improvement</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto py-8 px-4 animate-pulse">
        <div className="h-8 bg-muted/40 rounded w-1/3" />
        <div className="h-24 bg-muted/20 rounded-xl border border-border" />
        <div className="h-64 bg-muted/20 rounded-xl border border-border" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-4">
      {/* 1. Header with Breadcrumb & Stage Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-border bg-muted/40 text-xs font-mono text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            <span>Stage 06 &bull; ATS Resume Diagnostic</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Resume Checker
          </h1>
          <p className="text-xs text-muted-foreground">
            Analyze your resume with transparent ATS-style diagnostics, parseability checks, and keyword matching.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href="/student/opportunities">
              <Briefcase className="w-3.5 h-3.5 mr-1.5" />
              Explore Opportunities
            </Link>
          </Button>
          {analysis && (
            <Button variant="outline" size="sm" onClick={handleClear} className="text-xs text-destructive hover:bg-destructive/10">
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* 2. ATS Disclaimer Callout */}
      <div className="p-3.5 rounded-lg border border-border bg-muted/20 flex items-start gap-3">
        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>ATS Diagnostic Notice:</strong> ATS scores are estimates and can vary between proprietary hiring systems. Use this score as a diagnostic tool to improve resume readability, keyword coverage, and section organization before applying.
        </p>
      </div>

      {/* 3. Empty State / Upload & Input Workspace */}
      {!analysis && (
        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-foreground">
              Upload your resume
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Upload your resume to check its ATS readiness. PDF only • Maximum 5 MB
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg border border-destructive/20 bg-destructive/10 flex items-center gap-2 text-xs text-destructive">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* PDF Upload Box */}
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors bg-muted/10 space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Upload className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">
                  {fileName ? `Selected: ${fileName}` : "Upload your resume"}
                </p>
                <p className="text-[11px] text-muted-foreground font-mono">
                  PDF only • Maximum 5 MB
                </p>
              </div>
              <label className="inline-block cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileUpload}
                  className="sr-only"
                />
                <span className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3.5 py-1.5 text-xs font-medium hover:bg-muted transition-colors shadow-sm">
                  {selectedFile ? "Choose Different PDF" : "Select PDF from Computer"}
                </span>
              </label>
              {selectedFile && (
                <p className="text-[10px] text-muted-foreground font-mono">
                  File size: {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              )}
            </div>

            {/* Job Description Optional Toggle */}
            <div className="pt-2 border-t border-border/60 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-foreground block">
                    Targeted Job Match (Optional)
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Provide a specific job description to benchmark required skills and role fit.
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowJdInput(!showJdInput)}
                  className="text-xs"
                >
                  {showJdInput ? "Hide Job Match" : "Add Job Description"}
                </Button>
              </div>

              {showJdInput && (
                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      Target Role Title (e.g. Security Engineer, Backend Developer)
                    </label>
                    <Input
                      placeholder="e.g. Cloud Security Analyst"
                      value={targetRole}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTargetRole(e.target.value)
                      }
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      Job Description Text / Responsibilities
                    </label>
                    <Textarea
                      placeholder="Paste the job posting description, required skills, and qualification bullet points..."
                      value={jobDescription}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setJobDescription(e.target.value)
                      }
                      rows={4}
                      className="text-xs font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                onClick={handleAnalyze}
                disabled={analyzing || !selectedFile}
                className="text-xs gap-1.5"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Running ATS Diagnostics...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Run ATS Resume Analysis
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 4. Analysis Results View */}
      {analysis && (
        <div className="space-y-6">
          {/* Diagnostic Scorecard Hero */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getScoreBadge(analysis.strengthTier)}
                    <span className="text-xs text-muted-foreground font-mono">
                      Analyzed on {new Date(analysis.analyzedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Resume Strength: {analysis.strengthTier}
                  </h2>
                  <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
                    {analysis.summary}
                  </p>
                  {analysis.targetRole && (
                    <div className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      Target Role: {analysis.targetRole}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-muted/20 min-w-[140px] text-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    ATS Readiness Score
                  </span>
                  <div className="flex items-baseline gap-1 my-1">
                    <span className={`text-4xl font-extrabold tracking-tight ${getScoreColor(analysis.overallScore)}`}>
                      {analysis.overallScore}
                    </span>
                    <span className="text-xs text-muted-foreground font-bold">/100</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    Composite Diagnostic
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5-Category Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Category 1: Parseability */}
            <Card className="border-border bg-card">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-foreground">Parseability</span>
                  <span className="text-xs font-bold font-mono text-foreground">
                    {analysis.categoryScores.parseability}%
                  </span>
                </div>
                <Progress value={analysis.categoryScores.parseability} className="h-1.5" />
                <p className="text-[10px] text-muted-foreground">
                  Text extraction and layout structure readability.
                </p>
              </CardContent>
            </Card>

            {/* Category 2: Structure */}
            <Card className="border-border bg-card">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-foreground">Structure</span>
                  <span className="text-xs font-bold font-mono text-foreground">
                    {analysis.categoryScores.structure}%
                  </span>
                </div>
                <Progress value={analysis.categoryScores.structure} className="h-1.5" />
                <p className="text-[10px] text-muted-foreground">
                  Presence of essential sections (Contact, Experience, Skills).
                </p>
              </CardContent>
            </Card>

            {/* Category 3: Skill Keywords */}
            <Card className="border-border bg-card">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-foreground">Skills / Keywords</span>
                  <span className="text-xs font-bold font-mono text-foreground">
                    {analysis.categoryScores.keywordCoverage}%
                  </span>
                </div>
                <Progress value={analysis.categoryScores.keywordCoverage} className="h-1.5" />
                <p className="text-[10px] text-muted-foreground">
                  {analysis.matchedKeywords.length} technical skills detected.
                </p>
              </CardContent>
            </Card>

            {/* Category 4: Job Match */}
            <Card className="border-border bg-card">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-foreground">Job Match</span>
                  <span className="text-xs font-bold font-mono text-foreground">
                    {analysis.categoryScores.jobMatch !== null ? `${analysis.categoryScores.jobMatch}%` : "N/A"}
                  </span>
                </div>
                <Progress
                  value={analysis.categoryScores.jobMatch !== null ? analysis.categoryScores.jobMatch : 0}
                  className="h-1.5"
                />
                <p className="text-[10px] text-muted-foreground">
                  {analysis.categoryScores.jobMatch !== null
                    ? "Targeted role alignment"
                    : "General diagnostic (no JD supplied)"}
                </p>
              </CardContent>
            </Card>

            {/* Category 5: Content Quality */}
            <Card className="border-border bg-card">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-foreground">Content Quality</span>
                  <span className="text-xs font-bold font-mono text-foreground">
                    {analysis.categoryScores.contentQuality}%
                  </span>
                </div>
                <Progress value={analysis.categoryScores.contentQuality} className="h-1.5" />
                <p className="text-[10px] text-muted-foreground">
                  Measurable metrics and actionable verb usage.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Keywords & Sections Detailed Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Detected Sections & Missing Sections */}
            <Card className="border-border bg-card">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-bold text-foreground">
                  Section Organization
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Standard ATS sections recognized in your resume structure.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-foreground block">
                    Detected Sections:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.detectedSections.map((sec: string) => (
                      <Badge key={sec} variant="outline" className="text-[11px] gap-1 capitalize">
                        <Check className="w-3 h-3 text-emerald-500" />
                        {sec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {analysis.missingSections.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-border/60">
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 block">
                      Missing Recommended Sections:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.missingSections.map((sec: string) => (
                        <Badge key={sec} variant="secondary" className="text-[11px] gap-1 capitalize text-muted-foreground">
                          <AlertTriangle className="w-3 h-3 text-amber-500" />
                          {sec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Matched Keywords vs Missing Keywords */}
            <Card className="border-border bg-card">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-bold text-foreground">
                  Technical Keywords & Skills
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Skill terms identified and recommended additions.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-foreground block">
                    Found on Resume ({analysis.matchedKeywords.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {analysis.matchedKeywords.map((kw: string) => (
                      <span key={kw} className="text-[10px] px-2 py-0.5 rounded bg-muted/40 border border-border text-foreground font-mono">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {analysis.missingKeywords.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-border/60">
                    <span className="text-[11px] font-semibold text-primary block">
                      Recommended Relevant Keywords to Add:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.missingKeywords.map((kw: string) => (
                        <Badge key={kw} variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                          + {kw}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground italic mt-1">
                      Note: Only add skills you have genuinely practiced. Avoid keyword stuffing.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Actionable Improvement Suggestions */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-foreground">
              Prioritized Improvement Suggestions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.recommendations.map((rec: ATSRecommendation, idx: number) => (
                <Card key={idx} className="border-border bg-card">
                  <CardContent className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={rec.priority === "high" ? "default" : "outline"}
                        className="text-[10px] uppercase font-mono"
                      >
                        {rec.priority} Priority
                      </Badge>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {rec.category}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-foreground">
                      {rec.action}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {rec.reason}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Diagnostic Issues Identified */}
          {analysis.issues.length > 0 && (
            <Card className="border-border bg-card">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-bold text-foreground">
                  Diagnostic Findings ({analysis.issues.length})
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Formatting and parseability issues flagged by the ATS engine.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="space-y-2">
                  {analysis.issues.map((iss: ATSIssue, idx: number) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-md border border-border bg-muted/10 flex items-start gap-2.5 text-xs"
                    >
                      {iss.severity === "critical" ? (
                        <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      ) : iss.severity === "warning" ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      ) : (
                        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-0.5">
                        <span className="font-semibold text-foreground">{iss.message}</span>
                        {iss.suggestion && (
                          <p className="text-[11px] text-muted-foreground">{iss.suggestion}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bottom Action Footer */}
          <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-foreground">
                Ready to explore matched corporate roles?
              </p>
              <p className="text-[11px] text-muted-foreground">
                Use your optimized resume to apply for campus drives and internships.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnalysis(null)}
                className="text-xs"
              >
                Re-Upload / Edit Text
              </Button>
              <Button asChild size="sm" className="text-xs">
                <Link href="/student/opportunities">
                  Browse Jobs &bull; Apply <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResumeCheckerPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-50/50 p-6 flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Loading ATS Resume Checker...</span>
          </div>
        </div>
      }
    >
      <ResumeCheckerContent />
    </React.Suspense>
  );
}
