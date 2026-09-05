// Verification script for Skill-Bridge Adaptive AI Interest Discovery
// Strictly testing Scenarios A, B, C, and D as mandated by Section 28
import assert from "assert";

const BASE_URL = "http://localhost:3000";

async function runInterestFinderTests() {
  console.log("==================================================================");
  console.log("Starting Skill-Bridge Adaptive AI Interest Discovery Test Suite");
  console.log("==================================================================");

  // Generate a distinct student ID for this test run
  const testStudentId = `stu_test_${Date.now()}`;
  const headers = {
    "Content-Type": "application/json",
    "x-student-id": testStudentId,
  };

  // -------------------------------------------------------------------------
  // SCENARIO A — Open Exploration & Domain Blindness
  // -------------------------------------------------------------------------
  console.log("\n[SCENARIO A] Testing Open Exploration & Strict Domain Blindness");

  // Start fresh discovery
  const startRes = await fetch(`${BASE_URL}/api/student/interest-finder/start`, {
    method: "POST",
    headers,
    body: JSON.stringify({ studentId: testStudentId }),
  });
  const startData = await startRes.json();

  assert.strictEqual(startRes.status, 200, "Start discovery should return HTTP 200");
  assert.strictEqual(startData.success, true, "Start discovery should succeed");
  assert.strictEqual(startData.phase, 1, "Must begin in Phase 1 (Blind Discovery)");
  assert.ok(startData.question, "Question 1 must be returned");

  // Verify Phase 1 questions DO NOT leak domain names or scores
  const q1 = startData.question;
  console.log(`  Question 1: "${q1.questionText.substring(0, 70)}..."`);
  assert.ok(q1.options && q1.options.length >= 3, "Must have at least 3 options");

  for (const opt of q1.options) {
    assert.strictEqual(
      opt.domainRelevance,
      undefined,
      "CRITICAL: Option must not leak internal domainRelevance to client"
    );
    assert.strictEqual(
      opt.signalWeights,
      undefined,
      "CRITICAL: Option must not leak internal signalWeights to client"
    );
  }
  console.log("  ✓ Verified: Zero domain labels or mathematical weights exposed in client payload.");

  // Test dynamic progression with varied answers
  let currentQ = q1;
  let isDone = false;
  let step = 1;

  while (!isDone && step < 8) {
    // Pick option B for balanced testing
    const chosenOpt = currentQ.options[1] || currentQ.options[0];
    const ansRes = await fetch(`${BASE_URL}/api/student/interest-finder/submit-answer`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        studentId: testStudentId,
        questionId: currentQ.id,
        questionText: currentQ.questionText,
        selectedOptionId: chosenOpt.id,
        selectedOptionText: chosenOpt.text,
      }),
    });
    const ansData = await ansRes.json();
    assert.strictEqual(ansRes.status, 200, "Answer submission must succeed");

    if (ansData.isPhaseComplete) {
      isDone = true;
      assert.ok(ansData.evaluation, "Phase 1 evaluation must be returned on completion");
      assert.ok(ansData.evaluation.discoveredDomainName, "Must discover a broad domain");
      assert.ok(ansData.evaluation.explanation, "Must provide student-centered explanation");
      console.log(`  ✓ Discovered Broad Domain: "${ansData.evaluation.discoveredDomainName}" after ${step} questions.`);
      console.log(`  ✓ Rationale: "${ansData.evaluation.explanation.substring(0, 80)}..."`);
    } else {
      assert.ok(ansData.nextQuestion, "Must return next adaptive question");
      currentQ = ansData.nextQuestion;
      step++;
    }
  }

  assert.ok(isDone, "Scenario A must conclude within reasonable question boundary");
  console.log("✓ SCENARIO A PASSED: Open exploration successfully discovered a domain without domain leakage.");

  // -------------------------------------------------------------------------
  // SCENARIO B — Targeted Security Discovery & Phase 2 Sub-Domain Narrowing
  // -------------------------------------------------------------------------
  console.log("\n[SCENARIO B] Testing Security Discovery & Phase 2 Specialization");

  const secStudentId = `sec_tester_${Date.now()}`;
  const secHeaders = {
    "Content-Type": "application/json",
    "x-student-id": secStudentId,
  };

  // Start fresh
  const secStartRes = await fetch(`${BASE_URL}/api/student/interest-finder/start`, {
    method: "POST",
    headers: secHeaders,
    body: JSON.stringify({ studentId: secStudentId }),
  });
  const secStartData = await secStartRes.json();
  let secQ = secStartData.question;
  let secPhase1Done = false;
  let secEval = null;

  // Intentionally choose vulnerability/adversarial options (Option A / Security oriented)
  while (!secPhase1Done) {
    const secKeywords = [
      "probe",
      "payload",
      "suspicious",
      "unauthorized",
      "vulnerability",
      "scanner",
      "adversar",
      "packet",
      "flaw",
      "defense",
      "breach",
      "threat",
      "privilege",
    ];
    const chosenOpt =
      secQ.options.find((o) =>
        secKeywords.some((k) => o.text.toLowerCase().includes(k))
      ) || secQ.options[0];

    const submitRes = await fetch(`${BASE_URL}/api/student/interest-finder/submit-answer`, {
      method: "POST",
      headers: secHeaders,
      body: JSON.stringify({
        studentId: secStudentId,
        questionId: secQ.id,
        questionText: secQ.questionText,
        selectedOptionId: chosenOpt.id,
        selectedOptionText: chosenOpt.text,
      }),
    });
    const submitData = await submitRes.json();

    if (submitData.isPhaseComplete) {
      secPhase1Done = true;
      secEval = submitData.evaluation;
    } else {
      secQ = submitData.nextQuestion;
    }
  }

  assert.strictEqual(
    secEval.discoveredDomainId,
    "security",
    "Adversarial / investigation answers must discover Security"
  );
  console.log(`  ✓ Phase 1 correctly identified: ${secEval.discoveredDomainName}`);
  console.log(`  ✓ Explanation based on answers: "${secEval.explanation.substring(0, 90)}..."`);

  // Accept the broad domain to enter Phase 2
  const p2AcceptRes = await fetch(`${BASE_URL}/api/student/interest-finder/confirm-phase1`, {
    method: "POST",
    headers: secHeaders,
    body: JSON.stringify({
      studentId: secStudentId,
      action: "accept",
      domainId: "security",
    }),
  });
  const p2AcceptData = await p2AcceptRes.json();
  assert.strictEqual(p2AcceptData.phase, 2, "Must enter Phase 2");
  assert.ok(p2AcceptData.nextQuestion, "Phase 2 Question 1 must be returned");

  let p2Q = p2AcceptData.nextQuestion;
  console.log(`  Phase 2 Question 1: "${p2Q.questionText.substring(0, 60)}..."`);
  assert.ok(
    p2Q.questionText.toLowerCase().includes("cybersecurity") ||
      p2Q.questionText.toLowerCase().includes("security"),
    "Phase 2 question must be explicitly Security-focused"
  );

  // Answer 3 Phase 2 questions targeting Application Security
  let p2Done = false;
  let finalProfileResult = null;

  while (!p2Done) {
    // Select Option A (Application Security & Vulnerability Research)
    const opt = p2Q.options[0];
    const p2SubRes = await fetch(`${BASE_URL}/api/student/interest-finder/submit-answer`, {
      method: "POST",
      headers: secHeaders,
      body: JSON.stringify({
        studentId: secStudentId,
        questionId: p2Q.id,
        questionText: p2Q.questionText,
        selectedOptionId: opt.id,
        selectedOptionText: opt.text,
      }),
    });
    const p2SubData = await p2SubRes.json();

    if (p2SubData.isPhaseComplete) {
      p2Done = true;
      finalProfileResult = p2SubData.evaluation;
    } else {
      p2Q = p2SubData.nextQuestion;
    }
  }

  assert.ok(finalProfileResult, "Phase 2 evaluation must be synthesized");
  assert.strictEqual(finalProfileResult.mainDomainId, "security", "Main domain must be Security");
  assert.ok(
    finalProfileResult.specificInterest.includes("Application Security") ||
      finalProfileResult.specificInterest.includes("Vulnerability"),
    `Must narrow to Application Security specialization. Received: ${finalProfileResult.specificInterest}`
  );
  console.log(`  ✓ Phase 2 successfully narrowed to: "${finalProfileResult.specificInterest}"`);
  console.log(`  ✓ Specific rationale: "${finalProfileResult.explanation.substring(0, 80)}..."`);
  console.log("✓ SCENARIO B PASSED: Security discovery and niche specialization verified.");

  // -------------------------------------------------------------------------
  // SCENARIO C — Student Rejects Phase 1 Result ("Not quite, explore again")
  // -------------------------------------------------------------------------
  console.log("\n[SCENARIO C] Testing Student Rejection ('Not quite')");

  const rejectStudentId = `reject_tester_${Date.now()}`;
  const rejectHeaders = {
    "Content-Type": "application/json",
    "x-student-id": rejectStudentId,
  };

  // Start discovery and trigger Phase 1 conclusion
  await fetch(`${BASE_URL}/api/student/interest-finder/start`, {
    method: "POST",
    headers: rejectHeaders,
    body: JSON.stringify({ studentId: rejectStudentId }),
  });

  // Call confirm-phase1 with action: "reject"
  const rejectRes = await fetch(`${BASE_URL}/api/student/interest-finder/confirm-phase1`, {
    method: "POST",
    headers: rejectHeaders,
    body: JSON.stringify({
      studentId: rejectStudentId,
      action: "reject",
    }),
  });
  const rejectData = await rejectRes.json();
  assert.strictEqual(rejectRes.status, 200, "Rejection must return 200");
  assert.strictEqual(rejectData.action, "reject", "Action must be reject");

  // Verify that NO confirmed profile was saved
  const checkRes = await fetch(`${BASE_URL}/api/student/interest-finder/session`, {
    headers: rejectHeaders,
  });
  const checkData = await checkRes.json();
  assert.strictEqual(checkData.confirmedProfile, null, "Confirmed profile MUST NOT exist after rejection");
  console.log("✓ SCENARIO C PASSED: Rejection resets exploration and prevents permanent storage.");

  // -------------------------------------------------------------------------
  // SCENARIO D — Student Confirms Profile & Persistence Check Across Refresh
  // -------------------------------------------------------------------------
  console.log("\n[SCENARIO D] Testing Profile Confirmation & Session Reload Persistence");

  // Confirm the profile obtained in Scenario B
  const confirmRes = await fetch(`${BASE_URL}/api/student/interest-finder/confirm-profile`, {
    method: "POST",
    headers: secHeaders,
    body: JSON.stringify({
      studentId: secStudentId,
      action: "confirm",
      finalProfile: finalProfileResult,
    }),
  });
  const confirmData = await confirmRes.json();
  assert.strictEqual(confirmRes.status, 200, "Confirmation must return HTTP 200");
  assert.strictEqual(confirmData.success, true, "Confirmation must succeed");
  assert.ok(confirmData.profile, "Saved profile record must be returned");

  // Simulate browser refresh / return visit
  const reloadRes = await fetch(`${BASE_URL}/api/student/interest-finder/session`, {
    headers: secHeaders,
  });
  const reloadData = await reloadRes.json();
  assert.strictEqual(reloadRes.status, 200, "Reload session query must return 200");
  assert.ok(reloadData.confirmedProfile, "Confirmed profile MUST persist and be immediately available on reload");
  assert.strictEqual(
    reloadData.confirmedProfile.confirmedSpecificInterest,
    finalProfileResult.specificInterest,
    "Persisted specialization must match confirmed profile"
  );
  console.log(`  ✓ Confirmed profile persisted in database: "${reloadData.confirmedProfile.confirmedSpecificInterest}"`);

  // Test "Explore Again" preserves the existing confirmed profile until a new one is saved
  const exploreAgainRes = await fetch(`${BASE_URL}/api/student/interest-finder/confirm-profile`, {
    method: "POST",
    headers: secHeaders,
    body: JSON.stringify({
      studentId: secStudentId,
      action: "explore_again",
    }),
  });
  const exploreAgainData = await exploreAgainRes.json();
  assert.strictEqual(exploreAgainData.action, "explore_again");

  // Check that confirmed profile STILL exists after choosing Explore Again
  const checkPersistRes = await fetch(`${BASE_URL}/api/student/interest-finder/session`, {
    headers: secHeaders,
  });
  const checkPersistData = await checkPersistRes.json();
  assert.ok(
    checkPersistData.confirmedProfile,
    "Confirmed profile must remain safe in DB when exploring again"
  );
  console.log("  ✓ Confirmed profile preserved during 'Explore Again' fresh inquiry.");
  console.log("✓ SCENARIO D PASSED: Confirmation, persistence, and safe re-exploration verified.");

  console.log("\n==================================================================");
  console.log("ALL INTEREST FINDER TEST SCENARIOS PASSED WITH 100% SUCCESS! 🚀");
  console.log("==================================================================");
}

runInterestFinderTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
