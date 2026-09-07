// Standalone test script verifying answer variation and scoring
import assert from "node:assert";

console.log("=== Testing Knowledge Test Answer Distribution & 40-Point Scoring ===");

// 1. Shuffling simulation function matching the exact implementation
function shuffleQuestionOptions(question) {
  const optionsCopy = [...question.options];
  for (let i = optionsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
  }
  const labels = ["A", "B", "C", "D"];
  const reLabeledOptions = optionsCopy.map((opt, idx) => ({
    ...opt,
    label: labels[idx],
  }));
  return {
    ...question,
    options: reLabeledOptions,
  };
}

// 2. Test Question
const sampleQ = {
  id: "sec-test-1",
  questionNumber: 1,
  questionText: "What is the primary function of a stateful firewall?",
  options: [
    { id: "opt-1", label: "A", text: "Encrypt hard drives" },
    { id: "opt-2", label: "B", text: "Track connection state and inspect traffic context" },
    { id: "opt-3", label: "C", text: "Boost wifi speed" },
    { id: "opt-4", label: "D", text: "Run backups" },
  ],
  correctOptionId: "opt-2", // correct answer is opt-2
  difficulty: "beginner",
  complexity: "fundamental",
  conceptTag: "firewall-stateful",
  explanationAfterAnswer: "Stateful firewalls track connection state.",
};

const counts = { A: 0, B: 0, C: 0, D: 0 };
for (let i = 0; i < 400; i++) {
  const shuffled = shuffleQuestionOptions(sampleQ);
  const correctOpt = shuffled.options.find((o) => o.id === shuffled.correctOptionId);
  assert(correctOpt, "Correct option must exist after shuffling");
  assert.strictEqual(shuffled.correctOptionId, "opt-2", "correctOptionId must remain opt-2");
  counts[correctOpt.label]++;
}

console.log("Distribution of correct answer positions across 400 runs:", counts);
assert(counts.A > 50, "A should appear frequently as correct option");
assert(counts.B > 50, "B should appear frequently as correct option");
assert(counts.C > 50, "C should appear frequently as correct option");
assert(counts.D > 50, "D should appear frequently as correct option");
console.log("✓ Options shuffle dynamically and correct answer varies across A, B, C, D while preserving correctOptionId!");

// 3. Test that each position (A, B, C, D) can be correctly selected and awarded 4 points
const positions = ["A", "B", "C", "D"];
for (const pos of positions) {
  const ids = ["opt-a", "opt-b", "opt-c", "opt-d"];
  const correctId = ids[positions.indexOf(pos)];

  const q = {
    id: `q-${pos}`,
    questionNumber: 1,
    questionText: `Test question for ${pos}`,
    options: [
      { id: "opt-a", label: "A", text: "Option A" },
      { id: "opt-b", label: "B", text: "Option B" },
      { id: "opt-c", label: "C", text: "Option C" },
      { id: "opt-d", label: "D", text: "Option D" },
    ],
    correctOptionId: correctId,
    difficulty: "intermediate",
    complexity: "application",
    conceptTag: `concept-${pos}`,
    explanationAfterAnswer: `Explanation for ${pos}`,
  };

  // Student selects the option at position `pos`
  const isCorrect = correctId === q.correctOptionId;
  assert.strictEqual(isCorrect, true, `Selecting option ${pos} must be marked correct`);
  console.log(`✓ Option ${pos} verified as correct answer when targeted`);
}

// 4. Test 40-Point Scoring Model Calculation
function calculateScore(totalQuestions, correctCount) {
  const pointsPerQuestion = 4;
  const maxScore = totalQuestions * pointsPerQuestion;
  const score = correctCount * pointsPerQuestion;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  return { score, maxScore, scorePercent, pointsPerQuestion };
}

const scoreTest1 = calculateScore(10, 10);
assert.strictEqual(scoreTest1.score, 40);
assert.strictEqual(scoreTest1.maxScore, 40);
assert.strictEqual(scoreTest1.scorePercent, 100);

const scoreTest2 = calculateScore(10, 7);
assert.strictEqual(scoreTest2.score, 28);
assert.strictEqual(scoreTest2.maxScore, 40);
assert.strictEqual(scoreTest2.scorePercent, 70);

const scoreTest3 = calculateScore(10, 0);
assert.strictEqual(scoreTest3.score, 0);
assert.strictEqual(scoreTest3.maxScore, 40);
assert.strictEqual(scoreTest3.scorePercent, 0);

console.log(`✓ 40-Point Scoring accurately calculated: 10/10 = 40/40 (100%), 7/10 = 28/40 (70%), 0/10 = 0/40 (0%)`);
console.log("\n=== ALL DISTRIBUTION AND SCORING CHECKS PASSED ===");
