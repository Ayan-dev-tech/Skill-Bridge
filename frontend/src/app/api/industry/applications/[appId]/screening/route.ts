import { NextResponse } from "next/server";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";
import { db } from "@/lib/db";

export async function PATCH(
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
    const { decision, notes } = body;

    if (!decision || !["shortlisted", "rejected", "screened"].includes(decision)) {
      return NextResponse.json(
        { success: false, error: "Decision must be one of: 'shortlisted', 'rejected', 'screened'." },
        { status: 400 }
      );
    }

    const updated = await db.updateApplicationScreening(industryUser.id, appId, decision, notes);

    return NextResponse.json({
      success: true,
      message: `Screening decision recorded: ${decision}.`,
      application: updated,
    });
  } catch (err: unknown) {
    console.error("Error updating screening decision:", err);
    const msg = err instanceof Error ? err.message : "Failed to update screening decision.";
    return NextResponse.json(
      { success: false, error: msg },
      { status: 400 }
    );
  }
}
