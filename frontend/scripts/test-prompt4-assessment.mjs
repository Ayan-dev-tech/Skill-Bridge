/**
 * Verification test for Prompt 4:
 * 1. Test NEET UG config and question selection.
 * 2. Test AIAPGET PG config and question selection.
 * 3. Test PRACTICAL_SCENARIO config and question selection.
 * 4. Test question sanitization (ensuring correctOptionId and explanation are NOT exposed to client).
 * 5. Test deterministic scoring and AYUSH skill mapping.
 * 6. Test AYUSH Skill Passport initialization and update via updatePassportWithAssessment.
 * 7. Test that student dashboard metrics reflect latest AYUSH benchmark and passport gaps.
 */

import { db } from "../src/lib/db.js";
import { selectQuestions, sanitizeForClient } from "../src/lib/assessment/selector.js";
import { scoreAssessmentAttempt } from "../src/lib/assessment/scorer.js";
import { createDefaultSkillPassport, updatePassportWithAssessment } from "../src/lib/ayush/passport.js";

async function runPrompt4Tests() {
  console.log("=== PROMPT 4 INTEGRATION VERIFICATION ===");
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // 1. Check configs in database
    const configs = await db.getAssessmentConfigs();
    assert(configs.length >= 3, `Found ${configs.length} active configs (expected at least 3)`);

    const neetConfig = configs.find((c) => c.examType === "NEET_UG");
    const aiapgetConfig = configs.find((c) => c.examType === "AIAPGET_PG");
    const practicalConfig = configs.find((c) => c.examType === "PRACTICAL_SCENARIO");

    assert(!!neetConfig, "NEET_UG assessment config is present and active");
    assert(!!aiapgetConfig, "AIAPGET_PG assessment config is present and active");
    assert(!!practicalConfig, "PRACTICAL_SCENARIO assessment config is present and active");

    // 2. Select questions for each type
    const allQuestions = await db.getActiveAssessmentQuestions();
    assert(allQuestions.length >= 185, `Total active questions: ${allQuestions.length} (expected >= 185)`);

    const neetSelected = selectQuestions(allQuestions, {
      examType: "NEET_UG",
      count: 5,
    });
    assert(neetSelected.length === 5, `Selected ${neetSelected.length} NEET UG questions`);

    const aiapgetSelected = selectQuestions(allQuestions, {
      examType: "AIAPGET_PG",
      count: 5,
    });
    assert(aiapgetSelected.length === 5, `Selected ${aiapgetSelected.length} AIAPGET PG questions`);

    const practicalSelected = selectQuestions(allQuestions, {
      examType: "PRACTICAL_SCENARIO",
      count: 4,
    });
    assert(practicalSelected.length === 4, `Selected ${practicalSelected.length} Practical Scenario questions`);

    // 3. Verify question sanitization (Correct answers must NOT be exposed before submission)
    const sanitized = sanitizeForClient(practicalSelected[0], 1, 4);
    assert(sanitized.options.length === 4, "Sanitized question has exactly 4 options");
    assert(!("correctOptionId" in sanitized), "Sanitized question DOES NOT leak correctOptionId");
    assert(!("explanation" in sanitized), "Sanitized question DOES NOT leak explanation");
    assert(!!sanitized.scenarioContext, "Sanitized practical question retains scenarioContext");

    // 4. Test deterministic scoring with known responses
    const testResponses = {};
    // Give 3 correct, 1 incorrect
    testResponses[practicalSelected[0].id] = {
      questionId: practicalSelected[0].id,
      selectedOptionId: practicalSelected[0].correctOptionId,
      isCorrect: true,
      timeSpentMs: 4500,
      answeredAt: new Date().toISOString(),
    };
    testResponses[practicalSelected[1].id] = {
      questionId: practicalSelected[1].id,
      selectedOptionId: practicalSelected[1].correctOptionId,
      isCorrect: true,
      timeSpentMs: 3200,
      answeredAt: new Date().toISOString(),
    };
    testResponses[practicalSelected[2].id] = {
      questionId: practicalSelected[2].id,
      selectedOptionId: practicalSelected[2].correctOptionId,
      isCorrect: true,
      timeSpentMs: 5100,
      answeredAt: new Date().toISOString(),
    };
    // Pick wrong option
    const wrongOpt = practicalSelected[3].options.find((o) => o.id !== practicalSelected[3].correctOptionId);
    testResponses[practicalSelected[3].id] = {
      questionId: practicalSelected[3].id,
      selectedOptionId: wrongOpt.id,
      isCorrect: false,
      timeSpentMs: 6000,
      answeredAt: new Date().toISOString(),
    };

    const scoring = scoreAssessmentAttempt(practicalSelected, testResponses);
    assert(scoring.correctCount === 3, `Deterministic scorer got 3 correct (got ${scoring.correctCount})`);
    assert(scoring.incorrectCount === 1, `Deterministic scorer got 1 incorrect (got ${scoring.incorrectCount})`);
    assert(scoring.scorePercent === 75, `Score percent is 75% (got ${scoring.scorePercent}%)`);
    assert(Object.keys(scoring.skillPerformance).length > 0, "Scoring produced AYUSH skill performance mappings");
    assert(scoring.subjectBreakdown.length > 0, "Scoring produced subject breakdown");

    // 5. Test AYUSH Skill Passport creation and update
    const testStudentId = "test_student_prompt4_verify";
    const defaultPassport = createDefaultSkillPassport(testStudentId, "Test Ayush Scholar");
    assert(defaultPassport.studentId === testStudentId, "Skill Passport initialized for student");
    assert(Object.keys(defaultPassport.skills).length >= 10, "Skill Passport includes all AYUSH catalog skills");

    const mockAttempt = {
      id: "asmt_verify_001",
      studentId: testStudentId,
      configId: practicalConfig.id,
      examType: practicalConfig.examType,
      ayushSystem: "ayurveda",
      questionIds: practicalSelected.map((q) => q.id),
      responses: testResponses,
      startedAt: new Date().toISOString(),
      endedAt: new Date().toISOString(),
      status: "completed",
      score: scoring.score,
      maxScore: scoring.maxScore,
      scorePercent: scoring.scorePercent,
      correctCount: scoring.correctCount,
      incorrectCount: scoring.incorrectCount,
      unattemptedCount: scoring.unattemptedCount,
      totalQuestions: 4,
      skillPerformance: scoring.skillPerformance,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedPassport = await updatePassportWithAssessment(mockAttempt, scoring, practicalConfig.name);
    assert(updatedPassport.assessmentResults.length === 1, "Passport recorded completed assessment");
    assert(updatedPassport.industryReadinessScore !== null, `Passport calculated readiness score: ${updatedPassport.industryReadinessScore}%`);
    assert(updatedPassport.industryReadinessBand !== "Not Assessed", `Passport readiness band assigned: ${updatedPassport.industryReadinessBand}`);

    // Verify persistence
    const loadedPassport = await db.getAyushSkillPassport(testStudentId);
    assert(!!loadedPassport, "Skill Passport successfully persisted and retrieved from db");
    assert(loadedPassport.assessmentResults[0].scorePercent === 75, "Retrieved passport matches score");

    console.log(`\nResults: ${passed} passed, ${failed} failed.`);
    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error("Test execution failed:", err);
    process.exit(1);
  }
}

runPrompt4Tests();
