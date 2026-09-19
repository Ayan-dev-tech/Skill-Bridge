// Targeted Verification Script for AYUSH Codebase Cleanup & Temporary Registration Mode
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";

async function runVerification() {
  console.log("================================================================================");
  console.log("AYUSH CODEBASE CLEANUP & REGISTRATION OTP BYPASS VALIDATION");
  console.log("================================================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failed++;
    }
  }

  // 1. ADMIN SELF-REGISTRATION MUST BE BLOCKED
  console.log("1. Testing Admin Self-Registration Protection...");
  try {
    const adminRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Fake Admin",
        email: `fake_admin_${Date.now()}@test.com`,
        password: "Password123!",
        role: "admin",
      }),
    });
    const adminData = await adminRes.json();
    assert(adminRes.status === 403, `Admin registration returns 403 (got ${adminRes.status})`);
    assert(adminData.error && adminData.error.includes("accounts cannot be self-registered"), "Admin registration error message explicit");
  } catch (err) {
    assert(false, `Admin registration test error: ${err.message}`);
  }

  // 2. REGISTRATION FOR 4 ROLES WITHOUT OTP
  const roles = [
    { role: "student", name: "Ananya Sharma", metadata: { institution: "National Institute of Ayurveda", degree: "BAMS", graduationYear: "2026" } },
    { role: "faculty", name: "Dr. Rajeshwar Singh", metadata: { institution: "All India Institute of Ayurveda", department: "Kayachikitsa", designation: "Associate Professor" } },
    { role: "campus", name: "NIA Placement Cell", metadata: { campusName: "National Institute of Ayurveda, Jaipur", campusCode: "NIA-JPR" } },
    { role: "industry", name: "Patanjali Research HR", metadata: { companyName: "Patanjali Research Foundation", industryDomain: "Ayurvedic Healthcare & Formulations" } },
  ];

  console.log("\n2. Testing Registration for All 4 Roles (OTP Bypassed via EMAIL_VERIFICATION_REQUIRED=false)...");
  for (const { role, name, metadata } of roles) {
    const testEmail = `ayush_${role}_${Date.now()}@ayush-test.edu`;
    const testPassword = `Password_${role}_123!`;

    try {
      const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          email: testEmail,
          password: testPassword,
          role,
          metadata,
        }),
      });
      const regData = await regRes.json();

      assert(regRes.status === 200 && regData.success === true, `${role.toUpperCase()} registration succeeded (status 200)`);
      assert(regData.requiresOtp === false, `${role.toUpperCase()} requiresOtp is false (bypassed)`);
      assert(!regData.devOtp, `${role.toUpperCase()} no devOtp returned in response`);
      assert(!regData.otp, `${role.toUpperCase()} no otp returned in response`);

      // 3. IMMEDIATE LOGIN WITHOUT OTP VERIFICATION STEP
      const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
          role,
        }),
      });
      const loginData = await loginRes.json();
      assert(loginRes.status === 200 && loginData.success === true, `${role.toUpperCase()} direct login succeeded without OTP`);
      assert(loginData.user?.role === role, `${role.toUpperCase()} logged in with correct role`);
    } catch (err) {
      assert(false, `${role.toUpperCase()} flow error: ${err.message}`);
    }
  }

  // 4. AUTH SECURITY: NO GUEST / DEFAULT USER FALLBACK
  console.log("\n3. Testing Auth Protection (No Guest/Default-User Fallbacks)...");
  try {
    const unauthRes = await fetch(`${BASE_URL}/api/student/applications`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    assert(unauthRes.status === 401, `Unauthenticated request returns 401 Unauthorized (got ${unauthRes.status})`);
  } catch (err) {
    assert(false, `Auth protection test error: ${err.message}`);
  }

  // 5. RESUME CHECKER ROUTE REMOVAL
  console.log("\n4. Testing Resume Checker Removal...");
  try {
    const resumeAnalyzeRes = await fetch(`${BASE_URL}/api/student/resume/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText: "sample" }),
    });
    assert(resumeAnalyzeRes.status === 404, `Resume analyze API is 404 Not Found (got ${resumeAnalyzeRes.status})`);
  } catch (err) {
    assert(false, `Resume checker route test error: ${err.message}`);
  }

  // 6. AYUSH READINESS & APPLICATION EVALUATION
  console.log("\n5. Testing AYUSH Readiness & Applications (Profile-based, No Resume Checker)...");
  try {
    // Find or test readiness endpoint with invalid jobId returns 404 or 400
    const readyRes = await fetch(`${BASE_URL}/api/student/applications/readiness?jobId=non-existent-id`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": "sb_student_id=test_student_id",
      },
    });
    // Should return 401 (since test_student_id is not authenticated in DB) or 404
    assert(readyRes.status === 401 || readyRes.status === 404, `Readiness endpoint handles requests properly (status ${readyRes.status})`);
  } catch (err) {
    assert(false, `AYUSH readiness test error: ${err.message}`);
  }

  // 7. PERSISTENCE INTEGRITY: NO LOCAL DISK WRITE
  console.log("\n6. Verifying Filesystem Persistence Removal...");
  const dataDir = path.resolve(process.cwd(), "frontend", "data");
  const localDbFile = path.join(dataDir, "skill_bridge.json");
  const storageDir = path.join(dataDir, "storage");
  const uploadDir = path.join(dataDir, "verification_uploads");

  assert(!fs.existsSync(storageDir), "Local storage directory (data/storage) does not exist");
  assert(!fs.existsSync(uploadDir), "Local uploads directory (data/verification_uploads) does not exist");

  console.log("\n================================================================================");
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("================================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runVerification().catch((e) => {
  console.error("Fatal test error:", e);
  process.exit(1);
});
