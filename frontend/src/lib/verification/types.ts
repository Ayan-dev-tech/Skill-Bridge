/**
 * Skill Bridge — Document Verification & Onboarding Type Definitions
 * Configurable document schemas, OCR extracted structures, and biometric verification states.
 */

export type VerificationState =
  | "NOT_STARTED"
  | "DOCUMENTS_PENDING"
  | "DOCUMENT_PROCESSING"
  | "FACE_PENDING"
  | "FACE_PROCESSING"
  | "VERIFICATION_PROCESSING"
  | "VERIFIED"
  | "FAILED"
  | "RETRY_REQUIRED";

export interface ConfigurableDocumentType {
  id: string;
  name: string;
  category: "identity" | "academic";
  description: string;
  required: boolean;
  acceptedMimeTypes: string[];
  maxSizeImageBytes: number; // 2 MB
  maxSizePdfBytes: number;   // 5 MB
  iconName: "IdCard" | "GraduationCap" | "FileCheck" | "Shield";
  instruction: string;
}

export const CONFIGURABLE_DOCUMENT_TYPES: ConfigurableDocumentType[] = [
  {
    id: "student_id",
    name: "Student Identity Card",
    category: "identity",
    description: "Official institutional ID card showing student photo, roll number, and department.",
    required: true,
    acceptedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
    maxSizeImageBytes: 2 * 1024 * 1024,
    maxSizePdfBytes: 5 * 1024 * 1024,
    iconName: "IdCard",
    instruction: "Upload front of student ID with clearly visible roll number and institution seal.",
  },
  {
    id: "academic_transcript",
    name: "Academic Marksheet / Transcript",
    category: "academic",
    description: "Latest semester grade card, consolidated transcript, or board marksheet.",
    required: true,
    acceptedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
    maxSizeImageBytes: 2 * 1024 * 1024,
    maxSizePdfBytes: 5 * 1024 * 1024,
    iconName: "GraduationCap",
    instruction: "Digital PDF or clear photo of recent semester grade card/provisional marksheet.",
  },
  {
    id: "government_id",
    name: "Government Identification (Optional)",
    category: "identity",
    description: "Aadhaar card, Passport, Driver's License, or National Identity card for corporate drives.",
    required: false,
    acceptedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
    maxSizeImageBytes: 2 * 1024 * 1024,
    maxSizePdfBytes: 5 * 1024 * 1024,
    iconName: "Shield",
    instruction: "Optional government credential to fast-track employer background check.",
  },
];

export interface OcrExtractedData {
  rawText: string;
  name?: string;
  idNumber?: string;
  institution?: string;
  course?: string;
  semester?: string;
  validUntil?: string;
  detectedType?: string;
  confidence: number;
  wordCount: number;
  engine: string;
  isDocumentValid: boolean;
  qualityMetrics: {
    resolution?: string;
    aspectRatio?: number;
    format?: string;
    fileSizeBytes: number;
  };
}

export interface VerificationDocumentRecord {
  id: string;
  studentId: string;
  documentType: string;
  fileName: string;
  fileType: string;
  fileSizeBytes: number;
  storagePath: string;
  uploadedAt: string;
  ocrStatus: "pending" | "processing" | "completed" | "failed";
  ocrData?: OcrExtractedData;
  ocrError?: string;
}

export interface FaceCaptureRecord {
  id: string;
  studentId: string;
  storagePath: string;
  capturedAt: string;
  captureMode: "auto" | "manual";
  faceDetected: boolean;
  qualityPassed: boolean;
  confidence: number;
  checks: {
    resolutionOk: boolean;
    lightingOk: boolean;
    contrastOk: boolean;
    centered: boolean;
  };
}

export interface StudentVerificationRecord {
  studentId: string;
  verificationStatus: VerificationState;
  documents: VerificationDocumentRecord[];
  faceCapture?: FaceCaptureRecord;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface DocumentVerificationClientState {
  verificationStatus: VerificationState;
  documents: VerificationDocumentRecord[];
  faceCapture?: FaceCaptureRecord;
  isVerified: boolean;
  canProceedToInterestFinder: boolean;
}
