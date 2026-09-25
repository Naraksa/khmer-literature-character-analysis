import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

const styles = {
  link: { textDecoration: "none", color: "inherit", display: "block" },
  card: {
    backgroundColor: "#FDFBF7",
    border: "1px solid #DFD3BE",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 4px 14px rgba(60, 35, 20, 0.06)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  imageWrap: {
    position: "relative",
    width: "100%",
    height: 220,
    backgroundColor: "#EAE0D0",
    overflow: "hidden",
  },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  imgOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "45%",
    background: "linear-gradient(to top, rgba(44, 24, 16, 0.5) 0%, transparent 100%)",
  },
  badgeRow: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameBadge: {
    backgroundColor: "rgba(253, 251, 247, 0.96)",
    border: "1px solid #C8B79E",
    color: "#2C1810",
    fontSize: 16,
    fontWeight: 700,
    padding: "3px 12px",
    borderRadius: 6,
    fontFamily: "'Hanuman', serif",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },
  indexTag: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    color: "#FFFFFF",
    backgroundColor: "rgba(44, 24, 16, 0.85)",
    padding: "3px 8px",
    borderRadius: 4,
  },
  content: {
    padding: "18px 20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    flex: 1,
  },
  metaChips: { display: "flex", flexWrap: "wrap", gap: 7 },
  chip: {
    fontSize: 12.5,
    color: "#4A3626",
    backgroundColor: "#F4ECE0",
    padding: "3px 9px",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#DFD2BF",
    lineHeight: 1.4,
  },
  bookTitle: { color: "#7B3F00", backgroundColor: "#F7EFE2", borderColor: "#E3CEB4", fontWeight: 600 },
  yearChip: { fontFamily: "'Inter', sans-serif", fontSize: 11.5, color: "#6E5743" },
  plot: {
    fontSize: 14.5,
    color: "#3D2B1D",
    lineHeight: 1.75,
    margin: 0,
    fontFamily: "'Hanuman', serif",
  },
  cta: {
    marginTop: "auto",
    paddingTop: 12,
    borderTop: "1px solid #EFE4D2",
    fontSize: 12.5,
    fontWeight: 600,
    color: "#8B4513",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
  },
};

export default function EntryCard({ entry, index }) {
  return (
    <Link href={`/characters/${entry.id}`} style={styles.link}>
      <article style={styles.card} className="literary-card">
        <div style={styles.imageWrap}>
          {entry.image ? (
            <img src={entry.image} alt={entry.character} style={styles.img} className="card-img" />
          ) : null}
          <div style={styles.imgOverlay} />
          <div style={styles.badgeRow}>
            <span style={styles.nameBadge}>{entry.character}</span>
            <span style={styles.indexTag}>#{String(index).padStart(2, "0")}</span>
          </div>
        </div>
        <div style={styles.content}>
          <div style={styles.metaChips}>
            <span style={{ ...styles.chip, ...styles.bookTitle }}>{entry.book_title}</span>
            <span style={styles.chip}> {entry.author}</span>
            <span style={{ ...styles.chip, ...styles.yearChip }}>{entry.published_year}</span>
          </div>
          <p style={styles.plot}>{entry.plot_summary}</p>
          <div style={styles.cta}>
            <span> {entry.perspectives?.length || 1} Commentary Record{(entry.perspectives?.length || 1) > 1 ? "s" : ""}</span>
            <span className="read-cta" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Read Analysis <LuArrowRight size={14} /></span>
          </div>
        </div>
      </article>
    </Link>
  );
}
