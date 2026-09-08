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
    const { type, id, updates } = body;

    if (!type || !id || !updates) {
      return NextResponse.json(
        { error: "Type, ID, and updates are required." },
        { status: 400 }
      );
    }

    if (type === "hiring") {
      const updated = await db.updateHiringRequest(id, updates);
      if (!updated) {
        return NextResponse.json({ error: "Hiring request not found." }, { status: 404 });
      }
      return NextResponse.json({ success: true, item: updated });
    } else if (type === "campus") {
      const updated = await db.updateCampusRequest(id, updates);
      if (!updated) {
        return NextResponse.json({ error: "Campus request not found." }, { status: 404 });
      }
      return NextResponse.json({ success: true, item: updated });
    } else {
      return NextResponse.json({ error: "Invalid type." }, { status: 400 });
    }
  } catch (error) {
    console.error("Admin request update error:", error);
    return NextResponse.json(
      { error: "Failed to update request." },
      { status: 500 }
    );
  }
}
