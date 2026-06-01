import type { AppLocale } from "@/i18n/routing";
import { readLocalizedValue, type LocaleFieldValues } from "@/lib/i18n/pick-locale-field";
import { getStaticCategoryFeatureFlags } from "@/lib/services/category-feature-flags";
import { getStaticCategoryShortTitle } from "@/lib/services/category-short-titles";
import { getStaticServicesCatalog } from "@/lib/sanity/fetch/get-services-catalog";
import type { ServiceCategory, ServiceProcedure, ServicesCatalog, ServiceSubcategory } from "@/lib/types/services";

import {
  mapLocalizedAlt,
  mapMoneySafe,
  mapSlugSafe,
  resolveSanityImageUrl,
  type SanityImageLike,
} from "@/lib/sanity/mappers/safe";

interface SanityServiceImageLike {
  asset?: { url?: string } | null;
  alt?: LocaleFieldValues | string | null;
}

interface SanityProcedureLike {
  slug?: { current?: string } | string;
  title?: LocaleFieldValues;
  description?: LocaleFieldValues;
  image?: SanityServiceImageLike | null;
  price?: { amount?: number; currency?: string } | null;
}

interface SanitySubcategoryLike {
  slug?: { current?: string } | string;
  title?: LocaleFieldValues;
  description?: LocaleFieldValues;
  image?: SanityServiceImageLike | null;
  procedures?: SanityProcedureLike[] | null;
}

interface SanityCategoryLike {
  slug?: { current?: string } | string;
  title?: LocaleFieldValues;
  shortTitle?: LocaleFieldValues;
  description?: LocaleFieldValues;
  image?: SanityServiceImageLike | null;
  sortOrder?: number;
  featuredOnHomepage?: boolean;
  featuredInNav?: boolean;
  subcategories?: SanitySubcategoryLike[] | null;
}

export interface SanityServicesCatalogLike {
  hubTitle?: LocaleFieldValues;
  hubDescription?: LocaleFieldValues;
  categories?: SanityCategoryLike[] | null;
}

function mapServiceImageSafe(
  raw: SanityServiceImageLike | null | undefined,
  locale: AppLocale,
  fallback?: { src: string; alt: string; width: number; height: number },
) {
  if (!raw && !fallback) return undefined;
  const base = fallback ?? {
    src: "/peel.webp",
    alt: "Treatment",
    width: 1200,
    height: 800,
  };
  return {
    src: resolveSanityImageUrl(raw, base.src),
    alt: mapLocalizedAlt(raw?.alt, locale, base.alt),
    width: base.width,
    height: base.height,
  };
}

function mapProcedure(
  raw: SanityProcedureLike,
  locale: AppLocale,
  fallback?: ServiceProcedure,
): ServiceProcedure | null {
  const id = mapSlugSafe(raw.slug, fallback?.id ?? "");
  if (!id) return null;

  return {
    id,
    title: readLocalizedValue(raw.title, locale, fallback?.title ?? "Treatment"),
    description: readLocalizedValue(
      raw.description,
      locale,
      fallback?.description ?? "",
    ),
    image: mapServiceImageSafe(raw.image, locale, fallback?.image),
    price: mapMoneySafe(raw.price) ?? fallback?.price,
  };
}

function mapSubcategory(
  raw: SanitySubcategoryLike,
  locale: AppLocale,
  fallbackCategory?: ServiceCategory,
  fallbackSub?: ServiceSubcategory,
): ServiceSubcategory | null {
  const id = mapSlugSafe(raw.slug, fallbackSub?.id ?? "");
  if (!id) return null;

  const fallbackProcedures = fallbackSub?.procedures ?? [];
  const procedures = (raw.procedures ?? [])
    .map((proc, index) =>
      mapProcedure(proc, locale, fallbackProcedures[index]),
    )
    .filter((p): p is ServiceProcedure => p !== null);

  return {
    id,
    title: readLocalizedValue(raw.title, locale, fallbackSub?.title ?? id),
    description: readLocalizedValue(raw.description, locale, fallbackSub?.description ?? ""),
    image: mapServiceImageSafe(raw.image, locale, fallbackSub?.image),
    procedures: procedures.length > 0 ? procedures : fallbackProcedures,
  };
}

function resolveCategoryShortTitle(
  categoryId: string,
  title: string,
  locale: AppLocale,
  rawShortTitle?: LocaleFieldValues,
  fallbackShortTitle?: string,
): string {
  const staticFallback = getStaticCategoryShortTitle(categoryId, locale, title);
  return readLocalizedValue(rawShortTitle, locale, fallbackShortTitle ?? staticFallback);
}

function applyStaticFlagsToCategory(category: ServiceCategory, locale: AppLocale): ServiceCategory {
  const staticFlags = getStaticCategoryFeatureFlags(category.id);

  return {
    ...category,
    sortOrder: category.sortOrder ?? staticFlags.sortOrder,
    featuredOnHomepage: category.featuredOnHomepage ?? staticFlags.featuredOnHomepage,
    featuredInNav: category.featuredInNav ?? staticFlags.featuredInNav,
    shortTitle: category.shortTitle ?? getStaticCategoryShortTitle(category.id, locale, category.title),
  };
}

function applyStaticFlagsToCatalog(catalog: ServicesCatalog, locale: AppLocale): ServicesCatalog {
  return {
    ...catalog,
    categories: catalog.categories.map((category) => applyStaticFlagsToCategory(category, locale)),
  };
}

function mapCategory(
  raw: SanityCategoryLike,
  locale: AppLocale,
  fallback?: ServiceCategory,
): ServiceCategory | null {
  const id = mapSlugSafe(raw.slug, fallback?.id ?? "");
  if (!id) return null;

  const fallbackSubs = fallback?.subcategories ?? [];
  const subcategories = (raw.subcategories ?? [])
    .map((sub, index) => mapSubcategory(sub, locale, fallback, fallbackSubs[index]))
    .filter((s): s is ServiceSubcategory => s !== null);

  const staticFlags = getStaticCategoryFeatureFlags(id);
  const title = readLocalizedValue(raw.title, locale, fallback?.title ?? id);

  return {
    id,
    title,
    shortTitle: resolveCategoryShortTitle(id, title, locale, raw.shortTitle, fallback?.shortTitle),
    description: readLocalizedValue(raw.description, locale, fallback?.description ?? ""),
    image: mapServiceImageSafe(raw.image, locale, fallback?.image),
    subcategories: subcategories.length > 0 ? subcategories : fallbackSubs,
    sortOrder: raw.sortOrder ?? fallback?.sortOrder ?? staticFlags.sortOrder,
    featuredOnHomepage:
      raw.featuredOnHomepage ?? fallback?.featuredOnHomepage ?? staticFlags.featuredOnHomepage,
    featuredInNav: raw.featuredInNav ?? fallback?.featuredInNav ?? staticFlags.featuredInNav,
  };
}

/**
 * Maps Sanity services tree (field-level i18n, single document IDs) into ServicesCatalog.
 * Always merges with static fallback so missing CMS fields never break the site.
 */
export function mapServicesCatalogSafe(
  raw: SanityServicesCatalogLike | null | undefined,
  locale: AppLocale,
): ServicesCatalog {
  const fallback = getStaticServicesCatalog(locale);

  if (!raw?.categories?.length) {
    return applyStaticFlagsToCatalog(fallback, locale);
  }

  const categories = raw.categories
    .map((cat) => {
      const slug = mapSlugSafe(cat.slug, "");
      const fallbackCat = fallback.categories.find((c) => c.id === slug);
      return mapCategory(cat, locale, fallbackCat);
    })
    .filter((c): c is ServiceCategory => c !== null);

  const sanityIds = new Set(categories.map((c) => c.id));
  const missingFromSanity = fallback.categories.filter((c) => !sanityIds.has(c.id));

  return applyStaticFlagsToCatalog(
    {
      id: fallback.id,
      title: readLocalizedValue(raw.hubTitle, locale, fallback.title),
      description: readLocalizedValue(raw.hubDescription, locale, fallback.description),
      categories:
        categories.length > 0
          ? [...categories, ...missingFromSanity.map((c) => applyStaticFlagsToCategory(c, locale))]
          : fallback.categories,
    },
    locale,
  );
}
