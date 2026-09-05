import { NextResponse } from "next/server";
import { db, InterestSessionRecord } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { DomainId, InterestSignal } from "@/lib/interest-engine/types";
import { updateSignalScores } from "@/lib/interest-engine/signals";
import {
  calculateDomainScores,
  evaluatePhase1Progress,
  evaluatePhase1Result,
  evaluatePhase2Result,
} from "@/lib/interest-engine/adaptive-scorer";
import {
  getNextAdaptiveQuestion,
  PHASE_1_BLIND_SCENARIOS,
  PHASE_2_DOMAIN_SCENARIOS,
} from "@/lib/interest-engine/ai-provider";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentId, questionId, selectedOptionId, selectedOptionText, questionText } = body;

    const { student } = await getAuthenticatedStudent(request, studentId);
    let session = await db.getInterestSession(student.id);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Active discovery session not found. Please start a new session." },
        { status: 404 }
      );
    }

    // Lookup option in Phase 1 or Phase 2 matrix to extract internal signal weights
    let signalDelta: Partial<Record<InterestSignal, number>> = {};
    let domainDelta: Partial<Record<DomainId, number>> = {};

    if (session.phase === 1) {
      const qMatch = PHASE_1_BLIND_SCENARIOS.find((q) => q.id === questionId);
      const optMatch = qMatch?.options.find((o) => o.id === selectedOptionId);
      if (optMatch) {
        signalDelta = optMatch.signalWeights;
        domainDelta = optMatch.domainRelevance;
      } else {
        // Fallback default weights based on label
        signalDelta = { problemSolving: 0.5, building: 0.5 };
      }
    } else {
      const domain = (session.broadDomain as DomainId) || "security";
      const domainQuestions = PHASE_2_DOMAIN_SCENARIOS[domain] || PHASE_2_DOMAIN_SCENARIOS.security;
      const qMatch = domainQuestions.find((q) => q.id === questionId);
      const optMatch = qMatch?.options.find((o) => o.id === selectedOptionId);
      if (optMatch) {
        signalDelta = optMatch.signalWeights;
        domainDelta = optMatch.domainRelevance;
      }
    }

    // Update session answers and signals
    const updatedSignals = updateSignalScores(session.signalScores as any, signalDelta);
    const updatedDomainScores = calculateDomainScores(updatedSignals);

    session.signalScores = updatedSignals;
    session.domainScores = updatedDomainScores;
    session.answers.push({
      questionId,
      questionText: questionText || "Question",
      selectedOptionId,
      selectedOptionText: selectedOptionText || "",
      phase: session.phase,
      signalDelta,
      domainDelta,
    });
    session.updatedAt = new Date().toISOString();

    // =========================================================================
    // PHASE 1 FLOW
    // =========================================================================
    if (session.phase === 1) {
      const phase1Answers = session.answers.filter((a) => a.phase === 1);
      const { shouldConclude } = evaluatePhase1Progress(
        phase1Answers.length,
        updatedDomainScores
      );

      if (shouldConclude) {
        const evaluation = evaluatePhase1Result(
          updatedSignals,
          updatedDomainScores,
          phase1Answers.length
        );

        session.status = "phase1_revealed";
        session.broadDomain = evaluation.discoveredDomainId;
        await db.saveInterestSession(session);

        return NextResponse.json({
          success: true,
          phase: 1,
          isPhaseComplete: true,
          evaluation,
          answersCount: phase1Answers.length,
        });
      }

      // Generate next Phase 1 question
      const nextQ = await getNextAdaptiveQuestion({
        phase: 1,
        questionCount: phase1Answers.length,
        questionHistory: session.answers as any,
        signalScores: updatedSignals,
        domainScores: updatedDomainScores,
      });

      await db.saveInterestSession(session);

      return NextResponse.json({
        success: true,
        phase: 1,
        isPhaseComplete: false,
        nextQuestion: {
          id: nextQ.id,
          phase: nextQ.phase,
          questionNumber: nextQ.questionNumber,
          totalQuestionsEstimated: nextQ.totalQuestionsEstimated,
          questionText: nextQ.questionText,
          options: nextQ.options.map((o) => ({
            id: o.id,
            label: o.label,
            text: o.text,
          })),
        },
        answersCount: phase1Answers.length,
      });
    }

    // =========================================================================
    // PHASE 2 FLOW
    // =========================================================================
    const phase2Answers = session.answers.filter((a) => a.phase === 2);

    if (phase2Answers.length >= 3) {
      const evaluation = evaluatePhase2Result(
        session.broadDomain as DomainId,
        phase2Answers as any
      );

      session.status = "phase2_ready";
      await db.saveInterestSession(session);

      return NextResponse.json({
        success: true,
        phase: 2,
        isPhaseComplete: true,
        evaluation,
        answersCount: phase2Answers.length,
      });
    }

    // Generate next Phase 2 question
    const nextQ = await getNextAdaptiveQuestion({
      phase: 2,
      questionCount: phase2Answers.length,
      questionHistory: session.answers as any,
      signalScores: updatedSignals,
      domainScores: updatedDomainScores,
      broadDomain: session.broadDomain as DomainId,
    });

    await db.saveInterestSession(session);

    return NextResponse.json({
      success: true,
      phase: 2,
      isPhaseComplete: false,
      nextQuestion: {
        id: nextQ.id,
        phase: nextQ.phase,
        questionNumber: nextQ.questionNumber,
        totalQuestionsEstimated: nextQ.totalQuestionsEstimated,
        questionText: nextQ.questionText,
        options: nextQ.options.map((o) => ({
          id: o.id,
          label: o.label,
          text: o.text,
        })),
      },
      answersCount: phase2Answers.length,
    });
  } catch (error) {
    console.error("Error submitting answer:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process question answer." },
      { status: 500 }
    );
  }
}
