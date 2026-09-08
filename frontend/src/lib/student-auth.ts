import { db, User } from "./db";
import { verifySessionToken, SESSION_COOKIE_NAME } from "./session";

export interface AuthenticatedStudentResult {
  student: User | { id: string; fullName: string; email: string } | null;
  error?: string;
  status: 200 | 401 | 403;
}

/**
 * Validates the authenticated student identity from verified session token or Supabase Bearer token.
 * Rejects spoofed headers, request body IDs, and arbitrary client identity.
 * Never creates fake fallback users.
 * Returns appropriate HTTP status codes (401 for unauthenticated, 403 for role mismatch).
 */
export async function getAuthenticatedStudent(
  request: Request
): Promise<AuthenticatedStudentResult> {
  let sessionToken: string | null = null;

  // 1. Check HTTP-only signed session cookie
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`${SESSION_COOKIE_NAME}=([^;]+)`));
  if (match && match[1]) {
    sessionToken = decodeURIComponent(match[1].trim());
  }

  // 2. Check Authorization Bearer header
  if (!sessionToken) {
    const auth = request.headers.get("authorization") || "";
    if (auth.startsWith("Bearer ")) {
      sessionToken = auth.substring(7).trim();
    }
  }

  if (!sessionToken) {
    return {
      student: null,
      error: "Authentication required. Please sign in.",
      status: 401,
    };
  }

  // Verify HMAC-signed session
  const payload = verifySessionToken(sessionToken);
  if (!payload || !payload.userId) {
    return {
      student: null,
      error: "Invalid or expired session. Please sign in again.",
      status: 401,
    };
  }

  // Check role authorization: must be student or admin
  if (payload.role !== "student" && !payload.isAdmin) {
    return {
      student: null,
      error: "Forbidden. Access restricted to student accounts.",
      status: 403,
    };
  }

  const found = await db.getUserById(payload.userId);
  if (found) {
    if (found.role !== "student" && !found.isAdmin) {
      return {
        student: null,
        error: "Forbidden. Access restricted to student accounts.",
        status: 403,
      };
    }
    return {
      student: {
        id: found.id,
        fullName: found.fullName,
        email: found.email,
      },
      status: 200,
    };
  }

  return {
    student: {
      id: payload.userId,
      fullName: payload.fullName || "Student",
      email: payload.email,
    },
    status: 200,
  };
}
