import { revalidatePath, revalidateTag } from "next/cache";

import { routing, type AppLocale } from "@/i18n/routing";
import { SANITY_CACHE_TAG } from "@/lib/sanity/cache-tags";
import { isLegalPageSlug, type LegalPageSlug } from "@/lib/types/legal";

const SERVICE_DOCUMENT_TYPES = new Set([
  "serviceCategory",
  "serviceSubcategory",
  "serviceProcedure",
  "treatmentConcern",
  "treatmentsHub",
]);

const MARKETING_PATHS = ["/", "/treatments", "/privacy", "/terms"] as const;

export interface SanityWebhookPayload {
  _type?: string;
  _id?: string;
  language?: string;
  slug?: string;
}

export interface SanityRevalidationResult {
  tags: string[];
  paths: string[];
}

function isAppLocale(value: unknown): value is AppLocale {
  return typeof value === "string" && routing.locales.includes(value as AppLocale);
}

function localizedPath(locale: AppLocale, pathname: string): string {
  if (locale === routing.defaultLocale) {
    return pathname;
  }

  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}

function revalidateLandingLocale(locale: AppLocale, result: SanityRevalidationResult): void {
  const landingTag = SANITY_CACHE_TAG.landing(locale);
  revalidateTag(landingTag, "max");
  result.tags.push(landingTag);

  for (const pathname of MARKETING_PATHS) {
    const path = localizedPath(locale, pathname);
    revalidatePath(path, "layout");
    result.paths.push(`${path} (layout)`);
  }

  revalidatePath(localizedPath(locale, "/"), "page");
  result.paths.push(`${localizedPath(locale, "/")} (page)`);
}

function revalidateLegalPageLocale(
  locale: AppLocale,
  slug: LegalPageSlug,
  result: SanityRevalidationResult,
): void {
  const tag = SANITY_CACHE_TAG.legal(locale, slug);
  revalidateTag(tag, "max");
  result.tags.push(tag);

  const pathname = slug === "privacy" ? "/privacy" : "/terms";
  const path = localizedPath(locale, pathname);
  revalidatePath(path, "page");
  result.paths.push(`${path} (page)`);
}

function revalidateSiteSettingsLocale(locale: AppLocale, result: SanityRevalidationResult): void {
  const settingsTag = SANITY_CACHE_TAG.siteSettings(locale);
  revalidateTag(settingsTag, "max");
  result.tags.push(settingsTag);

  for (const pathname of MARKETING_PATHS) {
    const path = localizedPath(locale, pathname);
    revalidatePath(path, "layout");
    result.paths.push(`${path} (layout)`);
  }
}

function revalidateServicesCatalog(result: SanityRevalidationResult, slug?: string): void {
  revalidateTag(SANITY_CACHE_TAG.servicesCatalog, "max");
  result.tags.push(SANITY_CACHE_TAG.servicesCatalog);

  for (const locale of routing.locales) {
    const servicesPath = localizedPath(locale, "/treatments");
    revalidatePath(servicesPath, "layout");
    result.paths.push(`${servicesPath} (layout)`);

    if (slug) {
      const categoryPath = localizedPath(locale, `/treatments/${slug}`);
      revalidatePath(categoryPath, "page");
      result.paths.push(`${categoryPath} (page)`);
    }
  }
}

function revalidateAllSanityContent(result: SanityRevalidationResult): void {
  revalidateTag(SANITY_CACHE_TAG.all, "max");
  result.tags.push(SANITY_CACHE_TAG.all);

  for (const locale of routing.locales) {
    revalidateLandingLocale(locale, result);
    revalidateSiteSettingsLocale(locale, result);
  }

  revalidateServicesCatalog(result);
}

/**
 * Maps a Sanity webhook payload to cache tag + route invalidation.
 * Call from POST /api/revalidate after auth checks.
 */
export function revalidateSanityContent(
  payload: SanityWebhookPayload,
): SanityRevalidationResult {
  const result: SanityRevalidationResult = { tags: [], paths: [] };
  const documentType = payload._type;

  if (!documentType) {
    revalidateAllSanityContent(result);
    return result;
  }

  if (documentType === "landingPage") {
    if (isAppLocale(payload.language)) {
      revalidateLandingLocale(payload.language, result);
    } else {
      revalidateAllSanityContent(result);
    }
    return result;
  }

  if (documentType === "siteSettings") {
    if (isAppLocale(payload.language)) {
      revalidateSiteSettingsLocale(payload.language, result);
    } else {
      revalidateAllSanityContent(result);
    }
    return result;
  }

  if (documentType === "legalPage") {
    const slug =
      typeof payload.slug === "string" && isLegalPageSlug(payload.slug)
        ? payload.slug
        : undefined;

    if (isAppLocale(payload.language) && slug) {
      revalidateLegalPageLocale(payload.language, slug, result);
    } else if (isAppLocale(payload.language)) {
      revalidateLegalPageLocale(payload.language, "privacy", result);
      revalidateLegalPageLocale(payload.language, "terms", result);
    } else {
      for (const locale of routing.locales) {
        revalidateLegalPageLocale(locale, "privacy", result);
        revalidateLegalPageLocale(locale, "terms", result);
      }
    }
    return result;
  }

  if (SERVICE_DOCUMENT_TYPES.has(documentType)) {
    revalidateServicesCatalog(result, payload.slug);
    return result;
  }

  revalidateAllSanityContent(result);
  return result;
}
