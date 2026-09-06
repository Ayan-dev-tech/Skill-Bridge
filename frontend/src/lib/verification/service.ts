import { DOCUMENT_CATEGORIES } from "./types";

export class DocumentVerificationService {
  /**
   * Validates file format, category-specific rules, size limits, and magic bytes.
   */
  static validateFile(
    fileName: string,
    mimeType: string,
    fileSize: number,
    buffer: Buffer,
    categoryId: string
  ): { valid: boolean; error?: string } {
    const lowerName = fileName.toLowerCase();
    const isPdf = mimeType === "application/pdf" || lowerName.endsWith(".pdf");
    const isPng = mimeType === "image/png" || lowerName.endsWith(".png");
    const isJpg =
      mimeType === "image/jpeg" ||
      mimeType === "image/jpg" ||
      lowerName.endsWith(".jpg") ||
      lowerName.endsWith(".jpeg");

    // 1. Passport Sized Photo rule: Only PNG, JPG, JPEG <= 2 MB
    if (categoryId === "passport_photo") {
      if (isPdf) {
        return {
          valid: false,
          error: "Passport Sized Photo must be PNG, JPG or JPEG.",
        };
      }
      if (!isPng && !isJpg) {
        return {
          valid: false,
          error: "Passport Sized Photo must be PNG, JPG or JPEG.",
        };
      }
      if (fileSize > 2 * 1024 * 1024) {
        return {
          valid: false,
          error: "Images must be 2 MB or smaller.",
        };
      }
    } else {
      // General format validation
      if (!isPdf && !isPng && !isJpg) {
        return {
          valid: false,
          error: "Unsupported file type. Please upload PNG, JPG, JPEG or PDF.",
        };
      }

      // 2. Certifications rule: 5 MB per file for both images and PDFs
      if (
        categoryId === "academic_certifications" ||
        categoryId === "skill_certifications"
      ) {
        if (fileSize > 5 * 1024 * 1024) {
          return {
            valid: false,
            error: "Certification files must be 5 MB or smaller.",
          };
        }
      } else {
        // 3. Standard limits: Images <= 2 MB, PDFs <= 5 MB
        if (isPdf && fileSize > 5 * 1024 * 1024) {
          return {
            valid: false,
            error: "PDF files must be 5 MB or smaller.",
          };
        }
        if (!isPdf && fileSize > 2 * 1024 * 1024) {
          return {
            valid: false,
            error: "Images must be 2 MB or smaller.",
          };
        }
      }
    }

    // 4. Magic Bytes Inspection
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
        buffer.length < 8 ||
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
      if (
        buffer.length < 3 ||
        buffer[0] !== 0xff ||
        buffer[1] !== 0xd8 ||
        buffer[2] !== 0xff
      ) {
        return {
          valid: false,
          error: "Corrupt or invalid JPEG/JPG file header.",
        };
      }
    }

    return { valid: true };
  }

  /**
   * Helper to format bytes to human readable string (KB, MB).
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }

  /**
   * Validates standard HTTP/HTTPS profile URLs (e.g. LinkedIn, GitHub).
   */
  static validateProfileUrl(url: string, platform?: "linkedin" | "github"): boolean {
    if (!url || typeof url !== "string") return false;
    const trimmed = url.trim();
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return false;
      }
      if (platform === "linkedin") {
        return parsed.hostname.includes("linkedin.com");
      }
      if (platform === "github") {
        return parsed.hostname.includes("github.com");
      }
      return true;
    } catch {
      return false;
    }
  }
}
