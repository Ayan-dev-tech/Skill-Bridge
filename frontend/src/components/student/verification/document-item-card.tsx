"use client";

import * as React from "react";
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
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Trash2,
  RefreshCw,
  Loader2,
  Eye,
  IdCard,
  GraduationCap,
  Award,
  User,
  FileCheck,
  BarChart3,
  Plus,
  Layers,
  X,
  ExternalLink,
} from "lucide-react";
import type {
  DocumentCategoryConfig,
  VerificationDocumentRecord,
} from "@/lib/verification/types";
import { DocumentVerificationService } from "@/lib/verification/service";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  IdCard,
  User,
  GraduationCap,
  Award,
  CheckCircle2,
  FileCheck,
  FileText,
  BarChart3,
};

interface DocumentItemCardProps {
  config: DocumentCategoryConfig;
  documents: VerificationDocumentRecord[];
  onUpload: (categoryId: string, file: File, replaceDocId?: string) => Promise<void>;
  onDelete: (docId: string) => Promise<void>;
  onPreview: (doc: VerificationDocumentRecord) => void;
  onRequestDeleteConfirm: (doc: VerificationDocumentRecord) => void;
}

export function DocumentItemCard({
  config,
  documents,
  onUpload,
  onDelete,
  onPreview,
  onRequestDeleteConfirm,
}: DocumentItemCardProps) {
  const [dragOver, setDragOver] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [replacingDocId, setReplacingDocId] = React.useState<string | null>(null);
  const [showViewAllModal, setShowViewAllModal] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const Icon = CATEGORY_ICONS[config.iconName] || FileText;
  const isCompleted = documents.length > 0;
  // Primary preview document is the most recent (last in array)
  const primaryDoc = documents.length > 0 ? documents[documents.length - 1] : null;

  // Handle client-side file selection & validation
  const handleFileSelected = async (file: File, replaceDocId?: string) => {
    setLocalError(null);

    const fileName = file.name.toLowerCase();
    const isPdf = file.type === "application/pdf" || fileName.endsWith(".pdf");
    const isPng = file.type === "image/png" || fileName.endsWith(".png");
    const isJpg =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      fileName.endsWith(".jpg") ||
      fileName.endsWith(".jpeg");

    // 1. Passport Photo validation: PNG/JPG/JPEG only <= 2 MB. PDF strictly prohibited.
    if (config.id === "passport_photo") {
      if (isPdf) {
        setLocalError("Passport photos must be PNG, JPG, or JPEG.");
        return;
      }
      if (!isPng && !isJpg) {
        setLocalError("Passport photos must be PNG, JPG, or JPEG.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setLocalError("Images must be 2 MB or smaller.");
        return;
      }
    } else {
      if (!isPdf && !isPng && !isJpg) {
        setLocalError("Unsupported file type. Please upload PNG, JPG, JPEG or PDF.");
        return;
      }

      // 2. Certifications 5 MB limit for ALL formats (images and PDFs)
      if (
        config.id === "academic_certifications" ||
        config.id === "skill_certifications"
      ) {
        if (file.size > 5 * 1024 * 1024) {
          setLocalError("Certification files must be 5 MB or smaller.");
          return;
        }
      } else {
        // 3. Standard limits
        if (isPdf && file.size > 5 * 1024 * 1024) {
          setLocalError("PDF files must be 5 MB or smaller.");
          return;
        }
        if (!isPdf && file.size > 2 * 1024 * 1024) {
          setLocalError("Images must be 2 MB or smaller.");
          return;
        }
      }
    }

    try {
      setIsUploading(true);
      await onUpload(config.id, file, replaceDocId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed.";
      setLocalError(msg);
    } finally {
      setIsUploading(false);
      setReplacingDocId(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (isUploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelected(file, replacingDocId || undefined);
    }
  };

  const triggerUpload = (replaceId?: string) => {
    setReplacingDocId(replaceId || null);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Card
        className={`border transition-all duration-200 bg-card text-card-foreground rounded-xl shadow-xs ${
          isCompleted
            ? "border-emerald-500/30"
            : "border-border hover:border-border/80"
        }`}
      >
        <CardHeader className="p-4 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  isCompleted
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-sm font-bold text-foreground tracking-tight">
                    {config.title}
                  </CardTitle>
                  {config.required ? (
                    <Badge
                      variant="outline"
                      className="text-[10px] font-bold tracking-wide uppercase px-1.5 py-0 bg-red-500/15 text-red-400 border-red-500/30"
                    >
                      Required
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-[10px] font-medium px-1.5 py-0 bg-muted text-muted-foreground border-border"
                    >
                      Optional
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-xs text-muted-foreground mt-0.5 leading-snug">
                  {config.description}
                </CardDescription>
              </div>
            </div>

            {/* Status Badge */}
            {isCompleted && (
              <Badge
                variant="outline"
                className="text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shrink-0 flex items-center gap-1 py-0.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {config.isGrouped
                    ? `${documents.length} ${documents.length === 1 ? "File" : "Files"}`
                    : "Uploaded"}
                </span>
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0 space-y-3">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={config.acceptedMimeTypes.join(",")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFileSelected(file, replacingDocId || undefined);
              }
            }}
          />

          {/* Error Notice */}
          {localError && (
            <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span className="flex-1">{localError}</span>
              <button
                onClick={() => setLocalError(null)}
                className="text-red-400 hover:text-red-300 text-xs font-bold px-1"
                aria-label="Dismiss error"
              >
                ×
              </button>
            </div>
          )}

          {/* ================= GROUPED DOCUMENT LAYOUT ================= */}
          {config.isGrouped && documents.length > 0 && primaryDoc && (
            <div className="space-y-3">
              {/* Primary Preview Card */}
              <div className="p-3 rounded-lg border border-border bg-muted/20 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {/* Visual Thumbnail */}
                <div className="w-14 h-14 rounded-md border border-border bg-card overflow-hidden shrink-0 flex items-center justify-center">
                  {primaryDoc.fileType === "application/pdf" ||
                  primaryDoc.fileName.toLowerCase().endsWith(".pdf") ? (
                    <div className="flex flex-col items-center justify-center text-center p-1">
                      <span className="text-[8px] font-black uppercase text-red-400 bg-red-500/15 px-1 rounded">
                        PDF
                      </span>
                      <FileText className="w-5 h-5 text-red-400 mt-0.5" />
                    </div>
                  ) : (
                    <img
                      src={`/api/student/verification/document/${primaryDoc.id}`}
                      alt={primaryDoc.fileName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  )}
                </div>

                {/* Primary File Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-foreground truncate" title={primaryDoc.fileName}>
                      {primaryDoc.fileName}
                    </p>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.2 rounded font-medium shrink-0">
                      Latest
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {DocumentVerificationService.formatFileSize(primaryDoc.fileSizeBytes)} ·{" "}
                    {primaryDoc.fileType.split("/")[1]?.toUpperCase() || "FILE"}
                  </p>
                </div>

                {/* Primary Actions */}
                <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs border-border text-foreground hover:bg-muted"
                    onClick={() => onPreview(primaryDoc)}
                    title="View Document"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    View
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs border-border text-foreground hover:bg-muted"
                    onClick={() => triggerUpload(primaryDoc.id)}
                    disabled={isUploading}
                    title="Replace Document"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1" />
                    Replace
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    onClick={() => onRequestDeleteConfirm(primaryDoc)}
                    disabled={isUploading}
                    title="Remove Document"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Strip (if multiple files) */}
              <div className="flex items-center justify-between gap-2 pt-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {documents.slice(0, 4).map((doc) => {
                    const isPdf =
                      doc.fileType === "application/pdf" ||
                      doc.fileName.toLowerCase().endsWith(".pdf");
                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => onPreview(doc)}
                        className="w-8 h-8 rounded border border-border bg-card overflow-hidden shrink-0 flex items-center justify-center hover:ring-2 hover:ring-blue-400 transition-all"
                        title={`${doc.fileName} - Click to preview`}
                      >
                        {isPdf ? (
                          <span className="text-[8px] font-black text-red-400">PDF</span>
                        ) : (
                          <img
                            src={`/api/student/verification/document/${doc.id}`}
                            alt={doc.fileName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        )}
                      </button>
                    );
                  })}

                  {/* +X more badge */}
                  {documents.length > 4 && (
                    <button
                      type="button"
                      onClick={() => setShowViewAllModal(true)}
                      className="px-2 h-8 rounded border border-border bg-muted text-[10px] font-bold text-muted-foreground hover:bg-muted/80 transition-colors"
                      title="View all uploaded documents"
                    >
                      +{documents.length - 4} more
                    </button>
                  )}

                  <span className="text-[11px] font-medium text-muted-foreground ml-1">
                    {documents.length} {documents.length === 1 ? "file" : "files"} uploaded
                  </span>
                </div>

                {/* Group Action Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs border-border text-foreground bg-card hover:bg-muted"
                    onClick={() => setShowViewAllModal(true)}
                  >
                    <Layers className="w-3.5 h-3.5 mr-1 text-muted-foreground" />
                    View All
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="h-7 text-xs font-semibold bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 border border-blue-500/30"
                    onClick={() => triggerUpload()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <Loader2 className="w-3 h-3 animate-spin mr-1" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 mr-1" />
                    )}
                    Add Another
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ================= SINGLE DOCUMENT LAYOUT ================= */}
          {!config.isGrouped && documents.length > 0 && primaryDoc && (
            <div className="p-3 rounded-lg border border-border bg-muted/20 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Visual Thumbnail */}
              <div
                className={`rounded-md border border-border bg-card overflow-hidden shrink-0 flex items-center justify-center ${
                  config.id === "passport_photo"
                    ? "w-14 h-18 sm:w-16 sm:h-20" // 3:4 passport aspect ratio
                    : "w-14 h-14 sm:w-16 sm:h-16"
                }`}
              >
                {primaryDoc.fileType === "application/pdf" ||
                primaryDoc.fileName.toLowerCase().endsWith(".pdf") ? (
                  <div className="flex flex-col items-center justify-center text-center p-1.5">
                    <span className="text-[9px] font-black uppercase text-red-400 bg-red-500/15 px-1 rounded">
                      PDF
                    </span>
                    <FileText className="w-6 h-6 text-red-400 mt-1" />
                  </div>
                ) : (
                  <img
                    src={`/api/student/verification/document/${primaryDoc.id}`}
                    alt={primaryDoc.fileName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                )}
              </div>

              {/* File Details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-foreground truncate" title={primaryDoc.fileName}>
                    {primaryDoc.fileName}
                  </p>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold shrink-0">
                    Uploaded
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {DocumentVerificationService.formatFileSize(primaryDoc.fileSizeBytes)} ·{" "}
                  {primaryDoc.fileType.split("/")[1]?.toUpperCase() || "FILE"}
                </p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                  Uploaded on {new Date(primaryDoc.uploadedAt).toLocaleDateString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs border-border text-foreground hover:bg-muted"
                  onClick={() => onPreview(primaryDoc)}
                >
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  View
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs border-border text-foreground hover:bg-muted"
                  onClick={() => triggerUpload(primaryDoc.id)}
                  disabled={isUploading}
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Replace
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300"
                  onClick={() => onRequestDeleteConfirm(primaryDoc)}
                  disabled={isUploading}
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          )}

          {/* ================= EMPTY UPLOAD DROPZONE ================= */}
          {documents.length === 0 && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-5 text-center transition-all duration-150 ${
                dragOver
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-border hover:border-border/80 bg-muted/10"
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-9 h-9 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-foreground">
                    {isUploading ? "Uploading file..." : "Drag and drop your file here"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {config.acceptedFormats.join(", ")} · {config.sizeLimitLabel}
                  </p>
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => triggerUpload()}
                  disabled={isUploading}
                  className="h-7 text-xs font-medium border-border bg-card text-foreground hover:bg-muted shadow-2xs mt-1"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin mr-1.5" />
                      Uploading...
                    </>
                  ) : (
                    "Browse Files"
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ================= "VIEW ALL" GROUPED DOCUMENTS MODAL ================= */}
      {showViewAllModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowViewAllModal(false)}
        >
          <div
            className="bg-card text-card-foreground rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/40">
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  {config.title} ({documents.length} {documents.length === 1 ? "file" : "files"})
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  All documents uploaded under this category.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowViewAllModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body: list of documents */}
            <div className="p-4 overflow-y-auto space-y-2.5 flex-1 max-h-[60vh]">
              {documents.map((doc) => {
                const isPdf =
                  doc.fileType === "application/pdf" ||
                  doc.fileName.toLowerCase().endsWith(".pdf");
                return (
                  <div
                    key={doc.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded border border-border bg-card overflow-hidden shrink-0 flex items-center justify-center">
                      {isPdf ? (
                        <div className="flex flex-col items-center justify-center text-center p-1">
                          <span className="text-[8px] font-black uppercase text-red-400 bg-red-500/15 px-1 rounded">
                            PDF
                          </span>
                          <FileText className="w-4 h-4 text-red-400 mt-0.5" />
                        </div>
                      ) : (
                        <img
                          src={`/api/student/verification/document/${doc.id}`}
                          alt={doc.fileName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-foreground truncate" title={doc.fileName}>
                        {doc.fileName}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {DocumentVerificationService.formatFileSize(doc.fileSizeBytes)} ·{" "}
                        {doc.fileType.split("/")[1]?.toUpperCase() || "FILE"} · Uploaded on{" "}
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs border-border text-foreground hover:bg-muted"
                        onClick={() => {
                          setShowViewAllModal(false);
                          onPreview(doc);
                        }}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs border-border text-foreground hover:bg-muted"
                        onClick={() => {
                          setShowViewAllModal(false);
                          triggerUpload(doc.id);
                        }}
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Replace
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        onClick={() => {
                          setShowViewAllModal(false);
                          onRequestDeleteConfirm(doc);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-3 bg-muted/30 border-t border-border flex items-center justify-between">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 text-xs border-border text-foreground bg-card hover:bg-muted"
                onClick={() => {
                  setShowViewAllModal(false);
                  triggerUpload();
                }}
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add Another File
              </Button>
              <Button
                type="button"
                size="sm"
                className="h-8 text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium"
                onClick={() => setShowViewAllModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
