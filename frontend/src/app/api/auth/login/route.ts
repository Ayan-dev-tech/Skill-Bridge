import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { db, verifyPassword, hashPassword, RoleType } from "@/lib/db";
import { createSignedSessionToken, SESSION_COOKIE_NAME } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const body = await request.json();
    const { email, password, role } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password, and role are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Brute-force protection: Max 5 failed attempts per minute per (email, role)
    const loginLimit = checkRateLimit(`login:${normalizedEmail}:${role}`, 5, 60);
    if (!loginLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many login attempts. Please wait a minute before trying again.",
          retryAfterSeconds: loginLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(loginLimit.retryAfterSeconds),
          },
        }
      );
    }

    // 2. Lookup user specifically in this role
    const user = await db.findUserByEmailAndRole(normalizedEmail, role as RoleType);

    if (!user) {
      return NextResponse.json(
        {
          error: `No ${role} account found with this email. Please select the correct role tab or register first.`,
        },
        { status: 404 }
      );
    }

    // 3. Check if account is verified via OTP
    if (!user.isVerified) {
      return NextResponse.json(
        {
          error: `Your ${role} account has not been verified yet. Please complete OTP verification.`,
          unverified: true,
        },
        { status: 403 }
      );
    }

    // 4. Verify password hash (supports PBKDF2 and backward-compatible SHA-256)
    const passwordValid = verifyPassword(password, user.passwordHash);
    if (!passwordValid) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    // Upgrade legacy password hash automatically if needed
    if (!user.passwordHash.startsWith("pbkdf2:")) {
      user.passwordHash = hashPassword(password);
      await db.updateUser(user);
    }

    // 5. Success
    const isAdmin = Boolean(user.isAdmin);
    let redirectUrl: string | undefined = undefined;

    if (isAdmin) {
      redirectUrl = "/admin";
    } else if (user.role === "student") {
      const verification = await db.getStudentVerification(user.id);
      if (verification.verificationStatus === "VERIFIED") {
        redirectUrl = "/student/dashboard";
      } else {
        redirectUrl = "/student/document-verification";
      }
    } else if (user.role === "campus") {
      redirectUrl = "/campus";
    } else if (user.role === "faculty") {
      redirectUrl = "/faculty";
    } else if (user.role === "industry") {
      redirectUrl = "/industry";
    }

    // Create cryptographically signed session token
    const sessionToken = createSignedSessionToken({
      userId: user.id,
      role: user.role,
      email: user.email,
      fullName: user.fullName,
      isAdmin,
    });

    // Notice: token is NOT included in JSON response body to prevent XSS credential exposure
    const response = NextResponse.json({
      success: true,
      message: isAdmin ? "Welcome, Administrator!" : `Welcome back, ${user.fullName}!`,
      isAdmin,
      redirectUrl,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        isAdmin,
      },
    });

    // Set HTTP-only, Secure, SameSite signed session cookie
    response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    if (isAdmin) {
      response.cookies.set("sb_admin", "true", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
