import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// Refreshes the user's session on every matched request. We build a
// server client bound to the request cookies, then write any refreshed
// auth cookies onto the response we return.
export async function updateSession(request) {
  // Fail fast if either required env var is missing. We name the variable
  // only, never its value, so no secret ever lands in a thrown error.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  if (!supabaseKey) throw new Error("Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

  // Carry the incoming cookies through to the response so setAll() has
  // a writable target.
  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // getUser() (not getSession()) forces a round-trip to Supabase to
  // validate and refresh the token, rather than trusting the cookie
  // alone.
  await supabase.auth.getUser();

  return response;
}