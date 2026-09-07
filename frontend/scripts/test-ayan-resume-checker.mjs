import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";
const AYAN_RESUME_PATH = "C:\\Users\\agzhe\\Desktop\\AYAN PARMAR RESUME.pdf";

async function runTests() {
  console.log("================================================================================");
  console.log("SKILL BRIDGE — RESUME CHECKER & AYAN PARMAR RESUME VERIFICATION");
  console.log("================================================================================");

  let passed = 0;
  let failed = 0;

  function assert(cond, msg) {
    if (cond) {
      console.log(`  ✓ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${msg}`);
      failed++;
      throw new Error(`Assertion failed: ${msg}`);
    }
  }

  // 1. Verify AYAN PARMAR RESUME.pdf file exists
  assert(fs.existsSync(AYAN_RESUME_PATH), `Target test file exists at ${AYAN_RESUME_PATH}`);
  const pdfBuffer = fs.readFileSync(AYAN_RESUME_PATH);
  assert(pdfBuffer.length > 1000 && pdfBuffer.length <= 5 * 1024 * 1024, `Valid file size: ${pdfBuffer.length} bytes (under 5 MB)`);

  // 2. Test AYAN PARMAR RESUME.pdf upload via multipart/form-data without Job Description
  console.log("\nTEST: AYAN PARMAR RESUME.pdf upload (General ATS Analysis)");
  const formData = new FormData();
  formData.append("file", new Blob([pdfBuffer], { type: "application/pdf" }), "AYAN PARMAR RESUME.pdf");

  const res1 = await fetch(`${BASE_URL}/api/student/resume/analyze`, {
    method: "POST",
    headers: {
      "x-student-id": "stu_ayan_test_01",
    },
    body: formData,
  });

  const json1 = await res1.json();
  if (res1.status !== 200) {
    console.error("HTTP error response json1:", json1);
  }
  assert(res1.status === 200, `Returns HTTP 200 OK (got status ${res1.status})`);
  assert(json1.success === true, "success is true");
  assert(json1.isResume === true, "isResume is true (correctly recognized as legitimate resume)");
  assert(typeof json1.analysis.overallScore === "number", `overallScore is numeric: ${json1.analysis.overallScore}`);
  assert(json1.analysis.categoryScores.parseability > 0, `Parseability score: ${json1.analysis.categoryScores.parseability}`);
  assert(json1.analysis.categoryScores.structure > 0, `Structure score: ${json1.analysis.categoryScores.structure}`);
  assert(json1.analysis.categoryScores.contentQuality > 0, `Content Quality score: ${json1.analysis.categoryScores.contentQuality}`);
  assert(json1.analysis.categoryScores.jobMatch === null, "jobMatch is null when no job description is supplied");
  assert(typeof json1.analysis.disclaimer === "string", "Includes ATS disclaimer");
  console.log("Detected Sections:", json1.analysis.detectedSections);
  console.log("Matched Keywords:", json1.analysis.matchedKeywords);

  // 3. Test AYAN PARMAR RESUME.pdf with Job Description (Job Match Analysis)
  console.log("\nTEST: AYAN PARMAR RESUME.pdf with Job Description");
  const jobDesc = `
    Frontend UI/UX Developer.
    Required skills: HTML, CSS, JavaScript, React, Figma, Designing, Web Technologies.
    Responsibilities: Create modern responsive web applications and user interfaces.
  `;
  const formDataWithJob = new FormData();
  formDataWithJob.append("file", new Blob([pdfBuffer], { type: "application/pdf" }), "AYAN PARMAR RESUME.pdf");
  formDataWithJob.append("jobDescription", jobDesc);
  formDataWithJob.append("targetRole", "Frontend UI/UX Developer");

  const res2 = await fetch(`${BASE_URL}/api/student/resume/analyze`, {
    method: "POST",
    headers: {
      "x-student-id": "stu_ayan_test_01",
    },
    body: formDataWithJob,
  });

  const json2 = await res2.json();
  assert(res2.status === 200, `Returns HTTP 200 OK with JD (got status ${res2.status})`);
  assert(json2.success === true, "success is true with JD");
  assert(json2.isResume === true, "isResume is true with JD");
  assert(typeof json2.analysis.categoryScores.jobMatch === "number", `Calculated numeric jobMatch score: ${json2.analysis.categoryScores.jobMatch}`);
  assert(json2.analysis.hasJobDescription === true, "flags hasJobDescription: true");
  console.log("Job Match Score:", json2.analysis.categoryScores.jobMatch);
  console.log("Matched Keywords with JD:", json2.analysis.matchedKeywords);

  // 4. Test Rejection of Non-PDF formats
  console.log("\nTEST: Rejection of TXT / Non-PDF format");
  const badFormData = new FormData();
  badFormData.append("file", new Blob(["My Name\nSoftware Engineer\nPython, Java"], { type: "text/plain" }), "resume.txt");

  const res3 = await fetch(`${BASE_URL}/api/student/resume/analyze`, {
    method: "POST",
    headers: { "x-student-id": "stu_ayan_test_01" },
    body: badFormData,
  });
  assert(res3.status === 400, "TXT upload rejected with HTTP 400");
  const json3 = await res3.json();
  assert(json3.success === false, "success is false for TXT");

  // 5. Test Rejection of Fake PDF (bad magic bytes)
  console.log("\nTEST: Rejection of Fake PDF");
  const fakePdfFormData = new FormData();
  fakePdfFormData.append("file", new Blob(["NOT A REAL PDF FILE HEADER"], { type: "application/pdf" }), "fake.pdf");

  const res4 = await fetch(`${BASE_URL}/api/student/resume/analyze`, {
    method: "POST",
    headers: { "x-student-id": "stu_ayan_test_01" },
    body: fakePdfFormData,
  });
  assert(res4.status === 400, "Fake PDF rejected with HTTP 400");

  console.log("\n================================================================================");
  console.log(`VERIFICATION COMPLETED: ${passed} PASSED, ${failed} FAILED`);
  console.log("================================================================================");
}

runTests().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
