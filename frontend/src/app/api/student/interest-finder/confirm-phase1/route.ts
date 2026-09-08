import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { DomainId } from "@/lib/interest-engine/types";
import { getNextAdaptiveQuestion } from "@/lib/interest-engine/ai-provider";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, domainId } = body;

    const { student, error: authError, status: authStatus } = await getAuthenticatedStudent(request);
    if (!student) {
      return NextResponse.json(
        { success: false, error: authError || "Unauthorized. Please sign in as a student." },
        { status: authStatus || 401 }
      );
    }
    const session = await db.getInterestSession(student.id);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Active discovery session not found." },
        { status: 404 }
      );
    }

    if (action === "reject") {
      // Student selected "Not quite, explore again" -> reset session cleanly
      await db.clearInterestSession(student.id);
      return NextResponse.json({
        success: true,
        action: "reject",
        message: "Exploration session reset. You may explore again anytime.",
      });
    }

    // Student accepted broad domain -> proceed to Phase 2
    const targetDomain = (domainId || session.broadDomain || "security") as DomainId;
    session.phase = 2;
    session.broadDomain = targetDomain;
    session.status = "phase2_in_progress";

    // Generate Question 1 of Phase 2
    const firstP2Question = await getNextAdaptiveQuestion({
      phase: 2,
      questionCount: 0,
      questionHistory: session.answers as any,
      signalScores: session.signalScores as any,
      domainScores: session.domainScores as any,
      broadDomain: targetDomain,
    });

    session.updatedAt = new Date().toISOString();
    await db.saveInterestSession(session);

    return NextResponse.json({
      success: true,
      action: "accept",
      phase: 2,
      domainId: targetDomain,
      nextQuestion: {
        id: firstP2Question.id,
        phase: firstP2Question.phase,
        questionNumber: firstP2Question.questionNumber,
        totalQuestionsEstimated: firstP2Question.totalQuestionsEstimated,
        questionText: firstP2Question.questionText,
        options: firstP2Question.options.map((o) => ({
          id: o.id,
          label: o.label,
          text: o.text,
        })),
      },
    });
  } catch (error) {
    console.error("Error confirming Phase 1 domain:", error);
    return NextResponse.json(
      { success: false, error: "Failed to confirm broad domain." },
      { status: 500 }
    );
  }
}
