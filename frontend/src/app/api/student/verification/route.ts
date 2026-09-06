import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { CONFIGURABLE_DOCUMENT_TYPES } from "@/lib/verification/types";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    const verification = await db.getStudentVerification(student.id);

    const requiredTypes = CONFIGURABLE_DOCUMENT_TYPES.filter((t) => t.required).map((t) => t.id);
    const uploadedTypes = new Set(verification.documents.map((d) => d.documentType));
    const allRequiredUploaded = requiredTypes.every((t) => uploadedTypes.has(t));
    const faceCaptured = Boolean(verification.faceCapture && verification.faceCapture.qualityPassed);

    const isVerified = verification.verificationStatus === "VERIFIED";
    const canComplete = allRequiredUploaded && faceCaptured;

    return NextResponse.json({
      success: true,
      verification,
      documentTypes: CONFIGURABLE_DOCUMENT_TYPES,
      allRequiredUploaded,
      faceCaptured,
      isVerified,
      canProceedToInterestFinder: isVerified,
      canComplete,
    });
  } catch (error) {
    console.error("Error fetching student verification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve verification status" },
      { status: 500 }
    );
  }
}
