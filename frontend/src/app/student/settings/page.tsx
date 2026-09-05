"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ShieldCheck, Bell, Lock } from "lucide-react";

export function StudentSettingsPage() {
  const [saved, setSaved] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [placementAlerts, setPlacementAlerts] = React.useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Student Account & Preferences
        </h1>
        <p className="text-xs text-muted-foreground">
          Configure notification channels, campus drive notifications, and security options.
        </p>
      </div>

      {saved && (
        <div className="p-3 rounded-lg border border-border bg-muted/40 text-xs text-foreground flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Preferences updated successfully.
        </div>
      )}

      <div className="space-y-4">
        {/* Notifications Card */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Bell className="w-4 h-4" /> Communication Preferences
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Select which institutional alerts you wish to receive via email and dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10 cursor-pointer">
              <div className="space-y-0.5">
                <p className="font-semibold text-foreground">Diagnostic Assessment Reminders</p>
                <p className="text-muted-foreground text-[11px]">
                  Receive notifications when scheduled aptitude or technical benchmarks are available.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="rounded border-border text-foreground focus:ring-ring w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10 cursor-pointer">
              <div className="space-y-0.5">
                <p className="font-semibold text-foreground">Campus Placement & Internship Alerts</p>
                <p className="text-muted-foreground text-[11px]">
                  Alert when a corporate hiring partner matches your verified technical skill stack.
                </p>
              </div>
              <input
                type="checkbox"
                checked={placementAlerts}
                onChange={(e) => setPlacementAlerts(e.target.checked)}
                className="rounded border-border text-foreground focus:ring-ring w-4 h-4"
              />
            </label>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Lock className="w-4 h-4" /> Security & Credentials
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Manage account authentication and institutional session controls.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-3 text-xs max-w-md">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Current Password</label>
                <Input type="password" placeholder="••••••••" className="text-xs" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">New Password</label>
                <Input type="password" placeholder="••••••••" className="text-xs" />
              </div>
              <div className="pt-2">
                <Button type="submit" size="xs" className="text-xs">
                  Update Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default StudentSettingsPage;
