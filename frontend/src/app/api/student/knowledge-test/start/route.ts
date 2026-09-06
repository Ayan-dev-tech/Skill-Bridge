import { NextResponse } from "next/server";
import { db, KnowledgeTestSessionRecord } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { checkRouteAccess } from "@/lib/workflow/canonical-workflow";
import {
  DifficultyLevel,
  ClientQuestion,
} from "@/lib/knowledge-test/types";
import { generateQuestionBatch } from "@/lib/knowledge-test/ai-question-generator";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { student } = await getAuthenticatedStudent(request, body.studentId);

    // 1. Prerequisite Gate: Verify canonical workflow authorization
    const access = await checkRouteAccess(student.id, "/student/knowledge-testing");
    if (!access.allowed) {
      return NextResponse.json(
        {
          success: false,
          prerequisiteMissing: true,
          redirectUrl: access.redirectUrl,
          message:
            access.reason ||
            "Knowledge Testing is locked. Please complete prior milestones first.",
        },
        { status: 403 }
      );
    }

    const interestProfile = await db.getInterestProfile(student.id);
    if (!interestProfile) {
      return NextResponse.json(
        {
          success: false,
          prerequisiteMissing: true,
          redirectUrl: "/student/interest-finder",
          message:
            "Knowledge Testing requires a completed Interest Finder profile. Please complete the Interest Finder first.",
        },
        { status: 403 }
      );
    }

    const validDifficulties: DifficultyLevel[] = ["beginner", "intermediate", "advanced"];
    const requestedDifficulty: DifficultyLevel = validDifficulties.includes(body.difficulty)
      ? body.difficulty
      : "beginner";

    // 2. Check for existing in-progress session unless restart is requested
    const existingSession = await db.getActiveKnowledgeTestSessionByStudent(student.id);

    if (existingSession && !body.restart) {
      // Resume existing session if it matches difficulty, otherwise continue
      const currentIdx = existingSession.currentQuestionIndex;
      const currentQ = existingSession.questions[currentIdx] || existingSession.questions[0];

      const clientQ: ClientQuestion = {
        id: currentQ.id,
        questionNumber: currentQ.questionNumber,
        totalQuestions: existingSession.questions.length,
        questionText: currentQ.questionText,
        options: currentQ.options.map((o) => ({
          id: o.id,
          label: o.label,
          text: o.text,
        })),
        complexity: currentQ.complexity,
      };

      return NextResponse.json({
        success: true,
        resumed: true,
        sessionId: existingSession.sessionId,
        difficulty: existingSession.difficulty,
        domain: {
          id: existingSession.domainId,
          name: existingSession.domainName,
          specificInterest: existingSession.specificInterest,
        },
        question: clientQ,
        currentQuestionIndex: currentIdx,
        answeredCount: existingSession.answers.length,
        totalQuestions: existingSession.questions.length,
      });
    }

    // If restarting, mark old session as abandoned
    if (existingSession && body.restart) {
      existingSession.status = "abandoned";
      existingSession.updatedAt = new Date().toISOString();
      await db.saveKnowledgeTestSession(existingSession);
    }

    // 3. Generate 10 difficulty-calibrated questions
    const domainId = interestProfile.confirmedMainDomainId || "security";
    const domainName = interestProfile.confirmedMainDomain || "Cybersecurity";
    const specificInterest =
      interestProfile.confirmedSpecificInterest || "Core Engineering";

    const questions = await generateQuestionBatch({
      domainId,
      domainName,
      specificInterest,
      difficulty: requestedDifficulty,
      existingConceptTags: [],
      batchSize: 10,
    });

    const sessionId = `ktest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newSession: KnowledgeTestSessionRecord = {
      sessionId,
      studentId: student.id,
      domainId,
      domainName,
      specificInterest,
      difficulty: requestedDifficulty,
      questions,
      answers: [],
      currentQuestionIndex: 0,
      status: "in_progress",
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.saveKnowledgeTestSession(newSession);

    // 4. Return sanitized first question
    const firstQ = questions[0];
    const clientQ: ClientQuestion = {
      id: firstQ.id,
      questionNumber: 1,
      totalQuestions: 10,
      questionText: firstQ.questionText,
      options: firstQ.options.map((o) => ({
        id: o.id,
        label: o.label,
        text: o.text,
      })),
      complexity: firstQ.complexity,
    };

    return NextResponse.json({
      success: true,
      resumed: false,
      sessionId,
      difficulty: requestedDifficulty,
      domain: {
        id: domainId,
        name: domainName,
        specificInterest,
      },
      question: clientQ,
      currentQuestionIndex: 0,
      answeredCount: 0,
      totalQuestions: 10,
    });
  } catch (error) {
    console.error("Error starting knowledge test session:", error);
    return NextResponse.json(
      { success: false, error: "Failed to initialize knowledge test session." },
      { status: 500 }
    );
  }
}
