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
    const published = await db.publishIndustryHiringPost(industryUser.id, postId);

    return NextResponse.json({
      success: true,
      message: "Hiring opportunity published successfully.",
      post: published,
    });
  } catch (err: unknown) {
    console.error("Error publishing hiring post:", err);
    const message = err instanceof Error ? err.message : "Failed to publish hiring opportunity.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
