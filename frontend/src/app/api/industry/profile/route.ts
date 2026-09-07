import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedIndustry } from "@/lib/industry/industry-auth";
import type { IndustryProfileMetadata } from "@/lib/industry/types";

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
    if (!profileData) {
      return NextResponse.json(
        { success: false, error: "Industry profile not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      profile: {
        userId: industryUser.id,
        email: industryUser.email,
        fullName: industryUser.fullName,
        role: "industry",
        metadata: profileData.metadata,
        createdAt: industryUser.createdAt,
      },
    });
  } catch (err) {
    console.error("Error retrieving industry profile:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve industry profile." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { industryUser, error } = await getAuthenticatedIndustry(request);
    if (!industryUser) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      companyName,
      industryDomain,
      description,
      website,
      contactEmail,
      contactPhone,
      location,
      workTitle,
      contactPerson,
      demandedSkills,
      companySize,
      foundedYear,
    } = body;

    // Validation
    if (companyName !== undefined && !companyName.trim()) {
      return NextResponse.json(
        { success: false, error: "Organization name cannot be empty." },
        { status: 400 }
      );
    }

    if (website && !/^https?:\/\//i.test(website.trim())) {
      return NextResponse.json(
        { success: false, error: "Website must start with http:// or https://" },
        { status: 400 }
      );
    }

    if (contactEmail && !/[\w.-]+@[\w.-]+\.[a-z]{2,}/i.test(contactEmail.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid contact email address." },
        { status: 400 }
      );
    }

    const updates: Partial<IndustryProfileMetadata> = {};
    if (companyName !== undefined) updates.companyName = companyName.trim();
    if (industryDomain !== undefined) updates.industryDomain = industryDomain.trim();
    if (description !== undefined) updates.description = description.trim();
    if (website !== undefined) updates.website = website.trim();
    if (contactEmail !== undefined) updates.contactEmail = contactEmail.trim();
    if (contactPhone !== undefined) updates.contactPhone = contactPhone.trim();
    if (location !== undefined) updates.location = location.trim();
    if (workTitle !== undefined) updates.workTitle = workTitle.trim();
    if (contactPerson !== undefined) updates.contactPerson = contactPerson.trim();
    if (demandedSkills !== undefined) {
      updates.demandedSkills = Array.isArray(demandedSkills)
        ? demandedSkills.map((s: string) => String(s).trim()).filter(Boolean)
        : [];
    }
    if (companySize !== undefined) updates.companySize = companySize.trim();
    if (foundedYear !== undefined) updates.foundedYear = foundedYear.trim();

    const updated = await db.updateIndustryProfile(industryUser.id, updates);

    return NextResponse.json({
      success: true,
      message: "Industry profile updated successfully.",
      profile: updated,
      metadata: updated,
    });
  } catch (err) {
    console.error("Error updating industry profile:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update industry profile." },
      { status: 500 }
    );
  }
}
