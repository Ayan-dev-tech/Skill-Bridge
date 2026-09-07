"use client";

import * as React from "react";
import {
  Users,
  Search,
  Filter,
  GraduationCap,
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Briefcase,
  Layers,
  Sparkles,
  Globe,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";

function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { PermittedStudentTalent } from "@/lib/industry/types";

export function StudentDataAccessView() {
  const [students, setStudents] = React.useState<PermittedStudentTalent[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Filters
  const [search, setSearch] = React.useState("");
  const [selectedDomain, setSelectedDomain] = React.useState("all");
  const [selectedLevel, setSelectedLevel] = React.useState("all");

  // Detailed view drawer
  const [selectedStudent, setSelectedStudent] = React.useState<PermittedStudentTalent | null>(null);

  const fetchStudents = React.useCallback(async (pageNum: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: String(pageNum),
        limit: "8",
      });

      if (search.trim()) params.append("search", search.trim());
      if (selectedDomain !== "all") params.append("domain", selectedDomain);
      if (selectedLevel !== "all") params.append("level", selectedLevel);

      const res = await fetch(`/api/industry/students?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load student talent directory.");
      }

      setStudents(json.students || []);
      setTotalCount(json.totalCount || 0);
      setPage(json.page || 1);
      setTotalPages(json.totalPages || 1);
    } catch (err: unknown) {
      console.error("Student talent fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to load student talent directory.");
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedDomain, selectedLevel]);

  React.useEffect(() => {
    fetchStudents(1);
  }, [fetchStudents]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStudents(1);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border bg-muted/40 text-[11px] text-muted-foreground font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Authorized Enterprise Student Discovery</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Certified Student Talent Directory
          </h1>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Discover verified engineering undergraduates with demonstrated technical proficiencies and benchmarked competency scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs py-1 px-3">
            <span>{totalCount} Verified Candidates</span>
          </Badge>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <Card className="border-border bg-card">
        <CardContent className="p-3.5">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidates by name, technical skills (e.g. Python, React), or department..."
                className="pl-9 text-xs h-9"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="h-9 px-3 rounded-md border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="all">All Technical Domains</option>
                <option value="software">Software Engineering</option>
                <option value="ai-ml">AI / Machine Learning</option>
                <option value="cloud">Cloud & Infrastructure</option>
                <option value="web">Web & Full-Stack</option>
                <option value="security">Cybersecurity & Defense</option>
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="h-9 px-3 rounded-md border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="all">All Benchmark Levels</option>
                <option value="beginner">Beginner Tier</option>
                <option value="intermediate">Intermediate Tier</option>
                <option value="advanced">Advanced Tier</option>
              </select>

              <Button type="submit" size="sm" className="text-xs h-9 px-4 shrink-0">
                Filter
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 rounded-md border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <Button size="sm" variant="ghost" onClick={() => fetchStudents(page)} className="h-7 text-xs">
            Retry
          </Button>
        </div>
      )}

      {/* Student Cards Grid */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Filtering verified student profiles...</p>
        </div>
      ) : students.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((stu) => (
            <Card
              key={stu.id}
              className="border-border bg-card hover:border-foreground/30 transition-all cursor-pointer flex flex-col justify-between"
              onClick={() => setSelectedStudent(stu)}
            >
              <CardHeader className="p-4 pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground tracking-tight">
                        {stu.fullName}
                      </h3>
                      <Badge variant="outline" className="text-[10px] font-normal py-0 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
                        {stu.verifiedStatus}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{stu.department} • Sem {stu.semester} ({stu.batchYear})</span>
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {stu.institution}
                    </p>
                  </div>

                  {stu.knowledgeLevel && (
                    <div className="text-right shrink-0">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-muted text-foreground border border-border">
                        {stu.knowledgeLevel}
                      </span>
                      {stu.benchmarkScorePercent !== null && stu.benchmarkScorePercent !== undefined && (
                        <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                          {stu.benchmarkScorePercent}% benchmark
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-0 space-y-3">
                {stu.interestDomain && (
                  <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded-md border border-border/50">
                    <span className="font-medium text-foreground">Interest: </span>
                    <span>{stu.interestDomain}</span>
                    {stu.specificInterest && (
                      <span className="text-muted-foreground"> • {stu.specificInterest}</span>
                    )}
                  </div>
                )}

                {/* Technical Skills */}
                <div className="flex flex-wrap gap-1">
                  {stu.technicalSkills.slice(0, 5).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-muted/60 text-foreground font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {stu.technicalSkills.length > 5 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-muted-foreground">
                      +{stu.technicalSkills.length - 5} more
                    </span>
                  )}
                </div>

                {/* Action Bar */}
                <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    {stu.profiles.gitHub && (
                      <span className="inline-flex items-center gap-1 text-[11px] hover:text-foreground">
                        <GitHubIcon className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </span>
                    )}
                    {stu.profiles.linkedIn && (
                      <span className="inline-flex items-center gap-1 text-[11px] hover:text-foreground">
                        <LinkedInIcon className="w-3.5 h-3.5" />
                        <span>LinkedIn</span>
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-medium text-foreground hover:underline inline-flex items-center gap-1">
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="border-border bg-card">
          <CardContent className="py-16 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-muted mx-auto flex items-center justify-center text-muted-foreground">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">No students match your filter criteria</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Try broadening your keyword search, selecting &quot;All Technical Domains&quot;, or resetting benchmark level filters.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setSelectedDomain("all");
                setSelectedLevel("all");
              }}
              className="text-xs"
            >
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            Showing Page <span className="font-semibold text-foreground">{page}</span> of{" "}
            <span className="font-semibold text-foreground">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || isLoading}
              onClick={() => fetchStudents(page - 1)}
              className="text-xs h-8 gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages || isLoading}
              onClick={() => fetchStudents(page + 1)}
              className="text-xs h-8 gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Detailed Student Slide-Over Modal / Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-card border border-border rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">{selectedStudent.fullName}</h2>
                <p className="text-xs text-muted-foreground">{selectedStudent.institution}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-md bg-muted/20 border border-border">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Academic Course</span>
                  <span className="font-medium text-foreground">{selectedStudent.course}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Department</span>
                  <span className="font-medium text-foreground">{selectedStudent.department}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Current Semester</span>
                  <span className="font-medium text-foreground">Semester {selectedStudent.semester}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Batch Year</span>
                  <span className="font-medium text-foreground">{selectedStudent.batchYear}</span>
                </div>
              </div>

              {/* Technical Benchmarks */}
              <div className="space-y-2">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-500" />
                  <span>Technical Competency Calibration</span>
                </p>
                <div className="p-3 rounded-md border border-border bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Calibrated Knowledge Tier:</span>
                    <Badge variant="secondary" className="font-semibold uppercase text-[10px]">
                      {selectedStudent.knowledgeLevel || "Calibrating"}
                    </Badge>
                  </div>
                  {selectedStudent.benchmarkScorePercent !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Evaluation Score:</span>
                      <span className="font-mono font-bold text-foreground">
                        {selectedStudent.benchmarkScorePercent}%
                      </span>
                    </div>
                  )}
                  {selectedStudent.interestDomain && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Domain Specialization:</span>
                      <span className="font-medium text-foreground">{selectedStudent.interestDomain}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Verified Technical Skills */}
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Demonstrated Skills & Proficiencies</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudent.technicalSkills.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs font-normal">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Professional Links */}
              <div className="space-y-2 pt-2 border-t border-border">
                <p className="font-semibold text-foreground">Verified External Portfolios</p>
                <div className="flex flex-col gap-2">
                  {selectedStudent.profiles.gitHub && (
                    <a
                      href={selectedStudent.profiles.gitHub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-md border border-border hover:bg-muted/40 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <GitHubIcon className="w-4 h-4" />
                        <span className="truncate">{selectedStudent.profiles.gitHub}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </a>
                  )}
                  {selectedStudent.profiles.linkedIn && (
                    <a
                      href={selectedStudent.profiles.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-md border border-border hover:bg-muted/40 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <LinkedInIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="truncate">{selectedStudent.profiles.linkedIn}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </a>
                  )}
                  {selectedStudent.profiles.portfolio && (
                    <a
                      href={selectedStudent.profiles.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-md border border-border hover:bg-muted/40 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span className="truncate">{selectedStudent.profiles.portfolio}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </a>
                  )}
                  {!selectedStudent.profiles.gitHub &&
                    !selectedStudent.profiles.linkedIn &&
                    !selectedStudent.profiles.portfolio && (
                      <p className="text-muted-foreground italic text-[11px]">
                        Candidate has not provided external public portfolio links.
                      </p>
                    )}
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-border bg-muted/20 flex items-center justify-end">
              <Button size="sm" variant="outline" onClick={() => setSelectedStudent(null)} className="text-xs">
                Close Candidate Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
