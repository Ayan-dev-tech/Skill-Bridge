/**
 * GET /api/campus/ayush-intelligence
 * Campus / Institution Intelligence API endpoint (Step 14).
 * Returns institutional aggregated readiness, top gaps, intervention throughput, and progress.
 */

import { NextResponse } from "next/server";
import { getAuthenticatedCampus } from "@/lib/campus/campus-auth";
import { getCampusAyushIntelligence } from "@/lib/ayush/institution-intelligence";

export async function GET(request: Request) {
  try {
    const { campusUser, error, status } = await getAuthenticatedCampus(request);
    if (!campusUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized. Campus access only." },
        { status: status || 401 }
      );
    }

    const data = await getCampusAyushIntelligence(campusUser.id);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Campus AYUSH intelligence API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve campus intelligence data." },
      { status: 500 }
    );
  }
}
