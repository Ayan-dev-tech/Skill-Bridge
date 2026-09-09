export type FacultyViewType =
  | "dashboard"
  | "students"
  | "progress"
  | "skill-gaps"
  | "learning"
  | "applications"
  | "placement"
  | "reports"
  | "profile"
  | "settings";

export interface FacultyProfileData {
  id: string;
  fullName: string;
  email: string;
  department: string;
  institution: string;
  designation: string;
  subjects: string[];
  assignedStudentCount: number;
  joinedDate: string;
  phone?: string;
  officeLocation?: string;
  bio?: string;
}

export interface FacultyStudentRecord {
  id: string;
  fullName: string;
  email: string;
  rollNumber: string;
  department: string;
  course: string;
  semester: number;
  batchYear: string;
  institution: string;
  verificationStatus: string;
  hasInterestProfile: boolean;
  interestDomain?: string;
  specificInterest?: string;
  hasKnowledgeTest: boolean;
  knowledgeLevel?: string | null;
  scorePercent?: number | null;
  skillGapsCount: number;
  learningProgressPercent: number;
  applicationCount: number;
  placementStatus: "eligible" | "applied" | "shortlisted" | "interviewed" | "selected" | "not_applied";
  needsAttention: boolean;
  attentionReason?: string;
  technicalSkills: string[];
  avatarUrl?: string;
  lastActiveAt?: string;
}

export interface FacultyStudentDetail extends FacultyStudentRecord {
  academicDetails: {
    rollNumber: string;
    department: string;
    course: string;
    semester: number;
    batchYear: string;
    institution: string;
    cgpa: string;
    subjects: string[];
  };
  interestProfile?: {
    mainDomain: string;
    specificInterest: string;
    confidence: number;
    explanation: string;
    confirmedAt: string;
  };
  knowledgeTestResult?: {
    difficulty: string;
    scorePercent: number;
    strengths: string[];
    gaps: string[];
    completedAt: string;
  };
  skillGapAnalysis?: {
    domain: string;
    niche: string;
    gaps: Array<{
      skill: string;
      subskill?: string;
      currentLevel: string;
      targetLevel: string;
      priority: "High" | "Medium" | "Low";
    }>;
    recommendations: Array<{
      title: string;
      description: string;
      provider?: string;
    }>;
  };
  learningResources?: Array<{
    id: string;
    title: string;
    type: string;
    category: string;
    progressPercent: number;
    completed: boolean;
  }>;
  applications?: Array<{
    id: string;
    roleTitle: string;
    companyName: string;
    status: string;
    screeningStatus?: string;
    appliedAt: string;
  }>;
  developmentStages: Array<{
    stage: string;
    label: string;
    status: "completed" | "in_progress" | "pending";
    description: string;
  }>;
}

export interface FacultyStudentFilterParams {
  search?: string;
  course?: string;
  semester?: string;
  placementStatus?: string;
  needsAttention?: boolean;
  page?: number;
  limit?: number;
}

export interface FacultyStudentListResponse {
  students: FacultyStudentRecord[];
  totalCount: number;
  page: number;
  totalPages: number;
}

export interface FacultyDashboardSummary {
  facultyProfile: FacultyProfileData;
  metrics: {
    assignedStudents: number;
    studentsNeedingAttention: number;
    interestFinderCompleted: number;
    knowledgeTestCompleted: number;
    studentsWithSkillGaps: number;
    activeLearningStudents: number;
    totalApplications: number;
    shortlistedCount: number;
    placedCount: number;
  };
  journeyDistribution: {
    documentVerification: number;
    interestFinder: number;
    knowledgeTesting: number;
    skillGapAnalysis: number;
    learning: number;
    applications: number;
    placed: number;
  };
  recentActivity: Array<{
    id: string;
    studentName: string;
    studentId: string;
    type: "application" | "test" | "interest" | "skill_gap" | "verification";
    title: string;
    subtitle: string;
    timestamp: string;
    statusBadge?: string;
  }>;
}

export interface FacultySkillGapItem {
  studentId: string;
  studentName: string;
  rollNumber: string;
  domain: string;
  niche: string;
  skill: string;
  subskill?: string;
  currentLevel: string;
  targetLevel: string;
  priority: "High" | "Medium" | "Low";
}

export interface FacultySkillGapOverview {
  totalStudentsAnalyzed: number;
  highPriorityCount: number;
  mediumPriorityCount: number;
  lowPriorityCount: number;
  topSkillsNeedingFocus: Array<{ skill: string; studentCount: number; priority: string }>;
  domainBreakdown: Array<{ domain: string; count: number }>;
  gapsList: FacultySkillGapItem[];
}

export interface FacultyLearningOverview {
  enrolledStudentsCount: number;
  avgCompletionPercent: number;
  completedTracksCount: number;
  curriculumModulesCount: number;
  studentProgressList: Array<{
    studentId: string;
    studentName: string;
    rollNumber: string;
    course: string;
    modulesCompleted: number;
    totalModules: number;
    progressPercent: number;
    lastActiveAt: string;
  }>;
}

export interface FacultyPlacementOverview {
  funnel: {
    eligible: number;
    applied: number;
    shortlisted: number;
    interviewed: number;
    selected: number;
    placed: number;
  };
  applications: Array<{
    id: string;
    studentId: string;
    studentName: string;
    rollNumber: string;
    roleTitle: string;
    companyName: string;
    status: string;
    screeningStatus?: string;
    appliedAt: string;
  }>;
}

export interface FacultyReportsData {
  cohortSize: number;
  journeyStats: {
    verifiedRate: number;
    interestCompletionRate: number;
    knowledgeTestRate: number;
    skillGapRate: number;
    learningActiveRate: number;
    placementRate: number;
  };
  testScoreDistribution: {
    above80: number;
    between60And80: number;
    below60: number;
    averageScore: number;
  };
  skillGapByDomain: Array<{ domain: string; count: number }>;
  placementFunnel: {
    applied: number;
    shortlisted: number;
    interviewed: number;
    selected: number;
  };
}
