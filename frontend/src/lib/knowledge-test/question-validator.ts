/**
 * Skill Bridge — Knowledge Test Question Validator
 * Server-side validation ensuring every question meets schema and difficulty requirements
 * before reaching the student.
 */

import {
  KnowledgeQuestion,
  DifficultyLevel,
  QuestionComplexity,
} from "./types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validates a single question against structural and content requirements.
 */
export function validateQuestion(q: KnowledgeQuestion): ValidationResult {
  const errors: string[] = [];

  // 1. Basic structure
  if (!q.id || typeof q.id !== "string") {
    errors.push("Missing or invalid question id");
  }

  if (!q.questionText || q.questionText.trim().length < 15) {
    errors.push("Question text is missing or too short (min 15 chars)");
  }

  // 2. Options validation
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    errors.push(`Expected exactly 4 options, got ${q.options?.length ?? 0}`);
  } else {
    const labels = q.options.map((o) => o.label);
    if (!labels.includes("A") || !labels.includes("B") || !labels.includes("C") || !labels.includes("D")) {
      errors.push("Options must have labels A, B, C, D");
    }

    const optionIds = new Set<string>();
    const optionTexts = new Set<string>();

    for (const opt of q.options) {
      if (!opt.text || opt.text.trim().length < 5) {
        errors.push(`Option ${opt.label} text is missing or too short`);
      }
      if (opt.id) {
        if (optionIds.has(opt.id)) {
          errors.push(`Duplicate option ID: ${opt.id}`);
        }
        optionIds.add(opt.id);
      }
      const normalizedText = opt.text?.trim().toLowerCase();
      if (normalizedText) {
        if (optionTexts.has(normalizedText)) {
          errors.push(`Duplicate option text: "${opt.text}"`);
        }
        optionTexts.add(normalizedText);
      }
    }

    // Distractor balance: verify options have comparable lengths
    const lengths = q.options.map((o) => (o.text ? o.text.trim().length : 0));
    const minLen = Math.min(...lengths);
    const maxLen = Math.max(...lengths);
    if (minLen > 0 && maxLen / minLen > 2.8) {
      errors.push(`Option lengths vary too drastically (${minLen} to ${maxLen} chars, max/min ratio > 2.8)`);
    }

    // Ensure correct option is not conspicuous by length
    const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
    if (correctOpt && q.options.length === 4) {
      const distractorLengths = q.options
        .filter((o) => o.id !== q.correctOptionId)
        .map((o) => (o.text ? o.text.trim().length : 0));
      const avgDistractor =
        distractorLengths.reduce((a, b) => a + b, 0) / distractorLengths.length;
      if (avgDistractor > 0 && correctOpt.text.trim().length / avgDistractor > 2.2) {
        errors.push(
          `Correct option is disproportionately longer than distractors (${correctOpt.text.trim().length} vs avg ${Math.round(avgDistractor)})`
        );
      }
    }
  }

  // 3. Correct answer validation
  if (!q.correctOptionId) {
    errors.push("Missing correctOptionId");
  } else if (q.options && !q.options.find((o) => o.id === q.correctOptionId)) {
    errors.push(`correctOptionId '${q.correctOptionId}' does not match any option id`);
  }

  // 4. Concept tag
  if (!q.conceptTag || q.conceptTag.trim().length < 2) {
    errors.push("Missing or invalid conceptTag");
  }

  // 5. Explanation
  if (!q.explanationAfterAnswer || q.explanationAfterAnswer.trim().length < 10) {
    errors.push("Missing or insufficient explanation");
  }

  // 6. Difficulty and complexity
  const validDifficulties: DifficultyLevel[] = ["beginner", "intermediate", "advanced"];
  if (!validDifficulties.includes(q.difficulty)) {
    errors.push(`Invalid difficulty: ${q.difficulty}`);
  }

  const validComplexities: QuestionComplexity[] = ["fundamental", "application", "challenging"];
  if (!validComplexities.includes(q.complexity)) {
    errors.push(`Invalid complexity: ${q.complexity}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates a full batch of questions for a test session.
 * Checks individual questions AND cross-question constraints (concept uniqueness).
 */
export function validateQuestionBatch(
  questions: KnowledgeQuestion[],
  expectedDifficulty: DifficultyLevel
): ValidationResult {
  const errors: string[] = [];

  if (questions.length !== 10) {
    errors.push(`Expected 10 questions, got ${questions.length}`);
  }

  // Validate each question individually
  const conceptTags = new Set<string>();
  for (let i = 0; i < questions.length; i++) {
    const qResult = validateQuestion(questions[i]);
    if (!qResult.valid) {
      errors.push(`Q${i + 1}: ${qResult.errors.join("; ")}`);
    }

    // Check difficulty matches
    if (questions[i].difficulty !== expectedDifficulty) {
      errors.push(
        `Q${i + 1}: difficulty is '${questions[i].difficulty}' but expected '${expectedDifficulty}'`
      );
    }

    // Concept uniqueness
    const tag = questions[i].conceptTag?.toLowerCase().trim();
    if (tag && conceptTags.has(tag)) {
      errors.push(`Q${i + 1}: duplicate conceptTag '${tag}'`);
    }
    if (tag) conceptTags.add(tag);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
