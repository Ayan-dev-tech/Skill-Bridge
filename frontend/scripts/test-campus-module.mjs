// scripts/test-campus-module.mjs
// Automated verification script for the Campus Module MVP

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function runTests() {
  console.log("==================================================");
  console.log("STARTING AUTOMATED CAMPUS MODULE TEST SUITE");
  console.log(`Target: ${BASE_URL}`);
  console.log("==================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // -------------------------------------------------------------
    // TEST 1: CAMPUS DASHBOARD
    // -------------------------------------------------------------
    console.log("[1] Testing Campus Dashboard (/api/campus)...");
    const dashRes = await fetch(`${BASE_URL}/api/campus`);
    assert(dashRes.ok, `GET /api/campus returned HTTP ${dashRes.status}`);
    const dashData = await dashRes.json();
    assert(dashData.success === true, "Response has success: true");
    assert(dashData.metrics !== undefined, "Dashboard metrics object is present");
    assert(typeof dashData.metrics.totalStudents === "number", `totalStudents is number (${dashData.metrics.totalStudents})`);
    assert(typeof dashData.metrics.totalFaculty === "number", `totalFaculty is number (${dashData.metrics.totalFaculty})`);
    assert(typeof dashData.metrics.activeHiringPosts === "number", `activeHiringPosts is number (${dashData.metrics.activeHiringPosts})`);
    assert(typeof dashData.metrics.totalApplications === "number", `totalApplications is number (${dashData.metrics.totalApplications})`);
    assert(typeof dashData.metrics.shortlistedStudents === "number", `shortlistedStudents is number (${dashData.metrics.shortlistedStudents})`);
    assert(typeof dashData.metrics.selectedStudents === "number", `selectedStudents is number (${dashData.metrics.selectedStudents})`);
    console.log(`    Dashboard summary metrics verified successfully.\n`);

    // -------------------------------------------------------------
    // TEST 2: STUDENT MANAGEMENT
    // -------------------------------------------------------------
    console.log("[2] Testing Student Management (/api/campus/students)...");
    const stuRes = await fetch(`${BASE_URL}/api/campus/students?page=1&limit=5`);
    assert(stuRes.ok, `GET /api/campus/students returned HTTP ${stuRes.status}`);
    const stuData = await stuRes.json();
    assert(stuData.success === true, "Students response has success: true");
    assert(Array.isArray(stuData.students), `students array returned (${stuData.students.length} items)`);
    assert(typeof stuData.totalCount === "number", `totalCount returned (${stuData.totalCount})`);

    let sampleStudentId = null;
    if (stuData.students.length > 0) {
      const sample = stuData.students[0];
      sampleStudentId = sample.id;
      assert(sample.fullName !== undefined, `Student has fullName (${sample.fullName})`);
      assert(sample.department !== undefined, `Student has department (${sample.department})`);
      assert(sample.placementStatus !== undefined, `Student has placementStatus (${sample.placementStatus})`);

      // Test individual student detail
      console.log(`    Testing Student Profile Detail for studentId=${sampleStudentId}...`);
      const detailRes = await fetch(`${BASE_URL}/api/campus/students?studentId=${sampleStudentId}`);
      assert(detailRes.ok, `GET student detail returned HTTP ${detailRes.status}`);
      const detailData = await detailRes.json();
      assert(detailData.success === true, "Detail response has success: true");
      assert(detailData.student !== undefined, "student detail object returned");
      assert(detailData.student.academicDetails !== undefined, "academicDetails present");
      assert(Array.isArray(detailData.student.skills), "skills array present");
      assert(Array.isArray(detailData.student.documents), "documents array present");
      assert(Array.isArray(detailData.student.applications), "applications array present");
    }
    console.log(`    Student management tests completed.\n`);

    // -------------------------------------------------------------
    // TEST 3: FACULTY / MENTOR
    // -------------------------------------------------------------
    console.log("[3] Testing Faculty / Mentors (/api/campus/faculty)...");
    const facRes = await fetch(`${BASE_URL}/api/campus/faculty?page=1&limit=5`);
    assert(facRes.ok, `GET /api/campus/faculty returned HTTP ${facRes.status}`);
    const facData = await facRes.json();
    assert(facData.success === true, "Faculty response has success: true");
    assert(Array.isArray(facData.faculty), `faculty array returned (${facData.faculty.length} items)`);

    if (facData.faculty.length > 0) {
      const sampleFac = facData.faculty[0];
      assert(sampleFac.fullName !== undefined, `Faculty has fullName (${sampleFac.fullName})`);
      assert(sampleFac.department !== undefined, `Faculty has department (${sampleFac.department})`);
      assert(typeof sampleFac.studentsAssigned === "number", `studentsAssigned is number (${sampleFac.studentsAssigned})`);

      // Test faculty detail
      const facDetailRes = await fetch(`${BASE_URL}/api/campus/faculty?facultyId=${sampleFac.id}`);
      assert(facDetailRes.ok, `GET faculty detail returned HTTP ${facDetailRes.status}`);
      const facDetailData = await facDetailRes.json();
      assert(facDetailData.success === true, "Faculty detail success: true");
      assert(Array.isArray(facDetailData.faculty.assignedStudents), "assignedStudents array present");
    }
    console.log(`    Faculty visibility tests completed.\n`);

    // -------------------------------------------------------------
    // TEST 4: INDUSTRY & HIRING VISIBILITY
    // -------------------------------------------------------------
    console.log("[4] Testing Industry & Hiring (/api/campus/industry)...");
    const postsRes = await fetch(`${BASE_URL}/api/campus/industry?tab=posts&page=1&limit=5`);
    assert(postsRes.ok, `GET /api/campus/industry?tab=posts returned HTTP ${postsRes.status}`);
    const postsData = await postsRes.json();
    assert(postsData.success === true, "Hiring posts success: true");
    assert(Array.isArray(postsData.posts), `posts array returned (${postsData.posts.length} items)`);

    const indRes = await fetch(`${BASE_URL}/api/campus/industry?tab=industries&page=1&limit=5`);
    assert(indRes.ok, `GET /api/campus/industry?tab=industries returned HTTP ${indRes.status}`);
    const indData = await indRes.json();
    assert(indData.success === true, "Industries success: true");
    assert(Array.isArray(indData.industries), `industries array returned (${indData.industries.length} items)`);
    console.log(`    Industry and hiring visibility tests completed.\n`);

    // -------------------------------------------------------------
    // TEST 5: APPLICATION TRACKING
    // -------------------------------------------------------------
    console.log("[5] Testing Application Tracking (/api/campus/applications)...");
    const appRes = await fetch(`${BASE_URL}/api/campus/applications?page=1&limit=5`);
    assert(appRes.ok, `GET /api/campus/applications returned HTTP ${appRes.status}`);
    const appData = await appRes.json();
    assert(appData.success === true, "Applications success: true");
    assert(Array.isArray(appData.applications), `applications array returned (${appData.applications.length} items)`);

    if (appData.applications.length > 0) {
      const sampleApp = appData.applications[0];
      assert(sampleApp.studentName !== undefined, `Application has studentName (${sampleApp.studentName})`);
      assert(sampleApp.companyName !== undefined, `Application has companyName (${sampleApp.companyName})`);
      assert(sampleApp.status !== undefined, `Application has status (${sampleApp.status})`);
      assert(Array.isArray(sampleApp.timeline), "Application has timeline array");
    }
    console.log(`    Application tracking tests completed.\n`);

    // -------------------------------------------------------------
    // TEST 6: PLACEMENT REPORTS
    // -------------------------------------------------------------
    console.log("[6] Testing Placement Reports (/api/campus/reports)...");
    const repRes = await fetch(`${BASE_URL}/api/campus/reports`);
    assert(repRes.ok, `GET /api/campus/reports returned HTTP ${repRes.status}`);
    const repData = await repRes.json();
    assert(repData.success === true, "Reports success: true");
    assert(repData.report !== undefined, "report object present");
    assert(repData.report.overview !== undefined, "overview metrics present");
    assert(typeof repData.report.overview.placementRate === "number", `placementRate is number (${repData.report.overview.placementRate}%)`);
    assert(Array.isArray(repData.report.byDepartment), `byDepartment array present (${repData.report.byDepartment.length} records)`);
    assert(Array.isArray(repData.report.byBatch), `byBatch array present (${repData.report.byBatch.length} records)`);
    assert(Array.isArray(repData.report.byIndustry), `byIndustry array present (${repData.report.byIndustry.length} records)`);
    assert(Array.isArray(repData.report.byJob), `byJob array present (${repData.report.byJob.length} records)`);
    console.log(`    Placement reports tests completed.\n`);

    // -------------------------------------------------------------
    // TEST 7: CAMPUS PORTAL PAGE RESPONSE
    // -------------------------------------------------------------
    console.log("[7] Testing Campus Portal Web Page (/campus)...");
    const pageRes = await fetch(`${BASE_URL}/campus`);
    assert(pageRes.ok, `GET /campus returned HTTP ${pageRes.status}`);
    const pageHtml = await pageRes.text();
    assert(pageHtml.includes("Campus") || pageHtml.includes("html"), "/campus returned valid HTML markup");
    console.log(`    Campus portal web page test completed.\n`);

  } catch (err) {
    console.error("Test execution failed with error:", err);
    failed++;
  }

  console.log("==================================================");
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
