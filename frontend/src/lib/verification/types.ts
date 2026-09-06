/**
 * Skill Bridge — Document Submission & Onboarding Type Definitions
 * Clean document categories, metadata structures, and submission states.
 * No OCR and no Live Photo / biometric verification.
 */

export type SubmissionStatus =
  | "NOT_STARTED"
  | "DOCUMENTS_PENDING"
  | "VERIFIED";

export type DocumentCategoryId =
  | "student_id"
  | "passport_photo"
  | "post_graduation_marksheet"
  | "academic_certifications"
  | "skill_certifications"
  | "abc_id"
  | "resume"
  | "social_profiles"
  | "competitive_exam";

export interface DocumentCategoryConfig {
  id: DocumentCategoryId;
  title: string;
  description: string;
  required: boolean;
  isGrouped: boolean;
  isProfileLinks?: boolean;
  acceptedFormats: string[];
  acceptedMimeTypes: string[];
  maxSizeImageBytes: number;
  maxSizePdfBytes: number;
  sizeLimitLabel: string;
  iconName: string;
}

export const DOCUMENT_CATEGORIES: DocumentCategoryConfig[] = [
  // 1. Student ID (Required, Single)
  {
    id: "student_id",
    title: "Student ID",
    description: "Upload your current college or university identification.",
    required: true,
    isGrouped: false,
    acceptedFormats: ["PNG", "JPG", "JPEG", "PDF"],
    acceptedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
    maxSizeImageBytes: 2 * 1024 * 1024,
    maxSizePdfBytes: 5 * 1024 * 1024,
    sizeLimitLabel: "Images ≤ 2 MB, PDF ≤ 5 MB",
    iconName: "IdCard",
  },
  // 2. Passport Sized Photo (Required, Single, Images Only)
  {
    id: "passport_photo",
    title: "Passport Sized Photo",
    description: "Upload a recent passport-size photograph.",
    required: true,
    isGrouped: false,
    acceptedFormats: ["PNG", "JPG", "JPEG"],
    acceptedMimeTypes: ["image/png", "image/jpeg", "image/jpg"],
    maxSizeImageBytes: 2 * 1024 * 1024,
    maxSizePdfBytes: 0,
    sizeLimitLabel: "PNG, JPG or JPEG ≤ 2 MB (PDF not accepted)",
    iconName: "User",
  },
  // 3. Post Graduation Marksheet (Required, Grouped)
  {
    id: "post_graduation_marksheet",
    title: "Post Graduation Marksheet",
    description: "Upload your semester marksheets. All semester files will be grouped together.",
    required: true,
    isGrouped: true,
    acceptedFormats: ["PNG", "JPG", "JPEG", "PDF"],
    acceptedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
    maxSizeImageBytes: 2 * 1024 * 1024,
    maxSizePdfBytes: 5 * 1024 * 1024,
    sizeLimitLabel: "Images ≤ 2 MB, PDF ≤ 5 MB per file",
    iconName: "GraduationCap",
  },
  // 4. Academic Certifications (Optional, Grouped, 5MB for images and PDFs)
  {
    id: "academic_certifications",
    title: "Academic Certifications",
    description: "Add academic certificates you have earned.",
    required: false,
    isGrouped: true,
    acceptedFormats: ["PNG", "JPG", "JPEG", "PDF"],
    acceptedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
    maxSizeImageBytes: 5 * 1024 * 1024, // 5 MB image limit for certifications
    maxSizePdfBytes: 5 * 1024 * 1024,
    sizeLimitLabel: "PNG, JPG, JPEG or PDF ≤ 5 MB per file",
    iconName: "Award",
  },
  // 5. Skill Certifications (Optional, Grouped, 5MB for images and PDFs)
  {
    id: "skill_certifications",
    title: "Skill Certifications",
    description: "Add certifications that demonstrate your technical or professional skills.",
    required: false,
    isGrouped: true,
    acceptedFormats: ["PNG", "JPG", "JPEG", "PDF"],
    acceptedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
    maxSizeImageBytes: 5 * 1024 * 1024, // 5 MB image limit for certifications
    maxSizePdfBytes: 5 * 1024 * 1024,
    sizeLimitLabel: "PNG, JPG, JPEG or PDF ≤ 5 MB per file",
    iconName: "CheckCircle2",
  },
  // 6. ABC ID (Required, Single)
  {
    id: "abc_id",
    title: "ABC ID",
    description: "Upload your Academic Bank of Credits identification document.",
    required: true,
    isGrouped: false,
    acceptedFormats: ["PNG", "JPG", "JPEG", "PDF"],
    acceptedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
    maxSizeImageBytes: 2 * 1024 * 1024,
    maxSizePdfBytes: 5 * 1024 * 1024,
    sizeLimitLabel: "Images ≤ 2 MB, PDF ≤ 5 MB",
    iconName: "FileCheck",
  },
  // 7. Resume (Optional, Single)
  {
    id: "resume",
    title: "Resume",
    description: "Upload your current resume if you have one.",
    required: false,
    isGrouped: false,
    acceptedFormats: ["PNG", "JPG", "JPEG", "PDF"],
    acceptedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
    maxSizeImageBytes: 2 * 1024 * 1024,
    maxSizePdfBytes: 5 * 1024 * 1024,
    sizeLimitLabel: "Images ≤ 2 MB, PDF ≤ 5 MB",
    iconName: "FileText",
  },
  // 8. Professional Profiles / LinkedIn (Optional, Profile Links)
  {
    id: "social_profiles",
    title: "Professional Profiles",
    description: "Add your LinkedIn profile and relevant professional social links.",
    required: false,
    isGrouped: false,
    isProfileLinks: true,
    acceptedFormats: [],
    acceptedMimeTypes: [],
    maxSizeImageBytes: 0,
    maxSizePdfBytes: 0,
    sizeLimitLabel: "LinkedIn (Recommended), GitHub, Portfolio",
    iconName: "Share2",
  },
  // 9. Competitive Exam Score (Optional, Grouped)
  {
    id: "competitive_exam",
    title: "Competitive Exam Score",
    description: "Add scorecards or result documents from competitive examinations.",
    required: false,
    isGrouped: true,
    acceptedFormats: ["PNG", "JPG", "JPEG", "PDF"],
    acceptedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
    maxSizeImageBytes: 2 * 1024 * 1024,
    maxSizePdfBytes: 5 * 1024 * 1024,
    sizeLimitLabel: "Images ≤ 2 MB, PDF ≤ 5 MB per file",
    iconName: "BarChart3",
  },
];

export interface VerificationDocumentRecord {
  id: string;
  studentId: string;
  documentType: string;
  groupId?: string;
  fileName: string;
  fileType: string;
  fileSizeBytes: number;
  storagePath: string;
  uploadedAt: string;
  uploadStatus?: "uploaded" | "completed";
}

export interface ProfessionalProfiles {
  linkedIn?: string;
  gitHub?: string;
  portfolio?: string;
  other?: string;
  updatedAt?: string;
}

export interface StudentVerificationRecord {
  studentId: string;
  verificationStatus: SubmissionStatus;
  documents: VerificationDocumentRecord[];
  professionalProfiles?: ProfessionalProfiles;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface DocumentSubmissionClientState {
  verificationStatus: SubmissionStatus;
  documents: VerificationDocumentRecord[];
  professionalProfiles?: ProfessionalProfiles;
  isCompleted: boolean;
  requiredCount: number;
  requiredTotal: number;
  optionalCount: number;
  optionalTotal: number;
  canProceedToInterestFinder: boolean;
}

// Backward-compatibility alias
export type ConfigurableDocumentType = DocumentCategoryConfig;
export const CONFIGURABLE_DOCUMENT_TYPES = DOCUMENT_CATEGORIES;
export type VerificationState = SubmissionStatus;
