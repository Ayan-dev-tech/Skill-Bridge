"use client";

import * as React from "react";
import {
  BookOpen,
  GraduationCap,
  Award,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
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
import type { FacultyLearningOverview } from "@/lib/faculty/types";

export function FacultyLearningView() {
  const [data, setData] = React.useState<FacultyLearningOverview | null>(null);
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchLearning = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/faculty/learning");
      if (!res.ok) throw new Error("Failed to load learning overview");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        throw new Error(json.error || "Failed to load learning data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error connecting to learning API");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchLearning();
  }, [fetchLearning]);

  const filteredList = (data?.studentProgressList || []).filter(
    (item) =>
      item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.rollNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Curriculum Mentoring & Learning Mastery
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Track student scholar engagement across curated technical learning tracks and practical labs.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchLearning} className="text-xs">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          Refresh Learning
        </Button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Scholars Enrolled</span>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {data?.enrolledStudentsCount || 0}
          </div>
          <span className="text-[11px] text-muted-foreground">In Curated Learning Tracks</span>
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Average Progress</span>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-500">
            {data?.avgCompletionPercent || 0}%
          </div>
          <span className="text-[11px] text-muted-foreground">Across All Active Modules</span>
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Completed Tracks</span>
          <div className="mt-2 text-2xl font-bold font-mono text-primary">
            {data?.completedTracksCount || 0}
          </div>
          <span className="text-[11px] text-muted-foreground">Full Mastery Achieved</span>
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Curriculum Modules</span>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {data?.curriculumModulesCount || 28}
          </div>
          <span className="text-[11px] text-muted-foreground">Industry-Aligned Modules</span>
        </Card>
      </div>

      {/* Student Progress Table */}
      <Card className="bg-card border-border overflow-hidden">
        <CardHeader className="py-3 px-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm font-semibold">Scholar Learning Tracking</CardTitle>
            <CardDescription className="text-xs">
              Live curriculum completion metrics for authorized department cohort
            </CardDescription>
          </div>
          <div className="w-full md:w-64">
            <Input
              placeholder="Search scholar or roll number..."
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
          ) : filteredList.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No learning track records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs font-bold text-muted-foreground">Roll No.</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Scholar Name</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Course</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground text-center">Modules Completed</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Completion Progress</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredList.map((item) => (
                    <TableRow key={item.studentId} className="border-border hover:bg-muted/40 text-xs">
                      <TableCell className="font-mono font-medium">{item.rollNumber}</TableCell>
                      <TableCell className="font-semibold text-foreground">{item.studentName}</TableCell>
                      <TableCell className="text-muted-foreground">{item.course}</TableCell>
                      <TableCell className="text-center font-mono font-medium">
                        {item.modulesCompleted} / {item.totalModules}
                      </TableCell>
                      <TableCell className="min-w-[160px]">
                        <div className="flex items-center gap-2">
                          <Progress value={item.progressPercent} className="h-1.5 flex-1 bg-muted" />
                          <span className="text-[11px] font-mono text-muted-foreground w-9 text-right">
                            {item.progressPercent}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={item.progressPercent === 100 ? "default" : "secondary"}
                          className="text-[10px]"
                        >
                          {item.progressPercent === 100 ? "Completed" : "In Progress"}
                        </Badge>
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
