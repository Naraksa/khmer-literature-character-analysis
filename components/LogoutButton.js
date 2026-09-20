"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client.js";

const supabase = createClient();

const styles = {
  button: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13.5,
    fontWeight: 600,
    color: "#6B3A19",
    backgroundColor: "#FDFBF7",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#DFD3BE",
    borderRadius: 8,
    padding: "8px 14px",
    cursor: "pointer",
    lineHeight: 1,
    whiteSpace: "nowrap",
  },
  disabled: {
    color: "#C7B59D",
    backgroundColor: "#F5EFE3",
    borderColor: "#E7DCC8",
    cursor: "not-allowed",
  },
};

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onClick() {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      style={{
        ...styles.button,
        ...(loading ? styles.disabled : {}),
      }}
    >
      {loading ? "Logging out…" : "Log out"}
    </button>
  );
}