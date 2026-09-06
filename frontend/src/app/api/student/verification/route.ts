import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { DOCUMENT_CATEGORIES } from "@/lib/verification/types";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    const verification = await db.getStudentVerification(student.id);

    const requiredTypes = ["student_id", "passport_photo", "post_graduation_marksheet", "abc_id"];
    const uploadedTypes = new Set(verification.documents.map((d) => d.documentType));

    const requiredCompleted = requiredTypes.filter((t) => uploadedTypes.has(t));
    const requiredCount = requiredCompleted.length;
    const allRequiredUploaded = requiredCount === requiredTypes.length;

    const optionalDocTypes = [
      "academic_certifications",
      "skill_certifications",
      "resume",
      "competitive_exam",
    ];
    const optionalDocsPresent = optionalDocTypes.filter((t) => uploadedTypes.has(t)).length;
    const socialPresent = Boolean(
      verification.professionalProfiles?.linkedIn ||
        verification.professionalProfiles?.gitHub ||
        verification.professionalProfiles?.portfolio ||
        verification.professionalProfiles?.other
    )
      ? 1
      : 0;
    const optionalCount = optionalDocsPresent + socialPresent;

    const isVerified = allRequiredUploaded && verification.verificationStatus === "VERIFIED";
    const canProceedToInterestFinder = isVerified;
    const canComplete = allRequiredUploaded;

    const missingRequired = requiredTypes
      .filter((t) => !uploadedTypes.has(t))
      .map((t) => {
        const cat = DOCUMENT_CATEGORIES.find((c) => c.id === t);
        return { id: t, title: cat?.title || t };
      });

    return NextResponse.json({
      success: true,
      verification,
      categories: DOCUMENT_CATEGORIES,
      summary: {
        requiredCount,
        requiredTotal: 4,
        requiredCompleted,
        missingRequired,
        allRequiredUploaded,
        optionalCount,
        optionalTotal: 5,
        isCompleted: isVerified,
        canComplete,
        canProceedToInterestFinder,
      },
      // Backward compatibility fields
      documentTypes: DOCUMENT_CATEGORIES,
      allRequiredUploaded,
      isVerified,
    });
  } catch (error) {
    console.error("Error fetching student verification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve verification status" },
      { status: 500 }
    );
  }
}
