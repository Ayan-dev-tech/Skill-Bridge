import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { CONFIGURABLE_DOCUMENT_TYPES } from "@/lib/verification/types";

export async function POST(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    const verification = await db.getStudentVerification(student.id);

    // Validate that at least required documents are uploaded
    const requiredTypes = CONFIGURABLE_DOCUMENT_TYPES.filter((t) => t.required).map((t) => t.id);
    const uploadedTypes = new Set(verification.documents.map((d) => d.documentType));
    const allRequiredPresent = requiredTypes.every((t) => uploadedTypes.has(t));

    if (!allRequiredPresent) {
      return NextResponse.json(
        {
          success: false,
          error: "Please upload all required verification documents before completing verification.",
        },
        { status: 400 }
      );
    }

    if (!verification.faceCapture || !verification.faceCapture.qualityPassed) {
      return NextResponse.json(
        {
          success: false,
          error: "Live face capture verification must be completed.",
        },
        { status: 400 }
      );
    }

    const completed = await db.completeStudentVerification(student.id);

    return NextResponse.json({
      success: true,
      message: "Verification completed successfully.",
      verification: completed,
      redirectUrl: "/student/interest-finder",
    });
  } catch (error) {
    console.error("Complete verification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to finalize verification." },
      { status: 500 }
    );
  }
}
