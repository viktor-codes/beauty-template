import type { AppLocale } from "@/i18n/routing";
import {
  readLocalizedValue,
  type LocaleFieldValues,
} from "@/lib/i18n/pick-locale-field";
import type { HeroContent, HeroImage } from "@/lib/types/content";

/** Minimal Sanity image shape from GROQ (untyped until codegen). */
export interface SanityImageLike {
  asset?: { _ref?: string; url?: string } | null;
  alt?: LocaleFieldValues | string | null;
}

const DEFAULT_HERO_IMAGE: HeroImage = {
  src: "/hero.webp",
  alt: "Calm treatment room with natural light and minimal decor",
  width: 920,
  height: 1170,
};

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

export function mapHeroImageSafe(
  raw: SanityImageLike | null | undefined,
  locale: AppLocale,
  fallback: HeroImage = DEFAULT_HERO_IMAGE,
): HeroImage {
  if (!raw) return fallback;

  return {
    src: resolveSanityImageUrl(raw, fallback.src),
    alt: mapLocalizedAlt(raw.alt, locale, fallback.alt),
    width: fallback.width,
    height: fallback.height,
  };
}

type LocalizedFieldInput = LocaleFieldValues | string | undefined;

interface SanityHeroLike {
  eyebrow?: LocalizedFieldInput;
  title?: LocalizedFieldInput;
  subtitle?: LocalizedFieldInput;
  primaryCtaLabel?: LocalizedFieldInput;
  secondaryCtaLabel?: LocalizedFieldInput;
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
  image?: SanityImageLike | null;
}

export function mapHeroSafe(
  raw: SanityHeroLike | null | undefined,
  locale: AppLocale,
  fallback: HeroContent,
): HeroContent {
  if (!raw) return fallback;

  return {
    eyebrow: readLocalizedValue(raw.eyebrow, locale, fallback.eyebrow),
    title: readLocalizedValue(raw.title, locale, fallback.title),
    subtitle: readLocalizedValue(raw.subtitle, locale, fallback.subtitle),
    primaryCta: {
      label: readLocalizedValue(raw.primaryCtaLabel, locale, fallback.primaryCta.label),
      href: raw.primaryCtaHref?.trim() || fallback.primaryCta.href,
    },
    secondaryCta: {
      label: readLocalizedValue(
        raw.secondaryCtaLabel,
        locale,
        fallback.secondaryCta.label,
      ),
      href: raw.secondaryCtaHref?.trim() || fallback.secondaryCta.href,
    },
    image: mapHeroImageSafe(raw.image, locale, fallback.image),
  };
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
