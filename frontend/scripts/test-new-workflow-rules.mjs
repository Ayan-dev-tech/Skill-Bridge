/**
 * Skill Bridge — Workflow & Gating Verification Test Suite
 * Validates all 20 test requirements specified in the Product Requirements.
 */

import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";

const DB_PATH = path.join(process.cwd(), "data", "skill_bridge.json");

function readDb() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function runTests() {
  console.log("==========================================================");
  console.log("SKILL BRIDGE — WORKFLOW & MODULE GATING TEST SUITE");
  console.log("==========================================================\n");

  const db = readDb();

  // Setup Test Students
  const newStudentId = "test_student_new_" + Date.now();
  const advancedStudentId = "test_student_adv_" + Date.now();
  const learningStudentId = "test_student_learn_" + Date.now();
  const studentBId = "test_student_b_" + Date.now();

  // Create accounts in DB
  const now = new Date().toISOString();
  const testStudents = [
    { id: newStudentId, email: `${newStudentId}@test.edu`, role: "student", fullName: "New Student", isVerified: true, createdAt: now, passwordHash: "h" },
    { id: advancedStudentId, email: `${advancedStudentId}@test.edu`, role: "student", fullName: "Advanced Student", isVerified: true, createdAt: now, passwordHash: "h" },
    { id: learningStudentId, email: `${learningStudentId}@test.edu`, role: "student", fullName: "Learning Student", isVerified: true, createdAt: now, passwordHash: "h" },
    { id: studentBId, email: `${studentBId}@test.edu`, role: "student", fullName: "Student B", isVerified: true, createdAt: now, passwordHash: "h" },
  ];

  for (const s of testStudents) {
    db.users.push(s);
  }

  // Setup Document Verification for test students
  const verifiedDocList = [
    { id: "d1", documentType: "student_id", originalFilename: "id.pdf", fileSize: 1024, mimeType: "application/pdf", storageKey: "k1", verificationStatus: "VERIFIED", uploadedAt: now },
    { id: "d2", documentType: "passport_photo", originalFilename: "photo.jpg", fileSize: 1024, mimeType: "image/jpeg", storageKey: "k2", verificationStatus: "VERIFIED", uploadedAt: now },
    { id: "d3", documentType: "post_graduation_marksheet", originalFilename: "marks.pdf", fileSize: 1024, mimeType: "application/pdf", storageKey: "k3", verificationStatus: "VERIFIED", uploadedAt: now },
    { id: "d4", documentType: "abc_id", originalFilename: "abc.pdf", fileSize: 1024, mimeType: "application/pdf", storageKey: "k4", verificationStatus: "VERIFIED", uploadedAt: now },
  ];

  db.studentVerifications.push({
    studentId: newStudentId,
    verificationStatus: "VERIFIED",
    verifiedAt: now,
    documents: verifiedDocList,
    createdAt: now,
    updatedAt: now,
  });

  db.studentVerifications.push({
    studentId: advancedStudentId,
    verificationStatus: "VERIFIED",
    verifiedAt: now,
    documents: verifiedDocList,
    createdAt: now,
    updatedAt: now,
  });

  db.studentVerifications.push({
    studentId: learningStudentId,
    verificationStatus: "VERIFIED",
    verifiedAt: now,
    documents: verifiedDocList,
    createdAt: now,
    updatedAt: now,
  });

  db.studentVerifications.push({
    studentId: studentBId,
    verificationStatus: "VERIFIED",
    verifiedAt: now,
    documents: verifiedDocList,
    createdAt: now,
    updatedAt: now,
  });

  // Setup Interest Profile & Knowledge Test for Advanced student
  db.interestProfiles.push({
    id: `ip_${advancedStudentId}`,
    studentId: advancedStudentId,
    confirmedMainDomainId: "security",
    confirmedMainDomain: "Cybersecurity",
    confirmedSpecificInterest: "Application Security & Vulnerability Assessment",
    confidence: 0.92,
    explanation: "High affinity for secure systems design.",
    confirmedAt: now,
  });

  // Advanced Knowledge Test Result (difficulty: "advanced", scorePercent: 90)
  db.knowledgeTestResults.push({
    id: `ktr_${advancedStudentId}`,
    sessionId: `sess_${advancedStudentId}`,
    studentId: advancedStudentId,
    domainId: "security",
    domainTitle: "Cybersecurity",
    specificInterest: "Application Security & Vulnerability Assessment",
    difficulty: "advanced",
    knowledgeLevel: "Advanced",
    score: 36,
    maxScore: 40,
    scorePercent: 90,
    totalQuestions: 10,
    correctCount: 9,
    performanceTier: "Expert",
    strengths: ["OWASP Top 10", "Threat Modeling", "Authentication Architecture"],
    weaknesses: ["Automated SAST Rule Authoring"],
    recommendations: ["Pursue production zero-trust deployments."],
    completedAt: now,
  });

  // Setup Interest Profile & Knowledge Test for Learning student (regular score)
  db.interestProfiles.push({
    id: `ip_${learningStudentId}`,
    studentId: learningStudentId,
    confirmedMainDomainId: "web",
    confirmedMainDomain: "Web Development",
    confirmedSpecificInterest: "Full-Stack Web Development",
    confidence: 0.85,
    explanation: "Front-to-back engineering enthusiast.",
    confirmedAt: now,
  });

  db.knowledgeTestResults.push({
    id: `ktr_${learningStudentId}`,
    sessionId: `sess_${learningStudentId}`,
    studentId: learningStudentId,
    domainId: "web",
    domainTitle: "Web Development",
    specificInterest: "Full-Stack Web Development",
    difficulty: "beginner",
    knowledgeLevel: "Foundational",
    score: 24,
    maxScore: 40,
    scorePercent: 60,
    totalQuestions: 10,
    correctCount: 6,
    performanceTier: "Moderate",
    strengths: ["HTML/CSS", "Basic JavaScript"],
    weaknesses: ["Microservices", "CI/CD"],
    recommendations: ["Review API security fundamentals."],
    completedAt: now,
  });

  // Skill Gap completed for Learning student
  db.skillGapAnalyses.push({
    id: `sga_${learningStudentId}`,
    studentId: learningStudentId,
    interestProfileId: `ip_${learningStudentId}`,
    knowledgeTestResultId: `ktr_${learningStudentId}`,
    domainId: "web",
    domainName: "Web Development",
    nicheId: "full-stack",
    nicheTitle: "Full-Stack Web Development",
    difficulty: "beginner",
    testScore: 24,
    testMaxScore: 40,
    testScorePercent: 60,
    knowledgeLevel: "Foundational",
    skillProfileVersion: "1.0",
    executiveSummary: "Identified need for database index tuning.",
    skillGaps: [],
    recommendations: [],
    aiGenerated: false,
    isStale: false,
    createdAt: now,
    updatedAt: now,
  });

  writeDb(db);

  // --------------------------------------------------------------------------
  // TEST 1: New student -> Resume Checker accessible
  // --------------------------------------------------------------------------
  console.log("TEST 1: New student -> Resume Checker accessible");
  const res1 = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/resume-checker`,
    { headers: { "x-student-id": newStudentId } }
  );
  const json1 = await res1.json();
  assert(json1.success, "Workflow status API returned success");
  assert(json1.routeCheck?.allowed === true, "Route /student/resume-checker is allowed for new student");

  // Check alias /student/resume
  const res1Alias = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/resume`,
    { headers: { "x-student-id": newStudentId } }
  );
  const json1Alias = await res1Alias.json();
  assert(json1Alias.routeCheck?.allowed === true, "Route alias /student/resume is allowed for new student");

  // --------------------------------------------------------------------------
  // TEST 2: New student -> Track Applications visible -> Empty state -> No fake applications
  // --------------------------------------------------------------------------
  console.log("\nTEST 2: New student -> Track Applications visible & empty state");
  const res2 = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/applications`,
    { headers: { "x-student-id": newStudentId } }
  );
  const json2 = await res2.json();
  assert(json2.routeCheck?.allowed === true, "Route /student/applications is allowed from the beginning");

  const res2Apps = await fetch(`${BASE_URL}/api/student/applications`, {
    headers: { "x-student-id": newStudentId },
  });
  const json2Apps = await res2Apps.json();
  assert(json2Apps.success === true, "Applications API returns success");
  assert(Array.isArray(json2Apps.applications), "Applications is an array");
  assert(json2Apps.applications.length === 0, "No fake applications present for new student (exactly 0)");

  // --------------------------------------------------------------------------
  // TEST 3: New student -> Jobs & Internships remains appropriately gated
  // --------------------------------------------------------------------------
  console.log("\nTEST 3: New student -> Jobs & Internships remains appropriately gated");
  const res3 = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/opportunities`,
    { headers: { "x-student-id": newStudentId } }
  );
  const json3 = await res3.json();
  assert(json3.routeCheck?.allowed === false, "Jobs & Internships is appropriately gated for new student");
  assert(json3.routeCheck?.redirectUrl === "/student/learning", "Redirects to /student/learning for non-eligible student");

  // Direct API gating
  const res3Api = await fetch(`${BASE_URL}/api/student/opportunities`, {
    headers: { "x-student-id": newStudentId },
  });
  assert(res3Api.status === 403, "API returns 403 Forbidden for non-eligible student");
  const json3Api = await res3Api.json();
  assert(json3Api.isLocked === true, "API explicitly responds isLocked: true");

  // --------------------------------------------------------------------------
  // TEST 4: Advanced verified student -> Jobs & Internships unlocked
  // --------------------------------------------------------------------------
  console.log("\nTEST 4: Advanced verified student -> Jobs & Internships unlocked");
  const res4 = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/opportunities`,
    { headers: { "x-student-id": advancedStudentId } }
  );
  const json4 = await res4.json();
  assert(json4.routeCheck?.allowed === true, "Jobs & Internships unlocked for Advanced verified student");
  assert(json4.workflow?.isAdvancedVerified === true, "Workflow flags isAdvancedVerified: true");

  const res4Jobs = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/jobs`,
    { headers: { "x-student-id": advancedStudentId } }
  );
  const json4Jobs = await res4Jobs.json();
  assert(json4Jobs.routeCheck?.allowed === true, "Jobs alias /student/jobs also unlocked for Advanced student");

  // API access for Advanced student
  const res4Api = await fetch(`${BASE_URL}/api/student/opportunities`, {
    headers: { "x-student-id": advancedStudentId },
  });
  assert(res4Api.status === 200, "API returns 200 OK for Advanced verified student");
  const json4Api = await res4Api.json();
  assert(json4Api.success === true, "Opportunities API returns success");
  assert(json4Api.isAdvancedVerified === true, "API confirms isAdvancedVerified: true");
  assert(Array.isArray(json4Api.jobs) && json4Api.jobs.length > 0, "Returns real available jobs");

  // --------------------------------------------------------------------------
  // TEST 5: Advanced verified student -> Track Applications accessible
  // --------------------------------------------------------------------------
  console.log("\nTEST 5: Advanced verified student -> Track Applications accessible");
  const res5 = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/applications`,
    { headers: { "x-student-id": advancedStudentId } }
  );
  const json5 = await res5.json();
  assert(json5.routeCheck?.allowed === true, "Track Applications is accessible for Advanced student");

  // --------------------------------------------------------------------------
  // TEST 6: Student reaches Learning stage -> downstream career modules unlock
  // --------------------------------------------------------------------------
  console.log("\nTEST 6: Student reaches Learning stage -> downstream modules unlock");
  const res6 = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/opportunities`,
    { headers: { "x-student-id": learningStudentId } }
  );
  const json6 = await res6.json();
  assert(json6.workflow?.isSkillGapCompleted === true, "Student has reached Learning stage (skill gap completed)");
  assert(json6.routeCheck?.allowed === true, "Reaching Learning stage unlocks downstream Jobs & Internships");

  const res6Api = await fetch(`${BASE_URL}/api/student/opportunities`, {
    headers: { "x-student-id": learningStudentId },
  });
  assert(res6Api.status === 200, "Opportunities API allows access once Learning stage is unlocked");

  // --------------------------------------------------------------------------
  // TEST 7: Non-Advanced student tries direct Jobs URL before required stage -> access denied / redirected
  // --------------------------------------------------------------------------
  console.log("\nTEST 7: Non-Advanced student tries direct Jobs URL before required stage");
  const res7 = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/opportunities`,
    { headers: { "x-student-id": newStudentId } }
  );
  const json7 = await res7.json();
  assert(json7.routeCheck?.allowed === false, "Direct URL access denied for student not yet reaching stage");
  assert(json7.routeCheck?.redirectUrl === "/student/learning", "Redirected to /student/learning");

  // --------------------------------------------------------------------------
  // TEST 8: Resume Checker with no resume -> clean empty state
  // --------------------------------------------------------------------------
  console.log("\nTEST 8: Resume Checker with no resume -> clean empty state");
  const res8 = await fetch(`${BASE_URL}/api/student/resume/analyze`, {
    headers: { "x-student-id": newStudentId },
  });
  const json8 = await res8.json();
  assert(json8.success === true, "Resume GET API responds successfully");
  assert(json8.hasAnalysis === false, "hasAnalysis is false for new student");
  assert(json8.analysis === null, "analysis object is null (no fake analysis)");

  // --------------------------------------------------------------------------
  // TEST 9: Resume uploaded without job description -> general ATS-style analysis
  // --------------------------------------------------------------------------
  console.log("\nTEST 9: Resume uploaded without job description -> general ATS-style analysis");
  const generalResume = `
    Alex Mercer
    Email: alex.mercer@institution.edu
    Phone: +91 98765 43210
    GitHub: github.com/alexmercer
    LinkedIn: linkedin.com/in/alexmercer

    Professional Summary
    Dedicated Software Engineer with hands-on experience developing microservices and full-stack web applications.
    Passionate about robust backend architecture and scalable cloud infrastructure.

    Education
    Bachelor of Technology in Computer Science & Engineering
    State University, CGPA: 8.8 / 10.0 (2022 - 2026)

    Technical Skills
    Languages: TypeScript, JavaScript, Python, SQL, C++
    Frameworks & Tools: React, Next.js, Node.js, Express, Docker, PostgreSQL, Redis, Git, Linux, REST API

    Experience & Projects
    Full-Stack Developer Intern | NexusScale Technologies (June 2025 - August 2025)
    - Architected and deployed responsive dashboard microservices using Next.js, TypeScript, and PostgreSQL.
    - Optimized database query latency by 42% through strategic index creation and query caching with Redis.
    - Automated unit testing pipelines using GitHub Actions and Jest, achieving 88% test coverage.

    Campus Placement Portal Project
    - Engineered authentication middleware using JWT and bcrypt, securing student records against unauthorized tampering.
    - Implemented real-time status telemetry webhooks for campus placement coordinators.
  `;

  const res9 = await fetch(`${BASE_URL}/api/student/resume/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-student-id": newStudentId,
    },
    body: JSON.stringify({ resumeText: generalResume }),
  });
  const json9 = await res9.json();
  assert(json9.success === true, "ATS analysis completed successfully");
  assert(json9.analysis.overallScore >= 50 && json9.analysis.overallScore <= 100, "Calculated valid overall score");
  assert(json9.analysis.categoryScores.jobMatch === null, "jobMatch is null when no job description supplied");
  assert(json9.analysis.categoryScores.parseability > 70, "High parseability score for well-formatted resume");
  assert(json9.analysis.matchedKeywords.length > 5, "Extracted genuine technical keywords");
  assert(typeof json9.analysis.disclaimer === "string", "Includes explicit ATS diagnostic disclaimer");

  // --------------------------------------------------------------------------
  // TEST 10: Resume + job description -> job-specific analysis
  // --------------------------------------------------------------------------
  console.log("\nTEST 10: Resume + job description -> job-specific analysis");
  const jobDescription = `
    CloudArmor Defense Labs is looking for an Associate Security Operations Engineer.
    Required skills: OWASP Top 10, Python, Linux, Network Security, SIEM, Docker, Cryptography.
    Responsibilities: Triage security incidents, develop automated audit scripts, and harden microservices.
  `;

  const res10 = await fetch(`${BASE_URL}/api/student/resume/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-student-id": advancedStudentId,
    },
    body: JSON.stringify({
      resumeText: generalResume,
      jobDescription,
      targetRole: "Associate Security Operations Engineer",
    }),
  });
  const json10 = await res10.json();
  assert(json10.success === true, "Job-specific ATS analysis completed successfully");
  assert(typeof json10.analysis.categoryScores.jobMatch === "number", "Calculated numeric jobMatch score when JD is supplied");
  assert(json10.analysis.hasJobDescription === true, "Analysis record flags hasJobDescription: true");
  assert(json10.analysis.missingKeywords.length > 0, "Identifies missing skills from job description");

  // --------------------------------------------------------------------------
  // TEST 11: ATS analysis fails -> clear retry/error state -> no fake score
  // --------------------------------------------------------------------------
  console.log("\nTEST 11: ATS analysis fails -> clear retry/error state -> no fake score");
  const res11 = await fetch(`${BASE_URL}/api/student/resume/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-student-id": newStudentId,
    },
    body: JSON.stringify({ resumeText: "  " }),
  });
  assert(res11.status === 400, "Returns 400 Bad Request for empty resume text");
  const json11 = await res11.json();
  assert(json11.success === false, "success is false on error");
  assert(!json11.analysis, "No fake analysis object or score returned");
  assert(typeof json11.error === "string", "Returns clear error explanation");

  // --------------------------------------------------------------------------
  // TEST 12: Student A attempts to access Student B's resume analysis -> denied
  // --------------------------------------------------------------------------
  console.log("\nTEST 12: Student A attempts to access Student B's resume analysis -> denied");
  // Student B requests analysis
  const res12 = await fetch(`${BASE_URL}/api/student/resume/analyze`, {
    headers: { "x-student-id": studentBId },
  });
  const json12 = await res12.json();
  // Student B should have null analysis, NOT newStudentId's analysis!
  assert(json12.success === true, "API call succeeds for Student B");
  assert(json12.analysis === null, "Student B cannot see Student A's resume analysis");

  // --------------------------------------------------------------------------
  // TEST 13: Student A attempts to access Student B's applications -> denied
  // --------------------------------------------------------------------------
  console.log("\nTEST 13: Student A attempts to access Student B's applications -> denied");
  // Submit an application for Student A (advancedStudentId)
  await fetch(`${BASE_URL}/api/student/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-student-id": advancedStudentId,
    },
    body: JSON.stringify({
      jobId: "job-sec-01",
      companyName: "CloudArmor Defense Labs",
      roleTitle: "Associate Security Operations Engineer",
      location: "Bengaluru, India",
    }),
  });

  // Verify Student B sees 0 applications
  const res13 = await fetch(`${BASE_URL}/api/student/applications`, {
    headers: { "x-student-id": studentBId },
  });
  const json13 = await res13.json();
  assert(json13.applications.length === 0, "Student B sees 0 applications (isolated from Student A)");

  // --------------------------------------------------------------------------
  // TEST 14: Advanced status updated in database -> access reflects authoritative database state
  // --------------------------------------------------------------------------
  console.log("\nTEST 14: Advanced status updated in database -> reflects authoritative state");
  const testStudent14Id = "test_student_14_" + Date.now();
  const db14 = readDb();
  db14.users.push({ id: testStudent14Id, email: `${testStudent14Id}@test.edu`, role: "student", fullName: "Student 14", isVerified: true, createdAt: now, passwordHash: "h" });
  db14.studentVerifications.push({ studentId: testStudent14Id, verificationStatus: "VERIFIED", verifiedAt: now, documents: verifiedDocList, createdAt: now, updatedAt: now });
  db14.interestProfiles.push({ id: `ip_${testStudent14Id}`, studentId: testStudent14Id, confirmedMainDomainId: "cloud", confirmedMainDomain: "Cloud", confirmedSpecificInterest: "Cloud Platform", confidence: 0.8, explanation: "e", confirmedAt: now });
  // Initially regular score
  db14.knowledgeTestResults.push({
    id: `ktr_${testStudent14Id}`,
    sessionId: `s_${testStudent14Id}`,
    studentId: testStudent14Id,
    domainId: "cloud",
    domainTitle: "Cloud",
    specificInterest: "Cloud Platform",
    difficulty: "beginner",
    knowledgeLevel: "Foundational",
    score: 20,
    maxScore: 40,
    scorePercent: 50,
    totalQuestions: 10,
    correctCount: 5,
    performanceTier: "Foundational",
    strengths: [],
    weaknesses: [],
    recommendations: [],
    completedAt: now,
  });
  writeDb(db14);

  // Check: initially gated
  const res14Before = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/opportunities`,
    { headers: { "x-student-id": testStudent14Id } }
  );
  const json14Before = await res14Before.json();
  assert(json14Before.routeCheck?.allowed === false, "Initially locked before advanced status");

  // Upgrade to Advanced verified in DB
  const db14Updated = readDb();
  const resIndex = db14Updated.knowledgeTestResults.findIndex(r => r.studentId === testStudent14Id);
  db14Updated.knowledgeTestResults[resIndex].difficulty = "advanced";
  db14Updated.knowledgeTestResults[resIndex].scorePercent = 88;
  db14Updated.knowledgeTestResults[resIndex].performanceTier = "Expert";
  writeDb(db14Updated);

  // Check again: immediately unlocked from authoritative DB state
  const res14After = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/opportunities`,
    { headers: { "x-student-id": testStudent14Id } }
  );
  const json14After = await res14After.json();
  assert(json14After.workflow?.isAdvancedVerified === true, "Database now reflects isAdvancedVerified: true");
  assert(json14After.routeCheck?.allowed === true, "Jobs & Internships unlocked immediately based on authoritative DB update");

  // --------------------------------------------------------------------------
  // TEST 15: Mobile layout -> no horizontal overflow check
  // --------------------------------------------------------------------------
  console.log("\nTEST 15: Mobile layout class check");
  const resumePageContent = fs.readFileSync(path.join(process.cwd(), "src", "app", "student", "resume-checker", "page.tsx"), "utf-8");
  const oppPageContent = fs.readFileSync(path.join(process.cwd(), "src", "app", "student", "opportunities", "page.tsx"), "utf-8");
  const appPageContent = fs.readFileSync(path.join(process.cwd(), "src", "app", "student", "applications", "page.tsx"), "utf-8");

  assert(resumePageContent.includes("max-w-5xl mx-auto") && resumePageContent.includes("px-4"), "Resume checker page uses responsive container constraints");
  assert(oppPageContent.includes("max-w-5xl mx-auto") && oppPageContent.includes("px-4"), "Opportunities page uses responsive container constraints");
  assert(appPageContent.includes("max-w-5xl mx-auto") && appPageContent.includes("px-4"), "Applications page uses responsive container constraints");

  // --------------------------------------------------------------------------
  // TEST 16: Resume Builder references replaced with Resume Checker
  // --------------------------------------------------------------------------
  console.log("\nTEST 16: Resume Builder references replaced with Resume Checker");
  const sidebarContent = fs.readFileSync(path.join(process.cwd(), "src", "components", "student", "student-sidebar.tsx"), "utf-8");
  const headerContent = fs.readFileSync(path.join(process.cwd(), "src", "components", "student", "student-header.tsx"), "utf-8");
  const footerContent = fs.readFileSync(path.join(process.cwd(), "src", "components", "student", "student-footer.tsx"), "utf-8");
  const studentDataContent = fs.readFileSync(path.join(process.cwd(), "src", "lib", "student-data.ts"), "utf-8");

  assert(!sidebarContent.includes("Resume Builder") && sidebarContent.includes("Resume Checker"), "Sidebar updated to Resume Checker");
  assert(!headerContent.includes("Resume Builder") && headerContent.includes("Resume Checker"), "Header updated to Resume Checker");
  assert(!footerContent.includes("Resume Builder") && footerContent.includes("Resume Checker"), "Footer updated to Resume Checker");
  assert(!studentDataContent.includes("Resume Builder") && studentDataContent.includes("Resume Checker"), "student-data updated to Resume Checker");

  // --------------------------------------------------------------------------
  // TEST 17: YouTube Learning integration -> still works after changes
  // --------------------------------------------------------------------------
  console.log("\nTEST 17: YouTube Learning integration still works");
  const res17 = await fetch(`${BASE_URL}/api/student/learning`, {
    headers: { "x-student-id": learningStudentId },
  });
  assert(res17.status === 200, "Learning API endpoint returns 200 OK");
  const json17 = await res17.json();
  assert(json17.success === true, "Learning API returns success: true");
  assert(Array.isArray(json17.resources), "Learning tracks return resources array");

  // --------------------------------------------------------------------------
  // TEST 18: Existing Interest Finder -> Knowledge Testing gating works
  // --------------------------------------------------------------------------
  console.log("\nTEST 18: Existing Interest Finder -> Knowledge Testing gating works");
  // Fresh unverified user
  const unverifiedStudentId = "test_unverified_" + Date.now();
  const db18 = readDb();
  db18.users.push({ id: unverifiedStudentId, email: `${unverifiedStudentId}@test.edu`, role: "student", fullName: "Unverified", isVerified: false, createdAt: now, passwordHash: "h" });
  writeDb(db18);

  const res18IF = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/interest-finder`,
    { headers: { "x-student-id": unverifiedStudentId } }
  );
  const json18IF = await res18IF.json();
  assert(json18IF.routeCheck?.allowed === false, "Unverified user cannot access Interest Finder");
  assert(json18IF.routeCheck?.redirectUrl === "/student/document-verification", "Redirects to Document Submission");

  const res18KT = await fetch(
    `${BASE_URL}/api/student/workflow/status?checkPath=/student/knowledge-testing`,
    { headers: { "x-student-id": unverifiedStudentId } }
  );
  const json18KT = await res18KT.json();
  assert(json18KT.routeCheck?.allowed === false, "Unverified user cannot access Knowledge Testing");

  // --------------------------------------------------------------------------
  // TEST 19: Advanced student -> Changing Trends uses actual domain/niche/profile
  // --------------------------------------------------------------------------
  console.log("\nTEST 19: Advanced student -> Changing Trends section uses actual domain/niche");
  const res19 = await fetch(`${BASE_URL}/api/student/skill-gap`, {
    headers: { "x-student-id": advancedStudentId },
  });
  const json19 = await res19.json();
  assert(json19.success === true, "Skill Gap API returns success for advanced student");
  assert(json19.isAdvancedVerified === true, "Identifies isAdvancedVerified: true");
  assert(Array.isArray(json19.nicheTrends) && json19.nicheTrends.length > 0, "Returns non-empty nicheTrends array");
  const trend = json19.nicheTrends[0];
  assert(typeof trend.trendTitle === "string" && trend.trendTitle.length > 0, "Trend has valid trendTitle");
  assert(typeof trend.whyItMatters === "string" && trend.whyItMatters.length > 0, "Trend has valid whyItMatters");
  assert(typeof trend.recommendedSkill === "string" && trend.recommendedSkill.length > 0, "Trend has valid recommendedSkill");
  assert(typeof trend.relationshipToProfile === "string" && trend.relationshipToProfile.length > 0, "Trend has relationshipToProfile");
  assert(typeof trend.suggestedNextStep === "string" && trend.suggestedNextStep.length > 0, "Trend has suggestedNextStep");
  assert(trend.domainId === "security", "Trend is grounded in student's confirmed domain (security)");

  // --------------------------------------------------------------------------
  // TEST 20: Non-Advanced student does NOT receive Advanced-only trend behavior
  // --------------------------------------------------------------------------
  console.log("\nTEST 20: Non-Advanced student does NOT receive Advanced-only trend behavior");
  const res20 = await fetch(`${BASE_URL}/api/student/skill-gap`, {
    headers: { "x-student-id": learningStudentId },
  });
  const json20 = await res20.json();
  assert(json20.success === true, "Skill Gap API returns success for non-advanced student");
  assert(json20.isAdvancedVerified === false, "Confirms isAdvancedVerified is false");
  assert(json20.nicheTrends === null || json20.nicheTrends === undefined, "Non-advanced student does NOT receive niche trends");

  console.log("\n==========================================================");
  console.log(`ALL 20 TEST CASES PASSED SUCCESSFULLY (${passedTests}/${totalTests})`);
  console.log("==========================================================\n");
}

runTests().catch((err) => {
  console.error("Test Suite Failed:", err);
  process.exit(1);
});
