// test-dashboard-integration.mjs
const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("=== Running Student Dashboard Integration Verification ===");

  // 1. Test Dashboard API
  console.log("\n1. Fetching /api/student/dashboard...");
  const apiRes = await fetch(`${BASE_URL}/api/student/dashboard`, {
    headers: {
      "x-student-id": "stu-2024-042",
    },
  });

  if (!apiRes.ok) {
    console.error(`API returned error status: ${apiRes.status}`);
    process.exit(1);
  }

  const data = await apiRes.json();
  console.log("API Response Status: OK");
  console.log("Student:", data.student.name, `(${data.student.id})`);
  console.log("Current Focus Stage:", data.currentFocus.stage, "-", data.currentFocus.title);
  console.log("Current Focus Action:", data.currentFocus.actionText, "->", data.currentFocus.actionHref);
  
  if (data.interestProfile) {
    console.log("Confirmed Interest Profile:", data.interestProfile.domainName, "->", data.interestProfile.specificInterest);
  } else {
    console.log("Interest Profile: None");
  }

  console.log("\nStatistics:");
  console.log(" - Knowledge Test Score:", `${data.statistics.knowledgeTestScore} / ${data.statistics.knowledgeTestMaxScore}`);
  console.log(" - Knowledge Test Percentage:", `${data.statistics.knowledgeTestPercent}%`);
  console.log(" - Verified Documents:", `${data.statistics.verifiedDocumentsCount} / ${data.statistics.totalDocumentsCount}`);
  console.log(" - Active Applications:", data.statistics.activeApplicationsCount);

  // Assert maxScore is 40
  if (data.statistics.knowledgeTestMaxScore !== 40) {
    console.error(`FAILURE: Expected knowledgeTestMaxScore to be 40, got ${data.statistics.knowledgeTestMaxScore}`);
    process.exit(1);
  }

  console.log("\nWorkflow Sections (8 Stages):");
  if (data.sections.length !== 8) {
    console.error(`FAILURE: Expected 8 sections, got ${data.sections.length}`);
    process.exit(1);
  }

  data.sections.forEach((sec) => {
    console.log(` Stage 0${sec.stage}: ${sec.name} | Status: [${sec.status}] ${sec.lockReason ? `(Reason: ${sec.lockReason})` : ""}`);
  });

  // Verify Stage 1 is completed or in progress
  const stage1 = data.sections.find((s) => s.stage === 1);
  if (!stage1) {
    console.error("FAILURE: Missing Stage 1 in sections");
    process.exit(1);
  }

  // 2. Test Page Routes
  const routesToTest = [
    "/student",
    "/student/dashboard",
    "/student/interest-finder",
    "/student/knowledge-testing",
  ];

  console.log("\n2. Testing Page HTTP Routes...");
  for (const route of routesToTest) {
    const res = await fetch(`${BASE_URL}${route}`);
    console.log(` Route ${route}: HTTP ${res.status}`);
    if (!res.ok) {
      console.error(`FAILURE: Route ${route} returned status ${res.status}`);
      process.exit(1);
    }
  }

  console.log("\n=== ALL STUDENT DASHBOARD & INTEGRATION TESTS PASSED ===");
}

runTests().catch((err) => {
  console.error("Integration Test error:", err);
  process.exit(1);
});
