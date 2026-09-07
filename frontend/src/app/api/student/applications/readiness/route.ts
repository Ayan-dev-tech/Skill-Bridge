import { NextResponse } from "next/server";
import { getAuthenticatedStudent } from "@/lib/student-auth";
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

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json(
        { success: false, error: "jobId query parameter is required." },
        { status: 400 }
      );
    }

    // 1. Fetch Opportunity Details
    const job = await db.getJobOrInternshipById(jobId);
    if (!job) {
      return NextResponse.json(
        { success: false, error: "Opportunity not found." },
        { status: 404 }
      );
    }

    // 2. Opportunities Access Check (Advanced verified OR reached Learning stage)
    const isAdvancedVerified = await db.isStudentAdvancedVerified(student.id);
    const skillGapAnalysis = await db.getSkillGapAnalysisByStudent(student.id);
    const isSkillGapCompleted = Boolean(skillGapAnalysis && !skillGapAnalysis.isStale);
    const hasOpportunityAccess = isAdvancedVerified || isSkillGapCompleted;

    // 3. Duplicate Application Check
    const existingApps = await db.getJobApplicationsByStudent(student.id);
    const alreadyApplied = existingApps.some((a) => a.jobId === jobId);

    // 4. Student Profile Check
    const userRecord = await db.getUser(student.id);
    const profileRecord = await db.getProfile(student.id);
    const fullName = userRecord?.fullName || student.fullName || "";
    const email = userRecord?.email || student.email || "";
    const phone = (profileRecord?.metadata?.phone as string) || "";
    const profileComplete = Boolean(fullName && email);

    // 5. Valid Resume Check
    const resumeAnalysis = await db.getResumeAnalysisByStudent(student.id);
    const hasValidResume = Boolean(resumeAnalysis);

    // 6. Required Documents Check against this specific job's requirements
    const requiredDocumentTypes = job.requiredDocumentTypes || ["student_id"];
    const verificationRecord = await db.getStudentVerification(student.id);
    const uploadedDocTypes = new Set(
      (verificationRecord?.documents || []).map((d) => d.documentType)
    );
    const missingDocumentTypes = requiredDocumentTypes.filter((t) => !uploadedDocTypes.has(t));
    const allDocumentsPresent = missingDocumentTypes.length === 0;

    // 7. Calculate Strengths & Gaps (Actual student data + resume vs job required skills)
    const jobSkills = job.requiredSkills || [];
    const matchedSkills = new Set<string>();
    const missingSkills = new Set<string>();

    if (resumeAnalysis) {
      for (const skill of jobSkills) {
        const lowerSkill = skill.toLowerCase();
        const inMatched = resumeAnalysis.matchedKeywords.some((k) => k.toLowerCase().includes(lowerSkill) || lowerSkill.includes(k.toLowerCase()));
        if (inMatched) {
          matchedSkills.add(skill);
        } else {
          missingSkills.add(skill);
        }
      }
    } else {
      for (const skill of jobSkills) {
        missingSkills.add(skill);
      }
    }

    const strengths = Array.from(matchedSkills);
    const gaps = Array.from(missingSkills);
    const matchPercentage = jobSkills.length > 0 ? Math.round((strengths.length / jobSkills.length) * 100) : 100;

    let recommendation: "Strong Match" | "Reasonable Match" | "Needs Improvement" = "Needs Improvement";
    if (matchPercentage >= 70) {
      recommendation = "Strong Match";
    } else if (matchPercentage >= 40) {
      recommendation = "Reasonable Match";
    }

    const isReady =
      hasOpportunityAccess &&
      profileComplete &&
      hasValidResume &&
      allDocumentsPresent &&
      !alreadyApplied;

    return NextResponse.json({
      success: true,
      jobId,
      jobTitle: job.roleTitle,
      companyName: job.companyName,
      hasOpportunityAccess,
      alreadyApplied,
      isReady,
      profile: {
        isComplete: profileComplete,
        fullName,
        email,
        phone,
      },
      resume: {
        hasResume: hasValidResume,
        fileName: resumeAnalysis?.resumeFileName || null,
        overallScore: resumeAnalysis?.overallScore || null,
        jobMatchScore: matchPercentage,
        disclaimer: "ATS scores are estimates and can vary between hiring systems.",
      },
      documents: {
        allPresent: allDocumentsPresent,
        requiredDocumentTypes,
        missingDocumentTypes,
      },
      matching: {
        matchPercentage,
        strengths,
        gaps,
        recommendation,
      },
    });
  } catch (error) {
    console.error("Error evaluating application readiness:", error);
    return NextResponse.json(
      { success: false, error: "Failed to evaluate application readiness." },
      { status: 500 }
    );
  }
}
