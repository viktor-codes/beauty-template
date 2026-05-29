import {
  mapContentLinkSafe,
  type SanityContentLinkLike,
} from "@/lib/sanity/mappers/chrome";
import type {
  ServicesCategoryPreview,
  ServicesContent,
  ServicesGoalPreview,
} from "@/lib/types/content";

interface SanityCategoryPreviewLike {
  id?: string;
  title?: string;
  description?: string;
  href?: string;
}

interface SanityGoalPreviewLike {
  id?: string;
  title?: string;
  href?: string;
}

export interface SanityLandingServicesLike {
  eyebrow?: string;
  title?: string;
  description?: string;
  categories?: SanityCategoryPreviewLike[] | null;
  goals?: SanityGoalPreviewLike[] | null;
  cta?: SanityContentLinkLike | null;
}

function mapCategoryPreviewSafe(
  raw: SanityCategoryPreviewLike,
  fallback?: ServicesCategoryPreview,
): ServicesCategoryPreview | null {
  const id = raw.id?.trim();
  const title = raw.title?.trim();
  const href = raw.href?.trim();
  if (!id || !title || !href) return null;

  return {
    id,
    title,
    description: raw.description?.trim() || fallback?.description || "",
    href,
  };
}

function mapGoalPreviewSafe(
  raw: SanityGoalPreviewLike,
  fallback?: ServicesGoalPreview,
): ServicesGoalPreview | null {
  const id = raw.id?.trim();
  const title = raw.title?.trim();
  const href = raw.href?.trim();
  if (!id || !title || !href) return null;

  return { id, title, href };
}

export function mapLandingServicesSafe(
  raw: SanityLandingServicesLike | null | undefined,
  fallback: ServicesContent,
): ServicesContent {
  if (!raw?.title?.trim()) return fallback;

  const categories = (raw.categories ?? [])
    .map((item, index) => mapCategoryPreviewSafe(item, fallback.categories[index]))
    .filter((item): item is ServicesCategoryPreview => item !== null);

  const goals = (raw.goals ?? [])
    .map((item, index) => mapGoalPreviewSafe(item, fallback.goals[index]))
    .filter((item): item is ServicesGoalPreview => item !== null);

  return {
    eyebrow: raw.eyebrow?.trim() || fallback.eyebrow,
    title: raw.title.trim(),
    description: raw.description?.trim() || fallback.description,
    categories: categories.length > 0 ? categories : fallback.categories,
    goals: goals.length > 0 ? goals : fallback.goals,
    cta: mapContentLinkSafe(raw.cta, fallback.cta),
  };
}
