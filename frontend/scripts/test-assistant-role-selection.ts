import assert from "assert";
import fs from "fs";
import path from "path";
import { db } from "../src/lib/db";
import {
  askRoleAssistant,
  resolveStudentTargetRole,
  parseAyushRoleFromText,
} from "../src/lib/ayush/assistant-service";
import { getAyushTargetRole, AYUSH_TARGET_ROLES } from "../src/lib/ayush/competencies";
import { calculateAyushRoleReadiness } from "../src/lib/ayush/readiness-engine";
import { createDefaultSkillPassport } from "../src/lib/ayush/passport";

async function runTests() {
  console.log("Starting AYUSH Assistant Target-Role Selection Tests...\n");

  const testStudentId = "2e1e1e0b-de7f-4a1d-aa15-138bb5182dfc";
  const testStudentName = "Alex Rivera";

  // Clean slate for test student target role
  let initialPassport = await db.getAyushSkillPassport(testStudentId);
  if (!initialPassport) {
    initialPassport = createDefaultSkillPassport(testStudentId, testStudentName);
  }
  initialPassport.course = "Unassigned"; // Explicitly no canonical AYUSH target role
  await db.saveAyushSkillPassport(initialPassport);



  // --------------------------------------------------------------------------
  // Test 1: No role => selection prompt
  // --------------------------------------------------------------------------
  console.log("Test 1: When no role is selected, assistant returns selection prompt...");
  const initialAnswer = await askRoleAssistant({
    role: "student",
    userId: testStudentId,
    query: "Why am I not ready?",
  });

  assert.strictEqual(
    initialAnswer.requiresRoleSelection,
    true,
    "Expected requiresRoleSelection to be true"
  );
  assert.ok(
    initialAnswer.response.includes("Please Select an AYUSH Target Role"),
    "Expected prompt asking user to select an AYUSH target role"
  );
  assert.ok(
    initialAnswer.suggestedNextActions.length >= 3,
    "Expected suggested next actions with canonical role options"
  );
  console.log("✔ Test 1 Passed: Selection prompt returned properly when unselected.\n");

  // --------------------------------------------------------------------------
  // Test 2: Click/select valid AYUSH role => role persists to canonical passport
  // --------------------------------------------------------------------------
  console.log("Test 2: Persisting selected role to canonical Supabase/passport source...");
  const targetRoleToSelect = "ayush-clinical-practice";
  const validRole = getAyushTargetRole(targetRoleToSelect);
  assert.ok(validRole, "Target role must be a valid canonical AYUSH role");

  // Simulate server-side canonical persistence as done in POST /api/student/skill-passport
  let passport = await db.getAyushSkillPassport(testStudentId);
  if (!passport) {
    passport = createDefaultSkillPassport(testStudentId, testStudentName);
  }
  passport.course = validRole.id;
  passport.ayushSystem = validRole.ayushSystem as any;
  passport.updatedAt = new Date().toISOString();
  await db.saveAyushSkillPassport(passport);

  const reloadedPassport = await db.getAyushSkillPassport(testStudentId);
  assert.strictEqual(
    reloadedPassport?.course,
    targetRoleToSelect,
    "Passport course must match selected target role"
  );
  console.log(`✔ Test 2 Passed: Role '${targetRoleToSelect}' persisted to canonical passport.\n`);

  // --------------------------------------------------------------------------
  // Test 3: Next assistant request resolves same role without explicit param
  // --------------------------------------------------------------------------
  console.log("Test 3: Next assistant request resolves same persisted role automatically...");
  const resolvedRole = await resolveStudentTargetRole(testStudentId);
  assert.ok(resolvedRole, "Expected resolved target role from database");
  assert.strictEqual(
    resolvedRole.id,
    targetRoleToSelect,
    "Expected resolved role ID to equal selected target role"
  );
  console.log(`✔ Test 3 Passed: Target role resolved as '${resolvedRole.name}'.\n`);

  // --------------------------------------------------------------------------
  // Test 4: Assistant no longer returns selection prompt, answers normally
  // --------------------------------------------------------------------------
  console.log("Test 4: Assistant answers normally without selection prompt or looping...");
  const subsequentAnswer = await askRoleAssistant({
    role: "student",
    userId: testStudentId,
    query: "Why am I not ready?",
  });

  assert.strictEqual(
    subsequentAnswer.requiresRoleSelection,
    undefined,
    "Expected requiresRoleSelection to NOT be true after selection"
  );
  assert.ok(
    !subsequentAnswer.response.includes("Please Select an AYUSH Target Role"),
    "Must not return selection prompt after role is selected"
  );
  assert.ok(
    subsequentAnswer.response.includes(resolvedRole.name) ||
    subsequentAnswer.response.includes("Readiness Diagnosis"),
    "Response must diagnose readiness for the selected role"
  );
  assert.strictEqual(
    subsequentAnswer.contextCitations.targetRole,
    resolvedRole.name,
    "Context citations must reference selected target role"
  );
  console.log("✔ Test 4 Passed: Assistant responded with grounded diagnosis for selected role.\n");

  // --------------------------------------------------------------------------
  // Test 5: Readiness uses selected role
  // --------------------------------------------------------------------------
  console.log("Test 5: Readiness engine computes score for the selected role...");
  const readiness = await calculateAyushRoleReadiness(resolvedRole.id, testStudentId);
  assert.strictEqual(readiness.roleId, targetRoleToSelect);
  assert.strictEqual(readiness.roleName, resolvedRole.name);
  assert.ok(typeof readiness.overallScore === "number");
  console.log(`✔ Test 5 Passed: Readiness engine evaluated '${readiness.roleName}' (${readiness.overallScore}%).\n`);

  // --------------------------------------------------------------------------
  // Test 6: Skill gaps use selected role
  // --------------------------------------------------------------------------
  console.log("Test 6: Skill gaps and competencies use selected role...");
  assert.strictEqual(reloadedPassport?.course, resolvedRole.id);
  const canonicalRole = getAyushTargetRole(reloadedPassport!.course);
  assert.ok(canonicalRole);
  assert.strictEqual(canonicalRole.id, "ayush-clinical-practice");
  assert.ok(canonicalRole.competencies.length > 0);
  console.log(`✔ Test 6 Passed: Skill gaps map to ${canonicalRole.competencies.length} competencies for '${canonicalRole.name}'.\n`);

  // --------------------------------------------------------------------------
  // Test 7: Invalid role rejected
  // --------------------------------------------------------------------------
  console.log("Test 7: Server authority validates and rejects invalid roles...");
  const invalidRole = getAyushTargetRole("non-existent-ayush-role-xyz");
  assert.strictEqual(invalidRole, null, "Invalid role must evaluate to null");
  const parsedInvalid = parseAyushRoleFromText("Invalid Arbitrary Text");
  assert.strictEqual(parsedInvalid, null, "Arbitrary text must not resolve to a role");

  const parsedValidAction = parseAyushRoleFromText("Select AYUSH Clinical Practice");
  assert.ok(parsedValidAction);
  assert.strictEqual(parsedValidAction.id, "ayush-clinical-practice");
  console.log("✔ Test 7 Passed: Invalid role rejected and valid action strings correctly parsed.\n");

  // --------------------------------------------------------------------------
  // Test 8: No localStorage/sessionStorage persistence introduced
  // --------------------------------------------------------------------------
  console.log("Test 8: Verifying zero localStorage/sessionStorage usage in assistant and role files...");
  const filesToCheck = [
    path.join(__dirname, "../src/components/ayush/ayush-assistant-widget.tsx"),
    path.join(__dirname, "../src/lib/ayush/assistant-service.ts"),
    path.join(__dirname, "../src/app/api/ayush/assistant/route.ts"),
    path.join(__dirname, "../src/app/api/student/assistant/route.ts"),
    path.join(__dirname, "../src/app/api/student/skill-passport/route.ts"),
    path.join(__dirname, "../src/app/api/student/readiness/route.ts"),
  ];

  for (const f of filesToCheck) {
    const content = fs.readFileSync(f, "utf8");
    assert.ok(
      !content.includes("localStorage"),
      `File ${f} must not contain localStorage`
    );
    assert.ok(
      !content.includes("sessionStorage"),
      `File ${f} must not contain sessionStorage`
    );
  }
  console.log("✔ Test 8 Passed: Zero localStorage/sessionStorage used across all modified files.\n");

  console.log("=================================================");
  console.log("ALL 8 AYUSH ASSISTANT ROLE SELECTION TESTS PASSED!");
  console.log("=================================================");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
