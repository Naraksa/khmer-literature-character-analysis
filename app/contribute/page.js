import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
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
    maxWidth: 460,
    backgroundColor: "#FDFBF7",
    border: "1px solid #DFD3BE",
    borderRadius: 12,
    padding: "40px 36px",
    boxShadow: "0 4px 14px rgba(60, 35, 20, 0.06)",
    textAlign: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: 700,
    color: "#2C1810",
    margin: "0 0 14px",
    fontFamily: "'Hanuman', 'Lora', Georgia, serif",
  },
  message: {
    fontFamily: "'Hanuman', 'Lora', Georgia, serif",
    fontSize: 15.5,
    color: "#5C4636",
    margin: "0 0 24px",
    lineHeight: 1.7,
  },
  link: {
    display: "inline-block",
    fontFamily: "'Hanuman', 'Inter', sans-serif",
    fontSize: 13.5,
    fontWeight: 600,
    color: "#FFFFFF",
    backgroundColor: "#6B3A19",
    textDecoration: "none",
    borderRadius: 8,
    padding: "10px 22px",
    boxShadow: "0 2px 6px rgba(107, 58, 25, 0.15)",
  },
  formWrap: {
    maxWidth: 1240,
    margin: "0 auto",
    padding: "40px 24px 80px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "#6B3A19",
    textDecoration: "none",
    fontSize: 13.5,
    fontFamily: "'Hanuman', 'Inter', sans-serif",
    fontWeight: 600,
    marginBottom: 24,
    padding: "8px 16px",
    borderRadius: 8,
    backgroundColor: "#F4ECE0",
    border: "1px solid #DFD2BF",
    boxShadow: "0 2px 6px rgba(60, 35, 20, 0.04)",
  },
};

export default async function ContributePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>ចូលគណនីដើម្បីរួមចំណែក</h1>
          <p style={styles.message}>
            You need an account to add entries to the archive. / លោកអ្នកត្រូវមានគណនីដើម្បីអាចបន្ថែមតួអង្គចូលក្នុងបណ្ណសារ។
          </p>
          <Link href="/login" style={styles.link}>
            ចូលគណនី / Log in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.formWrap}>
      <Link href="/" style={styles.backLink}>
        <LuArrowLeft size={14} /> Return to Collection Catalog
      </Link>
      <ContributeForm user={user} />
    </main>
  );
}
