import { NextResponse } from "next/server";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";
import { db } from "@/lib/db";
import type { KnowledgeTestConfig } from "@/lib/industry/types";

export async function PUT(
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
    const body = (await request.json()) as Partial<KnowledgeTestConfig>;

    const updated = await db.updateIndustryKnowledgeTestConfig(industryUser.id, postId, body);

    return NextResponse.json({
      success: true,
      message: "Knowledge test configuration saved.",
      knowledgeTest: updated.knowledgeTest,
      post: updated,
    });
  } catch (err: unknown) {
    console.error("Error updating knowledge test config:", err);
    const message = err instanceof Error ? err.message : "Failed to update test configuration.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
