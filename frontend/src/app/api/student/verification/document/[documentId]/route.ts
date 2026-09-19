import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";

import { getSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { student } = await getAuthenticatedStudent(request);
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

    // 1. Attempt retrieval from Supabase Storage bucket: verification-documents
    const storageRef = docRecord.document.storagePath;
    let fileBuffer: Buffer | null = null;
    const contentType = docRecord.document.fileType || "application/octet-stream";

    try {
      const supabase = getSupabaseServerClient();
      const { data, error } = await supabase.storage
        .from("verification-documents")
        .download(storageRef);

      if (data && !error) {
        fileBuffer = Buffer.from(await data.arrayBuffer());
      }
    } catch (storageErr) {
      console.warn("Supabase storage download error:", storageErr);
    }

    if (!fileBuffer) {
      return NextResponse.json(
        { success: false, error: "File not found in Supabase storage." },
        { status: 404 }
      );
    }

    return new NextResponse(new Uint8Array(fileBuffer), {
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
