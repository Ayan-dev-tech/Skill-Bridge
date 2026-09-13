"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  Bot,
  X,
  Send,
  Loader2,
  ChevronRight,
  ShieldCheck,
  Award,
  Compass,
  FileCheck,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { AssistantAnswer } from "@/lib/ayush/assistant-service";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  answer?: AssistantAnswer;
}

const SUGGESTED_PROMPTS = [
  "Why am I not ready for this role?",
  "What should I improve first?",
  "Show my biggest competency gaps",
  "What opportunities match me?",
  "What evidence is still pending?",
];

export function AyushAssistantWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [inputQuery, setInputQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "assistant",
      text: `### Welcome to SkillBridge AYUSH Assistant! 🌿\n\nI am your authoritative competency and career advisor across Ayurveda, Yoga, Unani, Siddha, and Homoeopathy. I analyze your verified ratings, clinical skill gaps, faculty reviews, and industry demands to guide your next steps.\n\nChoose a quick question below or ask me anything about your readiness.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/student/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        const assistantMsg: ChatMessage = {
          id: `ast-${Date.now()}`,
          sender: "assistant",
          text: json.data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          answer: json.data,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: `ast-${Date.now()}`,
          sender: "assistant",
          text: `⚠️ **Unable to process query:** ${json.error || "Please verify your student session and try again."}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: "assistant",
        text: `⚠️ **Connection Error:** Could not contact the SkillBridge assistant service. Please check your internet connection.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormattedMarkdown = (content: string) => {
    const lines = content.split("\n");
    return (
      <div className="space-y-1.5 text-xs md:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith("### ")) {
            return (
              <h4 key={idx} className="font-bold text-foreground text-sm md:text-base mt-2 mb-1 flex items-center gap-1.5">
                {line.replace("### ", "")}
              </h4>
            );
          }
          if (line.startsWith("## ")) {
            return (
              <h3 key={idx} className="font-bold text-foreground text-base mt-3 mb-1">
                {line.replace("## ", "")}
              </h3>
            );
          }
          if (line.startsWith("- ")) {
            const itemText = line.replace("- ", "");
            return (
              <div key={idx} className="flex items-start gap-2 ml-1 text-muted-foreground">
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatInline(itemText) }} />
              </div>
            );
          }
          if (/^\d+\.\s/.test(line)) {
            const itemText = line.replace(/^\d+\.\s/, "");
            const num = line.match(/^(\d+)\./)?.[1];
            return (
              <div key={idx} className="flex items-start gap-2 ml-1 text-foreground font-medium mt-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{num}.</span>
                <span dangerouslySetInnerHTML={{ __html: formatInline(itemText) }} />
              </div>
            );
          }
          if (line.trim() === "") {
            return <div key={idx} className="h-1" />;
          }
          return (
            <p key={idx} className="text-foreground/90" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
          );
        })}
      </div>
    );
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-foreground'>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em class='text-muted-foreground'>$1</em>")
      .replace(/`(.*?)`/g, "<code class='px-1 py-0.5 rounded bg-muted text-[11px] font-mono text-emerald-600 dark:text-emerald-400'>$1</code>");
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-50">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 border border-emerald-500/40"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300" />
            </span>
            <Sparkles className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
            <span className="text-xs md:text-sm font-semibold tracking-wide">
              AYUSH AI Assistant
            </span>
          </button>
        </div>
      )}

      {/* Assistant Modal / Drawer */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-background border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ${
            isExpanded
              ? "bottom-4 right-4 w-[calc(100vw-2rem)] md:w-[700px] h-[85vh]"
              : "bottom-4 right-4 w-[calc(100vw-2rem)] md:w-[460px] h-[640px]"
          }`}
        >
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white flex items-center justify-between border-b border-emerald-700/50">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold truncate">SkillBridge AYUSH Assistant</h3>
                  <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30 text-[10px] py-0 px-1.5 font-mono">
                    AI Active
                  </Badge>
                </div>
                <p className="text-[11px] text-emerald-200/80 truncate">
                  Authoritative Readiness & Competency Advisor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="p-1.5 text-emerald-200/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                title={isExpanded ? "Collapse view" : "Expand view"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-200/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                title="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel / Pills */}
          <div className="px-3 py-2 bg-muted/40 border-b border-border/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-500" /> Suggestions:
            </span>
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isLoading}
                onClick={() => handleSendMessage(prompt)}
                className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-card hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-foreground hover:text-emerald-700 dark:hover:text-emerald-300 border border-border/80 hover:border-emerald-500/40 transition-all active:scale-95 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-background">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3 md:p-3.5 shadow-sm text-xs md:text-sm ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-xs"
                      : "bg-muted/60 text-foreground border border-border/70 rounded-bl-xs"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <div>
                      {renderFormattedMarkdown(msg.text)}

                      {/* Grounded Citation Badges */}
                      {msg.answer?.contextCitations && (
                        <div className="mt-3 pt-2.5 border-t border-border/50 flex flex-wrap gap-1.5 items-center">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground mr-1">
                            Verified Basis:
                          </span>
                          <Badge variant="outline" className="text-[10px] py-0 bg-background/50">
                            <Compass className="w-3 h-3 mr-1 text-emerald-500" />
                            {msg.answer.contextCitations.targetRole}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`text-[10px] py-0 ${
                              msg.answer.contextCitations.readinessScore >= 80
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-400/30"
                                : "bg-amber-500/10 text-amber-600 border-amber-400/30"
                            }`}
                          >
                            <Award className="w-3 h-3 mr-1" />
                            {msg.answer.contextCitations.readinessScore}% ({msg.answer.contextCitations.readinessLevel})
                          </Badge>
                          {msg.answer.contextCitations.pendingReviewsCount > 0 && (
                            <Badge variant="outline" className="text-[10px] py-0 bg-sky-500/10 text-sky-600 border-sky-400/30">
                              <FileCheck className="w-3 h-3 mr-1" />
                              {msg.answer.contextCitations.pendingReviewsCount} Review Pending
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Suggested Next Actions */}
                      {msg.answer?.suggestedNextActions && msg.answer.suggestedNextActions.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-border/40 flex flex-wrap gap-1.5">
                          {msg.answer.suggestedNextActions.map((action, aIdx) => (
                            <button
                              key={aIdx}
                              type="button"
                              onClick={() => handleSendMessage(action)}
                              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-1 transition-colors"
                            >
                              <span>{action}</span>
                              <ChevronRight className="w-2.5 h-2.5" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 bg-muted/40 rounded-xl border border-border/60 max-w-[70%]">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs text-muted-foreground font-medium">
                  Synthesizing authoritative AYUSH data...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Platform Links */}
          <div className="px-3 py-1.5 bg-muted/20 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Supabase Source-of-Truth
            </span>
            <div className="flex items-center gap-2 font-medium">
              <Link href="/student/skill-gap" className="hover:text-emerald-600 transition-colors">
                Skill Gaps →
              </Link>
              <Link href="/student/learning" className="hover:text-emerald-600 transition-colors">
                Learning →
              </Link>
              <Link href="/student/opportunities" className="hover:text-emerald-600 transition-colors">
                Opportunities →
              </Link>
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputQuery);
            }}
            className="p-3 bg-background border-t border-border flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              disabled={isLoading}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about your gaps, readiness, interventions, or jobs..."
              className="flex-1 bg-muted/50 border border-input rounded-xl px-3 py-2 text-xs md:text-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
            />
            <Button
              type="submit"
              size="sm"
              disabled={isLoading || !inputQuery.trim()}
              className="rounded-xl px-3 bg-emerald-700 hover:bg-emerald-800 text-white shrink-0"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
