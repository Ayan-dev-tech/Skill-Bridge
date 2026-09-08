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

    const updated = await db.updateApplicationInterview(industryUser.id, appId, body);

    return NextResponse.json({
      success: true,
      message: "Interview round and evaluation saved successfully.",
      application: updated,
    });
  } catch (err: unknown) {
    console.error("Error updating interview information:", err);
    const msg = err instanceof Error ? err.message : "Failed to update interview evaluation.";
    return NextResponse.json(
      { success: false, error: msg },
      { status: 400 }
    );
  }
}
