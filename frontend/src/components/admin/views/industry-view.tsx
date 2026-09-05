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
import { IndustryPartner } from "@/lib/admin-data";
import { Search, ShieldAlert, CheckCircle2, Globe, Mail, Eye, X } from "lucide-react";

interface IndustryViewProps {
  industry: IndustryPartner[];
  onToggleFreeze: (companyId: string) => void;
  onApprove: (companyId: string) => void;
}

export function IndustryView({
  industry,
  onToggleFreeze,
  onApprove,
}: IndustryViewProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCompany, setSelectedCompany] = React.useState<IndustryPartner | null>(null);

  const filtered = industry.filter((c) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const skillsMatch = c.demandedSkills.some((s) => s.toLowerCase().includes(q));
      return (
        c.companyName.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.contactPerson.toLowerCase().includes(q) ||
        skillsMatch
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold">Industry Partners & Hiring Oversight</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Corporate recruiters, skill requirements, job/internship listings, and fraud/suspicious activity prevention.
              </CardDescription>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-muted-foreground" />
              <Input
                placeholder="Search company, sector, skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 text-xs h-8"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                  <th className="p-3 pl-6">Company & Domain</th>
                  <th className="p-3">Primary Contact</th>
                  <th className="p-3">Skills Demanded</th>
                  <th className="p-3">Open Jobs</th>
                  <th className="p-3">Internships</th>
                  <th className="p-3">Hiring Status</th>
                  <th className="p-3 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    className={`transition-colors ${
                      c.isFrozen ? "bg-destructive/5 hover:bg-destructive/10" : "hover:bg-muted/20"
                    }`}
                  >
                    <td className="p-3 pl-6">
                      <p className="font-semibold text-foreground">{c.companyName}</p>
                      <p className="text-muted-foreground text-[11px]">{c.industry}</p>
                    </td>
                    <td className="p-3">
                      <p className="font-medium text-foreground">{c.contactPerson}</p>
                      <p className="text-muted-foreground font-mono text-[11px]">{c.contactEmail}</p>
                    </td>
                    <td className="p-3 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {c.demandedSkills.map((sk, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded text-[10px] border border-border bg-muted/20">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 font-mono font-medium">{c.openJobs} slots</td>
                    <td className="p-3 font-mono font-medium">{c.activeInternships} slots</td>
                    <td className="p-3">
                      {c.isFrozen ? (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border border-destructive/40 bg-destructive/15 text-destructive uppercase">
                            Hiring Frozen
                          </span>
                          {c.freezeReason && (
                            <p className="text-[10px] text-destructive/80 italic max-w-xs">{c.freezeReason}</p>
                          )}
                        </div>
                      ) : (
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            c.status === "verified"
                              ? "bg-foreground text-background"
                              : "border border-amber-500/40 text-amber-500 bg-amber-500/10"
                          }`}
                        >
                          {c.status}
                        </span>
                      )}
                    </td>
                    <td className="p-3 pr-6 text-right space-x-1.5">
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => setSelectedCompany(c)}
                        className="h-7 text-[11px] gap-1"
                      >
                        <Eye className="w-3 h-3" /> Profile
                      </Button>

                      {c.status === "pending" && (
                        <Button
                          variant="default"
                          size="xs"
                          onClick={() => onApprove(c.id)}
                          className="h-7 text-[11px] gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Approve
                        </Button>
                      )}

                      <Button
                        variant={c.isFrozen ? "default" : "destructive"}
                        size="xs"
                        onClick={() => onToggleFreeze(c.id)}
                        className="h-7 text-[11px] gap-1"
                      >
                        <ShieldAlert className="w-3 h-3" />
                        {c.isFrozen ? "Restore Hiring" : "Freeze Company"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Company Detail Drawer */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedCompany(null)} />
          <div className="relative w-full max-w-lg h-full bg-background border-l border-border shadow-2xl p-6 overflow-y-auto space-y-6 text-xs text-foreground z-10">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-foreground">{selectedCompany.companyName}</h3>
                <p className="text-muted-foreground text-xs">{selectedCompany.industry}</p>
                <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {selectedCompany.website}</span>
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {selectedCompany.contactEmail}</span>
                </div>
              </div>
              <button onClick={() => setSelectedCompany(null)} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-foreground uppercase tracking-wider text-[10px] text-muted-foreground">
                Company Information
              </p>
              <div className="p-3 rounded border border-border bg-muted/20 space-y-1.5">
                <p><span className="text-muted-foreground">Point of Contact:</span> <span className="font-medium text-foreground">{selectedCompany.contactPerson}</span></p>
                <p><span className="text-muted-foreground">Verification:</span> <span className="capitalize font-medium text-foreground">{selectedCompany.status}</span></p>
                <p><span className="text-muted-foreground">Partnership Established:</span> <span className="font-mono text-foreground">{selectedCompany.joinedDate}</span></p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-foreground uppercase tracking-wider text-[10px] text-muted-foreground">
                Skills Demanded by {selectedCompany.companyName}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selectedCompany.demandedSkills.map((sk, i) => (
                  <span key={i} className="px-2 py-1 rounded border border-border bg-card font-medium text-foreground">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-foreground uppercase tracking-wider text-[10px] text-muted-foreground">
                Hiring Statistics
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded border border-border bg-card">
                  <p className="text-muted-foreground text-[11px]">Open Jobs</p>
                  <p className="text-xl font-bold font-mono text-foreground">{selectedCompany.openJobs}</p>
                </div>
                <div className="p-3 rounded border border-border bg-card">
                  <p className="text-muted-foreground text-[11px]">Active Internships</p>
                  <p className="text-xl font-bold font-mono text-foreground">{selectedCompany.activeInternships}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedCompany(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
