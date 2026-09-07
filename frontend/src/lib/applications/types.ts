/**
 * Skill Bridge — Job Applications & Tracking Types
 * Models application lifecycle, status telemetry, and company listings.
 */

export type ApplicationStatus =
  | "applied"
  | "in_review"
  | "interview"
  | "selected"
  | "rejected"
  | "withdrawn";

export interface ApplicationTimelineEvent {
  id?: string;
  status: ApplicationStatus;
  date?: string;
  timestamp?: string;
  title?: string;
  description?: string;
  note?: string;
}

export interface JobApplicationRecord {
  id: string;
  studentId: string;
  jobId?: string;
  companyName: string;
  roleTitle?: string;
  position?: string;
  location?: string;
  type?: "full_time" | "internship" | string;
  employmentType?: string;
  salaryRange?: string;
  status: ApplicationStatus;
  appliedAt: string;
  statusUpdatedAt?: string;
  updatedAt?: string;
  matchScoreAtApplication?: number;
  timeline?: ApplicationTimelineEvent[];
  notes?: string;
  // Applicant details & verified documents
  applicantFullName?: string;
  applicantEmail?: string;
  applicantPhone?: string;
  resumeFileName?: string;
  submittedDocumentTypes?: string[];
  coverLetter?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export type JobApplication = JobApplicationRecord;

export interface SubmitApplicationParams {
  studentId: string;
  jobId?: string;
  companyName: string;
  roleTitle?: string;
  position?: string;
  location?: string;
  type?: "full_time" | "internship" | string;
  employmentType?: string;
  salaryRange?: string;
  notes?: string;
  applicantFullName?: string;
  applicantEmail?: string;
  applicantPhone?: string;
  resumeFileName?: string;
  submittedDocumentTypes?: string[];
  coverLetter?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}
