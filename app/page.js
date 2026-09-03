"use client";

import { useState } from "react";
import collection from "../collection.config.js";
import EntryCard from "../components/EntryCard.js";
import entries from "../data/entries.js";

const styles = {
  main: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  /* ── Literary Hero Banner ── */
  heroSection: {
    width: "100%",
    backgroundColor: "#EFE8DA",
    borderBottom: "2px solid #D8CBB6",
    boxShadow: "0 4px 20px rgba(60, 35, 20, 0.04)",
  },
  heroInner: {
    maxWidth: 1240,
    margin: "0 auto",
    padding: "48px 24px 56px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    borderBottom: "1px solid #DDCFBC",
    marginBottom: 36,
    flexWrap: "wrap",
    gap: 12,
  },
  brandPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 13,
    fontWeight: 600,
    color: "#6B3A19",
    letterSpacing: 0.5,
    backgroundColor: "#FAF6EE",
    border: "1px solid #D5C2A8",
    borderRadius: 8,
    padding: "6px 14px",
    boxShadow: "0 2px 5px rgba(107, 58, 25, 0.06)",
  },
  bookIcon: {
    fontSize: 16,
  },
  capstoneTag: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12.5,
    color: "#7E6A56",
    fontWeight: 500,
  },
  heroContent: {
    maxWidth: 860,
    marginBottom: 40,
  },
  kicker: {
    fontFamily: "'Inter', sans-serif",
    color: "#8B4513",
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    margin: "0 0 14px",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 42,
    fontWeight: 700,
    color: "#2C1810",
    margin: "0 0 16px",
    lineHeight: 1.25,
    letterSpacing: "-0.5px",
    fontFamily: "'Hanuman', 'Lora', Georgia, serif",
  },
  description: {
    fontSize: 17.5,
    color: "#5C4636",
    lineHeight: 1.85,
    margin: 0,
    fontFamily: "'Lora', Georgia, serif",
  },
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
  },
  metaCard: {
    backgroundColor: "#FBF8F1",
    border: "1px solid #DACBB4",
    borderRadius: 10,
    padding: "18px 22px",
    boxShadow: "0 2px 8px rgba(60, 35, 20, 0.04)",
  },
  metaLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    color: "#8C715A",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    margin: "0 0 6px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  metaValue: {
    fontSize: 15,
    color: "#2C1810",
    fontWeight: 600,
    margin: 0,
    lineHeight: 1.5,
  },

  /* ── Content Section ── */
  contentSection: {
    flex: 1,
    width: "100%",
    maxWidth: 1240,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
  sectionBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottom: "2px solid #E0D4C1",
    marginBottom: 36,
    flexWrap: "wrap",
    gap: 12,
  },
  sectionTitleWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#2C1810",
    margin: 0,
    fontFamily: "'Lora', Georgia, serif",
  },
  badge: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    color: "#6B3A19",
    backgroundColor: "#EFE6D6",
    border: "1px solid #D5C2A8",
    borderRadius: 6,
    padding: "4px 12px",
    fontWeight: 600,
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: 28,
  },

  /* ── Search ── */
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FDFBF7",
    border: "1px solid #DFD3BE",
    borderRadius: 10,
    padding: "10px 16px",
    marginBottom: 28,
    boxShadow: "0 2px 8px rgba(60, 35, 20, 0.04)",
  },
  searchIcon: { fontSize: 18, color: "#8B4513", lineHeight: 1 },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#2C1810",
    fontFamily: "'Lora', Georgia, serif",
    padding: "4px 0",
  },
  searchHint: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11.5,
    color: "#A08B6F",
    whiteSpace: "nowrap",
  },

  /* ── Literary Footer ── */
  footer: {
    borderTop: "2px solid #D8CBB6",
    backgroundColor: "#EFE8DA",
    padding: "36px 24px",
  },
  footerInner: {
    maxWidth: 1240,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    fontSize: 13.5,
    color: "#6D5846",
    fontFamily: "'Lora', Georgia, serif",
  },
};

export default function Home() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = q
    ? entries.filter((entry) => {
        const haystack = [
          entry.character,
          entry.bookTitle,
          entry.author,
          entry.plotSummary,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
    : entries;

  return (
    <div style={styles.main}>
      {/* Literary Hero Banner */}
      <section style={styles.heroSection} className="fade-in-1">
        <div style={styles.heroInner}>
          <header style={styles.topBar}>
            <div style={styles.brandPill}>
              <span className="floating-book" style={styles.bookIcon}>📖</span>
              <span>Khmer Living Archive</span>
              <span>·</span>
              <span>Literature Monograph</span>
            </div>
            <span style={styles.capstoneTag}>ICT 340 · Capstone · Fall 2026</span>
          </header>

          <div style={styles.heroContent}>
            <p style={styles.kicker}>
              <span>📚</span>
              <span>Literary Character Analysis & Perspectives</span>
            </p>
            <h1 style={styles.title}>{collection.name}</h1>
            <p style={styles.description}>{collection.description}</p>
          </div>

          <div style={styles.metaGrid}>
            <div style={styles.metaCard}>
              <p style={styles.metaLabel}>
                <span>✍️</span>
                <span>Curator</span>
              </p>
              <p style={styles.metaValue}>{collection.curator}</p>
            </div>
            <div style={styles.metaCard}>
              <p style={styles.metaLabel}>
                <span>🏛️</span>
                <span>Primary Sources</span>
              </p>
              <p style={styles.metaValue}>{collection.source}</p>
            </div>
            <div style={styles.metaCard}>
              <p style={styles.metaLabel}>
                <span>📜</span>
                <span>Collection Scope</span>
              </p>
              <p style={styles.metaValue}>{entries.length} Classical Figures</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Entries Grid */}
      <main style={styles.contentSection} className="fade-in-2">
        <div style={styles.sectionBar}>
          <div style={styles.sectionTitleWrap}>
            <span style={{ fontSize: 20 }}>📚</span>
            <h2 style={styles.sectionTitle}>Archived Literary Figures & Analyses</h2>
          </div>
          <span style={styles.badge}>
            {filtered.length} of {entries.length} Figures
          </span>
        </div>

        {/* Search */}
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search archived figures…"
            aria-label="Search archived figures"
            style={styles.searchInput}
          />
          {q && <span style={styles.searchHint}>{filtered.length} match{filtered.length === 1 ? "" : "es"}</span>}
        </div>

        <div style={styles.cardsGrid}>
          {filtered.map((entry, index) => (
            <EntryCard key={entry.id} entry={entry} index={index + 1} />
          ))}
        </div>

        {/* TODO: Write the no-results empty-state copy here.
            This is a placeholder for the student to author. */}
        {filtered.length === 0 && (
          <p style={{ textAlign: "center", padding: "48px 24px", color: "#8B7355", fontFamily: "'Lora', Georgia, serif", fontSize: 16 }}>
            No matching figures.
          </p>
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div>
            📖 American University of Phnom Penh · ICT 340: Vibe Coding
          </div>
          <div>
            Preserving classical Khmer literature through scholarly and youth perspectives.
          </div>
        </div>
      </footer>
    </div>
  );
}
