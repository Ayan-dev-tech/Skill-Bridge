import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedCampus } from "@/lib/campus/campus-auth";

export async function GET(request: Request) {
  try {
    const { campusUser, error, status: authStatus } = await getAuthenticatedCampus(request);
    if (!campusUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: authStatus || 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const facultyId = searchParams.get("facultyId");

    if (facultyId) {
      const facultyDetail = await db.getCampusFacultyDetail(campusUser.id, facultyId);
      if (!facultyDetail) {
        return NextResponse.json({ success: false, error: "Faculty member not found." }, { status: 404 });
      }
      return NextResponse.json({ success: true, faculty: facultyDetail });
    }

    const search = searchParams.get("search") || "";
    const department = searchParams.get("department") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const response = await db.getCampusFaculty(campusUser.id, {
      search,
      department,
      status,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      ...response,
    });
  } catch (error) {
    console.error("Error fetching campus faculty:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load faculty records" },
      { status: 500 }
    );
  }
}
