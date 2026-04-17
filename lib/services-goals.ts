import type { ServiceCategory, ServiceProcedure, ServiceSubcategory } from "@/lib/types/services";
import { servicesCatalog } from "@/lib/services";

export type GoalSlug =
  | "glow"
  | "texture"
  | "acne"
  | "pigmentation"
  | "firmness"
  | "hair";

export interface ProcedureHit {
  category: ServiceCategory;
  subcategory: ServiceSubcategory;
  procedure: ServiceProcedure;
  href: string;
  score: number;
}

const goalKeywords: Record<GoalSlug, string[]> = {
  glow: ["glow", "radiance", "luminous", "bright", "brightness"],
  texture: ["texture", "pores", "resurfacing", "smooth", "refine", "refinement"],
  acne: ["acne", "blemish", "clarifying", "congestion", "oil", "pores", "extractions"],
  pigmentation: ["pigment", "pigmentation", "uneven tone", "brightening", "illuminate", "photodamage"],
  firmness: ["firm", "firmness", "tighten", "tightening", "lift", "laxity", "collagen"],
  hair: ["hair", "scalp", "shedding", "follicle", "density", "hair loss"],
};

function normalize(text: string): string {
  return text.toLowerCase();
}

function scoreText(text: string, keywords: string[]): number {
  const haystack = normalize(text);
  return keywords.reduce((acc, kw) => (haystack.includes(normalize(kw)) ? acc + 1 : acc), 0);
}

export function isGoalSlug(value: string): value is GoalSlug {
  return Object.hasOwn(goalKeywords, value);
}

export function getGoalLabel(goal: GoalSlug): string {
  const labels: Record<GoalSlug, string> = {
    glow: "Glow",
    texture: "Texture",
    acne: "Acne control",
    pigmentation: "Pigmentation",
    firmness: "Firmness",
    hair: "Hair loss",
  };
  return labels[goal];
}

export function getGoalRecommendations(goal: GoalSlug, limit = 10): ProcedureHit[] {
  const keywords = goalKeywords[goal];

  const hits: ProcedureHit[] = [];

  servicesCatalog.categories.forEach((category) => {
    const categoryBoost = scoreText(`${category.title} ${category.description}`, keywords) * 2;
    category.subcategories.forEach((subcategory) => {
      const subcategoryBoost =
        scoreText(`${subcategory.title} ${subcategory.description}`, keywords) * 2;

      subcategory.procedures.forEach((procedure) => {
        const base =
          scoreText(procedure.title, keywords) * 4 +
          scoreText(procedure.description, keywords) * 2;

        const score = base + categoryBoost + subcategoryBoost;

        if (score <= 0) return;

        hits.push({
          category,
          subcategory,
          procedure,
          href: `/services/${category.id}/${subcategory.id}/${procedure.id}`,
          score,
        });
      });
    });
  });

  hits.sort((a, b) => b.score - a.score);

  // De-dupe by procedure id, keep best score.
  const seen = new Set<string>();
  const unique = hits.filter((hit) => {
    if (seen.has(hit.procedure.id)) return false;
    seen.add(hit.procedure.id);
    return true;
  });

  return unique.slice(0, limit);
}

