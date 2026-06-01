import {
  mapContentLinkSafe,
  type SanityContentLinkLike,
} from "@/lib/sanity/mappers/chrome";
import { normalizeLegacyServicesHref } from "@/lib/i18n/normalize-href";
import type { ServicesContent, ServicesGoalPreview } from "@/lib/types/content";

interface SanityGoalPreviewLike {
  id?: string;
  title?: string;
  href?: string;
}

export interface SanityLandingServicesLike {
  eyebrow?: string;
  title?: string;
  description?: string;
  goalsHeading?: string;
  goals?: SanityGoalPreviewLike[] | null;
  cta?: SanityContentLinkLike | null;
}

function mapGoalPreviewSafe(
  raw: SanityGoalPreviewLike,
  fallback?: ServicesGoalPreview,
): ServicesGoalPreview | null {
  const id = raw.id?.trim();
  const title = raw.title?.trim();
  const href = raw.href?.trim();
  if (!id || !title || !href) return null;

  return { id, title, href: normalizeLegacyServicesHref(href) };
}

/** Maps landing services copy from CMS. Category cards come from the services catalog. */
export function mapLandingServicesSafe(
  raw: SanityLandingServicesLike | null | undefined,
  fallback: ServicesContent,
): ServicesContent {
  if (!raw?.title?.trim()) {
    return {
      eyebrow: fallback.eyebrow,
      title: fallback.title,
      description: fallback.description,
      categories: fallback.categories,
      goalsHeading: fallback.goalsHeading,
      goals: fallback.goals,
      cta: fallback.cta,
    };
  }

  const goals = (raw.goals ?? [])
    .map((item, index) => mapGoalPreviewSafe(item, fallback.goals[index]))
    .filter((item): item is ServicesGoalPreview => item !== null);

  return {
    eyebrow: raw.eyebrow?.trim() || fallback.eyebrow,
    title: raw.title.trim(),
    description: raw.description?.trim() || fallback.description,
    categories: fallback.categories,
    goalsHeading: raw.goalsHeading?.trim() || fallback.goalsHeading,
    goals: goals.length > 0 ? goals : fallback.goals,
    cta: mapContentLinkSafe(raw.cta, fallback.cta),
  };
}
