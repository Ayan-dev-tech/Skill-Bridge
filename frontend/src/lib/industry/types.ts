/**
 * Skill Bridge — Industry Core Types & Interfaces
 * Models Industry Organization Profile, Dashboard Telemetry,
 * Authorized Student Talent Discovery, and Industry Question Bank.
 */

export interface IndustryProfileMetadata {
  companyName: string;
  industryDomain: string;
  description?: string;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  location?: string;
  logoUrl?: string;
  workTitle?: string;
  contactPerson?: string;
  demandedSkills?: string[];
  companySize?: string;
  foundedYear?: string;
  verificationStatus?: "verified" | "pending" | "under_review";
}

export interface IndustryProfile {
  userId: string;
  email: string;
  fullName: string;
  role: "industry";
  metadata: IndustryProfileMetadata;
  createdAt: string;
}

export interface IndustryDashboardSummary {
  organizationName: string;
  industryDomain: string;
  status: "verified" | "pending" | "under_review";
  metrics: {
    activeHiring: number;
    draftHiring: number;
    totalApplications: number;
    shortlistedCandidates: number;
    upcomingInterviews: number;
    questionBankCount: number;
  };
  recentActivity: Array<{
    id: string;
    type: "application" | "hiring_post" | "interview" | "shortlist";
    title: string;
    subtitle: string;
    timestamp: string;
    statusBadge?: string;
  }>;
}

export interface PermittedStudentTalent {
  id: string;
  fullName: string;
  department: string;
  course: string;
  semester: number;
  batchYear: string;
  institution: string;
  verifiedStatus: string;
  interestDomain?: string;
  specificInterest?: string;
  knowledgeLevel?: string | null;
  benchmarkScorePercent?: number | null;
  technicalSkills: string[];
  profiles: {
    linkedIn?: string;
    gitHub?: string;
    portfolio?: string;
  };
}

export interface StudentTalentFilterParams {
  search?: string;
  domain?: string;
  level?: string;
  page?: number;
  limit?: number;
}

export interface StudentTalentListResponse {
  students: PermittedStudentTalent[];
  totalCount: number;
  page: number;
  totalPages: number;
}

export interface IndustryQuestionOption {
  id: string;
  label: "A" | "B" | "C" | "D" | string;
  text: string;
}

export interface IndustryQuestionRecord {
  id: string;
  industryId: string;
  questionText: string;
  questionType: "mcq" | "multiple_choice" | "technical";
  options: IndustryQuestionOption[];
  correctOptionId: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  complexity: "fundamental" | "application" | "challenging";
  domainId: string;
  conceptTag: string;
  marks: number;
  explanation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIndustryQuestionInput {
  questionText: string;
  questionType?: "mcq" | "multiple_choice" | "technical";
  options: Array<{ id?: string; label?: string; text: string }>;
  correctOptionId: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  complexity?: "fundamental" | "application" | "challenging";
  domainId: string;
  conceptTag: string;
  marks?: number;
  explanation?: string;
}

// ============================================================================
// SECTION 2: HIRING & POST CONFIGURATION + KNOWLEDGE TEST CONFIG TYPES
// ============================================================================

export type HiringEmploymentType = "Full-time" | "Internship" | "Part-time" | "Contract";
export type HiringWorkMode = "Remote" | "Hybrid" | "On-site";
export type HiringPostStatus = "draft" | "published" | "frozen";

export interface InterviewDetailsConfig {
  mode: "Virtual" | "In-person" | "Hybrid";
  type: "Technical & Behavioral" | "Technical Only" | "Panel Interview" | "Discussion";
  estimatedRounds: number;
  instructions: string;
}

export interface KnowledgeTestQuestionItem {
  id: string; // Question ID from Question Bank
  questionText: string;
  questionType: "mcq" | "multiple_choice" | "technical";
  difficulty: "beginner" | "intermediate" | "advanced";
  domainId?: string;
  conceptTag?: string;
  marks: number;
  options: IndustryQuestionOption[];
  correctOptionId: string;
  explanation?: string;
}

export interface KnowledgeTestConfig {
  enabled: boolean;
  testTitle?: string;
  timeLimitMinutes?: number;
  totalMarks?: number;
  passingPercentage?: number;
  difficultyDistribution?: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  selectedQuestionIds: string[];
  testPaper: KnowledgeTestQuestionItem[];
  // AI review loop & Industry approval gate
  aiReviewStatus?: "not_started" | "in_progress" | "reviewed" | "needs_attention" | "failed";
  aiReviewFeedback?: {
    relevanceScore: number;
    difficultyConsistency: string;
    duplicateWarnings: string[];
    skillsCoverage: string[];
    suggestions: string[];
  };
  approvalStatus: "draft" | "ai_reviewed" | "awaiting_approval" | "approved" | "rejected";
  approvedAt?: string;
  publishedAt?: string;
}

export interface IndustryHiringPostRecord {
  id: string;
  industryId: string;
  companyName: string;
  roleTitle: string;
  hiringType: HiringEmploymentType;
  industryDomain: string;
  location: string;
  workMode: HiringWorkMode;
  salaryRange: string;
  experienceRequirement: string;
  openings: number;
  deadline: string; // ISO date
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  requiredQualifications: string[];
  preferredQualifications: string[];
  requiredDocumentTypes: string[];
  interviewDetails: InterviewDetailsConfig;
  knowledgeTest?: KnowledgeTestConfig;
  status: HiringPostStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CreateHiringPostInput {
  roleTitle: string;
  hiringType: HiringEmploymentType;
  industryDomain?: string;
  location: string;
  workMode: HiringWorkMode;
  salaryRange?: string;
  experienceRequirement?: string;
  openings: number;
  deadline?: string;
  description: string;
  responsibilities?: string[];
  requiredSkills?: string[];
  preferredSkills?: string[];
  requiredQualifications?: string[];
  preferredQualifications?: string[];
  requiredDocumentTypes?: string[];
  interviewDetails?: Partial<InterviewDetailsConfig>;
  knowledgeTest?: Partial<KnowledgeTestConfig>;
  status?: "draft" | "published";
}

export type UpdateHiringPostInput = Partial<CreateHiringPostInput>;

export interface AIQuestionSelectionRequest {
  requiredSkills: string[];
  domainId?: string;
  targetCount: number;
  difficulty?: "beginner" | "intermediate" | "advanced" | "balanced";
}

export interface AIQuestionSelectionResult {
  selectedQuestionIds: string[];
  questions: KnowledgeTestQuestionItem[];
  selectionRationale: string;
  matchedSkills: string[];
}

export interface AITestReviewResult {
  relevanceScore: number;
  difficultyConsistency: string;
  duplicateWarnings: string[];
  skillsCoverage: string[];
  suggestions: string[];
  isPassed?: boolean;
}

