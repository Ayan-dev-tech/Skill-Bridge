/**
 * Skill Bridge — Adaptive Domain Scorer
 * Pure scoring logic mapping 11 interest signals to 5 candidate domains.
 * Generates personalized, student-friendly explanations based on actual answers.
 */

import {
  DomainId,
  DomainScores,
  SignalScores,
  InterestSignal,
  Phase1Evaluation,
  Phase2Evaluation,
  AnswerRecord,
} from "./types";
import { SIGNAL_DESCRIPTIONS } from "./signals";
import { DOMAIN_TAXONOMY } from "./subdomains";

export const INITIAL_DOMAIN_SCORES: DomainScores = {
  ayurveda: 0,
  "yoga-naturopathy": 0,
  unani: 0,
  siddha: 0,
  homoeopathy: 0,
};

/**
 * Calculates normalized candidate domain scores (0.0 to 1.0) from the 11 interest signals.
 */
export function calculateDomainScores(signals: SignalScores): DomainScores {
  // Domain weight mappings tailored to the 5 AYUSH healthcare paradigms
  const rawScores: DomainScores = {
    ayurveda:
      (signals.investigation || 0) * 0.35 +
      (signals.systemsThinking || 0) * 0.30 +
      (signals.analysis || 0) * 0.20 +
      (signals.problemSolving || 0) * 0.15,

    "yoga-naturopathy":
      (signals.optimization || 0) * 0.35 +
      (signals.building || 0) * 0.25 +
      (signals.systemsThinking || 0) * 0.20 +
      (signals.creativity || 0) * 0.20,

    unani:
      (signals.analysis || 0) * 0.35 +
      (signals.investigation || 0) * 0.25 +
      (signals.problemSolving || 0) * 0.25 +
      (signals.systemsThinking || 0) * 0.15,

    siddha:
      (signals.experimentation || 0) * 0.35 +
      (signals.investigation || 0) * 0.25 +
      (signals.systemsThinking || 0) * 0.25 +
      (signals.optimization || 0) * 0.15,

    homoeopathy:
      (signals.investigation || 0) * 0.35 +
      (signals.analysis || 0) * 0.30 +
      (signals.problemSolving || 0) * 0.20 +
      (signals.creativity || 0) * 0.15,
  };

  // Find max score to normalize to a realistic curve
  const values = Object.values(rawScores);
  const max = Math.max(...values, 1);

  const normalized: DomainScores = {
    ayurveda: Math.min(1, Math.round((rawScores.ayurveda / max) * 100) / 100),
    "yoga-naturopathy": Math.min(1, Math.round((rawScores["yoga-naturopathy"] / max) * 100) / 100),
    unani: Math.min(1, Math.round((rawScores.unani / max) * 100) / 100),
    siddha: Math.min(1, Math.round((rawScores.siddha / max) * 100) / 100),
    homoeopathy: Math.min(1, Math.round((rawScores.homoeopathy / max) * 100) / 100),
  };

  return normalized;
}

/**
 * Determines whether Phase 1 should conclude.
 * Boundary: Min 4 questions, Max 7 questions.
 */
export function evaluatePhase1Progress(
  questionCount: number,
  domainScores: DomainScores
): { shouldConclude: boolean; leadingDomain: DomainId; confidence: number } {
  const sorted = (Object.keys(domainScores) as DomainId[]).sort(
    (a, b) => domainScores[b] - domainScores[a]
  );

  const topDomain = sorted[0];
  const runnerUp = sorted[1];
  const topScore = domainScores[topDomain] || 0;
  const runnerUpScore = domainScores[runnerUp] || 0;
  const leadMargin = topScore - runnerUpScore;

  // Confidence formula based on sample depth and margin of separation
  const depthFactor = Math.min(1, questionCount / 5);
  const confidence = Math.min(
    0.95,
    Math.round((0.55 + leadMargin * 0.3 + depthFactor * 0.15) * 100) / 100
  );

  // Stop if at least 4 questions answered AND (clear lead margin >= 0.18 OR max 7 questions reached)
  if (questionCount >= 7) {
    return { shouldConclude: true, leadingDomain: topDomain, confidence };
  }

  if (questionCount >= 4 && (leadMargin >= 0.18 || topScore >= 0.85)) {
    return { shouldConclude: true, leadingDomain: topDomain, confidence };
  }

  return { shouldConclude: false, leadingDomain: topDomain, confidence };
}

/**
 * Generates the friendly Phase 1 evaluation result with student-centered explanation.
 */
export function evaluatePhase1Result(
  signals: SignalScores,
  domainScores: DomainScores,
  questionCount: number
): Phase1Evaluation {
  const sortedDomains = (Object.keys(domainScores) as DomainId[]).sort(
    (a, b) => domainScores[b] - domainScores[a]
  );
  const leadingDomain = sortedDomains[0];
  const domainMeta = DOMAIN_TAXONOMY[leadingDomain];

  // Identify top 3 contributing signals
  const sortedSignals = (Object.keys(signals) as InterestSignal[])
    .sort((a, b) => (signals[b] || 0) - (signals[a] || 0))
    .slice(0, 3)
    .map((s) => ({
      signal: s,
      label: SIGNAL_DESCRIPTIONS[s].label,
      score: signals[s] || 0,
    }));

  const topTwoActions = sortedSignals
    .slice(0, 2)
    .map((s) => SIGNAL_DESCRIPTIONS[s.signal].actionDesc);

  const explanation =
    topTwoActions.length >= 2
      ? `Your answers suggest you particularly enjoy ${topTwoActions[0]}, as well as ${topTwoActions[1]}. This strong alignment highlights ${domainMeta.name} as your natural starting domain.`
      : `Your responses reflect a strong problem-solving orientation toward ${domainMeta.name}.`;

  const { confidence } = evaluatePhase1Progress(questionCount, domainScores);

  return {
    discoveredDomainId: leadingDomain,
    discoveredDomainName: domainMeta.name,
    explanation,
    confidence,
    canProceed: true,
    topSignals: sortedSignals,
  };
}

/**
 * Evaluates Phase 2 answers to pinpoint the specific sub-domain niche within the chosen domain.
 */
export function evaluatePhase2Result(
  domainId: DomainId,
  phase2Answers: AnswerRecord[]
): Phase2Evaluation {
  const taxonomy = DOMAIN_TAXONOMY[domainId] || DOMAIN_TAXONOMY.ayurveda;
  const subDomains = taxonomy.subDomains;

  // Score each sub-domain based on answers
  const scores: Record<string, number> = {};
  for (const sub of subDomains) {
    scores[sub.id] = 0;
  }

  for (const answer of phase2Answers) {
    for (const sub of subDomains) {
      // Check if selected option or question matches sub-domain hint or keywords
      if (
        answer.selectedOptionId.includes(sub.id) ||
        answer.selectedOptionText.toLowerCase().includes(sub.name.toLowerCase().split(" ")[0])
      ) {
        scores[sub.id] = (scores[sub.id] || 0) + 2;
      }
    }
  }

  // Pick top sub-domain
  const sortedSubDomains = [...subDomains].sort(
    (a, b) => (scores[b.id] || 0) - (scores[a.id] || 0)
  );
  const bestMatch = sortedSubDomains[0] || subDomains[0];

  const confidence = Math.min(
    0.92,
    Math.round((0.72 + (phase2Answers.length >= 3 ? 0.15 : 0.08)) * 100) / 100
  );

  return {
    mainDomainId: domainId,
    mainDomainName: taxonomy.name,
    specificInterest: bestMatch.nicheTitle,
    explanation: bestMatch.whyThisFits,
    confidence,
    subDisciplinesConsidered: subDomains.map((s) => s.name),
  };
}
