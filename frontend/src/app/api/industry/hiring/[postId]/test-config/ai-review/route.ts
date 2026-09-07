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
    const reviewResult = await db.reviewKnowledgeTestWithAI(industryUser.id, postId);

    return NextResponse.json({
      success: true,
      review: reviewResult,
    });
  } catch (err: unknown) {
    console.error("Error in AI test review loop:", err);
    const message = err instanceof Error ? err.message : "Failed to run AI test review.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
