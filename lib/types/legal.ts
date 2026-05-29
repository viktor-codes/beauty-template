import type { PortableTextBlock } from "@portabletext/types";

export const LEGAL_PAGE_SLUGS = ["privacy", "terms"] as const;

export type LegalPageSlug = (typeof LEGAL_PAGE_SLUGS)[number];

export function isLegalPageSlug(value: string): value is LegalPageSlug {
  return (LEGAL_PAGE_SLUGS as readonly string[]).includes(value);
}

export interface LegalSectionContent {
  heading: string;
  body: PortableTextBlock[];
}

export interface LegalPageContent {
  slug: LegalPageSlug;
  title: string;
  metaDescription: string;
  sections: LegalSectionContent[];
}
