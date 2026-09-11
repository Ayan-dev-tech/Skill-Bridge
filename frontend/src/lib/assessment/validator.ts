/**
 * Skill-Bridge — Assessment Question Validator
 * Validates AssessmentQuestion structs before they become active.
 * Reuses existing validation patterns from knowledge-test/question-validator.ts
 */

import {
  AssessmentQuestion,
  AssessmentValidationResult,
  EXAM_TYPES,
  QUESTION_TYPES,
  ASSESSMENT_DIFFICULTIES,
  COGNITIVE_LEVELS,
} from "./types";

/**
 * Validates a single AssessmentQuestion.
 * Invalid questions must not be set isActive = true.
 */
export function validateAssessmentQuestion(q: AssessmentQuestion): AssessmentValidationResult {
  const errors: string[] = [];

  // 1. Required text
  if (!q.id || typeof q.id !== "string" || q.id.trim().length === 0) {
    errors.push("Missing question id");
  }
  if (!q.questionText || q.questionText.trim().length < 10) {
    errors.push("Question text is missing or too short (min 10 chars)");
  }

  // 2. Exactly four options A B C D
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    errors.push(`Expected exactly 4 options, got ${q.options?.length ?? 0}`);
  } else {
    const labels = q.options.map((o) => o.label);
    if (!["A", "B", "C", "D"].every((l) => labels.includes(l as "A" | "B" | "C" | "D"))) {
      errors.push("Options must have labels A, B, C, D");
    }

    const optionIds = new Set<string>();
    const optionTexts = new Set<string>();
    for (const opt of q.options) {
      if (!opt.text || opt.text.trim().length < 3) {
        errors.push(`Option ${opt.label} text is missing or too short`);
      }
      if (opt.id) {
        if (optionIds.has(opt.id)) errors.push(`Duplicate option ID: ${opt.id}`);
        optionIds.add(opt.id);
      }
      const norm = opt.text?.trim().toLowerCase();
      if (norm) {
        if (optionTexts.has(norm)) errors.push(`Duplicate option text: "${opt.text}"`);
        optionTexts.add(norm);
      }
    }
  }

  // 3. Exactly one correct answer
  if (!q.correctOptionId) {
    errors.push("Missing correctOptionId");
  } else if (q.options && !q.options.find((o) => o.id === q.correctOptionId)) {
    errors.push(`correctOptionId '${q.correctOptionId}' does not match any option`);
  }

  // 4. Explanation required
  if (!q.explanation || q.explanation.trim().length < 10) {
    errors.push("Missing or insufficient explanation (min 10 chars)");
  }

  // 5. Exam type
  if (!EXAM_TYPES.includes(q.examType as (typeof EXAM_TYPES)[number])) {
    errors.push(`Invalid examType: ${q.examType}`);
  }

  // 6. Question type
  if (!QUESTION_TYPES.includes(q.questionType as (typeof QUESTION_TYPES)[number])) {
    errors.push(`Invalid questionType: ${q.questionType}`);
  }

  // 7. Subject and topic
  if (!q.subject || q.subject.trim().length === 0) {
    errors.push("Missing subject");
  }
  if (!q.topic || q.topic.trim().length === 0) {
    errors.push("Missing topic");
  }

  // 8. Difficulty
  if (!ASSESSMENT_DIFFICULTIES.includes(q.difficulty as (typeof ASSESSMENT_DIFFICULTIES)[number])) {
    errors.push(`Invalid difficulty: ${q.difficulty}`);
  }

  // 9. Cognitive level
  if (!COGNITIVE_LEVELS.includes(q.cognitiveLevel as (typeof COGNITIVE_LEVELS)[number])) {
    errors.push(`Invalid cognitiveLevel: ${q.cognitiveLevel}`);
  }

  // 10. Concept tag
  if (!q.conceptTag || q.conceptTag.trim().length < 2) {
    errors.push("Missing or invalid conceptTag");
  }

  // 11. Skill mapping — at least one skill required for PRACTICAL_SCENARIO and INDUSTRY_SKILL
  if (
    (q.examType === "PRACTICAL_SCENARIO" || q.examType === "INDUSTRY_SKILL") &&
    (!q.ayushSkillIds || q.ayushSkillIds.length === 0)
  ) {
    errors.push(`${q.examType} questions must map to at least one AYUSH skill`);
  }

  // 12. Practical scenario must have scenarioContext
  if (q.questionType === "PRACTICAL_SCENARIO" && (!q.scenarioContext || q.scenarioContext.trim().length < 20)) {
    errors.push("PRACTICAL_SCENARIO questions must have a scenarioContext (min 20 chars)");
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validates a batch of questions for an assessment.
 * Checks uniqueness of conceptTags within the batch.
 */
export function validateAssessmentBatch(
  questions: AssessmentQuestion[],
  expectedCount?: number
): AssessmentValidationResult {
  const errors: string[] = [];

  if (expectedCount !== undefined && questions.length !== expectedCount) {
    errors.push(`Expected ${expectedCount} questions, got ${questions.length}`);
  }

  const conceptTags = new Set<string>();
  const questionIds = new Set<string>();

  for (let i = 0; i < questions.length; i++) {
    const result = validateAssessmentQuestion(questions[i]);
    if (!result.valid) {
      errors.push(`Q${i + 1} (${questions[i].id}): ${result.errors.join("; ")}`);
    }

    const tag = questions[i].conceptTag?.toLowerCase().trim();
    if (tag) {
      if (conceptTags.has(tag)) errors.push(`Q${i + 1}: duplicate conceptTag '${tag}'`);
      conceptTags.add(tag);
    }

    const qid = questions[i].id;
    if (questionIds.has(qid)) errors.push(`Duplicate question id '${qid}'`);
    questionIds.add(qid);
  }

  return { valid: errors.length === 0, errors };
}
