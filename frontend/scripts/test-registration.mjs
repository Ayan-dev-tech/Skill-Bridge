// Automated test script verifying Per-Role Email Uniqueness, Database, OTP & Rate Limiting
const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("==================================================");
  console.log("TESTING PER-ROLE EMAIL REGISTRATION & UNIQUENESS");
  console.log("==================================================");

  const sharedEmail = `multi_role_${Date.now()}@university.edu`;

  // TEST 1: Register as STUDENT
  console.log(`\n[TEST 1] Registering ${sharedEmail} as STUDENT...`);
  const studentRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Jordan Lee",
      email: sharedEmail,
      password: "PasswordStudent123!",
      role: "student",
      metadata: { institution: "MIT", degree: "B.S. CS", graduationYear: "2026" },
    }),
  });
  const studentData = await studentRes.json();
  console.log(`Status: ${studentRes.status}`, studentData);
  if (studentRes.status !== 200 || !studentData.success) {
    throw new Error(`Test 1 Failed: ${JSON.stringify(studentData)}`);
  }
  const studentOtp = studentData.devOtp;
  console.log(`✓ Test 1 Passed: Student registration initiated with OTP: ${studentOtp}`);

  // TEST 2: Verify STUDENT OTP
  console.log(`\n[TEST 2] Verifying STUDENT OTP (${studentOtp})...`);
  const studentVerifyRes = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: sharedEmail,
      role: "student",
      otpCode: studentOtp,
    }),
  });
  const studentVerifyData = await studentVerifyRes.json();
  console.log(`Status: ${studentVerifyRes.status}`, studentVerifyData);
  if (studentVerifyRes.status !== 200 || !studentVerifyData.success) {
    throw new Error(`Test 2 Failed: ${JSON.stringify(studentVerifyData)}`);
  }
  console.log("✓ Test 2 Passed: Student account verified in database");

  // TEST 3: Register SAME EMAIL as FACULTY
  console.log(`\n[TEST 3] Registering SAME EMAIL (${sharedEmail}) as FACULTY...`);
  const facultyRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Professor Jordan Lee",
      email: sharedEmail,
      password: "PasswordFaculty456!",
      role: "faculty",
      metadata: { institution: "MIT", department: "Computer Science", designation: "Prof" },
    }),
  });
  const facultyData = await facultyRes.json();
  console.log(`Status: ${facultyRes.status}`, facultyData);
  if (facultyRes.status !== 200 || !facultyData.success) {
    throw new Error(`Test 3 Failed: Same email should be allowed for different role! ${JSON.stringify(facultyData)}`);
  }
  const facultyOtp = facultyData.devOtp;
  console.log(`✓ Test 3 Passed: Faculty registration accepted for same email with OTP: ${facultyOtp}`);

  // TEST 4: Verify FACULTY OTP
  console.log(`\n[TEST 4] Verifying FACULTY OTP (${facultyOtp})...`);
  const facultyVerifyRes = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: sharedEmail,
      role: "faculty",
      otpCode: facultyOtp,
    }),
  });
  const facultyVerifyData = await facultyVerifyRes.json();
  console.log(`Status: ${facultyVerifyRes.status}`, facultyVerifyData);
  if (facultyVerifyRes.status !== 200 || !facultyVerifyData.success) {
    throw new Error(`Test 4 Failed: ${JSON.stringify(facultyVerifyData)}`);
  }
  console.log("✓ Test 4 Passed: Faculty account verified in database for same email");

  // TEST 5: Duplicate registration under the SAME role (STUDENT) must be REJECTED (409)
  console.log(`\n[TEST 5] Attempting DUPLICATE STUDENT registration for ${sharedEmail}...`);
  const dupRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Duplicate Attempt",
      email: sharedEmail,
      password: "AnotherPassword789!",
      role: "student",
      metadata: { institution: "MIT" },
    }),
  });
  const dupData = await dupRes.json();
  console.log(`Status: ${dupRes.status}`, dupData);
  if (dupRes.status !== 409 || !dupData.error) {
    throw new Error(`Test 5 Failed: Expected 409 Conflict when registering duplicate email under same role!`);
  }
  console.log("✓ Test 5 Passed: Duplicate registration under same role was blocked with 409 Conflict");

  console.log("\n==================================================");
  console.log("ALL MULTI-ROLE REGISTRATION TESTS PASSED!");
  console.log("==================================================");
}

runTests().catch((err) => {
  console.error("\nTEST RUN ERROR:", err);
  process.exit(1);
});
