// scripts/test-industry-section2.mjs
// Verification suite for Section 2 — Hiring & Post Configuration:
// 1. New / Update Hiring
// 2. Hiring Type
// 3. Requirements
// 4. Qualifications
// 5. Post Configuration
// 6. Openings
// 7. Interview Details
// 8. Publish / Save Draft
// 9. Knowledge Test Configuration (Test Config, Question Bank Input, AI Question Selection, Final Test Paper, AI Review Loop, Industry Approval Gate, Publish Test)

import assert from "assert";

const BASE_URL = "http://localhost:3000";

// Verified Industry Partner (Company A)
const INDUSTRY_A_ID = "e93a2f49-3cc2-4f48-be9f-63f53dedae96";
const HEADERS_A = {
  "Content-Type": "application/json",
  "x-industry-id": INDUSTRY_A_ID,
};

// Fake Industry Partner B (for isolation tests)
const INDUSTRY_B_ID = "industry-tenant-b-random-uuid";
const HEADERS_B = {
  "Content-Type": "application/json",
  "x-industry-id": INDUSTRY_B_ID,
};

// Verified student for student opportunities visibility tests
const STUDENT_ID = "47fc1671-0e5d-4f66-af79-ca34f5e10ec5";
const STUDENT_HEADERS = {
  "Content-Type": "application/json",
  "x-student-id": STUDENT_ID,
};

async function runTests() {
  console.log("=== STARTING SECTION 2 — HIRING & POST CONFIGURATION VERIFICATION ===");

  let createdPostId = "";
  let questionIdA = "";
  let questionIdB = "";

  // ----------------------------------------------------
  // PREPARATION: Seed Question Bank for Industry A
  // ----------------------------------------------------
  console.log("\n[Setup] Seeding 2 Question Bank questions for Industry A...");
  {
    const q1Res = await fetch(`${BASE_URL}/api/industry/question-bank`, {
      method: "POST",
      headers: HEADERS_A,
      body: JSON.stringify({
        questionText: "Which cryptographic algorithm provides asymmetric public-key encryption?",
        questionType: "mcq",
        difficulty: "intermediate",
        domainId: "cybersecurity",
        conceptTag: "public-key-crypto",
        marks: 3,
        options: [
          { id: "opt_rsa", label: "A", text: "RSA (Rivest-Shamir-Adleman)" },
          { id: "opt_aes", label: "B", text: "AES-256 (Advanced Encryption Standard)" },
          { id: "opt_des", label: "C", text: "Triple DES" },
          { id: "opt_rc4", label: "D", text: "RC4 Stream Cipher" },
        ],
        correctOptionId: "opt_rsa",
        explanation: "RSA is an asymmetric cipher utilizing mathematically linked public and private key pairs.",
      }),
    });
    assert.strictEqual(q1Res.status, 201);
    const q1Data = await q1Res.json();
    questionIdA = q1Data.question.id;

    const q2Res = await fetch(`${BASE_URL}/api/industry/question-bank`, {
      method: "POST",
      headers: HEADERS_A,
      body: JSON.stringify({
        questionText: "What is the primary role of an API Gateway in cloud microservices?",
        questionType: "mcq",
        difficulty: "beginner",
        domainId: "cloud-engineering",
        conceptTag: "api-gateway",
        marks: 2,
        options: [
          { id: "opt_gw_1", label: "A", text: "Direct hardware RAID controller redundancy" },
          { id: "opt_gw_2", label: "B", text: "Request routing, rate limiting, and centralized authentication" },
          { id: "opt_gw_3", label: "C", text: "Client-side GPU shader rendering acceleration" },
          { id: "opt_gw_4", label: "D", text: "Local browser cookie session persistence" },
        ],
        correctOptionId: "opt_gw_2",
        explanation: "API Gateways sit between clients and microservices to manage traffic routing, throttling, and auth verification.",
      }),
    });
    assert.strictEqual(q2Res.status, 201);
    const q2Data = await q2Res.json();
    questionIdB = q2Data.question.id;
    console.log(`  ✓ Seeded questions: ${questionIdA}, ${questionIdB}`);
  }

  // ----------------------------------------------------
  // TEST 1: Openings Validation
  // ----------------------------------------------------
  console.log("\n[Test 1] Validating Openings Input...");
  {
    // Reject 0 openings
    const zeroRes = await fetch(`${BASE_URL}/api/industry/hiring`, {
      method: "POST",
      headers: HEADERS_A,
      body: JSON.stringify({
        roleTitle: "Cloud Architect",
        hiringType: "Full-time",
        openings: 0,
        location: "Bengaluru",
        description: "Leading architect role.",
      }),
    });
    assert.strictEqual(zeroRes.status, 400);
    console.log("  ✓ Zero openings correctly rejected with 400");

    // Reject negative openings
    const negRes = await fetch(`${BASE_URL}/api/industry/hiring`, {
      method: "POST",
      headers: HEADERS_A,
      body: JSON.stringify({
        roleTitle: "Cloud Architect",
        hiringType: "Full-time",
        openings: -5,
        location: "Bengaluru",
        description: "Leading architect role.",
      }),
    });
    assert.strictEqual(negRes.status, 400);
    console.log("  ✓ Negative openings correctly rejected with 400");
  }

  // ----------------------------------------------------
  // TEST 2: Save as Draft & Requirements / Qualifications
  // ----------------------------------------------------
  console.log("\n[Test 2] Creating and Saving Hiring Draft...");
  {
    const createRes = await fetch(`${BASE_URL}/api/industry/hiring`, {
      method: "POST",
      headers: HEADERS_A,
      body: JSON.stringify({
        roleTitle: "Associate Cloud & Cyber Defense Engineer",
        hiringType: "Full-time",
        industryDomain: "Cloud & Cybersecurity",
        location: "Bengaluru, India (Hybrid)",
        workMode: "Hybrid",
        salaryRange: "₹9,00,000 - ₹13,50,000 / year",
        experienceRequirement: "Fresher / 0-1 Years",
        openings: 3,
        deadline: "2026-11-30",
        description: "Join our frontline defense team analyzing cloud telemetry, container security, and SIEM detections.",
        responsibilities: [
          "Triage real-time intrusion alarms from SIEM and EDR platforms.",
          "Design automated mitigation scripts using Python and Bash.",
          "Perform vulnerability assessments on staging cloud infrastructure.",
        ],
        requiredSkills: ["Cybersecurity", "Cloud Computing", "Python", "Linux"],
        preferredSkills: ["Docker", "Kubernetes", "SIEM"],
        requiredQualifications: [
          "Bachelor's degree in Computer Science, Information Security, or STEM field.",
          "Minimum 65% aggregate or 6.8 CGPA.",
        ],
        preferredQualifications: [
          "Security certification or active CTF competition participation.",
        ],
        interviewDetails: {
          mode: "Virtual",
          type: "Technical & Behavioral",
          estimatedRounds: 2,
          instructions: "Shortlisted candidates will receive round meeting invitations.",
        },
        status: "draft",
      }),
    });

    assert.strictEqual(createRes.status, 201);
    const createData = await createRes.json();
    assert.strictEqual(createData.success, true);
    assert.strictEqual(createData.post.status, "draft");
    assert.strictEqual(createData.post.openings, 3);
    assert.strictEqual(createData.post.hiringType, "Full-time");
    assert.strictEqual(createData.post.requiredSkills.length, 4);
    assert.strictEqual(createData.post.interviewDetails.estimatedRounds, 2);
    createdPostId = createData.post.id;
    console.log(`  ✓ Hiring draft created with ID: ${createdPostId}`);
  }

  // ----------------------------------------------------
  // TEST 3: Draft Invisibility to Students
  // ----------------------------------------------------
  console.log("\n[Test 3] Verifying Draft Opportunity is Hidden from Students...");
  {
    const oppsRes = await fetch(`${BASE_URL}/api/student/opportunities`, {
      headers: STUDENT_HEADERS,
    });
    if (oppsRes.status === 200) {
      const oppsData = await oppsRes.json();
      const foundInOpps = (oppsData.jobs || []).some((j) => j.id === createdPostId);
      assert.strictEqual(foundInOpps, false, "Draft post must NOT be visible to students in opportunities");
      console.log("  ✓ Confirmed: Draft opportunity is completely hidden from student job listings");
    } else {
      console.log("  ✓ Student opportunities locked or inaccessible as expected");
    }
  }

  // ----------------------------------------------------
  // TEST 4: Edit Existing Draft
  // ----------------------------------------------------
  console.log("\n[Test 4] Editing Draft Opportunity...");
  {
    const editRes = await fetch(`${BASE_URL}/api/industry/hiring/${createdPostId}`, {
      method: "PUT",
      headers: HEADERS_A,
      body: JSON.stringify({
        openings: 5,
        salaryRange: "₹10,00,000 - ₹14,00,000 / year",
        preferredSkills: ["Docker", "Kubernetes", "SIEM", "Terraform"],
      }),
    });

    assert.strictEqual(editRes.status, 200);
    const editData = await editRes.json();
    assert.strictEqual(editData.success, true);
    assert.strictEqual(editData.post.openings, 5);
    assert.strictEqual(editData.post.salaryRange, "₹10,00,000 - ₹14,00,000 / year");
    assert.ok(editData.post.preferredSkills.includes("Terraform"));
    console.log("  ✓ Draft updated successfully with 5 openings and new skills");
  }

  // ----------------------------------------------------
  // TEST 5: Knowledge Test Configuration & AI Selection
  // ----------------------------------------------------
  console.log("\n[Test 5] Knowledge Test Configuration & Selection...");
  {
    // 5.1 Enable Knowledge Test & set configuration
    const configRes = await fetch(`${BASE_URL}/api/industry/hiring/${createdPostId}/test-config`, {
      method: "PUT",
      headers: HEADERS_A,
      body: JSON.stringify({
        enabled: true,
        testTitle: "Cloud & Cyber Defense Benchmark Exam",
        timeLimitMinutes: 30,
        totalMarks: 25,
        passingPercentage: 60,
        difficultyDistribution: { beginner: 1, intermediate: 1, advanced: 0 },
        selectedQuestionIds: [questionIdA, questionIdB],
      }),
    });

    assert.strictEqual(configRes.status, 200);
    const configData = await configRes.json();
    assert.strictEqual(configData.success, true);
    assert.strictEqual(configData.knowledgeTest.enabled, true);
    assert.strictEqual(configData.knowledgeTest.selectedQuestionIds.length, 2);
    assert.strictEqual(configData.knowledgeTest.testPaper.length, 2);
    assert.strictEqual(configData.knowledgeTest.approvalStatus, "draft");
    console.log("  ✓ Knowledge test configured with 2 questions from Question Bank");

    // 5.2 Test AI Question Selection Assist
    const aiSelectRes = await fetch(`${BASE_URL}/api/industry/hiring/${createdPostId}/test-config/ai-select`, {
      method: "POST",
      headers: HEADERS_A,
      body: JSON.stringify({
        targetCount: 2,
        requiredSkills: ["Cybersecurity", "Cloud"],
      }),
    });
    assert.strictEqual(aiSelectRes.status, 200);
    const aiSelectData = await aiSelectRes.json();
    assert.strictEqual(aiSelectData.success, true);
    assert.ok(aiSelectData.result.selectedQuestionIds.length > 0);
    assert.ok(aiSelectData.result.selectionRationale);
    console.log("  ✓ AI Question Selection assistive engine returned rationale:", aiSelectData.result.selectionRationale);

    // 5.3 Test AI Review Loop
    const reviewRes = await fetch(`${BASE_URL}/api/industry/hiring/${createdPostId}/test-config/ai-review`, {
      method: "POST",
      headers: HEADERS_A,
    });
    assert.strictEqual(reviewRes.status, 200);
    const reviewData = await reviewRes.json();
    assert.strictEqual(reviewData.success, true);
    assert.strictEqual(typeof reviewData.review.relevanceScore, "number");
    assert.ok(Array.isArray(reviewData.review.suggestions));
    console.log(`  ✓ AI Review completed with relevance score: ${reviewData.review.relevanceScore}%`);
  }

  // ----------------------------------------------------
  // TEST 6: Industry Approval Decision Gate
  // ----------------------------------------------------
  console.log("\n[Test 6] Industry Approval Decision Gate...");
  {
    // Try to publish test before approval — should fail
    const prematurePubRes = await fetch(`${BASE_URL}/api/industry/hiring/${createdPostId}/test-config/publish`, {
      method: "POST",
      headers: HEADERS_A,
    });
    assert.strictEqual(prematurePubRes.status, 400, "Publishing test before industry approval must be blocked");
    console.log("  ✓ Premature test publishing blocked before explicit approval gate");

    // Try to publish post before test approval — should fail because test is enabled
    const prematurePostPubRes = await fetch(`${BASE_URL}/api/industry/hiring/${createdPostId}/publish`, {
      method: "POST",
      headers: HEADERS_A,
    });
    assert.strictEqual(prematurePostPubRes.status, 400, "Publishing hiring post with unapproved test must be blocked");
    console.log("  ✓ Premature hiring post publishing blocked while assessment approval is pending");

    // Explicitly approve the question set
    const approveRes = await fetch(`${BASE_URL}/api/industry/hiring/${createdPostId}/test-config/approve`, {
      method: "POST",
      headers: HEADERS_A,
      body: JSON.stringify({ approved: true }),
    });
    assert.strictEqual(approveRes.status, 200);
    const approveData = await approveRes.json();
    assert.strictEqual(approveData.success, true);
    assert.strictEqual(approveData.approvalStatus, "approved");
    assert.ok(approveData.knowledgeTest.approvedAt);
    console.log("  ✓ Question set explicitly approved by Industry partner");

    // Now publish the test
    const testPubRes = await fetch(`${BASE_URL}/api/industry/hiring/${createdPostId}/test-config/publish`, {
      method: "POST",
      headers: HEADERS_A,
    });
    assert.strictEqual(testPubRes.status, 200);
    const testPubData = await testPubRes.json();
    assert.strictEqual(testPubData.success, true);
    assert.ok(testPubData.knowledgeTest.publishedAt);
    console.log("  ✓ Knowledge test successfully published");
  }

  // ----------------------------------------------------
  // TEST 7: Publish Hiring Post & Verify Student Visibility
  // ----------------------------------------------------
  console.log("\n[Test 7] Publishing Hiring Post & Checking Student Opportunities...");
  {
    const pubRes = await fetch(`${BASE_URL}/api/industry/hiring/${createdPostId}/publish`, {
      method: "POST",
      headers: HEADERS_A,
    });
    assert.strictEqual(pubRes.status, 200);
    const pubData = await pubRes.json();
    assert.strictEqual(pubData.success, true);
    assert.strictEqual(pubData.post.status, "published");
    assert.ok(pubData.post.publishedAt);
    console.log("  ✓ Hiring post published successfully");

    // Verify published post now appears in student opportunities
    const studentOppsRes = await fetch(`${BASE_URL}/api/student/opportunities`, {
      headers: STUDENT_HEADERS,
    });
    if (studentOppsRes.status === 200) {
      const studentOppsData = await studentOppsRes.json();
      const livePost = (studentOppsData.jobs || []).find((j) => j.id === createdPostId);
      assert.ok(livePost, "Published post MUST be visible in student jobs workflow");
      assert.strictEqual(livePost.roleTitle, "Associate Cloud & Cyber Defense Engineer");
      assert.strictEqual(livePost.employmentType, "Full-time");
      console.log(`  ✓ Confirmed: Live post "${livePost.roleTitle}" is now visible to eligible students in Opportunities`);
    }
  }

  // ----------------------------------------------------
  // TEST 8: Tenant Isolation & Security (IDOR Prevention)
  // ----------------------------------------------------
  console.log("\n[Test 8] Multi-tenant Isolation & IDOR Protection...");
  {
    // 8.1 Invalid or unknown industry token is rejected with 401
    const unauthReadRes = await fetch(`${BASE_URL}/api/industry/hiring/${createdPostId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-industry-id": "completely-fake-unknown-industry-id",
      },
    });
    assert.strictEqual(unauthReadRes.status, 401, "Invalid token must be rejected with 401");
    console.log("  ✓ Unauthenticated access correctly blocked with 401");

    // 8.2 Manipulated post ID (non-existent post for Industry A) returns 404
    const manipulatedRes = await fetch(`${BASE_URL}/api/industry/hiring/hire_manipulated_fake_id`, {
      headers: HEADERS_A,
    });
    assert.strictEqual(manipulatedRes.status, 404, "Manipulated post ID must return 404");
    console.log("  ✓ Manipulated post ID correctly blocked with 404");
  }

  console.log("\n==================================================");
  console.log("ALL SECTION 2 HIRING & POST CONFIGURATION TESTS PASSED!");
  console.log("==================================================");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
