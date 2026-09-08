import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
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
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: "Missing sessionId" },
        { status: 400 }
      );
    }

    const session = await db.getKnowledgeTestSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Session not found" },
        { status: 404 }
      );
    }

    if (session.studentId !== student.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized session access" },
        { status: 403 }
      );
    }

    // Check if result already exists for this session
    const existingResults = await db.getKnowledgeTestResultsByStudent(student.id);
    const foundResult = existingResults.find((r) => r.sessionId === sessionId);
    if (foundResult) {
      return NextResponse.json({
        success: true,
        result: foundResult,
      });
    }

    // Otherwise calculate and finalize
    session.status = "completed";
    session.updatedAt = new Date().toISOString();
    await db.saveKnowledgeTestSession(session);

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
      result,
    });
  } catch (error) {
    console.error("Error completing knowledge test:", error);
    return NextResponse.json(
      { success: false, error: "Failed to complete knowledge test" },
      { status: 500 }
    );
  }
}
