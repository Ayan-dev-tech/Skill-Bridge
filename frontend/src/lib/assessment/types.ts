/**
 * Skill-Bridge — Assessment Infrastructure Types
 * Unified question model covering NEET UG, AIAPGET PG, Practical Scenario,
 * and Industry Skill assessments.
 *
 * Extends (but does not replace) the existing knowledge-test system.
 * Existing KnowledgeQuestion/TestSessionState/TestResult types are preserved.
 */

import type { AyushSystemId, AyushSkillCategory } from "@/lib/ayush/domains";

// ============================================================================
// EXAM TYPE
// ============================================================================

export const EXAM_TYPES = [
  "NEET_UG",
  "AIAPGET_PG",
  "PRACTICAL_SCENARIO",
  "INDUSTRY_SKILL",
] as const;

export type ExamType = (typeof EXAM_TYPES)[number];

// ============================================================================
// QUESTION TYPE
// ============================================================================

export const QUESTION_TYPES = ["MCQ", "PRACTICAL_SCENARIO"] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

// ============================================================================
// DIFFICULTY
// ============================================================================

export const ASSESSMENT_DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;
export type AssessmentDifficulty = (typeof ASSESSMENT_DIFFICULTIES)[number];

// Mapping to existing DifficultyLevel for interop
export const DIFFICULTY_MAP: Record<AssessmentDifficulty, "beginner" | "intermediate" | "advanced"> = {
  Easy: "beginner",
  Medium: "intermediate",
  Hard: "advanced",
};

// ============================================================================
// COGNITIVE LEVEL
// ============================================================================

export const COGNITIVE_LEVELS = [
  "Knowledge",
  "Understanding",
  "Application",
  "Reasoning",
] as const;

export type CognitiveLevel = (typeof COGNITIVE_LEVELS)[number];

// ============================================================================
// UNIFIED QUESTION OPTION (compatible with existing KnowledgeOption)
// ============================================================================

export interface AssessmentOption {
  id: string;
  label: "A" | "B" | "C" | "D";
  text: string;
}

// ============================================================================
// UNIFIED QUESTION MODEL
// ============================================================================

export interface AssessmentQuestion {
  id: string;
  questionText: string;
  /** For PRACTICAL_SCENARIO: scenario/clinical context preceding the question */
  scenarioContext?: string;
  options: AssessmentOption[]; // Always exactly 4: A, B, C, D
  correctOptionId: string;
  explanation: string;
  examType: ExamType;
  questionType: QuestionType;
  /** e.g. "Dravyaguna", "Roga Nidana", "Pharmacology" */
  subject: string;
  /** Sub-topic within the subject */
  topic: string;
  /** AYUSH skill IDs from AYUSH_SKILL_CATALOG this question assesses */
  ayushSkillIds: string[];
  /** AYUSH skill category bucket */
  skillCategory: AyushSkillCategory | null;
  difficulty: AssessmentDifficulty;
  cognitiveLevel: CognitiveLevel;
  /** AYUSH system this question is specific to; null = all systems */
  ayushSystem: AyushSystemId | null;
  /**
   * Concept tag (slug) — maps to existing KnowledgeQuestion.conceptTag.
   * Used for uniqueness checks and skill-gap engine connection.
   */
  conceptTag: string;
  /** Source reference: textbook name, chapter, year, etc. */
  sourceRef?: string;
  /** Whether this question is live and selectable */
  isActive: boolean;
  /** Optional: year the question was first used in reference material */
  referenceYear?: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// ASSESSMENT CONFIGURATION
// ============================================================================

export type AssessmentMode = "Practice" | "Mock Test";

export interface AssessmentConfig {
  id: string;
  name: string;
  description: string;
  examType: ExamType;
  mode: AssessmentMode;
  /** AYUSH system filter; null = not restricted to a specific system */
  ayushSystem: AyushSystemId | null;
  /** Subject filters; empty = all subjects */
  subjectFilters: string[];
  /** Topic filters; empty = all topics */
  topicFilters: string[];
  /** Difficulty filter; null = mixed */
  difficulty: AssessmentDifficulty | null;
  questionCount: number;
  /** Time limit in minutes; null = untimed */
  timeLimitMinutes: number | null;
  /** Score percent required to pass; null = no pass threshold */
  passingScorePercent: number | null;
  /** Whether this config is available to students */
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// QUESTION SELECTION FILTER
// ============================================================================

export interface QuestionSelectionFilter {
  examType?: ExamType;
  ayushSystem?: AyushSystemId;
  subject?: string;
  topic?: string;
  difficulty?: AssessmentDifficulty;
  cognitiveLevel?: CognitiveLevel;
  ayushSkillIds?: string[];
  questionType?: QuestionType;
  /** Question IDs to exclude (already used in session) */
  excludeIds?: string[];
  count: number;
}

// ============================================================================
// ASSESSMENT ATTEMPT
// ============================================================================

export type AttemptStatus = "in_progress" | "completed" | "abandoned" | "timed_out";

export interface AssessmentAttempt {
  id: string;
  studentId: string;
  configId: string;
  examType: ExamType;
  ayushSystem: AyushSystemId | null;
  /** Ordered list of question IDs in this attempt (no correct answers exposed here) */
  questionIds: string[];
  /** Question responses keyed by questionId */
  responses: Record<string, QuestionResponse>;
  startedAt: string;
  endedAt: string | null;
  status: AttemptStatus;
  /** Scoring — populated on completion */
  score: number | null;
  maxScore: number | null;
  scorePercent: number | null;
  correctCount: number | null;
  incorrectCount: number | null;
  unattemptedCount: number | null;
  totalQuestions: number;
  /** Skill performance summary keyed by ayushSkillId */
  skillPerformance: Record<string, SkillPerformanceSummary>;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionResponse {
  questionId: string;
  selectedOptionId: string | null; // null = unattempted
  isCorrect: boolean | null;       // null = unattempted
  /** Time spent on this question in milliseconds */
  timeSpentMs: number;
  answeredAt: string | null;
}

export interface SkillPerformanceSummary {
  ayushSkillId: string;
  skillName: string;
  skillCategory: AyushSkillCategory;
  questionCount: number;
  correctCount: number;
  accuracyPercent: number | null;
}

// ============================================================================
// SCORING RESULT
// ============================================================================

export interface AssessmentScoringResult {
  score: number;
  maxScore: number;
  scorePercent: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  totalQuestions: number;
  skillPerformance: Record<string, SkillPerformanceSummary>;
  /** Subject-level breakdown */
  subjectBreakdown: Array<{
    subject: string;
    total: number;
    correct: number;
    accuracyPercent: number;
  }>;
  /** Topic-level breakdown */
  topicBreakdown: Array<{
    topic: string;
    total: number;
    correct: number;
    accuracyPercent: number;
  }>;
  completedAt: string;
}

// ============================================================================
// CLIENT-SAFE QUESTION (no correct answer or explanation exposed)
// ============================================================================

export interface ClientAssessmentQuestion {
  id: string;
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  scenarioContext?: string;
  options: Array<{ id: string; label: string; text: string }>;
  subject: string;
  topic: string;
  difficulty: AssessmentDifficulty;
  cognitiveLevel: CognitiveLevel;
  examType: ExamType;
}

// ============================================================================
// NEET UG / AIAPGET PG SPECIFIC METADATA (used in configs/UI labels)
// ============================================================================

export interface NeetUgSubjectMeta {
  subject: string;
  topics: string[];
  /** Standard NEET UG mark distribution weight (informational) */
  questionCountGuide: number;
}

export const NEET_UG_SUBJECTS: NeetUgSubjectMeta[] = [
  { subject: "Dravyaguna (Materia Medica)", topics: ["Dravya Classification", "Rasa-Guna-Veerya-Vipaka", "Panchavidha Kashaya Kalpana", "Single Drug Therapeutics"], questionCountGuide: 20 },
  { subject: "Roga Nidana (Pathology)", topics: ["Nidana Panchaka", "Samprapti", "Dosha-Dushya Sammurchana", "Rupa & Upashaya"], questionCountGuide: 15 },
  { subject: "Sharira Rachana (Anatomy)", topics: ["Marma", "Srotas", "Dhatu", "Kosha & Layers"], questionCountGuide: 15 },
  { subject: "Kriya Sharira (Physiology)", topics: ["Tridosha", "Agni", "Ama", "Panchakosha"], questionCountGuide: 15 },
  { subject: "Swasthavritta (Preventive)", topics: ["Dinacharya", "Ritucharya", "Sadvritta", "Panchakarma Basics"], questionCountGuide: 10 },
  { subject: "Rasashastra (Alchemy)", topics: ["Shodhana", "Marana", "Parada Samskara", "Bhasma Preparation"], questionCountGuide: 10 },
  { subject: "Kayachikitsa (Internal Medicine)", topics: ["Jwara", "Prameha", "Amavata", "Arsha"], questionCountGuide: 15 },
];

export interface AiapgetPgSubjectMeta {
  subject: string;
  topics: string[];
  questionCountGuide: number;
}

export const AIAPGET_PG_SUBJECTS: AiapgetPgSubjectMeta[] = [
  { subject: "Advanced Dravyaguna", topics: ["Pharmacodynamics", "Herb Standardization", "Phytochemical Profiling", "Clinical Pharmacognosy"], questionCountGuide: 20 },
  { subject: "Research Methodology", topics: ["Study Design", "Biostatistics", "Evidence-Based AYUSH", "Protocol Writing"], questionCountGuide: 20 },
  { subject: "Pharmacovigilance", topics: ["ADR Reporting", "Causality Assessment", "PVPI Guidelines", "Post-Market Surveillance"], questionCountGuide: 15 },
  { subject: "Clinical Medicine (PG)", topics: ["Advanced Kayachikitsa", "Panchakarma Therapy", "Geriatrics", "Emergency AYUSH"], questionCountGuide: 20 },
  { subject: "Healthcare Administration", topics: ["Hospital Management", "NABH Standards", "Health Policy", "ABDM Integration"], questionCountGuide: 15 },
  { subject: "Scientific Validation", topics: ["In-vitro Studies", "Biomarker Research", "Clinical Trials AYUSH", "Toxicology"], questionCountGuide: 10 },
];

// ============================================================================
// PRACTICAL SCENARIO SKILL AREAS
// ============================================================================

export const PRACTICAL_SCENARIO_SKILL_AREAS: AyushSkillCategory[] = [
  "Clinical Reasoning",
  "Diagnostics",
  "Emergency/Triage Awareness",
  "Research Methodology",
  "Biostatistics",
  "Pharmacovigilance",
  "EHR/ABDM Awareness",
  "Communication",
  "Regulatory Awareness",
];

// ============================================================================
// VALIDATION RESULT (extended from existing ValidationResult)
// ============================================================================

export interface AssessmentValidationResult {
  valid: boolean;
  errors: string[];
}
