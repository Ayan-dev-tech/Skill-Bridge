/**
 * Skill-Bridge — Assessment Scorer
 * Deterministic scoring for AssessmentAttempts.
 * No AI scoring. MCQ: correct/incorrect, no negative marking.
 * Produces skill-level and subject/topic breakdowns for Skill Gap Engine connection.
 */

import {
  AssessmentQuestion,
  AssessmentScoringResult,
  SkillPerformanceSummary,
  QuestionResponse,
} from "./types";
import { AYUSH_SKILL_CATALOG, AyushSkillDefinition } from "@/lib/ayush/types";

const POINTS_PER_QUESTION = 4; // Consistent with existing test-scorer.ts

/**
 * Scores a completed attempt.
 * Called server-side only — questions with correctOptionIds are available here.
 */
export function scoreAssessmentAttempt(
  questions: AssessmentQuestion[],
  responses: Record<string, QuestionResponse>
): AssessmentScoringResult {
  const totalQuestions = questions.length;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  // Skill performance aggregation
  const skillMap: Record<string, { correct: number; total: number; skillDef: AyushSkillDefinition | null }> = {};
  // Subject breakdown
  const subjectMap: Record<string, { correct: number; total: number }> = {};
  // Topic breakdown
  const topicMap: Record<string, { correct: number; total: number }> = {};

  for (const q of questions) {
    const response = responses[q.id];
    const isAttempted = response?.selectedOptionId != null;
    const isCorrect = isAttempted && response.selectedOptionId === q.correctOptionId;

    if (!isAttempted) {
      unattemptedCount++;
    } else if (isCorrect) {
      correctCount++;
    } else {
      incorrectCount++;
    }

    // Subject
    if (!subjectMap[q.subject]) subjectMap[q.subject] = { correct: 0, total: 0 };
    subjectMap[q.subject].total++;
    if (isCorrect) subjectMap[q.subject].correct++;

    // Topic
    if (!topicMap[q.topic]) topicMap[q.topic] = { correct: 0, total: 0 };
    topicMap[q.topic].total++;
    if (isCorrect) topicMap[q.topic].correct++;

    // Skill mapping
    for (const skillId of q.ayushSkillIds) {
      if (!skillMap[skillId]) {
        const def = AYUSH_SKILL_CATALOG.find((s) => s.skillId === skillId) ?? null;
        skillMap[skillId] = { correct: 0, total: 0, skillDef: def };
      }
      skillMap[skillId].total++;
      if (isCorrect) skillMap[skillId].correct++;
    }
  }

  const maxScore = totalQuestions * POINTS_PER_QUESTION;
  const score = correctCount * POINTS_PER_QUESTION;
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Build skill performance summary
  const skillPerformance: Record<string, SkillPerformanceSummary> = {};
  for (const [skillId, data] of Object.entries(skillMap)) {
    skillPerformance[skillId] = {
      ayushSkillId: skillId,
      skillName: data.skillDef?.skillName ?? skillId,
      skillCategory: data.skillDef?.category ?? "Industry Skills",
      questionCount: data.total,
      correctCount: data.correct,
      accuracyPercent: data.total > 0 ? Math.round((data.correct / data.total) * 100) : null,
    };
  }

  const subjectBreakdown = Object.entries(subjectMap).map(([subject, d]) => ({
    subject,
    total: d.total,
    correct: d.correct,
    accuracyPercent: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0,
  }));

  const topicBreakdown = Object.entries(topicMap).map(([topic, d]) => ({
    topic,
    total: d.total,
    correct: d.correct,
    accuracyPercent: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0,
  }));

  return {
    score,
    maxScore,
    scorePercent,
    correctCount,
    incorrectCount,
    unattemptedCount,
    totalQuestions,
    skillPerformance,
    subjectBreakdown,
    topicBreakdown,
    completedAt: new Date().toISOString(),
  };
}
