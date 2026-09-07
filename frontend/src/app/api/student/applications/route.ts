import { NextResponse } from "next/server";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { db } from "@/lib/db";
import { JobApplication, ApplicationTimelineEvent } from "@/lib/applications/types";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in as a student." },
        { status: 401 }
      );
    }

    // Single source of truth: fetch ONLY this student's applications
    const applications = await db.getJobApplicationsByStudent(student.id);

    return NextResponse.json({
      success: true,
      studentId: student.id,
      applications: applications || [],
      totalCount: applications?.length || 0,
    });
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch job applications." },
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

    const body = await request.json();
    const {
      jobId,
      companyName,
      roleTitle,
      location,
      employmentType,
      salaryRange,
      matchScoreAtApplication,
      applicantFullName,
      applicantEmail,
      applicantPhone,
      coverLetter,
      portfolioUrl,
      githubUrl,
      linkedinUrl,
      confirmed,
    } = body;

    // 1. Explicit Confirmation Gate: Click without confirmation does NOT create an application
    if (confirmed !== true && body.confirm !== true) {
      return NextResponse.json(
        {
          success: false,
          error: "Application must be reviewed and explicitly confirmed before submission.",
        },
        { status: 400 }
      );
    }

    // 2. Authoritative Opportunity Access Check
    const isAdvancedVerified = await db.isStudentAdvancedVerified(student.id);
    const skillGap = await db.getSkillGapAnalysisByStudent(student.id);
    const isSkillGapCompleted = Boolean(skillGap && !skillGap.isStale);

    if (!isAdvancedVerified && !isSkillGapCompleted) {
      return NextResponse.json(
        {
          success: false,
          error: "Access denied. Complete the required learning stage or earn Advanced verification to apply.",
          isLocked: true,
        },
        { status: 403 }
      );
    }

    // 3. Duplicate Application Protection
    if (jobId) {
      const existingApps = await db.getJobApplicationsByStudent(student.id);
      const duplicate = existingApps.find((a) => a.jobId === jobId);
      if (duplicate) {
        return NextResponse.json(
          {
            success: false,
            error: "You have already submitted an application for this opportunity.",
            alreadyApplied: true,
            existingApplicationId: duplicate.id,
          },
          { status: 409 }
        );
      }
    }

    // 4. Resume Readiness Requirement: Must have a validated resume in DB
    const resumeAnalysis = await db.getResumeAnalysisByStudent(student.id);
    if (!resumeAnalysis) {
      return NextResponse.json(
        {
          success: false,
          error: "Resume required. You must upload and validate a PDF resume in Resume Checker before submitting an application.",
          missingRequirement: "resume",
        },
        { status: 400 }
      );
    }

    // 5. Job Document Requirements Check
    let requiredDocumentTypes: string[] = ["student_id"];
    if (jobId) {
      const job = await db.getJobOrInternshipById(jobId);
      if (job?.requiredDocumentTypes && job.requiredDocumentTypes.length > 0) {
        requiredDocumentTypes = job.requiredDocumentTypes;
      }
    }

    const verification = await db.getStudentVerification(student.id);
    const uploadedTypes = new Set((verification?.documents || []).map((d) => d.documentType));
    const missingDocs = requiredDocumentTypes.filter((type) => !uploadedTypes.has(type));

    if (missingDocs.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Required application document missing (${missingDocs.join(", ")}). Please complete document submission before applying.`,
          missingRequirement: "document",
          missingDocumentTypes: missingDocs,
        },
        { status: 400 }
      );
    }

    const effectiveRoleTitle = roleTitle || "Engineering Role";
    const effectiveCompanyName = companyName || "Partner Company";

    const now = new Date().toISOString();
    const initialTimeline: ApplicationTimelineEvent[] = [
      {
        id: `ev-${Date.now()}`,
        status: "applied",
        title: "Application Submitted",
        description: `Application officially received for ${effectiveRoleTitle} at ${effectiveCompanyName}.`,
        timestamp: now,
      },
    ];

    const newApplication: JobApplication = {
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      studentId: student.id,
      jobId: jobId || undefined,
      companyName: effectiveCompanyName,
      roleTitle: effectiveRoleTitle,
      location: location || "Hybrid / Remote",
      employmentType: employmentType || "Full-time",
      salaryRange: salaryRange || undefined,
      status: "applied",
      appliedAt: now,
      updatedAt: now,
      matchScoreAtApplication: typeof matchScoreAtApplication === "number" ? matchScoreAtApplication : undefined,
      timeline: initialTimeline,
      notes: "Submitted via Skill Bridge Campus Placement Portal.",
      applicantFullName: applicantFullName || student.fullName || "Student Applicant",
      applicantEmail: applicantEmail || student.email,
      applicantPhone: applicantPhone,
      resumeFileName: resumeAnalysis.resumeFileName || "Resume.pdf",
      submittedDocumentTypes: requiredDocumentTypes,
      coverLetter,
      portfolioUrl,
      githubUrl,
      linkedinUrl,
    };

    await db.saveJobApplication(student.id, newApplication);

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully.",
        application: newApplication,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating job application:", error);
    if (error?.message?.includes("already submitted")) {
      return NextResponse.json(
        {
          success: false,
          error: "You have already submitted an application for this opportunity.",
          alreadyApplied: true,
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create application record." },
      { status: 500 }
    );
  }
}
