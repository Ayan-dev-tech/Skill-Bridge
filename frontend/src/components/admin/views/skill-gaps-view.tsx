"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  TrendingUp,
  Search,
  Filter,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Download,
  Users,
  CheckCircle,
} from "lucide-react";
import {
  initialSkillGaps,
  initialStudents,
  SkillGapMetric,
  StudentProfile,
} from "@/lib/admin-data";

export function SkillGapsView() {
  const [gaps, setGaps] = React.useState<SkillGapMetric[]>(initialSkillGaps);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [departmentFilter, setDepartmentFilter] = React.useState("All");
  const [selectedGap, setSelectedGap] = React.useState<SkillGapMetric | null>(null);
  const [actionSuccess, setActionSuccess] = React.useState<string | null>(null);

  // Departments list for filter
  const departments = [
    "All",
    "Computer Science",
    "Information Technology",
    "Computer Applications",
    "Artificial Intelligence",
    "Data Science",
  ];

  const filteredGaps = React.useMemo(() => {
    return gaps.filter((g) => {
      if (departmentFilter !== "All" && !g.departments.includes(departmentFilter)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          g.skill.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.recommendedAction.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [gaps, departmentFilter, searchQuery]);

  // Find students affected by selected gap
  const affectedStudentList = React.useMemo(() => {
    if (!selectedGap) return [];
    return initialStudents.filter((s) =>
      s.skillGaps.some((gap) =>
        gap.skill.toLowerCase().includes(selectedGap.skill.toLowerCase().split(" ")[0])
      )
    );
  }, [selectedGap]);

  const handleLaunchIntervention = (gap: SkillGapMetric) => {
    setActionSuccess(`Initiated curriculum action plan: "${gap.recommendedAction.slice(0, 48)}..."`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Critical Gaps Identified</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold font-mono">5</p>
              <span className="text-[11px] font-medium text-destructive flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> High Urgency
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Total Students Impacted</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold font-mono">805</p>
              <span className="text-[11px] text-muted-foreground font-mono">Across 5 Depts</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Top Deficit Domain</p>
            <div className="flex items-baseline justify-between">
              <p className="text-lg font-bold truncate">Cloud & DevOps</p>
              <span className="text-[11px] font-mono text-muted-foreground">402 students</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Interventions Active</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold font-mono">3</p>
              <span className="text-[11px] text-foreground font-medium flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Bootcamps Live
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {actionSuccess && (
        <div className="p-3.5 rounded-lg border border-border bg-muted/40 text-xs text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            {actionSuccess}
          </span>
          <button
            onClick={() => setActionSuccess(null)}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Table Card */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-foreground" />
                Institutional Skill Gap Analysis
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                College-wide disparity matrix between corporate recruitment demand and assessed student proficiency.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search skill, domain, action..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-xs pl-8"
                />
              </div>
            </div>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-border mt-3">
            <span className="text-xs text-muted-foreground flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Dept:
            </span>
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={departmentFilter === dept ? "default" : "outline"}
                size="xs"
                onClick={() => setDepartmentFilter(dept)}
                className="text-xs"
              >
                {dept}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                  <th className="p-3 pl-6">Skill & Domain</th>
                  <th className="p-3">Industry Demand</th>
                  <th className="p-3">Avg Student Level</th>
                  <th className="p-3">Impact Radius</th>
                  <th className="p-3">Departments</th>
                  <th className="p-3">Recommended Bridge Action</th>
                  <th className="p-3 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredGaps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                      No skill gaps match the selected criteria.
                    </td>
                  </tr>
                ) : (
                  filteredGaps.map((gap, idx) => {
                    const isHighRisk =
                      gap.industryDemand === "Very High" &&
                      (gap.studentProficiency === "Low" || gap.studentProficiency === "Beginner");

                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          isHighRisk ? "bg-muted/10 hover:bg-muted/20" : "hover:bg-muted/20"
                        }`}
                      >
                        <td className="p-3 pl-6">
                          <p className="font-semibold text-foreground flex items-center gap-1.5">
                            {isHighRisk && (
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" title="Critical Deficit" />
                            )}
                            {gap.skill}
                          </p>
                          <p className="text-[11px] text-muted-foreground">{gap.category}</p>
                        </td>

                        <td className="p-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${
                              gap.industryDemand === "Very High"
                                ? "border-foreground bg-foreground text-background"
                                : "border-border bg-muted/40 text-foreground"
                            }`}
                          >
                            {gap.industryDemand} Demand
                          </span>
                        </td>

                        <td className="p-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${
                              gap.studentProficiency === "Low" || gap.studentProficiency === "Beginner"
                                ? "border-rose-500/30 bg-rose-500/10 text-rose-500 dark:text-rose-400"
                                : "border-border bg-muted/20 text-muted-foreground"
                            }`}
                          >
                            {gap.studentProficiency}
                          </span>
                        </td>

                        <td className="p-3 font-mono">
                          <button
                            onClick={() => setSelectedGap(gap)}
                            className="font-bold underline hover:text-foreground text-muted-foreground cursor-pointer"
                            title="Click to view affected students"
                          >
                            {gap.affectedStudents} students
                          </button>
                        </td>

                        <td className="p-3 text-[11px] text-muted-foreground max-w-[200px] truncate">
                          {gap.departments.join(", ")}
                        </td>

                        <td className="p-3 text-[11px] text-muted-foreground max-w-[280px]">
                          <div className="flex items-start gap-1">
                            <Lightbulb className="w-3.5 h-3.5 shrink-0 text-foreground mt-0.5" />
                            <span className="line-clamp-2">{gap.recommendedAction}</span>
                          </div>
                        </td>

                        <td className="p-3 pr-6 text-right space-x-2 whitespace-nowrap">
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => setSelectedGap(gap)}
                            className="text-[11px]"
                          >
                            Drill Down
                          </Button>
                          <Button
                            variant="default"
                            size="xs"
                            onClick={() => handleLaunchIntervention(gap)}
                            className="text-[11px]"
                          >
                            Deploy Plan
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Drill Down Detail Drawer */}
      <Sheet open={!!selectedGap} onOpenChange={(open: boolean) => !open && setSelectedGap(null)}>
        <SheetContent className="sm:max-w-xl w-full p-6 overflow-y-auto space-y-6">
          {selectedGap && (
            <>
              <SheetHeader className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-border bg-muted/40">
                    {selectedGap.category}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-foreground bg-foreground text-background">
                    {selectedGap.industryDemand} Demand
                  </span>
                </div>
                <SheetTitle className="text-xl font-bold">{selectedGap.skill}</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  Targeted analysis of {selectedGap.affectedStudents} students requiring upskilling intervention.
                </SheetDescription>
              </SheetHeader>

              {/* Action Plan Box */}
              <div className="p-4 rounded-lg border border-border bg-muted/20 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 text-foreground">
                  <Lightbulb className="w-4 h-4" /> Recommended Curriculum Action
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedGap.recommendedAction}
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <Button
                    size="xs"
                    onClick={() => handleLaunchIntervention(selectedGap)}
                    className="text-xs"
                  >
                    Authorize Campus Workshop
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => alert(`Exporting cohort CSV for ${selectedGap.skill}...`)}
                    className="text-xs flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> Export List
                  </Button>
                </div>
              </div>

              {/* Impacted Departments */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Impacted Academic Departments
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedGap.departments.map((dept, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-background"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Students In Deficit */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Sample Student Cohort
                  </p>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    Showing high priority cases
                  </span>
                </div>

                <div className="space-y-2">
                  {affectedStudentList.length > 0 ? (
                    affectedStudentList.map((stu) => (
                      <div
                        key={stu.id}
                        className="p-3 rounded-md border border-border bg-card flex items-center justify-between"
                      >
                        <div className="space-y-0.5">
                          <p className="font-semibold text-xs text-foreground">{stu.name}</p>
                          <p className="text-[11px] text-muted-foreground font-mono">
                            {stu.rollNumber} • {stu.department} (Sem {stu.semester})
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border border-rose-500/40 bg-rose-500/10 text-rose-500">
                            High Deficit
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-muted-foreground border border-dashed border-border rounded-lg">
                      All sample students currently meet baseline criteria.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
