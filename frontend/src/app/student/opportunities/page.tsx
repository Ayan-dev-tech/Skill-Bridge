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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  Sparkles,
  Lock,
  ArrowRight,
  CheckCircle2,
  FileSearch,
  ExternalLink,
  GraduationCap,
  Clock,
  Layers,
  Search,
  X,
  AlertTriangle,
  FileText,
  AlertCircle,
  FileCheck,
  Check,
  HelpCircle,
  Info,
} from "lucide-react";
import { JobPosting, InternshipPosting } from "@/lib/db";

interface ReadinessData {
  success: boolean;
  jobId: string;
  jobTitle: string;
  companyName: string;
  hasOpportunityAccess: boolean;
  alreadyApplied: boolean;
  isReady: boolean;
  profile: {
    isComplete: boolean;
    fullName: string;
    email: string;
    phone: string;
  };
  resume: {
    hasResume: boolean;
    fileName: string | null;
    overallScore: number | null;
    jobMatchScore: number;
    disclaimer: string;
  };
  documents: {
    allPresent: boolean;
    requiredDocumentTypes: string[];
    missingDocumentTypes: string[];
  };
  matching: {
    matchPercentage: number;
    strengths: string[];
    gaps: string[];
    recommendation: "Strong Match" | "Reasonable Match" | "Needs Improvement";
  };
}

export default function OpportunitiesPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [isLocked, setIsLocked] = React.useState(false);
  const [lockReason, setLockReason] = React.useState<string | null>(null);
  const [isAdvancedVerified, setIsAdvancedVerified] = React.useState(false);
  const [jobs, setJobs] = React.useState<JobPosting[]>([]);
  const [internships, setInternships] = React.useState<InternshipPosting[]>([]);
  const [appliedJobIds, setAppliedJobIds] = React.useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = React.useState<"all" | "jobs" | "internships">("all");

  // Modal / Application Flow state
  const [selectedItem, setSelectedItem] = React.useState<JobPosting | InternshipPosting | null>(null);
  const [modalStep, setModalStep] = React.useState<"details" | "readiness" | "review" | "success">("details");
  const [readinessData, setReadinessData] = React.useState<ReadinessData | null>(null);
  const [loadingReadiness, setLoadingReadiness] = React.useState(false);
  const [submittingApp, setSubmittingApp] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  // Application form editable fields
  const [applicantName, setApplicantName] = React.useState("");
  const [applicantEmail, setApplicantEmail] = React.useState("");
  const [applicantPhone, setApplicantPhone] = React.useState("");
  const [coverLetter, setCoverLetter] = React.useState("");
  const [portfolioUrl, setPortfolioUrl] = React.useState("");
  const [githubUrl, setGithubUrl] = React.useState("");
  const [linkedinUrl, setLinkedinUrl] = React.useState("");

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      const [oppRes, appRes] = await Promise.all([
        fetch("/api/student/opportunities"),
        fetch("/api/student/applications"),
      ]);

      const oppJson = await oppRes.json();
      if (oppRes.status === 403 || oppJson.isLocked) {
        setIsLocked(true);
        setLockReason(
          oppJson.error ||
            "Complete the required learning stage to unlock job opportunities."
        );
        return;
      }

      if (oppJson.success) {
        setIsLocked(false);
        setIsAdvancedVerified(Boolean(oppJson.isAdvancedVerified));
        setJobs(oppJson.jobs || []);
        setInternships(oppJson.internships || []);
      }

      const appJson = await appRes.json();
      if (appJson.success && Array.isArray(appJson.applications)) {
        const appliedSet = new Set<string>();
        for (const app of appJson.applications) {
          if (app.jobId) appliedSet.add(app.jobId);
        }
        setAppliedJobIds(appliedSet);
      }
    } catch (err) {
      console.error("Opportunities fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Open item modal and fetch readiness
  const handleOpenItem = async (item: JobPosting | InternshipPosting, initialStep: "details" | "readiness" = "details") => {
    setSelectedItem(item);
    setModalStep(initialStep);
    setSubmitError(null);

    try {
      setLoadingReadiness(true);
      const res = await fetch(`/api/student/applications/readiness?jobId=${item.id}`);
      const json = await res.json();
      if (json.success) {
        setReadinessData(json);
        setApplicantName(json.profile?.fullName || "");
        setApplicantEmail(json.profile?.email || "");
        setApplicantPhone(json.profile?.phone || "");
      }
    } catch (err) {
      console.error("Failed to load readiness info:", err);
    } finally {
      setLoadingReadiness(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalStep("details");
    setReadinessData(null);
    setSubmitError(null);
  };

  // Explicit Application Confirmation & Submission
  const handleConfirmSubmit = async () => {
    if (!selectedItem) return;

    try {
      setSubmittingApp(true);
      setSubmitError(null);

      const isInternship = "duration" in selectedItem;
      const res = await fetch("/api/student/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedItem.id,
          companyName: selectedItem.companyName,
          roleTitle: selectedItem.roleTitle,
          location: selectedItem.location,
          employmentType: isInternship
            ? "Internship"
            : (selectedItem as JobPosting).employmentType || "Full-time",
          salaryRange: isInternship
            ? (selectedItem as InternshipPosting).stipendRange
            : (selectedItem as JobPosting).salaryRange,
          matchScoreAtApplication: readinessData?.matching?.matchPercentage,
          applicantFullName: applicantName.trim(),
          applicantEmail: applicantEmail.trim(),
          applicantPhone: applicantPhone.trim(),
          coverLetter: coverLetter.trim() || undefined,
          portfolioUrl: portfolioUrl.trim() || undefined,
          githubUrl: githubUrl.trim() || undefined,
          linkedinUrl: linkedinUrl.trim() || undefined,
          confirmed: true, // Explicit confirmation gate
        }),
      });

      const json = await res.json();
      if (json.success) {
        setAppliedJobIds((prev) => new Set([...prev, selectedItem.id]));
        setModalStep("success");
      } else {
        setSubmitError(json.error || "Failed to submit application. Please verify readiness requirements.");
      }
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Network error during application submission.");
    } finally {
      setSubmittingApp(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto py-8 px-4 animate-pulse">
        <div className="h-8 bg-muted/40 rounded w-1/3" />
        <div className="h-28 bg-muted/20 rounded-xl border border-border" />
        <div className="space-y-3">
          <div className="h-36 bg-muted/20 rounded-xl border border-border" />
          <div className="h-36 bg-muted/20 rounded-xl border border-border" />
        </div>
      </div>
    );
  }

  // Locked Gate State
  if (isLocked) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-muted/40 text-muted-foreground flex items-center justify-center mx-auto border border-border">
          <Lock className="w-6 h-6" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Jobs & Internships Locked
          </h2>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            {lockReason || "Complete the required learning stage to unlock job opportunities."}
          </p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href="/student/dashboard">Return to Dashboard</Link>
          </Button>
          <Button size="sm" asChild className="text-xs gap-1.5">
            <Link href="/student/learning">
              Continue to Learning Tracks
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
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
            <span>Stage 07 &bull; Opportunities & Campus Placement</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Jobs & Internships
          </h1>
          <p className="text-xs text-muted-foreground">
            Explore verified corporate openings, review required qualifications, benchmark your match, and track your applications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href="/student/applications">
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              Track Applications ({appliedJobIds.size})
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href="/student/resume-checker">
              <FileSearch className="w-3.5 h-3.5 mr-1.5" />
              Resume Checker
            </Link>
          </Button>
        </div>
      </div>

      {/* 2. Advanced Access Banner */}
      {isAdvancedVerified && (
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              Advanced Profile Verified &bull; Direct Job Access Unlocked
            </p>
            <p className="text-xs text-emerald-800/80 dark:text-emerald-200/80 leading-relaxed">
              Based on your verified knowledge assessment, early access to Jobs & Internships is unlocked. You can review job requirements, check your readiness, and apply directly.
            </p>
          </div>
        </div>
      )}

      {/* 3. Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2">
        <Button
          variant={activeTab === "all" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("all")}
          className="text-xs h-8"
        >
          All Opportunities ({jobs.length + internships.length})
        </Button>
        <Button
          variant={activeTab === "jobs" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("jobs")}
          className="text-xs h-8"
        >
          Full-Time Jobs ({jobs.length})
        </Button>
        <Button
          variant={activeTab === "internships" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("internships")}
          className="text-xs h-8"
        >
          Internships ({internships.length})
        </Button>
      </div>

      {/* 4. Listings Cards */}
      <div className="space-y-4">
        {/* Full-Time Jobs */}
        {(activeTab === "all" || activeTab === "jobs") &&
          jobs.map((job) => {
            const isApplied = appliedJobIds.has(job.id);

            return (
              <Card
                key={job.id}
                className="border-border bg-card hover:border-border/80 transition-all flex flex-col justify-between"
              >
                <CardHeader className="p-5 pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px] font-mono uppercase">
                          {job.employmentType} &bull; {job.workMode}
                        </Badge>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                          {job.salaryRange}
                        </span>
                      </div>
                      <CardTitle className="text-base font-bold text-foreground">
                        {job.roleTitle}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">{job.companyName}</span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span>&bull;</span>
                        <span className="text-[11px] text-muted-foreground">
                          Exp: {job.experienceRequirement}
                        </span>
                      </CardDescription>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isApplied ? (
                        <div className="flex items-center gap-2">
                          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs py-1 px-2.5">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Application Submitted
                          </Badge>
                          <Button variant="outline" size="sm" asChild className="text-xs">
                            <Link href="/student/applications">View Application</Link>
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleOpenItem(job, "details")}
                          className="text-xs"
                        >
                          View Details & Apply
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-5 pb-5 pt-0 space-y-3">
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.requiredSkills.map((sk: string) => (
                      <span
                        key={sk}
                        className="text-[10px] px-2 py-0.5 rounded bg-muted/40 border border-border text-foreground font-mono"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Application Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-xs h-7 px-2 gap-1 text-primary hover:text-primary"
                      >
                        <Link
                          href={`/student/resume-checker?jobId=${job.id}&jobRole=${encodeURIComponent(
                            job.roleTitle
                          )}&jobDesc=${encodeURIComponent(
                            `${job.roleTitle} at ${job.companyName}. Required skills: ${job.requiredSkills.join(
                              ", "
                            )}. Responsibilities: ${job.description}`
                          )}`}
                        >
                          <FileSearch className="w-3.5 h-3.5" />
                          Check Resume Against Job
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

        {/* Internships */}
        {(activeTab === "all" || activeTab === "internships") &&
          internships.map((internship) => {
            const isApplied = appliedJobIds.has(internship.id);

            return (
              <Card
                key={internship.id}
                className="border-border bg-card hover:border-border/80 transition-all flex flex-col justify-between"
              >
                <CardHeader className="p-5 pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px] font-mono uppercase">
                          Internship ({internship.duration}) &bull; {internship.workMode}
                        </Badge>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                          {internship.stipendRange}
                        </span>
                      </div>
                      <CardTitle className="text-base font-bold text-foreground">
                        {internship.roleTitle}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">{internship.companyName}</span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {internship.location}
                        </span>
                      </CardDescription>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isApplied ? (
                        <div className="flex items-center gap-2">
                          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs py-1 px-2.5">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Application Submitted
                          </Badge>
                          <Button variant="outline" size="sm" asChild className="text-xs">
                            <Link href="/student/applications">View Application</Link>
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleOpenItem(internship, "details")}
                          className="text-xs"
                        >
                          View Details & Apply
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-5 pb-5 pt-0 space-y-3">
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {internship.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {internship.requiredSkills.map((sk: string) => (
                      <span
                        key={sk}
                        className="text-[10px] px-2 py-0.5 rounded bg-muted/40 border border-border text-foreground font-mono"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Application Deadline: {new Date(internship.deadline).toLocaleDateString()}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="text-xs h-7 px-2 gap-1 text-primary hover:text-primary"
                    >
                      <Link
                        href={`/student/resume-checker?jobId=${internship.id}&jobRole=${encodeURIComponent(
                          internship.roleTitle
                        )}&jobDesc=${encodeURIComponent(
                          `${internship.roleTitle} at ${internship.companyName}. Required skills: ${internship.requiredSkills.join(
                            ", "
                          )}. Responsibilities: ${internship.description}`
                        )}`}
                      >
                        <FileSearch className="w-3.5 h-3.5" />
                        Check Resume Against Job
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>

      {/* 5. Comprehensive Opportunity & Application Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/10">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-mono uppercase">
                    {"duration" in selectedItem ? "Internship" : (selectedItem as JobPosting).employmentType}
                  </Badge>
                  <span className="text-xs font-semibold text-foreground">
                    {selectedItem.companyName}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {selectedItem.roleTitle}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Steps */}
            <div className="grid grid-cols-3 border-b border-border text-center text-xs font-semibold">
              <button
                onClick={() => setModalStep("details")}
                className={`py-2.5 transition-colors border-b-2 ${
                  modalStep === "details"
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                1. Role Details & Match
              </button>
              <button
                onClick={() => setModalStep("readiness")}
                className={`py-2.5 transition-colors border-b-2 ${
                  modalStep === "readiness"
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                2. Application Readiness
              </button>
              <button
                onClick={() => readinessData?.isReady && setModalStep("review")}
                disabled={!readinessData?.isReady}
                className={`py-2.5 transition-colors border-b-2 ${
                  modalStep === "review"
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground disabled:opacity-40"
                }`}
              >
                3. Review & Submit
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-5 flex-1">
              {/* STEP 1: Job Details & "Your Match" */}
              {modalStep === "details" && (
                <div className="space-y-4">
                  {/* Key Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg border border-border bg-muted/20">
                      <span className="text-[10px] text-muted-foreground block font-mono">Location</span>
                      <span className="font-semibold text-foreground">{selectedItem.location}</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-border bg-muted/20">
                      <span className="text-[10px] text-muted-foreground block font-mono">Work Mode</span>
                      <span className="font-semibold text-foreground">{selectedItem.workMode}</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-border bg-muted/20">
                      <span className="text-[10px] text-muted-foreground block font-mono">Compensation</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                        {"duration" in selectedItem ? (selectedItem as InternshipPosting).stipendRange : (selectedItem as JobPosting).salaryRange}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-border bg-muted/20">
                      <span className="text-[10px] text-muted-foreground block font-mono">Deadline</span>
                      <span className="font-semibold text-foreground font-mono">
                        {new Date(selectedItem.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* "Your Match" Section */}
                  {readinessData && (
                    <div className="p-4 rounded-xl border border-border bg-muted/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-foreground block">
                            Your Match Assessment
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            Evaluated against your Skill Bridge profile and uploaded resume.
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs font-mono font-bold ${
                            readinessData.matching.recommendation === "Strong Match"
                              ? "border-emerald-500 text-emerald-600 bg-emerald-500/10"
                              : readinessData.matching.recommendation === "Reasonable Match"
                              ? "border-blue-500 text-blue-600 bg-blue-500/10"
                              : "border-amber-500 text-amber-600 bg-amber-500/10"
                          }`}
                        >
                          {readinessData.matching.matchPercentage}% &bull; {readinessData.matching.recommendation}
                        </Badge>
                      </div>

                      <Progress value={readinessData.matching.matchPercentage} className="h-1.5" />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                        <div className="space-y-1">
                          <span className="text-[11px] font-semibold text-foreground flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Your Strengths
                          </span>
                          {readinessData.matching.strengths.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {readinessData.matching.strengths.map((s) => (
                                <span key={s} className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono text-[10px]">
                                  {s} &check;
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[11px] text-muted-foreground italic">None identified yet.</p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <span className="text-[11px] font-semibold text-foreground flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            Your Gaps
                          </span>
                          {readinessData.matching.gaps.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {readinessData.matching.gaps.map((g) => (
                                <span key={g} className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 font-mono text-[10px]">
                                  {g} &bull; gap
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[11px] text-muted-foreground italic">No missing skill gaps!</p>
                          )}
                        </div>
                      </div>

                      <div className="pt-1 text-[11px] text-muted-foreground flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>This match recommendation is diagnostic. You remain in control and can apply regardless of score.</span>
                      </div>
                    </div>
                  )}

                  {/* Responsibilities & Qualifications */}
                  <div className="space-y-2 text-xs">
                    <span className="font-semibold text-foreground block">Role Responsibilities</span>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground leading-relaxed">
                      {selectedItem.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="font-semibold text-foreground block">Required Qualifications</span>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground leading-relaxed">
                      {selectedItem.requiredQualifications.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <span className="font-semibold text-foreground block">Company Information</span>
                    <p className="text-muted-foreground leading-relaxed">{selectedItem.companyInfo}</p>
                  </div>
                </div>
              )}

              {/* STEP 2: Application Readiness Gate */}
              {modalStep === "readiness" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-foreground">
                      Application Readiness Verification
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Before applying, our system inspects your profile, validated resume, and required documents.
                    </p>
                  </div>

                  {loadingReadiness ? (
                    <div className="p-8 text-center text-xs text-muted-foreground">
                      Checking application requirements...
                    </div>
                  ) : readinessData ? (
                    <div className="space-y-3">
                      {/* 1. Student Profile Checklist Item */}
                      <div className="p-3.5 rounded-lg border border-border bg-card flex items-start gap-3">
                        <div className="mt-0.5">
                          {readinessData.profile.isComplete ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-destructive" />
                          )}
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <span className="text-xs font-semibold text-foreground block">
                            Student Profile & Contact Details
                          </span>
                          <p className="text-[11px] text-muted-foreground">
                            {readinessData.profile.fullName} &bull; {readinessData.profile.email}
                          </p>
                        </div>
                      </div>

                      {/* 2. Resume Checklist Item */}
                      <div className="p-3.5 rounded-lg border border-border bg-card flex items-start gap-3">
                        <div className="mt-0.5">
                          {readinessData.resume.hasResume ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-destructive" />
                          )}
                        </div>
                        <div className="space-y-1 flex-1">
                          <span className="text-xs font-semibold text-foreground block">
                            ATS-Validated Resume (PDF Only)
                          </span>
                          {readinessData.resume.hasResume ? (
                            <div className="space-y-1">
                              <p className="text-[11px] text-muted-foreground">
                                Active file: <span className="font-mono text-foreground font-semibold">{readinessData.resume.fileName || "Resume.pdf"}</span>
                                {readinessData.resume.overallScore && ` • ATS Compatibility: ${readinessData.resume.overallScore}/100`}
                              </p>
                              <Button variant="ghost" size="sm" asChild className="text-[11px] h-6 px-2 text-primary">
                                <Link href="/student/resume-checker" target="_blank">
                                  Review in Resume Checker &rarr;
                                </Link>
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              <p className="text-[11px] text-destructive font-medium">
                                Resume required. You must upload and validate your PDF resume before applying.
                              </p>
                              <Button size="sm" asChild className="text-xs h-7">
                                <Link href="/student/resume-checker">
                                  Open Resume Checker
                                </Link>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 3. Required Documents Checklist Item */}
                      <div className="p-3.5 rounded-lg border border-border bg-card flex items-start gap-3">
                        <div className="mt-0.5">
                          {readinessData.documents.allPresent ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-destructive" />
                          )}
                        </div>
                        <div className="space-y-1 flex-1">
                          <span className="text-xs font-semibold text-foreground block">
                            Job Document Requirements
                          </span>
                          {readinessData.documents.allPresent ? (
                            <p className="text-[11px] text-muted-foreground">
                              All required documents ({readinessData.documents.requiredDocumentTypes.join(", ")}) verified.
                            </p>
                          ) : (
                            <div className="space-y-1.5">
                              <p className="text-[11px] text-destructive font-medium">
                                Required document missing: {readinessData.documents.missingDocumentTypes.join(", ")}
                              </p>
                              <Button size="sm" variant="outline" asChild className="text-xs h-7">
                                <Link href="/student/document-verification">
                                  Complete Document Submission
                                </Link>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Overall Readiness Status Banner */}
                      <div
                        className={`p-3.5 rounded-lg border text-xs leading-relaxed flex items-center gap-2.5 ${
                          readinessData.isReady
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-800 dark:text-amber-200"
                        }`}
                      >
                        {readinessData.isReady ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                            <span><strong>You are ready to apply!</strong> All requirements are satisfied. Proceed to review and confirm your application.</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                            <span><strong>Application Requirements Pending:</strong> Please complete the highlighted requirements above to enable submission.</span>
                          </>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {/* STEP 3: Review & Final Confirmation Form */}
              {modalStep === "review" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-foreground">
                      Review & Confirm Application
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Review your personal details and attached materials before final submission.
                    </p>
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-lg border border-destructive/20 bg-destructive/10 text-xs text-destructive flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Personal Info Edit */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-medium text-foreground">Full Name</label>
                      <Input
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-medium text-foreground">Email</label>
                      <Input
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-medium text-foreground">Phone Number</label>
                      <Input
                        placeholder="+91 98765 43210"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-medium text-foreground">Attached Resume</label>
                      <div className="p-2 rounded border border-border bg-muted/20 font-mono text-[11px] truncate">
                        {readinessData?.resume?.fileName || "Resume.pdf"} &bull; Verified
                      </div>
                    </div>
                  </div>

                  {/* Optional Cover Letter */}
                  <div className="space-y-1 text-xs">
                    <label className="font-medium text-foreground">Cover Note / Remarks (Optional)</label>
                    <Textarea
                      placeholder="Share relevant academic projects, technical interests, or why you are excited for this opportunity..."
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={3}
                      className="text-xs leading-relaxed"
                    />
                  </div>

                  {/* Final Review Summary Callout */}
                  <div className="p-3.5 rounded-lg border border-primary/20 bg-primary/5 space-y-1 text-xs">
                    <span className="font-bold text-foreground block">
                      Application Summary & Confirmation
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Applying for <strong>{selectedItem.roleTitle}</strong> at <strong>{selectedItem.companyName}</strong>. Your verified credentials and resume will be securely transmitted to the placement coordinator.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 4: Success Message */}
              {modalStep === "success" && (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-foreground">
                      Application Submitted Successfully!
                    </h4>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                      Your application for <strong>{selectedItem.roleTitle}</strong> at <strong>{selectedItem.companyName}</strong> has been created and logged in Application Tracking.
                    </p>
                  </div>
                  <div className="pt-3 flex items-center justify-center gap-2">
                    <Button size="sm" asChild className="text-xs gap-1.5">
                      <Link href="/student/applications">
                        Track Application
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCloseModal} className="text-xs">
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            {modalStep !== "success" && (
              <div className="p-4 border-t border-border bg-muted/10 flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCloseModal}
                  className="text-xs"
                >
                  Cancel
                </Button>

                <div className="flex items-center gap-2">
                  {modalStep === "details" && (
                    <>
                      {appliedJobIds.has(selectedItem.id) ? (
                        <Button size="sm" asChild className="text-xs">
                          <Link href="/student/applications">View Application</Link>
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => setModalStep("readiness")}
                          className="text-xs gap-1"
                        >
                          Check Application Readiness
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </>
                  )}

                  {modalStep === "readiness" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setModalStep("details")}
                        className="text-xs"
                      >
                        &larr; Back to Details
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setModalStep("review")}
                        disabled={!readinessData?.isReady}
                        className="text-xs gap-1"
                      >
                        Proceed to Review
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  )}

                  {modalStep === "review" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setModalStep("readiness")}
                        className="text-xs"
                      >
                        &larr; Back to Readiness
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleConfirmSubmit}
                        disabled={submittingApp || !applicantName.trim() || !applicantEmail.trim()}
                        className="text-xs gap-1"
                      >
                        {submittingApp ? "Submitting Application..." : "Submit Application"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
