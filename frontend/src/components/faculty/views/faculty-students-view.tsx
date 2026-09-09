"use client";

import * as React from "react";
import {
  Users,
  Search,
  Filter,
  Eye,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { FacultyStudentDetailView } from "./faculty-student-detail-view";
import type { FacultyStudentRecord } from "@/lib/faculty/types";

interface FacultyStudentsViewProps {
  initialSelectedStudentId?: string | null;
}

export function FacultyStudentsView({ initialSelectedStudentId }: FacultyStudentsViewProps) {
  const [selectedStudentId, setSelectedStudentId] = React.useState<string | null>(
    initialSelectedStudentId || null
  );

  React.useEffect(() => {
    setSelectedStudentId(initialSelectedStudentId || null);
  }, [initialSelectedStudentId]);

  const [students, setStudents] = React.useState<FacultyStudentRecord[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [courseFilter, setCourseFilter] = React.useState("all");
  const [semesterFilter, setSemesterFilter] = React.useState("all");
  const [placementFilter, setPlacementFilter] = React.useState("all");
  const [attentionOnly, setAttentionOnly] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchStudents = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (courseFilter !== "all") params.set("course", courseFilter);
      if (semesterFilter !== "all") params.set("semester", semesterFilter);
      if (placementFilter !== "all") params.set("placementStatus", placementFilter);
      if (attentionOnly) params.set("needsAttention", "true");
      params.set("page", String(page));
      params.set("limit", "10");

      const res = await fetch(`/api/faculty/students?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load students");
      const json = await res.json();
      if (json.success) {
        setStudents(json.students);
        setTotalCount(json.totalCount);
        setTotalPages(json.totalPages);
      } else {
        throw new Error(json.error || "Failed to load students");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error connecting to student API");
    } finally {
      setIsLoading(false);
    }
  }, [search, courseFilter, semesterFilter, placementFilter, attentionOnly, page]);

  React.useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  if (selectedStudentId) {
    return (
      <FacultyStudentDetailView
        studentId={selectedStudentId}
        onBack={() => setSelectedStudentId(null)}
      />
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            My Assigned Scholars
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Authoritative student roster within your academic department ({totalCount} enrolled scholars).
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchStudents} className="text-xs">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          Refresh Roster
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 bg-card border-border space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name, roll number, email, or skill..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9 text-xs h-9"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Semester Filter */}
            <select
              value={semesterFilter}
              onChange={(e) => {
                setSemesterFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by Semester"
              className="text-xs h-9 px-2.5 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="all">All Semesters</option>
              <option value="4">Semester 4</option>
              <option value="6">Semester 6</option>
              <option value="8">Semester 8</option>
            </select>

            {/* Placement Filter */}
            <select
              value={placementFilter}
              onChange={(e) => {
                setPlacementFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by Placement Status"
              className="text-xs h-9 px-2.5 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="all">All Placement Statuses</option>
              <option value="eligible">Eligible</option>
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interviewed">Interviewed</option>
              <option value="selected">Placed</option>
              <option value="not_applied">Not Applied</option>
            </select>

            {/* Needs Attention Toggle */}
            <Button
              variant={attentionOnly ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setAttentionOnly(!attentionOnly);
                setPage(1);
              }}
              className="text-xs h-9 gap-1.5"
            >
              <AlertTriangle className={`h-3.5 w-3.5 ${attentionOnly ? "text-white" : "text-amber-500"}`} />
              Needs Attention
            </Button>
          </div>
        </div>
      </Card>

      {/* Primary Data-Heavy Table */}
      <Card className="bg-card border-border overflow-hidden">
        <CardHeader className="py-3 px-4 border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">Scholar Enrolment Table</CardTitle>
            <span className="text-xs text-muted-foreground">Showing {students.length} of {totalCount}</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded" />
              ))}
            </div>
          ) : error ? (
            <div className="p-6 text-center text-xs text-destructive">{error}</div>
          ) : students.length === 0 ? (
            <div className="p-12 text-center text-xs text-muted-foreground">
              No authorized student scholars found matching current search/filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs font-bold text-muted-foreground">Roll No.</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Scholar Name</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Course & Sem</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Career Domain</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Test Score</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Skill Gaps</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Placement</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id} className="border-border hover:bg-muted/40 text-xs">
                      <TableCell className="font-mono font-medium text-foreground">{student.rollNumber}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground flex items-center gap-1.5">
                            {student.fullName}
                            {student.needsAttention && (
                              <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" title="Needs Academic Attention" />
                            )}
                          </span>
                          <span className="text-[10px] text-muted-foreground truncate">{student.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-[11px]">
                          <span className="text-foreground">{student.course}</span>
                          <span className="text-muted-foreground">Sem {student.semester}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {student.interestDomain ? (
                          <Badge variant="secondary" className="text-[10px] truncate max-w-[140px]">
                            {student.interestDomain}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground italic">Pending</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {student.scorePercent !== null && student.scorePercent !== undefined ? (
                          <span className="font-mono font-bold text-foreground">{student.scorePercent}%</span>
                        ) : (
                          <span className="text-muted-foreground">--</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {student.skillGapsCount > 0 ? (
                          <Badge variant="destructive" className="text-[10px]">
                            {student.skillGapsCount} gaps
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.placementStatus === "selected"
                              ? "default"
                              : student.placementStatus === "shortlisted" || student.placementStatus === "interviewed"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-[10px] capitalize"
                        >
                          {student.placementStatus.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedStudentId(student.id)}
                          className="h-8 px-2 text-xs font-semibold hover:bg-primary/10 hover:text-primary"
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" /> View Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
          <span className="text-muted-foreground">
            Page {page} of {totalPages} ({totalCount} scholars)
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="h-8 px-2 text-xs"
            >
              <ChevronLeft className="h-3.5 w-3.5 mr-1" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="h-8 px-2 text-xs"
            >
              Next <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
