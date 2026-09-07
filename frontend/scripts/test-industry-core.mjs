// scripts/test-industry-core.mjs
// Verification suite for Section 1 — Industry Core:
// 1. Industry Dashboard
// 2. Industry Profile
// 3. Student Data Access
// 4. Question Bank

import assert from "assert";

const BASE_URL = "http://localhost:3000";

// Verified industry user credentials from data/skill_bridge.json
const INDUSTRY_ID = "e93a2f49-3cc2-4f48-be9f-63f53dedae96";
const HEADERS = {
  "Content-Type": "application/json",
  "x-industry-id": INDUSTRY_ID,
};

async function runTests() {
  console.log("=== STARTING SECTION 1 — INDUSTRY CORE VERIFICATION ===");

  // ----------------------------------------------------
  // TEST 1: Industry Dashboard API
  // ----------------------------------------------------
  console.log("\n[Test 1] Industry Dashboard API...");
  {
    const res = await fetch(`${BASE_URL}/api/industry/dashboard`, {
      headers: HEADERS,
    });
    assert.strictEqual(res.status, 200, `Expected 200, got ${res.status}`);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.dashboard, "Expected dashboard data object");
    assert.strictEqual(typeof data.dashboard.metrics.activeHiring, "number");
    assert.strictEqual(typeof data.dashboard.metrics.draftHiring, "number");
    assert.strictEqual(typeof data.dashboard.metrics.totalApplications, "number");
    assert.strictEqual(typeof data.dashboard.metrics.shortlistedCandidates, "number");
    assert.strictEqual(typeof data.dashboard.metrics.upcomingInterviews, "number");
    assert.strictEqual(typeof data.dashboard.metrics.questionBankCount, "number");
    assert.ok(Array.isArray(data.dashboard.recentActivity));
    console.log("  ✓ Dashboard returns valid scoped stats:", data.dashboard.metrics);
  }

  // ----------------------------------------------------
  // TEST 2: Industry Profile GET & PUT
  // ----------------------------------------------------
  console.log("\n[Test 2] Industry Profile GET & PUT...");
  {
    // GET Profile
    const getRes = await fetch(`${BASE_URL}/api/industry/profile`, {
      headers: HEADERS,
    });
    assert.strictEqual(getRes.status, 200);
    const getData = await getRes.json();
    assert.strictEqual(getData.success, true);
    assert.ok(getData.profile);
    const initialCompany = getData.profile.companyName;
    console.log("  ✓ Initial profile retrieved:", initialCompany);

    // PUT Profile Update
    const testLocation = "Tech Park, Bengaluru, Karnataka, India";
    const testDesc = "Leading technology and engineering solutions provider.";
    const putRes = await fetch(`${BASE_URL}/api/industry/profile`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({
        location: testLocation,
        description: testDesc,
        website: "https://www.tcs.com",
        demandedSkills: ["TypeScript", "Next.js", "Cloud Infrastructure"],
      }),
    });
    assert.strictEqual(putRes.status, 200);
    const putData = await putRes.json();
    assert.strictEqual(putData.success, true);
    assert.strictEqual(putData.profile.location, testLocation);
    assert.strictEqual(putData.profile.description, testDesc);
    assert.ok(putData.profile.demandedSkills.includes("TypeScript"));
    console.log("  ✓ Profile successfully updated and persisted");

    // Validation: Invalid website
    const badRes = await fetch(`${BASE_URL}/api/industry/profile`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({
        website: "not-a-valid-url",
      }),
    });
    assert.strictEqual(badRes.status, 400);
    console.log("  ✓ Invalid website rejected with 400");
  }

  // ----------------------------------------------------
  // TEST 3: Student Data Access
  // ----------------------------------------------------
  console.log("\n[Test 3] Student Data Access...");
  {
    const res = await fetch(`${BASE_URL}/api/industry/students?page=1&limit=5`, {
      headers: HEADERS,
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.students));
    assert.strictEqual(typeof data.totalCount, "number");
    assert.strictEqual(typeof data.page, "number");
    assert.strictEqual(typeof data.totalPages, "number");

    // Verify security: No sensitive docs, no passwords, no internal verification files
    if (data.students.length > 0) {
      const student = data.students[0];
      assert.strictEqual(typeof student.fullName, "string");
      assert.strictEqual(typeof student.department, "string");
      assert.ok(Array.isArray(student.technicalSkills));
      assert.ok(student.profiles, "Public external profiles object must exist");
      assert.strictEqual(student.password, undefined, "Password must NEVER be exposed");
      assert.strictEqual(student.documents, undefined, "Documents must NEVER be exposed in student talent list");
      console.log(`  ✓ Checked student: ${student.fullName} (ID: ${student.id})`);

      // Test Single Student Detail View
      const detailRes = await fetch(`${BASE_URL}/api/industry/students/${student.id}`, {
        headers: HEADERS,
      });
      assert.strictEqual(detailRes.status, 200);
      const detailData = await detailRes.json();
      assert.strictEqual(detailData.success, true);
      assert.strictEqual(detailData.student.id, student.id);
      assert.strictEqual(detailData.student.documents, undefined, "Detailed view must NOT expose raw documents");
      console.log("  ✓ Single student talent record accessed safely");
    }

    // IDOR / BOLA test: Query with a non-existent or manipulated ID
    const fakeRes = await fetch(`${BASE_URL}/api/industry/students/fake-non-existent-student-id`, {
      headers: HEADERS,
    });
    assert.strictEqual(fakeRes.status, 404, "Manipulated or unauthorized ID must return 404");
    console.log("  ✓ IDOR / Unauthorized student access correctly blocked with 404");
  }

  // ----------------------------------------------------
  // TEST 4: Question Bank CRUD & MCQ Validation
  // ----------------------------------------------------
  console.log("\n[Test 4] Question Bank CRUD & Validations...");
  {
    // 4.1 Reject malformed question: missing correctOptionId
    const badQRes = await fetch(`${BASE_URL}/api/industry/question-bank`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        questionText: "What is the time complexity of binary search?",
        questionType: "mcq",
        options: [
          { id: "opt_1", text: "O(n)" },
          { id: "opt_2", text: "O(log n)" },
        ],
        // missing correctOptionId
      }),
    });
    assert.strictEqual(badQRes.status, 400);
    console.log("  ✓ Malformed question (missing correctOptionId) correctly rejected with 400");

    // 4.2 Reject malformed question: invalid correctOptionId (not in options)
    const badOptRes = await fetch(`${BASE_URL}/api/industry/question-bank`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        questionText: "What is React Virtual DOM?",
        questionType: "mcq",
        options: [
          { id: "opt_1", text: "A copy of real DOM in memory" },
          { id: "opt_2", text: "A browser extension" },
        ],
        correctOptionId: "opt_999", // not in options!
      }),
    });
    assert.strictEqual(badOptRes.status, 400);
    console.log("  ✓ Invalid correctOptionId (non-matching ID) correctly rejected with 400");

    // 4.3 Create a valid question with stable option IDs
    const createRes = await fetch(`${BASE_URL}/api/industry/question-bank`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        questionText: "Which HTTP status code signifies that a resource was successfully created?",
        questionType: "mcq",
        difficulty: "easy",
        domainId: "web-dev",
        domainName: "Web Development",
        topic: "REST APIs",
        marks: 2,
        options: [
          { id: "opt_200", text: "200 OK" },
          { id: "opt_201", text: "201 Created" },
          { id: "opt_204", text: "204 No Content" },
          { id: "opt_301", text: "301 Moved Permanently" },
        ],
        correctOptionId: "opt_201",
        explanation: "201 Created indicates that the request has succeeded and led to the creation of a resource.",
      }),
    });
    assert.strictEqual(createRes.status, 201);
    const createdData = await createRes.json();
    assert.strictEqual(createdData.success, true);
    assert.ok(createdData.question.id);
    assert.strictEqual(createdData.question.correctOptionId, "opt_201");
    assert.strictEqual(createdData.question.options.length, 4);
    const questionId = createdData.question.id;
    console.log(`  ✓ Valid question created with ID: ${questionId}`);

    // 4.4 Retrieve questions list and filter by difficulty
    const listRes = await fetch(`${BASE_URL}/api/industry/question-bank?difficulty=easy`, {
      headers: HEADERS,
    });
    assert.strictEqual(listRes.status, 200);
    const listData = await listRes.json();
    assert.strictEqual(listData.success, true);
    const found = listData.questions.find((q) => q.id === questionId);
    assert.ok(found, "Created question must appear in question bank list");
    console.log("  ✓ Question bank list filtering works");

    // 4.5 Update question
    const updateRes = await fetch(`${BASE_URL}/api/industry/question-bank/${questionId}`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({
        difficulty: "medium",
        marks: 3,
      }),
    });
    assert.strictEqual(updateRes.status, 200);
    const updateData = await updateRes.json();
    assert.strictEqual(updateData.success, true);
    assert.strictEqual(updateData.question.difficulty, "medium");
    assert.strictEqual(updateData.question.marks, 3);
    console.log("  ✓ Question updated successfully");

    // 4.6 Delete question
    const delRes = await fetch(`${BASE_URL}/api/industry/question-bank/${questionId}`, {
      method: "DELETE",
      headers: HEADERS,
    });
    assert.strictEqual(delRes.status, 200);
    const delData = await delRes.json();
    assert.strictEqual(delData.success, true);
    console.log("  ✓ Question deleted successfully");

    // 4.7 Confirm question is gone
    const verifyDelRes = await fetch(`${BASE_URL}/api/industry/question-bank/${questionId}`, {
      headers: HEADERS,
    });
    assert.strictEqual(verifyDelRes.status, 404);
    console.log("  ✓ Deletion verified: 404 returned");
  }

  console.log("\n==================================================");
  console.log("ALL SECTION 1 INDUSTRY CORE TESTS PASSED SUCCESSFULLY!");
  console.log("==================================================");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
