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
import { SkillGapAnalysisRecord, SkillGapApiResponse } from "@/lib/skill-gap/types";

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

    if (!interestProfile || !latestKnowledgeResult) {
      return NextResponse.json<SkillGapApiResponse>({
        success: false,
        isLocked: true,
        lockedReason: "Assessment prerequisites could not be verified.",
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
      id: `sga-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`,
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
