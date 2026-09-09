"use client";

import * as React from "react";
import {
  Settings,
  Bell,
  Sliders,
  Shield,
  Save,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function FacultySettingsView() {
  const [notifyOnGaps, setNotifyOnGaps] = React.useState(true);
  const [notifyOnApplications, setNotifyOnApplications] = React.useState(true);
  const [notifyOnTestFailure, setNotifyOnTestFailure] = React.useState(true);
  const [cohortReminders, setCohortReminders] = React.useState(true);

  const handleSave = () => {
    toast.success("Faculty mentorship preferences updated.");
  };

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-4xl mx-auto">
      <div className="border-b border-border pb-3">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" />
          Mentorship Settings & Preferences
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Configure cohort notifications, diagnostic alerts, and academic advisory parameters.
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="border-b border-border py-3 px-5">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            Advisory Notification Triggers
          </CardTitle>
          <CardDescription className="text-xs">
            Choose when to receive proactive alerts regarding your assigned scholars
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div>
              <span className="font-semibold text-foreground">Critical Skill Gap Alert</span>
              <p className="text-muted-foreground text-[11px] mt-0.5">
                Notify when a scholar is diagnosed with a High Priority skill gap deficiency.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifyOnGaps}
              onChange={(e) => setNotifyOnGaps(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div>
              <span className="font-semibold text-foreground">Benchmark Test Deficiency</span>
              <p className="text-muted-foreground text-[11px] mt-0.5">
                Notify when a scholar scores below 60% on technical assessment.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifyOnTestFailure}
              onChange={(e) => setNotifyOnTestFailure(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div>
              <span className="font-semibold text-foreground">Career Placement Updates</span>
              <p className="text-muted-foreground text-[11px] mt-0.5">
                Notify when an assigned scholar is shortlisted or selected by an industry partner.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifyOnApplications}
              onChange={(e) => setNotifyOnApplications(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-foreground">Weekly Cohort Summary</span>
              <p className="text-muted-foreground text-[11px] mt-0.5">
                Receive weekly summary of scholar curriculum completions.
              </p>
            </div>
            <input
              type="checkbox"
              checked={cohortReminders}
              onChange={(e) => setCohortReminders(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
            />
          </div>

          <div className="flex justify-end pt-3 border-t border-border">
            <Button size="sm" onClick={handleSave} className="text-xs">
              <Save className="h-3.5 w-3.5 mr-1.5" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
