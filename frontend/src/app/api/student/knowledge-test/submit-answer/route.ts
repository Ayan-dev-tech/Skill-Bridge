import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import {
  TestAnswerRecord,
  ClientQuestion,
} from "@/lib/knowledge-test/types";
import { calculateTestResult } from "@/lib/knowledge-test/test-scorer";

export async function POST(request: Request) {
  try {
    const { student, error: authError, status: authStatus } = await getAuthenticatedStudent(request);
    if (!student) {
      return NextResponse.json(
        { success: false, error: authError || "Unauthorized. Please sign in as a student." },
        { status: authStatus || 401 }
      );
    }
    const body = await request.json().catch(() => ({}));
    const { sessionId, questionId, selectedOptionId, timeSpentMs } = body;

    if (!sessionId || !questionId || !selectedOptionId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: sessionId, questionId, or selectedOptionId" },
        { status: 400 }
      );
    }

    const session = await db.getKnowledgeTestSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Session not found." },
        { status: 404 }
      );
    }

    if (session.studentId !== student.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized session access." },
        { status: 403 }
      );
    }

    if (session.status !== "in_progress") {
      return NextResponse.json(
        { success: false, error: "This session is no longer active." },
        { status: 400 }
      );
    }

    // Find the question being answered
    const question = session.questions.find((q) => q.id === questionId);
    if (!question) {
      return NextResponse.json(
        { success: false, error: "Question not found in this session." },
        { status: 404 }
      );
    }

    // Server-side validation of correctness
    const isCorrect = selectedOptionId === question.correctOptionId;

    const answerRecord: TestAnswerRecord = {
      questionId: question.id,
      questionNumber: question.questionNumber,
      selectedOptionId,
      correctOptionId: question.correctOptionId,
      isCorrect,
      timeSpentMs: Math.max(0, Number(timeSpentMs) || 0),
      conceptTag: question.conceptTag,
      complexity: question.complexity,
    };

    // Replace if already answered, otherwise append
    const existingAnswerIdx = session.answers.findIndex((a) => a.questionId === questionId);
    if (existingAnswerIdx >= 0) {
      session.answers[existingAnswerIdx] = answerRecord;
    } else {
      session.answers.push(answerRecord);
    }

    session.currentQuestionIndex = session.answers.length;
    session.updatedAt = new Date().toISOString();

    const isCompleted = session.answers.length >= session.questions.length;

    if (isCompleted) {
      session.status = "completed";
      await db.saveKnowledgeTestSession(session);

      // Compute and persist score
      const result = calculateTestResult({
        sessionId: session.sessionId,
        studentId: session.studentId,
        domainId: session.domainId,
        domainName: session.domainName,
        specificInterest: session.specificInterest,
        difficulty: session.difficulty,
        questions: session.questions,
        answers: session.answers,
      });

      await db.saveKnowledgeTestResult(result);

      return NextResponse.json({
        success: true,
        isCompleted: true,
        answeredCount: session.answers.length,
        totalQuestions: session.questions.length,
        immediateFeedback: {
          questionId: question.id,
          isCorrect,
          correctOptionId: question.correctOptionId,
          explanation: question.explanationAfterAnswer,
        },
        result,
      });
    }

    await db.saveKnowledgeTestSession(session);

    // Prepare next sanitized question
    const nextQ = session.questions[session.currentQuestionIndex];
    const clientNextQ: ClientQuestion = {
      id: nextQ.id,
      questionNumber: nextQ.questionNumber,
      totalQuestions: session.questions.length,
      questionText: nextQ.questionText,
      options: nextQ.options.map((o) => ({
        id: o.id,
        label: o.label,
        text: o.text,
      })),
      complexity: nextQ.complexity,
    };

    return NextResponse.json({
      success: true,
      isCompleted: false,
      answeredCount: session.answers.length,
      totalQuestions: session.questions.length,
      currentQuestionIndex: session.currentQuestionIndex,
      nextQuestion: clientNextQ,
      immediateFeedback: {
        questionId: question.id,
        isCorrect,
        correctOptionId: question.correctOptionId,
        explanation: question.explanationAfterAnswer,
      },
    });
  } catch (error) {
    console.error("Error submitting knowledge test answer:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit answer." },
      { status: 500 }
    );
  }
}
