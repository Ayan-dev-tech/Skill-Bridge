// Verification script for Skill-Bridge Student UI Foundation & Post-Login Flow
// Running strictly from D: drive workspace
import assert from "assert";

const BASE_URL = "http://localhost:3000";

async function runStudentVerification() {
  console.log("==========================================================");
  console.log("Starting Skill-Bridge Student UI Foundation Test Suite");
  console.log("==========================================================");

  // 1. Check Student Login & Redirection to /student
  console.log("\n[TEST 1] Testing Student Authentication and /student Routing");

  // We have Alex Rivera in our db: alex.rivera@nit.edu or test_student_1788629331716@university.edu
  // Let's create or verify a test student
  const testStudentEmail = `student_tester_${Date.now()}@university.edu`;
  const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Alex Rivera",
      email: testStudentEmail,
      password: "password123",
      role: "student",
      metadata: {
        department: "Computer Science & Engineering",
        course: "B.Tech CSE",
        semester: 6,
        rollNumber: "NIT-CSE-2022-042",
      },
    }),
  });
  const regData = await regRes.json();
  console.log("Registration Response:", regRes.status, regData);
  assert.strictEqual(regRes.status, 200, "Student registration should succeed");

  // Verify OTP
  const otpRes = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testStudentEmail,
      role: "student",
      otpCode: regData.devOtp,
    }),
  });
  const otpData = await otpRes.json();
  console.log("OTP Verification:", otpRes.status, otpData);
  assert.strictEqual(otpRes.status, 200, "OTP verification should succeed");

  // Now Login as Student
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testStudentEmail,
      password: "password123",
      role: "student",
    }),
  });
  const loginData = await loginRes.json();
  console.log("Student Login Result:", loginRes.status, loginData);
  assert.strictEqual(loginRes.status, 200, "Student login should return HTTP 200");
  assert.strictEqual(loginData.redirectUrl, "/student/document-verification", "Student must be routed to /student/document-verification");
  console.log("✓ TEST 1 PASSED: Student successfully authenticated and directed to /student/document-verification.");

  // 2. Verify /student Renders Interest Finder Entry Screen
  console.log("\n[TEST 2] Testing /student Post-Login Entry & Interest Finder Messaging");
  const studentPageRes = await fetch(`${BASE_URL}/student`);
  assert.strictEqual(studentPageRes.status, 200, "/student must respond with HTTP 200");
  const studentHtml = await studentPageRes.text();

  // Check required messaging
  assert.ok(
    studentHtml.includes("Let&#x27;s discover what part of your chosen field interests you") ||
      studentHtml.includes("discover what part of your chosen field interests you"),
    "Must feature exact required concept: 'Let's discover what part of your chosen field interests you'"
  );
  assert.ok(studentHtml.includes("Interest Finder"), "Must contain Interest Finder branding");
  assert.ok(studentHtml.includes("Stage 1"), "Must identify Stage 1 of journey");

  // Check the 5 broad domains
  const expectedDomains = [
    "AI / Machine Learning",
    "Cloud &amp; Infrastructure",
    "Web &amp; Full-Stack Systems",
    "Cybersecurity &amp; Defense",
    "Software &amp; Core Systems",
  ];
  for (const domain of expectedDomains) {
    const rawDomain = domain.replace(/&amp;/g, "&");
    const found = studentHtml.includes(domain) || studentHtml.includes(rawDomain);
    assert.ok(found, `HTML must display domain: ${rawDomain}`);
  }
  console.log("✓ TEST 2 PASSED: /student correctly renders the Interest Finder entry experience with 5 domains.");

  // 3. Verify All Student Routes (Navigation Pipeline)
  console.log("\n[TEST 3] Testing All 10 Student Routes");
  const routesToTest = [
    { route: "/student/interest-finder", expectText: "Interest Finder" },
    { route: "/student/knowledge-testing", expectText: "Knowledge Testing" },
    { route: "/student/documents", expectText: "Document Verification" },
    { route: "/student/skill-gap", expectText: "Skill Gap" },
    { route: "/student/learning", expectText: "Learning" },
    { route: "/student/resume", expectText: "Resume Builder" },
    { route: "/student/opportunities", expectText: "Jobs &amp; Internships" },
    { route: "/student/applications", expectText: "Track Applications" },
    { route: "/student/profile", expectText: "Student Academic Profile" },
    { route: "/student/settings", expectText: "Student Account &amp; Preferences" },
    { route: "/student/about", expectText: "About Skill Bridge" },
  ];

  for (const item of routesToTest) {
    const res = await fetch(`${BASE_URL}${item.route}`);
    assert.strictEqual(res.status, 200, `${item.route} must return HTTP 200`);
    const text = await res.text();
    const rawExpected = item.expectText.replace(/&amp;/g, "&");
    const hasText = text.includes(item.expectText) || text.includes(rawExpected);
    assert.ok(hasText, `${item.route} must render: ${rawExpected}`);

    // Verify footer presence on student pages
    assert.ok(text.includes("© 2026 Skill Bridge. All rights reserved."), "Footer copyright must be present");
    assert.ok(text.includes("Skill Bridge connects student interests"), "Footer description must be present");

    console.log(`  ✓ Route ${item.route.padEnd(30)} -> HTTP 200 (OK)`);
  }
  console.log("✓ TEST 3 PASSED: All student routes and footer render cleanly.");

  // 4. Verify Admin Login Still Routes to /admin
  console.log("\n[TEST 4] Testing Admin Login Continues to Route to /admin");
  const adminLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@gmail.com",
      password: "admin@123",
      role: "student",
    }),
  });
  const adminLoginData = await adminLoginRes.json();
  assert.strictEqual(adminLoginRes.status, 200, "Admin login must succeed");
  assert.strictEqual(adminLoginData.isAdmin, true, "Admin must have isAdmin: true");
  assert.strictEqual(adminLoginData.redirectUrl, "/admin", "Admin must still be routed to /admin");
  console.log("✓ TEST 4 PASSED: Admin segregation maintained.");

  console.log("\n==========================================================");
  console.log("ALL STUDENT UI FOUNDATION TESTS PASSED SUCCESSFULLY! 🚀");
  console.log("==========================================================");
}

runStudentVerification().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
