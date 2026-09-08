import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  try {
    const { adminUser, error } = await getAuthenticatedAdmin(request);
    if (!adminUser) {
      return NextResponse.json({ error: error || "Unauthorized." }, { status: 401 });
    }

    const overview = await db.getAdminOverview();
    return NextResponse.json({
      success: true,
      data: overview,
    });
  } catch (error) {
    console.error("Admin overview error:", error);
    return NextResponse.json(
      { error: "Failed to load admin overview data." },
      { status: 500 }
    );
  }
}
