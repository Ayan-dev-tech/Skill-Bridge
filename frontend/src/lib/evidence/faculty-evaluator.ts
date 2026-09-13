/**
 * Skill-Bridge — Faculty Evidence Evaluation & Verification Engine (Step 10)
 * Strengthened verification layer supporting:
 * - Authoritative Faculty Decision: VERIFIED or REJECTED
 * - Immutable Competency Audit Ledger (previous rating, new rating, evaluator, decision, evidence quality, timestamp)
 * - Safe signed URL generation for private PDF inspection
 * - Skill Passport competency progression on verified decisions
 * - Pending Evidence Queue retrieval for Faculty dashboards
 */

import { supabaseDb } from "@/lib/supabase-db";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import type {
  AyushCompetencyHistoryRecord,
  AyushStudentDevelopmentPlan,
} from "@/lib/ayush/types";

export interface FacultyVerificationParams {
  planId: string;
  facultyId: string;
  decision?: "VERIFIED" | "REJECTED";
  facultyFinalRating?: number; // 1.0 - 5.0 (required if decision is VERIFIED)
  facultyFeedback: string;
}

export interface VerificationResult {
  success: boolean;
  decision: "VERIFIED" | "REJECTED";
  historyRecord: AyushCompetencyHistoryRecord;
  updatedPlan: AyushStudentDevelopmentPlan;
  previousRating: number;
  newRating: number;
  improvementDelta: number;
  message: string;
}

export interface PendingEvidenceItem {
  planId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  roleId: string;
  competencyId: string;
  competencyName: string;
  interventionId: string;
  interventionTitle: string;
  interventionType: string;
  baselineLevel: number;
  targetLevel: number;
  evidenceFilePath?: string | null;
  evidenceFileName?: string | null;
  signedEvidenceUrl?: string | null;
  extractedText?: string | null;
  extractionStatus?: string | null;
  evidenceQuality?: "DIRECT_TEXT" | "SCANNED_OCR" | "SCAN_FAILED" | string | null;
  evidenceStatus: string;
  aiExpectedRating?: number | null;
  aiConfidence?: number | null;
  aiFeedback?: string | null;
  submittedAt?: string | null;
  studentNotes?: string | null;
}

export class FacultyEvaluator {
  /**
   * Finalizes an intervention evaluation with authoritative faculty review.
   * Supports both VERIFIED (approval with rating) and REJECTED (rejection with feedback).
   * Generates an immutable audit trail entry in ayush_competency_history.
   */
  static async verifyEvidenceWithFinalRating(
    params: FacultyVerificationParams
  ): Promise<VerificationResult> {
    const { planId, facultyId, decision = "VERIFIED", facultyFinalRating, facultyFeedback } = params;

    if (!facultyFeedback || !facultyFeedback.trim()) {
      throw new Error("Faculty evaluation feedback is required for audit verification.");
    }

    const isVerified = decision === "VERIFIED";

    // Validate rating range when approving
    if (isVerified) {
      if (facultyFinalRating == null || facultyFinalRating < 1.0 || facultyFinalRating > 5.0) {
        throw new Error("Faculty final rating must be between 1.0 and 5.0 for verified approvals.");
      }
    }

    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();

    // 1. Fetch target development plan
    const { data: planData, error: planError } = await supabase
      .from("ayush_student_development_plans")
      .select("*, ayush_development_interventions(*)")
      .eq("id", planId)
      .single();

    if (planError || !planData) {
      throw new Error(`Development plan '${planId}' not found.`);
    }

    const studentId = planData.student_id;
    const competencyId = planData.competency_id;
    const roleId = planData.role_id;
    const interventionId = planData.intervention_id;

    // 2. Determine previous verified baseline rating from competency history or baselineLevel
    const { data: existingHistory } = await supabase
      .from("ayush_competency_history")
      .select("faculty_final_rating")
      .eq("student_id", studentId)
      .eq("competency_id", competencyId)
      .eq("decision", "VERIFIED")
      .order("verified_at", { ascending: false })
      .limit(1);

    const previousRating =
      existingHistory && existingHistory.length > 0 && existingHistory[0].faculty_final_rating != null
        ? Number(existingHistory[0].faculty_final_rating)
        : Number(planData.baseline_level || 1.0);

    const roundedFinalRating = isVerified
      ? Number(facultyFinalRating!.toFixed(1))
      : previousRating;

    const improvementDelta = isVerified
      ? Number((roundedFinalRating - previousRating).toFixed(1))
      : 0;

    const evidenceQuality = planData.evidence_quality || planData.extraction_status || "DIRECT_TEXT";

    // 3. Create immutable competency history record (Audit Trail)
    const historyId = `hist_${Date.now()}_${studentId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8)}`;
    const historyRecord: AyushCompetencyHistoryRecord = {
      id: historyId,
      studentId,
      competencyId,
      roleId,
      planId,
      interventionId,
      previousRating,
      aiExpectedRating: planData.ai_expected_rating != null ? Number(planData.ai_expected_rating) : null,
      facultyFinalRating: roundedFinalRating,
      improvementDelta,
      decision,
      evidenceQuality,
      evaluatorId: facultyId,
      evaluatorFeedback: facultyFeedback.trim(),
      evidenceFilePath: planData.evidence_file_path || null,
      verifiedAt: now,
      createdAt: now,
    };

    const { error: histError } = await supabase.from("ayush_competency_history").insert({
      id: historyRecord.id,
      student_id: historyRecord.studentId,
      competency_id: historyRecord.competencyId,
      role_id: historyRecord.roleId,
      plan_id: historyRecord.planId,
      intervention_id: historyRecord.interventionId,
      previous_rating: historyRecord.previousRating,
      ai_expected_rating: historyRecord.aiExpectedRating,
      faculty_final_rating: historyRecord.facultyFinalRating,
      improvement_delta: historyRecord.improvementDelta,
      decision,
      evidence_quality: evidenceQuality,
      evaluator_id: historyRecord.evaluatorId,
      evaluator_feedback: historyRecord.evaluatorFeedback,
      evidence_file_path: historyRecord.evidenceFilePath,
      verified_at: historyRecord.verifiedAt,
      created_at: historyRecord.createdAt,
    });

    if (histError) {
      console.error("Failed to insert competency history audit record:", histError);
      throw new Error(`Database error saving competency history: ${histError.message}`);
    }

    // 4. Update development plan status
    const updatePayload: Record<string, any> = {
      status: isVerified ? "VERIFIED" : "REJECTED",
      evidence_status: isVerified ? "VERIFIED" : "REJECTED",
      faculty_final_rating: isVerified ? roundedFinalRating : null,
      faculty_feedback: facultyFeedback.trim(),
      faculty_id: facultyId,
      verified_at: now,
      updated_at: now,
    };

    if (isVerified) {
      updatePayload.completed_at = now;
    }

    const { data: updatedPlanData, error: updateError } = await supabase
      .from("ayush_student_development_plans")
      .update(updatePayload)
      .eq("id", planId)
      .select("*, ayush_development_interventions(*)")
      .single();

    if (updateError || !updatedPlanData) {
      throw new Error(`Failed to update development plan status: ${updateError?.message}`);
    }

    // 5. Update student's AyushSkillPassport verified competency rating ONLY if VERIFIED
    if (isVerified) {
      try {
        const passport = await supabaseDb.getAyushSkillPassport(studentId);
        if (passport && passport.competencies && Array.isArray(passport.competencies)) {
          let matched = false;
          const updatedCompetencies = passport.competencies.map((comp) => {
            if (comp.id === competencyId) {
              matched = true;
              return {
                ...comp,
                targetLevel: Math.max(comp.targetLevel, Math.round(roundedFinalRating)),
                currentLevel: roundedFinalRating,
                demonstratedAt: now,
                verifiedBy: `Faculty Reviewer (${facultyId})`,
              };
            }
            return comp;
          });

          if (!matched) {
            updatedCompetencies.push({
              id: competencyId,
              name: planData.ayush_development_interventions?.title || competencyId,
              title: planData.ayush_development_interventions?.title || competencyId,
              category: "Verified Competency",
              domain: "Ayurveda & Integrative Healthcare",
              targetLevel: Math.round(roundedFinalRating),
              currentLevel: roundedFinalRating,
              description: "Demonstrated through verified AYUSH development intervention.",
              demonstratedAt: now,
              verifiedBy: `Faculty Reviewer (${facultyId})`,
            } as any);
          }

          passport.competencies = updatedCompetencies;
          passport.updatedAt = now;
          await supabaseDb.saveAyushSkillPassport(passport);
        }
      } catch (passportErr) {
        console.warn("Non-fatal: could not update passport competency array directly:", passportErr);
      }
    }

    return {
      success: true,
      decision,
      historyRecord,
      updatedPlan: {
        id: updatedPlanData.id,
        studentId: updatedPlanData.student_id,
        roleId: updatedPlanData.role_id,
        competencyId: updatedPlanData.competency_id,
        baselineLevel: Number(updatedPlanData.baseline_level),
        targetLevel: Number(updatedPlanData.target_level),
        interventionId: updatedPlanData.intervention_id,
        status: updatedPlanData.status,
        startedAt: updatedPlanData.started_at,
        completedAt: updatedPlanData.completed_at,
        evidenceStatus: updatedPlanData.evidence_status,
        evidenceSubmission: updatedPlanData.evidence_submission,
        evidenceFilePath: updatedPlanData.evidence_file_path,
        evidenceFileName: updatedPlanData.evidence_file_name,
        evidenceFileSize: updatedPlanData.evidence_file_size ? Number(updatedPlanData.evidence_file_size) : null,
        evidenceMimeType: updatedPlanData.evidence_mime_type,
        extractedText: updatedPlanData.extracted_text,
        extractionStatus: updatedPlanData.extraction_status,
        evidenceQuality: updatedPlanData.evidence_quality,
        aiExpectedRating: updatedPlanData.ai_expected_rating ? Number(updatedPlanData.ai_expected_rating) : null,
        aiConfidence: updatedPlanData.ai_confidence ? Number(updatedPlanData.ai_confidence) : null,
        aiEvaluation: updatedPlanData.ai_evaluation,
        facultyFinalRating: updatedPlanData.faculty_final_rating ? Number(updatedPlanData.faculty_final_rating) : null,
        facultyFeedback: updatedPlanData.faculty_feedback,
        facultyId: updatedPlanData.faculty_id,
        verifiedAt: updatedPlanData.verified_at,
        createdAt: updatedPlanData.created_at,
        updatedAt: updatedPlanData.updated_at,
      },
      previousRating,
      newRating: roundedFinalRating,
      improvementDelta,
      message: isVerified
        ? `Evidence verified successfully with rating ${roundedFinalRating}/5.0 (+${improvementDelta.toFixed(1)} delta recorded).`
        : `Evidence submission rejected with faculty feedback recorded.`,
    };
  }

  /**
   * Retrieves pending evidence submissions for faculty review.
   * Includes signed storage URLs for authorized PDF inspection.
   */
  static async getPendingEvidenceQueue(facultyId?: string): Promise<PendingEvidenceItem[]> {
    const supabase = getSupabaseServerClient();

    const { data: plans, error: plansError } = await supabase
      .from("ayush_student_development_plans")
      .select("*, ayush_development_interventions(*)")
      .in("evidence_status", ["SUBMITTED", "AI_REVIEWED", "FACULTY_REVIEW"])
      .order("updated_at", { ascending: false });

    if (plansError || !plans) {
      console.warn("Could not retrieve pending plans:", plansError);
      return [];
    }

    // Fetch student profile names
    const studentIds = Array.from(new Set(plans.map((p) => p.student_id)));
    const { data: students } = await supabase
      .from("users")
      .select("id, full_name, email")
      .in("id", studentIds);

    const studentMap = new Map<string, { name: string; email: string }>();
    if (students) {
      for (const s of students) {
        studentMap.set(s.id, { name: s.full_name || "AYUSH Scholar", email: s.email });
      }
    }

    const items: PendingEvidenceItem[] = [];

    for (const plan of plans) {
      const studentInfo = studentMap.get(plan.student_id) || {
        name: "AYUSH Scholar",
        email: `scholar_${plan.student_id.slice(0, 8)}@university.edu`,
      };

      let signedEvidenceUrl: string | null = null;
      if (plan.evidence_file_path) {
        try {
          const { data: signedData } = await supabase.storage
            .from("intervention-evidence")
            .createSignedUrl(plan.evidence_file_path, 3600);
          signedEvidenceUrl = signedData?.signedUrl || null;
        } catch {
          // Non-fatal if storage signature is skipped in offline dev
        }
      }

      const intervention = plan.ayush_development_interventions;
      const sub = plan.evidence_submission || {};

      items.push({
        planId: plan.id,
        studentId: plan.student_id,
        studentName: studentInfo.name,
        studentEmail: studentInfo.email,
        roleId: plan.role_id,
        competencyId: plan.competency_id,
        competencyName: intervention?.title || plan.competency_id,
        interventionId: plan.intervention_id,
        interventionTitle: intervention?.title || "Intervention milestone",
        interventionType: intervention?.type || "PORTFOLIO",
        baselineLevel: Number(plan.baseline_level || 1),
        targetLevel: Number(plan.target_level || 3),
        evidenceFilePath: plan.evidence_file_path,
        evidenceFileName: plan.evidence_file_name,
        signedEvidenceUrl,
        extractedText: plan.extracted_text,
        extractionStatus: plan.extraction_status,
        evidenceQuality: plan.evidence_quality || plan.extraction_status || (plan.extraction_status === "SCAN_FAILED" ? "SCAN_FAILED" : "DIRECT_TEXT"),
        evidenceStatus: plan.evidence_status || "SUBMITTED",
        aiExpectedRating: plan.ai_expected_rating != null ? Number(plan.ai_expected_rating) : null,
        aiConfidence: plan.ai_confidence != null ? Number(plan.ai_confidence) : null,
        aiFeedback: plan.ai_evaluation?.feedback || null,
        submittedAt: sub.submittedAt || plan.updated_at,
        studentNotes: sub.studentNotes || null,
      });
    }

    return items;
  }

  /**
   * Retrieves the immutable competency audit trail for a student.
   */
  static async getCompetencyAuditTrail(
    studentId: string,
    competencyId?: string
  ): Promise<AyushCompetencyHistoryRecord[]> {
    const supabase = getSupabaseServerClient();
    let query = supabase
      .from("ayush_competency_history")
      .select("*")
      .eq("student_id", studentId);

    if (competencyId) {
      query = query.eq("competency_id", competencyId);
    }

    const { data, error } = await query.order("verified_at", { ascending: false });
    if (error || !data) return [];

    return data.map((row) => ({
      id: row.id,
      studentId: row.student_id,
      competencyId: row.competency_id,
      roleId: row.role_id,
      planId: row.plan_id,
      interventionId: row.intervention_id,
      previousRating: Number(row.previous_rating || 0),
      aiExpectedRating: row.ai_expected_rating != null ? Number(row.ai_expected_rating) : null,
      facultyFinalRating: Number(row.faculty_final_rating || 0),
      improvementDelta: Number(row.improvement_delta || 0),
      decision: row.decision || "VERIFIED",
      evidenceQuality: row.evidence_quality || null,
      evaluatorId: row.evaluator_id,
      evaluatorFeedback: row.evaluator_feedback,
      evidenceFilePath: row.evidence_file_path,
      verifiedAt: row.verified_at,
      createdAt: row.created_at,
    }));
  }
}
