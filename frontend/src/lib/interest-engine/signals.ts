/**
 * Skill Bridge — Interest Signals Model
 * Handles signal tracking, weighted accumulation, and friendly explanation mapping.
 */

import { InterestSignal, SignalScores } from "./types";

export const INITIAL_SIGNAL_SCORES: SignalScores = {
  investigation: 0,
  problemSolving: 0,
  building: 0,
  creativity: 0,
  analysis: 0,
  experimentation: 0,
  optimization: 0,
  systemsThinking: 0,
  dataOrientation: 0,
  automation: 0,
  securityMindset: 0,
};

export const SIGNAL_DESCRIPTIONS: Record<
  InterestSignal,
  { label: string; actionDesc: string }
> = {
  investigation: {
    label: "Root-Cause Investigation",
    actionDesc: "investigating unexpected behavior, anomalies, and edge cases",
  },
  problemSolving: {
    label: "Algorithmic Logic",
    actionDesc: "tackling complex logical deductions and algorithmic challenges",
  },
  building: {
    label: "End-to-End Construction",
    actionDesc: "building tangible tools, features, and interactive systems",
  },
  creativity: {
    label: "Creative Experience",
    actionDesc: "crafting elegant interfaces and intuitive user workflows",
  },
  analysis: {
    label: "Evidence & Pattern Analysis",
    actionDesc: "evaluating patterns, records, and statistical trends",
  },
  experimentation: {
    label: "Hypothesis Testing",
    actionDesc: "running empirical trials, tuning models, and testing hypotheses",
  },
  optimization: {
    label: "Performance Optimization",
    actionDesc: "refining speed, resource efficiency, and eliminating latency",
  },
  systemsThinking: {
    label: "Architecture & Systems",
    actionDesc: "understanding how components interconnect within a larger system",
  },
  dataOrientation: {
    label: "Data Architecture",
    actionDesc: "organizing datasets, managing storage pipelines, and modeling data flows",
  },
  automation: {
    label: "Workflow Automation",
    actionDesc: "automating repetitive tasks and orchestrating continuous processes",
  },
  securityMindset: {
    label: "Adversarial & Defensive Thinking",
    actionDesc: "finding structural weaknesses and designing defensive boundaries",
  },
};

/**
 * Updates accumulated signal scores based on chosen option weights.
 */
export function updateSignalScores(
  currentScores: SignalScores,
  delta: Partial<Record<InterestSignal, number>>
): SignalScores {
  const updated = { ...currentScores };
  for (const key of Object.keys(delta) as InterestSignal[]) {
    const weight = delta[key] || 0;
    updated[key] = Math.round(((updated[key] || 0) + weight) * 100) / 100;
  }
  return updated;
}
