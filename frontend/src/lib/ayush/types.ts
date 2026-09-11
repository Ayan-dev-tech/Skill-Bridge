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
  industryReadinessBand: "Not Assessed" | "Developing" | "Emerging" | "Industry Ready" | null;
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

export interface AyushCompetency {
  id: string;
  title: string;
  domain: string;
  demonstratedAt: string | null;
  verifiedBy: string | null;
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
