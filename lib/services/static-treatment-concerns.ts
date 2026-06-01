import type { AppLocale } from "@/i18n/routing";
import { getStaticLandingContent } from "@/lib/content/static";
import type { TreatmentConcern } from "@/lib/types/services";

export const CONCERN_ORDER = [
  "glow",
  "texture",
  "acne",
  "pigmentation",
  "firmness",
  "hair",
] as const;

export type StaticConcernSlug = (typeof CONCERN_ORDER)[number];

export function isStaticConcernSlug(value: string): value is StaticConcernSlug {
  return (CONCERN_ORDER as readonly string[]).includes(value);
}

/** Fallback concerns when Sanity is empty — titles from landing goals per locale. */
export function getStaticTreatmentConcerns(locale: AppLocale): TreatmentConcern[] {
  const goals = getStaticLandingContent(locale).services.goals;

  return CONCERN_ORDER.map((slug, index) => {
    const goal = goals.find((g) => g.href.includes(`goal=${slug}`) || g.href.includes(`concern=${slug}`));
    const title =
      goal?.title ??
      ({
        glow: "Glow",
        texture: "Texture",
        acne: "Acne control",
        pigmentation: "Pigmentation",
        firmness: "Firmness",
        hair: "Hair loss",
      }[slug] ?? slug);

    return {
      id: slug,
      title,
      href: `/treatments?concern=${slug}`,
      sortOrder: index,
      isActive: true,
    };
  });
}
