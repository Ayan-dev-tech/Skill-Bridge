"use client";

import * as React from "react";
import {
  ShieldAlert,
  AlertTriangle,
  Search,
  Filter,
  RefreshCw,
  TrendingDown,
  Layers,
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
import type { FacultySkillGapOverview, FacultySkillGapItem } from "@/lib/faculty/types";

export function FacultySkillGapsView() {
  const [data, setData] = React.useState<FacultySkillGapOverview | null>(null);
  const [search, setSearch] = React.useState("");
  const [priorityFilter, setPriorityFilter] = React.useState("all");
  const [domainFilter, setDomainFilter] = React.useState("all");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchSkillGaps = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/faculty/skill-gaps");
      if (!res.ok) throw new Error("Failed to load skill gaps data");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        throw new Error(json.error || "Failed to load skill gaps data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error connecting to skill gaps API");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchSkillGaps();
  }, [fetchSkillGaps]);

  const filteredGaps = (data?.gapsList || []).filter((gap) => {
    const matchesSearch =
      gap.studentName.toLowerCase().includes(search.toLowerCase()) ||
      gap.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
      gap.skill.toLowerCase().includes(search.toLowerCase());

    const matchesPriority = priorityFilter === "all" || gap.priority === priorityFilter;
    const matchesDomain = domainFilter === "all" || gap.domain.toLowerCase() === domainFilter.toLowerCase();

    return matchesSearch && matchesPriority && matchesDomain;
  });

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-primary" />
            Cohort Skill Gap Diagnostics
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Authoritative visibility into identified technical deficiencies and curriculum remediation requirements.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchSkillGaps} className="text-xs">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          Refresh Diagnostics
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Scholars Diagnosed</span>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {data?.totalStudentsAnalyzed || 0}
          </div>
          <span className="text-[11px] text-muted-foreground">With Active Skill Gap Profiles</span>
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase">High Priority Gaps</span>
          <div className="mt-2 text-2xl font-bold font-mono text-destructive">
            {data?.highPriorityCount || 0}
          </div>
          <span className="text-[11px] text-muted-foreground">Require Immediate Remediation</span>
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Medium Priority</span>
          <div className="mt-2 text-2xl font-bold font-mono text-amber-500">
            {data?.mediumPriorityCount || 0}
          </div>
          <span className="text-[11px] text-muted-foreground">Curriculum Elective Alignment</span>
        </Card>

        <Card className="p-4 bg-card border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Low Priority</span>
          <div className="mt-2 text-2xl font-bold font-mono text-muted-foreground">
            {data?.lowPriorityCount || 0}
          </div>
          <span className="text-[11px] text-muted-foreground">Elective / Optional Mastery</span>
        </Card>
      </div>

      {/* Top Skills Requiring Focus */}
      {data?.topSkillsNeedingFocus && data.topSkillsNeedingFocus.length > 0 && (
        <Card className="p-5 bg-card border-border space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-primary" />
            Top Deficiencies Across Cohort
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.topSkillsNeedingFocus.map((item, idx) => (
              <Badge key={idx} variant="outline" className="text-xs py-1 px-2.5 flex items-center gap-1.5">
                <span className="font-semibold text-foreground">{item.skill}</span>
                <span className="text-muted-foreground font-mono">({item.studentCount} scholars)</span>
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Filter and Table */}
      <Card className="bg-card border-border overflow-hidden">
        <CardHeader className="py-3 px-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm font-semibold">Scholar Skill Gap Records</CardTitle>
            <CardDescription className="text-xs">
              Read-only view of current vs target competency levels ({filteredGaps.length} items)
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-full sm:w-48">
              <Input
                placeholder="Search scholar or skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-xs h-8"
              />
            </div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              aria-label="Filter by Priority"
              className="text-xs h-8 px-2 rounded-md border border-border bg-background text-foreground"
            >
              <option value="all">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
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
          ) : filteredGaps.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No skill gaps found matching filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs font-bold text-muted-foreground">Scholar</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Domain</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Identified Skill</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Current Level</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground">Target Level</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground text-right">Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGaps.map((gap, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/40 text-xs">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">{gap.studentName}</span>
                          <span className="text-[10px] font-mono text-muted-foreground">{gap.rollNumber}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{gap.domain}</TableCell>
                      <TableCell className="font-medium text-foreground">{gap.skill}</TableCell>
                      <TableCell className="text-muted-foreground">{gap.currentLevel}</TableCell>
                      <TableCell className="font-semibold text-foreground">{gap.targetLevel}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={gap.priority === "High" ? "destructive" : gap.priority === "Medium" ? "outline" : "secondary"}
                          className="text-[10px]"
                        >
                          {gap.priority}
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
