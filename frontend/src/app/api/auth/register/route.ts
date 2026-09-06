import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { db, generateSixDigitOtp, RoleType } from "@/lib/db";

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

    // 2. Per-IP Rate Limiting: max 5 registrations per minute per IP
    const ipLimit = checkRateLimit(`ip:register:${clientIp}`, 5, 60);
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

    // 3. Parse and Validate Request Payload
    const body = await request.json();
    const { email, password, fullName, role, metadata } = body;

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

    // 4. Check for Existing Verified Account specifically in THIS Role
    const existingUser = await db.findUserByEmailAndRole(email, role as RoleType);
    if (existingUser && existingUser.isVerified) {
      return NextResponse.json(
        {
          error: `An account with this email already exists for the ${role} portal. Please sign in or choose another role.`,
        },
        { status: 409 }
      );
    }

    // 5. Save Pending User & Role Metadata
    await db.createOrUpdatePendingUser(
      {
        email,
        password,
        fullName: fullName.trim(),
        role: role as RoleType,
      },
      metadata || {}
    );

    // 6. Generate 6-Digit OTP & Save specifically for (email, role)
    const otpCode = generateSixDigitOtp();
    await db.createOrUpdateOtp(email, role as RoleType, otpCode, 10);

    // Development Console Log for convenience
    console.log(`\n======================================================`);
    console.log(`[Skill-Bridge OTP] Destination: ${email} | Role: ${role}`);
    console.log(`[Skill-Bridge OTP] Verification Code: ${otpCode}`);
    console.log(`[Skill-Bridge OTP] Valid for 10 minutes`);
    console.log(`======================================================\n`);

    return NextResponse.json({
      success: true,
      message: `Verification code sent to your email for ${role} registration.`,
      email: email.toLowerCase().trim(),
      role,
      devOtp:
        process.env.NODE_ENV !== "production" ||
        process.env.ENABLE_DEV_OTP === "true" ||
        process.env.DEV_OTP === "true"
          ? otpCode
          : undefined,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during registration. Please try again." },
      { status: 500 }
    );
  }
}
