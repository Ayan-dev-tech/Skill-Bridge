import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in as a student." },
        { status: 401 }
      );
    }
    const { documentId } = await params;

    if (!documentId) {
      return NextResponse.json(
        { success: false, error: "Document ID is required." },
        { status: 400 }
      );
    }

    const docRecord = await db.findVerificationDocumentById(documentId);

    if (!docRecord) {
      return NextResponse.json(
        { success: false, error: "Document not found." },
        { status: 404 }
      );
    }

    // Strict Authorization: Student cannot access another student's document
    if (docRecord.studentId !== student.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Access denied. You do not have permission to access another student's document.",
        },
        { status: 403 }
      );
    }

    // Serve document from scoped storage
    const storageRef = docRecord.document.storagePath;
    const baseStorageDir = path.join(process.cwd(), "data", "storage", "verification-documents");
    const safeFilePath = path.resolve(baseStorageDir, storageRef);

    // Prevent directory traversal
    if (!safeFilePath.startsWith(baseStorageDir) || !fs.existsSync(safeFilePath)) {
      return NextResponse.json(
        { success: false, error: "File not found in storage." },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(safeFilePath);
    const contentType = docRecord.document.fileType || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(docRecord.document.fileName)}"`,
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Document fetch authorization error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error fetching document." },
      { status: 500 }
    );
  }
}
