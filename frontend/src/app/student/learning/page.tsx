"use client";

import { StudentPlaceholderView } from "@/components/student/student-placeholder-view";

export default function LearningPage() {
  return (
    <StudentPlaceholderView
      title="Learning Tracks & Faculty Mentoring"
      section="Development"
      description="Access hands-on bridge courses, semester elective enhancements, and 1-on-1 faculty guidance tailored to resolve identified gaps."
      unlockPrerequisite="Complete Interest Finder and review your initial competency overview."
      upcomingFeatures={[
        "Interactive lab exercises with automated grading",
        "Faculty office hours and mentoring session booking",
        "Peer study cohorts within your academic department",
        "Project-based milestones with code review",
      ]}
    />
  );
}
