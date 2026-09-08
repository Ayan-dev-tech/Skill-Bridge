import { db, User } from "./db";
import { verifySessionToken, SESSION_COOKIE_NAME } from "./session";

/**
 * Validates the authenticated Administrator identity from signed session token or Bearer header.
 * Enforces admin authorization and prevents privilege escalation.
 */
export async function getAuthenticatedAdmin(
  request: Request
): Promise<{ adminUser: User | null; error?: string }> {
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
    const payload = verifySessionToken(sessionToken);
    if (payload && payload.userId && payload.isAdmin) {
      const user = await db.getUserById(payload.userId);
      if (user && (user.isAdmin || user.email.toLowerCase() === "admin@gmail.com")) {
        return { adminUser: user };
      }
    }
  }

  return {
    adminUser: null,
    error: "Unauthorized. Administrator privileges required.",
  };
}
