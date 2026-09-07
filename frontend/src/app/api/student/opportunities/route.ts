import { NextResponse } from "next/server";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { db } from "@/lib/db";
import { getCanonicalWorkflowState } from "@/lib/workflow/canonical-workflow";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in as a student." },
        { status: 401 }
      );
    }

    const workflow = await getCanonicalWorkflowState(student.id);
    const isJobAccessUnlocked = workflow.isAdvancedVerified || workflow.isSkillGapCompleted;

    if (!isJobAccessUnlocked) {
      return NextResponse.json(
        {
          success: false,
          isLocked: true,
          error: "Complete the required learning stage or earn Advanced status to unlock job opportunities.",
          lockedReason: "Complete the required learning stage or earn Advanced status to unlock job opportunities.",
          redirectUrl: "/student/learning",
        },
        { status: 403 }
      );
    }

    const [jobs, internships] = await Promise.all([
      db.getAvailableJobs(),
      db.getAvailableInternships(),
    ]);

    return NextResponse.json({
      success: true,
      isLocked: false,
      isAdvancedVerified: workflow.isAdvancedVerified,
      unlockedVia: workflow.isAdvancedVerified ? "advanced_verification" : "learning_stage",
      jobs,
      internships,
      totalCount: jobs.length + internships.length,
    });
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch opportunities." },
      { status: 500 }
    );
  }
}
