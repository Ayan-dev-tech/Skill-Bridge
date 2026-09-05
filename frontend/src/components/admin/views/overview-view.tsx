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
}: OverviewViewProps) {
  const activeStudentsCount = students.filter((s) => s.status === "active").length;
  const verifiedCertCount = certifications.filter((c) => c.verified).length;
  const pendingApprovals = approvals.filter((a) => a.status === "pending");

  const metrics = [
    { label: "Total Students", value: students.length, sub: `${activeStudentsCount} active on platform`, view: "students" as AdminViewType },
    { label: "Faculty Members", value: faculty.length, sub: "Across 4 departments", view: "faculty" as AdminViewType },
    { label: "Industry Partners", value: industry.length, sub: `${industry.filter(i => !i.isFrozen).length} actively hiring`, view: "industry" as AdminViewType },
    { label: "Open Jobs", value: jobs.reduce((acc, j) => acc + (j.status === "active" ? j.applicationsCount : 0), 0), sub: `${jobs.filter(j => j.status === "active").length} active listings`, view: "jobs" as AdminViewType },
    { label: "Active Internships", value: internships.length, sub: "Across technology & core", view: "internships" as AdminViewType },
    { label: "Pending Approvals", value: pendingApprovals.length, sub: "Requires administrative review", highlight: pendingApprovals.length > 0, view: "approvals" as AdminViewType },
    { label: "Verified Certs", value: verifiedCertCount, sub: "Industry authenticated", view: "certifications" as AdminViewType },
  ];

  const skillGaps = [
    { skill: "Cloud Computing (AWS/Azure)", demand: 92, studentProficiency: 34, gap: 58 },
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

  return (
    <div className="space-y-6">
      {/* 1. High-Level Metrics (Restrained cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {metrics.map((m, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate(m.view)}
            className="text-left rounded-lg border border-border bg-card p-3.5 hover:border-foreground/40 transition-colors shadow-2xs"
          >
            <p className="text-[11px] font-medium text-muted-foreground truncate">{m.label}</p>
            <p className={`text-xl font-bold tracking-tight mt-0.5 ${m.highlight ? "text-amber-500 dark:text-amber-400" : "text-foreground"}`}>
              {m.value}
            </p>
            <p className="text-[10px] text-muted-foreground/80 truncate mt-0.5">{m.sub}</p>
          </button>
        ))}
      </div>

      {/* 2. Skill Analytics Overview (Distribution vs Industry Demand vs Skill Gap) */}
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
                      <div className="h-full bg-muted-foreground rounded-full" style={{ width: `${item.studentProficiency}%` }} />
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

      {/* 3. Pending Approvals Queue & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Pending Approvals (2 Cols) */}
        <Card className="border-border lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Pending Approval Queue</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Submissions requiring immediate verification and sign-off.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="xs"
                onClick={() => onNavigate("approvals")}
                className="text-xs"
              >
                View All ({pendingApprovals.length})
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {pendingApprovals.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted-foreground">
                All requests have been reviewed and approved.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {pendingApprovals.slice(0, 4).map((appr) => (
                  <div key={appr.id} className="p-3.5 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-muted/20 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border border-border bg-muted/40 uppercase">
                          {appr.type}
                        </span>
                        <p className="font-semibold text-foreground">{appr.title}</p>
                      </div>
                      <p className="text-muted-foreground text-[11px]">{appr.details}</p>
                      <p className="text-muted-foreground/70 font-mono text-[10px]">Submitted by {appr.submittedBy} on {appr.submissionDate}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <Button
                        variant="default"
                        size="xs"
                        onClick={() => onApprove(appr.id)}
                        className="text-xs"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => onReject(appr.id)}
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

        {/* Recent Activity Timeline (1 Col) */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Recent Platform Activity</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Live audit trail of administrative actions.
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
            <div className="divide-y divide-border text-xs">
              {auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="p-3 px-5 space-y-1 hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{log.action}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                      log.status === "Flagged" ? "border-destructive/40 text-destructive bg-destructive/10" : "border-border text-muted-foreground"
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[11px] truncate">{log.resource}</p>
                  <p className="text-muted-foreground/60 font-mono text-[10px]">{log.timestamp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
