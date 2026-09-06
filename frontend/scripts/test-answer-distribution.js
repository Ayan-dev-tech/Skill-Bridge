// Test script verifying answer distribution and varied correct answer positions
const { shuffleQuestionOptions } = require('../src/lib/knowledge-test/ai-question-generator.ts');
const { calculateTestResult } = require('../src/lib/knowledge-test/test-scorer.ts');
const assert = require('assert');

console.log('=== Verifying Question Answer Variation and Scoring ===');

// 1. Create a test question with 4 options
const testQ = {
  id: 'test-q1',
  questionNumber: 1,
  questionText: 'Which protocol provides encrypted transport communication?',
  options: [
    { id: 'opt-tls', label: 'A', text: 'TLS / HTTPS' },
    { id: 'opt-http', label: 'B', text: 'HTTP' },
    { id: 'opt-ftp', label: 'C', text: 'Plain FTP' },
    { id: 'opt-telnet', label: 'D', text: 'Telnet' },
  ],
  correctOptionId: 'opt-tls', // correct answer is TLS
  difficulty: 'beginner',
  complexity: 'fundamental',
  conceptTag: 'tls-transport',
  explanationAfterAnswer: 'TLS encrypts data in transit.',
};

// 2. Test that regardless of where 'opt-tls' moves in shuffling, selecting 'opt-tls' is ALWAYS correct!
const labelCounts = { A: 0, B: 0, C: 0, D: 0 };
for (let i = 0; i < 200; i++) {
  const shuffled = shuffleQuestionOptions(testQ);
  // Find which label the correct option got
  const correctOpt = shuffled.options.find(o => o.id === shuffled.correctOptionId);
  assert(correctOpt, 'Correct option must exist after shuffling');
  assert.strictEqual(shuffled.correctOptionId, 'opt-tls', 'correctOptionId must be preserved');
  labelCounts[correctOpt.label]++;
}

console.log('Label distribution for correct answer over 200 shuffles:', labelCounts);
assert(labelCounts.A > 20, 'A should appear as correct answer');
assert(labelCounts.B > 20, 'B should appear as correct answer');
assert(labelCounts.C > 20, 'C should appear as correct answer');
assert(labelCounts.D > 20, 'D should appear as correct answer');
console.log('✓ Shuffling generates varied correct answer labels (A, B, C, D) while preserving correctOptionId');

// 3. Verify that each position (A, B, C, D) can be selected and correctly scored
const positions = ['A', 'B', 'C', 'D'];
for (const pos of positions) {
  // Construct a question where the correct option is specifically at position pos
  const optIds = ['id-a', 'id-b', 'id-c', 'id-d'];
  const posIdx = positions.indexOf(pos);
  const correctId = optIds[posIdx];

  const q = {
    id: `q-pos-${pos}`,
    questionNumber: 1,
    questionText: `Question with correct answer at ${pos}`,
    options: [
      { id: 'id-a', label: 'A', text: 'Option A' },
      { id: 'id-b', label: 'B', text: 'Option B' },
      { id: 'id-c', label: 'C', text: 'Option C' },
      { id: 'id-d', label: 'D', text: 'Option D' },
    ],
    correctOptionId: correctId,
    difficulty: 'intermediate',
    complexity: 'application',
    conceptTag: `test-concept-${pos}`,
    explanationAfterAnswer: `Explanation for ${pos}`,
  };

  // Test correct selection
  const answerRecordCorrect = {
    questionId: q.id,
    questionNumber: 1,
    selectedOptionId: correctId,
    correctOptionId: correctId,
    isCorrect: correctId === q.correctOptionId,
    timeSpentMs: 1000,
    conceptTag: q.conceptTag,
    complexity: q.complexity,
  };

  assert.strictEqual(answerRecordCorrect.isCorrect, true, `Selecting option ${pos} must be marked correct`);

  // Test score calculation with this answer
  const result = calculateTestResult({
    sessionId: 'test-session',
    studentId: 'test-student',
    domainId: 'security',
    domainName: 'Cybersecurity',
    specificInterest: 'Network Defense',
    difficulty: 'intermediate',
    questions: [q],
    answers: [answerRecordCorrect],
  });

  assert.strictEqual(result.correctCount, 1, `Correct count should be 1 for position ${pos}`);
  assert.strictEqual(result.score, 4, `Score should be 4 (1 * 4 pts) for position ${pos}`);
  assert.strictEqual(result.maxScore, 4, `Max score should be 4 (1 question * 4 pts)`);
  assert.strictEqual(result.scorePercent, 100, `Score percent should be 100%`);
  console.log(`✓ Option ${pos} correctly scored as correct answer (Score: ${result.score}/${result.maxScore})`);
}

// 4. Test 10-question 40-point scoring
const tenQuestions = [];
const tenAnswers = [];
for (let i = 1; i <= 10; i++) {
  const correctPos = ['A', 'B', 'C', 'D'][(i - 1) % 4];
  const q = {
    id: `q-${i}`,
    questionNumber: i,
    questionText: `Question ${i} with varied answer ${correctPos}`,
    options: [
      { id: `q${i}-a`, label: 'A', text: 'A' },
      { id: `q${i}-b`, label: 'B', text: 'B' },
      { id: `q${i}-c`, label: 'C', text: 'C' },
      { id: `q${i}-d`, label: 'D', text: 'D' },
    ],
    correctOptionId: `q${i}-${correctPos.toLowerCase()}`,
    difficulty: 'beginner',
    complexity: 'fundamental',
    conceptTag: `concept-${i}`,
    explanationAfterAnswer: 'Exp',
  };
  tenQuestions.push(q);

  // Student gets 8 out of 10 right
  const isStudentCorrect = i <= 8;
  const chosenId = isStudentCorrect
    ? q.correctOptionId
    : `q${i}-${correctPos === 'A' ? 'b' : 'a'}`;

  tenAnswers.push({
    questionId: q.id,
    questionNumber: i,
    selectedOptionId: chosenId,
    correctOptionId: q.correctOptionId,
    isCorrect: isStudentCorrect,
    timeSpentMs: 2000,
    conceptTag: q.conceptTag,
    complexity: q.complexity,
  });
}

const finalResult = calculateTestResult({
  sessionId: 'sess-10q',
  studentId: 'stu-1',
  domainId: 'web',
  domainName: 'Web Systems',
  specificInterest: 'Full Stack',
  difficulty: 'beginner',
  questions: tenQuestions,
  answers: tenAnswers,
});

assert.strictEqual(finalResult.totalQuestions, 10, 'Total questions should be 10');
assert.strictEqual(finalResult.correctCount, 8, 'Correct count should be 8');
assert.strictEqual(finalResult.score, 32, 'Score should be 32 out of 40 (8 * 4)');
assert.strictEqual(finalResult.maxScore, 40, 'Max score should be 40 (10 * 4)');
assert.strictEqual(finalResult.scorePercent, 80, 'Score percent should be 80%');
assert.strictEqual(finalResult.knowledgeLevel, 'Strong', 'Tier should be Strong');

console.log(`\n✓ 10-Question 40-Point Scoring Verified: ${finalResult.score}/${finalResult.maxScore} (${finalResult.scorePercent}%) - Tier: ${finalResult.knowledgeLevel}`);
console.log('=== ALL ANSWER VARIATION AND SCORING TESTS PASSED! ===');
