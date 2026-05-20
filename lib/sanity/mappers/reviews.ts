import type { ReviewItem, ReviewsContent } from "@/lib/types/content";

interface SanityReviewItemLike {
  quote?: string;
  authorName?: string;
  authorRole?: string;
}

export interface SanityReviewsLike {
  eyebrow?: string;
  title?: string;
  items?: SanityReviewItemLike[] | null;
}

function mapReviewItemSafe(
  raw: SanityReviewItemLike,
  fallback?: ReviewItem,
): ReviewItem | null {
  const quote = raw.quote?.trim();
  const authorName = raw.authorName?.trim();
  if (!quote || !authorName) return null;

  return {
    quote,
    authorName,
    authorRole: raw.authorRole?.trim() || fallback?.authorRole,
  };
}

export function mapReviewsSafe(
  raw: SanityReviewsLike | null | undefined,
  fallback: ReviewsContent,
): ReviewsContent {
  if (!raw?.title?.trim()) return fallback;

  const items = (raw.items ?? [])
    .map((item, index) => mapReviewItemSafe(item, fallback.items[index]))
    .filter((item): item is ReviewItem => item !== null);

  return {
    eyebrow: raw.eyebrow?.trim() || fallback.eyebrow,
    title: raw.title.trim(),
    items: items.length > 0 ? items : fallback.items,
  };
}
