import type { ServiceCategory } from "@/lib/types/services";

import { bodySlimmingCategoryImage, proc } from "@/lib/services/helpers";

export const bodyTreatmentCategory: ServiceCategory = {
  id: "body-treatment",
  title: "Body treatment",
  description:
    "Body-focused treatments—cryolipolysis and muscle toning for contour and definition.",
  image: bodySlimmingCategoryImage,
  subcategories: [
    {
      id: "cryo-fat-reduction",
      title: "CRYO (fat reduction)",
      description: "Cryolipolysis sessions to target stubborn fat pockets with applicator-based cooling.",
      procedures: [
        proc("cryo-1-applicator", "1 applicator", "Single-applicator CRYO session.", 150),
        proc("cryo-2-applicators", "2 applicators", "Two-applicator session for larger areas.", 300),
        proc("cryo-4-applicators", "4 applicators", "Four-applicator comprehensive session.", 500),
      ],
    },
    {
      id: "emsculpt",
      title: "Emsculpt",
      description: "High-intensity electromagnetic muscle toning—45 minutes per zone.",
      procedures: [
        proc(
          "emsculpt-1-zone",
          "1 treatment — 1 zone (45 min)",
          "Single-zone Emsculpt session for muscle tone and definition support.",
          80,
        ),
      ],
    },
  ],
};
