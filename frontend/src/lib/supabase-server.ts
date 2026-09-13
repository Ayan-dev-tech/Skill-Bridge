import { createClient, SupabaseClient } from "@supabase/supabase-js";

let serverClientInstance: SupabaseClient | null = null;

/**
 * Returns the authoritative server-side Supabase client for runtime persistence.
 * Configured with the server secret header to execute server-authorized queries under RLS.
 */
export function getSupabaseServerClient(): SupabaseClient {
  if (serverClientInstance) {
    return serverClientInstance;
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      // In standalone scripts or tests, load from .env.local if not already loaded by Next.js
      const fs = require("fs");
      const path = require("path");
      const envPath = path.resolve(process.cwd(), ".env.local");
      const altEnvPath = path.resolve(process.cwd(), "frontend", ".env.local");
      const targetPath = fs.existsSync(envPath) ? envPath : (fs.existsSync(altEnvPath) ? altEnvPath : null);
      if (targetPath) {
        const content = fs.readFileSync(targetPath, "utf-8");
        content.split("\n").forEach((line: string) => {
          const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
          if (match) {
            const key = match[1];
            let value = match[2] || "";
            if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            if (!process.env[key]) process.env[key] = value.trim();
          }
        });
      }
    } catch {
      // Ignore if in browser or environment without fs
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serverSecret = process.env.SESSION_SECRET || "";

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment.");
  }

  serverClientInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        "x-skillbridge-server-secret": serverSecret,
      },
    },
  });

  return serverClientInstance;
}

/**
 * Checks whether the application is running in authoritative Supabase persistence mode.
 */
export function isSupabasePersistenceActive(): boolean {
  const mode = process.env.PERSISTENCE_MODE || "SUPABASE";
  return mode.toUpperCase() === "SUPABASE";
}
