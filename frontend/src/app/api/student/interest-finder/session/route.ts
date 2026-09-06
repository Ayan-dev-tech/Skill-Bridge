import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    const verification = await db.getStudentVerification(student.id);
    const isVerified = verification.verificationStatus === "VERIFIED";
    const confirmedProfile = await db.getInterestProfile(student.id);
    const activeSession = await db.getInterestSession(student.id);

    return NextResponse.json({
      success: true,
      student,
      confirmedProfile,
      activeSession,
      isVerified,
      requiresVerification: !isVerified,
    });
  } catch (error) {
    console.error("Interest Finder session error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve Interest Finder session." },
      { status: 500 }
    );
  }
}
