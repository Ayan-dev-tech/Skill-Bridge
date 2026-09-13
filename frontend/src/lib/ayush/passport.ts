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
    competencies: [
      {
        id: "comp_preclinical_foundations",
        title: "AYUSH Pre-Clinical & Epistemological Fundamentals",
        domain: "Padartha Vijnana & Basic Principles",
        demonstratedAt: now,
        verifiedBy: "Academic Evaluation Cell",
      },
    ],
    assessmentResults: [],
    skillGaps: [],
    certifications: [],
    internshipIds: [],
    verifiedExperiences: [],
    researchInterests: ["Herb-Drug Interactions", "Standardization of Classical Formulations", "ABDM Digital Health Integration"],
    industryReadinessScore: null,
    industryReadinessBand: "Not Assessed",
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

  // 4. Calculate industry readiness score
  const assessedSkills = Object.values(passport.skills).filter((s) => s.proficiencyLevel !== "Not Assessed");
  if (assessedSkills.length > 0) {
    const weights: Record<string, number> = {
      Beginner: 40,
      Developing: 60,
      Competent: 80,
      Proficient: 95,
      Expert: 100,
    };
    const totalPoints = assessedSkills.reduce((sum, s) => sum + (weights[s.proficiencyLevel] || 50), 0);
    const avgScore = Math.round(totalPoints / assessedSkills.length);
    passport.industryReadinessScore = avgScore;

    if (avgScore >= 80) passport.industryReadinessBand = "Industry Ready";
    else if (avgScore >= 65) passport.industryReadinessBand = "Emerging";
    else passport.industryReadinessBand = "Developing";
  }

  passport.updatedAt = now;
  await db.saveAyushSkillPassport(passport);
  return passport;
}
