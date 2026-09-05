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
import { FacultyMember } from "@/lib/admin-data";
import { Search, Filter, CheckCircle2, UserX, UserCheck } from "lucide-react";

interface FacultyViewProps {
  faculty: FacultyMember[];
  onToggleStatus: (facultyId: string) => void;
  onApprove: (facultyId: string) => void;
}

export function FacultyView({
  faculty,
  onToggleStatus,
  onApprove,
}: FacultyViewProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [deptFilter, setDeptFilter] = React.useState("All");

  const departments = React.useMemo(() => {
    return ["All", ...Array.from(new Set(faculty.map((f) => f.department)))];
  }, [faculty]);

  const filtered = faculty.filter((f) => {
    if (deptFilter !== "All" && f.department !== deptFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const subjectMatch = f.subjects.some((s) => s.toLowerCase().includes(q));
      return (
        f.name.toLowerCase().includes(q) ||
        f.email.toLowerCase().includes(q) ||
        f.designation.toLowerCase().includes(q) ||
        subjectMatch
      );
    }
    return true;
  });

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <CardTitle className="text-base font-semibold">Faculty Management</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Oversee teaching faculty, department courses handled, and assessment contributions.
            </CardDescription>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-muted-foreground" />
            <Input
              placeholder="Search faculty name, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 text-xs h-8"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-border mt-3 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-medium">Department:</span>
          </div>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="h-7 text-xs rounded border border-border bg-background px-2 text-foreground outline-none"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                <th className="p-3 pl-6">Faculty Member</th>
                <th className="p-3">Department & Title</th>
                <th className="p-3">Curricular Subjects</th>
                <th className="p-3">Courses</th>
                <th className="p-3">Assessments</th>
                <th className="p-3">Status</th>
                <th className="p-3 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((f) => (
                <tr key={f.id} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3 pl-6">
                    <p className="font-semibold text-foreground">{f.name}</p>
                    <p className="text-muted-foreground font-mono text-[11px]">{f.email}</p>
                  </td>
                  <td className="p-3">
                    <p className="font-medium text-foreground">{f.designation}</p>
                    <p className="text-muted-foreground text-[11px]">{f.department}</p>
                  </td>
                  <td className="p-3 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {f.subjects.map((sub, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded text-[10px] border border-border bg-muted/20">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 font-mono font-medium">{f.coursesHandled} active</td>
                  <td className="p-3 font-mono font-medium">{f.assessmentsCreated} created</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        f.status === "verified"
                          ? "bg-foreground text-background"
                          : f.status === "pending"
                          ? "border border-amber-500/40 text-amber-500 bg-amber-500/10"
                          : "border border-destructive/40 text-destructive bg-destructive/10"
                      }`}
                    >
                      {f.status}
                    </span>
                  </td>
                  <td className="p-3 pr-6 text-right space-x-1.5">
                    {f.status === "pending" && (
                      <Button
                        variant="default"
                        size="xs"
                        onClick={() => onApprove(f.id)}
                        className="h-7 text-[11px] gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" /> Approve Account
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => onToggleStatus(f.id)}
                      className="h-7 text-[11px]"
                    >
                      {f.status === "verified" ? (
                        <span className="flex items-center gap-1 text-destructive">
                          <UserX className="w-3 h-3" /> Deactivate
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <UserCheck className="w-3 h-3" /> Activate
                        </span>
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
