import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { db, generateSixDigitOtp, RoleType } from "@/lib/db";
import { sendOtpEmail, isSmtpConfigured } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);

    // 1. Global Burst Protection: max 30 registrations per minute across platform
    const globalLimit = checkRateLimit("global:register", 30, 60);
    if (!globalLimit.allowed) {
      return NextResponse.json(
        {
          error: "High server traffic. Please try again shortly.",
          retryAfterSeconds: globalLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(globalLimit.retryAfterSeconds),
          },
        }
      );
    }

    // 1. Parse and Validate Request Payload
    const body = await request.json();
    const { email, password, fullName, role, metadata } = body;

    // 2. Block Admin Self-Registration immediately
    if (role === "admin" || (body as any).isAdmin) {
      return NextResponse.json(
        { error: "Administrative accounts cannot be self-registered. Please contact the platform administrator." },
        { status: 403 }
      );
    }

    // 3. Rate Limiting: burst protection (higher limit for localhost/dev testing)
    const isLocal = clientIp === "127.0.0.1" || clientIp === "::1" || process.env.NODE_ENV === "development";
    const ipLimit = checkRateLimit(`ip:register:${clientIp}`, isLocal ? 60 : 5, 60);
    if (!ipLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many registration requests from your network. Please wait before retrying.",
          retryAfterSeconds: ipLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(ipLimit.retryAfterSeconds),
          },
        }
      );
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    if (!fullName || typeof fullName !== "string" || fullName.trim().length === 0) {
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 }
      );
    }

    const validRoles: RoleType[] = ["student", "faculty", "campus", "industry"];
    if (!role || !validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Please select a valid role (student, faculty, campus, industry)." },
        { status: 400 }
      );
    }

    // 4. Feature Flag: Email Verification Required (Default: false for prototype)
    const emailVerificationRequired = process.env.EMAIL_VERIFICATION_REQUIRED === "true";

    // 5. Check for Existing Verified Account specifically in THIS Role
    const existingUser = await db.findUserByEmailAndRole(email, role as RoleType);
    if (existingUser && existingUser.isVerified) {
      return NextResponse.json(
        {
          error: `An account with this email already exists for the ${role} portal. Please sign in or choose another role.`,
        },
        { status: 409 }
      );
    }

    // 6. Direct Verified Registration when verification is bypassed (prototype mode)
    if (!emailVerificationRequired) {
      const { user } = await db.createOrUpdatePendingUser(
        {
          email,
          password,
          fullName: fullName.trim(),
          role: role as RoleType,
        },
        metadata || {},
        true // Directly mark verified
      );

      return NextResponse.json({
        success: true,
        requiresOtp: false,
        message: `Registration successful! Your ${role} account has been created. You may now sign in.`,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          fullName: user.fullName,
        },
      });
    }

    // 7. Standard Isolated OTP Flow (when EMAIL_VERIFICATION_REQUIRED=true)
    if (!isSmtpConfigured()) {
      return NextResponse.json(
        { error: "Email delivery is not configured. Please contact the administrator." },
        { status: 503 }
      );
    }

    await db.createOrUpdatePendingUser(
      {
        email,
        password,
        fullName: fullName.trim(),
        role: role as RoleType,
      },
      metadata || {},
      false
    );

    const otpCode = generateSixDigitOtp();
    await db.createOrUpdateOtp(email, role as RoleType, otpCode, 10);

    try {
      await sendOtpEmail(email, otpCode, 10);
    } catch (smtpError) {
      console.error("[Skill-Bridge] SMTP send failed:", smtpError);
      return NextResponse.json(
        { error: "Failed to send verification email. Please check your email address and try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      requiresOtp: true,
      message: `Verification code sent to your email for ${role} registration.`,
      email: email.toLowerCase().trim(),
      role,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during registration. Please try again." },
      { status: 500 }
    );
  }
}
