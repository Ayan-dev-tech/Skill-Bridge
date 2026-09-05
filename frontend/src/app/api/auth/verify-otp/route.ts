import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);

    // Rate Limit: Max 10 OTP verification attempts per minute per IP
    const ipLimit = checkRateLimit(`ip:verify:${clientIp}`, 10, 60);
    if (!ipLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many verification attempts. Please wait before trying again.",
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

    const body = await request.json();
    const { email, role, otpCode } = body;

    if (!email || !otpCode || !role) {
      return NextResponse.json(
        { error: "Email, role, and 6-digit verification code are required." },
        { status: 400 }
      );
    }

    const result = await db.verifyUserAndOtp(email, role, otpCode);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Registration verified successfully! You may now sign in.",
      user: result.user
        ? {
            id: result.user.id,
            email: result.user.email,
            role: result.user.role,
            fullName: result.user.fullName,
          }
        : undefined,
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while verifying OTP." },
      { status: 500 }
    );
  }
}
