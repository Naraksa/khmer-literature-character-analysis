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

  if (user) {
    return (
      <nav style={styles.nav}>
        <span style={styles.email} title={user.email}>
          {user.email}
        </span>
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