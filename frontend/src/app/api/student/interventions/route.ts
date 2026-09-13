/**
 * /api/student/interventions
 * 
 * Supports the closed-loop development intervention workflow:
 * - GET: View recommended interventions for target role + student's active development plans
 * - POST:
 *   - START: Start an intervention (sets status to IN_PROGRESS, sets startedAt)
 *   - COMPLETE: Mark an intervention completed (sets status to COMPLETED / EVIDENCE_PENDING)
 *   - SUBMIT_EVIDENCE: Attach verification evidence (sets evidenceStatus to SUBMITTED)
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { recommendInterventionsForRole } from "@/lib/ayush/interventions";
import { createDefaultSkillPassport } from "@/lib/ayush/passport";
import type { DevelopmentPlanStatus } from "@/lib/ayush/types";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student) {
       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const roleId = searchParams.get("roleId") || "ayush-clinical-research";

    let passport = await db.getAyushSkillPassport(student.id);
    if (!passport) {
      passport = createDefaultSkillPassport(student.id, student.fullName);
      await db.saveAyushSkillPassport(passport);
    }

    const availableInterventions = await db.getDevelopmentInterventions(true);
    const recommendations = recommendInterventionsForRole(
      student.id,
      roleId,
      passport,
      availableInterventions
    );

    const activePlans = await db.getStudentDevelopmentPlans(student.id, roleId);

    return NextResponse.json({
      success: true,
      roleId,
      recommendations,
      activePlans,
    });
  } catch (error) {
    console.error("Failed to fetch development interventions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve development interventions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { action } = body;

    if (action === "START") {
      const { roleId, competencyId, interventionId, baselineLevel, targetLevel } = body;
      if (!roleId || !competencyId || !interventionId) {
        return NextResponse.json(
          { success: false, error: "Missing required fields for starting intervention" },
          { status: 400 }
        );
      }

      const plan = await db.createOrUpdateDevelopmentPlan({
        studentId: student.id,
        roleId,
        competencyId,
        interventionId,
        baselineLevel: baselineLevel ?? 1,
        targetLevel: targetLevel ?? 3,
        status: "IN_PROGRESS",
        startedAt: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: "Intervention started successfully",
        plan,
      });
    }

    if (action === "COMPLETE" || action === "SUBMIT_EVIDENCE") {
      const { planId, evidenceSubmission, requiresEvidenceReview } = body;
      if (!planId) {
        return NextResponse.json(
          { success: false, error: "Missing planId" },
          { status: 400 }
        );
      }

      const nextStatus: DevelopmentPlanStatus =
        action === "SUBMIT_EVIDENCE" || requiresEvidenceReview
          ? "EVIDENCE_PENDING"
          : "COMPLETED";

      const updated = await db.updateDevelopmentPlanStatus(
        planId,
        nextStatus,
        evidenceSubmission
      );

      if (!updated) {
        return NextResponse.json(
          { success: false, error: "Development plan not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message:
          nextStatus === "EVIDENCE_PENDING"
            ? "Evidence submitted successfully. Pending faculty/mentor verification."
            : "Intervention marked as completed.",
        plan: updated,
      });
    }

    return NextResponse.json(
      { success: false, error: `Unsupported action: ${action}` },
      { status: 400 }
    );
  } catch (error) {
    console.error("Failed to process development plan action:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process intervention action" },
      { status: 500 }
    );
  }
}
