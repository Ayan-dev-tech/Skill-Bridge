import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { checkRouteAccess } from "@/lib/workflow/canonical-workflow";
import { fetchYouTubeResourcesForGaps } from "@/lib/learning/youtube-service";
import type {
  LearningApiResponse,
  LearningFocusSummary,
  SuggestedFocusStep,
  LearningResourceItem,
} from "@/lib/learning/types";

export async function GET(request: Request) {
  try {
    const { student, error: authError } = await getAuthenticatedStudent(request);
    if (authError || !student) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in as a student." },
        { status: 401 }
      );
    }

    // 1. Enforce Canonical Workflow Gating
    const routeCheck = await checkRouteAccess(student.id, "/student/learning");
    if (!routeCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          isLocked: true,
          lockedReason: routeCheck.reason || "Complete previous milestones to unlock Learning & Mentoring.",
          redirectTo: routeCheck.redirectUrl || "/student/skill-gap",
          resources: [],
          totalResources: 0,
          isConfigured: Boolean(process.env.YOUTUBE_API_KEY),
        } satisfies LearningApiResponse,
        { status: 403 }
      );
    }

    // 2. Fetch Active Non-Stale Skill Gap Analysis
    const skillGapAnalysis = await db.getSkillGapAnalysisByStudent(student.id);
    if (!skillGapAnalysis || skillGapAnalysis.isStale) {
      return NextResponse.json(
        {
          success: false,
          isLocked: true,
          lockedReason: "A current Skill Gap diagnosis is required before accessing personalized learning resources.",
          redirectTo: "/student/skill-gap",
          resources: [],
          totalResources: 0,
          isConfigured: Boolean(process.env.YOUTUBE_API_KEY),
        } satisfies LearningApiResponse,
        { status: 403 }
      );
    }

    const { domainId, domainName, nicheId, nicheTitle, difficulty, testScorePercent, skillGaps } = skillGapAnalysis;

    // 3. Formulate Learning Focus Context
    const prioritizedGaps = [
      ...skillGaps.filter((g) => g.priority === "high"),
      ...skillGaps.filter((g) => g.priority === "medium"),
      ...skillGaps.filter((g) => g.priority === "low"),
    ];

    const learningFocus: LearningFocusSummary = {
      domainId,
      domainName,
      nicheId,
      nicheTitle,
      difficulty,
      scorePercent: testScorePercent,
      primaryGaps: prioritizedGaps.slice(0, 5).map((g) => ({
        skillId: g.skillId,
        skillName: g.skillName,
        priority: g.priority,
        currentLevel: g.currentLevel,
        targetLevel: g.targetLevel,
        whyItMatters: g.whyItMatters,
        recommendedAction: g.recommendedAction,
      })),
    };

    // 4. Formulate Suggested Learning Steps (Bridge between Skill Gap and Learning)
    const suggestedSteps: SuggestedFocusStep[] = prioritizedGaps.slice(0, 3).map((g, idx) => {
      let verb = "Strengthen";
      if (idx === 1) verb = "Deepen";
      if (idx === 2) verb = "Practice";

      return {
        stepNumber: idx + 1,
        title: `${verb} ${g.skillName}`,
        action: g.recommendedAction,
        skillName: g.skillName,
        priority: g.priority,
      };
    });

    // 5. Caching & YouTube Data Retrieval
    const url = new URL(request.url);
    const forceRefresh = url.searchParams.get("refresh") === "true";

    let resources: LearningResourceItem[] = [];
    let fromCache = false;

    if (!forceRefresh) {
      const cached = await db.getLearningResourcesByAnalysis(student.id, skillGapAnalysis.id);
      if (cached && cached.length > 0) {
        resources = cached;
        fromCache = true;
      }
    }

    let isConfigured = Boolean(process.env.YOUTUBE_API_KEY && process.env.YOUTUBE_API_KEY.trim() !== "") || resources.length > 0;
    let queryError: string | undefined = undefined;

    if (resources.length === 0) {
      const ytResult = await fetchYouTubeResourcesForGaps({
        skillGaps,
        nicheTitle,
        domainName,
        difficulty,
      });

      isConfigured = ytResult.isConfigured;
      queryError = ytResult.error;

      if (ytResult.resources.length > 0) {
        resources = ytResult.resources;
        await db.saveLearningResources(student.id, skillGapAnalysis.id, resources);
      }
    }

    let message: string | undefined = undefined;
    if (resources.length > 0 && resources.length < 5) {
      message = "We found a few closely matched resources. More resources may become available as your learning profile develops.";
    }

    return NextResponse.json({
      success: true,
      isLocked: false,
      learningFocus,
      suggestedSteps,
      resources,
      totalResources: resources.length,
      isConfigured,
      fromCache,
      cachedAt: new Date().toISOString(),
      message,
      error: queryError,
    } satisfies LearningApiResponse);
  } catch (error) {
    console.error("Error in GET /api/student/learning:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to load learning resources.",
        resources: [],
        totalResources: 0,
        isConfigured: Boolean(process.env.YOUTUBE_API_KEY),
      } satisfies LearningApiResponse,
      { status: 500 }
    );
  }
}
