import fs from "fs";
import path from "path";
import crypto from "crypto";
import type { TestSessionState, TestResult } from "./knowledge-test/types";
import type {
  StudentVerificationRecord,
  VerificationDocumentRecord,
  FaceCaptureRecord,
  VerificationState,
} from "./verification/types";

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

  // ================= DOCUMENT VERIFICATION OPERATIONS =================

  async getStudentVerification(studentId: string): Promise<StudentVerificationRecord> {
    const data = ensureDbExists();
    const existing = data.studentVerifications.find((v) => v.studentId === studentId);
    if (existing) {
      return existing;
    }

    const newRecord: StudentVerificationRecord = {
      studentId,
      verificationStatus: "NOT_STARTED",
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.studentVerifications.push(newRecord);
    saveDb(data);
    return newRecord;
  },

  async saveVerificationDocument(
    studentId: string,
    document: VerificationDocumentRecord
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

    // Replace if document of this type already exists, otherwise push
    const existingDocIdx = record.documents.findIndex(
      (d) => d.documentType === document.documentType
    );
    if (existingDocIdx >= 0) {
      record.documents[existingDocIdx] = document;
    } else {
      record.documents.push(document);
    }

    // Update state
    if (record.verificationStatus === "NOT_STARTED") {
      record.verificationStatus = "DOCUMENTS_PENDING";
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
      if (record.documents.length === 0 && !record.faceCapture && record.verificationStatus !== "VERIFIED") {
        record.verificationStatus = "NOT_STARTED";
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


  async saveFaceCapture(
    studentId: string,
    capture: FaceCaptureRecord
  ): Promise<StudentVerificationRecord> {
    const data = ensureDbExists();
    let record = data.studentVerifications.find((v) => v.studentId === studentId);
    if (!record) {
      record = {
        studentId,
        verificationStatus: "FACE_PENDING",
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      data.studentVerifications.push(record);
    }

    record.faceCapture = capture;
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
        verificationStatus: "VERIFIED",
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };
      data.studentVerifications.push(record);
    } else {
      record.verificationStatus = "VERIFIED";
      record.updatedAt = new Date().toISOString();
      record.completedAt = new Date().toISOString();
    }

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
      verification.verificationStatus === "DOCUMENTS_PENDING" ||
      verification.verificationStatus === "FACE_PENDING";
    const isInterestFinderCompleted = !!interestProfile;
    const isKnowledgeTestCompleted = !!latestKnowledgeResult;
    const isKnowledgeTestInProgress = !!activeKnowledgeSession;

    // Determine current focus stage (1: Document Verification -> 2: Interest Finder -> 3: Knowledge Testing -> 4: Skill Gap)
    let currentFocusStageId = 1;
    if (!isVerificationCompleted) {
      currentFocusStageId = 1;
    } else if (!isInterestFinderCompleted) {
      currentFocusStageId = 2;
    } else if (!isKnowledgeTestCompleted) {
      currentFocusStageId = 3;
    } else {
      currentFocusStageId = 4;
    }

    const sections = [
      {
        id: 1,
        slug: "document-verification",
        name: "Document Verification",
        shortDescription: "Authenticate academic transcripts, marksheets, and institutional photo ID.",
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
        status: "locked",
        statusLabel: "Locked",
        lockedReason: "Complete Document Verification to unlock Skill Gap Analysis.",
        isCurrentFocus: false,
        actionText: "Locked",
      },
      {
        id: 5,
        slug: "learning",
        name: "Learning / Mentoring",
        shortDescription: "Access curated curriculum tracks and faculty mentorship.",
        route: "/student/learning",
        iconName: "BookOpen",
        status: "locked",
        statusLabel: "Locked",
        lockedReason: "Complete Skill Gap Analysis to access learning tracks.",
        isCurrentFocus: false,
        actionText: "Locked",
      },
      {
        id: 6,
        slug: "resume-builder",
        name: "Resume Builder",
        shortDescription: "Generate an industry-standard verified technical resume.",
        route: "/student/resume",
        iconName: "FileText",
        status: "locked",
        statusLabel: "Locked",
        lockedReason: "Progress through learning tracks to generate your resume.",
        isCurrentFocus: false,
        actionText: "Locked",
      },
      {
        id: 7,
        slug: "jobs-internships",
        name: "Jobs & Internships",
        shortDescription: "Explore verified employer openings and campus placement drives.",
        route: "/student/opportunities",
        iconName: "Briefcase",
        status: "locked",
        statusLabel: "Locked",
        lockedReason: "Complete your verified resume to apply for opportunities.",
        isCurrentFocus: false,
        actionText: "Locked",
      },
      {
        id: 8,
        slug: "track-applications",
        name: "Track Applications",
        shortDescription: "Monitor interview rounds, corporate feedback, and offer letters.",
        route: "/student/applications",
        iconName: "Send",
        status: "locked",
        statusLabel: "Locked",
        lockedReason: "Apply to positions to track your active applications.",
        isCurrentFocus: false,
        actionText: "Locked",
      },
    ];

    return {
      currentFocusStageId,
      interestProfile,
      latestKnowledgeResult,
      activeKnowledgeSession,
      sections,
    };
  },
};
