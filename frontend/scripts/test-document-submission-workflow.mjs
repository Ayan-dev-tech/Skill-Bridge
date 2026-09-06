import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

// Minimal valid file buffers with proper magic bytes
function createPngBuffer(sizeInBytes = 1024) {
  const buf = Buffer.alloc(Math.max(sizeInBytes, 16));
  // PNG Magic bytes: 89 50 4E 47 0D 0A 1A 0A
  const header = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  for (let i = 0; i < header.length; i++) buf[i] = header[i];
  return buf;
}

function createJpgBuffer(sizeInBytes = 1024) {
  const buf = Buffer.alloc(Math.max(sizeInBytes, 16));
  // JPEG Magic bytes: FF D8 FF
  buf[0] = 0xff;
  buf[1] = 0xd8;
  buf[2] = 0xff;
  buf[3] = 0xe0;
  return buf;
}

function createPdfBuffer(sizeInBytes = 1024) {
  const buf = Buffer.alloc(Math.max(sizeInBytes, 32));
  // PDF Magic bytes: %PDF-
  const header = Buffer.from("%PDF-1.4\n%âãÏÓ\n1 0 obj<</Type/Catalog>>endobj\n%%EOF");
  header.copy(buf, 0);
  return buf;
}

function createTxtBuffer(sizeInBytes = 512) {
  return Buffer.from("Hello world, this is a plain text file not a PDF or image.");
}

async function runTests() {
  console.log("===============================================================");
  console.log("RUNNING COMPLETE DOCUMENT SUBMISSION & WORKFLOW TEST SUITE");
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

  // Generate unique test students
  const testId1 = `stu_sub_${Date.now()}`;
  const testEmail1 = `${testId1}@skillbridge.edu`;
  const testPassword = "Password123!";

  console.log(`1. Registering Primary Test Student: ${testEmail1}`);
  const regRes1 = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Alex Student",
      email: testEmail1,
      password: testPassword,
      role: "student",
    }),
  });
  const regData1 = await regRes1.json();
  console.log("Registration response:", regData1);
  assert(regData1.success || regRes1.status === 200, "Student 1 registration succeeded");
  const otpRes1 = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail1,
      role: "student",
      otpCode: regData1.devOtp,
    }),
  });
  const otpData1 = await otpRes1.json();
  console.log("OTP verification response:", otpData1);
  assert(otpData1.success, "Student 1 OTP verified successfully");

  // Login to get session cookie
  const loginRes1 = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail1,
      password: testPassword,
      role: "student",
    }),
  });
  assert(loginRes1.status === 200, "Student 1 login succeeded");
  const rawCookies1 = loginRes1.headers.get("set-cookie") || "";
  const cookieHeader1 = rawCookies1.split(";")[0];
  assert(cookieHeader1.length > 0, "Obtained session cookie for student 1");

  const authHeaders1 = {
    Cookie: cookieHeader1,
  };

  // Helper for uploading files
  async function uploadFile(category, buffer, fileName, mimeType, headers = authHeaders1) {
    const formData = new FormData();
    const blob = new Blob([buffer], { type: mimeType });
    formData.append("file", blob, fileName);
    formData.append("category", category);

    const res = await fetch(`${BASE_URL}/api/student/verification/upload-document`, {
      method: "POST",
      headers,
      body: formData,
    });
    return { status: res.status, data: await res.json() };
  }

  // 1. Initial State Check
  console.log("\n--- Checking Initial Document Submission State ---");
  const initRes = await fetch(`${BASE_URL}/api/student/verification`, { headers: authHeaders1 });
  const initData = await initRes.json();
  assert(initRes.status === 200, "Initial verification fetch succeeded");
  assert(initData.verification.verificationStatus === "NOT_STARTED", "Initial status is NOT_STARTED");
  assert(initData.summary.requiredCount === 0, "Initial required count is 0");
  assert(initData.summary.requiredTotal === 4, "Required total is 4 (Student ID, Passport Photo, Marksheet, ABC ID)");
  assert(initData.summary.optionalCount === 0, "Initial optional count is 0");
  assert(initData.summary.optionalTotal === 5, "Optional total is 5");
  assert(initData.summary.canProceedToInterestFinder === false, "Cannot proceed before required documents");

  // 2. File Validation: Unsupported Format (.txt)
  console.log("\n--- Testing File Type and Size Validations ---");
  const txtBuf = createTxtBuffer();
  const txtUpload = await uploadFile("student_id", txtBuf, "id.txt", "text/plain");
  assert(txtUpload.status === 400, "Unsupported file format (.txt) rejected with 400");
  assert(
    txtUpload.data.error.includes("Unsupported file type") || txtUpload.data.error.includes("PNG, JPG, JPEG or PDF"),
    `Clear error message returned: "${txtUpload.data.error}"`
  );

  // 3. File Validation: Normal Image > 2 MB (Student ID with 2.5 MB image)
  const bigImageBuf = createPngBuffer(2.5 * 1024 * 1024);
  const bigImageUpload = await uploadFile("student_id", bigImageBuf, "large_id.png", "image/png");
  assert(bigImageUpload.status === 400, "Normal image > 2 MB rejected with 400");
  assert(
    bigImageUpload.data.error.includes("2 MB"),
    `Clear image size error: "${bigImageUpload.data.error}"`
  );

  // 4. File Validation: Normal PDF > 5 MB (Student ID with 5.5 MB PDF)
  const bigPdfBuf = createPdfBuffer(5.5 * 1024 * 1024);
  const bigPdfUpload = await uploadFile("student_id", bigPdfBuf, "large_id.pdf", "application/pdf");
  assert(bigPdfUpload.status === 400, "Normal PDF > 5 MB rejected with 400");
  assert(
    bigPdfUpload.data.error.includes("5 MB"),
    `Clear PDF size error: "${bigPdfUpload.data.error}"`
  );

  // 5. Passport Photo Validation: PDF NOT ALLOWED
  const passportPdf = createPdfBuffer(500 * 1024);
  const passportPdfUpload = await uploadFile("passport_photo", passportPdf, "photo.pdf", "application/pdf");
  assert(passportPdfUpload.status === 400, "Passport Photo as PDF rejected with 400");
  assert(
    passportPdfUpload.data.error === "Passport Sized Photo must be PNG, JPG or JPEG.",
    `Exact error message for passport PDF: "${passportPdfUpload.data.error}"`
  );

  // 6. Passport Photo Validation: Image > 2 MB rejected
  const bigPassportImg = createJpgBuffer(2.2 * 1024 * 1024);
  const bigPassportUpload = await uploadFile("passport_photo", bigPassportImg, "photo.jpg", "image/jpeg");
  assert(bigPassportUpload.status === 400, "Passport Photo > 2 MB rejected with 400");

  // 7. Certification 5 MB Rule: Academic Certification Image (4.5 MB) ACCEPTED
  console.log("\n--- Testing 5 MB Certification Limit Rules ---");
  const certImage4_5MB = createJpgBuffer(4.5 * 1024 * 1024);
  const certImgUpload = await uploadFile("academic_certifications", certImage4_5MB, "cert_4.5mb.jpg", "image/jpeg");
  assert(certImgUpload.status === 200, "Academic Certification image at 4.5 MB ACCEPTED (5 MB rule)");
  assert(certImgUpload.data.document.fileSizeBytes > 4 * 1024 * 1024, "Persisted file size verified > 4MB");

  // 8. Certification 5 MB Rule: Academic Certification PDF (4.8 MB) ACCEPTED
  const certPdf4_8MB = createPdfBuffer(4.8 * 1024 * 1024);
  const certPdfUpload = await uploadFile("academic_certifications", certPdf4_8MB, "cert_4.8mb.pdf", "application/pdf");
  assert(certPdfUpload.status === 200, "Academic Certification PDF at 4.8 MB ACCEPTED (5 MB rule)");

  // 9. Certification 5 MB Rule: Certification file > 5 MB REJECTED
  const certOversizeBuf = createPdfBuffer(5.2 * 1024 * 1024);
  const certOversizeUpload = await uploadFile("academic_certifications", certOversizeBuf, "cert_5.2mb.pdf", "application/pdf");
  assert(certOversizeUpload.status === 400, "Certification file > 5 MB rejected with 400");
  assert(
    certOversizeUpload.data.error.includes("5 MB"),
    `Clear cert limit error: "${certOversizeUpload.data.error}"`
  );

  // 10. Skill Certification follows same 5 MB rule
  const skillCert4_2MB = createPngBuffer(4.2 * 1024 * 1024);
  const skillCertUpload = await uploadFile("skill_certifications", skillCert4_2MB, "skill_cert.png", "image/png");
  assert(skillCertUpload.status === 200, "Skill Certification image at 4.2 MB ACCEPTED (5 MB rule)");

  // Remove test certs so we can test clean uploads from scratch
  console.log("\n--- Cleaning up temporary certification files ---");
  await fetch(`${BASE_URL}/api/student/verification/delete-document`, {
    method: "POST",
    headers: { ...authHeaders1, "Content-Type": "application/json" },
    body: JSON.stringify({ documentId: certImgUpload.data.document.id }),
  });
  await fetch(`${BASE_URL}/api/student/verification/delete-document`, {
    method: "POST",
    headers: { ...authHeaders1, "Content-Type": "application/json" },
    body: JSON.stringify({ documentId: certPdfUpload.data.document.id }),
  });
  await fetch(`${BASE_URL}/api/student/verification/delete-document`, {
    method: "POST",
    headers: { ...authHeaders1, "Content-Type": "application/json" },
    body: JSON.stringify({ documentId: skillCertUpload.data.document.id }),
  });

  // 11. Upload 4 REQUIRED Documents
  console.log("\n--- Uploading All 4 Required Documents ---");

  // A. Student ID (Valid PNG ≤ 2 MB)
  const studentIdBuf = createPngBuffer(400 * 1024);
  const stuIdRes = await uploadFile("student_id", studentIdBuf, "student_identity_card.png", "image/png");
  assert(stuIdRes.status === 200, "1. Student ID uploaded successfully");
  assert(stuIdRes.data.document.id.length > 0, "Student ID issued unique file ID");
  assert(stuIdRes.data.document.fileName === "student_identity_card.png", "File name preserved");

  // B. Passport Sized Photo (Valid JPG ≤ 2 MB)
  const photoBuf = createJpgBuffer(350 * 1024);
  const photoRes = await uploadFile("passport_photo", photoBuf, "passport_photo.jpg", "image/jpeg");
  assert(photoRes.status === 200, "2. Passport Sized Photo uploaded successfully");
  assert(photoRes.data.document.id.length > 0, "Passport Photo issued unique file ID");

  // C. Post Graduation Marksheet (Grouped: Semester 1, 2, and 3)
  const markSem1 = createPdfBuffer(800 * 1024);
  const markSem1Res = await uploadFile("post_graduation_marksheet", markSem1, "semester_1_marksheet.pdf", "application/pdf");
  assert(markSem1Res.status === 200, "3a. Marksheet Semester 1 PDF uploaded");

  const markSem2 = createPdfBuffer(900 * 1024);
  const markSem2Res = await uploadFile("post_graduation_marksheet", markSem2, "semester_2_marksheet.pdf", "application/pdf");
  assert(markSem2Res.status === 200, "3b. Marksheet Semester 2 PDF uploaded (grouped)");

  const markSem3 = createPdfBuffer(750 * 1024);
  const markSem3Res = await uploadFile("post_graduation_marksheet", markSem3, "semester_3_marksheet.pdf", "application/pdf");
  assert(markSem3Res.status === 200, "3c. Marksheet Semester 3 PDF uploaded (grouped)");

  // --- Verify Missing ABC ID State (3/4 Required) ---
  console.log("\n--- Testing Missing ABC ID State (3 of 4 Required) ---");
  const check3Res = await fetch(`${BASE_URL}/api/student/verification`, { headers: authHeaders1 });
  const check3Data = await check3Res.json();
  assert(check3Data.summary.requiredCount === 3, "Required count is 3 of 4 when ABC ID is missing");
  assert(check3Data.summary.allRequiredUploaded === false, "allRequiredUploaded is false when ABC ID is missing");
  assert(check3Data.summary.isCompleted === false, "Document Submission is NOT completed when ABC ID is missing");
  assert(check3Data.summary.canProceedToInterestFinder === false, "Cannot proceed to Interest Finder when ABC ID is missing");

  // Verify Workflow Gating when ABC ID is missing
  const wfMissingRes = await fetch(`${BASE_URL}/api/student/workflow/status?checkPath=/student/interest-finder`, { headers: authHeaders1 });
  const wfMissingData = await wfMissingRes.json();
  assert(wfMissingData.workflow.stages[0].status === "in_progress", "Document Submission is in_progress when ABC ID is missing");
  assert(wfMissingData.workflow.stages[1].status === "locked", "Interest Finder is LOCKED when ABC ID is missing");
  assert(wfMissingData.routeCheck.allowed === false, "Direct access to Interest Finder is blocked when ABC ID is missing");
  assert(wfMissingData.routeCheck.redirectUrl === "/student/document-verification", "Redirects to /student/document-verification");

  // Dashboard blocks unverified access
  const dashBefore = await fetch(`${BASE_URL}/api/student/dashboard`, { headers: authHeaders1 });
  const dashBeforeData = await dashBefore.json();
  assert(dashBeforeData.requiresVerification === true, "Dashboard blocks unverified student with requiresVerification when ABC ID is missing");
  assert(dashBeforeData.redirectUrl === "/student/document-verification", "Dashboard redirects unverified student to /student/document-verification");

  // Attempting to call /complete when ABC ID is missing is rejected
  const earlyCompRes = await fetch(`${BASE_URL}/api/student/verification/complete`, {
    method: "POST",
    headers: { ...authHeaders1, "Content-Type": "application/json" },
  });
  assert(earlyCompRes.status === 400, "Calling /complete without ABC ID is rejected with 400");

  // D. ABC ID (Academic Bank of Credits ID - PDF ≤ 5 MB)
  console.log("\n--- Uploading ABC ID to Complete Required Documents (4/4) ---");
  const abcBuf = createPdfBuffer(600 * 1024);
  const abcRes = await uploadFile("abc_id", abcBuf, "academic_bank_of_credits.pdf", "application/pdf");
  assert(abcRes.status === 200, "4. ABC ID uploaded successfully");

  // Verify Required Completion Progress
  const reqCheckRes = await fetch(`${BASE_URL}/api/student/verification`, { headers: authHeaders1 });
  const reqCheckData = await reqCheckRes.json();
  assert(reqCheckData.summary.requiredCount === 4, `All 4 required categories completed (count: ${reqCheckData.summary.requiredCount}/4)`);
  assert(reqCheckData.summary.allRequiredUploaded === true, "allRequiredUploaded flag is true");
  assert(reqCheckData.summary.isCompleted === true, "Document Submission is marked Completed when 4/4 required uploaded");
  assert(reqCheckData.summary.canProceedToInterestFinder === true, "canProceedToInterestFinder is true when 4/4 uploaded");

  // Verify Grouped Marksheets count & metadata
  const marksheetGroup = reqCheckData.verification.documents.filter((d) => d.documentType === "post_graduation_marksheet");
  assert(Array.isArray(marksheetGroup), "Post graduation marksheet is an array");
  assert(marksheetGroup.length === 3, "Post graduation marksheet contains exactly 3 semester files");
  assert(marksheetGroup[0].groupId === "post_graduation_marksheet", "Group ID is properly preserved");

  // 12. Upload Optional Categories
  console.log("\n--- Uploading Optional Documents & Professional Profiles ---");

  // A. Academic Certifications (Grouped - 2 files)
  const acadCert1 = createPdfBuffer(1.2 * 1024 * 1024);
  const acadCert1Res = await uploadFile("academic_certifications", acadCert1, "honor_roll_cert.pdf", "application/pdf");
  assert(acadCert1Res.status === 200, "Academic Cert 1 uploaded");

  const acadCert2 = createJpgBuffer(2.1 * 1024 * 1024);
  const acadCert2Res = await uploadFile("academic_certifications", acadCert2, "dean_list_cert.jpg", "image/jpeg");
  assert(acadCert2Res.status === 200, "Academic Cert 2 uploaded");

  // B. Skill Certifications (Grouped - 1 file)
  const skillCert1 = createPdfBuffer(1.5 * 1024 * 1024);
  const skillCert1Res = await uploadFile("skill_certifications", skillCert1, "aws_solutions_architect.pdf", "application/pdf");
  assert(skillCert1Res.status === 200, "Skill Cert 1 uploaded");

  // C. Resume (Optional - 1 PDF)
  const resumeBuf = createPdfBuffer(1.1 * 1024 * 1024);
  const resumeRes = await uploadFile("resume", resumeBuf, "Alex_Student_Resume.pdf", "application/pdf");
  assert(resumeRes.status === 200, "Resume uploaded");

  // D. Competitive Exam Score (Grouped - 1 file)
  const examBuf = createPdfBuffer(800 * 1024);
  const examRes = await uploadFile("competitive_exam", examBuf, "gate_scorecard.pdf", "application/pdf");
  assert(examRes.status === 200, "Competitive Exam Scorecard uploaded");

  // E. Professional Profiles (LinkedIn, GitHub, Portfolio)
  // Invalid LinkedIn URL check
  const badProfileRes = await fetch(`${BASE_URL}/api/student/verification/profiles`, {
    method: "POST",
    headers: { ...authHeaders1, "Content-Type": "application/json" },
    body: JSON.stringify({
      linkedIn: "not-a-valid-url",
    }),
  });
  assert(badProfileRes.status === 400, "Invalid LinkedIn URL rejected with 400");

  // Valid Profiles check
  const goodProfileRes = await fetch(`${BASE_URL}/api/student/verification/profiles`, {
    method: "POST",
    headers: { ...authHeaders1, "Content-Type": "application/json" },
    body: JSON.stringify({
      linkedIn: "https://linkedin.com/in/alex-student",
      gitHub: "https://github.com/alex-student",
      portfolio: "https://alex-student.dev",
      other: "https://dribbble.com/alex-student",
    }),
  });
  assert(goodProfileRes.status === 200, "Professional Profiles saved successfully");

  // 13. Persistence Verification
  console.log("\n--- Testing Full Persistence After Reload ---");
  const reloadRes = await fetch(`${BASE_URL}/api/student/verification`, { headers: authHeaders1 });
  const reloadData = await reloadRes.json();
  assert(reloadData.summary.requiredCount === 4, "Required count remains 4/4 after reload");
  assert(reloadData.summary.optionalCount === 5, "All 5 optional categories present after reload");
  assert(reloadData.verification.professionalProfiles?.linkedIn === "https://linkedin.com/in/alex-student", "LinkedIn URL persisted");
  assert(reloadData.verification.professionalProfiles?.gitHub === "https://github.com/alex-student", "GitHub URL persisted");
  assert(reloadData.verification.professionalProfiles?.portfolio === "https://alex-student.dev", "Portfolio URL persisted");

  // 14. Document Replace Test (Replace Student ID with new image)
  console.log("\n--- Testing Document Replacement ---");
  const oldStuIdDoc = reloadData.verification.documents.find((d) => d.documentType === "student_id");
  const newStudentIdBuf = createJpgBuffer(500 * 1024);
  const replaceRes = await uploadFile("student_id", newStudentIdBuf, "new_student_id_card.jpg", "image/jpeg");
  assert(replaceRes.status === 200, "Replaced Student ID successfully");
  assert(replaceRes.data.document.id !== oldStuIdDoc.id, "New document ID issued on replacement");

  // 15. Document Removal Test (Remove one Academic Certification)
  console.log("\n--- Testing Document Removal ---");
  const removeCertId = acadCert2Res.data.document.id;
  const delRes = await fetch(`${BASE_URL}/api/student/verification/delete-document`, {
    method: "POST",
    headers: { ...authHeaders1, "Content-Type": "application/json" },
    body: JSON.stringify({ documentId: removeCertId }),
  });
  assert(delRes.status === 200, "Document removed successfully");

  const afterDelRes = await fetch(`${BASE_URL}/api/student/verification`, { headers: authHeaders1 });
  const afterDelData = await afterDelRes.json();
  const remainingAcadCerts = afterDelData.verification.documents.filter((d) => d.documentType === "academic_certifications");
  assert(Array.isArray(remainingAcadCerts) && remainingAcadCerts.length === 1, "Academic certifications count reduced to 1");

  // 16. Document Security & Access Control Test (Student Scoped Storage)
  console.log("\n--- Testing Student-Scoped Document Access Control ---");
  const targetDocId = replaceRes.data.document.id;
  // Owner accesses own document
  const ownerDocRes = await fetch(`${BASE_URL}/api/student/verification/document/${targetDocId}`, {
    headers: authHeaders1,
  });
  assert(ownerDocRes.status === 200, "Student 1 can access their own document");

  // Register Student 2
  const testId2 = `stu_sub_${Date.now()}_attacker`;
  const testEmail2 = `${testId2}@skillbridge.edu`;
  const regRes2 = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Bob Stranger",
      email: testEmail2,
      password: testPassword,
      role: "student",
    }),
  });
  const regData2 = await regRes2.json();
  await fetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail2,
      role: "student",
      otpCode: regData2.devOtp,
    }),
  });
  const loginRes2 = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail2,
      password: testPassword,
      role: "student",
    }),
  });
  const cookieHeader2 = (loginRes2.headers.get("set-cookie") || "").split(";")[0];
  const authHeaders2 = { Cookie: cookieHeader2 };

  // Student 2 attempts to fetch Student 1's document
  const attackerDocRes = await fetch(`${BASE_URL}/api/student/verification/document/${targetDocId}`, {
    headers: authHeaders2,
  });
  assert(attackerDocRes.status === 403, "Student 2 unauthorized access to Student 1 document rejected with 403 Forbidden");

  // 17. Complete Document Submission & Verify Transition to Interest Finder
  console.log("\n--- Completing Document Submission & Unlocking Interest Finder ---");
  const compRes = await fetch(`${BASE_URL}/api/student/verification/complete`, {
    method: "POST",
    headers: { ...authHeaders1, "Content-Type": "application/json" },
  });
  const compData = await compRes.json();
  assert(compRes.status === 200, "Document submission completion succeeded with 200");
  assert(compData.status === "VERIFIED", "Status is now VERIFIED");
  assert(compData.redirectTo === "/student/interest-finder", "Redirects to /student/interest-finder");

  // 19. Workflow Gating After Document Submission Completion:
  // Document Submission = COMPLETED, Interest Finder = AVAILABLE, Knowledge Testing = LOCKED
  const wfAfterRes = await fetch(`${BASE_URL}/api/student/workflow/status?checkPath=/student/knowledge-testing`, { headers: authHeaders1 });
  const wfAfterData = await wfAfterRes.json();
  const stages2 = wfAfterData.workflow.stages;
  assert(stages2[0].status === "completed", "Document Submission is now COMPLETED");
  assert(stages2[1].status === "available" || stages2[1].status === "in_progress", "Interest Finder is now AVAILABLE");
  assert(stages2[2].status === "locked", "Knowledge Testing remains LOCKED (Interest Finder must be completed first)");
  assert(wfAfterData.routeCheck.allowed === false, "Knowledge testing access still blocked before Interest Finder");
  assert(wfAfterData.routeCheck.redirectUrl === "/student/interest-finder", "Redirects to /student/interest-finder");

  // Dashboard is now accessible
  const dashAfter = await fetch(`${BASE_URL}/api/student/dashboard`, { headers: authHeaders1 });
  const dashAfterData = await dashAfter.json();
  assert(dashAfterData.success === true && !dashAfterData.requiresVerification, "Dashboard is accessible after Document Submission completed");

  // Attempt direct knowledge test start before Interest Finder completion
  const directKtRes = await fetch(`${BASE_URL}/api/student/knowledge-test/start`, {
    method: "POST",
    headers: { ...authHeaders1, "Content-Type": "application/json" },
    body: JSON.stringify({ difficulty: "intermediate" }),
  });
  assert(
    directKtRes.status === 403 || directKtRes.status === 400 || (await directKtRes.json()).redirectTo === "/student/interest-finder",
    "Direct Knowledge Testing start before Interest Finder is strictly blocked/redirected"
  );

  // 20. Complete Interest Finder -> Knowledge Testing becomes AVAILABLE
  console.log("\n--- Completing Interest Finder Assessment ---");
  const student1Id = otpData1.user.id;
  const confirmProfileRes = await fetch(`${BASE_URL}/api/student/interest-finder/confirm-profile`, {
    method: "POST",
    headers: { ...authHeaders1, "Content-Type": "application/json" },
    body: JSON.stringify({
      studentId: student1Id,
      action: "confirm",
      finalProfile: {
        mainDomainId: "web",
        mainDomainName: "Full-Stack Development",
        specificInterest: "Web Applications & APIs",
        explanation: "Strong affinity for user interface systems and scalable backends.",
        confidence: 0.94,
      },
    }),
  });
  const confirmProfileData = await confirmProfileRes.json();
  assert(confirmProfileData.success === true, "Interest Finder completed successfully");

  // Re-check canonical workflow state:
  // Interest Finder = COMPLETED, Knowledge Testing = AVAILABLE
  const wfUnlockedRes = await fetch(`${BASE_URL}/api/student/workflow/status?checkPath=/student/knowledge-testing`, { headers: authHeaders1 });
  const wfUnlockedData = await wfUnlockedRes.json();
  const stages3 = wfUnlockedData.workflow.stages;
  const stageInterest = stages3.find((s) => s.slug === "interest-finder");
  const stageKnowledge = stages3.find((s) => s.slug === "knowledge-testing");
  assert(stageInterest.status === "completed", "Interest Finder is now COMPLETED");
  assert(stageKnowledge.status === "available", "Knowledge Testing is now AVAILABLE");
  assert(stageKnowledge.isLocked === false, "Knowledge Testing is NOT locked");
  assert(wfUnlockedData.routeCheck.allowed === true, "Route access to /student/knowledge-testing is now ALLOWED");

  // 21. Knowledge Testing Session Starts
  console.log("\n--- Starting Knowledge Testing Session ---");
  const ktStartRes = await fetch(`${BASE_URL}/api/student/knowledge-test/start`, {
    method: "POST",
    headers: { ...authHeaders1, "Content-Type": "application/json" },
    body: JSON.stringify({ difficulty: "intermediate" }),
  });
  const ktStartData = await ktStartRes.json();
  assert(ktStartRes.status === 200 && ktStartData.success === true, "Knowledge Testing session started successfully");
  assert(ktStartData.question, "Calibrated technical question returned");
  assert(ktStartData.totalQuestions === 10, "10-question evaluation active");

  // 22. Returning Verified Student Login: Redirects to Dashboard
  console.log("\n--- Testing Verified Returning Student Login ---");
  const returnLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail1,
      password: testPassword,
      role: "student",
    }),
  });
  const returnLoginData = await returnLoginRes.json();
  assert(returnLoginRes.status === 200 && returnLoginData.success === true, "Verified student login succeeded");
  assert(returnLoginData.redirectUrl === "/student/dashboard", "Verified student login redirects to /student/dashboard");

  console.log("\n===============================================================");
  console.log(`ALL ${results.length} VERIFICATION & WORKFLOW TESTS PASSED CLEANLY!`);
  console.log("===============================================================\n");
}

runTests().catch((err) => {
  console.error("Test Suite Failed:", err);
  process.exit(1);
});
