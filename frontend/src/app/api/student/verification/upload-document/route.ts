import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { DocumentVerificationService } from "@/lib/verification/service";
import type { VerificationDocumentRecord } from "@/lib/verification/types";

export async function POST(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    const documentType = (formData.get("documentType") as string | null) || "student_id";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No document file provided." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Validate File Format & Magic Bytes
    const validation = DocumentVerificationService.validateFile(
      file.name,
      file.type,
      buffer
    );

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error || "Invalid file format." },
        { status: 400 }
      );
    }

    const documentId = crypto.randomUUID();
    const fileExt = path.extname(file.name) || (file.type === "application/pdf" ? ".pdf" : ".jpg");
    const safeFileName = `${documentType}_${Date.now()}${fileExt}`;
    const scopedStoragePath = `student/${student.id}/verification/${documentId}/${safeFileName}`;

    // 2. Save file securely to scoped private storage
    const uploadsDir = path.join(
      process.cwd(),
      "data",
      "storage",
      "verification-documents",
      "student",
      student.id,
      "verification",
      documentId
    );
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const localFilePath = path.join(uploadsDir, safeFileName);
    fs.writeFileSync(localFilePath, buffer);

    // 3. Process via Python OCR Microservice (Real OCR)
    const ocrData = await DocumentVerificationService.processOcr(
      buffer,
      file.name,
      file.type,
      documentType,
      student.id
    );

    // 4. Save to Database Record
    const docRecord: VerificationDocumentRecord = {
      id: documentId,
      studentId: student.id,
      documentType,
      fileName: file.name,
      fileType: file.type,
      fileSizeBytes: buffer.length,
      storagePath: scopedStoragePath,
      uploadedAt: new Date().toISOString(),
      ocrStatus: ocrData.isDocumentValid ? "completed" : "failed",
      ocrData,
    };

    const updatedVerification = await db.saveVerificationDocument(student.id, docRecord);

    return NextResponse.json({
      success: true,
      document: docRecord,
      verification: updatedVerification,
    });
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during document upload.";
    console.error("Upload document API error:", errorMsg);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 400 }
    );
  }
}
