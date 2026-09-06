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
import { Badge } from "@/components/ui/badge";
import {
  Share2,
  Globe,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import type { ProfessionalProfiles } from "@/lib/verification/types";
import { DocumentVerificationService } from "@/lib/verification/service";

function LinkedInIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GitHubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

interface ProfessionalProfilesCardProps {
  existingProfiles?: ProfessionalProfiles;
  onSave: (profiles: {
    linkedIn?: string;
    gitHub?: string;
    portfolio?: string;
    other?: string;
  }) => Promise<void>;
}

export function ProfessionalProfilesCard({
  existingProfiles,
  onSave,
}: ProfessionalProfilesCardProps) {
  const [linkedIn, setLinkedIn] = React.useState(existingProfiles?.linkedIn || "");
  const [gitHub, setGitHub] = React.useState(existingProfiles?.gitHub || "");
  const [portfolio, setPortfolio] = React.useState(existingProfiles?.portfolio || "");
  const [other, setOther] = React.useState(existingProfiles?.other || "");

  const [isSaving, setIsSaving] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);
  const [saveNotice, setSaveNotice] = React.useState<string | null>(null);

  // Sync when existingProfiles change
  React.useEffect(() => {
    if (existingProfiles) {
      setLinkedIn(existingProfiles.linkedIn || "");
      setGitHub(existingProfiles.gitHub || "");
      setPortfolio(existingProfiles.portfolio || "");
      setOther(existingProfiles.other || "");
    }
  }, [existingProfiles]);

  const hasAnyProfile = Boolean(linkedIn || gitHub || portfolio || other);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSaveNotice(null);

    // Client-side URL validation
    if (linkedIn.trim() && !DocumentVerificationService.validateProfileUrl(linkedIn, "linkedin")) {
      setLocalError("Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/username).");
      return;
    }
    if (gitHub.trim() && !DocumentVerificationService.validateProfileUrl(gitHub, "github")) {
      setLocalError("Please enter a valid GitHub URL (e.g., https://github.com/username).");
      return;
    }
    if (portfolio.trim() && !DocumentVerificationService.validateProfileUrl(portfolio)) {
      setLocalError("Please enter a valid web URL for your portfolio (e.g., https://yourportfolio.dev).");
      return;
    }
    if (other.trim() && !DocumentVerificationService.validateProfileUrl(other)) {
      setLocalError("Please enter a valid web URL for your other profile.");
      return;
    }

    try {
      setIsSaving(true);
      await onSave({
        linkedIn: linkedIn.trim(),
        gitHub: gitHub.trim(),
        portfolio: portfolio.trim(),
        other: other.trim(),
      });
      setSaveNotice("Professional profiles saved successfully.");
      setTimeout(() => setSaveNotice(null), 3500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save profiles.";
      setLocalError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="border border-border bg-card text-card-foreground shadow-sm transition-all duration-200">
      <CardHeader className="p-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Professional Profiles
                </CardTitle>
                <Badge
                  variant="outline"
                  className="text-[10px] font-medium px-1.5 py-0 bg-muted text-muted-foreground border-border"
                >
                  Optional
                </Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground mt-0.5 leading-snug">
                Add your LinkedIn profile and relevant professional social links.
              </CardDescription>
            </div>
          </div>

          {hasAnyProfile && (
            <Badge
              variant="outline"
              className="text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shrink-0 flex items-center gap-1 py-0.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Profiles Added</span>
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-1 space-y-4">
        {localError && (
          <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span className="flex-1">{localError}</span>
            <button
              onClick={() => setLocalError(null)}
              className="text-red-400 hover:text-red-300 text-xs font-bold px-1"
            >
              ×
            </button>
          </div>
        )}

        {saveNotice && (
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveNotice}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* LinkedIn (Recommended) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="linkedin-input" className="font-medium text-foreground flex items-center gap-1.5">
                <LinkedInIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn Profile URL</span>
              </label>
              <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/15 border border-blue-500/30 px-1.5 py-0.2 rounded">
                Recommended
              </span>
            </div>
            <div className="relative">
              <Input
                id="linkedin-input"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                className="h-9 text-xs bg-muted/20 border-border focus:bg-background text-foreground placeholder:text-muted-foreground/60"
              />
              {linkedIn.trim() && (
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-blue-400"
                  title="Open Link"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* GitHub */}
            <div className="space-y-1">
              <label htmlFor="github-input" className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <GitHubIcon className="w-3.5 h-3.5 text-muted-foreground" />
                <span>GitHub URL</span>
              </label>
              <Input
                id="github-input"
                type="url"
                placeholder="https://github.com/username"
                value={gitHub}
                onChange={(e) => setGitHub(e.target.value)}
                className="h-9 text-xs bg-muted/20 border-border focus:bg-background text-foreground placeholder:text-muted-foreground/60"
              />
            </div>

            {/* Portfolio */}
            <div className="space-y-1">
              <label htmlFor="portfolio-input" className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Portfolio Website</span>
              </label>
              <Input
                id="portfolio-input"
                type="url"
                placeholder="https://portfolio.dev"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="h-9 text-xs bg-muted/20 border-border focus:bg-background text-foreground placeholder:text-muted-foreground/60"
              />
            </div>

            {/* Other Profile */}
            <div className="space-y-1">
              <label htmlFor="other-input" className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Other Profile</span>
              </label>
              <Input
                id="other-input"
                type="url"
                placeholder="https://behance.net/username"
                value={other}
                onChange={(e) => setOther(e.target.value)}
                className="h-9 text-xs bg-muted/20 border-border focus:bg-background text-foreground placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              size="sm"
              className="h-8 text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-xs"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  Saving...
                </>
              ) : (
                "Save Profiles"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
