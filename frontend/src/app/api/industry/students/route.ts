import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";

export async function GET(request: Request) {
  try {
    const { industryUser, error } = await getAuthenticatedIndustry(request);
    if (!industryUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized access to student talent data." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const domain = searchParams.get("domain") || "all";
    const level = searchParams.get("level") || "all";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const result = await db.getPermittedStudentTalent({
      search,
      domain,
      level,
      page: isNaN(page) ? 1 : page,
      limit: Math.min(Math.max(1, isNaN(limit) ? 10 : limit), 50),
    });

    return NextResponse.json({
      success: true,
      students: result.students,
      totalCount: result.totalCount,
      page: result.page,
      totalPages: result.totalPages,
    });
  } catch (err) {
    console.error("Error discovering student talent:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve student talent list." },
      { status: 500 }
    );
  }
}
