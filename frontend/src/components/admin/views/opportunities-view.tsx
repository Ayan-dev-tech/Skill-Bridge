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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Briefcase,
  FileText,
  Search,
  Plus,
  Building2,
  Calendar,
  DollarSign,
  Users,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  initialJobs,
  initialInternships,
  JobListing,
  InternshipListing,
} from "@/lib/admin-data";

interface OpportunitiesViewProps {
  initialTab?: "jobs" | "internships";
}

export function OpportunitiesView({ initialTab = "jobs" }: OpportunitiesViewProps) {
  const [activeTab, setActiveTab] = React.useState<"jobs" | "internships">(initialTab);
  const [jobs, setJobs] = React.useState<JobListing[]>(initialJobs);
  const [internships, setInternships] = React.useState<InternshipListing[]>(initialInternships);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Detail Sheet
  const [selectedJob, setSelectedJob] = React.useState<JobListing | null>(null);
  const [selectedInternship, setSelectedInternship] = React.useState<InternshipListing | null>(null);

  // Status Alerts
  const [feedbackMessage, setFeedbackMessage] = React.useState<string | null>(null);

  // Update tab when prop changes
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Authoritative Database Sync for Admin Opportunities
  React.useEffect(() => {
    async function loadAuthoritativeData() {
      try {
        const res = await fetch("/api/admin/overview");
        const json = await res.json();
        if (json.success && json.data) {
          const industryPosts = json.data.industryHiringPosts || [];
          const applications = json.data.jobApplications || [];

          // Map industry hiring posts into Admin JobListing and InternshipListing formats
          const realJobs: JobListing[] = industryPosts
            .filter((p: any) => p.hiringType !== "Internship")
            .map((p: any) => ({
              id: p.id,
              company: p.companyName,
              position: p.roleTitle,
              requiredSkills: p.requiredSkills || [],
              eligibility: p.experienceRequirement || "Fresher / Direct Campus Drive",
              location: `${p.location} (${p.workMode})`,
              salary: p.salaryRange || "Competitive",
              deadline: p.deadline ? new Date(p.deadline).toISOString().split("T")[0] : "Rolling",
              applicationsCount: applications.filter((a: any) => a.jobId === p.id).length,
              status: p.status === "published" ? "active" : p.status === "frozen" ? "frozen" : "pending",
            }));

          const realInternships: InternshipListing[] = industryPosts
            .filter((p: any) => p.hiringType === "Internship")
            .map((p: any) => ({
              id: p.id,
              company: p.companyName,
              role: p.roleTitle,
              duration: "6 Months",
              requiredSkills: p.requiredSkills || [],
              stipend: p.salaryRange || "₹25,000 / month",
              deadline: p.deadline ? new Date(p.deadline).toISOString().split("T")[0] : "Rolling",
              applicationsCount: applications.filter((a: any) => a.jobId === p.id).length,
              status: p.status === "published" ? "active" : p.status === "frozen" ? "frozen" : "pending",
            }));

          setJobs([...realJobs, ...initialJobs]);
          setInternships([...realInternships, ...initialInternships]);
        }
      } catch (err) {
        console.error("Admin opportunities fetch error:", err);
      }
    }
    loadAuthoritativeData();
  }, []);

  // Toggle Job Freeze
  const handleToggleJobFreeze = (job: JobListing) => {
    const updated = jobs.map((j) => {
      if (j.id === job.id) {
        const nextStatus = j.status === "frozen" ? "active" : "frozen";
        return { ...j, status: nextStatus as "active" | "frozen" };
      }
      return j;
    });
    setJobs(updated);
    setFeedbackMessage(
      job.status === "frozen"
        ? `Restored job listing: ${job.position} at ${job.company}`
        : `Frozen job listing: ${job.position} due to compliance check.`
    );
    if (selectedJob?.id === job.id) {
      setSelectedJob({
        ...selectedJob,
        status: selectedJob.status === "frozen" ? "active" : "frozen",
      });
    }
  };

  // Toggle Internship Freeze
  const handleToggleInternshipFreeze = (intern: InternshipListing) => {
    const updated = internships.map((i) => {
      if (i.id === intern.id) {
        const nextStatus = i.status === "frozen" ? "active" : "frozen";
        return { ...i, status: nextStatus as "active" | "frozen" };
      }
      return i;
    });
    setInternships(updated);
    setFeedbackMessage(
      intern.status === "frozen"
        ? `Restored internship: ${intern.role} at ${intern.company}`
        : `Frozen internship: ${intern.role} due to compliance check.`
    );
    if (selectedInternship?.id === intern.id) {
      setSelectedInternship({
        ...selectedInternship,
        status: selectedInternship.status === "frozen" ? "active" : "frozen",
      });
    }
  };

  // Filtered lists
  const filteredJobs = React.useMemo(() => {
    return jobs.filter((j) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          j.company.toLowerCase().includes(q) ||
          j.position.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.requiredSkills.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [jobs, searchQuery]);

  const filteredInternships = React.useMemo(() => {
    return internships.filter((i) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          i.company.toLowerCase().includes(q) ||
          i.role.toLowerCase().includes(q) ||
          i.duration.toLowerCase().includes(q) ||
          i.requiredSkills.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [internships, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Active Job Postings</p>
            <p className="text-2xl font-bold font-mono">
              {jobs.filter((j) => j.status === "active").length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Active Internships</p>
            <p className="text-2xl font-bold font-mono">
              {internships.filter((i) => i.status === "active").length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Total Applications Submitted</p>
            <p className="text-2xl font-bold font-mono">
              {jobs.reduce((acc, j) => acc + j.applicationsCount, 0) +
                internships.reduce((acc, i) => acc + i.applicationsCount, 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Frozen / Suspicious</p>
            <p className="text-2xl font-bold font-mono text-destructive">
              {jobs.filter((j) => j.status === "frozen").length +
                internships.filter((i) => i.status === "frozen").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {feedbackMessage && (
        <div className="p-3 rounded-lg border border-border bg-muted/40 text-xs text-foreground flex items-center justify-between">
          <span>✓ {feedbackMessage}</span>
          <button
            onClick={() => setFeedbackMessage(null)}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs Container */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as "jobs" | "internships")}
        className="w-full space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <TabsList className="grid w-full sm:w-64 grid-cols-2">
            <TabsTrigger value="jobs" className="flex items-center gap-1.5 text-xs">
              <Briefcase className="w-3.5 h-3.5" /> Jobs ({jobs.length})
            </TabsTrigger>
            <TabsTrigger value="internships" className="flex items-center gap-1.5 text-xs">
              <FileText className="w-3.5 h-3.5" /> Internships ({internships.length})
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search openings, company, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs pl-8"
              />
            </div>
            <Button
              size="xs"
              onClick={() => alert("Opportunity submission form opens here.")}
              className="text-xs flex items-center gap-1 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" /> Add Opening
            </Button>
          </div>
        </div>

        {/* ================= JOBS TAB ================= */}
        <TabsContent value="jobs" className="mt-0">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Campus Job Listings</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Corporate placement drives, eligibility criteria, applicant volume, and status audits.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                      <th className="p-3 pl-6">Company & Position</th>
                      <th className="p-3">Required Competencies</th>
                      <th className="p-3">Eligibility</th>
                      <th className="p-3">Compensation</th>
                      <th className="p-3">Deadline</th>
                      <th className="p-3">Applicants</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredJobs.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-muted-foreground">
                          No jobs found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredJobs.map((job) => (
                        <tr
                          key={job.id}
                          className={`transition-colors ${
                            job.status === "frozen"
                              ? "bg-destructive/5 hover:bg-destructive/10"
                              : "hover:bg-muted/20"
                          }`}
                        >
                          <td className="p-3 pl-6">
                            <p className="font-semibold text-foreground">{job.position}</p>
                            <p className="text-[11px] text-muted-foreground">{job.company}</p>
                          </td>

                          <td className="p-3 max-w-[200px]">
                            <div className="flex flex-wrap gap-1">
                              {job.requiredSkills.map((s, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.2 text-[10px] rounded border border-border bg-muted/40 text-muted-foreground font-medium"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="p-3 text-[11px] text-muted-foreground max-w-[150px] truncate">
                            {job.eligibility}
                          </td>

                          <td className="p-3 font-mono text-[11px] font-semibold text-foreground">
                            {job.salary}
                          </td>

                          <td className="p-3 font-mono text-[11px] text-muted-foreground">
                            {job.deadline}
                          </td>

                          <td className="p-3 font-mono font-bold">
                            {job.applicationsCount}
                          </td>

                          <td className="p-3">
                            {job.status === "frozen" ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border border-destructive/40 bg-destructive/15 text-destructive uppercase">
                                Frozen
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border border-border bg-muted/40 uppercase">
                                Active
                              </span>
                            )}
                          </td>

                          <td className="p-3 pr-6 text-right space-x-1.5 whitespace-nowrap">
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => setSelectedJob(job)}
                              className="text-[11px]"
                            >
                              View
                            </Button>
                            <Button
                              variant={job.status === "frozen" ? "default" : "destructive"}
                              size="xs"
                              onClick={() => handleToggleJobFreeze(job)}
                              className="text-[11px]"
                            >
                              {job.status === "frozen" ? "Unfreeze" : "Freeze"}
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= INTERNSHIPS TAB ================= */}
        <TabsContent value="internships" className="mt-0">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Campus Internship Drives</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Summer & winter internships, stipend tracking, prerequisites, and status control.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                      <th className="p-3 pl-6">Company & Role</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3">Required Competencies</th>
                      <th className="p-3">Stipend</th>
                      <th className="p-3">Deadline</th>
                      <th className="p-3">Applicants</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredInternships.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-muted-foreground">
                          No internships found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredInternships.map((intern) => (
                        <tr
                          key={intern.id}
                          className={`transition-colors ${
                            intern.status === "frozen"
                              ? "bg-destructive/5 hover:bg-destructive/10"
                              : "hover:bg-muted/20"
                          }`}
                        >
                          <td className="p-3 pl-6">
                            <p className="font-semibold text-foreground">{intern.role}</p>
                            <p className="text-[11px] text-muted-foreground">{intern.company}</p>
                          </td>

                          <td className="p-3 font-mono text-[11px]">{intern.duration}</td>

                          <td className="p-3 max-w-[200px]">
                            <div className="flex flex-wrap gap-1">
                              {intern.requiredSkills.map((s, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.2 text-[10px] rounded border border-border bg-muted/40 text-muted-foreground font-medium"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="p-3 font-mono text-[11px] font-semibold text-foreground">
                            {intern.stipend}
                          </td>

                          <td className="p-3 font-mono text-[11px] text-muted-foreground">
                            {intern.deadline}
                          </td>

                          <td className="p-3 font-mono font-bold">
                            {intern.applicationsCount}
                          </td>

                          <td className="p-3">
                            {intern.status === "frozen" ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border border-destructive/40 bg-destructive/15 text-destructive uppercase">
                                Frozen
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border border-border bg-muted/40 uppercase">
                                Active
                              </span>
                            )}
                          </td>

                          <td className="p-3 pr-6 text-right space-x-1.5 whitespace-nowrap">
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => setSelectedInternship(intern)}
                              className="text-[11px]"
                            >
                              View
                            </Button>
                            <Button
                              variant={intern.status === "frozen" ? "default" : "destructive"}
                              size="xs"
                              onClick={() => handleToggleInternshipFreeze(intern)}
                              className="text-[11px]"
                            >
                              {intern.status === "frozen" ? "Unfreeze" : "Freeze"}
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Job Detail Sheet */}
      <Sheet open={!!selectedJob} onOpenChange={(open: boolean) => !open && setSelectedJob(null)}>
        <SheetContent className="sm:max-w-lg w-full p-6 overflow-y-auto space-y-6">
          {selectedJob && (
            <>
              <SheetHeader className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-border bg-muted/40">
                    Full-Time Position
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      selectedJob.status === "frozen"
                        ? "border-destructive/40 bg-destructive/10 text-destructive"
                        : "border-border bg-foreground text-background"
                    }`}
                  >
                    {selectedJob.status}
                  </span>
                </div>
                <SheetTitle className="text-xl font-bold">{selectedJob.position}</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5" /> {selectedJob.company} • {selectedJob.location}
                </SheetDescription>
              </SheetHeader>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-lg border border-border bg-muted/20 text-xs">
                <div>
                  <p className="text-muted-foreground text-[11px]">CTC Package</p>
                  <p className="font-semibold text-foreground font-mono">{selectedJob.salary}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[11px]">Application Deadline</p>
                  <p className="font-semibold text-foreground font-mono">{selectedJob.deadline}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[11px]">Total Applied</p>
                  <p className="font-semibold text-foreground font-mono">
                    {selectedJob.applicationsCount} students
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[11px]">Eligibility</p>
                  <p className="font-semibold text-foreground truncate">{selectedJob.eligibility}</p>
                </div>
              </div>

              {/* Required Skills */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Required Skill Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJob.requiredSkills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded text-xs font-medium border border-border bg-card"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compliance Actions */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Button
                  variant={selectedJob.status === "frozen" ? "default" : "destructive"}
                  size="sm"
                  onClick={() => handleToggleJobFreeze(selectedJob)}
                  className="text-xs"
                >
                  {selectedJob.status === "frozen" ? "Restore Posting" : "Freeze Listing"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Reviewing candidate pool for ${selectedJob.position}`)}
                  className="text-xs"
                >
                  Manage Candidates
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Internship Detail Sheet */}
      <Sheet open={!!selectedInternship} onOpenChange={(open: boolean) => !open && setSelectedInternship(null)}>
        <SheetContent className="sm:max-w-lg w-full p-6 overflow-y-auto space-y-6">
          {selectedInternship && (
            <>
              <SheetHeader className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-border bg-muted/40">
                    Internship Program
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      selectedInternship.status === "frozen"
                        ? "border-destructive/40 bg-destructive/10 text-destructive"
                        : "border-border bg-foreground text-background"
                    }`}
                  >
                    {selectedInternship.status}
                  </span>
                </div>
                <SheetTitle className="text-xl font-bold">{selectedInternship.role}</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5" /> {selectedInternship.company}
                </SheetDescription>
              </SheetHeader>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-lg border border-border bg-muted/20 text-xs">
                <div>
                  <p className="text-muted-foreground text-[11px]">Monthly Stipend</p>
                  <p className="font-semibold text-foreground font-mono">{selectedInternship.stipend}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[11px]">Program Duration</p>
                  <p className="font-semibold text-foreground font-mono">{selectedInternship.duration}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[11px]">Applications</p>
                  <p className="font-semibold text-foreground font-mono">
                    {selectedInternship.applicationsCount} students
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[11px]">Deadline</p>
                  <p className="font-semibold text-foreground font-mono">{selectedInternship.deadline}</p>
                </div>
              </div>

              {/* Required Skills */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Required Competencies
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedInternship.requiredSkills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded text-xs font-medium border border-border bg-card"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Button
                  variant={selectedInternship.status === "frozen" ? "default" : "destructive"}
                  size="sm"
                  onClick={() => handleToggleInternshipFreeze(selectedInternship)}
                  className="text-xs"
                >
                  {selectedInternship.status === "frozen" ? "Restore Internship" : "Freeze Internship"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Reviewing applicants for ${selectedInternship.role}`)}
                  className="text-xs"
                >
                  View Applicants
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
