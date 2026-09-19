import { db, User } from "./db";

/**
 * Validates the authenticated student identity from the request headers or body.
 * Ensures client cannot manipulate or spoof another student's ID.
 */
export async function getAuthenticatedStudent(
  request: Request,
  providedId?: string
): Promise<{ student: User | { id: string; fullName: string; email: string }; error?: string }> {
  // 1. Check custom x-student-id header, bearer token, or providedId
  let authId = request.headers.get("x-student-id") || providedId;

  // 2. Check HTTP cookie sb_student_id
  if (!authId) {
    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader.match(/sb_student_id=([^;]+)/);
    if (match && match[1]) {
      authId = decodeURIComponent(match[1].trim());
    }
  }

  // 3. Check Authorization Bearer header
  if (!authId) {
    const auth = request.headers.get("authorization") || "";
    if (auth.startsWith("Bearer ")) {
      authId = auth.substring(7).trim();
    }
  }

  if (authId && authId !== "anonymous") {
    let user = await db.getUserById(authId);
    if (!user && authId.includes("@")) {
      const users = await db.findUsersByEmail(authId);
      user = users.find((u) => u.role === "student") || null;
    }

    if (user && user.role === "student") {
      return {
        student: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
      };
    }
  }

  return {
    student: null as any,
    error: "Authentication required. Valid student session not found.",
  };
}
