import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";
import type { CreateIndustryQuestionInput } from "@/lib/industry/types";

export async function GET(request: Request) {
  try {
    const { industryUser, error } = await getAuthenticatedIndustry(request);
    if (!industryUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const difficulty = searchParams.get("difficulty") || "all";
    const domainId = searchParams.get("domainId") || "all";
    const questionType = searchParams.get("questionType") || "all";

    const questions = await db.getIndustryQuestions(industryUser.id, {
      search,
      difficulty,
      domainId,
      questionType,
    });

    return NextResponse.json({
      success: true,
      questions,
      count: questions.length,
    });
  } catch (err) {
    console.error("Error retrieving question bank:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve questions." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { industryUser, error } = await getAuthenticatedIndustry(request);
    if (!industryUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as CreateIndustryQuestionInput;
    const {
      questionText,
      options,
      correctOptionId,
      difficulty,
      complexity,
      domainId,
      conceptTag,
      marks,
      explanation,
    } = body;

    // 1. Validate Question Text
    if (!questionText || !questionText.trim()) {
      return NextResponse.json(
        { success: false, error: "Question prompt text is required." },
        { status: 400 }
      );
    }

    // 2. Validate Options
    if (!Array.isArray(options) || options.length < 2) {
      return NextResponse.json(
        { success: false, error: "Multiple choice questions must have at least 2 options (standard: 4)." },
        { status: 400 }
      );
    }

    for (let i = 0; i < options.length; i++) {
      if (!options[i].text || !options[i].text.trim()) {
        return NextResponse.json(
          { success: false, error: `Option ${i + 1} cannot have empty text.` },
          { status: 400 }
        );
      }
    }

    // 3. Assign stable IDs if not provided
    const preparedOptions = options.map((opt, idx) => {
      const stableId = opt.id?.trim() || `opt_${idx + 1}`;
      const label = opt.label || ["A", "B", "C", "D"][idx] || `Option ${idx + 1}`;
      return {
        id: stableId,
        label,
        text: opt.text.trim(),
      };
    });

    // Verify option IDs are unique
    const idSet = new Set(preparedOptions.map((o) => o.id));
    if (idSet.size !== preparedOptions.length) {
      return NextResponse.json(
        { success: false, error: "Option IDs must be distinct and unique." },
        { status: 400 }
      );
    }

    // 4. Validate correctOptionId
    if (!correctOptionId || !preparedOptions.some((o) => o.id === correctOptionId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select a valid correct answer option from the provided choices.",
        },
        { status: 400 }
      );
    }

    // 5. Create Question
    const created = await db.createIndustryQuestion(industryUser.id, {
      questionText: questionText.trim(),
      questionType: "mcq",
      options: preparedOptions,
      correctOptionId,
      difficulty: difficulty || "intermediate",
      complexity: complexity || "application",
      domainId: domainId || "software",
      conceptTag: conceptTag?.trim() || "general-engineering",
      marks: typeof marks === "number" && marks > 0 ? marks : 1,
      explanation: explanation?.trim() || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Question added to Question Bank successfully.",
        question: created,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating question in bank:", err);
    return NextResponse.json(
      { success: false, error: "Failed to create question." },
      { status: 500 }
    );
  }
}
