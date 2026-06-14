/** Slug from `/treatments/[slug]` → icon under `public/icons/`. */
const TREATMENT_CATEGORY_ICON_BY_SLUG: Record<string, string> = {
  cosmetology: "/icons/cosmetology.svg",
  "body-treatment": "/icons/body.svg",
  "vitamin-shots": "/icons/vitamin-shots.svg",
  "blood-tests": "/icons/blood-test.svg",
  "aesthetic-injections": "/icons/injectables.svg",
};

function extractTreatmentCategorySlug(href: string): string | null {
  const segments = href.replace(/\/$/, "").split("/").filter(Boolean);
  if (segments[0] !== "treatments" || segments.length < 2) return null;
  return segments[1] ?? null;
}

/** Returns public path for a treatments category icon, or null when none is defined. */
export function getTreatmentCategoryIconSrc(href: string): string | null {
  const slug = extractTreatmentCategorySlug(href);
  if (!slug) return null;
  return TREATMENT_CATEGORY_ICON_BY_SLUG[slug] ?? null;
}
