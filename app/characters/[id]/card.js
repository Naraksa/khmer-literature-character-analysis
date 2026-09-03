import Link from "next/link";
import entries from "../../../data/entries.js";

export function generateStaticParams() {
  return entries.map((entry) => ({
    id: entry.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const entry = entries.find((e) => e.id === id);
  if (!entry) return { title: "Entry Not Found — Khmer Living Archive" };
  return {
    title: `${entry.character} (${entry.bookTitle}) — Khmer Literature Analysis`,
    description: entry.plotSummary,
  };
}

const styles = {
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "40px 24px 80px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "#9A3412",
    textDecoration: "none",
    fontSize: 13,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    marginBottom: 32,
    padding: "7px 14px",
    borderRadius: 6,
    backgroundColor: "#FFF7ED",
    border: "1px solid #FFEDD5",
  },
  heroSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 36,
    backgroundColor: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: 12,
    overflow: "hidden",
    padding: 32,
    marginBottom: 44,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },
  imageWrap: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    height: 380,
    backgroundColor: "#F1F5F9",
    border: "1px solid #E2E8F0",
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
    color: "#9A3412",
    backgroundColor: "#FEF2F2",
    border: "1px solid #FEE2E2",
    padding: "3px 10px",
    borderRadius: 4,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  name: {
    fontSize: 40,
    fontWeight: 700,
    color: "#0F172A",
    margin: 0,
    lineHeight: 1.2,
    fontFamily: "'Hanuman', serif",
  },
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 12,
    padding: "16px 0",
    borderTop: "1px solid #F1F5F9",
    borderBottom: "1px solid #F1F5F9",
  },
  metaItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  metaLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    color: "#64748B",
    textTransform: "uppercase",
    margin: 0,
    fontWeight: 700,
    letterSpacing: 1,
  },
  metaValue: {
    fontSize: 14.5,
    color: "#0F172A",
    fontWeight: 600,
    margin: 0,
  },
  plotBox: {
    backgroundColor: "#F8FAFC",
    borderLeft: "3px solid #9A3412",
    padding: "14px 18px",
    borderRadius: "0 6px 6px 0",
  },
  plotLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    color: "#9A3412",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  plotText: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 1.75,
    margin: 0,
    fontFamily: "'Hanuman', serif",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#0F172A",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontFamily: "'Lora', Georgia, serif",
  },
  countPill: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    color: "#475569",
    backgroundColor: "#E2E8F0",
    padding: "3px 10px",
    borderRadius: 4,
    fontWeight: 600,
  },
  perspectivesList: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  perspectiveCard: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: 10,
    padding: "24px 28px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  },
  perspectiveHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    paddingBottom: 12,
    borderBottom: "1px solid #F1F5F9",
    flexWrap: "wrap",
    gap: 8,
  },
  contributorName: {
    fontSize: 15,
    fontWeight: 700,
    color: "#0F172A",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "'Inter', sans-serif",
  },
  placeBadge: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    color: "#475569",
    backgroundColor: "#F1F5F9",
    border: "1px solid #E2E8F0",
    padding: "3px 9px",
    borderRadius: 4,
  },
  perspectiveText: {
    fontSize: 16.5,
    color: "#1E293B",
    lineHeight: 1.85,
    margin: 0,
    fontFamily: "'Hanuman', serif",
  },
  notFound: {
    textAlign: "center",
    padding: "80px 24px",
  },
};

export default async function CharacterPage({ params }) {
  const { id } = await params;
  const entry = entries.find((e) => e.id === id);

  if (!entry) {
    return (
      <main style={styles.container}>
        <div style={styles.notFound}>
          <h1 style={{ color: "#0F172A", fontSize: 28, fontFamily: "'Lora', Georgia, serif" }}>
            Entry Not Found
          </h1>
          <p style={{ color: "#64748B", margin: "16px 0 24px" }}>
            The requested character profile could not be found in the archive catalogue.
          </p>
          <Link href="/" style={styles.backLink}>
            ← Return to Collection Catalog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.container}>
      <Link href="/" style={styles.backLink}>
        ← Return to Collection Catalog
      </Link>

      {/* Hero Character Profile */}
      <section style={styles.heroSection}>
        <div style={styles.imageWrap}>
          <img src={entry.image} alt={entry.character} style={styles.image} />
        </div>

        <div style={styles.detailsCol}>
          <div style={styles.badgeRow}>
            <span style={styles.roleBadge}>{entry.role}</span>
          </div>

          <h1 style={styles.name}>{entry.character}</h1>

          <div style={styles.metaGrid}>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Literary Work</span>
              <span style={styles.metaValue}>{entry.bookTitle}</span>
            </div>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Author</span>
              <span style={styles.metaValue}>{entry.author}</span>
            </div>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Published</span>
              <span style={styles.metaValue}>{entry.publishedYear}</span>
            </div>
          </div>

          <div style={styles.plotBox}>
            <div style={styles.plotLabel}>Character Synopsis & Plot Role</div>
            <p style={styles.plotText}>{entry.plotSummary}</p>
          </div>
        </div>
      </section>

      {/* Multi-Contributor Perspectives Section */}
      <section>
        <h2 style={styles.sectionTitle}>
          Documented Analyses & Perspectives
          <span style={styles.countPill}>
            {entry.perspectives?.length || 0} Record
            {(entry.perspectives?.length || 0) > 1 ? "s" : ""}
          </span>
        </h2>

        <div style={styles.perspectivesList}>
          {entry.perspectives?.map((item, idx) => (
            <article key={idx} style={styles.perspectiveCard}>
              <div style={styles.perspectiveHeader}>
                <div style={styles.contributorName}>
                  <span>👤</span>
                  <span>{item.contributor}</span>
                </div>
                <span style={styles.placeBadge}>{item.place}</span>
              </div>
              <p style={styles.perspectiveText}>"{item.analysis}"</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
