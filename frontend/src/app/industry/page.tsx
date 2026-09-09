"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlobalHeader } from "@/components/navigation/global-header";
import { IndustrySidebar, IndustryViewType } from "@/components/industry/industry-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IndustryDashboardView } from "@/components/industry/views/industry-dashboard-view";
import { IndustryProfileView } from "@/components/industry/views/industry-profile-view";
import { StudentDataAccessView } from "@/components/industry/views/student-data-access-view";
import { QuestionBankView } from "@/components/industry/views/question-bank-view";
import { HiringManagementView } from "@/components/industry/views/hiring-management-view";
import { ApplicationScreeningView } from "@/components/industry/views/application-screening-view";
import { InterviewEvaluationView } from "@/components/industry/views/interview-evaluation-view";
import { FinalHiringAnalyticsView } from "@/components/industry/views/final-hiring-analytics-view";

function IndustryPortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Navigation State
  const initialView = (searchParams.get("view") as IndustryViewType) || "dashboard";
  const [currentView, setCurrentView] = React.useState<IndustryViewType>(initialView);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  // User State
  const [user, setUser] = React.useState({
    name: "Corporate Talent Lead",
    meta: "Industry Partner",
    email: "recruiter@company.com",
  });

  const [questionsCount, setQuestionsCount] = React.useState<number>(0);

  // Load user session and question count
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("skill_bridge_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.fullName || parsed.email) {
            setUser({
              name: parsed.fullName || "Corporate Talent Lead",
              meta: parsed.companyName || "Industry Partner",
              email: parsed.email || "recruiter@company.com",
            });
          }
        } catch {
          // ignore
        }
      }
    }

    // Fetch question count for sidebar badge
    fetch("/api/industry/question-bank")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && typeof data.count === "number") {
          setQuestionsCount(data.count);
        }
      })
      .catch(() => {});
  }, []);

  // Update view from searchParams if user navigates back/forward
  React.useEffect(() => {
    const v = searchParams.get("view") as IndustryViewType;
    if (
      v &&
      [
        "dashboard",
        "profile",
        "hiring",
        "screening",
        "interview",
        "analytics",
        "students",
        "question-bank",
      ].includes(v)
    ) {
      setCurrentView(v);
    }
  }, [searchParams]);

  const handleSelectView = (view: IndustryViewType) => {
    setCurrentView(view);
    const url = new URL(window.location.href);
    url.searchParams.set("view", view);
    window.history.pushState({}, "", url.toString());
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("skill_bridge_user");
      sessionStorage.removeItem("skill_bridge_admin");
    }
    router.push("/");
  };

  const getBreadcrumbTitle = () => {
    switch (currentView) {
      case "dashboard":
        return "Operational Dashboard";
      case "hiring":
        return "Hiring & Post Configuration";
      case "screening":
        return "Application Screening";
      case "interview":
        return "Interview & Evaluation";
      case "analytics":
        return "Final Hiring & Analytics";
      case "profile":
        return "Company Profile";
      case "students":
        return "Student Talent Discovery";
      case "question-bank":
        return "Question Bank";
      default:
        return "Industry Portal";
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="h-screen flex flex-col w-full bg-background text-foreground select-none overflow-hidden">
        {/* Global Header */}
        <GlobalHeader
          portal="industry"
          breadcrumb={{
            section: "Corporate",
            title: getBreadcrumbTitle(),
          }}
          user={user}
          onLogout={handleLogout}
          notificationsCount={1}
          notificationItems={[
            {
              id: "notif-ind-1",
              title: "Authorized Partner",
              message: "Direct campus recruitment and student discovery verified.",
              time: "Active",
            },
          ]}
        />

        <div className="flex-1 flex w-full min-h-0 overflow-hidden">
          {/* Sidebar */}
          <IndustrySidebar
            currentView={currentView}
            onSelectView={handleSelectView}
            questionsCount={questionsCount}
          />

          {/* Main Content Area with Clean ScrollArea */}
          <SidebarInset className="flex-1 min-w-0 h-full p-0 border-0 overflow-hidden">
            <ScrollArea className="size-full">
              <div className="p-4 md:p-8 min-w-0 max-w-7xl mx-auto space-y-6">
                {currentView === "dashboard" && (
                  <IndustryDashboardView onNavigate={handleSelectView} />
                )}

                {currentView === "hiring" && (
                  <HiringManagementView
                    onNavigateToQuestionBank={() => handleSelectView("question-bank")}
                    onNavigateToScreening={() => handleSelectView("screening")}
                  />
                )}

                {currentView === "screening" && (
                  <ApplicationScreeningView onNavigateToInterviews={() => handleSelectView("interview")} />
                )}

                {currentView === "interview" && (
                  <InterviewEvaluationView onNavigateToFinalDecision={() => handleSelectView("analytics")} />
                )}

                {currentView === "analytics" && <FinalHiringAnalyticsView />}

                {currentView === "profile" && <IndustryProfileView />}

                {currentView === "students" && <StudentDataAccessView />}

                {currentView === "question-bank" && <QuestionBankView />}
              </div>
            </ScrollArea>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function IndustryPortalPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-xs">
          Loading Industry Portal...
        </div>
      }
    >
      <IndustryPortalContent />
    </React.Suspense>
  );
}

