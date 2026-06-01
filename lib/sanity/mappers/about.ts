import type { AboutBrandLogo, AboutContent, AboutStat } from "@/lib/types/content";

import { resolveSanityImageUrl, type SanityImageLike } from "@/lib/sanity/mappers/safe";

interface SanityAboutStatLike {
  value?: string;
  label?: string;
}

interface SanityBrandLogoLike {
  alt?: string;
  width?: number;
  height?: number;
  image?: SanityImageLike | null;
}

export interface SanityAboutLike {
  eyebrow?: string;
  title?: string;
  description?: string;
  stats?: SanityAboutStatLike[] | null;
  brandsEyebrow?: string;
  brandLogos?: SanityBrandLogoLike[] | null;
}

function mapStatsSafe(
  raw: SanityAboutStatLike[] | null | undefined,
  fallback: AboutStat[],
): AboutStat[] {
  if (!raw?.length) return fallback;

  const mapped = raw
    .map((stat, index) => {
      const fb = fallback[index];
      const value = stat.value?.trim() || fb?.value || "";
      const label = stat.label?.trim() || fb?.label || "";
      if (!value || !label) return null;
      return { value, label };
    })
    .filter((s): s is AboutStat => s !== null);

  return mapped.length > 0 ? mapped : fallback;
}

function findFallbackLogo(alt: string | undefined, index: number, fallback: AboutBrandLogo[]) {
  const trimmed = alt?.trim();
  if (trimmed) {
    const byAlt = fallback.find((logo) => logo.alt.toLowerCase() === trimmed.toLowerCase());
    if (byAlt) return byAlt;
  }
  return fallback[index] ?? fallback[0];
}

/**
 * CMS brand logos win when at least one item has an uploaded asset.
 * Static `/public/logos/*` is used only when CMS has no usable logos.
 */
function mapBrandLogosSafe(
  raw: SanityBrandLogoLike[] | null | undefined,
  fallback: AboutBrandLogo[],
): AboutBrandLogo[] {
  if (!raw?.length) return fallback;

  const mapped = raw
    .map((logo, index) => {
      const cmsUrl = logo.image?.asset?.url?.trim();
      if (!cmsUrl) return null;

      const fb = findFallbackLogo(logo.alt, index, fallback);
      const src = resolveSanityImageUrl(logo.image, "");
      if (!src) return null;

      const mappedLogo: AboutBrandLogo = {
        id: logo.image?.asset?._ref ?? `brand-logo-${index}`,
        src,
        alt: logo.alt?.trim() || fb?.alt || "Brand partner logo",
      };

      if (typeof logo.width === "number") mappedLogo.width = logo.width;
      else if (fb?.width) mappedLogo.width = fb.width;

      if (typeof logo.height === "number") mappedLogo.height = logo.height;
      else if (fb?.height) mappedLogo.height = fb.height;

      return mappedLogo;
    })
    .filter((logo): logo is AboutBrandLogo => logo !== null);

  return mapped.length > 0 ? mapped : fallback;
}

/** Maps CMS about section; falls back per-field when CMS data is partial. */
export function mapAboutSafe(
  raw: SanityAboutLike | null | undefined,
  fallback: AboutContent,
): AboutContent {
  if (!raw?.title?.trim()) return fallback;

  return {
    eyebrow: raw.eyebrow?.trim() || fallback.eyebrow,
    title: raw.title.trim(),
    description: raw.description?.trim() || fallback.description,
    stats: mapStatsSafe(raw.stats, fallback.stats),
    brandsEyebrow: raw.brandsEyebrow?.trim() || fallback.brandsEyebrow,
    brandLogos: mapBrandLogosSafe(raw.brandLogos, fallback.brandLogos),
  };
}
