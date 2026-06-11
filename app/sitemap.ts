import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";
import { servicesCatalog } from "@/lib/services";
import { buildConcernPath } from "@/lib/services/concern-path";
import { CONCERN_ORDER } from "@/lib/services/static-treatment-concerns";

function buildLocalizedUrl(locale: string, pathname: string): string {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return pathname;

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === routing.defaultLocale) {
    return `${siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`;
  }
  return normalizedPath === "/"
    ? `${siteUrl}/${locale}`
    : `${siteUrl}/${locale}${normalizedPath}`;
}

function buildAlternateLanguages(pathname: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = buildLocalizedUrl(locale, pathname);
  }
  languages["x-default"] = buildLocalizedUrl(routing.defaultLocale, pathname);
  return languages;
}

type SitemapEntry = MetadataRoute.Sitemap[number];

function createEntry(pathname: string, priority: number): SitemapEntry[] {
  return routing.locales.map((locale) => ({
    url: buildLocalizedUrl(locale, pathname),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
    alternates: {
      languages: buildAlternateLanguages(pathname),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: SitemapEntry[] = [
    ...createEntry("/", 1),
    ...createEntry("/treatments", 0.9),
    ...createEntry("/privacy", 0.3),
    ...createEntry("/terms", 0.3),
  ];

  for (const concernSlug of CONCERN_ORDER) {
    entries.push(...createEntry(buildConcernPath(concernSlug), 0.75));
  }

  for (const category of servicesCatalog.categories) {
    const categoryPath = `/treatments/${category.id}`;
    entries.push(...createEntry(categoryPath, 0.8));

    for (const subcategory of category.subcategories) {
      const subcategoryPath = `${categoryPath}/${subcategory.id}`;
      entries.push(...createEntry(subcategoryPath, 0.7));

      for (const procedure of subcategory.procedures) {
        entries.push(
          ...createEntry(`${subcategoryPath}/${procedure.id}`, 0.6),
        );
      }
    }
  }

  return entries;
}
