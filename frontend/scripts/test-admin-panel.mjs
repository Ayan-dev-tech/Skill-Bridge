// Automated test script for Admin Panel, Login Redirection, and Freeze Controls
const BASE_URL = "http://localhost:3000";

async function runAdminTests() {
  console.log("==================================================");
  console.log("STARTING ADMIN PANEL & FREEZE CONTROLS TESTS");
  console.log("==================================================");

  // TEST 1: Admin Login via Student Tab
  console.log("\n[TEST 1] Logging in with admin credentials via student portal...");
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
  console.log(`Status: ${loginRes.status}`, loginData);

  if (
    loginRes.status !== 200 ||
    !loginData.isAdmin ||
    loginData.redirectUrl !== "/admin"
  ) {
    throw new Error(
      `Test 1 Failed: Admin login did not return isAdmin and redirectUrl: /admin!`
    );
  }
  console.log("✓ Test 1 Passed: Admin credentials authenticated with redirectUrl: /admin");

  // TEST 2: Admin Overview Data (Tabular Users & Requests)
  console.log("\n[TEST 2] Fetching GET /api/admin/overview...");
  const overviewRes = await fetch(`${BASE_URL}/api/admin/overview`);
  const overviewData = await overviewRes.json();
  console.log(`Status: ${overviewRes.status}`);
  console.log("Stats summary:", overviewData.data.stats);

  if (overviewRes.status !== 200 || !overviewData.success) {
    throw new Error(`Test 2 Failed: Failed to load admin overview data.`);
  }

  const { stats, categorized, hiringRequests, campusRequests } = overviewData.data;
  console.log(`Found: ${stats.totalStudents} students, ${stats.totalFaculty} faculty, ${stats.totalCampus} campuses, ${stats.totalIndustry} industry.`);
  console.log(`Found: ${hiringRequests.length} hiring requests, ${campusRequests.length} campus requests.`);

  if (hiringRequests.length === 0 || campusRequests.length === 0) {
    throw new Error(`Test 2 Failed: Expected hiring and campus requests queues.`);
  }
  console.log("✓ Test 2 Passed: Overview data returned complete user directories and request queues");

  // TEST 3: Freeze Company Hiring
  const targetCompany = hiringRequests[0];
  console.log(`\n[TEST 3] Freezing company hiring for: ${targetCompany.companyName} (${targetCompany.id})...`);
  const freezeCompRes = await fetch(`${BASE_URL}/api/admin/freeze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "company",
      id: targetCompany.id,
      reason: "Suspicious salary and employment verification records flagged",
    }),
  });
  const freezeCompData = await freezeCompRes.json();
  console.log(`Status: ${freezeCompRes.status}`, freezeCompData.message);

  if (freezeCompRes.status !== 200 || !freezeCompData.item.isFrozen || freezeCompData.item.status !== "frozen") {
    throw new Error(`Test 3 Failed: Company hiring freeze was not set to true!`);
  }
  console.log("✓ Test 3 Passed: Company hiring successfully frozen with suspicious activity reason");

  // TEST 4: Freeze Campus Activities
  const targetCampus = campusRequests[0];
  console.log(`\n[TEST 4] Freezing campus activities for: ${targetCampus.campusName} (${targetCampus.id})...`);
  const freezeCampusRes = await fetch(`${BASE_URL}/api/admin/freeze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "campus",
      id: targetCampus.id,
      reason: "Unverified accreditation documentation detected",
    }),
  });
  const freezeCampusData = await freezeCampusRes.json();
  console.log(`Status: ${freezeCampusRes.status}`, freezeCampusData.message);

  if (freezeCampusRes.status !== 200 || !freezeCampusData.item.isFrozen || freezeCampusData.item.status !== "frozen") {
    throw new Error(`Test 4 Failed: Campus activity freeze was not set to true!`);
  }
  console.log("✓ Test 4 Passed: Campus activities successfully frozen");

  // TEST 5: Update Hiring Request Positions
  console.log("\n[TEST 5] Updating hiring request positions count...");
  const updateRes = await fetch(`${BASE_URL}/api/admin/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "hiring",
      id: targetCompany.id,
      updates: { positions: 100 },
    }),
  });
  const updateData = await updateRes.json();
  console.log(`Status: ${updateRes.status}`, `New positions: ${updateData.item?.positions}`);
  if (updateRes.status !== 200 || updateData.item?.positions !== 100) {
    throw new Error(`Test 5 Failed: Expected positions to update to 100.`);
  }
  console.log("✓ Test 5 Passed: Successfully updated hiring opening positions");

  // TEST 6: Verify Admin Dashboard Page Renders
  console.log("\n[TEST 6] Checking GET /admin renders...");
  const adminPageRes = await fetch(`${BASE_URL}/admin`);
  console.log(`GET /admin Status: ${adminPageRes.status}`);
  const adminPageHtml = await adminPageRes.text();
  console.log("Contains 'Welcome Admin':", adminPageHtml.includes("Welcome Admin"));
  console.log("Contains 'User Directory':", adminPageHtml.includes("User Directory") || adminPageHtml.includes("User Data"));
  console.log("Contains 'Manage Section':", adminPageHtml.includes("Manage Section"));
  if (adminPageRes.status !== 200 || !adminPageHtml.includes("Welcome Admin")) {
    throw new Error(`Test 6 Failed: Admin page did not render properly.`);
  }
  console.log("✓ Test 6 Passed: Admin page successfully rendered with 'Welcome Admin'");

  console.log("\n==================================================");
  console.log("ALL ADMIN PANEL & FREEZE TESTS PASSED!");
  console.log("==================================================");
}

runAdminTests().catch((err) => {
  console.error("\nTEST RUN ERROR:", err);
  process.exit(1);
});
