/**
 * GET /api/student/assessment/configs
 * Returns active assessment configurations for the authenticated student.
 * Optionally filtered by ?examType=NEET_UG|AIAPGET_PG|PRACTICAL_SCENARIO|INDUSTRY_SKILL
 */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);

    const { searchParams } = new URL(request.url);
    const examType = searchParams.get("examType");

    let configs = await db.getAssessmentConfigs();

    if (examType) {
      configs = configs.filter((c) => c.examType === examType);
    }

    return NextResponse.json({ success: true, configs });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to load assessment configs" }, { status: 500 });
  }
}
