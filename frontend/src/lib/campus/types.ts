/**
 * Skill Bridge — Campus Core Types & Interfaces
 * Models Campus Dashboard, Student Management, Faculty Visibility,
 * Industry Hiring Visibility, Application Tracking, and Placement Reports.
 */

import type { ApplicationStatus } from "@/lib/applications/types";
import type { IndustryHiringPostRecord } from "@/lib/industry/types";
import type { JobApplicationRecord } from "@/lib/applications/types";

// ============================================================================
// SECTION 1: CAMPUS DASHBOARD TYPES
// ============================================================================

export interface CampusDashboardSummary {
  institutionName: string;
  metrics: {
    totalStudents: number;
    totalFaculty: number;
    activeHiringPosts: number;
    totalApplications: number;
    shortlistedStudents: number;
    selectedStudents: number;
  };
  recentActivity: Array<{
    id: string;
    type: "student" | "faculty" | "hiring" | "application" | "placement";
    title: string;
    subtitle: string;
    timestamp: string;
    statusBadge?: string;
  }>;
}

export interface CampusProfileMetadata {
  institutionName: string;
  institutionCode: string;
  type: "University" | "College" | "Institute" | "Autonomous";
  address: string;
  city: string;
  state: string;
  country: string;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  logoUrl?: string;
  establishedYear?: string;
  accreditation?: string[];
  departments?: string[];
  approvedIntake?: number;
}

export interface CampusProfile {
  userId: string;
  email: string;
  fullName: string;
  role: "campus";
  metadata: CampusProfileMetadata;
  createdAt: string;
}

// ============================================================================
// SECTION 2: STUDENT MANAGEMENT TYPES
// ============================================================================

export interface CampusStudentRecord {
  id: string;
  fullName: string;
  email: string;
  rollNumber: string;
  department: string;
  course: string;
  semester: number;
  batchYear: string;
  institution: string;
  verifiedStatus: "NOT_STARTED" | "DOCUMENTS_PENDING" | "VERIFIED" | "FAILED";
  interestDomain?: string;
  specificInterest?: string;
  knowledgeLevel?: string | null;
  benchmarkScorePercent?: number | null;
  technicalSkills: string[];
  profiles: {
    linkedIn?: string;
    gitHub?: string;
    portfolio?: string;
  };
  applicationCount: number;
  placementStatus: "eligible" | "applied" | "shortlisted" | "interviewed" | "selected" | "placed" | "not_applied";
  lastActiveAt: string;
}

export interface CampusStudentFilterParams {
  search?: string;
  department?: string;
  batchYear?: string;
  verifiedStatus?: string;
  placementStatus?: string;
  page?: number;
  limit?: number;
}

export interface CampusStudentListResponse {
  students: CampusStudentRecord[];
  totalCount: number;
  page: number;
  totalPages: number;
}

export interface CampusStudentProfileDetail extends CampusStudentRecord {
  academicDetails: {
    rollNumber: string;
    department: string;
    course: string;
    semester: number;
    batchYear: string;
    institution: string;
    cgpa?: string;
    subjects?: string[];
  };
  skills: Array<{
    name: string;
    proficiency: "Beginner" | "Intermediate" | "Advanced";
    category?: string;
  }>;
  documents: Array<{
    id: string;
    documentType: string;
    fileName: string;
    fileType: string;
    uploadStatus: string;
    createdAt: string;
    verified: boolean;
  }>;
  applications: Array<{
    id: string;
    companyName: string;
    roleTitle: string;
    status: ApplicationStatus;
    appliedAt: string;
    hiringPostId?: string;
  }>;
  skillGapAnalysis?: {
    skillGaps: Array<{
      skill: string;
      requiredLevel: string;
      currentLevel: string;
      priority: "High" | "Medium" | "Low";
    }>;
    recommendations: Array<{
      title: string;
      description: string;
    }>;
  };
}

// ============================================================================
// SECTION 3: FACULTY / MENTOR TYPES
// ============================================================================

export interface CampusFacultyRecord {
  id: string;
  fullName: string;
  email: string;
  department: string;
  designation: string;
  subjects: string[];
  studentsAssigned: number;
  status: "verified" | "pending" | "deactivated";
  joinedDate: string;
}

export interface CampusFacultyFilterParams {
  search?: string;
  department?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface CampusFacultyListResponse {
  faculty: CampusFacultyRecord[];
  totalCount: number;
  page: number;
  totalPages: number;
}

export interface CampusFacultyDetail extends CampusFacultyRecord {
  assignedStudents: Array<{
    id: string;
    fullName: string;
    rollNumber: string;
    department: string;
    semester: number;
    verifiedStatus: string;
    placementStatus: string;
    progressPercentage: number;
  }>;
  coursesHandled: number;
  assessmentsCreated: number;
}

// ============================================================================
// SECTION 4: INDUSTRY & HIRING VISIBILITY TYPES
// ============================================================================

export interface CampusIndustryRecord {
  id: string;
  companyName: string;
  industryDomain: string;
  contactPerson: string;
  contactEmail: string;
  website: string;
  status: "verified" | "pending" | "rejected";
  isFrozen: boolean;
  joinedDate: string;
  activeJobsCount: number;
  activeInternshipsCount: number;
  totalApplications: number;
  shortlistedCount: number;
  selectedCount: number;
}

export interface CampusHiringPostRecord {
  id: string;
  industryId: string;
  companyName: string;
  roleTitle: string;
  hiringType: "Full-time" | "Internship" | "Part-time" | "Contract";
  industryDomain: string;
  location: string;
  workMode: "Remote" | "Hybrid" | "On-site";
  salaryRange: string;
  experienceRequirement: string;
  openings: number;
  deadline: string;
  description: string;
  requiredSkills: string[];
  status: "draft" | "published" | "frozen";
  createdAt: string;
  publishedAt?: string;
  applicationsCount: number;
  shortlistedCount: number;
  selectedCount: number;
}

export interface CampusIndustryFilterParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface CampusIndustryListResponse {
  industries: CampusIndustryRecord[];
  totalCount: number;
  page: number;
  totalPages: number;
}

export interface CampusHiringPostFilterParams {
  search?: string;
  companyName?: string;
  hiringType?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface CampusHiringPostListResponse {
  posts: CampusHiringPostRecord[];
  totalCount: number;
  page: number;
  totalPages: number;
}

// ============================================================================
// SECTION 5: APPLICATION TRACKING TYPES
// ============================================================================

export type CampusApplicationStatus =
  | "eligible"
  | "applied"
  | "shortlisted"
  | "interviewed"
  | "selected"
  | "placed"
  | "rejected"
  | "withdrawn";

export interface CampusApplicationRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentRollNumber: string;
  studentDepartment: string;
  studentBatchYear: string;
  companyName: string;
  roleTitle: string;
  hiringType: "Full-time" | "Internship" | "Part-time" | "Contract";
  industryId: string;
  status: CampusApplicationStatus;
  appliedAt: string;
  statusUpdatedAt?: string;
  timeline: Array<{
    status: CampusApplicationStatus;
    date: string;
    title: string;
    description?: string;
    note?: string;
  }>;
  screeningStatus?: "pending" | "screened" | "shortlisted" | "rejected";
  interviewStatus?: "not_scheduled" | "scheduled" | "in_progress" | "completed" | "cancelled";
  finalStatus?: "pending" | "selected" | "rejected";
  offerDetails?: {
    offeredRole?: string;
    offeredCompensation?: string;
    startDate?: string;
    notes?: string;
  };
}

export interface CampusApplicationFilterParams {
  search?: string;
  department?: string;
  batchYear?: string;
  companyName?: string;
  status?: CampusApplicationStatus;
  hiringType?: string;
  page?: number;
  limit?: number;
}

export interface CampusApplicationListResponse {
  applications: CampusApplicationRecord[];
  totalCount: number;
  page: number;
  totalPages: number;
}

// ============================================================================
// SECTION 6: PLACEMENT REPORTS TYPES
// ============================================================================

export interface PlacementReportFilters {
  department?: string;
  batchYear?: string;
  jobId?: string;
  industryId?: string;
}

export interface PlacementReportData {
  overview: {
    totalEligible: number;
    totalApplied: number;
    totalShortlisted: number;
    totalInterviewed: number;
    totalSelected: number;
    totalPlaced: number;
    placementRate: number;
  };
  byDepartment: Array<{
    department: string;
    eligible: number;
    applied: number;
    shortlisted: number;
    interviewed: number;
    selected: number;
    placed: number;
  }>;
  byBatch: Array<{
    batchYear: string;
    eligible: number;
    applied: number;
    shortlisted: number;
    interviewed: number;
    selected: number;
    placed: number;
  }>;
  byJob: Array<{
    jobId: string;
    roleTitle: string;
    companyName: string;
    openings: number;
    applied: number;
    shortlisted: number;
    interviewed: number;
    selected: number;
    placed: number;
  }>;
  byIndustry: Array<{
    industryId: string;
    companyName: string;
    industryDomain: string;
    openings: number;
    applied: number;
    shortlisted: number;
    interviewed: number;
    selected: number;
    placed: number;
  }>;
  timeline: Array<{
    month: string;
    applications: number;
    shortlisted: number;
    interviewed: number;
    selected: number;
    placed: number;
  }>;
}

export type CampusViewType =
  | "dashboard"
  | "students"
  | "faculty"
  | "industry"
  | "applications"
  | "reports";