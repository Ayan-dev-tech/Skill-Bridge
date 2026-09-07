/**
 * Skill Bridge — Skill Gap & Educator Recommendations Types
 * Strict schema definitions for target skill profiles, gap calculations,
 * AI interpretation, educator catalogs, and program matching.
 */

import { DifficultyLevel } from "@/lib/knowledge-test/types";

// ============================================================================
// SKILL PROFILE & TAXONOMY
// ============================================================================

export type SkillImportance = "essential" | "important" | "recommended";

export interface TargetSkillRequirement {
  skillId: string;
  skillName: string;
  category: string;
  importance: SkillImportance;
  targetLevel: string; // e.g. "Strong Foundation", "Proficient", "Industry Ready"
  description: string;
  relatedConceptTags: string[]; // Maps directly to Knowledge Testing conceptTags
}

export interface TargetSkillProfile {
  nicheId: string;
  nicheTitle: string;
  domainId: string;
  domainName: string;
  version: string;
  description: string;
  requiredSkills: TargetSkillRequirement[];
}

// ============================================================================
// SKILL GAP ITEMS
// ============================================================================

export type GapPriority = "high" | "medium" | "low";

export interface SkillGapItem {
  skillId: string;
  skillName: string;
  category: string;
  priority: GapPriority;
  priorityLabel: "High Priority" | "Medium Priority" | "Low Priority";
  currentLevel: string; // e.g. "Needs Improvement", "Developing", "Competent"
  targetLevel: string; // e.g. "Strong Foundation", "Proficient", "Industry Ready"
  evidence: string; // Factual assessment-derived evidence
  whyItMatters: string; // Real-world context
  recommendedAction: string; // Practical learning action
  testedCount: number; // How many related questions appeared in test
  correctCount: number; // How many student answered correctly
  accuracyPercent: number | null; // null if not directly tested
}

// ============================================================================
// EDUCATOR & PROGRAM TAXONOMY
// ============================================================================

export type EducatorVerificationStatus =
  | "verified_partner"
  | "external_opportunity"
  | "sample_provider";

export interface Educator {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description: string;
  website: string;
  verifiedStatus: EducatorVerificationStatus;
  statusLabel: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProgramDeliveryType =
  | "Online Self-Paced"
  | "Interactive Cohort"
  | "Hands-on Lab"
  | "Certification Track";

export interface EducationProgram {
  id: string;
  educatorId: string;
  educatorName: string;
  title: string;
  description: string;
  programUrl: string;
  domains: string[]; // e.g. ["security"]
  niches: string[]; // e.g. ["app-sec", "soc-threat"]
  skillIds: string[]; // Normalized skill IDs covered, e.g. ["auth-identity", "web-security"]
  difficulty: "beginner" | "intermediate" | "advanced" | "all_levels";
  deliveryType: ProgramDeliveryType;
  duration: string; // e.g. "4 Weeks (6 hrs/wk)"
  certification: string; // e.g. "Certificate of Completion"
  verifiedStatus: EducatorVerificationStatus;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// PROGRAM RECOMMENDATIONS
// ============================================================================

export type MatchTier = "Best Match" | "Strong Match" | "Relevant";

export interface ProgramRecommendation {
  programId: string;
  program: EducationProgram;
  matchScore: number; // 0–100 based on gap coverage
  matchTier: MatchTier;
  matchedGapCount: number;
  matchedHighPriorityCount: number;
  coveredGaps: string[]; // Skill names covered that match student's gaps
  matchExplanation: string; // e.g. "Recommended because it covers: ✓ Authentication, ✓ Web Security"
}

// ============================================================================
// PERSISTED SKILL GAP ANALYSIS
// ============================================================================

export interface SkillGapAnalysisRecord {
  id: string;
  studentId: string;
  interestProfileId: string;
  knowledgeTestResultId: string;
  domainId: string;
  domainName: string;
  nicheId: string;
  nicheTitle: string;
  difficulty: DifficultyLevel;
  testScore: number;
  testMaxScore: number;
  testScorePercent: number;
  knowledgeLevel: string;
  skillProfileVersion: string;
  executiveSummary: string;
  skillGaps: SkillGapItem[];
  recommendations: ProgramRecommendation[];
  aiGenerated: boolean;
  isStale: boolean;
  createdAt: string;
  updatedAt: string;
}

import type { NicheTrendItem } from "./niche-trends-service";

export interface SkillGapApiResponse {
  success: boolean;
  isLocked?: boolean;
  lockedReason?: string;
  redirectUrl?: string;
  analysis?: SkillGapAnalysisRecord;
  direction?: {
    domainId: string;
    domainName: string;
    nicheId: string;
    nicheTitle: string;
    explanation?: string;
  };
  knowledgeSnapshot?: {
    testScore: number;
    testMaxScore: number;
    testScorePercent: number;
    difficulty: DifficultyLevel;
    knowledgeLevel: string;
    totalQuestions: number;
    correctCount: number;
    strengths: string[];
    weaknesses: string[];
    completedAt: string;
  };
  isAdvancedVerified?: boolean;
  nicheTrends?: NicheTrendItem[] | null;
  error?: string;
}
