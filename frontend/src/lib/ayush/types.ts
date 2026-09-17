/**
 * Skill-Bridge — AYUSH Foundation Types
 * Data models for:
 *   - AYUSH Skill Taxonomy
 *   - AYUSH Skill Passport (student profile extension)
 *   - Industry Skill Demand
 *   - Verified Internship extension
 *   - R&D Problem Statement
 *   - Innovation / IP
 *   - Ministry Intelligence aggregation
 */

import type { AyushSystemId, AyushSkillCategory, AyushAcademicLevel } from "./domains";

// ============================================================================
// 3. AYUSH SKILL TAXONOMY
// ============================================================================

export interface AyushSkillDefinition {
  skillId: string;
  skillName: string;
  category: AyushSkillCategory;
  /** Which AYUSH systems this skill applies to. Empty = all systems. */
  applicableSystems: AyushSystemId[];
  description: string;
  /** Maps to existing TargetSkillRequirement.relatedConceptTags */
  relatedConceptTags: string[];
}

/** Extensible catalog. Add new skills here; do not scatter string literals. */
export const AYUSH_SKILL_CATALOG: AyushSkillDefinition[] = [
  // Clinical Knowledge
  {
    skillId: "ayush-clinical-principles",
    skillName: "AYUSH Clinical Principles",
    category: "Clinical Knowledge",
    applicableSystems: [],
    description: "Foundational clinical theories and conceptual frameworks across AYUSH systems.",
    relatedConceptTags: ["tridosha", "pancha-mahabhuta", "vital-force", "humoral-theory"],
  },
  // Diagnostics
  {
    skillId: "ayush-diagnosis",
    skillName: "AYUSH Diagnostic Methods",
    category: "Diagnostics",
    applicableSystems: [],
    description: "Pulse diagnosis (Nadi Pariksha), tongue examination, iris analysis, and system-specific diagnostic tools.",
    relatedConceptTags: ["nadi-pariksha", "tongue-diagnosis", "symptomatology"],
  },
  // AYUSH Core Practice
  {
    skillId: "ayush-formulations",
    skillName: "Classical Formulations & Pharmacopoeia",
    category: "AYUSH Core Practice",
    applicableSystems: [],
    description: "Knowledge of classical preparations, pharmacopoeial standards, and GMP compliance.",
    relatedConceptTags: ["pharmacopoeia", "gmp", "classical-formulations"],
  },
  // Research Methodology
  {
    skillId: "ayush-research-methodology",
    skillName: "AYUSH Research Methodology",
    category: "Research Methodology",
    applicableSystems: [],
    description: "Clinical trial design adapted to AYUSH, observational studies, and evidence synthesis.",
    relatedConceptTags: ["rct-design", "evidence-synthesis", "placebo-control"],
  },
  // Pharmacovigilance
  {
    skillId: "ayush-pharmacovigilance",
    skillName: "Pharmacovigilance & Safety Monitoring",
    category: "Pharmacovigilance",
    applicableSystems: [],
    description: "Adverse drug reaction reporting, post-market safety surveillance, and PVPI guidelines.",
    relatedConceptTags: ["adr-reporting", "pvpi", "causality-assessment"],
  },
  // Herb-Drug Interaction Awareness
  {
    skillId: "herb-drug-interaction",
    skillName: "Herb-Drug Interaction Awareness",
    category: "Herb-Drug Interaction Awareness",
    applicableSystems: [],
    description: "Understanding pharmacokinetic and pharmacodynamic interactions between herbal preparations and allopathic drugs.",
    relatedConceptTags: ["cyp-enzyme-inhibition", "bioavailability", "contraindication"],
  },
  // EHR/ABDM Awareness
  {
    skillId: "abdm-digital-health",
    skillName: "ABDM & Digital Health Literacy",
    category: "EHR/ABDM Awareness",
    applicableSystems: [],
    description: "Ayushman Bharat Digital Mission workflows, ABHA ID, health records API, and digital prescription standards.",
    relatedConceptTags: ["abha-id", "fhir-r4", "health-data-standards"],
  },
  // Regulatory Awareness
  {
    skillId: "ayush-regulatory",
    skillName: "AYUSH Regulatory Framework",
    category: "Regulatory Awareness",
    applicableSystems: [],
    description: "Ministry of AYUSH policies, CCIM/CCH standards, drug licensing, and export regulations.",
    relatedConceptTags: ["ccim-regulations", "drug-licensing", "export-compliance"],
  },
  // Scientific Validation
  {
    skillId: "ayush-scientific-validation",
    skillName: "Scientific Validation of AYUSH Practices",
    category: "Scientific Validation",
    applicableSystems: [],
    description: "Applying modern scientific methods to validate traditional AYUSH practices and formulations.",
    relatedConceptTags: ["biomarker-validation", "in-vitro-studies", "phytochemistry"],
  },
  // Entrepreneurship
  {
    skillId: "ayush-entrepreneurship",
    skillName: "AYUSH Entrepreneurship & Startup Ecosystem",
    category: "Entrepreneurship",
    applicableSystems: [],
    description: "Business development, startup funding pathways, and commercialisation of AYUSH-based products.",
    relatedConceptTags: ["startup-india", "ip-commercialisation", "wellness-market"],
  },
];

// ============================================================================
// 4. AYUSH SKILL PASSPORT (Student Profile Extension)
// ============================================================================

export interface AyushSkillPassport {
  studentId: string;
  /** AYUSH system the student is enrolled in */
  ayushSystem: AyushSystemId;
  course: string;
  academicLevel: AyushAcademicLevel;
  institution: string;
  batchYear: string;
  /** Assessed skill proficiencies — keyed by skillId */
  skills: Record<string, AyushSkillProficiency>;
  /** Key clinical/research competencies demonstrated */
  competencies: AyushCompetency[];
  /** Results from knowledge assessments */
  assessmentResults: AyushAssessmentResult[];
  /** Identified skill gaps from the gap engine */
  skillGaps: AyushPassportSkillGap[];
  /** Certifications earned */
  certifications: AyushCertification[];
  /** Verified internship references */
  internshipIds: string[];
  /** Verified experience notes */
  verifiedExperiences: AyushVerifiedExperience[];
  /** Student's self-declared research interests */
  researchInterests: string[];
  /** Computed readiness score (0-100) for industry/placement */
  industryReadinessScore: number | null;
  /** Qualitative readiness band */
  industryReadinessBand: AyushReadinessLevel | "Not Assessed" | "Developing" | "Emerging" | "Industry Ready" | null;
  createdAt: string;
  updatedAt: string;
}

export interface AyushSkillProficiency {
  skillId: string;
  skillName: string;
  category: AyushSkillCategory;
  proficiencyLevel: "Not Assessed" | "Beginner" | "Developing" | "Competent" | "Proficient" | "Expert";
  evidenceSource: "self_declared" | "assessed" | "certified" | "verified_experience";
  lastAssessedAt: string | null;
}

export type CompetencyMaturityLevel = "Foundation" | "Applied" | "Advanced";

export function getMaturityFromLevel(level: number): CompetencyMaturityLevel {
  if (level <= 2) return "Foundation";
  if (level === 3) return "Applied";
  return "Advanced";
}

export interface AyushCompetency {
  id: string;
  name: string;
  title: string;
  category: string;
  domain: string;
  targetLevel: number; // 1 to 5
  maturityLevel?: CompetencyMaturityLevel;
  description: string;
  demonstratedAt: string | null;
  verifiedBy: string | null;
}

export interface AyushRoleCompetencyMapping {
  competencyId: string;
  targetLevel: number;
  maturityLevel?: CompetencyMaturityLevel;
  importance: "essential" | "preferred";
  isCritical?: boolean;
  weight?: number; // 0.0 - 1.0 (normalized relative weight)
}

export interface AyushTargetRole {
  id: string;
  name: string;
  ayushSystem: AyushSystemId | string;
  category: string;
  description: string;
  targetMaturity?: CompetencyMaturityLevel;
  competencies: AyushRoleCompetencyMapping[];
}

// ============================================================================
// ROLE READINESS ENGINE TYPES (Step 11 & Step 12 Alignment)
// ============================================================================

export type AyushReadinessLevel = "NOT READY" | "DEVELOPING" | "NEAR READY" | "READY";

export interface CompetencyReadinessContribution {
  roleId: string;
  competencyId: string;
  competencyName: string;
  category: string;
  verifiedRating: number; // Faculty-verified rating (0.0 - 5.0)
  targetRating: number;   // Target level for role (1.0 - 5.0)
  normalizedAttainment: number; // 0.0 - 1.0 (verifiedRating / targetRating)
  weight: number;         // 0.0 - 1.0
  readinessContribution: number; // normalizedAttainment * weight * 100
  gap: number;            // max(0, targetRating - verifiedRating)
  isCritical: boolean;
  criticalBlocked: boolean; // isCritical && verifiedRating < (targetRating - 0.5)
  reason?: string;
}

export interface LatestVerifiedImprovement {
  competencyId: string;
  competencyName: string;
  previousRating: number;
  facultyFinalRating: number;
  improvementDelta: number;
  verifiedAt: string;
}

export interface RecommendedInterventionAction {
  interventionId: string;
  title: string;
  type: string;
  competencyId: string;
  competencyName: string;
  gap: number;
  isCritical: boolean;
  estimatedDuration: string;
}

export interface AyushRoleReadiness {
  roleId: string;
  roleName: string;
  ayushSystem: string;
  overallScore: number; // 0 - 100%
  readinessLevel: AyushReadinessLevel;
  isCriticalBlocked: boolean;
  blockingCompetencies: {
    competencyId: string;
    competencyName: string;
    verifiedRating: number;
    targetRating: number;
    reason: string;
  }[];
  matchedCompetencies: CompetencyReadinessContribution[];
  remainingGaps: CompetencyReadinessContribution[];
  strongestCompetencies: CompetencyReadinessContribution[];
  allCompetencies: CompetencyReadinessContribution[];
  completedInterventionsCount: number;
  latestImprovement: LatestVerifiedImprovement | null;
  nextBestInterventions: RecommendedInterventionAction[];
  calculatedAt: string;
}

// ============================================================================
// INDUSTRY ROLE MATCHING ENGINE TYPES (Step 12)
// ============================================================================

export type IndustryMatchLevel = "LOW MATCH" | "PARTIAL MATCH" | "STRONG MATCH" | "HIGH MATCH";

export interface IndustryCompetencyRequirement {
  competencyId: string;
  competencyName: string;
  category: string;
  requiredRating: number; // 1.0 - 5.0
  weight: number;         // 0.0 - 1.0 (normalized relative weight)
  isCritical: boolean;
  importance: "essential" | "preferred";
}

export interface IndustryRoleDemand {
  id: string;
  industryId?: string;
  organization: string;
  roleId: string;
  roleTitle: string;
  ayushSystem: string;
  demandStatus: "ACTIVE" | "URGENT" | "OPEN";
  experienceRequirementYears: number;
  opportunityId?: string;
  requiredCompetencies: IndustryCompetencyRequirement[];
  description?: string;
  location?: string;
}

export interface IndustryCompetencyMatch {
  competencyId: string;
  competencyName: string;
  category: string;
  verifiedRating: number; // Faculty-verified rating
  requiredRating: number; // Required by employer
  attainment: number;     // min(1.0, verifiedRating / requiredRating)
  weight: number;         // Weight for this demand
  matchContribution: number; // attainment * weight * 100
  gap: number;            // max(0, requiredRating - verifiedRating)
  isCritical: boolean;
  isMatched: boolean;     // gap <= 0.2 or attainment >= 0.9
  criticalMissing: boolean; // isCritical && verifiedRating < (requiredRating - 0.5)
}

export interface FacultyIndustryExportRecord {
  roleId: string;
  studentId: string;
  competencyId: string;
  verifiedRating: number;
  targetRating: number;
  gap: number;
  matchContribution: number;
  isCritical: boolean;
}

export interface IndustryRoleMatchResult {
  demandId: string;
  organization: string;
  roleId: string;
  roleTitle: string;
  ayushSystem: string;
  demandStatus: "ACTIVE" | "URGENT" | "OPEN";
  experienceRequirementYears: number;
  matchScore: number;     // 0 - 100%
  matchLevel: IndustryMatchLevel;
  isCriticalMissing: boolean;
  criticalRequirementsTotal: number;
  criticalRequirementsMet: number;
  matchedCompetencies: IndustryCompetencyMatch[];
  missingCompetencies: IndustryCompetencyMatch[];
  criticalMissingRequirements: IndustryCompetencyMatch[];
  allCompetencyMatches: IndustryCompetencyMatch[];
  roleReadinessScore: number; // Step 11 canonical readiness score
  roleReadinessLevel: AyushReadinessLevel;
  nextBestAction?: RecommendedInterventionAction;
  opportunityId?: string;
  applicationActionAvailable: boolean;
  calculatedAt: string;
}

// ============================================================================
// AYUSH OPPORTUNITY DISCOVERY TYPES (Step 13)
// ============================================================================

export type AyushOpportunityType =
  | "Job"
  | "Internship"
  | "Fellowship"
  | "Research Project"
  | "Program";

export type AyushSourceStatus =
  | "OFFICIAL"
  | "VERIFIED_SOURCE"
  | "WEB_DISCOVERED"
  | "UNVERIFIED";

export interface AyushDiscoveredOpportunity {
  id: string;
  title: string;
  organization: string;
  opportunityType: AyushOpportunityType;
  description: string;
  ayushSystem: string;
  roleId?: string | null;
  competencyIds: string[];
  location: string;
  applicationUrl: string;
  sourceUrl: string;
  sourceDomain: string;
  postedDate?: string | null;
  deadline?: string | null;
  sourceStatus: AyushSourceStatus;
  discoveredAt: string;
  active: boolean;
  studentMatch?: {
    matchScore: number;
    matchLevel: string;
    matchedCompetenciesCount: number;
    totalRequirementsCount: number;
    isCriticalMissing: boolean;
    roleReadinessScore: number;
    keyMatchedCompetencies: string[];
    remainingGaps: string[];
  } | null;
}

// ============================================================================
// DEVELOPMENT INTERVENTIONS & STUDENT DEVELOPMENT PLANS (Step 8)
// ============================================================================

export type InterventionType =
  | "Course"
  | "Workshop"
  | "Mentor Session"
  | "Practical Task"
  | "Research Challenge"
  | "Industry Project"
  | "Assessment";

export type DevelopmentPlanStatus =
  | "RECOMMENDED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "EVIDENCE_PENDING"
  | "VERIFIED"
  | "REJECTED";

export type EvidenceStatus =
  | "PENDING"
  | "SUBMITTED"
  | "AI_REVIEWED"
  | "FACULTY_REVIEW"
  | "VERIFIED"
  | "REJECTED";

export interface SupportingResource {
  title: string;
  url: string;
  type: "video" | "reading" | "document" | "tool";
}

export interface AyushDevelopmentIntervention {
  id: string;
  title: string;
  description: string;
  type: InterventionType;
  competencyId: string;
  targetMaturity: CompetencyMaturityLevel;
  estimatedDuration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  provider: string;
  evidenceRequired: string;
  evaluationRubric?: InterventionEvaluationRubric;
  supportingResources?: SupportingResource[];
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type EvaluationStatus = "PASS" | "NEEDS_REVIEW" | "INSUFFICIENT";

export interface InterventionEvaluationRubricItem {
  name: string;
  weight: number;
  description: string;
}

export interface InterventionEvaluationRubric {
  criteria: InterventionEvaluationRubricItem[];
}

export interface AiEvidenceEvaluation {
  expectedRating: number; // 1.0 - 5.0
  confidence: number; // 0 - 100
  relevanceScore: number; // 0 - 100
  completenessScore: number; // 0 - 100
  qualityScore: number; // 0 - 100
  strengths: string[];
  weakAreas: string[];
  feedback: string;
  recommendedRange: string; // e.g. "3.0 - 3.5"
  evaluationStatus: EvaluationStatus;
  evaluatedAt?: string;
}

export interface AyushStudentDevelopmentPlan {
  id: string;
  studentId: string;
  roleId: string;
  competencyId: string;
  baselineLevel: number;
  targetLevel: number;
  interventionId: string;
  status: DevelopmentPlanStatus;
  startedAt: string | null;
  completedAt: string | null;
  evidenceStatus: EvidenceStatus | string | null;
  evidenceSubmission?: {
    evidenceText?: string;
    documentUrl?: string;
    submittedAt?: string;
    reviewerNotes?: string;
    [key: string]: any;
  } | null;
  evidenceFilePath?: string | null;
  evidenceFileName?: string | null;
  evidenceFileSize?: number | null;
  evidenceMimeType?: string | null;
  extractedText?: string | null;
  extractionStatus?: "SUCCESS" | "SCANNED_OCR" | "SCAN_FAILED" | "FAILED" | string | null;
  evidenceQuality?: "DIRECT_TEXT" | "SCANNED_OCR" | "SCAN_FAILED" | string | null;
  signedEvidenceUrl?: string | null;
  aiExpectedRating?: number | null;
  aiConfidence?: number | null;
  aiEvaluation?: AiEvidenceEvaluation | null;
  facultyFinalRating?: number | null;
  facultyFeedback?: string | null;
  facultyId?: string | null;
  verifiedAt?: string | null;
  intervention?: AyushDevelopmentIntervention;
  createdAt?: string;
  updatedAt?: string;
}

export interface AyushCompetencyHistoryRecord {
  id: string;
  studentId: string;
  competencyId: string;
  roleId?: string;
  planId?: string;
  interventionId?: string;
  previousRating: number;
  aiExpectedRating?: number | null;
  facultyFinalRating: number;
  improvementDelta: number;
  decision?: "VERIFIED" | "REJECTED" | string;
  evidenceQuality?: "DIRECT_TEXT" | "SCANNED_OCR" | "SCAN_FAILED" | string | null;
  evaluatorId?: string | null;
  evaluatorFeedback?: string | null;
  evidenceFilePath?: string | null;
  verifiedAt: string;
  createdAt?: string;
}

export interface AyushAssessmentResult {
  assessmentId: string;
  assessmentTitle: string;
  ayushSystem: AyushSystemId;
  skillIds: string[];
  score: number;
  maxScore: number;
  scorePercent: number;
  completedAt: string;
}

export interface AyushPassportSkillGap {
  skillId: string;
  skillName: string;
  category: AyushSkillCategory;
  currentLevel: string;
  targetLevel: string;
  priority: "high" | "medium" | "low";
}

export interface AyushCertification {
  id: string;
  title: string;
  issuingBody: string;
  issuedAt: string;
  expiresAt: string | null;
  verificationUrl: string | null;
  skillIds: string[];
}

export interface AyushVerifiedExperience {
  id: string;
  title: string;
  organization: string;
  type: "clinical_posting" | "internship" | "research" | "industry" | "community";
  ayushSystem: AyushSystemId | null;
  startDate: string;
  endDate: string | null;
  isOngoing: boolean;
  verifiedByInstitution: boolean;
}

// ============================================================================
// 5. INDUSTRY SKILL DEMAND (Extension for IndustryHiringPostRecord / profiles)
// ============================================================================

export interface AyushIndustrySkillDemand {
  /** FK to industry user/profile */
  industryId: string;
  companyName: string;
  /** AYUSH systems the company operates in */
  ayushSystems: AyushSystemId[];
  /** Skill IDs required from AYUSH_SKILL_CATALOG */
  requiredSkillIds: string[];
  /** Skill IDs preferred but not mandatory */
  preferredSkillIds: string[];
  /** Job/role titles the company hires for */
  jobRoles: string[];
  /** Internship role titles offered */
  internshipRoles: string[];
  /** Research or R&D collaboration requirements */
  researchRequirements: string[];
  /** Emerging or future skills the company anticipates needing */
  emergingSkillIds: string[];
  /** Years of relevant experience required (0 for freshers) */
  experienceRequirementYears: number;
  updatedAt: string;
}

// ============================================================================
// 6. VERIFIED INTERNSHIP EXTENSION
// ============================================================================

/** Extends/augments the existing InternshipPosting from db.ts with AYUSH fields */
export interface AyushInternshipExtension {
  /** FK to existing InternshipPosting.id */
  internshipPostingId: string;
  /** AYUSH system domain of this internship */
  ayushSystem: AyushSystemId | null;
  /** Skill IDs from AYUSH_SKILL_CATALOG required for this internship */
  requiredSkillIds: string[];
  /** Academic eligibility (e.g., UG 3rd year Ayurveda) */
  eligibilityCriteria: string;
  durationWeeks: number;
  /** City / district */
  city: string;
  /** State */
  state: string;
  /** Whether the internship has been verified by the institution/ministry */
  verificationStatus: "unverified" | "institution_verified" | "ministry_verified";
  /** Whether the student has completed this internship */
  completionStatus: "not_started" | "ongoing" | "completed" | "withdrawn";
  /** URL or reference to completion certificate */
  certificateRef: string | null;
  /** Verification proof document reference */
  verificationDocRef: string | null;
}

// ============================================================================
// 7. R&D PROBLEM STATEMENT
// ============================================================================

export type RdProblemStatus = "open" | "in_progress" | "completed" | "archived";

export interface RdProblemStatement {
  id: string;
  title: string;
  description: string;
  /** AYUSH or broader research domain */
  researchDomain: string;
  /** Skill IDs from AYUSH_SKILL_CATALOG needed to address this problem */
  requiredSkillIds: string[];
  /** Specific technical or academic requirements */
  requirements: string[];
  /** What success looks like */
  expectedOutcome: string;
  /** FK to industry user */
  industryId: string;
  companyName: string;
  status: RdProblemStatus;
  /** AYUSH systems this problem is relevant to */
  ayushSystems: AyushSystemId[];
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// 8. INNOVATION / IP FOUNDATION
// ============================================================================

export type IpAssetType = "patent" | "research_output" | "technology" | "licensing_opportunity";
export type IpAssetStatus = "draft" | "filed" | "published" | "granted" | "abandoned";
export type CollaborationType = "joint_research" | "technology_transfer" | "licensing" | "sponsored_research";

export interface IpAsset {
  id: string;
  type: IpAssetType;
  title: string;
  description: string;
  /** Originating organization (institution or industry) */
  originatorId: string;
  originatorType: "institution" | "industry";
  /** AYUSH systems this IP covers */
  ayushSystems: AyushSystemId[];
  status: IpAssetStatus;
  filingDate: string | null;
  publicationDate: string | null;
  /** For patents: patent number once granted */
  referenceNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AcademiaIndustryCollaboration {
  id: string;
  type: CollaborationType;
  title: string;
  description: string;
  institutionId: string;
  industryId: string;
  /** Linked IP assets */
  ipAssetIds: string[];
  /** Linked R&D problems */
  rdProblemIds: string[];
  ayushSystems: AyushSystemId[];
  status: "proposed" | "active" | "completed" | "terminated";
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// 9. MINISTRY INTELLIGENCE FOUNDATION
// ============================================================================

/**
 * Aggregated read-only intelligence record computed from platform data.
 * All values MUST be derived from real Supabase data — never hard-coded.
 */
export interface MinistryIntelligenceSnapshot {
  /** ISO timestamp of when this snapshot was computed */
  snapshotAt: string;
  /** Per-AYUSH-system breakdowns */
  byAyushSystem: Record<AyushSystemId, AyushSystemMetrics>;
  /** Platform-wide totals */
  totals: PlatformTotals;
}

export interface AyushSystemMetrics {
  ayushSystem: AyushSystemId;
  /** Registered & verified students in this system */
  studentCount: number;
  /** Registered institutions offering this system */
  institutionCount: number;
  /** Industry partners active in this system */
  industryCount: number;
  /** Open internship postings in this system */
  openInternships: number;
  /** Placements achieved */
  placements: number;
  /** Open R&D problem statements */
  openRdProblems: number;
  /** IP assets filed/granted linked to this system */
  ipAssets: number;
  /** Top skill gaps across students in this system */
  topSkillGaps: Array<{ skillId: string; skillName: string; studentCount: number }>;
  /** Top skills demanded by industry in this system */
  topDemandedSkills: Array<{ skillId: string; skillName: string; industryCount: number }>;
}

export interface PlatformTotals {
  totalStudents: number;
  totalInstitutions: number;
  totalIndustryPartners: number;
  totalMinistryUsers: number;
  totalOpenInternships: number;
  totalPlacements: number;
  totalRdProblems: number;
  totalIpAssets: number;
  totalCollaborations: number;
}
