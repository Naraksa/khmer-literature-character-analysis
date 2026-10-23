import Link from "next/link";
import { redirect } from "next/navigation";
import { LuArrowLeft, LuPencil, LuClock, LuCircleCheck, LuUndo2 } from "react-icons/lu";
import { createClient } from "../../lib/supabase/server.js";

// Plain-word status labels (English + Khmer) for the /my-entries page.
// The database stores the raw status ('pending' | 'published' | 'returned');
// these labels are purely a presentation concern, so no SQL/RLS changes
// are needed.
const STATUS_LABELS = {
  pending: { text: "Waiting for review", kh: "កំពុងរង់ចាំការត្រួតពិនិត្យ", icon: LuClock },
  published: { text: "Published on archive", kh: "បានបោះពុម្ពផ្សាយ", icon: LuCircleCheck },
  returned: { text: "Returned — needs changes", kh: "បានបង្វិលជូនវិញ — ត្រូវការកែសម្រួល", icon: LuUndo2 },
};

const styles = {
  page: { minHeight: "100vh", display: "flex", flexDirection: "column" },
  main: { flex: 1, width: "100%", maxWidth: 1000, margin: "0 auto", padding: "44px 24px 80px" },
  backLink: {
    display: "inline-flex", alignItems: "center", gap: 8, color: "#6B3A19",
    textDecoration: "none", fontSize: 13.5, fontFamily: "'Lora', Georgia, serif",
    fontWeight: 600, marginBottom: 28, padding: "8px 16px", borderRadius: 8,
    backgroundColor: "#F4ECE0", border: "1px solid #DFD2BF",
    boxShadow: "0 2px 6px rgba(60, 35, 20, 0.04)",
  },
  heading: { fontSize: 32, fontWeight: 700, color: "#2C1810", margin: "0 0 8px", fontFamily: "'Hanuman', 'Lora', Georgia, serif" },
  subtitle: { fontFamily: "'Lora', Georgia, serif", fontSize: 16, color: "#5C4636", margin: "0 0 36px", lineHeight: 1.6 },
  list: { display: "flex", flexDirection: "column", gap: 16 },
  card: {
    display: "flex", gap: 18, backgroundColor: "#FDFBF7", border: "1px solid #DFD3BE",
    borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 14px rgba(60, 35, 20, 0.06)",
  },
  thumb: { width: 120, minWidth: 120, height: 120, backgroundColor: "#EAE0D0", objectFit: "cover", display: "block" },
  body: { flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10, minWidth: 0 },
  titleRow: { display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" },
  character: { fontSize: 20, fontWeight: 700, color: "#2C1810", fontFamily: "'Hanuman', 'Lora', Georgia, serif", margin: 0 },
  bookTitle: { fontSize: 14, color: "#7B3F00", fontFamily: "'Lora', Georgia, serif" },
  meta: { fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "#6E5743" },
  statusRow: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: "auto" },
  badge: {
    display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Inter', sans-serif",
    fontSize: 12.5, fontWeight: 600, padding: "5px 12px", borderRadius: 999, borderWidth: 1, borderStyle: "solid",
  },
  badgePending: { color: "#8C6D1F", backgroundColor: "#FBF3DD", borderColor: "#E8D9A8" },
  badgePublished: { color: "#2F6B3F", backgroundColor: "#EAF4EC", borderColor: "#C6E0CB" },
  badgeReturned: { color: "#9A3412", backgroundColor: "#FBF1EC", borderColor: "#E8C9BC" },
  statusKh: { fontFamily: "'Hanuman', 'Lora', Georgia, serif", fontSize: 13.5, color: "#5C4636" },
  editLink: {
    display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Inter', sans-serif",
    fontSize: 13.5, fontWeight: 600, color: "#6B3A19", backgroundColor: "#F4ECE0",
    border: "1px solid #DFD2BF", borderRadius: 8, padding: "7px 14px", textDecoration: "none", cursor: "pointer",
  },
  viewLink: {
    display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Inter', sans-serif",
    fontSize: 13.5, fontWeight: 600, color: "#6B3A19", textDecoration: "none",
  },
  emptyState: { textAlign: "center", padding: "64px 24px", color: "#8B7355", fontFamily: "'Lora', Georgia, serif", fontSize: 16 },
  emptyCta: {
    marginTop: 16, display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: 13.5,
    fontWeight: 600, color: "#FFFFFF", backgroundColor: "#6B3A19", textDecoration: "none", borderRadius: 8, padding: "10px 18px",
  },
};

function StatusBadge({ status }) {
  const label = STATUS_LABELS[status] ?? STATUS_LABELS.pending;
  const Icon = label.icon;
  const badgeStyle =
    status === "published"
      ? { ...styles.badge, ...styles.badgePublished }
      : status === "returned"
      ? { ...styles.badge, ...styles.badgeReturned }
      : { ...styles.badge, ...styles.badgePending };

  return (
    <>
      <span style={badgeStyle}>
        <Icon size={13} /> {label.text}
      </span>
      <span style={styles.statusKh}>{label.kh}</span>
    </>
  );
}

export const dynamic = "force-dynamic";

export default async function MyEntriesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // List the entries owned by the signed-in user, newest first. RLS already
  // restricts the user to their own rows; filtering by owner scopes the list
  // to entries they contributed. No SQL or policy changes are made here.
  const { data: entries } = await supabase
    .from("entries")
    .select(
      "id, character, book_title, author, published_year, image, status"
    )
    .eq("owner", user.id)
    .order("created_at", { ascending: false });

  return (
    <div style={styles.page}>
      <main style={styles.main} className="fade-in-1">
        <Link href="/" style={styles.backLink}>
          <LuArrowLeft size={14} /> Return to Collection Catalog
        </Link>

        <h1 style={styles.heading}>My entries</h1>
        <p style={styles.subtitle}>
          Track the review status of entries you have contributed. Rejected
          entries can be edited and resubmitted.
        </p>

        {(!entries || entries.length === 0) ? (
          <div style={styles.emptyState}>
            <p>You have not contributed any entries yet.</p>
            <Link href="/contribute" style={styles.emptyCta}>Contribute an entry</Link>
          </div>
        ) : (
          <div style={styles.list}>
            {entries.map((entry) => {
              const isReturned = entry.status === "returned";
              const isPublished = entry.status === "published";
              return (
                <article key={entry.id} style={styles.card} className="literary-card">
                  {entry.image ? (
                    <img src={entry.image} alt={entry.character} style={styles.thumb} />
                  ) : (
                    <div style={styles.thumb} aria-hidden="true" />
                  )}
                  <div style={styles.body}>
                    <div style={styles.titleRow}>
                      <h2 style={styles.character}>{entry.character}</h2>
                      {entry.book_title && (
                        <span style={styles.bookTitle}>· {entry.book_title}</span>
                      )}
                    </div>
                    {(entry.author || entry.published_year) && (
                      <div style={styles.meta}>
                        {entry.author}
                        {entry.author && entry.published_year ? " · " : ""}
                        {entry.published_year}
                      </div>
                    )}
                    <div style={styles.statusRow}>
                      <StatusBadge status={entry.status} />
                      {isPublished && (
                        <Link href={`/characters/${entry.id}`} style={styles.viewLink}>
                          View on archive →
                        </Link>
                      )}
                      {isReturned && (
                        <Link href={`/characters/${entry.id}/edit`} style={styles.editLink}>
                          <LuPencil size={14} /> Edit & resubmit
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

