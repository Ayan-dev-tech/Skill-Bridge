import assert from "node:assert";

const BASE_URL = "http://localhost:3000";
const studentId = "47fc1671-0e5d-4f66-af79-ca34f5e10ec5";
const cookieHeader = `sb_student_id=${studentId}`;
const authHeaders = {
  "Content-Type": "application/json",
  Cookie: cookieHeader,
  "x-student-id": studentId,
};

async function runTest() {
  console.log("=================================================");
  console.log("Testing Full End-to-End AYUSH Student Journey");
  console.log("=================================================");

  // 1. Check configs endpoint
  const configsRes = await fetch(`${BASE_URL}/api/student/assessment/configs`, {
    headers: { Cookie: cookieHeader },
  });
  const configsData = await configsRes.json();
  assert.strictEqual(configsData.success, true, "Configs API failed");
  assert.ok(configsData.configs.length >= 3, "Expected at least 3 configs");

  const neetConfig = configsData.configs.find(c => c.examType === "NEET_UG");
  const aiapgetConfig = configsData.configs.find(c => c.examType === "AIAPGET_PG");
  const scenarioConfig = configsData.configs.find(c => c.examType === "PRACTICAL_SCENARIO");

  assert.ok(neetConfig, "NEET_UG config missing");
  assert.ok(aiapgetConfig, "AIAPGET_PG config missing");
  assert.ok(scenarioConfig, "PRACTICAL_SCENARIO config missing");
  console.log("✓ Assessment Center configs verified (NEET UG, AIAPGET PG, Practical Scenarios)");

  // 2. Start NEET UG attempt
  const startRes = await fetch(`${BASE_URL}/api/student/assessment/start`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ configId: neetConfig.id, restart: true }),
  });
  const startData = await startRes.json();
  assert.strictEqual(startData.success, true, "Start NEET UG failed");
  assert.ok(startData.attemptId, "No attemptId returned");
  assert.strictEqual(startData.questions.length, neetConfig.questionCount, "Question count mismatch");

  // Verify answer secrecy: NO correctOptionId or explanation
  for (const q of startData.questions) {
    assert.strictEqual(q.correctOptionId, undefined, "LEAK: correctOptionId present in client question!");
    assert.strictEqual(q.explanation, undefined, "LEAK: explanation present in client question!");
    assert.strictEqual(q.options.length, 4, `Question ${q.id} does not have exactly 4 options!`);
  }
  console.log(`✓ Started NEET UG attempt with ${startData.questions.length} questions. Answer secrecy strictly verified.`);

  // 3. Submit an answer and verify isCorrect is NOT returned
  const firstQ = startData.questions[0];
  const submitAnswerRes = await fetch(`${BASE_URL}/api/student/assessment/submit-answer`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({
      attemptId: startData.attemptId,
      questionId: firstQ.id,
      selectedOptionId: firstQ.options[0].id,
      timeSpentMs: 12000,
    }),
  });
  const submitAnswerData = await submitAnswerRes.json();
  assert.strictEqual(submitAnswerData.success, true, "Submit answer failed");
  assert.strictEqual(submitAnswerData.isCorrect, undefined, "LEAK: isCorrect returned in submit-answer API before exam completion!");
  console.log("✓ Answer submitted. Verified isCorrect is NOT exposed before exam completion.");

  // 4. Complete NEET UG attempt
  const completeRes = await fetch(`${BASE_URL}/api/student/assessment/complete`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ attemptId: startData.attemptId }),
  });
  const completeData = await completeRes.json();
  assert.strictEqual(completeData.success, true, "Complete NEET UG failed");
  assert.ok(completeData.scoring, "Scoring result missing");
  console.log(`✓ NEET UG completed. Score: ${completeData.scoring.score} / ${completeData.scoring.maxScore} (${completeData.scoring.scorePercent}%)`);

  // 5. Test AIAPGET PG assessment
  const startAiapgetRes = await fetch(`${BASE_URL}/api/student/assessment/start`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ configId: aiapgetConfig.id, restart: true }),
  });
  const startAiapgetData = await startAiapgetRes.json();
  assert.strictEqual(startAiapgetData.success, true, "Start AIAPGET failed");

  // Answer all questions
  for (let i = 0; i < startAiapgetData.questions.length; i++) {
    const q = startAiapgetData.questions[i];
    await fetch(`${BASE_URL}/api/student/assessment/submit-answer`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        attemptId: startAiapgetData.attemptId,
        questionId: q.id,
        selectedOptionId: q.options[i % 4].id,
        timeSpentMs: 10000,
      }),
    });
  }

  const completeAiapgetRes = await fetch(`${BASE_URL}/api/student/assessment/complete`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ attemptId: startAiapgetData.attemptId }),
  });
  const completeAiapgetData = await completeAiapgetRes.json();
  assert.strictEqual(completeAiapgetData.success, true, "Complete AIAPGET failed");
  console.log(`✓ AIAPGET PG completed. Score: ${completeAiapgetData.scoring.score} / ${completeAiapgetData.scoring.maxScore} (${completeAiapgetData.scoring.scorePercent}%)`);

  // 6. Test AYUSH Skill Gap API
  const skillGapRes = await fetch(`${BASE_URL}/api/student/skill-gap?refresh=true`, {
    headers: authHeaders,
  });
  const skillGapData = await skillGapRes.json();
  assert.strictEqual(skillGapData.success, true, `Skill Gap API failed: ${skillGapData.error || skillGapData.lockedReason}`);
  assert.strictEqual(skillGapData.isLocked, false, "Skill Gap should not be locked after assessment completion");
  assert.ok(skillGapData.direction, "Direction missing in skill gap response");
  assert.strictEqual(skillGapData.direction.domainId, "ayush-clinical", "Expected ayush-clinical domain");
  assert.ok(skillGapData.knowledgeSnapshot, "Knowledge snapshot missing");
  assert.ok(skillGapData.analysis, "Analysis missing in skill gap response");
  assert.ok(skillGapData.analysis.skillGaps.length >= 0, "skillGaps should be an array");
  console.log(`✓ AYUSH Skill Gap API returned active analysis with ${skillGapData.analysis.skillGaps.length} gaps in ${skillGapData.direction.nicheTitle}`);

  // 7. Test AYUSH Skill Passport API
  const passportRes = await fetch(`${BASE_URL}/api/student/skill-passport`, {
    headers: authHeaders,
  });
  const passportData = await passportRes.json();
  assert.strictEqual(passportData.success, true, "Skill Passport API failed");
  assert.ok(passportData.passport, "Passport missing");
  assert.ok(passportData.passport.assessmentResults.length >= 2, "Expected at least 2 recorded assessments");
  console.log(`✓ AYUSH Skill Passport verified with ${passportData.passport.assessmentResults.length} assessment records and readiness ${passportData.passport.industryReadinessScore}% (${passportData.passport.industryReadinessBand})`);

  // 8. Test Security: Student cannot access another student's attempt
  const forbiddenRes = await fetch(`${BASE_URL}/api/student/assessment/submit-answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-student-id": "intruder_student_999" },
    body: JSON.stringify({
      attemptId: startAiapgetData.attemptId,
      questionId: firstQ.id,
      selectedOptionId: "opt1",
    }),
  });
  assert.strictEqual(forbiddenRes.status, 403, "Expected 403 Forbidden for unauthorized student");
  console.log("✓ Authorization verified: Intruder cannot submit answer to another student's attempt.");

  console.log("=================================================");
  console.log("ALL STUDENT JOURNEY END-TO-END TESTS PASSED!");
  console.log("=================================================");
}

runTest().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
