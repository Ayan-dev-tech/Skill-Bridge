import { NextResponse } from "next/server";
import { getAuthenticatedFaculty } from "@/lib/faculty/faculty-auth";
import { getAuthorizedStudents } from "@/lib/faculty/faculty-service";

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedFaculty(request);
    if (!auth.facultyUser) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: auth.status });
    }

    const res = await getAuthorizedStudents(auth.facultyUser.id, { limit: 1000 });
    const students = res.students;

    const stages = [
      { stage: "verification", name: "Document Submission", completed: students.filter((s) => s.verificationStatus === "VERIFIED").length },
      { stage: "interest", name: "Interest Finder", completed: students.filter((s) => s.hasInterestProfile).length },
      { stage: "knowledge", name: "Knowledge Testing", completed: students.filter((s) => s.hasKnowledgeTest).length },
      { stage: "skill_gap", name: "Skill Gap Diagnostics", completed: students.filter((s) => s.skillGapsCount > 0).length },
      { stage: "learning", name: "Learning & Mentoring", completed: students.filter((s) => s.learningProgressPercent > 0).length },
      { stage: "applications", name: "Career Applications", completed: students.filter((s) => s.applicationCount > 0).length },
      { stage: "placement", name: "Placement", completed: students.filter((s) => s.placementStatus === "selected").length },
    ];

    return NextResponse.json({
      success: true,
      totalStudents: students.length,
      stages,
      students: students.map((s) => ({
        id: s.id,
        fullName: s.fullName,
        rollNumber: s.rollNumber,
        course: s.course,
        semester: s.semester,
        verificationStatus: s.verificationStatus,
        hasInterestProfile: s.hasInterestProfile,
        hasKnowledgeTest: s.hasKnowledgeTest,
        scorePercent: s.scorePercent,
        skillGapsCount: s.skillGapsCount,
        learningProgressPercent: s.learningProgressPercent,
        applicationCount: s.applicationCount,
        placementStatus: s.placementStatus,
      })),
    });
  } catch (error) {
    console.error("Faculty progress API error:", error);
    return NextResponse.json({ error: "Failed to retrieve student progress." }, { status: 500 });
  }
}
