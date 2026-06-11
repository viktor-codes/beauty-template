import type { AppLocale } from "@/i18n/routing";
import { readLocalizedValue, type LocaleFieldValues } from "@/lib/i18n/pick-locale-field";
import { buildConcernPath } from "@/lib/services/concern-path";
import { getStaticCategoryFeatureFlags } from "@/lib/services/category-feature-flags";
import { getStaticCategoryShortTitle } from "@/lib/services/category-short-titles";
import {
  getCategoryLocaleCopyField,
  getProcedureLocaleCopy,
  getSubcategoryLocaleCopy,
} from "@/lib/services/locale-copy/get";
import { resolveServiceLocalizedField } from "@/lib/services/locale-copy/resolve-field";
import { getStaticServicesCatalog } from "@/lib/sanity/fetch/get-services-catalog";
import type {
  ServiceCategory,
  ServiceProcedure,
  ServicesCatalog,
  ServiceSubcategory,
  TreatmentConcern,
  TreatmentsHubUi,
} from "@/lib/types/services";

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
  concernSlugs?: string[] | null;
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

interface SanityHubLike {
  hubTitle?: LocaleFieldValues;
  hubDescription?: LocaleFieldValues;
  goalsSectionTitle?: LocaleFieldValues;
  faqEyebrow?: LocaleFieldValues;
  faqTitle?: LocaleFieldValues;
  faqSubtitle?: LocaleFieldValues;
  viewFullFaqLabel?: LocaleFieldValues;
}

interface SanityConcernLike {
  slug?: { current?: string } | string;
  title?: LocaleFieldValues;
  shortDescription?: LocaleFieldValues;
  image?: SanityServiceImageLike | null;
  sortOrder?: number;
  isActive?: boolean;
}

export interface SanityServicesCatalogLike {
  hub?: SanityHubLike | null;
  concerns?: SanityConcernLike[] | null;
  categories?: SanityCategoryLike[] | null;
}

function mapServiceImageSafe(
  raw: SanityServiceImageLike | null | undefined,
  locale: AppLocale,
  fallback?: { src: string; alt: string; width: number; height: number },
) {
  if (!raw && !fallback) return undefined;
  const base = fallback ?? {
    src: "/categories/peel.webp",
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

function mapConcernSlugs(raw: SanityProcedureLike): string[] | undefined {
  const slugs = (raw.concernSlugs ?? []).filter(
    (slug): slug is string => typeof slug === "string" && slug.length > 0,
  );
  return slugs.length > 0 ? slugs : undefined;
}

function mapProcedure(
  raw: SanityProcedureLike,
  locale: AppLocale,
  fallback?: ServiceProcedure,
): ServiceProcedure | null {
  const id = mapSlugSafe(raw.slug, fallback?.id ?? "");
  if (!id) return null;

  const procedureCopy = getProcedureLocaleCopy(id, locale);

  return {
    id,
    title: resolveServiceLocalizedField(
      readLocalizedValue(raw.title, locale, fallback?.title ?? "Treatment"),
      locale,
      fallback?.title ?? "Treatment",
      procedureCopy,
      (entry) => entry.title,
    ),
    description: resolveServiceLocalizedField(
      readLocalizedValue(raw.description, locale, fallback?.description ?? ""),
      locale,
      fallback?.description ?? "",
      procedureCopy,
      (entry) => entry.description,
    ),
    image: mapServiceImageSafe(raw.image, locale, fallback?.image),
    price: mapMoneySafe(raw.price) ?? fallback?.price,
    concernIds: mapConcernSlugs(raw) ?? fallback?.concernIds,
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
    .map((proc, index) => {
      const fallbackProc = fallbackProcedures.find((p) => p.id === mapSlugSafe(proc.slug, "")) ??
        fallbackProcedures[index];
      return mapProcedure(proc, locale, fallbackProc);
    })
    .filter((p): p is ServiceProcedure => p !== null);

  const subcategoryCopy = getSubcategoryLocaleCopy(id, locale);

  return {
    id,
    title: resolveServiceLocalizedField(
      readLocalizedValue(raw.title, locale, fallbackSub?.title ?? id),
      locale,
      fallbackSub?.title ?? id,
      subcategoryCopy,
      (entry) => entry.title,
    ),
    description: resolveServiceLocalizedField(
      readLocalizedValue(raw.description, locale, fallbackSub?.description ?? ""),
      locale,
      fallbackSub?.description ?? "",
      subcategoryCopy,
      (entry) => entry.description,
    ),
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
    .map((sub) => {
      const subId = mapSlugSafe(sub.slug, "");
      const fallbackSub = fallbackSubs.find((s) => s.id === subId);
      return mapSubcategory(sub, locale, fallback, fallbackSub);
    })
    .filter((s): s is ServiceSubcategory => s !== null);

  const staticFlags = getStaticCategoryFeatureFlags(id);
  const categoryCopy = getCategoryLocaleCopyField(id, locale);
  const title = resolveServiceLocalizedField(
    readLocalizedValue(raw.title, locale, fallback?.title ?? id),
    locale,
    fallback?.title ?? id,
    categoryCopy,
    (entry) => entry.title,
  );

  return {
    id,
    title,
    shortTitle: resolveCategoryShortTitle(id, title, locale, raw.shortTitle, fallback?.shortTitle),
    description: resolveServiceLocalizedField(
      readLocalizedValue(raw.description, locale, fallback?.description ?? ""),
      locale,
      fallback?.description ?? "",
      categoryCopy,
      (entry) => entry.description,
    ),
    image: mapServiceImageSafe(raw.image, locale, fallback?.image),
    subcategories: subcategories.length > 0 ? subcategories : fallbackSubs,
    sortOrder: raw.sortOrder ?? fallback?.sortOrder ?? staticFlags.sortOrder,
    featuredOnHomepage:
      raw.featuredOnHomepage ?? fallback?.featuredOnHomepage ?? staticFlags.featuredOnHomepage,
    featuredInNav: raw.featuredInNav ?? fallback?.featuredInNav ?? staticFlags.featuredInNav,
  };
}

function mapHubUi(raw: SanityHubLike | null | undefined, locale: AppLocale, fallback: TreatmentsHubUi): TreatmentsHubUi {
  if (!raw) return fallback;

  return {
    pageTitle: readLocalizedValue(raw.hubTitle, locale, fallback.pageTitle),
    pageDescription: readLocalizedValue(raw.hubDescription, locale, fallback.pageDescription),
    goalsSectionTitle: readLocalizedValue(raw.goalsSectionTitle, locale, fallback.goalsSectionTitle),
    faqEyebrow: readLocalizedValue(raw.faqEyebrow, locale, fallback.faqEyebrow),
    faqTitle: readLocalizedValue(raw.faqTitle, locale, fallback.faqTitle),
    faqSubtitle: readLocalizedValue(raw.faqSubtitle, locale, fallback.faqSubtitle),
    categoryMetaTitleSuffix: fallback.categoryMetaTitleSuffix,
    subcategoriesSrOnlyLabel: fallback.subcategoriesSrOnlyLabel,
    proceduresSrOnlyLabel: fallback.proceduresSrOnlyLabel,
    categoryFaqTitleTemplate: fallback.categoryFaqTitleTemplate,
    categoryFaqSubtitle: fallback.categoryFaqSubtitle,
    subcategoryFaqTitleTemplate: fallback.subcategoryFaqTitleTemplate,
    subcategoryFaqSubtitle: fallback.subcategoryFaqSubtitle,
    procedureFaqTitleTemplate: fallback.procedureFaqTitleTemplate,
    procedureFaqSubtitle: fallback.procedureFaqSubtitle,
    consultationRecommendedLabel: fallback.consultationRecommendedLabel,
    subcategoryConsultationBlurb: fallback.subcategoryConsultationBlurb,
    procedureConsultationBlurb: fallback.procedureConsultationBlurb,
    viewFullFaqLabel: readLocalizedValue(raw.viewFullFaqLabel, locale, fallback.viewFullFaqLabel),
    recommendedForPrefix: fallback.recommendedForPrefix,
    viewDetailsLabel: fallback.viewDetailsLabel,
    breadcrumbHome: fallback.breadcrumbHome,
    breadcrumbTreatments: fallback.breadcrumbTreatments,
    backToAllCategoriesLabel: fallback.backToAllCategoriesLabel,
    backToCategoryPrefix: fallback.backToCategoryPrefix,
    concernCardFallbackDescription: fallback.concernCardFallbackDescription,
  };
}

function mapConcern(
  raw: SanityConcernLike,
  locale: AppLocale,
  fallback?: TreatmentConcern,
): TreatmentConcern | null {
  const id = mapSlugSafe(raw.slug, fallback?.id ?? "");
  if (!id) return null;

  return {
    id,
    title: readLocalizedValue(raw.title, locale, fallback?.title ?? id),
    shortDescription: readLocalizedValue(
      raw.shortDescription,
      locale,
      fallback?.shortDescription ?? "",
    ) || undefined,
    image: mapServiceImageSafe(raw.image, locale, fallback?.image),
    href: buildConcernPath(id),
    sortOrder: raw.sortOrder ?? fallback?.sortOrder,
    isActive: raw.isActive ?? fallback?.isActive ?? true,
  };
}

function mapConcerns(
  raw: SanityConcernLike[] | null | undefined,
  locale: AppLocale,
  fallback: TreatmentConcern[],
): TreatmentConcern[] {
  if (!raw?.length) return fallback;

  const mapped = raw
    .map((item) => {
      const slug = mapSlugSafe(item.slug, "");
      const fallbackItem = fallback.find((c) => c.id === slug);
      return mapConcern(item, locale, fallbackItem);
    })
    .filter((c): c is TreatmentConcern => c !== null);

  return mapped.length > 0 ? mapped : fallback;
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
  const hubUi = mapHubUi(raw?.hub, locale, fallback.hubUi);
  const concerns = mapConcerns(raw?.concerns, locale, fallback.concerns);

  const base = {
    id: fallback.id,
    title: hubUi.pageTitle,
    description: hubUi.pageDescription,
    concerns,
    hubUi,
  };

  if (!raw?.categories?.length) {
    return applyStaticFlagsToCatalog({ ...fallback, ...base }, locale);
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
      ...base,
      categories:
        categories.length > 0
          ? [...categories, ...missingFromSanity.map((c) => applyStaticFlagsToCategory(c, locale))]
          : fallback.categories,
    },
    locale,
  );
}
