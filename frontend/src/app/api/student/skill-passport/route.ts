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
