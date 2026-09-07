/**
 * Learning / Mentoring Module - Data Models & Contracts
 * Connects identified skill gaps from Stage 4 to real educational resources (YouTube).
 */

export interface LearningResourceItem {
  id: string; // e.g. "yt_abc123"
  videoId: string; // Real YouTube video ID
  title: string;
  description: string;
  channelTitle: string;
  thumbnailUrl: string;
  publishedAt?: string;
  videoUrl: string; // https://www.youtube.com/watch?v=${videoId}
  skillId: string;
  skillName: string;
  priority: "high" | "medium" | "low";
  difficulty: "beginner" | "intermediate" | "advanced";
  relevanceReason: string;
}

export interface LearningFocusSummary {
  domainId: string;
  domainName: string;
  nicheId: string;
  nicheTitle: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  scorePercent: number;
  primaryGaps: {
    skillId: string;
    skillName: string;
    priority: "high" | "medium" | "low";
    currentLevel: string;
    targetLevel: string;
    whyItMatters: string;
    recommendedAction: string;
  }[];
}

export interface SuggestedFocusStep {
  stepNumber: number;
  title: string;
  action: string;
  skillName: string;
  priority: "high" | "medium" | "low";
}

export interface LearningApiResponse {
  success: boolean;
  isLocked?: boolean;
  lockedReason?: string;
  redirectTo?: string;
  learningFocus?: LearningFocusSummary;
  suggestedSteps?: SuggestedFocusStep[];
  resources: LearningResourceItem[];
  totalResources: number;
  isConfigured: boolean; // Whether YOUTUBE_API_KEY is configured on server
  fromCache?: boolean;
  cachedAt?: string;
  message?: string;
  error?: string;
}

export interface LearningResourceRecord {
  id: string;
  studentId: string;
  analysisId: string;
  type: "youtube_video";
  resources: LearningResourceItem[];
  cachedAt: string;
}
