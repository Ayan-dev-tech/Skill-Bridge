import crypto from "crypto";

const SESSION_COOKIE_NAME = "sb_session";

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.trim().length < 32) {
    throw new Error(
      "SESSION_SECRET environment variable is missing or insecure (must be at least 32 characters). Production authentication halted to prevent predictable signing."
    );
  }
  return secret.trim();
}

export interface SessionPayload {
  userId: string;
  role: string;
  email: string;
  fullName: string;
  isAdmin?: boolean;
  exp: number;
}

export function createSignedSessionToken(
  payload: Omit<SessionPayload, "exp">,
  expiresInSeconds = 60 * 60 * 24 * 7
): string {
  const secret = getSessionSecret();
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const data: SessionPayload = { ...payload, exp };
  const encodedData = Buffer.from(JSON.stringify(data)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(encodedData).digest("base64url");
  return `${encodedData}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  try {
    const secret = getSessionSecret();
    const [encodedData, signature] = parts;
    const expectedSignature = crypto.createHmac("sha256", secret).update(encodedData).digest("base64url");

    // Constant time comparison
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

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
