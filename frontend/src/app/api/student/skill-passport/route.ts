/**
 * GET /api/student/skill-passport
 * Retrieves the AYUSH Skill Passport for the authenticated student.
 * If not initialized yet, creates and persists a default passport based on the student's institutional record.
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { createDefaultSkillPassport } from "@/lib/ayush/passport";

export async function GET(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    let passport = await db.getAyushSkillPassport(student.id);

    if (!passport) {
      passport = createDefaultSkillPassport(student.id, student.fullName);
      await db.saveAyushSkillPassport(passport);
    }

    return NextResponse.json({
      success: true,
      passport,
    });
  } catch (error) {
    console.error("Failed to load AYUSH Skill Passport:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve AYUSH Skill Passport" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const requestedRoleId = typeof body?.targetRoleId === "string" ? body.targetRoleId.trim() : "";

    const { getAyushTargetRole } = await import("@/lib/ayush/competencies");
    const validRole = getAyushTargetRole(requestedRoleId);
    if (!validRole) {
      return NextResponse.json(
        { success: false, error: `Invalid canonical AYUSH role: "${requestedRoleId}"` },
        { status: 400 }
      );
    }

    let passport = await db.getAyushSkillPassport(student.id);
    if (!passport) {
      passport = createDefaultSkillPassport(student.id, student.fullName);
    }

    // Persist canonical target role onto passport
    passport.course = validRole.id;
    passport.ayushSystem = validRole.ayushSystem as any;
    passport.updatedAt = new Date().toISOString();

    await db.saveAyushSkillPassport(passport);

    return NextResponse.json({
      success: true,
      targetRole: validRole,
      passport,
    });
  } catch (error) {
    console.error("Failed to update target role in AYUSH Skill Passport:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update target role" },
      { status: 500 }
    );
  }
}
