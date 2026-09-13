/**
 * Skill-Bridge — Explainable AYUSH Industry Role Matching Engine (Step 12)
 *
 * Matches students to employer-specific industry role demands using faculty-verified competencies.
 *
 * STRICT PRINCIPLES:
 * 1. ONLY faculty-verified ratings (from ayush_competency_history and authoritative AyushSkillPassport)
 *    are used for matching.
 * 2. Transparent weighted formula: Attainment = min(1.0, Verified / Required) * Weight.
 * 3. Match Levels: HIGH MATCH (>=85%), STRONG MATCH (70-84%), PARTIAL MATCH (50-69%), LOW MATCH (<50%).
 * 4. Critical Requirement Rule: A role cannot appear HIGH MATCH if any critical competency
 *    requirement is missing/below threshold (< required - 0.5), capping match level at STRONG MATCH.
 * 5. Explainable matching: Explains why the role matches (verified competencies, ratings vs requirements,
 *    weighted contribution, satisfied critical requirements, remaining gaps, and connected Step 11 readiness).
 * 6. Direct bridge to Step 8 Intervention catalog for the next best developmental action.
 * 7. Multi-role ranking: Ranks all 5 AYUSH industry demands by match score.
 */

import { getSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseDb } from "@/lib/supabase-db";
import { getActiveIndustryRoleDemands } from "./industry-demands";
import { calculateAyushRoleReadiness } from "./readiness-engine";
import type {
  IndustryRoleMatchResult,
  IndustryCompetencyMatch,
  IndustryMatchLevel,
  RecommendedInterventionAction,
  FacultyIndustryExportRecord,
} from "./types";

export interface MatchOptions {
  /** Optional override ratings for automated testing / sandbox */
  overrideRatings?: Record<string, number>;
  /** Optional filter for a specific AYUSH roleId */
  filterRoleId?: string;
}

/**
 * Matches a student to active AYUSH industry demands and returns an explainable, ranked result.
 */
export async function matchStudentToIndustryRoles(
  studentId?: string,
  options?: MatchOptions
): Promise<IndustryRoleMatchResult[]> {
  // 1. Gather authoritative faculty-verified ratings for this student
  const verifiedRatingsMap = new Map<string, number>();

  if (studentId) {
    const supabase = getSupabaseServerClient();

    // (a) Load verified records from ayush_competency_history
    const { data: historyData } = await supabase
      .from("ayush_competency_history")
      .select("*")
      .eq("student_id", studentId)
      .eq("decision", "VERIFIED")
      .order("verified_at", { ascending: false });

    if (historyData && historyData.length > 0) {
      for (const h of historyData) {
        if (!verifiedRatingsMap.has(h.competency_id) && h.faculty_final_rating != null) {
          verifiedRatingsMap.set(h.competency_id, Number(h.faculty_final_rating));
        }
      }
    }

    // (b) Also inspect student's AyushSkillPassport as baseline / fallback
    try {
      const passport = await supabaseDb.getAyushSkillPassport(studentId);
      if (passport && Array.isArray(passport.competencies)) {
        for (const comp of passport.competencies) {
          if (comp.verifiedBy && comp.targetLevel != null) {
            const rating = Number((comp as any).currentLevel ?? comp.targetLevel);
            if (!verifiedRatingsMap.has(comp.id)) {
              verifiedRatingsMap.set(comp.id, rating);
            }
          }
        }
      }
    } catch (err) {
      console.warn("Could not load passport for industry matching:", err);
    }
  }

  // (c) Apply override ratings if supplied (for automated testing or sandbox)
  if (options?.overrideRatings) {
    for (const [compId, rating] of Object.entries(options.overrideRatings)) {
      verifiedRatingsMap.set(compId, rating);
    }
  }

  // 2. Fetch all active industry role demands
  const demands = await getActiveIndustryRoleDemands();
  const filteredDemands = options?.filterRoleId
    ? demands.filter((d) => d.roleId === options.filterRoleId)
    : demands;

  // 3. Pre-fetch interventions catalog to link next best actions
  const supabase = getSupabaseServerClient();
  const { data: interventions } = await supabase
    .from("ayush_development_interventions")
    .select("*")
    .eq("active", true);

  const results: IndustryRoleMatchResult[] = [];

  // 4. Evaluate each industry role demand
  for (const demand of filteredDemands) {
    // (a) Compute canonical Step 11 readiness for this role
    let roleReadinessScore = 0;
    let roleReadinessLevel: any = "NOT READY";
    try {
      const readiness = await calculateAyushRoleReadiness(demand.roleId, studentId, {
        overrideRatings: options?.overrideRatings,
      });
      roleReadinessScore = readiness.overallScore;
      roleReadinessLevel = readiness.readinessLevel;
    } catch (rErr) {
      console.warn(`Could not calculate readiness for role ${demand.roleId}:`, rErr);
    }

    // (b) Compute match attainment for each competency requirement
    const totalRawWeight = demand.requiredCompetencies.reduce((sum, c) => sum + (c.weight || 1), 0);
    const allCompetencyMatches: IndustryCompetencyMatch[] = [];
    let isCriticalMissing = false;
    let criticalRequirementsTotal = 0;
    let criticalRequirementsMet = 0;
    let rawScoreSum = 0;

    for (const req of demand.requiredCompetencies) {
      const verifiedRating = verifiedRatingsMap.get(req.competencyId) ?? 0.0;
      const requiredRating = req.requiredRating;
      const attainment = Math.min(1.0, Math.max(0, verifiedRating / requiredRating));
      const normalizedWeight = totalRawWeight > 0 ? (req.weight || 1) / totalRawWeight : 1 / demand.requiredCompetencies.length;
      const matchContribution = Number((attainment * normalizedWeight * 100).toFixed(1));
      const gap = Number(Math.max(0, requiredRating - verifiedRating).toFixed(1));
      const isMatched = gap <= 0.2 || attainment >= 0.9;

      if (req.isCritical) {
        criticalRequirementsTotal++;
      }

      // Critical missing check: verified is below threshold (< required - 0.5 or < 75% attainment)
      const criticalThreshold = Math.max(1.0, requiredRating - 0.5);
      const criticalMissing = req.isCritical && (verifiedRating < criticalThreshold || attainment < 0.75);

      if (req.isCritical && !criticalMissing) {
        criticalRequirementsMet++;
      }
      if (criticalMissing) {
        isCriticalMissing = true;
      }

      rawScoreSum += matchContribution;

      allCompetencyMatches.push({
        competencyId: req.competencyId,
        competencyName: req.competencyName,
        category: req.category,
        verifiedRating: Number(verifiedRating.toFixed(1)),
        requiredRating,
        attainment: Number(attainment.toFixed(2)),
        weight: Number(normalizedWeight.toFixed(3)),
        matchContribution,
        gap,
        isCritical: req.isCritical,
        isMatched,
        criticalMissing,
      });
    }

    const matchScore = Math.min(100, Math.max(0, Math.round(rawScoreSum)));

    // (c) Determine Match Level
    let matchLevel: IndustryMatchLevel;
    if (matchScore < 50) {
      matchLevel = "LOW MATCH";
    } else if (matchScore < 70) {
      matchLevel = "PARTIAL MATCH";
    } else if (matchScore < 85) {
      matchLevel = "STRONG MATCH";
    } else {
      // If matchScore >= 85, verify critical requirements
      if (isCriticalMissing) {
        matchLevel = "STRONG MATCH"; // Capped because critical requirement is missing
      } else {
        matchLevel = "HIGH MATCH";
      }
    }

    // (d) Categorize matches vs gaps
    const matchedCompetencies = allCompetencyMatches
      .filter((c) => c.isMatched || c.verifiedRating >= c.requiredRating)
      .sort((a, b) => b.verifiedRating - a.verifiedRating);

    const missingCompetencies = allCompetencyMatches
      .filter((c) => c.gap > 0)
      .sort((a, b) => {
        if (a.isCritical && !b.isCritical) return -1;
        if (!a.isCritical && b.isCritical) return 1;
        return b.gap - a.gap;
      });

    const criticalMissingRequirements = allCompetencyMatches.filter((c) => c.criticalMissing);

    // (e) Connect next best action from Step 8 interventions catalog
    let nextBestAction: RecommendedInterventionAction | undefined;
    if (missingCompetencies.length > 0 && interventions && interventions.length > 0) {
      const topGap = missingCompetencies[0];
      const matchIntervention = interventions.find((i) => i.competency_id === topGap.competencyId);
      if (matchIntervention) {
        nextBestAction = {
          interventionId: matchIntervention.id,
          title: matchIntervention.title,
          type: matchIntervention.type,
          competencyId: topGap.competencyId,
          competencyName: topGap.competencyName,
          gap: topGap.gap,
          isCritical: topGap.isCritical,
          estimatedDuration: matchIntervention.estimated_duration || "2-3 weeks",
        };
      }
    }

    results.push({
      demandId: demand.id,
      organization: demand.organization,
      roleId: demand.roleId,
      roleTitle: demand.roleTitle,
      ayushSystem: demand.ayushSystem,
      demandStatus: demand.demandStatus,
      experienceRequirementYears: demand.experienceRequirementYears,
      matchScore,
      matchLevel,
      isCriticalMissing,
      criticalRequirementsTotal,
      criticalRequirementsMet,
      matchedCompetencies,
      missingCompetencies,
      criticalMissingRequirements,
      allCompetencyMatches,
      roleReadinessScore,
      roleReadinessLevel,
      nextBestAction,
      opportunityId: demand.opportunityId,
      applicationActionAvailable: true,
      calculatedAt: new Date().toISOString(),
    });
  }

  // 5. Rank by match score descending (ties broken by critical requirements met)
  results.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return b.criticalRequirementsMet - a.criticalRequirementsMet;
  });

  return results;
}

/**
 * Prepares structured export records for Faculty and Industry oversight views.
 */
export function exportFacultyIndustryMatchRecords(
  matches: IndustryRoleMatchResult[],
  studentId: string
): FacultyIndustryExportRecord[] {
  const records: FacultyIndustryExportRecord[] = [];
  for (const match of matches) {
    for (const comp of match.allCompetencyMatches) {
      records.push({
        roleId: match.roleId,
        studentId,
        competencyId: comp.competencyId,
        verifiedRating: comp.verifiedRating,
        targetRating: comp.requiredRating,
        gap: comp.gap,
        matchContribution: comp.matchContribution,
        isCritical: comp.isCritical,
      });
    }
  }
  return records;
}
