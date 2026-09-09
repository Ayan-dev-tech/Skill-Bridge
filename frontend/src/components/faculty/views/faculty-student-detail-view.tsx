"use client";

import * as React from "react";
import {
  GraduationCap,
  Award,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Briefcase,
  Compass,
  FileText,
  User,
  ArrowLeft,
  Clock,
  Layers,
  ExternalLink,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import type { FacultyStudentDetail } from "@/lib/faculty/types";

interface FacultyStudentDetailViewProps {
  studentId: string;
  onBack: () => void;
}

export function FacultyStudentDetailView({ studentId, onBack }: FacultyStudentDetailViewProps) {
  const [detail, setDetail] = React.useState<FacultyStudentDetail | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetch(`/api/faculty/students/${studentId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load student details");
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          if (json.success && json.data) {
            setDetail(json.data);
          } else {
            setError(json.error || "Failed to load student details");
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Error connecting to student detail service");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [studentId]);

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-44 rounded-lg" />
        <Skeleton className="h-96 rounded-lg" />
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="p-6 max-w-3xl mx-auto space-y-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-xs">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Student Roster
        </Button>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Access Error</AlertTitle>
          <AlertDescription>
            {error || "Student record not found or outside authorized faculty departmental scope."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-6xl mx-auto">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-xs">
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Authorized Scholars
        </Button>
        <Badge variant="outline" className="font-mono text-xs">
          Roll No: {detail.rollNumber}
        </Badge>
      </div>

      {/* Student Profile Header Card */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-5">
          {/* Avatar / Photo */}
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-muted border border-border overflow-hidden text-2xl font-bold text-foreground">
            {detail.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={detail.avatarUrl} alt={detail.fullName} className="h-full w-full object-cover" />
            ) : (
              <span>{detail.fullName.slice(0, 2).toUpperCase()}</span>
            )}
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-foreground">
                {detail.fullName}
              </h1>
              <Badge variant={detail.verificationStatus === "VERIFIED" ? "default" : "secondary"} className="text-xs">
                {detail.verificationStatus}
              </Badge>
              {detail.needsAttention && (
                <Badge variant="destructive" className="text-xs">
                  Needs Attention
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {detail.course} &bull; Semester {detail.semester} &bull; Batch {detail.batchYear}
            </p>
            <p className="text-xs text-muted-foreground/80 font-mono">
              {detail.email} &bull; {detail.institution}
            </p>
          </div>

          {/* Quick Metrics in Header */}
          <div className="flex items-center gap-3 self-stretch md:self-auto justify-around md:justify-end border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 text-center">
            <div>
              <div className="text-lg font-bold font-mono text-foreground">
                {detail.scorePercent !== null && detail.scorePercent !== undefined ? `${detail.scorePercent}%` : "N/A"}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase font-semibold">Test Score</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-lg font-bold font-mono text-amber-500">{detail.skillGapsCount}</div>
              <div className="text-[10px] text-muted-foreground uppercase font-semibold">Skill Gaps</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-lg font-bold font-mono text-primary">{detail.applicationCount}</div>
              <div className="text-[10px] text-muted-foreground uppercase font-semibold">Applications</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs Layout */}
      <Tabs defaultValue="overview" className="w-full space-y-4">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 h-auto p-1 bg-muted/60 text-xs">
          <TabsTrigger value="overview" className="text-xs py-1.5">Overview</TabsTrigger>
          <TabsTrigger value="academic" className="text-xs py-1.5">Academic</TabsTrigger>
          <TabsTrigger value="skills" className="text-xs py-1.5">Skills</TabsTrigger>
          <TabsTrigger value="interest" className="text-xs py-1.5">Interest & Test</TabsTrigger>
          <TabsTrigger value="gaps" className="text-xs py-1.5">Skill Gaps</TabsTrigger>
          <TabsTrigger value="learning" className="text-xs py-1.5">Learning</TabsTrigger>
          <TabsTrigger value="applications" className="text-xs py-1.5">Applications</TabsTrigger>
          <TabsTrigger value="journey" className="text-xs py-1.5">Journey</TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-card border-border space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Compass className="h-4 w-4 text-primary" />
                Interest & Career Alignment
              </h3>
              {detail.interestProfile ? (
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Confirmed Domain:</span>
                    <p className="font-medium text-foreground">{detail.interestProfile.mainDomain}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Specific Specialization:</span>
                    <p className="font-medium text-foreground">{detail.interestProfile.specificInterest}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Diagnostic Explanation:</span>
                    <p className="text-muted-foreground italic mt-0.5">{detail.interestProfile.explanation}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Interest profile not yet completed.</p>
              )}
            </Card>

            <Card className="p-4 bg-card border-border space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-500" />
                Technical Benchmark Testing
              </h3>
              {detail.knowledgeTestResult ? (
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Proficiency Tier:</span>
                    <Badge variant="outline">{detail.knowledgeTestResult.difficulty}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Benchmark Score:</span>
                    <span className="font-mono font-bold text-foreground">{detail.knowledgeTestResult.scorePercent}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Verified Strengths:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {detail.knowledgeTestResult.strengths.slice(0, 4).map((s, i) => (
                        <Badge key={i} variant="secondary" className="text-[10px]">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Technical benchmark test pending.</p>
              )}
            </Card>
          </div>

          {/* Attention Banner if applicable */}
          {detail.attentionReason && (
            <Alert className="border-amber-500/30 bg-amber-500/10 text-foreground">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <AlertTitle className="text-xs font-semibold">Faculty Mentorship Recommendation</AlertTitle>
              <AlertDescription className="text-xs text-muted-foreground mt-0.5">
                {detail.attentionReason}
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        {/* Tab 2: Academic */}
        <TabsContent value="academic">
          <Card className="p-5 bg-card border-border space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              Academic Credentials & Institutional Record
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-muted-foreground">Roll Number</span>
                <p className="font-medium font-mono text-foreground">{detail.academicDetails.rollNumber}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Department</span>
                <p className="font-medium text-foreground">{detail.academicDetails.department}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Course</span>
                <p className="font-medium text-foreground">{detail.academicDetails.course}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Current Semester</span>
                <p className="font-medium text-foreground">Semester {detail.academicDetails.semester}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Batch Year</span>
                <p className="font-medium text-foreground">{detail.academicDetails.batchYear}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Cumulative CGPA</span>
                <p className="font-medium font-mono text-foreground">{detail.academicDetails.cgpa}</p>
              </div>
            </div>

            <div className="border-t border-border pt-3 space-y-2">
              <span className="text-xs font-semibold text-muted-foreground">Enrolled Curriculum Subjects:</span>
              <div className="flex flex-wrap gap-1.5">
                {detail.academicDetails.subjects.map((subj, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {subj}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 3: Skills */}
        <TabsContent value="skills">
          <Card className="p-5 bg-card border-border space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              Verified Competencies & Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {detail.technicalSkills.map((sk, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs px-2.5 py-1">
                  {sk}
                </Badge>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Tab 4: Interest & Knowledge */}
        <TabsContent value="interest" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-card border-border space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Interest Finder Diagnostic</h3>
              {detail.interestProfile ? (
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Main Career Track:</span>
                    <p className="font-semibold text-foreground">{detail.interestProfile.mainDomain}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Sub-Specialization:</span>
                    <p className="font-medium text-foreground">{detail.interestProfile.specificInterest}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Confidence Metric:</span>
                    <p className="font-mono text-foreground">{Math.round(detail.interestProfile.confidence * 100)}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Confirmed On:</span>
                    <p className="text-muted-foreground">
                      {new Date(detail.interestProfile.confirmedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Not completed yet.</p>
              )}
            </Card>

            <Card className="p-4 bg-card border-border space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Knowledge Benchmark Result</h3>
              {detail.knowledgeTestResult ? (
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Assessment Level:</span>
                    <p className="font-semibold text-foreground">{detail.knowledgeTestResult.difficulty}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Score:</span>
                    <p className="font-mono font-bold text-foreground text-sm">
                      {detail.knowledgeTestResult.scorePercent}%
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Identified Knowledge Gaps:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {detail.knowledgeTestResult.gaps.map((g, i) => (
                        <Badge key={i} variant="destructive" className="text-[10px]">
                          {g}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Benchmark testing pending.</p>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Tab 5: Skill Gaps */}
        <TabsContent value="gaps">
          <Card className="p-5 bg-card border-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Identified Skill Gaps ({detail.skillGapAnalysis?.gaps.length || 0})
              </h3>
              <span className="text-[11px] text-muted-foreground">Read-Only Diagnostic View</span>
            </div>

            {detail.skillGapAnalysis && detail.skillGapAnalysis.gaps.length > 0 ? (
              <div className="space-y-3">
                {detail.skillGapAnalysis.gaps.map((gap, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-border bg-muted/20 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground text-sm">{gap.skill}</span>
                      <Badge
                        variant={gap.priority === "High" ? "destructive" : gap.priority === "Medium" ? "outline" : "secondary"}
                        className="text-[10px]"
                      >
                        {gap.priority} Priority
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span>Current: <strong className="text-foreground">{gap.currentLevel}</strong></span>
                      <span>Target: <strong className="text-foreground">{gap.targetLevel}</strong></span>
                    </div>
                  </div>
                ))}

                {detail.skillGapAnalysis.recommendations.length > 0 && (
                  <div className="border-t border-border pt-3 space-y-2">
                    <h4 className="text-xs font-semibold text-foreground">Recommended Curriculum Modules:</h4>
                    {detail.skillGapAnalysis.recommendations.map((rec, i) => (
                      <div key={i} className="text-xs p-2 rounded bg-muted/40 border border-border/50">
                        <p className="font-medium text-foreground">{rec.title}</p>
                        <p className="text-muted-foreground text-[11px] mt-0.5">{rec.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-4 text-center">
                No active skill gaps identified for this student scholar.
              </p>
            )}
          </Card>
        </TabsContent>

        {/* Tab 6: Learning */}
        <TabsContent value="learning">
          <Card className="p-5 bg-card border-border space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Assigned Learning Tracks & Resource Progress
            </h3>

            {detail.learningResources && detail.learningResources.length > 0 ? (
              <div className="space-y-3">
                {detail.learningResources.map((res) => (
                  <div key={res.id} className="p-3 rounded-lg border border-border bg-muted/20 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{res.title}</span>
                      <Badge variant={res.completed ? "default" : "secondary"} className="text-[10px]">
                        {res.completed ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                      <span>Category: {res.category}</span>
                      <span>{res.progressPercent}% Completed</span>
                    </div>
                    <Progress value={res.progressPercent} className="h-1.5 bg-muted" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-4 text-center">
                No active learning resources tracked yet for this student.
              </p>
            )}
          </Card>
        </TabsContent>

        {/* Tab 7: Applications */}
        <TabsContent value="applications">
          <Card className="p-5 bg-card border-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                Career Applications & Placement Visibility
              </h3>
              <span className="text-[11px] text-muted-foreground">Monitoring Mode (Industry Managed)</span>
            </div>

            {detail.applications && detail.applications.length > 0 ? (
              <div className="space-y-3">
                {detail.applications.map((app) => (
                  <div key={app.id} className="p-3 rounded-lg border border-border bg-muted/20 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground text-sm">{app.roleTitle}</span>
                      <Badge variant={app.status === "selected" ? "default" : "outline"} className="text-[10px]">
                        {app.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground font-medium">{app.companyName}</p>
                    <p className="text-[10px] text-muted-foreground">
                      Applied: {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-4 text-center">
                No job or internship applications submitted yet.
              </p>
            )}
          </Card>
        </TabsContent>

        {/* Tab 8: Journey */}
        <TabsContent value="journey">
          <Card className="p-5 bg-card border-border space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Skill-Bridge Development Journey Progression
            </h3>
            <div className="space-y-3">
              {detail.developmentStages.map((st, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <div className="mt-0.5">
                    {st.status === "completed" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : st.status === "in_progress" ? (
                      <Clock className="h-4 w-4 text-amber-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-border bg-muted/40" />
                    )}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{st.label}</span>
                      <Badge
                        variant={st.status === "completed" ? "default" : st.status === "in_progress" ? "secondary" : "outline"}
                        className="text-[9px] px-1 py-0 h-auto"
                      >
                        {st.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-[11px]">{st.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
