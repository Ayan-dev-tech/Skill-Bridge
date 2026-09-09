import { NextResponse } from "next/server";
import { getAuthenticatedFaculty } from "@/lib/faculty/faculty-auth";
import { getFacultyReportsData } from "@/lib/faculty/faculty-service";

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedFaculty(request);
    if (!auth.facultyUser) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: auth.status });
    }

    const data = await getFacultyReportsData(auth.facultyUser.id);
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Faculty reports API error:", error);
    return NextResponse.json({ error: "Failed to retrieve faculty reports." }, { status: 500 });
  }
}
