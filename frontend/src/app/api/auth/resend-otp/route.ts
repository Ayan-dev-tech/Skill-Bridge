import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { db, generateSixDigitOtp } from "@/lib/db";
import { sendOtpEmail, isSmtpConfigured } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const body = await request.json();
    const { email, role } = body;

    if (!email || typeof email !== "string" || !email.includes("@") || !role) {
      return NextResponse.json(
        { error: "A valid email address and role are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Per-email-role throttle: max 3 resends per 2 minutes
    const emailLimit = checkRateLimit(`resend:email:${normalizedEmail}:${role}`, 3, 120);
    if (!emailLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many OTP requests for this account. Please wait before requesting another code.",
          retryAfterSeconds: emailLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(emailLimit.retryAfterSeconds),
          },
        }
      );
    }

    // 2. Per-IP throttle: max 5 resends per minute
    const ipLimit = checkRateLimit(`resend:ip:${clientIp}`, 5, 60);
    if (!ipLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests from your network. Please wait before retrying.",
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

    // 3. Check SMTP is configured
    if (!isSmtpConfigured()) {
      return NextResponse.json(
        { error: "Email delivery is not configured. Please contact the administrator." },
        { status: 503 }
      );
    }

    // 4. Check user exists specifically for this role
    const user = await db.findUserByEmailAndRole(normalizedEmail, role);
    if (!user) {
      return NextResponse.json(
        { error: `No pending registration found for ${normalizedEmail} as ${role}.` },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { error: `This ${role} account has already been verified. Please log in.` },
        { status: 400 }
      );
    }

    // 5. Generate new OTP and save for this (email, role) — invalidates previous OTP
    const newOtp = generateSixDigitOtp();
    await db.createOrUpdateOtp(normalizedEmail, role, newOtp, 10);

    // 6. Send OTP via real SMTP email
    try {
      await sendOtpEmail(normalizedEmail, newOtp, 10);
    } catch (smtpError) {
      console.error("[Skill-Bridge] SMTP resend failed:", smtpError);
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `A fresh verification code has been sent for your ${role} registration.`,
      email: normalizedEmail,
      role,
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while resending OTP." },
      { status: 500 }
    );
  }
}
