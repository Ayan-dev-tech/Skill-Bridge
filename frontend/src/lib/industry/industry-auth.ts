import { db, User } from "../db";
import { verifySessionToken, SESSION_COOKIE_NAME } from "../session";

export interface AuthenticatedIndustryResult {
  industryUser: User | null;
  error?: string;
  status: 200 | 401 | 403;
}

/**
 * Validates the authenticated Industry partner identity from signed session token or Bearer header.
 * Rejects spoofed client headers, cookies, or body parameters.
 * Does NOT fallback to arbitrary industry users.
 */
export async function getAuthenticatedIndustry(
  request: Request
): Promise<AuthenticatedIndustryResult> {
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
      industryUser: null,
      error: "Authentication required. Please sign in with an Industry partner account.",
      status: 401,
    };
  }

  const payload = verifySessionToken(sessionToken);
  if (!payload || !payload.userId) {
    return {
      industryUser: null,
      error: "Invalid or expired session. Please sign in again.",
      status: 401,
    };
  }

  if (payload.role !== "industry" && !payload.isAdmin) {
    return {
      industryUser: null,
      error: "Forbidden. Access restricted to Industry partner accounts.",
      status: 403,
    };
  }

  const user = await db.getUserById(payload.userId);
  if (!user) {
    return {
      industryUser: null,
      error: "User account not found.",
      status: 401,
    };
  }

  if (user.role !== "industry" && !user.isAdmin) {
    return {
      industryUser: null,
      error: "Forbidden. Access restricted to Industry partner accounts.",
      status: 403,
    };
  }

  return {
    industryUser: user,
    status: 200,
  };
}
