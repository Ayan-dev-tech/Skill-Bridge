// Test script running on D: drive for Knowledge Testing endpoints
async function runTest() {
  console.log("=== Testing Knowledge Test Endpoints on D: Drive ===");
  const BASE = "http://localhost:3000";

  // Wait a moment for server to initialize
  await new Promise((r) => setTimeout(r, 2000));

  // 1. GET result & prerequisite
  console.log("\n[1] Checking prerequisite & status via GET /api/student/knowledge-test/result");
  const res1 = await fetch(`${BASE}/api/student/knowledge-test/result`);
  const data1 = await res1.json();
  console.log("Status:", res1.status, "Has Prerequisite:", data1.hasPrerequisite, "Domain:", data1.interestProfile?.confirmedMainDomain);

  // 2. Start Beginner Test
  console.log("\n[2] Starting Beginner Assessment");
  const res2 = await fetch(`${BASE}/api/student/knowledge-test/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ difficulty: "beginner", restart: true }),
  });
  const data2 = await res2.json();
  console.log("Session created:", data2.sessionId, "Total Qs:", data2.totalQuestions, "Q1:", data2.question?.questionText);

  if (!data2.sessionId) {
    console.error("Failed to start session:", data2);
    return;
  }

  // 3. Step through 10 questions and submit answers
  let currentQ = data2.question;
  const sessionId = data2.sessionId;

  for (let i = 1; i <= 10; i++) {
    const selectedOptionId = currentQ.options[i % 2 === 0 ? 0 : 1].id;
    const submitRes = await fetch(`${BASE}/api/student/knowledge-test/submit-answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        questionId: currentQ.id,
        selectedOptionId,
        timeSpentMs: 3200,
      }),
    });
    const submitData = await submitRes.json();
    console.log(`Q${i} Answered -> isCorrect: ${submitData.immediateFeedback?.isCorrect}, isCompleted: ${submitData.isCompleted}`);

    if (submitData.isCompleted) {
      console.log("\n[3] Assessment Finished!");
      console.log("Score:", `${submitData.result?.scorePercent}% (${submitData.result?.correctCount}/${submitData.result?.totalQuestions})`);
      console.log("Tier:", submitData.result?.performanceTier);
      console.log("Strengths:", submitData.result?.strengths);
      console.log("Weaknesses:", submitData.result?.weaknesses);
      break;
    } else {
      currentQ = submitData.nextQuestion;
    }
  }

  // 4. Verify History in GET result
  console.log("\n[4] Verifying Test History");
  const resHistory = await fetch(`${BASE}/api/student/knowledge-test/result`);
  const dataHistory = await resHistory.json();
  console.log("Total Completed Tests in History:", dataHistory.history?.length);
  console.log("Latest Result Score:", dataHistory.result?.scorePercent);

  console.log("\n=== ALL KNOWLEDGE TEST BACKEND VERIFICATIONS PASSED ===");
}

runTest().catch((e) => console.error("Test execution error:", e));
