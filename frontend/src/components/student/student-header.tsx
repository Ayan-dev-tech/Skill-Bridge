"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { GlobalHeader } from "@/components/navigation/global-header";
import { StudentProfileData, defaultStudentProfile } from "@/lib/student-data";

interface StudentHeaderProps {
  onOpenMobile?: () => void;
  profile?: StudentProfileData;
}

const pageTitles: Record<string, { section: string; title: string }> = {
  "/student": { section: "Main", title: "Student Dashboard" },
  "/student/dashboard": { section: "Main", title: "Student Dashboard" },
  "/student/document-verification": { section: "Student Portal", title: "Document Submission" },
  "/student/interest-finder": { section: "Getting Started", title: "Interest Finder" },
  "/student/knowledge-testing": { section: "Getting Started", title: "Knowledge Testing" },
  "/student/documents": { section: "Getting Started", title: "Document Verification" },
  "/student/skill-gap": { section: "Development", title: "Skill Gap & Suggestions" },
  "/student/learning": { section: "Development", title: "Learning / Mentoring" },
  "/student/resume": { section: "Development", title: "Resume Checker" },
  "/student/resume-checker": { section: "Development", title: "Resume Checker" },
  "/student/opportunities": { section: "Opportunities", title: "Jobs & Internships" },
  "/student/jobs": { section: "Opportunities", title: "Jobs & Internships" },
  "/student/applications": { section: "Opportunities", title: "Track Applications" },
  "/student/profile": { section: "Account", title: "Student Profile" },
  "/student/settings": { section: "Account", title: "Account Settings" },
  "/student/about": { section: "Information", title: "About Skill Bridge" },
};

export function StudentHeader({
  onOpenMobile,
  profile = defaultStudentProfile,
}: StudentHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const currentMeta = pageTitles[pathname] || {
    section: "Student Portal",
    title: "Overview",
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("skill_bridge_user");
      sessionStorage.removeItem("skill_bridge_admin");
    }
    router.push("/");
  };

  return (
    <GlobalHeader
      portal="student"
      breadcrumb={currentMeta}
      user={{
        name: profile.fullName,
        meta: profile.semester ? `Sem ${profile.semester}` : undefined,
        email: profile.email,
        avatarUrl: profile.photoUrl,
      }}
      onOpenMobile={onOpenMobile}
      onLogout={handleLogout}
      notificationsCount={1}
      notificationItems={[
        {
          id: "notif-student-1",
          title: "Account Active",
          message: "Welcome to Skill Bridge. Complete your required milestones to progress.",
        },
      ]}
    />
  );
}
