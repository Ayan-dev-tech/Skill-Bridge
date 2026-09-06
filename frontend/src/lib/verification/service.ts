import type {
  OcrExtractedData,
  VerificationDocumentRecord,
  FaceCaptureRecord,
  CONFIGURABLE_DOCUMENT_TYPES,
} from "./types";

const PYTHON_OCR_URL = process.env.PYTHON_OCR_URL || "http://127.0.0.1:8000";

export class DocumentVerificationService {
  /**
   * Validates file size and magic bytes against accepted types.
   */
  static validateFile(
    fileName: string,
    mimeType: string,
    buffer: Buffer
  ): { valid: boolean; error?: string } {
    const lowerName = fileName.toLowerCase();
    const isPdf = mimeType === "application/pdf" || lowerName.endsWith(".pdf");
    const isPng = mimeType === "image/png" || lowerName.endsWith(".png");
    const isJpg =
      mimeType === "image/jpeg" ||
      mimeType === "image/jpg" ||
      lowerName.endsWith(".jpg") ||
      lowerName.endsWith(".jpeg");

    if (!isPdf && !isPng && !isJpg) {
      return {
        valid: false,
        error: "Only PNG, JPG and PDF files are supported.",
      };
    }

    const size = buffer.length;

    if (isPdf && size > 5 * 1024 * 1024) {
      return {
        valid: false,
        error: "PDF documents must be 5 MB or smaller.",
      };
    }

    if (!isPdf && size > 2 * 1024 * 1024) {
      return {
        valid: false,
        error: "Image documents must be 2 MB or smaller.",
      };
    }

    // Inspect Magic Bytes
    if (isPdf) {
      const header = buffer.subarray(0, 5).toString("ascii");
      if (!header.startsWith("%PDF-")) {
        return {
          valid: false,
          error: "Corrupt or invalid PDF file header.",
        };
      }
    } else if (isPng) {
      if (
        buffer[0] !== 0x89 ||
        buffer[1] !== 0x50 ||
        buffer[2] !== 0x4e ||
        buffer[3] !== 0x47
      ) {
        return {
          valid: false,
          error: "Corrupt or invalid PNG file header.",
        };
      }
    } else if (isJpg) {
      if (buffer[0] !== 0xff || buffer[1] !== 0xd8 || buffer[2] !== 0xff) {
        return {
          valid: false,
          error: "Corrupt or invalid JPEG/JPG file header.",
        };
      }
    }

    return { valid: true };
  }

  /**
   * Calls Python OCR Service to extract text & structured student credentials.
   */
  static async processOcr(
    buffer: Buffer,
    fileName: string,
    mimeType: string,
    documentType: string,
    studentId: string
  ): Promise<OcrExtractedData> {
    try {
      const formData = new FormData();
      const blob = new Blob([new Uint8Array(buffer)], { type: mimeType });
      formData.append("file", blob, fileName);
      formData.append("document_type", documentType);
      formData.append("student_id", studentId);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(`${PYTHON_OCR_URL}/api/ocr/process-document`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json.status === "success") {
          return {
            rawText: json.extracted_text || "",
            name: json.extracted_fields?.name || null,
            idNumber: json.extracted_fields?.id_number || null,
            institution: json.extracted_fields?.institution || null,
            course: json.extracted_fields?.course || null,
            semester: json.extracted_fields?.semester || null,
            validUntil: json.extracted_fields?.valid_until || null,
            detectedType: json.extracted_fields?.detected_type || documentType,
            confidence: json.confidence || 0.0,
            wordCount: json.word_count || 0,
            engine: json.engine || "python_ocr_engine",
            isDocumentValid: json.is_valid_document ?? false,
            qualityMetrics: {
              resolution: json.quality_metrics?.resolution,
              aspectRatio: json.quality_metrics?.aspect_ratio,
              format: json.quality_metrics?.format,
              fileSizeBytes: json.quality_metrics?.file_size_bytes || buffer.length,
            },
          };
        } else {
          throw new Error(
            json.error || "Document text extraction failed. Please ensure the document is clear and readable."
          );
        }
      } else {
        throw new Error("OCR processing is currently unavailable. Please try again.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("OCR processing is currently unavailable. Please try again.");
    }
  }

  /**
   * Calls Python Face Verification Service to validate captured live selfie photo.
   */
  static async verifyLiveFace(
    imageBase64: string,
    captureMode: "auto" | "manual",
    studentId: string
  ): Promise<{
    verified: boolean;
    confidence: number;
    message: string;
    checks: {
      resolutionOk: boolean;
      lightingOk: boolean;
      contrastOk: boolean;
      centered: boolean;
    };
  }> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const res = await fetch(`${PYTHON_OCR_URL}/api/verification/process-face`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          image_base64: imageBase64,
          capture_mode: captureMode,
          face_detected_client: true,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        return {
          verified: Boolean(json.quality_passed && json.face_detected),
          confidence: json.confidence || 0.0,
          message: json.message || (json.quality_passed ? "Face verified successfully." : "Face verification failed."),
          checks: {
            resolutionOk: Boolean(json.checks?.resolution_ok),
            lightingOk: Boolean(json.checks?.lighting_ok),
            contrastOk: Boolean(json.checks?.contrast_ok),
            centered: Boolean(json.checks?.centered),
          },
        };
      }

      return {
        verified: false,
        confidence: 0.0,
        message: "Face verification is currently unavailable. Please try again.",
        checks: {
          resolutionOk: false,
          lightingOk: false,
          contrastOk: false,
          centered: false,
        },
      };
    } catch {
      return {
        verified: false,
        confidence: 0.0,
        message: "Face verification is currently unavailable. Please try again.",
        checks: {
          resolutionOk: false,
          lightingOk: false,
          contrastOk: false,
          centered: false,
        },
      };
    }
  }
}
