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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  ShieldCheck,
  Building2,
  GraduationCap,
  Briefcase,
  BookOpen,
} from "lucide-react";
import { initialApprovals, ApprovalQueueItem } from "@/lib/admin-data";

import { AdminApprovalItem } from "@/lib/admin/types";

interface ApprovalsViewProps {
  onApprovalsCountChange?: (count: number) => void;
  liveApprovals?: AdminApprovalItem[];
  onApproveLiveItem?: (item: AdminApprovalItem) => void;
  onRejectLiveItem?: (item: AdminApprovalItem) => void;
}

export function ApprovalsView({
  onApprovalsCountChange,
  liveApprovals,
  onApproveLiveItem,
  onRejectLiveItem,
}: ApprovalsViewProps) {
  const [approvals, setApprovals] = React.useState<ApprovalQueueItem[]>(() => {
    if (liveApprovals && liveApprovals.length > 0) {
      return liveApprovals.map((a) => ({
        id: a.id,
        type: a.type as any,
        title: a.title,
        submittedBy: a.submittedBy,
        submissionDate: a.submissionDate,
        details: a.details,
        status: a.status,
      }));
    }
    return initialApprovals;
  });

  // Sync if liveApprovals changes from backend
  React.useEffect(() => {
    if (liveApprovals) {
      setApprovals(
        liveApprovals.map((a) => ({
          id: a.id,
          type: a.type as any,
          title: a.title,
          submittedBy: a.submittedBy,
          submissionDate: a.submissionDate,
          details: a.details,
          status: a.status,
        }))
      );
    }
  }, [liveApprovals]);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [selectedItem, setSelectedItem] = React.useState<ApprovalQueueItem | null>(null);
  const [actionAlert, setActionAlert] = React.useState<string | null>(null);

  // Update pending badge count
  React.useEffect(() => {
    const pendingCount = approvals.filter((a) => a.status === "pending").length;
    if (onApprovalsCountChange) {
      onApprovalsCountChange(pendingCount);
    }
  }, [approvals, onApprovalsCountChange]);

  const handleApprove = (item: ApprovalQueueItem) => {
    const liveMatch = liveApprovals?.find((l) => l.id === item.id);
    if (liveMatch && onApproveLiveItem) {
      onApproveLiveItem(liveMatch);
    }

    setApprovals((prev) =>
      prev.map((a) => (a.id === item.id ? { ...a, status: "approved" } : a))
    );
    setActionAlert(`Approved: "${item.title}". Permissions provisioned.`);
    if (selectedItem?.id === item.id) {
      setSelectedItem({ ...selectedItem, status: "approved" });
    }
    setTimeout(() => setActionAlert(null), 4000);
  };

  const handleReject = (item: ApprovalQueueItem) => {
    const reason = prompt("Enter justification for rejection:", "Does not meet institutional accreditation criteria.");
    if (reason === null) return;

    const liveMatch = liveApprovals?.find((l) => l.id === item.id);
    if (liveMatch && onRejectLiveItem) {
      onRejectLiveItem(liveMatch);
    }

    setApprovals((prev) =>
      prev.map((a) => (a.id === item.id ? { ...a, status: "rejected" } : a))
    );
    setActionAlert(`Rejected: "${item.title}". Rejection recorded.`);
    if (selectedItem?.id === item.id) {
      setSelectedItem({ ...selectedItem, status: "rejected" });
    }
    setTimeout(() => setActionAlert(null), 4000);
  };

  const types = ["all", "Industry Partner", "Campus Partner", "Student Verification", "Job", "Faculty", "Course", "Student"];

  const filteredApprovals = React.useMemo(() => {
    return approvals.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (typeFilter !== "all" && a.type !== typeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.submittedBy.toLowerCase().includes(q) ||
          a.details.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [approvals, statusFilter, typeFilter, searchQuery]);

  const pendingCount = approvals.filter((a) => a.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Pending In Queue</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold font-mono text-foreground">{pendingCount}</p>
              <span className="text-[11px] font-medium text-amber-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Action Required
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Approved This Cycle</p>
            <p className="text-2xl font-bold font-mono">
              {approvals.filter((a) => a.status === "approved").length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Rejected / Incomplete</p>
            <p className="text-2xl font-bold font-mono text-muted-foreground">
              {approvals.filter((a) => a.status === "rejected").length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Avg Audit Turnaround</p>
            <p className="text-2xl font-bold font-mono">4.2 hrs</p>
          </CardContent>
        </Card>
      </div>

      {actionAlert && (
        <div className="p-3 rounded-lg border border-border bg-muted/40 text-xs text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            {actionAlert}
          </span>
          <button
            onClick={() => setActionAlert(null)}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Table Card */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-foreground" />
                Centralized Administrative Approval Desk
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Authorize new corporate recruiter onboarding, faculty privileges, course additions, and campus job drives.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search approvals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-xs pl-8"
                />
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border mt-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-muted-foreground mr-1">Status:</span>
              {(["pending", "approved", "rejected", "all"] as const).map((s) => (
                <Button
                  key={s}
                  variant={statusFilter === s ? "default" : "outline"}
                  size="xs"
                  onClick={() => setStatusFilter(s)}
                  className="text-xs capitalize"
                >
                  {s}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="text-xs text-muted-foreground mr-1">Type:</span>
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                    typeFilter === t
                      ? "border-foreground bg-muted font-bold text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                  <th className="p-3 pl-6">Entity / Request</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Submitted By</th>
                  <th className="p-3">Details</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredApprovals.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                      No approval items match the current filter.
                    </td>
                  </tr>
                ) : (
                  filteredApprovals.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                      <td className="p-3 pl-6">
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-[11px] text-muted-foreground font-mono">ID: {item.id}</p>
                      </td>

                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border border-border bg-muted/30">
                          {item.type}
                        </span>
                      </td>

                      <td className="p-3 font-medium text-foreground max-w-[150px] truncate">
                        {item.submittedBy}
                      </td>

                      <td className="p-3 text-[11px] text-muted-foreground max-w-[240px] truncate">
                        {item.details}
                      </td>

                      <td className="p-3 font-mono text-[11px] text-muted-foreground">
                        {item.submissionDate}
                      </td>

                      <td className="p-3">
                        {item.status === "pending" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                            <Clock className="w-3.5 h-3.5" /> Pending
                          </span>
                        )}
                        {item.status === "approved" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-500">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                          </span>
                        )}
                        {item.status === "rejected" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-500">
                            <XCircle className="w-3.5 h-3.5" /> Rejected
                          </span>
                        )}
                      </td>

                      <td className="p-3 pr-6 text-right space-x-1.5 whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => setSelectedItem(item)}
                          className="text-[11px]"
                        >
                          Review
                        </Button>
                        {item.status === "pending" && (
                          <>
                            <Button
                              variant="default"
                              size="xs"
                              onClick={() => handleApprove(item)}
                              className="text-[11px]"
                            >
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="xs"
                              onClick={() => handleReject(item)}
                              className="text-[11px]"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Item Dossier Sheet */}
      <Sheet open={!!selectedItem} onOpenChange={(open: boolean) => !open && setSelectedItem(null)}>
        <SheetContent className="sm:max-w-lg w-full p-6 overflow-y-auto space-y-6">
          {selectedItem && (
            <>
              <SheetHeader className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-border bg-muted/40 w-fit">
                  {selectedItem.type} Dossier
                </span>
                <SheetTitle className="text-xl font-bold">{selectedItem.title}</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  Submitted on {selectedItem.submissionDate} by {selectedItem.submittedBy}
                </SheetDescription>
              </SheetHeader>

              <div className="p-4 rounded-lg border border-border bg-muted/20 text-xs space-y-2">
                <p className="font-semibold text-foreground uppercase tracking-wider">
                  Submission Details
                </p>
                <p className="text-muted-foreground leading-relaxed text-[11px]">
                  {selectedItem.details}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Audit Verification Status
                </p>
                <div className="p-3 rounded-lg border border-border bg-card flex items-center justify-between text-xs">
                  <span className="font-mono text-muted-foreground">Current State</span>
                  <span className="font-bold uppercase font-mono">{selectedItem.status}</span>
                </div>
              </div>

              {selectedItem.status === "pending" ? (
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleReject(selectedItem)}
                    className="text-xs"
                  >
                    Reject Submission
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleApprove(selectedItem)}
                    className="text-xs"
                  >
                    Approve & Activate
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-border text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedItem(null)}
                    className="text-xs w-full"
                  >
                    Close Dossier
                  </Button>
                </div>
              )}
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
