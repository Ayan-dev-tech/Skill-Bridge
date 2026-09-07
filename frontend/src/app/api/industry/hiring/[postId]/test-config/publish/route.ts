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
    const updated = await db.publishIndustryKnowledgeTest(industryUser.id, postId);

    return NextResponse.json({
      success: true,
      message: "Knowledge test successfully published for this hiring opportunity.",
      knowledgeTest: updated.knowledgeTest,
      post: updated,
    });
  } catch (err: unknown) {
    console.error("Error publishing test:", err);
    const message = err instanceof Error ? err.message : "Failed to publish knowledge test.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
