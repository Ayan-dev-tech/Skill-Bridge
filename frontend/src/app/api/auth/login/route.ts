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

    response.cookies.set("sb_student_id", user.id, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    if (isAdmin) {
      response.cookies.set("sb_admin", "true", {
        path: "/",
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
