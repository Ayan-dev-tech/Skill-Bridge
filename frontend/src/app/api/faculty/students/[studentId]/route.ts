import { NextResponse } from "next/server";
import { getAuthenticatedFaculty } from "@/lib/faculty/faculty-auth";
import { getFacultyStudentDetail } from "@/lib/faculty/faculty-service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ studentId: string }> }
) {
  try {
    const auth = await getAuthenticatedFaculty(request);
    if (!auth.facultyUser) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: auth.status });
    }

    const { studentId } = await params;
    if (!studentId) {
      return NextResponse.json({ error: "Student ID is required." }, { status: 400 });
    }

    const studentDetail = await getFacultyStudentDetail(auth.facultyUser.id, studentId);
    if (!studentDetail) {
      return NextResponse.json(
        { error: "Student not found or not authorized under your academic department/cohort." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: studentDetail,
    });
  } catch (error) {
    console.error("Faculty student detail API error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve student details." },
      { status: 500 }
    );
  }
}
