"use client";

import * as React from "react";
import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Save,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import type { IndustryProfile, IndustryProfileMetadata } from "@/lib/industry/types";

export function IndustryProfileView() {
  const [profile, setProfile] = React.useState<IndustryProfile | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form State
  const [formData, setFormData] = React.useState<IndustryProfileMetadata>({
    companyName: "",
    industryDomain: "",
    description: "",
    website: "",
    contactEmail: "",
    contactPhone: "",
    location: "",
    workTitle: "",
    contactPerson: "",
    companySize: "",
    foundedYear: "",
    demandedSkills: [],
  });

  const [skillsInput, setSkillsInput] = React.useState("");

  const fetchProfile = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/industry/profile");
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load profile.");
      }
      setProfile(json.profile);
      const m = json.profile.metadata || {};
      setFormData({
        companyName: m.companyName || json.profile.fullName || "",
        industryDomain: m.industryDomain || "Technology & Software",
        description: m.description || "",
        website: m.website || "",
        contactEmail: m.contactEmail || json.profile.email || "",
        contactPhone: m.contactPhone || "",
        location: m.location || "",
        workTitle: m.workTitle || "",
        contactPerson: m.contactPerson || json.profile.fullName || "",
        companySize: m.companySize || "",
        foundedYear: m.foundedYear || "",
        demandedSkills: Array.isArray(m.demandedSkills) ? m.demandedSkills : [],
      });
      setSkillsInput(Array.isArray(m.demandedSkills) ? m.demandedSkills.join(", ") : "");
    } catch (err: unknown) {
      console.error("Profile fetch error:", err);
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to load profile.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Client-side validations
    if (!formData.companyName.trim()) {
      setStatusMessage({ type: "error", text: "Organization Name is required." });
      return;
    }

    if (formData.website && !/^https?:\/\//i.test(formData.website.trim())) {
      setStatusMessage({
        type: "error",
        text: "Website URL must start with http:// or https://",
      });
      return;
    }

    if (
      formData.contactEmail &&
      !/[\w.-]+@[\w.-]+\.[a-z]{2,}/i.test(formData.contactEmail.trim())
    ) {
      setStatusMessage({
        type: "error",
        text: "Please provide a valid contact email address.",
      });
      return;
    }

    try {
      setIsSaving(true);
      const parsedSkills = skillsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        demandedSkills: parsedSkills,
      };

      const res = await fetch("/api/industry/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to update profile.");
      }

      setStatusMessage({
        type: "success",
        text: "Industry organization profile saved successfully.",
      });
      toast.success("Industry organization profile saved successfully.");
      setFormData((prev) => ({ ...prev, demandedSkills: parsedSkills }));
    } catch (err: unknown) {
      console.error("Save profile error:", err);
      const msg = err instanceof Error ? err.message : "Failed to save profile.";
      setStatusMessage({
        type: "error",
        text: msg,
      });
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48 rounded-full" />
          <Skeleton className="h-8 w-80 rounded-lg" />
          <Skeleton className="h-4 w-96 rounded" />
        </div>
        <Skeleton className="h-10 w-full max-w-md rounded-lg" />
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border bg-muted/30 text-[11px] text-muted-foreground font-medium">
            <Building2 className="w-3 h-3 text-foreground" />
            <span>Enterprise Organization Credentials</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Industry Profile & Campus Verification
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage your corporate identity, recruiter contacts, and demanded competencies for student matching.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs gap-1 py-1 border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized Corporate Partner</span>
          </Badge>
        </div>
      </div>

      {statusMessage && (
        <Alert variant={statusMessage.type === "success" ? "success" : "destructive"}>
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <div>
            <AlertTitle>
              {statusMessage.type === "success" ? "Profile Updated" : "Submission Notice"}
            </AlertTitle>
            <AlertDescription>{statusMessage.text}</AlertDescription>
          </div>
        </Alert>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="organization" className="w-full space-y-4">
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="organization" className="text-xs">Company</TabsTrigger>
            <TabsTrigger value="recruiter" className="text-xs">Recruiter</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="organization">
            <Card className="border-border bg-card">
              <CardHeader className="p-4 pb-3 border-b border-border">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Organization Details
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Official company information displayed on campus drives and student postings
                </CardDescription>
              </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="companyName" className="text-xs font-medium">
                  Organization / Company Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Infosys Technologies, Apex Dynamics"
                  required
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="industryDomain" className="text-xs font-medium">
                  Industry Type / Domain
                </Label>
                <Input
                  id="industryDomain"
                  value={formData.industryDomain}
                  onChange={(e) => setFormData({ ...formData, industryDomain: e.target.value })}
                  placeholder="e.g. Software & Cloud Services, AI Research"
                  className="text-xs h-9"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs font-medium">
                Company Description & Overview
              </Label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Briefly describe your company culture, engineering focus, and recruitment objectives..."
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="website" className="text-xs font-medium flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-muted-foreground" />
                  <span>Website URL</span>
                </Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://company.com"
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="location" className="text-xs font-medium flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span>HQ / Office Location</span>
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Bengaluru, India (Hybrid)"
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="companySize" className="text-xs font-medium">
                  Company Scale
                </Label>
                <Input
                  id="companySize"
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  placeholder="e.g. 500-1000 Employees"
                  className="text-xs h-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="recruiter">
        <Card className="border-border bg-card">
          <CardHeader className="p-4 pb-3 border-b border-border">
            <CardTitle className="text-sm font-semibold text-foreground">
              Recruiter & Talent Point of Contact
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Direct institutional communication details for campus placement drives
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="contactPerson" className="text-xs font-medium">
                  Lead Contact Person
                </Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="e.g. Rajesh Kumar"
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="workTitle" className="text-xs font-medium">
                  Designation / Role Title
                </Label>
                <Input
                  id="workTitle"
                  value={formData.workTitle}
                  onChange={(e) => setFormData({ ...formData, workTitle: e.target.value })}
                  placeholder="e.g. Senior Technical Recruiter, VP Engineering"
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contactEmail" className="text-xs font-medium flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-muted-foreground" />
                  <span>Contact Email</span>
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="recruiter@company.com"
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contactPhone" className="text-xs font-medium flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-muted-foreground" />
                  <span>Contact Phone / Extension</span>
                </Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="text-xs h-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="skills">
        <Card className="border-border bg-card">
          <CardHeader className="p-4 pb-3 border-b border-border">
            <CardTitle className="text-sm font-semibold text-foreground">
              Demanded Engineering Competencies
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Keywords and technical skills used by Skill Bridge matching algorithms to surface relevant student talent
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="demandedSkills" className="text-xs font-medium">
                Demanded Skills (Comma-separated)
              </Label>
              <Input
                id="demandedSkills"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="Python, React, TypeScript, Docker, Kubernetes, PostgreSQL"
                className="text-xs h-9"
              />
            </div>

            {skillsInput && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skillsInput
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-[11px] font-normal">
                      {skill}
                    </Badge>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="submit"
            disabled={isSaving}
            className="text-xs gap-1.5 min-w-[130px]"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
