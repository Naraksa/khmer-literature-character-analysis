"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { createClient } from "../lib/supabase/client.js";

const supabase = createClient();

const styles = {
  row: { display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" },
  editLink: {
    display: "inline-flex", alignItems: "center", gap: 6,
    fontFamily: "'Inter', sans-serif", fontSize: 13.5, fontWeight: 600,
    color: "#6B3A19", backgroundColor: "#F4ECE0", border: "1px solid #DFD2BF",
    borderRadius: 8, padding: "8px 14px", textDecoration: "none", cursor: "pointer",
  },
  deleteBtn: {
    display: "inline-flex", alignItems: "center", gap: 6,
    fontFamily: "'Inter', sans-serif", fontSize: 13.5, fontWeight: 600,
    color: "#FFFFFF", backgroundColor: "#9A3412", border: "1px solid #9A3412",
    borderRadius: 8, padding: "8px 14px", cursor: "pointer",
  },
  disabled: { opacity: 0.6, cursor: "not-allowed" },
  confirmBox: {
    marginTop: 12, padding: "14px 16px", backgroundColor: "#FBF3EE",
    border: "1px solid #E5C9BD", borderRadius: 8, maxWidth: 460,
  },
  confirmText: {
    fontFamily: "'Lora', Georgia, serif", fontSize: 14.5, color: "#5C4636",
    margin: "0 0 12px", lineHeight: 1.5,
  },
  confirmBtns: { display: "flex", gap: 10 },
  cancelBtn: {
    fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
    color: "#6E5743", backgroundColor: "#FDFBF7", border: "1px solid #DFD3BE",
    borderRadius: 8, padding: "7px 14px", cursor: "pointer",
  },
  error: {
    marginTop: 10, fontFamily: "'Lora', Georgia, serif", fontSize: 13.5, color: "#8B4513",
  },
};

export default function EntryActions({ entryId, entryCharacter }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function onDelete() {
    setBusy(true);
    setError(null);
    try {
      const { data, error: delErr } = await supabase
        .from("entries")
        .delete()
        .eq("id", entryId)
        .select("id")
        .maybeSingle();
      if (delErr) {
        console.error("Entry delete failed:", delErr);
        setError("That change wasn't saved");
        setBusy(false);
        return;
      }
      if (!data) {
        console.error("Entry delete returned no row for id:", entryId);
        setError("That change wasn't saved");
        setBusy(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Entry delete threw:", err);
      setError("That change wasn't saved");
      setBusy(false);
    }
  }

  return (
    <div>
      <div style={styles.row}>
        <Link href={`/characters/${entryId}/edit`} style={styles.editLink}>
          <LuPencil size={14} /> Edit
        </Link>
        <button type="button" onClick={() => setConfirming(true)}
          style={{ ...styles.deleteBtn, ...(confirming ? styles.disabled : {}) }}
          disabled={confirming || busy}>
          <LuTrash2 size={14} /> Delete
        </button>
      </div>
      {confirming && (
        <div style={styles.confirmBox}>
          <p style={styles.confirmText}>
            Delete "{entryCharacter}"? This cannot be undone.
          </p>
          <div style={styles.confirmBtns}>
            <button type="button" onClick={() => setConfirming(false)}
              style={styles.cancelBtn} disabled={busy}>Cancel</button>
            <button type="button" onClick={onDelete}
              style={{ ...styles.deleteBtn, ...(busy ? styles.disabled : {}) }}
              disabled={busy}>
              {busy ? "Deleting…" : "Yes, delete"}
            </button>
          </div>
        </div>
      )}
      {error && <p style={styles.error} role="alert">{error}</p>}
    </div>
  );
}