"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { createClient } from "../lib/supabase/client.js";

const supabase = createClient();

const styles = {
  button: {
    fontFamily: "'Hanuman', 'Inter', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: "#7A3516",
    backgroundColor: "#FAF6EE",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#DAC8B1",
    borderRadius: 7,
    padding: "6px 12px",
    cursor: "pointer",
    lineHeight: 1.4,
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    transition: "all 0.2s ease",
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
      aria-label="Log out of account"
    >
      <LuLogOut size={13} />
      <span>{loading ? "ចាកចេញ…" : "ចាកចេញ / Log out"}</span>
    </button>
  );
}
