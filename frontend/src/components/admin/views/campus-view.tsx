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
import { AdminCampusRecord } from "@/lib/admin/types";
import { Search, ShieldAlert, CheckCircle2, School, GraduationCap, Eye, AlertTriangle } from "lucide-react";

interface CampusViewProps {
  campuses: AdminCampusRecord[];
  onToggleFreeze: (type: "campus", id: string, name: string, isFrozen: boolean) => void;
}

export function CampusView({ campuses, onToggleFreeze }: CampusViewProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "active" | "frozen">("all");
  const [campusToFreeze, setCampusToFreeze] = React.useState<AdminCampusRecord | null>(null);

  const filtered = campuses.filter((c) => {
    if (statusFilter !== "all") {
      if (statusFilter === "frozen" && !c.isFrozen) return false;
      if (statusFilter === "active" && c.isFrozen) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.campusName.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        (c.location && c.location.toLowerCase().includes(q)) ||
        (c.requestType && c.requestType.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const totalEnrolled = campuses.reduce((acc, c) => acc + (c.studentsEnrolled || 0), 0);
  const frozenCount = campuses.filter((c) => c.isFrozen).length;

  return (
    <div className="space-y-4">
      {/* 1. Quick Stats Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg border border-border bg-card shadow-2xs">
          <p className="text-[11px] font-medium text-muted-foreground">Total Campuses</p>
          <p className="text-xl font-bold text-foreground mt-0.5">{campuses.length}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Institutions registered</p>
        </div>

        <div className="p-3.5 rounded-lg border border-border bg-card shadow-2xs">
          <p className="text-[11px] font-medium text-muted-foreground">Active Partnerships</p>
          <p className="text-xl font-bold text-foreground mt-0.5">{campuses.length - frozenCount}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Clearing placement drives</p>
        </div>

        <div className="p-3.5 rounded-lg border border-border bg-card shadow-2xs">
          <p className="text-[11px] font-medium text-muted-foreground">Enrolled Students</p>
          <p className="text-xl font-bold text-foreground mt-0.5">{totalEnrolled.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Across authorized cohorts</p>
        </div>

        <div className="p-3.5 rounded-lg border border-border bg-card shadow-2xs">
          <p className="text-[11px] font-medium text-muted-foreground">Compliance Suspended</p>
          <p className={`text-xl font-bold mt-0.5 ${frozenCount > 0 ? "text-destructive" : "text-foreground"}`}>
            {frozenCount}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Operations on hold</p>
        </div>
      </div>

      {/* 2. Main Institutional Table */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <School className="w-4 h-4" />
                Campus Management & Institutional Oversight
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Affiliated universities, student batches, curriculum verification, and administrative compliance freeze.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-muted-foreground" />
                <Input
                  placeholder="Search campus or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 text-xs h-8"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                aria-label="Filter campuses by status"
                className="h-8 text-xs rounded-md border border-border bg-background px-2.5 text-foreground"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="frozen">Suspended Only</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border bg-muted/30">
                  <TableHead className="text-xs font-semibold">Campus Name & Code</TableHead>
                  <TableHead className="text-xs font-semibold">Request / Drive Type</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Enrolled Students</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-right pr-6">Compliance Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-xs text-muted-foreground">
                      No campus records matched the current filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((campus) => (
                    <TableRow key={campus.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="text-xs font-medium">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-foreground flex items-center gap-1.5">
                            {campus.campusName}
                          </p>
                          <p className="text-[11px] font-mono text-muted-foreground">
                            Code: {campus.code} • {campus.domain || "Higher Ed"}
                          </p>
                          {campus.isFrozen && campus.freezeReason && (
                            <div className="flex items-center gap-1 text-[11px] text-destructive bg-destructive/10 px-2 py-0.5 rounded mt-1 border border-destructive/20">
                              <AlertTriangle className="w-3 h-3 shrink-0" />
                              <span>Suspension Reason: {campus.freezeReason}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-xs text-muted-foreground">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border border-border bg-muted/40">
                          {campus.requestType}
                        </span>
                      </TableCell>

                      <TableCell className="text-xs text-center font-mono font-semibold">
                        {campus.studentsEnrolled.toLocaleString()}
                      </TableCell>

                      <TableCell className="text-xs">
                        {campus.isFrozen ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border border-destructive/30 bg-destructive/10 text-destructive">
                            <ShieldAlert className="w-3 h-3" />
                            SUSPENDED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" />
                            ACTIVE
                          </span>
                        )}
                      </TableCell>

                      <TableCell className="text-xs text-right pr-6">
                        <Button
                          variant={campus.isFrozen ? "outline" : "destructive"}
                          size="xs"
                          onClick={() => {
                            if (campus.isFrozen) {
                              onToggleFreeze("campus", campus.id, campus.campusName, true);
                            } else {
                              setCampusToFreeze(campus);
                            }
                          }}
                          className="text-xs"
                        >
                          {campus.isFrozen ? "Restore Operations" : "Suspend Campus"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog for Suspension */}
      <AlertDialog open={!!campusToFreeze} onOpenChange={(open) => !open && setCampusToFreeze(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              Confirm Institutional Suspension
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs space-y-2">
              <p>
                Are you sure you want to suspend activities for <strong>{campusToFreeze?.campusName}</strong>?
              </p>
              <p>
                Suspension immediately pauses campus drive publishing, student batch verification, and institutional recruitment permissions.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (campusToFreeze) {
                  onToggleFreeze("campus", campusToFreeze.id, campusToFreeze.campusName, false);
                  setCampusToFreeze(null);
                }
              }}
            >
              Confirm Suspension
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
