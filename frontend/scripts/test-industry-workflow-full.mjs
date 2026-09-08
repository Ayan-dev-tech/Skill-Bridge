import { db } from "../src/lib/db.ts";

async function runTest() {
  console.log("=== STARTING FULL INDUSTRY RECRUITMENT WORKFLOW E2E TEST ===");

  const timestamp = Date.now();
  const testIndustryUser = `ind_tester_${timestamp}`;
  const testStudentUser = `stud_tester_${timestamp}`;
  const competitorIndustryUser = `ind_competitor_${timestamp}`;

  // 1. Create a live Industry Hiring Post
  console.log("\n--- STEP 1: Industry creates and publishes hiring post ---");
  const postInput = {
    roleTitle: `Senior AI Platform Engineer ${timestamp}`,
    hiringType: "Full-time",
    industryDomain: "Artificial Intelligence",
    workMode: "Hybrid",
    location: "Bengaluru, India",
    openings: 2,
    experienceRequirement: "Mid-Senior Level",
    requiredSkills: ["Python", "PyTorch", "Kubernetes", "FastAPI"],
    preferredSkills: ["Docker", "Terraform"],
    responsibilities: [
      "Architect and scale distributed inference clusters.",
      "Collaborate with security and product teams on AI governance."
    ],
    requiredQualifications: [
      "B.Tech/M.Tech in CS or related quantitative discipline.",
      "3+ years experience designing cloud AI pipelines."
    ],
    salaryRange: "₹22,00,000 - ₹35,00,000 / year",
    description: "Architect and scale distributed inference clusters with low latency and robust fault tolerance.",
    status: "published",
    knowledgeTest: {
      enabled: true,
      testTitle: "AI Platform Screening Assessment",
      passingPercentage: 70,
      timeLimitMinutes: 45,
    }
  };

  const createdPost = await db.createIndustryHiringPost(testIndustryUser, "Apex AI Systems", postInput);
  console.log(`✓ Created post id: ${createdPost.id}, status: ${createdPost.status}`);

  // 2. Verify visibility in Student Available Jobs and Admin Overview
  console.log("\n--- STEP 2: Verify Student and Admin visibility ---");
  const studentJobs = await db.getAvailableJobs();
  const foundInStudent = studentJobs.find((j) => j.id === createdPost.id);
  if (!foundInStudent) {
    throw new Error("Created hiring post NOT visible in student available jobs!");
  }
  console.log(`✓ Verified post in Student Available Jobs: ${foundInStudent.roleTitle} (${foundInStudent.companyName})`);

  const adminOverview = await db.getAdminOverview();
  const foundInAdmin = (adminOverview.industryHiringPosts || []).find((p) => p.id === createdPost.id);
  if (!foundInAdmin) {
    throw new Error("Created hiring post NOT visible in Admin Overview!");
  }
  console.log(`✓ Verified post in Admin Overview: ${foundInAdmin.roleTitle}`);

  // 3. Student applies for the post
  console.log("\n--- STEP 3: Student submits application ---");
  const now = new Date().toISOString();
  const applicationToSave = {
    id: `app_${timestamp}_123`,
    studentId: testStudentUser,
    jobId: createdPost.id,
    companyName: createdPost.companyName,
    roleTitle: createdPost.roleTitle,
    location: createdPost.location,
    employmentType: createdPost.hiringType,
    salaryRange: createdPost.salaryRange,
    status: "applied",
    appliedAt: now,
    updatedAt: now,
    timeline: [
      {
        id: `ev_${timestamp}`,
        status: "applied",
        title: "Application Submitted",
        description: "Application submitted for review.",
        timestamp: now,
      }
    ],
    applicantFullName: "Aarav Sharma",
    applicantEmail: `aarav.${timestamp}@example.com`,
    applicantPhone: "+91 9876543210",
    coverLetter: "Passionate about high-throughput ML systems and scalable infrastructure.",
  };

  const studentApplication = await db.saveJobApplication(testStudentUser, applicationToSave);
  console.log(`✓ Application created id: ${studentApplication.id}, status: ${studentApplication.status}`);

  // 4. Industry fetches applications & verifies multi-tenant isolation
  console.log("\n--- STEP 4: Screening & Multi-tenant isolation ---");
  const industryApps = await db.getIndustryApplications(testIndustryUser, createdPost.id);
  const myApp = industryApps.find((a) => a.id === studentApplication.id);
  if (!myApp) {
    throw new Error("Application not found in Industry applications list!");
  }
  console.log(`✓ Verified application received by posting company: ${myApp.applicantFullName || myApp.applicantName}`);

  // Competitor isolation test
  const competitorApps = await db.getIndustryApplications(competitorIndustryUser, createdPost.id);
  if (competitorApps.length > 0) {
    throw new Error("Security breach: Competitor industry user saw another company's applications!");
  }
  console.log("✓ Multi-tenant check PASSED: Competitor company cannot access applicant data.");

  // 5. Screening Decision: Shortlist
  console.log("\n--- STEP 5: Screening Action (Shortlisting candidate) ---");
  const screenedApp = await db.updateApplicationScreening(
    testIndustryUser,
    studentApplication.id,
    "shortlisted",
    "Candidate demonstrates strong distributed systems fundamentals and good academic track record."
  );
  if (screenedApp.screeningStatus !== "shortlisted") {
    throw new Error(`Expected screeningStatus 'shortlisted' but got ${screenedApp.screeningStatus}`);
  }
  console.log(`✓ Candidate screeningStatus updated to: ${screenedApp.screeningStatus}, overall status: ${screenedApp.status}, internal notes recorded.`);

  // 6. Interview & Evaluation
  console.log("\n--- STEP 6: Schedule & Log Interview Round ---");
  const scheduledTime = new Date(Date.now() + 86400000).toISOString(); // tomorrow
  const interviewedApp = await db.updateApplicationInterview(testIndustryUser, studentApplication.id, {
    roundName: "Technical Systems Deep-Dive",
    scheduledAt: scheduledTime,
    meetingLinkOrLocation: "https://meet.skillbridge.edu/interview-ai-platform",
    mode: "Virtual",
    score: 88,
    evaluationCriteria: "Exemplary understanding of distributed caching and Python concurrency.",
    feedback: "Strong candidate with articulate answers on distributed bottleneck mitigations.",
    decision: "passed"
  });

  if (interviewedApp.status !== "interview") {
    throw new Error(`Expected status 'interview' but got ${interviewedApp.status}`);
  }
  if (!interviewedApp.interviewRounds || interviewedApp.interviewRounds.length === 0) {
    throw new Error("Interview round was not persisted!");
  }
  console.log(`✓ Interview round '${interviewedApp.interviewRounds[0].roundName}' logged with score: ${interviewedApp.interviewRounds[0].score}`);

  // 7. Student checks their application status and interview details
  console.log("\n--- STEP 7: Student verifies interview schedule and status ---");
  const studentViewApps = await db.getJobApplicationsByStudent(testStudentUser);
  const studentApp = studentViewApps.find((a) => a.id === studentApplication.id);
  if (!studentApp || studentApp.status !== "interview") {
    throw new Error(`Student portal does not reflect updated 'interview' status, got ${studentApp?.status}`);
  }
  if (!studentApp.interviewRounds || studentApp.interviewRounds.length === 0) {
    throw new Error("Student cannot see scheduled interview details!");
  }
  console.log(`✓ Student successfully sees interview schedule: ${studentApp.interviewRounds[0].scheduledAt} at ${studentApp.interviewRounds[0].meetingLinkOrLocation}`);

  // 8. Final Hiring & Offer Issuance
  console.log("\n--- STEP 8: Final Selection & Offer ---");
  const finalizedApp = await db.updateFinalHiringDecision(
    testIndustryUser,
    studentApplication.id,
    "selected",
    {
      offeredRole: "Senior AI Platform Engineer",
      offeredCompensation: "₹28,00,000 / year",
      startDate: "2026-10-15",
      notes: "We are delighted to extend an offer for Senior AI Platform Engineer. Relocation allowance included."
    }
  );

  if (finalizedApp.status !== "selected") {
    throw new Error(`Expected status 'selected', got ${finalizedApp.status}`);
  }
  console.log(`✓ Final hiring decision 'selected' persisted. Offer: ${finalizedApp.offerDetails?.offeredCompensation}`);

  // 9. Student Profile Integration: Verify Acquired Opportunities
  console.log("\n--- STEP 9: Student Profile Acquired Opportunities Verification ---");
  const studentProfile = await db.getProfile(testStudentUser);
  if (!studentProfile) {
    throw new Error("Student profile could not be loaded!");
  }
  const acquired = studentProfile.metadata?.acquiredOpportunities || [];
  const acquiredMatch = acquired.find((opp) => opp.applicationId === studentApplication.id);
  if (!acquiredMatch) {
    throw new Error("Acquired opportunity was NOT automatically linked to the student profile!");
  }
  console.log(`✓ Acquired opportunity found on student profile:
    Role: ${acquiredMatch.roleTitle}
    Company: ${acquiredMatch.companyName}
    Status: ${acquiredMatch.status}
    Compensation: ${acquiredMatch.compensation}
    Start Date: ${acquiredMatch.startDate}`);

  console.log("\n=======================================================");
  console.log("🎉 ALL INDUSTRY WORKFLOW E2E TESTS PASSED SUCCESSFULLY!");
  console.log("=======================================================");
}

runTest().catch((err) => {
  console.error("\n❌ E2E TEST FAILED:", err);
  process.exit(1);
});
