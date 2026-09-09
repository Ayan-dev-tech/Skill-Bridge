"use client";

import * as React from "react";
import { StudentProfileData } from "@/lib/student-data";
import { GraduationCap, Hash, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StudentProfileBadgeProps {
  profile: StudentProfileData;
  compact?: boolean;
}

export function StudentProfileBadge({
  profile,
  compact = false,
}: StudentProfileBadgeProps) {
  // Compute initials
  const initials = profile.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (compact) {
    return (
      <div className="flex items-center gap-2.5 p-2 rounded-lg border border-border bg-muted/20 text-xs">
        <Avatar className="size-8 rounded-md shrink-0">
          {profile.photoUrl && (
            <AvatarImage src={profile.photoUrl} alt={profile.fullName} />
          )}
          <AvatarFallback className="rounded-md bg-foreground text-background font-semibold text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground truncate">{profile.fullName}</p>
          <p className="text-muted-foreground text-[11px] truncate">
            {profile.course}
          </p>
          <p className="text-muted-foreground text-[10px] font-mono">
            Semester {profile.semester}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg border border-border bg-card text-xs space-y-3">
      <div className="flex items-start gap-3">
        <Avatar className="size-10 rounded-md shrink-0">
          {profile.photoUrl && (
            <AvatarImage src={profile.photoUrl} alt={profile.fullName} />
          )}
          <AvatarFallback className="rounded-md bg-foreground text-background font-bold text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-0.5">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm text-foreground tracking-tight truncate">
              {profile.fullName}
            </h4>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold border border-border bg-muted/40 uppercase tracking-wider">
              Student
            </span>
          </div>
          <p className="text-muted-foreground text-xs truncate">
            {profile.department}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1.5 truncate">
          <GraduationCap className="w-3.5 h-3.5 text-foreground shrink-0" />
          <span className="truncate">
            {profile.course} (Semester {profile.semester})
          </span>
        </div>
        <div className="flex items-center gap-1.5 truncate font-mono">
          <Hash className="w-3.5 h-3.5 text-foreground shrink-0" />
          <span className="truncate">{profile.rollNumber}</span>
        </div>
        <div className="flex items-center gap-1.5 truncate font-mono sm:col-span-2">
          <Mail className="w-3.5 h-3.5 text-foreground shrink-0" />
          <span className="truncate">{profile.email}</span>
        </div>
      </div>
    </div>
  );
}
