import Link from "next/link";
import { createClient } from "../lib/supabase/server.js";
import LogoutButton from "./LogoutButton.js";

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 12,
    fontFamily: "'Inter', sans-serif",
    fontSize: 13.5,
    color: "#6E5743",
  },
  email: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: 180,
    display: "inline-block",
  },
  link: {
    color: "#6B3A19",
    fontWeight: 600,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
};

export default async function AuthNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The Review link is shown only to reviewers. We gate it on the server with
  // is_reviewer(); fail-safe: any error or non-true value hides the link. The
  // real error goes to console.error only — never the UI.
  let isReviewer = false;
  if (user) {
    try {
      const { data: reviewerFlag, error } = await supabase.rpc("is_reviewer");
      if (error) {
        console.error("is_reviewer RPC failed:", error);
      } else {
        isReviewer = reviewerFlag === true;
      }
    } catch (err) {
      console.error("is_reviewer RPC threw:", err);
    }
  }

  if (user) {
    return (
      <nav style={styles.nav}>
        <span style={styles.email} title={user.email}>
          {user.email}
        </span>
        <Link href="/contribute" style={styles.link}>
          Contribute
        </Link>
        <Link href="/my-entries" style={styles.link}>
          My entries
        </Link>
        {isReviewer && (
          <Link href="/review" style={styles.link}>
            Review
          </Link>
        )}
        <LogoutButton />
      </nav>
    );
  }

  return (
    <nav style={styles.nav}>
      <Link href="/login" style={styles.link}>
        Log in
      </Link>
      <Link href="/signup" style={styles.link}>
        Sign up
      </Link>
    </nav>
  );
}