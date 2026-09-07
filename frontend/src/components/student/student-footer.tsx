"use client";

import * as React from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Building2,
  ExternalLink,
} from "lucide-react";

export function StudentFooter() {
  const [modalType, setModalType] = React.useState<"privacy" | "terms" | "contact" | null>(null);

  return (
    <footer className="w-full border-t border-border bg-card/60 text-foreground text-xs mt-12 select-none">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 space-y-8">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Skill Bridge Brand Statement */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-foreground text-background font-bold text-xs flex items-center justify-center shrink-0">
                S
              </div>
              <span className="font-semibold text-sm tracking-tight text-foreground">
                SKILL BRIDGE
              </span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Skill Bridge connects student interests, verified knowledge, skill development,
              and career opportunities through a structured journey from discovery to employment.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Academic Network Operational</span>
            </div>
          </div>

          {/* Column 2: About Skill Bridge */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
              About Skill Bridge
            </h4>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Skill Bridge is a student-focused platform designed to help learners understand
              their interests, evaluate their knowledge, identify skill gaps, develop relevant
              capabilities, build stronger professional profiles, and connect with suitable
              career opportunities.
            </p>
            <Link
              href="/student/about"
              className="inline-flex items-center gap-1 text-[11px] text-foreground hover:underline font-medium pt-0.5 transition-colors duration-150"
            >
              Read full institutional overview <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Column 3: Platform Workflow Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
              Platform Modules
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link
                  href="/student/interest-finder"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-150 flex items-center justify-between"
                >
                  <span>Interest Finder</span>
                  <span className="text-[9px] font-mono uppercase bg-muted/50 px-1 py-0.2 rounded border border-border">
                    Stage 1
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/student/knowledge-testing"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  Knowledge Testing
                </Link>
              </li>
              <li>
                <Link
                  href="/student/skill-gap"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  Skill Gap & Suggestions
                </Link>
              </li>
              <li>
                <Link
                  href="/student/learning"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  Learning / Mentoring
                </Link>
              </li>
              <li>
                <Link
                  href="/student/resume-checker"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  Resume Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/student/opportunities"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  Jobs & Internships
                </Link>
              </li>
              <li>
                <Link
                  href="/student/applications"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  Track Applications
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform Organization / Institutional Context */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
              Institutional Context
            </h4>
            <div className="p-3 rounded-md border border-border bg-muted/20 space-y-2 text-[11px]">
              <p className="font-medium text-foreground flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                Higher Education Framework
              </p>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Built for engineering universities, autonomous campuses, and accredited faculty
                departments to align curricula directly with verifiable industry capabilities.
              </p>
            </div>
            <div className="pt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-foreground shrink-0" />
              <span>Verified Credential Governance</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <p>© 2026 Skill Bridge. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setModalType("privacy")}
              className="hover:text-foreground transition-colors duration-150"
            >
              Privacy Policy
            </button>
            <span className="text-border">·</span>
            <button
              onClick={() => setModalType("terms")}
              className="hover:text-foreground transition-colors duration-150"
            >
              Terms of Use
            </button>
            <span className="text-border">·</span>
            <button
              onClick={() => setModalType("contact")}
              className="hover:text-foreground transition-colors duration-150"
            >
              Academic Support
            </button>
            <span className="text-border">·</span>
            <Link
              href="/student/about"
              className="hover:text-foreground transition-colors duration-150"
            >
              About
            </Link>
          </div>
        </div>
      </div>

      {/* Informational Disclosure Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setModalType(null)}
          />
          <div className="relative w-full max-w-md p-6 rounded-lg border border-border bg-card shadow-xl space-y-4 z-10 text-xs animate-in fade-in-0 duration-150">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-foreground capitalize">
                {modalType === "privacy" && "Institutional Privacy Policy"}
                {modalType === "terms" && "Platform Terms of Use"}
                {modalType === "contact" && "Academic Support & Inquiries"}
              </h3>
              <p className="text-muted-foreground text-[11px]">Skill Bridge Academic Governance</p>
            </div>

            <div className="p-3 rounded border border-border bg-muted/20 text-muted-foreground leading-relaxed text-[11px]">
              {modalType === "privacy" &&
                "Skill Bridge processes student academic and assessment records strictly in accordance with institutional data governance protocols. Data is never shared with unverified recruiters."}
              {modalType === "terms" &&
                "Access to Skill Bridge is provisioned for enrolled collegiate students and authorized faculty. Platform assessments and credentials reflect verifiable individual evaluations."}
              {modalType === "contact" &&
                "For collegiate access, departmental enrollment assistance, or administrative inquiries, contact your campus placement cell or academic coordinator."}
            </div>

            <div className="flex justify-end pt-2 border-t border-border">
              <button
                onClick={() => setModalType(null)}
                className="px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
