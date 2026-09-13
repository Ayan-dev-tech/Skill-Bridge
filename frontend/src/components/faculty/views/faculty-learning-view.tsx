"use client";

import * as React from "react";
import {
  BookOpen,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  FileText,
  UserCheck,
  AlertCircle,
  Download,
  ExternalLink,
  Bot,
  Layers,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import type { FacultyLearningOverview } from "@/lib/faculty/types";
import type { PendingEvidenceItem } from "@/lib/evidence/faculty-evaluator";

export function FacultyLearningView() {
  const [data, setData] = React.useState<FacultyLearningOverview | null>(null);
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Step 10: Faculty Evidence Verification Queue State
  const [activeTab, setActiveTab] = React.useState<string>("evidence-queue");
  const [evidenceQueue, setEvidenceQueue] = React.useState<PendingEvidenceItem[]>([]);
  const [isQueueLoading, setIsQueueLoading] = React.useState(true);
  const [activeReviewItem, setActiveReviewItem] = React.useState<PendingEvidenceItem | null>(null);
  const [facultyRatingInput, setFacultyRatingInput] = React.useState<number>(3.5);
  const [facultyFeedbackInput, setFacultyFeedbackInput] = React.useState<string>("");
  const [isSubmittingReview, setIsSubmittingReview] = React.useState<boolean>(false);

  const fetchLearning = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/faculty/learning");
      if (!res.ok) throw new Error("Failed to load learning overview");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        throw new Error(json.error || "Failed to load learning data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error connecting to learning API");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchEvidenceQueue = React.useCallback(async () => {
    setIsQueueLoading(true);
    try {
      const res = await fetch("/api/faculty/evidence");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data?.queue) {
          setEvidenceQueue(json.data.queue);
        }
      }
    } catch (err) {
      console.warn("Could not load evidence queue:", err);
    } finally {
      setIsQueueLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchLearning();
    fetchEvidenceQueue();
  }, [fetchLearning, fetchEvidenceQueue]);

  const handleOpenReviewModal = (item: PendingEvidenceItem) => {
    setActiveReviewItem(item);
    setFacultyRatingInput(item.aiExpectedRating || item.targetLevel || 3.5);
    setFacultyFeedbackInput(
      item.extractionStatus === "SCAN_FAILED"
        ? "Physical evidence verified manually against AYUSH clinical trial documentation standards."
        : "Evidence satisfies protocol and clinical practice benchmarks for verified competency."
    );
  };

  const handleProcessVerification = async (decision: "VERIFIED" | "REJECTED") => {
    if (!activeReviewItem) return;

    try {
      setIsSubmittingReview(true);
      const res = await fetch("/api/faculty/evidence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: activeReviewItem.planId,
          facultyId: "fac-dr-anand-rao-aiia",
          decision,
          facultyFinalRating: decision === "VERIFIED" ? Number(facultyRatingInput) : undefined,
          facultyFeedback:
            facultyFeedbackInput.trim() ||
            (decision === "VERIFIED"
              ? "Competency verified per clinical trial protocol standards."
              : "Evidence submission does not meet clinical requirements. Please revise and resubmit."),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process verification.");
      }

      if (decision === "VERIFIED") {
        toast.success(`Verified! Competency approved with rating ${facultyRatingInput}/5.0`);
      } else {
        toast.info("Evidence marked as Rejected with feedback recorded.");
      }

      setActiveReviewItem(null);
      await fetchEvidenceQueue();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Verification submission failed.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const filteredList = (data?.studentProgressList || []).filter(
    (item) =>
      item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.rollNumber.toLowerCase().includes(search.toLowerCase())
  );

  const filteredQueue = evidenceQueue.filter(
    (item) =>
      item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.interventionTitle.toLowerCase().includes(search.toLowerCase()) ||
      item.competencyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Curriculum Mentoring & Evidence Verification
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Authoritative faculty oversight for curriculum engagement and measurable AYUSH competency evidence verification.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              fetchLearning();
              fetchEvidenceQueue();
            }}
            className="text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Pending Evidence</span>
          <div className="mt-2 text-2xl font-bold font-mono text-purple-600 dark:text-purple-400">
            {evidenceQueue.length}
          </div>
          <span className="text-[11px] text-muted-foreground">Awaiting Faculty Verification</span>
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Scholars Enrolled</span>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {data?.enrolledStudentsCount || 0}
          </div>
          <span className="text-[11px] text-muted-foreground">In Curated Learning Tracks</span>
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Average Progress</span>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-500">
            {data?.avgCompletionPercent || 0}%
          </div>
          <span className="text-[11px] text-muted-foreground">Across All Active Modules</span>
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Curriculum Modules</span>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {data?.curriculumModulesCount || 28}
          </div>
          <span className="text-[11px] text-muted-foreground">CCRAS & YCB Aligned Modules</span>
        </Card>
      </div>

      {/* Main Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <TabsList className="bg-muted/60">
            <TabsTrigger value="evidence-queue" className="text-xs gap-1.5 font-medium">
              <FileText className="w-3.5 h-3.5" />
              Evidence Verification Queue
              {evidenceQueue.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 bg-purple-600/15 text-purple-600 font-mono">
                  {evidenceQueue.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="scholar-progress" className="text-xs gap-1.5 font-medium">
              <Layers className="w-3.5 h-3.5" />
              Curriculum Tracking
            </TabsTrigger>
          </TabsList>

          <div className="w-full sm:w-64">
            <Input
              placeholder="Search scholar or milestone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs h-8"
            />
          </div>
        </div>

        {/* TAB 1: EVIDENCE VERIFICATION QUEUE (STEP 10) */}
        <TabsContent value="evidence-queue" className="space-y-4">
          <Card className="bg-card border-border overflow-hidden">
            <CardHeader className="py-3 px-4 border-b border-border">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-purple-600" />
                <span>Pending Evidence Submissions</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Review submitted clinical evidence, consult AI expected evaluations, and provide authoritative faculty sign-off.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {isQueueLoading ? (
                <div className="p-6 space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : filteredQueue.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                  <p className="font-semibold text-foreground">Queue is clear!</p>
                  <p>All student evidence submissions have been reviewed and verified.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-xs font-bold text-muted-foreground">Scholar</TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground">Intervention Milestone</TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground">Competency</TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground">Quality</TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground text-center">AI Expected Rating</TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground text-center">Maturity Goal</TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredQueue.map((item) => (
                        <TableRow key={item.planId} className="border-border hover:bg-muted/40 text-xs">
                          <TableCell>
                            <div className="font-semibold text-foreground">{item.studentName}</div>
                            <div className="text-[11px] text-muted-foreground">{item.studentEmail}</div>
                          </TableCell>
                          <TableCell className="max-w-[220px]">
                            <div className="font-medium text-foreground truncate">{item.interventionTitle}</div>
                            <Badge variant="outline" className="text-[9px] px-1 py-0 mt-0.5">
                              {item.interventionType}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground max-w-[160px] truncate">
                            {item.competencyName}
                          </TableCell>
                          <TableCell>
                            {item.evidenceQuality === "DIRECT_TEXT" && (
                              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[9px]">
                                Direct Text
                              </Badge>
                            )}
                            {item.evidenceQuality === "SCANNED_OCR" && (
                              <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/30 text-[9px]">
                                OCR Extracted
                              </Badge>
                            )}
                            {item.evidenceQuality === "SCAN_FAILED" && (
                              <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30 text-[9px]">
                                Manual Review
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.aiExpectedRating != null ? (
                              <div className="font-mono">
                                <span className="font-bold text-blue-600 dark:text-blue-400">
                                  {item.aiExpectedRating} / 5
                                </span>
                                <span className="text-[10px] text-muted-foreground block">
                                  ({item.aiConfidence || 85}% conf)
                                </span>
                              </div>
                            ) : (
                              <span className="text-[11px] text-amber-600 dark:text-amber-400 italic">
                                Scan unread (Manual)
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-center font-mono">
                            {item.baselineLevel} &rarr; {item.targetLevel}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              className="text-xs h-7 gap-1 bg-purple-600 hover:bg-purple-700 text-white font-medium"
                              onClick={() => handleOpenReviewModal(item)}
                            >
                              <UserCheck className="w-3 h-3" />
                              Review Evidence
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: CURRICULUM TRACKING */}
        <TabsContent value="scholar-progress" className="space-y-4">
          <Card className="bg-card border-border overflow-hidden">
            <CardHeader className="py-3 px-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-sm font-semibold">Scholar Learning Tracking</CardTitle>
                <CardDescription className="text-xs">
                  Live curriculum completion metrics for authorized department cohort
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : error ? (
                <div className="p-6 text-center text-xs text-destructive">{error}</div>
              ) : filteredList.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground">
                  No learning track records found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-xs font-bold text-muted-foreground">Roll No.</TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground">Scholar Name</TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground">Course</TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground text-center">Modules Completed</TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground">Completion Progress</TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredList.map((item) => (
                        <TableRow key={item.studentId} className="border-border hover:bg-muted/40 text-xs">
                          <TableCell className="font-mono font-medium">{item.rollNumber}</TableCell>
                          <TableCell className="font-semibold text-foreground">{item.studentName}</TableCell>
                          <TableCell className="text-muted-foreground">{item.course}</TableCell>
                          <TableCell className="text-center font-mono font-medium">
                            {item.modulesCompleted} / {item.totalModules}
                          </TableCell>
                          <TableCell className="min-w-[160px]">
                            <div className="flex items-center gap-2">
                              <Progress value={item.progressPercent} className="h-1.5 flex-1 bg-muted" />
                              <span className="text-[11px] font-mono text-muted-foreground w-9 text-right">
                                {item.progressPercent}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant={item.progressPercent === 100 ? "default" : "secondary"}
                              className="text-[10px]"
                            >
                              {item.progressPercent === 100 ? "Completed" : "In Progress"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* FACULTY VERIFICATION DIALOG MODAL */}
      {activeReviewItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-xl bg-card border-border shadow-xl my-8">
            <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-purple-600" />
                  <span>Authoritative Evidence Review</span>
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  {activeReviewItem.studentName} &bull; {activeReviewItem.interventionTitle}
                </CardDescription>
              </div>
              <button
                type="button"
                onClick={() => setActiveReviewItem(null)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold p-1"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5 text-xs">
              {/* Evidence Document Details & Direct Download Link */}
              <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-mono text-foreground truncate">
                    {activeReviewItem.evidenceFileName || "evidence_document.pdf"}
                  </span>
                </div>
                {activeReviewItem.signedEvidenceUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 gap-1 shrink-0"
                    asChild
                  >
                    <a href={activeReviewItem.signedEvidenceUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3" /> View PDF
                    </a>
                  </Button>
                )}
              </div>

              {/* Scan Failure Notice if unreadable */}
              {activeReviewItem.evidenceQuality === "SCAN_FAILED" && (
                <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-[11px] space-y-1 text-amber-800 dark:text-amber-300">
                  <span className="font-semibold text-amber-700 dark:text-amber-400 block flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Automatic Scan Unsuccessful:
                  </span>
                  <p className="text-muted-foreground text-[10px]">
                    This document could not be read automatically. Please inspect the PDF directly and assign your authoritative evaluation.
                  </p>
                </div>
              )}

              {/* AI Expected Rating Reference */}
              {activeReviewItem.aiExpectedRating != null && (
                <div className="p-2.5 rounded bg-blue-500/5 border border-blue-500/20 text-[11px] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <Bot className="w-3.5 h-3.5" /> AI Advisory Reference:
                    </span>
                    <span className="font-mono font-bold text-foreground">
                      {activeReviewItem.aiExpectedRating} / 5.0 ({activeReviewItem.aiConfidence || 85}% conf)
                    </span>
                  </div>
                  {activeReviewItem.aiFeedback && (
                    <p className="text-[10px] text-muted-foreground italic">
                      &ldquo;{activeReviewItem.aiFeedback}&rdquo;
                    </p>
                  )}
                  <span className="text-[9px] text-muted-foreground/80 block">
                    AI recommendation is advisory. Faculty decision is authoritative.
                  </span>
                </div>
              )}

              {/* Extracted Text Snippet (if available) */}
              {activeReviewItem.extractedText && (
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground">
                    Extracted Text Preview:
                  </label>
                  <div className="p-2 rounded bg-muted/30 border border-border text-[10px] text-muted-foreground max-h-24 overflow-y-auto leading-relaxed font-mono">
                    {activeReviewItem.extractedText}
                  </div>
                </div>
              )}

              {/* Rating Input */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-foreground">
                    Faculty Final Rating (1.0 to 5.0):
                  </label>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Baseline: {activeReviewItem.baselineLevel} &bull; Target: {activeReviewItem.targetLevel}
                  </span>
                </div>
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
              </div>

              {/* Feedback Textarea */}
              <div className="space-y-1.5 pt-1">
                <label className="font-semibold text-foreground">
                  Faculty Feedback / Audit Remarks:
                </label>
                <textarea
                  rows={3}
                  value={facultyFeedbackInput}
                  onChange={(e) => setFacultyFeedbackInput(e.target.value)}
                  placeholder="Enter specific clinical remarks, protocol notes, or revision directions..."
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
                onClick={() => setActiveReviewItem(null)}
                disabled={isSubmittingReview}
                className="text-xs h-9"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isSubmittingReview}
                onClick={() => handleProcessVerification("REJECTED")}
                className="text-xs h-9 gap-1.5 font-medium border-rose-500/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {isSubmittingReview ? "Processing..." : "Reject Evidence"}
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={isSubmittingReview}
                onClick={() => handleProcessVerification("VERIFIED")}
                className="text-xs h-9 gap-1.5 font-medium bg-purple-600 hover:bg-purple-700 text-white"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isSubmittingReview ? "Signing Off..." : "Verify & Approve"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
