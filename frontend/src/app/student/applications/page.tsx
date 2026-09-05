"use client";

import { StudentPlaceholderView } from "@/components/student/student-placeholder-view";

export default function ApplicationsPage() {
  return (
    <StudentPlaceholderView
      title="Application Tracker & Interview Telemetry"
      section="Opportunities"
      workflowStep={7}
      description="Monitor recruitment stages in real time: document audits, coding interview invitations, technical rounds, and offer letters."
      unlockPrerequisite="Submissions will automatically appear here once you apply to campus or industry opportunities in Stage 6."
      upcomingFeatures={[
        "Real-time status updates (Applied, Shortlisted, Interview, Offered)",
        "Calendar synchronization for technical evaluation interviews",
        "Direct feedback and benchmark score insights from recruiters",
        "Offer acceptance and joining documentation workspace",
      ]}
    />
  );
}
