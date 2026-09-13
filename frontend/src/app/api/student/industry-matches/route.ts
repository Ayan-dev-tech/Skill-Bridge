/**
 * GET /api/student/industry-matches
 *
 * Retrieves ranked, explainable AYUSH industry role matches for an authenticated student
 * based strictly on faculty-verified competencies and employer skill demands.
 */

import { NextResponse } from "next/server";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { matchStudentToIndustryRoles } from "@/lib/ayush/industry-matching-engine";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Student session required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const roleId = searchParams.get("roleId") || undefined;

    const matches = await matchStudentToIndustryRoles(student.id, {
      filterRoleId: roleId,
    });

    return NextResponse.json({
      success: true,
      matches,
      totalCount: matches.length,
    });
  } catch (error) {
    console.error("Failed to compute industry role matches:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to load industry matches.",
      },
      { status: 500 }
    );
  }
}
