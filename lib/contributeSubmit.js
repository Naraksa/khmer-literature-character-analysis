// The submit flow for the /contribute form: validate the photo, upload it
// to the "photos" bucket, insert the row, then return { ok: true } so the
// component can show a thank-you message. Kept out of the component so the
// component stays small and the network logic can be read in isolation.
// Returns { ok: true } on success or { error: <generic message> } on
// failure. The real error is sent to console.error only - never the UI.
//
// Note: status is intentionally NOT set here. The database default sets new
// rows to "pending", and the contributor should not be able to override it.

import { trimmedValues } from "./contributeValidation.js";
import { validatePhoto, MIME_TO_EXT } from "./contributeUpload.js";

const GENERIC_UPLOAD = "Couldn't upload the photo. Please try again.";
const GENERIC_INSERT = "Couldn't save your entry. Please try again.";

export async function submitEntry({ supabase, user, values, photo }) {
  // --- OWASP client-side file-upload checks ---
  const photoError = validatePhoto(photo);
  if (photoError) return { error: photoError };

  // owner ALWAYS comes from the session user, never the form.
  const ext = MIME_TO_EXT[photo.type];
  const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

  // --- Upload to the "photos" bucket ---
  let publicUrl;
  try {
    const { error: upErr } = await supabase.storage
      .from("photos")
      .upload(path, photo, { contentType: photo.type, upsert: false });
    if (upErr) {
      console.error("Photo upload failed:", upErr);
      return { error: GENERIC_UPLOAD };
    }
    publicUrl = supabase.storage.from("photos").getPublicUrl(path).data.publicUrl;
  } catch (err) {
    console.error("Photo upload threw:", err);
    return { error: GENERIC_UPLOAD };
  }

  // --- Insert the row. Only the listed columns (plus image + owner). ---
  const t = trimmedValues(values);
  const row = {
    slug: t.slug,
    character: t.character,
    role: t.role || null,
    book_title: t.book_title,
    author: t.author,
    published_year: t.published_year ? Number(t.published_year) : null,
    plot_summary: t.plot_summary || null,
    image: publicUrl,
    owner: user.id,
  };

  try {
    const { error: insertErr } = await supabase
      .from("entries")
      .insert(row)
      .select("id")
      .single();
    if (insertErr) {
      console.error("Entry insert failed:", insertErr);
      return { error: GENERIC_INSERT };
    }
    // Success - the component shows a thank-you message instead of
    // navigating away. The new row is "pending" (DB default), so it is
    // not public yet; the contributor can track it on /my-entries.
    return { ok: true };
  } catch (err) {
    console.error("Entry insert threw:", err);
    return { error: GENERIC_INSERT };
  }
}