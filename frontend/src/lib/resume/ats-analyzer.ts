/**
 * Skill Bridge — ATS Resume Diagnostic Analyzer
 * Performs transparent, multi-dimensional evaluation of technical resumes:
 * - Parseability & encoding audit
 * - Section structure & hierarchy detection
 * - Keyword matching & missing skill identification (general or job-specific)
 * - Measurable impact & bullet-point quality evaluation
 * - Prioritized actionable improvements
 */

import crypto from "crypto";
import type {
  AnalyzeResumeParams,
  ResumeAnalysisRecord,
  ResumeCategoryScores,
  ResumeIssue,
  ResumeRecommendation,
} from "./types";

// ============================================================================
// CONFIGURABLE WEIGHTS
// ============================================================================

export const ATS_WEIGHTS_WITH_JOB = {
  parseability: 0.15,
  structure: 0.20,
  contentQuality: 0.25,
  skillsAndJobMatch: 0.40, // Combination of skill coverage and direct job match
};

export const ATS_WEIGHTS_GENERAL = {
  parseability: 0.25,
  structure: 0.30,
  contentQuality: 0.25,
  skillsKeywordCoverage: 0.20,
};

// Common technical vocabulary list for extraction & cross-referencing
const KNOWN_TECH_KEYWORDS = [
  "javascript", "typescript", "python", "java", "c++", "c", "c#", "golang", "go", "rust", "php", "ruby", "sql", "html", "css",
  "react", "next.js", "nextjs", "vue", "angular", "node.js", "nodejs", "express", "fastapi", "django", "flask", "spring", "spring boot",
  "postgresql", "postgres", "mysql", "mongodb", "redis", "supabase", "sqlite", "dynamodb", "elasticsearch", "cassandra",
  "aws", "azure", "gcp", "google cloud", "docker", "kubernetes", "k8s", "terraform", "ansible", "ci/cd", "github actions", "gitlab", "jenkins",
  "git", "linux", "rest", "rest api", "graphql", "grpc", "microservices", "serverless", "kafka", "rabbitmq",
  "cybersecurity", "owasp", "penetration testing", "vulnerability assessment", "siem", "soc", "cryptography", "jwt", "oauth",
  "machine learning", "deep learning", "ai", "artificial intelligence", "nlp", "computer vision", "tensorflow", "pytorch", "pandas", "numpy", "scikit-learn",
  "unit testing", "jest", "pytest", "cypress", "playwright", "agile", "scrum", "jira",
  "figma", "canva", "photoshop", "illustrator", "ui/ux", "web design", "responsive design", "bootstrap", "tailwind",
  "designing", "web technologies", "programming"
];

const STRONG_ACTION_VERBS = [
  "architected", "developed", "engineered", "implemented", "optimized", "built", "designed", "deployed",
  "refactored", "automated", "spearheaded", "accelerated", "reduced", "increased", "orchestrated",
  "integrated", "migrated", "configured", "mentored", "resolved", "maintained", "analyzed", "established"
];

const WEAK_PASSIVE_PHRASES = [
  "responsible for", "duties included", "worked on", "helped with", "assisted in", "participated in",
  "tasked with", "handled"
];

export const ATS_DISCLAIMER =
  "ATS scores are estimates and can vary between hiring systems. Use this analysis as a diagnostic to improve your resume.";

/**
 * Normalizes text for uniform keyword search
 */
function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^\w\s\.\+#\/-]/g, " ");
}

/**
 * Extracts recognized keywords from arbitrary text
 */
function extractKeywords(text: string): string[] {
  const norm = normalizeText(text);
  const words = new Set<string>();

  for (const kw of KNOWN_TECH_KEYWORDS) {
    // Regex boundary check to avoid substring collisions
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(^|\\s|[.,/])${escaped}($|\\s|[.,/])`, "i");
    if (regex.test(norm)) {
      words.add(kw);
    }
  }

  return Array.from(words);
}

/**
 * Extracts requirements & key technologies from a provided job description
 */
function extractJobRequirements(jobDescription: string): string[] {
  return extractKeywords(jobDescription);
}

export function analyzeResume(params: AnalyzeResumeParams): ResumeAnalysisRecord {
  const { studentId, resumeText, resumeFileName, jobTitle, targetRole, jobDescription } =
    params;

  if (!resumeText || resumeText.trim().length < 30) {
    throw new Error("Resume content is too short or empty to perform an ATS diagnostic analysis.");
  }

  const cleanText = resumeText.trim();
  const lowerText = cleanText.toLowerCase();

  const issues: ResumeIssue[] = [];
  const recommendations: ResumeRecommendation[] = [];

  // ==========================================================================
  // 1. PARSEABILITY EVALUATION
  // ==========================================================================
  let parseabilityScore = 100;

  // Contact checks
  const emailMatch = cleanText.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = cleanText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+91[-.\s]?\d{10}|\b\d{10}\b/);
  const linkedinMatch = /linkedin\.com\/in\/[\w-]+/i.test(cleanText);
  const githubMatch = /github\.com\/[\w-]+/i.test(cleanText);

  if (!emailMatch) {
    parseabilityScore -= 25;
    issues.push({
      id: "parse-no-email",
      category: "parseability",
      severity: "critical",
      title: "Missing or Unparseable Email Address",
      description: "Recruiter ATS parsers could not identify a valid contact email in the header.",
    });
    recommendations.push({
      id: "rec-email",
      priority: "high",
      title: "Add standard email in header",
      actionableTip: "Place a professional email address (e.g. name@institution.edu) prominently at the very top.",
    });
  }

  if (!phoneMatch) {
    parseabilityScore -= 15;
    issues.push({
      id: "parse-no-phone",
      category: "parseability",
      severity: "warning",
      title: "Missing Phone Number",
      description: "No standard 10-digit telephone or mobile format was detected.",
    });
  }

  if (!linkedinMatch && !githubMatch) {
    parseabilityScore -= 10;
    issues.push({
      id: "parse-no-profiles",
      category: "parseability",
      severity: "info",
      title: "No Professional Profile Links Detected",
      description: "Technical recruiters look for GitHub repositories or LinkedIn URLs for portfolio verification.",
    });
    recommendations.push({
      id: "rec-links",
      priority: "medium",
      title: "Include clean GitHub and LinkedIn links",
      actionableTip: "Add standard hyperlinks in your header: linkedin.com/in/username and github.com/username.",
    });
  }

  // Formatting challenges diagnostic (letter-spacing or complex multi-column extraction)
  if (params.hasFormattingChallenges) {
    parseabilityScore -= 15;
    issues.push({
      id: "parse-formatting-challenges",
      category: "parseability",
      severity: "warning",
      title: "Formatting May Reduce Older ATS Parsing Reliability",
      description: "Your document is a valid resume, but some custom formatting or letter-spacing artifacts may reduce how reliably older ATS parsers read it.",
    });
    recommendations.push({
      id: "rec-ats-formatting",
      priority: "medium",
      title: "Consider standard typography for high-volume automated portals",
      actionableTip: "For large enterprise applicant tracking systems, standard fonts and standard linear text flow ensure maximum automated extraction.",
    });
  }

  // Length sanity check
  const wordCount = cleanText.split(/\s+/).length;
  if (wordCount < 120) {
    parseabilityScore -= 20;
    issues.push({
      id: "parse-too-short",
      category: "parseability",
      severity: "warning",
      title: "Resume is Exceptionally Brief",
      description: `Only ${wordCount} words detected. Standard undergraduate technical resumes are typically 350–650 words.`,
    });
  } else if (wordCount > 1200) {
    parseabilityScore -= 10;
    issues.push({
      id: "parse-too-long",
      category: "parseability",
      severity: "info",
      title: "Resume Length Exceeds Standard 1-Page Format",
      description: `Detected ${wordCount} words. For entry-level and campus hiring, a concise 1-page resume is strongly preferred.`,
    });
  }

  parseabilityScore = Math.max(20, Math.min(100, parseabilityScore));

  // ==========================================================================
  // 2. STRUCTURE & SECTION HIERARCHY
  // ==========================================================================
  const detectedSections: string[] = [];
  const missingSections: string[] = [];

  const sectionMatchers: { name: string; regex: RegExp; critical: boolean }[] = [
    { name: "Education", regex: /(education|academic background|academics|university|college|b\.?tech|b\.?e)/i, critical: true },
    { name: "Technical Skills", regex: /(skills|technical proficiency|technologies|tech stack|tools|competencies|programming|web technologies|designing)/i, critical: true },
    { name: "Projects", regex: /(projects|academic projects|technical projects|open source)/i, critical: true },
    { name: "Experience / Internships", regex: /(experience|work experience|internship|internships|employment)/i, critical: false },
    { name: "Certifications", regex: /(certifications|certificates|licenses|achievements|honors|awards)/i, critical: false },
    { name: "Summary / Objective / Profile", regex: /(summary|profile|about me|objective|professional summary)/i, critical: false },
    { name: "Strengths", regex: /(strengths|key strengths|personal strengths)/i, critical: false },
  ];

  let structureScore = 100;

  for (const sec of sectionMatchers) {
    if (sec.regex.test(lowerText)) {
      detectedSections.push(sec.name);
    } else {
      missingSections.push(sec.name);
      if (sec.critical) {
        structureScore -= 22;
        issues.push({
          id: `struct-missing-${sec.name.toLowerCase().replace(/\s+/g, "-")}`,
          category: "structure",
          severity: "critical",
          title: `Missing Section: ${sec.name}`,
          description: `ATS parsers look for an explicit "${sec.name}" section heading to categorize your qualifications.`,
        });
        recommendations.push({
          id: `rec-sec-${sec.name.toLowerCase().replace(/\s+/g, "-")}`,
          priority: "high",
          title: `Add a dedicated "${sec.name}" section`,
          actionableTip: `Ensure there is an explicit uppercase or bold header titled "${sec.name}".`,
        });
      } else {
        structureScore -= 8;
      }
    }
  }

  structureScore = Math.max(25, Math.min(100, structureScore));

  // ==========================================================================
  // 3. KEYWORD & SKILLS COVERAGE
  // ==========================================================================
  const resumeKeywords = extractKeywords(cleanText);

  let skillsKeywordCoverage = 60;
  if (resumeKeywords.length >= 12) skillsKeywordCoverage = 95;
  else if (resumeKeywords.length >= 8) skillsKeywordCoverage = 85;
  else if (resumeKeywords.length >= 5) skillsKeywordCoverage = 72;
  else if (resumeKeywords.length >= 2) skillsKeywordCoverage = 50;
  else skillsKeywordCoverage = 30;

  let jobMatch: number | null = null;
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  const hasJobDescription = Boolean(jobDescription && jobDescription.trim().length > 20);

  if (hasJobDescription && jobDescription) {
    const jobKeywords = extractJobRequirements(jobDescription);
    const resumeSet = new Set(resumeKeywords.map((k) => k.toLowerCase()));

    for (const jkw of jobKeywords) {
      if (resumeSet.has(jkw.toLowerCase())) {
        matchedKeywords.push(jkw);
      } else {
        missingKeywords.push(jkw);
      }
    }

    if (jobKeywords.length > 0) {
      const matchRatio = matchedKeywords.length / jobKeywords.length;
      jobMatch = Math.round(matchRatio * 100);
      jobMatch = Math.max(15, Math.min(100, jobMatch));
    } else {
      jobMatch = 75; // Neutral baseline if JD had no specific tech keywords
    }

    if (missingKeywords.length > 0) {
      issues.push({
        id: "kw-missing-requirements",
        category: "skills",
        severity: missingKeywords.length > 3 ? "warning" : "info",
        title: `${missingKeywords.length} Target Keywords Not Found in Resume`,
        description: `This role seeks: ${missingKeywords.slice(0, 5).join(", ")}${missingKeywords.length > 5 ? "..." : ""}.`,
      });
      recommendations.push({
        id: "rec-add-missing-kw",
        priority: "high",
        title: "Incorporate matching skills honestly",
        actionableTip: `If you have experience with ${missingKeywords.slice(0, 3).join(", ")}, include them in your Skills or Project bullet points. Do not keyword-stuff unpracticed technologies.`,
      });
    }
  } else {
    // If no JD, matchedKeywords are the verified resume keywords
    matchedKeywords.push(...resumeKeywords.slice(0, 10));
    if (resumeKeywords.length < 5) {
      recommendations.push({
        id: "rec-expand-skills",
        priority: "medium",
        title: "Expand Technical Skills Section",
        actionableTip: "List specific languages, databases, frameworks, and developer tools you have hands-on experience with.",
      });
    }
  }

  // ==========================================================================
  // 4. CONTENT QUALITY & MEASURABLE IMPACT
  // ==========================================================================
  let contentQuality = 75;

  // Check strong action verbs
  let actionVerbCount = 0;
  for (const verb of STRONG_ACTION_VERBS) {
    const regex = new RegExp(`\\b${verb}\\b`, "i");
    if (regex.test(cleanText)) actionVerbCount++;
  }

  if (actionVerbCount >= 6) contentQuality += 15;
  else if (actionVerbCount >= 3) contentQuality += 8;
  else {
    contentQuality -= 15;
    issues.push({
      id: "content-weak-verbs",
      category: "content",
      severity: "warning",
      title: "Limited Strong Technical Action Verbs",
      description: "Bullet points should start with strong decisive verbs like 'Architected', 'Deployed', or 'Optimized'.",
    });
    recommendations.push({
      id: "rec-action-verbs",
      priority: "medium",
      title: "Begin bullets with action verbs",
      actionableTip: "Replace passive expressions with active technical verbs: Designed, Engineered, Accelerated, Automated.",
    });
  }

  // Check measurable metrics (numbers, percentages)
  const metricMatches = cleanText.match(/\b\d+(\.\d+)?%|\b\d{1,4}x|\b(reduced|increased|improved|by)\s+\d+/gi);
  const metricCount = metricMatches ? metricMatches.length : 0;

  if (metricCount >= 3) {
    contentQuality += 10;
  } else if (metricCount === 0) {
    contentQuality -= 15;
    issues.push({
      id: "content-no-metrics",
      category: "content",
      severity: "warning",
      title: "Lack of Quantifiable Results & Metrics",
      description: "Technical recruiters value measurable outcomes (e.g., 'reduced API response time by 30%', 'served 500+ daily users').",
    });
    recommendations.push({
      id: "rec-metrics",
      priority: "high",
      title: "Quantify your project outcomes",
      actionableTip: "Add numbers where possible: latency reduction, database records handled, test coverage percent, or user scale.",
    });
  }

  // Check passive phrases
  for (const passive of WEAK_PASSIVE_PHRASES) {
    if (cleanText.toLowerCase().includes(passive)) {
      contentQuality -= 5;
      issues.push({
        id: `content-passive-${passive.replace(/\s+/g, "-")}`,
        category: "content",
        severity: "info",
        title: `Passive Phrasing: "${passive}"`,
        description: `Avoid "${passive}". State the exact technical contribution you made instead.`,
      });
      break;
    }
  }

  contentQuality = Math.max(25, Math.min(100, contentQuality));

  // ==========================================================================
  // 5. OVERALL COMPOSITE SCORE CALCULATION
  // ==========================================================================
  let overallScore = 0;

  if (hasJobDescription && jobMatch !== null) {
    overallScore = Math.round(
      parseabilityScore * ATS_WEIGHTS_WITH_JOB.parseability +
      structureScore * ATS_WEIGHTS_WITH_JOB.structure +
      contentQuality * ATS_WEIGHTS_WITH_JOB.contentQuality +
      ((skillsKeywordCoverage + jobMatch) / 2) * ATS_WEIGHTS_WITH_JOB.skillsAndJobMatch
    );
  } else {
    overallScore = Math.round(
      parseabilityScore * ATS_WEIGHTS_GENERAL.parseability +
      structureScore * ATS_WEIGHTS_GENERAL.structure +
      contentQuality * ATS_WEIGHTS_GENERAL.contentQuality +
      skillsKeywordCoverage * ATS_WEIGHTS_GENERAL.skillsKeywordCoverage
    );
  }

  overallScore = Math.max(30, Math.min(98, overallScore));

  let strengthTier: "Needs Improvement" | "Moderate" | "Strong" | "Excellent" =
    "Needs Improvement";
  if (overallScore >= 80) strengthTier = "Excellent";
  else if (overallScore >= 65) strengthTier = "Strong";
  else if (overallScore >= 50) strengthTier = "Moderate";

  const summary = hasJobDescription
    ? `ATS analysis completed against target role. Scored ${overallScore}/100 with ${matchedKeywords.length} matched technical skills and ${jobMatch}% alignment to job requirements.`
    : `General ATS diagnostic completed. Scored ${overallScore}/100 across parseability, standard section structure, content quality, and general technical keyword coverage (${matchedKeywords.length} skills identified).`;

  const categoryScores: ResumeCategoryScores = {
    parseability: parseabilityScore,
    structure: structureScore,
    skillsKeywordCoverage,
    keywordCoverage: skillsKeywordCoverage,
    jobMatch,
    contentQuality,
  };

  const mappedIssues: ResumeIssue[] = issues.map((iss) => ({
    ...iss,
    message: iss.message || iss.title || iss.description || "Diagnostic finding",
    description: iss.description || iss.message || "",
    suggestion: iss.suggestion || iss.description || "",
  }));

  const mappedRecommendations: ResumeRecommendation[] = recommendations.map(
    (rec) => ({
      ...rec,
      action: rec.action || rec.title || "Improve resume element",
      reason: rec.reason || rec.actionableTip || "",
      category: rec.category || "Resume Quality",
    })
  );

  const studentIdentifier = studentId || "student";
  const id = `ra_${studentIdentifier}_${crypto.randomBytes(6).toString("hex")}`;

  return {
    id,
    studentId: studentIdentifier,
    resumeFileName: resumeFileName || "Resume_Document.pdf",
    jobTitle: jobTitle || targetRole || (hasJobDescription ? "Specified Role" : undefined),
    targetRole: targetRole || jobTitle,
    hasJobDescription,
    overallScore,
    jobMatchScore: jobMatch,
    strengthTier,
    summary,
    categoryScores,
    matchedKeywords,
    missingKeywords,
    detectedSections,
    missingSections,
    issues: mappedIssues,
    recommendations: mappedRecommendations,
    analyzedAt: new Date().toISOString(),
    disclaimer: ATS_DISCLAIMER,
  };
}
