import fs from "fs";
import path from "path";
import crypto from "crypto";

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

interface DatabaseSchema {
  users: User[];
  profiles: Profile[];
  otps: OtpVerification[];
  hiringRequests: HiringRequest[];
  campusRequests: CampusRequest[];
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
    };
  } else {
    try {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      data = JSON.parse(content) as DatabaseSchema;
      if (!data.hiringRequests) data.hiringRequests = [];
      if (!data.campusRequests) data.campusRequests = [];
    } catch {
      data = {
        users: [],
        profiles: [],
        otps: [],
        hiringRequests: [],
        campusRequests: [],
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
};
