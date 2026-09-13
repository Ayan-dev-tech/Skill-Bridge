/**
 * GET /api/faculty/ayush-intelligence
 * Faculty Cohort Intelligence API endpoint (Step 14).
 * Returns verified competency gaps, role readiness, longitudinal improvement, and pending workload.
 */

import { NextResponse } from "next/server";
import { getAuthenticatedFaculty } from "@/lib/faculty/faculty-auth";
import { getFacultyAyushIntelligence } from "@/lib/ayush/institution-intelligence";

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedFaculty(request);
    if (!auth.facultyUser) {
      return NextResponse.json(
        { success: false, error: auth.error || "Unauthorized. Faculty access only." },
        { status: auth.status || 401 }
      );
    }

    const data = await getFacultyAyushIntelligence(auth.facultyUser.id);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Faculty AYUSH intelligence API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve faculty intelligence data." },
      { status: 500 }
    );
  }
}
