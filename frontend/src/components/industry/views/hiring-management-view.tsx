"use client";

import * as React from "react";
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Calendar,
  MapPin,
  Building,
  GraduationCap,
  Award,
  FileQuestion,
  Loader2,
  X,
  FileCheck,
  ShieldCheck,
  RotateCcw,
  Check,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type {
  IndustryHiringPostRecord,
  HiringEmploymentType,
  HiringWorkMode,
  KnowledgeTestConfig,
  KnowledgeTestQuestionItem,
  IndustryQuestionRecord,
  AITestReviewResult,
} from "@/lib/industry/types";

interface HiringManagementViewProps {
  onNavigateToQuestionBank?: () => void;
}

export function HiringManagementView({ onNavigateToQuestionBank }: HiringManagementViewProps) {
  const [posts, setPosts] = React.useState<IndustryHiringPostRecord[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<"all" | "published" | "draft">("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Mode: "list" | "edit" | "test-config"
  const [mode, setMode] = React.useState<"list" | "edit" | "test-config">("list");
  const [activePost, setActivePost] = React.useState<IndustryHiringPostRecord | null>(null);

  // Preview Modal
  const [previewPost, setPreviewPost] = React.useState<IndustryHiringPostRecord | null>(null);

  // Form State for Editing/Creating
  const [formStep, setFormStep] = React.useState<1 | 2 | 3 | 4 | 5>(1);
  const [roleTitle, setRoleTitle] = React.useState("");
  const [hiringType, setHiringType] = React.useState<HiringEmploymentType>("Full-time");
  const [industryDomain, setIndustryDomain] = React.useState("Technology & Software");
  const [location, setLocation] = React.useState("");
  const [workMode, setWorkMode] = React.useState<HiringWorkMode>("Hybrid");
  const [salaryRange, setSalaryRange] = React.useState("");
  const [experienceRequirement, setExperienceRequirement] = React.useState("Fresher / 0-1 Years");
  const [openings, setOpenings] = React.useState<number>(1);
  const [deadline, setDeadline] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [responsibilities, setResponsibilities] = React.useState<string[]>([]);
  const [respInput, setRespInput] = React.useState("");
  const [requiredSkills, setRequiredSkills] = React.useState<string[]>([]);
  const [reqSkillInput, setReqSkillInput] = React.useState("");
  const [preferredSkills, setPreferredSkills] = React.useState<string[]>([]);
  const [prefSkillInput, setPrefSkillInput] = React.useState("");
  const [requiredQualifications, setRequiredQualifications] = React.useState<string[]>([
    "Bachelor's degree in Computer Science, IT, or related STEM discipline.",
  ]);
  const [preferredQualifications, setPreferredQualifications] = React.useState<string[]>([]);
  const [interviewMode, setInterviewMode] = React.useState<"Virtual" | "In-person" | "Hybrid">("Virtual");
  const [interviewType, setInterviewType] = React.useState<
    "Technical & Behavioral" | "Technical Only" | "Panel Interview" | "Discussion"
  >("Technical & Behavioral");
  const [estimatedRounds, setEstimatedRounds] = React.useState(2);
  const [interviewInstructions, setInterviewInstructions] = React.useState(
    "Virtual interview links will be shared with shortlisted candidates prior to each round."
  );

  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = React.useState<string | null>(null);

  // Knowledge Test Studio State
  const [bankQuestions, setBankQuestions] = React.useState<IndustryQuestionRecord[]>([]);
  const [testSearch, setTestSearch] = React.useState("");
  const [testDifficultyFilter, setTestDifficultyFilter] = React.useState("all");
  const [isAiSelecting, setIsAiSelecting] = React.useState(false);
  const [aiRationale, setAiRationale] = React.useState<string | null>(null);
  const [isAiReviewing, setIsAiReviewing] = React.useState(false);
  const [aiReviewFeedback, setAiReviewFeedback] = React.useState<AITestReviewResult | null>(null);
  const [isApproving, setIsApproving] = React.useState(false);
  const [isPublishingTest, setIsPublishingTest] = React.useState(false);

  // Fetch hiring posts
  const fetchPosts = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/industry/hiring");
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load hiring posts.");
      }
      setPosts(data.posts || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load hiring posts.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch question bank questions for test studio
  const fetchBankQuestions = React.useCallback(async () => {
    try {
      const res = await fetch("/api/industry/question-bank");
      const data = await res.json();
      if (res.ok && data.success) {
        setBankQuestions(data.questions || []);
      }
    } catch {
      // Non-blocking
    }
  }, []);

  React.useEffect(() => {
    fetchPosts();
    fetchBankQuestions();
  }, [fetchPosts, fetchBankQuestions]);

  // Open Form to create new post
  const handleOpenCreate = () => {
    setActivePost(null);
    setRoleTitle("");
    setHiringType("Full-time");
    setIndustryDomain("Technology & Software");
    setLocation("Bengaluru, India (Hybrid)");
    setWorkMode("Hybrid");
    setSalaryRange("₹8,00,000 - ₹12,00,000 / year");
    setExperienceRequirement("Fresher / 0-1 Years");
    setOpenings(2);
    setDeadline(new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0]);
    setDescription(
      "We are seeking motivated engineers to contribute to scalable cloud microservices, maintain data pipelines, and collaborate with cross-functional software teams."
    );
    setResponsibilities([
      "Design, implement, and maintain scalable back-end microservices.",
      "Collaborate with product and testing teams to deliver robust features.",
      "Participate in agile sprint ceremonies and code reviews.",
    ]);
    setRequiredSkills(["TypeScript", "React", "Node.js"]);
    setPreferredSkills(["PostgreSQL", "Docker", "REST APIs"]);
    setRequiredQualifications(["Bachelor's degree in Computer Science, IT, or related STEM discipline."]);
    setPreferredQualifications(["Prior internship experience or open source contributions."]);
    setInterviewMode("Virtual");
    setInterviewType("Technical & Behavioral");
    setEstimatedRounds(2);
    setInterviewInstructions("Shortlisted candidates will receive round meeting links via email.");
    setFormStep(1);
    setMode("edit");
  };

  // Open Form to edit existing post
  const handleOpenEdit = (post: IndustryHiringPostRecord) => {
    setActivePost(post);
    setRoleTitle(post.roleTitle);
    setHiringType(post.hiringType);
    setIndustryDomain(post.industryDomain);
    setLocation(post.location);
    setWorkMode(post.workMode);
    setSalaryRange(post.salaryRange || "");
    setExperienceRequirement(post.experienceRequirement);
    setOpenings(post.openings);
    setDeadline(post.deadline.split("T")[0]);
    setDescription(post.description);
    setResponsibilities(post.responsibilities || []);
    setRequiredSkills(post.requiredSkills || []);
    setPreferredSkills(post.preferredSkills || []);
    setRequiredQualifications(post.requiredQualifications || []);
    setPreferredQualifications(post.preferredQualifications || []);
    setInterviewMode(post.interviewDetails.mode);
    setInterviewType(post.interviewDetails.type);
    setEstimatedRounds(post.interviewDetails.estimatedRounds);
    setInterviewInstructions(post.interviewDetails.instructions);
    setFormStep(1);
    setMode("edit");
  };

  // Open Knowledge Test Studio
  const handleOpenTestStudio = (post: IndustryHiringPostRecord) => {
    setActivePost(post);
    setAiRationale(null);
    setAiReviewFeedback(post.knowledgeTest?.aiReviewFeedback || null);
    setMode("test-config");
  };

  // Save as Draft or Publish
  const handleSavePost = async (publishNow = false) => {
    try {
      setIsSaving(true);
      setError(null);
      setSaveSuccessMessage(null);

      if (openings < 1 || isNaN(openings)) {
        throw new Error("Number of openings must be at least 1.");
      }

      if (publishNow) {
        if (!roleTitle.trim()) throw new Error("Role Title is required.");
        if (!description.trim()) throw new Error("Job Description is required.");
        if (!location.trim()) throw new Error("Location is required.");
        if (requiredSkills.length === 0) throw new Error("Please add at least one required skill.");
      }

      const payload = {
        roleTitle: roleTitle.trim(),
        hiringType,
        industryDomain,
        location: location.trim(),
        workMode,
        salaryRange: salaryRange.trim(),
        experienceRequirement,
        openings: Math.floor(openings),
        deadline,
        description: description.trim(),
        responsibilities,
        requiredSkills,
        preferredSkills,
        requiredQualifications,
        preferredQualifications,
        interviewDetails: {
          mode: interviewMode,
          type: interviewType,
          estimatedRounds,
          instructions: interviewInstructions,
        },
        status: publishNow ? ("published" as const) : ("draft" as const),
      };

      let res: Response;
      if (activePost) {
        // Update
        res = await fetch(`/api/industry/hiring/${activePost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create
        res = await fetch("/api/industry/hiring", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save hiring opportunity.");
      }

      // If publishNow requested on an existing draft, also trigger publish endpoint to ensure validations
      if (publishNow && activePost) {
        const pubRes = await fetch(`/api/industry/hiring/${activePost.id}/publish`, {
          method: "POST",
        });
        const pubData = await pubRes.json();
        if (!pubRes.ok || !pubData.success) {
          throw new Error(pubData.error || "Failed to publish hiring opportunity.");
        }
      }

      setSaveSuccessMessage(
        publishNow
          ? "Hiring opportunity successfully published and live for eligible candidates."
          : "Hiring opportunity progress successfully saved as draft."
      );

      await fetchPosts();
      setTimeout(() => {
        setMode("list");
        setSaveSuccessMessage(null);
      }, 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving hiring opportunity.");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Draft Post
  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this draft opportunity?")) return;
    try {
      const res = await fetch(`/api/industry/hiring/${postId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || "Failed to delete post.");
        return;
      }
      await fetchPosts();
    } catch {
      alert("Failed to delete post.");
    }
  };

  // --------------------------------------------------------------------------
  // KNOWLEDGE TEST STUDIO ACTIONS
  // --------------------------------------------------------------------------

  // Toggle Test Enabled
  const handleToggleTestEnabled = async (enabled: boolean) => {
    if (!activePost) return;
    try {
      const currentConfig = activePost.knowledgeTest || {
        enabled: false,
        selectedQuestionIds: [],
        testPaper: [],
        approvalStatus: "draft" as const,
      };
      const res = await fetch(`/api/industry/hiring/${activePost.id}/test-config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentConfig,
          enabled,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActivePost(data.post);
        await fetchPosts();
      }
    } catch {
      // Non-blocking
    }
  };

  // Toggle a question selection
  const handleToggleQuestionSelection = async (questionId: string) => {
    if (!activePost) return;
    const testConfig = activePost.knowledgeTest || {
      enabled: true,
      selectedQuestionIds: [],
      testPaper: [],
      approvalStatus: "draft" as const,
    };
    const currentIds = testConfig.selectedQuestionIds || [];
    let updatedIds: string[];
    if (currentIds.includes(questionId)) {
      updatedIds = currentIds.filter((id) => id !== questionId);
    } else {
      updatedIds = [...currentIds, questionId];
    }

    try {
      const res = await fetch(`/api/industry/hiring/${activePost.id}/test-config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedQuestionIds: updatedIds,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActivePost(data.post);
        await fetchPosts();
      }
    } catch {
      // Non-blocking
    }
  };

  // AI Question Selection
  const handleRunAiSelection = async () => {
    if (!activePost) return;
    try {
      setIsAiSelecting(true);
      setAiRationale(null);
      const res = await fetch(`/api/industry/hiring/${activePost.id}/test-config/ai-select`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetCount: 5,
          difficulty: "balanced",
          requiredSkills: activePost.requiredSkills,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "AI Question Selection failed.");
      }
      setAiRationale(data.result.selectionRationale);
      // Reload active post
      const postRes = await fetch(`/api/industry/hiring/${activePost.id}`);
      const postData = await postRes.json();
      if (postRes.ok && postData.success) {
        setActivePost(postData.post);
        await fetchPosts();
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "AI Question Selection failed.");
    } finally {
      setIsAiSelecting(false);
    }
  };

  // Run AI Review Loop
  const handleRunAiReview = async () => {
    if (!activePost) return;
    try {
      setIsAiReviewing(true);
      const res = await fetch(`/api/industry/hiring/${activePost.id}/test-config/ai-review`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "AI Test Review failed.");
      }
      setAiReviewFeedback(data.review);
      // Reload active post
      const postRes = await fetch(`/api/industry/hiring/${activePost.id}`);
      const postData = await postRes.json();
      if (postRes.ok && postData.success) {
        setActivePost(postData.post);
        await fetchPosts();
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "AI Test Review failed.");
    } finally {
      setIsAiReviewing(false);
    }
  };

  // Industry Decision Gate: Approve or Reject
  const handleDecisionGate = async (approved: boolean) => {
    if (!activePost) return;
    try {
      setIsApproving(true);
      const res = await fetch(`/api/industry/hiring/${activePost.id}/test-config/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Decision gate update failed.");
      }
      setActivePost(data.post);
      await fetchPosts();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Decision gate update failed.");
    } finally {
      setIsApproving(false);
    }
  };

  // Publish Test
  const handlePublishTest = async () => {
    if (!activePost) return;
    try {
      setIsPublishingTest(true);
      const res = await fetch(`/api/industry/hiring/${activePost.id}/test-config/publish`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Publishing test failed.");
      }
      setActivePost(data.post);
      await fetchPosts();
      alert("Knowledge test successfully published for this hiring campaign!");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Publishing test failed.");
    } finally {
      setIsPublishingTest(false);
    }
  };

  // Filtered posts for list mode
  const filteredPosts = posts.filter((p) => {
    if (activeTab === "published" && p.status !== "published") return false;
    if (activeTab === "draft" && p.status !== "draft") return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.roleTitle.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      const matchType = p.hiringType.toLowerCase().includes(q);
      const matchSkill = p.requiredSkills.some((s) => s.toLowerCase().includes(q));
      return matchTitle || matchLoc || matchType || matchSkill;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* -------------------------------------------------------------------- */}
      {/* HEADER BAR */}
      {/* -------------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              {mode === "list" && "Hiring & Post Configuration"}
              {mode === "edit" && (activePost ? `Edit: ${activePost.roleTitle}` : "Create New Hiring Opportunity")}
              {mode === "test-config" && `Knowledge Test Studio: ${activePost?.roleTitle}`}
            </h1>
            <Badge variant="outline" className="text-[10px] font-normal">
              Section 2
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {mode === "list" && "Manage job & internship postings, qualifications, interview rounds, and benchmark testing."}
            {mode === "edit" && "Configure role specifications, required qualifications, openings, and interview logistics."}
            {mode === "test-config" && "Author or AI-assist technical assessment papers, run quality review, and approve question sets."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {mode !== "list" ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMode("list");
                fetchPosts();
              }}
              className="text-xs h-8"
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-1" />
              <span>Back to Posts</span>
            </Button>
          ) : (
            <Button size="sm" onClick={handleOpenCreate} className="text-xs h-8">
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>Create Hiring Post</span>
            </Button>
          )}
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* SUCCESS & ERROR NOTICES */}
      {/* -------------------------------------------------------------------- */}
      {saveSuccessMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-md flex items-center gap-2.5 text-xs text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-2.5 text-xs text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* MODE 1: LIST VIEW */}
      {/* -------------------------------------------------------------------- */}
      {mode === "list" && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 border border-border rounded-md p-0.5 bg-muted/30 text-xs w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 rounded-sm transition-colors ${
                  activeTab === "all" ? "bg-background text-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All Posts ({posts.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("published")}
                className={`px-3 py-1 rounded-sm transition-colors ${
                  activeTab === "published" ? "bg-background text-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Published ({posts.filter((p) => p.status === "published").length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("draft")}
                className={`px-3 py-1 rounded-sm transition-colors ${
                  activeTab === "draft" ? "bg-background text-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Drafts ({posts.filter((p) => p.status === "draft").length})
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title, role, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-xs bg-background"
              />
            </div>
          </div>

          {/* Posts Grid */}
          {isLoading ? (
            <div className="p-12 text-center border border-dashed border-border rounded-md bg-muted/10">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">Loading recruitment posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <Card className="border-dashed border-border bg-card">
              <CardContent className="p-12 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {searchQuery ? "No matching opportunities found" : "No hiring posts created yet"}
                  </p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    {searchQuery
                      ? "Try adjusting your search keywords or switching tabs."
                      : "Create your first hiring post to begin recruiting verified campus talent."}
                  </p>
                </div>
                {!searchQuery && (
                  <Button size="sm" onClick={handleOpenCreate} className="text-xs h-8 mt-2">
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    <span>Create First Post</span>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="border-border bg-card hover:border-border/80 transition-colors flex flex-col justify-between">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant={post.status === "published" ? "default" : "secondary"}
                            className="text-[10px] font-medium uppercase tracking-wider"
                          >
                            {post.status === "published" ? "Live • Published" : "Draft Progress"}
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            {post.hiringType}
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            {post.workMode}
                          </Badge>
                        </div>
                        <CardTitle className="text-base font-bold text-foreground line-clamp-1">
                          {post.roleTitle}
                        </CardTitle>
                        <CardDescription className="text-xs flex items-center gap-2 text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{post.location}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{post.openings} Opening{post.openings > 1 ? "s" : ""}</span>
                          </span>
                          {post.salaryRange && (
                            <>
                              <span>•</span>
                              <span>{post.salaryRange}</span>
                            </>
                          )}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 pt-1 pb-3 space-y-3">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {post.description}
                    </p>

                    {/* Required Skills */}
                    <div className="flex flex-wrap gap-1">
                      {post.requiredSkills.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="px-1.5 py-0.5 rounded-sm bg-muted text-[10px] font-mono text-foreground border border-border"
                        >
                          {s}
                        </span>
                      ))}
                      {post.requiredSkills.length > 4 && (
                        <span className="text-[10px] text-muted-foreground self-center">
                          +{post.requiredSkills.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Knowledge Test Status Badge */}
                    <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                        <FileQuestion className="w-3.5 h-3.5" />
                        <span>Knowledge Test:</span>
                      </span>
                      {post.knowledgeTest?.enabled ? (
                        <Badge
                          variant={post.knowledgeTest.approvalStatus === "approved" ? "default" : "outline"}
                          className="text-[10px]"
                        >
                          {post.knowledgeTest.approvalStatus === "approved"
                            ? `Approved (${post.knowledgeTest.selectedQuestionIds.length} Qs)`
                            : `Review Pending (${post.knowledgeTest.selectedQuestionIds.length} Qs)`}
                        </Badge>
                      ) : (
                        <span className="text-[11px] text-muted-foreground italic">Disabled</span>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="p-3 bg-muted/20 border-t border-border flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPreviewPost(post)}
                        className="h-7 text-xs px-2"
                        title="Preview Posting"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        <span>Preview</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenTestStudio(post)}
                        className="h-7 text-xs px-2"
                        title="Configure Assessment"
                      >
                        <FileCheck className="w-3.5 h-3.5 mr-1" />
                        <span>Test Studio</span>
                      </Button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEdit(post)}
                        className="h-7 text-xs px-2"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        <span>Edit</span>
                      </Button>
                      {post.status === "draft" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                          className="h-7 text-xs px-2 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* MODE 2: HIRING EDITOR (MULTI-STEP) */}
      {/* -------------------------------------------------------------------- */}
      {mode === "edit" && (
        <div className="space-y-6 max-w-3xl">
          {/* Step Navigator */}
          <div className="flex items-center justify-between border-b border-border pb-3 text-xs overflow-x-auto">
            {[
              { num: 1, label: "Role & Type" },
              { num: 2, label: "Skills & Requirements" },
              { num: 3, label: "Qualifications" },
              { num: 4, label: "Responsibilities" },
              { num: 5, label: "Interview Details" },
            ].map((st) => (
              <button
                key={st.num}
                type="button"
                onClick={() => setFormStep(st.num as 1 | 2 | 3 | 4 | 5)}
                className={`flex items-center gap-1.5 pb-1 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  formStep === st.num
                    ? "border-foreground text-foreground font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[11px]">
                  {st.num}
                </span>
                <span>{st.label}</span>
              </button>
            ))}
          </div>

          {/* Step 1: Role & Hiring Type */}
          {formStep === 1 && (
            <Card className="border-border bg-card">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-semibold">1. Basic Information & Hiring Type</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Specify opportunity title, employment category, domain, and headcount openings.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Role / Job Title *</label>
                  <Input
                    placeholder="e.g. Associate Security Operations Engineer"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    className="text-xs h-8"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-foreground">Hiring Type *</label>
                    <select
                      value={hiringType}
                      onChange={(e) => setHiringType(e.target.value as HiringEmploymentType)}
                      className="w-full h-8 px-2.5 rounded-md border border-input bg-background text-xs"
                    >
                      <option value="Full-time">Full-time Opportunity</option>
                      <option value="Internship">Internship (Paid)</option>
                      <option value="Part-time">Part-time Role</option>
                      <option value="Contract">Contract / Project-based</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-foreground">Industry Domain</label>
                    <Input
                      placeholder="e.g. Technology & Software"
                      value={industryDomain}
                      onChange={(e) => setIndustryDomain(e.target.value)}
                      className="text-xs h-8"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-foreground">Work Mode</label>
                    <select
                      value={workMode}
                      onChange={(e) => setWorkMode(e.target.value as HiringWorkMode)}
                      className="w-full h-8 px-2.5 rounded-md border border-input bg-background text-xs"
                    >
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-foreground">Openings *</label>
                    <Input
                      type="number"
                      min={1}
                      value={openings}
                      onChange={(e) => setOpenings(Math.max(1, parseInt(e.target.value) || 1))}
                      className="text-xs h-8 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-foreground">Application Deadline</label>
                    <Input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="text-xs h-8"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-foreground">Location *</label>
                    <Input
                      placeholder="e.g. Bengaluru, India (Hybrid)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="text-xs h-8"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-foreground">Salary / Stipend Range</label>
                    <Input
                      placeholder="e.g. ₹8,50,000 - ₹12,00,000 / year or ₹25,000 / month"
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                      className="text-xs h-8"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Overview / Description *</label>
                  <textarea
                    rows={3}
                    placeholder="Provide a concise summary of the role, department focus, and technical environment..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 rounded-md border border-input bg-background text-xs font-sans resize-y"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Requirements & Skills */}
          {formStep === 2 && (
            <Card className="border-border bg-card">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-semibold">2. Job-Specific Requirements & Competencies</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Define non-negotiable required skills, preferred competencies, and experience parameters.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Experience Level Requirement</label>
                  <Input
                    placeholder="e.g. Fresher / 0-1 Years"
                    value={experienceRequirement}
                    onChange={(e) => setExperienceRequirement(e.target.value)}
                    className="text-xs h-8"
                  />
                </div>

                {/* Required Skills Tags */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Required Skills *</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a required skill (e.g. TypeScript, OWASP Top 10, SIEM)"
                      value={reqSkillInput}
                      onChange={(e) => setReqSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && reqSkillInput.trim()) {
                          e.preventDefault();
                          if (!requiredSkills.includes(reqSkillInput.trim())) {
                            setRequiredSkills([...requiredSkills, reqSkillInput.trim()]);
                          }
                          setReqSkillInput("");
                        }
                      }}
                      className="text-xs h-8"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (reqSkillInput.trim() && !requiredSkills.includes(reqSkillInput.trim())) {
                          setRequiredSkills([...requiredSkills, reqSkillInput.trim()]);
                          setReqSkillInput("");
                        }
                      }}
                      className="text-xs h-8 px-3"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {requiredSkills.map((s) => (
                      <Badge key={s} variant="secondary" className="text-[11px] gap-1 pr-1">
                        <span>{s}</span>
                        <button
                          type="button"
                          onClick={() => setRequiredSkills(requiredSkills.filter((x) => x !== s))}
                          className="hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Preferred Skills Tags */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Preferred / Good-to-Have Skills</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add preferred skill (e.g. Docker, GraphQL, CTF Experience)"
                      value={prefSkillInput}
                      onChange={(e) => setPrefSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && prefSkillInput.trim()) {
                          e.preventDefault();
                          if (!preferredSkills.includes(prefSkillInput.trim())) {
                            setPreferredSkills([...preferredSkills, prefSkillInput.trim()]);
                          }
                          setPrefSkillInput("");
                        }
                      }}
                      className="text-xs h-8"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (prefSkillInput.trim() && !preferredSkills.includes(prefSkillInput.trim())) {
                          setPreferredSkills([...preferredSkills, prefSkillInput.trim()]);
                          setPrefSkillInput("");
                        }
                      }}
                      className="text-xs h-8 px-3"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {preferredSkills.map((s) => (
                      <Badge key={s} variant="outline" className="text-[11px] gap-1 pr-1">
                        <span>{s}</span>
                        <button
                          type="button"
                          onClick={() => setPreferredSkills(preferredSkills.filter((x) => x !== s))}
                          className="hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Qualifications */}
          {formStep === 3 && (
            <Card className="border-border bg-card">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-semibold">3. Academic & Credential Qualifications</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Specify degree requirements, branch prerequisites, and preferred certifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-xs">
                <div className="space-y-2">
                  <label className="font-semibold text-foreground">Required Qualifications</label>
                  {requiredQualifications.map((q, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={q}
                        onChange={(e) => {
                          const updated = [...requiredQualifications];
                          updated[idx] = e.target.value;
                          setRequiredQualifications(updated);
                        }}
                        className="text-xs h-8"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setRequiredQualifications(requiredQualifications.filter((_, i) => i !== idx))
                        }
                        className="h-8 px-2 text-destructive"
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setRequiredQualifications([
                        ...requiredQualifications,
                        "Minimum 60% aggregate or 6.5 CGPA in current engineering coursework.",
                      ])
                    }
                    className="text-xs h-7"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    <span>Add Qualification Item</span>
                  </Button>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <label className="font-semibold text-foreground">Preferred Certifications / Criteria</label>
                  {preferredQualifications.map((q, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={q}
                        onChange={(e) => {
                          const updated = [...preferredQualifications];
                          updated[idx] = e.target.value;
                          setPreferredQualifications(updated);
                        }}
                        className="text-xs h-8"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setPreferredQualifications(preferredQualifications.filter((_, i) => i !== idx))
                        }
                        className="h-8 px-2 text-destructive"
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPreferredQualifications([
                        ...preferredQualifications,
                        "Relevant cloud or security certification (AWS, Azure, CompTIA, CEH).",
                      ])
                    }
                    className="text-xs h-7"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    <span>Add Preferred Item</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Responsibilities */}
          {formStep === 4 && (
            <Card className="border-border bg-card">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-semibold">4. Key Responsibilities</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Provide structured, bulleted daily engineering expectations for applicants.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-xs">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter responsibility item (e.g. Author customized detection signatures for CVEs)"
                    value={respInput}
                    onChange={(e) => setRespInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && respInput.trim()) {
                        e.preventDefault();
                        setResponsibilities([...responsibilities, respInput.trim()]);
                        setRespInput("");
                      }
                    }}
                    className="text-xs h-8"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (respInput.trim()) {
                        setResponsibilities([...responsibilities, respInput.trim()]);
                        setRespInput("");
                      }
                    }}
                    className="text-xs h-8 px-3"
                  >
                    Add
                  </Button>
                </div>

                <div className="space-y-2">
                  {responsibilities.map((r, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-md border border-border bg-muted/20 flex items-start justify-between gap-2"
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 shrink-0" />
                        <span className="text-xs text-foreground leading-relaxed">{r}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResponsibilities(responsibilities.filter((_, i) => i !== idx))}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {responsibilities.length === 0 && (
                    <p className="text-muted-foreground italic text-[11px]">
                      No responsibility items added yet. Click &apos;Add&apos; to append bullet points.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Interview Details */}
          {formStep === 5 && (
            <Card className="border-border bg-card">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-semibold">5. Interview Logistics & Details</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Inform candidates about the interview mode, evaluation format, and number of rounds.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-foreground">Interview Mode</label>
                    <select
                      value={interviewMode}
                      onChange={(e) => setInterviewMode(e.target.value as "Virtual" | "In-person" | "Hybrid")}
                      className="w-full h-8 px-2.5 rounded-md border border-input bg-background text-xs"
                    >
                      <option value="Virtual">Virtual / Video Call</option>
                      <option value="In-person">In-person Campus/Office</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-foreground">Interview Format</label>
                    <select
                      value={interviewType}
                      onChange={(e) =>
                        setInterviewType(
                          e.target.value as
                            | "Technical & Behavioral"
                            | "Technical Only"
                            | "Panel Interview"
                            | "Discussion"
                        )
                      }
                      className="w-full h-8 px-2.5 rounded-md border border-input bg-background text-xs"
                    >
                      <option value="Technical & Behavioral">Technical & Behavioral</option>
                      <option value="Technical Only">Technical Architecture Only</option>
                      <option value="Panel Interview">Cross-functional Panel</option>
                      <option value="Discussion">Hiring Manager Discussion</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-foreground">Estimated Rounds</label>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      value={estimatedRounds}
                      onChange={(e) => setEstimatedRounds(Math.max(1, parseInt(e.target.value) || 2))}
                      className="text-xs h-8 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Interview Guidelines & Instructions</label>
                  <textarea
                    rows={3}
                    placeholder="Provide candidate instructions for interview preparation..."
                    value={interviewInstructions}
                    onChange={(e) => setInterviewInstructions(e.target.value)}
                    className="w-full p-2.5 rounded-md border border-input bg-background text-xs font-sans resize-y"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Form Action Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              {formStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormStep((formStep - 1) as 1 | 2 | 3 | 4 | 5)}
                  className="text-xs h-8"
                >
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                  <span>Previous Step</span>
                </Button>
              )}
              {formStep < 5 && (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setFormStep((formStep + 1) as 1 | 2 | 3 | 4 | 5)}
                  className="text-xs h-8"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isSaving}
                onClick={() => handleSavePost(false)}
                className="text-xs h-8"
              >
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Clock className="w-3.5 h-3.5 mr-1" />}
                <span>Save as Draft</span>
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={isSaving}
                onClick={() => handleSavePost(true)}
                className="text-xs h-8"
              >
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                <span>Publish Opportunity</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* MODE 3: KNOWLEDGE TEST STUDIO */}
      {/* -------------------------------------------------------------------- */}
      {mode === "test-config" && activePost && (
        <div className="space-y-6">
          {/* Top Status & Controls */}
          <Card className="border-border bg-card">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <FileQuestion className="w-4 h-4 text-foreground" />
                  <span>Technical Assessment Configuration</span>
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Attached to: <strong className="text-foreground">{activePost.roleTitle}</strong> ({activePost.hiringType})
                </CardDescription>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Enable Assessment:</span>
                <button
                  type="button"
                  onClick={() => handleToggleTestEnabled(!activePost.knowledgeTest?.enabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    activePost.knowledgeTest?.enabled ? "bg-foreground" : "bg-muted border border-border"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-background transition-transform ${
                      activePost.knowledgeTest?.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </CardHeader>

            {activePost.knowledgeTest?.enabled && (
              <CardContent className="p-4 pt-2 border-t border-border mt-2 space-y-4 text-xs">
                {/* Decision Gate Banner */}
                <div className="p-3 rounded-md border border-border bg-muted/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {activePost.knowledgeTest.approvalStatus === "approved" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-500" />
                    )}
                    <div>
                      <p className="font-semibold text-foreground">
                        Approval State: {activePost.knowledgeTest.approvalStatus.toUpperCase()}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {activePost.knowledgeTest.approvalStatus === "approved"
                          ? `Explicitly approved by Industry. Ready to publish.`
                          : `Requires explicit Industry review & approval before live assessment publication.`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {activePost.knowledgeTest.approvalStatus !== "approved" ? (
                      <Button
                        size="sm"
                        disabled={isApproving || activePost.knowledgeTest.selectedQuestionIds.length === 0}
                        onClick={() => handleDecisionGate(true)}
                        className="text-xs h-7"
                      >
                        {isApproving ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <ShieldCheck className="w-3 h-3 mr-1" />}
                        <span>Approve Question Set</span>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isApproving}
                        onClick={() => handleDecisionGate(false)}
                        className="text-xs h-7 text-destructive"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        <span>Revoke / Revise</span>
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="default"
                      disabled={isPublishingTest || activePost.knowledgeTest.approvalStatus !== "approved"}
                      onClick={handlePublishTest}
                      className="text-xs h-7"
                    >
                      {isPublishingTest ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Check className="w-3 h-3 mr-1" />}
                      <span>Publish Test</span>
                    </Button>
                  </div>
                </div>

                {/* AI Review Results if present */}
                {aiReviewFeedback && (
                  <div className="p-3 rounded-md border border-border bg-background space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold flex items-center gap-1.5 text-foreground">
                        <Sparkles className="w-3.5 h-3.5 text-foreground" />
                        <span>AI Review Loop Diagnostic</span>
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        Relevance: {aiReviewFeedback.relevanceScore}%
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      <strong>Consistency:</strong> {aiReviewFeedback.difficultyConsistency}
                    </p>
                    {aiReviewFeedback.duplicateWarnings.length > 0 && (
                      <div className="p-2 bg-destructive/10 border border-destructive/20 rounded text-destructive text-[11px]">
                        {aiReviewFeedback.duplicateWarnings.join(", ")}
                      </div>
                    )}
                    <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-muted-foreground">
                      {aiReviewFeedback.suggestions.map((sug, i) => (
                        <li key={i}>{sug}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {activePost.knowledgeTest?.enabled && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LEFT COLUMN: QUESTION BANK INPUT & AI ASSIST */}
              <div className="space-y-4">
                <Card className="border-border bg-card">
                  <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-sm font-semibold">9.2 Question Bank Input</CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        Select questions from your organization Question Bank.
                      </CardDescription>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isAiSelecting || bankQuestions.length === 0}
                      onClick={handleRunAiSelection}
                      className="text-xs h-7"
                    >
                      {isAiSelecting ? (
                        <Loader2 className="w-3 h-3 animate-spin mr-1" />
                      ) : (
                        <Sparkles className="w-3 h-3 mr-1" />
                      )}
                      <span>AI Select Questions</span>
                    </Button>
                  </CardHeader>

                  <CardContent className="p-4 pt-2 space-y-3">
                    {aiRationale && (
                      <div className="p-2 bg-muted/40 border border-border rounded text-[11px] text-muted-foreground">
                        <strong className="text-foreground">AI Selection Rationale:</strong> {aiRationale}
                      </div>
                    )}

                    {/* Filter & Search */}
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search questions..."
                          value={testSearch}
                          onChange={(e) => setTestSearch(e.target.value)}
                          className="pl-7 h-7 text-xs"
                        />
                      </div>
                      <select
                        value={testDifficultyFilter}
                        onChange={(e) => setTestDifficultyFilter(e.target.value)}
                        className="h-7 px-2 border border-input rounded text-xs bg-background"
                      >
                        <option value="all">All Difficulties</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>

                    {/* Questions Selection List */}
                    <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                      {bankQuestions
                        .filter((q) => {
                          if (testDifficultyFilter !== "all" && q.difficulty !== testDifficultyFilter)
                            return false;
                          if (testSearch.trim()) {
                            return q.questionText.toLowerCase().includes(testSearch.toLowerCase());
                          }
                          return true;
                        })
                        .map((q) => {
                          const isSelected = (activePost.knowledgeTest?.selectedQuestionIds || []).includes(q.id);
                          return (
                            <div
                              key={q.id}
                              onClick={() => handleToggleQuestionSelection(q.id)}
                              className={`p-3 rounded-md border text-xs cursor-pointer transition-colors ${
                                isSelected
                                  ? "border-foreground bg-muted/40"
                                  : "border-border hover:bg-muted/20"
                              }`}
                            >
                              <div className="flex items-start gap-2.5">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {}}
                                  className="mt-0.5 rounded border-border"
                                />
                                <div className="space-y-1 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <Badge variant="outline" className="text-[10px] font-mono">
                                      {q.difficulty}
                                    </Badge>
                                    <span className="text-[10px] text-muted-foreground font-mono">
                                      {q.marks} Mark{q.marks > 1 ? "s" : ""}
                                    </span>
                                  </div>
                                  <p className="font-medium text-foreground leading-snug">{q.questionText}</p>
                                  <p className="text-[10px] text-muted-foreground">
                                    {q.options.length} options configured
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                      {bankQuestions.length === 0 && (
                        <div className="p-6 text-center border border-dashed border-border rounded-md text-xs text-muted-foreground space-y-2">
                          <p>Your Question Bank is currently empty.</p>
                          {onNavigateToQuestionBank && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={onNavigateToQuestionBank}
                              className="text-xs h-7"
                            >
                              Open Question Bank to Author Questions
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT COLUMN: FINAL TEST PAPER & AI REVIEW */}
              <div className="space-y-4">
                <Card className="border-border bg-card">
                  <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-sm font-semibold">9.4 Final Test Paper</CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        Review active assessment items before publication.
                      </CardDescription>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isAiReviewing || (activePost.knowledgeTest?.selectedQuestionIds.length ?? 0) === 0}
                      onClick={handleRunAiReview}
                      className="text-xs h-7"
                    >
                      {isAiReviewing ? (
                        <Loader2 className="w-3 h-3 animate-spin mr-1" />
                      ) : (
                        <Sparkles className="w-3 h-3 mr-1" />
                      )}
                      <span>Run AI Review Loop</span>
                    </Button>
                  </CardHeader>

                  <CardContent className="p-4 pt-2 space-y-3">
                    {activePost.knowledgeTest?.testPaper && activePost.knowledgeTest.testPaper.length > 0 ? (
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {activePost.knowledgeTest.testPaper.map((q, idx) => (
                          <div key={q.id} className="p-3 rounded-md border border-border bg-muted/10 space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-foreground">
                                Q{idx + 1}. ({q.difficulty.toUpperCase()} • {q.marks} Mark{q.marks > 1 ? "s" : ""})
                              </span>
                              <Badge variant="outline" className="text-[10px]">
                                {q.conceptTag || "Core"}
                              </Badge>
                            </div>
                            <p className="text-foreground leading-relaxed">{q.questionText}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                              {q.options.map((opt) => (
                                <div
                                  key={opt.id}
                                  className={`p-1.5 rounded text-[11px] border ${
                                    opt.id === q.correctOptionId
                                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium"
                                      : "border-border text-muted-foreground"
                                  }`}
                                >
                                  <span className="font-semibold mr-1">{opt.label || "•"}</span>
                                  <span>{opt.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-12 text-center border border-dashed border-border rounded-md text-xs text-muted-foreground space-y-1">
                        <FileCheck className="w-6 h-6 mx-auto text-muted-foreground mb-1" />
                        <p className="font-semibold text-foreground">No questions in test paper</p>
                        <p>Select questions from the left column or use AI Question Selection.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* PREVIEW MODAL */}
      {/* -------------------------------------------------------------------- */}
      {previewPost && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-lg overflow-hidden animate-in fade-in-50">
            {/* Modal Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px]">
                    Candidate Preview
                  </Badge>
                  <Badge variant="secondary" className="text-[10px]">
                    {previewPost.hiringType}
                  </Badge>
                </div>
                <h2 className="text-base font-bold text-foreground mt-1">{previewPost.roleTitle}</h2>
                <p className="text-xs text-muted-foreground">
                  {previewPost.companyName} • {previewPost.location} ({previewPost.workMode})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewPost(null)}
                className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4 overflow-y-auto text-xs">
              <div className="p-3 bg-muted/20 rounded-md border border-border grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground">Openings</p>
                  <p className="font-bold text-foreground font-mono">{previewPost.openings}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Remuneration</p>
                  <p className="font-bold text-foreground font-mono">{previewPost.salaryRange || "Competitive"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Deadline</p>
                  <p className="font-bold text-foreground font-mono">{previewPost.deadline.split("T")[0]}</p>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">Role Overview</h3>
                <p className="text-muted-foreground leading-relaxed">{previewPost.description}</p>
              </div>

              {previewPost.responsibilities.length > 0 && (
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-foreground">Key Responsibilities</h3>
                  <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                    {previewPost.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-1.5">
                <h3 className="font-semibold text-foreground">Required Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {previewPost.requiredSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-muted text-foreground font-mono border border-border">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {previewPost.requiredQualifications.length > 0 && (
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-foreground">Required Qualifications</h3>
                  <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                    {previewPost.requiredQualifications.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-3 rounded-md border border-border bg-muted/30 space-y-1">
                <h3 className="font-semibold text-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Interview & Assessment Logistics</span>
                </h3>
                <p className="text-muted-foreground">
                  <strong>Mode:</strong> {previewPost.interviewDetails.mode} ({previewPost.interviewDetails.type}) •{" "}
                  <strong>Estimated Rounds:</strong> {previewPost.interviewDetails.estimatedRounds}
                </p>
                <p className="text-muted-foreground text-[11px] italic">
                  {previewPost.interviewDetails.instructions}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-border flex justify-end bg-muted/20">
              <Button size="sm" onClick={() => setPreviewPost(null)} className="text-xs h-8">
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
