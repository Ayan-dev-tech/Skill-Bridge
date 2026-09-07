import { NextResponse } from "next/server";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";
import { db } from "@/lib/db";
import type { UpdateHiringPostInput } from "@/lib/industry/types";

export async function GET(
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
    const post = await db.getIndustryHiringPostById(industryUser.id, postId);

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Hiring opportunity not found or unauthorized." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (err) {
    console.error("Error fetching hiring post:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch hiring opportunity." },
      { status: 500 }
    );
  }
}

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
    const body = (await request.json()) as UpdateHiringPostInput;

    if (body.openings !== undefined) {
      const openings = Number(body.openings);
      if (isNaN(openings) || openings < 1) {
        return NextResponse.json(
          { success: false, error: "Number of openings must be a positive integer (minimum 1)." },
          { status: 400 }
        );
      }
    }

    const updated = await db.updateIndustryHiringPost(industryUser.id, postId, body);

    return NextResponse.json({
      success: true,
      message: "Hiring opportunity updated successfully.",
      post: updated,
    });
  } catch (err: unknown) {
    console.error("Error updating hiring post:", err);
    const message = err instanceof Error ? err.message : "Failed to update hiring opportunity.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}

export async function DELETE(
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
    const deleted = await db.deleteIndustryHiringPost(industryUser.id, postId);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Hiring post not found or cannot be deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Hiring post deleted successfully.",
    });
  } catch (err: unknown) {
    console.error("Error deleting hiring post:", err);
    const message = err instanceof Error ? err.message : "Failed to delete hiring opportunity.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
