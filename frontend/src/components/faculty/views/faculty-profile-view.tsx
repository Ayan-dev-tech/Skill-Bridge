"use client";

import * as React from "react";
import {
  User,
  GraduationCap,
  Mail,
  Building,
  Phone,
  MapPin,
  BookOpen,
  Save,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import type { FacultyProfileData } from "@/lib/faculty/types";

export function FacultyProfileView() {
  const [profile, setProfile] = React.useState<FacultyProfileData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  // Form editable states
  const [phone, setPhone] = React.useState("");
  const [officeLocation, setOfficeLocation] = React.useState("");
  const [bio, setBio] = React.useState("");

  React.useEffect(() => {
    fetch("/api/faculty/profile")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setProfile(json.data);
          setPhone(json.data.phone || "");
          setOfficeLocation(json.data.officeLocation || "");
          setBio(json.data.bio || "");
        }
      })
      .catch(() => {
        toast.error("Failed to load faculty profile");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/faculty/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, officeLocation, bio }),
      });
      const json = await res.json();
      if (json.success) {
        setProfile(json.data);
        toast.success("Faculty profile updated successfully.");
      } else {
        toast.error(json.error || "Failed to update profile.");
      }
    } catch {
      toast.error("Error saving profile changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 rounded-lg" />
      </div>
    );
  }

  if (!profile) {
    return <div className="p-6 text-center text-xs text-muted-foreground">Profile record not found.</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-4xl mx-auto">
      <div className="border-b border-border pb-3">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          Faculty Academic Profile
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Institutional designation, departmental alignment, and academic credentials.
        </p>
      </div>

      {/* Profile Overview Card */}
      <Card className="p-6 bg-card border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xl font-bold">
            {profile.fullName.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">{profile.fullName}</h2>
              <Badge variant="outline" className="text-xs">
                {profile.designation}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {profile.department} &bull; {profile.institution}
            </p>
            <p className="text-xs text-muted-foreground font-mono">{profile.email}</p>
          </div>
          <div className="text-right sm:border-l sm:border-border sm:pl-4 sm:ml-4">
            <span className="text-2xl font-bold font-mono text-foreground">{profile.assignedStudentCount}</span>
            <p className="text-[11px] text-muted-foreground uppercase font-semibold">Assigned Scholars</p>
          </div>
        </div>
      </Card>

      {/* Edit Form */}
      <Card className="bg-card border-border">
        <CardHeader className="border-b border-border py-3 px-5">
          <CardTitle className="text-sm font-semibold">Mentorship Contact & Office Details</CardTitle>
          <CardDescription className="text-xs">
            Visible to assigned scholars for mentorship hours and academic advisory
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5">
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" /> Contact Phone
                </label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> Office Location
                </label>
                <Input
                  value={officeLocation}
                  onChange={(e) => setOfficeLocation(e.target.value)}
                  placeholder="Department Wing, Room 402"
                  className="text-xs h-9"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" /> Academic Bio & Research Focus
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Provide mentorship guidance and research interests..."
                className="w-full rounded-md border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
              />
            </div>

            <div className="space-y-2 border-t border-border pt-3">
              <label className="font-semibold text-foreground flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> Aligned Teaching Subjects
              </label>
              <div className="flex flex-wrap gap-1.5">
                {profile.subjects.map((subj, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {subj}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isSaving} size="sm" className="text-xs">
                <Save className="h-3.5 w-3.5 mr-1.5" />
                {isSaving ? "Saving..." : "Save Profile Details"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
