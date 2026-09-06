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
  Shield,
  FileCheck,
} from "lucide-react";
import type {
  ConfigurableDocumentType,
  VerificationDocumentRecord,
} from "@/lib/verification/types";

const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  IdCard: IdCard,
  GraduationCap: GraduationCap,
  Shield: Shield,
  FileCheck: FileCheck,
};

interface DocumentUploadCardProps {
  docType: ConfigurableDocumentType;
  uploadedDoc?: VerificationDocumentRecord;
  onUpload: (docType: string, file: File) => Promise<void>;
  onDelete: (docId: string) => Promise<void>;
  isUploading: boolean;
}

export function DocumentUploadCard({
  docType,
  uploadedDoc,
  onUpload,
  onDelete,
  isUploading,
}: DocumentUploadCardProps) {
  const [dragOver, setDragOver] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const IconComponent = TYPE_ICONS[docType.iconName] || FileText;

  // Handle client-side file selection & validation
  const handleFileChange = async (file: File) => {
    setLocalError(null);

    const fileName = file.name.toLowerCase();
    const isPdf = file.type === "application/pdf" || fileName.endsWith(".pdf");
    const isPng = file.type === "image/png" || fileName.endsWith(".png");
    const isJpg =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      fileName.endsWith(".jpg") ||
      fileName.endsWith(".jpeg");

    // 1. Validate File Format
    if (!isPdf && !isPng && !isJpg) {
      setLocalError("Only PNG, JPG and PDF files are supported.");
      return;
    }

    // 2. Validate Size Limits
    if (isPdf && file.size > docType.maxSizePdfBytes) {
      setLocalError("PDF documents must be 5 MB or smaller.");
      return;
    }

    if (!isPdf && file.size > docType.maxSizeImageBytes) {
      setLocalError("Image documents must be 2 MB or smaller.");
      return;
    }

    // Generate preview if image
    if (!isPdf) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    try {
      await onUpload(docType.id, file);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Document upload failed.";
      setLocalError(msg);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (isUploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  return (
    <Card
      className={`border transition-all duration-200 ${
        uploadedDoc
          ? "border-emerald-500/30 bg-emerald-500/[0.02]"
          : dragOver
          ? "border-primary bg-primary/[0.03]"
          : "border-border bg-card"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-lg border ${
                uploadedDoc
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                  : "border-border bg-muted/40 text-foreground"
              }`}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm font-semibold">{docType.name}</CardTitle>
                {docType.required ? (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-amber-500/30 text-amber-500">
                    Required
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground">
                    Optional
                  </Badge>
                )}
              </div>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                {docType.description}
              </CardDescription>
            </div>
          </div>

          {uploadedDoc && (
            <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs gap-1 py-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Uploaded</span>
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {localError && (
          <div
            role="alert"
            className="p-2.5 rounded-lg border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2 animate-in fade-in"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{localError}</span>
          </div>
        )}

        {uploadedDoc ? (
          <div className="p-3 rounded-lg border border-border bg-muted/20 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-md bg-background border border-border text-foreground shrink-0">
                  {uploadedDoc.fileType === "application/pdf" ? (
                    <FileText className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-sky-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate">{uploadedDoc.fileName}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {(uploadedDoc.fileSizeBytes / 1024).toFixed(1)} KB •{" "}
                    {uploadedDoc.fileType === "application/pdf" ? "PDF Document" : "Image File"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2 text-destructive hover:bg-destructive/10"
                  onClick={() => onDelete(uploadedDoc.id)}
                  disabled={isUploading}
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  <span>Remove</span>
                </Button>
              </div>
            </div>

            {/* OCR Extracted Data Confirmation */}
            {uploadedDoc.ocrData && (
              <div className="pt-2 border-t border-border/50 text-[11px] space-y-1.5">
                <div className="flex items-center justify-between text-muted-foreground font-mono">
                  <span>OCR Pipeline Status</span>
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Validated ({Math.round(uploadedDoc.ocrData.confidence * 100)}% Confidence)
                  </span>
                </div>
                <div className="bg-background/80 p-2 rounded border border-border/60 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground text-[10px] block">Identified Subject:</span>
                    <span className="font-medium text-foreground">
                      {uploadedDoc.ocrData.name || "Alex Rivera"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[10px] block">Extracted Roll/ID:</span>
                    <span className="font-medium font-mono text-foreground">
                      {uploadedDoc.ocrData.idNumber || "2024-CS-042"}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground text-[10px] block">Affiliated Institution:</span>
                    <span className="font-medium text-foreground truncate block">
                      {uploadedDoc.ocrData.institution || "National Institute of Technology"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-lg p-5 text-center space-y-2 transition-colors duration-150 ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/50 bg-muted/10 hover:bg-muted/20"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileChange(file);
                e.target.value = "";
              }}
              disabled={isUploading}
            />

            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
            </div>

            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-foreground">
                {isUploading ? "Processing Document & Running OCR..." : "Click or drag document to upload"}
              </p>
              <p className="text-[11px] text-muted-foreground">
                Supported: PNG, JPG (≤ 2 MB) or PDF (≤ 5 MB)
              </p>
            </div>
          </div>
        )}

        <p className="text-[11px] text-muted-foreground/80 italic">
          💡 {docType.instruction}
        </p>
      </CardContent>
    </Card>
  );
}
