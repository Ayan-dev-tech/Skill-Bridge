import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";
import type { IndustryQuestionRecord } from "@/lib/industry/types";

export async function GET(
  request: Request,
  props: { params: Promise<{ questionId: string }> }
) {
  try {
    const { industryUser, error } = await getAuthenticatedIndustry(request);
    if (!industryUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: 401 }
      );
    }

    const { questionId } = await props.params;
    const question = await db.getIndustryQuestionById(questionId, industryUser.id);
    if (!question) {
      return NextResponse.json(
        { success: false, error: "Question not found or access denied." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      question,
    });
  } catch (err) {
    console.error("Error retrieving question:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve question." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  props: { params: Promise<{ questionId: string }> }
) {
  try {
    const { industryUser, error } = await getAuthenticatedIndustry(request);
    if (!industryUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: 401 }
      );
    }

    const { questionId } = await props.params;
    const existing = await db.getIndustryQuestionById(questionId, industryUser.id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Question not found or access denied." },
        { status: 404 }
      );
    }

    const body = await request.json();
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

    const updates: Partial<IndustryQuestionRecord> = {};

    if (questionText !== undefined) {
      if (!questionText.trim()) {
        return NextResponse.json(
          { success: false, error: "Question text cannot be empty." },
          { status: 400 }
        );
      }
      updates.questionText = questionText.trim();
    }

    if (options !== undefined) {
      if (!Array.isArray(options) || options.length < 2) {
        return NextResponse.json(
          { success: false, error: "At least 2 options required for multiple choice questions." },
          { status: 400 }
        );
      }
      const preparedOptions = options.map((opt, idx) => ({
        id: opt.id?.trim() || `opt_${idx + 1}`,
        label: opt.label || ["A", "B", "C", "D"][idx] || `Option ${idx + 1}`,
        text: (opt.text || "").trim(),
      }));

      for (let i = 0; i < preparedOptions.length; i++) {
        if (!preparedOptions[i].text) {
          return NextResponse.json(
            { success: false, error: `Option ${i + 1} cannot have empty text.` },
            { status: 400 }
          );
        }
      }

      const idSet = new Set(preparedOptions.map((o) => o.id));
      if (idSet.size !== preparedOptions.length) {
        return NextResponse.json(
          { success: false, error: "Option IDs must be unique." },
          { status: 400 }
        );
      }

      updates.options = preparedOptions;
    }

    if (correctOptionId !== undefined) {
      const activeOptions = updates.options || existing.options;
      if (!activeOptions.some((o) => o.id === correctOptionId)) {
        return NextResponse.json(
          { success: false, error: "Selected correct option ID is invalid." },
          { status: 400 }
        );
      }
      updates.correctOptionId = correctOptionId;
    }

    if (difficulty !== undefined) updates.difficulty = difficulty;
    if (complexity !== undefined) updates.complexity = complexity;
    if (domainId !== undefined) updates.domainId = domainId;
    if (conceptTag !== undefined) updates.conceptTag = conceptTag.trim();
    if (marks !== undefined) updates.marks = Math.max(1, marks);
    if (explanation !== undefined) updates.explanation = explanation.trim();

    const updated = await db.updateIndustryQuestion(questionId, industryUser.id, updates);

    return NextResponse.json({
      success: true,
      message: "Question updated successfully.",
      question: updated,
    });
  } catch (err) {
    console.error("Error updating question:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update question." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ questionId: string }> }
) {
  try {
    const { industryUser, error } = await getAuthenticatedIndustry(request);
    if (!industryUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: 401 }
      );
    }

    const { questionId } = await props.params;
    const deleted = await db.deleteIndustryQuestion(questionId, industryUser.id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Question not found or access denied." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Question deleted successfully.",
    });
  } catch (err) {
    console.error("Error deleting question:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete question." },
      { status: 500 }
    );
  }
}
