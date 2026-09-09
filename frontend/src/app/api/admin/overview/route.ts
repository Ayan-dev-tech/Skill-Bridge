import { NextResponse } from "next/server";
import { AdminLiveService } from "@/lib/admin/admin-service";

export async function GET() {
  try {
    const liveOverview = AdminLiveService.getLiveOverview();
    return NextResponse.json({
      success: true,
      data: liveOverview,
    });
  } catch (error) {
    console.error("Admin overview error:", error);
    return NextResponse.json(
      { error: "Failed to load admin live overview data." },
      { status: 500 }
    );
  }
}
