import type { ServiceCategory } from "@/lib/types/services";

import { proc, vitaminShotsCategoryImage } from "@/lib/services/helpers";

export const vitaminShotsCategory: ServiceCategory = {
  id: "vitamin-shots",
  title: "Vitamin shots",
  description:
    "Intramuscular vitamin injections to support energy, immunity, skin, hair, and overall well-being.",
  image: vitaminShotsCategoryImage,
  isFlatCategory: true,
  subcategories: [
    {
      id: "vitamin-injections",
      title: "Vitamin injections",
      description:
        "Single-shot protocols administered after a brief consultation. Vitamin D may require a blood test first.",
      procedures: [
        proc(
          "vitamin-b12",
          "Vitamin B12",
          "B12 supports nerve function, red blood cell production, and DNA synthesis. Especially relevant if intake from animal products is limited.",
          45,
        ),
        proc(
          "vitamin-c",
          "Vitamin C",
          "A powerful antioxidant supporting immunity, collagen production, and iron absorption.",
          45,
        ),
        proc(
          "biotin-b7",
          "Biotin (B7)",
          "Supports hair, skin, and nails by improving keratin infrastructure and general protein health.",
          45,
        ),
        proc(
          "vitamin-b5",
          "Vitamin B5",
          "Helps release energy from food, supports mental performance, and benefits skin and hair health.",
          45,
        ),
        proc(
          "vitamin-d",
          "Vitamin D",
          "Essential for bone health and calcium absorption. A Vitamins & Minerals blood test (€110) is recommended before a vitamin D shot to avoid overdose.",
          45,
        ),
      ],
    },
  ],
};
