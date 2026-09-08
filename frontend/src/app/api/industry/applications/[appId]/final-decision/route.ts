import { NextResponse } from "next/server";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";
import { db } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ appId: string }> }
) {
  try {
    const { industryUser, error } = await getAuthenticatedIndustry(request);
    if (!industryUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: 401 }
      );
    }

    const { appId } = await params;
    const body = await request.json();
    const { decision, offerDetails } = body;

    if (!decision || !["selected", "rejected"].includes(decision)) {
      return NextResponse.json(
        { success: false, error: "Decision must be either 'selected' or 'rejected'." },
        { status: 400 }
      );
    }

    const updated = await db.updateFinalHiringDecision(
      industryUser.id,
      appId,
      decision,
      offerDetails
    );

    return NextResponse.json({
      success: true,
      message: decision === "selected" ? "Candidate selected and offer extended." : "Candidate marked as not selected.",
      application: updated,
    });
  } catch (err: unknown) {
    console.error("Error setting final hiring decision:", err);
    const msg = err instanceof Error ? err.message : "Failed to record final hiring decision.";
    return NextResponse.json(
      { success: false, error: msg },
      { status: 400 }
    );
  }
}
