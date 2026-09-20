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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      // Generic message only — never leak why sign-in failed.
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <p style={styles.kicker}>Khmer Living Archive</p>
        <h1 style={styles.title}>Log in</h1>

        {error && <p style={styles.error}>{error}</p>}

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
              autoComplete="current-password"
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
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>

        <div style={styles.linkRow}>
          <Link href="/signup" style={styles.link}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}