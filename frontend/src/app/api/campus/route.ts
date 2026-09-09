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

    const summary = await db.getCampusDashboard(campusUser.id);

    return NextResponse.json({
      success: true,
      summary,
      metrics: summary.metrics,
      institutionName: summary.institutionName,
      recentActivity: summary.recentActivity,
      campusUser: {
        id: campusUser.id,
        email: campusUser.email,
        fullName: campusUser.fullName,
        role: campusUser.role,
      },
    });
  } catch (error) {
    console.error("Error fetching campus dashboard data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load campus dashboard data" },
      { status: 500 }
    );
  }
}