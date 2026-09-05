/**
 * Skill Bridge — Adaptive AI Interest Discovery Types
 * Strict schema definitions separating Question Content, AI Contracts,
 * Scoring/Classification, and UI State.
 */

export type DomainId = "ai-ml" | "cloud" | "web" | "security" | "software";

export interface DomainMeta {
  id: DomainId;
  name: string;
  tagline: string;
  description: string;
  subDisciplines: string[];
}

// 11 Core Internal Interest Signal Dimensions
export type InterestSignal =
  | "investigation"
  | "problemSolving"
  | "building"
  | "creativity"
  | "analysis"
  | "experimentation"
  | "optimization"
  | "systemsThinking"
  | "dataOrientation"
  | "automation"
  | "securityMindset";

export type SignalScores = Record<InterestSignal, number>;

export type DomainScores = Record<DomainId, number>;

// Structured Question Option Schema
export interface QuestionOption {
  id: string;
  label: string; // e.g. "A", "B", "C", "D"
  text: string;
  // Internal scoring weights (hidden from student during Phase 1)
  signalWeights: Partial<Record<InterestSignal, number>>;
  domainRelevance: Partial<Record<DomainId, number>>;
  subDomainHint?: string; // used in Phase 2
}

// Structured Adaptive Question Schema
export interface AdaptiveQuestion {
  id: string;
  phase: 1 | 2;
  questionNumber: number;
  totalQuestionsEstimated: number;
  questionText: string;
  scenarioContext?: string;
  options: QuestionOption[];
  purpose: string; // Internal diagnostic rationale (hidden from student in UI)
  broadDomain?: DomainId; // Set in Phase 2
}

// Student Answer Record
export interface AnswerRecord {
  questionId: string;
  questionText: string;
  selectedOptionId: string;
  selectedOptionText: string;
  phase: 1 | 2;
  signalDelta: Partial<Record<InterestSignal, number>>;
  domainDelta: Partial<Record<DomainId, number>>;
}

// Phase 1 Broad Domain Evaluation Result
export interface Phase1Evaluation {
  discoveredDomainId: DomainId;
  discoveredDomainName: string;
  explanation: string;
  confidence: number; // 0 to 1
  canProceed: boolean;
  topSignals: { signal: InterestSignal; label: string; score: number }[];
}

// Phase 2 Sub-Domain Evaluation Result
export interface Phase2Evaluation {
  mainDomainId: DomainId;
  mainDomainName: string;
  specificInterest: string; // Specific niche discovered
  explanation: string;
  confidence: number;
  subDisciplinesConsidered: string[];
}

// Active Exploration Session State
export interface InterestSessionState {
  sessionId: string;
  studentId: string;
  phase: 1 | 2;
  status: "intro" | "phase1_in_progress" | "phase1_revealed" | "phase2_in_progress" | "phase2_ready" | "confirmed";
  currentQuestion?: AdaptiveQuestion;
  questionHistory: AnswerRecord[];
  signalScores: SignalScores;
  domainScores: DomainScores;
  tentativeDomain?: DomainId;
  confirmedProfile?: ConfirmedInterestProfile;
  updatedAt: string;
}

// Persisted Student Confirmed Interest Profile
export interface ConfirmedInterestProfile {
  id: string;
  studentId: string;
  sessionId: string;
  confirmedMainDomain: string;
  confirmedMainDomainId: DomainId;
  confirmedSpecificInterest: string;
  explanation: string;
  confidence: number;
  interestSignals: SignalScores;
  candidateDomainScores: DomainScores;
  phase1AnswerCount: number;
  phase2AnswerCount: number;
  confirmedAt: string;
}
