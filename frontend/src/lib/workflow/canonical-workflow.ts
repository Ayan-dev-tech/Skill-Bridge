import { db } from "@/lib/db";
import type { WorkflowStageStatus } from "@/lib/student-data";

export interface CanonicalStageItem {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  route: string;
  status: WorkflowStageStatus;
  statusLabel: string;
  isLocked: boolean;
  lockedReason?: string;
  actionText: string;
}

export interface CanonicalWorkflowState {
  studentId: string;
  currentStageId: number;
  currentStageSlug: string;
  isVerificationCompleted: boolean;
  isInterestFinderCompleted: boolean;
  isKnowledgeTestCompleted: boolean;
  isSkillGapCompleted: boolean;
  isLearningCompleted: boolean;
  isAdvancedVerified: boolean;
  stages: CanonicalStageItem[];
  allowedRoutes: string[];
}

export const CANONICAL_STAGE_DEFINITIONS = [
  {
    id: 1,
    slug: "document-verification",
    name: "Document Submission",
    shortDescription: "Upload required academic and identity documents to complete your student profile",
    route: "/student/document-verification",
  },
  {
    id: 2,
    slug: "interest-finder",
    name: "Interest Finder",
    shortDescription: "Discover your technical niche within broad engineering domains",
    route: "/student/interest-finder",
  },
  {
    id: 3,
    slug: "knowledge-testing",
    name: "Knowledge Testing",
    shortDescription: "Benchmark foundational and practical technical proficiency",
    route: "/student/knowledge-testing",
  },
  {
    id: 4,
    slug: "skill-gap",
    name: "Skill Gap & Suggestions",
    shortDescription: "Identify curriculum deficits vs. corporate recruitment criteria",
    route: "/student/skill-gap",
  },
  {
    id: 5,
    slug: "learning",
    name: "Learning / Mentoring",
    shortDescription: "Access curated curriculum tracks and faculty mentorship",
    route: "/student/learning",
  },
  {
    id: 6,
    slug: "resume",
    name: "Resume Checker",
    shortDescription: "Analyze your resume with ATS-style diagnostics, parseability checks, and keyword matching",
    route: "/student/resume-checker",
  },
  {
    id: 7,
    slug: "opportunities",
    name: "Jobs & Internships",
    shortDescription: "Explore curated institutional campus drives and internships",
    route: "/student/opportunities",
  },
  {
    id: 8,
    slug: "applications",
    name: "Track Applications",
    shortDescription: "Monitor interview schedules, shortlists, and offer status",
    route: "/student/applications",
  },
] as const;

/**
 * Single source of truth for the Skill Bridge student workflow state.
 * All route guards, sidebars, dashboard widgets, and APIs derive gating from here.
 */
export async function getCanonicalWorkflowState(
  studentId: string
): Promise<CanonicalWorkflowState> {
  const verification = await db.getStudentVerification(studentId);
  const interestProfile = await db.getInterestProfile(studentId);
  const activeInterestSession = await db.getInterestSession(studentId);
  const activeKnowledgeSession = await db.getActiveKnowledgeTestSessionByStudent(studentId);
  const latestKnowledgeResult = await db.getLatestKnowledgeTestResult(studentId);

  const REQUIRED_VERIFICATION_CATEGORIES = [
    "student_id",
    "passport_photo",
    "post_graduation_marksheet",
    "abc_id",
  ] as const;
  const uploadedDocTypes = new Set(verification.documents.map((d) => d.documentType));
  const allRequiredPresent = REQUIRED_VERIFICATION_CATEGORIES.every((t) =>
    uploadedDocTypes.has(t)
  );

  // Single truth: isVerificationCompleted is strictly true ONLY when all 4 required categories are uploaded
  const isVerificationCompleted =
    allRequiredPresent && verification.verificationStatus === "VERIFIED";
  const isVerificationInProgress =
    !isVerificationCompleted &&
    (verification.documents.length > 0 ||
      verification.verificationStatus === "DOCUMENTS_PENDING");

  const isInterestFinderCompleted = isVerificationCompleted && Boolean(interestProfile);
  const isInterestFinderInProgress =
    isVerificationCompleted &&
    !isInterestFinderCompleted &&
    Boolean(activeInterestSession && activeInterestSession.status !== "confirmed");

  const isKnowledgeTestCompleted = isInterestFinderCompleted && Boolean(latestKnowledgeResult);
  const isKnowledgeTestInProgress =
    isInterestFinderCompleted &&
    !isKnowledgeTestCompleted &&
    Boolean(activeKnowledgeSession);

  const isAdvancedVerified = await db.isStudentAdvancedVerified(studentId);

  // Skill Gap completed when non-stale analysis exists
  const skillGapAnalysis = await db.getSkillGapAnalysisByStudent(studentId);
  const isSkillGapCompleted =
    isKnowledgeTestCompleted &&
    Boolean(skillGapAnalysis && !skillGapAnalysis.isStale);

  const isLearningCompleted = false;
  const isOpportunitiesCompleted = false;
  const isJobAccessUnlocked = isAdvancedVerified || isSkillGapCompleted;

  // Check if resume analysis exists
  const resumeAnalysis = await db.getResumeAnalysisByStudent(studentId);
  const isResumeAnalysisPresent = Boolean(resumeAnalysis);

  // Check if job applications exist
  const applications = await db.getJobApplicationsByStudent(studentId);
  const hasApplications = applications.length > 0;

  // Determine current focus stage in sequential order
  let currentStageId = 1;
  if (!isVerificationCompleted) {
    currentStageId = 1;
  } else if (!isInterestFinderCompleted) {
    currentStageId = 2;
  } else if (!isKnowledgeTestCompleted) {
    currentStageId = 3;
  } else if (!isSkillGapCompleted) {
    currentStageId = 4;
  } else if (!isLearningCompleted) {
    currentStageId = 5;
  } else if (!isResumeAnalysisPresent) {
    currentStageId = 6;
  } else if (!isOpportunitiesCompleted) {
    currentStageId = 7;
  } else {
    currentStageId = 8;
  }

  const allowedRoutes: string[] = [
    "/student",
    "/student/dashboard",
    "/student/profile",
    "/student/settings",
    "/student/about",
    "/student/document-verification", // Stage 1 is always accessible
    "/student/resume-checker", // Available from the beginning
    "/student/resume", // Route alias
    "/student/applications", // Track Applications visible and accessible from the beginning
  ];

  if (isJobAccessUnlocked) {
    allowedRoutes.push("/student/opportunities", "/student/jobs");
  }

  const stages: CanonicalStageItem[] = [
    {
      id: 1,
      slug: "document-verification",
      name: "Document Submission",
      shortDescription: "Upload required academic and identity documents to complete your student profile",
      route: "/student/document-verification",
      status: isVerificationCompleted
        ? "completed"
        : isVerificationInProgress
        ? "in_progress"
        : "available",
      statusLabel: isVerificationCompleted
        ? "Completed"
        : isVerificationInProgress
        ? "In Progress"
        : "Available",
      isLocked: false,
      actionText: isVerificationCompleted
        ? "View Submitted Documents"
        : isVerificationInProgress
        ? "Complete Submission"
        : "Submit Documents",
    },
    {
      id: 2,
      slug: "interest-finder",
      name: "Interest Finder",
      shortDescription: "Discover your technical niche within broad engineering domains",
      route: "/student/interest-finder",
      status: isInterestFinderCompleted
        ? "completed"
        : isInterestFinderInProgress
        ? "in_progress"
        : isVerificationCompleted
        ? "available"
        : "locked",
      statusLabel: isInterestFinderCompleted
        ? "Completed"
        : isInterestFinderInProgress
        ? "In Progress"
        : isVerificationCompleted
        ? "Available"
        : "Locked",
      isLocked: !isVerificationCompleted,
      lockedReason: !isVerificationCompleted
        ? "Complete Document Submission to unlock Interest Finder."
        : undefined,
      actionText: isInterestFinderCompleted
        ? "Review Profile"
        : isInterestFinderInProgress
        ? "Resume Exploration"
        : isVerificationCompleted
        ? "Start Exploration"
        : "Locked",
    },
    {
      id: 3,
      slug: "knowledge-testing",
      name: "Knowledge Testing",
      shortDescription: "Benchmark foundational and practical technical proficiency",
      route: "/student/knowledge-testing",
      status: isKnowledgeTestCompleted
        ? "completed"
        : isKnowledgeTestInProgress
        ? "in_progress"
        : isInterestFinderCompleted
        ? "available"
        : "locked",
      statusLabel: isKnowledgeTestCompleted
        ? "Completed"
        : isKnowledgeTestInProgress
        ? "In Progress"
        : isInterestFinderCompleted
        ? "Available"
        : "Locked",
      isLocked: !isInterestFinderCompleted,
      lockedReason: !isVerificationCompleted
        ? "Complete Document Submission first."
        : !isInterestFinderCompleted
        ? "Complete Interest Finder to unlock Knowledge Testing."
        : undefined,
      actionText: isKnowledgeTestCompleted
        ? "View Report"
        : isKnowledgeTestInProgress
        ? "Resume Test"
        : isInterestFinderCompleted
        ? "Begin Assessment"
        : "Locked",
    },
    {
      id: 4,
      slug: "skill-gap",
      name: "Skill Gap & Suggestions",
      shortDescription: "Identify curriculum deficits vs. corporate recruitment criteria",
      route: "/student/skill-gap",
      status: isSkillGapCompleted
        ? "completed"
        : isKnowledgeTestCompleted
        ? "available"
        : "locked",
      statusLabel: isSkillGapCompleted
        ? "Completed"
        : isKnowledgeTestCompleted
        ? "Available"
        : "Locked",
      isLocked: !isKnowledgeTestCompleted,
      lockedReason: !isKnowledgeTestCompleted
        ? "Complete Knowledge Testing to unlock Skill Gap Analysis."
        : undefined,
      actionText: isSkillGapCompleted
        ? "Review Skill Gap"
        : isKnowledgeTestCompleted
        ? "View Skill Gap"
        : "Locked",
    },
    {
      id: 5,
      slug: "learning",
      name: "Learning / Mentoring",
      shortDescription: "Access curated curriculum tracks and faculty mentorship",
      route: "/student/learning",
      status: isLearningCompleted
        ? "completed"
        : isSkillGapCompleted
        ? "available"
        : "locked",
      statusLabel: isLearningCompleted
        ? "Completed"
        : isSkillGapCompleted
        ? "Available"
        : "Locked",
      isLocked: !isSkillGapCompleted,
      lockedReason: !isSkillGapCompleted
        ? "Complete Skill Gap Analysis to unlock Learning & Mentoring."
        : undefined,
      actionText: isLearningCompleted
        ? "Review Resources"
        : isSkillGapCompleted
        ? "Access Resources"
        : "Locked",
    },
    {
      id: 6,
      slug: "resume",
      name: "Resume Checker",
      shortDescription: "Analyze your resume with ATS-style diagnostics, parseability checks, and keyword matching",
      route: "/student/resume-checker",
      status: isResumeAnalysisPresent ? "completed" : "available",
      statusLabel: isResumeAnalysisPresent ? "Analyzed" : "Available",
      isLocked: false,
      actionText: isResumeAnalysisPresent ? "View Analysis" : "Check Resume",
    },
    {
      id: 7,
      slug: "opportunities",
      name: "Jobs & Internships",
      shortDescription: "Explore curated institutional campus drives and internships",
      route: "/student/opportunities",
      status: isOpportunitiesCompleted
        ? "completed"
        : isJobAccessUnlocked
        ? "available"
        : "locked",
      statusLabel: isOpportunitiesCompleted
        ? "Completed"
        : isAdvancedVerified
        ? "Advanced Access"
        : isJobAccessUnlocked
        ? "Available"
        : "Locked",
      isLocked: !isJobAccessUnlocked,
      lockedReason: !isJobAccessUnlocked
        ? "Complete the required learning stage to unlock job opportunities."
        : undefined,
      actionText: isJobAccessUnlocked ? "Explore Opportunities" : "Locked",
    },
    {
      id: 8,
      slug: "applications",
      name: "Track Applications",
      shortDescription: "Monitor interview schedules, shortlists, and offer status",
      route: "/student/applications",
      status: hasApplications ? "in_progress" : "available",
      statusLabel: hasApplications ? `${applications.length} Active` : "Available",
      isLocked: false,
      actionText: hasApplications ? "View Applications" : "Track Applications",
    },
  ];

  for (const stage of stages) {
    if (!stage.isLocked && !allowedRoutes.includes(stage.route)) {
      allowedRoutes.push(stage.route);
    }
  }

  const currentStageSlug =
    stages.find((s) => s.id === currentStageId)?.slug || "document-verification";

  return {
    studentId,
    currentStageId,
    currentStageSlug,
    isVerificationCompleted,
    isInterestFinderCompleted,
    isKnowledgeTestCompleted,
    isSkillGapCompleted,
    isLearningCompleted,
    isAdvancedVerified,
    stages,
    allowedRoutes,
  };
}

/**
 * Strict Route Authorization Guard
 * Enforces canonical workflow gating against direct URL navigation, sidebar, or bookmarks.
 */
export async function checkRouteAccess(
  studentId: string,
  pathname: string
): Promise<{ allowed: boolean; redirectUrl?: string; reason?: string }> {
  // Always allowed general utility pages
  if (
    pathname === "/student/profile" ||
    pathname === "/student/settings" ||
    pathname === "/student/about"
  ) {
    return { allowed: true };
  }

  const workflow = await getCanonicalWorkflowState(studentId);

  // Base /student and /student/dashboard entry points: redirect based on verification status
  if (
    pathname === "/student" ||
    pathname === "/student/" ||
    pathname === "/student/dashboard" ||
    pathname === "/student/dashboard/"
  ) {
    if (!workflow.isVerificationCompleted) {
      return {
        allowed: false,
        redirectUrl: "/student/document-verification",
        reason: "Complete Document Submission to access the Student Dashboard.",
      };
    }
    return { allowed: true };
  }

  // Stage 1: Document Submission is ALWAYS accessible (including aliases)
  if (
    pathname.startsWith("/student/document-verification") ||
    pathname.startsWith("/student/documents")
  ) {
    return { allowed: true };
  }

  // Stage 2: Interest Finder requires Stage 1 (Document Submission) COMPLETED
  if (
    pathname.startsWith("/student/interest-finder") ||
    pathname.startsWith("/student/interest-discovery")
  ) {
    if (!workflow.isVerificationCompleted) {
      return {
        allowed: false,
        redirectUrl: "/student/document-verification",
        reason: "Complete Document Submission before accessing Interest Finder.",
      };
    }
    return { allowed: true };
  }

  // Stage 3: Knowledge Testing requires Stage 1 & Stage 2 COMPLETED
  if (pathname.startsWith("/student/knowledge-testing")) {
    if (!workflow.isVerificationCompleted) {
      return {
        allowed: false,
        redirectUrl: "/student/document-verification",
        reason: "Complete Document Submission before accessing Knowledge Testing.",
      };
    }
    if (!workflow.isInterestFinderCompleted) {
      return {
        allowed: false,
        redirectUrl: "/student/interest-finder",
        reason: "Complete Interest Finder before accessing Knowledge Testing.",
      };
    }
    return { allowed: true };
  }

  // Stage 4: Skill Gap requires Stage 3 COMPLETED
  if (pathname.startsWith("/student/skill-gap")) {
    if (!workflow.isVerificationCompleted) {
      return {
        allowed: false,
        redirectUrl: "/student/document-verification",
        reason: "Complete Document Submission first.",
      };
    }
    if (!workflow.isInterestFinderCompleted) {
      return {
        allowed: false,
        redirectUrl: "/student/interest-finder",
        reason: "Complete Interest Finder first.",
      };
    }
    if (!workflow.isKnowledgeTestCompleted) {
      return {
        allowed: false,
        redirectUrl: "/student/knowledge-testing",
        reason: "Complete Knowledge Testing before accessing Skill Gap.",
      };
    }
    return { allowed: true };
  }

  // Stage 5: Learning / Mentoring requires Stage 4 COMPLETED
  if (pathname.startsWith("/student/learning")) {
    if (!workflow.isVerificationCompleted) {
      return {
        allowed: false,
        redirectUrl: "/student/document-verification",
        reason: "Complete Document Submission first.",
      };
    }
    if (!workflow.isInterestFinderCompleted) {
      return {
        allowed: false,
        redirectUrl: "/student/interest-finder",
        reason: "Complete Interest Finder first.",
      };
    }
    if (!workflow.isKnowledgeTestCompleted) {
      return {
        allowed: false,
        redirectUrl: "/student/knowledge-testing",
        reason: "Complete Knowledge Testing first.",
      };
    }
    if (!workflow.isSkillGapCompleted) {
      return {
        allowed: false,
        redirectUrl: "/student/skill-gap",
        reason: "Complete Skill Gap Analysis before accessing Learning & Mentoring.",
      };
    }
    return { allowed: true };
  }

  // Stage 6: Resume Checker is ALWAYS available for ALL students from the start
  if (
    pathname.startsWith("/student/resume-checker") ||
    pathname.startsWith("/student/resume")
  ) {
    return { allowed: true };
  }

  // Stage 8: Track Applications is ALWAYS visible and accessible even with 0 applications
  if (
    pathname.startsWith("/student/applications") ||
    pathname.startsWith("/student/application-tracker")
  ) {
    return { allowed: true };
  }

  // Stage 7: Jobs & Internships is unlocked if student is Advanced verified OR reached Learning stage
  if (
    pathname.startsWith("/student/opportunities") ||
    pathname.startsWith("/student/jobs")
  ) {
    const isJobAccessUnlocked =
      workflow.isAdvancedVerified || workflow.isSkillGapCompleted;
    if (!isJobAccessUnlocked) {
      return {
        allowed: false,
        redirectUrl: "/student/learning",
        reason:
          "Complete the required learning stage to unlock job opportunities.",
      };
    }
    return { allowed: true };
  }

  // Fallback check against canonical stages
  const gatedStage = workflow.stages.find((s) => pathname.startsWith(s.route));
  if (gatedStage && gatedStage.isLocked) {
    return {
      allowed: false,
      redirectUrl: `/student/${workflow.currentStageSlug}`,
      reason: gatedStage.lockedReason || "This milestone is currently locked.",
    };
  }

  return { allowed: true };
}
