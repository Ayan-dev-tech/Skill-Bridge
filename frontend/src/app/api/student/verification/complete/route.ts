import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";

const REQUIRED_CATEGORIES = [
  "student_id",
  "passport_photo",
  "post_graduation_marksheet",
  "abc_id",
];

export async function POST(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in as a student." },
        { status: 401 }
      );
    }
    const verification = await db.getStudentVerification(student.id);

    // Validate that all 4 required document categories are uploaded
    const uploadedTypes = new Set(verification.documents.map((d) => d.documentType));
    const missing = REQUIRED_CATEGORIES.filter((t) => !uploadedTypes.has(t));

    if (missing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please upload all 4 required documents (Student ID, Passport Sized Photo, Post Graduation Marksheet, and ABC ID) before completing submission.",
          missing,
        },
        { status: 400 }
      );
    }

    const completed = await db.completeStudentVerification(student.id);

    return NextResponse.json({
      success: true,
      status: "VERIFIED",
      message: "Document Submission completed successfully.",
      verification: completed,
      redirectUrl: "/student/interest-finder",
      redirectTo: "/student/interest-finder",
    });
  } catch (error) {
    console.error("Complete verification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to finalize document submission." },
      { status: 500 }
    );
  }
}
