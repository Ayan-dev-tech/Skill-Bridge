/**
 * GET & POST /api/faculty/evidence
 * Faculty portal evidence queue and verification endpoint (Step 10).
 */

import { NextResponse } from "next/server";
import { FacultyEvaluator } from "@/lib/evidence/faculty-evaluator";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const facultyId = searchParams.get("facultyId") || undefined;
    const queue = await FacultyEvaluator.getPendingEvidenceQueue(facultyId);

    return NextResponse.json({
      success: true,
      data: {
        queue,
        pendingCount: queue.length,
      },
    });
  } catch (error) {
    console.error("Error in /api/faculty/evidence GET:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to load evidence queue." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planId, facultyId = "faculty-evaluator-dr-rao", decision = "VERIFIED", facultyFinalRating, facultyFeedback } = body;

    if (!planId) {
      return NextResponse.json({ success: false, error: "Missing planId parameter." }, { status: 400 });
    }

    const isVerified = decision === "VERIFIED";
    if (isVerified && (facultyFinalRating == null || typeof facultyFinalRating !== "number")) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid facultyFinalRating for verification." },
        { status: 400 }
      );
    }

    const result = await FacultyEvaluator.verifyEvidenceWithFinalRating({
      planId,
      facultyId,
      decision,
      facultyFinalRating: facultyFinalRating != null ? Number(facultyFinalRating) : undefined,
      facultyFeedback: facultyFeedback || (isVerified ? "Approved by authorized faculty review." : "Rejected during faculty review."),
    });

    return NextResponse.json({
      success: true,
      decision: result.decision,
      message: result.message,
      data: result,
    });
  } catch (error) {
    console.error("Error in /api/faculty/evidence POST:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to process verification." },
      { status: 500 }
    );
  }
}
