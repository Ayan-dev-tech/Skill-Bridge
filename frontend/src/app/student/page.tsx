"use client";

import { InterestDiscoveryContainer } from "@/components/student/interest-finder/interest-discovery-container";

export default function StudentRootPage() {
  // According to Skill Bridge workflow: Student -> Login -> Interest Finder
  // First meaningful screen is the adaptive Interest Finder discovery engine.
  return <InterestDiscoveryContainer />;
}
