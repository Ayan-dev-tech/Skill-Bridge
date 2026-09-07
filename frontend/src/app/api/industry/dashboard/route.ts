import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";
import type { IndustryDashboardSummary } from "@/lib/industry/types";

export async function GET(request: Request) {
  try {
    const { industryUser, error } = await getAuthenticatedIndustry(request);
    if (!industryUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: 401 }
      );
    }

    const profileData = await db.getIndustryProfile(industryUser.id);
    const companyName = profileData?.metadata?.companyName || industryUser.fullName;

    const stats = await db.getIndustryDashboardStats(industryUser.id, companyName);

    const summary: IndustryDashboardSummary = {
      organizationName: companyName,
      industryDomain: profileData?.metadata?.industryDomain || "Technology & Software",
      status: profileData?.metadata?.verificationStatus || "verified",
      metrics: {
        activeHiring: stats.activeHiring,
        draftHiring: stats.draftHiring,
        totalApplications: stats.totalApplications,
        shortlistedCandidates: stats.shortlistedCandidates,
        upcomingInterviews: stats.upcomingInterviews,
        questionBankCount: stats.questionBankCount,
      },
      recentActivity: stats.recentActivity,
    };

    return NextResponse.json({
      success: true,
      dashboard: summary,
    });
  } catch (err) {
    console.error("Error retrieving industry dashboard:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve industry dashboard data." },
      { status: 500 }
    );
  }
}
