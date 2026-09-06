/**
 * Skill Bridge — Knowledge Test Scorer
 * Calculates score, identifies strengths/weaknesses, assigns performance tiers,
 * and produces the structured result breakdown.
 */

import {
  TestAnswerRecord,
  TestResult,
  PerformanceTier,
  QuestionBreakdownItem,
  KnowledgeQuestion,
  DifficultyLevel,
} from "./types";

/**
 * Determines performance tier from percentage score + difficulty.
 */
export function getPerformanceTier(
  scorePercent: number,
  difficulty: DifficultyLevel
): PerformanceTier {
  // Higher difficulty warrants slightly gentler tier thresholds
  const offset = difficulty === "advanced" ? 5 : difficulty === "intermediate" ? 2 : 0;

  if (scorePercent >= 90 - offset) return "Expert";
  if (scorePercent >= 75 - offset) return "Strong";
  if (scorePercent >= 60 - offset) return "Proficient";
  if (scorePercent >= 40 - offset) return "Developing";
  return "Needs Foundation";
}

/**
 * Produces a human-friendly concept label from a conceptTag slug.
 * e.g. "sql-injection" → "SQL Injection"
 */
function humanizeConceptTag(tag: string): string {
  return tag
    .split("-")
    .map((word) => {
      // Keep common acronyms uppercase
      const upper = word.toUpperCase();
      if (["SQL", "API", "HTTP", "CSS", "HTML", "DNS", "TCP", "UDP", "IP", "XSS", "CSRF", "JWT", "SSH", "TLS", "SSL", "CORS", "CICD", "CI", "CD", "OWASP", "SIEM", "SOC", "IDS", "IPS", "ML", "AI", "NLP", "CNN", "RNN", "GAN", "REST", "GRPC", "AWS", "GCP", "K8S", "IAM", "VPC", "CDN", "WAF"].includes(upper)) {
        return upper;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Calculates the complete test result from questions and answers.
 */
export function calculateTestResult(params: {
  sessionId: string;
  studentId: string;
  domainId: string;
  domainName: string;
  specificInterest: string;
  difficulty: DifficultyLevel;
  questions: KnowledgeQuestion[];
  answers: TestAnswerRecord[];
}): TestResult {
  const {
    sessionId,
    studentId,
    domainId,
    domainName,
    specificInterest,
    difficulty,
    questions,
    answers,
  } = params;

  const totalQuestions = questions.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const pointsPerQuestion = 4;
  const maxScore = totalQuestions * pointsPerQuestion; // 40 total points for 10 questions
  const score = correctCount * pointsPerQuestion; // score out of 40
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const performanceTier = getPerformanceTier(scorePercent, difficulty);
  const knowledgeLevel = performanceTier;

  // Identify strengths and weaknesses by concept tag
  const correctConcepts: string[] = [];
  const incorrectConcepts: string[] = [];

  for (const answer of answers) {
    const label = humanizeConceptTag(answer.conceptTag);
    if (answer.isCorrect) {
      if (!correctConcepts.includes(label)) correctConcepts.push(label);
    } else {
      if (!incorrectConcepts.includes(label)) incorrectConcepts.push(label);
    }
  }

  // Build question breakdown
  const questionBreakdown: QuestionBreakdownItem[] = answers.map((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    const selectedOpt = question?.options.find((o) => o.id === answer.selectedOptionId);
    const correctOpt = question?.options.find((o) => o.id === answer.correctOptionId);

    return {
      questionNumber: answer.questionNumber,
      questionText: question?.questionText || "",
      selectedOption: selectedOpt?.text || "",
      correctOption: correctOpt?.text || "",
      isCorrect: answer.isCorrect,
      conceptTag: humanizeConceptTag(answer.conceptTag),
      complexity: answer.complexity,
      explanation: question?.explanationAfterAnswer || "",
    };
  });

  const totalTimeMs = answers.reduce((sum, a) => sum + (a.timeSpentMs || 0), 0);

  return {
    id: `result_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    studentId,
    sessionId,
    domainId,
    domainName,
    specificInterest,
    difficulty,
    totalQuestions,
    correctCount,
    score,
    maxScore,
    pointsPerQuestion,
    scorePercent,
    performanceTier,
    knowledgeLevel,
    strengths: correctConcepts,
    weaknesses: incorrectConcepts,
    questionBreakdown,
    totalTimeMs,
    completedAt: new Date().toISOString(),
  };
}
