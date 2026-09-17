/**
 * GET /api/student/readiness
 * Retrieves deterministic, explainable role readiness for an authenticated student
 * across any of the 5 canonical AYUSH target roles.
 */

import { NextResponse } from "next/server";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { calculateAyushRoleReadiness } from "@/lib/ayush/readiness-engine";
import { getAyushTargetRole } from "@/lib/ayush/competencies";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Student session required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    let roleId = searchParams.get("roleId");

    if (!roleId) {
      const { resolveStudentTargetRole } = await import("@/lib/ayush/assistant-service");
      const resolved = await resolveStudentTargetRole(student.id);
      roleId = resolved ? resolved.id : "ayush-clinical-research";
    }

    const targetRole = getAyushTargetRole(roleId);
    if (!targetRole) {
      return NextResponse.json(
        { success: false, error: `Invalid AYUSH role "${roleId}".` },
        { status: 400 }
      );
    }

    const readiness = await calculateAyushRoleReadiness(roleId, student.id);

    return NextResponse.json({
      success: true,
      readiness,
    });
  } catch (error) {
    console.error("Failed to calculate AYUSH role readiness:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to calculate readiness.",
      },
      { status: 500 }
    );
  }
}
