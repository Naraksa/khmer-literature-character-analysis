import Link from "next/link";
import { LuUser, LuLogIn, LuUserPlus } from "react-icons/lu";
import { createClient } from "../lib/supabase/server.js";
import LogoutButton from "./LogoutButton.js";

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
    padding: "2px 0",
  },
  brandLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    color: "inherit",
    borderRadius: 8,
    padding: "4px 8px",
    marginLeft: -8,
    transition: "opacity 0.2s ease",
  },
  brandPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FAF6EE",
    border: "1px solid #DAC2A8",
    borderRadius: 8,
    padding: "5px 12px",
    boxShadow: "0 1px 3px rgba(60, 35, 20, 0.04)",
  },
  brandTitle: {
    fontFamily: "'Hanuman', 'Lora', Georgia, serif",
    fontSize: 15,
    fontWeight: 700,
    color: "#2C1810",
    letterSpacing: 0.2,
  },
  brandDot: {
    color: "#B39882",
    fontSize: 12,
  },
  brandSub: {
    fontFamily: "'Hanuman', 'Lora', Georgia, serif",
    fontSize: 13,
    fontWeight: 600,
    color: "#6B3A19",
  },
  rightGroup: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  userBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    fontFamily: "'Hanuman', 'Inter', sans-serif",
    fontSize: 12.5,
    color: "#5C4636",
    backgroundColor: "#FAF6EE",
    border: "1px solid #D8CBB6",
    borderRadius: 7,
    padding: "6px 12px",
    maxWidth: 240,
  },
  emailText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: 500,
  },
  authLink: {
    fontFamily: "'Hanuman', 'Inter', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: "#6B3A19",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    borderRadius: 7,
    backgroundColor: "#FAF6EE",
    border: "1px solid #DACBB4",
    transition: "background-color 0.2s ease",
  },
  signupLink: {
    fontFamily: "'Hanuman', 'Inter', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: "#FFFFFF",
    backgroundColor: "#6B3A19",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 14px",
    borderRadius: 7,
    border: "1px solid #6B3A19",
    transition: "background-color 0.2s ease",
  },
};

export default async function AuthNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav style={styles.nav} aria-label="Archive identity and account">
      <Link href="/" style={styles.brandLink}>
        <div style={styles.brandPill}>
          <span className="floating-book" style={{ fontSize: 16 }}>📖</span>
          <span style={styles.brandTitle}>បណ្ណសារអក្សរសិល្ប៍ខ្មែរ</span>
          <span style={styles.brandDot}>·</span>
          <span style={styles.brandSub}>Living Archive</span>
        </div>
      </Link>

      <div style={styles.rightGroup}>
        {user ? (
          <>
            <div style={styles.userBadge} title={user.email}>
              <LuUser size={13} style={{ color: "#8B4513", flexShrink: 0 }} />
              <span style={styles.emailText}>{user.email}</span>
            </div>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login" style={styles.authLink}>
              <LuLogIn size={13} />
              <span>ចូលគណនី / Log in</span>
            </Link>
            <Link href="/signup" style={styles.signupLink}>
              <LuUserPlus size={13} />
              <span>ចុះឈ្មោះ / Sign up</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
