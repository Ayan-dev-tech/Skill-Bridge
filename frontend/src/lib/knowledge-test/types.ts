/**
 * Skill Bridge — Knowledge Testing Types
 * Strict schema definitions for difficulty-based question generation,
 * test sessions, answer tracking, and result analysis.
 */

// ============================================================================
// DIFFICULTY LEVELS
// ============================================================================

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

/** Human-readable metadata for each difficulty tier */
export const DIFFICULTY_META: Record<
  DifficultyLevel,
  {
    label: string;
    tagline: string;
    description: string;
    questionDistribution: { fundamental: number; application: number; challenging: number };
  }
> = {
  beginner: {
    label: "Beginner",
    tagline: "I'm just starting to learn this field",
    description:
      "Tests basic concepts, fundamental terminology, and simple understanding. Questions are straightforward and don't require deep technical experience.",
    questionDistribution: { fundamental: 5, application: 3, challenging: 2 },
  },
  intermediate: {
    label: "Intermediate",
    tagline: "I have some experience and understanding",
    description:
      "Tests applied knowledge, connecting multiple concepts, and practical reasoning. Questions require understanding beyond simple memorization.",
    questionDistribution: { fundamental: 3, application: 4, challenging: 3 },
  },
  advanced: {
    label: "Advanced",
    tagline: "I'm confident in my technical skills",
    description:
      "Tests deep understanding, edge cases, multi-step reasoning, and real-world tradeoffs. Questions demand expert-level analysis and decision-making.",
    questionDistribution: { fundamental: 1, application: 3, challenging: 6 },
  },
};

// ============================================================================
// QUESTION COMPLEXITY TIERS (within each difficulty level)
// ============================================================================

export type QuestionComplexity = "fundamental" | "application" | "challenging";

export const COMPLEXITY_DESCRIPTIONS: Record<
  QuestionComplexity,
  { label: string; guideline: string }
> = {
  fundamental: {
    label: "Fundamental",
    guideline:
      "Tests basic terminology, definitions, and core concepts. A student with introductory exposure should answer correctly.",
  },
  application: {
    label: "Application",
    guideline:
      "Tests the ability to apply concepts to practical scenarios. Requires connecting ideas and choosing appropriate approaches.",
  },
  challenging: {
    label: "Challenging Reasoning",
    guideline:
      "Tests deep understanding through complex scenarios, edge cases, or multi-step reasoning. Requires expert analysis.",
  },
};

// ============================================================================
// QUESTION & OPTION SCHEMA
// ============================================================================

export interface KnowledgeOption {
  id: string;
  label: "A" | "B" | "C" | "D";
  text: string;
}

export interface KnowledgeQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  options: KnowledgeOption[];
  correctOptionId: string;
  difficulty: DifficultyLevel;
  complexity: QuestionComplexity;
  conceptTag: string; // e.g. "sql-injection", "tcp-handshake" — ensures no repeat concepts
  explanationAfterAnswer: string;
}

/** Sanitized question sent to client (no correct answer or explanation) */
export interface ClientQuestion {
  id: string;
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  options: { id: string; label: string; text: string }[];
  complexity: QuestionComplexity;
}

// ============================================================================
// GENERATION REQUEST
// ============================================================================

export interface QuestionGenerationRequest {
  domainId: string;
  domainName: string;
  specificInterest: string;
  difficulty: DifficultyLevel;
  existingConceptTags: string[]; // prevent concept repetition
  batchSize: number; // how many to generate (usually 10)
}

// ============================================================================
// ANSWER TRACKING
// ============================================================================

export interface TestAnswerRecord {
  questionId: string;
  questionNumber: number;
  selectedOptionId: string;
  correctOptionId: string;
  isCorrect: boolean;
  timeSpentMs: number;
  conceptTag: string;
  complexity: QuestionComplexity;
}

// ============================================================================
// TEST SESSION STATE
// ============================================================================

export type TestSessionStatus = "in_progress" | "completed" | "abandoned";

export interface TestSessionState {
  sessionId: string;
  studentId: string;
  domainId: string;
  domainName: string;
  specificInterest: string;
  difficulty: DifficultyLevel;
  questions: KnowledgeQuestion[];
  answers: TestAnswerRecord[];
  currentQuestionIndex: number;
  status: TestSessionStatus;
  startedAt: string;
  updatedAt: string;
}

// ============================================================================
// TEST RESULT (PERSISTED)
// ============================================================================

export type PerformanceTier =
  | "Needs Foundation"
  | "Developing"
  | "Proficient"
  | "Strong"
  | "Expert";

export interface QuestionBreakdownItem {
  questionNumber: number;
  questionText: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
  conceptTag: string;
  complexity: QuestionComplexity;
  explanation: string;
}

export interface TestResult {
  id: string;
  studentId: string;
  sessionId: string;
  domainId: string;
  domainName: string;
  specificInterest: string;
  difficulty: DifficultyLevel;
  totalQuestions: number;
  correctCount: number;
  score: number; // e.g. 32 out of 40
  maxScore: number; // 40 total points
  pointsPerQuestion: number; // 4 points per question
  scorePercent: number; // e.g. 80
  performanceTier: PerformanceTier;
  knowledgeLevel: string; // e.g. "Proficient"
  strengths: string[];
  weaknesses: string[];
  questionBreakdown: QuestionBreakdownItem[];
  totalTimeMs: number;
  completedAt: string;
}
