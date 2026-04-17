/**
 * Central brand + SEO strings. Import from layouts and `generateMetadata` only.
 */

export const SITE_BRAND = "Skinbar";
export const SITE_PRACTITIONER = "Inna Chernovol";
export const SITE_NAME_FULL = `${SITE_BRAND} · ${SITE_PRACTITIONER}`;

/** Used when a route sets `metadata.title` as a string (merged with root `title.template`). */
export const SITE_TITLE_TEMPLATE = `%s · ${SITE_BRAND} · ${SITE_PRACTITIONER}`;

/** Homepage and fallback OG/Twitter title (use `title.absolute` on `/` to skip the template). */
export const SITE_DEFAULT_TITLE = `${SITE_BRAND} by ${SITE_PRACTITIONER} | Aesthetic cosmetology`;

export const SITE_DEFAULT_DESCRIPTION =
  "I am Inna Chernovol — Skinbar is my practice for injectables, laser, peels, and skin-first protocols. Book a consultation for evidence-based planning, natural-looking results, and direct one-on-one care.";

export const SITE_SERVICES_HUB_DESCRIPTION =
  "Explore Skinbar treatment categories with Inna Chernovol — injectables, laser hair removal, peels, and device-based aesthetics with clear planning and safety-first protocols.";

export const SITE_KEYWORDS = [
  "Skinbar",
  "Inna Chernovol",
  "aesthetic nurse",
  "medical aesthetics",
  "cosmetology",
  "injectables",
  "dermal fillers",
  "laser hair removal",
  "skin treatments",
  "aesthetic consultation",
] as const;

export function resolveMetadataBase(): URL | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return undefined;
  try {
    return new URL(raw);
  } catch {
    return undefined;
  }
}
