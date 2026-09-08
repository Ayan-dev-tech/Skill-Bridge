import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";

export async function POST(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);

    await db.clearInterestSession(student.id);

    return NextResponse.json({
      success: true,
      message: "Discovery session cleared.",
    });
  } catch (error) {
    console.error("Error resetting discovery session:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reset discovery session." },
      { status: 500 }
    );
  }
}
