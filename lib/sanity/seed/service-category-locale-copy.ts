import { enLandingContent } from "@/lib/content/en";
import { ruLandingContent } from "@/lib/content/ru";
import { ukLandingContent } from "@/lib/content/uk";

export interface CategoryLocaleCopy {
  title: string;
  description: string;
}

function slugFromCategoryHref(href: string): string {
  const segment = href.split("/").filter(Boolean).at(-1);
  return segment ?? "";
}

function buildCategoryCopyMap(
  categories: Array<{ href: string; title: string; description: string }>,
): Record<string, CategoryLocaleCopy> {
  const map: Record<string, CategoryLocaleCopy> = {};

  for (const category of categories) {
    const slug = slugFromCategoryHref(category.href);
    if (!slug) continue;
    map[slug] = { title: category.title, description: category.description };
  }

  return map;
}

/** Category titles/descriptions extracted from static landing copy (legacy preview cards). */
export const serviceCategoryLocaleCopy = {
  en: buildCategoryCopyMap(enLandingContent.services.categories),
  uk: buildCategoryCopyMap(ukLandingContent.services.categories),
  ru: buildCategoryCopyMap(ruLandingContent.services.categories),
} as const;

export function getCategoryLocaleCopy(
  slug: string,
  locale: keyof typeof serviceCategoryLocaleCopy,
): CategoryLocaleCopy | undefined {
  return serviceCategoryLocaleCopy[locale][slug];
}
