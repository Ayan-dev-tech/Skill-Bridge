/**
 * POST /api/student/assessment/submit-answer
 * Records a student's answer for one question in an attempt.
 * Server-side correctness check — correct answers never sent to client.
 * Body: { attemptId, questionId, selectedOptionId, timeSpentMs }
 */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import type { QuestionResponse } from "@/lib/assessment/types";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { student } = await getAuthenticatedStudent(request, body.studentId);
    if (!student) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { attemptId, questionId, selectedOptionId, timeSpentMs } = body;
    if (!attemptId || !questionId || !selectedOptionId) {
      return NextResponse.json({ success: false, error: "attemptId, questionId, and selectedOptionId are required" }, { status: 400 });
    }

    const attempt = await db.getAssessmentAttemptById(attemptId);
    if (!attempt) {
      return NextResponse.json({ success: false, error: "Attempt not found" }, { status: 404 });
    }
    if (attempt.studentId !== student.id) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    if (attempt.status !== "in_progress") {
      return NextResponse.json({ success: false, error: "Attempt is not in progress" }, { status: 409 });
    }
    if (!attempt.questionIds.includes(questionId)) {
      return NextResponse.json({ success: false, error: "Question not part of this attempt" }, { status: 400 });
    }

    // Server-side correctness check
    const question = await db.getAssessmentQuestionById(questionId);
    if (!question) {
      return NextResponse.json({ success: false, error: "Question not found" }, { status: 404 });
    }
    const isCorrect = selectedOptionId === question.correctOptionId;

    const response: QuestionResponse = {
      questionId,
      selectedOptionId,
      isCorrect,
      timeSpentMs: typeof timeSpentMs === "number" ? timeSpentMs : 0,
      answeredAt: new Date().toISOString(),
    };

    attempt.responses[questionId] = response;
    attempt.updatedAt = new Date().toISOString();
    await db.saveAssessmentAttempt(attempt);

    const answeredCount = Object.keys(attempt.responses).length;

    return NextResponse.json({
      success: true,
      isCorrect,
      answeredCount,
      totalQuestions: attempt.totalQuestions,
      isComplete: answeredCount >= attempt.totalQuestions,
    });
  } catch (error) {
    console.error("Submit answer error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit answer" }, { status: 500 });
  }
}
