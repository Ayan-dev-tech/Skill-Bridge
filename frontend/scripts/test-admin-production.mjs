// Verification script for Skill-Bridge Admin Production Functionality
// Running strictly from D: drive workspace
import assert from "assert";

const BASE_URL = "http://localhost:3000";

async function runVerification() {
  console.log("=================================================");
  console.log("Starting Skill-Bridge Admin End-to-End Test Suite");
  console.log("=================================================");

  // Step 1: Verify Admin Authentication (Hidden from UI, logs in through Student panel)
  console.log("\n[TEST 1] Testing Admin Login with admin@gmail.com / admin@123");
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@gmail.com",
      password: "admin@123",
      role: "student",
    }),
  });

  const loginData = await loginRes.json();
  console.log("Login Response Status:", loginRes.status, "Body:", loginData);
  assert.strictEqual(loginRes.status, 200, "Admin login should return HTTP 200");
  assert.strictEqual(loginData.isAdmin, true, "User record must have isAdmin: true");
  assert.strictEqual(loginData.redirectUrl, "/admin", "Admin must redirect to /admin");
  console.log("✓ TEST 1 PASSED: Admin credentials authenticated & redirected to /admin.");

  // Step 2: Test Admin Overview Telemetry & Categorized Records
  console.log("\n[TEST 2] Testing /api/admin/overview endpoint");
  const overviewRes = await fetch(`${BASE_URL}/api/admin/overview`);
  const overviewData = await overviewRes.json();
  console.log("Overview Response Status:", overviewRes.status);
  assert.strictEqual(overviewRes.status, 200, "Overview should return HTTP 200");
  assert.ok(overviewData.success, "Overview response must report success");
  assert.ok(overviewData.data.stats.totalUsers > 0, "Total users should be > 0");
  assert.ok(Array.isArray(overviewData.data.hiringRequests), "Hiring requests must be an array");
  assert.ok(Array.isArray(overviewData.data.campusRequests), "Campus requests must be an array");
  console.log("Stats Snapshot:", overviewData.data.stats);
  console.log("✓ TEST 2 PASSED: Administrative overview data retrieved.");

  // Step 3: Test Suspicious Company Freeze
  console.log("\n[TEST 3] Testing Freeze Company Hiring");
  const freezeCompRes = await fetch(`${BASE_URL}/api/admin/freeze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "company",
      id: "hire-req-1",
      reason: "Suspicious fraudulent job openings detected by compliance",
    }),
  });
  const freezeCompData = await freezeCompRes.json();
  console.log("Freeze Company Status:", freezeCompRes.status, "Result:", freezeCompData);
  assert.strictEqual(freezeCompRes.status, 200, "Freeze company should return HTTP 200");
  assert.ok(freezeCompData.success, "Freeze action must succeed");
  console.log("✓ TEST 3 PASSED: Company hiring successfully frozen with compliance reason.");

  // Step 4: Test Suspicious Campus Activity Freeze
  console.log("\n[TEST 4] Testing Freeze Campus Activities");
  const freezeCampusRes = await fetch(`${BASE_URL}/api/admin/freeze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "campus",
      id: "campus-req-1",
      reason: "Unverified accreditation documentation submitted",
    }),
  });
  const freezeCampusData = await freezeCampusRes.json();
  console.log("Freeze Campus Status:", freezeCampusRes.status, "Result:", freezeCampusData);
  assert.strictEqual(freezeCampusRes.status, 200, "Freeze campus should return HTTP 200");
  assert.ok(freezeCampusData.success, "Freeze campus action must succeed");
  console.log("✓ TEST 4 PASSED: Campus activities successfully frozen.");

  // Step 5: Test Update Hiring Openings
  console.log("\n[TEST 5] Testing Update Hiring Openings");
  const updateHiringRes = await fetch(`${BASE_URL}/api/admin/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "hiring",
      id: "hire-req-1",
      updates: { positions: 120 },
    }),
  });
  const updateHiringData = await updateHiringRes.json();
  console.log("Update Hiring Status:", updateHiringRes.status, "Result:", updateHiringData);
  assert.strictEqual(updateHiringRes.status, 200, "Update hiring should return HTTP 200");
  assert.strictEqual(updateHiringData.item.positions, 120, "Positions should be updated to 120");
  console.log("✓ TEST 5 PASSED: Hiring opening positions updated.");

  // Step 6: Test Update Campus Students Enrolled Count
  console.log("\n[TEST 6] Testing Update Campus Enrolled Count");
  const updateCampusRes = await fetch(`${BASE_URL}/api/admin/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "campus",
      id: "campus-req-1",
      updates: { studentsEnrolled: 850 },
    }),
  });
  const updateCampusData = await updateCampusRes.json();
  console.log("Update Campus Status:", updateCampusRes.status, "Result:", updateCampusData);
  assert.strictEqual(updateCampusRes.status, 200, "Update campus should return HTTP 200");
  assert.strictEqual(updateCampusData.item.studentsEnrolled, 850, "Enrolled students should be updated to 850");
  console.log("✓ TEST 6 PASSED: Campus enrolled student count updated.");

  // Step 7: Check /admin Page HTML Load
  console.log("\n[TEST 7] Testing /admin page availability");
  const adminPageRes = await fetch(`${BASE_URL}/admin`);
  console.log("Admin Page Status:", adminPageRes.status);
  assert.strictEqual(adminPageRes.status, 200, "/admin route must respond with HTTP 200");
  const html = await adminPageRes.text();
  assert.ok(html.includes("Skill-Bridge") || html.includes("SKILL BRIDGE"), "Page must render Skill Bridge brand");
  console.log("✓ TEST 7 PASSED: /admin loaded cleanly with SSR HTML.");

  console.log("\n=================================================");
  console.log("ALL 7 TESTS PASSED SUCCESSFULLY! 🚀");
  console.log("=================================================");
}

runVerification().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
