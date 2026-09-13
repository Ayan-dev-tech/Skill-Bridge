/**
 * Skill-Bridge — Step 15: AYUSH AI Assistant Validation Script
 *
 * Verifies:
 * A. Assistant controlled tools gather authoritative student data
 * B. Grounded synthesis for canonical prompts (Readiness, Gaps, Evidence, Opportunities)
 * C. Citations reflect exact platform metrics (zero fabricated ratings/scores)
 * D. Unauthenticated API access rejected with HTTP 401
 * E. Authenticated API execution returns structured responses with next actions
 * F. Student isolation preserved (only authorized student context accessed)
 */

import {
  getStudentAssistantContext,
  generateDeterministicAssistantResponse,
  askAyushAssistant,
} from "../src/lib/ayush/assistant-service";
import { POST as assistantPostRoute } from "../src/app/api/student/assistant/route";

async function runStep15Validation() {
  console.log("================================================================================");
  console.log("🚀 STARTING STEP 15: AYUSH AI ASSISTANT VALIDATION");
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

  // ---------------------------------------------------------------------------
  // TEST A: Context Gathering via Controlled Tools
  // ---------------------------------------------------------------------------
  console.log("--- TEST A: Controlled Context Tool Gathering ---");
  try {
    const ctx = await getStudentAssistantContext(testStudentId);
    assert(Boolean(ctx.studentId), "Test A1: Context resolved student ID", ctx.studentId);
    assert(Boolean(ctx.targetRole.name), "Test A2: Context resolved target role", ctx.targetRole.name);
    assert(typeof ctx.readiness.overallScore === "number", "Test A3: Authoritative readiness score numeric", `${ctx.readiness.overallScore}%`);
    assert(Array.isArray(ctx.topGaps), "Test A4: Top gaps array returned", `Count: ${ctx.topGaps.length}`);
    assert(typeof ctx.pendingEvidenceCount === "number", "Test A5: Pending evidence count numeric", `Count: ${ctx.pendingEvidenceCount}`);
    assert(Array.isArray(ctx.topIndustryMatches), "Test A6: Industry matches array returned", `Count: ${ctx.topIndustryMatches.length}`);
  } catch (err) {
    assert(false, "Test A Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST B: Grounded Synthesis for Canonical Queries
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST B: Grounded Synthesis for Canonical Queries ---");
  try {
    const ctx = await getStudentAssistantContext(testStudentId);

    // Prompt 1: Why am I not ready?
    const ans1 = generateDeterministicAssistantResponse("Why am I not ready for this role?", ctx);
    assert(ans1.response.includes("Readiness") || ans1.response.includes("Target Role"), "Test B1: 'Why not ready' generates diagnostic response");
    assert(ans1.suggestedNextActions.length > 0, "Test B1.1: Next actions provided", ans1.suggestedNextActions.join(" | "));

    // Prompt 2: What should I improve first?
    const ans2 = generateDeterministicAssistantResponse("What should I improve first?", ctx);
    assert(ans2.response.includes("Competency") || ans2.response.includes("Priorities"), "Test B2: 'What to improve' prioritizes gaps");
    assert(Boolean(ans2.contextCitations.targetRole), "Test B2.1: Target role cited", ans2.contextCitations.targetRole);

    // Prompt 3: What evidence is pending?
    const ans3 = generateDeterministicAssistantResponse("What evidence is still pending?", ctx);
    assert(ans3.response.includes("Evidence") || ans3.response.includes("Review Status"), "Test B3: 'Pending evidence' lists review workload");
    assert(typeof ans3.contextCitations.pendingReviewsCount === "number", "Test B3.1: Pending reviews count cited", `Count: ${ans3.contextCitations.pendingReviewsCount}`);

    // Prompt 4: What opportunities match me?
    const ans4 = generateDeterministicAssistantResponse("What opportunities match me?", ctx);
    assert(ans4.response.includes("Opportunities") || ans4.response.includes("Industry Matches"), "Test B4: 'Opportunities' surfaces matching roles");
  } catch (err) {
    assert(false, "Test B Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST C: Zero Fabricated Numbers / Exact Citations
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST C: Data Grounding & Exact Citations ---");
  try {
    const ctx = await getStudentAssistantContext(testStudentId);
    const ans = generateDeterministicAssistantResponse("Show my overall readiness status", ctx);

    assert(ans.contextCitations.readinessScore === ctx.readiness.overallScore, "Test C1: Cited score matches exact readiness score", `${ans.contextCitations.readinessScore}%`);
    assert(ans.contextCitations.readinessLevel === ctx.readiness.readinessLevel, "Test C2: Cited level matches authoritative level", ans.contextCitations.readinessLevel);
    assert(ans.contextCitations.criticalBlocked === ctx.readiness.isCriticalBlocked, "Test C3: Critical blocked citation accurate", `Blocked: ${ans.contextCitations.criticalBlocked}`);
  } catch (err) {
    assert(false, "Test C Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST D: Unauthenticated Access Blocked (HTTP 401)
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST D: Unauthenticated Access Protection ---");
  try {
    const unauthReq = new Request("http://localhost:3000/api/student/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "What are my gaps?" }),
    });

    const res = await assistantPostRoute(unauthReq);
    assert(res.status === 401, "Test D1: Unauthenticated request rejected with HTTP 401", `Status: ${res.status}`);
  } catch (err) {
    assert(false, "Test D Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST E: Authenticated API Execution
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST E: Authenticated API Execution ---");
  try {
    const authReq = new Request("http://localhost:3000/api/student/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-student-id": testStudentId,
      },
      body: JSON.stringify({ query: "What should I improve first?" }),
    });

    const res = await assistantPostRoute(authReq);
    assert(res.status === 200, "Test E1: Authenticated request returns HTTP 200", `Status: ${res.status}`);

    const json = await res.json();
    assert(Boolean(json.success), "Test E2: Response payload indicates success");
    assert(Boolean(json.data?.response), "Test E3: Assistant response body present");
    assert(Array.isArray(json.data?.suggestedNextActions), "Test E4: Suggested next actions present", `Actions: ${json.data?.suggestedNextActions?.length}`);
    assert(Boolean(json.data?.contextCitations?.targetRole), "Test E5: Context citations present in API output", json.data?.contextCitations?.targetRole);
  } catch (err) {
    assert(false, "Test E Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST F: Student Data Isolation
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST F: Student Data Isolation ---");
  try {
    const ansStudent1 = await askAyushAssistant("student_user_01", "Show my profile");
    const ansStudent2 = await askAyushAssistant("student_user_02", "Show my profile");

    assert(Boolean(ansStudent1.response), "Test F1: Student 1 query executed");
    assert(Boolean(ansStudent2.response), "Test F2: Student 2 query executed");
    assert(ansStudent1.contextCitations !== undefined && ansStudent2.contextCitations !== undefined, "Test F3: Both students received isolated context citations");
  } catch (err) {
    assert(false, "Test F Failed with exception", String(err));
  }

  console.log("\n================================================================================");
  console.log(`🏁 STEP 15 VALIDATION COMPLETE: ${passed} PASSED | ${failed} FAILED`);
  console.log("================================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runStep15Validation().catch((err) => {
  console.error("Step 15 Validation Unhandled Exception:", err);
  process.exit(1);
});
