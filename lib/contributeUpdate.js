// The update flow for editing an entry: validate fields (done in the
// component), optionally upload a new photo, then UPDATE the row.
// Returns { ok: true } on success or { error: <generic message> } on
// failure. The real error goes to console.error only - never the UI.
// Every update re-asserts owner = user.id so a tampered request cannot
// change ownership, and we .select() after the update to confirm a row
// actually came back (RLS returns nothing if the user is not the owner).

import { trimmedValues } from "./contributeValidation.js";
import { validatePhoto, MIME_TO_EXT } from "./contributeUpload.js";

const GENERIC_UPLOAD = "Couldn't upload the photo. Please try again.";
const NOT_SAVED = "That change wasn't saved";

export async function updateEntry({ supabase, user, entryId, values, photo, existingImage, router }) {
  let imageUrl = existingImage;

  // A new photo is OPTIONAL on edit. If the user picked one, validate and
  // upload it (same OWASP checks as create). If not, keep the existing URL.
  if (photo) {
    const photoError = validatePhoto(photo);
    if (photoError) return { error: photoError };

    const ext = MIME_TO_EXT[photo.type];
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
    try {
      const { error: upErr } = await supabase.storage
        .from("photos")
        .upload(path, photo, { contentType: photo.type, upsert: false });
      if (upErr) {
        console.error("Photo upload failed:", upErr);
        return { error: GENERIC_UPLOAD };
      }
      imageUrl = supabase.storage.from("photos").getPublicUrl(path).data.publicUrl;
    } catch (err) {
      console.error("Photo upload threw:", err);
      return { error: GENERIC_UPLOAD };
    }
  }

  // Build the update payload. Same columns as insert; owner is re-asserted
  // from the session, never trusted from the form.
  const t = trimmedValues(values);
  const row = {
    slug: t.slug,
    character: t.character,
    role: t.role || null,
    book_title: t.book_title,
    author: t.author,
    published_year: t.published_year ? Number(t.published_year) : null,
    plot_summary: t.plot_summary || null,
    image: imageUrl,
    owner: user.id,
  };

  try {
    const { data, error: updateErr } = await supabase
      .from("entries")
      .update(row)
      .eq("id", entryId)
      .select("id")
      .maybeSingle();
    if (updateErr) {
      console.error("Entry update failed:", updateErr);
      return { error: NOT_SAVED };
    }
    // RLS blocks non-owners silently: no error, but no row either.
    if (!data) {
      console.error("Entry update returned no row for id:", entryId);
      return { error: NOT_SAVED };
    }
    router.push(`/characters/${data.id}`);
    router.refresh();
    return { ok: true };
  } catch (err) {
    console.error("Entry update threw:", err);
    return { error: NOT_SAVED };
  }
}