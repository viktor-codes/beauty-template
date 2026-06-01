import { heroImage } from "@/lib/content/shared";
import { normalizeLegacyServicesHref } from "@/lib/i18n/normalize-href";
import type { HeroContent } from "@/lib/types/content";

/** Fixed hero visual — not exposed in Sanity (see `landingHeroSection` schema). */
const LANDING_HERO_IMAGE = heroImage;

export interface SanityHeroLike {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
}

export function mapHeroSafe(
  raw: SanityHeroLike | null | undefined,
  fallback: HeroContent,
): HeroContent {
  if (!raw?.title?.trim()) return fallback;

  return {
    eyebrow: raw.eyebrow?.trim() || fallback.eyebrow,
    title: raw.title.trim(),
    subtitle: raw.subtitle?.trim() || fallback.subtitle,
    primaryCta: {
      label: raw.primaryCtaLabel?.trim() || fallback.primaryCta.label,
      href: normalizeLegacyServicesHref(
        raw.primaryCtaHref?.trim() || fallback.primaryCta.href,
      ),
    },
    secondaryCta: {
      label: raw.secondaryCtaLabel?.trim() || fallback.secondaryCta.label,
      href: normalizeLegacyServicesHref(
        raw.secondaryCtaHref?.trim() || fallback.secondaryCta.href,
      ),
    },
    image: {
      ...LANDING_HERO_IMAGE,
      alt: fallback.image.alt,
    },
  };
}
