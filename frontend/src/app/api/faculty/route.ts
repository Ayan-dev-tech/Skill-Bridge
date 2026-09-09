import { NextResponse } from "next/server";
import { getAuthenticatedFaculty } from "@/lib/faculty/faculty-auth";
import { getFacultyDashboardSummary } from "@/lib/faculty/faculty-service";

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedFaculty(request);
    if (!auth.facultyUser) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: auth.status });
    }

    const summary = await getFacultyDashboardSummary(auth.facultyUser.id);
    return NextResponse.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Faculty dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve faculty dashboard summary." },
      { status: 500 }
    );
  }
}
