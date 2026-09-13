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
  BookOpen,
  Award,
  Sparkles,
  AlertTriangle,
  FileCheck2,
} from "lucide-react";
import Link from "next/link";
import { defaultStudentProfile, StudentProfileData } from "@/lib/student-data";
import { Badge } from "@/components/ui/badge";
import { Briefcase, CheckCircle2, MapPin, DollarSign } from "lucide-react";
import type { AyushSkillPassport } from "@/lib/ayush/types";

interface AcquiredOpportunity {
  applicationId?: string;
  hiringPostId?: string;
  roleTitle: string;
  companyName: string;
  hiringType?: string;
  status: string;
  startDate?: string;
  compensation?: string;
  acquisitionDate?: string;
}

export default function StudentProfilePage() {
  const [profile, setProfile] = React.useState<StudentProfileData>(defaultStudentProfile);
  const [acquiredOpportunities, setAcquiredOpportunities] = React.useState<AcquiredOpportunity[]>([]);
  const [loadingAcquired, setLoadingAcquired] = React.useState(true);
  const [passport, setPassport] = React.useState<AyushSkillPassport | null>(null);
  const [loadingPassport, setLoadingPassport] = React.useState(true);

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

    // Load authoritative applications to find selected/acquired opportunities
    async function loadAcquiredOpportunities() {
      try {
        setLoadingAcquired(true);
        const res = await fetch("/api/student/applications");
        const json = await res.json();
        if (json.success && Array.isArray(json.applications)) {
          const selectedApps = json.applications
            .filter((a: any) => a.status === "selected" || a.finalStatus === "selected")
            .map((a: any): AcquiredOpportunity => ({
              applicationId: a.id,
              hiringPostId: a.jobId,
              roleTitle: a.offerDetails?.offeredRole || a.roleTitle || a.position || "Engineering Role",
              companyName: a.companyName,
              hiringType: a.employmentType || a.type || "Full-time",
              status: "Selected / Offered",
              startDate: a.offerDetails?.startDate,
              compensation: a.offerDetails?.offeredCompensation || a.salaryRange,
              acquisitionDate: a.finalDecisionDate || a.statusUpdatedAt || a.appliedAt,
            }));
          setAcquiredOpportunities(selectedApps);
        }
      } catch (err) {
        console.error("Error loading acquired opportunities:", err);
      } finally {
        setLoadingAcquired(false);
      }
    }

    async function loadPassport() {
      try {
        setLoadingPassport(true);
        const res = await fetch("/api/student/skill-passport");
        const json = await res.json();
        if (json.success && json.passport) {
          setPassport(json.passport);
        }
      } catch (err) {
        console.error("Error loading Skill Passport:", err);
      } finally {
        setLoadingPassport(false);
      }
    }

    loadAcquiredOpportunities();
    loadPassport();
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
                {passport && passport.assessmentResults.length > 0
                  ? "AYUSH Skill Gap & Matrix — Benchmarking Active"
                  : "AYUSH Assessment Center — Ready for Evaluation"}
              </p>
            </div>
            <Link
              href={
                passport && passport.assessmentResults.length > 0
                  ? "/student/skill-gap"
                  : "/student/knowledge-testing"
              }
              className="inline-flex items-center justify-center rounded-md text-xs font-semibold h-7 px-2.5 bg-foreground text-background hover:opacity-90 transition-opacity gap-1 shrink-0"
            >
              <Compass className="w-3.5 h-3.5" />
              {passport && passport.assessmentResults.length > 0
                ? "View Skill Gap"
                : "Launch Assessment"}
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Career & Employment / Acquired Opportunities */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-500" />
                Acquired Opportunities & Career Placements
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Verified employment offers and internships acquired through Industry partner recruitment.
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs font-mono">
              {acquiredOpportunities.length} {acquiredOpportunities.length === 1 ? "Offer" : "Offers"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0 space-y-4">
          {loadingAcquired ? (
            <div className="py-6 text-center text-xs text-muted-foreground">
              Loading acquired opportunities...
            </div>
          ) : acquiredOpportunities.length === 0 ? (
            <div className="p-6 rounded-lg border border-dashed border-border text-center space-y-2">
              <Briefcase className="w-8 h-8 text-muted-foreground mx-auto opacity-40" />
              <p className="text-xs font-medium text-foreground">No Acquired Opportunities Yet</p>
              <p className="text-[11px] text-muted-foreground max-w-sm mx-auto">
                Once an industry partner finalizes their hiring evaluation and extends an offer, your placement details will appear here with full verification.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {acquiredOpportunities.map((opp, idx) => (
                <div
                  key={opp.applicationId || idx}
                  className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px]">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {opp.status}
                      </Badge>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">
                        {opp.hiringType}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-foreground">{opp.roleTitle}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="font-medium text-foreground">{opp.companyName}</span>
                      {opp.compensation && (
                        <>
                          <span>&bull;</span>
                          <span className="font-mono text-emerald-600 dark:text-emerald-400">
                            {opp.compensation}
                          </span>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="text-left sm:text-right text-[11px] font-mono text-muted-foreground space-y-0.5">
                    {opp.acquisitionDate && (
                      <p>Acquired: {new Date(opp.acquisitionDate).toLocaleDateString()}</p>
                    )}
                    {opp.startDate && (
                      <p>Start Date: {new Date(opp.startDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AYUSH Skill Passport & Verified Competencies */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="space-y-1">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                AYUSH Skill Passport
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Verified skill proficiencies, clinical competencies, and readiness metrics mapped to the Ministry of AYUSH taxonomy.
              </CardDescription>
            </div>
            {passport && (
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`text-xs font-semibold ${
                    passport.industryReadinessBand === "Industry Ready"
                      ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                      : passport.industryReadinessBand === "Emerging"
                      ? "border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  {passport.industryReadinessBand || "Developing"}
                </Badge>
                {passport.industryReadinessScore != null && (
                  <span className="text-xs font-mono font-bold text-foreground bg-muted px-2 py-0.5 rounded border border-border">
                    {passport.industryReadinessScore}%
                  </span>
                )}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0 space-y-6">
          {loadingPassport ? (
            <div className="py-6 text-center text-xs text-muted-foreground">
              Loading AYUSH Skill Passport...
            </div>
          ) : !passport ? (
            <div className="p-6 rounded-lg border border-dashed border-border text-center space-y-2">
              <Award className="w-8 h-8 text-muted-foreground mx-auto opacity-40" />
              <p className="text-xs font-medium text-foreground">Skill Passport Not Yet Initialized</p>
              <p className="text-[11px] text-muted-foreground max-w-sm mx-auto">
                Complete a technical or AYUSH benchmark assessment to record your verified skills and competency passport.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Institutional Affiliation & System */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-muted/20 border border-border text-xs">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">AYUSH System</p>
                  <p className="font-semibold text-foreground capitalize">{passport.ayushSystem || "Ayurveda"}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Academic Level</p>
                  <p className="font-semibold text-foreground">{passport.academicLevel || "UG"} ({passport.course || "BAMS"})</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Registered Cohort</p>
                  <p className="font-semibold text-foreground font-mono">{passport.batchYear || "2024 - 2029"}</p>
                </div>
              </div>

              {/* Assessed Skills & Proficiencies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-primary" />
                    Assessed Skills & Evidence
                  </h3>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {Object.values(passport.skills).filter((s) => s.proficiencyLevel !== "Not Assessed").length} / {Object.keys(passport.skills).length} Mapped
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.values(passport.skills).map((skill) => {
                    const isAssessed = skill.proficiencyLevel !== "Not Assessed";
                    return (
                      <div
                        key={skill.skillId}
                        className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-2 ${
                          isAssessed
                            ? "border-border bg-card"
                            : "border-dashed border-border/60 bg-muted/10 opacity-70"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <p className="font-semibold text-foreground">{skill.skillName}</p>
                          <p className="text-[10px] text-muted-foreground">{skill.category}</p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] shrink-0 font-medium ${
                            skill.proficiencyLevel === "Proficient" || skill.proficiencyLevel === "Expert"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                              : skill.proficiencyLevel === "Competent"
                              ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                              : skill.proficiencyLevel === "Developing"
                              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {skill.proficiencyLevel}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Identified Skill Gaps (if any) */}
              {passport.skillGaps && passport.skillGaps.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-border">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Target Skill Gaps For Career Placement
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {passport.skillGaps.map((gap, idx) => (
                      <div
                        key={gap.skillId || idx}
                        className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">{gap.skillName}</span>
                          <Badge variant="outline" className="text-[10px] uppercase font-mono border-amber-500/30 text-amber-600 dark:text-amber-400">
                            {gap.priority} priority
                          </Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Current: <span className="font-medium text-foreground">{gap.currentLevel}</span> &rarr; Target: <span className="font-medium text-foreground">{gap.targetLevel}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Competencies */}
              {passport.competencies && passport.competencies.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                    Demonstrated Institutional Competencies
                  </h3>
                  <div className="space-y-2">
                    {passport.competencies.map((comp) => (
                      <div
                        key={comp.id}
                        className="p-3 rounded-lg border border-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <p className="font-semibold text-foreground">{comp.title}</p>
                          <p className="text-[10px] text-muted-foreground">{comp.domain}</p>
                        </div>
                        <div className="text-left sm:text-right text-[10px] font-mono text-muted-foreground">
                          {comp.verifiedBy && <p>Verified: {comp.verifiedBy}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assessment Evidence Links */}
              {passport.assessmentResults && passport.assessmentResults.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Completed Assessment History ({passport.assessmentResults.length})
                  </h3>
                  <div className="space-y-2">
                    {passport.assessmentResults.slice(0, 3).map((res) => (
                      <div
                        key={res.assessmentId}
                        className="p-2.5 rounded-lg border border-border bg-muted/15 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5">
                          <p className="font-semibold text-foreground">{res.assessmentTitle}</p>
                          <p className="text-[10px] text-muted-foreground font-mono">
                            {new Date(res.completedAt).toLocaleDateString()} &bull; {res.ayushSystem}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-sm text-foreground font-mono">
                            {res.scorePercent}%
                          </span>
                          <p className="text-[10px] text-muted-foreground font-mono">
                            {res.score}/{res.maxScore} pts
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
