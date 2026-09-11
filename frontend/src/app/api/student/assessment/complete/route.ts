/**
 * POST /api/student/assessment/complete
 * Completes an attempt: scores it, persists result.
 * Body: { attemptId }
 */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { scoreAssessmentAttempt } from "@/lib/assessment/scorer";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { student } = await getAuthenticatedStudent(request, body.studentId);
    if (!student) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { attemptId } = body;
    if (!attemptId) {
      return NextResponse.json({ success: false, error: "attemptId is required" }, { status: 400 });
    }

    const attempt = await db.getAssessmentAttemptById(attemptId);
    if (!attempt) return NextResponse.json({ success: false, error: "Attempt not found" }, { status: 404 });
    if (attempt.studentId !== student.id) return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    if (attempt.status !== "in_progress") {
      return NextResponse.json({ success: false, error: "Attempt already completed" }, { status: 409 });
    }

    // Load the full questions for scoring
    const allQuestions = await db.getActiveAssessmentQuestions();
    const attemptQuestions = attempt.questionIds
      .map((id) => allQuestions.find((q) => q.id === id))
      .filter(Boolean) as (typeof allQuestions)[0][];

    const scoring = scoreAssessmentAttempt(attemptQuestions, attempt.responses);
    const now = new Date().toISOString();

    attempt.status = "completed";
    attempt.endedAt = now;
    attempt.score = scoring.score;
    attempt.maxScore = scoring.maxScore;
    attempt.scorePercent = scoring.scorePercent;
    attempt.correctCount = scoring.correctCount;
    attempt.incorrectCount = scoring.incorrectCount;
    attempt.unattemptedCount = scoring.unattemptedCount;
    attempt.skillPerformance = scoring.skillPerformance;
    attempt.updatedAt = now;

    await db.saveAssessmentAttempt(attempt);

    return NextResponse.json({
      success: true,
      attemptId,
      scoring,
    });
  } catch (error) {
    console.error("Complete assessment error:", error);
    return NextResponse.json({ success: false, error: "Failed to complete assessment" }, { status: 500 });
  }
}
