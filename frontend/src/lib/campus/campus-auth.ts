import { db, User } from "../db";

/**
 * Validates the authenticated Campus partner identity from request headers or cookies.
 * Ensures the caller is an authorized Campus account (or Admin).
 * Rejects Student, Industry, Faculty, or unauthenticated callers with appropriate 401/403 status.
 */
export async function getAuthenticatedCampus(
  request: Request,
  providedId?: string
): Promise<{ campusUser: User | null; error?: string; status: number }> {
  // 1. Check custom x-campus-id / x-user-id header or providedId parameter
  let authId =
    request.headers.get("x-campus-id") ||
    request.headers.get("x-user-id") ||
    providedId;

  // 2. Check Authorization Bearer header
  if (!authId) {
    const auth = request.headers.get("authorization") || "";
    if (auth.startsWith("Bearer ")) {
      authId = auth.substring(7).trim();
    }
  }

  // 3. Check HTTP cookies: sb_campus_id, sb_student_id, sb_industry_id, sb_faculty_id, sb_user_id
  const cookieHeader = request.headers.get("cookie") || "";
  if (!authId && cookieHeader) {
    const campusMatch = cookieHeader.match(/sb_campus_id=([^;]+)/);
    const studentMatch = cookieHeader.match(/sb_student_id=([^;]+)/);
    const industryMatch = cookieHeader.match(/sb_industry_id=([^;]+)/);
    const facultyMatch = cookieHeader.match(/sb_faculty_id=([^;]+)/);
    const userMatch = cookieHeader.match(/sb_user_id=([^;]+)/);
    if (campusMatch && campusMatch[1]) {
      authId = decodeURIComponent(campusMatch[1].trim());
    } else if (studentMatch && studentMatch[1]) {
      authId = decodeURIComponent(studentMatch[1].trim());
    } else if (industryMatch && industryMatch[1]) {
      authId = decodeURIComponent(industryMatch[1].trim());
    } else if (facultyMatch && facultyMatch[1]) {
      authId = decodeURIComponent(facultyMatch[1].trim());
    } else if (userMatch && userMatch[1]) {
      authId = decodeURIComponent(userMatch[1].trim());
    }
  }

  const hasAdminCookie = cookieHeader.includes("sb_admin=true");

  // No authentication identity provided
  if (!authId || authId === "anonymous") {
    // If admin cookie is set, allow admin access
    if (hasAdminCookie) {
      const allUsers = await db.getUsers();
      const adminUser = allUsers.find((u) => u.isAdmin || u.email === "admin@gmail.com");
      if (adminUser) {
        return { campusUser: adminUser, status: 200 };
      }
    }
    return {
      campusUser: null,
      error: "Unauthorized. Please sign in to access Campus portal.",
      status: 401,
    };
  }

  // 4. Resolve user record from authoritative database
  let user = await db.getUserById(authId);
  if (!user && authId.includes("@")) {
    const usersByEmail = await db.findUsersByEmail(authId);
    user = usersByEmail.find((u) => u.role === "campus") || usersByEmail[0] || null;
  }

  if (!user) {
    return {
      campusUser: null,
      error: "Unauthorized. Campus account not found.",
      status: 401,
    };
  }

  // 5. Admin Authorization (Admins can inspect campus data per existing architecture)
  const isAdmin = Boolean(user.isAdmin || user.email === "admin@gmail.com" || hasAdminCookie);
  if (isAdmin) {
    return { campusUser: user, status: 200 };
  }

  // 6. Role Authorization
  if (user.role === "campus") {
    return { campusUser: user, status: 200 };
  }

  if (user.role === "student") {
    return {
      campusUser: null,
      error: "Forbidden. Student accounts cannot access Campus portal or APIs.",
      status: 403,
    };
  }

  if (user.role === "industry") {
    return {
      campusUser: null,
      error: "Forbidden. Industry accounts cannot access Campus portal or APIs.",
      status: 403,
    };
  }

  if (user.role === "faculty") {
    return {
      campusUser: null,
      error: "Forbidden. Faculty accounts cannot access Campus management portal.",
      status: 403,
    };
  }

  return {
    campusUser: null,
    error: "Forbidden. Insufficient permissions for Campus portal.",
    status: 403,
  };
}