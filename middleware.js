import { updateSession } from "./lib/supabase/middleware.js";

// Runs on every matched request before the route renders. Hands off
// to updateSession(), which refreshes the Supabase auth session and
// returns the response (with updated cookies) for Next to continue.
export async function middleware(request) {
  return await updateSession(request);
}

// Run on everything except static assets and common image files, so
// the session refresh doesn't fire on hot paths that never need auth.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
