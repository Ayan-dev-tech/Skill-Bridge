import {
  AdminLiveOverviewData,
  AdminActivityItem,
  AdminNotificationItem,
  AdminApprovalItem,
  AdminCampusRecord,
} from "./types";
import { getRealtimeStatus } from "./admin-realtime";
import { getSupabaseServerClient } from "../supabase-server";
import { supabaseDb } from "../supabase-db";

async function loadAdminDatabase(): Promise<any> {
  const overview = await supabaseDb.getAdminOverview();
  return {
    users: overview.users,
    profiles: overview.profiles,
    hiringRequests: overview.hiringRequests,
    campusRequests: overview.campusRequests,
    studentVerifications: overview.studentVerifications,
    industryHiringPosts: overview.industryHiringPosts,
    jobApplications: overview.jobApplications,
    educationPrograms: overview.educationPrograms,
  };
}

export const AdminLiveService = {
  async getLiveOverview(): Promise<AdminLiveOverviewData> {
    const db = await loadAdminDatabase();

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

  async handleApprovalDecision(
    id: string,
    entityId: string,
    rawType: "hiring" | "campus" | "verification" | "job" | "faculty",
    decision: "approved" | "rejected",
    reason?: string
  ): Promise<{ success: boolean; item?: any; error?: string }> {
    try {
      const supabase = getSupabaseServerClient();
      const now = new Date().toISOString();

      if (rawType === "hiring") {
        const { data, error } = await supabase
          .from("hiring_requests")
          .update({
            status: decision === "approved" ? "active" : "rejected",
            ...(decision === "rejected" && reason ? { freeze_reason: reason } : {}),
            updated_at: now,
          })
          .eq("id", entityId)
          .select("*")
          .single();

        if (error || !data) return { success: false, error: error?.message || "Hiring request not found" };
        return { success: true, item: data };
      }

      if (rawType === "campus") {
        const { data, error } = await supabase
          .from("campus_requests")
          .update({
            status: decision === "approved" ? "active" : "rejected",
            ...(decision === "rejected" && reason ? { freeze_reason: reason } : {}),
            updated_at: now,
          })
          .eq("id", entityId)
          .select("*")
          .single();

        if (error || !data) return { success: false, error: error?.message || "Campus request not found" };
        return { success: true, item: data };
      }

      if (rawType === "verification") {
        const { data, error } = await supabase
          .from("student_verifications")
          .update({
            verification_status: decision === "approved" ? "VERIFIED" : "REJECTED",
            ...(decision === "approved" ? { completed_at: now } : {}),
            ...(decision === "rejected" && reason ? { rejection_reason: reason } : {}),
            updated_at: now,
          })
          .eq("student_id", entityId)
          .select("*")
          .single();

        if (error || !data) return { success: false, error: error?.message || "Verification record not found" };
        return { success: true, item: data };
      }

      return { success: false, error: "Unsupported approval entity type" };
    } catch (err: any) {
      console.warn("Supabase approval decision error:", err);
      return { success: false, error: err?.message || "Failed to process approval decision" };
    }
  },
};
