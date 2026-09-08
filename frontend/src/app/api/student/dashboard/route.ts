import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { defaultStudentProfile, type DashboardCurrentFocus, type DashboardSectionItem } from "@/lib/student-data";
import { getCanonicalWorkflowState, checkRouteAccess } from "@/lib/workflow/canonical-workflow";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in as a student." },
        { status: 401 }
      );
    }

    const canonicalWorkflow = await getCanonicalWorkflowState(student.id);

    if (!canonicalWorkflow.isVerificationCompleted) {
      return NextResponse.json({
        success: true,
        requiresVerification: true,
        redirectUrl: "/student/document-verification",
        error: "Document Verification is incomplete.",
      });
    }

    const verification = await db.getStudentVerification(student.id);
    const interestProfile = await db.getInterestProfile(student.id);
    const activeKnowledgeSession = await db.getActiveKnowledgeTestSessionByStudent(student.id);
    const latestKnowledgeResult = await db.getLatestKnowledgeTestResult(student.id);

    // Current Focus derived directly from canonical workflow state
    let currentFocus: DashboardCurrentFocus = {
      stage: 1,
      title: "Document Submission",
      subtitle:
        "Upload your required academic and identity documents to complete your student profile.",
      actionText: verification.documents.length > 0 ? "Complete Submission" : "Submit Documents",
      actionHref: "/student/document-verification",
      status: canonicalWorkflow.stages[0].status,
    };

    const skillGapAnalysis = await db.getSkillGapAnalysisByStudent(student.id);

    if (canonicalWorkflow.currentStageId === 2) {
      currentFocus = {
        stage: 2,
        title: "Interest Finder",
        subtitle:
          "Discover what engineering problems you genuinely enjoy solving through realistic technical scenarios.",
        actionText: canonicalWorkflow.stages[1].status === "in_progress" ? "Resume Exploration" : "Start Interest Finder",
        actionHref: "/student/interest-finder",
        status: canonicalWorkflow.stages[1].status,
      };
    } else if (canonicalWorkflow.currentStageId === 3) {
      currentFocus = {
        stage: 3,
        title: "Knowledge Testing",
        subtitle:
          "Measure what you already know in your chosen technical area with a calibrated 10-question evaluation.",
        actionText: activeKnowledgeSession ? "Resume Assessment" : "Begin Technical Benchmark",
        actionHref: "/student/knowledge-testing",
        status: canonicalWorkflow.stages[2].status,
      };
    } else if (canonicalWorkflow.currentStageId === 4) {
      currentFocus = {
        stage: 4,
        title: "Skill Gap & Suggestions",
        subtitle:
          "Analyze your knowledge benchmark against corporate recruitment criteria to identify focus areas.",
        actionText: "View Skill Gap Matrix",
        actionHref: "/student/skill-gap",
        status: canonicalWorkflow.stages[3].status,
      };
    } else if (canonicalWorkflow.currentStageId === 5) {
      currentFocus = {
        stage: 5,
        title: "Learning / Mentoring",
        subtitle:
          "Access curated curriculum tracks and faculty mentorship to close identified skill gaps.",
        actionText: "Explore Learning Modules",
        actionHref: "/student/learning",
        status: canonicalWorkflow.stages[4].status,
      };
    } else if (canonicalWorkflow.currentStageId === 6) {
      currentFocus = {
        stage: 6,
        title: "Resume Checker",
        subtitle:
          "Analyze your resume with ATS-style diagnostics, parseability checks, and keyword matching.",
        actionText: "Analyze Resume",
        actionHref: "/student/resume-checker",
        status: canonicalWorkflow.stages[5].status,
      };
    } else if (canonicalWorkflow.currentStageId === 7) {
      currentFocus = {
        stage: 7,
        title: "Jobs & Internships",
        subtitle:
          "Explore curated institutional campus drives, internships, and opportunities.",
        actionText: "Explore Opportunities",
        actionHref: "/student/opportunities",
        status: canonicalWorkflow.stages[6].status,
      };
    } else if (canonicalWorkflow.currentStageId === 8) {
      currentFocus = {
        stage: 8,
        title: "Track Applications",
        subtitle:
          "Monitor your interview schedules, shortlists, and offer status.",
        actionText: "View Applications",
        actionHref: "/student/applications",
        status: canonicalWorkflow.stages[7].status,
      };
    }

    const scoreVal = latestKnowledgeResult
      ? (latestKnowledgeResult.score ?? (latestKnowledgeResult.correctCount * 4))
      : null;

    // Real job applications count from database
    const jobApplications = await db.getJobApplicationsByStudent(student.id);

    // Real Statistics (strictly real account data)
    const stats = {
      knowledgeTestScore: scoreVal,
      knowledgeTestMaxScore: 40,
      knowledgeTestPercent: latestKnowledgeResult ? latestKnowledgeResult.scorePercent : null,
      knowledgeLevel: latestKnowledgeResult ? latestKnowledgeResult.knowledgeLevel : null,
      verifiedDocumentsCount: verification.verificationStatus === "VERIFIED" ? verification.documents.length : 0,
      totalDocumentsCount: verification.documents.length,
      skillGapsIdentified:
        skillGapAnalysis && !skillGapAnalysis.isStale
          ? skillGapAnalysis.skillGaps.length
          : latestKnowledgeResult
          ? latestKnowledgeResult.weaknesses.length
          : 0,
      activeApplicationsCount: jobApplications.length,
    };

    // Confirmed Interest Profile Summary
    const interestProfileData = interestProfile
      ? {
          domainId: interestProfile.confirmedMainDomainId,
          domainName: interestProfile.confirmedMainDomain,
          specificInterest: interestProfile.confirmedSpecificInterest,
          confidenceLevel: interestProfile.confidence >= 0.8 ? "High" : "Moderate",
          explanation: interestProfile.explanation,
          confirmedAt: interestProfile.confirmedAt,
        }
      : null;

    const studentName = student.fullName || "Student";
    const studentInfo = {
      id: student.id,
      name: studentName,
      fullName: studentName,
      email: student.email || defaultStudentProfile.email,
      university: defaultStudentProfile.institution,
      department: defaultStudentProfile.department,
      currentSemester: defaultStudentProfile.semester,
    };

    const formattedSections: DashboardSectionItem[] = canonicalWorkflow.stages.map((sec) => ({
      id: sec.slug,
      stage: sec.id,
      name: sec.name,
      description: sec.shortDescription,
      href: sec.route,
      status: sec.status as DashboardSectionItem["status"],
      lockReason: sec.lockedReason || null,
    }));

    return NextResponse.json({
      success: true,
      student: studentInfo,
      currentFocus,
      interestProfile: interestProfileData,
      statistics: stats,
      sections: formattedSections,
      isAdvancedVerified: canonicalWorkflow.isAdvancedVerified,
    });
  } catch (error) {
    console.error("Error fetching student dashboard data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}
