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
  FileCheck,
  Shield,
  Camera,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Lock,
  Sparkles,
  IdCard,
  GraduationCap,
  RefreshCw,
} from "lucide-react";
import { DocumentUploadCard } from "./document-upload-card";
import { FaceCaptureCard } from "./face-capture-card";
import type {
  ConfigurableDocumentType,
  StudentVerificationRecord,
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

export function DocumentVerificationContainer() {
  const router = useRouter();

  const [loading, setLoading] = React.useState(true);
  const [verification, setVerification] = React.useState<StudentVerificationRecord | null>(null);
  const [documentTypes, setDocumentTypes] = React.useState<ConfigurableDocumentType[]>([]);
  const [activeStep, setActiveStep] = React.useState<1 | 2 | 3>(1);

  const [isUploading, setIsUploading] = React.useState(false);
  const [isProcessingFace, setIsProcessingFace] = React.useState(false);
  const [isFinalizing, setIsFinalizing] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successNotice, setSuccessNotice] = React.useState<string | null>(null);

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
        setDocumentTypes(data.documentTypes || []);

        if (data.isVerified) {
          setActiveStep(3);
        } else if (data.allRequiredUploaded && !data.faceCaptured) {
          setActiveStep(2);
        } else {
          setActiveStep(1);
        }
      }
    } catch (err) {
      console.error("Failed to load verification status:", err);
      setErrorMessage("Network error connecting to verification service.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchVerificationState();
  }, [fetchVerificationState]);

  // 2. Handle Document Upload
  const handleUploadDocument = async (docType: string, file: File) => {
    setIsUploading(true);
    setErrorMessage(null);
    setSuccessNotice(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentType", docType);

      const sid = getAuthStudentId();
      const res = await fetch("/api/student/verification/upload-document", {
        method: "POST",
        headers: sid ? { "x-student-id": sid } : {},
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setVerification(data.verification);
        setSuccessNotice(`${file.name} uploaded and parsed by OCR successfully.`);
      } else {
        throw new Error(data.error || "Failed to process document.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Document upload failed.";
      setErrorMessage(msg);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  // 3. Handle Document Deletion
  const handleDeleteDocument = async (docId: string) => {
    setIsUploading(true);
    setErrorMessage(null);
    try {
      const sid = getAuthStudentId();
      const res = await fetch("/api/student/verification/delete-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(sid ? { "x-student-id": sid } : {}),
        },
        body: JSON.stringify({ documentId: docId }),
      });
      const data = await res.json();
      if (data.success) {
        setVerification(data.verification);
      } else {
        setErrorMessage(data.error || "Failed to delete document.");
      }
    } catch {
      setErrorMessage("Error removing document.");
    } finally {
      setIsUploading(false);
    }
  };

  // 4. Handle Live Face Capture
  const handleCaptureComplete = async (imageBase64: string, mode: "auto" | "manual") => {
    setIsProcessingFace(true);
    setErrorMessage(null);
    setSuccessNotice(null);

    try {
      const sid = getAuthStudentId();
      const res = await fetch("/api/student/verification/capture-face", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(sid ? { "x-student-id": sid } : {}),
        },
        body: JSON.stringify({ imageBase64, captureMode: mode }),
      });

      const data = await res.json();
      if (data.success) {
        setVerification(data.verification);
        setSuccessNotice("Live face verified and recorded.");
      } else {
        throw new Error(data.error || "Face capture quality check failed.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Face capture verification failed.";
      setErrorMessage(msg);
      throw err;
    } finally {
      setIsProcessingFace(false);
    }
  };

  // 5. Finalize Complete Verification
  const handleFinalizeVerification = async () => {
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
        setActiveStep(3);
      } else {
        setErrorMessage(data.error || "Verification finalization failed.");
      }
    } catch {
      setErrorMessage("Network error completing verification.");
    } finally {
      setIsFinalizing(false);
    }
  };

  // Progress calculations
  const requiredTypes = documentTypes.filter((t) => t.required).map((t) => t.id);
  const uploadedTypes = new Set(verification?.documents.map((d) => d.documentType) || []);
  const allRequiredUploaded = requiredTypes.length > 0 && requiredTypes.every((t) => uploadedTypes.has(t));
  const faceCaptured = Boolean(verification?.faceCapture && verification.faceCapture.qualityPassed);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-6 animate-pulse">
        <div className="h-8 bg-muted/40 rounded w-1/3" />
        <div className="h-20 bg-muted/20 rounded-xl border border-border" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-64 bg-muted/20 rounded-xl border border-border" />
          <div className="h-64 bg-muted/20 rounded-xl border border-border" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* 1. Milestone Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-muted/30 text-xs text-muted-foreground font-medium">
          <FileCheck className="w-3.5 h-3.5 text-foreground" />
          <span>Milestone 1: Onboarding Document &amp; Identity Verification</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Verify Your Student Identity &amp; Academic Credentials
        </h1>

        <p className="text-xs md:text-sm text-muted-foreground max-w-3xl leading-relaxed">
          Skill Bridge connects accredited collegiate engineers directly with corporate placement drives.
          To ensure genuine eligibility, upload your student credentials and complete a live webcam capture.
        </p>
      </div>

      {/* 2. Three-Step Progress Indicator */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-2 text-xs">
            {/* Step 1 */}
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className={`flex items-center gap-2.5 p-2 rounded-lg text-left transition-colors ${
                activeStep === 1
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : allRequiredUploaded
                  ? "text-emerald-500 hover:bg-muted/40"
                  : "text-muted-foreground hover:bg-muted/40"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs shrink-0 ${
                  allRequiredUploaded
                    ? "bg-emerald-500 text-white"
                    : activeStep === 1
                    ? "bg-primary text-primary-foreground font-bold"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {allRequiredUploaded ? <CheckCircle2 className="w-4 h-4" /> : "1"}
              </div>
              <div className="hidden sm:block min-w-0">
                <p className="font-semibold truncate">Document Upload</p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {allRequiredUploaded ? "Required Files Added" : "Student ID & Marksheet"}
                </p>
              </div>
            </button>

            {/* Step 2 */}
            <button
              type="button"
              onClick={() => allRequiredUploaded && setActiveStep(2)}
              disabled={!allRequiredUploaded}
              className={`flex items-center gap-2.5 p-2 rounded-lg text-left transition-colors ${
                activeStep === 2
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : faceCaptured
                  ? "text-emerald-500 hover:bg-muted/40"
                  : !allRequiredUploaded
                  ? "opacity-50 cursor-not-allowed text-muted-foreground"
                  : "text-muted-foreground hover:bg-muted/40"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs shrink-0 ${
                  faceCaptured
                    ? "bg-emerald-500 text-white"
                    : activeStep === 2
                    ? "bg-primary text-primary-foreground font-bold"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {faceCaptured ? <CheckCircle2 className="w-4 h-4" /> : "2"}
              </div>
              <div className="hidden sm:block min-w-0">
                <p className="font-semibold truncate">Live Face Capture</p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {faceCaptured ? "Biometric Verified" : "15s Camera Capture"}
                </p>
              </div>
            </button>

            {/* Step 3 */}
            <button
              type="button"
              disabled={!verification?.verificationStatus || verification.verificationStatus !== "VERIFIED"}
              className={`flex items-center gap-2.5 p-2 rounded-lg text-left transition-colors ${
                activeStep === 3
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                  : "opacity-50 cursor-not-allowed text-muted-foreground"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs shrink-0 ${
                  activeStep === 3
                    ? "bg-emerald-500 text-white font-bold"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {activeStep === 3 ? <CheckCircle2 className="w-4 h-4" /> : "3"}
              </div>
              <div className="hidden sm:block min-w-0">
                <p className="font-semibold truncate">Identity Confirmed</p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {activeStep === 3 ? "Unlocked for Career Paths" : "Pending Completion"}
                </p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Global Alerts */}
      {errorMessage && (
        <div
          role="alert"
          className="p-3.5 rounded-lg border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2.5 animate-in fade-in"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successNotice && (
        <div
          role="status"
          className="p-3.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-xs flex items-center gap-2.5 animate-in fade-in"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 1: DOCUMENT UPLOADS                                  */}
      {/* ========================================================= */}
      {activeStep === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentTypes.map((typeConfig) => {
              const uploaded = verification?.documents.find(
                (d) => d.documentType === typeConfig.id
              );
              return (
                <DocumentUploadCard
                  key={typeConfig.id}
                  docType={typeConfig}
                  uploadedDoc={uploaded}
                  onUpload={handleUploadDocument}
                  onDelete={handleDeleteDocument}
                  isUploading={isUploading}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-muted-foreground">
              {allRequiredUploaded
                ? "All required documents uploaded. Proceed to Face Capture."
                : "Please upload your Student ID Card and Academic Marksheet to continue."}
            </p>

            <Button
              type="button"
              onClick={() => setActiveStep(2)}
              disabled={!allRequiredUploaded || isUploading}
              className="text-xs font-semibold gap-1.5"
            >
              <span>Continue to Face Capture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 2: LIVE FACE CAPTURE                                 */}
      {/* ========================================================= */}
      {activeStep === 2 && (
        <div className="space-y-4">
          <FaceCaptureCard
            existingCapture={verification?.faceCapture}
            onCaptureComplete={handleCaptureComplete}
            isProcessing={isProcessingFace}
          />

          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setActiveStep(1)}
              className="text-xs gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Documents</span>
            </Button>

            <Button
              type="button"
              onClick={handleFinalizeVerification}
              disabled={!faceCaptured || isFinalizing}
              className="text-xs font-semibold gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isFinalizing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Finalizing Verification...</span>
                </>
              ) : (
                <>
                  <span>Complete Verification &amp; Proceed</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 3: VERIFICATION COMPLETED (SUCCESS STATE)            */}
      {/* ========================================================= */}
      {activeStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <Card className="border-emerald-500/40 bg-emerald-500/[0.03] shadow-sm">
            <CardHeader className="text-center pb-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground">
                Verification Completed Successfully
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground max-w-md mx-auto">
                Your academic identity credentials have been authenticated via the Skill Bridge
                Python OCR and live biometric validation pipeline.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-border bg-background/80 text-center space-y-1">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase block">
                    Institutional ID
                  </span>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs">
                    Verified
                  </Badge>
                  <p className="text-[11px] text-muted-foreground">Roll: 2024-CS-042</p>
                </div>

                <div className="p-3 rounded-lg border border-border bg-background/80 text-center space-y-1">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase block">
                    Academic Marksheet
                  </span>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs">
                    OCR Parsed
                  </Badge>
                  <p className="text-[11px] text-muted-foreground">Valid Transcript</p>
                </div>

                <div className="p-3 rounded-lg border border-border bg-background/80 text-center space-y-1">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase block">
                    Live Biometric
                  </span>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs">
                    Matched
                  </Badge>
                  <p className="text-[11px] text-muted-foreground">Optimal Clarity</p>
                </div>
              </div>

              <div className="bg-muted/20 p-4 rounded-lg border border-border/80 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Next Stage: Adaptive Interest Discovery
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Interest Finder is now unlocked. Discover your specialized technical niche across 5 domains.
                  </p>
                </div>

                <Button asChild className="text-xs font-semibold shrink-0 gap-1.5">
                  <Link href="/student/interest-finder">
                    <span>Continue to Interest Finder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 6. Footer Privacy & Institutional Security Note */}
      <footer className="pt-6 border-t border-border/60 text-center space-y-1">
        <p className="text-xs text-muted-foreground font-medium flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>Encrypted Institutional Verification Engine</span>
        </p>
        <p className="text-[11px] text-muted-foreground/80 max-w-lg mx-auto">
          Uploaded documents are stored in private Supabase Storage buckets with Row-Level Security.
          Camera stream is only used during verification and terminates immediately upon capture.
        </p>
      </footer>
    </div>
  );
}
