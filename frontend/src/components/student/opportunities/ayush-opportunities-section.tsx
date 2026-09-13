"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Globe,
  AlertCircle,
  RefreshCw,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Briefcase,
  FileSearch,
} from "lucide-react";
import type {
  AyushDiscoveredOpportunity,
  AyushSourceStatus,
  AyushOpportunityType,
} from "@/lib/ayush/types";

interface AyushOpportunitiesSectionProps {
  opportunities: AyushDiscoveredOpportunity[];
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onApply?: (opp: AyushDiscoveredOpportunity) => void;
}

export function AyushOpportunitiesSection({
  opportunities,
  loading = false,
  refreshing = false,
  onRefresh,
  onApply,
}: AyushOpportunitiesSectionProps) {
  const [selectedType, setSelectedType] = React.useState<string>("all");
  const [selectedOpp, setSelectedOpp] = React.useState<AyushDiscoveredOpportunity | null>(null);

  const getSourceBadge = (status: AyushSourceStatus) => {
    switch (status) {
      case "OFFICIAL":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-semibold gap-1">
            <ShieldCheck className="w-3 h-3" />
            Official Portal
          </Badge>
        );
      case "VERIFIED_SOURCE":
        return (
          <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30 text-[10px] font-semibold gap-1">
            <Building2 className="w-3 h-3" />
            Verified Source
          </Badge>
        );
      case "WEB_DISCOVERED":
        return (
          <Badge variant="outline" className="text-muted-foreground border-border text-[10px] gap-1">
            <Globe className="w-3 h-3" />
            Web Discovered
          </Badge>
        );
      case "UNVERIFIED":
      default:
        return (
          <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px] gap-1">
            <AlertCircle className="w-3 h-3" />
            Unverified Source
          </Badge>
        );
    }
  };

  const filteredOpps = React.useMemo(() => {
    if (selectedType === "all") return opportunities;
    return opportunities.filter((o) => o.opportunityType.toLowerCase() === selectedType.toLowerCase());
  }, [opportunities, selectedType]);

  if (loading) {
    return (
      <Card className="border-border bg-card p-6 space-y-4 animate-pulse">
        <div className="h-6 w-48 bg-muted rounded" />
        <div className="h-4 w-72 bg-muted/60 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="h-44 bg-muted/40 rounded-xl" />
          <div className="h-44 bg-muted/40 rounded-xl" />
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with discovery action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>Live AYUSH Opportunities Discovery</span>
            </h2>
            <Badge variant="outline" className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
              Web & Portal Ingestion
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time AYUSH jobs, clinical fellowships, research assistantships, and internships with verified source labeling and student competency matching.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={refreshing}
              className="text-xs h-8 px-2.5 gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
              <span>{refreshing ? "Discovering..." : "Refresh Discovery"}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 text-xs">
        {["all", "Job", "Internship", "Fellowship", "Research Project"].map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-2.5 py-1 rounded-md transition-all font-medium ${
              selectedType === t
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {t === "all" ? "All Opportunities" : `${t}s`}
          </button>
        ))}
      </div>

      {/* Opportunities List */}
      {filteredOpps.length === 0 ? (
        <Card className="border-border bg-card p-6 text-center space-y-2">
          <FileSearch className="w-8 h-8 text-muted-foreground mx-auto" />
          <CardTitle className="text-sm font-bold text-foreground">No Discovered Opportunities</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Click "Refresh Discovery" above to ingest live opportunities from official AYUSH portals.
          </CardDescription>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOpps.map((opp) => {
            const hasMatch = opp.studentMatch != null;

            return (
              <Card
                key={opp.id}
                className="border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between overflow-hidden shadow-xs"
              >
                <CardHeader className="p-4 pb-2 space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Badge variant="outline" className="text-[10px] font-semibold text-primary border-primary/30">
                        {opp.opportunityType}
                      </Badge>
                      {getSourceBadge(opp.sourceStatus)}
                    </div>

                    <span className="text-[10px] font-mono text-muted-foreground">
                      {opp.sourceDomain}
                    </span>
                  </div>

                  <CardTitle className="text-sm sm:text-base font-bold text-foreground leading-snug">
                    {opp.title}
                  </CardTitle>

                  <div className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span className="line-clamp-1">{opp.organization}</span>
                  </div>

                  <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {opp.description}
                  </CardDescription>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      {opp.location}
                    </span>
                    {opp.deadline && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        Deadline: {new Date(opp.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {/* Step 12 Match Badge if available */}
                  {hasMatch && (
                    <div className="mt-2 p-2 rounded-lg bg-muted/30 border border-border/60 flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-primary" />
                          <span>Student Competency Match</span>
                        </div>
                        <div className="font-semibold text-foreground">
                          {opp.studentMatch!.matchScore}% {opp.studentMatch!.matchLevel}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-mono ${
                          opp.studentMatch!.matchScore >= 70
                            ? "text-emerald-600 border-emerald-500/30 bg-emerald-500/5"
                            : "text-amber-600 border-amber-500/30 bg-amber-500/5"
                        }`}
                      >
                        Readiness {opp.studentMatch!.roleReadinessScore}%
                      </Badge>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="p-4 pt-2 border-t border-border/50 bg-muted/10 flex items-center justify-between gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8 px-2.5 gap-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <a href={opp.sourceUrl} target="_blank" rel="noopener noreferrer">
                      <span>View Official Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>

                  {onApply ? (
                    <Button
                      size="sm"
                      onClick={() => onApply(opp)}
                      className="text-xs h-8 px-3 gap-1 bg-primary text-primary-foreground shadow-xs"
                    >
                      <span>Apply Now</span>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      size="sm"
                      className="text-xs h-8 px-3 gap-1 bg-primary text-primary-foreground shadow-xs"
                    >
                      <a href={opp.applicationUrl} target="_blank" rel="noopener noreferrer">
                        <span>Apply</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
