import type { AppLocale } from "@/i18n/routing";
import {
  readLocalizedValue,
  type LocaleFieldValues,
} from "@/lib/i18n/pick-locale-field";

/** Minimal Sanity image shape from GROQ (untyped until codegen). */
export interface SanityImageLike {
  asset?: { _ref?: string; url?: string } | null;
  alt?: LocaleFieldValues | string | null;
}

/**
 * Builds a CDN URL when the query projects `asset->url`; otherwise returns fallback path.
 */
export function resolveSanityImageUrl(
  image: SanityImageLike | null | undefined,
  fallbackSrc: string,
): string {
  const url = image?.asset?.url?.trim();
  return url || fallbackSrc;
}

export function mapLocalizedAlt(
  alt: SanityImageLike["alt"],
  locale: AppLocale,
  fallback: string,
): string {
  return readLocalizedValue(
    typeof alt === "string" || (alt && typeof alt === "object") ? alt : undefined,
    locale,
    fallback,
  );
}

export function mapSlugSafe(
  slug: { current?: string } | string | null | undefined,
  fallback: string,
): string {
  if (typeof slug === "string" && slug.trim()) return slug.trim();
  const current = slug && typeof slug === "object" ? slug.current?.trim() : undefined;
  return current || fallback;
}

export function mapMoneySafe(
  raw: { amount?: number; currency?: string } | null | undefined,
): { amount: number; currency: "EUR" } | undefined {
  if (!raw || typeof raw.amount !== "number" || Number.isNaN(raw.amount)) {
    return undefined;
  }
  return { amount: raw.amount, currency: "EUR" };
}
