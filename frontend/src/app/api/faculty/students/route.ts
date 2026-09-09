import { NextResponse } from "next/server";
import { getAuthenticatedFaculty } from "@/lib/faculty/faculty-auth";
import { getAuthorizedStudents } from "@/lib/faculty/faculty-service";

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedFaculty(request);
    if (!auth.facultyUser) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const course = searchParams.get("course") || undefined;
    const semester = searchParams.get("semester") || undefined;
    const placementStatus = searchParams.get("placementStatus") || undefined;
    const needsAttention = searchParams.get("needsAttention") === "true";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const result = await getAuthorizedStudents(auth.facultyUser.id, {
      search,
      course,
      semester,
      placementStatus,
      needsAttention,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Faculty students API error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve authorized students." },
      { status: 500 }
    );
  }
}
