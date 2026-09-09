import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedCampus } from "@/lib/campus/campus-auth";
import type { CampusApplicationStatus } from "@/lib/campus/types";

export async function GET(request: Request) {
  try {
    const { campusUser, error, status: authStatus } = await getAuthenticatedCampus(request);
    if (!campusUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: authStatus || 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const department = searchParams.get("department") || "";
    const batchYear = searchParams.get("batchYear") || "";
    const companyName = searchParams.get("companyName") || "";
    const status = (searchParams.get("status") as CampusApplicationStatus) || undefined;
    const hiringType = searchParams.get("hiringType") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const response = await db.getCampusApplications(campusUser.id, {
      search,
      department,
      batchYear,
      companyName,
      status,
      hiringType,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      ...response,
    });
  } catch (error) {
    console.error("Error fetching campus applications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load application records" },
      { status: 500 }
    );
  }
}
