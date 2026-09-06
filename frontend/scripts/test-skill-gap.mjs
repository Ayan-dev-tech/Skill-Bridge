/**
 * Skill Bridge — Complete Skill Gap & Educator Recommendations Test Suite
 * Validates canonical workflow gating, deterministic gap calculations, safe AI interpretation,
 * transparent program matching, persistence, stale invalidation, and UI regression safety.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

// Minimal valid file buffer for verification upload
function createPngBuffer(sizeInBytes = 1024) {
  const buf = Buffer.alloc(Math.max(sizeInBytes, 16));
  const header = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  for (let i = 0; i < header.length; i++) buf[i] = header[i];
  return buf;
}

async function runTests() {
  console.log("===============================================================");
  console.log("RUNNING SKILL GAP & EDUCATOR RECOMMENDATIONS TEST SUITE");
  console.log("===============================================================\n");

  const results = [];
  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      results.push({ message, pass: true });
    } else {
      console.error(`[FAIL] ${message}`);
      results.push({ message, pass: false });
      throw new Error(`Assertion failed: ${message}`);
    }
  }

  // =========================================================================
  // TEST 1: New Student (Stage 1 Incomplete) -> Skill Gap Locked
  // =========================================================================
  console.log("\n--- TEST GROUP 1: WORKFLOW GATING (NEW STUDENT) ---");
  const student1Id = `stu_sg_new_${Date.now()}`;
  const student1Email = `${student1Id}@skillbridge.edu`;

  // Register student 1
  const reg1Res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: student1Email,
      password: "Password123!",
      fullName: "Alice Student 1",
      role: "student",
    }),
  });
  const reg1Data = await reg1Res.json();
  assert(reg1Data.success, `Student 1 registered: ${student1Email}`);
  const s1Id = reg1Data.user?.id || student1Id;

  // Request Skill Gap API for Student 1 (prereqs incomplete)
  const sg1Res = await fetch(
    `${BASE_URL}/api/student/skill-gap?studentId=${encodeURIComponent(s1Id)}`,
    {
      headers: { "x-student-id": s1Id },
    }
  );
  const sg1Data = await sg1Res.json();
  assert(
    sg1Data.isLocked === true,
    "Student 1 without Document Submission has Skill Gap locked"
  );
  assert(
    sg1Data.redirectUrl === "/student/document-verification",
    "Student 1 redirect points to /student/document-verification"
  );

  // =========================================================================
  // TEST 2: Student with Document Submission Completed, but no Interest Finder
  // =========================================================================
  console.log("\n--- TEST GROUP 2: WORKFLOW GATING (DOCS COMPLETE, NO INTEREST FINDER) ---");
  const student2Id = `stu_sg_docs_${Date.now()}`;
  const student2Email = `${student2Id}@skillbridge.edu`;

  const reg2Res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: student2Email,
      password: "Password123!",
      fullName: "Bob Student 2",
      role: "student",
    }),
  });
  const reg2Data = await reg2Res.json();
  const s2Id = reg2Data.user?.id || student2Id;

  // Login Student 2 to obtain session cookie
  const loginRes2 = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: student2Email, password: "Password123!" }),
  });
  const rawCookie2 = loginRes2.headers.get("set-cookie") || "";
  const cookie2 = rawCookie2.split(";")[0] || `sb_student_id=${s2Id}`;
  const authHeaders2 = {
    Cookie: cookie2,
    "x-student-id": s2Id,
  };

  // Complete 4 required documents for Student 2
  const docTypes = ["student_id", "passport_photo", "post_graduation_marksheet", "abc_id"];
  for (const dt of docTypes) {
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([createPngBuffer(1024)], { type: "image/png" }),
      `${dt}.png`
    );
    formData.append("category", dt);
    const upRes = await fetch(
      `${BASE_URL}/api/student/verification/upload-document`,
      {
        method: "POST",
        headers: authHeaders2,
        body: formData,
      }
    );
    const upData = await upRes.json();
    assert(upData.success, `Uploaded ${dt} for Student 2`);
  }

  // Complete document verification
  const comp2Res = await fetch(`${BASE_URL}/api/student/verification/complete`, {
    method: "POST",
    headers: { ...authHeaders2, "Content-Type": "application/json" },
    body: JSON.stringify({ studentId: s2Id }),
  });
  const comp2Data = await comp2Res.json();
  assert(comp2Data.success, "Student 2 Document Verification completed");

  // Check Skill Gap for Student 2 -> must be locked, redirecting to /student/interest-finder
  const sg2Res = await fetch(
    `${BASE_URL}/api/student/skill-gap?studentId=${encodeURIComponent(s2Id)}`,
    {
      headers: authHeaders2,
    }
  );
  const sg2Data = await sg2Res.json();
  assert(
    sg2Data.isLocked === true,
    "Student 2 without Interest Finder has Skill Gap locked"
  );
  assert(
    sg2Data.redirectUrl === "/student/interest-finder",
    "Student 2 redirect points to /student/interest-finder"
  );

  // =========================================================================
  // TEST 3: Student with Docs & Interest Finder Completed, but no Knowledge Test
  // =========================================================================
  console.log("\n--- TEST GROUP 3: WORKFLOW GATING (NO KNOWLEDGE TEST) ---");

  // Confirm interest profile for Student 2
  const intRes = await fetch(`${BASE_URL}/api/student/interest-finder/confirm-profile`, {
    method: "POST",
    headers: { ...authHeaders2, "Content-Type": "application/json" },
    body: JSON.stringify({
      studentId: s2Id,
      action: "confirm",
      finalProfile: {
        mainDomainName: "Cybersecurity & Defense",
        mainDomainId: "security",
        specificInterest: "Application Security & Vulnerability Research",
        explanation: "Demonstrates strong aptitude for discovering software vulnerabilities and securing APIs.",
        confidence: 0.94,
      },
    }),
  });
  const intData = await intRes.json();
  assert(intData.success, "Student 2 Interest Profile confirmed (app-sec in security)");

  // Check Skill Gap for Student 2 -> must be locked, redirecting to /student/knowledge-testing
  const sg2PostIntRes = await fetch(
    `${BASE_URL}/api/student/skill-gap?studentId=${encodeURIComponent(s2Id)}`,
    {
      headers: authHeaders2,
    }
  );
  const sg2PostIntData = await sg2PostIntRes.json();
  assert(
    sg2PostIntData.isLocked === true,
    "Student 2 without Knowledge Testing has Skill Gap locked"
  );
  assert(
    sg2PostIntData.redirectUrl === "/student/knowledge-testing",
    "Student 2 redirect points to /student/knowledge-testing"
  );

  // =========================================================================
  // TEST 4: Student with All 3 Prerequisites Completed -> Skill Gap Unlocked!
  // =========================================================================
  console.log("\n--- TEST GROUP 4: SKILL GAP CALCULATION & INTELLIGENCE ---");

  // Create Knowledge Test Session with realistic question responses for Student 2
  const startTestRes = await fetch(`${BASE_URL}/api/student/knowledge-test/start`, {
    method: "POST",
    headers: { ...authHeaders2, "Content-Type": "application/json" },
    body: JSON.stringify({
      studentId: s2Id,
      difficulty: "intermediate",
    }),
  });
  const startTestData = await startTestRes.json();
  assert(startTestData.success, "Knowledge Test session initialized for Student 2");
  const sessionId = startTestData.sessionId;

  // Read the session's questions from data/skill_bridge.json
  const dbJsonPath = path.join(process.cwd(), "data", "skill_bridge.json");
  const dbRaw = JSON.parse(fs.readFileSync(dbJsonPath, "utf-8"));
  const foundSession = dbRaw.knowledgeTestSessions.find((s) => s.sessionId === sessionId);
  const questions = foundSession?.questions || [];
  assert(questions.length === 10, "Test session received calibrated 10 questions");

  // Submit answers: Answer some correctly and some incorrectly to establish an actual gap
  // E.g. answer correctly on sql-injection, but incorrectly on authentication/jwt
  let scoreAccumulator = 0;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    // Intentionally get question 0 and 1 wrong (e.g. auth-identity related)
    const chooseCorrect = i >= 3;
    const chosenOptionId = chooseCorrect
      ? q.correctOptionId
      : q.options.find((o) => o.id !== q.correctOptionId)?.id || q.options[0].id;

    const subRes = await fetch(`${BASE_URL}/api/student/knowledge-test/submit-answer`, {
      method: "POST",
      headers: { ...authHeaders2, "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: s2Id,
        sessionId,
        questionId: q.id,
        selectedOptionId: chosenOptionId,
      }),
    });
    const subData = await subRes.json();
    assert(subData.success, `Submitted answer for question ${i + 1}`);
  }

  // Complete Knowledge Test
  const completeTestRes = await fetch(`${BASE_URL}/api/student/knowledge-test/complete`, {
    method: "POST",
    headers: { ...authHeaders2, "Content-Type": "application/json" },
    body: JSON.stringify({ studentId: s2Id, sessionId }),
  });
  const completeTestData = await completeTestRes.json();
  assert(completeTestData.success, "Knowledge Test completed and score calculated");
  const testScore = completeTestData.result?.score;
  const testMaxScore = completeTestData.result?.maxScore;
  console.log(`Student 2 Test Result: ${testScore} / ${testMaxScore} (${completeTestData.result?.scorePercent}%)`);

  // Now request Skill Gap API for Student 2 -> MUST BE UNLOCKED!
  const sgRes = await fetch(
    `${BASE_URL}/api/student/skill-gap?studentId=${encodeURIComponent(s2Id)}`,
    {
      headers: authHeaders2,
    }
  );
  const sgData = await sgRes.json();
  assert(sgData.success === true, "Skill Gap API returned success: true");
  assert(sgData.isLocked === false, "Skill Gap is unlocked");

  // Verify Direction Data
  assert(
    sgData.direction?.domainId === "security",
    "Confirmed domain matches authoritative Interest Finder result (security)"
  );
  assert(
    sgData.direction?.nicheId === "app-sec",
    "Confirmed niche matches target niche (app-sec)"
  );
  assert(
    sgData.direction?.nicheTitle.includes("Application Security"),
    "Confirmed niche title preserved accurately"
  );

  // Verify Knowledge Snapshot
  assert(
    sgData.knowledgeSnapshot?.testScore === testScore,
    `Knowledge snapshot score (${sgData.knowledgeSnapshot?.testScore}) matches authoritative test score`
  );
  assert(
    sgData.knowledgeSnapshot?.difficulty === "intermediate",
    "Knowledge snapshot difficulty preserved accurately"
  );

  // Verify Skill Gaps Diagnosis
  const analysis = sgData.analysis;
  assert(Boolean(analysis), "Persisted analysis object returned");
  assert(
    Array.isArray(analysis.skillGaps) &&
      analysis.skillGaps.length >= 3 &&
      analysis.skillGaps.length <= 6,
    `Produced exactly ${analysis.skillGaps.length} meaningful skill gaps (between 3 and 6)`
  );

  // Verify Gap Item Structure
  const firstGap = analysis.skillGaps[0];
  assert(Boolean(firstGap.skillId), `Gap has valid skillId: ${firstGap.skillId}`);
  assert(Boolean(firstGap.skillName), `Gap has valid skillName: ${firstGap.skillName}`);
  assert(
    ["high", "medium", "low"].includes(firstGap.priority),
    `Gap has valid priority category: ${firstGap.priority}`
  );
  assert(Boolean(firstGap.evidence), `Gap has factual evidence: ${firstGap.evidence}`);
  assert(Boolean(firstGap.whyItMatters), `Gap has whyItMatters explanation: ${firstGap.whyItMatters}`);
  assert(Boolean(firstGap.recommendedAction), `Gap has recommendedAction: ${firstGap.recommendedAction}`);

  // =========================================================================
  // TEST 5: Transparent Program Matching Engine
  // =========================================================================
  console.log("\n--- TEST GROUP 5: PROGRAM MATCHING & EXPLANATION ---");
  const recommendations = analysis.recommendations;
  assert(
    Array.isArray(recommendations) && recommendations.length > 0,
    `Generated ${recommendations.length} matched education program recommendations`
  );

  const topRec = recommendations[0];
  assert(
    Boolean(topRec.program?.title),
    `Top recommendation has program title: "${topRec.program?.title}"`
  );
  assert(
    Boolean(topRec.program?.educatorName),
    `Top recommendation has educator: "${topRec.program?.educatorName}"`
  );
  assert(
    ["verified_partner", "external_opportunity", "sample_provider"].includes(
      topRec.program?.verifiedStatus
    ),
    `Top recommendation clearly marks verification status: ${topRec.program?.verifiedStatus}`
  );
  assert(
    topRec.matchExplanation.startsWith("Recommended because it covers:"),
    `Transparent match explanation provided: "${topRec.matchExplanation}"`
  );
  assert(
    ["Best Match", "Strong Match", "Relevant"].includes(topRec.matchTier),
    `Transparent match tier assigned: ${topRec.matchTier}`
  );
  assert(
    Boolean(topRec.program?.programUrl) &&
      (topRec.program?.programUrl.startsWith("http://") ||
        topRec.program?.programUrl.startsWith("https://")),
    `Program URL is a valid web destination: ${topRec.program?.programUrl}`
  );

  // =========================================================================
  // TEST 6: Persistence & Caching
  // =========================================================================
  console.log("\n--- TEST GROUP 6: PERSISTENCE & CACHE REUSE ---");
  const cachedSgRes = await fetch(
    `${BASE_URL}/api/student/skill-gap?studentId=${encodeURIComponent(s2Id)}`,
    {
      headers: authHeaders2,
    }
  );
  const cachedSgData = await cachedSgRes.json();
  assert(
    cachedSgData.analysis?.id === analysis.id,
    `Subsequent GET request returns identical persisted analysis ID (${analysis.id})`
  );

  // =========================================================================
  // TEST 7: Stale Analysis Invalidation on Test Retake
  // =========================================================================
  console.log("\n--- TEST GROUP 7: STALE ANALYSIS INVALIDATION ON RETAKE ---");
  // Retake Knowledge Test (start a new session and complete it)
  const retakeStartRes = await fetch(`${BASE_URL}/api/student/knowledge-test/start`, {
    method: "POST",
    headers: { ...authHeaders2, "Content-Type": "application/json" },
    body: JSON.stringify({
      studentId: s2Id,
      difficulty: "advanced",
    }),
  });
  const retakeStartData = await retakeStartRes.json();
  assert(retakeStartData.success, "Started new retake test session (advanced)");
  const retakeSessionId = retakeStartData.sessionId;

  // Complete the retake session
  const retakeCompleteRes = await fetch(`${BASE_URL}/api/student/knowledge-test/complete`, {
    method: "POST",
    headers: { ...authHeaders2, "Content-Type": "application/json" },
    body: JSON.stringify({ studentId: s2Id, sessionId: retakeSessionId }),
  });
  const retakeCompleteData = await retakeCompleteRes.json();
  assert(retakeCompleteData.success, "Completed retake test session");

  // Fetch Skill Gap API -> must detect stale analysis and regenerate fresh analysis!
  const regeneratedSgRes = await fetch(
    `${BASE_URL}/api/student/skill-gap?studentId=${encodeURIComponent(s2Id)}`,
    {
      headers: authHeaders2,
    }
  );
  const regeneratedSgData = await regeneratedSgRes.json();
  assert(
    regeneratedSgData.analysis?.id !== analysis.id,
    `Stale analysis detected! Successfully generated new analysis ID: ${regeneratedSgData.analysis?.id}`
  );
  assert(
    regeneratedSgData.analysis?.difficulty === "advanced",
    "New analysis accurately reflects updated advanced benchmark difficulty"
  );

  // =========================================================================
  // TEST 8: Student Dashboard Workflow State Reflection
  // =========================================================================
  console.log("\n--- TEST GROUP 8: DASHBOARD WORKFLOW SYNCHRONIZATION ---");
  const dashRes = await fetch(
    `${BASE_URL}/api/student/dashboard?studentId=${encodeURIComponent(s2Id)}`,
    {
      headers: authHeaders2,
    }
  );
  const dashData = await dashRes.json();
  assert(dashData.success, "Student dashboard state loaded");

  const skillGapSection = dashData.sections?.find(
    (s) => s.id === "skill-gap" || s.slug === "skill-gap"
  );
  assert(Boolean(skillGapSection), "Skill Gap section present on Student Dashboard");
  assert(
    skillGapSection.status === "completed",
    "Skill Gap section status is 'completed' on dashboard"
  );

  // =========================================================================
  // TEST 9: Page HTTP 200 & Render Verification
  // =========================================================================
  console.log("\n--- TEST GROUP 9: STUDENT PORTAL PAGE HTTP 200 CHECKS ---");
  const pages = [
    "/student/document-verification",
    "/student/interest-finder",
    "/student/knowledge-testing",
    "/student/skill-gap",
    "/student/dashboard",
  ];

  for (const p of pages) {
    const pageRes = await fetch(`${BASE_URL}${p}`, {
      headers: {
        Cookie: `sb_student_id=${encodeURIComponent(s2Id)}`,
      },
    });
    assert(
      pageRes.status === 200,
      `Page ${p} returns HTTP 200 (Got ${pageRes.status})`
    );
  }

  console.log("\n===============================================================");
  console.log(`ALL TESTS PASSED! (${results.length}/${results.length} assertions passed)`);
  console.log("===============================================================");
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
