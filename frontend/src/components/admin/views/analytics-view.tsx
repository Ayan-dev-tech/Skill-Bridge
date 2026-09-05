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
  BarChart3,
  TrendingUp,
  Award,
  Briefcase,
  Users,
  Building2,
  Calendar,
  ArrowUpRight,
  Download,
} from "lucide-react";

export function AnalyticsView() {
  const [timeRange, setTimeRange] = React.useState<"30d" | "90d" | "1y">("90d");

  // Mock analytics dataset
  const skillDemandTrend = [
    { skill: "Python & Data APIs", demand: 94, studentsEquipped: 78, delta: "+18%" },
    { skill: "AWS / Cloud Infrastructure", demand: 91, studentsEquipped: 42, delta: "+24%" },
    { skill: "Docker & Container Ops", demand: 86, studentsEquipped: 38, delta: "+15%" },
    { skill: "PostgreSQL & Vector Indexes", demand: 82, studentsEquipped: 64, delta: "+12%" },
    { skill: "PyTorch & Deep Learning", demand: 79, studentsEquipped: 31, delta: "+35%" },
    { skill: "React & Next.js Systems", demand: 75, studentsEquipped: 85, delta: "+8%" },
  ];

  const placementPipeline = [
    { stage: "Total Registered Eligible Students", count: 1240, percentage: 100 },
    { stage: "Skill Assessment Cleared (>70%)", count: 860, percentage: 69.3 },
    { stage: "Industry Resume Shortlisted", count: 520, percentage: 41.9 },
    { stage: "Interview Round Completed", count: 310, percentage: 25.0 },
    { stage: "Offers Extended & Accepted", count: 218, percentage: 17.5 },
  ];

  const departmentPerformance = [
    { dept: "Computer Science", avgScore: 84.2, placedRate: 88, certifications: 340 },
    { dept: "Information Technology", avgScore: 79.5, placedRate: 82, certifications: 215 },
    { dept: "Artificial Intelligence", avgScore: 82.1, placedRate: 85, certifications: 160 },
    { dept: "Computer Applications", avgScore: 71.8, placedRate: 64, certifications: 98 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Institutional Analytics & Insights
          </h2>
          <p className="text-xs text-muted-foreground">
            Longitudinal telemetry of skill acquisition, corporate demand trends, and campus placement conversion.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-border bg-muted/40 p-0.5 text-xs">
            {(["30d", "90d", "1y"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  timeRange === range
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="xs"
            onClick={() => alert("Exporting aggregated telemetry JSON / CSV...")}
            className="text-xs flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> Export Data
          </Button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Campus Placement Conversion</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold font-mono">76.4%</p>
              <span className="text-[11px] font-medium text-emerald-500 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +5.2%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Average Assessment Proficiency</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold font-mono">72.8%</p>
              <span className="text-[11px] font-mono text-muted-foreground">Across 546 tests</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Industry Recruiters Active</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold font-mono">42</p>
              <span className="text-[11px] font-mono text-muted-foreground">165 open roles</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Total Skill Badges Awarded</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold font-mono">813</p>
              <span className="text-[11px] font-medium text-emerald-500 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +42 this mo
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Skill Demand Disparity vs Placement Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Industry Demand vs Student Readiness */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Recruitment Demand vs Student Readiness</span>
              <span className="text-xs font-mono text-muted-foreground font-normal">Indexed 0–100</span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Direct comparison between market hiring appetite and evaluated student capability.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillDemandTrend.map((item, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{item.skill}</span>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-foreground">Demand: {item.demand}%</span>
                    <span className="text-muted-foreground">Ready: {item.studentsEquipped}%</span>
                    <span className="text-emerald-500 font-bold">{item.delta}</span>
                  </div>
                </div>

                {/* Comparative bar */}
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className="bg-foreground h-full rounded-l-full"
                    style={{ width: `${item.demand}%` }}
                    title={`Industry Demand: ${item.demand}%`}
                  />
                </div>
                <div className="w-full h-1.5 bg-muted/60 rounded-full overflow-hidden flex">
                  <div
                    className="bg-muted-foreground/60 h-full rounded-l-full"
                    style={{ width: `${item.studentsEquipped}%` }}
                    title={`Student Readiness: ${item.studentsEquipped}%`}
                  />
                </div>
              </div>
            ))}
            <div className="pt-2 flex items-center justify-end gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-foreground inline-block" />
                Industry Demand
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-muted-foreground/60 inline-block" />
                Student Competency
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Placement Conversion Funnel */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Campus Recruitment Funnel</span>
              <span className="text-xs font-mono text-muted-foreground font-normal">2024-2025 Cycle</span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Drop-off rate across stages of company drives, assessments, and offer letters.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {placementPipeline.map((stage, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">{stage.stage}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-foreground">{stage.count}</span>
                    <span className="text-muted-foreground text-[11px]">({stage.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="bg-foreground h-full rounded-full transition-all"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="p-3 mt-4 rounded-lg border border-border bg-muted/20 text-[11px] text-muted-foreground flex items-center justify-between">
              <span>Highest attrition point: <strong>Technical Assessment to Shortlist</strong></span>
              <Button
                variant="outline"
                size="xs"
                onClick={() => alert("Initiating remedial aptitude modules.")}
                className="text-[10px]"
              >
                Plan Remedial Drive
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Breakdown Table */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold">Academic Department Performance Matrix</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Standardized evaluation scores, placement success rates, and external certification counts by department.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                  <th className="p-3 pl-6">Department</th>
                  <th className="p-3">Diagnostic Average Score</th>
                  <th className="p-3">Placement Placement Rate</th>
                  <th className="p-3">Certified Students</th>
                  <th className="p-3 pr-6 text-right">Intervention Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {departmentPerformance.map((dept, i) => (
                  <tr key={i} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 pl-6 font-semibold text-foreground">{dept.dept}</td>
                    <td className="p-3 font-mono font-medium">{dept.avgScore}%</td>
                    <td className="p-3 font-mono font-bold text-foreground">{dept.placedRate}%</td>
                    <td className="p-3 font-mono">{dept.certifications} verified</td>
                    <td className="p-3 pr-6 text-right">
                      {dept.placedRate < 70 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border border-rose-500/40 bg-rose-500/10 text-rose-500">
                          Remediation Required
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border border-border bg-muted/40 text-foreground">
                          On Track
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
