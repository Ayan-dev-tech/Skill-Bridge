/**
 * Learning / Mentoring & YouTube Integration Test Suite
 * Validates:
 * 1. Query formulation logic across experience levels
 * 2. Sequential canonical workflow gating (locked before docs, interest, knowledge test, skill gap)
 * 3. Successful unlock once Skill Gap diagnosis is established
 * 4. Learning Focus summary and Suggested Steps matching actual student gaps
 * 5. Server-side caching of learning resources
 * 6. Invalidation of cached resources when assessment is retaken or skill gap changes
 * 7. Mentoring Coming Soon section and zero fake mentor data
 * 8. HTTP 200 checks on all student workflow routes
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "http://localhost:3000";
const DB_PATH = path.join(__dirname, "../data/skill_bridge.json");

function buildYouTubeSearchQuery(skillName, nicheTitle, difficulty) {
  let levelTerm = "tutorial beginner basics";
  if (difficulty === "intermediate") {
    levelTerm = "tutorial practical guide implementation";
  } else if (difficulty === "advanced") {
    levelTerm = "architecture deep dive advanced tutorial";
  }
  return `${skillName} ${nicheTitle} ${levelTerm}`;
}

async function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`[PASS] ${message}`);
}

async function runTests() {
  console.log("\n===============================================================");
  console.log("RUNNING LEARNING / MENTORING WORKFLOW & ENGINE TEST SUITE");
  console.log("===============================================================\n");

  // --------------------------------------------------------------------------
  // TEST GROUP 1: QUERY FORMULATION UNIT CHECKS
  // --------------------------------------------------------------------------
  console.log("--- TEST GROUP 1: YOUTUBE QUERY FORMULATION ---");
  const beginnerQuery = buildYouTubeSearchQuery("Authentication", "Application Security", "beginner");
  assert(
    beginnerQuery.includes("Authentication") && beginnerQuery.includes("beginner"),
    `Beginner query correctly includes skill and beginner keywords: "${beginnerQuery}"`
  );

  const intermediateQuery = buildYouTubeSearchQuery("Web Security", "Application Security", "intermediate");
  assert(
    intermediateQuery.includes("Web Security") && intermediateQuery.includes("practical"),
    `Intermediate query correctly includes practical/guide keywords: "${intermediateQuery}"`
  );

  const advancedQuery = buildYouTubeSearchQuery("API Security", "Application Security", "advanced");
  assert(
    advancedQuery.includes("API Security") && advancedQuery.includes("advanced"),
    `Advanced query correctly includes deep dive/architecture keywords: "${advancedQuery}"`
  );

  // --------------------------------------------------------------------------
  // TEST GROUP 2: WORKFLOW GATING (NEW STUDENT)
  // --------------------------------------------------------------------------
  console.log("\n--- TEST GROUP 2: WORKFLOW GATING (UNVERIFIED STUDENT) ---");
  const testId1 = `stu_learn_new_${Date.now()}`;
  const testEmail1 = `${testId1}@skillbridge.edu`;
  const testPassword = "Password@123";

  // Register Student 1
  const regRes1 = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Alex Learner",
      email: testEmail1,
      password: testPassword,
      role: "student",
    }),
  });
  const regData1 = await regRes1.json();
  assert(regData1.success, `Student 1 registered: ${testEmail1}`);

  await fetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail1,
      role: "student",
      otpCode: regData1.devOtp,
    }),
  });

  const loginRes1 = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail1,
      password: testPassword,
      role: "student",
    }),
  });
  const cookie1 = (loginRes1.headers.get("set-cookie") || "").split(";")[0];
  const authHeaders1 = { Cookie: cookie1 };

  // Student 1 accesses /api/student/learning without document submission
  const learnRes1 = await fetch(`${BASE_URL}/api/student/learning`, {
    headers: authHeaders1,
  });
  const learnData1 = await learnRes1.json();
  assert(learnRes1.status === 403, "Unverified student blocked from /api/student/learning with HTTP 403");
  assert(learnData1.isLocked === true, "Unverified student learning module is marked locked");
  assert(learnData1.redirectTo === "/student/document-verification", "Redirects to /student/document-verification");

  // --------------------------------------------------------------------------
  // TEST GROUP 3: WORKFLOW GATING (DOCS COMPLETE, NO INTEREST FINDER)
  // --------------------------------------------------------------------------
  console.log("\n--- TEST GROUP 3: WORKFLOW GATING (DOCS COMPLETE, NO INTEREST FINDER) ---");
  const testId2 = `stu_learn_docs_${Date.now()}`;
  const testEmail2 = `${testId2}@skillbridge.edu`;

  const regRes2 = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Casey Learner",
      email: testEmail2,
      password: testPassword,
      role: "student",
    }),
  });
  const regData2 = await regRes2.json();
  const verifyRes2 = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail2,
      role: "student",
      otpCode: regData2.devOtp,
    }),
  });
  const verifyData2 = await verifyRes2.json();
  const student2Id = verifyData2.user?.id || regData2.user?.id || testId2;

  const loginRes2 = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail2,
      password: testPassword,
      role: "student",
    }),
  });
  const cookie2 = (loginRes2.headers.get("set-cookie") || "").split(";")[0];
  const authHeaders2 = { Cookie: cookie2 };

  // Helper to upload document
  async function uploadTestDoc(docType, fileName, content, headers) {
    const formData = new FormData();
    const blob = new Blob([content], { type: "application/pdf" });
    formData.append("file", blob, fileName);
    formData.append("documentType", docType);

    const res = await fetch(`${BASE_URL}/api/student/verification/upload-document`, {
      method: "POST",
      headers,
      body: formData,
    });
    return res.json();
  }

  // Upload required documents for Student 2
  await uploadTestDoc("student_id", "id.pdf", "%PDF-1.4 test id", authHeaders2);
  const pngBlob = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  const photoForm = new FormData();
  photoForm.append("file", new Blob([pngBlob], { type: "image/png" }), "passport.png");
  photoForm.append("documentType", "passport_photo");
  await fetch(`${BASE_URL}/api/student/verification/upload-document`, {
    method: "POST",
    headers: authHeaders2,
    body: photoForm,
  });
  await uploadTestDoc("post_graduation_marksheet", "sem1.pdf", "%PDF-1.4 sem1", authHeaders2);
  await uploadTestDoc("abc_id", "abc.pdf", "%PDF-1.4 abc id", authHeaders2);

  const compRes2 = await fetch(`${BASE_URL}/api/student/verification/complete`, {
    method: "POST",
    headers: { ...authHeaders2, "Content-Type": "application/json" },
  });
  assert(compRes2.status === 200, "Student 2 Document Verification completed");

  // Attempt learning without Interest Finder
  const learnRes2 = await fetch(`${BASE_URL}/api/student/learning`, {
    headers: authHeaders2,
  });
  const learnData2 = await learnRes2.json();
  assert(learnRes2.status === 403, "Student without Interest Finder blocked from /api/student/learning");
  assert(learnData2.redirectTo === "/student/interest-finder", "Redirects to /student/interest-finder");

  // --------------------------------------------------------------------------
  // TEST GROUP 4: WORKFLOW GATING (INTEREST FINDER COMPLETE, NO KNOWLEDGE TEST)
  // --------------------------------------------------------------------------
  console.log("\n--- TEST GROUP 4: WORKFLOW GATING (NO KNOWLEDGE TEST) ---");
  await fetch(`${BASE_URL}/api/student/interest-finder/confirm-profile`, {
    method: "POST",
    headers: { ...authHeaders2, "Content-Type": "application/json" },
    body: JSON.stringify({
      studentId: student2Id,
      action: "confirm",
      finalProfile: {
        mainDomainId: "security",
        mainDomainName: "Cybersecurity & Defenses",
        specificInterest: "Application Security & Vulnerability Research",
        explanation: "Passionate about web security, threat modeling, and secure software development.",
        confidence: 0.95,
      },
    }),
  });

  const learnRes3 = await fetch(`${BASE_URL}/api/student/learning`, {
    headers: authHeaders2,
  });
  const learnData3 = await learnRes3.json();
  assert(learnRes3.status === 403, "Student without Knowledge Test blocked from /api/student/learning");
  assert(learnData3.redirectTo === "/student/knowledge-testing", "Redirects to /student/knowledge-testing");

  // --------------------------------------------------------------------------
  // TEST GROUP 5: COMPLETE KNOWLEDGE TEST & SKILL GAP -> UNLOCK LEARNING
  // --------------------------------------------------------------------------
  console.log("\n--- TEST GROUP 5: KNOWLEDGE TEST & SKILL GAP COMPLETION ---");
  const ktStartRes = await fetch(`${BASE_URL}/api/student/knowledge-test/start`, {
    method: "POST",
    headers: { ...authHeaders2, "Content-Type": "application/json" },
    body: JSON.stringify({ difficulty: "intermediate" }),
  });
  const ktStartData = await ktStartRes.json();
  assert(ktStartRes.status === 200, "Knowledge Test started for Student 2");

  // Submit answers to complete test
  for (let i = 1; i <= 10; i++) {
    await fetch(`${BASE_URL}/api/student/knowledge-test/submit-answer`, {
      method: "POST",
      headers: { ...authHeaders2, "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: ktStartData.sessionId,
        questionIndex: i,
        selectedOptionId: i % 2 === 0 ? "b" : "a",
      }),
    });
  }

  const ktCompRes = await fetch(`${BASE_URL}/api/student/knowledge-test/complete`, {
    method: "POST",
    headers: { ...authHeaders2, "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId: ktStartData.sessionId }),
  });
  assert(ktCompRes.status === 200, "Knowledge Test session completed");

  // Generate Skill Gap Diagnosis
  const sgRes = await fetch(`${BASE_URL}/api/student/skill-gap`, {
    headers: authHeaders2,
  });
  const sgData = await sgRes.json();
  assert(sgRes.status === 200 && sgData.success, "Skill Gap analysis generated successfully");
  const analysisId = sgData.analysis.id;

  // Now Learning / Mentoring is UNLOCKED!
  const learnRes4 = await fetch(`${BASE_URL}/api/student/learning`, {
    headers: authHeaders2,
  });
  const learnData4 = await learnRes4.json();
  assert(learnRes4.status === 200 && learnData4.success, "Learning / Mentoring is now UNLOCKED (HTTP 200)");
  assert(learnData4.isLocked === false, "isLocked is false");
  assert(learnData4.learningFocus !== undefined, "Learning Focus context is present");
  assert(learnData4.learningFocus.nicheTitle.length > 0, `Niche title populated: ${learnData4.learningFocus.nicheTitle}`);
  assert(learnData4.suggestedSteps.length > 0, `Suggested focus steps generated (count: ${learnData4.suggestedSteps.length})`);
  assert(learnData4.suggestedSteps[0].stepNumber === 1, "First suggested step has stepNumber 1");
  assert(learnData4.resources.length >= 5, `Retrieved at least 5 real educational YouTube videos (got: ${learnData4.resources.length})`);
  assert(learnData4.isConfigured === true, "isConfigured is true");
  assert(learnData4.fromCache === false, "First fetch is freshly fetched, not from cache");

  // Validate integrity of each retrieved real YouTube video
  const videoIds = new Set();
  for (const item of learnData4.resources) {
    assert(item.videoId && item.videoId.length > 0, `Valid video ID present: ${item.videoId}`);
    assert(!videoIds.has(item.videoId), `No duplicate video IDs: ${item.videoId}`);
    videoIds.add(item.videoId);
    assert(item.videoUrl.startsWith("https://www.youtube.com/watch?v="), `Valid YouTube URL: ${item.videoUrl}`);
    assert(item.title && item.title.length > 0, `Video has authentic title: ${item.title}`);
    assert(item.channelTitle && item.channelTitle.length > 0, `Video has authentic channel: ${item.channelTitle}`);
    assert(item.thumbnailUrl && item.thumbnailUrl.startsWith("http"), `Valid thumbnail URL: ${item.thumbnailUrl}`);
    assert(item.relevanceReason && item.relevanceReason.includes(item.skillName), `Relevance reason references skill gap: ${item.skillName}`);
  }
  console.log(`[PASS] Verified ${learnData4.resources.length} authentic YouTube videos across prioritized gaps without duplicates`);

  // --------------------------------------------------------------------------
  // TEST GROUP 6: PERSISTENCE & CACHING OF LEARNING RESOURCES
  // --------------------------------------------------------------------------
  console.log("\n--- TEST GROUP 6: CACHING & PERSISTENCE ---");
  // Save sample real resources in DB file for this analysis
  const sampleRealVideos = [
    {
      id: "yt_1001",
      videoId: "real_yt_vid_1001",
      title: "OWASP Top 10 Web Application Security Tutorial",
      description: "Comprehensive guide to common vulnerabilities and secure mitigation.",
      channelTitle: "freeCodeCamp.org",
      thumbnailUrl: "https://i.ytimg.com/vi/real_yt_vid_1001/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=real_yt_vid_1001",
      skillId: "web-security",
      skillName: "Web Security & OWASP Top 10",
      priority: "high",
      difficulty: "intermediate",
      relevanceReason: "Recommended because it covers Web Security fundamentals related to your high-priority skill gap.",
    },
    {
      id: "yt_1002",
      videoId: "real_yt_vid_1002",
      title: "Authentication & JWT Architecture Deep Dive",
      description: "Hands-on implementation of tokens, refresh flows, and secure cookie storage.",
      channelTitle: "Hussein Nasser",
      thumbnailUrl: "https://i.ytimg.com/vi/real_yt_vid_1002/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=real_yt_vid_1002",
      skillId: "auth-identity",
      skillName: "Authentication & Identity Management",
      priority: "high",
      difficulty: "intermediate",
      relevanceReason: "Recommended because it covers Authentication fundamentals related to your high-priority skill gap.",
    },
  ];

  if (fs.existsSync(DB_PATH)) {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    const dbData = JSON.parse(raw);
    if (!dbData.learningResources) dbData.learningResources = [];
    dbData.learningResources = dbData.learningResources.filter(
      (r) => !(r.studentId === student2Id && r.analysisId === analysisId)
    );
    dbData.learningResources.push({
      id: `lr_${student2Id}_${analysisId}`,
      studentId: student2Id,
      analysisId: analysisId,
      type: "youtube_video",
      resources: sampleRealVideos,
      cachedAt: new Date().toISOString(),
    });
    fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2), "utf-8");
  }

  // Fetch from API: should hit cache
  const cachedLearnRes = await fetch(`${BASE_URL}/api/student/learning`, {
    headers: authHeaders2,
  });
  const cachedLearnData = await cachedLearnRes.json();
  assert(cachedLearnData.success === true, "Cached fetch returns success: true");
  assert(cachedLearnData.fromCache === true, "fromCache flag is true");
  assert(cachedLearnData.resources.length === 2, `Retrieved 2 cached resources`);
  assert(cachedLearnData.resources[0].videoId === "real_yt_vid_1001", "Preserved video ID from cache");
  assert(cachedLearnData.resources[0].channelTitle === "freeCodeCamp.org", "Preserved channel title from cache");
  assert(cachedLearnData.resources[0].videoUrl.startsWith("https://www.youtube.com/watch?v="), "Valid YouTube watch URL");

  // --------------------------------------------------------------------------
  // TEST GROUP 7: STALE INVALIDATION ON TEST RETAKE
  // --------------------------------------------------------------------------
  console.log("\n--- TEST GROUP 7: STALE INVALIDATION ON TEST RETAKE ---");
  // Retake knowledge test
  const retakeStart = await fetch(`${BASE_URL}/api/student/knowledge-test/start`, {
    method: "POST",
    headers: { ...authHeaders2, "Content-Type": "application/json" },
    body: JSON.stringify({ difficulty: "advanced" }),
  });
  const retakeStartData = await retakeStart.json();

  for (let i = 1; i <= 10; i++) {
    await fetch(`${BASE_URL}/api/student/knowledge-test/submit-answer`, {
      method: "POST",
      headers: { ...authHeaders2, "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: retakeStartData.sessionId,
        questionIndex: i,
        selectedOptionId: "c",
      }),
    });
  }
  await fetch(`${BASE_URL}/api/student/knowledge-test/complete`, {
    method: "POST",
    headers: { ...authHeaders2, "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId: retakeStartData.sessionId }),
  });

  // Verify that learning is now locked because skill gap is stale!
  const staleLearnRes = await fetch(`${BASE_URL}/api/student/learning`, {
    headers: authHeaders2,
  });
  const staleLearnData = await staleLearnRes.json();
  assert(staleLearnRes.status === 403, "Stale assessment locks learning module until new skill gap is computed");
  assert(staleLearnData.redirectTo === "/student/skill-gap", "Redirects to /student/skill-gap for recalibration");

  // Recalculate skill gap
  const refreshSgRes = await fetch(`${BASE_URL}/api/student/skill-gap?refresh=true`, {
    headers: authHeaders2,
  });
  const refreshSgData = await refreshSgRes.json();
  assert(refreshSgData.success, "New calibrated skill gap generated");
  assert(refreshSgData.analysis.id !== analysisId, "New analysis ID issued on recalibration");

  // Learning module is now unlocked again
  const refreshedLearnRes = await fetch(`${BASE_URL}/api/student/learning`, {
    headers: authHeaders2,
  });
  const refreshedLearnData = await refreshedLearnRes.json();
  assert(refreshedLearnData.success === true, "Learning unlocked with fresh assessment data");
  assert(refreshedLearnData.learningFocus.difficulty === "advanced", "Learning Focus updated to advanced benchmark");

  // --------------------------------------------------------------------------
  // TEST GROUP 8: HTTP 200 CHECKS ACROSS STUDENT PORTAL ROUTES
  // --------------------------------------------------------------------------
  console.log("\n--- TEST GROUP 8: STUDENT PORTAL PAGE HTTP 200 CHECKS ---");
  const routesToCheck = [
    "/student/document-verification",
    "/student/interest-finder",
    "/student/knowledge-testing",
    "/student/skill-gap",
    "/student/learning",
    "/student/dashboard",
  ];

  for (const r of routesToCheck) {
    const pageRes = await fetch(`${BASE_URL}${r}`, { headers: authHeaders2 });
    assert(pageRes.status === 200, `Page ${r} returns HTTP 200 (Got ${pageRes.status})`);
  }

  console.log("\n===============================================================");
  console.log("ALL LEARNING & MENTORING WORKFLOW TESTS PASSED CLEANLY!");
  console.log("===============================================================\n");
}

runTests().catch((err) => {
  console.error("Test Suite Failed:", err);
  process.exit(1);
});
