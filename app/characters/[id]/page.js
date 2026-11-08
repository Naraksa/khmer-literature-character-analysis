import Link from "next/link";
import {
  LuBookOpen,
  LuArrowLeft,
  LuTheater,
  LuPenLine,
  LuCalendar,
  LuScroll,
  LuGraduationCap,
  LuMapPin,
  LuClock,
  LuUndo2,
  LuMessageSquarePlus,
} from "react-icons/lu";
import { createClient } from "../../../lib/supabase/server.js";
import EntryActions from "../../../components/EntryActions.js";

// Detail pages are fully dynamic: entries live in Supabase and are keyed by a
// generated uuid, so there is no fixed set of params to pre-render.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: entry } = await supabase
    .from("entries")
    .select("character, book_title, plot_summary")
    .eq("id", id)
    .maybeSingle();
  if (!entry) return { title: "Entry Not Found — Khmer Living Archive" };
  return {
    title: `${entry.character} (${entry.book_title}) — Khmer Literature Analysis`,
    description: entry.plot_summary,
  };
}

const styles = {
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "44px 24px 80px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "#6B3A19",
    textDecoration: "none",
    fontSize: 13.5,
    fontFamily: "'Lora', Georgia, serif",
    fontWeight: 600,
    marginBottom: 32,
    padding: "8px 16px",
    borderRadius: 8,
    backgroundColor: "#F4ECE0",
    border: "1px solid #DFD2BF",
    boxShadow: "0 2px 6px rgba(60, 35, 20, 0.04)",
  },
  heroSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 36,
    backgroundColor: "#FDFBF7",
    border: "1px solid #DFD2BE",
    borderRadius: 14,
    overflow: "hidden",
    padding: 32,
    marginBottom: 44,
    boxShadow: "0 6px 20px rgba(60, 35, 20, 0.06)",
  },
  imageWrap: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    height: 380,
    backgroundColor: "#EBE0CF",
    border: "1px solid #DACAB3",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  detailsCol: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    justifyContent: "center",
  },
  badgeRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  roleBadge: {
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
  name: {
    fontSize: 42,
    fontWeight: 700,
    color: "#2C1810",
    margin: 0,
    lineHeight: 1.2,
    fontFamily: "'Hanuman', serif",
  },
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 12,
    padding: "16px 0",
    borderTop: "1px solid #EBE0CF",
    borderBottom: "1px solid #EBE0CF",
  },
  metaItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  metaLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    color: "#856E58",
    textTransform: "uppercase",
    margin: 0,
    fontWeight: 700,
    letterSpacing: 1,
  },
  metaValue: {
    fontSize: 15,
    color: "#2C1810",
    fontWeight: 600,
    margin: 0,
  },
  plotBox: {
    backgroundColor: "#F5EDE0",
    borderLeft: "4px solid #8B4513",
    padding: "16px 20px",
    borderRadius: "0 8px 8px 0",
  },
  plotLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11.5,
    fontWeight: 700,
    color: "#7B3F00",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  plotText: {
    fontSize: 15.5,
    color: "#3D2B1D",
    lineHeight: 1.8,
    margin: 0,
    fontFamily: "'Hanuman', serif",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#2C1810",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontFamily: "'Lora', Georgia, serif",
  },
  countPill: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    color: "#6B3A19",
    backgroundColor: "#EFE5D4",
    border: "1px solid #D5C2A8",
    padding: "3px 10px",
    borderRadius: 6,
    fontWeight: 600,
  },
  perspectivesList: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  perspectiveCard: {
    backgroundColor: "#FDFBF7",
    border: "1px solid #DFD2BE",
    borderRadius: 12,
    padding: "26px 30px",
    boxShadow: "0 4px 14px rgba(60, 35, 20, 0.05)",
  },
  perspectiveHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 14,
    borderBottom: "1px solid #EFE4D2",
    flexWrap: "wrap",
    gap: 8,
  },
  contributorName: {
    fontSize: 16,
    fontWeight: 700,
    color: "#2C1810",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "'Lora', Georgia, serif",
  },
  placeBadge: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    color: "#6D5745",
    backgroundColor: "#F4ECE0",
    border: "1px solid #DFD2BF",
    padding: "4px 10px",
    borderRadius: 6,
  },
  perspectiveText: {
    fontSize: 17.5,
    color: "#2C1810",
    lineHeight: 1.9,
    margin: 0,
    fontFamily: "'Hanuman', serif",
  },
  notFound: {
    textAlign: "center",
    padding: "80px 24px",
  },
  statusBanner: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "14px 18px",
    borderRadius: 10,
    marginBottom: 20,
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    lineHeight: 1.6,
    borderWidth: 1,
    borderStyle: "solid",
  },
  statusBannerPending: {
    color: "#8C6D1F",
    backgroundColor: "#FBF3DD",
    borderColor: "#E8D9A8",
  },
  statusBannerReturned: {
    color: "#9A3412",
    backgroundColor: "#FBF1EC",
    borderColor: "#E8C9BC",
  },
  statusBannerKh: {
    fontFamily: "'Hanuman', 'Lora', Georgia, serif",
    fontSize: 15,
    margin: 0,
  },
  statusBannerEn: {
    margin: 0,
    fontSize: 13.5,
    opacity: 0.9,
  },
  perspectivesEmpty: {
    textAlign: "center",
    padding: "48px 24px",
    backgroundColor: "#FDFBF7",
    border: "1px solid #DFD3BE",
    borderRadius: 12,
    boxShadow: "0 4px 14px rgba(60, 35, 20, 0.05)",
  },
  perspectivesEmptyIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#B59A78",
    marginBottom: 14,
  },
  perspectivesEmptyKh: {
    fontFamily: "'Hanuman', 'Lora', Georgia, serif",
    fontSize: 17,
    color: "#2C1810",
    margin: "0 0 6px",
  },
  perspectivesEmptyEn: {
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 14.5,
    color: "#6E5743",
    margin: 0,
    lineHeight: 1.6,
  },
};

export default async function CharacterPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: entry } = await supabase
    .from("entries")
    .select(
      "id, owner, slug, character, role, book_title, author, published_year, image, plot_summary, perspectives, status"
    )
    .eq("id", id)
    .maybeSingle();

  // Fetch the current user so we can show Edit/Delete only to the owner.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isOwner = Boolean(user && entry && user.id === entry.owner);

  if (!entry) {
    return (
      <main style={styles.container}>
        <div style={styles.notFound}>
          <h1 style={{ color: "#2C1810", fontSize: 30, fontFamily: "'Lora', Georgia, serif", display: "inline-flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <LuBookOpen size={26} /> Entry Not Found
          </h1>
          <p style={{ color: "#786250", margin: "16px 0 24px" }}>
            The requested character profile could not be found in the archive catalogue.
          </p>
          <Link href="/" style={styles.backLink}>
            <LuArrowLeft size={14} /> Return to Collection Catalog
          </Link>
        </div>
      </main>
    );
  }

  // Status banner: when an entry is not yet public (status is "pending" or
  // "returned"), tell the owner clearly in Khmer + English before the hero so
  // they don't mistake it for a published archive page. Published entries show
  // no banner. Icons only — no emojis — per the codebase convention.
  const isPending = entry.status === "pending";
  const isReturned = entry.status === "returned";
  const showStatusBanner = isPending || isReturned;
  const bannerVariant = isReturned ? styles.statusBannerReturned : styles.statusBannerPending;
  const BannerIcon = isReturned ? LuUndo2 : LuClock;
  const bannerKh = isReturned
    ? "បានបង្វិលជូនវិញ — ត្រូវការកែសម្រួល"
    : "កំពុងរង់ចាំការត្រួតពិនិត្យ";
  const bannerEn = isReturned
    ? "Returned — needs changes. This entry is not public on the archive yet."
    : "Waiting for review. This entry is not public on the archive yet.";

  // Real perspective count for the section pill + empty-state decision. Use
  // ?? 0 (not || 0) so a real length of 0 is kept, not coerced to the fallback.
  const perspectiveCount = entry.perspectives?.length ?? 0;
  const hasPerspectives = perspectiveCount > 0;

  return (
    <main style={styles.container} className="fade-in-1">
      <Link href="/" style={styles.backLink}>
        <LuArrowLeft size={14} /> Return to Collection Catalog
      </Link>

      {showStatusBanner && (
        <div
          role="status"
          style={{ ...styles.statusBanner, ...bannerVariant }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", flexShrink: 0, marginTop: 2 }}>
            <BannerIcon size={18} />
          </span>
          <div>
            <p style={styles.statusBannerKh}>{bannerKh}</p>
            <p style={styles.statusBannerEn}>{bannerEn}</p>
          </div>
        </div>
      )}

      {/* Hero Character Profile */}
      <section style={styles.heroSection}>
        <div style={styles.imageWrap}>
          {entry.image ? (
            <img src={entry.image} alt={entry.character} style={styles.image} />
          ) : null}
        </div>

        <div style={styles.detailsCol}>
          {entry.role ? (
            <div style={styles.badgeRow}>
              <span style={{ ...styles.roleBadge, display: "inline-flex", alignItems: "center", gap: 6 }}><LuTheater size={12} /> {entry.role}</span>
            </div>
          ) : null}

          <h1 style={styles.name}>{entry.character}</h1>

          <div style={styles.metaGrid}>
            <div style={styles.metaItem}>
              <span style={{ ...styles.metaLabel, display: "inline-flex", alignItems: "center", gap: 6 }}><LuBookOpen size={12} /> Literary Work</span>
              <span style={styles.metaValue}>{entry.book_title}</span>
            </div>
            <div style={styles.metaItem}>
              <span style={{ ...styles.metaLabel, display: "inline-flex", alignItems: "center", gap: 6 }}><LuPenLine size={12} /> Author</span>
              <span style={styles.metaValue}>{entry.author}</span>
            </div>
            <div style={styles.metaItem}>
              <span style={{ ...styles.metaLabel, display: "inline-flex", alignItems: "center", gap: 6 }}><LuCalendar size={12} /> Published</span>
              <span style={styles.metaValue}>{entry.published_year ?? "—"}</span>
            </div>
          </div>

          <div style={styles.plotBox}>
            <div style={{ ...styles.plotLabel, display: "inline-flex", alignItems: "center", gap: 6 }}><LuScroll size={12} /> Character Synopsis & Plot Role</div>
            <p style={styles.plotText}>{entry.plot_summary}</p>

          {isOwner && (
            <EntryActions entryId={entry.id} entryCharacter={entry.character} />
          )}
          </div>
        </div>
      </section>

      {/* Multi-Contributor Perspectives Section */}
      <section className="fade-in-2">
        <h2 style={styles.sectionTitle}>
          <span style={{ display: "inline-flex", alignItems: "center" }}><LuGraduationCap /></span>
          <span>Documented Analyses & Perspectives</span>
          <span style={styles.countPill}>
            {perspectiveCount} {perspectiveCount === 1 ? "Record" : "Records"}
          </span>
        </h2>

        {hasPerspectives ? (
          <div style={styles.perspectivesList}>
            {entry.perspectives.map((item, idx) => (
              <article key={idx} style={styles.perspectiveCard} className="literary-card">
                <div style={styles.perspectiveHeader}>
                  <div style={{ ...styles.contributorName, display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ display: "inline-flex", alignItems: "center" }}><LuPenLine size={14} /></span>
                    <span>{item.contributor}</span>
                  </div>
                  <span style={{ ...styles.placeBadge, display: "inline-flex", alignItems: "center", gap: 6 }}><LuMapPin size={12} /> {item.place}</span>
                </div>
                <p style={styles.perspectiveText}>"{item.analysis}"</p>
              </article>
            ))}
          </div>
        ) : (
          <div style={styles.perspectivesEmpty} className="literary-card">
            <div style={styles.perspectivesEmptyIcon}>
              <LuMessageSquarePlus size={32} />
            </div>
            <p style={styles.perspectivesEmptyKh}>មិនទាន់មានអត្ថាធិប្បាយបន្ថែមនៅឡើយទេ</p>
            <p style={styles.perspectivesEmptyEn}>No documented commentary perspectives yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
