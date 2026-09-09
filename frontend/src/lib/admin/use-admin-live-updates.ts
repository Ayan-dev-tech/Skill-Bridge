"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  AdminLiveOverviewData,
  AdminActivityItem,
  AdminNotificationItem,
  AdminApprovalItem,
  AdminCampusRecord,
  RealtimeStatusInfo,
} from "./types";
import { AdminRealtimeSubscriptionManager } from "./admin-realtime";

export function useAdminLiveUpdates() {
  const [data, setData] = React.useState<AdminLiveOverviewData | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = React.useState<string>("");
  const [realtimeStatus, setRealtimeStatus] = React.useState<RealtimeStatusInfo>(() =>
    AdminRealtimeSubscriptionManager.getInstance().getStatus()
  );

  const fetchOverview = React.useCallback(async (isBackground = false) => {
    if (isBackground) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const res = await fetch("/api/admin/overview", {
        headers: { "Cache-Control": "no-cache" },
      });
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
        setLastSyncedAt(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error("Failed to load admin live data:", err);
      if (!isBackground) {
        toast.error("Could not fetch administrative overview data.");
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial fetch on mount
  React.useEffect(() => {
    fetchOverview(false);
  }, [fetchOverview]);

  // Realtime subscription binding (if configured, without timers or fake loops)
  React.useEffect(() => {
    const manager = AdminRealtimeSubscriptionManager.getInstance();

    const unsubscribeStatus = manager.subscribeStatus((newStatus) => {
      setRealtimeStatus(newStatus);
    });

    const unsubscribeChannels = manager.subscribeToAdminChannels((eventInfo) => {
      // Refresh affected queries authoritatively from database when real events occur
      fetchOverview(true);
    });

    return () => {
      unsubscribeStatus();
      unsubscribeChannels();
    };
  }, [fetchOverview]);

  // Execute approval or rejection action with backend persistence and live state update
  const handleApprovalAction = React.useCallback(
    async (item: AdminApprovalItem, decision: "approved" | "rejected", reason?: string) => {
      try {
        const res = await fetch("/api/admin/approvals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: item.id,
            entityId: item.entityId,
            rawType: item.rawType,
            decision,
            reason,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Action failed on server");
        }

        const resData = await res.json();

        // Update local state immediately without full page reload
        setData((prev) => {
          if (!prev) return prev;

          const updatedApprovals = prev.approvals.filter((a) => a.id !== item.id);
          const newActivityItem: AdminActivityItem = {
            id: `act-${Date.now()}`,
            eventType: "admin_action",
            actor: "Admin (admin@gmail.com)",
            action: `${decision === "approved" ? "Approved" : "Rejected"} ${item.type}`,
            resource: item.title,
            timestamp: new Date().toISOString(),
            status: decision === "approved" ? "Success" : "Rejected",
          };

          return {
            ...prev,
            stats: {
              ...prev.stats,
              pendingApprovalsCount: Math.max(0, prev.stats.pendingApprovalsCount - 1),
            },
            approvals: updatedApprovals,
            activityFeed: [newActivityItem, ...prev.activityFeed],
          };
        });

        toast.success(
          decision === "approved"
            ? `Approved "${item.title}" successfully.`
            : `Rejected "${item.title}".`
        );
      } catch (err: unknown) {
        console.error("Approval action error:", err);
        const errorMsg = err instanceof Error ? err.message : "Failed to execute approval action.";
        toast.error(errorMsg);
      }
    },
    []
  );

  // Execute Freeze/Unfreeze for Industry or Campus with live state update
  const handleToggleFreeze = React.useCallback(
    async (type: "company" | "campus", id: string, entityName: string, isCurrentlyFrozen: boolean) => {
      const willFreeze = !isCurrentlyFrozen;
      const reason = willFreeze
        ? prompt(
            `Enter justification for freezing ${entityName}:`,
            `Suspicious activity flagged by administrative compliance`
          )
        : undefined;

      if (willFreeze && reason === null) return; // user cancelled

      try {
        const res = await fetch("/api/admin/freeze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type,
            id,
            reason: reason || undefined,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Freeze toggle failed on server");
        }

        const json = await res.json();

        // Update live state immediately
        setData((prev) => {
          if (!prev) return prev;

          let updatedCampusList = prev.campusList;
          if (type === "campus") {
            updatedCampusList = prev.campusList.map((c) =>
              c.id === id
                ? {
                    ...c,
                    isFrozen: willFreeze,
                    status: willFreeze ? "frozen" : "active",
                    freezeReason: willFreeze ? reason || "Flagged by admin" : undefined,
                    updatedAt: new Date().toISOString(),
                  }
                : c
            );
          }

          const newLog: AdminActivityItem = {
            id: `act-${Date.now()}`,
            eventType: type === "company" ? "industry_freeze_toggled" : "campus_freeze_toggled",
            actor: "Admin (admin@gmail.com)",
            action: willFreeze ? `${type === "company" ? "Company" : "Campus"} Suspended` : `${type === "company" ? "Company" : "Campus"} Restored`,
            resource: entityName,
            timestamp: new Date().toISOString(),
            status: willFreeze ? "Flagged" : "Success",
          };

          return {
            ...prev,
            stats: {
              ...prev.stats,
              totalFrozen: prev.stats.totalFrozen + (willFreeze ? 1 : -1),
            },
            campusList: updatedCampusList,
            activityFeed: [newLog, ...prev.activityFeed],
          };
        });

        toast[willFreeze ? "error" : "success"](
          willFreeze
            ? `${entityName} has been frozen.`
            : `Operations restored for ${entityName}.`
        );
      } catch (err: unknown) {
        console.error("Freeze toggle error:", err);
        const errorMsg = err instanceof Error ? err.message : "Failed to toggle freeze.";
        toast.error(errorMsg);
      }
    },
    []
  );

  return {
    data,
    isLoading,
    isRefreshing,
    lastSyncedAt,
    realtimeStatus,
    refreshData: () => fetchOverview(true),
    handleApprovalAction,
    handleToggleFreeze,
  };
}
