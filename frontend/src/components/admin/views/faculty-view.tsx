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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
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
  const [facultyToDeactivate, setFacultyToDeactivate] = React.useState<FacultyMember | null>(null);

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

  const handleApprove = (id: string, name: string) => {
    onApprove(id);
    toast.success(`Faculty account for ${name} approved successfully.`);
  };

  const handleToggleClick = (f: FacultyMember) => {
    if (f.status === "verified") {
      setFacultyToDeactivate(f);
    } else {
      onToggleStatus(f.id);
      toast.success(`Faculty account for ${f.name} activated.`);
    }
  };

  const confirmDeactivation = () => {
    if (facultyToDeactivate) {
      onToggleStatus(facultyToDeactivate.id);
      toast.success(`Faculty account for ${facultyToDeactivate.name} deactivated.`);
      setFacultyToDeactivate(null);
    }
  };

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
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="pl-6">Faculty Member</TableHead>
              <TableHead>Department & Title</TableHead>
              <TableHead>Curricular Subjects</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Assessments</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No faculty records found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((f) => (
                <TableRow key={f.id} className="hover:bg-muted/20">
                  <TableCell className="pl-6">
                    <p className="font-semibold text-foreground">{f.name}</p>
                    <p className="text-muted-foreground font-mono text-[11px]">{f.email}</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground">{f.designation}</p>
                    <p className="text-muted-foreground text-[11px]">{f.department}</p>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {f.subjects.map((sub, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded text-[10px] border border-border bg-muted/20">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono font-medium">{f.coursesHandled} active</TableCell>
                  <TableCell className="font-mono font-medium">{f.assessmentsCreated} created</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="pr-6 text-right space-x-1.5">
                    {f.status === "pending" && (
                      <Button
                        variant="default"
                        size="xs"
                        onClick={() => handleApprove(f.id, f.name)}
                        className="h-7 text-[11px] gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" /> Approve Account
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleToggleClick(f)}
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Confirmation Alert Dialog for Deactivation */}
      <AlertDialog
        open={Boolean(facultyToDeactivate)}
        onOpenChange={(open) => !open && setFacultyToDeactivate(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Faculty Member?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to deactivate {facultyToDeactivate?.name}? Their access to course management, student evaluation, and assessment authoring will be suspended.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDeactivation}>
              Deactivate Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
