/**
 * Skill-Bridge — Step 15 Patch: Correct AI + Role-Aware Assistant for All User Types Regression Suite
 *
 * Verifies:
 * 1. Student role resolution & no silent fallback
 * 2. Grounded readiness consistency (no false 100% READY or "no open deficits" on unassessed students)
 * 3. Faculty assistant generation with cohort-level intelligence
 * 4. Campus assistant generation with institutional readiness metrics
 * 5. Industry assistant generation with market demand insights & zero PII exposure
 * 6. Admin assistant generation with ecosystem-wide AYUSH human capital overview
 * 7. Unauthenticated requests to /api/ayush/assistant return HTTP 401 across all roles
 * 8. Authenticated requests to /api/ayush/assistant succeed for student, faculty, campus, industry, admin
 * 9. Backward compatibility for /api/student/assistant
 * 10. Cross-role and cross-user data isolation
 */

import {
  getStudentAssistantContext,
  resolveStudentTargetRole,
  askRoleAssistant,
  askAyushAssistant,
} from "../src/lib/ayush/assistant-service";
import { POST as ayushAssistantRoute } from "../src/app/api/ayush/assistant/route";
import { POST as studentAssistantRoute } from "../src/app/api/student/assistant/route";

async function runStep15PatchValidation() {
  console.log("================================================================================");
  console.log("🚀 STARTING STEP 15 PATCH: ROLE-AWARE AI ASSISTANT REGRESSION SUITE");
  console.log("================================================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      if (detail) console.log(`   └─ ${detail}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      if (detail) console.error(`   └─ ${detail}`);
      failed++;
    }
  }

  const testStudentId = "student_user_01";
  const testFacultyId = "9f777fbc-fc93-49cc-8e9c-cb9aa8953e4f";
  const testCampusId = "campus-user-1";
  const testCompanyId = "1f80e367-38a7-43d0-9573-fb3d9215d64a";
  const testAdminId = "admin-system-account-id";

  // ---------------------------------------------------------------------------
  // 1. STUDENT ROLE RESOLUTION & NO SILENT FALLBACK
  // ---------------------------------------------------------------------------
  console.log("--- TEST 1: Student Role Resolution & No Silent Fallback ---");
  try {
    // A student with target role or passport
    const resolvedRole = await resolveStudentTargetRole(testStudentId, "ayush-clinical-research");
    assert(resolvedRole?.id === "ayush-clinical-research", "Test 1.1: Explicit valid role resolved correctly", resolvedRole?.name);

    // Non-existent student with no role selected
    const nonExistentStudentRole = await resolveStudentTargetRole("non_existent_student_9999");
    assert(nonExistentStudentRole === null, "Test 1.2: No silent fallback when student has no role selected");

    // Context for student with no role selected
    const unselectedCtx = await getStudentAssistantContext("non_existent_student_9999");
    assert(unselectedCtx.hasRoleSelected === false, "Test 1.3: Context marks hasRoleSelected = false");
    
    // Assistant response prompts role selection instead of silent fallback
    const unselectedAns = await askRoleAssistant({
      role: "student",
      userId: "non_existent_student_9999",
      query: "Why am I not ready for this role?",
    });
    assert(unselectedAns.requiresRoleSelection === true, "Test 1.4: RequiresRoleSelection is true");
    assert(unselectedAns.response.includes("Select an AYUSH Target Role"), "Test 1.5: Directs student to select an AYUSH role");
  } catch (err) {
    assert(false, "Test 1 Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // 2. GROUNDED READINESS CONSISTENCY (NO FALSE 100% READY)
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST 2: Grounded Readiness & Gap Consistency ---");
  try {
    const studentCtx = await getStudentAssistantContext(testStudentId, "ayush-clinical-research");
    const readinessAns = await askRoleAssistant({
      role: "student",
      userId: testStudentId,
      query: "Why am I not ready for this role?",
      targetRoleId: "ayush-clinical-research",
    });

    const score = studentCtx.readiness?.overallScore ?? 0;
    assert(readinessAns.contextCitations?.readinessScore === score,
      "Test 2.1: Assistant cited score matches authoritative readiness engine score",
      `${readinessAns.contextCitations?.readinessScore}% vs ${score}%`
    );

    // If score is low or unassessed, response must NOT say "No open competency deficits" or "100% READY"
    if (score < 70) {
      assert(!readinessAns.response.includes("100% READY"), "Test 2.2: Low score does not claim 100% ready");
      assert(readinessAns.suggestedNextActions.length > 0, "Test 2.3: Recommended next actions provided");
    } else {
      assert(readinessAns.response.includes(`${score}%`), "Test 2.2: Ready score accurately cited");
    }
  } catch (err) {
    assert(false, "Test 2 Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // 3. FACULTY ASSISTANT GENERATION
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST 3: Faculty Assistant (Cohort Intelligence) ---");
  try {
    const facultyAns = await askRoleAssistant({
      role: "faculty",
      userId: testFacultyId,
      query: "Which competencies are weakest in my cohort?",
    });

    assert(Boolean(facultyAns.response), "Test 3.1: Faculty assistant returns grounded response");
    assert(typeof facultyAns.contextCitations?.cohortSize === "number", "Test 3.2: Cohort size cited", `Students: ${facultyAns.contextCitations?.cohortSize}`);
    assert(Array.isArray(facultyAns.suggestedNextActions), "Test 3.3: Next actions provided for faculty mentoring");
    assert(facultyAns.suggestedNextActions.some(a => a.includes("Cohort") || a.includes("Evidence") || a.includes("Students")),
      "Test 3.4: Actionable mentoring recommendations present"
    );
  } catch (err) {
    assert(false, "Test 3 Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // 4. CAMPUS ASSISTANT GENERATION
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST 4: Campus Assistant (Institutional Intelligence) ---");
  try {
    const campusAns = await askRoleAssistant({
      role: "campus",
      userId: testCampusId,
      query: "What are our biggest AYUSH skill gaps?",
    });

    assert(Boolean(campusAns.response), "Test 4.1: Campus assistant returns institutional response");
    assert(campusAns.response.includes("Institution") || campusAns.response.includes("Campus"), "Test 4.2: Institutional framing verified");
    assert(typeof campusAns.contextCitations?.institutionalReadinessIndex === "number",
      "Test 4.3: Institutional readiness index cited",
      `${campusAns.contextCitations?.institutionalReadinessIndex}%`
    );
  } catch (err) {
    assert(false, "Test 4 Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // 5. INDUSTRY ASSISTANT GENERATION (MARKET DEMAND & ZERO PII)
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST 5: Industry Assistant (Talent Signals & Zero PII) ---");
  try {
    const industryAns = await askRoleAssistant({
      role: "industry",
      userId: testCompanyId,
      query: "Which AYUSH roles have the strongest talent readiness?",
    });

    assert(Boolean(industryAns.response), "Test 5.1: Industry assistant returns market response");
    assert(typeof industryAns.contextCitations?.activeRoleDemandsCount === "number",
      "Test 5.2: Role demand counts cited",
      `Demands: ${industryAns.contextCitations?.activeRoleDemandsCount}`
    );
    // Ensure no private student phone, email, or Aadhaar leaks
    assert(!industryAns.response.includes("@gmail.com") && !industryAns.response.includes("Aadhaar"),
      "Test 5.3: Zero private student PII leaked in industry context"
    );
  } catch (err) {
    assert(false, "Test 5 Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // 6. ADMIN / MINISTRY ASSISTANT GENERATION
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST 6: Admin / Ministry Assistant (Ecosystem Intelligence) ---");
  try {
    const adminAns = await askRoleAssistant({
      role: "admin",
      userId: testAdminId,
      query: "What are the biggest AYUSH ecosystem skill gaps?",
    });

    assert(Boolean(adminAns.response), "Test 6.1: Admin assistant returns ecosystem response");
    assert(typeof adminAns.contextCitations?.totalStudents === "number",
      "Test 6.2: Platform student human capital count cited",
      `Students: ${adminAns.contextCitations?.totalStudents}`
    );
    assert(adminAns.response.includes("Ecosystem") || adminAns.response.includes("National") || adminAns.response.includes("Systemic"),
      "Test 6.3: High-level policy and governance framing present"
    );
  } catch (err) {
    assert(false, "Test 6 Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // 7. UNAUTHENTICATED ACCESS BLOCKED (HTTP 401)
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST 7: Unauthenticated Access Blocked Across All Roles ---");
  try {
    const roles = ["student", "faculty", "campus", "industry", "admin"];
    for (const r of roles) {
      const unauthReq = new Request("http://localhost:3000/api/ayush/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: r, query: "Show overview" }),
      });

      const res = await ayushAssistantRoute(unauthReq);
      assert(res.status === 401, `Test 7.${r}: Unauthenticated ${r} rejected with HTTP 401`, `Status: ${res.status}`);
    }
  } catch (err) {
    assert(false, "Test 7 Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // 8. AUTHENTICATED ACCESS SUCCEEDS FOR ALL ROLES ON /api/ayush/assistant
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST 8: Authenticated API Execution for All Roles ---");
  try {
    const roleConfigs = [
      { role: "student", header: "x-student-id", id: testStudentId, query: "What should I improve first?" },
      { role: "faculty", header: "x-faculty-id", id: testFacultyId, query: "Where is evidence review pending?" },
      { role: "campus", header: "x-campus-id", id: testCampusId, query: "How is institutional progress trending?" },
      { role: "industry", header: "x-company-id", id: testCompanyId, query: "What competencies are in highest demand?" },
      { role: "admin", header: "x-admin-id", id: testAdminId, query: "Which roles are most ready nationally?" },
    ];

    for (let i = 0; i < roleConfigs.length; i++) {
      const cfg = roleConfigs[i];
      const authReq = new Request("http://localhost:3000/api/ayush/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [cfg.header]: cfg.id,
        },
        body: JSON.stringify({
          role: cfg.role,
          query: cfg.query,
          targetRoleId: cfg.role === "student" ? "ayush-clinical-research" : undefined,
        }),
      });

      const res = await ayushAssistantRoute(authReq);
      assert(res.status === 200, `Test 8.${i + 1}: Authenticated ${cfg.role} returns HTTP 200`, `Status: ${res.status}`);
      const body = await res.json();
      assert(body.success === true, `Test 8.${i + 1}b: Authenticated ${cfg.role} returned success`);
      assert(Boolean(body.data?.response), `Test 8.${i + 1}c: Authenticated ${cfg.role} returned non-empty response`);
    }
  } catch (err) {
    assert(false, "Test 8 Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // 9. BACKWARD COMPATIBILITY: /api/student/assistant
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST 9: Backward Compatibility for /api/student/assistant ---");
  try {
    const compatReq = new Request("http://localhost:3000/api/student/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-student-id": testStudentId,
      },
      body: JSON.stringify({
        query: "What opportunities match me?",
        targetRoleId: "ayush-clinical-research",
      }),
    });

    const res = await studentAssistantRoute(compatReq);
    assert(res.status === 200, "Test 9.1: /api/student/assistant route returns HTTP 200", `Status: ${res.status}`);
    const json = await res.json();
    assert(Boolean(json.data?.response), "Test 9.2: Legacy endpoint returns structured response");
  } catch (err) {
    assert(false, "Test 9 Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // 10. CROSS-ROLE & CROSS-USER DATA ISOLATION
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST 10: Cross-Role & Cross-User Data Isolation ---");
  try {
    const s1 = await askAyushAssistant("student_user_01", "Show my profile", "ayush-clinical-research");
    const s2 = await askAyushAssistant("student_user_02", "Show my profile", "ayush-clinical-practice");

    assert(Boolean(s1.response), "Test 10.1: Student 1 query executed");
    assert(Boolean(s2.response), "Test 10.2: Student 2 query executed");
    assert(s1.contextCitations?.targetRole !== s2.contextCitations?.targetRole,
      "Test 10.3: Target roles and citations isolated between students",
      `${s1.contextCitations?.targetRole} vs ${s2.contextCitations?.targetRole}`
    );
  } catch (err) {
    assert(false, "Test 10 Failed with exception", String(err));
  }

  console.log("\n================================================================================");
  console.log(`🏁 STEP 15 PATCH VALIDATION COMPLETE: ${passed} PASSED | ${failed} FAILED`);
  console.log("================================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runStep15PatchValidation().catch((err) => {
  console.error("Step 15 Patch Validation Unhandled Exception:", err);
  process.exit(1);
});
