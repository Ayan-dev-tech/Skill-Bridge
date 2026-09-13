// End-to-end HTTP API verification test for Prompt 4 student flows
import assert from "assert";

const BASE_URL = "http://localhost:3000";

async function runPrompt4ApiTests() {
  console.log("=================================================");
  console.log("Starting Prompt 4 Student Flow API Verification");
  console.log("=================================================");

  const studentId = "47fc1671-0e5d-4f66-af79-ca34f5e10ec5"; // test authenticated student
  const cookieHeader = `sb_student_id=${studentId}`;

  // 1. GET /api/student/assessment/configs
  console.log("\n[API 1] GET /api/student/assessment/configs");
  const configsRes = await fetch(`${BASE_URL}/api/student/assessment/configs`, {
    headers: { Cookie: cookieHeader },
  });
  const configsData = await configsRes.json();
  assert.strictEqual(configsRes.status, 200);
  assert.strictEqual(configsData.success, true);
  console.log("Configs retrieved:", configsData.configs.map((c) => `${c.examType} (${c.name})`));
  assert.ok(configsData.configs.some((c) => c.examType === "NEET_UG"));
  assert.ok(configsData.configs.some((c) => c.examType === "AIAPGET_PG"));
  assert.ok(configsData.configs.some((c) => c.examType === "PRACTICAL_SCENARIO"));

  // 2. Start Practical Scenario Assessment
  console.log("\n[API 2] POST /api/student/assessment/start with PRACTICAL_SCENARIO");
  const practicalConfig = configsData.configs.find((c) => c.examType === "PRACTICAL_SCENARIO");
  const startRes = await fetch(`${BASE_URL}/api/student/assessment/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
    body: JSON.stringify({ configId: practicalConfig.id, restart: true }),
  });
  const startData = await startRes.json();
  assert.strictEqual(startRes.status, 200);
  assert.strictEqual(startData.success, true);
  assert.strictEqual(startData.examType, "PRACTICAL_SCENARIO");
  assert.ok(startData.questions.length > 0);

  // Verify answer secrecy
  for (const q of startData.questions) {
    assert.strictEqual(q.correctOptionId, undefined, `Security leak in question ${q.id}`);
    assert.strictEqual(q.explanation, undefined, `Explanation leaked in question ${q.id}`);
    assert.strictEqual(q.options.length, 4, `Question ${q.id} must have 4 options`);
  }
  console.log(`✓ Started attempt ${startData.attemptId} with ${startData.questions.length} sanitized questions`);

  // 3. Submit an answer
  console.log("\n[API 3] POST /api/student/assessment/submit-answer");
  const firstQ = startData.questions[0];
  const submitRes = await fetch(`${BASE_URL}/api/student/assessment/submit-answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
    body: JSON.stringify({
      attemptId: startData.attemptId,
      questionId: firstQ.id,
      selectedOptionId: firstQ.options[0].id,
      timeSpentMs: 4000,
    }),
  });
  const submitData = await submitRes.json();
  assert.strictEqual(submitRes.status, 200);
  assert.strictEqual(submitData.success, true);
  console.log("✓ Answer submitted. Answered count:", submitData.answeredCount);

  // 4. Complete Assessment
  console.log("\n[API 4] POST /api/student/assessment/complete");
  const completeRes = await fetch(`${BASE_URL}/api/student/assessment/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
    body: JSON.stringify({ attemptId: startData.attemptId }),
  });
  const completeData = await completeRes.json();
  assert.strictEqual(completeRes.status, 200);
  assert.strictEqual(completeData.success, true);
  assert.ok(completeData.scoring !== undefined);
  assert.ok(completeData.passport !== undefined, "Complete route returned updated AYUSH Skill Passport");
  console.log(`✓ Scored: ${completeData.scoring.score} / ${completeData.scoring.maxScore} (${completeData.scoring.scorePercent}%)`);
  console.log(`✓ Passport Updated: Readiness ${completeData.passport.industryReadinessScore}% (${completeData.passport.industryReadinessBand})`);

  // 5. GET /api/student/assessment/result
  console.log("\n[API 5] GET /api/student/assessment/result?attemptId=...");
  const resultRes = await fetch(`${BASE_URL}/api/student/assessment/result?attemptId=${startData.attemptId}`, {
    headers: { Cookie: cookieHeader },
  });
  const resultData = await resultRes.json();
  assert.strictEqual(resultRes.status, 200);
  assert.strictEqual(resultData.success, true);
  assert.strictEqual(resultData.attempt.status, "completed");
  assert.ok(resultData.attempt.subjectBreakdown.length > 0, "Result includes subjectBreakdown");
  assert.ok(resultData.attempt.topicBreakdown.length > 0, "Result includes topicBreakdown");
  console.log("✓ Result retrieved with subject and topic breakdowns");

  // 6. GET /api/student/skill-passport
  console.log("\n[API 6] GET /api/student/skill-passport");
  const passportRes = await fetch(`${BASE_URL}/api/student/skill-passport`, {
    headers: { Cookie: cookieHeader },
  });
  const passportData = await passportRes.json();
  assert.strictEqual(passportRes.status, 200);
  assert.strictEqual(passportData.success, true);
  assert.strictEqual(passportData.passport.studentId, studentId);
  console.log("✓ AYUSH Skill Passport retrieved. Assessed skills:",
    Object.values(passportData.passport.skills).filter((s) => s.proficiencyLevel !== "Not Assessed").length);

  // 7. GET /api/student/dashboard
  console.log("\n[API 7] GET /api/student/dashboard");
  const dashRes = await fetch(`${BASE_URL}/api/student/dashboard`, {
    headers: { Cookie: cookieHeader },
  });
  const dashData = await dashRes.json();
  assert.strictEqual(dashRes.status, 200);
  assert.strictEqual(dashData.success, true);
  console.log("Dashboard Benchmark Score:", dashData.statistics.knowledgeTestScore, "/", dashData.statistics.knowledgeTestMaxScore);
  console.log("Dashboard AYUSH Readiness Score:", dashData.statistics.ayushReadinessScore);
  console.log("Dashboard Exam Type:", dashData.statistics.latestAssessmentExamType);
  assert.strictEqual(dashData.statistics.latestAssessmentExamType, "PRACTICAL_SCENARIO");

  console.log("\n=================================================");
  console.log("ALL 7 STUDENT API TESTS PASSED SUCCESSFULLY!");
  console.log("=================================================");
}

runPrompt4ApiTests().catch((err) => {
  console.error("API test failed:", err);
  process.exit(1);
});
