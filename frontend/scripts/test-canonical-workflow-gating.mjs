import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "http://localhost:3000";
const FIXTURES_DIR = path.join(__dirname, "fixtures");

async function runTests() {
  console.log("===============================================================");
  console.log("RUNNING 12-POINT CANONICAL WORKFLOW & OCR REPAIR TEST SUITE");
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

  // Generate unique test student
  const testId = `test_stu_${Date.now()}`;
  const testEmail = `${testId}@university.edu`;
  const testPassword = "Password123!";
  const testName = "Jane Doe";

  console.log(`Setting up test student: ${testEmail}`);

  // Registration
  const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: testName,
      email: testEmail,
      password: testPassword,
      role: "student",
    }),
  });
  const regData = await regRes.json();
  assert(regData.success || regRes.status === 200, "Student registration succeeded");

  // Verify OTP using devOtp returned by registration
  const otpRes = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      role: "student",
      otpCode: regData.devOtp,
    }),
  });
  const otpData = await otpRes.json();
  assert(otpData.success, "OTP verification succeeded");

  // TEST 1: New student logs in. Expected: -> redirectUrl: "/student/document-verification"
  console.log("\n--- TEST 1: New student logs in ---");
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: testPassword,
      role: "student",
    }),
  });
  const loginData = await loginRes.json();
  assert(loginData.success, "New student login succeeded");
  assert(
    loginData.redirectUrl === "/student/document-verification",
    `New student redirectUrl must be /student/document-verification (got ${loginData.redirectUrl})`
  );
  const studentId = loginData.user.id;
  const cookieHeader = loginRes.headers.get("set-cookie") || "";
  console.log(`Authenticated student ID: ${studentId}`);

  // Common request headers
  const authHeaders = {
    "x-student-id": studentId,
  };

  // TEST 2: New student tries /student/interest-finder -> Redirect to Document Verification
  console.log("\n--- TEST 2: New student tries /student/interest-finder ---");
  const test2Res = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/interest-finder`,
    { headers: authHeaders }
  );
  const test2Data = await test2Res.json();
  assert(test2Data.routeCheck.allowed === false, "Interest Finder must be locked for unverified student");
  assert(
    test2Data.routeCheck.redirectUrl === "/student/document-verification",
    `Expected redirect to /student/document-verification, got ${test2Data.routeCheck.redirectUrl}`
  );

  // TEST 3: New student tries /student/knowledge-testing -> Redirect to Document Verification
  console.log("\n--- TEST 3: New student tries /student/knowledge-testing ---");
  const test3Res = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/knowledge-testing`,
    { headers: authHeaders }
  );
  const test3Data = await test3Res.json();
  assert(test3Data.routeCheck.allowed === false, "Knowledge Testing must be locked for unverified student");
  assert(
    test3Data.routeCheck.redirectUrl === "/student/document-verification",
    `Expected redirect to /student/document-verification, got ${test3Data.routeCheck.redirectUrl}`
  );

  // Direct check on Knowledge Testing API: start must be rejected (403)
  const startAttempt = await fetch(`${BASE_URL}/api/student/knowledge-test/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ difficulty: "beginner" }),
  });
  assert(startAttempt.status === 403, `API must block starting test before prerequisites (HTTP ${startAttempt.status})`);

  // TEST 5: OCR Fails on blank/unparseable document
  console.log("\n--- TEST 5: OCR fails on invalid/blank document (No fake success) ---");
  const blankBuf = fs.readFileSync(path.join(FIXTURES_DIR, "blank_image.png"));
  const blankBlob = new Blob([blankBuf], { type: "image/png" });
  const formFail = new FormData();
  formFail.append("file", blankBlob, "blank_image.png");
  formFail.append("documentType", "student_id");

  const failUploadRes = await fetch(`${BASE_URL}/api/student/verification/upload-document`, {
    method: "POST",
    headers: authHeaders,
    body: formFail,
  });
  const failUploadData = await failUploadRes.json();
  assert(!failUploadData.success, "Upload of blank document must NOT return fake success");
  assert(
    failUploadData.error && failUploadData.error.includes("No recognizable text found"),
    `Real OCR error message expected: ${failUploadData.error}`
  );

  // TEST 4: Student completes real document submission
  console.log("\n--- TEST 4: Real document submission & real OCR processing ---");
  const validIdBuf = fs.readFileSync(path.join(FIXTURES_DIR, "valid_student_id.png"));
  const validBlob = new Blob([validIdBuf], { type: "image/png" });
  const formSuccess = new FormData();
  formSuccess.append("file", validBlob, "valid_student_id.png");
  formSuccess.append("documentType", "student_id");

  const uploadRes = await fetch(`${BASE_URL}/api/student/verification/upload-document`, {
    method: "POST",
    headers: authHeaders,
    body: formSuccess,
  });
  const uploadData = await uploadRes.json();
  assert(uploadData.success, "Valid document upload succeeded");
  assert(uploadData.document, "Document record returned");
  assert(
    (uploadData.document.ocrData?.confidence || 0) > 0,
    `Real OCR confidence > 0 (${uploadData.document.ocrData?.confidence})`
  );
  assert(
    uploadData.document.storagePath.includes(`student/${studentId}/verification/`),
    `Storage path scoped to student: ${uploadData.document.storagePath}`
  );
  console.log("Real OCR extracted fields:", {
    name: uploadData.document.ocrData?.name,
    institution: uploadData.document.ocrData?.institution,
    idNumber: uploadData.document.ocrData?.idNumber,
  });

  // Upload second required document (transcript)
  const transcriptBuf = fs.readFileSync(path.join(FIXTURES_DIR, "valid_transcript.png"));
  const transcriptBlob = new Blob([transcriptBuf], { type: "image/png" });
  const formTranscript = new FormData();
  formTranscript.append("file", transcriptBlob, "valid_transcript.png");
  formTranscript.append("documentType", "academic_transcript");

  const transcriptRes = await fetch(`${BASE_URL}/api/student/verification/upload-document`, {
    method: "POST",
    headers: authHeaders,
    body: formTranscript,
  });
  const transcriptData = await transcriptRes.json();
  assert(transcriptData.success, "Transcript upload succeeded");

  // Face capture with valid biometric image
  const faceBuffer = fs.readFileSync(path.join(FIXTURES_DIR, "valid_face.jpg"));
  const faceBase64 = `data:image/jpeg;base64,${faceBuffer.toString("base64")}`;
  const faceRes = await fetch(`${BASE_URL}/api/student/verification/capture-face`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ imageBase64: faceBase64, captureMode: "auto" }),
  });
  const faceData = await faceRes.json();
  assert(faceData.success, "Face capture and biometric quality verification succeeded");
  assert(faceData.faceCapture?.qualityPassed === true, "Face biometric quality checks passed");

  // TEST 6: Student completes Document Verification
  console.log("\n--- TEST 6: Student completes Document Verification ---");
  const completeRes = await fetch(`${BASE_URL}/api/student/verification/complete`, {
    method: "POST",
    headers: authHeaders,
  });
  const completeData = await completeRes.json();
  assert(completeData.success, "Verification completion finalized");
  assert(completeData.verification.verificationStatus === "VERIFIED", "Status is VERIFIED");

  // Check canonical workflow state
  const wfRes = await fetch(`${BASE_URL}/api/student/workflow/status`, { headers: authHeaders });
  const wfData = await wfRes.json();
  const stages = wfData.workflow.stages;
  const docStage = stages.find((s) => s.slug === "document-verification");
  const interestStage = stages.find((s) => s.slug === "interest-finder");
  const knowledgeStage = stages.find((s) => s.slug === "knowledge-testing");

  assert(docStage.status === "completed", "Document Verification status is COMPLETED");
  assert(interestStage.status === "available", "Interest Finder status is AVAILABLE");
  assert(interestStage.isLocked === false, "Interest Finder is NOT locked");
  assert(knowledgeStage.status === "locked", "Knowledge Testing status is LOCKED");
  assert(knowledgeStage.isLocked === true, "Knowledge Testing is LOCKED");

  // TEST 7: Student opens Interest Finder -> Works
  console.log("\n--- TEST 7: Student opens Interest Finder ---");
  const ifSessionRes = await fetch(`${BASE_URL}/api/student/interest-finder/session`, { headers: authHeaders });
  const ifSessionData = await ifSessionRes.json();
  assert(ifSessionData.isVerified === true, "Interest Finder recognizes verified student");
  assert(!ifSessionData.requiresVerification, "RequiresVerification is false");

  const ifStartRes = await fetch(`${BASE_URL}/api/student/interest-finder/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ studentId }),
  });
  const ifStartData = await ifStartRes.json();
  assert(ifStartData.success, "Interest Finder initialized successfully");
  assert(ifStartData.question, "Adaptive discovery question returned");
  console.log(`Started Interest Finder session: ${ifStartData.sessionId}`);

  // TEST 8: Student tries Knowledge Testing before Interest Finder completion -> Redirect
  console.log("\n--- TEST 8: Direct Knowledge Testing access before Interest Finder completed ---");
  const test8Res = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/knowledge-testing`,
    { headers: authHeaders }
  );
  const test8Data = await test8Res.json();
  assert(test8Data.routeCheck.allowed === false, "Direct URL access to Knowledge Testing blocked");
  assert(
    test8Data.routeCheck.redirectUrl === "/student/interest-finder",
    `Redirected to /student/interest-finder (got ${test8Data.routeCheck.redirectUrl})`
  );

  // TEST 9: Student completes Interest Finder -> Knowledge Testing becomes AVAILABLE
  console.log("\n--- TEST 9: Complete Interest Finder -> Unlock Knowledge Testing ---");
  const confirmProfileRes = await fetch(`${BASE_URL}/api/student/interest-finder/confirm-profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({
      studentId,
      action: "confirm",
      finalProfile: {
        mainDomainId: "security",
        mainDomainName: "Cybersecurity & Defense",
        specificInterest: "Application Security & Threat Modeling",
        explanation: "Demonstrated strong aptitude for vulnerability analysis.",
        confidence: 0.92,
      },
    }),
  });
  const confirmData = await confirmProfileRes.json();
  assert(confirmData.success, "Interest Profile confirmed");

  // Re-check canonical workflow state
  const wfRes2 = await fetch(`${BASE_URL}/api/student/workflow/status`, { headers: authHeaders });
  const wfData2 = await wfRes2.json();
  const stages2 = wfData2.workflow.stages;
  const interestStage2 = stages2.find((s) => s.slug === "interest-finder");
  const knowledgeStage2 = stages2.find((s) => s.slug === "knowledge-testing");

  assert(interestStage2.status === "completed", "Interest Finder is now COMPLETED");
  assert(knowledgeStage2.status === "available", "Knowledge Testing is now AVAILABLE");
  assert(knowledgeStage2.isLocked === false, "Knowledge Testing is NOT locked");

  // TEST 10: Student opens Knowledge Testing -> Starts normally
  console.log("\n--- TEST 10: Student opens Knowledge Testing ---");
  const ktRouteCheck = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/knowledge-testing`,
    { headers: authHeaders }
  );
  const ktRouteData = await ktRouteCheck.json();
  assert(ktRouteData.routeCheck.allowed === true, "Knowledge Testing route access allowed");

  const ktStartRes = await fetch(`${BASE_URL}/api/student/knowledge-test/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ difficulty: "intermediate" }),
  });
  const ktStartData = await ktStartRes.json();
  assert(ktStartData.success, "Knowledge Testing session started normally");
  assert(ktStartData.question, "First calibrated question returned");
  assert(ktStartData.totalQuestions === 10, "10 questions generated");
  console.log(`Knowledge Test session started: ${ktStartData.sessionId}`);

  // TEST 11: Returning verified student logs in -> Goes to Dashboard
  console.log("\n--- TEST 11: Returning verified student logs in ---");
  const reLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: testPassword,
      role: "student",
    }),
  });
  const reLoginData = await reLoginRes.json();
  assert(reLoginData.success, "Returning student login succeeded");
  assert(
    reLoginData.redirectUrl === "/student/dashboard",
    `Returning verified student must be redirected to /student/dashboard (got ${reLoginData.redirectUrl})`
  );

  // TEST 12: Student attempts to access another student's document -> Access denied
  console.log("\n--- TEST 12: Cross-student document access security check ---");
  const attackerId = "stu-cross-attacker-999";
  const docId = uploadData.document.id;
  const crossDocRes = await fetch(`${BASE_URL}/api/student/verification/document/${docId}`, {
    headers: { "x-student-id": attackerId },
  });
  assert(
    crossDocRes.status === 403,
    `Unauthorized document access must return 403 Forbidden (got HTTP ${crossDocRes.status})`
  );

  console.log("\n===============================================================");
  console.log(`ALL ${results.length} CRITICAL TESTS PASSED SUCCESSFULLY!`);
  console.log("===============================================================\n");
}

runTests().catch((err) => {
  console.error("Test Suite Failed:", err);
  process.exit(1);
});
