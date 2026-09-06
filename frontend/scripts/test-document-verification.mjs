/**
 * Comprehensive Automated Verification Suite for Document Verification Module
 * Tests file format validation, file size boundaries, magic bytes, Python OCR,
 * biometric face validation, onboarding gating, dashboard status updates, and sequential progression.
 */

import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";
const PYTHON_URL = "http://127.0.0.1:8000";

let passedCount = 0;
let totalCount = 0;

function assert(condition, message) {
  totalCount++;
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function runTests() {
  console.log("\n=======================================================");
  console.log("   SKILL BRIDGE — DOCUMENT VERIFICATION TEST SUITE");
  console.log("=======================================================\n");

  // 1. Check Python OCR Microservice Health
  console.log("1. Checking Python OCR & Biometric Engine...");
  try {
    const pyRes = await fetch(`${PYTHON_URL}/health`);
    const pyData = await pyRes.json();
    assert(pyRes.status === 200 && pyData.status === "ok", "Python OCR service is healthy on port 8000");
  } catch (err) {
    console.error("Python service error:", err);
    assert(false, "Python OCR microservice must be running on port 8000");
  }

  // 2. Test Verification Status API for fresh student
  console.log("\n2. Testing GET /api/student/verification...");
  const testStudentId = `stu_verify_test_${Date.now()}`;
  const statusRes = await fetch(`${BASE_URL}/api/student/verification`, {
    headers: { "x-student-id": testStudentId },
  });
  assert(statusRes.status === 200, "GET /api/student/verification returned HTTP 200");
  const statusData = await statusRes.json();
  assert(statusData.success === true, "Returned success: true");
  assert(statusData.verification.verificationStatus === "NOT_STARTED", "Fresh student status is NOT_STARTED");
  assert(statusData.allRequiredUploaded === false, "allRequiredUploaded is false initially");
  assert(statusData.canProceedToInterestFinder === false, "canProceedToInterestFinder is false initially");
  assert(Array.isArray(statusData.documentTypes) && statusData.documentTypes.length >= 2, "Configurable document types returned");

  // 3. Test File Format Validation (Reject unsupported formats e.g. .txt, .docx, .exe)
  console.log("\n3. Testing Unsupported File Format Rejection...");
  const fakeTxtFile = new Blob(["Hello text file"], { type: "text/plain" });
  const formTxt = new FormData();
  formTxt.append("file", fakeTxtFile, "test.txt");
  formTxt.append("documentType", "student_id");

  const txtRes = await fetch(`${BASE_URL}/api/student/verification/upload-document`, {
    method: "POST",
    headers: { "x-student-id": testStudentId },
    body: formTxt,
  });
  const txtData = await txtRes.json();
  assert(txtRes.status === 400, "Non-supported file format rejected with HTTP 400");
  assert(txtData.error === "Only PNG, JPG and PDF files are supported.", `Correct validation message: ${txtData.error}`);

  // 4. Test Image Size Limit (> 2 MB rejected)
  console.log("\n4. Testing Image Size Limit (> 2 MB)...");
  const largeImgBuffer = Buffer.alloc(2.5 * 1024 * 1024); // 2.5 MB
  // Fake PNG header
  largeImgBuffer[0] = 0x89;
  largeImgBuffer[1] = 0x50;
  largeImgBuffer[2] = 0x4e;
  largeImgBuffer[3] = 0x47;
  const largeImgBlob = new Blob([largeImgBuffer], { type: "image/png" });
  const formLargeImg = new FormData();
  formLargeImg.append("file", largeImgBlob, "oversized_id.png");
  formLargeImg.append("documentType", "student_id");

  const largeImgRes = await fetch(`${BASE_URL}/api/student/verification/upload-document`, {
    method: "POST",
    headers: { "x-student-id": testStudentId },
    body: formLargeImg,
  });
  const largeImgData = await largeImgRes.json();
  assert(largeImgRes.status === 400, "Image > 2 MB rejected with HTTP 400");
  assert(largeImgData.error === "Image documents must be 2 MB or smaller.", `Correct validation message: ${largeImgData.error}`);

  // 5. Test PDF Size Limit (> 5 MB rejected)
  console.log("\n5. Testing PDF Size Limit (> 5 MB)...");
  const largePdfBuffer = Buffer.alloc(5.5 * 1024 * 1024); // 5.5 MB
  largePdfBuffer.write("%PDF-1.4");
  const largePdfBlob = new Blob([largePdfBuffer], { type: "application/pdf" });
  const formLargePdf = new FormData();
  formLargePdf.append("file", largePdfBlob, "huge_transcript.pdf");
  formLargePdf.append("documentType", "academic_transcript");

  const largePdfRes = await fetch(`${BASE_URL}/api/student/verification/upload-document`, {
    method: "POST",
    headers: { "x-student-id": testStudentId },
    body: formLargePdf,
  });
  const largePdfData = await largePdfRes.json();
  assert(largePdfRes.status === 400, "PDF > 5 MB rejected with HTTP 400");
  assert(largePdfData.error === "PDF documents must be 5 MB or smaller.", `Correct validation message: ${largePdfData.error}`);

  // 6. Test Valid PNG Upload & Python OCR Processing
  console.log("\n6. Testing Valid PNG Document Upload & Python OCR Extraction...");
  // Create 1x1 valid PNG
  const validPngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  const validPngBuffer = Buffer.from(validPngBase64, "base64");
  const validPngBlob = new Blob([validPngBuffer], { type: "image/png" });
  const formValidPng = new FormData();
  formValidPng.append("file", validPngBlob, "student_id_card.png");
  formValidPng.append("documentType", "student_id");

  const pngUploadRes = await fetch(`${BASE_URL}/api/student/verification/upload-document`, {
    method: "POST",
    headers: { "x-student-id": testStudentId },
    body: formValidPng,
  });
  const pngUploadData = await pngUploadRes.json();
  assert(pngUploadRes.status === 200, "Valid PNG upload returned HTTP 200");
  assert(pngUploadData.success === true, "PNG upload marked success");
  assert(pngUploadData.document.ocrStatus === "completed", "OCR marked status: completed");
  assert(pngUploadData.document.ocrData.confidence > 0, `Confidence calculated: ${pngUploadData.document.ocrData.confidence}`);

  // 7. Test Valid PDF Upload & Digital OCR Processing
  console.log("\n7. Testing Valid PDF Marksheet Upload & Text Extraction...");
  // Minimal valid PDF with student metadata text
  const pdfSample = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj
4 0 obj << /Length 135 >> stream
BT
/F1 12 Tf
72 700 Td
(NATIONAL INSTITUTE OF TECHNOLOGY) Tj
0 -20 Td
(Student Name: Alex Rivera) Tj
0 -20 Td
(Roll No: 2024-CS-042) Tj
0 -20 Td
(Semester 6 Marksheet CGPA: 8.92) Tj
ET
endstream endobj
5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000430 00000 n 
trailer << /Size 6 /Root 1 0 R >>
startxref
503
%%EOF`;
  const validPdfBuffer = Buffer.from(pdfSample);
  const validPdfBlob = new Blob([validPdfBuffer], { type: "application/pdf" });
  const formValidPdf = new FormData();
  formValidPdf.append("file", validPdfBlob, "academic_marksheet_sem6.pdf");
  formValidPdf.append("documentType", "academic_transcript");

  const pdfUploadRes = await fetch(`${BASE_URL}/api/student/verification/upload-document`, {
    method: "POST",
    headers: { "x-student-id": testStudentId },
    body: formValidPdf,
  });
  const pdfUploadData = await pdfUploadRes.json();
  assert(pdfUploadRes.status === 200, "Valid PDF upload returned HTTP 200");
  assert(pdfUploadData.success === true, "PDF upload marked success");
  assert(pdfUploadData.document.ocrStatus === "completed", "PDF OCR marked completed");
  assert(pdfUploadData.document.ocrData.rawText.includes("NATIONAL INSTITUTE") || pdfUploadData.document.ocrData.rawText.includes("Alex Rivera"), "OCR accurately extracted collegiate text");

  // 8. Test Live Face Capture Pipeline
  console.log("\n8. Testing Live Face Capture & Quality Validation...");

  // 8a. Test Low-Res / Invalid Frame Rejection
  const badFrameRes = await fetch(`${BASE_URL}/api/student/verification/capture-face`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-student-id": testStudentId,
    },
    body: JSON.stringify({
      imageBase64: "data:image/png;base64," + validPngBase64, // 1x1 image
      captureMode: "auto",
    }),
  });
  assert(badFrameRes.status === 422, "1x1 invalid face frame rejected with HTTP 422");

  // 8b. Test Valid 320x320 Face Capture Frame
  function createTestBmp(width, height) {
    const rowSize = Math.floor((24 * width + 31) / 32) * 4;
    const pixelArraySize = rowSize * height;
    const fileSize = 54 + pixelArraySize;
    const buf = Buffer.alloc(fileSize);

    buf.write("BM", 0);
    buf.writeUInt32LE(fileSize, 2);
    buf.writeUInt32LE(54, 10);
    buf.writeUInt32LE(40, 14);
    buf.writeInt32LE(width, 18);
    buf.writeInt32LE(height, 22);
    buf.writeUInt16LE(1, 26);
    buf.writeUInt16LE(24, 28);
    buf.writeUInt32LE(0, 30);
    buf.writeUInt32LE(pixelArraySize, 34);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const offset = 54 + (height - 1 - y) * rowSize + x * 3;
        const dx = (x - width / 2) / (width * 0.25);
        const dy = (y - height / 2) / (height * 0.35);
        const dist = dx * dx + dy * dy;

        if (dist < 1.0) {
          buf[offset] = 120 + ((x + y) % 40);
          buf[offset + 1] = 150 + ((x * y) % 30);
          buf[offset + 2] = 200 + (x % 20);
        } else {
          buf[offset] = 80;
          buf[offset + 1] = 80;
          buf[offset + 2] = 80;
        }
      }
    }
    return buf;
  }

  const validBmpBuf = createTestBmp(320, 320);
  const testFaceBase64 = "data:image/bmp;base64," + validBmpBuf.toString("base64");

  const faceRes = await fetch(`${BASE_URL}/api/student/verification/capture-face`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-student-id": testStudentId,
    },
    body: JSON.stringify({
      imageBase64: testFaceBase64,
      captureMode: "auto",
    }),
  });
  const faceData = await faceRes.json();
  assert(faceRes.status === 200, "Valid face capture returned HTTP 200");
  assert(faceData.success === true, "Face capture marked success");
  assert(faceData.faceCapture.faceDetected === true, "Face detected marked true");
  assert(faceData.faceCapture.qualityPassed === true, "Quality checks passed");

  // 9. Finalize Verification
  console.log("\n9. Testing Finalize Verification Completion...");
  const compRes = await fetch(`${BASE_URL}/api/student/verification/complete`, {
    method: "POST",
    headers: { "x-student-id": testStudentId },
  });
  const compData = await compRes.json();
  assert(compRes.status === 200, "Complete verification returned HTTP 200");
  assert(compData.success === true, "Verification marked successfully completed");
  assert(compData.verification.verificationStatus === "VERIFIED", "Status is VERIFIED");
  assert(compData.redirectUrl === "/student/interest-finder", "Redirect URL points to Interest Finder");

  // 10. Verify Interest Finder is now UNLOCKED for this student
  console.log("\n10. Testing Interest Finder Unlocking for Verified Student...");
  const ifSessionRes = await fetch(`${BASE_URL}/api/student/interest-finder/session`, {
    headers: { "x-student-id": testStudentId },
  });
  const ifSessionData = await ifSessionRes.json();
  assert(ifSessionRes.status === 200, "Interest Finder session returned HTTP 200");
  assert(ifSessionData.isVerified === true, "isVerified is true");
  assert(ifSessionData.requiresVerification === false, "requiresVerification is false");

  // 11. Verify Unverified Student is BLOCKED from Interest Finder
  console.log("\n11. Testing Interest Finder Gating for Unverified Student...");
  const unverifiedStudentId = `stu_unverified_${Date.now()}`;
  const blockedStartRes = await fetch(`${BASE_URL}/api/student/interest-finder/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-student-id": unverifiedStudentId,
    },
    body: JSON.stringify({ studentId: unverifiedStudentId }),
  });
  const blockedData = await blockedStartRes.json();
  assert(blockedStartRes.status === 403, "Unverified student blocked with HTTP 403");
  assert(blockedData.requiresVerification === true, "requiresVerification is true in response");
  assert(blockedData.redirectUrl === "/student/document-verification", "Redirects to /student/document-verification");

  // 12. Verify Dashboard Stages & Sequential Progression
  console.log("\n12. Testing Dashboard Progression Updates...");
  const dashRes = await fetch(`${BASE_URL}/api/student/dashboard`, {
    headers: { "x-student-id": testStudentId },
  });
  const dashData = await dashRes.json();
  assert(dashRes.status === 200, "Dashboard API returned HTTP 200");
  assert(dashData.sections[0].id === "document-verification", "Section 1 is Document Verification");
  assert(dashData.sections[0].status === "completed", "Section 1 status is completed");
  assert(dashData.sections[1].id === "interest-finder", "Section 2 is Interest Finder");
  assert(dashData.sections[1].status === "available", "Section 2 status is available");
  assert(dashData.sections[2].id === "knowledge-testing", "Section 3 is Knowledge Testing");
  assert(dashData.sections[2].status === "locked", "Section 3 status is locked");
  assert(dashData.currentFocus.stage === 2, "Current focus advanced to Stage 2 (Interest Finder)");

  // 13. Verify HTTP UI Routes
  console.log("\n13. Testing UI Route Responses (HTTP 200)...");
  const routes = [
    "/student/document-verification",
    "/student/documents",
    "/student/dashboard",
    "/student/interest-finder",
    "/student/knowledge-testing",
  ];
  for (const r of routes) {
    const res = await fetch(`${BASE_URL}${r}`);
    assert(res.status === 200, `Route ${r} returned HTTP 200`);
  }

  console.log("\n=======================================================");
  console.log(`   ALL ${passedCount}/${totalCount} TESTS PASSED CLEANLY!`);
  console.log("=======================================================\n");
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
