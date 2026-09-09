import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedCampus } from "@/lib/campus/campus-auth";

export async function GET(request: Request) {
  try {
    const { campusUser, error, status: authStatus } = await getAuthenticatedCampus(request);
    if (!campusUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: authStatus || 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all"; // "industries" | "posts" | "all"
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (type === "industries") {
      const indResponse = await db.getCampusIndustries(campusUser.id, { search, status, page, limit });
      return NextResponse.json({ success: true, ...indResponse });
    }

    if (type === "posts") {
      const companyName = searchParams.get("companyName") || "";
      const hiringType = searchParams.get("hiringType") || "";
      const postsResponse = await db.getCampusHiringPosts(campusUser.id, {
        search,
        companyName,
        hiringType,
        status: status || "published",
        page,
        limit,
      });
      return NextResponse.json({ success: true, ...postsResponse });
    }

    // Default: Return both
    const [indResponse, postsResponse] = await Promise.all([
      db.getCampusIndustries(campusUser.id, { limit: 50 }),
      db.getCampusHiringPosts(campusUser.id, { limit: 50 }),
    ]);

    return NextResponse.json({
      success: true,
      industries: indResponse.industries,
      posts: postsResponse.posts,
      totalIndustries: indResponse.totalCount,
      totalPosts: postsResponse.totalCount,
    });
  } catch (error) {
    console.error("Error fetching campus industry hiring:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load industry and hiring data" },
      { status: 500 }
    );
  }
}
