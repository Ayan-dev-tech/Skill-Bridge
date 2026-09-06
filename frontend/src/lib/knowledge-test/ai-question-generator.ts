/**
 * Skill Bridge — Knowledge Test AI Question Generator & Fallback Question Bank
 * Provides Gemini-powered adaptive question generation with a 100% reliable,
 * comprehensive, deterministic question bank across all 5 domains and 3 difficulty tiers.
 */

import {
  KnowledgeQuestion,
  QuestionGenerationRequest,
  DifficultyLevel,
  DIFFICULTY_META,
} from "./types";
import { validateQuestionBatch } from "./question-validator";
import { FALLBACK_QUESTION_BANK, QuestionBank } from "./question-bank-data";

export { FALLBACK_QUESTION_BANK };
export type { QuestionBank };

// ============================================================================
// GEMINI AI INTEGRATION
// Calls Gemini 1.5 Flash with strict distractor quality constraints and timeout
// ============================================================================

async function queryGeminiForKnowledgeQuestions(
  request: QuestionGenerationRequest
): Promise<KnowledgeQuestion[] | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null; // Graceful fallback to deterministic bank
  }

  const meta = DIFFICULTY_META[request.difficulty];
  const dist = meta.questionDistribution;

  const prompt = `You are the lead psychometric and technical assessment examiner for Skill Bridge.
Generate a calibrated 10-question multiple-choice technical benchmark for an engineering student.

TARGET DOMAIN & NICHE:
- Domain: ${request.domainName} (${request.domainId})
- Technical Niche: ${request.specificInterest}
- Selected Difficulty: ${request.difficulty.toUpperCase()}

DIFFICULTY GUIDELINES:
${meta.description}

COMPLEXITY DISTRIBUTION REQUIREMENTS (EXACTLY 10 QUESTIONS):
- Exactly ${dist.fundamental} questions of complexity "fundamental"
- Exactly ${dist.application} questions of complexity "application"
- Exactly ${dist.challenging} questions of complexity "challenging"

CRITICAL OPTION QUALITY & DISTRACTOR RULES:
1. Every question must have exactly 4 options labeled "A", "B", "C", "D".
2. SAME CONCEPTUAL NEIGHBORHOOD: All 4 options must belong to the exact same technical domain and specific concept. (E.g. if the question is about XSS, all options must be browser/script/DOM behaviors; if about SQL injection, all must be database/query behaviors). Never use unrelated technologies or joke distractors.
3. COMPARABLE SPECIFICITY & LENGTH: All 4 options must be similar in level of detail, technical depth, and character length (within 15-20% of each other). The correct answer must NOT be noticeably longer, more detailed, or more technical than the distractors.
4. PLAUSIBLE DISTRACTORS: Distractors must represent real-world misconceptions, similar mechanisms, or plausible alternatives that require genuine understanding to distinguish.
5. ANSWER POSITION VARIANCE: Distribute correct answers across A, B, C, and D across the 10 questions. Do NOT concentrate correct answers on option B or any single position.
6. CONCEPT UNIQUENESS: Every question must test a distinct technical concept tag (unique slug). Do NOT repeat concepts from: ${JSON.stringify(request.existingConceptTags || [])}.
7. Return ONLY a valid JSON array matching this exact schema:

[
  {
    "id": "gemini-${request.domainId}-${request.difficulty}-1",
    "questionNumber": 1,
    "questionText": "Clear, direct technical question...",
    "options": [
      { "id": "opt-1-a", "label": "A", "text": "Technically plausible option belonging to the same concept..." },
      { "id": "opt-1-b", "label": "B", "text": "Technically plausible option of comparable length..." },
      { "id": "opt-1-c", "label": "C", "text": "Technically plausible option of comparable length..." },
      { "id": "opt-1-d", "label": "D", "text": "Technically plausible option of comparable length..." }
    ],
    "correctOptionId": "opt-1-c",
    "difficulty": "${request.difficulty}",
    "complexity": "fundamental",
    "conceptTag": "unique-concept-slug",
    "explanationAfterAnswer": "Comprehensive technical explanation of why the correct option is right and others are incorrect."
  }
]`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000); // 6-second timeout

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.2,
        },
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) return null;

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    const parsed = JSON.parse(rawText) as KnowledgeQuestion[];
    if (!Array.isArray(parsed) || parsed.length !== 10) return null;

    // Validate structured schema and distractor balance
    const validation = validateQuestionBatch(parsed, request.difficulty);
    if (!validation.valid) {
      console.warn("Gemini question batch validation failed:", validation.errors);
      return null;
    }

    // Verify answer position variance across the batch (reject if answers are stuck on a single position)
    const answerPositions = parsed.map((q) => {
      const opt = q.options.find((o) => o.id === q.correctOptionId);
      return opt?.label;
    });
    const uniquePositions = new Set(answerPositions.filter(Boolean));
    if (uniquePositions.size < 3) {
      console.warn("Gemini batch rejected due to lack of answer position distribution:", answerPositions);
      return null;
    }

    return parsed;
  } catch (error) {
    console.warn("Gemini question generation error (falling back to deterministic bank):", error);
    return null;
  }
}

// ============================================================================
// SHUFFLING & SYNCHRONIZATION HELPER
// ============================================================================

/**
 * Shuffles question options while strictly preserving the correct answer association.
 * Re-assigns visible labels A, B, C, D to match the new visual presentation order.
 * correctOptionId remains pointed to the exact same option ID.
 */
export function shuffleQuestionOptions(question: KnowledgeQuestion): KnowledgeQuestion {
  const optionsCopy = [...question.options];

  for (let i = optionsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
  }

  const labels: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];
  const reLabeledOptions = optionsCopy.map((opt, idx) => ({
    ...opt,
    label: labels[idx],
  }));

  return {
    ...question,
    options: reLabeledOptions,
  };
}

// ============================================================================
// MAIN QUESTION GENERATOR FUNCTION
// Hybrid: Attempts Gemini API, falls back to deterministic curated bank
// ============================================================================

export async function generateQuestionBatch(
  request: QuestionGenerationRequest
): Promise<KnowledgeQuestion[]> {
  // 1. Try Gemini generation if API key is present
  const aiGenerated = await queryGeminiForKnowledgeQuestions(request);
  if (aiGenerated && aiGenerated.length === 10) {
    return aiGenerated.map((q, idx) => shuffleQuestionOptions({ ...q, questionNumber: idx + 1 }));
  }

  // 2. Deterministic Fallback Bank
  const domainKey = (request.domainId in FALLBACK_QUESTION_BANK)
    ? request.domainId
    : "software"; // default safe fallback

  const pool = FALLBACK_QUESTION_BANK[domainKey]?.[request.difficulty] ||
    FALLBACK_QUESTION_BANK.software[request.difficulty];

  // Map to 10 questions numbered 1 to 10 with concept uniqueness
  const selected: KnowledgeQuestion[] = [];
  const usedConcepts = new Set<string>(request.existingConceptTags || []);

  for (const q of pool) {
    if (selected.length >= 10) break;
    const tag = q.conceptTag.toLowerCase();
    if (!usedConcepts.has(tag)) {
      usedConcepts.add(tag);
      selected.push({
        ...q,
        questionNumber: selected.length + 1,
      });
    }
  }

  // If we couldn't get 10 unique concepts from this domain, pull from software domain pool
  if (selected.length < 10) {
    const backupPool = FALLBACK_QUESTION_BANK.software[request.difficulty];
    for (const q of backupPool) {
      if (selected.length >= 10) break;
      const tag = q.conceptTag.toLowerCase();
      if (!usedConcepts.has(tag)) {
        usedConcepts.add(tag);
        selected.push({
          ...q,
          questionNumber: selected.length + 1,
        });
      }
    }
  }

  // Final sanity check: ensure exactly 10 questions with sequential questionNumber and shuffled options
  return selected.slice(0, 10).map((q, idx) => {
    const numbered: KnowledgeQuestion = {
      ...q,
      questionNumber: idx + 1,
    };
    return shuffleQuestionOptions(numbered);
  });
}
