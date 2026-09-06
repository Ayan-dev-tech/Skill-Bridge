import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { DocumentVerificationService } from "@/lib/verification/service";
import type { FaceCaptureRecord } from "@/lib/verification/types";

export async function POST(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    const body = await request.json();
    const { imageBase64, captureMode = "auto" } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { success: false, error: "No face capture image data provided." },
        { status: 400 }
      );
    }

    // 1. Verify via Python Face Verification Microservice
    const result = await DocumentVerificationService.verifyLiveFace(
      imageBase64,
      captureMode,
      student.id
    );

    if (!result.verified) {
      return NextResponse.json({
        success: false,
        error: result.message || "Face not clearly detected. Please try again.",
        checks: result.checks,
      }, { status: 422 });
    }

    // 2. Persist captured image securely in scoped private storage
    const captureId = crypto.randomUUID();
    const uploadsDir = path.join(
      process.cwd(),
      "data",
      "storage",
      "verification-documents",
      "student",
      student.id,
      "verification",
      "face",
      captureId
    );
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const safeFileName = `face_${captureMode}_${Date.now()}.jpg`;
    const localFilePath = path.join(uploadsDir, safeFileName);
    const rawData = imageBase64.includes(",") ? imageBase64.split(",")[1] : imageBase64;
    fs.writeFileSync(localFilePath, Buffer.from(rawData, "base64"));

    const scopedStoragePath = `student/${student.id}/verification/face/${captureId}/${safeFileName}`;

    const captureRecord: FaceCaptureRecord = {
      id: captureId,
      studentId: student.id,
      storagePath: scopedStoragePath,
      capturedAt: new Date().toISOString(),
      captureMode,
      faceDetected: true,
      qualityPassed: true,
      confidence: result.confidence,
      checks: {
        resolutionOk: result.checks.resolutionOk,
        lightingOk: result.checks.lightingOk,
        contrastOk: result.checks.contrastOk,
        centered: result.checks.centered,
      },
    };

    const updated = await db.saveFaceCapture(student.id, captureRecord);

    return NextResponse.json({
      success: true,
      faceCapture: captureRecord,
      verification: updated,
      message: "Face verified and captured successfully.",
    });
  } catch (error) {
    console.error("Face capture API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process face capture." },
      { status: 500 }
    );
  }
}
