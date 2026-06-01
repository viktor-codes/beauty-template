import type { AppLocale } from "@/i18n/routing";
import { getStaticLandingContent } from "@/lib/content/static";
import { getGoalRecommendations, type GoalSlug } from "@/lib/services-goals";
import { servicesCatalog } from "@/lib/services/catalog";
import { CONCERN_ORDER, type StaticConcernSlug } from "@/lib/services/static-treatment-concerns";
import { toLocaleStringI18n, toLocaleTextI18n } from "@/lib/sanity/seed/to-locale-fields";

type SanitySeedDoc = Record<string, unknown> & { _id: string; _type: string };
type SanityReference = { _type: "reference"; _ref: string };

const GOAL_LABELS_EN: Record<StaticConcernSlug, string> = {
  glow: "Glow",
  texture: "Texture",
  acne: "Acne control",
  pigmentation: "Pigmentation",
  firmness: "Firmness",
  hair: "Hair loss",
};

function concernDocId(slug: string) {
  return `treatmentConcern-${slug}`;
}

function procedureDocId(categorySlug: string, subSlug: string, procedureSlug: string) {
  return `serviceProcedure-${categorySlug}-${subSlug}-${procedureSlug}`;
}

function goalTitleForLocale(slug: StaticConcernSlug, locale: AppLocale): string {
  const goals = getStaticLandingContent(locale).services.goals;
  const goal = goals.find(
    (g) => g.href.includes(`goal=${slug}`) || g.href.includes(`concern=${slug}`),
  );
  return goal?.title ?? GOAL_LABELS_EN[slug];
}

export function buildTreatmentConcernDocuments(): SanitySeedDoc[] {
  return CONCERN_ORDER.map((slug, index) => ({
    _id: concernDocId(slug),
    _type: "treatmentConcern",
    slug: { _type: "slug", current: slug },
    title: toLocaleStringI18n(
      goalTitleForLocale(slug, "en"),
      goalTitleForLocale(slug, "uk"),
      goalTitleForLocale(slug, "ru"),
    ),
    shortDescription: toLocaleTextI18n(""),
    sortOrder: index,
    isActive: true,
  }));
}

/** Procedure → concern refs from legacy keyword scoring (Inna can refine in Studio). */
export function getProcedureConcernRefs(
  categorySlug: string,
  subSlug: string,
  procedureSlug: string,
): SanityReference[] {
  const refs: SanityReference[] = [];

  for (const concern of CONCERN_ORDER) {
    const hits = getGoalRecommendations(concern as GoalSlug, servicesCatalog, 200);
    const matched = hits.some(
      (hit) =>
        hit.category.id === categorySlug &&
        hit.subcategory.id === subSlug &&
        hit.procedure.id === procedureSlug,
    );
    if (matched) {
      refs.push({ _type: "reference", _ref: concernDocId(concern) });
    }
  }

  return refs;
}
