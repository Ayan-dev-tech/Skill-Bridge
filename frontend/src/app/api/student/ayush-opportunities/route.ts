/**
 * GET /api/student/ayush-opportunities
 * POST /api/student/ayush-opportunities
 *
 * Provides authenticated student access to discovered AYUSH opportunities
 * with live role/competency matching and manual ingestion/refresh triggers.
 */

import { NextResponse } from "next/server";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import {
  getDiscoveredOpportunities,
  ingestAyushOpportunities,
} from "@/lib/ayush/opportunity-discovery";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Student session required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const roleId = searchParams.get("roleId") || undefined;
    const type = searchParams.get("type") || undefined;

    const opportunities = await getDiscoveredOpportunities(student.id, {
      roleId,
      type,
    });

    return NextResponse.json({
      success: true,
      opportunities,
      totalCount: opportunities.length,
    });
  } catch (error) {
    console.error("Failed to load AYUSH opportunities:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to load opportunities.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Student session required." },
        { status: 401 }
      );
    }

    const result = await ingestAyushOpportunities();

    return NextResponse.json({
      success: true,
      message: `Discovered and normalized ${result.ingestedCount} AYUSH opportunities.`,
      ingestedCount: result.ingestedCount,
      opportunities: result.opportunities,
    });
  } catch (error) {
    console.error("Failed to refresh AYUSH opportunities:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to refresh opportunities.",
      },
      { status: 500 }
    );
  }
}
