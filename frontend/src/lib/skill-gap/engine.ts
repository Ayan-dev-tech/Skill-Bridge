/**
 * Skill Bridge — Skill Gap Engine & Program Matching Foundation
 * Deterministic evidence-based skill gap diagnosis, safe AI interpretation,
 * and transparent education program matching.
 */

import { DifficultyLevel, TestResult } from "@/lib/knowledge-test/types";
import {
  SkillGapItem,
  TargetSkillProfile,
  EducationProgram,
  ProgramRecommendation,
  GapPriority,
  MatchTier,
} from "./types";
import { SAMPLE_EDUCATION_PROGRAMS } from "./educator-catalog-data";

// ============================================================================
// 1. DETERMINISTIC SKILL GAP EVALUATION
// ============================================================================

export function calculateDeterministicSkillGaps(
  profile: TargetSkillProfile,
  testResult: TestResult,
  difficulty: DifficultyLevel
): SkillGapItem[] {
  const evaluatedGaps: SkillGapItem[] = [];
  const questionBreakdown = testResult.questionBreakdown || [];

  for (const req of profile.requiredSkills) {
    // Find questions corresponding to this skill's concept tags
    const relevantQuestions = questionBreakdown.filter((q) =>
      req.relatedConceptTags.includes(q.conceptTag)
    );

    const testedCount = relevantQuestions.length;
    const correctCount = relevantQuestions.filter((q) => q.isCorrect).length;
    const accuracyPercent =
      testedCount > 0 ? Math.round((correctCount / testedCount) * 100) : null;

    let priority: GapPriority = "medium";
    let currentLevel = "Developing";
    let evidence = "";

    if (accuracyPercent !== null) {
      if (accuracyPercent < 50) {
        priority = "high";
        currentLevel = "Needs Improvement";
        evidence = `Answered ${correctCount} of ${testedCount} related questions correctly (${accuracyPercent}% accuracy) in ${difficulty} benchmark.`;
      } else if (accuracyPercent < 75) {
        priority = req.importance === "essential" ? "medium" : "low";
        currentLevel = "Developing";
        evidence = `Demonstrated partial mastery with ${correctCount} of ${testedCount} questions correct (${accuracyPercent}% accuracy).`;
      } else {
        priority = req.importance === "essential" ? "low" : "low";
        currentLevel = "Competent";
        evidence = `Strong performance with ${correctCount} of ${testedCount} questions correct (${accuracyPercent}% accuracy).`;
      }
    } else {
      // Not tested directly in this specific quiz run
      if (req.importance === "essential") {
        priority = testResult.scorePercent < 60 ? "high" : "medium";
        currentLevel = "Needs Verification";
        evidence = `Essential capability for ${profile.nicheTitle}; not directly evaluated in current assessment session.`;
      } else if (req.importance === "important") {
        priority = "medium";
        currentLevel = "Developing";
        evidence = `Core capability expected for target industry roles; requires structured learning.`;
      } else {
        priority = "low";
        currentLevel = "Developing";
        evidence = `Supplementary skill to accelerate long-term career growth in ${profile.nicheTitle}.`;
      }
    }

    const priorityLabel: SkillGapItem["priorityLabel"] =
      priority === "high"
        ? "High Priority"
        : priority === "medium"
        ? "Medium Priority"
        : "Low Priority";

    // Actionable practical guidance
    const whyItMatters = `${req.skillName} is fundamental to ${profile.nicheTitle}: ${req.description}`;
    const recommendedAction = `Focus on structured practice with ${req.relatedConceptTags
      .slice(0, 3)
      .join(", ")
      .replace(/-/g, " ")} to progress towards ${req.targetLevel}.`;

    evaluatedGaps.push({
      skillId: req.skillId,
      skillName: req.skillName,
      category: req.category,
      priority,
      priorityLabel,
      currentLevel,
      targetLevel: req.targetLevel,
      evidence,
      whyItMatters,
      recommendedAction,
      testedCount,
      correctCount,
      accuracyPercent,
    });
  }

  // Sort by priority (high > medium > low), then lowest accuracy first
  const priorityOrder: Record<GapPriority, number> = {
    high: 3,
    medium: 2,
    low: 1,
  };

  evaluatedGaps.sort((a, b) => {
    if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    const accA = a.accuracyPercent ?? 50;
    const accB = b.accuracyPercent ?? 50;
    return accA - accB;
  });

  // Limit to approximately 3 to 6 meaningful skill gaps
  return evaluatedGaps.slice(0, 6);
}

// ============================================================================
// 2. SAFE AI INTERPRETATION (GEMINI 1.5 FLASH + RELIABLE FALLBACK)
// ============================================================================

interface AIInterpretationResult {
  executiveSummary: string;
  enhancedGaps: SkillGapItem[];
  aiGenerated: boolean;
}

export async function generateAIInterpretation(
  direction: { domainName: string; nicheTitle: string },
  snapshot: {
    testScore: number;
    testMaxScore: number;
    testScorePercent: number;
    difficulty: DifficultyLevel;
  },
  rawGaps: SkillGapItem[]
): Promise<AIInterpretationResult> {
  const fallbackSummary = `Based on your ${snapshot.difficulty} assessment score of ${snapshot.testScore}/${snapshot.testMaxScore} (${snapshot.testScorePercent}%), we identified ${rawGaps.length} target competencies to strengthen your trajectory toward ${direction.nicheTitle}. Addressing the high-priority gaps first will establish a solid industry-ready foundation.`;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      executiveSummary: fallbackSummary,
      enhancedGaps: rawGaps,
      aiGenerated: false,
    };
  }

  const prompt = `You are the lead academic and technical advisor for Skill Bridge.
Interpret the following deterministic assessment evidence for a student pursuing ${direction.nicheTitle} in ${direction.domainName}.

STUDENT EVIDENCE:
- Assessment Level: ${snapshot.difficulty}
- Overall Score: ${snapshot.testScore} / ${snapshot.testMaxScore} (${snapshot.testScorePercent}%)
- Identified Skill Gaps:
${rawGaps
  .map(
    (g, i) =>
      `${i + 1}. [${g.skillId}] ${g.skillName} (${g.priorityLabel}): ${g.evidence}`
  )
  .join("\n")}

STRICT INSTRUCTIONS:
1. Provide a constructive, encouraging, 2-3 sentence executive summary of the student's current baseline and what to tackle next.
2. For each skill gap, provide a concise, high-value "whyItMatters" (1-2 sentences) and "recommendedAction" (1 concrete practical action).
3. DO NOT change scores, priorities, or skill IDs.
4. Return ONLY valid JSON matching this schema:
{
  "executiveSummary": "...",
  "gaps": [
    {
      "skillId": "...",
      "whyItMatters": "...",
      "recommendedAction": "..."
    }
  ]
}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000); // 6-second timeout

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.2,
        },
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return {
        executiveSummary: fallbackSummary,
        enhancedGaps: rawGaps,
        aiGenerated: false,
      };
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return {
        executiveSummary: fallbackSummary,
        enhancedGaps: rawGaps,
        aiGenerated: false,
      };
    }

    const parsed = JSON.parse(rawText);
    if (!parsed.executiveSummary || !Array.isArray(parsed.gaps)) {
      return {
        executiveSummary: fallbackSummary,
        enhancedGaps: rawGaps,
        aiGenerated: false,
      };
    }

    // Merge AI enhancements safely without mutating factual evidence
    const gapMap = new Map<
      string,
      { whyItMatters: string; recommendedAction: string }
    >();
    for (const g of parsed.gaps) {
      if (g.skillId && g.whyItMatters && g.recommendedAction) {
        gapMap.set(g.skillId, {
          whyItMatters: String(g.whyItMatters).trim(),
          recommendedAction: String(g.recommendedAction).trim(),
        });
      }
    }

    const enhancedGaps = rawGaps.map((gap) => {
      const enhancement = gapMap.get(gap.skillId);
      if (!enhancement) return gap;
      return {
        ...gap,
        whyItMatters: enhancement.whyItMatters || gap.whyItMatters,
        recommendedAction:
          enhancement.recommendedAction || gap.recommendedAction,
      };
    });

    return {
      executiveSummary: String(parsed.executiveSummary).trim(),
      enhancedGaps,
      aiGenerated: true,
    };
  } catch (error) {
    console.warn("Gemini interpretation failed, using deterministic fallback:", error);
    return {
      executiveSummary: fallbackSummary,
      enhancedGaps: rawGaps,
      aiGenerated: false,
    };
  }
}

// ============================================================================
// 3. TRANSPARENT PROGRAM MATCHING ENGINE
// ============================================================================

export function matchProgramsToSkillGaps(
  skillGaps: SkillGapItem[],
  programs: EducationProgram[] = SAMPLE_EDUCATION_PROGRAMS,
  domainId: string,
  nicheId: string
): ProgramRecommendation[] {
  const recommendations: ProgramRecommendation[] = [];

  const highPriorityGaps = skillGaps.filter((g) => g.priority === "high");
  const gapSkillIds = new Set(skillGaps.map((g) => g.skillId));

  for (const program of programs) {
    if (!program.active) continue;

    // Determine overlapping skills
    const matchingGaps = skillGaps.filter((gap) =>
      program.skillIds.includes(gap.skillId)
    );

    if (matchingGaps.length === 0) {
      continue; // No overlap with student's gaps
    }

    const matchedGapCount = matchingGaps.length;
    const matchedHighPriorityCount = matchingGaps.filter(
      (g) => g.priority === "high"
    ).length;

    // Transparent calculation:
    // High-priority gaps are weighted 3x.
    // Domain / niche alignment adds bonus relevance.
    const isDomainMatch = program.domains.includes(domainId);
    const isNicheMatch = program.niches.includes(nicheId);

    const highWeight = matchedHighPriorityCount * 30;
    const otherWeight = (matchedGapCount - matchedHighPriorityCount) * 15;
    const alignmentBonus = (isNicheMatch ? 15 : 0) + (isDomainMatch ? 10 : 0);

    const matchScore = Math.min(
      98,
      Math.max(45, highWeight + otherWeight + alignmentBonus)
    );

    let matchTier: MatchTier = "Relevant";
    if (matchScore >= 80 || matchedHighPriorityCount >= 2) {
      matchTier = "Best Match";
    } else if (matchScore >= 60 || matchedGapCount >= 2) {
      matchTier = "Strong Match";
    }

    const coveredNames = matchingGaps.map((g) => g.skillName);
    const matchExplanation = `Recommended because it covers: ${coveredNames
      .map((name) => `✓ ${name}`)
      .join(", ")} and addresses ${matchedGapCount} of your ${
      skillGaps.length
    } identified skill gaps.`;

    recommendations.push({
      programId: program.id,
      program,
      matchScore,
      matchTier,
      matchedGapCount,
      matchedHighPriorityCount,
      coveredGaps: coveredNames,
      matchExplanation,
    });
  }

  // Sort by High Priority coverage first, then matchScore descending
  recommendations.sort((a, b) => {
    if (b.matchedHighPriorityCount !== a.matchedHighPriorityCount) {
      return b.matchedHighPriorityCount - a.matchedHighPriorityCount;
    }
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return b.matchedGapCount - a.matchedGapCount;
  });

  // Return top 3–5 recommendations
  return recommendations.slice(0, 5);
}
