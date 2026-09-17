/**
 * Skill-Bridge — AYUSH Skill Passport Engine
 * Deterministic helper to get or initialize a student's AyushSkillPassport,
 * and record completed assessment results to update skills, competencies,
 * strengths, and identified gaps.
 */

import { db } from "@/lib/db";
import {
  AyushSkillPassport,
  AyushSkillProficiency,
  AyushAssessmentResult,
  AyushPassportSkillGap,
  AYUSH_SKILL_CATALOG,
} from "./types";
import { AYUSH_CLINICAL_RESEARCH_COMPETENCIES } from "./competencies";
import { AssessmentAttempt, AssessmentScoringResult } from "@/lib/assessment/types";

export function createDefaultSkillPassport(studentId: string, studentName?: string): AyushSkillPassport {
  const now = new Date().toISOString();
  
  // Initialize catalog skills as "Not Assessed"
  const skills: Record<string, AyushSkillProficiency> = {};
  for (const item of AYUSH_SKILL_CATALOG) {
    skills[item.skillId] = {
      skillId: item.skillId,
      skillName: item.skillName,
      category: item.category,
      proficiencyLevel: "Not Assessed",
      evidenceSource: "self_declared",
      lastAssessedAt: null,
    };
  }

  return {
    studentId,
    ayushSystem: "ayurveda",
    course: "BAMS - Bachelor of Ayurvedic Medicine and Surgery",
    academicLevel: "UG",
    institution: "National Institute of Ayurveda (NIA), Jaipur",
    batchYear: "2024 - 2029",
    skills,
    competencies: AYUSH_CLINICAL_RESEARCH_COMPETENCIES.map((c) => ({
      ...c,
      demonstratedAt: null,
      verifiedBy: null,
    })),
    assessmentResults: [],
    skillGaps: [],
    certifications: [],
    internshipIds: [],
    verifiedExperiences: [],
    researchInterests: ["Herb-Drug Interactions", "Standardization of Classical Formulations", "ABDM Digital Health Integration"],
    industryReadinessScore: 0,
    industryReadinessBand: "NOT READY",
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Updates the student's AyushSkillPassport based on an assessment completion.
 */
export async function updatePassportWithAssessment(
  attempt: AssessmentAttempt,
  scoring: AssessmentScoringResult,
  configName: string
): Promise<AyushSkillPassport> {
  const existing = await db.getAyushSkillPassport(attempt.studentId);
  const passport: AyushSkillPassport = existing || createDefaultSkillPassport(attempt.studentId);
  const now = new Date().toISOString();

  // 1. Record the assessment result
  const assessedSkillIds = Object.keys(scoring.skillPerformance);
  const assessmentRecord: AyushAssessmentResult = {
    assessmentId: attempt.id,
    assessmentTitle: configName || attempt.configId,
    ayushSystem: attempt.ayushSystem || passport.ayushSystem || "ayurveda",
    skillIds: assessedSkillIds,
    score: scoring.score,
    maxScore: scoring.maxScore,
    scorePercent: scoring.scorePercent,
    completedAt: now,
  };

  // Prepend new assessment result, keeping max 20
  passport.assessmentResults = [assessmentRecord, ...passport.assessmentResults.filter((r) => r.assessmentId !== attempt.id)].slice(0, 20);

  // 2. Update skill proficiencies from scoring.skillPerformance
  for (const [skillId, perf] of Object.entries(scoring.skillPerformance)) {
    const accuracy = perf.accuracyPercent ?? 0;
    let proficiencyLevel: AyushSkillProficiency["proficiencyLevel"] = "Developing";
    if (accuracy >= 80) proficiencyLevel = "Proficient";
    else if (accuracy >= 60) proficiencyLevel = "Competent";
    else if (accuracy >= 40) proficiencyLevel = "Developing";
    else proficiencyLevel = "Beginner";

    passport.skills[skillId] = {
      skillId,
      skillName: perf.skillName,
      category: perf.skillCategory,
      proficiencyLevel,
      evidenceSource: "assessed",
      lastAssessedAt: now,
    };
  }

  // 3. Compute skill gaps (skills with accuracy < 60% or unassessed core skills)
  const gaps: AyushPassportSkillGap[] = [];
  for (const [skillId, perf] of Object.entries(scoring.skillPerformance)) {
    const accuracy = perf.accuracyPercent ?? 0;
    if (accuracy < 65) {
      gaps.push({
        skillId,
        skillName: perf.skillName,
        category: perf.skillCategory,
        currentLevel: accuracy < 40 ? "Beginner" : "Developing",
        targetLevel: "Competent (65%+)",
        priority: accuracy < 40 ? "high" : "medium",
      });
    }
  }

  // Merge gaps with previous gaps not covered in this test
  const currentSkillIds = new Set(assessedSkillIds);
  const previousGaps = passport.skillGaps.filter((g) => !currentSkillIds.has(g.skillId));
  passport.skillGaps = [...gaps, ...previousGaps];

  // 4. Update readiness strictly through canonical verified readiness engine.
  // Assessment results provide baseline evidence only; they do not forge faculty verification.
  try {
    const { calculateAyushRoleReadiness } = await import("./readiness-engine");
    const canonical = await calculateAyushRoleReadiness(
      passport.course || "ayush-clinical-research",
      attempt.studentId
    );
    passport.industryReadinessScore = canonical.overallScore;
    passport.industryReadinessBand = canonical.readinessLevel;
  } catch {
    passport.industryReadinessScore = 0;
    passport.industryReadinessBand = "NOT READY";
  }

  passport.updatedAt = now;
  try {
    await db.saveAyushSkillPassport(passport);
  } catch {
    // ignore in non-persisted test contexts
  }
  return passport;
}
