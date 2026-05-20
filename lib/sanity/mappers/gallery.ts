import type { GalleryContent } from "@/lib/types/content";

export interface SanityGalleryLike {
  eyebrow?: string;
  title?: string;
  instagramUrl?: string;
}

export function mapGallerySafe(
  raw: SanityGalleryLike | null | undefined,
  fallback: GalleryContent,
  instagramFallback?: string,
): GalleryContent {
  if (!raw?.title?.trim()) return fallback;

  const instagramUrl =
    raw.instagramUrl?.trim() || instagramFallback?.trim() || fallback.instagramUrl;

  return {
    eyebrow: raw.eyebrow?.trim() || fallback.eyebrow,
    title: raw.title.trim(),
    instagramUrl,
  };
}
