"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LuUpload } from "react-icons/lu";
import ContributeField from "./ContributeField.js";
import styles from "./contributeFormStyles.js";
import { createClient } from "../lib/supabase/client.js";
import { ALLOWED_ROLES, validateField, validateAll } from "../lib/contributeValidation.js";
import { submitEntry } from "../lib/contributeSubmit.js";
import { updateEntry } from "../lib/contributeUpdate.js";

const supabase = createClient();

// Field config drives the rendered text inputs so the JSX stays compact.
// type "text" uses <input>; type "area" uses <textarea>; inputMode is set
// only where it helps mobile keyboards.
const FIELDS = [
  { name: "slug", label: "Slug", type: "text", placeholder: "e.g. tum-teav-1952" },
  { name: "character", label: "Character", type: "text" },
  { name: "book_title", label: "Book title", type: "text" },
  { name: "author", label: "Author", type: "text" },
  { name: "published_year", label: "Published year (optional)", type: "text", inputMode: "numeric", placeholder: "e.g. 1952" },
  { name: "plot_summary", label: "Plot summary (optional)", type: "area" },
];

const EMPTY = { slug: "", character: "", role: "", book_title: "", author: "", published_year: "", plot_summary: "" };

export default function ContributeForm({ user, entry }) {
  const router = useRouter();
  const editing = Boolean(entry);
  const [values, setValues] = useState(() => {
    if (!entry) return EMPTY;
    const { id, image, ...rest } = entry;
    return { ...EMPTY, ...rest };
  });
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function update(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  }
  const onBlur = (name) => setErrors((e) => ({ ...e, [name]: validateField(name, values[name]) ?? undefined }));

  async function onSubmit(e) {
    e.preventDefault();
    setFormError(null);
    const allErrors = validateAll(values);
    if (Object.keys(allErrors).length > 0) { setErrors(allErrors); return; }
    // Create requires a photo; edit does not (keep the existing image).
    if (!editing && !photo) { setFormError("Please choose a photo to upload."); return; }
    setBusy(true);
    const result = editing
      ? await updateEntry({ supabase, user, entryId: entry.id, values, photo, existingImage: entry.image, router })
      : await submitEntry({ supabase, user, values, photo });
    if (result.error) { setFormError(result.error); setBusy(false); }
    else if (!editing) { setSubmitted(true); }
  }

  if (!editing && submitted) {
    return (
      <div style={styles.card}>
        <p style={styles.kicker}>Khmer Living Archive</p>
        <h1 style={styles.thanksTitle}>Thank you!</h1>
        <p style={styles.thanksMessage}>
          Thank you! Your entry has been submitted and is waiting for reviewer approval before appearing in the public archive. You can check its status anytime on your My Entries page. / សូមអរគុណ! ទិន្នន័យរបស់អ្នកត្រូវបានបញ្ជូន ហើយកំពុងរង់ចាំការត្រួតពិនិត្យ មុនពេលបង្ហាញជាសាធារណៈ។
        </p>
        <div style={styles.thanksActions}>
          <Link href="/my-entries" style={styles.thanksLink}>View my entries</Link>
          <Link href="/" style={styles.thanksLinkSecondary}>Back to archive</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <p style={styles.kicker}>Khmer Living Archive</p>
      <h1 style={styles.title}>{editing ? "Edit entry" : "Contribute an entry"}</h1>
      {formError && <p style={styles.error} role="alert">{formError}</p>}
      <form onSubmit={onSubmit} noValidate>
        {FIELDS.map((f) => (
          <ContributeField key={f.name} id={f.name} label={f.label} error={errors[f.name]}>
            {f.type === "area" ? (
              <textarea id={f.name} value={values[f.name]} style={styles.textarea}
                onChange={(e) => update(f.name, e.target.value)}
                onBlur={() => onBlur(f.name)} />
            ) : (
              <input id={f.name} type={f.type} value={values[f.name]} style={styles.input}
                inputMode={f.inputMode} placeholder={f.placeholder} autoComplete="off"
                onChange={(e) => update(f.name, e.target.value)}
                onBlur={() => onBlur(f.name)} />
            )}
          </ContributeField>
        ))}
        <ContributeField id="role" label="Role (optional)" error={errors.role}>
          <select id="role" value={values.role} style={styles.input}
            onChange={(e) => update("role", e.target.value)} onBlur={() => onBlur("role")}>
            <option value="">-- Select a role --</option>
            {ALLOWED_ROLES.map((r) => (<option key={r} value={r}>{r}</option>))}
          </select>
        </ContributeField>
        <ContributeField id="photo" label={editing ? "Photo (optional)" : "Photo (required)"} error={null}>
          <input id="photo" type="file" accept="image/*" style={styles.input}
            onChange={(e) => setPhoto(e.target.files[0] ?? null)} />
          <p style={styles.fileHint}>
            {editing ? "Leave empty to keep the current photo. " : ""}JPEG, PNG, WebP, or GIF. 5 MB max.
          </p>
        </ContributeField>
        <button type="submit" disabled={busy}
          style={{ ...styles.submit, ...(busy ? styles.submitDisabled : {}) }}>
          <LuUpload size={15} /> {busy ? "Saving…" : editing ? "Save changes" : "Publish entry"}
        </button>
      </form>
    </div>
  );
}