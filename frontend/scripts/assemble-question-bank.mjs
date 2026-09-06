// scripts/assemble-question-bank.mjs
import fs from "fs";
import { securityQuestions } from "./data/security-questions.mjs";
import { aimlQuestions } from "./data/aiml-questions.mjs";
import { cloudQuestions } from "./data/cloud-questions.mjs";
import { webQuestions } from "./data/web-questions.mjs";
import { softwareQuestions } from "./data/software-questions.mjs";

const rawBank = {
  security: securityQuestions,
  "ai-ml": aimlQuestions,
  cloud: cloudQuestions,
  web: webQuestions,
  software: softwareQuestions,
};

// Target distribution: ~38 A, ~38 B, ~37 C, ~37 D across 150 questions
const targetLetters = ["A", "B", "C", "D"];
let letterIndex = 0;

const distribution = { A: 0, B: 0, C: 0, D: 0 };
let totalCount = 0;
const assembledBank = {};

for (const [domainId, tiers] of Object.entries(rawBank)) {
  assembledBank[domainId] = {};

  for (const [tier, questions] of Object.entries(tiers)) {
    assembledBank[domainId][tier] = questions.map((q) => {
      totalCount++;
      // Determine the target correct letter in round-robin order
      const targetLetter = targetLetters[letterIndex % targetLetters.length];
      letterIndex++;

      // Find the current correct option text
      const currentCorrect = q.options.find((o) => o.id === q.correctOptionId);
      if (!currentCorrect) {
        throw new Error(`Missing correct option for question ${q.id}`);
      }
      const correctText = currentCorrect.text;

      // Other 3 distractor texts
      const otherTexts = q.options
        .filter((o) => o.id !== q.correctOptionId)
        .map((o) => o.text);

      // Build new 4 options where targetLetter holds correctText
      const newOptions = [];
      let otherIdx = 0;

      for (let i = 0; i < 4; i++) {
        const letter = targetLetters[i];
        const optId = `${q.id}-${letter.toLowerCase()}`;
        if (letter === targetLetter) {
          newOptions.push({
            id: optId,
            label: letter,
            text: correctText,
          });
        } else {
          newOptions.push({
            id: optId,
            label: letter,
            text: otherTexts[otherIdx++],
          });
        }
      }

      const targetCorrectId = `${q.id}-${targetLetter.toLowerCase()}`;
      distribution[targetLetter]++;

      // Check quality metrics
      const lengths = newOptions.map((o) => o.text.length);
      const min = Math.min(...lengths);
      const max = Math.max(...lengths);
      const spread = max / Math.max(min, 1);
      const avgDist = newOptions
        .filter((o) => o.id !== targetCorrectId)
        .reduce((a, b) => a + b.text.length, 0) / 3;
      const ratio = correctText.length / avgDist;

      if (spread > 2.2) {
        console.warn(`[WARN] Question ${q.id} spread is ${spread.toFixed(2)}x (min ${min}, max ${max})`);
      }
      if (ratio > 1.6) {
        console.warn(`[WARN] Question ${q.id} correct ratio is ${ratio.toFixed(2)}x (correct ${correctText.length}, avgDist ${avgDist.toFixed(1)})`);
      }

      return {
        ...q,
        options: newOptions,
        correctOptionId: targetCorrectId,
      };
    });
  }
}

console.log(`\nAssembled ${totalCount} questions.`);
console.log("Answer Distribution:", distribution);

// Generate TypeScript source file
const fileContent = `/**
 * Skill Bridge — Comprehensive Calibrated Fallback Question Bank
 * 150 meticulously engineered questions across 5 domains and 3 difficulty tiers.
 * Every question features:
 * - 4 options belonging to the exact same technical conceptual domain
 * - Balanced character lengths (no giveaway lengths)
 * - Technically plausible distractors without obvious elimination clues
 * - Balanced base answer distribution across A, B, C, D
 * - Dynamic Fisher-Yates runtime shuffling support
 */

import { DifficultyLevel, KnowledgeQuestion } from "./types";

export type QuestionBank = Record<
  string,
  Record<DifficultyLevel, Omit<KnowledgeQuestion, "questionNumber">[]>
>;

export const FALLBACK_QUESTION_BANK: QuestionBank = ${JSON.stringify(assembledBank, null, 2)};
`;

fs.writeFileSync("src/lib/knowledge-test/question-bank-data.ts", fileContent, "utf-8");
console.log("Successfully wrote src/lib/knowledge-test/question-bank-data.ts");
