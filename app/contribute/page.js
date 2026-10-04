import Link from "next/link";
import { createClient } from "../../lib/supabase/server.js";
import ContributeForm from "../../components/ContributeForm.js";

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FDFBF7",
    border: "1px solid #DFD3BE",
    borderRadius: 10,
    padding: "40px 36px",
    boxShadow: "0 2px 8px rgba(60, 35, 20, 0.04)",
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: "#2C1810",
    margin: "0 0 14px",
    fontFamily: "'Hanuman', 'Lora', Georgia, serif",
  },
  message: {
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 15.5,
    color: "#5C4636",
    margin: "0 0 24px",
    lineHeight: 1.6,
  },
  link: {
    display: "inline-block",
    fontFamily: "'Inter', sans-serif",
    fontSize: 13.5,
    fontWeight: 600,
    color: "#FFFFFF",
    backgroundColor: "#6B3A19",
    textDecoration: "none",
    borderRadius: 8,
    padding: "10px 20px",
  },
  formWrap: {
    maxWidth: 1240,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
};

// Server Component: decide here, on the server, whether the visitor may
// see the form. We use getUser() (not getSession()) so the token is
// actually validated against Supabase rather than trusted from a cookie.
export default async function ContributePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Log in to contribute</h1>
          <p style={styles.message}>
            You need an account to add entries to the archive.
          </p>
          <Link href="/login" style={styles.link}>Log in</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.formWrap}>
      <ContributeForm user={user} />
    </main>
  );
}
