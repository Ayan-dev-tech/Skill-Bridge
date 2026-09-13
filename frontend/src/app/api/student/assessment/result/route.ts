/**
 * GET /api/student/assessment/result?attemptId=xxx
 * Returns the completed attempt result for the authenticated student.
 * Students can only access their own attempt results.
 */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const attemptId = searchParams.get("attemptId");

    if (!attemptId) {
      // Return all completed attempts for this student
      const all = await db.getAssessmentAttemptsByStudent(student.id);
      const completed = all.filter((a) => a.status === "completed");
      return NextResponse.json({ success: true, attempts: completed });
    }

    const attempt = await db.getAssessmentAttemptById(attemptId);
    if (!attempt) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    if (attempt.studentId !== student.id) return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });

    // Load config name and compute full scoring breakdown
    const config = await db.getAssessmentConfigById(attempt.configId);
    let subjectBreakdown: Array<{ subject: string; total: number; correct: number; accuracyPercent: number }> = [];
    let topicBreakdown: Array<{ topic: string; total: number; correct: number; accuracyPercent: number }> = [];

    if (attempt.status === "completed") {
      const allQuestions = await db.getActiveAssessmentQuestions();
      const attemptQuestions = attempt.questionIds
        .map((id) => allQuestions.find((q) => q.id === id))
        .filter(Boolean) as (typeof allQuestions)[0][];
      
      const { scoreAssessmentAttempt } = await import("@/lib/assessment/scorer");
      const scoring = scoreAssessmentAttempt(attemptQuestions, attempt.responses);
      subjectBreakdown = scoring.subjectBreakdown;
      topicBreakdown = scoring.topicBreakdown;
    }

    return NextResponse.json({
      success: true,
      attempt: {
        ...attempt,
        configName: config?.name ?? attempt.configId,
        subjectBreakdown,
        topicBreakdown,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to load result" }, { status: 500 });
  }
}
