/**
 * GET & POST /api/student/interventions/faculty-review
 * Authoritative Faculty verification endpoint (Step 10).
 * - GET: Retrieves pending evidence submissions for faculty review queue.
 * - POST: Records authoritative Faculty review decision (VERIFIED or REJECTED)
 *   with immutable historical audit trail, passport update, and development plan status.
 */

import { NextResponse } from "next/server";
import { FacultyEvaluator } from "@/lib/evidence/faculty-evaluator";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const facultyId = searchParams.get("facultyId") || undefined;
    const studentId = searchParams.get("studentId") || undefined;

    // If studentId provided, fetch their audit history trail
    if (studentId) {
      const history = await FacultyEvaluator.getCompetencyAuditTrail(studentId);
      return NextResponse.json({ success: true, history });
    }

    // Otherwise fetch pending evidence submissions queue
    const queue = await FacultyEvaluator.getPendingEvidenceQueue(facultyId);
    return NextResponse.json({ success: true, queue });
  } catch (error) {
    console.error("Error fetching faculty evidence review queue:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch evidence queue.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planId, facultyId, decision = "VERIFIED", facultyFinalRating, facultyFeedback } = body;

    if (!planId) {
      return NextResponse.json(
        { success: false, error: "Missing planId parameter." },
        { status: 400 }
      );
    }

    const isVerified = decision === "VERIFIED";

    if (isVerified) {
      if (facultyFinalRating == null || typeof facultyFinalRating !== "number") {
        return NextResponse.json(
          { success: false, error: "Missing or invalid facultyFinalRating (must be number 1.0 to 5.0) for verified approval." },
          { status: 400 }
        );
      }
    }

    const assignedFacultyId = facultyId || "fac-dr-anand-rao-aiia";
    const assignedFeedback =
      facultyFeedback?.trim() ||
      (isVerified
        ? "Evidence meets clinical and protocol standards for verified competency."
        : "Evidence submission does not meet clinical requirements. Please revise protocol and resubmit.");

    const result = await FacultyEvaluator.verifyEvidenceWithFinalRating({
      planId,
      facultyId: assignedFacultyId,
      decision,
      facultyFinalRating: facultyFinalRating != null ? Number(facultyFinalRating) : undefined,
      facultyFeedback: assignedFeedback,
    });

    return NextResponse.json({
      success: true,
      decision: result.decision,
      message: result.message,
      verification: result,
    });
  } catch (error) {
    console.error("Error in faculty-review route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to record faculty review.",
      },
      { status: 500 }
    );
  }
}
