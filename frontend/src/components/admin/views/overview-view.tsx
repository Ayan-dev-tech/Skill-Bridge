"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  StudentProfile,
  FacultyMember,
  IndustryPartner,
  JobListing,
  InternshipListing,
  CertificationRecord,
  ApprovalQueueItem,
  AuditLogItem,
} from "@/lib/admin-data";
import { AdminViewType } from "../admin-sidebar";
import { AdminLiveOverviewData, AdminApprovalItem, AdminActivityItem } from "@/lib/admin/types";
import { Radio, AlertCircle, CheckCircle2, ShieldAlert, Sparkles, Building2, School, GraduationCap, Users } from "lucide-react";

interface OverviewViewProps {
  students: StudentProfile[];
  faculty: FacultyMember[];
  industry: IndustryPartner[];
  jobs: JobListing[];
  internships: InternshipListing[];
  certifications: CertificationRecord[];
  approvals: ApprovalQueueItem[];
  auditLogs: AuditLogItem[];
  onNavigate: (view: AdminViewType) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  liveOverview?: AdminLiveOverviewData | null;
  onApproveLiveItem?: (item: AdminApprovalItem) => void;
  onRejectLiveItem?: (item: AdminApprovalItem) => void;
}

export function OverviewView({
  students,
  faculty,
  industry,
  jobs,
  internships,
  certifications,
  approvals,
  auditLogs,
  onNavigate,
  onApprove,
  onReject,
  liveOverview,
  onApproveLiveItem,
  onRejectLiveItem,
}: OverviewViewProps) {
  // Use authoritative live stats from backend if available, fallback to props
  const liveStats = liveOverview?.stats;

  const totalStudentsCount = liveStats ? liveStats.totalStudents : students.length;
  const activeStudentsCount = liveStats ? liveStats.activeStudents : students.filter((s) => s.status === "active").length;
  const totalFacultyCount = liveStats ? liveStats.totalFaculty : faculty.length;
  const totalIndustryCount = liveStats ? liveStats.totalIndustry : industry.length;
  const activeIndustryCount = liveStats ? liveStats.activeIndustry : industry.filter((i) => !i.isFrozen).length;
  const totalCampusCount = liveStats ? liveStats.totalCampus : 3;
  const activeCampusCount = liveStats ? liveStats.activeCampus : 2;
  const openJobsCount = liveStats ? liveStats.totalJobs : jobs.filter((j) => j.status === "active").length;
  const activeInternshipsCount = liveStats ? liveStats.totalInternships : internships.length;
  const totalApplicationsCount = liveStats ? liveStats.totalApplications : 22;
  const educationDrivesCount = liveStats ? liveStats.totalEducationDrives : 18;
  const pendingApprovalsCount = liveStats ? liveStats.pendingApprovalsCount : approvals.filter((a) => a.status === "pending").length;

  // Use live approvals queue if available
  const liveApprovalsList: AdminApprovalItem[] = liveOverview?.approvals || [];
  const pendingLiveApprovals = liveApprovalsList.filter((a) => a.status === "pending");

  // Use live activity feed if available
  const liveActivityList: AdminActivityItem[] = liveOverview?.activityFeed || [];

  const metrics = [
    {
      label: "Total Students",
      value: totalStudentsCount,
      sub: `${activeStudentsCount} verified on platform`,
      view: "students" as AdminViewType,
    },
    {
      label: "Faculty Members",
      value: totalFacultyCount,
      sub: "Academic cohort mentors",
      view: "faculty" as AdminViewType,
    },
    {
      label: "Industry Partners",
      value: totalIndustryCount,
      sub: `${activeIndustryCount} actively hiring`,
      view: "industry" as AdminViewType,
    },
    {
      label: "Campus Partners",
      value: totalCampusCount,
      sub: `${activeCampusCount} clearing drives`,
      view: "campus" as AdminViewType,
    },
    {
      label: "Open Jobs",
      value: openJobsCount,
      sub: "Active campus postings",
      view: "jobs" as AdminViewType,
    },
    {
      label: "Active Internships",
      value: activeInternshipsCount,
      sub: "Internship opportunities",
      view: "internships" as AdminViewType,
    },
    {
      label: "Education Drives",
      value: educationDrivesCount,
      sub: "Curricula & programs",
      view: "courses" as AdminViewType,
    },
    {
      label: "Applications",
      value: totalApplicationsCount,
      sub: "Candidate submissions",
      view: "analytics" as AdminViewType,
    },
    {
      label: "Pending Approvals",
      value: pendingApprovalsCount,
      sub: "Requires admin sign-off",
      highlight: pendingApprovalsCount > 0,
      view: "approvals" as AdminViewType,
    },
  ];

  const skillGaps = [
    { skill: "Cloud Architecture (AWS / Azure)", demand: 92, studentProficiency: 34, gap: 58 },
    { skill: "DevOps & CI/CD Pipelines", demand: 86, studentProficiency: 28, gap: 58 },
    { skill: "Cybersecurity & Cryptography", demand: 78, studentProficiency: 32, gap: 46 },
    { skill: "PostgreSQL & Vector Indexing", demand: 75, studentProficiency: 48, gap: 27 },
    { skill: "Production ML Systems (MLOps)", demand: 88, studentProficiency: 30, gap: 58 },
  ];

  const skillDistribution = [
    { skill: "Python", percentage: 84, studentsCount: 198 },
    { skill: "SQL & Databases", percentage: 72, studentsCount: 170 },
    { skill: "React & Modern Web", percentage: 65, studentsCount: 152 },
    { skill: "C++ / Systems", percentage: 46, studentsCount: 108 },
    { skill: "Docker / Cloud", percentage: 38, studentsCount: 89 },
    { skill: "Machine Learning", percentage: 35, studentsCount: 82 },
  ];

  const isRealtimeConnected = liveOverview?.realtimeStatus.status === "connected";

  return (
    <div className="space-y-6">
      {/* 1. Realtime Infrastructure Telemetry Banner */}
      <div
        className={`p-3.5 px-4 rounded-lg border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isRealtimeConnected
            ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-950 dark:text-emerald-200"
            : "border-border bg-card text-foreground"
        }`}
      >
        <div className="flex items-start sm:items-center gap-2.5">
          <Radio
            className={`w-4 h-4 shrink-0 mt-0.5 sm:mt-0 ${
              isRealtimeConnected ? "text-emerald-500 animate-pulse" : "text-muted-foreground"
            }`}
          />
          <div>
            <p className="font-semibold flex items-center gap-1.5">
              <span>Realtime Telemetry:</span>
              <span className="font-mono text-[11px] uppercase tracking-wider px-1.5 py-0.2 rounded border border-border bg-muted/40">
                {liveOverview?.realtimeStatus.status || "Standby (Local Database Active)"}
              </span>
            </p>
            <p className="text-muted-foreground text-[11px] mt-0.5">
              {liveOverview?.realtimeStatus.message ||
                "Live database queries connected. When Supabase Realtime credentials are provided in .env.local, instant push subscriptions will activate automatically."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-muted-foreground font-mono">
            Single Source of Truth: <strong className="text-foreground">Authoritative Local DB</strong>
          </span>
        </div>
      </div>

      {/* 2. High-Level Live Metrics (Grid of 9 Restrained Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5">
        {metrics.map((m, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate(m.view)}
            className="text-left rounded-lg border border-border bg-card p-3 hover:border-foreground/40 transition-colors shadow-2xs"
          >
            <p className="text-[11px] font-medium text-muted-foreground truncate">{m.label}</p>
            <p
              className={`text-lg font-bold tracking-tight mt-0.5 ${
                m.highlight ? "text-amber-500 dark:text-amber-400" : "text-foreground"
              }`}
            >
              {m.value}
            </p>
            <p className="text-[10px] text-muted-foreground/80 truncate mt-0.5">{m.sub}</p>
          </button>
        ))}
      </div>

      {/* 3. Skill Analytics Overview (Distribution vs Industry Demand vs Skill Gap) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Skill Gap Analysis Overview */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Skill Gap Overview</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Largest discrepancies between Industry Demand vs Student Competency.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="xs"
                onClick={() => onNavigate("skill-gaps")}
                className="text-xs"
              >
                Detailed Gaps
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3.5 pt-1">
            {skillGaps.map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-foreground">{item.skill}</span>
                  <span className="text-muted-foreground font-mono text-[11px]">
                    Gap: <span className="font-semibold text-foreground">{item.gap}%</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground">
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span>Industry Demand</span>
                      <span className="font-mono">{item.demand}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-foreground rounded-full" style={{ width: `${item.demand}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span>Student Level</span>
                      <span className="font-mono">{item.studentProficiency}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-muted-foreground rounded-full"
                        style={{ width: `${item.studentProficiency}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Student Skill Distribution */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Student Skill Distribution</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Percentage of active students proficient across key competencies.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="xs"
                onClick={() => onNavigate("skill-library")}
                className="text-xs"
              >
                Skill Library
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-1">
            {skillDistribution.map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="font-medium text-foreground">{item.skill}</span>
                  <span className="text-muted-foreground font-mono text-[11px]">
                    {item.percentage}% ({item.studentsCount} students)
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground/80 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 4. Live Pending Approvals Queue & Real Activity Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Pending Approvals (2 Cols) */}
        <Card className="border-border lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <span>Live Pending Approvals Queue</span>
                  {pendingLiveApprovals.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      {pendingLiveApprovals.length} Action Needed
                    </span>
                  )}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Live submissions requiring administrative verification, clearance, and role provisioning.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="xs"
                onClick={() => onNavigate("approvals")}
                className="text-xs"
              >
                View Central Queue ({pendingLiveApprovals.length || approvals.filter((a) => a.status === "pending").length})
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {pendingLiveApprovals.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted-foreground space-y-1">
                <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
                <p className="font-medium text-foreground">All approval requests have been reviewed.</p>
                <p className="text-[11px]">No pending institutional, recruiter, or student submissions.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {pendingLiveApprovals.slice(0, 5).map((appr) => (
                  <div
                    key={appr.id}
                    className="p-3.5 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-muted/20 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border border-border bg-muted/40 uppercase">
                          {appr.type}
                        </span>
                        <p className="font-semibold text-foreground">{appr.title}</p>
                      </div>
                      <p className="text-muted-foreground text-[11px]">{appr.details}</p>
                      <p className="text-muted-foreground/70 font-mono text-[10px]">
                        Submitted by {appr.submittedBy} on {appr.submissionDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <Button
                        variant="default"
                        size="xs"
                        onClick={() => {
                          if (onApproveLiveItem) {
                            onApproveLiveItem(appr);
                          } else {
                            onApprove(appr.id);
                          }
                        }}
                        className="text-xs"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => {
                          if (onRejectLiveItem) {
                            onRejectLiveItem(appr);
                          } else {
                            onReject(appr.id);
                          }
                        }}
                        className="text-xs text-destructive hover:bg-destructive/10"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Real Platform Activity Timeline (1 Col) */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Live Platform Activity</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Audit trail of candidate applications, publications & events.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="xs"
                onClick={() => onNavigate("audit-logs")}
                className="text-xs"
              >
                Logs
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border text-xs max-h-[380px] overflow-y-auto">
              {liveActivityList.length > 0 ? (
                liveActivityList.slice(0, 7).map((log) => (
                  <div key={log.id} className="p-3 px-5 space-y-1 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{log.action}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                          log.status === "Flagged" || log.status === "Rejected"
                            ? "border-destructive/40 text-destructive bg-destructive/10"
                            : log.status === "Info"
                            ? "border-blue-500/30 text-blue-500 bg-blue-500/10"
                            : "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                        }`}
                      >
                        {log.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-[11px] truncate">
                      <span className="font-medium text-foreground">{log.actor}:</span> {log.resource}
                    </p>
                    <p className="text-muted-foreground/60 font-mono text-[10px]">
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                auditLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="p-3 px-5 space-y-1 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{log.action}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                          log.status === "Flagged"
                            ? "border-destructive/40 text-destructive bg-destructive/10"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {log.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-[11px] truncate">{log.resource}</p>
                    <p className="text-muted-foreground/60 font-mono text-[10px]">{log.timestamp}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
