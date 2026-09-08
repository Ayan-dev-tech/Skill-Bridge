import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedAdmin } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const { adminUser, error } = await getAuthenticatedAdmin(request);
    if (!adminUser) {
      return NextResponse.json({ error: error || "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const { type, id, reason } = body;

    if (!type || !id) {
      return NextResponse.json(
        { error: "Target type ('company' or 'campus') and target ID are required." },
        { status: 400 }
      );
    }

    if (type === "company") {
      const updated = await db.toggleCompanyFreeze(id, reason);
      if (!updated) {
        return NextResponse.json({ error: "Company request not found." }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: updated.isFrozen
          ? `Hiring has been frozen for ${updated.companyName}.`
          : `Hiring has been restored for ${updated.companyName}.`,
        item: updated,
      });
    } else if (type === "campus") {
      const updated = await db.toggleCampusFreeze(id, reason);
      if (!updated) {
        return NextResponse.json({ error: "Campus request not found." }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: updated.isFrozen
          ? `Activities have been frozen for ${updated.campusName}.`
          : `Activities have been restored for ${updated.campusName}.`,
        item: updated,
      });
    } else {
      return NextResponse.json(
        { error: "Invalid type. Must be 'company' or 'campus'." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Admin freeze error:", error);
    return NextResponse.json(
      { error: "Failed to execute freeze action." },
      { status: 500 }
    );
  }
}
