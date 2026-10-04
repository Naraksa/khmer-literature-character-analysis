// OWASP-aligned client-side file-upload checks for the /contribute form.
// We never trust the filename for the extension: the browser reads the
// file's actual bytes to determine photo.type, and we map that verified
// MIME type to an extension so a renamed .exe cannot slip through.
// Supabase Storage re-validates server-side; this is the client layer.

export const MAX_BYTES = 5_000_000; // 5 MB
export const MIME_TO_EXT = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};
export const ALLOWED_MIME = Object.keys(MIME_TO_EXT);

// validatePhoto returns an error message string, or null when the file
// is acceptable. It inspects file.size and file.type (derived from the
// actual bytes by the browser), never the filename.
export function validatePhoto(file) {
  if (!file) return "Please choose a photo to upload.";
  if (file.size <= 0) return "That photo file looks empty. Please choose another.";
  if (file.size > MAX_BYTES)
    return "That photo is larger than 5 MB. Please use a smaller image.";
  if (!ALLOWED_MIME.includes(file.type))
    return "Please use a JPEG, PNG, WebP, or GIF image.";
  return null;
}