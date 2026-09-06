import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";

export async function POST(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    const body = await request.json();
    const { documentId } = body;

    if (!documentId) {
      return NextResponse.json(
        { success: false, error: "Document ID is required." },
        { status: 400 }
      );
    }

    const updated = await db.deleteVerificationDocument(student.id, documentId);

    return NextResponse.json({
      success: true,
      verification: updated,
    });
  } catch (error) {
    console.error("Delete document error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove document." },
      { status: 500 }
    );
  }
}
