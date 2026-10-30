"use client";

import { useState } from "react";
import { LuTheater, LuClock, LuCheck, LuUndo2 } from "react-icons/lu";
import { createClient } from "../lib/supabase/client.js";

const supabase = createClient();

// The required message shown when an entry could not be updated (the RPC
// returned false, or the call errored). Khmer first, then English.
const FAILED_MESSAGE =
  "មិនអាចធ្វើបច្ចុប្បន្នភាពបានទេ សូមព្យាយាមម្តងទៀត / Failed to update entry. It may have already been reviewed.";

const styles = {
  list: { display: "flex", flexDirection: "column", gap: 16 },
  entryCard: {
    display: "flex", flexDirection: "column", gap: 10,
    backgroundColor: "#FDFBF7", border: "1px solid #DFD3BE",
    borderRadius: 12, padding: "18px 20px",
    boxShadow: "0 4px 14px rgba(60, 35, 20, 0.06)",
  },
  entryTitleRow: { display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" },
  entryCharacter: {
    fontSize: 20, fontWeight: 700, color: "#2C1810",
    fontFamily: "'Hanuman', 'Lora', Georgia, serif", margin: 0,
  },
  entryBook: { fontSize: 14, color: "#7B3F00", fontFamily: "'Lora', Georgia, serif" },
  entryBadge: {
    display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start",
    fontFamily: "'Inter', sans-serif", fontSize: 11.5, fontWeight: 700, color: "#7B3F00",
    backgroundColor: "#F7EFE2", border: "1px solid #E5D3BC",
    padding: "3px 12px", borderRadius: 6, textTransform: "uppercase", letterSpacing: 0.8,
  },
  entrySummary: {
    fontFamily: "'Hanuman', 'Lora', Georgia, serif", fontSize: 14.5, color: "#3D2B1D",
    lineHeight: 1.75, margin: 0, display: "-webkit-box", WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical", overflow: "hidden",
  },
  entryMeta: {
    display: "flex", alignItems: "center", gap: 6, fontFamily: "'Inter', sans-serif",
    fontSize: 12.5, color: "#6E5743",
  },
  actions: { display: "flex", gap: 10, flexWrap: "wrap" },
  publishBtn: {
    display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Inter', sans-serif",
    fontSize: 13.5, fontWeight: 600, color: "#FFFFFF", backgroundColor: "#2F6B3F",
    border: "1px solid #2F6B3F", borderRadius: 8, padding: "8px 14px", cursor: "pointer",
  },
  returnBtn: {
    display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Inter', sans-serif",
    fontSize: 13.5, fontWeight: 600, color: "#9A3412", backgroundColor: "#FBF1EC",
    border: "1px solid #E8C9BC", borderRadius: 8, padding: "8px 14px", cursor: "pointer",
  },
  disabled: { opacity: 0.6, cursor: "not-allowed" },
  error: { marginTop: 4, fontFamily: "'Lora', Georgia, serif", fontSize: 13.5, color: "#8B4513" },
  emptyState: {
    textAlign: "center", padding: "64px 24px", color: "#8B7355",
    fontFamily: "'Lora', Georgia, serif", fontSize: 16,
  },
};

// Intl.DateTimeFormat is built in — no new package. Supabase returns
// created_at as an ISO string; we render a readable date + time.
function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

// Owns the client-side list of pending entries and the publish/return actions.
// We never touch the entries table with .update(); every decision goes through
// the review_entry() RPC. On data === true the entry leaves the list; on false
// or any error it stays and shows the failed-to-update message.
export default function ReviewQueue({ entries: initialEntries }) {
  const [entries, setEntries] = useState(() => initialEntries ?? []);
  const [busyId, setBusyId] = useState(null);
  const [errorById, setErrorById] = useState({});

  async function onDecision(entry, decision) {
    setBusyId(entry.id);
    setErrorById((prev) => {
      if (!(entry.id in prev)) return prev;
      const next = { ...prev };
      delete next[entry.id];
      return next;
    });

    try {
      const { data, error: rpcErr } = await supabase.rpc("review_entry", {
        entry_id: entry.id,
        decision,
      });

      if (rpcErr) {
        console.error("review_entry RPC failed:", rpcErr);
        setErrorById((prev) => ({ ...prev, [entry.id]: FAILED_MESSAGE }));
        return;
      }

      if (data === true) {
        setEntries((prev) => prev.filter((e) => e.id !== entry.id));
        return;
      }

      console.error("review_entry returned non-true for entry:", entry.id, data);
      setErrorById((prev) => ({ ...prev, [entry.id]: FAILED_MESSAGE }));
    } catch (err) {
      console.error("review_entry RPC threw:", err);
      setErrorById((prev) => ({ ...prev, [entry.id]: FAILED_MESSAGE }));
    } finally {
      setBusyId(null);
    }
  }

  if (entries.length === 0) {
    return (
      <div style={styles.emptyState}>
        គ្មានកិច្ចការដែលត្រូវត្រួតពិនិត្យទេ / No pending entries to review.
      </div>
    );
  }

  return (
    <div style={styles.list}>
      {entries.map((entry) => {
        const busy = busyId === entry.id;
        const errMsg = errorById[entry.id];
        return (
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

            <div style={styles.actions}>
              <button
                type="button"
                onClick={() => onDecision(entry, "published")}
                disabled={busy}
                style={{ ...styles.publishBtn, ...(busy ? styles.disabled : {}) }}
              >
                <LuCheck size={14} /> បោះពុម្ពផ្សាយ / Publish
              </button>
              <button
                type="button"
                onClick={() => onDecision(entry, "returned")}
                disabled={busy}
                style={{ ...styles.returnBtn, ...(busy ? styles.disabled : {}) }}
              >
                <LuUndo2 size={14} /> ប្រគល់ត្រឡប់ / Return
              </button>
            </div>

            {errMsg && (
              <p style={styles.error} role="alert">
                {errMsg}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}
