/**
 * Skill-Bridge — Explainable AYUSH Readiness Engine (Step 11)
 *
 * Computes deterministic, transparent 0-100% role readiness for AYUSH career pathways.
 *
 * STRICT PRINCIPLES:
 * 1. ONLY faculty-verified competency ratings from ayush_competency_history and
 *    authoritative AyushSkillPassport constitute the verified rating.
 * 2. AI expected ratings and unverified evidence submissions are NEVER used in the score.
 * 3. Transparent weighted formula — no opaque ML model.
 * 4. Critical Competency Gate: A role cannot appear READY if any critical competency
 *    is substantially below target (< target - 0.5 or < 75% attainment), even if
 *    the overall average is >= 85%.
 * 5. Explainable breakdown: Why am I at this score? Strongest skills, remaining gaps,
 *    critical blockers, completed interventions, verified improvements, and next best actions.
 * 6. Structured for Step 12 Industry Demand matching.
 */

import { getSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseDb } from "@/lib/supabase-db";
import { getAyushTargetRole, getAyushRoleCompetencies } from "./competencies";
import type {
  AyushRoleReadiness,
  AyushReadinessLevel,
  CompetencyReadinessContribution,
  LatestVerifiedImprovement,
  RecommendedInterventionAction,
} from "./types";

export interface CalculateReadinessOptions {
  /** Optional override ratings for testing or sandbox simulations (competencyId -> verifiedRating) */
  overrideRatings?: Record<string, number>;
  /** Optional studentId; if null, unauthenticated sandbox calculation with overrides */
  studentId?: string;
  /** Optional flag to skip querying active interventions (recommended for fast cohort aggregations) */
  skipInterventions?: boolean;
}

/**
 * Calculate role readiness for a student and target AYUSH role.
 */
export async function calculateAyushRoleReadiness(
  roleId: string,
  studentId?: string,
  options?: CalculateReadinessOptions
): Promise<AyushRoleReadiness> {
  const role = getAyushTargetRole(roleId);
  if (!role) {
    throw new Error(`Target role "${roleId}" not found in registered AYUSH roles.`);
  }

  const roleCompetencies = getAyushRoleCompetencies(roleId);
  if (roleCompetencies.length === 0) {
    throw new Error(`Role "${roleId}" has no mapped competencies.`);
  }

  // 1. Gather authoritative verified ratings for this student
  const verifiedRatingsMap = new Map<string, number>();
  let latestImprovementRecord: LatestVerifiedImprovement | null = null;
  let completedInterventionsCount = 0;

  if (studentId) {
    const supabase = getSupabaseServerClient();

    // (a) Query immutable competency history with decision = 'VERIFIED'
    const { data: historyData, error: histError } = await supabase
      .from("ayush_competency_history")
      .select("*")
      .eq("student_id", studentId)
      .eq("decision", "VERIFIED")
      .order("verified_at", { ascending: false });

    if (!histError && historyData && historyData.length > 0) {
      // Latest record is the first element
      const latest = historyData[0];
      const matchedComp = roleCompetencies.find((c) => c.id === latest.competency_id);
      latestImprovementRecord = {
        competencyId: latest.competency_id,
        competencyName: matchedComp?.name || latest.competency_id,
        previousRating: Number(latest.previous_rating || 0),
        facultyFinalRating: Number(latest.faculty_final_rating || 0),
        improvementDelta: Number(latest.improvement_delta || 0),
        verifiedAt: latest.verified_at,
      };

      // Populate verified ratings from latest history entry per competency
      for (const h of historyData) {
        if (!verifiedRatingsMap.has(h.competency_id) && h.faculty_final_rating != null) {
          verifiedRatingsMap.set(h.competency_id, Number(h.faculty_final_rating));
        }
      }
    }

    // (b) Also inspect student's AyushSkillPassport verified competencies as baseline / fallback
    try {
      const passport = await supabaseDb.getAyushSkillPassport(studentId);
      if (passport && Array.isArray(passport.competencies)) {
        for (const comp of passport.competencies) {
          if (comp.verifiedBy && comp.targetLevel != null) {
            const passportRating = Number((comp as any).currentLevel ?? comp.targetLevel);
            if (!verifiedRatingsMap.has(comp.id)) {
              verifiedRatingsMap.set(comp.id, passportRating);
            }
          }
        }
      }
    } catch (err) {
      console.warn("Could not load skill passport for student:", err);
    }

    // (c) Count verified development interventions
    try {
      const { count } = await supabase
        .from("ayush_student_development_plans")
        .select("id", { count: "exact", head: true })
        .eq("student_id", studentId)
        .eq("status", "VERIFIED");
      completedInterventionsCount = count || 0;
    } catch (err) {
      console.warn("Could not count verified plans:", err);
    }
  }

  // (d) Apply test overrides if provided (for automated testing or sandbox)
  if (options?.overrideRatings) {
    for (const [compId, rating] of Object.entries(options.overrideRatings)) {
      verifiedRatingsMap.set(compId, rating);
    }
  }

  // 2. Normalize weights if necessary to ensure exact 1.0 sum
  const totalRawWeight = roleCompetencies.reduce((sum, c) => sum + (c.weight || 1), 0);

  // 3. Compute per-competency attainment, contribution, and critical checks
  const allCompetencies: CompetencyReadinessContribution[] = [];
  const blockingCompetencies: AyushRoleReadiness["blockingCompetencies"] = [];
  let isCriticalBlocked = false;
  let rawScoreSum = 0;

  for (const comp of roleCompetencies) {
    const verifiedRating = verifiedRatingsMap.get(comp.id) ?? 0.0;
    const targetRating = comp.targetLevel;
    const normalizedAttainment = Math.min(1.0, Math.max(0, verifiedRating / targetRating));
    const normalizedWeight = totalRawWeight > 0 ? (comp.weight || 1) / totalRawWeight : 1 / roleCompetencies.length;
    const readinessContribution = Number((normalizedAttainment * normalizedWeight * 100).toFixed(1));
    const gap = Number(Math.max(0, targetRating - verifiedRating).toFixed(1));

    // Critical Rule: A critical competency must reach at least (targetLevel - 0.5) and >= 75% attainment
    const isCritical = comp.isCritical ?? false;
    const criticalThreshold = Math.max(1.0, targetRating - 0.5);
    const criticalBlocked = isCritical && (verifiedRating < criticalThreshold || normalizedAttainment < 0.75);

    let reason: string | undefined;
    if (criticalBlocked) {
      isCriticalBlocked = true;
      reason = `Verified rating (${verifiedRating.toFixed(1)}/5) is below the critical threshold of ${criticalThreshold.toFixed(1)}/5 (target: ${targetRating.toFixed(1)}/5).`;
      blockingCompetencies.push({
        competencyId: comp.id,
        competencyName: comp.name,
        verifiedRating,
        targetRating,
        reason,
      });
    }

    rawScoreSum += readinessContribution;

    allCompetencies.push({
      roleId,
      competencyId: comp.id,
      competencyName: comp.name,
      category: comp.category,
      verifiedRating: Number(verifiedRating.toFixed(1)),
      targetRating,
      normalizedAttainment: Number(normalizedAttainment.toFixed(2)),
      weight: Number(normalizedWeight.toFixed(3)),
      readinessContribution,
      gap,
      isCritical,
      criticalBlocked,
      reason,
    });
  }

  // 4. Overall score and readiness level
  const overallScore = Math.min(100, Math.max(0, Math.round(rawScoreSum)));

  let readinessLevel: AyushReadinessLevel;
  if (overallScore < 50) {
    readinessLevel = "NOT READY";
  } else if (overallScore < 70) {
    readinessLevel = "DEVELOPING";
  } else if (overallScore < 85) {
    readinessLevel = "NEAR READY";
  } else {
    // If score >= 85, verify if critical rule blocks READY
    if (isCriticalBlocked) {
      readinessLevel = "NEAR READY";
    } else {
      readinessLevel = "READY";
    }
  }

  // 5. Categorize for Explainability UI
  // Strongest: sorted by verified rating descending (only non-zero ratings)
  const strongestCompetencies = [...allCompetencies]
    .filter((c) => c.verifiedRating > 0)
    .sort((a, b) => b.verifiedRating - a.verifiedRating)
    .slice(0, 4);

  // Remaining Gaps: sorted by critical first, then biggest gap descending
  const remainingGaps = [...allCompetencies]
    .filter((c) => c.gap > 0)
    .sort((a, b) => {
      if (a.isCritical && !b.isCritical) return -1;
      if (!a.isCritical && b.isCritical) return 1;
      return b.gap - a.gap;
    });

  // Matched competencies: gap <= 0 or attainment >= 0.95
  const matchedCompetencies = [...allCompetencies].filter((c) => c.gap <= 0 || c.normalizedAttainment >= 0.95);

  // 6. Fetch Next Best Actions from active interventions
  const nextBestInterventions: RecommendedInterventionAction[] = [];
  try {
    const supabase = getSupabaseServerClient();
    const topGapCompetencies = remainingGaps.slice(0, 3);
    const gapCompIds = topGapCompetencies.map((g) => g.competencyId);

    if (gapCompIds.length > 0 && !options?.skipInterventions) {
      const { data: interventions } = await supabase
        .from("ayush_development_interventions")
        .select("*")
        .in("competency_id", gapCompIds)
        .eq("active", true)
        .limit(6);

      if (interventions && interventions.length > 0) {
        for (const g of topGapCompetencies) {
          const match = interventions.find((i) => i.competency_id === g.competencyId);
          if (match) {
            nextBestInterventions.push({
              interventionId: match.id,
              title: match.title,
              type: match.type,
              competencyId: g.competencyId,
              competencyName: g.competencyName,
              gap: g.gap,
              isCritical: g.isCritical,
              estimatedDuration: match.estimated_duration || "2-3 weeks",
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn("Could not fetch recommended interventions:", err);
  }

  // 7. Assemble final immutable readiness result
  return {
    roleId: role.id,
    roleName: role.name,
    ayushSystem: typeof role.ayushSystem === "string" ? role.ayushSystem : "ayurveda",
    overallScore,
    readinessLevel,
    isCriticalBlocked,
    blockingCompetencies,
    matchedCompetencies,
    remainingGaps,
    strongestCompetencies,
    allCompetencies,
    completedInterventionsCount,
    latestImprovement: latestImprovementRecord,
    nextBestInterventions,
    calculatedAt: new Date().toISOString(),
  };
}
