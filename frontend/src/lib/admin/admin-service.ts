import fs from "fs";
import path from "path";
import {
  AdminLiveOverviewData,
  AdminActivityItem,
  AdminNotificationItem,
  AdminApprovalItem,
  AdminCampusRecord,
} from "./types";
import { getRealtimeStatus } from "./admin-realtime";

const DB_PATH = path.join(process.cwd(), "data", "skill_bridge.json");

function readDatabase(): any {
  if (!fs.existsSync(DB_PATH)) {
    return {};
  }
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database file:", err);
    return {};
  }
}

function writeDatabase(data: any): boolean {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing database file:", err);
    return false;
  }
}

export const AdminLiveService = {
  getLiveOverview(): AdminLiveOverviewData {
    const db = readDatabase();

    const users = db.users || [];
    const profiles = db.profiles || [];
    const hiringRequests = db.hiringRequests || [];
    const campusRequests = db.campusRequests || [];
    const studentVerifications = db.studentVerifications || [];
    const industryHiringPosts = db.industryHiringPosts || [];
    const jobApplications = db.jobApplications || [];
    const educationPrograms = db.educationPrograms || [];

    const students = users.filter((u: any) => u.role === "student" && !u.isAdmin);
    const faculty = users.filter((u: any) => u.role === "faculty");
    const campusUsers = users.filter((u: any) => u.role === "campus");
    const industryUsers = users.filter((u: any) => u.role === "industry");

    const verifiedStudentsCount = studentVerifications.filter(
      (v: any) => v.verificationStatus === "VERIFIED"
    ).length;

    const frozenCompaniesCount = hiringRequests.filter((h: any) => h.isFrozen).length;
    const frozenCampusesCount = campusRequests.filter((c: any) => c.isFrozen).length;

    const jobsCount = industryHiringPosts.filter((p: any) => p.hiringType !== "Internship").length;
    const internshipsCount = industryHiringPosts.filter((p: any) => p.hiringType === "Internship").length;

    // Build real Approvals Queue
    const approvals: AdminApprovalItem[] = [];

    // 1. Pending Industry partner requests
    hiringRequests
      .filter((h: any) => h.status === "pending" || h.status === "under_review")
      .forEach((h: any) => {
        approvals.push({
          id: `appr-hire-${h.id}`,
          type: "Industry Partner",
          title: `${h.companyName} Recruiter Onboarding`,
          submittedBy: h.contactEmail || h.companyName,
          submissionDate: (h.updatedAt || h.createdAt || "").slice(0, 10) || "2026-09-01",
          details: `Seeking campus hiring clearance for ${h.jobTitle || h.industryDomain || "Open Positions"}.`,
          status: "pending",
          entityId: h.id,
          rawType: "hiring",
        });
      });

    // 2. Pending Campus onboarding requests
    campusRequests
      .filter((c: any) => c.status === "pending" || c.status === "under_review")
      .forEach((c: any) => {
        approvals.push({
          id: `appr-campus-${c.id}`,
          type: "Campus Partner",
          title: `${c.campusName} Institutional Onboarding`,
          submittedBy: c.code || "Registrar Office",
          submissionDate: (c.updatedAt || c.createdAt || "").slice(0, 10) || "2026-09-01",
          details: `Drive authorization request for ${c.requestType || "Campus Placement"} (${c.studentsEnrolled || 0} students).`,
          status: "pending",
          entityId: c.id,
          rawType: "campus",
        });
      });

    // 3. Pending Student verification submissions
    studentVerifications
      .filter((v: any) => v.verificationStatus === "DOCUMENTS_PENDING")
      .slice(0, 10)
      .forEach((v: any) => {
        const studentUser = users.find((u: any) => u.id === v.studentId);
        const name = studentUser?.fullName || v.studentId;
        approvals.push({
          id: `appr-verify-${v.studentId}`,
          type: "Student Verification",
          title: `Document Verification: ${name}`,
          submittedBy: studentUser?.email || v.studentId,
          submissionDate: (v.updatedAt || v.createdAt || "").slice(0, 10) || "2026-09-01",
          details: `Passport photo & academic transcript submitted for identity validation.`,
          status: "pending",
          entityId: v.studentId,
          rawType: "verification",
        });
      });

    // Build real Activity Feed from actual database records
    const activityFeed: AdminActivityItem[] = [];

    // 1. Applications & interview events
    jobApplications.forEach((app: any) => {
      const applicantName = app.applicantFullName || "Student Candidate";
      if (app.timeline && Array.isArray(app.timeline)) {
        app.timeline.forEach((ev: any) => {
          activityFeed.push({
            id: `act-tl-${ev.id || Math.random().toString(36).slice(2, 7)}`,
            eventType: "application_status_changed",
            actor: applicantName,
            action: ev.title || `Application ${ev.status}`,
            resource: `${app.roleTitle || app.position} at ${app.companyName}`,
            timestamp: ev.timestamp || ev.date || app.appliedAt || new Date().toISOString(),
            status: ev.status === "selected" ? "Success" : ev.status === "interview" ? "Info" : "Success",
          });
        });
      } else {
        activityFeed.push({
          id: `act-app-${app.id}`,
          eventType: "application_submitted",
          actor: applicantName,
          action: "Application Submitted",
          resource: `${app.roleTitle || app.position} at ${app.companyName}`,
          timestamp: app.appliedAt || new Date().toISOString(),
          status: "Success",
        });
      }
    });

    // 2. Published jobs and internships
    industryHiringPosts.forEach((post: any) => {
      activityFeed.push({
        id: `act-post-${post.id}`,
        eventType: post.hiringType === "Internship" ? "internship_published" : "job_published",
        actor: post.companyName || "Industry Partner",
        action: `Published ${post.hiringType || "Job Listing"}`,
        resource: `${post.roleTitle} (${post.openings || 1} openings)`,
        timestamp: post.publishedAt || post.createdAt || new Date().toISOString(),
        status: "Success",
      });
    });

    // 3. Education Drives
    educationPrograms.slice(0, 5).forEach((prog: any) => {
      activityFeed.push({
        id: `act-prog-${prog.id}`,
        eventType: "education_drive_published",
        actor: prog.educatorName || "Institutional Partner",
        action: "Education Program Published",
        resource: prog.title,
        timestamp: prog.createdAt || "2026-08-15T00:00:00Z",
        status: "Success",
      });
    });

    // 4. Campus requests & freeze audits
    campusRequests.forEach((camp: any) => {
      activityFeed.push({
        id: `act-camp-${camp.id}`,
        eventType: camp.isFrozen ? "campus_freeze_toggled" : "campus_registered",
        actor: "Admin / Compliance",
        action: camp.isFrozen ? "Campus Suspended" : "Campus Drive Cleared",
        resource: `${camp.campusName} (${camp.code})`,
        timestamp: camp.updatedAt || "2026-09-05T18:00:00Z",
        status: camp.isFrozen ? "Flagged" : "Success",
      });
    });

    // 5. Industry hiring requests & freeze audits
    hiringRequests.forEach((hire: any) => {
      activityFeed.push({
        id: `act-hire-${hire.id}`,
        eventType: hire.isFrozen ? "industry_freeze_toggled" : "industry_registered",
        actor: "Admin / Compliance",
        action: hire.isFrozen ? "Company Hiring Frozen" : "Recruiter Verified",
        resource: `${hire.companyName} (${hire.industryDomain})`,
        timestamp: hire.updatedAt || "2026-09-05T18:00:00Z",
        status: hire.isFrozen ? "Flagged" : "Success",
      });
    });

    // Sort descending by timestamp
    activityFeed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Build real Notifications list
    const notifications: AdminNotificationItem[] = [];

    if (frozenCompaniesCount > 0) {
      notifications.push({
        id: "notif-frozen-corp",
        title: "Compliance Freeze Active",
        message: `${frozenCompaniesCount} company hiring portal(s) suspended due to compliance flags.`,
        priority: "Security Alert",
        target: "Admin Security Operations",
        sentAt: "Active",
      });
    }

    if (frozenCampusesCount > 0) {
      notifications.push({
        id: "notif-frozen-campus",
        title: "Campus Drive Suspension",
        message: `${frozenCampusesCount} campus institution(s) currently suspended pending document review.`,
        priority: "Urgent",
        target: "Institutional Relations",
        sentAt: "Active",
      });
    }

    const pendingVerifsCount = studentVerifications.filter(
      (v: any) => v.verificationStatus === "DOCUMENTS_PENDING"
    ).length;

    if (pendingVerifsCount > 0) {
      notifications.push({
        id: "notif-pending-verifs",
        title: "Student Verifications Pending",
        message: `${pendingVerifsCount} student document submissions require verification review.`,
        priority: "Normal",
        target: "Student Services",
        sentAt: "Today",
      });
    }

    notifications.push({
      id: "notif-system-health",
      title: "System Telemetry Active",
      message: "Skill Bridge Admin engine, RBAC rules, and authoritative database active.",
      priority: "Normal",
      target: "All Admins",
      sentAt: "Online",
    });

    // Map Campus records
    const campusList: AdminCampusRecord[] = campusRequests.map((c: any) => ({
      id: c.id,
      campusName: c.campusName,
      code: c.code,
      domain: c.domain || "Higher Education",
      location: c.location || "India",
      requestType: c.requestType || "Placement Drive",
      studentsEnrolled: c.studentsEnrolled || 0,
      status: c.isFrozen ? "frozen" : c.status || "active",
      isFrozen: !!c.isFrozen,
      freezeReason: c.freezeReason,
      updatedAt: c.updatedAt || new Date().toISOString(),
      contactEmail: c.contactEmail,
      contactPerson: c.contactPerson,
    }));

    return {
      stats: {
        totalUsers: users.filter((u: any) => !u.isAdmin).length,
        totalStudents: students.length,
        activeStudents: verifiedStudentsCount,
        totalFaculty: faculty.length,
        totalIndustry: hiringRequests.length,
        activeIndustry: hiringRequests.filter((h: any) => !h.isFrozen).length,
        totalCampus: campusRequests.length,
        activeCampus: campusRequests.filter((c: any) => !c.isFrozen).length,
        totalJobs: jobsCount,
        totalInternships: internshipsCount,
        totalApplications: jobApplications.length,
        totalEducationDrives: educationPrograms.length,
        pendingApprovalsCount: approvals.length,
        totalFrozen: frozenCompaniesCount + frozenCampusesCount,
      },
      realtimeStatus: getRealtimeStatus(),
      activityFeed: activityFeed.slice(0, 30),
      notifications,
      approvals,
      campusList,
    };
  },

  handleApprovalDecision(
    id: string,
    entityId: string,
    rawType: "hiring" | "campus" | "verification" | "job" | "faculty",
    decision: "approved" | "rejected",
    reason?: string
  ): { success: boolean; item?: any; error?: string } {
    const db = readDatabase();

    if (rawType === "hiring") {
      const item = (db.hiringRequests || []).find((h: any) => h.id === entityId);
      if (!item) return { success: false, error: "Hiring request not found" };
      item.status = decision === "approved" ? "active" : "rejected";
      item.updatedAt = new Date().toISOString();
      if (decision === "rejected" && reason) {
        item.rejectionReason = reason;
      }
      writeDatabase(db);
      return { success: true, item };
    }

    if (rawType === "campus") {
      const item = (db.campusRequests || []).find((c: any) => c.id === entityId);
      if (!item) return { success: false, error: "Campus request not found" };
      item.status = decision === "approved" ? "active" : "rejected";
      item.updatedAt = new Date().toISOString();
      if (decision === "rejected" && reason) {
        item.rejectionReason = reason;
      }
      writeDatabase(db);
      return { success: true, item };
    }

    if (rawType === "verification") {
      const item = (db.studentVerifications || []).find((v: any) => v.studentId === entityId);
      if (!item) return { success: false, error: "Verification record not found" };
      item.verificationStatus = decision === "approved" ? "VERIFIED" : "REJECTED";
      item.updatedAt = new Date().toISOString();
      if (decision === "approved") {
        item.completedAt = new Date().toISOString();
      }
      writeDatabase(db);
      return { success: true, item };
    }

    return { success: false, error: "Unsupported approval entity type" };
  },
};
