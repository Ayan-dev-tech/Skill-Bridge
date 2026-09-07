import { NextResponse } from "next/server";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";
import { db } from "@/lib/db";
import type { AIQuestionSelectionRequest } from "@/lib/industry/types";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { industryUser, error } = await getAuthenticatedIndustry(request);
    if (!industryUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: 401 }
      );
    }

    const { postId } = await params;
    const body = (await request.json().catch(() => ({}))) as Partial<AIQuestionSelectionRequest>;

    const post = await db.getIndustryHiringPostById(industryUser.id, postId);
    if (!post) {
      return NextResponse.json(
        { success: false, error: "Hiring opportunity not found or unauthorized." },
        { status: 404 }
      );
    }

    const aiRequest: AIQuestionSelectionRequest = {
      requiredSkills: body.requiredSkills || post.requiredSkills || [],
      domainId: body.domainId || post.industryDomain,
      targetCount: body.targetCount || 5,
      difficulty: body.difficulty || "balanced",
    };

    const aiResult = await db.selectAIQuestionsForPost(industryUser.id, postId, aiRequest);

    // If AI found questions, automatically update post's knowledgeTest selectedQuestionIds & testPaper
    if (aiResult.selectedQuestionIds.length > 0) {
      await db.updateIndustryKnowledgeTestConfig(industryUser.id, postId, {
        selectedQuestionIds: aiResult.selectedQuestionIds,
        testPaper: aiResult.questions,
        approvalStatus: "draft", // Reset to draft awaiting review/approval
      });
    }

    return NextResponse.json({
      success: true,
      result: aiResult,
    });
  } catch (err: unknown) {
    console.error("Error running AI question selection:", err);
    const message = err instanceof Error ? err.message : "Failed to run AI question selection.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
