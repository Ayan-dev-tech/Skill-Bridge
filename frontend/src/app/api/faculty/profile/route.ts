import { NextResponse } from "next/server";
import { getAuthenticatedFaculty } from "@/lib/faculty/faculty-auth";
import { getFacultyProfileData, updateFacultyProfile } from "@/lib/faculty/faculty-service";

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedFaculty(request);
    if (!auth.facultyUser) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: auth.status });
    }

    const profile = await getFacultyProfileData(auth.facultyUser.id);
    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("Faculty profile GET error:", error);
    return NextResponse.json({ error: "Failed to retrieve faculty profile." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const auth = await getAuthenticatedFaculty(request);
    if (!auth.facultyUser) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: auth.status });
    }

    const body = await request.json();
    const { phone, officeLocation, bio, subjects } = body;

    const updated = await updateFacultyProfile(auth.facultyUser.id, {
      phone,
      officeLocation,
      bio,
      subjects,
    });

    return NextResponse.json({
      success: true,
      message: "Faculty profile updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("Faculty profile PUT error:", error);
    return NextResponse.json({ error: "Failed to update faculty profile." }, { status: 500 });
  }
}
