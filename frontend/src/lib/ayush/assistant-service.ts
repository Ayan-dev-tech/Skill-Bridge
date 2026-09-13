/**
 * Skill-Bridge — Step 15: AYUSH AI Assistant Service
 *
 * Controlled server-side tool layer and context synthesizer for the SkillBridge AYUSH Assistant.
 * Authoritative data sources: Supabase tables, readiness engine, industry matching, and opportunity discovery.
 */

import { getSupabaseServerClient } from "@/lib/supabase-server";
import {
  AYUSH_TARGET_ROLES,
  ALL_AYUSH_COMPETENCIES,
  getAyushTargetRole,
  getAyushRoleCompetencies,
} from "./competencies";
import { calculateAyushRoleReadiness } from "@/lib/ayush/readiness-engine";
import { matchStudentToIndustryRoles } from "@/lib/ayush/industry-matching-engine";
import { getDiscoveredOpportunities } from "@/lib/ayush/opportunity-discovery";
import type {
  AyushRoleReadiness,
  IndustryRoleMatchResult,
  AyushDiscoveredOpportunity,
} from "@/lib/ayush/types";

export interface StudentAssistantContext {
  studentId: string;
  studentName: string;
  targetRole: {
    id: string;
    name: string;
    ayushSystem: string;
  };
  readiness: AyushRoleReadiness;
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
    targetRole: string;
    readinessScore: number;
    readinessLevel: string;
    criticalBlocked: boolean;
    topGapCompetency?: string;
    pendingReviewsCount: number;
    topMatchedOpportunity?: string;
  };
}

/**
 * Gathers complete authoritative student context using controlled server tools.
 */
export async function getStudentAssistantContext(
  studentId: string,
  targetRoleId?: string
): Promise<StudentAssistantContext> {
  const supabase = getSupabaseServerClient();

  // 1. Resolve student profile / default role
  const resolvedRoleId = targetRoleId || "ayush-clinical-research-coord";
  const roleObj = getAyushTargetRole(resolvedRoleId) || Object.values(AYUSH_TARGET_ROLES)[0];

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

  // 2. Fetch authoritative readiness
  let readiness: AyushRoleReadiness;
  try {
    readiness = await calculateAyushRoleReadiness(roleObj.id, studentId);
  } catch {
    readiness = {
      roleId: roleObj.id,
      roleName: roleObj.name,
      ayushSystem: typeof roleObj.ayushSystem === "string" ? roleObj.ayushSystem : "ayurveda",
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

  // 3. Extract top gaps
  const topGaps = (readiness.remainingGaps || []).slice(0, 5).map((g) => ({
    competencyId: g.competencyId,
    name: g.competencyName,
    category: g.category,
    verifiedRating: g.verifiedRating,
    targetRating: g.targetRating,
    gap: g.gap,
    isCritical: g.isCritical,
  }));

  // 4. Fetch development plans and pending evidence
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

  // 5. Fetch longitudinal verified history
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

  // 6. Fetch industry matches
  let topIndustryMatches: IndustryRoleMatchResult[] = [];
  try {
    topIndustryMatches = await matchStudentToIndustryRoles(studentId);
  } catch {
    topIndustryMatches = [];
  }

  // 7. Fetch discovered opportunities
  let matchedOpportunities: AyushDiscoveredOpportunity[] = [];
  try {
    const allOpps = await getDiscoveredOpportunities(studentId);
    matchedOpportunities = allOpps.slice(0, 4);
  } catch {
    matchedOpportunities = [];
  }

  return {
    studentId,
    studentName,
    targetRole: {
      id: roleObj.id,
      name: roleObj.name,
      ayushSystem: typeof roleObj.ayushSystem === "string" ? roleObj.ayushSystem : "ayurveda",
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

/**
 * Deterministic synthesis engine for safe, reliable grounded responses without external API dependencies.
 */
export function generateDeterministicAssistantResponse(
  query: string,
  ctx: StudentAssistantContext
): AssistantAnswer {
  const q = query.toLowerCase();
  const roleName = ctx.targetRole.name;
  const score = ctx.readiness.overallScore;
  const level = ctx.readiness.readinessLevel;
  const isBlocked = ctx.readiness.isCriticalBlocked;
  const blockingCount = ctx.readiness.blockingCompetencies.length;
  const topGap = ctx.topGaps[0];

  let response = "";
  const actions: string[] = [];

  // Query routing: Readiness & Why Not Ready
  if (q.includes("why") || q.includes("not ready") || q.includes("readiness") || q.includes("status")) {
    if (score >= 85 && !isBlocked) {
      response = `### Target Role Readiness: **${roleName}**\n\n` +
        `You have achieved **${level}** status with an overall score of **${score}%**.\n\n` +
        `Your verified competency profile meets or exceeds the baseline threshold for this AYUSH specialization. ` +
        `You have **${ctx.readiness.matchedCompetencies.length}** competencies fully validated.`;
      actions.push("Explore matching AYUSH opportunities", "Apply to accredited research drives");
    } else {
      response = `### Readiness Diagnosis: **${roleName}**\n\n` +
        `Your current authoritative readiness is **${score}%** (**${level}**).\n\n`;

      if (isBlocked && blockingCount > 0) {
        response += `⚠️ **Critical Requirement Block:** You have **${blockingCount}** critical competency requirement(s) that must reach the institutional minimum before achieving 'READY' status:\n\n`;
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
  // Query routing: What to improve first / Top gaps
  else if (q.includes("improve first") || q.includes("gap") || q.includes("weak") || q.includes("priority")) {
    if (ctx.topGaps.length === 0) {
      response = `### Competency Gap Status\n\n` +
        `No open competency deficits identified for **${roleName}**. All mapped competencies meet institutional criteria.`;
      actions.push("Review skill passport", "Check industry job matches");
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
  // Query routing: Evidence & Pending Review
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
      response += `\nYour assigned faculty mentor will review your submitted artifacts and issue the final authoritative competency score.`;
    } else {
      response += `You have no pending evidence reviews awaiting faculty evaluation. You can upload new clinical documentation anytime via your Development Plans.`;
    }

    actions.push("Check Development Plans", "View Competency History");
  }
  // Query routing: Opportunities & Industry Matches
  else if (q.includes("opportunity") || q.includes("match") || q.includes("job") || q.includes("internship")) {
    response = `### Industry Matches & Live AYUSH Opportunities\n\n`;

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
      response += `No open live opportunities currently matched. Continue verified competency improvement to unlock additional placements.`;
    }

    actions.push("View all AYUSH opportunities", "Inspect matching criteria");
  }
  // General / Default overview
  else {
    response = `### AYUSH Scholar Overview: **${ctx.studentName}**\n\n` +
      `- **Target Specialization:** ${roleName}\n` +
      `- **Overall Readiness:** **${score}%** (${level})\n` +
      `- **Competency Deficits:** ${ctx.topGaps.length} areas remaining\n` +
      `- **Pending Evidence Reviews:** ${ctx.pendingEvidenceCount}\n\n` +
      `**Suggested Next Step:** `;

    if (isBlocked && topGap) {
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

/**
 * Main entry point: Asks the SkillBridge AYUSH Assistant.
 * Attempts Gemini 1.5 Flash first if API key configured, otherwise gracefully falls back to deterministic engine.
 */
export async function askAyushAssistant(
  studentId: string,
  userQuery: string,
  targetRoleId?: string
): Promise<AssistantAnswer> {
  const context = await getStudentAssistantContext(studentId, targetRoleId);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    return generateDeterministicAssistantResponse(userQuery, context);
  }

  // Attempt live Gemini inference with strict context grounding
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const systemPrompt = `You are the SkillBridge AYUSH Assistant, an authoritative AI career & competency advisor for students in AYUSH disciplines (Ayurveda, Yoga & Naturopathy, Unani, Siddha, Homoeopathy).
Your task is to provide concise, accurate, professional guidance grounded SOLELY in the authoritative student data provided below.

RULES:
1. ONLY use AYUSH healthcare, research, and clinical terminology. Never mention IT, web development, or unrelated tech skills.
2. NEVER invent ratings, readiness scores, or verification status. Cite the numbers exactly from the provided context.
3. If data is missing or unverified, state clearly that it is not yet evaluated.
4. Structure your response using markdown with clear headings, bold metrics, and bullet points.
5. Keep the response direct and actionable (under 250 words).

STUDENT CONTEXT:
- Student Name: ${context.studentName}
- Target Role: ${context.targetRole.name} (${context.targetRole.ayushSystem})
- Overall Readiness Score: ${context.readiness.overallScore}% (${context.readiness.readinessLevel})
- Critical Blocked: ${context.readiness.isCriticalBlocked ? "YES" : "NO"}
- Blocking Competencies: ${JSON.stringify(context.readiness.blockingCompetencies)}
- Top Remaining Gaps: ${JSON.stringify(context.topGaps)}
- Pending Evidence Submissions: ${context.pendingEvidenceCount}
- Top Industry Match: ${context.topIndustryMatches[0]?.organization || "None"} (${context.topIndustryMatches[0]?.matchScore || 0}%)
- Live Opportunities: ${context.matchedOpportunities.map((o) => o.title).join(", ") || "None"}

USER QUESTION: "${userQuery}"`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 600,
        },
      }),
    });
    clearTimeout(timeout);

    if (res.ok) {
      const json = await res.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText && rawText.trim().length > 0) {
        return {
          response: rawText.trim(),
          suggestedNextActions: [
            "View Development Plan",
            "Upload Clinical Evidence",
            "Explore AYUSH Opportunities",
          ],
          contextCitations: {
            targetRole: context.targetRole.name,
            readinessScore: context.readiness.overallScore,
            readinessLevel: context.readiness.readinessLevel,
            criticalBlocked: context.readiness.isCriticalBlocked,
            topGapCompetency: context.topGaps[0]?.name,
            pendingReviewsCount: context.pendingEvidenceCount,
            topMatchedOpportunity: context.matchedOpportunities[0]?.title,
          },
        };
      }
    }
  } catch {
    // Gracefully fall through to deterministic engine
  }

  return generateDeterministicAssistantResponse(userQuery, context);
}
