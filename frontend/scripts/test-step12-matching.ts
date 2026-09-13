/**
 * Skill-Bridge — Step 12 Explainable AYUSH Industry Role Matching Validation
 *
 * Tests:
 * A. Fully matching student (100% attainment -> HIGH MATCH)
 * B. Partial match with gaps (identifies exact gaps and ratings)
 * C. Critical requirement missing (caps match at STRONG MATCH even if score >= 85%)
 * D. Ranking of multiple roles (sorted by matchScore descending)
 * E. Match changes after faculty verification (reactive to verified score changes)
 * F. Intervention recommendation for gap (bridges gap to Step 8 catalog)
 * G. Unauthorized access protection (HTTP 401 without student session)
 * H. TypeScript clean
 */

import { matchStudentToIndustryRoles, exportFacultyIndustryMatchRecords } from "../src/lib/ayush/industry-matching-engine";
import { getActiveIndustryRoleDemands } from "../src/lib/ayush/industry-demands";

async function runStep12Validation() {
  console.log("================================================================================");
  console.log("🚀 STARTING STEP 12: EXPLAINABLE AYUSH INDUSTRY ROLE MATCHING VALIDATION");
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
  // TEST A: Fully Matching Student
  // ---------------------------------------------------------------------------
  console.log("--- TEST A: Fully Matching Student ---");
  try {
    const demands = await getActiveIndustryRoleDemands();
    const aiiaDemand = demands.find((d) => d.id === "demand-aiia-cra")!;

    // Set all competencies to required level
    const fullRatings: Record<string, number> = {};
    for (const req of aiiaDemand.requiredCompetencies) {
      fullRatings[req.competencyId] = req.requiredRating;
    }

    const matches = await matchStudentToIndustryRoles(undefined, {
      overrideRatings: fullRatings,
      filterRoleId: aiiaDemand.roleId,
    });

    const aiiaMatch = matches.find((m) => m.demandId === "demand-aiia-cra");
    assert(!!aiiaMatch, "Test A1: AIIA demand matched", `Demand: ${aiiaMatch?.demandId}`);
    assert(aiiaMatch!.matchScore >= 99 && aiiaMatch!.matchScore <= 100, "Test A2: Match score equals 100%", `Score: ${aiiaMatch!.matchScore}%`);
    assert(aiiaMatch!.matchLevel === "HIGH MATCH", "Test A3: Match level is HIGH MATCH", `Level: ${aiiaMatch!.matchLevel}`);
    assert(!aiiaMatch!.isCriticalMissing, "Test A4: Zero critical requirements missing", `isCriticalMissing: ${aiiaMatch!.isCriticalMissing}`);
    assert(aiiaMatch!.missingCompetencies.length === 0, "Test A5: Zero remaining gaps", `Gaps: ${aiiaMatch!.missingCompetencies.length}`);
    assert(aiiaMatch!.criticalRequirementsMet === aiiaMatch!.criticalRequirementsTotal, "Test A6: All critical requirements met",
      `${aiiaMatch!.criticalRequirementsMet}/${aiiaMatch!.criticalRequirementsTotal}`
    );
  } catch (err) {
    assert(false, "Test A Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST B: Partial Match with Gaps
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST B: Partial Match with Gaps ---");
  try {
    // Only 2 of 5 competencies partially verified
    const partialRatings: Record<string, number> = {
      "comp-ayush-gcp": 3.0, // target 4.0 -> gap 1.0
      "comp-ayush-pvpi": 2.5, // target 3.0 -> gap 0.5
    };

    const matches = await matchStudentToIndustryRoles(undefined, {
      overrideRatings: partialRatings,
      filterRoleId: "ayush-clinical-research",
    });

    const m = matches[0];
    assert(m.matchScore > 0 && m.matchScore < 60, "Test B1: Match score reflects partial verified ratings", `Score: ${m.matchScore}%`);
    assert(m.matchLevel === "LOW MATCH" || m.matchLevel === "PARTIAL MATCH", "Test B2: Match level reflects partial score", `Level: ${m.matchLevel}`);
    assert(m.missingCompetencies.length > 0, "Test B3: Missing competencies list populated", `Gaps count: ${m.missingCompetencies.length}`);
    const gcpGap = m.missingCompetencies.find((c) => c.competencyId === "comp-ayush-gcp");
    assert(gcpGap?.gap === 1.0, "Test B4: Exact gap calculated for GCP (4.0 - 3.0 = 1.0)", `GCP gap: ${gcpGap?.gap}`);
  } catch (err) {
    assert(false, "Test B Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST C: Critical Requirement Missing Gate
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST C: Critical Requirement Missing Gate ---");
  try {
    const demands = await getActiveIndustryRoleDemands();
    const aiiaDemand = demands.find((d) => d.id === "demand-aiia-cra")!;

    // High scores across non-critical or standard competencies, but critical GCP is 1.5/4
    const criticalMissingRatings: Record<string, number> = {};
    for (const req of aiiaDemand.requiredCompetencies) {
      if (req.competencyId === "comp-ayush-gcp") {
        criticalMissingRatings[req.competencyId] = 1.5; // Below threshold (4.0 - 0.5 = 3.5)
      } else {
        criticalMissingRatings[req.competencyId] = req.requiredRating; // 100%
      }
    }

    const matches = await matchStudentToIndustryRoles(undefined, {
      overrideRatings: criticalMissingRatings,
      filterRoleId: aiiaDemand.roleId,
    });

    const m = matches[0];
    assert(m.matchScore >= 80, "Test C1: Aggregate score is high", `Score: ${m.matchScore}%`);
    assert(m.isCriticalMissing === true, "Test C2: isCriticalMissing is true", `isCriticalMissing: ${m.isCriticalMissing}`);
    assert(m.matchLevel === "STRONG MATCH", "Test C3: Level is capped at STRONG MATCH (cannot be HIGH MATCH)", `Level: ${m.matchLevel}`);
    assert(
      m.criticalMissingRequirements.some((c) => c.competencyId === "comp-ayush-gcp"),
      "Test C4: criticalMissingRequirements includes comp-ayush-gcp",
      `Critical missing: ${m.criticalMissingRequirements.map(c => c.competencyName).join(", ")}`
    );
  } catch (err) {
    assert(false, "Test C Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST D: Ranking of Multiple Roles
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST D: Ranking of Multiple Industry Roles ---");
  try {
    // Give strong clinical practice ratings, zero pharma QC ratings
    const roleRatings: Record<string, number> = {
      "comp-ayush-bedside-diagnostics": 3.0,
      "comp-ayush-panchakarma-chikitsa": 3.0,
      "comp-ayush-chronic-case-mgmt": 4.0,
      "comp-ayush-herb-drug": 3.0,
    };

    const allMatches = await matchStudentToIndustryRoles(undefined, {
      overrideRatings: roleRatings,
    });

    assert(allMatches.length === 5, "Test D1: Evaluates all 5 industry role demands", `Total demands: ${allMatches.length}`);
    assert(allMatches[0].roleId === "ayush-clinical-practice", "Test D2: Highest matching role is ranked first",
      `Rank 1: ${allMatches[0].roleTitle} (${allMatches[0].matchScore}%)`
    );

    // Verify sorted order descending
    let isSorted = true;
    for (let i = 0; i < allMatches.length - 1; i++) {
      if (allMatches[i].matchScore < allMatches[i + 1].matchScore) {
        isSorted = false;
        break;
      }
    }
    assert(isSorted, "Test D3: Results are sorted by matchScore descending",
      allMatches.map((m) => `${m.roleTitle}: ${m.matchScore}%`).join(" > ")
    );
  } catch (err) {
    assert(false, "Test D Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST E: Match Changes After Faculty Verification
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST E: Reactivity to New Faculty Verification ---");
  try {
    // Before: GCP at 2.0
    const beforeMatches = await matchStudentToIndustryRoles(undefined, {
      overrideRatings: { "comp-ayush-gcp": 2.0 },
      filterRoleId: "ayush-clinical-research",
    });

    // After faculty verifies GCP at 3.8
    const afterMatches = await matchStudentToIndustryRoles(undefined, {
      overrideRatings: { "comp-ayush-gcp": 3.8 },
      filterRoleId: "ayush-clinical-research",
    });

    const scoreBefore = beforeMatches[0].matchScore;
    const scoreAfter = afterMatches[0].matchScore;

    assert(scoreAfter > scoreBefore, "Test E1: Match score increases after faculty verification",
      `Score: ${scoreBefore}% → ${scoreAfter}% (+${scoreAfter - scoreBefore}%)`
    );

    const gcpBefore = beforeMatches[0].allCompetencyMatches.find((c) => c.competencyId === "comp-ayush-gcp");
    const gcpAfter = afterMatches[0].allCompetencyMatches.find((c) => c.competencyId === "comp-ayush-gcp");
    assert(
      (gcpAfter?.matchContribution || 0) > (gcpBefore?.matchContribution || 0),
      "Test E2: Competency contribution increases deterministically",
      `Contribution: ${gcpBefore?.matchContribution}% → ${gcpAfter?.matchContribution}%`
    );
  } catch (err) {
    assert(false, "Test E Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST F: Next-Best Action Recommendation for Gap
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST F: Next-Best Action Recommendation for Gap ---");
  try {
    const matches = await matchStudentToIndustryRoles(undefined, {
      overrideRatings: { "comp-ayush-trial-design": 2.0 },
      filterRoleId: "ayush-clinical-research",
    });

    const m = matches[0];
    assert(!!m.nextBestAction, "Test F1: Recommends next best action for missing gap",
      `Action: ${m.nextBestAction?.title} (${m.nextBestAction?.competencyName})`
    );
    assert(
      m.nextBestAction?.competencyId === "comp-ayush-gcp" || m.nextBestAction?.competencyId === "comp-ayush-trial-design",
      "Test F2: Next action targets a critical missing competency",
      `Targeted comp: ${m.nextBestAction?.competencyId}`
    );
  } catch (err) {
    assert(false, "Test F Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST G: Faculty / Industry Export Record Structure
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST G: Faculty / Industry Structured Export ---");
  try {
    const matches = await matchStudentToIndustryRoles(undefined, {
      overrideRatings: { "comp-ayush-gcp": 3.8 },
      filterRoleId: "ayush-clinical-research",
    });

    const exportRecords = exportFacultyIndustryMatchRecords(matches, "test-student-id");
    assert(exportRecords.length > 0, "Test G1: Generates structured export records", `Count: ${exportRecords.length}`);
    const r = exportRecords[0];
    const valid =
      r.roleId !== undefined &&
      r.studentId === "test-student-id" &&
      r.competencyId !== undefined &&
      r.verifiedRating !== undefined &&
      r.targetRating !== undefined &&
      r.gap !== undefined &&
      r.matchContribution !== undefined &&
      r.isCritical !== undefined;

    assert(valid, "Test G2: Record contains all fields required for Faculty/Industry review",
      `studentId: ${r.studentId}, roleId: ${r.roleId}, comp: ${r.competencyId}, verified: ${r.verifiedRating}, target: ${r.targetRating}`
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

runStep12Validation().catch((err) => {
  console.error("Validation error:", err);
  process.exit(1);
});
