/**
 * POST /api/student/assessment/start
 * Creates a new assessment attempt or resumes an in-progress one.
 * Body: { configId: string, ayushSystem?: string }
 *
 * Returns sanitized questions (no correct answers).
 * Correct answers stored server-side in attempt record only.
 */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { selectQuestions, sanitizeForClient } from "@/lib/assessment/selector";
import type { AssessmentAttempt, QuestionResponse } from "@/lib/assessment/types";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { student } = await getAuthenticatedStudent(request, body.studentId);
    if (!student) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { configId, restart } = body;
    if (!configId) {
      return NextResponse.json({ success: false, error: "configId is required" }, { status: 400 });
    }

    // Load config
    const config = await db.getAssessmentConfigById(configId);
    if (!config || !config.isActive) {
      return NextResponse.json({ success: false, error: "Assessment config not found or inactive" }, { status: 404 });
    }

    // Check for existing in-progress attempt
    const existing = await db.getActiveAssessmentAttempt(student.id, configId);

    if (existing && !restart) {
      // Resume: return current question without correct answer
      const answeredIds = Object.keys(existing.responses);
      const nextIdx = answeredIds.length;
      const allQuestions = await db.getActiveAssessmentQuestions();
      const attemptQuestions = existing.questionIds
        .map((id) => allQuestions.find((q) => q.id === id))
        .filter(Boolean) as (typeof allQuestions)[0][];

      const clientQuestions = attemptQuestions.map((q, i) => sanitizeForClient(q, i + 1, attemptQuestions.length));

      return NextResponse.json({
        success: true,
        resumed: true,
        attemptId: existing.id,
        examType: existing.examType,
        config: { name: config.name, timeLimitMinutes: config.timeLimitMinutes, questionCount: config.questionCount },
        questions: clientQuestions,
        answeredCount: answeredIds.length,
        nextQuestionIndex: nextIdx,
        totalQuestions: existing.totalQuestions,
      });
    }

    // Abandon existing if restarting
    if (existing && restart) {
      existing.status = "abandoned";
      existing.updatedAt = new Date().toISOString();
      await db.saveAssessmentAttempt(existing);
    }

    // Select questions
    const allActive = await db.getActiveAssessmentQuestions();
    const selected = selectQuestions(allActive, {
      examType: config.examType,
      ayushSystem: config.ayushSystem ?? undefined,
      subject: config.subjectFilters.length === 1 ? config.subjectFilters[0] : undefined,
      topic: config.topicFilters.length === 1 ? config.topicFilters[0] : undefined,
      difficulty: config.difficulty ?? undefined,
      count: config.questionCount,
    });

    if (selected.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No questions available for this assessment configuration. Question bank may be empty.",
      }, { status: 422 });
    }

    const now = new Date().toISOString();
    const attemptId = `asmt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const emptyResponses: Record<string, QuestionResponse> = {};

    const attempt: AssessmentAttempt = {
      id: attemptId,
      studentId: student.id,
      configId,
      examType: config.examType,
      ayushSystem: config.ayushSystem,
      questionIds: selected.map((q) => q.id),
      responses: emptyResponses,
      startedAt: now,
      endedAt: null,
      status: "in_progress",
      score: null,
      maxScore: null,
      scorePercent: null,
      correctCount: null,
      incorrectCount: null,
      unattemptedCount: null,
      totalQuestions: selected.length,
      skillPerformance: {},
      createdAt: now,
      updatedAt: now,
    };

    await db.saveAssessmentAttempt(attempt);

    const clientQuestions = selected.map((q, i) => sanitizeForClient(q, i + 1, selected.length));

    return NextResponse.json({
      success: true,
      resumed: false,
      attemptId,
      examType: config.examType,
      config: { name: config.name, timeLimitMinutes: config.timeLimitMinutes, questionCount: config.questionCount },
      questions: clientQuestions,
      answeredCount: 0,
      nextQuestionIndex: 0,
      totalQuestions: selected.length,
    });
  } catch (error) {
    console.error("Assessment start error:", error);
    return NextResponse.json({ success: false, error: "Failed to start assessment" }, { status: 500 });
  }
}
