import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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

// Server Components, Route Handlers, and Server Actions use this.
// In Next.js 15, cookies() returns a Promise, so we await it.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      // Read every cookie Supabase currently knows about.
      getAll() {
        return cookieStore.getAll();
      },
      // Persist refreshed auth cookies. cookieStore.set() throws when
      // called from a Server Component (its cookies are read-only),
      // so we swallow that error here. In Server Actions and Route
      // Handlers the call succeeds and the session is updated.
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // No-op: read-only cookie context (e.g. a Server Component).
        }
      },
    },
  });
}
