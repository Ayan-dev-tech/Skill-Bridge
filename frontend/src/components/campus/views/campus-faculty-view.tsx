"use client";

import * as React from "react";
import {
  BookOpen,
  Search,
  UserCheck,
  Users,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  X,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
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
import type { CampusFacultyRecord, CampusFacultyDetail } from "@/lib/campus/types";

export function CampusFacultyView() {
  const [facultyList, setFacultyList] = React.useState<CampusFacultyRecord[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Filters
  const [search, setSearch] = React.useState("");
  const [selectedDept, setSelectedDept] = React.useState("all");

  // Detail Drawer
  const [selectedFacultyId, setSelectedFacultyId] = React.useState<string | null>(null);
  const [facultyDetail, setFacultyDetail] = React.useState<CampusFacultyDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = React.useState(false);

  const fetchFaculty = React.useCallback(async (pageNum: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: String(pageNum),
        limit: "10",
      });

      if (search.trim()) params.append("search", search.trim());
      if (selectedDept !== "all") params.append("department", selectedDept);

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

      const res = await fetch(`/api/campus/faculty?${params.toString()}`, { headers });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load faculty directory.");
      }

      setFacultyList(json.faculty || []);
      setTotalCount(json.totalCount || 0);
      setPage(json.page || 1);
      setTotalPages(json.totalPages || 1);
    } catch (err: unknown) {
      console.error("Faculty fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to load faculty directory.");
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedDept]);

  React.useEffect(() => {
    fetchFaculty(1);
  }, [fetchFaculty]);

  const handleOpenDetail = async (facultyId: string) => {
    setSelectedFacultyId(facultyId);
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
      const res = await fetch(`/api/campus/faculty?facultyId=${facultyId}`, { headers });
      const json = await res.json();
      if (res.ok && json.success) {
        setFacultyDetail(json.faculty);
      } else {
        throw new Error(json.error || "Failed to load faculty details.");
      }
    } catch (err) {
      console.error("Failed to load faculty details:", err);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleCloseDetail = () => {
    setSelectedFacultyId(null);
    setFacultyDetail(null);
  };

  // Distinct departments
  const departments = React.useMemo(() => {
    const set = new Set<string>();
    facultyList.forEach((f) => {
      if (f.department) set.add(f.department);
    });
    return Array.from(set);
  }, [facultyList]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-border bg-muted/40 text-[11px] text-muted-foreground font-medium mb-1">
            <BookOpen className="w-3 h-3 text-foreground" />
            <span>Academic Faculty & Mentorship</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-foreground font-semibold">{totalCount} Faculty Members</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Faculty Directory & Mentee Visibility
          </h1>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Monitor institutional faculty mentors, departmental alignments, and tracked academic and skill progress for assigned student mentees.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-md border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <Button size="sm" variant="ghost" onClick={() => fetchFaculty(page)} className="h-7 text-xs">
            Retry
          </Button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <Card className="border-border bg-card">
        <CardContent className="p-3.5">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search faculty by name or email..."
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

              {(search || selectedDept !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setSelectedDept("all");
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

      {/* Faculty List Table */}
      <Card className="border-border bg-card">
        <CardHeader className="p-4 pb-2 border-b border-border flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">
              Faculty List ({totalCount})
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
              onClick={() => fetchFaculty(page - 1)}
              className="h-7 px-2 text-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages || isLoading}
              onClick={() => fetchFaculty(page + 1)}
              className="h-7 px-2 text-xs"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : facultyList.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <BookOpen className="w-8 h-8 text-muted-foreground mx-auto" />
              <p className="text-sm font-medium text-foreground">No faculty found</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No faculty members matched your current search or department filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-muted/40 text-muted-foreground font-medium border-b border-border">
                  <tr>
                    <th className="p-3 pl-4">Faculty Member</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Designation</th>
                    <th className="p-3">Assigned Students</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {facultyList.map((fac) => (
                    <tr key={fac.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3 pl-4">
                        <div className="font-semibold text-foreground">{fac.fullName}</div>
                        <div className="text-[11px] text-muted-foreground">{fac.email}</div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-[10px] font-normal">
                          {fac.department || "Academic"}
                        </Badge>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {fac.designation || "Faculty Mentor"}
                      </td>
                      <td className="p-3 font-mono font-medium text-foreground">
                        {fac.studentsAssigned}
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                          <UserCheck className="w-3 h-3" />
                          Active
                        </span>
                      </td>
                      <td className="p-3 pr-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDetail(fac.id)}
                          className="h-7 text-xs gap-1 hover:bg-muted"
                        >
                          <span>Assigned Mentees</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Faculty Detail / Assigned Students Modal */}
      {selectedFacultyId && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl h-full bg-card border-l border-border shadow-2xl overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center border border-border">
                  <UserCheck className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    {facultyDetail?.fullName || "Faculty Mentor"}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {facultyDetail?.department} • {facultyDetail?.designation}
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
              </div>
            ) : facultyDetail ? (
              <div className="space-y-6 text-xs">
                {/* Faculty Summary Card */}
                <Card className="border-border bg-card">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Faculty Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase">Email</p>
                      <p className="font-medium text-foreground">{facultyDetail.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase">Department</p>
                      <p className="font-medium text-foreground">{facultyDetail.department}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase">Assigned Mentees</p>
                      <p className="font-mono font-bold text-foreground">{facultyDetail.studentsAssigned}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Assigned Students List */}
                <Card className="border-border bg-card">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>Assigned Students ({facultyDetail.assignedStudents?.length || 0})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-1">
                    {facultyDetail.assignedStudents && facultyDetail.assignedStudents.length > 0 ? (
                      <div className="divide-y divide-border">
                        {facultyDetail.assignedStudents.map((stu) => (
                          <div key={stu.id} className="py-3 flex items-center justify-between gap-3">
                            <div>
                              <p className="font-semibold text-foreground">{stu.fullName}</p>
                              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                <span>{stu.rollNumber || "No Roll"}</span>
                                <span>•</span>
                                <span>{stu.department}</span>
                                <span>•</span>
                                <span>Sem {stu.semester}</span>
                              </div>
                            </div>
                            <div className="text-right space-y-1">
                              <Badge variant="outline" className="text-[10px] uppercase">
                                {stu.placementStatus}
                              </Badge>
                              <div className="flex items-center gap-1.5 justify-end text-[10px] text-muted-foreground">
                                <TrendingUp className="w-3 h-3 text-emerald-600" />
                                <span>{stu.progressPercentage}% complete</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic py-3">No students currently assigned to this faculty mentor.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">Failed to load mentor details.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
