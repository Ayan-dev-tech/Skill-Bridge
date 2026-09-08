import crypto from "crypto";

const SESSION_COOKIE_NAME = "sb_session";
const SESSION_SECRET = process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "skill-bridge-secure-session-secret-key-prod-random-salt";

export interface SessionPayload {
  userId: string;
  role: string;
  email: string;
  fullName: string;
  isAdmin?: boolean;
  exp: number;
}

export function createSignedSessionToken(payload: Omit<SessionPayload, "exp">, expiresInSeconds = 60 * 60 * 24 * 7): string {
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const data: SessionPayload = { ...payload, exp };
  const encodedData = Buffer.from(JSON.stringify(data)).toString("base64url");
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(encodedData).digest("base64url");
  return `${encodedData}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encodedData, signature] = parts;
  const expectedSignature = crypto.createHmac("sha256", SESSION_SECRET).update(encodedData).digest("base64url");

  // Constant time comparison
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(encodedData, "base64url").toString("utf8")) as SessionPayload;
    if (!data.exp || data.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export { SESSION_COOKIE_NAME };
