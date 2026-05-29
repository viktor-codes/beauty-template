import type { ServiceCategory, ServiceSubcategory } from "@/lib/types/services";

import { aestheticInjectionsCategory } from "@/lib/services/categories/aesthetic-injections";
import { aestheticTreatmentsCategory } from "@/lib/services/categories/aesthetic-treatments";
import { advancedAestheticTreatmentsCategory } from "@/lib/services/categories/advanced-aesthetic-treatments";
import { bodySlimmingCategory } from "@/lib/services/categories/body-slimming";
import { cosmetologyCategory } from "@/lib/services/categories/cosmetology";
import {
  cloneSubcategories,
  cloneSubcategory,
  filterProcedures,
  injectionImage,
} from "@/lib/services/helpers";

const ANTI_AGE_FACIAL_IDS = [
  "jan-marini-age-intervention-facial",
  "jan-marini-retinol-plus-facial",
  "jan-marini-illuminate-facial",
  "jan-marini-c-esta-vitamin-c-facial",
] as const;

const ANTI_AGE_PEEL_IDS = [
  "tca-peel",
  "prx-t33",
  "obagi-blue-peel-4-layers",
  "extractions-plus-obagi-peel",
] as const;

function facialsSubcategory(): ServiceSubcategory | undefined {
  const facials = aestheticTreatmentsCategory.subcategories.find((s) => s.id === "facials");
  if (!facials) return undefined;
  return {
    ...cloneSubcategory(facials),
    id: "anti-age-facials",
    title: "Anti-age facials",
    procedures: facials.procedures.filter((p) =>
      (ANTI_AGE_FACIAL_IDS as readonly string[]).includes(p.id),
    ),
  };
}

function peelsSubcategory(): ServiceSubcategory | undefined {
  const peels = bodySlimmingCategory.subcategories.find((s) => s.id === "peels");
  if (!peels) return undefined;
  return {
    ...cloneSubcategory(peels),
    id: "anti-age-peels",
    title: "Anti-age peels",
    procedures: peels.procedures.filter((p) =>
      (ANTI_AGE_PEEL_IDS as readonly string[]).includes(p.id),
    ),
  };
}

/** Duplicate listings for age-focused navigation (canonical copies also live in other categories). */
export const antiAgeCategory: ServiceCategory = {
  id: "anti-age",
  title: "Anti age",
  description:
    "Age-focused protocols—lifting, collagen support, biorevitalisation, neuromodulators, and corrective peels.",
  image: injectionImage,
  subcategories: [
    ...cloneSubcategories(cosmetologyCategory, [
      "hifu-face-lift",
      "botox",
      "face-contouring",
      "wrinkle-augmentation",
      "plla-vector-lifting",
      "collagen-stimulators",
      "biorevitalisation",
      "treatments-under-eyes",
      "rf-microneedling-and-dermapen",
    ]),
    ...cloneSubcategories(aestheticInjectionsCategory, [
      "collagen-stimulators",
      "biorevitalisation",
      "plasma-therapy",
    ]),
    ...cloneSubcategories(advancedAestheticTreatmentsCategory, [
      "hifu-face-lift",
      "rf-microneedling",
    ]),
    facialsSubcategory(),
    peelsSubcategory(),
  ].filter((s): s is ServiceSubcategory => s !== undefined && s.procedures.length > 0),
};
