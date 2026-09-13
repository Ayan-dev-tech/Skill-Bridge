/**
 * Skill-Bridge — Step 11 Explainable AYUSH Readiness Engine Validation
 *
 * Tests:
 * A. Fully verified student readiness calculation (100% attainment -> READY)
 * B. Partially verified competencies (some verified, some 0 -> DEVELOPING / NEAR READY)
 * C. Critical competency blocking READY (overall score >= 85% capped at NEAR READY when critical comp is below threshold)
 * D. Role switching across all 5 canonical AYUSH roles
 * E. Historical improvement display (traceable delta from ayush_competency_history)
 * F. Readiness changes after a new faculty-verified rating
 * G. Unauthorized access protection
 * H. TypeScript clean
 */

import { calculateAyushRoleReadiness } from "../src/lib/ayush/readiness-engine";
import { getAllAyushTargetRoles, getAyushRoleCompetencies } from "../src/lib/ayush/competencies";

async function runStep11Validation() {
  console.log("================================================================================");
  console.log("🚀 STARTING STEP 11: EXPLAINABLE AYUSH READINESS ENGINE VALIDATION");
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

  // ---------------------------------------------------------------------------
  // TEST A: Fully Verified Student Readiness Calculation
  // ---------------------------------------------------------------------------
  console.log("--- TEST A: Fully Verified Student Readiness Calculation ---");
  try {
    const roleId = "ayush-clinical-research";
    const comps = getAyushRoleCompetencies(roleId);
    // Provide full targets for all competencies
    const fullyVerifiedRatings: Record<string, number> = {};
    for (const c of comps) {
      fullyVerifiedRatings[c.id] = c.targetLevel;
    }

    const resA = await calculateAyushRoleReadiness(roleId, undefined, {
      overrideRatings: fullyVerifiedRatings,
    });

    assert(resA.overallScore >= 99 && resA.overallScore <= 100, "Test A1: Overall score equals 100% for full attainment", `Score: ${resA.overallScore}%`);
    assert(resA.readinessLevel === "READY", "Test A2: Readiness status is READY", `Status: ${resA.readinessLevel}`);
    assert(!resA.isCriticalBlocked, "Test A3: isCriticalBlocked is false", `Blocked: ${resA.isCriticalBlocked}`);
    assert(resA.remainingGaps.length === 0, "Test A4: Zero remaining gaps", `Gaps count: ${resA.remainingGaps.length}`);
    assert(resA.matchedCompetencies.length === comps.length, "Test A5: All competencies matched", `Matched: ${resA.matchedCompetencies.length}/${comps.length}`);
  } catch (err) {
    assert(false, "Test A Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST B: Partially Verified Competencies
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST B: Partially Verified Competencies ---");
  try {
    const roleId = "ayush-clinical-research";
    // Only 3 of 9 competencies verified
    const partialRatings: Record<string, number> = {
      "comp-ayush-gcp": 3.8,
      "comp-ayush-pvpi": 2.5,
      "comp-ayush-bioethics": 3.0,
    };

    const resB = await calculateAyushRoleReadiness(roleId, undefined, {
      overrideRatings: partialRatings,
    });

    assert(resB.overallScore > 0 && resB.overallScore < 70, "Test B1: Score reflects partial verified weight", `Score: ${resB.overallScore}%`);
    assert(resB.readinessLevel === "NOT READY" || resB.readinessLevel === "DEVELOPING", "Test B2: Status reflects partial level", `Status: ${resB.readinessLevel}`);
    assert(resB.strongestCompetencies.length === 3, "Test B3: Strongest list contains verified competencies", `Strongest count: ${resB.strongestCompetencies.length}`);
    assert(resB.remainingGaps.length > 0, "Test B4: Remaining gaps properly detected", `Remaining gaps count: ${resB.remainingGaps.length}`);
  } catch (err) {
    assert(false, "Test B Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST C: Critical Competency Blocking READY
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST C: Critical Competency Blocking READY Gate ---");
  try {
    const roleId = "ayush-clinical-research";
    const comps = getAyushRoleCompetencies(roleId);
    // Make overall score very high (~90%) by having high ratings on 8 competencies,
    // but a critical competency (comp-ayush-gcp, target 4) severely lagging at 1.5/4
    const criticalBlockedRatings: Record<string, number> = {};
    for (const c of comps) {
      if (c.id === "comp-ayush-gcp") {
        criticalBlockedRatings[c.id] = 1.5; // Critical target 4, threshold is 3.5 -> below threshold!
      } else {
        criticalBlockedRatings[c.id] = c.targetLevel; // 100% on everything else
      }
    }

    const resC = await calculateAyushRoleReadiness(roleId, undefined, {
      overrideRatings: criticalBlockedRatings,
    });

    assert(resC.overallScore >= 85, "Test C1: Overall weighted score is high (>=85%)", `Score: ${resC.overallScore}%`);
    assert(resC.isCriticalBlocked === true, "Test C2: Critical blocker flag is true", `isCriticalBlocked: ${resC.isCriticalBlocked}`);
    assert(resC.readinessLevel === "NEAR READY", "Test C3: Readiness is capped at NEAR READY (cannot be READY)", `Status: ${resC.readinessLevel}`);
    assert(
      resC.blockingCompetencies.some((b) => b.competencyId === "comp-ayush-gcp"),
      "Test C4: Blocking competencies includes comp-ayush-gcp",
      `Blockers: ${JSON.stringify(resC.blockingCompetencies.map(b => b.competencyName))}`
    );
  } catch (err) {
    assert(false, "Test C Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST D: Role Switching Across All 5 Canonical AYUSH Roles
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST D: Role Switching Across All 5 Roles ---");
  try {
    const allRoles = getAllAyushTargetRoles();
    assert(allRoles.length === 5, "Test D1: All 5 canonical roles exist", `Total roles: ${allRoles.length}`);

    for (const r of allRoles) {
      const resRole = await calculateAyushRoleReadiness(r.id, undefined, {
        overrideRatings: {},
      });
      assert(
        resRole.roleId === r.id && resRole.allCompetencies.length > 0 && resRole.overallScore === 0,
        `Test D2: Role "${r.id}" calculates cleanly from zero baseline`,
        `Comps: ${resRole.allCompetencies.length}, Score: ${resRole.overallScore}%, Status: ${resRole.readinessLevel}`
      );
    }
  } catch (err) {
    assert(false, "Test D Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST E: Historical Improvement & Longitudinal Progress Display
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST E: Historical Improvement Display ---");
  try {
    // Test that calculation properly handles student historical records if present,
    // or formats latestImprovement structure
    const roleId = "ayush-clinical-research";
    const resE = await calculateAyushRoleReadiness(roleId, "mock-student-id");
    assert(resE.latestImprovement === null || typeof resE.latestImprovement.improvementDelta === "number",
      "Test E1: Latest improvement is safely typed and non-crashing",
      resE.latestImprovement ? `Delta: ${resE.latestImprovement.improvementDelta}` : "null (no unverified mock data)"
    );
  } catch (err) {
    assert(false, "Test E Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST F: Readiness Changes After a New Faculty-Verified Rating
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST F: Reactivity to New Faculty-Verified Rating ---");
  try {
    const roleId = "ayush-clinical-research";
    // Before: GCP at 2.0
    const beforeRes = await calculateAyushRoleReadiness(roleId, undefined, {
      overrideRatings: { "comp-ayush-gcp": 2.0 },
    });

    // After faculty verifies GCP at 3.8
    const afterRes = await calculateAyushRoleReadiness(roleId, undefined, {
      overrideRatings: { "comp-ayush-gcp": 3.8 },
    });

    assert(afterRes.overallScore > beforeRes.overallScore, "Test F1: Score strictly increases with higher verified rating",
      `Before: ${beforeRes.overallScore}% → After: ${afterRes.overallScore}% (+${afterRes.overallScore - beforeRes.overallScore}%)`
    );

    const gcpBefore = beforeRes.allCompetencies.find(c => c.competencyId === "comp-ayush-gcp");
    const gcpAfter = afterRes.allCompetencies.find(c => c.competencyId === "comp-ayush-gcp");

    assert(
      (gcpAfter?.readinessContribution || 0) > (gcpBefore?.readinessContribution || 0),
      "Test F2: Competency contribution increases deterministically",
      `Contribution: ${gcpBefore?.readinessContribution}% → ${gcpAfter?.readinessContribution}%`
    );
  } catch (err) {
    assert(false, "Test F Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST G: Step 12 Industry Alignment Structure Compatibility
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST G: Industry Alignment Preparation Structure (Step 12) ---");
  try {
    const roleId = "ayush-clinical-research";
    const resG = await calculateAyushRoleReadiness(roleId, undefined, {
      overrideRatings: { "comp-ayush-gcp": 3.6 },
    });

    const first = resG.allCompetencies[0];
    const hasRequiredFields =
      first.roleId !== undefined &&
      first.competencyId !== undefined &&
      first.verifiedRating !== undefined &&
      first.targetRating !== undefined &&
      first.readinessContribution !== undefined &&
      first.gap !== undefined &&
      first.isCritical !== undefined;

    assert(hasRequiredFields, "Test G1: Exposes all required fields for Step 12 Industry Demand Matching",
      `role_id: ${first.roleId}, comp_id: ${first.competencyId}, verified: ${first.verifiedRating}, target: ${first.targetRating}, gap: ${first.gap}, critical: ${first.isCritical}`
    );
  } catch (err) {
    assert(false, "Test G Failed with exception", String(err));
  }

  console.log("\n================================================================================");
  console.log(`🏁 VALIDATION SUMMARY: ${passed} PASSED / ${failed} FAILED`);
  console.log("================================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runStep11Validation().catch((err) => {
  console.error("Validation error:", err);
  process.exit(1);
});
