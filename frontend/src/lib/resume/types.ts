/**
 * Skill Bridge — ATS Resume Checker Types
 * Strict schema for parseability evaluation, structural audit, keyword extraction,
 * job description matching, and actionable improvement recommendations.
 */

export type IssueSeverity = "critical" | "warning" | "info";
export type IssueCategory = "parseability" | "structure" | "skills" | "content";
export type RecommendationPriority = "high" | "medium" | "low";

export interface ResumeIssue {
  id: string;
  category: IssueCategory | string;
  severity: IssueSeverity;
  message?: string;
  title?: string;
  description?: string;
  suggestion?: string;
}

export interface ResumeRecommendation {
  id: string;
  priority: RecommendationPriority;
  action?: string;
  title?: string;
  category?: string;
  actionableTip?: string;
  reason?: string;
}

export interface ResumeCategoryScores {
  /** Text extraction clarity, character encoding, and heading readability (0-100) */
  parseability: number;
  /** Section presence: Contact, Education, Skills, Experience, Projects (0-100) */
  structure: number;
  /** Coverage of technical tools, frameworks, and domain-relevant terminology (0-100) */
  skillsKeywordCoverage: number;
  /** Alias for skillsKeywordCoverage */
  keywordCoverage: number;
  /** Specific alignment to supplied Job Description requirements (0-100, null if no JD provided) */
  jobMatch: number | null;
  /** Action verb strength, measurable impact metrics, and clarity (0-100) */
  contentQuality: number;
}

export interface ResumeAnalysisRecord {
  id: string;
  studentId: string;
  resumeFileName?: string;
  jobTitle?: string;
  targetRole?: string;
  hasJobDescription: boolean;
  overallScore: number; // 0-100
  jobMatchScore?: number | null;
  strengthTier: "Needs Improvement" | "Moderate" | "Strong" | "Excellent";
  summary: string;
  categoryScores: ResumeCategoryScores;
  matchedKeywords: string[];
  missingKeywords: string[];
  detectedSections: string[];
  missingSections: string[];
  issues: ResumeIssue[];
  recommendations: ResumeRecommendation[];
  analyzedAt: string;
  disclaimer: string;
}

export interface AnalyzeResumeParams {
  studentId?: string;
  resumeText: string;
  resumeFileName?: string;
  jobTitle?: string;
  targetRole?: string;
  jobDescription?: string;
  hasFormattingChallenges?: boolean;
}

// Aliases for consumer flexibility
export type ATSAnalysisResult = ResumeAnalysisRecord;
export type ATSIssue = ResumeIssue;
export type ATSRecommendation = ResumeRecommendation;
