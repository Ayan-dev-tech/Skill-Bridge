import { NextResponse } from "next/server";
import { getAuthenticatedFaculty } from "@/lib/faculty/faculty-auth";
import { getFacultySkillGapOverview } from "@/lib/faculty/faculty-service";

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedFaculty(request);
    if (!auth.facultyUser) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: auth.status });
    }

    const data = await getFacultySkillGapOverview(auth.facultyUser.id);
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Faculty skill gaps API error:", error);
    return NextResponse.json({ error: "Failed to retrieve skill gaps overview." }, { status: 500 });
  }
}
