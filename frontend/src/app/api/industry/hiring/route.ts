import { NextResponse } from "next/server";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";
import { db } from "@/lib/db";
import type { CreateHiringPostInput } from "@/lib/industry/types";

export async function GET(request: Request) {
  try {
    const { industryUser, error } = await getAuthenticatedIndustry(request);
    if (!industryUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";

    const posts = await db.getIndustryHiringPosts(industryUser.id, status);

    return NextResponse.json({
      success: true,
      posts,
      totalCount: posts.length,
    });
  } catch (err) {
    console.error("Error fetching hiring posts:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch hiring opportunities." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { industryUser, error } = await getAuthenticatedIndustry(request);
    if (!industryUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as CreateHiringPostInput;

    // Validate openings
    const openings = Number(body.openings);
    if (isNaN(openings) || openings < 1) {
      return NextResponse.json(
        { success: false, error: "Number of openings must be a positive integer (minimum 1)." },
        { status: 400 }
      );
    }

    // Determine company name from industry profile or user
    const profile = await db.getIndustryProfile(industryUser.id);
    const companyName = profile?.metadata.companyName || industryUser.fullName || "Partner Organization";

    const newPost = await db.createIndustryHiringPost(industryUser.id, companyName, {
      ...body,
      openings,
    });

    return NextResponse.json(
      {
        success: true,
        message: newPost.status === "published" ? "Hiring post published successfully." : "Hiring draft saved successfully.",
        post: newPost,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Error creating hiring post:", err);
    const message = err instanceof Error ? err.message : "Failed to create hiring opportunity.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
