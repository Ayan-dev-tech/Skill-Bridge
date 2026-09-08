import { NextResponse } from "next/server";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";
import { db } from "@/lib/db";

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
    const postId = searchParams.get("postId") || undefined;

    const applications = await db.getIndustryApplications(industryUser.id, postId);

    return NextResponse.json({
      success: true,
      applications,
      totalCount: applications.length,
    });
  } catch (err: unknown) {
    console.error("Error fetching industry applications:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch candidate applications." },
      { status: 500 }
    );
  }
}
