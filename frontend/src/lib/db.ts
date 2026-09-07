import fs from "fs";
import path from "path";
import crypto from "crypto";
import type { TestSessionState, TestResult } from "./knowledge-test/types";
import type {
  StudentVerificationRecord,
  VerificationDocumentRecord,
  ProfessionalProfiles,
  SubmissionStatus,
} from "./verification/types";
import type {
  SkillGapAnalysisRecord,
  Educator,
  EducationProgram,
} from "./skill-gap/types";
import {
  SAMPLE_EDUCATORS,
  SAMPLE_EDUCATION_PROGRAMS,
} from "./skill-gap/educator-catalog-data";
import type {
  LearningResourceRecord,
  LearningResourceItem,
} from "./learning/types";
import type { ResumeAnalysisRecord } from "./resume/types";
import type { JobApplicationRecord, SubmitApplicationParams } from "./applications/types";

export interface JobPosting {
  id: string;
  roleTitle: string;
  companyName: string;
  location: string;
  workMode: "Remote" | "Hybrid" | "On-site";
  employmentType: "Full-time" | "Part-time" | "Contract";
  experienceRequirement: string;
  salaryRange: string;
  postedDate: string;
  deadline: string;
  description: string;
  responsibilities: string[];
  requiredQualifications: string[];
  preferredQualifications: string[];
  requiredSkills: string[];
  companyInfo: string;
  applicationSource: string;
  requiredDocumentTypes: string[];
}

export interface InternshipPosting {
  id: string;
  roleTitle: string;
  companyName: string;
  location: string;
  workMode: "Remote" | "Hybrid" | "On-site";
  duration: string;
  stipendRange: string;
  postedDate: string;
  deadline: string;
  description: string;
  responsibilities: string[];
  requiredQualifications: string[];
  preferredQualifications: string[];
  requiredSkills: string[];
  companyInfo: string;
  applicationSource: string;
  requiredDocumentTypes: string[];
}

export const initialJobs: JobPosting[] = [
  {
    id: "job-sec-01",
    roleTitle: "Associate Security Operations Engineer",
    companyName: "CloudArmor Defense Labs",
    location: "Bengaluru, India (Hybrid)",
    workMode: "Hybrid",
    employmentType: "Full-time",
    experienceRequirement: "Fresher / 0-1 Years",
    salaryRange: "₹8,50,000 - ₹12,00,000 / year",
    postedDate: "2026-08-20T00:00:00Z",
    deadline: "2026-10-15T00:00:00Z",
    description: "Triage security events, configure SIEM detection rules, and conduct vulnerability assessment audits across cloud environments.",
    responsibilities: [
      "Analyze and triage real-time alerts from SIEM platforms and cloud intrusion telemetry.",
      "Author customized detection signatures for emerging vulnerabilities (CVEs) and OWASP Top 10 vectors.",
      "Collaborate with engineering teams during incident post-mortems and root-cause analysis.",
      "Conduct baseline vulnerability audits on staging microservices and cloud infrastructure.",
    ],
    requiredQualifications: [
      "Bachelor's degree in Computer Science, Information Security, or relevant STEM field.",
      "Hands-on understanding of network protocols, Linux fundamentals, and Python scripting.",
      "Familiarity with OWASP Top 10 vulnerabilities and modern authentication mechanisms.",
    ],
    preferredQualifications: [
      "Demonstrated participation in CTF competitions or open-source security tool contributions.",
      "Relevant security certifications (CompTIA Security+, CEH, or AWS Certified Security).",
    ],
    requiredSkills: ["OWASP Top 10", "Network Security", "Linux", "Python", "SIEM"],
    companyInfo: "CloudArmor Defense Labs is a next-generation cloud security partner safeguarding multi-cloud enterprises across APAC.",
    applicationSource: "Skill Bridge Campus Placement Drive",
    requiredDocumentTypes: ["student_id", "post_graduation_marksheet"],
  },
  {
    id: "job-dev-02",
    roleTitle: "Junior Full-Stack Cloud Engineer",
    companyName: "NexusScale Technologies",
    location: "Hyderabad, India (Hybrid)",
    workMode: "Hybrid",
    employmentType: "Full-time",
    experienceRequirement: "0-2 Years",
    salaryRange: "₹7,00,000 - ₹10,50,000 / year",
    postedDate: "2026-08-22T00:00:00Z",
    deadline: "2026-10-30T00:00:00Z",
    description: "Build microservices and modern React applications with automated CI/CD testing and cloud infrastructure automation.",
    responsibilities: [
      "Develop responsive frontend features using React, Next.js, and TypeScript.",
      "Author robust REST APIs and database schema migrations using Node.js and PostgreSQL.",
      "Containerize microservices using Docker and assist with Kubernetes CI/CD pipeline automation.",
    ],
    requiredQualifications: [
      "B.Tech / B.E. in Computer Science or equivalent academic degree.",
      "Proficiency in TypeScript, React, and Node.js backend development.",
      "Working knowledge of relational databases and SQL queries.",
    ],
    preferredQualifications: [
      "Experience with Docker containerization and cloud deployments (AWS or GCP).",
      "Contributions to open-source developer tooling.",
    ],
    requiredSkills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "REST API"],
    companyInfo: "NexusScale Technologies builds high-throughput cloud infrastructure solutions for enterprise fintech platforms.",
    applicationSource: "Skill Bridge Corporate Fast-Track",
    requiredDocumentTypes: ["student_id", "post_graduation_marksheet"],
  },
  {
    id: "job-ai-03",
    roleTitle: "ML Platform Associate",
    companyName: "CognitiveMatrix AI",
    location: "Remote",
    workMode: "Remote",
    employmentType: "Full-time",
    experienceRequirement: "Fresher / 0-1 Years",
    salaryRange: "₹9,00,000 - ₹13,00,000 / year",
    postedDate: "2026-08-25T00:00:00Z",
    deadline: "2026-11-05T00:00:00Z",
    description: "Support machine learning pipeline deployment, RAG model evaluation, and dataset feature stores.",
    responsibilities: [
      "Evaluate retrieval accuracy and hallucination rates for enterprise RAG pipelines.",
      "Build model inference wrappers using FastAPI and PyTorch.",
      "Maintain automated dataset preprocessing scripts and feature engineering pipelines.",
    ],
    requiredQualifications: [
      "Degree in Computer Science, Data Science, Artificial Intelligence, or Mathematics.",
      "Strong Python coding skills and familiarity with PyTorch or TensorFlow.",
      "Solid foundation in linear algebra, statistics, and machine learning fundamentals.",
    ],
    preferredQualifications: [
      "Experience with vector databases (Pinecone, Qdrant, Chroma) or LangChain.",
      "Published research or technical blog posts on generative models.",
    ],
    requiredSkills: ["Python", "Machine Learning", "PyTorch", "FastAPI", "SQL"],
    companyInfo: "CognitiveMatrix AI pioneers agentic workflow automation for global healthcare and life sciences enterprises.",
    applicationSource: "Skill Bridge AI Excellence Hiring",
    requiredDocumentTypes: ["student_id", "post_graduation_marksheet", "skill_certifications"],
  },
];

export const initialInternships: InternshipPosting[] = [
  {
    id: "intern-sec-01",
    roleTitle: "Application Security Intern",
    companyName: "SentinelEdge Security",
    location: "Pune, India (Remote)",
    workMode: "Remote",
    duration: "6 Months",
    stipendRange: "₹30,000 - ₹45,000 / month",
    postedDate: "2026-08-15T00:00:00Z",
    deadline: "2026-09-30T00:00:00Z",
    description: "Participate in automated SAST/DAST scanning, code review sessions, and dependency vulnerability audits.",
    responsibilities: [
      "Execute automated SAST scans against test codebases and triage potential findings.",
      "Assist in drafting security review documentation and remediation advice for developer teams.",
      "Research recent CVEs and construct proof-of-concept verification scripts in lab environments.",
    ],
    requiredQualifications: [
      "Enrolled student in Computer Science or related degree program.",
      "Basic understanding of web security principles and scripting skills in Python or JavaScript.",
    ],
    preferredQualifications: [
      "Familiarity with Burp Suite, OWASP ZAP, or GitHub Advanced Security.",
    ],
    requiredSkills: ["OWASP", "JavaScript", "Python", "Git", "Security Fundamentals"],
    companyInfo: "SentinelEdge Security offers managed vulnerability intelligence and red-teaming for cloud startups.",
    applicationSource: "Skill Bridge Campus Placement Drive",
    requiredDocumentTypes: ["student_id"],
  },
  {
    id: "intern-cloud-02",
    roleTitle: "DevOps & Cloud Infrastructure Intern",
    companyName: "KubeScale Systems",
    location: "Bengaluru, India (Hybrid)",
    workMode: "Hybrid",
    duration: "6 Months",
    stipendRange: "₹25,000 - ₹40,000 / month",
    postedDate: "2026-08-18T00:00:00Z",
    deadline: "2026-10-10T00:00:00Z",
    description: "Assist with Kubernetes cluster configuration, Helm chart authoring, and monitoring telemetry dashboards.",
    responsibilities: [
      "Write and validate Dockerfiles for containerized microservice architectures.",
      "Assist senior DevOps engineers in maintaining Prometheus and Grafana telemetry dashboards.",
      "Automate repetitive deployment tasks using Bash and GitHub Actions workflows.",
    ],
    requiredQualifications: [
      "Enrolled in 3rd or 4th year B.Tech / B.E. degree program.",
      "Familiarity with Linux terminal commands and basic Docker containers.",
    ],
    preferredQualifications: [
      "Experience with Kubernetes basics or self-hosted cloud homelabs.",
    ],
    requiredSkills: ["Docker", "Linux", "Kubernetes Basics", "Bash", "CI/CD"],
    companyInfo: "KubeScale Systems specializes in cloud-native platform engineering and Kubernetes cost optimization.",
    applicationSource: "Skill Bridge Campus Placement Drive",
    requiredDocumentTypes: ["student_id"],
  },
];

export type KnowledgeTestSessionRecord = TestSessionState;
export type KnowledgeTestResultRecord = TestResult;

export type RoleType = "student" | "faculty" | "campus" | "industry";

export interface User {
  id: string;
  email: string;
  role: RoleType;
  passwordHash: string;
  fullName: string;
  isVerified: boolean;
  isAdmin?: boolean;
  createdAt: string;
}

export interface Profile {
  userId: string;
  role: RoleType;
  metadata: Record<string, string | number | undefined>;
}

export interface OtpVerification {
  id: string;
  email: string;
  role: RoleType;
  otpCode: string;
  expiresAt: string;
  attempts: number;
  verified: boolean;
  createdAt: string;
}

export interface HiringRequest {
  id: string;
  companyName: string;
  industryDomain: string;
  jobTitle: string;
  positions: number;
  applicants: number;
  status: "active" | "pending" | "frozen";
  isFrozen: boolean;
  freezeReason?: string;
  updatedAt: string;
}

export interface CampusRequest {
  id: string;
  campusName: string;
  code: string;
  requestType: "Placement Drive" | "Curriculum Verification" | "Student Batch Upload" | "Faculty Verification";
  studentsEnrolled: number;
  status: "active" | "pending" | "frozen";
  isFrozen: boolean;
  freezeReason?: string;
  updatedAt: string;
}

export interface InterestProfileRecord {
  id: string;
  studentId: string;
  sessionId: string;
  confirmedMainDomain: string;
  confirmedMainDomainId: string;
  confirmedSpecificInterest: string;
  explanation: string;
  confidence: number;
  interestSignals: Record<string, number>;
  candidateDomainScores: Record<string, number>;
  phase1AnswerCount: number;
  phase2AnswerCount: number;
  confirmedAt: string;
}

export interface InterestSessionRecord {
  studentId: string;
  sessionId: string;
  phase: 1 | 2;
  broadDomain?: string;
  answers: {
    questionId: string;
    questionText: string;
    selectedOptionId: string;
    selectedOptionText: string;
    phase: 1 | 2;
    signalDelta?: Record<string, number>;
    domainDelta?: Record<string, number>;
  }[];
  signalScores: Record<string, number>;
  domainScores: Record<string, number>;
  status: "intro" | "phase1_in_progress" | "phase1_revealed" | "phase2_in_progress" | "phase2_ready" | "confirmed";
  updatedAt: string;
}

interface DatabaseSchema {
  users: User[];
  profiles: Profile[];
  otps: OtpVerification[];
  hiringRequests: HiringRequest[];
  campusRequests: CampusRequest[];
  interestProfiles: InterestProfileRecord[];
  interestSessions: InterestSessionRecord[];
  knowledgeTestSessions: KnowledgeTestSessionRecord[];
  knowledgeTestResults: KnowledgeTestResultRecord[];
  studentVerifications: StudentVerificationRecord[];
  skillGapAnalyses: SkillGapAnalysisRecord[];
  educators: Educator[];
  educationPrograms: EducationProgram[];
  learningResources: LearningResourceRecord[];
  jobApplications: JobApplicationRecord[];
  resumeAnalyses: ResumeAnalysisRecord[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "skill_bridge.json");

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function generateSixDigitOtp(): string {
  return crypto.randomInt(100000, 999999).toString();
}

function ensureDbExists(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  let data: DatabaseSchema;

  if (!fs.existsSync(DB_FILE)) {
    data = {
      users: [],
      profiles: [],
      otps: [],
      hiringRequests: [],
      campusRequests: [],
      interestProfiles: [],
      interestSessions: [],
      knowledgeTestSessions: [],
      knowledgeTestResults: [],
      studentVerifications: [],
      skillGapAnalyses: [],
      educators: [...SAMPLE_EDUCATORS],
      educationPrograms: [...SAMPLE_EDUCATION_PROGRAMS],
      learningResources: [],
      jobApplications: [],
      resumeAnalyses: [],
    };
  } else {
    try {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      data = JSON.parse(content) as DatabaseSchema;
      if (!data.hiringRequests) data.hiringRequests = [];
      if (!data.campusRequests) data.campusRequests = [];
      if (!data.interestProfiles) data.interestProfiles = [];
      if (!data.interestSessions) data.interestSessions = [];
      if (!data.knowledgeTestSessions) data.knowledgeTestSessions = [];
      if (!data.knowledgeTestResults) data.knowledgeTestResults = [];
      if (!data.studentVerifications) data.studentVerifications = [];
      if (!data.skillGapAnalyses) data.skillGapAnalyses = [];
      if (!data.learningResources) data.learningResources = [];
      if (!data.jobApplications) data.jobApplications = [];
      if (!data.resumeAnalyses) data.resumeAnalyses = [];
      if (!data.educators || data.educators.length === 0) data.educators = [...SAMPLE_EDUCATORS];
      if (!data.educationPrograms || data.educationPrograms.length === 0)
        data.educationPrograms = [...SAMPLE_EDUCATION_PROGRAMS];
    } catch {
      data = {
        users: [],
        profiles: [],
        otps: [],
        hiringRequests: [],
        campusRequests: [],
        interestProfiles: [],
        interestSessions: [],
        knowledgeTestSessions: [],
        knowledgeTestResults: [],
        studentVerifications: [],
        skillGapAnalyses: [],
        educators: [...SAMPLE_EDUCATORS],
        educationPrograms: [...SAMPLE_EDUCATION_PROGRAMS],
        learningResources: [],
        jobApplications: [],
        resumeAnalyses: [],
      };
    }
  }

  let modified = false;

  // 1. Ensure Hidden Admin Account exists in student role
  const adminEmail = "admin@gmail.com";
  const existingAdmin = data.users.find(
    (u) => u.email.toLowerCase() === adminEmail && u.role === "student"
  );

  if (!existingAdmin) {
    const adminUser: User = {
      id: "admin-system-account-id",
      email: adminEmail,
      role: "student",
      passwordHash: hashPassword("admin@123"),
      fullName: "System Administrator",
      isVerified: true,
      isAdmin: true,
      createdAt: new Date().toISOString(),
    };
    data.users.unshift(adminUser);

    const adminProfile: Profile = {
      userId: adminUser.id,
      role: "student",
      metadata: {
        institution: "Skill-Bridge Central Administration",
        degree: "Executive Administration",
        graduationYear: "Permanent",
      },
    };
    data.profiles.unshift(adminProfile);
    modified = true;
  } else {
    // Ensure password and admin status are active
    if (!existingAdmin.isAdmin || existingAdmin.passwordHash !== hashPassword("admin@123")) {
      existingAdmin.isAdmin = true;
      existingAdmin.isVerified = true;
      existingAdmin.passwordHash = hashPassword("admin@123");
      modified = true;
    }
  }

  // 2. Seed realistic Hiring Requests if empty
  if (data.hiringRequests.length === 0) {
    data.hiringRequests = [
      {
        id: "hire-req-1",
        companyName: "Infosys Technologies",
        industryDomain: "Software & Cloud Services",
        jobTitle: "Systems Engineer (Fresher 2025/2026)",
        positions: 45,
        applicants: 128,
        status: "active",
        isFrozen: false,
        updatedAt: new Date().toISOString(),
      },
      {
        id: "hire-req-2",
        companyName: "Apex Dynamics Corp",
        industryDomain: "AI Research & Data Systems",
        jobTitle: "Junior ML Pipeline Specialist",
        positions: 8,
        applicants: 34,
        status: "active",
        isFrozen: false,
        updatedAt: new Date().toISOString(),
      },
      {
        id: "hire-req-3",
        companyName: "Zenith Financial Solutions",
        industryDomain: "FinTech & Payments",
        jobTitle: "Backend Developer - Go / Python",
        positions: 12,
        applicants: 62,
        status: "active",
        isFrozen: false,
        updatedAt: new Date().toISOString(),
      },
    ];
    modified = true;
  }

  // 3. Seed realistic Campus Requests if empty
  if (data.campusRequests.length === 0) {
    data.campusRequests = [
      {
        id: "campus-req-1",
        campusName: "Delhi Technological University (DTU)",
        code: "C-18492",
        requestType: "Placement Drive",
        studentsEnrolled: 820,
        status: "active",
        isFrozen: false,
        updatedAt: new Date().toISOString(),
      },
      {
        id: "campus-req-2",
        campusName: "National Institute of Technology, Trichy",
        code: "C-29381",
        requestType: "Curriculum Verification",
        studentsEnrolled: 640,
        status: "active",
        isFrozen: false,
        updatedAt: new Date().toISOString(),
      },
      {
        id: "campus-req-3",
        campusName: "Birla Institute of Technology and Science",
        code: "C-30114",
        requestType: "Student Batch Upload",
        studentsEnrolled: 490,
        status: "active",
        isFrozen: false,
        updatedAt: new Date().toISOString(),
      },
    ];
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  }

  return data;
}

function saveDb(data: DatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export const db = {
  async findUserByEmailAndRole(
    email: string,
    role: RoleType
  ): Promise<User | null> {
    const normalized = email.toLowerCase().trim();
    const data = ensureDbExists();
    return (
      data.users.find(
        (u) => u.email.toLowerCase() === normalized && u.role === role
      ) || null
    );
  },

  async findUsersByEmail(email: string): Promise<User[]> {
    const normalized = email.toLowerCase().trim();
    const data = ensureDbExists();
    return data.users.filter((u) => u.email.toLowerCase() === normalized);
  },

  async getUserById(id: string): Promise<User | null> {
    const data = ensureDbExists();
    return data.users.find((u) => u.id === id) || null;
  },

  async getUser(id: string): Promise<User | null> {
    return this.getUserById(id);
  },

  async getProfileByUserId(userId: string): Promise<Profile | null> {
    const data = ensureDbExists();
    return data.profiles.find((p) => p.userId === userId) || null;
  },

  async getProfile(userId: string): Promise<Profile | null> {
    return this.getProfileByUserId(userId);
  },

  async createOrUpdatePendingUser(
    userData: {
      email: string;
      role: RoleType;
      password: string;
      fullName: string;
    },
    metadata: Record<string, string | number | undefined>
  ): Promise<{ user: User; profile: Profile }> {
    const data = ensureDbExists();
    const normalized = userData.email.toLowerCase().trim();

    const existingIndex = data.users.findIndex(
      (u) => u.email.toLowerCase() === normalized && u.role === userData.role
    );

    const now = new Date().toISOString();
    let user: User;

    if (existingIndex >= 0) {
      user = {
        ...data.users[existingIndex],
        fullName: userData.fullName,
        passwordHash: hashPassword(userData.password),
        isVerified: false,
      };
      data.users[existingIndex] = user;

      const profIndex = data.profiles.findIndex((p) => p.userId === user.id);
      const profile: Profile = {
        userId: user.id,
        role: userData.role,
        metadata,
      };
      if (profIndex >= 0) {
        data.profiles[profIndex] = profile;
      } else {
        data.profiles.push(profile);
      }
      saveDb(data);
      return { user, profile };
    }

    user = {
      id: crypto.randomUUID(),
      email: normalized,
      role: userData.role,
      passwordHash: hashPassword(userData.password),
      fullName: userData.fullName,
      isVerified: false,
      createdAt: now,
    };

    const profile: Profile = {
      userId: user.id,
      role: userData.role,
      metadata,
    };

    data.users.push(user);
    data.profiles.push(profile);
    saveDb(data);

    return { user, profile };
  },

  async createOrUpdateOtp(
    email: string,
    role: RoleType,
    otpCode: string,
    expiryMinutes = 10
  ): Promise<OtpVerification> {
    const data = ensureDbExists();
    const normalized = email.toLowerCase().trim();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + expiryMinutes * 60000).toISOString();

    data.otps = data.otps.map((o) =>
      o.email.toLowerCase() === normalized && o.role === role
        ? { ...o, verified: false }
        : o
    );

    const otpRecord: OtpVerification = {
      id: crypto.randomUUID(),
      email: normalized,
      role,
      otpCode,
      expiresAt,
      attempts: 0,
      verified: false,
      createdAt: now.toISOString(),
    };

    data.otps.push(otpRecord);
    saveDb(data);

    return otpRecord;
  },

  async getLatestOtp(
    email: string,
    role: RoleType
  ): Promise<OtpVerification | null> {
    const data = ensureDbExists();
    const normalized = email.toLowerCase().trim();
    const matching = data.otps
      .filter(
        (o) =>
          o.email.toLowerCase() === normalized &&
          o.role === role &&
          !o.verified
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return matching[0] || null;
  },

  async verifyUserAndOtp(
    email: string,
    role: RoleType,
    inputOtp: string
  ): Promise<{ success: boolean; error?: string; user?: User }> {
    const data = ensureDbExists();
    const normalized = email.toLowerCase().trim();
    const latestOtp = await this.getLatestOtp(normalized, role);

    if (!latestOtp) {
      return {
        success: false,
        error: `No pending verification code found for your ${role} registration. Please request a new code.`,
      };
    }

    const now = new Date();
    if (new Date(latestOtp.expiresAt) < now) {
      return {
        success: false,
        error: "Verification code has expired. Please request a new code.",
      };
    }

    if (latestOtp.attempts >= 5) {
      return {
        success: false,
        error: "Too many failed attempts. Please request a fresh code.",
      };
    }

    const otpIndex = data.otps.findIndex((o) => o.id === latestOtp.id);
    if (latestOtp.otpCode !== inputOtp.trim()) {
      if (otpIndex >= 0) {
        data.otps[otpIndex].attempts += 1;
        saveDb(data);
      }
      return {
        success: false,
        error: `Invalid verification code. ${4 - latestOtp.attempts} attempts remaining.`,
      };
    }

    if (otpIndex >= 0) {
      data.otps[otpIndex].verified = true;
    }

    const userIndex = data.users.findIndex(
      (u) => u.email.toLowerCase() === normalized && u.role === role
    );
    if (userIndex >= 0) {
      data.users[userIndex].isVerified = true;
      saveDb(data);
      return { success: true, user: data.users[userIndex] };
    }

    saveDb(data);
    return { success: true };
  },

  // ================= ADMIN FUNCTIONS =================

  async getAdminOverview() {
    const data = ensureDbExists();

    const usersWithProfiles = data.users.map((u) => {
      const profile = data.profiles.find((p) => p.userId === u.id);
      return {
        id: u.id,
        email: u.email,
        role: u.role,
        fullName: u.fullName,
        isVerified: u.isVerified,
        isAdmin: !!u.isAdmin,
        createdAt: u.createdAt,
        metadata: profile?.metadata || {},
      };
    });

    const students = usersWithProfiles.filter((u) => u.role === "student" && !u.isAdmin);
    const faculty = usersWithProfiles.filter((u) => u.role === "faculty");
    const campus = usersWithProfiles.filter((u) => u.role === "campus");
    const industry = usersWithProfiles.filter((u) => u.role === "industry");

    const frozenCompaniesCount = data.hiringRequests.filter((h) => h.isFrozen).length;
    const frozenCampusesCount = data.campusRequests.filter((c) => c.isFrozen).length;

    return {
      stats: {
        totalUsers: data.users.filter((u) => !u.isAdmin).length,
        totalStudents: students.length,
        totalFaculty: faculty.length,
        totalCampus: campus.length,
        totalIndustry: industry.length,
        totalFrozen: frozenCompaniesCount + frozenCampusesCount,
      },
      users: usersWithProfiles,
      categorized: {
        students,
        faculty,
        campus,
        industry,
      },
      hiringRequests: data.hiringRequests,
      campusRequests: data.campusRequests,
    };
  },

  async toggleCompanyFreeze(requestId: string, reason?: string): Promise<HiringRequest | null> {
    const data = ensureDbExists();
    const item = data.hiringRequests.find((h) => h.id === requestId);
    if (!item) return null;

    item.isFrozen = !item.isFrozen;
    item.status = item.isFrozen ? "frozen" : "active";
    item.freezeReason = item.isFrozen ? (reason || "Suspicious hiring activity flagged by admin") : undefined;
    item.updatedAt = new Date().toISOString();

    saveDb(data);
    return item;
  },

  async toggleCampusFreeze(requestId: string, reason?: string): Promise<CampusRequest | null> {
    const data = ensureDbExists();
    const item = data.campusRequests.find((c) => c.id === requestId);
    if (!item) return null;

    item.isFrozen = !item.isFrozen;
    item.status = item.isFrozen ? "frozen" : "active";
    item.freezeReason = item.isFrozen ? (reason || "Suspicious campus activity flagged by admin") : undefined;
    item.updatedAt = new Date().toISOString();

    saveDb(data);
    return item;
  },

  async updateHiringRequest(
    requestId: string,
    updates: Partial<HiringRequest>
  ): Promise<HiringRequest | null> {
    const data = ensureDbExists();
    const item = data.hiringRequests.find((h) => h.id === requestId);
    if (!item) return null;

    Object.assign(item, updates, { updatedAt: new Date().toISOString() });
    saveDb(data);
    return item;
  },

  async updateCampusRequest(
    requestId: string,
    updates: Partial<CampusRequest>
  ): Promise<CampusRequest | null> {
    const data = ensureDbExists();
    const item = data.campusRequests.find((c) => c.id === requestId);
    if (!item) return null;

    Object.assign(item, updates, { updatedAt: new Date().toISOString() });
    saveDb(data);
    return item;
  },

  // ================= INTEREST FINDER PERSISTENCE =================

  async saveInterestProfile(record: InterestProfileRecord): Promise<void> {
    const data = ensureDbExists();
    if (!data.interestProfiles) data.interestProfiles = [];

    const existingIndex = data.interestProfiles.findIndex(
      (p) => p.studentId === record.studentId
    );

    if (existingIndex >= 0) {
      data.interestProfiles[existingIndex] = record;
    } else {
      data.interestProfiles.push(record);
    }

    // Invalidate existing skill gap analysis so recommendations are refreshed
    if (data.skillGapAnalyses) {
      for (const a of data.skillGapAnalyses) {
        if (a.studentId === record.studentId) {
          a.isStale = true;
          a.updatedAt = new Date().toISOString();
        }
      }
    }

    saveDb(data);
  },

  async getInterestProfile(studentId: string): Promise<InterestProfileRecord | null> {
    const data = ensureDbExists();
    if (!data.interestProfiles) return null;
    return (
      data.interestProfiles.find((p) => p.studentId === studentId) || null
    );
  },

  async saveInterestSession(session: InterestSessionRecord): Promise<void> {
    const data = ensureDbExists();
    if (!data.interestSessions) data.interestSessions = [];

    const existingIndex = data.interestSessions.findIndex(
      (s) => s.studentId === session.studentId
    );

    if (existingIndex >= 0) {
      data.interestSessions[existingIndex] = session;
    } else {
      data.interestSessions.push(session);
    }

    saveDb(data);
  },

  async getInterestSession(studentId: string): Promise<InterestSessionRecord | null> {
    const data = ensureDbExists();
    if (!data.interestSessions) return null;
    return (
      data.interestSessions.find((s) => s.studentId === studentId) || null
    );
  },

  async clearInterestSession(studentId: string): Promise<void> {
    const data = ensureDbExists();
    if (!data.interestSessions) return;
    data.interestSessions = data.interestSessions.filter(
      (s) => s.studentId !== studentId
    );
    saveDb(data);
  },

  // ================= KNOWLEDGE TEST PERSISTENCE =================

  async saveKnowledgeTestSession(session: KnowledgeTestSessionRecord): Promise<void> {
    const data = ensureDbExists();
    if (!data.knowledgeTestSessions) data.knowledgeTestSessions = [];

    const existingIndex = data.knowledgeTestSessions.findIndex(
      (s) => s.sessionId === session.sessionId
    );

    if (existingIndex >= 0) {
      data.knowledgeTestSessions[existingIndex] = session;
    } else {
      data.knowledgeTestSessions.push(session);
    }

    saveDb(data);
  },

  async getKnowledgeTestSession(sessionId: string): Promise<KnowledgeTestSessionRecord | null> {
    const data = ensureDbExists();
    if (!data.knowledgeTestSessions) return null;
    return data.knowledgeTestSessions.find((s) => s.sessionId === sessionId) || null;
  },

  async getActiveKnowledgeTestSessionByStudent(
    studentId: string
  ): Promise<KnowledgeTestSessionRecord | null> {
    const data = ensureDbExists();
    if (!data.knowledgeTestSessions) return null;
    return (
      data.knowledgeTestSessions.find(
        (s) => s.studentId === studentId && s.status === "in_progress"
      ) || null
    );
  },

  async saveKnowledgeTestResult(result: KnowledgeTestResultRecord): Promise<void> {
    const data = ensureDbExists();
    if (!data.knowledgeTestResults) data.knowledgeTestResults = [];

    const existingIndex = data.knowledgeTestResults.findIndex(
      (r) => r.id === result.id || r.sessionId === result.sessionId
    );

    if (existingIndex >= 0) {
      data.knowledgeTestResults[existingIndex] = result;
    } else {
      data.knowledgeTestResults.push(result);
    }

    // Invalidate existing skill gap analysis so recommendations are refreshed
    if (data.skillGapAnalyses) {
      for (const a of data.skillGapAnalyses) {
        if (a.studentId === result.studentId) {
          a.isStale = true;
          a.updatedAt = new Date().toISOString();
        }
      }
    }

    saveDb(data);
  },

  async getKnowledgeTestResultsByStudent(
    studentId: string
  ): Promise<KnowledgeTestResultRecord[]> {
    const data = ensureDbExists();
    if (!data.knowledgeTestResults) return [];
    return data.knowledgeTestResults
      .filter((r) => r.studentId === studentId)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  },

  async getLatestKnowledgeTestResult(
    studentId: string
  ): Promise<KnowledgeTestResultRecord | null> {
    const results = await this.getKnowledgeTestResultsByStudent(studentId);
    return results.length > 0 ? results[0] : null;
  },

  async getKnowledgeTestResultById(
    resultId: string
  ): Promise<KnowledgeTestResultRecord | null> {
    const data = ensureDbExists();
    if (!data.knowledgeTestResults) return null;
    return data.knowledgeTestResults.find((r) => r.id === resultId) || null;
  },

  // ================= SKILL GAP ANALYSIS OPERATIONS =================

  async saveSkillGapAnalysis(record: SkillGapAnalysisRecord): Promise<void> {
    const data = ensureDbExists();
    if (!data.skillGapAnalyses) data.skillGapAnalyses = [];

    const existingIndex = data.skillGapAnalyses.findIndex(
      (a) => a.id === record.id || a.studentId === record.studentId
    );

    if (existingIndex >= 0) {
      data.skillGapAnalyses[existingIndex] = record;
    } else {
      data.skillGapAnalyses.push(record);
    }

    saveDb(data);
  },

  async getSkillGapAnalysisByStudent(
    studentId: string
  ): Promise<SkillGapAnalysisRecord | null> {
    const data = ensureDbExists();
    if (!data.skillGapAnalyses) return null;
    const records = data.skillGapAnalyses
      .filter((a) => a.studentId === studentId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    return records.length > 0 ? records[0] : null;
  },

  async invalidateSkillGapAnalysis(studentId: string): Promise<void> {
    const data = ensureDbExists();
    if (!data.skillGapAnalyses) return;
    for (const a of data.skillGapAnalyses) {
      if (a.studentId === studentId) {
        a.isStale = true;
        a.updatedAt = new Date().toISOString();
      }
    }
    saveDb(data);
  },

  async getEducators(): Promise<Educator[]> {
    const data = ensureDbExists();
    return data.educators && data.educators.length > 0
      ? data.educators
      : SAMPLE_EDUCATORS;
  },

  async getEducationPrograms(): Promise<EducationProgram[]> {
    const data = ensureDbExists();
    return data.educationPrograms && data.educationPrograms.length > 0
      ? data.educationPrograms
      : SAMPLE_EDUCATION_PROGRAMS;
  },

  // ================= LEARNING RESOURCE OPERATIONS =================

  async saveLearningResources(
    studentId: string,
    analysisId: string,
    resources: LearningResourceItem[]
  ): Promise<void> {
    const data = ensureDbExists();
    if (!data.learningResources) data.learningResources = [];

    const existingIndex = data.learningResources.findIndex(
      (r) => r.studentId === studentId && r.analysisId === analysisId
    );

    const record: LearningResourceRecord = {
      id: `lr_${studentId}_${analysisId}`,
      studentId,
      analysisId,
      type: "youtube_video",
      resources,
      cachedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      data.learningResources[existingIndex] = record;
    } else {
      data.learningResources.push(record);
    }

    saveDb(data);
  },

  async getLearningResourcesByAnalysis(
    studentId: string,
    analysisId: string
  ): Promise<LearningResourceItem[] | null> {
    const data = ensureDbExists();
    if (!data.learningResources) return null;

    const record = data.learningResources.find(
      (r) => r.studentId === studentId && r.analysisId === analysisId
    );

    return record && record.resources ? record.resources : null;
  },

  async clearLearningResources(studentId: string): Promise<void> {
    const data = ensureDbExists();
    if (!data.learningResources) return;
    data.learningResources = data.learningResources.filter(
      (r) => r.studentId !== studentId
    );
    saveDb(data);
  },

  // ================= DOCUMENT VERIFICATION OPERATIONS =================

  async getStudentVerification(studentId: string): Promise<StudentVerificationRecord> {
    const data = ensureDbExists();
    let existing = data.studentVerifications.find((v) => v.studentId === studentId);
    if (!existing) {
      existing = {
        studentId,
        verificationStatus: "NOT_STARTED",
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      data.studentVerifications.push(existing);
      saveDb(data);
      return existing;
    }

    // Deterministic state reconciliation:
    // Required categories: student_id, passport_photo, post_graduation_marksheet, abc_id
    const REQUIRED_CATEGORIES = [
      "student_id",
      "passport_photo",
      "post_graduation_marksheet",
      "abc_id",
    ];
    const uploadedTypes = new Set(existing.documents.map((d) => d.documentType));
    const allRequiredPresent = REQUIRED_CATEGORIES.every((t) => uploadedTypes.has(t));

    // If marked VERIFIED but a required document is missing, self-heal to DOCUMENTS_PENDING
    if (existing.verificationStatus === "VERIFIED" && !allRequiredPresent) {
      existing.verificationStatus = existing.documents.length > 0 ? "DOCUMENTS_PENDING" : "NOT_STARTED";
      existing.updatedAt = new Date().toISOString();
      saveDb(data);
    } else if (allRequiredPresent && existing.verificationStatus !== "VERIFIED") {
      // If all 4 required are present, ensure VERIFIED status
      existing.verificationStatus = "VERIFIED";
      if (!existing.completedAt) {
        existing.completedAt = new Date().toISOString();
      }
      existing.updatedAt = new Date().toISOString();
      saveDb(data);
    }

    return existing;
  },

  async saveVerificationDocument(
    studentId: string,
    document: VerificationDocumentRecord,
    replaceDocId?: string
  ): Promise<StudentVerificationRecord> {
    const data = ensureDbExists();
    let record = data.studentVerifications.find((v) => v.studentId === studentId);
    if (!record) {
      record = {
        studentId,
        verificationStatus: "DOCUMENTS_PENDING",
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      data.studentVerifications.push(record);
    }

    // Grouped categories allow multiple documents
    const groupedTypes = new Set([
      "post_graduation_marksheet",
      "academic_certifications",
      "skill_certifications",
      "competitive_exam",
    ]);

    if (replaceDocId) {
      const idx = record.documents.findIndex((d) => d.id === replaceDocId);
      if (idx >= 0) {
        record.documents[idx] = document;
      } else {
        record.documents.push(document);
      }
    } else if (groupedTypes.has(document.documentType)) {
      // Append to grouped documents
      record.documents.push(document);
    } else {
      // Single-file category: replace existing document of this type
      const existingDocIdx = record.documents.findIndex(
        (d) => d.documentType === document.documentType
      );
      if (existingDocIdx >= 0) {
        record.documents[existingDocIdx] = document;
      } else {
        record.documents.push(document);
      }
    }

    // Strictly re-evaluate completion state based on all 4 required documents
    const REQUIRED_CATEGORIES = [
      "student_id",
      "passport_photo",
      "post_graduation_marksheet",
      "abc_id",
    ];
    const uploadedTypes = new Set(record.documents.map((d) => d.documentType));
    const allRequiredPresent = REQUIRED_CATEGORIES.every((t) => uploadedTypes.has(t));

    if (allRequiredPresent) {
      record.verificationStatus = "VERIFIED";
      if (!record.completedAt) {
        record.completedAt = new Date().toISOString();
      }
    } else {
      record.verificationStatus = record.documents.length > 0 ? "DOCUMENTS_PENDING" : "NOT_STARTED";
    }

    record.updatedAt = new Date().toISOString();
    saveDb(data);
    return record;
  },

  async deleteVerificationDocument(
    studentId: string,
    documentId: string
  ): Promise<StudentVerificationRecord> {
    const data = ensureDbExists();
    const record = data.studentVerifications.find((v) => v.studentId === studentId);
    if (record) {
      record.documents = record.documents.filter((d) => d.id !== documentId);

      // Re-evaluate required categories after deletion
      const REQUIRED_CATEGORIES = [
        "student_id",
        "passport_photo",
        "post_graduation_marksheet",
        "abc_id",
      ];
      const uploadedTypes = new Set(record.documents.map((d) => d.documentType));
      const allRequiredPresent = REQUIRED_CATEGORIES.every((t) => uploadedTypes.has(t));

      if (allRequiredPresent) {
        record.verificationStatus = "VERIFIED";
      } else {
        record.verificationStatus = record.documents.length > 0 ? "DOCUMENTS_PENDING" : "NOT_STARTED";
        record.completedAt = undefined;
      }

      record.updatedAt = new Date().toISOString();
      saveDb(data);
      return record;
    }
    return this.getStudentVerification(studentId);
  },

  async findVerificationDocumentById(
    documentId: string
  ): Promise<{ document: VerificationDocumentRecord; studentId: string } | null> {
    const data = ensureDbExists();
    for (const v of data.studentVerifications || []) {
      const doc = v.documents.find((d) => d.id === documentId);
      if (doc) {
        return { document: doc, studentId: v.studentId };
      }
    }
    return null;
  },

  async saveProfessionalProfiles(
    studentId: string,
    profiles: ProfessionalProfiles
  ): Promise<StudentVerificationRecord> {
    const data = ensureDbExists();
    let record = data.studentVerifications.find((v) => v.studentId === studentId);
    if (!record) {
      record = {
        studentId,
        verificationStatus: "DOCUMENTS_PENDING",
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      data.studentVerifications.push(record);
    }

    record.professionalProfiles = {
      ...record.professionalProfiles,
      ...profiles,
      updatedAt: new Date().toISOString(),
    };
    record.updatedAt = new Date().toISOString();
    saveDb(data);
    return record;
  },

  async completeStudentVerification(studentId: string): Promise<StudentVerificationRecord> {
    const data = ensureDbExists();
    let record = data.studentVerifications.find((v) => v.studentId === studentId);
    if (!record) {
      record = {
        studentId,
        verificationStatus: "NOT_STARTED",
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      data.studentVerifications.push(record);
    }

    const REQUIRED_CATEGORIES = [
      "student_id",
      "passport_photo",
      "post_graduation_marksheet",
      "abc_id",
    ];
    const uploadedTypes = new Set(record.documents.map((d) => d.documentType));
    const allRequiredPresent = REQUIRED_CATEGORIES.every((t) => uploadedTypes.has(t));

    if (!allRequiredPresent) {
      throw new Error("All 4 required documents must be submitted before completion.");
    }

    record.verificationStatus = "VERIFIED";
    record.updatedAt = new Date().toISOString();
    record.completedAt = record.completedAt || new Date().toISOString();

    saveDb(data);
    return record;
  },

  // ================= WORKFLOW PROGRESSION & DASHBOARD =================

  async getStudentWorkflowStatus(studentId: string) {
    const verification = await this.getStudentVerification(studentId);
    const interestProfile = await this.getInterestProfile(studentId);
    const activeKnowledgeSession = await this.getActiveKnowledgeTestSessionByStudent(studentId);
    const latestKnowledgeResult = await this.getLatestKnowledgeTestResult(studentId);

    const isVerificationCompleted = verification.verificationStatus === "VERIFIED";
    const isVerificationInProgress =
      verification.documents.length > 0 ||
      verification.verificationStatus === "DOCUMENTS_PENDING";
    const isInterestFinderCompleted = !!interestProfile;
    const isKnowledgeTestCompleted = !!latestKnowledgeResult;
    const isKnowledgeTestInProgress = !!activeKnowledgeSession;
    const skillGapAnalysis = await this.getSkillGapAnalysisByStudent(studentId);
    const isSkillGapCompleted =
      isKnowledgeTestCompleted &&
      Boolean(skillGapAnalysis && !skillGapAnalysis.isStale);
    const isAdvancedVerified = await this.isStudentAdvancedVerified(studentId);

    // Determine current focus stage (1: Document Verification -> 2: Interest Finder -> 3: Knowledge Testing -> 4: Skill Gap -> 5: Learning)
    let currentFocusStageId = 1;
    if (!isVerificationCompleted) {
      currentFocusStageId = 1;
    } else if (!isInterestFinderCompleted) {
      currentFocusStageId = 2;
    } else if (!isKnowledgeTestCompleted) {
      currentFocusStageId = 3;
    } else if (!isSkillGapCompleted) {
      currentFocusStageId = 4;
    } else {
      currentFocusStageId = 5;
    }

    const sections = [
      {
        id: 1,
        slug: "document-verification",
        name: "Document Submission",
        shortDescription: "Upload required academic and identity documents to complete your student profile.",
        route: "/student/document-verification",
        iconName: "FileCheck",
        status: isVerificationCompleted
          ? "completed"
          : isVerificationInProgress
          ? "in_progress"
          : "available",
        statusLabel: isVerificationCompleted
          ? "Completed"
          : isVerificationInProgress
          ? "In Progress"
          : "Start Here",
        isCurrentFocus: currentFocusStageId === 1,
        actionText: isVerificationCompleted
          ? "View Credentials"
          : isVerificationInProgress
          ? "Complete Verification"
          : "Start Verification",
      },
      {
        id: 2,
        slug: "interest-finder",
        name: "Interest Finder",
        shortDescription: "Discover your true technical interest and specific engineering niche.",
        route: "/student/interest-finder",
        iconName: "Compass",
        status: isInterestFinderCompleted
          ? "completed"
          : isVerificationCompleted
          ? "available"
          : "locked",
        statusLabel: isInterestFinderCompleted
          ? "Completed"
          : isVerificationCompleted
          ? "Available"
          : "Locked",
        lockedReason: !isVerificationCompleted
          ? "Complete Document Verification to unlock your Interest Finder exploration."
          : undefined,
        isCurrentFocus: currentFocusStageId === 2,
        actionText: isInterestFinderCompleted
          ? "Review Profile"
          : isVerificationCompleted
          ? "Start Exploration"
          : "Locked",
      },
      {
        id: 3,
        slug: "knowledge-testing",
        name: "Knowledge Testing",
        shortDescription: "Measure what you already know in your chosen technical focus area.",
        route: "/student/knowledge-testing",
        iconName: "ClipboardCheck",
        status: isKnowledgeTestCompleted
          ? "completed"
          : isKnowledgeTestInProgress
          ? "in_progress"
          : isInterestFinderCompleted
          ? "available"
          : "locked",
        statusLabel: isKnowledgeTestCompleted
          ? "Completed"
          : isKnowledgeTestInProgress
          ? "In Progress"
          : isInterestFinderCompleted
          ? "Available"
          : "Locked",
        lockedReason: !isInterestFinderCompleted
          ? "Complete Interest Finder to unlock your calibrated assessment."
          : undefined,
        isCurrentFocus: currentFocusStageId === 3,
        actionText: isKnowledgeTestCompleted
          ? "View Report"
          : isKnowledgeTestInProgress
          ? "Resume Test"
          : isInterestFinderCompleted
          ? "Take Assessment"
          : "Locked",
      },
      {
        id: 4,
        slug: "skill-gap",
        name: "Skill Gap & Suggestions",
        shortDescription: "Identify missing competencies and target elimination roadmaps.",
        route: "/student/skill-gap",
        iconName: "TrendingUp",
        status: isSkillGapCompleted
          ? "completed"
          : isKnowledgeTestCompleted
          ? "available"
          : "locked",
        statusLabel: isSkillGapCompleted
          ? "Completed"
          : isKnowledgeTestCompleted
          ? "Available"
          : "Locked",
        lockedReason: !isKnowledgeTestCompleted
          ? "Complete Knowledge Testing to unlock Skill Gap Analysis."
          : undefined,
        isCurrentFocus: currentFocusStageId === 4,
        actionText: isSkillGapCompleted
          ? "Review Analysis"
          : isKnowledgeTestCompleted
          ? "Analyze Gaps"
          : "Locked",
      },
      {
        id: 5,
        slug: "learning",
        name: "Learning / Mentoring",
        shortDescription: "Access curated curriculum tracks and faculty mentorship.",
        route: "/student/learning",
        iconName: "BookOpen",
        status: isSkillGapCompleted ? "available" : "locked",
        statusLabel: isSkillGapCompleted ? "Available" : "Locked",
        lockedReason: !isSkillGapCompleted
          ? "Complete Skill Gap Analysis to access learning tracks."
          : undefined,
        isCurrentFocus: currentFocusStageId === 5,
        actionText: isSkillGapCompleted ? "Explore Resources" : "Locked",
      },
      {
        id: 6,
        slug: "resume",
        name: "Resume Checker",
        shortDescription: "Analyze your resume with ATS-style diagnostics and keyword matching.",
        route: "/student/resume-checker",
        iconName: "FileText",
        status: "available",
        statusLabel: "Available",
        isLocked: false,
        actionText: "Analyze Resume",
      },
      {
        id: 7,
        slug: "opportunities",
        name: "Jobs & Internships",
        shortDescription: "Explore verified employer openings and campus placement drives.",
        route: "/student/opportunities",
        iconName: "Briefcase",
        status: isAdvancedVerified || isSkillGapCompleted ? "available" : "locked",
        statusLabel: isAdvancedVerified ? "Advanced Access" : isSkillGapCompleted ? "Available" : "Locked",
        lockedReason: !isAdvancedVerified && !isSkillGapCompleted
          ? "Complete the required learning stage to unlock job opportunities."
          : undefined,
        isLocked: !isAdvancedVerified && !isSkillGapCompleted,
        actionText: isAdvancedVerified || isSkillGapCompleted ? "Explore Opportunities" : "Locked",
      },
      {
        id: 8,
        slug: "applications",
        name: "Track Applications",
        shortDescription: "Monitor interview rounds, corporate feedback, and offer letters.",
        route: "/student/applications",
        iconName: "Send",
        status: "available",
        statusLabel: "Available",
        isLocked: false,
        actionText: "View Applications",
      },
    ];

    return {
      currentFocusStageId,
      interestProfile,
      latestKnowledgeResult,
      activeKnowledgeSession,
      isAdvancedVerified,
      sections,
    };
  },

  // ================= ADVANCED STATUS EVALUATION =================
  async isStudentAdvancedVerified(studentId: string): Promise<boolean> {
    const latestResult = await this.getLatestKnowledgeTestResult(studentId);
    if (!latestResult) return false;
    return (
      latestResult.difficulty === "advanced" ||
      latestResult.performanceTier === "Expert" ||
      latestResult.performanceTier === "Strong" ||
      (latestResult.scorePercent !== undefined && latestResult.scorePercent >= 80)
    );
  },

  // ================= RESUME ANALYSIS OPERATIONS =================
  async getResumeAnalysisByStudent(
    studentId: string
  ): Promise<ResumeAnalysisRecord | null> {
    const data = ensureDbExists();
    if (!data.resumeAnalyses) return null;
    const records = data.resumeAnalyses
      .filter((a) => a.studentId === studentId)
      .sort(
        (a, b) =>
          new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime()
      );
    return records.length > 0 ? records[0] : null;
  },

  async saveResumeAnalysis(
    recordOrStudentId: ResumeAnalysisRecord | string,
    recordParam?: ResumeAnalysisRecord
  ): Promise<void> {
    const data = ensureDbExists();
    if (!data.resumeAnalyses) data.resumeAnalyses = [];
    const record: ResumeAnalysisRecord =
      typeof recordOrStudentId === "string"
        ? { ...recordParam!, studentId: recordOrStudentId }
        : recordOrStudentId;

    const existingIdx = data.resumeAnalyses.findIndex(
      (a) =>
        a.id === record.id ||
        (a.studentId === record.studentId &&
          a.jobTitle === record.jobTitle &&
          a.hasJobDescription === record.hasJobDescription)
    );
    if (existingIdx >= 0) {
      data.resumeAnalyses[existingIdx] = record;
    } else {
      data.resumeAnalyses.unshift(record);
    }
    saveDb(data);
  },

  async deleteResumeAnalysis(studentId: string, analysisId?: string): Promise<void> {
    const data = ensureDbExists();
    if (!data.resumeAnalyses) return;
    if (analysisId) {
      data.resumeAnalyses = data.resumeAnalyses.filter(
        (a) => !(a.studentId === studentId && a.id === analysisId)
      );
    } else {
      data.resumeAnalyses = data.resumeAnalyses.filter(
        (a) => a.studentId !== studentId
      );
    }
    saveDb(data);
  },

  // ================= JOB APPLICATIONS OPERATIONS =================
  async getJobApplicationsByStudent(
    studentId: string
  ): Promise<JobApplicationRecord[]> {
    const data = ensureDbExists();
    if (!data.jobApplications) return [];
    return data.jobApplications
      .filter((a) => a.studentId === studentId)
      .sort(
        (a, b) =>
          new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
      );
  },

  async saveJobApplication(
    paramsOrStudentId: SubmitApplicationParams | JobApplicationRecord | string,
    paramsParam?: any
  ): Promise<JobApplicationRecord> {
    const data = ensureDbExists();
    if (!data.jobApplications) data.jobApplications = [];

    const now = new Date().toISOString();
    let newRecord: JobApplicationRecord;

    if (typeof paramsOrStudentId === "string") {
      newRecord = {
        id: paramsParam?.id || `app_${paramsOrStudentId}_${Date.now()}`,
        studentId: paramsOrStudentId,
        jobId: paramsParam?.jobId,
        companyName: paramsParam?.companyName || "Partner Company",
        roleTitle: paramsParam?.roleTitle || paramsParam?.position || "Engineering Role",
        position: paramsParam?.position || paramsParam?.roleTitle || "Engineering Role",
        location: paramsParam?.location || "Remote / Hybrid",
        type: paramsParam?.employmentType || paramsParam?.type || "full_time",
        employmentType: paramsParam?.employmentType || "Full-time",
        salaryRange: paramsParam?.salaryRange,
        status: paramsParam?.status || "applied",
        appliedAt: paramsParam?.appliedAt || now,
        statusUpdatedAt: now,
        timeline: paramsParam?.timeline || [
          {
            status: "applied",
            date: now,
            title: "Application Submitted",
            description: "Application submitted and queued for recruiter review.",
          },
        ],
        notes: paramsParam?.notes,
        applicantFullName: paramsParam?.applicantFullName,
        applicantEmail: paramsParam?.applicantEmail,
        applicantPhone: paramsParam?.applicantPhone,
        resumeFileName: paramsParam?.resumeFileName,
        submittedDocumentTypes: paramsParam?.submittedDocumentTypes,
        coverLetter: paramsParam?.coverLetter,
        portfolioUrl: paramsParam?.portfolioUrl,
        githubUrl: paramsParam?.githubUrl,
        linkedinUrl: paramsParam?.linkedinUrl,
      };
    } else {
      const p = paramsOrStudentId as any;
      newRecord = {
        id: p.id || `app_${p.studentId}_${Date.now()}`,
        studentId: p.studentId,
        jobId: p.jobId,
        companyName: p.companyName,
        roleTitle: p.roleTitle || p.position || "Engineering Role",
        position: p.position || p.roleTitle || "Engineering Role",
        location: p.location || "Remote / Hybrid",
        type: p.employmentType || p.type || "full_time",
        employmentType: p.employmentType || "Full-time",
        salaryRange: p.salaryRange,
        status: p.status || "applied",
        appliedAt: p.appliedAt || now,
        statusUpdatedAt: now,
        timeline: p.timeline || [
          {
            status: "applied",
            date: now,
            title: "Application Submitted",
            description: "Application submitted and queued for recruiter review.",
          },
        ],
        notes: p.notes,
        applicantFullName: p.applicantFullName,
        applicantEmail: p.applicantEmail,
        applicantPhone: p.applicantPhone,
        resumeFileName: p.resumeFileName,
        submittedDocumentTypes: p.submittedDocumentTypes,
        coverLetter: p.coverLetter,
        portfolioUrl: p.portfolioUrl,
        githubUrl: p.githubUrl,
        linkedinUrl: p.linkedinUrl,
      };
    }

    // Prevent duplicate applications
    if (newRecord.jobId) {
      const duplicate = data.jobApplications.find(
        (a) => a.studentId === newRecord.studentId && a.jobId === newRecord.jobId
      );
      if (duplicate) {
        throw new Error("You have already submitted an application for this opportunity.");
      }
    }

    data.jobApplications.unshift(newRecord);
    saveDb(data);
    return newRecord;
  },

  async getJobOrInternshipById(id: string): Promise<JobPosting | InternshipPosting | null> {
    const job = initialJobs.find((j) => j.id === id);
    if (job) return job;
    const internship = initialInternships.find((i) => i.id === id);
    if (internship) return internship;
    return null;
  },

  async getAvailableJobs(): Promise<JobPosting[]> {
    return initialJobs;
  },
  async getAvailableInternships(): Promise<InternshipPosting[]> {
    return initialInternships;
  },
};
