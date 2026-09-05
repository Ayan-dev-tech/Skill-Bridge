import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { db, hashPassword, RoleType } from "@/lib/db";

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

    // 4. Verify password hash
    const inputHash = hashPassword(password);
    if (inputHash !== user.passwordHash) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    // 5. Success
    const isAdmin = Boolean(user.isAdmin || user.email === "admin@gmail.com");
    const redirectUrl = isAdmin
      ? "/admin"
      : user.role === "student"
      ? "/student"
      : undefined;

    return NextResponse.json({
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
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
