"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/sonner";
import {
  Shield,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Loader2,
  Lock,
  ExternalLink,
  X,
  FileText,
  Clock,
  Check,
} from "lucide-react";
import { DocumentItemCard } from "./document-item-card";
import { ProfessionalProfilesCard } from "./professional-profiles-card";
import {
  DOCUMENT_CATEGORIES,
  type StudentVerificationRecord,
  type VerificationDocumentRecord,
} from "@/lib/verification/types";

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

// 6 Canonical Student Journey Stages for Compact Stepper
const JOURNEY_STEPS = [
  { step: "01", name: "Document Submission", route: "/student/document-verification" },
  { step: "02", name: "Interest Finder", route: "/student/interest-finder" },
  { step: "03", name: "Knowledge Testing", route: "/student/knowledge-testing" },
  { step: "04", name: "Skill Gap", route: "/student/skill-gap" },
  { step: "05", name: "Learning", route: "/student/learning" },
  { step: "06", name: "Opportunities", route: "/student/opportunities" },
];

export function DocumentVerificationContainer() {
  const router = useRouter();

  const [loading, setLoading] = React.useState(true);
  const [verification, setVerification] = React.useState<StudentVerificationRecord | null>(null);
  const [isFinalizing, setIsFinalizing] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successNotice, setSuccessNotice] = React.useState<string | null>(null);

  // Modals state
  const [previewDoc, setPreviewDoc] = React.useState<VerificationDocumentRecord | null>(null);
  const [deleteCandidate, setDeleteCandidate] = React.useState<VerificationDocumentRecord | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  // 1. Fetch initial verification state
  const fetchVerificationState = React.useCallback(async () => {
    try {
      setLoading(true);
      const sid = getAuthStudentId();
      const res = await fetch("/api/student/verification", {
        headers: sid ? { "x-student-id": sid } : {},
      });
      const data = await res.json();

      if (data.success) {
        setVerification(data.verification);
      }
    } catch (err) {
      console.error("Failed to load submission status:", err);
      setErrorMessage("Network error connecting to student submission service.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchVerificationState();
  }, [fetchVerificationState]);

  // 2. Upload Document Handler
  const handleUploadDocument = async (categoryId: string, file: File, replaceDocId?: string) => {
    setErrorMessage(null);
    setSuccessNotice(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", categoryId);
    if (replaceDocId) {
      formData.append("replaceDocumentId", replaceDocId);
    }

    const sid = getAuthStudentId();
    const res = await fetch("/api/student/verification/upload-document", {
      method: "POST",
      headers: sid ? { "x-student-id": sid } : {},
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setVerification(data.verification);
      toast.success(`${file.name} uploaded successfully.`);
      setSuccessNotice(`${file.name} uploaded successfully.`);
      setTimeout(() => setSuccessNotice(null), 3500);
    } else {
      toast.error(data.error || "Failed to upload document.");
      throw new Error(data.error || "Failed to upload document.");
    }
  };

  // 3. Confirm Delete Handler
  const handleConfirmDelete = async () => {
    if (!deleteCandidate) return;
    try {
      setIsDeleting(true);
      const sid = getAuthStudentId();
      const res = await fetch("/api/student/verification/delete-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(sid ? { "x-student-id": sid } : {}),
        },
        body: JSON.stringify({ documentId: deleteCandidate.id }),
      });
      const data = await res.json();
      if (data.success) {
        setVerification(data.verification);
        toast.success("Document removed successfully.");
        setSuccessNotice(`Document removed.`);
        setTimeout(() => setSuccessNotice(null), 3000);
      } else {
        toast.error(data.error || "Failed to delete document.");
        setErrorMessage(data.error || "Failed to delete document.");
      }
    } catch {
      toast.error("Error removing document.");
      setErrorMessage("Error removing document.");
    } finally {
      setIsDeleting(false);
      setDeleteCandidate(null);
    }
  };

  // 4. Save Professional Profiles Handler
  const handleSaveProfiles = async (profiles: {
    linkedIn?: string;
    gitHub?: string;
    portfolio?: string;
    other?: string;
  }) => {
    const sid = getAuthStudentId();
    const res = await fetch("/api/student/verification/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(sid ? { "x-student-id": sid } : {}),
      },
      body: JSON.stringify(profiles),
    });
    const data = await res.json();
    if (data.success) {
      setVerification(data.verification);
    } else {
      throw new Error(data.error || "Failed to save professional profiles.");
    }
  };

  // 5. Finalize Submission & Unlock Interest Finder
  const handleCompleteSubmission = async () => {
    setIsFinalizing(true);
    setErrorMessage(null);

    try {
      const sid = getAuthStudentId();
      const res = await fetch("/api/student/verification/complete", {
        method: "POST",
        headers: sid ? { "x-student-id": sid } : {},
      });

      const data = await res.json();
      if (data.success) {
        setVerification(data.verification);
        router.push(data.redirectUrl || "/student/interest-finder");
      } else {
        setErrorMessage(data.error || "Submission completion failed.");
      }
    } catch {
      setErrorMessage("Network error completing submission.");
    } finally {
      setIsFinalizing(false);
    }
  };

  // Calculations derived strictly from persisted state
  const uploadedDocs = verification?.documents || [];
  const requiredCategories = DOCUMENT_CATEGORIES.filter((c) => c.required);
  const optionalCategories = DOCUMENT_CATEGORIES.filter((c) => !c.required && !c.isProfileLinks);

  const uploadedCategoryIds = new Set(uploadedDocs.map((d) => d.documentType));
  const completedRequiredCategories = requiredCategories.filter((c) =>
    uploadedCategoryIds.has(c.id)
  );
  const missingRequiredCategories = requiredCategories.filter(
    (c) => !uploadedCategoryIds.has(c.id)
  );
  const completedRequiredCount = completedRequiredCategories.length;
  const isAllRequiredCompleted = completedRequiredCount === requiredCategories.length;
  const progressPercent = Math.round((completedRequiredCount / requiredCategories.length) * 100);

  const optionalDocsCount = optionalCategories.filter((c) =>
    uploadedCategoryIds.has(c.id)
  ).length;
  const hasProfiles = Boolean(
    verification?.professionalProfiles?.linkedIn ||
      verification?.professionalProfiles?.gitHub ||
      verification?.professionalProfiles?.portfolio ||
      verification?.professionalProfiles?.other
  );
  const optionalAddedCount = optionalDocsCount + (hasProfiles ? 1 : 0);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
        <Skeleton className="h-6 w-1/4 rounded-md" />
        <Skeleton className="h-10 w-1/2 rounded-md" />
        <Skeleton className="h-20 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background text-foreground pb-16 pt-1">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">

        {/* ================= 1. PAGE HEADER ================= */}
        <div className="space-y-1.5 pt-1">
          {/* Breadcrumb Context */}
          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted-foreground font-medium">
            <span>Student Portal</span>
            <span className="mx-1.5 text-muted-foreground/40">/</span>
            <span className="text-foreground font-semibold">Document Submission</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pt-1">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-foreground">
              Document Submission
            </h1>

            {/* Small Trust / Security Message */}
            <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-card border border-border/80 px-3 py-1 rounded-full shadow-2xs font-mono">
              <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Your documents are securely stored and encrypted.</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Complete your student profile by submitting the required documents. Once submitted, your profile will unlock the Interest Finder.
          </p>
        </div>

        {/* ================= 2. COMPACT HORIZONTAL STEPPER ================= */}
        <div
          aria-label="Student Journey Steps"
          className="bg-card border border-border/80 rounded-xl p-3 shadow-2xs"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {JOURNEY_STEPS.map((stepItem, idx) => {
              const isFirst = idx === 0;
              const isSecond = idx === 1;

              // Step 01: Document Submission
              // Step 02: Interest Finder (unlocked when all required are completed)
              // Step 03+: Locked upcoming
              const isCurrent = isFirst && !isAllRequiredCompleted;
              const isDone = isFirst && isAllRequiredCompleted;
              const isAvailable = isSecond && isAllRequiredCompleted;

              return (
                <div
                  key={stepItem.step}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-xs transition-colors ${
                    isCurrent
                      ? "bg-primary/10 border-primary/30 text-primary font-semibold shadow-2xs"
                      : isDone
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium"
                      : isAvailable
                      ? "bg-card border-primary/40 text-primary font-medium hover:bg-primary/5 cursor-pointer"
                      : "bg-muted/30 border-border/50 text-muted-foreground/40 select-none"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] shrink-0 font-bold ${
                      isDone
                        ? "bg-emerald-600 text-white"
                        : isCurrent
                        ? "bg-primary text-primary-foreground"
                        : isAvailable
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground/50"
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-3 h-3 text-white stroke-[2.5]" />
                    ) : (
                      stepItem.step
                    )}
                  </div>

                  <div className="min-w-0 flex-1 truncate">
                    <span className="truncate block leading-tight">{stepItem.name}</span>
                  </div>

                  {!isFirst && !isAvailable && (
                    <Lock className="w-3 h-3 text-muted-foreground/30 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Notices */}
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <div>
              <AlertTitle>Submission Alert</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </div>
          </Alert>
        )}

        {successNotice && (
          <Alert variant="success">
            <CheckCircle2 className="w-4 h-4" />
            <div>
              <AlertTitle>Verified Action</AlertTitle>
              <AlertDescription>{successNotice}</AlertDescription>
            </div>
          </Alert>
        )}

        {/* ================= 3. COMPACT PROGRESS BAR & CHIPS ================= */}
        <Card className="border border-border/80 bg-card shadow-xs rounded-xl overflow-hidden">
          <CardContent className="p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <p className="text-[11px] font-mono font-medium text-muted-foreground uppercase tracking-wider">
                  Required Documents
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-heading font-bold text-foreground">
                    {completedRequiredCount} of {requiredCategories.length} completed
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    ({progressPercent}%)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  Optional: <strong className="text-foreground">{optionalAddedCount} of 5 added</strong>
                </span>
                <Badge
                  variant={isAllRequiredCompleted ? "success" : "default"}
                  className="text-xs px-3 py-0.5 font-medium rounded-full"
                >
                  {isAllRequiredCompleted ? "All Required Submitted" : `${progressPercent}% Completed`}
                </Badge>
              </div>
            </div>

            {/* Smooth Progress Bar */}
            <Progress
              value={progressPercent}
              className="h-2 bg-muted rounded-full"
            />

            {/* Compact Checklist Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
              {requiredCategories.map((c) => {
                const isUploaded = uploadedCategoryIds.has(c.id);
                return (
                  <div
                    key={c.id}
                    className={`flex items-center gap-2 p-1.5 px-2.5 rounded-lg border text-xs ${
                      isUploaded
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium"
                        : "bg-muted/40 border-border/80 text-muted-foreground"
                    }`}
                  >
                    {isUploaded ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/40 shrink-0" />
                    )}
                    <span className="truncate">{c.title}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* ================= 4. REQUIRED DOCUMENTS (PRIMARY FOCUS) ================= */}
        <section aria-labelledby="required-docs-heading" className="space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h2
                  id="required-docs-heading"
                  className="text-base font-heading font-bold text-foreground tracking-tight"
                >
                  REQUIRED DOCUMENTS
                </h2>
                <Badge variant="destructive" className="text-[10px] uppercase font-bold tracking-wider rounded-full">
                  Mandatory
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                These documents are required to complete your student profile.
              </p>
            </div>

            <span className="text-xs font-semibold text-muted-foreground">
              {completedRequiredCount} of {requiredCategories.length} completed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requiredCategories.map((cat) => {
              const docsForCategory = uploadedDocs.filter((d) => d.documentType === cat.id);
              return (
                <DocumentItemCard
                  key={cat.id}
                  config={cat}
                  documents={docsForCategory}
                  onUpload={handleUploadDocument}
                  onDelete={(id) => handleConfirmDelete()}
                  onPreview={(doc) => setPreviewDoc(doc)}
                  onRequestDeleteConfirm={(doc) => setDeleteCandidate(doc)}
                />
              );
            })}
          </div>
        </section>

        {/* ================= 5. OPTIONAL DOCUMENTS ================= */}
        <section aria-labelledby="optional-docs-heading" className="space-y-3 pt-4">
          <div className="flex items-baseline justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h2
                  id="optional-docs-heading"
                  className="text-base font-bold text-foreground tracking-tight"
                >
                  OPTIONAL DOCUMENTS
                </h2>
                <Badge className="bg-muted text-muted-foreground border border-border text-[10px] uppercase font-medium">
                  Not Required to Continue
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Add these documents if applicable. They are not required to continue.
              </p>
            </div>

            <span className="text-xs font-semibold text-muted-foreground">
              {optionalAddedCount} of 5 added
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Academic Certifications (Grouped, 5MB limit) */}
            {optionalCategories
              .filter((c) => c.id === "academic_certifications" || c.id === "skill_certifications")
              .map((cat) => {
                const docsForCategory = uploadedDocs.filter((d) => d.documentType === cat.id);
                return (
                  <DocumentItemCard
                    key={cat.id}
                    config={cat}
                    documents={docsForCategory}
                    onUpload={handleUploadDocument}
                    onDelete={(id) => handleConfirmDelete()}
                    onPreview={(doc) => setPreviewDoc(doc)}
                    onRequestDeleteConfirm={(doc) => setDeleteCandidate(doc)}
                  />
                );
              })}

            {/* 2. Resume & Competitive Exam Score */}
            {optionalCategories
              .filter((c) => c.id === "resume" || c.id === "competitive_exam")
              .map((cat) => {
                const docsForCategory = uploadedDocs.filter((d) => d.documentType === cat.id);
                return (
                  <DocumentItemCard
                    key={cat.id}
                    config={cat}
                    documents={docsForCategory}
                    onUpload={handleUploadDocument}
                    onDelete={(id) => handleConfirmDelete()}
                    onPreview={(doc) => setPreviewDoc(doc)}
                    onRequestDeleteConfirm={(doc) => setDeleteCandidate(doc)}
                  />
                );
              })}

            {/* 3. Professional Profiles (LinkedIn Recommended, GitHub, Portfolio) */}
            <div className="md:col-span-2">
              <ProfessionalProfilesCard
                existingProfiles={verification?.professionalProfiles}
                onSave={handleSaveProfiles}
              />
            </div>
          </div>
        </section>

        {/* ================= 6. SUBMISSION SUMMARY & CTA ================= */}
        <Card
          className={`border transition-all duration-200 rounded-xl shadow-2xs ${
            isAllRequiredCompleted
              ? "border-emerald-500/40 bg-emerald-500/10"
              : "border-border bg-card"
          }`}
        >
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                {isAllRequiredCompleted ? (
                  <>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <h3 className="text-base font-bold text-foreground">
                        ✓ You&apos;re all set!
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Your required documents have been submitted. Optional documents can still be added or updated later.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                      <h3 className="text-sm font-bold text-foreground">
                        {missingRequiredCategories.length} required {missingRequiredCategories.length === 1 ? "document" : "documents"} remaining
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Missing:{" "}
                      <span className="font-semibold text-foreground">
                        {missingRequiredCategories.map((c) => c.title).join(", ")}
                      </span>
                      . Please complete all required documents to continue.
                    </p>
                  </>
                )}
              </div>

              {/* Primary Action Button */}
              <div className="w-full sm:w-auto shrink-0">
                {isAllRequiredCompleted ? (
                  <Button
                    type="button"
                    size="lg"
                    className="w-full sm:w-auto font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs"
                    onClick={handleCompleteSubmission}
                    disabled={isFinalizing}
                  >
                    {isFinalizing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Navigating to Interest Finder...
                      </>
                    ) : (
                      <>
                        Continue to Interest Finder
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="lg"
                    disabled
                    variant="outline"
                    className="w-full sm:w-auto text-xs font-medium border-border text-muted-foreground/60 bg-muted/30 cursor-not-allowed"
                  >
                    <Lock className="w-3.5 h-3.5 mr-2" />
                    Complete required documents to continue
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= MODALS ================= */}

      {/* 1. Document Preview Modal */}
      {previewDoc && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="bg-card text-card-foreground rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="min-w-0 pr-4">
                <p className="text-sm font-bold text-foreground truncate">
                  {previewDoc.fileName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {previewDoc.fileType} · Uploaded on {new Date(previewDoc.uploadedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`/api/student/verification/document/${previewDoc.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium px-2 py-1 rounded hover:bg-blue-500/10"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in New Tab</span>
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto flex-1 flex items-center justify-center bg-background/80 min-h-[300px]">
              {previewDoc.fileType === "application/pdf" ||
              previewDoc.fileName.toLowerCase().endsWith(".pdf") ? (
                <div className="w-full h-[65vh] flex flex-col items-center justify-center bg-card rounded-lg border border-border p-6 text-center">
                  <div className="w-16 h-16 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center mb-3">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">{previewDoc.fileName}</h4>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                    PDF document uploaded securely to your Skill Bridge profile.
                  </p>
                  <a
                    href={`/api/student/verification/document/${previewDoc.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Full PDF in Viewer</span>
                  </a>
                </div>
              ) : (
                <img
                  src={`/api/student/verification/document/${previewDoc.id}`}
                  alt={previewDoc.fileName}
                  className="max-h-[70vh] max-w-full rounded-lg object-contain border border-border shadow-sm bg-card"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Delete Confirmation Dialog */}
      <AlertDialog
        open={Boolean(deleteCandidate)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeleteCandidate(null);
        }}
      >
        {deleteCandidate && (
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-destructive/15 text-destructive flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <AlertDialogTitle>Remove this document?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove{" "}
                    <span className="font-semibold text-foreground">
                      {deleteCandidate.fileName}
                    </span>
                    ? This action cannot be undone.
                  </AlertDialogDescription>
                </div>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={isDeleting}
                onClick={() => setDeleteCandidate(null)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                    Removing...
                  </>
                ) : (
                  "Yes, Remove"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </div>
  );
}
