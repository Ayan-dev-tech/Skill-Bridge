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
import { StudentProfile } from "@/lib/admin-data";
import { X, Search, Filter, ArrowUpDown, Eye, UserX, UserCheck } from "lucide-react";

interface StudentsViewProps {
  students: StudentProfile[];
  onToggleStatus: (studentId: string) => void;
}

export function StudentsView({ students, onToggleStatus }: StudentsViewProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [deptFilter, setDeptFilter] = React.useState<string>("All");
  const [semFilter, setSemFilter] = React.useState<string>("All");
  const [sortField, setSortField] = React.useState<"name" | "semester" | "department">("name");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [selectedStudent, setSelectedStudent] = React.useState<StudentProfile | null>(null);
  const [page, setPage] = React.useState(1);
  const pageSize = 5;

  const departments = React.useMemo(() => {
    const set = new Set(students.map((s) => s.department));
    return ["All", ...Array.from(set)];
  }, [students]);

  const semesters = ["All", "1", "2", "3", "4", "5", "6", "7", "8"];

  const filtered = React.useMemo(() => {
    return students
      .filter((s) => {
        if (deptFilter !== "All" && s.department !== deptFilter) return false;
        if (semFilter !== "All" && String(s.semester) !== semFilter) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const skillsMatch = s.skills.some((sk) => sk.name.toLowerCase().includes(q));
          return (
            s.name.toLowerCase().includes(q) ||
            s.email.toLowerCase().includes(q) ||
            s.rollNumber.toLowerCase().includes(q) ||
            skillsMatch
          );
        }
        return true;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [students, deptFilter, semFilter, searchQuery, sortField, sortOrder]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (field: "name" | "semester" | "department") => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold">Students Directory</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Total {students.length} registered students across all undergraduate & postgraduate programs.
              </CardDescription>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-muted-foreground" />
              <Input
                placeholder="Search name, roll #, skill..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-8 text-xs h-8"
              />
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border mt-3 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Filter className="w-3.5 h-3.5" />
              <span className="font-medium">Filters:</span>
            </div>

            {/* Department Dropdown */}
            <select
              value={deptFilter}
              onChange={(e) => {
                setDeptFilter(e.target.value);
                setPage(1);
              }}
              className="h-7 text-xs rounded border border-border bg-background px-2 text-foreground outline-none"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  Dept: {d}
                </option>
              ))}
            </select>

            {/* Semester Dropdown */}
            <select
              value={semFilter}
              onChange={(e) => {
                setSemFilter(e.target.value);
                setPage(1);
              }}
              className="h-7 text-xs rounded border border-border bg-background px-2 text-foreground outline-none"
            >
              {semesters.map((s) => (
                <option key={s} value={s}>
                  Sem: {s}
                </option>
              ))}
            </select>

            {(deptFilter !== "All" || semFilter !== "All" || searchQuery) && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => {
                  setDeptFilter("All");
                  setSemFilter("All");
                  setSearchQuery("");
                  setPage(1);
                }}
                className="text-[11px] h-7 text-muted-foreground hover:text-foreground"
              >
                Reset Filters
              </Button>
            )}
          </div>
        </CardHeader>

        {/* Table View */}
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                  <th className="p-3 pl-6">
                    <button
                      onClick={() => toggleSort("name")}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      Student Name & Roll <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="p-3">
                    <button
                      onClick={() => toggleSort("department")}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      Department / Course <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="p-3">
                    <button
                      onClick={() => toggleSort("semester")}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      Sem <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="p-3">Skills & Proficiency</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      No student records matched the criteria.
                    </td>
                  </tr>
                ) : (
                  paginated.map((student) => (
                    <tr key={student.id} className="hover:bg-muted/20 transition-colors">
                      <td className="p-3 pl-6">
                        <p className="font-semibold text-foreground">{student.name}</p>
                        <p className="text-muted-foreground font-mono text-[11px]">{student.rollNumber}</p>
                      </td>
                      <td className="p-3">
                        <p className="font-medium text-foreground">{student.department}</p>
                        <p className="text-muted-foreground text-[11px]">{student.course}</p>
                      </td>
                      <td className="p-3 font-mono font-semibold">Sem {student.semester}</td>
                      <td className="p-3 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {student.skills.slice(0, 3).map((sk, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] border border-border bg-muted/30"
                            >
                              {sk.name} ({sk.proficiency[0]})
                            </span>
                          ))}
                          {student.skills.length > 3 && (
                            <span className="text-[10px] text-muted-foreground">+{student.skills.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            student.status === "active"
                              ? "bg-foreground text-background"
                              : "border border-destructive/40 text-destructive bg-destructive/10"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="p-3 pr-6 text-right space-x-1.5">
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => setSelectedStudent(student)}
                          className="h-7 gap-1 text-[11px]"
                        >
                          <Eye className="w-3 h-3" /> View Profile
                        </Button>
                        <Button
                          variant={student.status === "active" ? "ghost" : "outline"}
                          size="xs"
                          onClick={() => onToggleStatus(student.id)}
                          className="h-7 text-[11px] text-muted-foreground hover:text-foreground"
                          title={student.status === "active" ? "Deactivate account" : "Activate account"}
                        >
                          {student.status === "active" ? <UserX className="w-3.5 h-3.5 text-destructive" /> : <UserCheck className="w-3.5 h-3.5" />}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="p-3 px-6 flex items-center justify-between border-t border-border text-xs text-muted-foreground">
            <span>
              Showing {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, filtered.length)} of {filtered.length} students
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="xs"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="h-7 text-xs"
              >
                Previous
              </Button>
              <span className="px-2 font-mono text-[11px]">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="xs"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="h-7 text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Slide-Over Profile Sheet / Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedStudent(null)}
          />
          <div className="relative w-full max-w-xl h-full bg-background border-l border-border shadow-2xl p-6 overflow-y-auto space-y-6 text-xs text-foreground z-10">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-foreground">{selectedStudent.name}</h3>
                <p className="text-muted-foreground font-mono text-xs">{selectedStudent.email}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded border border-border bg-muted/30">
                    {selectedStudent.rollNumber}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-[11px] font-medium">{selectedStudent.course} (Sem {selectedStudent.semester})</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 rounded text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 1. Academic Information */}
            <div className="space-y-2">
              <p className="font-semibold text-foreground uppercase tracking-wider text-[10px] text-muted-foreground">
                Academic Information
              </p>
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg border border-border bg-muted/20">
                <div>
                  <span className="text-muted-foreground text-[11px]">Department</span>
                  <p className="font-medium text-foreground">{selectedStudent.department}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-[11px]">Program / Course</span>
                  <p className="font-medium text-foreground">{selectedStudent.course}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-[11px]">Current Semester</span>
                  <p className="font-medium text-foreground">Semester {selectedStudent.semester}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-[11px]">Status</span>
                  <p className="font-medium capitalize text-foreground">{selectedStudent.status}</p>
                </div>
              </div>
            </div>

            {/* 2. Skills & Proficiency */}
            <div className="space-y-2">
              <p className="font-semibold text-foreground uppercase tracking-wider text-[10px] text-muted-foreground">
                Evaluated Skills & Proficiency
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.skills.map((sk, i) => (
                  <div key={i} className="p-2 px-3 rounded-md border border-border bg-card">
                    <span className="font-semibold text-foreground">{sk.name}</span>
                    <span className="text-muted-foreground text-[11px] ml-1.5">• {sk.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Skill Gap Analysis (Highlighted) */}
            <div className="space-y-2">
              <p className="font-semibold text-foreground uppercase tracking-wider text-[10px] text-muted-foreground">
                Detected Skill Gaps for Industry Target
              </p>
              {selectedStudent.skillGaps.length === 0 ? (
                <p className="text-muted-foreground italic">No critical skill gaps identified.</p>
              ) : (
                <div className="space-y-2">
                  {selectedStudent.skillGaps.map((gap, i) => (
                    <div key={i} className="p-2.5 rounded-lg border border-border bg-muted/20 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{gap.skill}</p>
                        <p className="text-muted-foreground text-[11px]">
                          Current: {gap.currentLevel} → Target: {gap.requiredLevel}
                        </p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                        gap.priority === "High" ? "border-destructive/40 text-destructive bg-destructive/10" : "border-border text-muted-foreground"
                      }`}>
                        {gap.priority} Priority
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Certifications */}
            <div className="space-y-2">
              <p className="font-semibold text-foreground uppercase tracking-wider text-[10px] text-muted-foreground">
                Verified Certifications ({selectedStudent.certifications.length})
              </p>
              <div className="space-y-1.5">
                {selectedStudent.certifications.map((c, i) => (
                  <div key={i} className="p-2.5 rounded border border-border bg-card flex justify-between items-center">
                    <div>
                      <p className="font-medium text-foreground">{c.title}</p>
                      <p className="text-muted-foreground text-[11px]">{c.issuer} • {c.date}</p>
                    </div>
                    {c.verified && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-500">
                        Verified
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Projects */}
            <div className="space-y-2">
              <p className="font-semibold text-foreground uppercase tracking-wider text-[10px] text-muted-foreground">
                Academic & Portfolio Projects
              </p>
              <div className="space-y-2">
                {selectedStudent.projects.map((p, i) => (
                  <div key={i} className="p-3 rounded border border-border bg-card space-y-1">
                    <p className="font-semibold text-foreground">{p.title}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{p.tech}</p>
                    <p className="text-muted-foreground text-[11px]">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Career Interests & Application History */}
            <div className="space-y-2">
              <p className="font-semibold text-foreground uppercase tracking-wider text-[10px] text-muted-foreground">
                Career Goals & Opportunity Outcomes
              </p>
              <div className="p-3 rounded border border-border bg-muted/20 space-y-2">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {selectedStudent.careerInterests.map((interest, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full border border-border bg-card text-[11px]">
                      {interest}
                    </span>
                  ))}
                </div>
                <div className="divide-y divide-border pt-2">
                  {selectedStudent.applications.map((app, i) => (
                    <div key={i} className="py-2 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-foreground">{app.role}</p>
                        <p className="text-muted-foreground text-[11px]">{app.company} • {app.date}</p>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded border border-border">
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
                Close Profile
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
