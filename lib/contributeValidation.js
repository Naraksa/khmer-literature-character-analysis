// Pure validation helpers for the /contribute form. No React here, so
// the rules can be reasoned about (and re-used) without the component.
// Every text field is trimmed before its rule is checked, and the form
// trims again before building the insert payload.

export const ALLOWED_ROLES = ["Protagonist", "Antagonist", "Supporting", "Minor"];

const MIN_YEAR = 1000;
const MAX_YEAR = 2026;
const SLUG_RE = /^[a-z0-9-]+$/;
const YEAR_RE = /^\d{4}$/;

const len = (s) => s.length;

// validateField returns an error message string, or null when the value
// is acceptable. `raw` is whatever the input currently holds; we trim a
// copy for every check so the user never has to fight whitespace.
export function validateField(name, raw) {
  const value = typeof raw === "string" ? raw.trim() : raw ?? "";

  switch (name) {
    case "slug":
      if (!value) return "Slug is required.";
      if (len(value) < 2 || len(value) > 100)
        return "Slug must be 2–100 characters.";
      if (!SLUG_RE.test(value))
        return "Use lowercase letters, numbers, and hyphens only.";
      return null;

    case "character":
      if (!value) return "Character name is required.";
      if (len(value) < 2 || len(value) > 100)
        return "Character must be 2–100 characters.";
      return null;

    case "role":
      if (!value) return null; // optional
      if (len(value) > 50) return "Role must be 50 characters or fewer.";
      if (!ALLOWED_ROLES.includes(value))
        return "Choose a valid role.";
      return null;

    case "book_title":
      if (!value) return "Book title is required.";
      if (len(value) < 2 || len(value) > 150)
        return "Book title must be 2–150 characters.";
      return null;

    case "author":
      if (!value) return "Author is required.";
      if (len(value) < 2 || len(value) > 100)
        return "Author must be 2–100 characters.";
      return null;

    case "published_year":
      if (!value) return null; // optional
      if (!YEAR_RE.test(value)) return "Enter a 4-digit year.";
      const year = Number(value);
      if (!Number.isInteger(year)) return "Enter a whole year.";
      if (year < MIN_YEAR || year > MAX_YEAR)
        return `Year must be between ${MIN_YEAR} and ${MAX_YEAR}.`;
      return null;

    case "plot_summary":
      if (!value) return null; // optional
      if (len(value) > 2000) return "Summary must be 2000 characters or fewer.";
      return null;

    default:
      return null;
  }
}

// validateAll runs every field and returns a { field: message } map,
// omitting fields that pass. Empty object means the form is valid.
export function validateAll(values) {
  const out = {};
  for (const name of [
    "slug",
    "character",
    "role",
    "book_title",
    "author",
    "published_year",
    "plot_summary",
  ]) {
    const msg = validateField(name, values[name]);
    if (msg) out[name] = msg;
  }
  return out;
}

// trimmedValues returns a new object with every string field trimmed.
// Used right before building the insert payload so stored text is clean.
export function trimmedValues(values) {
  const out = {};
  for (const key of Object.keys(values)) {
    const v = values[key];
    out[key] = typeof v === "string" ? v.trim() : v;
  }
  return out;
}
