"use client";

import * as React from "react";
import {
  Building2,
  Briefcase,
  Search,
  Filter,
  Users,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  MapPin,
  Clock,
  DollarSign,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { CampusIndustryRecord, CampusHiringPostRecord } from "@/lib/campus/types";

export function CampusIndustryView() {
  const [activeTab, setActiveTab] = React.useState<"posts" | "industries">("posts");

  // Posts state
  const [posts, setPosts] = React.useState<CampusHiringPostRecord[]>([]);
  const [totalPosts, setTotalPosts] = React.useState(0);
  const [postPage, setPostPage] = React.useState(1);
  const [postTotalPages, setPostTotalPages] = React.useState(1);
  const [isPostsLoading, setIsPostsLoading] = React.useState(true);

  // Industries state
  const [industries, setIndustries] = React.useState<CampusIndustryRecord[]>([]);
  const [totalIndustries, setTotalIndustries] = React.useState(0);
  const [indPage, setIndPage] = React.useState(1);
  const [indTotalPages, setIndTotalPages] = React.useState(1);
  const [isIndustriesLoading, setIsIndustriesLoading] = React.useState(true);

  // Filters & Search
  const [search, setSearch] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("all");

  // Post detail modal
  const [selectedPost, setSelectedPost] = React.useState<CampusHiringPostRecord | null>(null);

  const [error, setError] = React.useState<string | null>(null);

  // Fetch hiring posts
  const fetchPosts = React.useCallback(async (page: number = 1) => {
    try {
      setIsPostsLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: String(page),
        limit: "9",
      });
      if (search.trim()) params.append("search", search.trim());
      if (typeFilter !== "all") params.append("type", typeFilter);

      const headers: Record<string, string> = {};
      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("skill_bridge_user");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.id) headers["x-campus-id"] = parsed.id;
          } catch {}
        }
      }

      const res = await fetch(`/api/campus/industry?tab=posts&${params.toString()}`, { headers });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load hiring posts.");
      }
      setPosts(json.posts || []);
      setTotalPosts(json.totalCount || 0);
      setPostPage(json.page || 1);
      setPostTotalPages(json.totalPages || 1);
    } catch (err: unknown) {
      console.error("Posts fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to load hiring posts.");
    } finally {
      setIsPostsLoading(false);
    }
  }, [search, typeFilter]);

  // Fetch industries
  const fetchIndustries = React.useCallback(async (page: number = 1) => {
    try {
      setIsIndustriesLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: String(page),
        limit: "9",
      });
      if (search.trim()) params.append("search", search.trim());

      const headers: Record<string, string> = {};
      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("skill_bridge_user");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.id) headers["x-campus-id"] = parsed.id;
          } catch {}
        }
      }

      const res = await fetch(`/api/campus/industry?tab=industries&${params.toString()}`, { headers });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load industries.");
      }
      setIndustries(json.industries || []);
      setTotalIndustries(json.totalCount || 0);
      setIndPage(json.page || 1);
      setIndTotalPages(json.totalPages || 1);
    } catch (err: unknown) {
      console.error("Industries fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to load industries.");
    } finally {
      setIsIndustriesLoading(false);
    }
  }, [search]);

  React.useEffect(() => {
    if (activeTab === "posts") {
      fetchPosts(1);
    } else {
      fetchIndustries(1);
    }
  }, [activeTab, fetchPosts, fetchIndustries]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-border bg-muted/40 text-[11px] text-muted-foreground font-medium mb-1">
            <Building2 className="w-3 h-3 text-foreground" />
            <span>Corporate Ecosystem</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-foreground font-semibold">Authoritative Industry Records</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Industry Drives & Hiring Requirements
          </h1>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Track published corporate opportunities, hiring criteria, candidate participation volume, and recruitment stage conversions.
          </p>
        </div>

        {/* Visibility Authority Banner */}
        <div className="p-2.5 rounded-md bg-muted/40 border border-border text-[11px] text-muted-foreground flex items-center gap-2 max-w-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Industry partners directly manage requirement configs and hiring selections.</span>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => (activeTab === "posts" ? fetchPosts(postPage) : fetchIndustries(indPage))}
            className="h-7 text-xs"
          >
            Retry
          </Button>
        </Alert>
      )}

      {/* Tabs & Search Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Tabs value={activeTab} onValueChange={(val) => {
          setActiveTab(val as "posts" | "industries");
          setSearch("");
        }}>
          <TabsList>
            <TabsTrigger value="posts">
              Active Opportunities ({totalPosts})
            </TabsTrigger>
            <TabsTrigger value="industries">
              Connected Industries ({totalIndustries})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={activeTab === "posts" ? "Search role or company..." : "Search corporate partner..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 text-xs h-8 w-60"
            />
          </div>

          {activeTab === "posts" && (
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs h-8 px-2.5 rounded-md border border-border bg-background text-foreground shrink-0"
            >
              <option value="all">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
            </select>
          )}
        </div>
      </div>

      {/* Content for Active Hiring Posts */}
      {activeTab === "posts" && (
        <div className="space-y-4">
          {isPostsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          ) : posts.length === 0 ? (
            <Card className="border-border bg-card">
              <CardContent className="p-12 text-center space-y-2">
                <Briefcase className="w-8 h-8 text-muted-foreground mx-auto" />
                <p className="text-sm font-medium text-foreground">No active hiring posts found</p>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  When industry partners publish job and internship opportunities, they will be tracked here in real-time.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="border-border bg-card flex flex-col justify-between hover:border-foreground/30 transition-colors"
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-sm font-semibold text-foreground line-clamp-1">
                          {post.roleTitle}
                        </CardTitle>
                        <CardDescription className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3 h-3" />
                          <span>{post.companyName}</span>
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-[10px] shrink-0">
                        {post.hiringType}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 pt-1 space-y-3 flex-1">
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span>{post.location || "Remote"} ({post.workMode || "Hybrid"})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span>{post.salaryRange || "Competitive"}</span>
                      </div>
                    </div>

                    {/* Required Skills */}
                    {post.requiredSkills && post.requiredSkills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.requiredSkills.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-[10px] px-1.5 py-0">
                            {skill}
                          </Badge>
                        ))}
                        {post.requiredSkills.length > 3 && (
                          <span className="text-[10px] text-muted-foreground self-center">
                            +{post.requiredSkills.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Candidate Funnel for Post */}
                    <div className="pt-2 border-t border-border grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-1.5 rounded bg-muted/40">
                        <p className="text-[10px] text-muted-foreground uppercase">Applied</p>
                        <p className="font-mono font-bold text-foreground">{post.applicationsCount}</p>
                      </div>
                      <div className="p-1.5 rounded bg-muted/40">
                        <p className="text-[10px] text-muted-foreground uppercase">Shortlist</p>
                        <p className="font-mono font-bold text-foreground">{post.shortlistedCount}</p>
                      </div>
                      <div className="p-1.5 rounded bg-emerald-500/10">
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase">Selected</p>
                        <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {post.selectedCount}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <div className="p-3 border-t border-border flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">
                      {post.openings} {post.openings === 1 ? "opening" : "openings"}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPost(post)}
                      className="h-7 text-xs gap-1"
                    >
                      <span>View Details</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {postTotalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">
                Showing page {postPage} of {postTotalPages}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={postPage <= 1 || isPostsLoading}
                  onClick={() => fetchPosts(postPage - 1)}
                  className="h-7 px-2 text-xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={postPage >= postTotalPages || isPostsLoading}
                  onClick={() => fetchPosts(postPage + 1)}
                  className="h-7 px-2 text-xs"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content for Connected Industries */}
      {activeTab === "industries" && (
        <div className="space-y-4">
          {isIndustriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Skeleton className="h-44 w-full" />
              <Skeleton className="h-44 w-full" />
              <Skeleton className="h-44 w-full" />
            </div>
          ) : industries.length === 0 ? (
            <Card className="border-border bg-card">
              <CardContent className="p-12 text-center space-y-2">
                <Building2 className="w-8 h-8 text-muted-foreground mx-auto" />
                <p className="text-sm font-medium text-foreground">No industry partners found</p>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Connected corporate recruitment partners will appear here once verified on the platform.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map((ind) => (
                <Card key={ind.id} className="border-border bg-card flex flex-col justify-between">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-sm font-semibold text-foreground">
                          {ind.companyName}
                        </CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">
                          {ind.industryDomain || "Technology & Services"}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-500/30">
                        Verified
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 pt-1 space-y-3 flex-1">
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>Contact: <span className="text-foreground">{ind.contactPerson}</span></p>
                      <p>Email: <span className="text-foreground">{ind.contactEmail}</span></p>
                      {ind.website && (
                        <a
                          href={ind.website.startsWith("http") ? ind.website : `https://${ind.website}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <span>Visit Website</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <div className="pt-2 border-t border-border grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-1.5 rounded bg-muted/40">
                        <p className="text-[10px] text-muted-foreground uppercase">Drives</p>
                        <p className="font-mono font-bold text-foreground">
                          {ind.activeJobsCount + ind.activeInternshipsCount}
                        </p>
                      </div>
                      <div className="p-1.5 rounded bg-muted/40">
                        <p className="text-[10px] text-muted-foreground uppercase">Applied</p>
                        <p className="font-mono font-bold text-foreground">{ind.totalApplications}</p>
                      </div>
                      <div className="p-1.5 rounded bg-emerald-500/10">
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase">Selected</p>
                        <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {ind.selectedCount}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-card border border-border rounded-lg shadow-xl p-6 space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="outline" className="text-[10px] mb-1">
                  {selectedPost.hiringType}
                </Badge>
                <h2 className="text-base font-bold text-foreground">{selectedPost.roleTitle}</h2>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-3 h-3" />
                  <span>{selectedPost.companyName}</span>
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPost(null)}
                className="h-7 w-7 p-0 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-md bg-muted/30 border border-border grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block">Location</span>
                  <span className="font-medium text-foreground">{selectedPost.location} ({selectedPost.workMode})</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block">Compensation</span>
                  <span className="font-medium text-foreground">{selectedPost.salaryRange || "Undisclosed"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block">Openings</span>
                  <span className="font-medium text-foreground">{selectedPost.openings} positions</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-1">Role Description</h3>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {selectedPost.description || "No detailed description provided by the corporate partner."}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-1.5">Required Skills & Technologies</h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPost.requiredSkills && selectedPost.requiredSkills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs font-normal">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recruitment Funnel Overview */}
              <div className="pt-3 border-t border-border">
                <h3 className="font-semibold text-foreground mb-2">Campus Talent Participation</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded bg-muted/40 border border-border">
                    <p className="text-[10px] text-muted-foreground uppercase">Applied</p>
                    <p className="font-mono font-bold text-foreground text-sm">{selectedPost.applicationsCount}</p>
                  </div>
                  <div className="p-2 rounded bg-muted/40 border border-border">
                    <p className="text-[10px] text-muted-foreground uppercase">Shortlisted</p>
                    <p className="font-mono font-bold text-foreground text-sm">{selectedPost.shortlistedCount}</p>
                  </div>
                  <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase">Selected</p>
                    <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      {selectedPost.selectedCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button size="sm" variant="outline" onClick={() => setSelectedPost(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
