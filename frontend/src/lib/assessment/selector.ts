/**
 * Skill-Bridge — Question Selector
 * Selects AssessmentQuestions from a bank based on filter criteria.
 * Supports randomized, non-repeating selection within a session.
 */

import {
  AssessmentQuestion,
  QuestionSelectionFilter,
} from "./types";

/**
 * Fisher-Yates shuffle (in-place).
 */
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Selects questions from a bank matching the given filter.
 * Returns at most `filter.count` questions.
 * Randomizes order so students see different ordering each attempt.
 *
 * Important: Correct answers are in the returned questions — callers must
 * sanitize before sending to the client (strip correctOptionId + explanation).
 */
export function selectQuestions(
  bank: AssessmentQuestion[],
  filter: QuestionSelectionFilter
): AssessmentQuestion[] {
  const excludeSet = new Set(filter.excludeIds ?? []);

  let pool = bank.filter((q) => {
    if (!q.isActive) return false;
    if (excludeSet.has(q.id)) return false;
    if (filter.examType && q.examType !== filter.examType) return false;
    if (filter.ayushSystem && q.ayushSystem !== filter.ayushSystem) return false;
    if (filter.subject && q.subject !== filter.subject) return false;
    if (filter.topic && q.topic !== filter.topic) return false;
    if (filter.difficulty && q.difficulty !== filter.difficulty) return false;
    if (filter.cognitiveLevel && q.cognitiveLevel !== filter.cognitiveLevel) return false;
    if (filter.questionType && q.questionType !== filter.questionType) return false;
    if (filter.ayushSkillIds && filter.ayushSkillIds.length > 0) {
      const hasSkill = filter.ayushSkillIds.some((sid) => q.ayushSkillIds.includes(sid));
      if (!hasSkill) return false;
    }
    return true;
  });

  pool = shuffleArray(pool);
  return pool.slice(0, filter.count);
}

/**
 * Sanitizes a question for client delivery: removes correctOptionId and explanation.
 */
export function sanitizeForClient(
  q: AssessmentQuestion,
  questionNumber: number,
  totalQuestions: number
) {
  return {
    id: q.id,
    questionNumber,
    totalQuestions,
    questionText: q.questionText,
    scenarioContext: q.scenarioContext,
    options: q.options.map((o) => ({ id: o.id, label: o.label, text: o.text })),
    subject: q.subject,
    topic: q.topic,
    difficulty: q.difficulty,
    cognitiveLevel: q.cognitiveLevel,
    examType: q.examType,
  };
}
