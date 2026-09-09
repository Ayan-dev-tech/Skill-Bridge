import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { getCanonicalWorkflowState, checkRouteAccess } from "@/lib/workflow/canonical-workflow";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    const { searchParams } = new URL(request.url);
    const checkPath = searchParams.get("checkPath");

    const workflow = await getCanonicalWorkflowState(student.id);
    const verification = await db.getStudentVerification(student.id);
    const passportDoc = verification?.documents?.find((d: { documentType: string; id: string }) => d.documentType === "passport_photo");
    const passportPhotoUrl = passportDoc ? `/api/student/verification/document/${passportDoc.id}` : undefined;

    let routeCheck = undefined;
    if (checkPath) {
      routeCheck = await checkRouteAccess(student.id, checkPath);
    }

    return NextResponse.json({
      success: true,
      studentId: student.id,
      workflow,
      routeCheck,
      passportPhotoUrl,
    });
  } catch (error) {
    console.error("Workflow status API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load canonical workflow status." },
      { status: 500 }
    );
  }
}
