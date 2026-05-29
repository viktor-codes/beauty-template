import type { ServiceCategory } from "@/lib/types/services";

import { deviceImage, peelImage, proc } from "@/lib/services/helpers";

export const bodySlimmingCategory: ServiceCategory = {
  id: "body-slimming",
  title: "Body slimming & contouring",
  description:
    "Body-focused treatments—cryolipolysis, muscle toning, peels, laser correction, and minor lesion removal.",
  image: deviceImage,
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
    {
      id: "peels",
      title: "Peels",
      description: "Professional peels and dermaplaning for smoother texture and brighter tone.",
      image: peelImage,
      procedures: [
        proc(
          "tca-peel",
          "TCA peel",
          "Medium-depth TCA peel for texture, tone, and fine lines—downtime discussed in advance.",
          150,
        ),
        proc(
          "prx-t33",
          "PRX-T33",
          "Biorevitalizing peel for glow and early laxity with minimal visible peeling.",
          120,
        ),
        proc(
          "obagi-blue-peel-4-layers",
          "Obagi Blue Peel (4 layers)",
          "Layered TCA peel for photodamage and texture refinement.",
          80,
        ),
        proc(
          "carbon-peel",
          "Carbon peel",
          "Laser-activated carbon peel for pores, oil control, and radiance.",
          80,
        ),
        proc(
          "extractions-plus-obagi-peel",
          "Extractions with Obagi peel",
          "Extractions combined with Obagi peel for clearer, smoother skin.",
          80,
        ),
        proc(
          "dermaplaning",
          "Dermaplaning",
          "Gentle exfoliation removing peach fuzz and dull surface cells for instant smoothness.",
          60,
        ),
      ],
    },
    {
      id: "laser-tattoo-removal",
      title: "Laser tattoo remover (PMU)",
      description: "Laser sessions to break down permanent makeup and tattoo pigment over a course.",
      procedures: [
        proc(
          "laser-tattoo-pmu-1-zone",
          "1 zone",
          "Laser pigment removal for one treatment zone per session.",
          100,
        ),
      ],
    },
    {
      id: "laser-pigment-removal",
      title: "Laser pigment removal",
      description: "Targeted laser treatment for superficial pigmentation concerns.",
      procedures: [
        proc(
          "laser-pigment-removal",
          "Laser pigment removal",
          "Fixed-price laser session for pigmentation correction.",
          100,
        ),
      ],
    },
    {
      id: "skin-tag-removal",
      title: "Skin tag removal",
      description: "Quick in-clinic removal of benign skin tags—method chosen after assessment.",
      procedures: [
        proc(
          "skin-tag-papilloma-removal-from-50",
          "Skin tag / papilloma removal",
          "Removal of skin tags or papillomas—pricing from €50 after assessment.",
          50,
        ),
      ],
    },
  ],
};
