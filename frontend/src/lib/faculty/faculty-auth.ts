import { db, User } from "../db";

/**
 * Validates the authenticated Faculty identity from request headers or cookies.
 * Ensures the caller is an authorized Faculty account (or Admin for academic oversight).
 * Rejects Student, Industry, Campus, or unauthenticated callers with appropriate 401/403 status.
 */
export async function getAuthenticatedFaculty(
  request: Request,
  providedId?: string
): Promise<{ facultyUser: User | null; error?: string; status: number }> {
  // 1. Check custom x-faculty-id / x-user-id header or providedId parameter
  let authId =
    request.headers.get("x-faculty-id") ||
    request.headers.get("x-user-id") ||
    providedId;

  // 2. Check Authorization Bearer header
  if (!authId) {
    const auth = request.headers.get("authorization") || "";
    if (auth.startsWith("Bearer ")) {
      authId = auth.substring(7).trim();
    }
  }

  // 3. Check HTTP cookies: sb_faculty_id, sb_user_id, sb_admin
  const cookieHeader = request.headers.get("cookie") || "";
  if (!authId && cookieHeader) {
    const facultyMatch = cookieHeader.match(/sb_faculty_id=([^;]+)/);
    const userMatch = cookieHeader.match(/sb_user_id=([^;]+)/);
    if (facultyMatch && facultyMatch[1]) {
      authId = decodeURIComponent(facultyMatch[1].trim());
    } else if (userMatch && userMatch[1]) {
      authId = decodeURIComponent(userMatch[1].trim());
    }
  }

  const hasAdminCookie = cookieHeader.includes("sb_admin=true");

  // No authentication identity provided
  if (!authId || authId === "anonymous") {
    // If admin cookie is set, allow admin oversight access
    if (hasAdminCookie) {
      const allUsers = await db.getUsers();
      const adminUser = allUsers.find((u) => u.isAdmin || u.email === "admin@gmail.com");
      if (adminUser) {
        return { facultyUser: adminUser, status: 200 };
      }
    }
    return {
      facultyUser: null,
      error: "Unauthorized. Please sign in to access Faculty portal.",
      status: 401,
    };
  }

  // 4. Resolve user record from authoritative database
  let user = await db.getUserById(authId);
  if (!user && authId.includes("@")) {
    const usersByEmail = await db.findUsersByEmail(authId);
    user = usersByEmail.find((u) => u.role === "faculty") || usersByEmail[0] || null;
  }

  if (!user) {
    // Fallback: if caller has admin cookie, resolve admin
    if (hasAdminCookie) {
      const allUsers = await db.getUsers();
      const adminUser = allUsers.find((u) => u.isAdmin || u.email === "admin@gmail.com");
      if (adminUser) {
        return { facultyUser: adminUser, status: 200 };
      }
    }
    return {
      facultyUser: null,
      error: "Unauthorized. Faculty account not found.",
      status: 401,
    };
  }

  // 5. Admin Authorization (Admins have academic oversight permissions)
  const isAdmin = Boolean(user.isAdmin || user.email === "admin@gmail.com" || hasAdminCookie);
  if (isAdmin) {
    return { facultyUser: user, status: 200 };
  }

  // 6. Role Authorization
  if (user.role === "faculty") {
    return { facultyUser: user, status: 200 };
  }

  if (user.role === "student") {
    return {
      facultyUser: null,
      error: "Forbidden. Student accounts cannot access Faculty portal or APIs.",
      status: 403,
    };
  }

  if (user.role === "industry") {
    return {
      facultyUser: null,
      error: "Forbidden. Industry accounts cannot access Faculty portal or APIs.",
      status: 403,
    };
  }

  if (user.role === "campus") {
    return {
      facultyUser: null,
      error: "Forbidden. Campus administrators cannot access individual Faculty mentor endpoints.",
      status: 403,
    };
  }

  return {
    facultyUser: null,
    error: "Forbidden. Insufficient permissions for Faculty portal.",
    status: 403,
  };
}
