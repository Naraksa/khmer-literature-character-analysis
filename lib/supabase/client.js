import { createBrowserClient } from "@supabase/ssr";

// Fail fast if either required env var is missing. We name the variable
// only — never its value — so no secret ever lands in a thrown error.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (supabaseUrl === undefined) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (supabaseKey === undefined) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
}

// Client Components use this. It reads auth tokens from browser cookies
// and keeps the session in sync across tabs.
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}
