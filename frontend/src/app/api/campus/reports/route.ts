import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedCampus } from "@/lib/campus/campus-auth";

export async function GET(request: Request) {
  try {
    const { campusUser, error, status } = await getAuthenticatedCampus(request);
    if (!campusUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: status || 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department") || "";
    const batchYear = searchParams.get("batchYear") || "";
    const jobId = searchParams.get("jobId") || "";
    const industryId = searchParams.get("industryId") || "";

    const reportData = await db.getCampusPlacementReports(campusUser.id, {
      department,
      batchYear,
      jobId,
      industryId,
    });

    return NextResponse.json({
      success: true,
      report: reportData,
    });
  } catch (error) {
    console.error("Error generating placement reports:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate placement reports" },
      { status: 500 }
    );
  }
}
