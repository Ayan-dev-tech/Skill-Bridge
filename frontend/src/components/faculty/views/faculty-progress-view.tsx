"use client";

import * as React from "react";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  RefreshCw,
  Search,
  Filter,
  Eye,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { FacultyStudentRecord } from "@/lib/faculty/types";

interface FacultyProgressViewProps {
  onSelectStudent?: (studentId: string) => void;
}

export function FacultyProgressView({ onSelectStudent }: FacultyProgressViewProps) {
  const [stages, setStages] = React.useState<Array<{ stage: string; name: string; completed: number }>>([]);
  const [students, setStudents] = React.useState<FacultyStudentRecord[]>([]);
  const [totalStudents, setTotalStudents] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchProgress = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/faculty/progress");
      if (!res.ok) throw new Error("Failed to load student progress data");
      const json = await res.json();
      if (json.success) {
        setStages(json.stages);
        setStudents(json.students);
        setTotalStudents(json.totalStudents);
      } else {
        throw new Error(json.error || "Failed to load progress data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error connecting to progress API");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Student Progression Journey
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Tracking assigned scholars through the 7 canonical milestones of the Skill-Bridge development pathway.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchProgress} className="text-xs">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          Refresh
        </Button>
      </div>

      {/* 7-Stage Pipeline Visual Card */}
      <Card className="p-5 bg-card border-border space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Cohort Progression Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stages.map((st, i) => {
            const percent = totalStudents > 0 ? Math.round((st.completed / totalStudents) * 100) : 0;
            return (
              <div key={i} className="p-3 rounded-lg border border-border bg-muted/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground truncate">{st.name}</span>
                  <span className="font-mono text-muted-foreground">{st.completed}/{totalStudents}</span>
                </div>
                <Progress value={percent} className="h-1.5 bg-muted" />
                <span className="text-[10px] text-muted-foreground font-mono">{percent}% of cohort</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Student by Student Breakdown */}
      <Card className="bg-card border-border overflow-hidden">
        <CardHeader className="py-3 px-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm font-semibold">Scholar Milestone Matrix</CardTitle>
            <CardDescription className="text-xs">
              Live status across Document, Interest, Knowledge, Skill Gap, Learning, and Career stages
            </CardDescription>
          </div>
          <div className="w-full md:w-64">
            <Input
              placeholder="Filter scholars by name or roll..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs h-8"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : error ? (
            <div className="p-6 text-center text-xs text-destructive">{error}</div>
          ) : filteredStudents.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No scholars found matching your search.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs font-bold text-muted-foreground">Roll No.</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Scholar Name</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground text-center">Docs</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground text-center">Interest</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground text-center">Benchmark</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground text-center">Skill Gaps</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground text-center">Learning</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground text-center">Placement</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((st) => (
                    <TableRow key={st.id} className="border-border hover:bg-muted/40 text-xs">
                      <TableCell className="font-mono font-medium">{st.rollNumber}</TableCell>
                      <TableCell className="font-semibold text-foreground">{st.fullName}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={st.verificationStatus === "VERIFIED" ? "default" : "outline"} className="text-[10px]">
                          {st.verificationStatus === "VERIFIED" ? "Verified" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={st.hasInterestProfile ? "default" : "outline"} className="text-[10px]">
                          {st.hasInterestProfile ? "Confirmed" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {st.scorePercent !== null && st.scorePercent !== undefined ? (
                          <span className="font-mono font-bold text-foreground">{st.scorePercent}%</span>
                        ) : (
                          <span className="text-muted-foreground">Pending</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {st.skillGapsCount > 0 ? (
                          <Badge variant="secondary" className="text-[10px]">{st.skillGapsCount} items</Badge>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-mono">{st.learningProgressPercent}%</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={st.placementStatus === "selected" ? "default" : "secondary"}
                          className="text-[10px] capitalize"
                        >
                          {st.placementStatus.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {onSelectStudent && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onSelectStudent(st.id)}
                            className="h-7 px-2 text-xs"
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" /> View
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
