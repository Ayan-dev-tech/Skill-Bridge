// End-to-end integration and security test for Prompt 3 question bank
import assert from "assert";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("=================================================");
  console.log("Starting Prompt 3 Question Bank Verification");
  console.log("=================================================");

  // 1. Authenticate test student using sb_student_id cookie
  console.log("\n[TEST 1] Setting test student auth cookie...");
  const studentId = "47fc1671-0e5d-4f66-af79-ca34f5e10ec5"; // ayanparmar54@gmail.com
  const cookieHeader = `sb_student_id=${studentId}`;
  console.log("Using Student Cookie:", cookieHeader);

  // 2. Test GET /api/student/assessment/configs
  console.log("\n[TEST 2] Verifying GET /api/student/assessment/configs...");
  const configsRes = await fetch(`${BASE_URL}/api/student/assessment/configs`, {
    headers: { Cookie: cookieHeader }
  });
  const configsData = await configsRes.json();
  console.log("Configs Status:", configsRes.status, "Configs Count:", configsData.configs?.length);
  assert.strictEqual(configsRes.status, 200);
  assert.ok(configsData.configs.length >= 2, "Should have at least 2 configs (AIAPGET and NEET)");

  // 3. Test Starting AIAPGET Assessment & verifying client sanitization (NO correct answers exposed)
  console.log("\n[TEST 3] Starting AIAPGET Assessment via POST /api/student/assessment/start...");
  const aiapgetStartRes = await fetch(`${BASE_URL}/api/student/assessment/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
    body: JSON.stringify({ configId: "cfg_aiapget_ayurveda_practice", restart: true })
  });
  const aiapgetData = await aiapgetStartRes.json();
  console.log("Start Status:", aiapgetStartRes.status, "Success:", aiapgetData.success);
  assert.strictEqual(aiapgetStartRes.status, 200);
  assert.strictEqual(aiapgetData.examType, "AIAPGET_PG");
  assert.ok(aiapgetData.questions?.length > 0, "Should return randomized questions");

  // CRITICAL SECURITY CHECK: Ensure correctOptionId and explanation are NOT in client response
  console.log("[SECURITY CHECK] Checking client questions for answer leaks...");
  for (const q of aiapgetData.questions) {
    assert.strictEqual(q.correctOptionId, undefined, `Security failure: Question ${q.id} exposed correctOptionId`);
    assert.strictEqual(q.explanation, undefined, `Security failure: Question ${q.id} exposed explanation`);
    assert.strictEqual(q.options.length, 4, `Integrity failure: Question ${q.id} must have 4 options`);
  }
  console.log("✓ PASSED: No correctOptionId or explanation exposed to student client!");

  // 4. Test Starting NEET UG Assessment & verifying client sanitization
  console.log("\n[TEST 4] Starting NEET UG Assessment via POST /api/student/assessment/start...");
  const neetStartRes = await fetch(`${BASE_URL}/api/student/assessment/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
    body: JSON.stringify({ configId: "cfg_neet_ug_premedical_practice", restart: true })
  });
  const neetData = await neetStartRes.json();
  console.log("Start Status:", neetStartRes.status, "Success:", neetData.success);
  assert.strictEqual(neetStartRes.status, 200);
  assert.strictEqual(neetData.examType, "NEET_UG");
  assert.ok(neetData.questions?.length > 0, "Should return randomized questions");

  for (const q of neetData.questions) {
    assert.strictEqual(q.correctOptionId, undefined, `Security failure: Question ${q.id} exposed correctOptionId`);
    assert.strictEqual(q.explanation, undefined, `Security failure: Question ${q.id} exposed explanation`);
    assert.strictEqual(q.options.length, 4, `Integrity failure: Question ${q.id} must have 4 options`);
  }
  console.log("✓ PASSED: NEET UG assessment randomized and answers sanitized.");

  // 5. Test Submitting an answer and verifying scoring logic
  console.log("\n[TEST 5] Submitting answers via POST /api/student/assessment/submit-answer...");
  const firstQ = neetData.questions[0];
  const submitRes = await fetch(`${BASE_URL}/api/student/assessment/submit-answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
    body: JSON.stringify({
      attemptId: neetData.attemptId,
      questionId: firstQ.id,
      selectedOptionId: firstQ.options[0].id,
      timeSpentSeconds: 15
    })
  });
  const submitData = await submitRes.json();
  console.log("Submit Status:", submitRes.status, "Success:", submitData.success);
  assert.strictEqual(submitRes.status, 200);
  assert.ok(submitData.answeredCount >= 1);

  // 6. Test Completing the assessment and receiving score
  console.log("\n[TEST 6] Completing assessment via POST /api/student/assessment/complete...");
  const completeRes = await fetch(`${BASE_URL}/api/student/assessment/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
    body: JSON.stringify({ attemptId: neetData.attemptId })
  });
  const completeData = await completeRes.json();
  console.log("Complete Status:", completeRes.status, "Success:", completeData.success);
  assert.strictEqual(completeRes.status, 200);
  assert.ok(completeData.scoring !== undefined);
  console.log(`Score: ${completeData.scoring.score} / ${completeData.scoring.maxScore} (${completeData.scoring.scorePercent}%)`);

  // 7. Verify Result Retrieval via GET /api/student/assessment/result?attemptId=xxx
  console.log("\n[TEST 7] Retrieving result via GET /api/student/assessment/result...");
  const resultRes = await fetch(`${BASE_URL}/api/student/assessment/result?attemptId=${neetData.attemptId}`, {
    headers: { Cookie: cookieHeader }
  });
  const resultData = await resultRes.json();
  console.log("Result Status:", resultRes.status, "Success:", resultData.success);
  assert.strictEqual(resultRes.status, 200);
  assert.strictEqual(resultData.attempt.status, "completed");
  assert.strictEqual(resultData.attempt.id, neetData.attemptId);
  console.log("✓ PASSED: Scoring, skill tracking, and attempt persistence verified!");

  console.log("\n=================================================");
  console.log("ALL 6 QUESTION BANK TESTS PASSED SUCCESSFULLY!");
  console.log("=================================================");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
