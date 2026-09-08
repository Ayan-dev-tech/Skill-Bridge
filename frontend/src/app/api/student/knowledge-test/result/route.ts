import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { checkRouteAccess } from "@/lib/workflow/canonical-workflow";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const { student } = await getAuthenticatedStudent(request);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in as a student." },
        { status: 401 }
      );
    }

    const sessionId = searchParams.get("sessionId");
    const resultId = searchParams.get("resultId");

    // Canonical workflow access check
    const access = await checkRouteAccess(student.id, "/student/knowledge-testing");

    // Fetch interest profile to check prerequisite
    const interestProfile = await db.getInterestProfile(student.id);

    // Fetch active session if any
    const activeSession = access.allowed
      ? await db.getActiveKnowledgeTestSessionByStudent(student.id)
      : null;

    // Fetch student's test history
    const allResults = access.allowed
      ? await db.getKnowledgeTestResultsByStudent(student.id)
      : [];

    let currentResult = null;
    if (resultId) {
      currentResult = allResults.find((r) => r.id === resultId) || null;
    } else if (sessionId) {
      currentResult = allResults.find((r) => r.sessionId === sessionId) || null;
    } else if (allResults.length > 0) {
      currentResult = allResults[0];
    }

    return NextResponse.json({
      success: true,
      hasPrerequisite: access.allowed && !!interestProfile,
      redirectUrl: access.redirectUrl,
      reason: access.reason,
      interestProfile: interestProfile
        ? {
            confirmedMainDomain: interestProfile.confirmedMainDomain,
            confirmedMainDomainId: interestProfile.confirmedMainDomainId,
            confirmedSpecificInterest: interestProfile.confirmedSpecificInterest,
            confirmedAt: interestProfile.confirmedAt,
          }
        : null,
      activeSession: activeSession
        ? {
            sessionId: activeSession.sessionId,
            difficulty: activeSession.difficulty,
            domainId: activeSession.domainId,
            domainName: activeSession.domainName,
            currentQuestionIndex: activeSession.currentQuestionIndex,
            answeredCount: activeSession.answers.length,
            totalQuestions: activeSession.questions.length,
          }
        : null,
      result: currentResult,
      history: allResults.map((r) => ({
        id: r.id,
        sessionId: r.sessionId,
        domainName: r.domainName,
        specificInterest: r.specificInterest,
        difficulty: r.difficulty,
        scorePercent: r.scorePercent,
        correctCount: r.correctCount,
        totalQuestions: r.totalQuestions,
        performanceTier: r.performanceTier,
        completedAt: r.completedAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching knowledge test results:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch knowledge test results" },
      { status: 500 }
    );
  }
}
