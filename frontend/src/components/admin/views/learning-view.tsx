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
  Compass,
  ClipboardCheck,
  Award,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  Users,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  initialCourses,
  initialAssessments,
  initialCertifications,
  CourseData,
  AssessmentData,
  CertificationRecord,
} from "@/lib/admin-data";

interface LearningViewProps {
  initialTab?: "courses" | "assessments" | "certifications";
}

export function LearningView({ initialTab = "courses" }: LearningViewProps) {
  const [activeTab, setActiveTab] = React.useState<"courses" | "assessments" | "certifications">(
    initialTab
  );
  const [courses, setCourses] = React.useState<CourseData[]>(initialCourses);
  const [assessments, setAssessments] = React.useState<AssessmentData[]>(initialAssessments);
  const [certifications, setCertifications] =
    React.useState<CertificationRecord[]>(initialCertifications);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Feedback Notification
  const [feedback, setFeedback] = React.useState<string | null>(null);

  // Selected Detail
  const [selectedCourse, setSelectedCourse] = React.useState<CourseData | null>(null);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Toggle Certification Verification
  const handleToggleVerification = (cert: CertificationRecord) => {
    const updated = certifications.map((c) =>
      c.id === cert.id ? { ...c, verified: !c.verified } : c
    );
    setCertifications(updated);
    setFeedback(
      cert.verified
        ? `Revoked verification for ${cert.studentName}'s ${cert.certificationName}.`
        : `Verified credential: ${cert.certificationName} for ${cert.studentName}.`
    );
    setTimeout(() => setFeedback(null), 4000);
  };

  // Filtered
  const filteredCourses = React.useMemo(() => {
    return courses.filter((c) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.courseName.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.skillsTaught.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [courses, searchQuery]);

  const filteredAssessments = React.useMemo(() => {
    return assessments.filter((a) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.type.toLowerCase().includes(q) ||
          a.mappedSkills.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [assessments, searchQuery]);

  const filteredCertifications = React.useMemo(() => {
    return certifications.filter((c) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.studentName.toLowerCase().includes(q) ||
          c.certificationName.toLowerCase().includes(q) ||
          c.issuer.toLowerCase().includes(q) ||
          c.department.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [certifications, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Active Skill Courses</p>
            <p className="text-2xl font-bold font-mono">{courses.length}</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Total Course Enrollments</p>
            <p className="text-2xl font-bold font-mono">
              {courses.reduce((acc, c) => acc + c.enrolledStudents, 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Assessment Tests Taken</p>
            <p className="text-2xl font-bold font-mono">
              {assessments.reduce((acc, a) => acc + a.totalAttempts, 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Verified Credentials</p>
            <p className="text-2xl font-bold font-mono">
              {certifications.filter((c) => c.verified).length} / {certifications.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {feedback && (
        <div className="p-3 rounded-lg border border-border bg-muted/40 text-xs text-foreground flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            {feedback}
          </span>
          <button
            onClick={() => setFeedback(null)}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Primary Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(val) =>
          setActiveTab(val as "courses" | "assessments" | "certifications")
        }
        className="w-full space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <TabsList className="grid w-full sm:w-96 grid-cols-3">
            <TabsTrigger value="courses" className="flex items-center gap-1.5 text-xs">
              <Compass className="w-3.5 h-3.5" /> Courses ({courses.length})
            </TabsTrigger>
            <TabsTrigger value="assessments" className="flex items-center gap-1.5 text-xs">
              <ClipboardCheck className="w-3.5 h-3.5" /> Assessments ({assessments.length})
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center gap-1.5 text-xs">
              <Award className="w-3.5 h-3.5" /> Certifications ({certifications.length})
            </TabsTrigger>
          </TabsList>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search learning resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs pl-8"
            />
          </div>
        </div>

        {/* ================= 1. COURSES TAB ================= */}
        <TabsContent value="courses" className="mt-0">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Curriculum & Bridge Modules</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Faculty-led bootcamps, technical electives, and hands-on skill bridging courses.
                  </CardDescription>
                </div>
                <Button
                  size="xs"
                  onClick={() => alert("Create new course dialog opens here.")}
                  className="text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Create Course
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                      <th className="p-3 pl-6">Course Name</th>
                      <th className="p-3">Instructor</th>
                      <th className="p-3">Duration & Level</th>
                      <th className="p-3">Skills Targeted</th>
                      <th className="p-3">Enrolled</th>
                      <th className="p-3 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredCourses.map((c) => (
                      <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-6">
                          <p className="font-semibold text-foreground">{c.courseName}</p>
                          <p className="text-[11px] text-muted-foreground max-w-sm truncate">
                            {c.description}
                          </p>
                        </td>

                        <td className="p-3 font-medium text-foreground">{c.instructor}</td>

                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[11px]">{c.duration}</span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] border border-border bg-muted/30">
                              {c.difficulty}
                            </span>
                          </div>
                        </td>

                        <td className="p-3 max-w-[220px]">
                          <div className="flex flex-wrap gap-1">
                            {c.skillsTaught.map((s, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.2 text-[10px] rounded border border-border bg-muted/40 font-medium"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="p-3 font-mono font-bold">
                          {c.enrolledStudents} students
                        </td>

                        <td className="p-3 pr-6 text-right">
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => setSelectedCourse(c)}
                            className="text-[11px]"
                          >
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= 2. ASSESSMENTS TAB ================= */}
        <TabsContent value="assessments" className="mt-0">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Diagnostic & Skill Assessments</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Automated MCQ batteries, coding sandbox benchmarks, and industry readiness exams.
                  </CardDescription>
                </div>
                <Button
                  size="xs"
                  onClick={() => alert("Assessment configuration dialog opens here.")}
                  className="text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> New Assessment
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                      <th className="p-3 pl-6">Assessment Title</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3">Mapped Competencies</th>
                      <th className="p-3">Submissions</th>
                      <th className="p-3">Average Score</th>
                      <th className="p-3 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredAssessments.map((a) => (
                      <tr key={a.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-6">
                          <p className="font-semibold text-foreground">{a.title}</p>
                          <p className="text-[11px] text-muted-foreground uppercase font-mono">
                            Status: {a.status}
                          </p>
                        </td>

                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold border border-border bg-muted/40 uppercase">
                            {a.type}
                          </span>
                        </td>

                        <td className="p-3 font-mono text-[11px]">{a.durationMinutes} mins</td>

                        <td className="p-3 max-w-[200px]">
                          <div className="flex flex-wrap gap-1">
                            {a.mappedSkills.map((s, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.2 text-[10px] rounded border border-border bg-muted/40 font-medium"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="p-3 font-mono font-bold">{a.totalAttempts}</td>

                        <td className="p-3 font-mono font-semibold text-foreground">
                          {a.averageScore}%
                        </td>

                        <td className="p-3 pr-6 text-right space-x-1.5">
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => alert(`Reviewing analytics for ${a.title}`)}
                            className="text-[11px]"
                          >
                            Analytics
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= 3. CERTIFICATIONS TAB ================= */}
        <TabsContent value="certifications" className="mt-0">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Credential & Badge Verification</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Audit student-submitted vendor certifications (AWS, Google, Linux Foundation) and verify authenticity.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                      <th className="p-3 pl-6">Student & Dept</th>
                      <th className="p-3">Certification Title</th>
                      <th className="p-3">Issuer</th>
                      <th className="p-3">Issue Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 pr-6 text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredCertifications.map((cert) => (
                      <tr key={cert.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-6">
                          <p className="font-semibold text-foreground">{cert.studentName}</p>
                          <p className="text-[11px] text-muted-foreground">{cert.department}</p>
                        </td>

                        <td className="p-3 font-medium text-foreground">
                          {cert.certificationName}
                        </td>

                        <td className="p-3 text-[11px] text-muted-foreground font-mono">
                          {cert.issuer}
                        </td>

                        <td className="p-3 font-mono text-[11px] text-muted-foreground">
                          {cert.dateEarned}
                        </td>

                        <td className="p-3">
                          {cert.verified ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-foreground">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                              <Clock className="w-3.5 h-3.5" />
                              Pending Audit
                            </span>
                          )}
                        </td>

                        <td className="p-3 pr-6 text-right">
                          <Button
                            variant={cert.verified ? "outline" : "default"}
                            size="xs"
                            onClick={() => handleToggleVerification(cert)}
                            className="text-[11px]"
                          >
                            {cert.verified ? "Revoke Verification" : "Approve Credential"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Course Detail Sheet */}
      <Sheet open={!!selectedCourse} onOpenChange={(open: boolean) => !open && setSelectedCourse(null)}>
        <SheetContent className="sm:max-w-lg w-full p-6 overflow-y-auto space-y-6">
          {selectedCourse && (
            <>
              <SheetHeader className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-border bg-muted/40 w-fit">
                  {selectedCourse.difficulty} Level
                </span>
                <SheetTitle className="text-xl font-bold">{selectedCourse.courseName}</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  Led by {selectedCourse.instructor} • {selectedCourse.duration}
                </SheetDescription>
              </SheetHeader>

              <div className="p-4 rounded-lg border border-border bg-muted/20 text-xs space-y-2">
                <p className="font-semibold text-foreground uppercase tracking-wider">
                  Course Synopsis
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedCourse.description}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Curriculum Competencies
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCourse.skillsTaught.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded text-xs font-medium border border-border bg-card"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-lg border border-border bg-card text-xs">
                <div>
                  <p className="text-muted-foreground text-[11px]">Enrolled Students</p>
                  <p className="text-lg font-bold font-mono">{selectedCourse.enrolledStudents}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[11px]">Completion Certificate</p>
                  <p className="text-lg font-bold font-mono">
                    {selectedCourse.certification ? "Included" : "None"}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Button
                  size="sm"
                  onClick={() => alert(`Exporting student roster for ${selectedCourse.courseName}`)}
                  className="text-xs"
                >
                  Download Enrolled Roster
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCourse(null)}
                  className="text-xs"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
