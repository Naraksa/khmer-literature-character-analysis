"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client.js";

const supabase = createClient();

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
  },
  kicker: {
    fontFamily: "'Inter', sans-serif",
    color: "#8B4513",
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    margin: "0 0 14px",
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: "#2C1810",
    margin: "0 0 28px",
    lineHeight: 1.25,
    letterSpacing: "-0.5px",
    fontFamily: "'Hanuman', 'Lora', Georgia, serif",
  },
  field: {
    marginBottom: 18,
  },
  label: {
    display: "block",
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    color: "#8C715A",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: 700,
    margin: "0 0 6px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #DFD3BE",
    borderRadius: 8,
    backgroundColor: "#FDFBF7",
    padding: "10px 14px",
    fontSize: 15,
    color: "#2C1810",
    fontFamily: "'Lora', Georgia, serif",
    outline: "none",
  },
  submit: {
    width: "100%",
    fontFamily: "'Inter', sans-serif",
    fontSize: 13.5,
    fontWeight: 600,
    color: "#FFFFFF",
    backgroundColor: "#6B3A19",
    borderColor: "#6B3A19",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    padding: "10px 14px",
    cursor: "pointer",
    marginTop: 8,
    lineHeight: 1,
  },
  submitDisabled: {
    color: "#C7B59D",
    backgroundColor: "#F5EFE3",
    borderColor: "#E7DCC8",
    cursor: "not-allowed",
  },
  error: {
    margin: "0 0 18px",
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 14.5,
    color: "#8B4513",
  },
  notice: {
    margin: "0 0 18px",
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 14.5,
    color: "#5C4636",
  },
  linkRow: {
    marginTop: 24,
    paddingTop: 20,
    borderTop: "1px solid #E0D4C1",
    fontFamily: "'Inter', sans-serif",
    fontSize: 13.5,
    color: "#6E5743",
  },
  link: {
    color: "#6B3A19",
    fontWeight: 600,
    textDecoration: "none",
  },
};

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      // Generic message only — never leak why sign-up failed.
      setError("Could not create account. Please try again.");
      setLoading(false);
      return;
    }

    // When email confirmation is enabled, Supabase returns no session.
    // Keep the user here with a confirmation prompt instead of redirecting.
    if (data.session) {
      router.push("/");
      router.refresh();
      return;
    }

    setNotice("Check your email to confirm your account.");
    setLoading(false);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <p style={styles.kicker}>Khmer Living Archive</p>
        <h1 style={styles.title}>Create an account</h1>

        {error && <p style={styles.error}>{error}</p>}
        {notice && <p style={styles.notice}>{notice}</p>}

        <form onSubmit={onSubmit}>
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              autoComplete="email"
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submit,
              ...(loading ? styles.submitDisabled : {}),
            }}
          >
            {loading ? "Creating account…" : "Sign up"}
          </button>
        </form>

        <div style={styles.linkRow}>
          <Link href="/login" style={styles.link}>
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}