/**
 * GET /api/student/interventions/competency-history
 * Retrieves immutable competency history progression records for a student.
 */

import { NextResponse } from "next/server";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const competencyId = searchParams.get("competencyId");

    const supabase = getSupabaseServerClient();
    let query = supabase
      .from("ayush_competency_history")
      .select("*")
      .eq("student_id", student.id);

    if (competencyId) {
      query = query.eq("competency_id", competencyId);
    }

    const { data, error } = await query.order("verified_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      history: data || [],
    });
  } catch (error) {
    console.error("Failed to fetch competency history:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to load competency history.",
      },
      { status: 500 }
    );
  }
}
