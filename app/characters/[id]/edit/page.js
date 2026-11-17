import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { createClient } from "../../../../lib/supabase/server.js";
import ContributeForm from "../../../../components/ContributeForm.js";

export const dynamic = "force-dynamic";

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
    maxWidth: 480,
    backgroundColor: "#FDFBF7",
    border: "1px solid #DFD3BE",
    borderRadius: 12,
    padding: "40px 36px",
    boxShadow: "0 4px 14px rgba(60, 35, 20, 0.05)",
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
    lineHeight: 1.6,
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
    padding: "10px 20px",
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

// Server-side gate: only the owner may edit. We fetch the entry and the
// user here, on the server, so the form is never sent to a non-owner.
export default async function EditPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>ចូលគណនីដើម្បីកែប្រែ</h1>
          <p style={styles.message}>You need an account to edit entries. / លោកអ្នកត្រូវចូលគណនីដើម្បីកែសម្រួលអត្ថបទ។</p>
          <Link href="/login" style={styles.link}>ចូលគណនី / Log in</Link>
        </div>
      </main>
    );
  }

  const { data: entry } = await supabase
    .from("entries")
    .select("id, owner, slug, character, role, book_title, author, published_year, image, plot_summary")
    .eq("id", id)
    .maybeSingle();

  if (!entry) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>រកមិនឃើញអត្ថបទទេ / Entry not found</h1>
          <Link href="/" style={styles.link}>ត្រឡប់ទៅទំព័រដើម / Back to catalog</Link>
        </div>
      </main>
    );
  }

  // Ownership check on the server, before the form is ever rendered.
  if (entry.owner !== user.id) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>You can't edit this entry</h1>
          <p style={styles.message}>You can only edit entries you own. / លោកអ្នកអាចកែប្រែបានតែអត្ថបទដែលជារបស់ខ្លួនប៉ុណ្ណោះ។</p>
          <Link href={`/characters/${id}`} style={styles.link}>ត្រឡប់ទៅអត្ថបទ / Back to entry</Link>
        </div>
      </main>
    );
  }

  // Pass only the editable fields to the client form (owner stays out).
  const editable = {
    id: entry.id,
    slug: entry.slug ?? "",
    character: entry.character ?? "",
    role: entry.role ?? "",
    book_title: entry.book_title ?? "",
    author: entry.author ?? "",
    published_year: entry.published_year != null ? String(entry.published_year) : "",
    image: entry.image ?? "",
    plot_summary: entry.plot_summary ?? "",
  };

  return (
    <main style={styles.formWrap}>
      <Link href={`/characters/${id}`} style={styles.backLink}>
        <LuArrowLeft size={14} /> Return to Character Profile
      </Link>
      <ContributeForm user={user} entry={editable} />
    </main>
  );
}
