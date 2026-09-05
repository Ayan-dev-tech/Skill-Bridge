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
  Bell,
  ShieldCheck,
  History,
  Settings,
  Send,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Sparkles,
} from "lucide-react";
import {
  initialAuditLogs,
  initialAdmins,
  AuditLogItem,
  AdminUser,
} from "@/lib/admin-data";

/* =========================================================================
   1. NOTIFICATIONS VIEW
   ========================================================================= */
export function NotificationsView() {
  const [broadcastTarget, setBroadcastTarget] = React.useState<"all" | "students" | "faculty" | "industry">("all");
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [priority, setPriority] = React.useState<"Normal" | "Urgent" | "Security Alert">("Normal");
  const [sentAlerts, setSentAlerts] = React.useState([
    {
      id: "nt-1",
      title: "Placement Drive 2024–2025 Registration Open",
      target: "All Final Year Students",
      priority: "Urgent",
      sentAt: "2024-09-04 10:30 AM",
    },
    {
      id: "nt-2",
      title: "Mandatory AWS Diagnostic Assessment Deadline Extended",
      target: "Computer Science Students",
      priority: "Normal",
      sentAt: "2024-09-02 02:15 PM",
    },
    {
      id: "nt-3",
      title: "System Maintenance & Security Patch Notice",
      target: "All Users",
      priority: "Security Alert",
      sentAt: "2024-08-30 08:00 PM",
    },
  ]);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      alert("Please provide both a title and message.");
      return;
    }

    const newNotification = {
      id: `nt-${Date.now()}`,
      title,
      target: broadcastTarget === "all" ? "All Platform Users" : `All ${broadcastTarget}`,
      priority,
      sentAt: "Just Now",
    };

    setSentAlerts([newNotification, ...sentAlerts]);
    setTitle("");
    setMessage("");
    setSuccess(`Broadcast notification "${title}" dispatched successfully.`);
    setTimeout(() => setSuccess(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Platform Notification & Announcement Dispatcher
          </h2>
          <p className="text-xs text-muted-foreground">
            Broadcast platform-wide alerts, placement schedule notices, and security advisories.
          </p>
        </div>
      </div>

      {success && (
        <div className="p-3 rounded-lg border border-border bg-muted/40 text-xs text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            {success}
          </span>
          <button
            onClick={() => setSuccess(null)}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compose Form */}
        <Card className="border-border lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Send className="w-4 h-4" /> Compose Broadcast
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Dispatches push and in-app alerts directly to user dashboards.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendBroadcast} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Target Demographic</label>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {(["all", "students", "faculty", "industry"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setBroadcastTarget(t)}
                      className={`px-2 py-1.5 rounded text-xs capitalize border font-medium transition-colors ${
                        broadcastTarget === t
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Priority Tier</label>
                <div className="flex gap-1.5 pt-1">
                  {(["Normal", "Urgent", "Security Alert"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`px-2 py-1 rounded text-[11px] border font-medium transition-colors ${
                        priority === p
                          ? "border-foreground bg-muted font-bold text-foreground"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Announcement Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Mandatory Drive Registration"
                  className="text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Message Body</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide precise details, dates, and instructions..."
                  rows={4}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
                />
              </div>

              <Button type="submit" size="xs" className="w-full text-xs font-semibold py-2">
                Send Institutional Broadcast
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Dispatched History */}
        <Card className="border-border lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Dispatched Broadcast Feed</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Recent communications broadcasted across institutional network nodes.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {sentAlerts.map((n) => (
                <div key={n.id} className="p-4 flex items-start justify-between gap-3 hover:bg-muted/20">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.2 rounded text-[10px] font-bold border uppercase ${
                          n.priority === "Security Alert"
                            ? "border-rose-500/40 bg-rose-500/10 text-rose-500"
                            : n.priority === "Urgent"
                            ? "border-amber-500/40 bg-amber-500/10 text-amber-500"
                            : "border-border bg-muted/40 text-muted-foreground"
                        }`}
                      >
                        {n.priority}
                      </span>
                      <p className="font-semibold text-xs text-foreground">{n.title}</p>
                    </div>
                    <p className="text-[11px] text-muted-foreground">Target: {n.target}</p>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground whitespace-nowrap">
                    {n.sentAt}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* =========================================================================
   2. ADMINS MANAGEMENT VIEW
   ========================================================================= */
export function AdminsView() {
  const [admins, setAdmins] = React.useState<AdminUser[]>(initialAdmins);
  const [search, setSearch] = React.useState("");

  const handleToggleAdminStatus = (adm: AdminUser) => {
    if (adm.email === "admin@gmail.com") {
      alert("Super Admin root account cannot be suspended.");
      return;
    }
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === adm.id
          ? { ...a, status: a.status === "active" ? "suspended" : "active" }
          : a
      )
    );
  };

  const filteredAdmins = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            Administrative Access & Role Governance
          </h2>
          <p className="text-xs text-muted-foreground">
            Manage multi-tier admin credentials (Super Admin, College Admin, Placement Admin, Faculty Coordinator).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Search admins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs w-56"
          />
          <Button
            size="xs"
            onClick={() => alert("Admin invitation modal opens here.")}
            className="text-xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Invite Administrator
          </Button>
        </div>
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                  <th className="p-3 pl-6">Admin Name</th>
                  <th className="p-3">Email Address</th>
                  <th className="p-3">Role Tier</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Last Active</th>
                  <th className="p-3 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAdmins.map((adm) => (
                  <tr key={adm.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 pl-6 font-semibold text-foreground">{adm.name}</td>
                    <td className="p-3 font-mono text-[11px] text-muted-foreground">{adm.email}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border border-border bg-muted/30">
                        {adm.role}
                      </span>
                    </td>
                    <td className="p-3">
                      {adm.status === "active" ? (
                        <span className="text-emerald-500 font-semibold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="text-rose-500 font-semibold text-[11px] flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Suspended
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-muted-foreground">
                      {adm.lastLogin}
                    </td>
                    <td className="p-3 pr-6 text-right">
                      {adm.email !== "admin@gmail.com" && (
                        <Button
                          variant={adm.status === "active" ? "destructive" : "default"}
                          size="xs"
                          onClick={() => handleToggleAdminStatus(adm)}
                          className="text-[11px]"
                        >
                          {adm.status === "active" ? "Suspend" : "Activate"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* =========================================================================
   3. AUDIT LOGS VIEW
   ========================================================================= */
export function AuditLogsView() {
  const [logs] = React.useState<AuditLogItem[]>(initialAuditLogs);
  const [search, setSearch] = React.useState("");

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.actor.toLowerCase().includes(search.toLowerCase()) ||
      l.resource.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <History className="w-5 h-5" />
            Immutable Security & Activity Audit Log
          </h2>
          <p className="text-xs text-muted-foreground">
            Tamper-resistant ledger recording administrative overrides, entity freeze events, and credential audits.
          </p>
        </div>

        <Input
          placeholder="Filter audit logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-xs w-64"
        />
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                  <th className="p-3 pl-6">Timestamp</th>
                  <th className="p-3">Actor</th>
                  <th className="p-3">Action Undertaken</th>
                  <th className="p-3">Target Resource / Entity</th>
                  <th className="p-3 pr-6 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 pl-6 font-mono text-[11px] text-muted-foreground">
                      {log.timestamp}
                    </td>
                    <td className="p-3 font-medium text-foreground">{log.actor}</td>
                    <td className="p-3 font-semibold text-foreground">{log.action}</td>
                    <td className="p-3 font-mono text-[11px] text-muted-foreground">{log.resource}</td>
                    <td className="p-3 pr-6 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                          log.status === "Flagged"
                            ? "border-rose-500/40 bg-rose-500/10 text-rose-500"
                            : "border-border bg-muted/40 text-foreground"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* =========================================================================
   4. SETTINGS VIEW
   ========================================================================= */
export function SettingsView() {
  const [platformName, setPlatformName] = React.useState("Skill Bridge Academic Enterprise");
  const [academicYear, setAcademicYear] = React.useState("2024-2025");
  const [autoFreezeThreshold, setAutoFreezeThreshold] = React.useState("3 unverified complaints");
  const [rateLimitRequests, setRateLimitRequests] = React.useState("5 registrations / min");
  const [saved, setSaved] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Institutional Governance & Security Parameters
          </h2>
          <p className="text-xs text-muted-foreground">
            Configure system rate limit thresholds, anti-abuse heuristics, and academic calendar cycles.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-3 rounded-lg border border-border bg-muted/40 text-xs text-foreground flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Settings persisted to platform master configuration.
        </div>
      )}

      <Card className="border-border max-w-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold">System Parameters</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Strict constraints governing automatic entity freeze triggers and registration defense.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Platform Identification</label>
              <Input
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-foreground">Current Academic Cycle</label>
              <Input
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="text-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-foreground">
                Suspicious Activity Auto-Freeze Threshold
              </label>
              <Input
                value={autoFreezeThreshold}
                onChange={(e) => setAutoFreezeThreshold(e.target.value)}
                className="text-xs font-mono"
              />
              <p className="text-[11px] text-muted-foreground">
                Entities exceeding this risk index will be automatically frozen.
              </p>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-foreground">
                Anti-Abuse Registration Rate Limiter
              </label>
              <Input
                value={rateLimitRequests}
                onChange={(e) => setRateLimitRequests(e.target.value)}
                className="text-xs font-mono"
              />
              <p className="text-[11px] text-muted-foreground">
                IP and token burst restrictions active at endpoint level.
              </p>
            </div>

            <div className="pt-2">
              <Button type="submit" size="xs" className="text-xs font-semibold px-4 py-2">
                Save Platform Preferences
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
