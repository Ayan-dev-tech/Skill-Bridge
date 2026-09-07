/**
 * Skill Bridge — Comprehensive 34-Requirement Test Suite
 * Validates every single test scenario listed in Section 31 of the Product Requirements.
 */

import fs from "fs";
import path from "path";
import zlib from "zlib";

const BASE_URL = "http://localhost:3000";
const DB_PATH = path.join(process.cwd(), "data", "skill_bridge.json");

function readDb() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

let totalPassed = 0;
let totalFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    totalPassed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    totalFailed++;
    throw new Error(`Assertion failed: ${message}`);
  }
}

// ============================================================================
// PDF GENERATION UTILITIES
// ============================================================================

function buildPdfWithContent(streamText) {
  const streamBuf = Buffer.from(streamText, "utf-8");
  return Buffer.from(
    `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamBuf.length} >>
stream
${streamText}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000227 00000 n 
0000000312 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
%%EOF`
  );
}

function buildPdfWithFlateCompressedContent(textLines) {
  let streamData = "BT /F1 12 Tf ";
  for (const line of textLines) {
    const safeLine = line.replace(/[()\\]/g, "\\$&");
    streamData += `(${safeLine}) Tj T* `;
  }
  streamData += "ET";

  const rawStream = Buffer.from(streamData, "utf-8");
  const compressed = zlib.deflateSync(rawStream);

  return Buffer.concat([
    Buffer.from(`%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${compressed.length} /Filter /FlateDecode >>
stream
`),
    compressed,
    Buffer.from(`
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
trailer
<< /Size 6 /Root 1 0 R >>
%%EOF`),
  ]);
}

// Helpers for test files
function createFresherResumePdf() {
  return buildPdfWithFlateCompressedContent([
    "Alex Johnson",
    "Email: alex.johnson@university.edu | Phone: +1-555-019-2834 | github.com/alexj",
    "Career Objective: Detail-oriented Computer Science graduate passionate about scalable software.",
    "Education: Bachelor of Technology in Computer Science, State University, CGPA 3.85 / 4.0, 2022 - 2026",
    "Relevant Coursework: Data Structures, Algorithms, Database Systems, Computer Networks",
    "Technical Skills: Python, TypeScript, React, Node.js, Express, SQL, Git, Linux, Docker, REST APIs",
    "Academic & Personal Projects:",
    "- Distributed File Indexer: Developed a concurrent storage indexer in Python with REST APIs and SQLite.",
    "- Cloud Placement Dashboard: Built a responsive React and TypeScript portal with role-based access.",
    "Certifications: AWS Certified Cloud Practitioner (2025)",
  ]);
}

function createProfessionalResumePdf() {
  return buildPdfWithFlateCompressedContent([
    "Sarah Connor",
    "Email: sarah.connor@cyberdyne.org | Phone: +1-555-839-1029 | linkedin.com/in/sarahc",
    "Professional Summary: Senior Software Engineer with 6+ years experience architecting distributed backend services.",
    "Technical Skills: Python, Go, Kubernetes, AWS, PostgreSQL, Docker, Redis, CI/CD, Microservices, Linux",
    "Work Experience:",
    "- Senior Software Engineer, TechCorp (2022 - Present): Engineered microservices handling 50k requests/sec.",
    "- Software Engineer, CloudData (2019 - 2022): Optimized SQL and Elasticsearch query latencies by 45%.",
    "Education: Bachelor of Science in Software Engineering, Institute of Technology, GPA 3.9",
  ]);
}

function createCharlieKirkMemePdf() {
  return buildPdfWithFlateCompressedContent([
    "Charlie Kirk Turning Point USA Meme",
    "Curious!? If socialism is so good, why did Venezuela run out of food? Change my mind.",
    "Point of View: You think student loans should be forgiven. Bottom text.",
  ]);
}

function createGenericMemePdf() {
  return buildPdfWithFlateCompressedContent([
    "POV: Me when the production server crashes on a Friday afternoon.",
    "Nobody: Absolutely nobody: My manager asking for an emergency fix. Funny meme LOL.",
  ]);
}

function createBlankPdf() {
  return buildPdfWithContent(" ");
}

function createImageOnlyPdf() {
  return buildPdfWithContent("/Im1 Do"); // References an XObject image, no Tj text
}

function createFakePdfExtension() {
  return Buffer.from("This is actually a plain text file pretending to be a PDF. No PDF signature here!");
}

function createOversizedPdf() {
  const head = Buffer.from("%PDF-1.4\n1 0 obj\n<< /Length 5500000 >>\nstream\n");
  const fill = Buffer.alloc(5.2 * 1024 * 1024, "A");
  const tail = Buffer.from("\nendstream\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF");
  return Buffer.concat([head, fill, tail]);
}

// ============================================================================
// MAIN TEST SUITE
// ============================================================================

async function runAll34Tests() {
  console.log("================================================================================");
  console.log("SKILL BRIDGE — VERIFYING ALL 34 PRODUCT & WORKFLOW REQUIREMENTS");
  console.log("================================================================================\n");

  const initialDb = readDb();

  // Create clean isolated test student identities
  const timestamp = Date.now();
  const studentNew = `stu_34_new_${timestamp}`;
  const studentAdv = `stu_34_adv_${timestamp}`;
  const studentLrn = `stu_34_lrn_${timestamp}`;
  const studentB = `stu_34_other_${timestamp}`;

  const now = new Date().toISOString();

  // Seed test users
  const testUsers = [
    { id: studentNew, email: `${studentNew}@test.edu`, role: "student", fullName: "New Student 34", isVerified: true, createdAt: now, passwordHash: "h" },
    { id: studentAdv, email: `${studentAdv}@test.edu`, role: "student", fullName: "Advanced Student 34", isVerified: true, createdAt: now, passwordHash: "h" },
    { id: studentLrn, email: `${studentLrn}@test.edu`, role: "student", fullName: "Learning Student 34", isVerified: true, createdAt: now, passwordHash: "h" },
    { id: studentB, email: `${studentB}@test.edu`, role: "student", fullName: "Student B 34", isVerified: true, createdAt: now, passwordHash: "h" },
  ];

  initialDb.users.push(...testUsers);

  // Seed profiles with contact phone numbers
  initialDb.profiles.push(
    { id: `prof_${studentNew}`, userId: studentNew, fullName: "New Student 34", metadata: { phone: "+1-555-010-0001" }, createdAt: now, updatedAt: now },
    { id: `prof_${studentAdv}`, userId: studentAdv, fullName: "Advanced Student 34", metadata: { phone: "+1-555-010-0002" }, createdAt: now, updatedAt: now },
    { id: `prof_${studentLrn}`, userId: studentLrn, fullName: "Learning Student 34", metadata: { phone: "+1-555-010-0003" }, createdAt: now, updatedAt: now },
    { id: `prof_${studentB}`, userId: studentB, fullName: "Student B 34", metadata: { phone: "+1-555-010-0004" }, createdAt: now, updatedAt: now }
  );

  // Standard verified documents for test students
  const verifiedDocs = [
    { id: `doc_id_${timestamp}`, documentType: "student_id", originalFilename: "id.pdf", fileSize: 1024, mimeType: "application/pdf", storageKey: "k1", verificationStatus: "VERIFIED", uploadedAt: now },
    { id: `doc_photo_${timestamp}`, documentType: "passport_photo", originalFilename: "photo.jpg", fileSize: 1024, mimeType: "image/jpeg", storageKey: "k4", verificationStatus: "VERIFIED", uploadedAt: now },
    { id: `doc_marks_${timestamp}`, documentType: "post_graduation_marksheet", originalFilename: "marks.pdf", fileSize: 1024, mimeType: "application/pdf", storageKey: "k2", verificationStatus: "VERIFIED", uploadedAt: now },
    { id: `doc_abc_${timestamp}`, documentType: "abc_id", originalFilename: "abc.pdf", fileSize: 1024, mimeType: "application/pdf", storageKey: "k3", verificationStatus: "VERIFIED", uploadedAt: now },
  ];

  initialDb.studentVerifications.push(
    { studentId: studentNew, verificationStatus: "VERIFIED", verifiedAt: now, documents: verifiedDocs, createdAt: now, updatedAt: now },
    { studentId: studentAdv, verificationStatus: "VERIFIED", verifiedAt: now, documents: verifiedDocs, createdAt: now, updatedAt: now },
    { studentId: studentLrn, verificationStatus: "VERIFIED", verifiedAt: now, documents: verifiedDocs, createdAt: now, updatedAt: now },
    { studentId: studentB, verificationStatus: "VERIFIED", verifiedAt: now, documents: verifiedDocs, createdAt: now, updatedAt: now }
  );

  // Seed interest profile for Advanced and Learning students
  initialDb.interestProfiles.push(
    {
      id: `int_${studentAdv}`,
      studentId: studentAdv,
      confirmedMainDomainId: "software-engineering",
      confirmedMainDomain: "Software Engineering & Full Stack",
      confirmedSpecificInterest: "Full Stack Development & Distributed Systems",
      explanation: "Verified high interest in backend and full stack architecture.",
      status: "COMPLETED",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: `int_${studentLrn}`,
      studentId: studentLrn,
      confirmedMainDomainId: "software-engineering",
      confirmedMainDomain: "Software Engineering & Full Stack",
      confirmedSpecificInterest: "Full Stack Development & Distributed Systems",
      explanation: "Verified interest in software engineering.",
      status: "COMPLETED",
      createdAt: now,
      updatedAt: now,
    }
  );

  // Seed Knowledge Test: Advanced student gets 90% score (Advanced Level)
  initialDb.knowledgeTestResults.push({
    id: `know_${studentAdv}`,
    studentId: studentAdv,
    domainId: "software-engineering",
    score: 9,
    maxScore: 10,
    scorePercent: 90,
    difficulty: "Advanced",
    knowledgeLevel: "Advanced",
    totalQuestions: 10,
    correctCount: 9,
    strengths: ["Python", "SQL", "React", "TypeScript", "REST APIs"],
    weaknesses: ["Docker", "Kubernetes"],
    completedAt: now,
  });

  // Seed Knowledge Test: Learning student gets 60% score (Intermediate Level)
  initialDb.knowledgeTestResults.push({
    id: `know_${studentLrn}`,
    studentId: studentLrn,
    domainId: "software-engineering",
    score: 6,
    maxScore: 10,
    scorePercent: 60,
    difficulty: "Intermediate",
    knowledgeLevel: "Intermediate",
    totalQuestions: 10,
    correctCount: 6,
    strengths: ["JavaScript", "HTML", "CSS"],
    weaknesses: ["Docker", "AWS", "SQL"],
    completedAt: now,
  });

  // Learning student has completed Skill Gap (unlocks downstream modules)
  initialDb.skillGapAnalyses.push({
    id: `sg_${studentLrn}`,
    studentId: studentLrn,
    domainId: "software-engineering",
    nicheId: "full-stack",
    interestProfileId: `int_${studentLrn}`,
    knowledgeTestResultId: `know_${studentLrn}`,
    overallProficiencyScore: 60,
    knowledgeLevel: "Intermediate",
    skillProfileVersion: "1.0",
    executiveSummary: "Solid front-end foundations with backend gaps.",
    skillGaps: [],
    recommendations: [],
    aiGenerated: false,
    isStale: false,
    createdAt: now,
    updatedAt: now,
  });

  writeDb(initialDb);

  // Helper for authenticated requests using custom test header
  async function apiCall(endpoint, options = {}, asStudentId = studentNew) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      ...(options.headers || {}),
      "x-student-id": asStudentId,
    };
    return fetch(url, { ...options, headers });
  }

  // Helper to send resume files to analyze endpoint
  async function uploadResume(fileBuffer, fileName, mimeType, asStudentId = studentNew, jobDescription) {
    const formData = new FormData();
    const blob = new Blob([fileBuffer], { type: mimeType || "application/pdf" });
    formData.append("file", blob, fileName);
    if (jobDescription) {
      formData.append("jobDescription", jobDescription);
    }

    return apiCall("/api/student/resume/analyze", {
      method: "POST",
      body: formData,
    }, asStudentId);
  }

  console.log("--- PART 1: RESUME CHECKER & VALIDATION (TESTS 1 - 16) ---");

  // TEST 1: New student -> Resume Checker accessible
  {
    const res = await apiCall("/api/student/resume/analyze", { method: "GET" }, studentNew);
    assert(res.status === 200, "TEST 1: New student can access Resume Checker API without prerequisite module lock");
    const data = await res.json();
    assert(data.success === true && data.hasAnalysis === false, "TEST 1: New student returns clean unanalyzed state");
  }

  // TEST 2: New student -> Resume Checker only accepts PDF
  {
    // Read the resume checker page source to confirm user-facing constraints
    const pageContent = fs.readFileSync(path.join(process.cwd(), "src", "app", "student", "resume-checker", "page.tsx"), "utf-8");
    assert(pageContent.includes("Upload your resume"), "TEST 2: User-facing copy includes 'Upload your resume'");
    assert(pageContent.includes("PDF only • Maximum 5 MB"), "TEST 2: User-facing copy includes 'PDF only • Maximum 5 MB'");
    assert(pageContent.includes('accept=".pdf,application/pdf"'), "TEST 2: File input strictly specifies .pdf and application/pdf");
  }

  // TEST 3: TXT upload -> rejected
  {
    const txtBuf = Buffer.from("John Doe Resume Skills: Python, SQL");
    const res = await uploadResume(txtBuf, "resume.txt", "text/plain", studentNew);
    assert(res.status === 400, "TEST 3: TXT upload rejected with HTTP 400");
    const json = await res.json();
    assert(json.success === false && json.error.toLowerCase().includes("pdf"), "TEST 3: Error explains PDF only requirement");
  }

  // TEST 4: Markdown upload -> rejected
  {
    const mdBuf = Buffer.from("# John Doe\n## Education\nBS CS\n## Skills\nPython");
    const res = await uploadResume(mdBuf, "resume.md", "text/markdown", studentNew);
    assert(res.status === 400, "TEST 4: Markdown upload rejected with HTTP 400");
  }

  // TEST 5: DOCX upload -> rejected
  {
    const docxBuf = Buffer.from("PK\x03\x04 fake docx binary data");
    const res = await uploadResume(docxBuf, "resume.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", studentNew);
    assert(res.status === 400, "TEST 5: DOCX upload rejected with HTTP 400");
  }

  // TEST 6: Image upload -> rejected
  {
    const imgBuf = Buffer.from("\x89PNG\r\n\x1a\n fake png image");
    const res = await uploadResume(imgBuf, "resume.png", "image/png", studentNew);
    assert(res.status === 400, "TEST 6: Image upload rejected with HTTP 400");
  }

  // TEST 7: Fake PDF extension -> rejected
  {
    const fakeBuf = createFakePdfExtension();
    const res = await uploadResume(fakeBuf, "resume.pdf", "application/pdf", studentNew);
    assert(res.status === 400, "TEST 7: Fake PDF extension (missing %PDF- header) rejected with HTTP 400");
    const json = await res.json();
    assert(json.error.includes("signature") || json.error.includes("header"), "TEST 7: Explains PDF signature/header invalid");
  }

  // TEST 8: Oversized PDF -> rejected
  {
    const largePdf = createOversizedPdf();
    const res = await uploadResume(largePdf, "huge_resume.pdf", "application/pdf", studentNew);
    assert(res.status === 400, "TEST 8: Oversized PDF (>5MB) rejected with HTTP 400");
    const json = await res.json();
    assert(json.error.includes("5 MB"), "TEST 8: Error message specifies 5 MB limit");
  }

  // TEST 9: Charlie Kirk meme PDF -> rejected as non-resume
  {
    const memePdf = createCharlieKirkMemePdf();
    const res = await uploadResume(memePdf, "charlie_kirk_meme.pdf", "application/pdf", studentNew);
    assert(res.status === 400, "TEST 9: Charlie Kirk meme PDF rejected with HTTP 400");
    const json = await res.json();
    assert(json.isResume === false, "TEST 9: Document classifier correctly identifies isResume: false");
    assert(json.error.includes("resume-like structure") || json.error.includes("Memes"), "TEST 9: Rejection reason clearly explains non-resume structure");
  }

  // TEST 10: Generic meme PDF -> rejected
  {
    const genericMemePdf = createGenericMemePdf();
    const res = await uploadResume(genericMemePdf, "funny_meme.pdf", "application/pdf", studentNew);
    assert(res.status === 400, "TEST 10: Generic meme PDF rejected with HTTP 400");
    const json = await res.json();
    assert(json.isResume === false, "TEST 10: Identified as non-resume");
  }

  // TEST 11: Blank PDF -> rejected
  {
    const blankPdf = createBlankPdf();
    const res = await uploadResume(blankPdf, "blank.pdf", "application/pdf", studentNew);
    assert(res.status === 400, "TEST 11: Blank PDF rejected with HTTP 400");
    const json = await res.json();
    assert(json.isResume === false && json.error.includes("Blank or unreadable"), "TEST 11: Identifies blank/empty PDF");
  }

  // TEST 12: Image-only unreadable PDF -> rejected
  {
    const imgPdf = createImageOnlyPdf();
    const res = await uploadResume(imgPdf, "scanned_image.pdf", "application/pdf", studentNew);
    assert(res.status === 400, "TEST 12: Image-only unreadable PDF rejected with HTTP 400");
    const json = await res.json();
    assert(json.isResume === false, "TEST 12: Rejects unreadable image-only PDF");
  }

  // TEST 13: Valid fresher resume -> accepted
  {
    const fresherPdf = createFresherResumePdf();
    const res = await uploadResume(fresherPdf, "Alex_Johnson_Fresher_Resume.pdf", "application/pdf", studentNew);
    assert(res.status === 200, "TEST 13: Valid student fresher resume accepted with HTTP 200");
    const json = await res.json();
    assert(json.isResume === true, "TEST 13: Classified as genuine resume (isResume: true)");
    assert(json.analysis && json.analysis.overallScore > 0, "TEST 13: Analysis record successfully created");
  }

  // TEST 14: Valid professional resume -> accepted
  {
    const profPdf = createProfessionalResumePdf();
    const res = await uploadResume(profPdf, "Sarah_Connor_Professional_Resume.pdf", "application/pdf", studentAdv);
    assert(res.status === 200, "TEST 14: Valid professional resume accepted with HTTP 200");
    const json = await res.json();
    assert(json.isResume === true, "TEST 14: Professional resume confirmed as genuine resume");
  }

  // TEST 15: Valid resume -> ATS analysis runs with structured data and disclaimer
  {
    const getRes = await apiCall("/api/student/resume/analyze", { method: "GET" }, studentNew);
    const data = await getRes.json();
    assert(data.success === true && data.hasAnalysis === true, "TEST 15: Resume analysis persisted and retrievable");
    const a = data.analysis;
    assert(typeof a.overallScore === "number", "TEST 15: overallScore is a numeric score");
    assert(a.categoryScores && typeof a.categoryScores.parseability === "number", "TEST 15: categoryScores contains parseability");
    assert(typeof a.categoryScores.structure === "number", "TEST 15: categoryScores contains structure");
    assert(typeof a.categoryScores.contentQuality === "number", "TEST 15: categoryScores contains contentQuality");
    assert(Array.isArray(a.issues), "TEST 15: issues is an array of diagnostic issues");
    assert(Array.isArray(a.recommendations), "TEST 15: recommendations is an array");
    assert(Array.isArray(a.matchedKeywords), "TEST 15: matchedKeywords is populated from resume content");
    assert(a.disclaimer.includes("ATS scores are estimates and can vary between hiring systems"), "TEST 15: Includes required ATS disclaimer statement");
  }

  // TEST 16: Resume + job description -> job-specific match analysis
  {
    const fresherPdf = createFresherResumePdf();
    const jobDesc = "We are seeking a Backend Engineer with strong expertise in Python, Docker, Kubernetes, and AWS Cloud.";
    const res = await uploadResume(fresherPdf, "Alex_Johnson_Resume.pdf", "application/pdf", studentNew, jobDesc);
    assert(res.status === 200, "TEST 16: Uploading resume with job description runs job match analysis");
    const json = await res.json();
    const a = json.analysis;
    assert(typeof a.jobMatchScore === "number", "TEST 16: Produces jobMatchScore %");
    assert(a.missingKeywords.includes("kubernetes") || a.missingKeywords.includes("aws"), "TEST 16: Identifies missing requirements (kubernetes/aws)");
  }

  console.log("\n--- PART 2: APPLICATION READINESS, GATE, AND SUBMISSION (TESTS 17 - 23) ---");

  const sampleJobId = "job-sec-01";
  const missingDocJobId = "job-ai-03"; // Requires skill_certifications which studentAdv does not have

  // TEST 17: No resume -> student cannot submit a job application
  {
    // studentLrn has reached Learning stage (has opportunity access), but has NO resume uploaded
    const res = await apiCall("/api/student/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: sampleJobId,
        confirmed: true,
      }),
    }, studentLrn);

    assert(res.status === 400, "TEST 17: Application submission blocked without resume with HTTP 400");
    const json = await res.json();
    assert(json.missingRequirement === "resume", "TEST 17: Specifies resume as missing requirement");
    assert(json.error.includes("Resume required"), "TEST 17: User error clearly states 'Resume required'");
  }

  // TEST 18: Resume exists but required application document is missing -> application blocked
  {
    // studentAdv has resume, but missing skill_certifications required for job-ai-03
    const res = await apiCall("/api/student/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: missingDocJobId,
        confirmed: true,
      }),
    }, studentAdv);

    assert(res.status === 400, "TEST 18: Application submission blocked when required document missing with HTTP 400");
    const json = await res.json();
    assert(json.missingRequirement === "document", "TEST 18: Specifies document as missing requirement");
    assert(json.missingDocumentTypes.includes("skill_certifications"), "TEST 18: Clearly explains which document is missing");
  }

  // TEST 19: All application requirements satisfied -> application review/readiness shown
  {
    // studentAdv has verified documents (student_id + post_graduation_marksheet) and a professional resume
    const res = await apiCall(`/api/student/applications/readiness?jobId=${sampleJobId}`, { method: "GET" }, studentAdv);
    assert(res.status === 200, "TEST 19: Readiness endpoint returns HTTP 200");
    const json = await res.json();
    assert(json.isReady === true, "TEST 19: Student with valid resume and documents is evaluated as isReady: true");
    assert(json.profile.isComplete === true, "TEST 19: Profile verified as complete");
    assert(json.resume.hasResume === true, "TEST 19: Resume verified as present");
    assert(json.documents.allPresent === true, "TEST 19: Required documents verified as present");
    assert(Array.isArray(json.matching.strengths), "TEST 19: Transparent strengths list provided");
    assert(Array.isArray(json.matching.gaps), "TEST 19: Transparent gaps list provided");
    assert(["Strong Match", "Reasonable Match", "Needs Improvement"].includes(json.matching.recommendation), "TEST 19: Provides honest recommendation");
  }

  // TEST 20: Student confirms -> application submitted
  let createdAppId = "";
  {
    const res = await apiCall("/api/student/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: sampleJobId,
        companyName: "CloudArmor Defense Labs",
        roleTitle: "Associate Security Operations Engineer",
        applicantFullName: "Advanced Student 34",
        applicantEmail: `${studentAdv}@test.edu`,
        applicantPhone: "+1-555-010-0002",
        confirmed: true, // Explicit user confirmation!
      }),
    }, studentAdv);

    assert(res.status === 201, "TEST 20: Application created with HTTP 201 upon explicit confirmation");
    const json = await res.json();
    assert(json.success === true, "TEST 20: Application successful");
    assert(json.application && json.application.status === "applied", "TEST 20: Initial status is 'applied'");
    createdAppId = json.application.id;
  }

  // TEST 21: Student clicks Apply without confirmation -> no application created
  {
    // Try to apply to another job WITHOUT confirmed: true
    const otherJobId = "intern-sec-01";
    const res = await apiCall("/api/student/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: otherJobId,
        companyName: "SentinelEdge Security",
        roleTitle: "Application Security Intern",
        confirmed: false, // NOT confirmed!
      }),
    }, studentAdv);

    assert(res.status === 400, "TEST 21: Submitting without explicit confirmation rejected with HTTP 400");
    const json = await res.json();
    assert(json.error.includes("explicitly confirmed"), "TEST 21: Error states application must be reviewed and confirmed");

    // Verify DB does not contain an application for otherJobId
    const checkDb = readDb();
    const unconfirmed = (checkDb.jobApplications || []).find((a) => a.studentId === studentAdv && a.jobId === otherJobId);
    assert(!unconfirmed, "TEST 21: Zero applications created when unconfirmed");
  }

  // TEST 22: Student already applied -> duplicate application prevented
  {
    const res = await apiCall("/api/student/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: sampleJobId,
        companyName: "CloudArmor Defense Labs",
        roleTitle: "Associate Security Operations Engineer",
        confirmed: true,
      }),
    }, studentAdv);

    assert(res.status === 409, "TEST 22: Duplicate application prevented with HTTP 409 Conflict");
    const json = await res.json();
    assert(json.alreadyApplied === true, "TEST 22: Returns alreadyApplied: true flag");
  }

  // TEST 23: Student with zero applications -> Track Applications accessible
  {
    const res = await apiCall("/api/student/applications", { method: "GET" }, studentNew);
    assert(res.status === 200, "TEST 23: Track Applications API accessible with zero applications");
    const json = await res.json();
    assert(json.success === true && json.totalCount === 0 && Array.isArray(json.applications), "TEST 23: Accessible with zero count");

    // Verify UI page renders "No applications yet" and "Explore Jobs & Internships"
    const trackPageSource = fs.readFileSync(path.join(process.cwd(), "src", "app", "student", "applications", "page.tsx"), "utf-8");
    assert(trackPageSource.includes("No applications yet"), "TEST 23: UI contains 'No applications yet' empty state");
    assert(trackPageSource.includes("Applications you submit will appear here"), "TEST 23: UI explains submitted applications will appear here");
    assert(trackPageSource.includes("Explore Jobs & Internships"), "TEST 23: Empty state contains 'Explore Jobs & Internships' CTA");
  }

  console.log("\n--- PART 3: ADVANCED ACCESS & LEARNING UNLOCK (TESTS 24 - 27) ---");

  // TEST 24: Advanced verified student -> Jobs & Internships accessible early
  {
    const res = await apiCall("/api/student/opportunities", { method: "GET" }, studentAdv);
    assert(res.status === 200, "TEST 24: Advanced verified student can access Jobs & Internships early");
    const json = await res.json();
    assert(json.isLocked === false, "TEST 24: Opportunities is not locked for advanced verified student");
    assert(Array.isArray(json.jobs) && json.jobs.length > 0, "TEST 24: Returns real job listings");
  }

  // TEST 25: Advanced student -> still must satisfy actual application requirements
  {
    // Advanced student trying to apply for job-ai-03 (requires skill_certifications which studentAdv does not have)
    const res = await apiCall("/api/student/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: missingDocJobId,
        companyName: "CognitiveMatrix AI",
        roleTitle: "ML Platform Associate",
        confirmed: true,
      }),
    }, studentAdv);

    assert(res.status === 400, "TEST 25: Advanced student still blocked if required document missing (no bypassing)");
    const json = await res.json();
    assert(json.missingRequirement === "document", "TEST 25: Required document failure enforced for advanced student");
  }

  // TEST 26: Non-Advanced student before Learning -> Jobs remain appropriately gated
  {
    // studentNew is at stage 1, has not done Knowledge Test or Skill Gap, not advanced
    const res = await apiCall("/api/student/opportunities", { method: "GET" }, studentNew);
    const json = await res.json();
    assert(json.isLocked === true, "TEST 26: Non-advanced student before Learning has Opportunities locked");
    assert(json.lockedReason.toLowerCase().includes("advanced") || json.lockedReason.toLowerCase().includes("learning"), "TEST 26: Locked explanation explains required stage");
  }

  // TEST 27: Student reaches Learning -> downstream career modules unlock
  {
    // studentLrn completed Skill Gap (reached Learning stage), score was Intermediate (60%)
    const res = await apiCall("/api/student/opportunities", { method: "GET" }, studentLrn);
    assert(res.status === 200, "TEST 27: Student reaching Learning stage unlocks Opportunities");
    const json = await res.json();
    assert(json.isLocked === false, "TEST 27: Career opportunities unlocked upon reaching Learning stage");
  }

  console.log("\n--- PART 4: SECURITY, RLS & DATA INTEGRITY (TESTS 28 - 31) ---");

  // TEST 28: Student A accesses Student B's application -> denied
  {
    // studentAdv has created an application (createdAppId). studentB requests applications
    const res = await apiCall("/api/student/applications", { method: "GET" }, studentB);
    const json = await res.json();
    const hasStudentAApp = (json.applications || []).some((a) => a.id === createdAppId || a.studentId === studentAdv);
    assert(!hasStudentAApp, "TEST 28: Student B cannot see Student A's application");
    assert(json.applications.length === 0, "TEST 28: Isolated student application tenancy preserved");
  }

  // TEST 29: Student A accesses Student B's resume -> denied
  {
    // studentAdv has a resume in DB. studentB requests resume analysis
    const res = await apiCall("/api/student/resume/analyze", { method: "GET" }, studentB);
    const json = await res.json();
    assert(json.hasAnalysis === false && json.analysis === null, "TEST 29: Student B cannot access Student A's resume analysis");
  }

  // TEST 30: Student attempts to modify Advanced state from frontend -> denied
  {
    // Malicious student sends fake advanced flag in body to applications endpoint
    const res = await apiCall("/api/student/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: sampleJobId,
        isAdvancedVerified: true, // Frontend spoof attempt!
        confirmed: true,
      }),
    }, studentNew);

    assert(res.status === 403 || res.status === 400, "TEST 30: Client-side advanced claim rejected by server-side authoritative check");
  }

  // TEST 31: Student attempts to manipulate readiness state -> backend rejects
  {
    // Malicious student sends fake readiness claim: isReady: true, hasResume: true, allDocumentsPresent: true
    const res = await apiCall("/api/student/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: sampleJobId,
        isReady: true,
        hasResume: true,
        allDocumentsPresent: true,
        confirmed: true,
      }),
    }, studentLrn); // studentLrn has opportunity access but NO resume!

    assert(res.status === 400, "TEST 31: Backend independently evaluates requirements, rejects client spoofed readiness");
    const json = await res.json();
    assert(json.missingRequirement === "resume", "TEST 31: Backend strictly catches missing resume");
  }

  console.log("\n--- PART 5: RESPONSIVENESS, INTEGRATIONS & GATING (TESTS 32 - 34) ---");

  // TEST 32: Mobile application flow -> no horizontal overflow
  {
    const oppPageSource = fs.readFileSync(path.join(process.cwd(), "src", "app", "student", "opportunities", "page.tsx"), "utf-8");
    const appPageSource = fs.readFileSync(path.join(process.cwd(), "src", "app", "student", "applications", "page.tsx"), "utf-8");

    assert(oppPageSource.includes("max-w-") && oppPageSource.includes("flex-col sm:flex-row"), "TEST 32: Opportunities page has responsive flex & container constraints");
    assert(appPageSource.includes("max-w-5xl") && appPageSource.includes("flex-col sm:flex-row"), "TEST 32: Applications page has responsive flex & container constraints");
    assert(!oppPageSource.includes("w-[1200px]") && !appPageSource.includes("w-[1200px]"), "TEST 32: No rigid hardcoded pixel widths causing horizontal overflow");
  }

  // TEST 33: YouTube Learning integration -> remains functional
  {
    const res = await apiCall("/api/student/learning", { method: "GET" }, studentLrn);
    assert(res.status === 200, "TEST 33: YouTube Learning API endpoint returns HTTP 200");
    const json = await res.json();
    assert(json.success === true, "TEST 33: Learning API returns success: true");
    assert(json.learningFocus && json.learningFocus.nicheId === "full-stack", "TEST 33: Learning focus connects student's niche");
    assert(Array.isArray(json.resources), "TEST 33: Resources array is defined");
    assert(typeof json.isConfigured === "boolean", "TEST 33: YouTube configuration status is reported");
  }

  // TEST 34: Interest Finder -> Knowledge Testing gating -> remains functional
  {
    // A fresh student who has not done Interest Finder cannot access Knowledge Testing questions
    const res = await apiCall("/api/student/knowledge-test/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domainId: "software-engineering" }),
    }, studentNew);

    const json = await res.json();
    assert(res.status === 403 || json.isLocked === true, "TEST 34: Knowledge Testing strictly gated behind Interest Finder");
  }

  console.log("\n================================================================================");
  console.log(`TEST RUN COMPLETED: ${totalPassed} PASSED, ${totalFailed} FAILED out of 34`);
  console.log("================================================================================");

  if (totalFailed > 0) {
    process.exit(1);
  }
}

runAll34Tests().catch((err) => {
  console.error("FATAL TEST ERROR:", err);
  process.exit(1);
});
