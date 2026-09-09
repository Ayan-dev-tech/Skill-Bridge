"use client";

import * as React from "react";
import {
  Users,
  Search,
  Filter,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  BookOpen,
  Award,
  ExternalLink,
  ShieldCheck,
  Briefcase,
  Layers,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { CampusStudentRecord, CampusStudentProfileDetail } from "@/lib/campus/types";

export function CampusStudentsView() {
  const [students, setStudents] = React.useState<CampusStudentRecord[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Filters
  const [search, setSearch] = React.useState("");
  const [selectedDept, setSelectedDept] = React.useState("all");
  const [selectedPlacementStatus, setSelectedPlacementStatus] = React.useState("all");

  // Detailed view drawer
  const [selectedStudentId, setSelectedStudentId] = React.useState<string | null>(null);
  const [studentDetail, setStudentDetail] = React.useState<CampusStudentProfileDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = React.useState(false);

  const fetchStudents = React.useCallback(async (pageNum: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: String(pageNum),
        limit: "10",
      });

      if (search.trim()) params.append("search", search.trim());
      if (selectedDept !== "all") params.append("department", selectedDept);
      if (selectedPlacementStatus !== "all") params.append("placementStatus", selectedPlacementStatus);

      const headers: Record<string, string> = {};
      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("skill_bridge_user");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.id) headers["x-campus-id"] = parsed.id;
          } catch {}
        }
      }

      const res = await fetch(`/api/campus/students?${params.toString()}`, { headers });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load student directory.");
      }

      setStudents(json.students || []);
      setTotalCount(json.totalCount || 0);
      setPage(json.page || 1);
      setTotalPages(json.totalPages || 1);
    } catch (err: unknown) {
      console.error("Student fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to load student directory.");
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedDept, selectedPlacementStatus]);

  React.useEffect(() => {
    fetchStudents(1);
  }, [fetchStudents]);

  // Fetch detailed student profile when selected
  const handleOpenDetail = async (studentId: string) => {
    setSelectedStudentId(studentId);
    setIsDetailLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("skill_bridge_user");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.id) headers["x-campus-id"] = parsed.id;
          } catch {}
        }
      }
      const res = await fetch(`/api/campus/students?studentId=${studentId}`, { headers });
      const json = await res.json();
      if (res.ok && json.success) {
        setStudentDetail(json.student);
      } else {
        throw new Error(json.error || "Failed to load profile details.");
      }
    } catch (err) {
      console.error("Failed to load student details:", err);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleCloseDetail = () => {
    setSelectedStudentId(null);
    setStudentDetail(null);
  };

  // Distinct departments from current dataset
  const departments = React.useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => {
      if (s.department) set.add(s.department);
    });
    return Array.from(set);
  }, [students]);

  const getPlacementBadgeVariant = (status: string) => {
    switch (status) {
      case "selected":
      case "placed":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "interviewed":
      case "shortlisted":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
      case "applied":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-border bg-muted/40 text-[11px] text-muted-foreground font-medium mb-1">
            <GraduationCap className="w-3 h-3 text-foreground" />
            <span>Institutional Student Management</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-foreground font-semibold">{totalCount} Enrolled</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Student Talent & Academic Records
          </h1>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Explore authoritative student profiles, academic qualifications, verified skills, documentation status, and real-time placement milestones.
          </p>
        </div>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Institutional Directory Error</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button size="sm" variant="outline" onClick={() => fetchStudents(page)} className="h-6 text-xs ml-4">
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Search & Filter Toolbar */}
      <Card className="border-border bg-card">
        <CardContent className="p-3.5">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search students by name, roll number, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 text-xs h-9"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="text-xs h-9 px-3 rounded-md border border-border bg-background text-foreground shrink-0"
              >
                <option value="all">All Departments</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                value={selectedPlacementStatus}
                onChange={(e) => setSelectedPlacementStatus(e.target.value)}
                className="text-xs h-9 px-3 rounded-md border border-border bg-background text-foreground shrink-0"
              >
                <option value="all">All Placement Status</option>
                <option value="placed">Placed / Selected</option>
                <option value="interviewed">Interviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="applied">Applied</option>
                <option value="eligible">Eligible</option>
              </select>

              {(search || selectedDept !== "all" || selectedPlacementStatus !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setSelectedDept("all");
                    setSelectedPlacementStatus("all");
                  }}
                  className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student List / Table */}
      <Card className="border-border bg-card">
        <CardHeader className="p-4 pb-2 border-b border-border flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">
              Students ({totalCount})
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Page {page} of {totalPages || 1}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || isLoading}
              onClick={() => fetchStudents(page - 1)}
              className="h-7 px-2 text-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages || isLoading}
              onClick={() => fetchStudents(page + 1)}
              className="h-7 px-2 text-xs"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : students.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <Users className="w-8 h-8 text-muted-foreground mx-auto" />
              <p className="text-sm font-medium text-foreground">No students found</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No student records matched your current query or filter selections.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="pl-4">Student</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Course / Batch</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Placement</TableHead>
                  <TableHead className="pr-4 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/30">
                    <TableCell className="pl-4">
                      <div className="font-semibold text-foreground">{student.fullName}</div>
                      <div className="text-[11px] text-muted-foreground">{student.email}</div>
                    </TableCell>
                    <TableCell className="font-mono text-[11px] text-muted-foreground">
                      {student.rollNumber || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-normal">
                        {student.department || "General"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div>{student.course || "B.Tech"}</div>
                      <div className="text-[10px]">Batch {student.batchYear || "—"}</div>
                    </TableCell>
                    <TableCell>
                      {student.verifiedStatus === "VERIFIED" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-[11px] text-muted-foreground">
                          {student.verifiedStatus.replace("_", " ")}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium border uppercase tracking-wider ${getPlacementBadgeVariant(
                          student.placementStatus
                        )}`}
                      >
                        {student.placementStatus}
                      </span>
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDetail(student.id)}
                        className="h-7 text-xs gap-1 hover:bg-muted"
                      >
                        <span>View Profile</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Student Detailed Profile Modal / Drawer */}
      {selectedStudentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl h-full bg-card border-l border-border shadow-2xl overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center border border-border">
                  <GraduationCap className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    {studentDetail?.fullName || "Student Profile"}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Authoritative Academic & Placement Snapshot
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseDetail}
                className="h-8 w-8 p-0 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {isDetailLoading ? (
              <div className="space-y-4 py-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : studentDetail ? (
              <Tabs defaultValue="academic" className="w-full">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                </TabsList>

                {/* Identity & Academic Info Tab */}
                <TabsContent value="academic" className="space-y-4 mt-4">
                  <Card className="border-border bg-card">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Academic Credentials</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Roll Number</p>
                        <p className="font-mono font-medium text-foreground">{studentDetail.rollNumber || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Department</p>
                        <p className="font-medium text-foreground">{studentDetail.department || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Course / Branch</p>
                        <p className="font-medium text-foreground">{studentDetail.course || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Semester</p>
                        <p className="font-medium text-foreground">Sem {studentDetail.semester || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Batch Year</p>
                        <p className="font-medium text-foreground">{studentDetail.batchYear || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Institution</p>
                        <p className="font-medium text-foreground">{studentDetail.institution || "—"}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Technical Skills & Specialization Tab */}
                <TabsContent value="skills" className="space-y-4 mt-4">
                  <Card className="border-border bg-card">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        <span>Skills & Domain Competencies</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-1 space-y-3">
                      {studentDetail.interestDomain && (
                        <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
                          <span className="text-muted-foreground">Domain of Interest:</span>
                          <span className="font-medium text-foreground">{studentDetail.interestDomain}</span>
                        </div>
                      )}
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase mb-2">Technical Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                          {studentDetail.technicalSkills && studentDetail.technicalSkills.length > 0 ? (
                            studentDetail.technicalSkills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary" className="text-[11px] font-normal">
                                {skill}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground italic">No technical skills registered yet.</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Authorized Documents Tab */}
                <TabsContent value="documents" className="space-y-4 mt-4">
                  <Card className="border-border bg-card">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Academic & Placement Documents</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-1">
                      {studentDetail.documents && studentDetail.documents.length > 0 ? (
                        <div className="divide-y divide-border">
                          {studentDetail.documents.map((doc) => (
                            <div key={doc.id} className="py-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium text-foreground">{doc.fileName}</p>
                                  <p className="text-[10px] text-muted-foreground">{doc.documentType}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {doc.verified ? (
                                  <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-500/30">
                                    Verified
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-[10px]">
                                    {doc.uploadStatus}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground italic py-2">No documents currently uploaded.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Applications & Placement Pipeline Tab */}
                <TabsContent value="applications" className="space-y-4 mt-4">
                  <Card className="border-border bg-card">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Corporate Applications & Placement Status</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-1">
                      <div className="mb-3 p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
                        <span className="text-muted-foreground">Placement Status:</span>
                        <span
                          className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium border uppercase tracking-wider ${getPlacementBadgeVariant(
                            studentDetail.placementStatus
                          )}`}
                        >
                          {studentDetail.placementStatus}
                        </span>
                      </div>

                      {studentDetail.applications && studentDetail.applications.length > 0 ? (
                        <div className="divide-y divide-border">
                          {studentDetail.applications.map((app) => (
                            <div key={app.id} className="py-2.5 flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-foreground">{app.roleTitle}</p>
                                <p className="text-[11px] text-muted-foreground">{app.companyName}</p>
                              </div>
                              <Badge variant="outline" className="text-[10px] capitalize">
                                {app.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground italic py-2">No active job or internship applications filed.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <p className="text-center text-muted-foreground py-8">Failed to load student details.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
