import Link from "next/link";
import { LuArrowLeft, LuTheater, LuClock } from "react-icons/lu";
import { createClient } from "../../lib/supabase/server.js";

// This route is the reviewer's queue. Access is gated on the server by the
// database function is_reviewer(), which returns true only when the signed-in
// user has the reviewer role. Row-level security already decides who can see
// what; this page does not add or change any SQL, policies, or functions.
//
// No SQL/RLS changes are made here. We only call is_reviewer() and, when it is
// not true, we show the restricted message and nothing else (no entry list).
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
    maxWidth: 560,
    backgroundColor: "#FDFBF7",
    border: "1px solid #DFD3BE",
    borderRadius: 10,
    padding: "40px 36px",
    boxShadow: "0 2px 8px rgba(60, 35, 20, 0.04)",
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
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 15.5,
    color: "#5C4636",
    margin: "0 0 24px",
    lineHeight: 1.6,
  },
  formWrap: {
    maxWidth: 1240,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "#6B3A19",
    textDecoration: "none",
    fontSize: 13.5,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    marginBottom: 28,
    padding: "8px 16px",
    borderRadius: 8,
    backgroundColor: "#F4ECE0",
    border: "1px solid #DFD2BF",
    boxShadow: "0 2px 6px rgba(60, 35, 20, 0.04)",
  },
  heading: {
    fontSize: 32,
    fontWeight: 700,
    color: "#2C1810",
    margin: "0 0 8px",
    fontFamily: "'Hanuman', 'Lora', Georgia, serif",
  },
  subtitle: {
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 16,
    color: "#5C4636",
    margin: "0 0 36px",
    lineHeight: 1.6,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  entryCard: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    backgroundColor: "#FDFBF7",
    border: "1px solid #DFD3BE",
    borderRadius: 12,
    padding: "18px 20px",
    boxShadow: "0 4px 14px rgba(60, 35, 20, 0.06)",
  },
  entryTitleRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    flexWrap: "wrap",
  },
  entryCharacter: {
    fontSize: 20,
    fontWeight: 700,
    color: "#2C1810",
    fontFamily: "'Hanuman', 'Lora', Georgia, serif",
    margin: 0,
  },
  entryBook: {
    fontSize: 14,
    color: "#7B3F00",
    fontFamily: "'Lora', Georgia, serif",
  },
  entryBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    fontFamily: "'Inter', sans-serif",
    fontSize: 11.5,
    fontWeight: 700,
    color: "#7B3F00",
    backgroundColor: "#F7EFE2",
    border: "1px solid #E5D3BC",
    padding: "3px 12px",
    borderRadius: 6,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  entrySummary: {
    fontFamily: "'Hanuman', 'Lora', Georgia, serif",
    fontSize: 14.5,
    color: "#3D2B1D",
    lineHeight: 1.75,
    margin: 0,
    // Clamp long summaries so a card never dominates the queue. No new
    // dependency — this is a plain inline style.
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  entryMeta: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "'Inter', sans-serif",
    fontSize: 12.5,
    color: "#6E5743",
    marginTop: "auto",
  },
  emptyState: {
    textAlign: "center",
    padding: "64px 24px",
    color: "#8B7355",
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 16,
  },
};

export default async function ReviewPage() {
  const supabase = await createClient();

  // Fail-safe authorization: only is_reviewer() === true grants access. Any
  // error, a false, or any non-true value means we show the restricted message
  // and no entries. The real error goes to console.error only — never the UI.
  let isReviewer = false;
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

  // Not a reviewer: show only the restricted message. No entries are listed.
  if (!isReviewer) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Access restricted</h1>
          <p style={styles.message}>
            ទំព័រនេះសម្រាប់តែអ្នកត្រួតពិនិត្យប៉ុណ្ណោះ / Access restricted: Reviewer authorization required.
          </p>
        </div>
      </main>
    );
  }

  // A reviewer is signed in. List entries awaiting review, oldest first so the
  // longest-waiting submissions surface at the top of the queue. RLS already
  // decides which rows the reviewer may see, so we add no SQL/policy changes
  // and do not filter by owner. category -> the entry's `role` column (a
  // character's role within the literary work); description/analysis text ->
  // `plot_summary`. The real error goes to console.error only — never the UI.
  let entries = [];
  try {
    const { data, error: fetchErr } = await supabase
      .from("entries")
      .select("id, character, book_title, role, plot_summary, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: true });
    if (fetchErr) {
      console.error("Pending entries fetch failed:", fetchErr);
    } else {
      entries = data ?? [];
    }
  } catch (err) {
    console.error("Pending entries fetch threw:", err);
  }

  // Intl.DateTimeFormat is built into the runtime — no new package. Supabase
  // returns created_at as an ISO string; we render a readable date + time.
  const formatDate = (iso) => {
    if (!iso) return "";
    try {
      return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <main style={styles.formWrap} className="fade-in-1">
        <Link href="/" style={styles.backLink}>
          <LuArrowLeft size={14} /> Return to Collection Catalog
        </Link>
        <h1 style={styles.heading}>Review queue</h1>
        <p style={styles.subtitle}>
          Entries awaiting review, oldest first.
        </p>

        {entries.length === 0 ? (
          <div style={styles.emptyState}>
            គ្មានធាតុដែលត្រូវត្រួតពិនិត្យទេ / No pending entries to review.
          </div>
        ) : (
          <div style={styles.list}>
            {entries.map((entry) => (
              <article key={entry.id} style={styles.entryCard} className="literary-card">
                <div style={styles.entryTitleRow}>
                  <h2 style={styles.entryCharacter}>{entry.character}</h2>
                  {entry.book_title && (
                    <span style={styles.entryBook}>· {entry.book_title}</span>
                  )}
                </div>

                {entry.role && (
                  <span style={styles.entryBadge}>
                    <LuTheater size={12} /> {entry.role}
                  </span>
                )}

                {entry.plot_summary && (
                  <p style={styles.entrySummary}>{entry.plot_summary}</p>
                )}

                <div style={styles.entryMeta}>
                  <LuClock size={13} /> {formatDate(entry.created_at)}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
