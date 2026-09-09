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

interface RoleConfig {
  label: string;
  description: string;
  emailLabel: string;
  emailPlaceholder: string;
}

const roleConfigs: Record<RoleType, RoleConfig> = {
  student: {
    label: "Student",
    description: "Access skill mapping, tests, resume checker, and job portal",
    emailLabel: "Student Email",
    emailPlaceholder: "student@institution.edu",
  },
  faculty: {
    label: "Faculty",
    description: "Monitor student progress, curriculum alignment, and assessments",
    emailLabel: "Faculty Email",
    emailPlaceholder: "faculty@institution.edu",
  },
  campus: {
    label: "Campus",
    description: "Manage institutional analytics, accreditation data, and placement",
    emailLabel: "Campus Admin Email",
    emailPlaceholder: "admin@campus.edu",
  },
  industry: {
    label: "Industry",
    description: "Post job and internship openings and discover verified candidates",
    emailLabel: "Work Email",
    emailPlaceholder: "recruiter@company.com",
  },
};

export default function LoginPage() {
  const router = useRouter();
  const [activeRole, setActiveRole] = React.useState<RoleType>("student");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role: activeRole,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Login failed. Please check your credentials.");
        setIsLoading(false);
        return;
      }

      if (data.redirectUrl) {
        if (typeof window !== "undefined") {
          if (data.isAdmin) {
            sessionStorage.setItem("skill_bridge_admin", "true");
          }
          sessionStorage.setItem("skill_bridge_user", JSON.stringify(data.user));
        }
        setSuccessMessage(
          data.isAdmin
            ? "Admin authentication successful. Entering Admin Panel..."
            : `Welcome, ${data.user.fullName}! Entering Student Portal...`
        );
        setTimeout(() => {
          router.push(data.redirectUrl);
        }, 350);
        return;
      }

      setSuccessMessage(
        `Welcome back, ${data.user.fullName}! Successfully signed in to the ${roleConfigs[activeRole].label} portal.`
      );
    } catch {
      setErrorMessage("Network error connecting to authentication server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground selection:bg-muted selection:text-foreground">
      {/* Top Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-3.5 border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg font-heading font-bold text-xs flex items-center justify-center bg-foreground text-background shadow-xs">
            S
          </div>
          <span className="font-heading font-bold text-base tracking-tight">Skill-Bridge</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle className="h-8 w-8 rounded-lg border border-border/80 bg-card/60 shadow-2xs" />
        </div>
      </header>

      {/* Main Login Card */}
      <main className="w-full max-w-md my-16">
        <Card className="border border-border/80 bg-card shadow-md rounded-2xl">
          <CardHeader className="text-center space-y-1.5 pb-3">
            <div className="mx-auto w-10 h-10 rounded-xl bg-muted/60 border border-border/80 flex items-center justify-center mb-1 text-foreground shadow-2xs font-heading font-bold text-sm">
              SB
            </div>
            <CardTitle className="text-2xl font-heading font-bold tracking-tight text-foreground">
              Welcome to Skill-Bridge
            </CardTitle>
            <CardDescription className="text-muted-foreground text-xs">
              Select your role to access your authoritative portal
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Tabs
              defaultValue="student"
              value={activeRole}
              onValueChange={(val) => {
                setActiveRole(val as RoleType);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-3 h-10 p-1 rounded-xl border border-border/80 bg-muted/50">
                <TabsTrigger value="student" className="rounded-lg text-xs font-medium">Student</TabsTrigger>
                <TabsTrigger value="faculty" className="rounded-lg text-xs font-medium">Faculty</TabsTrigger>
                <TabsTrigger value="campus" className="rounded-lg text-xs font-medium">Campus</TabsTrigger>
                <TabsTrigger value="industry" className="rounded-lg text-xs font-medium">Industry</TabsTrigger>
              </TabsList>

              {(Object.keys(roleConfigs) as RoleType[]).map((role) => {
                const config = roleConfigs[role];
                return (
                  <TabsContent key={role} value={role} className="space-y-4 pt-1">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {config.description}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div className="space-y-1.5">
                        <Label htmlFor={`${role}-email`} className="text-xs font-medium text-foreground">
                          {config.emailLabel}
                        </Label>
                        <Input
                          id={`${role}-email`}
                          type="email"
                          placeholder={config.emailPlaceholder}
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isLoading}
                          className="h-9 rounded-lg border-border/80 bg-input/20"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`${role}-password`} className="text-xs font-medium text-foreground">
                            Password
                          </Label>
                          <a
                            href="#forgot"
                            className="text-[11px] text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                            onClick={(e) => {
                              e.preventDefault();
                              alert("Password reset will be available upon backend integration.");
                            }}
                          >
                            Forgot password?
                          </a>
                        </div>
                        <Input
                          id={`${role}-password`}
                          type="password"
                          placeholder="••••••••"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isLoading}
                          className="h-9 rounded-lg border-border/80 bg-input/20"
                        />
                      </div>

                      {errorMessage && (
                        <div className="p-3 rounded-xl border border-destructive/30 bg-destructive/10 text-xs text-destructive">
                          {errorMessage}
                        </div>
                      )}

                      {successMessage && (
                        <div className="p-3 rounded-xl border border-border/80 bg-muted/40 text-xs text-foreground">
                          {successMessage}
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full h-10 rounded-xl font-heading font-medium tracking-wide shadow-xs mt-1"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : `Sign in as ${config.label}`}
                      </Button>
                    </form>
                  </TabsContent>
                );
              })}
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col items-center justify-center gap-2 border-t border-border/60 pt-4 pb-4">
            <p className="text-xs text-muted-foreground text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-foreground hover:underline underline-offset-4"
              >
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 border-t border-border/80 mt-auto">
        <p className="text-xs text-muted-foreground font-mono">
          &copy; {new Date().getFullYear()} Skill-Bridge Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
