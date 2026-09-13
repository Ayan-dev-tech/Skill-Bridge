/**
 * Skill-Bridge — Faculty and Institution Intelligence Layer (Step 14)
 *
 * Derives actionable academic and institutional cohort intelligence from authoritative
 * Supabase data (verified competencies, competency history, evidence records, development plans).
 *
 * STRICT PRINCIPLES:
 * 1. Scope Enforcement: Faculty members access ONLY their assigned/departmental students.
 * 2. Campus/Institution Scope: Institution leads access ONLY their institution's aggregate & student data.
 * 3. Authoritative verified basis: Only faculty-final verified ratings and competency history
 *    form the basis of gap diagnostics and readiness.
 * 4. Longitudinal Preservation: Improvements over time are extracted from ayush_competency_history.
 * 5. Actionable insights: Deterministic, transparent statements derived directly from data.
 * 6. No fake analytics or persistent local storage substitutes.
 */

import { getSupabaseServerClient } from "@/lib/supabase-server";
import { db } from "@/lib/db";
import { getAuthorizedStudents, getFacultyProfileData } from "@/lib/faculty/faculty-service";
import { ALL_AYUSH_COMPETENCIES, AYUSH_TARGET_ROLES } from "./competencies";
import { calculateAyushRoleReadiness } from "./readiness-engine";
import { matchStudentToIndustryRoles } from "./industry-matching-engine";
import { FacultyEvaluator } from "@/lib/evidence/faculty-evaluator";

export interface RoleReadinessSummary {
  roleId: string;
  roleTitle: string;
  readyCount: number;        // readiness >= 80%
  developingCount: number;   // 50% <= readiness < 80%
  criticalGapCount: number;  // < 50% or critical missing
  unassessedCount: number;
  averageReadiness: number;
}

export interface CompetencyGapSummary {
  competencyId: string;
  competencyName: string;
  category: string;
  targetRating: number;
  averageVerifiedRating: number;
  averageGap: number;
  studentsBelowTargetCount: number;
  totalEvaluatedCount: number;
}

export interface LongitudinalImprovementItem {
  id: string;
  studentId: string;
  studentName: string;
  roleTitle: string;
  competencyName: string;
  previousRating: number;
  newRating: number;
  improvementDelta: number;
  verifiedAt: string;
  verifiedBy: string;
}

export interface StudentNeedingAttention {
  studentId: string;
  studentName: string;
  email: string;
  pendingEvidenceCount: number;
  criticalGapsCount: number;
  topGapRole: string;
  readinessScore: number;
}

export interface FacultyAyushIntelligenceData {
  facultyId: string;
  facultyName: string;
  department: string;
  institution: string;
  authorizedStudentCount: number;
  cohortReadinessAverage: number;
  roleReadinessDistribution: RoleReadinessSummary[];
  topRecurringGaps: CompetencyGapSummary[];
  studentsNeedingAttention: StudentNeedingAttention[];
  longitudinalImprovements: LongitudinalImprovementItem[];
  evidenceWorkload: {
    pendingReviewCount: number;
    verifiedTotalCount: number;
    rejectedCount: number;
  };
  actionableInsights: string[];
}

export interface CampusAyushIntelligenceData {
  campusUserId: string;
  institutionName: string;
  totalAyushStudents: number;
  overallReadinessIndex: number;
  topInstitutionalGaps: CompetencyGapSummary[];
  roleReadinessDistribution: RoleReadinessSummary[];
  interventionCompletionRate: number; // 0 - 100%
  evidenceVerificationThroughput: number; // 0 - 100%
  industryMatchReadiness: {
    highlyMatchedCount: number; // >= 75% match
    totalEvaluatedCount: number;
    topEmployerRole: string;
  };
  longitudinalCohortProgress: {
    totalRatingGains: number;
    averageImprovementPerStudent: number;
    verifiedMilestoneCount: number;
  };
  actionableInsights: string[];
}

const CANONICAL_ROLES = Object.values(AYUSH_TARGET_ROLES);

/**
 * Derives Faculty Intelligence for an authenticated faculty user.
 */
export async function getFacultyAyushIntelligence(
  facultyUserId: string
): Promise<FacultyAyushIntelligenceData> {
  const profile = await getFacultyProfileData(facultyUserId);
  const authorizedStudentsRes = await getAuthorizedStudents(facultyUserId, { limit: 1000 });
  const students = authorizedStudentsRes.students;
  const studentIds = students.map((s) => s.id);

  if (studentIds.length === 0) {
    return {
      facultyId: facultyUserId,
      facultyName: profile.fullName,
      department: profile.department,
      institution: profile.institution,
      authorizedStudentCount: 0,
      cohortReadinessAverage: 0,
      roleReadinessDistribution: CANONICAL_ROLES.map((r) => ({
        roleId: r.id,
        roleTitle: r.name,
        readyCount: 0,
        developingCount: 0,
        criticalGapCount: 0,
        unassessedCount: 0,
        averageReadiness: 0,
      })),
      topRecurringGaps: [],
      studentsNeedingAttention: [],
      longitudinalImprovements: [],
      evidenceWorkload: {
        pendingReviewCount: 0,
        verifiedTotalCount: 0,
        rejectedCount: 0,
      },
      actionableInsights: ["No authorized AYUSH scholars currently assigned to this department cohort."],
    };
  }

  const supabase = getSupabaseServerClient();

  // 1. Fetch verified competencies for authorized students
  let verifiedRecords: any[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("ayush_student_competencies")
      .select("*")
      .in("student_id", studentIds);
    if (data) verifiedRecords = data;
  }

  // 2. Fetch longitudinal competency history for authorized students
  let historyRecords: any[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("ayush_competency_history")
      .select("*")
      .in("student_id", studentIds)
      .order("verified_at", { ascending: false });
    if (data) historyRecords = data;
  }

  // 3. Fetch evidence status from ayush_student_development_plans for workload
  let verifiedCount = 0;
  let rejectedCount = 0;
  let pendingCount = 0;
  const pendingByStudent = new Map<string, number>();

  if (supabase) {
    const { data: plans } = await supabase
      .from("ayush_student_development_plans")
      .select("student_id, evidence_status")
      .in("student_id", studentIds);
    if (plans) {
      verifiedCount = plans.filter((p) => p.evidence_status === "VERIFIED").length;
      rejectedCount = plans.filter((p) => p.evidence_status === "REJECTED").length;
      for (const p of plans) {
        if (["SUBMITTED", "AI_REVIEWED", "FACULTY_REVIEW", "EVIDENCE_PENDING"].includes(p.evidence_status)) {
          pendingCount++;
          pendingByStudent.set(p.student_id, (pendingByStudent.get(p.student_id) || 0) + 1);
        }
      }
    }
  }

  // Build fast student competency rating lookup
  const studentCompetencyMap = new Map<string, Record<string, number>>();
  for (const rec of verifiedRecords) {
    if (!studentCompetencyMap.has(rec.student_id)) {
      studentCompetencyMap.set(rec.student_id, {});
    }
    studentCompetencyMap.get(rec.student_id)![rec.competency_id] = Number(rec.verified_rating);
  }

  // 4. Compute Role Readiness Distribution across canonical AYUSH roles
  const roleSummaries: RoleReadinessSummary[] = [];
  const studentReadinessMap = new Map<string, { topRole: string; score: number }>();
  let totalScoreSum = 0;
  let totalScoreCount = 0;

  for (const role of CANONICAL_ROLES) {
    let ready = 0;
    let developing = 0;
    let critical = 0;
    let unassessed = 0;
    let roleScoreSum = 0;

    for (const student of students) {
      try {
        const ratings = studentCompetencyMap.get(student.id) || {};
        const readiness = await calculateAyushRoleReadiness(role.id, undefined, { overrideRatings: ratings, skipInterventions: true });
        const score = readiness.overallScore;
        roleScoreSum += score;
        totalScoreSum += score;
        totalScoreCount++;

        if (score >= 80 && !readiness.isCriticalBlocked) {
          ready++;
        } else if (score >= 50) {
          developing++;
        } else if (score > 0) {
          critical++;
        } else {
          unassessed++;
        }

        const currentBest = studentReadinessMap.get(student.id);
        if (!currentBest || score > currentBest.score) {
          studentReadinessMap.set(student.id, { topRole: role.name, score });
        }
      } catch {
        unassessed++;
      }
    }

    const avgScore = students.length > 0 ? Math.round(roleScoreSum / students.length) : 0;
    roleSummaries.push({
      roleId: role.id,
      roleTitle: role.name,
      readyCount: ready,
      developingCount: developing,
      criticalGapCount: critical,
      unassessedCount: unassessed,
      averageReadiness: avgScore,
    });
  }

  const cohortReadinessAverage = totalScoreCount > 0 ? Math.round(totalScoreSum / totalScoreCount) : 0;

  // 5. Compute Top Recurring Competency Gaps

  const compGapList: CompetencyGapSummary[] = [];
  for (const comp of ALL_AYUSH_COMPETENCIES) {
    const target = comp.targetLevel || 4.0;
    let verifiedSum = 0;
    let evaluatedCount = 0;
    let belowTargetCount = 0;

    for (const s of students) {
      const studentRatings = studentCompetencyMap.get(s.id);
      const rating = studentRatings?.[comp.id] ?? 0;
      if (rating > 0) {
        verifiedSum += rating;
        evaluatedCount++;
        if (rating < target) {
          belowTargetCount++;
        }
      } else {
        belowTargetCount++;
      }
    }

    const avgRating = evaluatedCount > 0 ? Number((verifiedSum / evaluatedCount).toFixed(2)) : 0;
    const avgGap = Number(Math.max(0, target - avgRating).toFixed(2));

    compGapList.push({
      competencyId: comp.id,
      competencyName: comp.name,
      category: comp.category,
      targetRating: target,
      averageVerifiedRating: avgRating,
      averageGap: avgGap,
      studentsBelowTargetCount: belowTargetCount,
      totalEvaluatedCount: evaluatedCount,
    });
  }

  // Sort top recurring gaps: highest count of students below target and highest gap magnitude
  compGapList.sort((a, b) => b.studentsBelowTargetCount - a.studentsBelowTargetCount || b.averageGap - a.averageGap);
  const topRecurringGaps = compGapList.slice(0, 6);

  // 6. Students Needing Attention
  const studentsNeedingAttention: StudentNeedingAttention[] = [];

  for (const student of students) {
    const pendingCount = pendingByStudent.get(student.id) || 0;
    const studentRatings = studentCompetencyMap.get(student.id) || {};
    let criticalCount = 0;
    for (const comp of ALL_AYUSH_COMPETENCIES) {
      const target = comp.targetLevel || 4.0;
      const rating = studentRatings[comp.id] ?? 0;
      if (rating < target - 0.5) {
        criticalCount++;
      }
    }

    const readinessMeta = studentReadinessMap.get(student.id) || { topRole: "AYUSH Specialist", score: 0 };

    if (pendingCount > 0 || criticalCount > 0 || readinessMeta.score < 50) {
      studentsNeedingAttention.push({
        studentId: student.id,
        studentName: student.fullName,
        email: student.email,
        pendingEvidenceCount: pendingCount,
        criticalGapsCount: criticalCount,
        topGapRole: readinessMeta.topRole,
        readinessScore: readinessMeta.score,
      });
    }
  }

  studentsNeedingAttention.sort((a, b) => b.pendingEvidenceCount - a.pendingEvidenceCount || a.readinessScore - b.readinessScore);

  // 7. Longitudinal Improvements
  const studentNameMap = new Map(students.map((s) => [s.id, s.fullName]));
  const roleNameMap = new Map(CANONICAL_ROLES.map((r) => [r.id, r.name]));
  const compNameMap = new Map(ALL_AYUSH_COMPETENCIES.map((c) => [c.id, c.name]));

  const longitudinalImprovements: LongitudinalImprovementItem[] = historyRecords.slice(0, 10).map((h) => {
    const prev = Number(h.previous_rating || 0);
    const curr = Number(h.faculty_final_rating ?? h.new_rating ?? 0);
    const delta = Number((h.improvement_delta != null ? Number(h.improvement_delta) : curr - prev).toFixed(2));
    return {
      id: h.id,
      studentId: h.student_id,
      studentName: studentNameMap.get(h.student_id) || "Enrolled Scholar",
      roleTitle: roleNameMap.get(h.role_id) || "AYUSH Role",
      competencyName: compNameMap.get(h.competency_id) || h.competency_id,
      previousRating: prev,
      newRating: curr,
      improvementDelta: delta,
      verifiedAt: h.verified_at,
      verifiedBy: h.evaluator_id || h.verified_by || "Authorized Faculty",
    };
  });

  // 8. Deterministic Actionable Insights
  const actionableInsights: string[] = [];
  if (topRecurringGaps.length > 0) {
    const topGap = topRecurringGaps[0];
    actionableInsights.push(
      `${topGap.studentsBelowTargetCount} scholars are below target rating in ${topGap.competencyName} (Average Gap: ${topGap.averageGap}).`
    );
  }

  const roleWithLargestGap = [...roleSummaries].sort((a, b) => a.averageReadiness - b.averageReadiness)[0];
  if (roleWithLargestGap) {
    actionableInsights.push(
      `${roleWithLargestGap.roleTitle} has the largest cohort gap with an average readiness of ${roleWithLargestGap.averageReadiness}%.`
    );
  }

  const nearReadyRole = [...roleSummaries].sort((a, b) => b.readyCount - a.readyCount)[0];
  if (nearReadyRole && nearReadyRole.readyCount > 0) {
    actionableInsights.push(
      `${nearReadyRole.readyCount} scholars are near-ready (>=80%) for ${nearReadyRole.roleTitle}.`
    );
  }

  if (pendingCount > 0) {
    actionableInsights.push(
      `${pendingCount} student evidence submission${pendingCount === 1 ? "" : "s"} require faculty review and rating verification.`
    );
  }

  if (actionableInsights.length === 0) {
    actionableInsights.push("All authorized students have active verified competencies with steady progress.");
  }

  return {
    facultyId: facultyUserId,
    facultyName: profile.fullName,
    department: profile.department,
    institution: profile.institution,
    authorizedStudentCount: students.length,
    cohortReadinessAverage,
    roleReadinessDistribution: roleSummaries,
    topRecurringGaps,
    studentsNeedingAttention: studentsNeedingAttention.slice(0, 8),
    longitudinalImprovements,
    evidenceWorkload: {
      pendingReviewCount: pendingCount,
      verifiedTotalCount: verifiedCount,
      rejectedCount: rejectedCount,
    },
    actionableInsights,
  };
}

/**
 * Derives Campus / Institutional Aggregated Intelligence for an authorized campus lead.
 * Strictly guarantees that only students belonging to the caller's institution are analyzed.
 */
export async function getCampusAyushIntelligence(
  campusUserId: string
): Promise<CampusAyushIntelligenceData> {
  const campusUser = await db.getUserById(campusUserId);
  const profile = await db.getProfile(campusUserId);
  const pMeta = (profile?.metadata || {}) as Record<string, unknown>;
  const institutionName = (pMeta.institution as string) || campusUser?.fullName || "AYUSH Apex Institution";

  // Authoritatively fetch all students belonging to this institution
  const studentListRes = await db.getCampusStudents(campusUserId, { limit: 1000 });
  const students = studentListRes.students || [];
  const studentIds = students.map((s) => s.id);

  if (studentIds.length === 0) {
    return {
      campusUserId,
      institutionName,
      totalAyushStudents: 0,
      overallReadinessIndex: 0,
      topInstitutionalGaps: [],
      roleReadinessDistribution: CANONICAL_ROLES.map((r) => ({
        roleId: r.id,
        roleTitle: r.name,
        readyCount: 0,
        developingCount: 0,
        criticalGapCount: 0,
        unassessedCount: 0,
        averageReadiness: 0,
      })),
      interventionCompletionRate: 0,
      evidenceVerificationThroughput: 0,
      industryMatchReadiness: {
        highlyMatchedCount: 0,
        totalEvaluatedCount: 0,
        topEmployerRole: "Clinical Research",
      },
      longitudinalCohortProgress: {
        totalRatingGains: 0,
        averageImprovementPerStudent: 0,
        verifiedMilestoneCount: 0,
      },
      actionableInsights: ["No students currently registered under this institution."],
    };
  }

  const supabase = getSupabaseServerClient();

  // 1. Fetch verified competencies strictly within this institution's students
  let verifiedRecords: any[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("ayush_student_competencies")
      .select("*")
      .in("student_id", studentIds);
    if (data) verifiedRecords = data;
  }

  // 2. Fetch longitudinal history strictly for this institution's students
  let historyRecords: any[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("ayush_competency_history")
      .select("*")
      .in("student_id", studentIds);
    if (data) historyRecords = data;
  }

  // 3. Fetch development plans for completion rate
  let totalPlansCount = 0;
  let verifiedPlansCount = 0;
  let submittedPlansCount = 0;
  if (supabase) {
    const { data: plans } = await supabase
      .from("ayush_student_development_plans")
      .select("evidence_status")
      .in("student_id", studentIds);
    if (plans) {
      totalPlansCount = plans.length;
      verifiedPlansCount = plans.filter((p) => p.evidence_status === "VERIFIED").length;
      submittedPlansCount = plans.filter(
        (p) => p.evidence_status === "VERIFIED" || p.evidence_status === "REJECTED" || p.evidence_status === "EVIDENCE_PENDING"
      ).length;
    }
  }

  const interventionCompletionRate =
    totalPlansCount > 0 ? Math.round((verifiedPlansCount / totalPlansCount) * 100) : 0;
  const evidenceVerificationThroughput =
    submittedPlansCount > 0 ? Math.round((verifiedPlansCount / submittedPlansCount) * 100) : 0;

  // Build fast student competency rating lookup for campus
  const studentCompetencyMap = new Map<string, Record<string, number>>();
  for (const rec of verifiedRecords) {
    if (!studentCompetencyMap.has(rec.student_id)) {
      studentCompetencyMap.set(rec.student_id, {});
    }
    studentCompetencyMap.get(rec.student_id)![rec.competency_id] = Number(rec.verified_rating);
  }

  // 4. Role Readiness distribution across institution
  const roleSummaries: RoleReadinessSummary[] = [];
    const highlyMatchedStudentIds = new Set<string>();
    let institutionScoreSum = 0;
    let evaluatedCount = 0;

    for (const role of CANONICAL_ROLES) {
      let ready = 0;
      let developing = 0;
      let critical = 0;
      let unassessed = 0;
      let roleScoreSum = 0;

      for (const s of students) {
        try {
          const ratings = studentCompetencyMap.get(s.id) || {};
          const readiness = await calculateAyushRoleReadiness(role.id, undefined, { overrideRatings: ratings, skipInterventions: true });
          const score = readiness.overallScore;
          roleScoreSum += score;
          institutionScoreSum += score;
          evaluatedCount++;

          if (score >= 75) {
            highlyMatchedStudentIds.add(s.id);
          }

          if (score >= 80 && !readiness.isCriticalBlocked) {
            ready++;
          } else if (score >= 50) {
            developing++;
          } else if (score > 0) {
            critical++;
          } else {
            unassessed++;
          }
        } catch {
          unassessed++;
        }
      }

      const avgRoleScore = students.length > 0 ? Math.round(roleScoreSum / students.length) : 0;
      roleSummaries.push({
        roleId: role.id,
        roleTitle: role.name,
        readyCount: ready,
        developingCount: developing,
        criticalGapCount: critical,
        unassessedCount: unassessed,
        averageReadiness: avgRoleScore,
      });
    }

    const overallReadinessIndex = evaluatedCount > 0 ? Math.round(institutionScoreSum / evaluatedCount) : 0;

    // 5. Top Institutional Competency Gaps
    const gaps: CompetencyGapSummary[] = [];
    for (const comp of ALL_AYUSH_COMPETENCIES) {
      const target = comp.targetLevel || 4.0;
      let verifiedSum = 0;
      let evaluatedStudents = 0;
      let belowTarget = 0;

      for (const s of students) {
        const ratings = studentCompetencyMap.get(s.id);
        const rating = ratings?.[comp.id] ?? 0;
        if (rating > 0) {
          verifiedSum += rating;
          evaluatedStudents++;
          if (rating < target) belowTarget++;
        } else {
          belowTarget++;
        }
      }

      const avgRating = evaluatedStudents > 0 ? Number((verifiedSum / evaluatedStudents).toFixed(2)) : 0;
      const avgGap = Number(Math.max(0, target - avgRating).toFixed(2));

      gaps.push({
        competencyId: comp.id,
        competencyName: comp.name,
        category: comp.category,
        targetRating: target,
        averageVerifiedRating: avgRating,
        averageGap: avgGap,
        studentsBelowTargetCount: belowTarget,
        totalEvaluatedCount: evaluatedStudents,
      });
    }

    gaps.sort((a, b) => b.studentsBelowTargetCount - a.studentsBelowTargetCount || b.averageGap - a.averageGap);
    const topInstitutionalGaps = gaps.slice(0, 5);

    // 6. Longitudinal Progress
    let totalRatingGains = 0;
    for (const h of historyRecords) {
      const prev = Number(h.previous_rating || 0);
      const curr = Number(h.faculty_final_rating ?? h.new_rating ?? 0);
      const delta = h.improvement_delta != null ? Number(h.improvement_delta) : curr - prev;
      if (delta > 0) totalRatingGains += delta;
    }
    totalRatingGains = Number(totalRatingGains.toFixed(2));

    const averageImprovementPerStudent =
      students.length > 0 ? Number((totalRatingGains / students.length).toFixed(2)) : 0;

    // 7. Industry Match Readiness (>= 75% match to active industry roles)
    const topRole = [...roleSummaries].sort((a, b) => b.readyCount - a.readyCount)[0]?.roleTitle || "Clinical Research Specialist";
    const highlyMatchedCount = highlyMatchedStudentIds.size;
    const evaluatedMatches = students.length;

  // 8. Actionable Institutional Insights
  const actionableInsights: string[] = [];
  if (topInstitutionalGaps.length > 0) {
    const g = topInstitutionalGaps[0];
    actionableInsights.push(
      `Institutional Priority: ${g.studentsBelowTargetCount} scholars across departments require competency uplift in ${g.competencyName}.`
    );
  }

  if (interventionCompletionRate < 50 && totalPlansCount > 0) {
    actionableInsights.push(
      `Development plan completion rate is currently ${interventionCompletionRate}%. Encourage faculty mentors to accelerate practical tasks.`
    );
  } else if (interventionCompletionRate >= 75) {
    actionableInsights.push(
      `Strong institutional performance: ${interventionCompletionRate}% of assigned AYUSH development interventions are fully verified.`
    );
  }

  if (totalRatingGains > 0) {
    actionableInsights.push(
      `Longitudinal Progress: Cohort has registered +${totalRatingGains} verified rating points across ${historyRecords.length} milestones.`
    );
  }

  return {
    campusUserId,
    institutionName,
    totalAyushStudents: students.length,
    overallReadinessIndex,
    topInstitutionalGaps,
    roleReadinessDistribution: roleSummaries,
    interventionCompletionRate,
    evidenceVerificationThroughput,
    industryMatchReadiness: {
      highlyMatchedCount,
      totalEvaluatedCount: evaluatedMatches,
      topEmployerRole: "Clinical Research Coordinator",
    },
    longitudinalCohortProgress: {
      totalRatingGains,
      averageImprovementPerStudent,
      verifiedMilestoneCount: historyRecords.length,
    },
    actionableInsights,
  };
}
