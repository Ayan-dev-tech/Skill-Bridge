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
import { SkillItem } from "@/lib/admin-data";
import { Search, Plus, Filter, BookOpen } from "lucide-react";

interface SkillLibraryViewProps {
  skills: SkillItem[];
  onAddSkill: (newSkill: SkillItem) => void;
}

const allCategories = [
  "All",
  "Programming",
  "Web Development",
  "Mobile Development",
  "Cloud",
  "Cybersecurity",
  "Data Science",
  "AI / ML",
  "DevOps",
  "Database",
  "Soft Skills",
  "Other",
] as const;

export function SkillLibraryView({ skills, onAddSkill }: SkillLibraryViewProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [showAddModal, setShowAddModal] = React.useState(false);

  // New Skill Form State
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState<SkillItem["category"]>("Programming");
  const [description, setDescription] = React.useState("");
  const [demand, setDemand] = React.useState<SkillItem["industryDemand"]>("High");

  const filtered = skills.filter((s) => {
    if (selectedCategory !== "All" && s.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newSkill: SkillItem = {
      id: `sk-${Date.now()}`,
      name: name.trim(),
      category,
      description: description.trim() || "Core competency recognized in curricula and job frameworks.",
      proficiencyLevels: ["Foundational Syntax", "Intermediate Application", "Production Systems"],
      industryDemand: demand,
      relatedCourses: [],
    };

    onAddSkill(newSkill);
    setName("");
    setDescription("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold">Centralized Skill Library</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Master ontology of competencies mapped across curricula, assessments, and corporate hiring demands.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="relative w-full md:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-muted-foreground" />
                <Input
                  placeholder="Search skill ontology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 text-xs h-8"
                />
              </div>

              <Button
                size="sm"
                onClick={() => setShowAddModal(true)}
                className="h-8 gap-1.5 text-xs shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Add Skill
              </Button>
            </div>
          </div>

          {/* 11 Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-border mt-3 text-xs">
            <span className="text-muted-foreground font-medium text-[11px] mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Categories:
            </span>
            {allCategories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="xs"
                onClick={() => setSelectedCategory(cat)}
                className="text-[11px] h-6 px-2.5 capitalize"
              >
                {cat}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                  <th className="p-3 pl-6">Skill Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3 max-w-sm">Description & Competency Mapping</th>
                  <th className="p-3">Industry Demand</th>
                  <th className="p-3">Related Curricula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((sk) => (
                  <tr key={sk.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 pl-6 font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{sk.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border border-border bg-muted/30">
                        {sk.category}
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground max-w-sm">
                      <p className="line-clamp-2 text-[11px]">{sk.description}</p>
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${
                          sk.industryDemand === "Very High"
                            ? "border border-foreground bg-foreground text-background"
                            : sk.industryDemand === "High"
                            ? "border border-border bg-muted text-foreground"
                            : "text-muted-foreground border border-border"
                        }`}
                      >
                        {sk.industryDemand} Demand
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground font-mono text-[11px]">
                      {sk.relatedCourses.length > 0 ? (
                        <span>{sk.relatedCourses.length} mapped courses</span>
                      ) : (
                        <span className="italic text-muted-foreground/60">No active course</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Skill Dialog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-background border border-border rounded-lg shadow-xl p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">Add New Skill Competency</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSkill} className="space-y-3.5">
              <div className="space-y-1">
                <label className="font-medium text-foreground">Skill Name</label>
                <Input
                  required
                  placeholder="e.g. Distributed Tracing & OpenTelemetry"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xs h-8"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-foreground">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SkillItem["category"])}
                  className="w-full h-8 text-xs rounded border border-border bg-background px-2 text-foreground"
                >
                  {allCategories
                    .filter((c) => c !== "All")
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-foreground">Industry Demand Tier</label>
                <select
                  value={demand}
                  onChange={(e) => setDemand(e.target.value as SkillItem["industryDemand"])}
                  className="w-full h-8 text-xs rounded border border-border bg-background px-2 text-foreground"
                >
                  <option value="Very High">Very High</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Moderate">Moderate</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-foreground">Description</label>
                <textarea
                  placeholder="Summary of skill scope and application..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-20 text-xs rounded border border-border bg-background p-2 text-foreground outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="xs">
                  Save to Library
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
