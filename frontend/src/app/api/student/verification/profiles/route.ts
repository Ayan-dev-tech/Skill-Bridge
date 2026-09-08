import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import { DocumentVerificationService } from "@/lib/verification/service";

export async function POST(request: Request) {
  try {
    const { student } = await getAuthenticatedStudent(request);
    if (!student || !student.id || student.id === "unauthenticated_guest") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in as a student." },
        { status: 401 }
      );
    }
    const body = await request.json();
    const { linkedIn, gitHub, portfolio, other } = body;

    const sanitizedProfiles: {
      linkedIn?: string;
      gitHub?: string;
      portfolio?: string;
      other?: string;
    } = {};

    if (linkedIn && linkedIn.trim()) {
      const trimmed = linkedIn.trim();
      if (!DocumentVerificationService.validateProfileUrl(trimmed, "linkedin")) {
        return NextResponse.json(
          {
            success: false,
            error: "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/yourprofile).",
          },
          { status: 400 }
        );
      }
      sanitizedProfiles.linkedIn = trimmed;
    } else {
      sanitizedProfiles.linkedIn = "";
    }

    if (gitHub && gitHub.trim()) {
      const trimmed = gitHub.trim();
      if (!DocumentVerificationService.validateProfileUrl(trimmed, "github")) {
        return NextResponse.json(
          {
            success: false,
            error: "Please enter a valid GitHub profile URL (e.g., https://github.com/yourusername).",
          },
          { status: 400 }
        );
      }
      sanitizedProfiles.gitHub = trimmed;
    } else {
      sanitizedProfiles.gitHub = "";
    }

    if (portfolio && portfolio.trim()) {
      const trimmed = portfolio.trim();
      if (!DocumentVerificationService.validateProfileUrl(trimmed)) {
        return NextResponse.json(
          {
            success: false,
            error: "Please enter a valid web URL for your portfolio (e.g., https://yourportfolio.dev).",
          },
          { status: 400 }
        );
      }
      sanitizedProfiles.portfolio = trimmed;
    } else {
      sanitizedProfiles.portfolio = "";
    }

    if (other && other.trim()) {
      const trimmed = other.trim();
      if (!DocumentVerificationService.validateProfileUrl(trimmed)) {
        return NextResponse.json(
          {
            success: false,
            error: "Please enter a valid web URL for your other profile.",
          },
          { status: 400 }
        );
      }
      sanitizedProfiles.other = trimmed;
    } else {
      sanitizedProfiles.other = "";
    }

    const updated = await db.saveProfessionalProfiles(student.id, sanitizedProfiles);

    return NextResponse.json({
      success: true,
      message: "Professional profiles updated successfully.",
      profiles: updated.professionalProfiles,
      verification: updated,
    });
  } catch (error) {
    console.error("Save professional profiles error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update professional profiles." },
      { status: 500 }
    );
  }
}
