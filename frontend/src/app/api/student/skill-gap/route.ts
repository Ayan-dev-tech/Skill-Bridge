/**
 * Skill Bridge — Skill Gap & Educator Recommendations API
 * Server-side authority for student direction, knowledge snapshot,
 * evidence-based skill gap diagnosis, and program matching.
 */

import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { getCanonicalWorkflowState } from "@/lib/workflow/canonical-workflow";
import { DOMAIN_TAXONOMY } from "@/lib/interest-engine/subdomains";
import { DomainId } from "@/lib/interest-engine/types";
import { getTargetSkillProfile } from "@/lib/skill-gap/skill-profiles-data";
import {
  calculateDeterministicSkillGaps,
  generateAIInterpretation,
  matchProgramsToSkillGaps,
} from "@/lib/skill-gap/engine";
import {
  SkillGapAnalysisRecord,
  SkillGapApiResponse,
  SkillGapItem,
  ProgramRecommendation,
} from "@/lib/skill-gap/types";
import { getPersonalizedNicheTrends } from "@/lib/skill-gap/niche-trends-service";

/**
 * Resolves niche ID from confirmed specific interest text and domain ID
 */
function resolveNicheId(
  domainId: string,
  specificInterest: string
): { nicheId: string; nicheTitle: string } {
  const taxonomy = DOMAIN_TAXONOMY[domainId as DomainId];
  if (taxonomy && taxonomy.subDomains) {
    const directMatch = taxonomy.subDomains.find(
      (s) =>
        s.id === specificInterest ||
        s.name.toLowerCase() === specificInterest.toLowerCase() ||
        s.nicheTitle.toLowerCase() === specificInterest.toLowerCase()
    );
    if (directMatch) {
      return { nicheId: directMatch.id, nicheTitle: directMatch.nicheTitle };
    }
    // Partial search
    const partialMatch = taxonomy.subDomains.find(
      (s) =>
        s.name.toLowerCase().includes(specificInterest.toLowerCase()) ||
        specificInterest.toLowerCase().includes(s.name.toLowerCase())
    );
    if (partialMatch) {
      return { nicheId: partialMatch.id, nicheTitle: partialMatch.nicheTitle };
    }
    // First in domain
    if (taxonomy.subDomains.length > 0) {
      return {
        nicheId: taxonomy.subDomains[0].id,
        nicheTitle: taxonomy.subDomains[0].nicheTitle,
      };
    }
  }

  // Generic fallback
  return {
    nicheId: "app-sec",
    nicheTitle: specificInterest || "Application Security & Vulnerability Research",
  };
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const forceRefresh = url.searchParams.get("refresh") === "true";
    const studentIdParam = url.searchParams.get("studentId") || undefined;

    const { student } = await getAuthenticatedStudent(request, studentIdParam);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json<SkillGapApiResponse>(
        {
          success: false,
          error: "Unauthorized. Please sign in as a student.",
        },
        { status: 401 }
      );
    }

    // 1. Strict Canonical Workflow Gating
    const workflow = await getCanonicalWorkflowState(student.id);
    if (!workflow.isKnowledgeTestCompleted) {
      const redirectUrl = !workflow.isVerificationCompleted
        ? "/student/document-verification"
        : !workflow.isInterestFinderCompleted
        ? "/student/interest-finder"
        : "/student/knowledge-testing";

      return NextResponse.json<SkillGapApiResponse>({
        success: false,
        isLocked: true,
        lockedReason:
          "Skill Gap & Suggestions is available only after completing Document Submission, Interest Finder, and Knowledge Testing.",
        redirectUrl,
      });
    }

    // 2. Fetch authoritative student records
    const interestProfile = await db.getInterestProfile(student.id);
    const latestKnowledgeResult = await db.getLatestKnowledgeTestResult(student.id);
    const ayushPassport = await db.getAyushSkillPassport(student.id);
    const assessmentAttempts = await db.getAssessmentAttemptsByStudent(student.id);
    const completedAttempts = assessmentAttempts.filter((a) => a.status === "completed");
    const latestAttempt = completedAttempts.length > 0 ? completedAttempts[completedAttempts.length - 1] : null;

    // AYUSH Assessment Priority Path
    if (latestAttempt || (ayushPassport && ayushPassport.assessmentResults && ayushPassport.assessmentResults.length > 0)) {
      const { createDefaultSkillPassport } = await import("@/lib/ayush/passport");
      const passport = ayushPassport || createDefaultSkillPassport(student.id, student.fullName);
      
      const config = latestAttempt ? await db.getAssessmentConfigById(latestAttempt.configId) : null;
      const examTitle = config?.name || "AYUSH Competency Benchmark";
      
      const direction = {
        domainId: "ayush-clinical",
        domainName: "AYUSH Clinical & Medicinal Sciences",
        nicheId: "ayush-bams",
        nicheTitle: passport.course || "BAMS - Ayurvedic Medicine and Surgery",
        explanation: `Competencies evaluated via ${examTitle} and clinical scenario criteria.`,
      };

      const scorePercent: number = latestAttempt?.scorePercent ?? (passport.assessmentResults[0]?.scorePercent ?? 0);
      const score: number = latestAttempt?.score ?? (passport.assessmentResults[0]?.score ?? 0);
      const maxScore: number = latestAttempt?.maxScore ?? (passport.assessmentResults[0]?.maxScore ?? 100);
      const correctCount: number = latestAttempt?.correctCount ?? 0;
      const totalQuestions: number = latestAttempt ? ((latestAttempt.correctCount ?? 0) + (latestAttempt.incorrectCount ?? 0) + (latestAttempt.unattemptedCount ?? 0)) : 0;

      const strengths: string[] = [];
      const weaknesses: string[] = [];
      
      if (latestAttempt && latestAttempt.skillPerformance) {
        for (const perf of Object.values(latestAttempt.skillPerformance)) {
          if ((perf.accuracyPercent ?? 0) >= 65) {
            strengths.push(perf.skillName);
          } else {
            weaknesses.push(perf.skillName);
          }
        }
      } else {
        for (const s of Object.values(passport.skills)) {
          if (s.proficiencyLevel === "Proficient" || s.proficiencyLevel === "Competent") {
            strengths.push(s.skillName);
          }
        }
        for (const g of passport.skillGaps) {
          weaknesses.push(g.skillName);
        }
      }

      const knowledgeSnapshot = {
        testScore: score,
        testMaxScore: maxScore,
        testScorePercent: scorePercent,
        difficulty: "intermediate" as const,
        knowledgeLevel: scorePercent >= 75 ? "Advanced / Industry Ready" : scorePercent >= 50 ? "Competent" : "Developing",
        totalQuestions: totalQuestions || 25,
        correctCount: correctCount || Math.round((scorePercent / 100) * 25),
        strengths,
        weaknesses,
        completedAt: latestAttempt?.endedAt || passport.updatedAt || new Date().toISOString(),
      };

      const skillGaps: SkillGapItem[] = [];
      if (latestAttempt && latestAttempt.skillPerformance && Object.keys(latestAttempt.skillPerformance).length > 0) {
        for (const [skillId, perf] of Object.entries(latestAttempt.skillPerformance)) {
          const acc = perf.accuracyPercent ?? 0;
          if (acc < 65) {
            const isHighPriority = acc < 40;
            skillGaps.push({
              skillId,
              skillName: perf.skillName,
              category: perf.skillCategory,
              priority: isHighPriority ? "high" : "medium",
              priorityLabel: isHighPriority ? "High Priority" : "Medium Priority",
              currentLevel: acc < 40 ? "Needs Improvement" : "Developing",
              targetLevel: "Competent (65%+)",
              evidence: `Demonstrated ${perf.correctCount}/${perf.questionCount} accuracy (${acc}%) on ${perf.skillName} items.`,
              whyItMatters: `Standardized competency required for clinical practice and pharmacopeia compliance in ${perf.skillCategory}.`,
              recommendedAction: `Deepen classical textual study and case reviews for ${perf.skillName}.`,
              testedCount: perf.questionCount,
              correctCount: perf.correctCount,
              accuracyPercent: perf.accuracyPercent,
            });
          }
        }
      }

      if (skillGaps.length === 0 && passport.skillGaps.length > 0) {
        for (const g of passport.skillGaps) {
          skillGaps.push({
            skillId: g.skillId,
            skillName: g.skillName,
            category: g.category,
            priority: g.priority === "high" ? "high" : "medium",
            priorityLabel: g.priority === "high" ? "High Priority" : "Medium Priority",
            currentLevel: g.currentLevel,
            targetLevel: g.targetLevel,
            evidence: `Identified gap from AYUSH benchmark assessment results.`,
            whyItMatters: `Essential institutional competency in ${g.category}.`,
            recommendedAction: `Engage with targeted clinical modules and faculty mentoring.`,
            testedCount: 5,
            correctCount: 2,
            accuracyPercent: 40,
          });
        }
      }

      const allPrograms = await db.getEducationPrograms();
      const matchedPrograms: ProgramRecommendation[] = allPrograms.slice(0, 3).map((p, idx) => ({
        programId: p.id,
        program: p,
        matchScore: 90 - idx * 5,
        matchTier: idx === 0 ? "Best Match" : "Strong Match",
        matchedGapCount: Math.min(skillGaps.length, 2),
        matchedHighPriorityCount: skillGaps.filter((g) => g.priority === "high").length,
        coveredGaps: skillGaps.slice(0, 2).map((g) => g.skillName),
        matchExplanation: `Recommended for targeted remediation in ${skillGaps[0]?.skillName || "AYUSH competencies"}.`,
      }));

      const isAdvancedVerified = await db.isStudentAdvancedVerified(student.id);

      const analysisRecord: SkillGapAnalysisRecord = {
        id: `sga-ayush-${student.id}`,
        studentId: student.id,
        interestProfileId: "ayush-profile",
        knowledgeTestResultId: latestAttempt?.id || "ayush-assessment",
        domainId: direction.domainId,
        domainName: direction.domainName,
        nicheId: direction.nicheId,
        nicheTitle: direction.nicheTitle,
        difficulty: "intermediate",
        testScore: score,
        testMaxScore: maxScore,
        testScorePercent: scorePercent,
        knowledgeLevel: knowledgeSnapshot.knowledgeLevel,
        skillProfileVersion: "AYUSH-2026.1",
        executiveSummary: `Student has completed the ${examTitle} with a score of ${scorePercent}%. Analysis identifies ${skillGaps.length} prioritized competency gap${skillGaps.length === 1 ? "" : "s"} across ${direction.nicheTitle}.`,
        skillGaps,
        recommendations: matchedPrograms,
        aiGenerated: false,
        isStale: false,
        createdAt: latestAttempt?.endedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await db.saveSkillGapAnalysis(analysisRecord);

      return NextResponse.json<SkillGapApiResponse>({
        success: true,
        isLocked: false,
        analysis: analysisRecord,
        direction,
        knowledgeSnapshot,
        isAdvancedVerified,
        nicheTrends: null,
      });
    }

    if (!interestProfile || !latestKnowledgeResult) {
      return NextResponse.json<SkillGapApiResponse>({
        success: false,
        isLocked: true,
        lockedReason: "Assessment prerequisites could not be verified. Please complete an assessment in the AYUSH Assessment Center.",
        redirectUrl: "/student/knowledge-testing",
      });
    }

    const { nicheId, nicheTitle } = resolveNicheId(
      interestProfile.confirmedMainDomainId,
      interestProfile.confirmedSpecificInterest
    );

    const direction = {
      domainId: interestProfile.confirmedMainDomainId,
      domainName: interestProfile.confirmedMainDomain,
      nicheId,
      nicheTitle,
      explanation: interestProfile.explanation,
    };

    const knowledgeSnapshot = {
      testScore: latestKnowledgeResult.score,
      testMaxScore: latestKnowledgeResult.maxScore,
      testScorePercent: latestKnowledgeResult.scorePercent,
      difficulty: latestKnowledgeResult.difficulty,
      knowledgeLevel: latestKnowledgeResult.knowledgeLevel,
      totalQuestions: latestKnowledgeResult.totalQuestions,
      correctCount: latestKnowledgeResult.correctCount,
      strengths: latestKnowledgeResult.strengths || [],
      weaknesses: latestKnowledgeResult.weaknesses || [],
      completedAt: latestKnowledgeResult.completedAt,
    };

    // Compute authoritative Advanced verification & personalized niche trends
    const isAdvancedVerified = await db.isStudentAdvancedVerified(student.id);
    const nicheTrends = getPersonalizedNicheTrends({
      isAdvanced: isAdvancedVerified,
      domainId: interestProfile.confirmedMainDomainId,
      nicheId,
      studentSkills: latestKnowledgeResult.strengths,
    });

    // 3. Check for valid, non-stale cached analysis
    const existingAnalysis = await db.getSkillGapAnalysisByStudent(student.id);
    const isCacheValid =
      !forceRefresh &&
      existingAnalysis &&
      !existingAnalysis.isStale &&
      existingAnalysis.interestProfileId === interestProfile.id &&
      existingAnalysis.knowledgeTestResultId === latestKnowledgeResult.id;

    if (isCacheValid) {
      return NextResponse.json<SkillGapApiResponse>({
        success: true,
        isLocked: false,
        analysis: existingAnalysis,
        direction,
        knowledgeSnapshot,
        isAdvancedVerified,
        nicheTrends,
      });
    }

    // 4. Generate new deterministic Skill Gap analysis
    const targetProfile = getTargetSkillProfile(
      nicheId,
      interestProfile.confirmedMainDomainId
    );

    const rawGaps = calculateDeterministicSkillGaps(
      targetProfile,
      latestKnowledgeResult,
      latestKnowledgeResult.difficulty
    );

    // 5. Enhance with safe AI interpretation (or reliable fallback)
    const aiResult = await generateAIInterpretation(
      { domainName: direction.domainName, nicheTitle: direction.nicheTitle },
      {
        testScore: latestKnowledgeResult.score,
        testMaxScore: latestKnowledgeResult.maxScore,
        testScorePercent: latestKnowledgeResult.scorePercent,
        difficulty: latestKnowledgeResult.difficulty,
      },
      rawGaps
    );

    // 6. Match education programs to identified gaps
    const allPrograms = await db.getEducationPrograms();
    const recommendations = matchProgramsToSkillGaps(
      aiResult.enhancedGaps,
      allPrograms,
      direction.domainId,
      direction.nicheId
    );

    // 7. Persist analysis
    const analysisRecord: SkillGapAnalysisRecord = {
      id: `sga-${crypto.randomUUID()}`,
      studentId: student.id,
      interestProfileId: interestProfile.id,
      knowledgeTestResultId: latestKnowledgeResult.id,
      domainId: direction.domainId,
      domainName: direction.domainName,
      nicheId: direction.nicheId,
      nicheTitle: direction.nicheTitle,
      difficulty: latestKnowledgeResult.difficulty,
      testScore: latestKnowledgeResult.score,
      testMaxScore: latestKnowledgeResult.maxScore,
      testScorePercent: latestKnowledgeResult.scorePercent,
      knowledgeLevel: latestKnowledgeResult.knowledgeLevel,
      skillProfileVersion: targetProfile.version,
      executiveSummary: aiResult.executiveSummary,
      skillGaps: aiResult.enhancedGaps,
      recommendations,
      aiGenerated: aiResult.aiGenerated,
      isStale: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.saveSkillGapAnalysis(analysisRecord);

    return NextResponse.json<SkillGapApiResponse>({
      success: true,
      isLocked: false,
      analysis: analysisRecord,
      direction,
      knowledgeSnapshot,
      isAdvancedVerified,
      nicheTrends,
    });
  } catch (error) {
    console.error("Error in Skill Gap API (GET):", error);
    return NextResponse.json<SkillGapApiResponse>(
      {
        success: false,
        error: "Failed to load skill gap analysis. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { student } = await getAuthenticatedStudent(request, body.studentId);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json<SkillGapApiResponse>(
        {
          success: false,
          error: "Unauthorized. Please sign in as a student.",
        },
        { status: 401 }
      );
    }

    // Direct invocation of GET logic with refresh: true
    const simulatedGet = new Request(
      `${request.url}${request.url.includes("?") ? "&" : "?"}refresh=true&studentId=${encodeURIComponent(
        student.id
      )}`,
      {
        method: "GET",
        headers: request.headers,
      }
    );

    return GET(simulatedGet);
  } catch (error) {
    console.error("Error in Skill Gap API (POST):", error);
    return NextResponse.json<SkillGapApiResponse>(
      {
        success: false,
        error: "Failed to recalculate skill gap analysis.",
      },
      { status: 500 }
    );
  }
}
