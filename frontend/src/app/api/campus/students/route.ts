import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedCampus } from "@/lib/campus/campus-auth";

export async function GET(request: Request) {
  try {
    const { campusUser, error, status } = await getAuthenticatedCampus(request);
    if (!campusUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: status || 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const department = searchParams.get("department") || "";
    const batchYear = searchParams.get("batchYear") || "";
    const verifiedStatus = searchParams.get("verifiedStatus") || "";
    const placementStatus = searchParams.get("placementStatus") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const studentId = searchParams.get("studentId");
    if (studentId) {
      const studentDetail = await db.getCampusStudentDetail(campusUser.id, studentId);
      if (!studentDetail) {
        return NextResponse.json({ success: false, error: "Student not found." }, { status: 404 });
      }
      return NextResponse.json({ success: true, student: studentDetail });
    }

    const response = await db.getCampusStudents(campusUser.id, {
      search,
      department,
      batchYear,
      verifiedStatus,
      placementStatus,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      ...response,
    });
  } catch (error) {
    console.error("Error fetching campus students:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load student data" },
      { status: 500 }
    );
  }
}