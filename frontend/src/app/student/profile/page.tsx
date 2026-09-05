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
import {
  GraduationCap,
  Hash,
  Mail,
  Building2,
  Calendar,
  ShieldCheck,
  Compass,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { defaultStudentProfile, StudentProfileData } from "@/lib/student-data";

export default function StudentProfilePage() {
  const [profile, setProfile] = React.useState<StudentProfileData>(defaultStudentProfile);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("skill_bridge_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.fullName) {
            setProfile((prev) => ({
              ...prev,
              fullName: parsed.fullName,
              email: parsed.email || prev.email,
              id: parsed.id || prev.id,
            }));
          }
        } catch {
          // Keep default
        }
      }
    }
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Student Academic Profile
        </h1>
        <p className="text-xs text-muted-foreground">
          Institutional identity and academic status registered with the Skill Bridge platform.
        </p>
      </div>

      {/* Main Profile Card */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg bg-foreground text-background font-bold text-base flex items-center justify-center shrink-0">
                {profile.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-foreground">
                  {profile.fullName}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground font-mono">
                  ID: {profile.id}
                </CardDescription>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
              <ShieldCheck className="w-3.5 h-3.5" /> Enrolled & Active
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0 space-y-6">
          {/* Institutional Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-border">
            <div className="space-y-1">
              <p className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                Degree & Course
              </p>
              <p className="font-semibold text-foreground flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                {profile.course}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                Current Semester
              </p>
              <p className="font-semibold text-foreground font-mono">
                Semester {profile.semester} ({profile.batchYear})
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                Academic Department
              </p>
              <p className="font-semibold text-foreground flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                {profile.department}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                Collegiate Roll Number
              </p>
              <p className="font-semibold text-foreground font-mono flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-muted-foreground" />
                {profile.rollNumber}
              </p>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <p className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                Registered Institutional Email
              </p>
              <p className="font-semibold text-foreground font-mono flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-muted-foreground" />
                {profile.email}
              </p>
            </div>
          </div>

          {/* Current Milestone Status */}
          <div className="p-4 rounded-lg border border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <p className="font-semibold text-foreground">Current Active Milestone</p>
              <p className="text-muted-foreground text-[11px]">
                Stage 1: Interest Finder — Pending Exploration
              </p>
            </div>
            <Link
              href="/student/interest-finder"
              className="inline-flex items-center justify-center rounded-md text-xs font-semibold h-7 px-2.5 bg-foreground text-background hover:opacity-90 transition-opacity gap-1 shrink-0"
            >
              <Compass className="w-3.5 h-3.5" />
              Launch Exploration
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
