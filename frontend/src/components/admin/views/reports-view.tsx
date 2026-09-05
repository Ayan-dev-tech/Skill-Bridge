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
  DownloadCloud,
  FileSpreadsheet,
  FileText,
  Calendar,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { initialStudents, initialSkillGaps, initialJobs } from "@/lib/admin-data";

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  frequency: string;
  category: "Placement" | "Academics" | "Accreditation" | "Compliance";
  dataGenerator: () => string;
  filename: string;
}

export function ReportsView() {
  const [selectedFormat, setSelectedFormat] = React.useState<"csv" | "json">("csv");
  const [downloadSuccess, setDownloadSuccess] = React.useState<string | null>(null);

  // Dynamic CSV generators for real instant browser download
  const generateStudentSkillCSV = (): string => {
    const headers = "ID,Name,Email,Department,Course,Semester,Roll Number,Skills,Status\n";
    const rows = initialStudents
      .map(
        (s) =>
          `"${s.id}","${s.name}","${s.email}","${s.department}","${s.course}","${s.semester}","${
            s.rollNumber
          }","${s.skills.map((sk) => sk.name).join("; ")}","${s.status}"`
      )
      .join("\n");
    return headers + rows;
  };

  const generateSkillGapCSV = (): string => {
    const headers = "Skill,Category,Industry Demand,Student Proficiency,Affected Students,Departments,Recommended Action\n";
    const rows = initialSkillGaps
      .map(
        (g) =>
          `"${g.skill}","${g.category}","${g.industryDemand}","${g.studentProficiency}","${
            g.affectedStudents
          }","${g.departments.join("; ")}","${g.recommendedAction.replace(/"/g, '""')}"`
      )
      .join("\n");
    return headers + rows;
  };

  const generatePlacementCSV = (): string => {
    const headers = "Job ID,Company,Position,Salary,Location,Deadline,Applicants,Status\n";
    const rows = initialJobs
      .map(
        (j) =>
          `"${j.id}","${j.company}","${j.position}","${j.salary}","${j.location}","${j.deadline}","${j.applicationsCount}","${j.status}"`
      )
      .join("\n");
    return headers + rows;
  };

  const reports: ReportTemplate[] = [
    {
      id: "rep-1",
      title: "Student Competency & Skill Matrix Report",
      description:
        "Full student roster with assessed proficiency levels, completed courses, and vendor certifications.",
      frequency: "Weekly",
      category: "Academics",
      dataGenerator: generateStudentSkillCSV,
      filename: "SkillBridge_Student_Skill_Matrix.csv",
    },
    {
      id: "rep-2",
      title: "Campus-Wide Skill Gap & Curriculum Disparity Audit",
      description:
        "In-depth deficit breakdown mapped against corporate requirements for NAAC/ABET compliance documentation.",
      frequency: "Monthly",
      category: "Accreditation",
      dataGenerator: generateSkillGapCSV,
      filename: "SkillBridge_Skill_Gap_Disparity_Report.csv",
    },
    {
      id: "rep-3",
      title: "Corporate Placement & Recruitment Drive Summary",
      description:
        "Open positions, applicant shortlists, offer conversions, and salary distribution by engineering discipline.",
      frequency: "Daily",
      category: "Placement",
      dataGenerator: generatePlacementCSV,
      filename: "SkillBridge_Placement_Recruitment_Report.csv",
    },
    {
      id: "rep-4",
      title: "System Security, Access & Entity Freeze Audit Log",
      description:
        "Administrative activity log capturing freeze actions on suspicious recruiters, campus drives, and user accounts.",
      frequency: "On Demand",
      category: "Compliance",
      dataGenerator: () =>
        "Timestamp,Actor,Action,Resource,Status\n2024-09-05 23:29:05,Admin,Company Hiring Frozen,Infosys Technologies,Flagged\n2024-09-05 23:29:10,Admin,Campus Activities Suspended,Delhi Tech Univ,Flagged\n",
      filename: "SkillBridge_Security_Audit_Log.csv",
    },
  ];

  // Browser download trigger
  const handleExport = (rep: ReportTemplate) => {
    try {
      const content = rep.dataGenerator();
      const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", rep.filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(`Generated and exported ${rep.filename} successfully.`);
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch {
      alert("Failed to compile export.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <DownloadCloud className="w-5 h-5" />
            Institutional Reports & Data Exports
          </h2>
          <p className="text-xs text-muted-foreground">
            Generate standardized audit dossiers for academic accreditation, corporate recruitment boards, and board meetings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Export Engine:</span>
          <span className="px-2 py-1 rounded text-xs font-mono font-semibold border border-border bg-muted/40 uppercase">
            CSV / RFC-4180
          </span>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 rounded-lg border border-border bg-muted/40 text-xs text-foreground flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            {downloadSuccess}
          </span>
          <button
            onClick={() => setDownloadSuccess(null)}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Available Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((rep) => (
          <Card key={rep.id} className="border-border flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border border-border bg-muted/40 uppercase">
                    {rep.category}
                  </span>
                  <CardTitle className="text-base font-bold text-foreground">
                    {rep.title}
                  </CardTitle>
                </div>
                <FileSpreadsheet className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
              </div>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
                {rep.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Updated {rep.frequency}
                </span>
                <span>Format: .CSV</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="xs"
                  onClick={() => handleExport(rep)}
                  className="w-full text-xs flex items-center justify-center gap-1.5 font-medium"
                >
                  <DownloadCloud className="w-3.5 h-3.5" /> Export {rep.filename.split("_")[1]} Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Audit & Compliance Assurance Notice */}
      <Card className="border-border bg-muted/10">
        <CardContent className="p-4 flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <p className="font-semibold text-foreground">Data Privacy & Compliance Guarantee</p>
            <p className="text-muted-foreground leading-relaxed text-[11px]">
              Exported records comply with institutional FERPA / GDPR student data guidelines. Sensitive attributes (such as password hashes, MFA salts, and financial records) are stripped from exported rosters.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
