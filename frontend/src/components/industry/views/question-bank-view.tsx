"use client";

import * as React from "react";
import {
  FileQuestion,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit3,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Check,
  Layers,
  HelpCircle,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type {
  IndustryQuestionRecord,
  CreateIndustryQuestionInput,
  IndustryQuestionOption,
} from "@/lib/industry/types";

export function QuestionBankView() {
  const [questions, setQuestions] = React.useState<IndustryQuestionRecord[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Filters
  const [search, setSearch] = React.useState("");
  const [difficultyFilter, setDifficultyFilter] = React.useState("all");
  const [domainFilter, setDomainFilter] = React.useState("all");

  // Create / Edit Modal State
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingQuestion, setEditingQuestion] = React.useState<IndustryQuestionRecord | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  // Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Preview State
  const [previewQuestion, setPreviewQuestion] = React.useState<IndustryQuestionRecord | null>(null);
  const [previewSelectedOption, setPreviewSelectedOption] = React.useState<string | null>(null);

  // Form Fields
  const [questionText, setQuestionText] = React.useState("");
  const [domainId, setDomainId] = React.useState("software");
  const [difficulty, setDifficulty] = React.useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [conceptTag, setConceptTag] = React.useState("");
  const [marks, setMarks] = React.useState<number>(1);
  const [explanation, setExplanation] = React.useState("");
  const [options, setOptions] = React.useState<IndustryQuestionOption[]>([
    { id: "opt-1", label: "A", text: "" },
    { id: "opt-2", label: "B", text: "" },
    { id: "opt-3", label: "C", text: "" },
    { id: "opt-4", label: "D", text: "" },
  ]);
  const [correctOptionId, setCorrectOptionId] = React.useState("opt-1");

  const fetchQuestions = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (search.trim()) params.append("search", search.trim());
      if (difficultyFilter !== "all") params.append("difficulty", difficultyFilter);
      if (domainFilter !== "all") params.append("domainId", domainFilter);

      const res = await fetch(`/api/industry/question-bank?${params.toString()}`);
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load questions.");
      }
      setQuestions(json.questions || []);
    } catch (err: unknown) {
      console.error("Question fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to load questions.");
    } finally {
      setIsLoading(false);
    }
  }, [search, difficultyFilter, domainFilter]);

  React.useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const resetForm = () => {
    setEditingQuestion(null);
    setQuestionText("");
    setDomainId("software");
    setDifficulty("intermediate");
    setConceptTag("");
    setMarks(1);
    setExplanation("");
    setOptions([
      { id: "opt-1", label: "A", text: "" },
      { id: "opt-2", label: "B", text: "" },
      { id: "opt-3", label: "C", text: "" },
      { id: "opt-4", label: "D", text: "" },
    ]);
    setCorrectOptionId("opt-1");
    setFormError(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setModalOpen(true);
  };

  const handleOpenEdit = (q: IndustryQuestionRecord) => {
    setEditingQuestion(q);
    setQuestionText(q.questionText);
    setDomainId(q.domainId);
    setDifficulty(q.difficulty);
    setConceptTag(q.conceptTag);
    setMarks(q.marks || 1);
    setExplanation(q.explanation || "");
    setOptions(q.options || []);
    setCorrectOptionId(q.correctOptionId);
    setFormError(null);
    setModalOpen(true);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!questionText.trim()) {
      setFormError("Question text prompt is required.");
      return;
    }

    if (options.length < 2) {
      setFormError("At least 2 options are required.");
      return;
    }

    for (let i = 0; i < options.length; i++) {
      if (!options[i].text.trim()) {
        setFormError(`Option ${options[i].label} cannot be empty.`);
        return;
      }
    }

    if (!correctOptionId || !options.some((o) => o.id === correctOptionId)) {
      setFormError("Please choose which option is the correct answer.");
      return;
    }

    try {
      setIsSaving(true);
      const payload: CreateIndustryQuestionInput = {
        questionText: questionText.trim(),
        questionType: "mcq",
        options: options.map((opt) => ({
          id: opt.id,
          label: opt.label,
          text: opt.text.trim(),
        })),
        correctOptionId,
        difficulty,
        complexity: difficulty === "beginner" ? "fundamental" : difficulty === "intermediate" ? "application" : "challenging",
        domainId,
        conceptTag: conceptTag.trim() || "general",
        marks: marks > 0 ? marks : 1,
        explanation: explanation.trim(),
      };

      const url = editingQuestion
        ? `/api/industry/question-bank/${editingQuestion.id}`
        : `/api/industry/question-bank`;
      const method = editingQuestion ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to save question.");
      }

      setModalOpen(false);
      resetForm();
      fetchQuestions();
    } catch (err: unknown) {
      console.error("Save question error:", err);
      setFormError(err instanceof Error ? err.message : "Failed to save question.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteQuestion = async () => {
    if (!deleteConfirmId) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/industry/question-bank/${deleteConfirmId}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to delete question.");
      }
      setDeleteConfirmId(null);
      fetchQuestions();
    } catch (err: unknown) {
      console.error("Delete question error:", err);
      setError(err instanceof Error ? err.message : "Failed to delete question.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border bg-muted/40 text-[11px] text-muted-foreground font-medium">
            <FileQuestion className="w-3.5 h-3.5 text-foreground" />
            <span>Technical Assessment Authoring</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Industry Question Bank
          </h1>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Author calibrated technical multiple-choice questions for candidate evaluations and campus recruitment tests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleOpenCreate} size="sm" className="text-xs gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Question</span>
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <Card className="border-border bg-card">
        <CardContent className="p-3.5 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by question text, concept tag, or option contents..."
              className="pl-9 text-xs h-9"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="h-9 px-3 rounded-md border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="all">All Domains</option>
              <option value="software">Software Engineering</option>
              <option value="ai-ml">AI / Machine Learning</option>
              <option value="cloud">Cloud & Infrastructure</option>
              <option value="web">Web & Full-Stack</option>
              <option value="security">Cybersecurity</option>
            </select>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="h-9 px-3 rounded-md border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="p-3 rounded-md border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <Button size="sm" variant="ghost" onClick={fetchQuestions} className="h-7 text-xs">
            Retry
          </Button>
        </div>
      )}

      {/* Questions List */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Loading technical question items...</p>
        </div>
      ) : questions.length > 0 ? (
        <div className="space-y-3">
          {questions.map((q, idx) => (
            <Card key={q.id} className="border-border bg-card">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] font-semibold text-muted-foreground">
                        Q{idx + 1}
                      </span>
                      <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                        {q.difficulty}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] font-normal">
                        {q.domainId}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground font-mono">
                        Tag: #{q.conceptTag}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        • {q.marks || 1} mark{q.marks > 1 ? "s" : ""}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-foreground leading-relaxed">
                      {q.questionText}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setPreviewQuestion(q);
                        setPreviewSelectedOption(null);
                      }}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                      title="Preview Question"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenEdit(q)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                      title="Edit Question"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteConfirmId(q.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt) => {
                    const isCorrect = opt.id === q.correctOptionId;
                    return (
                      <div
                        key={opt.id}
                        className={`p-2.5 rounded-md border text-xs flex items-start gap-2.5 transition-colors ${
                          isCorrect
                            ? "border-emerald-500/40 bg-emerald-500/5 text-foreground font-medium"
                            : "border-border/60 bg-muted/10 text-muted-foreground"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                            isCorrect
                              ? "bg-emerald-500 text-white"
                              : "bg-muted text-foreground border border-border"
                          }`}
                        >
                          {opt.label}
                        </span>
                        <span className="flex-1 leading-snug">{opt.text}</span>
                        {isCorrect && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider shrink-0 mt-0.5">
                            Correct
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <p className="text-[11px] text-muted-foreground/80 italic pt-1 border-t border-border/50">
                    <span className="font-medium not-italic text-muted-foreground">Rationale: </span>
                    {q.explanation}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="border-border bg-card">
          <CardContent className="py-16 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-muted mx-auto flex items-center justify-center text-muted-foreground">
              <FileQuestion className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">No questions in your Question Bank</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Author technical benchmark questions with stable option choices to assess student competencies for campus drives.
              </p>
            </div>
            <Button size="sm" onClick={handleOpenCreate} className="text-xs gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Create First Question</span>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  {editingQuestion ? "Edit Assessment Question" : "Author New Technical Question"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  Define prompt, distinct stable options, and choose the correct answer.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              {formError && (
                <div className="p-3 rounded-md border border-destructive/40 bg-destructive/10 text-destructive flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Question Text */}
              <div className="space-y-1.5">
                <Label htmlFor="qText" className="text-xs font-medium">
                  Question Prompt Text <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="qText"
                  rows={3}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="e.g. In an ACID-compliant relational database, which property ensures that transactions are either fully completed or completely rolled back?"
                  required
                  className="text-xs"
                />
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Domain</Label>
                  <select
                    value={domainId}
                    onChange={(e) => setDomainId(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-md border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="software">Software Eng</option>
                    <option value="ai-ml">AI / ML</option>
                    <option value="cloud">Cloud & Infra</option>
                    <option value="web">Web Systems</option>
                    <option value="security">Cybersecurity</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Difficulty Tier</Label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as "beginner" | "intermediate" | "advanced")}
                    className="w-full h-9 px-2.5 rounded-md border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Concept Tag</Label>
                  <Input
                    value={conceptTag}
                    onChange={(e) => setConceptTag(e.target.value)}
                    placeholder="e.g. acid-atomicity"
                    className="text-xs h-9"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Marks / Points</Label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={marks}
                    onChange={(e) => setMarks(parseInt(e.target.value, 10) || 1)}
                    className="text-xs h-9"
                  />
                </div>
              </div>

              {/* Options Section */}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium">
                    Answer Options (MCQ Choices) <span className="text-destructive">*</span>
                  </Label>
                  <span className="text-[11px] text-muted-foreground">
                    Click the radio circle to select the correct answer
                  </span>
                </div>

                <div className="space-y-2.5">
                  {options.map((opt, idx) => {
                    const isCorrect = opt.id === correctOptionId;
                    return (
                      <div
                        key={opt.id}
                        className={`p-2.5 rounded-md border flex items-center gap-3 transition-colors ${
                          isCorrect ? "border-emerald-500/50 bg-emerald-500/5" : "border-border"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setCorrectOptionId(opt.id)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                            isCorrect
                              ? "bg-emerald-500 text-white"
                              : "border border-border bg-muted hover:border-foreground/40 text-muted-foreground"
                          }`}
                          title={`Mark option ${opt.label} as correct`}
                        >
                          {opt.label}
                        </button>

                        <Input
                          value={opt.text}
                          onChange={(e) => {
                            const newText = e.target.value;
                            setOptions((prev) =>
                              prev.map((item) =>
                                item.id === opt.id ? { ...item, text: newText } : item
                              )
                            );
                          }}
                          placeholder={`Enter choice ${opt.label} text...`}
                          className="text-xs h-8 flex-1"
                        />

                        {isCorrect && (
                          <Badge variant="outline" className="text-[10px] text-emerald-600 dark:text-emerald-400 border-emerald-500/40 shrink-0">
                            Correct Answer
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation / Rationale */}
              <div className="space-y-1.5 pt-2 border-t border-border">
                <Label htmlFor="expl" className="text-xs font-medium">
                  Explanation / Answer Rationale
                </Label>
                <Textarea
                  id="expl"
                  rows={2}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Explain why this option is correct to aid candidate post-assessment feedback..."
                  className="text-xs"
                />
              </div>

              <div className="p-3 border-t border-border bg-muted/20 -mx-5 -mb-5 mt-4 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setModalOpen(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSaving}
                  className="text-xs min-w-[100px]"
                >
                  {isSaving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : editingQuestion ? (
                    "Update Question"
                  ) : (
                    "Save Question"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-card border border-border rounded-lg p-5 shadow-xl space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-foreground">Delete Assessment Question?</h3>
              <p className="text-xs text-muted-foreground">
                This item will be permanently removed from your Industry Question Bank. This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteConfirmId(null)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteQuestion}
                disabled={isDeleting}
                className="text-xs"
              >
                {isDeleting ? "Deleting..." : "Delete Question"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-card border border-border rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Question Preview Simulation
                </p>
                <p className="text-xs text-muted-foreground">
                  As experienced by candidate in hiring technical benchmark
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewQuestion(null)}
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto text-xs">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] uppercase">
                  {previewQuestion.difficulty}
                </Badge>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{previewQuestion.marks} Mark(s)</span>
              </div>

              <p className="text-sm font-semibold text-foreground leading-relaxed">
                {previewQuestion.questionText}
              </p>

              <div className="space-y-2 pt-1">
                {previewQuestion.options.map((opt) => {
                  const isSelected = previewSelectedOption === opt.id;
                  const isCorrect = opt.id === previewQuestion.correctOptionId;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPreviewSelectedOption(opt.id)}
                      className={`w-full p-3 rounded-md border text-left flex items-center gap-3 transition-colors ${
                        isSelected
                          ? isCorrect
                            ? "border-emerald-500 bg-emerald-500/10 text-foreground"
                            : "border-destructive bg-destructive/10 text-foreground"
                          : "border-border hover:bg-muted/40 text-foreground"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          isSelected
                            ? isCorrect
                              ? "bg-emerald-500 text-white"
                              : "bg-destructive text-white"
                            : "bg-muted text-foreground border border-border"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="flex-1 text-xs">{opt.text}</span>
                      {isSelected && (
                        <span className="text-[11px] font-semibold">
                          {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {previewSelectedOption && previewQuestion.explanation && (
                <div className="p-3 rounded-md bg-muted/20 border border-border text-[11px] space-y-1">
                  <span className="font-semibold text-foreground">Explanation:</span>
                  <p className="text-muted-foreground">{previewQuestion.explanation}</p>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-border bg-muted/20 flex items-center justify-end">
              <Button size="sm" variant="outline" onClick={() => setPreviewQuestion(null)} className="text-xs">
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
