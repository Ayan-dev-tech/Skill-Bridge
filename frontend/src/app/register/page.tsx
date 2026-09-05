"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type RoleType = "student" | "faculty" | "campus" | "industry";

interface RoleMetadataField {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}

const roleFormConfigs: Record<
  RoleType,
  {
    label: string;
    description: string;
    emailPlaceholder: string;
    fields: RoleMetadataField[];
  }
> = {
  student: {
    label: "Student",
    description: "Register for skill mapping, skill-gap analysis, and verified hiring",
    emailPlaceholder: "student@institution.edu",
    fields: [
      {
        id: "institution",
        label: "College / University Name",
        placeholder: "e.g. National Institute of Technology",
        required: true,
      },
      {
        id: "degree",
        label: "Degree & Specialization",
        placeholder: "e.g. B.Tech Computer Science",
        required: true,
      },
      {
        id: "graduationYear",
        label: "Graduation Year",
        placeholder: "e.g. 2026",
        type: "number",
        required: true,
      },
    ],
  },
  faculty: {
    label: "Faculty",
    description: "Register to oversee student learning paths, assessments, and curriculum alignment",
    emailPlaceholder: "faculty@institution.edu",
    fields: [
      {
        id: "institution",
        label: "College / University Name",
        placeholder: "e.g. Delhi Technological University",
        required: true,
      },
      {
        id: "department",
        label: "Department",
        placeholder: "e.g. Information Technology",
        required: true,
      },
      {
        id: "designation",
        label: "Designation / Faculty ID",
        placeholder: "e.g. Assistant Professor / FAC-1049",
        required: true,
      },
    ],
  },
  campus: {
    label: "Campus Admin",
    description: "Register to manage campus placement drives, student analytics, and institutional data",
    emailPlaceholder: "admin@campus.edu",
    fields: [
      {
        id: "institution",
        label: "Institution / Campus Name",
        placeholder: "e.g. Indian Institute of Technology Bombay",
        required: true,
      },
      {
        id: "campusCode",
        label: "AISHE / Institutional Code",
        placeholder: "e.g. C-18492",
        required: true,
      },
      {
        id: "officialTitle",
        label: "Admin Designation",
        placeholder: "e.g. Head of Training & Placement (TPO)",
        required: true,
      },
    ],
  },
  industry: {
    label: "Industry Partner",
    description: "Register to publish openings and recruit candidates verified by Skill-Bridge",
    emailPlaceholder: "recruiter@company.com",
    fields: [
      {
        id: "companyName",
        label: "Company / Organization Name",
        placeholder: "e.g. Tata Consultancy Services",
        required: true,
      },
      {
        id: "industryDomain",
        label: "Industry Domain / Sector",
        placeholder: "e.g. Software & AI Engineering",
        required: true,
      },
      {
        id: "workTitle",
        label: "Your Designation",
        placeholder: "e.g. Technical Talent Acquisition Lead",
        required: true,
      },
    ],
  },
};

export default function RegisterPage() {
  const router = useRouter();

  // Registration step: "form" | "otp" | "success"
  const [step, setStep] = React.useState<"form" | "otp" | "success">("form");
  const [activeRole, setActiveRole] = React.useState<RoleType>("student");

  // Form inputs
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [metadata, setMetadata] = React.useState<Record<string, string>>({});

  // OTP inputs
  const [otpDigits, setOtpDigits] = React.useState(["", "", "", "", "", ""]);
  const [resendCooldown, setResendCooldown] = React.useState(0);
  const otpInputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Status & loading
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [infoMessage, setInfoMessage] = React.useState<string | null>(null);
  const [devOtpHint, setDevOtpHint] = React.useState<string | null>(null);

  // Timer for resend cooldown
  React.useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleMetadataChange = (key: string, value: string) => {
    setMetadata((prev) => ({ ...prev, [key]: value }));
  };

  // Step 1: Submit Registration Form
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify both fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role: activeRole,
          metadata,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setErrorMessage(
            data.error || "Rate limit reached. Please wait before retrying."
          );
        } else {
          setErrorMessage(data.error || "Registration failed. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      // Successful registration: transition to OTP step
      setStep("otp");
      setResendCooldown(60);
      setInfoMessage(`Verification code sent to ${email}.`);
      if (data.devOtp) {
        setDevOtpHint(data.devOtp);
      }
    } catch (err) {
      setErrorMessage("Network error occurred. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Handle OTP input
  const handleOtpChange = (index: number, val: string) => {
    const cleanVal = val.replace(/\D/g, "");
    if (!cleanVal && val !== "") return;

    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal.slice(-1);
    setOtpDigits(newDigits);

    // Auto-focus next input
    if (cleanVal && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setOtpDigits(newDigits);

    const nextIndex = Math.min(pasted.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
  };

  // Step 2: Submit OTP Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otpDigits.join("");

    if (fullOtp.length < 6) {
      setErrorMessage("Please enter the complete 6-digit verification code.");
      return;
    }

    setErrorMessage(null);
    setInfoMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role: activeRole,
          otpCode: fullOtp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Verification failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Success
      setStep("success");
    } catch {
      setErrorMessage("Network error verifying code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isLoading) return;

    setErrorMessage(null);
    setInfoMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: activeRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Failed to resend verification code.");
        setIsLoading(false);
        return;
      }

      setResendCooldown(60);
      setInfoMessage("A fresh verification code has been dispatched.");
      if (data.devOtp) {
        setDevOtpHint(data.devOtp);
      }
    } catch {
      setErrorMessage("Network error resending code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground selection:bg-muted selection:text-foreground">
      {/* Top Header */}
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="font-semibold text-lg tracking-tight">Skill-Bridge</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Registration Container */}
      <main className="w-full max-w-lg my-16">
        <Card className="border-border shadow-sm">
          {/* STEP 1: Registration Form */}
          {step === "form" && (
            <>
              <CardHeader className="text-center space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Create an Account
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Register for role-based access on Skill-Bridge
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <Tabs
                  defaultValue="student"
                  value={activeRole}
                  onValueChange={(val) => {
                    setActiveRole(val as RoleType);
                    setErrorMessage(null);
                    setMetadata({});
                  }}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-4 mb-2">
                    <TabsTrigger value="student">Student</TabsTrigger>
                    <TabsTrigger value="faculty">Faculty</TabsTrigger>
                    <TabsTrigger value="campus">Campus</TabsTrigger>
                    <TabsTrigger value="industry">Industry</TabsTrigger>
                  </TabsList>

                  {(Object.keys(roleFormConfigs) as RoleType[]).map((role) => {
                    const config = roleFormConfigs[role];
                    return (
                      <TabsContent key={role} value={role} className="space-y-4 pt-1">
                        <p className="text-xs text-muted-foreground">
                          {config.description}
                        </p>

                        <form onSubmit={handleRegisterSubmit} className="space-y-4">
                          {/* Common Fields */}
                          <div className="space-y-1.5">
                            <Label htmlFor={`${role}-name`}>Full Name</Label>
                            <Input
                              id={`${role}-name`}
                              placeholder="Jane Doe"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              disabled={isLoading}
                            />
                          </div>

                          <div className="space-y-1.5">
                            <Label htmlFor={`${role}-email`}>Email Address</Label>
                            <Input
                              id={`${role}-email`}
                              type="email"
                              placeholder={config.emailPlaceholder}
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled={isLoading}
                            />
                          </div>

                          {/* Role-Specific Fields */}
                          {config.fields.map((field) => (
                            <div key={field.id} className="space-y-1.5">
                              <Label htmlFor={`${role}-${field.id}`}>{field.label}</Label>
                              <Input
                                id={`${role}-${field.id}`}
                                type={field.type || "text"}
                                placeholder={field.placeholder}
                                required={field.required}
                                value={metadata[field.id] || ""}
                                onChange={(e) =>
                                  handleMetadataChange(field.id, e.target.value)
                                }
                                disabled={isLoading}
                              />
                            </div>
                          ))}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                              <Label htmlFor={`${role}-password`}>Password</Label>
                              <Input
                                id={`${role}-password`}
                                type="password"
                                placeholder="Min. 6 characters"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label htmlFor={`${role}-confirm`}>Confirm Password</Label>
                              <Input
                                id={`${role}-confirm`}
                                type="password"
                                placeholder="••••••••"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isLoading}
                              />
                            </div>
                          </div>

                          {errorMessage && (
                            <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/10 text-xs text-destructive">
                              {errorMessage}
                            </div>
                          )}

                          <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                          >
                            {isLoading
                              ? "Submitting Registration..."
                              : `Register as ${config.label} & Send OTP`}
                          </Button>
                        </form>
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </CardContent>

              <CardFooter className="flex flex-col items-center justify-center gap-2 border-t border-border pt-4 pb-4">
                <p className="text-xs text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link
                    href="/"
                    className="font-medium text-foreground hover:underline underline-offset-4"
                  >
                    Sign In
                  </Link>
                </p>
              </CardFooter>
            </>
          )}

          {/* STEP 2: 6-Digit OTP Verification Screen */}
          {step === "otp" && (
            <>
              <CardHeader className="text-center space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Verify {roleFormConfigs[activeRole].label} Registration
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  We sent a 6-digit verification code to{" "}
                  <span className="font-medium text-foreground">{email}</span> for your{" "}
                  <span className="font-semibold text-foreground">{roleFormConfigs[activeRole].label}</span> account
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {infoMessage && (
                  <div className="p-3 rounded-lg border border-border bg-muted/40 text-xs text-foreground">
                    {infoMessage}
                  </div>
                )}

                {devOtpHint && (
                  <div className="p-2.5 rounded-lg border border-dashed border-border bg-muted/20 text-xs text-muted-foreground font-mono text-center">
                    Dev Test Code: <span className="font-bold text-foreground">{devOtpHint}</span>
                  </div>
                )}

                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="block text-center text-xs text-muted-foreground">
                      Enter 6-Digit Verification Code
                    </Label>
                    <div
                      className="flex justify-center items-center gap-2"
                      onPaste={handleOtpPaste}
                    >
                      {otpDigits.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            otpInputRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          disabled={isLoading}
                          className="w-11 h-12 text-center text-lg font-mono font-semibold rounded-lg border border-input bg-transparent focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 outline-none transition-colors"
                        />
                      ))}
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/10 text-xs text-destructive">
                      {errorMessage}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || otpDigits.join("").length < 6}
                  >
                    {isLoading ? "Verifying..." : "Verify & Complete Registration"}
                  </Button>
                </form>

                <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("form");
                      setErrorMessage(null);
                      setInfoMessage(null);
                    }}
                    className="text-muted-foreground hover:text-foreground underline underline-offset-4"
                  >
                    Change email or details
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendCooldown > 0 || isLoading}
                    className="text-muted-foreground hover:text-foreground font-medium disabled:opacity-50 disabled:no-underline underline underline-offset-4"
                  >
                    {resendCooldown > 0
                      ? `Resend code in ${resendCooldown}s`
                      : "Resend Code"}
                  </button>
                </div>
              </CardContent>
            </>
          )}

          {/* STEP 3: Success Confirmation */}
          {step === "success" && (
            <>
              <CardHeader className="text-center space-y-2 py-8">
                <div className="w-12 h-12 rounded-full border border-border bg-muted/30 flex items-center justify-center mx-auto text-lg">
                  ✓
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Registration Verified!
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Your{" "}
                  <span className="font-semibold text-foreground">
                    {roleFormConfigs[activeRole].label}
                  </span>{" "}
                  account has been registered and verified in the database.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pb-8">
                <Button
                  onClick={() => router.push("/")}
                  className="w-full"
                >
                  Proceed to Sign In
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 border-t border-border mt-auto">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Skill-Bridge Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
