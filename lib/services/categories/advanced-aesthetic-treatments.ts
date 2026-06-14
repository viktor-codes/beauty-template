import type { ServiceCategory } from "@/lib/types/services";

import { deviceImage } from "@/lib/services/helpers";

export const advancedAestheticTreatmentsCategory: ServiceCategory = {
  id: "advanced-aesthetic-treatments",
  title: "Advanced aesthetic treatments",
  description:
    "Device-based and advanced clinic treatments designed for tightening, resurfacing, and targeted correction—ideal when you want more visible change with structured protocols.",
  image: deviceImage,
      subcategories: [
        {
          id: "hifu-face-lift",
          title: "HIFU face lift",
          description:
            "High-intensity focused ultrasound (HIFU) targets deeper support layers to stimulate collagen remodeling and improve the look of lift and firmness over time—without needles or downtime.",
          image: {
            src: "https://images.unsplash.com/photo-1582719478185-2f5b8b6b7b5b?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Modern aesthetic device in a clinic",
            width: 1000,
            height: 1000,
          },
          procedures: [],
        },
        {
          id: "rf-microneedling",
          title: "RF microneedling",
          description:
            "Radiofrequency microneedling combines controlled microchannels with heat-based stimulation to support collagen and elastin. Popular for pores, texture, fine lines, and acne-scar appearance.",
          image: {
            src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Clinic equipment for skin rejuvenation",
            width: 1000,
            height: 1000,
          },
          procedures: [],
        },
        {
          id: "black-doll-facial-carbon-peel",
          title: "Black Doll Facial (carbon peel)",
          description:
            "A laser-activated carbon peel designed to cleanse pores and gently resurface the skin. Popular for oil control, smoother texture, and a brighter-looking complexion with minimal downtime.",
          image: {
            src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Bright clinical skincare setting",
            width: 1000,
            height: 1000,
          },
          procedures: [
            {
              id: "black-doll-facial",
              title: "Black Doll Facial (Carbon Peel)",
              description:
                "A gentle laser carbon peel that helps remove surface buildup, reduce the look of congestion, and refine pores. Ideal as a “reset” treatment for oily or combination skin and for a quick radiance boost.",
              image: {
                src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Aesthetic skincare scene for carbon peel",
                width: 900,
                height: 900,
              },
              price: { amount: 80, currency: "EUR" },
            },
          ],
        },
        {
          id: "skin-tag-papilloma-removal",
          title: "Skin tag / papilloma removal",
          description:
            "A quick in-clinic procedure to remove benign skin tags or papillomas. Method and aftercare are selected to support clean healing and a smooth finish.",
          image: {
            src: "https://images.unsplash.com/photo-1580281658629-34f6a0f2b1d3?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Clinical consultation setting",
            width: 1000,
            height: 1000,
          },
          procedures: [],
        },
        {
          id: "laser-tattoo-pmu-removal",
          title: "Laser tattoo / PMU removal",
          description:
            "Laser sessions designed to break down pigment so it can be cleared gradually by the body. Used for tattoos and permanent makeup (PMU), with protocols adjusted for pigment depth and skin type.",
          image: {
            src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Laser device concept in a clinic",
            width: 1000,
            height: 1000,
          },
          procedures: [
            {
              id: "laser-tattoo-pmu-removal",
              title: "Laser Tattoo / PMU Removal",
              description:
                "A precise laser treatment that targets pigment while protecting surrounding tissue. A series of sessions is typically needed; your plan depends on pigment type, depth, and area.",
              image: {
                src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Clinic laser equipment close-up",
                width: 900,
                height: 900,
              },
              price: { amount: 100, currency: "EUR" },
            },
          ],
        },
      ],
    };
