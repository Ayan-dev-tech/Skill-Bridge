// Automated test script for Login Password Authentication & Security
const BASE_URL = "http://localhost:3000";

async function runLoginTests() {
  console.log("==================================================");
  console.log("TESTING PASSWORD AUTHENTICATION & LOGIN CHECKS");
  console.log("==================================================");

  const testEmail = `auth_test_${Date.now()}@university.edu`;
  const realPassword = "SuperSecurePassword123!";

  // Setup: Register and verify a test user
  console.log(`\n[SETUP] Creating verified user: ${testEmail}...`);
  const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Morgan Taylor",
      email: testEmail,
      password: realPassword,
      role: "student",
      metadata: { institution: "Stanford", degree: "CS", graduationYear: "2025" },
    }),
  });
  const regData = await regRes.json();
  const otp = regData.devOtp;

  const verifyRes = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      role: "student",
      otpCode: otp,
    }),
  });
  const verifyData = await verifyRes.json();
  console.log("Verified setup user:", verifyData.success);

  // TEST 1: Login with INCORRECT password
  console.log("\n[TEST 1] Logging in with INCORRECT password...");
  const wrongPassRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: "WrongPassword999!",
      role: "student",
    }),
  });
  const wrongPassData = await wrongPassRes.json();
  console.log(`Status: ${wrongPassRes.status}`, wrongPassData);
  if (wrongPassRes.status !== 401 || wrongPassData.error !== "Incorrect password. Please try again.") {
    throw new Error(`Test 1 Failed: Expected 401 with incorrect password message!`);
  }
  console.log("✓ Test 1 Passed: Rejected incorrect password with 401 Unauthorized");

  // TEST 2: Login with CORRECT password
  console.log("\n[TEST 2] Logging in with CORRECT password...");
  const correctPassRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: realPassword,
      role: "student",
    }),
  });
  const correctPassData = await correctPassRes.json();
  console.log(`Status: ${correctPassRes.status}`, correctPassData);
  if (correctPassRes.status !== 200 || !correctPassData.success || correctPassData.user.fullName !== "Morgan Taylor") {
    throw new Error(`Test 2 Failed: Expected 200 OK with user session!`);
  }
  console.log("✓ Test 2 Passed: Accepted correct password and returned user session");

  // TEST 3: Login under WRONG role (attempting to login as faculty when registered as student)
  console.log("\n[TEST 3] Attempting login on WRONG role tab (faculty)...");
  const wrongRoleRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: realPassword,
      role: "faculty",
    }),
  });
  const wrongRoleData = await wrongRoleRes.json();
  console.log(`Status: ${wrongRoleRes.status}`, wrongRoleData);
  if (wrongRoleRes.status !== 404) {
    throw new Error(`Test 3 Failed: Expected 404 for wrong role tab!`);
  }
  console.log("✓ Test 3 Passed: Blocked cross-role login with 404 Not Found");

  console.log("\n==================================================");
  console.log("ALL LOGIN PASSWORD CHECKS PASSED SUCCESSFULLY!");
  console.log("==================================================");
}

runLoginTests().catch((err) => {
  console.error("\nTEST RUN ERROR:", err);
  process.exit(1);
});
