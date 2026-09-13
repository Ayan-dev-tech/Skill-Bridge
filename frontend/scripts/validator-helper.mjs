// Validation helper mimicking validator.ts
export function validateAssessmentQuestion(q) {
  const errors = [];
  if (!q.id || typeof q.id !== "string" || q.id.trim().length === 0) {
    errors.push("Missing question id");
  }
  if (!q.questionText || q.questionText.trim().length < 10) {
    errors.push("Question text is missing or too short (min 10 chars)");
  }
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    errors.push(`Expected exactly 4 options, got ${q.options?.length ?? 0}`);
  } else {
    const labels = q.options.map((o) => o.label);
    if (!["A", "B", "C", "D"].every((l) => labels.includes(l))) {
      errors.push("Options must have labels A, B, C, D");
    }
    const optionIds = new Set();
    const optionTexts = new Set();
    for (const opt of q.options) {
      if (!opt.text || opt.text.trim().length < 1) {
        errors.push(`Option ${opt.label} text is missing`);
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
  if (!q.correctOptionId) {
    errors.push("Missing correctOptionId");
  } else if (q.options && !q.options.find((o) => o.id === q.correctOptionId)) {
    errors.push(`correctOptionId '${q.correctOptionId}' does not match any option`);
  }
  if (!q.explanation || q.explanation.trim().length < 10) {
    errors.push("Missing or insufficient explanation (min 10 chars)");
  }
  if (!["NEET_UG", "AIAPGET_PG", "PRACTICAL_SCENARIO", "INDUSTRY_SKILL"].includes(q.examType)) {
    errors.push(`Invalid examType: ${q.examType}`);
  }
  if (!["MCQ", "PRACTICAL_SCENARIO"].includes(q.questionType)) {
    errors.push(`Invalid questionType: ${q.questionType}`);
  }
  if (!q.subject || q.subject.trim().length === 0) {
    errors.push("Missing subject");
  }
  if (!q.topic || q.topic.trim().length === 0) {
    errors.push("Missing topic");
  }
  if (!["Easy", "Medium", "Hard"].includes(q.difficulty)) {
    errors.push(`Invalid difficulty: ${q.difficulty}`);
  }
  if (!["Knowledge", "Understanding", "Application", "Reasoning"].includes(q.cognitiveLevel)) {
    errors.push(`Invalid cognitiveLevel: ${q.cognitiveLevel}`);
  }
  if (!q.conceptTag || q.conceptTag.trim().length < 2) {
    errors.push("Missing or invalid conceptTag");
  }
  return { valid: errors.length === 0, errors };
}
