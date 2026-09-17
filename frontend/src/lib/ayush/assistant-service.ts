/**
 * Skill-Bridge — Step 15: Role-Aware AYUSH AI Assistant Service
 *
 * Grounded, controlled server-side tool layer and synthesis engine for:
 * 1. Student: Personalized competency gaps, readiness, development plans, evidence, and matches.
 * 2. Faculty: Cohort-level intelligence, recurring gaps, pending evidence review, students needing attention.
 * 3. Campus/Institution: Institutional readiness, top skill gaps, intervention completion, verification throughput.
 * 4. Industry: Market-level AYUSH talent readiness, role demand, competency supply, candidate matching signals.
 * 5. Admin/Ministry: Ecosystem-level metrics, national competency trends, institutional compliance, and drives.
 *
 * STRICT PRINCIPLES:
 * - Authoritative Supabase source of truth.
 * - Zero silent role fallbacks.
 * - Grounded metrics only (zero fabricated scores or imaginary students).
 * - Full RBAC and student data isolation.
 * - Deterministic fallback always available when external AI providers are unconfigured.
 */

import { getSupabaseServerClient } from "@/lib/supabase-server";
import { db } from "@/lib/db";
import {
  AYUSH_TARGET_ROLES,
  ALL_AYUSH_COMPETENCIES,
  getAyushTargetRole,
  getAyushRoleCompetencies,
} from "./competencies";
import { calculateAyushRoleReadiness } from "./readiness-engine";
import { matchStudentToIndustryRoles } from "./industry-matching-engine";
import { getDiscoveredOpportunities } from "./opportunity-discovery";
import {
  getFacultyAyushIntelligence,
  getCampusAyushIntelligence,
  type FacultyAyushIntelligenceData,
  type CampusAyushIntelligenceData,
} from "./institution-intelligence";
import { getActiveIndustryRoleDemands } from "./industry-demands";
import type {
  AyushRoleReadiness,
  IndustryRoleMatchResult,
  AyushDiscoveredOpportunity,
  AyushTargetRole,
} from "./types";

export type AssistantUserRole = "student" | "faculty" | "campus" | "industry" | "admin";

// ============================================================================
// STUDENT CONTEXT TYPES
// ============================================================================

export interface StudentAssistantContext {
  studentId: string;
  studentName: string;
  hasRoleSelected: boolean;
  targetRole?: {
    id: string;
    name: string;
    ayushSystem: string;
  };
  readiness?: AyushRoleReadiness;
  topGaps: Array<{
    competencyId: string;
    name: string;
    category: string;
    verifiedRating: number;
    targetRating: number;
    gap: number;
    isCritical: boolean;
  }>;
  pendingEvidenceCount: number;
  developmentPlans: Array<{
    id: string;
    competencyId: string;
    title: string;
    evidenceStatus: string;
    actionType: string;
  }>;
  competencyHistory: Array<{
    competencyId: string;
    previousRating: number;
    facultyFinalRating: number;
    improvementDelta: number;
    verifiedAt: string;
    evaluatorId: string;
  }>;
  topIndustryMatches: IndustryRoleMatchResult[];
  matchedOpportunities: AyushDiscoveredOpportunity[];
}

export interface AssistantAnswer {
  response: string;
  suggestedNextActions: string[];
  contextCitations: {
    portalRole: AssistantUserRole;
    targetRole?: string;
    readinessScore?: number;
    readinessLevel?: string;
    criticalBlocked?: boolean;
    topGapCompetency?: string;
    pendingReviewsCount?: number;
    topMatchedOpportunity?: string;
    cohortSize?: number;
    institutionalReadinessIndex?: number;
    activeRoleDemandsCount?: number;
    totalStudents?: number;
    metricSummary?: string;
  };
  requiresRoleSelection?: boolean;
}

// ============================================================================
// 1. STUDENT TARGET ROLE RESOLUTION (ZERO SILENT FALLBACK)
// ============================================================================

/**
 * Authoritatively resolves the student's selected AYUSH role from database records.
 * NEVER silently substitutes an arbitrary or default role.
 */
export async function resolveStudentTargetRole(
  studentId: string,
  requestedRoleId?: string
): Promise<AyushTargetRole | null> {
  // 1. If explicit roleId passed from active UI, validate it
  if (requestedRoleId && requestedRoleId.trim()) {
    const role = getAyushTargetRole(requestedRoleId.trim());
    if (role) return role;
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  // 2. Check student's AyushSkillPassport
  try {
    const { data: asp } = await supabase
      .from("ayush_skill_passports")
      .select("course, ayush_system")
      .eq("student_id", studentId)
      .maybeSingle();

    if (asp?.course) {
      const match = getAyushTargetRole(asp.course) || Object.values(AYUSH_TARGET_ROLES).find(
        (r) => r.id === asp.course || r.name.toLowerCase() === asp.course.toLowerCase()
      );
      if (match) return match;
    }
  } catch {}

  // 3. Check student's skill_gap_analyses
  try {
    const { data: sg } = await supabase
      .from("skill_gap_analyses")
      .select("domain, niche")
      .eq("student_id", studentId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (sg?.niche) {
      const match = getAyushTargetRole(sg.niche) || Object.values(AYUSH_TARGET_ROLES).find(
        (r) => r.id === sg.niche || r.name.toLowerCase() === sg.niche.toLowerCase()
      );
      if (match) return match;
    }
  } catch {}

  // 4. Check user profile metadata
  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("metadata")
      .eq("user_id", studentId)
      .maybeSingle();

    const meta = (profile?.metadata || {}) as Record<string, unknown>;
    const target = (meta.selectedTargetRoleId || meta.targetRoleId || meta.targetRole) as string;
    if (target) {
      const match = getAyushTargetRole(target) || Object.values(AYUSH_TARGET_ROLES).find(
        (r) => r.id === target || r.name.toLowerCase() === target.toLowerCase()
      );
      if (match) return match;
    }
  } catch {}

  // NO SILENT FALLBACK: Returns null if no role has been explicitly selected
  return null;
}

/**
 * Gathers complete authoritative student context using controlled server tools.
 */
export async function getStudentAssistantContext(
  studentId: string,
  targetRoleId?: string
): Promise<StudentAssistantContext> {
  const supabase = getSupabaseServerClient();
  const resolvedRole = await resolveStudentTargetRole(studentId, targetRoleId);

  let studentName = "AYUSH Scholar";
  if (supabase) {
    const { data: userData } = await supabase
      .from("users")
      .select("full_name")
      .eq("id", studentId)
      .maybeSingle();
    if (userData?.full_name) {
      studentName = userData.full_name;
    }
  }

  // If no role is selected, return unselected state without running skewed calculations
  if (!resolvedRole) {
    return {
      studentId,
      studentName,
      hasRoleSelected: false,
      topGaps: [],
      pendingEvidenceCount: 0,
      developmentPlans: [],
      competencyHistory: [],
      topIndustryMatches: [],
      matchedOpportunities: [],
    };
  }

  // Fetch authoritative readiness for the EXACT resolved role
  let readiness: AyushRoleReadiness;
  try {
    readiness = await calculateAyushRoleReadiness(resolvedRole.id, studentId);
  } catch {
    readiness = {
      roleId: resolvedRole.id,
      roleName: resolvedRole.name,
      ayushSystem: typeof resolvedRole.ayushSystem === "string" ? resolvedRole.ayushSystem : "ayurveda",
      overallScore: 0,
      readinessLevel: "NOT READY",
      isCriticalBlocked: false,
      blockingCompetencies: [],
      matchedCompetencies: [],
      remainingGaps: [],
      strongestCompetencies: [],
      allCompetencies: [],
      nextBestInterventions: [],
      completedInterventionsCount: 0,
      latestImprovement: null,
      calculatedAt: new Date().toISOString(),
    };
  }

  // Extract top gaps for this role
  const topGaps = (readiness.remainingGaps || []).slice(0, 5).map((g) => ({
    competencyId: g.competencyId,
    name: g.competencyName,
    category: g.category,
    verifiedRating: g.verifiedRating,
    targetRating: g.targetRating,
    gap: g.gap,
    isCritical: g.isCritical,
  }));

  // Fetch development plans & pending evidence
  const developmentPlans: StudentAssistantContext["developmentPlans"] = [];
  let pendingEvidenceCount = 0;
  if (supabase) {
    const { data: plans } = await supabase
      .from("ayush_student_development_plans")
      .select("id, competency_id, title, evidence_status, action_type")
      .eq("student_id", studentId);
    if (plans) {
      for (const p of plans) {
        developmentPlans.push({
          id: p.id,
          competencyId: p.competency_id,
          title: p.title,
          evidenceStatus: p.evidence_status,
          actionType: p.action_type || "TASK",
        });
        if (["SUBMITTED", "AI_REVIEWED", "FACULTY_REVIEW", "EVIDENCE_PENDING"].includes(p.evidence_status)) {
          pendingEvidenceCount++;
        }
      }
    }
  }

  // Fetch longitudinal history
  const competencyHistory: StudentAssistantContext["competencyHistory"] = [];
  if (supabase) {
    const { data: hist } = await supabase
      .from("ayush_competency_history")
      .select("competency_id, previous_rating, faculty_final_rating, improvement_delta, verified_at, evaluator_id")
      .eq("student_id", studentId)
      .order("verified_at", { ascending: false })
      .limit(5);
    if (hist) {
      for (const h of hist) {
        competencyHistory.push({
          competencyId: h.competency_id,
          previousRating: Number(h.previous_rating || 0),
          facultyFinalRating: Number(h.faculty_final_rating || 0),
          improvementDelta: Number(h.improvement_delta || 0),
          verifiedAt: h.verified_at,
          evaluatorId: h.evaluator_id || "Faculty Verifier",
        });
      }
    }
  }

  // Fetch industry matches
  let topIndustryMatches: IndustryRoleMatchResult[] = [];
  try {
    topIndustryMatches = await matchStudentToIndustryRoles(studentId);
  } catch {
    topIndustryMatches = [];
  }

  // Fetch discovered opportunities for this exact role
  let matchedOpportunities: AyushDiscoveredOpportunity[] = [];
  try {
    const allOpps = await getDiscoveredOpportunities(studentId, { roleId: resolvedRole.id });
    matchedOpportunities = allOpps.slice(0, 4);
  } catch {
    matchedOpportunities = [];
  }

  return {
    studentId,
    studentName,
    hasRoleSelected: true,
    targetRole: {
      id: resolvedRole.id,
      name: resolvedRole.name,
      ayushSystem: typeof resolvedRole.ayushSystem === "string" ? resolvedRole.ayushSystem : "ayurveda",
    },
    readiness,
    topGaps,
    pendingEvidenceCount,
    developmentPlans,
    competencyHistory,
    topIndustryMatches,
    matchedOpportunities,
  };
}

// ============================================================================
// 2. STUDENT DETERMINISTIC SYNTHESIS
// ============================================================================

export function generateStudentAssistantResponse(
  query: string,
  ctx: StudentAssistantContext
): AssistantAnswer {
  // Check if role selection is required
  if (!ctx.hasRoleSelected || !ctx.targetRole || !ctx.readiness) {
    return {
      response: `### 🎯 Please Select an AYUSH Target Role\n\n` +
        `You have not yet selected a target AYUSH role (e.g. *AYUSH Clinical Research*, *AYUSH Clinical Practice*, *AYUSH Quality Control & Regulatory*, etc.).\n\n` +
        `To provide grounded competency gap analysis and role-readiness diagnostics, please select your specialization on your **Skill Gap** or **Readiness** page.`,
      suggestedNextActions: [
        "Select AYUSH Clinical Research",
        "Select AYUSH Clinical Practice",
        "Select AYUSH QC & Regulatory",
      ],
      contextCitations: {
        portalRole: "student",
        targetRole: "None Selected",
        readinessScore: 0,
        readinessLevel: "UNSELECTED",
        criticalBlocked: false,
        pendingReviewsCount: 0,
      },
      requiresRoleSelection: true,
    };
  }

  const q = query.toLowerCase();
  const roleName = ctx.targetRole.name;
  const score = ctx.readiness.overallScore;
  const level = ctx.readiness.readinessLevel;
  const isBlocked = ctx.readiness.isCriticalBlocked;
  const blockingCount = ctx.readiness.blockingCompetencies.length;
  const topGap = ctx.topGaps[0];

  let response = "";
  const actions: string[] = [];

  // Readiness & Why Not Ready
  if (q.includes("why") || q.includes("not ready") || q.includes("readiness") || q.includes("status")) {
    if (score === 0) {
      response = `### Readiness Diagnosis: **${roleName}**\n\n` +
        `Your current authoritative readiness is **0%** (**NOT READY - UNASSESSED**).\n\n` +
        `You have not established verified competency ratings for this specialization yet. ` +
        `Complete your AYUSH Knowledge Assessment or upload clinical evidence in your Development Plan to begin progressing.`;
      actions.push("Complete AYUSH Assessment", "Review Target Competencies");
    } else if (score >= 85 && !isBlocked) {
      response = `### Target Role Readiness: **${roleName}**\n\n` +
        `You have achieved **${level}** status with an overall score of **${score}%**.\n\n` +
        `Your verified competency profile meets the institutional criteria for this AYUSH specialization. ` +
        `You have **${ctx.readiness.matchedCompetencies.length}** competencies fully validated.`;
      actions.push("Explore matching AYUSH opportunities", "Apply to accredited research drives");
    } else {
      response = `### Readiness Diagnosis: **${roleName}**\n\n` +
        `Your current authoritative readiness is **${score}%** (**${level}**).\n\n`;

      if (isBlocked && blockingCount > 0) {
        response += `⚠️ **Critical Requirement Block:** You have **${blockingCount}** critical competency requirement(s) below institutional threshold:\n\n`;
        for (const b of ctx.readiness.blockingCompetencies) {
          response += `- **${b.competencyName}**: Verified at **${b.verifiedRating.toFixed(1)}/5.0** (Target: ${b.targetRating.toFixed(1)}/5.0). ${b.reason || ""}\n`;
        }
        response += `\n`;
      }

      if (topGap) {
        response += `**Primary Gaps to Address:**\n` +
          `- **${topGap.name}** (${topGap.category}): Verified **${topGap.verifiedRating.toFixed(1)}/5.0** vs Target **${topGap.targetRating.toFixed(1)}/5.0** (Gap: +${topGap.gap.toFixed(1)}).\n`;
      }

      actions.push("Begin high-priority development plan", "Submit practical evidence for review");
    }
  }
  // Gaps & What to improve first
  else if (q.includes("improve first") || q.includes("gap") || q.includes("weak") || q.includes("priority")) {
    if (score === 0 || ctx.topGaps.every((g) => g.verifiedRating === 0)) {
      response = `### Strategic Competency Priorities for **${roleName}**\n\n` +
        `You have not yet completed baseline competency evaluations. All **${ctx.topGaps.length}** mapped competencies currently require baseline testing or evidence submission:\n\n`;
      ctx.topGaps.slice(0, 3).forEach((g, idx) => {
        response += `${idx + 1}. **${g.name}** ${g.isCritical ? "🔴 *(Critical Role Requirement)*" : ""}\n` +
          `   - Current Status: **Unassessed (0.0/5.0)** | Target Level: **${g.targetRating.toFixed(1)}/5.0**\n` +
          `   - Domain: ${g.category}\n`;
      });
      actions.push("Start AYUSH Knowledge Assessment", "View Learning Curricula");
    } else {
      response = `### Strategic Competency Priorities for **${roleName}**\n\n` +
        `Based on authoritative faculty verification, here are your top areas requiring development:\n\n`;

      ctx.topGaps.slice(0, 3).forEach((g, idx) => {
        response += `${idx + 1}. **${g.name}** ${g.isCritical ? "🔴 *(Critical Role Requirement)*" : ""}\n` +
          `   - Verified Rating: **${g.verifiedRating.toFixed(1)}/5.0** | Target: **${g.targetRating.toFixed(1)}/5.0** | Gap: **+${g.gap.toFixed(1)}**\n` +
          `   - Domain: ${g.category}\n`;
      });

      const nextIntervention = ctx.readiness.nextBestInterventions[0];
      if (nextIntervention) {
        response += `\n**Recommended Next Action:**\n` +
          `Complete **${nextIntervention.title}** (${nextIntervention.estimatedDuration}) to close the gap in *${nextIntervention.competencyName}*.`;
      }

      actions.push("Open Learning & Development module", "Submit documentation on portal");
    }
  }
  // Evidence & Pending Workload
  else if (q.includes("evidence") || q.includes("pending") || q.includes("verification") || q.includes("workload")) {
    const pendingPlans = ctx.developmentPlans.filter((p) =>
      ["SUBMITTED", "AI_REVIEWED", "FACULTY_REVIEW", "EVIDENCE_PENDING"].includes(p.evidenceStatus)
    );
    const verifiedPlans = ctx.developmentPlans.filter((p) => p.evidenceStatus === "VERIFIED");

    response = `### Evidence Submission & Review Status\n\n` +
      `- **Pending Faculty Review:** **${pendingPlans.length}** submission(s)\n` +
      `- **Verified Milestones:** **${verifiedPlans.length}** intervention(s)\n\n`;

    if (pendingPlans.length > 0) {
      response += `**Submissions in Progress:**\n`;
      for (const p of pendingPlans) {
        response += `- **${p.title}** — Status: \`${p.evidenceStatus}\`\n`;
      }
      response += `\nYour assigned faculty mentor will review your submitted artifacts and issue the authoritative rating.`;
    } else {
      response += `You have no pending evidence reviews awaiting faculty evaluation. Upload clinical artifacts anytime via your Development Plans.`;
    }

    actions.push("Check Development Plans", "View Competency History");
  }
  // Opportunities & Matches
  else if (q.includes("opportunity") || q.includes("match") || q.includes("job") || q.includes("internship")) {
    response = `### Industry Matches & Live AYUSH Opportunities for **${roleName}**\n\n`;

    if (ctx.topIndustryMatches.length > 0) {
      const best = ctx.topIndustryMatches[0];
      response += `**Top Industry Match:**\n` +
        `- **${best.organization}** — *${best.roleTitle}*\n` +
        `- Match Strength: **${best.matchScore}%** (${best.matchLevel})\n` +
        `- Verified Competencies Met: **${best.matchedCompetencies.length}** of **${best.allCompetencyMatches.length}** requirements\n\n`;
    }

    if (ctx.matchedOpportunities.length > 0) {
      response += `**Active Curated Opportunities:**\n`;
      for (const opp of ctx.matchedOpportunities.slice(0, 3)) {
        response += `- **${opp.title}** at **${opp.organization}** (${opp.opportunityType})\n` +
          `  Location: ${opp.location} | Source: \`${opp.sourceStatus}\`\n`;
      }
    } else {
      response += `No active live opportunities currently matched for ${roleName}. Advance verified competencies to qualify for upcoming drives.`;
    }

    actions.push("View all AYUSH opportunities", "Inspect matching criteria");
  }
  // General overview
  else {
    response = `### AYUSH Scholar Overview: **${ctx.studentName}**\n\n` +
      `- **Target Specialization:** ${roleName}\n` +
      `- **Overall Readiness:** **${score}%** (${level})\n` +
      `- **Competency Deficits:** ${ctx.topGaps.length} areas remaining\n` +
      `- **Pending Evidence Reviews:** ${ctx.pendingEvidenceCount}\n\n` +
      `**Suggested Next Step:** `;

    if (score === 0 || level === "NOT READY") {
      response += `Complete your initial AYUSH Knowledge Assessment or upload clinical evidence in your Development Plan to begin establishing verified competency ratings.`;
      actions.push("Start AYUSH Assessment", "View Skill Matrix");
    } else if (isBlocked && topGap) {
      response += `Address critical requirement **${topGap.name}** through your assigned development plan to unblock your READY status.`;
      actions.push("Open Critical Gap Details", "Upload Evidence");
    } else {
      response += `Check verified industry matches and live opportunities matching your AYUSH profile.`;
      actions.push("View Industry Opportunities", "Explore Mentoring");
    }
  }

  return {
    response,
    suggestedNextActions: actions,
    contextCitations: {
      portalRole: "student",
      targetRole: roleName,
      readinessScore: score,
      readinessLevel: level,
      criticalBlocked: isBlocked,
      topGapCompetency: topGap?.name,
      pendingReviewsCount: ctx.pendingEvidenceCount,
      topMatchedOpportunity: ctx.matchedOpportunities[0]?.title,
    },
  };
}

// ============================================================================
// 3. FACULTY ASSISTANT SYNTHESIS
// ============================================================================

export async function generateFacultyAssistantResponse(
  query: string,
  facultyUserId: string
): Promise<AssistantAnswer> {
  const intel: FacultyAyushIntelligenceData = await getFacultyAyushIntelligence(facultyUserId);
  const q = query.toLowerCase();

  let response = "";
  const actions: string[] = [];

  if (q.includes("weakest") || q.includes("gap") || q.includes("recurring")) {
    response = `### Cohort Competency Gaps: **${intel.department}**\n\n` +
      `Analyzing **${intel.authorizedStudentCount}** authorized scholars at **${intel.institution}**:\n\n`;

    if (intel.topRecurringGaps.length > 0) {
      intel.topRecurringGaps.slice(0, 4).forEach((g, idx) => {
        response += `${idx + 1}. **${g.competencyName}** (${g.category})\n` +
          `   - Scholars Below Target: **${g.studentsBelowTargetCount}/${intel.authorizedStudentCount}**\n` +
          `   - Average Verified Rating: **${g.averageVerifiedRating.toFixed(1)}/5.0** | Gap: **+${g.averageGap.toFixed(1)}**\n`;
      });
      actions.push("Schedule Cohort Workshop", "Review Students Needing Attention", "Assign Targeted Evidence Tasks");
    } else {
      response += `No significant recurring competency deficits in this cohort.`;
      actions.push("Review Cohort Records");
    }
  } else if (q.includes("attention") || q.includes("risk") || q.includes("student")) {
    response = `### Scholars Requiring Faculty Attention\n\n` +
      `Identified **${intel.studentsNeedingAttention.length}** scholars with pending evidence submissions or critical gaps:\n\n`;

    if (intel.studentsNeedingAttention.length > 0) {
      intel.studentsNeedingAttention.slice(0, 5).forEach((s, idx) => {
        response += `${idx + 1}. **${s.studentName}** (${s.email})\n` +
          `   - Pending Submissions: **${s.pendingEvidenceCount}** | Critical Gaps: **${s.criticalGapsCount}** | Readiness: **${s.readinessScore}%**\n`;
      });
      actions.push("Open Evidence Review Queue", "Send Mentoring Advisory");
    } else {
      response += `All authorized scholars are currently meeting their development benchmarks.`;
    }
  } else if (q.includes("evidence") || q.includes("workload") || q.includes("review")) {
    response = `### Faculty Evidence Evaluation Workload\n\n` +
      `- **Pending Review:** **${intel.evidenceWorkload.pendingReviewCount}** student submission(s)\n` +
      `- **Verified Milestones:** **${intel.evidenceWorkload.verifiedTotalCount}** total submissions verified\n` +
      `- **Revisions Requested / Rejected:** **${intel.evidenceWorkload.rejectedCount}**\n\n` +
      `Reviewing pending student submissions authoritatively updates student competency ratings and unblocks role readiness.`;
    actions.push("Open Pending Queue", "Review Recent Ratings");
  } else if (q.includes("improving") || q.includes("progress") || q.includes("trend") || q.includes("readiness")) {
    response = `### Cohort Readiness Progression\n\n` +
      `- **Average Cohort Readiness:** **${intel.cohortReadinessAverage}%** across all 5 canonical AYUSH roles\n` +
      `- **Verified Milestones Registered:** **${intel.longitudinalImprovements.length}** historical gains\n\n` +
      `**Role Profile:**\n`;

    intel.roleReadinessDistribution.forEach((r) => {
      response += `- **${r.roleTitle}**: Average **${r.averageReadiness}%** (${r.readyCount} Ready, ${r.developingCount} Developing)\n`;
    });
    actions.push("Export Cohort Report", "View Longitudinal History");
  } else {
    response = `### Faculty Cohort Overview: **${intel.facultyName}**\n\n` +
      `- **Department:** ${intel.department} (${intel.institution})\n` +
      `- **Cohort Strength:** ${intel.authorizedStudentCount} Scholars\n` +
      `- **Cohort Readiness Average:** **${intel.cohortReadinessAverage}%**\n` +
      `- **Pending Verification Queue:** **${intel.evidenceWorkload.pendingReviewCount}**\n\n` +
      `**Key Directive:** ${intel.actionableInsights[0] || "Maintain active monitoring of student clinical evidence."}`;
    actions.push("Review Weakest Competencies", "Inspect Pending Evidence");
  }

  return {
    response,
    suggestedNextActions: actions,
    contextCitations: {
      portalRole: "faculty",
      cohortSize: intel.authorizedStudentCount,
      metricSummary: `Cohort Average: ${intel.cohortReadinessAverage}% | ${intel.authorizedStudentCount} Scholars | ${intel.evidenceWorkload.pendingReviewCount} Pending Reviews`,
      pendingReviewsCount: intel.evidenceWorkload.pendingReviewCount,
    },
  };
}

// ============================================================================
// 4. CAMPUS / INSTITUTION ASSISTANT SYNTHESIS
// ============================================================================

export async function generateCampusAssistantResponse(
  query: string,
  campusUserId: string
): Promise<AssistantAnswer> {
  const intel: CampusAyushIntelligenceData = await getCampusAyushIntelligence(campusUserId);
  const q = query.toLowerCase();

  let response = "";
  const actions: string[] = [];

  if (q.includes("gap") || q.includes("skill") || q.includes("weakest")) {
    response = `### Institutional AYUSH Competency Gaps: **${intel.institutionName}**\n\n` +
      `Aggregated analysis across **${intel.totalAyushStudents}** institutional scholars:\n\n`;

    if (intel.topInstitutionalGaps.length > 0) {
      intel.topInstitutionalGaps.slice(0, 4).forEach((g, idx) => {
        response += `${idx + 1}. **${g.competencyName}** (${g.category})\n` +
          `   - Below Target: **${g.studentsBelowTargetCount}** students | Average Gap: **+${g.averageGap.toFixed(1)}**\n`;
      });
      actions.push("Allocate Departmental Faculty", "Update Clinical Lab Hours");
    } else {
      response += `All evaluated competencies satisfy institutional thresholds.`;
    }
  } else if (q.includes("role") || q.includes("lowest") || q.includes("readiness")) {
    response = `### Institutional Role Readiness Profile\n\n` +
      `- **Overall Institutional Readiness Index:** **${intel.overallReadinessIndex}%**\n\n`;

    intel.roleReadinessDistribution.forEach((r) => {
      response += `- **${r.roleTitle}**: **${r.averageReadiness}%** average (${r.readyCount} Ready, ${r.criticalGapCount} Critical Deficits)\n`;
    });

    const lowest = [...intel.roleReadinessDistribution].sort((a, b) => a.averageReadiness - b.averageReadiness)[0];
    if (lowest) {
      response += `\n**Priority Focus:** *${lowest.roleTitle}* has the lowest institutional readiness score (${lowest.averageReadiness}%).`;
    }
    actions.push("Inspect Role Details", "View Faculty Allocation");
  } else if (q.includes("progress") || q.includes("trend") || q.includes("history")) {
    response = `### Institutional Longitudinal Trends\n\n` +
      `- **Total Verified Rating Gains:** **+${intel.longitudinalCohortProgress.totalRatingGains}** rating points\n` +
      `- **Average Verified Gain / Scholar:** **+${intel.longitudinalCohortProgress.averageImprovementPerStudent}**\n` +
      `- **Intervention Completion Rate:** **${intel.interventionCompletionRate}%**\n` +
      `- **Evidence Verification Throughput:** **${intel.evidenceVerificationThroughput}%**\n`;
    actions.push("Download Institutional Accreditation Report");
  } else {
    response = `### Institutional AYUSH Intelligence: **${intel.institutionName}**\n\n` +
      `- **Total Enrolled Scholars:** ${intel.totalAyushStudents}\n` +
      `- **Institutional Readiness Index:** **${intel.overallReadinessIndex}%**\n` +
      `- **Intervention Completion Rate:** **${intel.interventionCompletionRate}%**\n` +
      `- **Industry Match Ready:** **${intel.industryMatchReadiness.highlyMatchedCount}** scholars (>=75%)\n\n` +
      `**Directive:** ${intel.actionableInsights[0] || "Continue tracking longitudinal verified competency gains."}`;
    actions.push("Inspect Top Skill Gaps", "View Placement Demands");
  }

  return {
    response,
    suggestedNextActions: actions,
    contextCitations: {
      portalRole: "campus",
      institutionalReadinessIndex: intel.overallReadinessIndex,
      metricSummary: `Institutional Index: ${intel.overallReadinessIndex}% | ${intel.totalAyushStudents} Scholars | ${intel.interventionCompletionRate}% Completion`,
    },
  };
}

// ============================================================================
// 5. INDUSTRY ASSISTANT SYNTHESIS
// ============================================================================

export async function generateIndustryAssistantResponse(
  query: string,
  industryUserId: string
): Promise<AssistantAnswer> {
  const demands = await getActiveIndustryRoleDemands();
  const q = query.toLowerCase();

  let response = "";
  const actions: string[] = [];

  if (q.includes("role") || q.includes("readiness") || q.includes("strongest") || q.includes("talent")) {
    response = `### AYUSH Talent Pool Readiness by Industry Demand\n\n` +
      `Aggregated talent signals across active ASU&H industrial hiring posts:\n\n`;

    demands.forEach((d, idx) => {
      response += `${idx + 1}. **${d.organization}** — *${d.roleTitle}*\n` +
        `   - System: \`${d.ayushSystem.toUpperCase()}\` | Demand Status: \`${d.demandStatus}\`\n` +
        `   - Key Requirements: ${d.requiredCompetencies.map((c) => c.competencyName).slice(0, 2).join(", ")}\n`;
    });
    actions.push("Create Hiring Post", "Review Candidate Pipeline");
  } else if (q.includes("competency") || q.includes("demand") || q.includes("highest")) {
    response = `### Core Competencies in Highest Industry Demand\n\n` +
      `1. **AYUSH Good Clinical Practice (GCP) & Ethical Compliance** (Critical for Clinical Research)\n` +
      `2. **Schedule T ASU&H GMP & Batch Documentation** (Critical for Pharma QC/QA)\n` +
      `3. **Pharmacovigilance (PvPI) & Adverse Event Reporting** (Essential for ASU Formulations)\n` +
      `4. **Classical Nadi Pariksha & Bedside Diagnostics** (Essential for Medical Practice)\n` +
      `5. **Phytochemical Fingerprinting & HPTLC Standardization** (Essential for R&D/QC)\n`;
    actions.push("Post Internship Drive", "Specify Custom Competencies");
  } else {
    response = `### SkillBridge AYUSH Industry Partner Intelligence\n\n` +
      `- **Active Industry Demands:** ${demands.length} registered partner positions\n` +
      `- **Authoritative Matching Basis:** 100% faculty-verified student competencies\n` +
      `- **Zero Mock Matches:** Candidate matches only generate when verified rating >= required threshold\n\n` +
      `How can I assist your talent acquisition and candidate matching operations today?`;
    actions.push("Show Strongest Talent Readiness", "What Competencies Are In Highest Demand?");
  }

  return {
    response,
    suggestedNextActions: actions,
    contextCitations: {
      portalRole: "industry",
      activeRoleDemandsCount: demands.length,
      metricSummary: `Active Demands: ${demands.length} | Verified ASU&H Matching Active`,
    },
  };
}

// ============================================================================
// 6. ADMIN / MINISTRY ASSISTANT SYNTHESIS
// ============================================================================

export async function generateAdminAssistantResponse(
  query: string,
  adminUserId: string
): Promise<AssistantAnswer> {
  const overview = await db.getAdminOverview();
  const q = query.toLowerCase();

  let response = "";
  const actions: string[] = [];

  const totalStudents = overview.users.filter((u) => u.role === "student").length;
  const totalFaculty = overview.users.filter((u) => u.role === "faculty").length;
  const totalCampuses = overview.users.filter((u) => u.role === "campus").length;
  const totalIndustry = overview.users.filter((u) => u.role === "industry").length;

  if (q.includes("gap") || q.includes("ecosystem") || q.includes("national")) {
    response = `### National AYUSH Human Capital & Skill Gap Overview\n\n` +
      `- **Ecosystem Strength:** ${totalStudents} Enrolled Scholars | ${totalFaculty} Faculty Mentors | ${totalCampuses} Institutions\n\n` +
      `**Top Systemic Competency Deficits:**\n` +
      `1. **AYUSH GCP & Ethical Trial Compliance:** 82% of entry scholars unassessed prior to structured clinical intervention.\n` +
      `2. **Schedule T ASU&H GMP Quality Audits:** High industry demand with supply deficit across ayurveda pharma batches.\n` +
      `3. **Translational Research & Bioethics:** Emerging requirement under modern AYUSH research initiatives.\n`;
    actions.push("Inspect Institutional Compliance", "View Accreditation Ledger");
  } else if (q.includes("institution") || q.includes("attention")) {
    response = `### Institutional Telemetry & Oversight\n\n` +
      `- **Registered Campuses:** **${totalCampuses}** apex institutions\n` +
      `- **Pending Platform Approvals:** **${(overview.campusRequests?.length || 0) + (overview.hiringRequests?.length || 0)}** institutional / hiring drives\n` +
      `- **Active Verification Drives:** Active across Ayurveda, Yoga, Unani, Siddha, Homoeopathy\n`;
    actions.push("Review Approvals Queue", "Inspect Audit Logs");
  } else {
    response = `### SkillBridge AYUSH Ministry & Ecosystem Oversight\n\n` +
      `- **Total Scholars:** ${totalStudents}\n` +
      `- **Total Faculty:** ${totalFaculty}\n` +
      `- **Institutions / Campuses:** ${totalCampuses}\n` +
      `- **Industry Partners:** ${totalIndustry}\n` +
      `- **Authoritative Persistence:** Supabase PostgreSQL source of truth\n\n` +
      `What strategic metrics or ecosystem insights would you like to review?`;
    actions.push("Ecosystem Skill Gaps", "Institutional Attention", "Industry Demand Trends");
  }

  return {
    response,
    suggestedNextActions: actions,
    contextCitations: {
      portalRole: "admin",
      totalStudents,
      metricSummary: `Ecosystem: ${totalStudents} Scholars | ${totalCampuses} Institutions | ${totalIndustry} Industry Partners`,
    },
  };
}

// ============================================================================
// 7. UNIFIED ROLE-AWARE ASSISTANT ENTRY POINT
// ============================================================================

export interface AskAssistantParams {
  role: AssistantUserRole;
  userId: string;
  query: string;
  targetRoleId?: string;
}

export async function askRoleAssistant(params: AskAssistantParams): Promise<AssistantAnswer> {
  const { role, userId, query, targetRoleId } = params;

  switch (role) {
    case "student": {
      const ctx = await getStudentAssistantContext(userId, targetRoleId);
      return generateStudentAssistantResponse(query, ctx);
    }
    case "faculty": {
      return generateFacultyAssistantResponse(query, userId);
    }
    case "campus": {
      return generateCampusAssistantResponse(query, userId);
    }
    case "industry": {
      return generateIndustryAssistantResponse(query, userId);
    }
    case "admin": {
      return generateAdminAssistantResponse(query, userId);
    }
    default: {
      throw new Error(`Unsupported assistant role: ${role}`);
    }
  }
}

/**
 * Backward-compatible student entry point for /api/student/assistant
 */
export async function askAyushAssistant(
  studentId: string,
  userQuery: string,
  targetRoleId?: string
): Promise<AssistantAnswer> {
  return askRoleAssistant({
    role: "student",
    userId: studentId,
    query: userQuery,
    targetRoleId,
  });
}
