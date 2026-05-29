import type { PortableTextBlock } from "@portabletext/types";

import type { LegalPageContent, LegalPageSlug } from "@/lib/types/legal";
import { isLegalPageSlug } from "@/lib/types/legal";

export interface SanityLegalSectionLike {
  heading?: string | null;
  body?: PortableTextBlock[] | null;
}

export interface SanityLegalPageLike {
  slug?: string | null;
  title?: string | null;
  metaDescription?: string | null;
  sections?: SanityLegalSectionLike[] | null;
}

function mapSections(
  raw: SanityLegalSectionLike[] | null | undefined,
  fallback: LegalPageContent,
): LegalPageContent["sections"] {
  if (!raw?.length) {
    return fallback.sections;
  }

  const mapped = raw
    .map((section, index) => {
      const heading = section.heading?.trim();
      const body = section.body?.filter(Boolean);
      const fallbackSection = fallback.sections[index];

      if (!heading || !body?.length) {
        return fallbackSection;
      }

      return { heading, body };
    })
    .filter((section): section is NonNullable<typeof section> => Boolean(section));

  return mapped.length > 0 ? mapped : fallback.sections;
}

export function mapLegalPageSafe(
  raw: SanityLegalPageLike | null | undefined,
  fallback: LegalPageContent,
): LegalPageContent {
  if (!raw) {
    return fallback;
  }

  const slug =
    raw.slug && isLegalPageSlug(raw.slug) ? (raw.slug as LegalPageSlug) : fallback.slug;

  return {
    slug,
    title: raw.title?.trim() || fallback.title,
    metaDescription: raw.metaDescription?.trim() || fallback.metaDescription,
    sections: mapSections(raw.sections, fallback),
  };
}
