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

function mapBrandLogosSafe(
  raw: SanityBrandLogoLike[] | null | undefined,
  fallback: AboutBrandLogo[],
): AboutBrandLogo[] {
  if (!raw?.length) return fallback;

  const mapped = raw
    .map((logo, index) => {
      const fb = fallback[index] ?? fallback[0];
      const src = resolveSanityImageUrl(logo.image, fb?.src ?? "/logos/esse.png");
      const alt = logo.alt?.trim() || fb?.alt || "Brand";
      if (!logo.image?.asset?.url && !fb) return null;

      const mapped: AboutBrandLogo = { src, alt };
      if (typeof logo.width === "number") mapped.width = logo.width;
      else if (fb?.width) mapped.width = fb.width;
      if (typeof logo.height === "number") mapped.height = logo.height;
      else if (fb?.height) mapped.height = fb.height;
      return mapped;
    })
    .filter((logo) => logo !== null);

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
