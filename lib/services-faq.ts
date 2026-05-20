import type { AppLocale } from "@/i18n/routing";
import { getLandingContent } from "@/lib/content";
import type { FAQItem } from "@/lib/types/content";
import type { ServiceCategory, ServiceProcedure, ServiceSubcategory } from "@/lib/types/services";
import { servicesCatalog } from "@/lib/services";

function normalize(text: string): string {
  return text.toLowerCase();
}

function includesAny(haystack: string, needles: string[]): boolean {
  const h = normalize(haystack);
  return needles.some((n) => h.includes(normalize(n)));
}

function scoreFaqAgainstContext(item: FAQItem, context: string): number {
  const blob = `${item.question} ${item.answer}`;
  let score = 0;

  if (includesAny(context, ["peel", "tca", "prx", "obagi", "carbon", "resurfacing"])) {
    if (includesAny(blob, ["peel", "tca", "prx", "obagi", "carbon", "resurfacing"])) score += 6;
  }

  if (includesAny(context, ["retin", "accutane", "isotretinoin", "acid"])) {
    if (includesAny(blob, ["retin", "accutane", "isotretinoin", "acid"])) score += 6;
  }

  if (includesAny(context, ["filler", "hyaluronic", "lip", "inject"])) {
    if (includesAny(blob, ["filler", "hyaluronic", "lip", "inject"])) score += 6;
  }

  if (includesAny(context, ["collagen", "sculptra", "radiesse", "biostim"])) {
    if (includesAny(blob, ["collagen", "sculptra", "radiesse", "biostim"])) score += 6;
  }

  if (includesAny(context, ["prp", "prf", "platelet"])) {
    if (includesAny(blob, ["prp", "prf", "platelet"])) score += 6;
  }

  if (includesAny(context, ["hifu", "ultrasound"])) {
    if (includesAny(blob, ["hifu", "ultrasound"])) score += 6;
  }

  if (includesAny(context, ["microneedling", "rf microneedling"])) {
    if (includesAny(blob, ["microneedling"])) score += 6;
  }

  if (includesAny(context, ["laser hair", "hair removal", "follicle"])) {
    if (includesAny(blob, ["laser hair", "hair removal", "follicle"])) score += 6;
  }

  if (includesAny(context, ["sclero", "spider vein", "varicose"])) {
    if (includesAny(blob, ["sclero", "spider vein", "varicose"])) score += 6;
  }

  if (includesAny(context, ["cold sore", "herpes"])) {
    if (includesAny(blob, ["cold sore", "herpes"])) score += 5;
  }

  if (includesAny(blob, ["consultation", "sessions", "downtime", "expect"])) score += 1;

  return score;
}

function byId(id: string, locale: AppLocale): FAQItem | null {
  return getLandingContent(locale).faq.items.find((i) => i.id === id) ?? null;
}

function dedupe(items: FAQItem[]): FAQItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.id ?? item.question;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildCategoryContext(category: ServiceCategory): string {
  return `${category.title} ${category.description} ${category.subcategories
    .map((s) => `${s.title} ${s.description}`)
    .join(" ")}`;
}

function buildSubcategoryContext(
  category: ServiceCategory,
  subcategory: ServiceSubcategory,
): string {
  return `${buildCategoryContext(category)} ${subcategory.title} ${subcategory.description}`;
}

function buildProcedureContext(
  category: ServiceCategory,
  subcategory: ServiceSubcategory,
  procedure: ServiceProcedure,
): string {
  return `${buildSubcategoryContext(category, subcategory)} ${procedure.title} ${procedure.description}`;
}

function pickFaqForContext(context: string, locale: AppLocale, limit: number): FAQItem[] {
  const faqItems = getLandingContent(locale).faq.items;
  const always: FAQItem[] = [
    byId("faq-how-do-i-choose-the-right-treatment", locale),
    byId("faq-when-not-to-book", locale),
  ].filter(Boolean) as FAQItem[];

  const scored = faqItems
    .map((item) => ({ item, score: scoreFaqAgainstContext(item, context) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);

  return dedupe([...always, ...scored]).slice(0, limit);
}

export function getServicesHubFaq(locale: AppLocale, limit = 6): FAQItem[] {
  const context = servicesCatalog.categories
    .flatMap((c) => [c.title, c.description, ...c.subcategories.flatMap((s) => [s.title, s.description])])
    .join(" ");

  return pickFaqForContext(context, locale, limit);
}

export function getServicesCategoryFaq(
  category: ServiceCategory,
  locale: AppLocale,
  limit = 6,
): FAQItem[] {
  return pickFaqForContext(buildCategoryContext(category), locale, limit);
}

export function getServicesSubcategoryFaq(
  category: ServiceCategory,
  subcategory: ServiceSubcategory,
  locale: AppLocale,
  limit = 6,
): FAQItem[] {
  return pickFaqForContext(buildSubcategoryContext(category, subcategory), locale, limit);
}

export function getServicesProcedureFaq(
  category: ServiceCategory,
  subcategory: ServiceSubcategory,
  procedure: ServiceProcedure,
  locale: AppLocale,
  limit = 5,
): FAQItem[] {
  return pickFaqForContext(
    buildProcedureContext(category, subcategory, procedure),
    locale,
    limit,
  );
}
