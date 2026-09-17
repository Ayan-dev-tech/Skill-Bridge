import { NextResponse } from "next/server";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { askAyushAssistant } from "@/lib/ayush/assistant-service";

export async function POST(request: Request) {
  try {
    const { student, error: authError } = await getAuthenticatedStudent(request);
    if (authError || !student || !student.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Authenticated AYUSH student session required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const query = typeof body?.query === "string" ? body.query.trim() : "";
    let targetRoleId = typeof body?.targetRoleId === "string" ? body.targetRoleId.trim() : undefined;

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Query parameter is required." },
        { status: 400 }
      );
    }

    // If a targetRoleId is provided OR query selects an AYUSH role, validate and authoritatively persist
    const { parseAyushRoleFromText } = await import("@/lib/ayush/assistant-service");
    const { getAyushTargetRole } = await import("@/lib/ayush/competencies");
    const validRole = (targetRoleId ? getAyushTargetRole(targetRoleId) : null) || parseAyushRoleFromText(query);

    if (validRole) {
      targetRoleId = validRole.id;
      const { db } = await import("@/lib/db");
      const { createDefaultSkillPassport } = await import("@/lib/ayush/passport");
      let passport = await db.getAyushSkillPassport(student.id);
      if (!passport) {
        passport = createDefaultSkillPassport(student.id, student.fullName);
      }
      if (passport.course !== validRole.id) {
        passport.course = validRole.id;
        passport.ayushSystem = validRole.ayushSystem as any;
        passport.updatedAt = new Date().toISOString();
        await db.saveAyushSkillPassport(passport);
      }
    }

    const answer = await askAyushAssistant(student.id, query, targetRoleId);

    return NextResponse.json({
      success: true,
      data: answer,
    });
  } catch (err) {
    console.error("Assistant API Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal error processing assistant request." },
      { status: 500 }
    );
  }
}
