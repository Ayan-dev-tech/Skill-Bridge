import { NextResponse } from "next/server";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";
import { db } from "@/lib/db";

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
    const body = await request.json().catch(() => ({ approved: true }));
    const approved = Boolean(body.approved);

    const updated = await db.approveIndustryKnowledgeTest(industryUser.id, postId, approved);

    return NextResponse.json({
      success: true,
      message: approved
        ? "Knowledge test question set explicitly approved by Industry."
        : "Question set marked as rejected / returned for revision.",
      approvalStatus: updated.knowledgeTest?.approvalStatus,
      knowledgeTest: updated.knowledgeTest,
      post: updated,
    });
  } catch (err: unknown) {
    console.error("Error approving question set:", err);
    const message = err instanceof Error ? err.message : "Failed to record approval decision.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
