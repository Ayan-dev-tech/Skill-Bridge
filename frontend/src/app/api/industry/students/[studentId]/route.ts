import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";

export async function GET(
  request: Request,
  props: { params: Promise<{ studentId: string }> }
) {
  try {
    const { industryUser, error } = await getAuthenticatedIndustry(request);
    if (!industryUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized access." },
        { status: 401 }
      );
    }

    const { studentId } = await props.params;
    if (!studentId) {
      return NextResponse.json(
        { success: false, error: "Student ID is required." },
        { status: 400 }
      );
    }

    const studentTalent = await db.getPermittedStudentTalentById(studentId);
    if (!studentTalent) {
      return NextResponse.json(
        { success: false, error: "Student candidate not found or not yet verified." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      student: studentTalent,
    });
  } catch (err) {
    console.error("Error retrieving student details:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve student details." },
      { status: 500 }
    );
  }
}
