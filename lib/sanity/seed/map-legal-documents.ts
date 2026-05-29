import type { AppLocale } from "@/i18n/routing";
import { getStaticLegalPage } from "@/lib/content/legal/en-pages";
import type { LegalPageSlug } from "@/lib/types/legal";

const LEGAL_SLUGS: LegalPageSlug[] = ["privacy", "terms"];

export function buildLegalDocuments(locale: AppLocale) {
  return LEGAL_SLUGS.map((slug) => {
    const page = getStaticLegalPage(locale, slug);

    return {
      _id: `legalPage-${slug}-${locale}`,
      _type: "legalPage" as const,
      language: locale,
      slug: page.slug,
      title: page.title,
      metaDescription: page.metaDescription,
      sections: page.sections.map((section) => ({
        _type: "legalSection" as const,
        _key: section.heading.replace(/\W+/g, "-").toLowerCase(),
        heading: section.heading,
        body: section.body,
      })),
    };
  });
}
