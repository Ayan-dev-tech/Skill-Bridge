import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const overview = await db.getAdminOverview();
    return NextResponse.json({
      success: true,
      data: overview,
    });
  } catch (error) {
    console.error("Admin overview error:", error);
    return NextResponse.json(
      { error: "Failed to load admin overview data." },
      { status: 500 }
    );
  }
}
