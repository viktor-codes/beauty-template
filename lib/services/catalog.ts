import type { ServicesCatalog } from "@/lib/types/services";

import { aestheticInjectionsCategory } from "@/lib/services/categories/aesthetic-injections";
import { aestheticTreatmentsCategory } from "@/lib/services/categories/aesthetic-treatments";
import { advancedAestheticTreatmentsCategory } from "@/lib/services/categories/advanced-aesthetic-treatments";
import { antiAgeCategory } from "@/lib/services/categories/anti-age";
import { bloodTestsCategory } from "@/lib/services/categories/blood-tests";
import { bodySlimmingCategory } from "@/lib/services/categories/body-slimming";
import { cosmetologyCategory } from "@/lib/services/categories/cosmetology";
import { laserHairRemovalCategory } from "@/lib/services/categories/laser-hair-removal";
import { vitaminShotsCategory } from "@/lib/services/categories/vitamin-shots";

export const servicesCatalog: ServicesCatalog = {
  id: "treatments",
  title: "Treatments",
  description:
    "Dermatology-informed treatments designed to improve skin quality, restore balance, and support natural-looking results.",
  categories: [
    cosmetologyCategory,
    bodySlimmingCategory,
    antiAgeCategory,
    vitaminShotsCategory,
    bloodTestsCategory,
    aestheticTreatmentsCategory,
    aestheticInjectionsCategory,
    advancedAestheticTreatmentsCategory,
    laserHairRemovalCategory,
  ],
};
