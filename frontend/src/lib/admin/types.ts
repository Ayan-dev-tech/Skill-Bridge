/**
 * Skill-Bridge Admin Live Updates & Activity Monitoring Types
 */

export type RealtimeConnectionStatus =
  | "unconfigured"
  | "standby"
  | "connecting"
  | "connected"
  | "error"
  | "reconnecting";

export interface RealtimeStatusInfo {
  configured: boolean;
  status: RealtimeConnectionStatus;
  message: string;
  provider: "supabase" | "none";
  lastPing?: string;
}

export interface AdminActivityItem {
  id: string;
  eventType:
    | "faculty_registered"
    | "faculty_updated"
    | "industry_registered"
    | "industry_freeze_toggled"
    | "industry_approved"
    | "campus_registered"
    | "campus_freeze_toggled"
    | "campus_approved"
    | "student_registered"
    | "student_verification_updated"
    | "job_published"
    | "internship_published"
    | "application_submitted"
    | "application_status_changed"
    | "education_drive_published"
    | "admin_action";
  actor: string;
  action: string;
  resource: string;
  timestamp: string;
  status: "Success" | "Flagged" | "Pending" | "Rejected" | "Info";
  metadata?: Record<string, unknown>;
}

export interface AdminNotificationItem {
  id: string;
  title: string;
  message: string;
  priority: "Normal" | "Urgent" | "Security Alert";
  target: string;
  sentAt: string;
  read?: boolean;
  relatedEntityId?: string;
  relatedEntityType?: "industry" | "campus" | "faculty" | "student" | "application" | "job";
}

export interface AdminLiveOverviewData {
  stats: {
    totalUsers: number;
    totalStudents: number;
    activeStudents: number;
    totalFaculty: number;
    totalIndustry: number;
    activeIndustry: number;
    totalCampus: number;
    activeCampus: number;
    totalJobs: number;
    totalInternships: number;
    totalApplications: number;
    totalEducationDrives: number;
    pendingApprovalsCount: number;
    totalFrozen: number;
  };
  realtimeStatus: RealtimeStatusInfo;
  activityFeed: AdminActivityItem[];
  notifications: AdminNotificationItem[];
  approvals: AdminApprovalItem[];
  campusList: AdminCampusRecord[];
}

export interface AdminApprovalItem {
  id: string;
  type: "Industry Partner" | "Campus Partner" | "Student Verification" | "Job" | "Internship" | "Faculty";
  title: string;
  submittedBy: string;
  submissionDate: string;
  details: string;
  status: "pending" | "approved" | "rejected";
  entityId: string;
  rawType: "hiring" | "campus" | "verification" | "job" | "faculty";
}

export interface AdminCampusRecord {
  id: string;
  campusName: string;
  code: string;
  domain?: string;
  location?: string;
  requestType: string;
  studentsEnrolled: number;
  status: "active" | "frozen" | "pending";
  isFrozen: boolean;
  freezeReason?: string;
  updatedAt: string;
  contactEmail?: string;
  contactPerson?: string;
}
