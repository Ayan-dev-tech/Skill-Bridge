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
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in as a student." },
        { status: 401 }
      );
    }
    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    const documentType =
      (formData.get("documentType") as string | null) ||
      (formData.get("category") as string | null) ||
      "student_id";
    const replaceDocumentId = (formData.get("replaceDocumentId") as string | null) || undefined;
    const groupedTypes = new Set([
      "post_graduation_marksheet",
      "academic_certifications",
      "skill_certifications",
      "competitive_exam",
    ]);
    const groupId =
      (formData.get("groupId") as string | null) ||
      (groupedTypes.has(documentType) ? documentType : undefined);

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No document file provided." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Validate File Format, Magic Bytes, and Category Size Limits (e.g. 5 MB for certifications)
    const validation = DocumentVerificationService.validateFile(
      file.name,
      file.type,
      buffer.length,
      buffer,
      documentType
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
    const scopedStoragePath = `student/${student.id}/documents/${documentType}/${documentId}/${safeFileName}`;

    // 2. Save file securely to scoped private storage
    const uploadsDir = path.join(
      process.cwd(),
      "data",
      "storage",
      "verification-documents",
      "student",
      student.id,
      "documents",
      documentType,
      documentId
    );
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const localFilePath = path.join(uploadsDir, safeFileName);
    fs.writeFileSync(localFilePath, buffer);

    // 3. Save Document Metadata to Database Record (Zero OCR)
    const docRecord: VerificationDocumentRecord = {
      id: documentId,
      studentId: student.id,
      documentType,
      groupId: groupId || undefined,
      fileName: file.name,
      fileType: file.type,
      fileSizeBytes: buffer.length,
      storagePath: scopedStoragePath,
      uploadedAt: new Date().toISOString(),
      uploadStatus: "completed",
    };

    const updatedVerification = await db.saveVerificationDocument(
      student.id,
      docRecord,
      replaceDocumentId
    );

    return NextResponse.json({
      success: true,
      document: docRecord,
      verification: updatedVerification,
      message: `${file.name} uploaded successfully.`,
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
