import { NextResponse } from "next/server";
import { db, InterestSessionRecord } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { INITIAL_SIGNAL_SCORES } from "@/lib/interest-engine/signals";
import { INITIAL_DOMAIN_SCORES } from "@/lib/interest-engine/adaptive-scorer";
import { getNextAdaptiveQuestion } from "@/lib/interest-engine/ai-provider";

export async function POST(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);

    // Enforce sequential onboarding gating: Document Verification must be completed first
    const verification = await db.getStudentVerification(student.id);
    if (verification.verificationStatus !== "VERIFIED") {
      return NextResponse.json(
        {
          success: false,
          error: "Document Verification must be completed before entering Interest Finder.",
          requiresVerification: true,
          redirectUrl: "/student/document-verification",
        },
        { status: 403 }
      );
    }

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Generate Question 1 (Phase 1)
    const initialQuestion = await getNextAdaptiveQuestion({
      phase: 1,
      questionCount: 0,
      questionHistory: [],
      signalScores: INITIAL_SIGNAL_SCORES,
      domainScores: INITIAL_DOMAIN_SCORES,
    });

    const newSession: InterestSessionRecord = {
      studentId: student.id,
      sessionId,
      phase: 1,
      answers: [],
      signalScores: INITIAL_SIGNAL_SCORES,
      domainScores: INITIAL_DOMAIN_SCORES,
      status: "phase1_in_progress",
      updatedAt: new Date().toISOString(),
    };

    await db.saveInterestSession(newSession);

    // Sanitize question for client (strip internal weights and domain relevance)
    const sanitizedQuestion = {
      id: initialQuestion.id,
      phase: initialQuestion.phase,
      questionNumber: initialQuestion.questionNumber,
      totalQuestionsEstimated: initialQuestion.totalQuestionsEstimated,
      questionText: initialQuestion.questionText,
      options: initialQuestion.options.map((o) => ({
        id: o.id,
        label: o.label,
        text: o.text,
      })),
    };

    return NextResponse.json({
      success: true,
      sessionId,
      phase: 1,
      question: sanitizedQuestion,
      answersCount: 0,
    });
  } catch (error) {
    console.error("Error starting discovery session:", error);
    return NextResponse.json(
      { success: false, error: "Failed to initialize interest discovery session." },
      { status: 500 }
    );
  }
}
