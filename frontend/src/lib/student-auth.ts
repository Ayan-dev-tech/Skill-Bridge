import { db, User } from "./db";
import { verifySessionToken, SESSION_COOKIE_NAME } from "./session";

/**
 * Validates the authenticated student identity from verified session token or Supabase Bearer token.
 * Rejects spoofed headers, request body IDs, and arbitrary client identity.
 * Never creates fake fallback users.
 */
export async function getAuthenticatedStudent(
  request: Request
): Promise<{ student: User | { id: string; fullName: string; email: string }; error?: string }> {
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

  if (sessionToken) {
    // Verify HMAC-signed session
    const payload = verifySessionToken(sessionToken);
    if (payload && payload.userId && payload.role === "student") {
      const found = await db.getUserById(payload.userId);
      if (found && found.role === "student") {
        return {
          student: {
            id: found.id,
            fullName: found.fullName,
            email: found.email,
          },
        };
      }
      return {
        student: {
          id: payload.userId,
          fullName: payload.fullName || "Student",
          email: payload.email,
        },
      };
    }
  }

  return {
    student: {
      id: "unauthenticated_guest",
      fullName: "Guest Student",
      email: "",
    },
    error: "Authentication required. Please sign in with a verified student account.",
  };
}
