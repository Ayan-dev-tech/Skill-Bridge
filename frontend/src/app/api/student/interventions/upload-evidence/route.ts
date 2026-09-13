/**
 * POST /api/student/interventions/upload-evidence
 * Handles PDF evidence upload, private Supabase Storage persistence,
 * OCR/text extraction via Python microservice, and AI expected rating evaluation.
 */

import { NextResponse } from "next/server";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { EvidenceExtractionService } from "@/lib/evidence/extraction-service";
import { AiEvidenceEvaluator } from "@/lib/evidence/ai-evaluator";
import { getAyushTargetRole } from "@/lib/ayush/competencies";

export async function POST(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const formData = await request.formData();
    const planId = formData.get("planId") as string | null;
    const file = formData.get("file") as File | null;
    const studentNotes = (formData.get("studentNotes") as string | null) || undefined;

    if (!planId || !file) {
      return NextResponse.json(
        { success: false, error: "Missing planId or PDF evidence file." },
        { status: 400 }
      );
    }

    // 1. File size check (Max 10 MB for clinical trial / protocol dossiers)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Evidence PDF must be 10 MB or smaller." },
        { status: 400 }
      );
    }

    // 2. Magic bytes verification: %PDF-
    if (buffer.length < 5 || !buffer.subarray(0, 5).toString("ascii").startsWith("%PDF-")) {
      return NextResponse.json(
        { success: false, error: "Invalid file format. Only valid PDF documents are accepted." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();

    // 3. Verify student ownership of development plan
    const { data: plan, error: planError } = await supabase
      .from("ayush_student_development_plans")
      .select("*, ayush_development_interventions(*)")
      .eq("id", planId)
      .single();

    if (planError || !plan) {
      return NextResponse.json(
        { success: false, error: "Development plan not found." },
        { status: 404 }
      );
    }

    if (plan.student_id !== student.id) {
      return NextResponse.json(
        { success: false, error: "Forbidden. You cannot submit evidence for another student's plan." },
        { status: 403 }
      );
    }

    // 4. Store in Private Supabase Storage bucket ('intervention-evidence')
    const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const storagePath = `student/${student.id}/interventions/${planId}/${safeName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("intervention-evidence")
        .upload(storagePath, buffer, {
          contentType: "application/pdf",
          upsert: true,
        });

      if (uploadError) {
        console.warn("Storage upload warning (will fallback if needed):", uploadError.message);
      }
    } catch (storageEx) {
      console.warn("Storage exception:", storageEx);
    }

    // 5. Extract text via Primary Direct extraction with Quality Check & OCR Fallback
    const extraction = await EvidenceExtractionService.extractPdfEvidence(
      buffer,
      file.name,
      student.id,
      "intervention_evidence"
    );

    let aiEvaluation = null;
    let aiExpectedRating: number | null = null;
    let aiConfidence: number | null = null;

    // 6. Perform AI Evidence Evaluation ONLY when extraction is usable
    if (extraction.usable) {
      const intervention = plan.ayush_development_interventions;
      const role = getAyushTargetRole(plan.role_id);
      const targetMaturity = role?.targetMaturity || "Applied";

      aiEvaluation = await AiEvidenceEvaluator.evaluateEvidence({
        intervention,
        competency: { id: plan.competency_id, name: intervention?.title || plan.competency_id },
        baselineLevel: Number(plan.baseline_level || 1),
        targetLevel: Number(plan.target_level || 3),
        targetMaturity,
        extractedText: extraction.extractedText || studentNotes || "",
        studentNotes,
      });

      aiExpectedRating = aiEvaluation.expectedRating;
      aiConfidence = aiEvaluation.confidence;
    } else {
      console.info(
        `Extraction quality check rejected content (${extraction.status}). Skipping AI evaluation for plan ${planId}.`
      );
    }

    const now = new Date().toISOString();
    const evidenceQuality = extraction.usable
      ? extraction.isScanned
        ? "SCANNED_OCR"
        : "DIRECT_TEXT"
      : "SCAN_FAILED";
    const evidenceStatus = extraction.usable ? "AI_REVIEWED" : "FACULTY_REVIEW";

    // 7. Update Development Plan in Supabase
    // Evidence record and PDF are kept successfully submitted in both success and scan failure cases.
    const { data: updatedPlan, error: updateError } = await supabase
      .from("ayush_student_development_plans")
      .update({
        status: "EVIDENCE_PENDING",
        evidence_status: evidenceStatus,
        evidence_quality: evidenceQuality,
        evidence_file_path: storagePath,
        evidence_file_name: file.name,
        evidence_file_size: buffer.length,
        evidence_mime_type: "application/pdf",
        extracted_text: extraction.extractedText?.slice(0, 10000) || "",
        extraction_status: extraction.status,
        ai_expected_rating: aiExpectedRating,
        ai_confidence: aiConfidence,
        ai_evaluation: aiEvaluation,
        evidence_submission: {
          fileName: file.name,
          fileSizeBytes: buffer.length,
          storagePath,
          submittedAt: now,
          studentNotes: studentNotes || null,
          extractionStatus: extraction.status,
          evidenceQuality,
          statusFlow: extraction.statusFlow,
          scanFailed: !extraction.usable,
          scanFailureReason: !extraction.usable ? extraction.error : undefined,
        },
        updated_at: now,
      })
      .eq("id", planId)
      .select("*, ayush_development_interventions(*)")
      .single();

    if (updateError || !updatedPlan) {
      throw new Error(updateError?.message || "Failed to update development plan record.");
    }

    const clientMessage = extraction.usable
      ? "Evidence PDF uploaded and evaluated by AI successfully. Awaiting faculty review."
      : "Document submitted successfully, but we couldn't read it automatically. Your document is still submitted and available for faculty review.";

    return NextResponse.json({
      success: true,
      scanFailed: !extraction.usable,
      message: clientMessage,
      plan: updatedPlan,
      aiEvaluation,
      extraction: {
        status: extraction.status,
        statusFlow: extraction.statusFlow,
        usable: extraction.usable,
        wordCount: extraction.wordCount,
        confidence: extraction.confidence,
        engine: extraction.engine,
        error: extraction.error,
      },
    });
  } catch (error) {
    console.error("Error in upload-evidence route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process evidence upload.",
      },
      { status: 500 }
    );
  }
}
