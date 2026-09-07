import { NextResponse } from "next/server";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { analyzeResume } from "@/lib/resume/ats-analyzer";
import { PdfValidatorService } from "@/lib/resume/pdf-validator";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in as a student." },
        { status: 401 }
      );
    }

    const analysis = await db.getResumeAnalysisByStudent(student.id);

    return NextResponse.json({
      success: true,
      hasAnalysis: Boolean(analysis),
      analysis: analysis || null,
    });
  } catch (error) {
    console.error("Error retrieving resume analysis:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve resume analysis." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in as a student." },
        { status: 401 }
      );
    }

    const contentType = request.headers.get("content-type") || "";
    let fileBuffer: Buffer | null = null;
    let fileName = "";
    let mimeType = "";
    let jobDescription: string | undefined = undefined;
    let targetRole: string | undefined = undefined;

    if (contentType.includes("application/json")) {
      const body = await request.json();
      jobDescription = body.jobDescription || undefined;
      targetRole = body.targetRole || undefined;
      fileName = body.fileName || "resume.pdf";
      mimeType = body.mimeType || "application/pdf";

      // Rejection of raw text / non-PDF formats in JSON
      if (body.resumeText && !body.pdfBase64 && !body.fileBase64 && !body.pdfBuffer) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Resume Checker accepts PDF only (maximum 5 MB). Raw text, markdown, or docx uploads are not accepted. Please upload a valid PDF resume.",
          },
          { status: 400 }
        );
      }

      if (body.pdfBase64 || body.fileBase64) {
        const rawBase64 = (body.pdfBase64 || body.fileBase64).replace(/^data:application\/pdf;base64,/, "");
        fileBuffer = Buffer.from(rawBase64, "base64");
      } else if (body.pdfBuffer) {
        fileBuffer = Buffer.from(body.pdfBuffer);
      } else {
        return NextResponse.json(
          {
            success: false,
            error: "No PDF resume provided. Resume Checker accepts PDF only (maximum 5 MB).",
          },
          { status: 400 }
        );
      }
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      jobDescription = (formData.get("jobDescription") as string) || undefined;
      targetRole = (formData.get("targetRole") as string) || undefined;

      if (!file) {
        return NextResponse.json(
          {
            success: false,
            error: "No file uploaded. Please upload a PDF resume (maximum 5 MB).",
          },
          { status: 400 }
        );
      }

      fileName = file.name || "resume.pdf";
      mimeType = file.type || "application/pdf";
      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported Content-Type. Please upload your PDF resume using multipart/form-data.",
        },
        { status: 400 }
      );
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Empty file provided. Please upload a valid PDF resume.",
        },
        { status: 400 }
      );
    }

    // 1. Validate File Format, Extension, Size, Magic Bytes, and PDF Structure
    const pdfValidation = PdfValidatorService.validatePdfFile({
      fileName,
      mimeType,
      fileSize: fileBuffer.length,
      buffer: fileBuffer,
    });

    if (!pdfValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: pdfValidation.error || "Invalid PDF file.",
        },
        { status: 400 }
      );
    }

    // 2. Extract Text from PDF streams
    const extracted = PdfValidatorService.extractPdfText(fileBuffer);

    // 3. Classify Document: Resume vs. Meme, Poster, Certificate, Invoice, or Blank
    const classification = PdfValidatorService.classifyResumeDocument(extracted.text);

    if (!classification.isResume) {
      return NextResponse.json(
        {
          success: false,
          isResume: false,
          error:
            classification.reason ||
            "Document does not contain sufficient resume-like structure. Please upload a valid student or professional resume.",
          detectedSections: classification.detectedSections,
        },
        { status: 400 }
      );
    }

    // 4. Run ATS Diagnostic Analysis on extracted text
    const analysis = analyzeResume({
      studentId: student.id,
      resumeText: classification.extractedText,
      resumeFileName: fileName,
      jobDescription,
      targetRole,
      hasFormattingChallenges: classification.hasFormattingChallenges,
    });

    // Save to persistent database
    await db.saveResumeAnalysis(student.id, analysis);

    return NextResponse.json({
      success: true,
      isResume: true,
      analysis,
    });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json(
      {
        success: false,
        error: "ATS analysis could not be completed. Please ensure the PDF has readable text and try again.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    await db.deleteResumeAnalysis(student.id);

    return NextResponse.json({
      success: true,
      message: "Resume analysis cleared.",
    });
  } catch (error) {
    console.error("Error clearing resume analysis:", error);
    return NextResponse.json(
      { success: false, error: "Failed to clear resume analysis." },
      { status: 500 }
    );
  }
}
