import { NextResponse } from "next/server";
import { db, InterestProfileRecord } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, finalProfile } = body;

    const { student, error: authError, status: authStatus } = await getAuthenticatedStudent(request);
    if (!student) {
      return NextResponse.json(
        { success: false, error: authError || "Unauthorized. Please sign in as a student." },
        { status: authStatus || 401 }
      );
    }

    if (action === "explore_again") {
      // Clear current active exploration session, leaving any previous confirmed profile untouched
      await db.clearInterestSession(student.id);
      return NextResponse.json({
        success: true,
        action: "explore_again",
        message: "Exploration session reset. You may start a fresh discovery journey.",
      });
    }

    // Action === "confirm"
    const session = await db.getInterestSession(student.id);
    const sessionId = session?.sessionId || `session_${Date.now()}`;

    const phase1Count = session?.answers.filter((a) => a.phase === 1).length || 5;
    const phase2Count = session?.answers.filter((a) => a.phase === 2).length || 3;

    const record: InterestProfileRecord = {
      id: `profile_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      studentId: student.id,
      sessionId,
      confirmedMainDomain: finalProfile.mainDomainName,
      confirmedMainDomainId: finalProfile.mainDomainId,
      confirmedSpecificInterest: finalProfile.specificInterest,
      explanation: finalProfile.explanation,
      confidence: finalProfile.confidence,
      interestSignals: session?.signalScores || {},
      candidateDomainScores: session?.domainScores || {},
      phase1AnswerCount: phase1Count,
      phase2AnswerCount: phase2Count,
      confirmedAt: new Date().toISOString(),
    };

    await db.saveInterestProfile(record);

    // Update session status to confirmed
    if (session) {
      session.status = "confirmed";
      await db.saveInterestSession(session);
    }

    return NextResponse.json({
      success: true,
      action: "confirm",
      profile: record,
    });
  } catch (error) {
    console.error("Error confirming interest profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save confirmed interest profile." },
      { status: 500 }
    );
  }
}
