import { NextResponse } from "next/server";
import { AdminLiveService } from "@/lib/admin/admin-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, entityId, rawType, decision, reason } = body;

    if (!id || !entityId || !rawType || !decision) {
      return NextResponse.json(
        { error: "id, entityId, rawType, and decision are required." },
        { status: 400 }
      );
    }

    if (decision !== "approved" && decision !== "rejected") {
      return NextResponse.json(
        { error: "decision must be 'approved' or 'rejected'." },
        { status: 400 }
      );
    }

    const result = AdminLiveService.handleApprovalDecision(
      id,
      entityId,
      rawType,
      decision,
      reason
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Action failed" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      decision,
      item: result.item,
    });
  } catch (error) {
    console.error("Admin approval action error:", error);
    return NextResponse.json(
      { error: "Failed to process approval action." },
      { status: 500 }
    );
  }
}
