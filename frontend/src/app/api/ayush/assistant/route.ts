import { NextResponse } from "next/server";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { getAuthenticatedFaculty } from "@/lib/faculty/faculty-auth";
import { getAuthenticatedCampus } from "@/lib/campus/campus-auth";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";
import { getAuthenticatedAdmin } from "@/lib/admin/admin-auth";
import {
  askRoleAssistant,
  type AssistantUserRole,
} from "@/lib/ayush/assistant-service";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const query = typeof body?.query === "string" ? body.query.trim() : "";
    const requestedRole = (typeof body?.role === "string" ? body.role.trim().toLowerCase() : "student") as AssistantUserRole;
    const targetRoleId = typeof body?.targetRoleId === "string" ? body.targetRoleId.trim() : undefined;

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Query parameter is required." },
        { status: 400 }
      );
    }

    let authenticatedUserId: string | null = null;
    let validatedRole: AssistantUserRole = requestedRole;

    // Server-side authentication and authorization based on role
    switch (requestedRole) {
      case "faculty": {
        const { facultyUser, error } = await getAuthenticatedFaculty(request);
        if (error || !facultyUser) {
          return NextResponse.json(
            { success: false, error: "Unauthorized. Faculty session required." },
            { status: 401 }
          );
        }
        authenticatedUserId = facultyUser.id;
        break;
      }

      case "campus": {
        const { campusUser, error } = await getAuthenticatedCampus(request);
        if (error || !campusUser) {
          return NextResponse.json(
            { success: false, error: "Unauthorized. Institutional campus session required." },
            { status: 401 }
          );
        }
        authenticatedUserId = campusUser.id;
        break;
      }

      case "industry": {
        const { industryUser, error } = await getAuthenticatedIndustry(request, undefined, { allowFallback: false });
        if (error || !industryUser) {
          return NextResponse.json(
            { success: false, error: "Unauthorized. Industry partner session required." },
            { status: 401 }
          );
        }
        authenticatedUserId = industryUser.id;
        break;
      }

      case "admin": {
        const { adminUser, error } = await getAuthenticatedAdmin(request);
        if (error || !adminUser) {
          return NextResponse.json(
            { success: false, error: "Unauthorized. Administrator session required." },
            { status: 401 }
          );
        }
        authenticatedUserId = adminUser.id;
        break;
      }

      case "student":
      default: {
        const { student, error } = await getAuthenticatedStudent(request);
        if (error || !student || !student.id) {
          return NextResponse.json(
            { success: false, error: "Unauthorized. AYUSH scholar session required." },
            { status: 401 }
          );
        }
        authenticatedUserId = student.id;
        validatedRole = "student";
        break;
      }
    }

    const answer = await askRoleAssistant({
      role: validatedRole,
      userId: authenticatedUserId,
      query,
      targetRoleId,
    });

    return NextResponse.json({
      success: true,
      data: answer,
    });
  } catch (err) {
    console.error("Universal AYUSH Assistant API Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal error processing assistant request." },
      { status: 500 }
    );
  }
}
