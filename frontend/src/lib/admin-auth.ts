import { db, User } from "./db";
import { verifySessionToken, SESSION_COOKIE_NAME } from "./session";

export interface AuthenticatedAdminResult {
  adminUser: User | null;
  error?: string;
  status: 200 | 401 | 403;
}

/**
 * Validates the authenticated Administrator identity from signed session token or Bearer header.
 * Enforces admin authorization from verified database record and claims.
 * Does NOT trust hardcoded emails like admin@gmail.com.
 */
export async function getAuthenticatedAdmin(
  request: Request
): Promise<AuthenticatedAdminResult> {
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
      adminUser: null,
      error: "Authentication required. Please sign in as an administrator.",
      status: 401,
    };
  }

  const payload = verifySessionToken(sessionToken);
  if (!payload || !payload.userId) {
    return {
      adminUser: null,
      error: "Invalid or expired session. Please sign in again.",
      status: 401,
    };
  }

  // Verify database record has isAdmin = true
  const user = await db.getUserById(payload.userId);
  if (!user) {
    return {
      adminUser: null,
      error: "User account not found.",
      status: 401,
    };
  }

  if (!user.isAdmin) {
    return {
      adminUser: null,
      error: "Forbidden. Administrator privileges required.",
      status: 403,
    };
  }

  return {
    adminUser: user,
    status: 200,
  };
}
