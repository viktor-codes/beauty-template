import type { ServiceCategory } from "@/lib/types/services";

import { peelImage, proc } from "@/lib/services/helpers";

export const aestheticTreatmentsCategory: ServiceCategory = {
  id: "aesthetic-treatments",
  title: "Facials & peels",
  description:
    "Non-invasive treatments focused on texture, clarity, and glow—professional facials and clinician-controlled peels.",
  image: peelImage,
      subcategories: [
        {
          id: "facials",
          title: "Facials",
          description:
            "Professional, medical-grade facials that gently exfoliate, hydrate, and refine tone—selected based on your skin goals (clarity, brightness, acne control, or visible aging).",
          image: {
            src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Facial treatment products and towels",
            width: 1000,
            height: 1000,
          },
          procedures: [
            {
              id: "jan-marini-enzyme-facial",
              title:
                "Jan Marini Enzyme Facial (Proteolytic Enzyme Treatment)",
              description:
                "A gentle enzymatic resurfacing facial that helps lift dull surface buildup without the intensity of a classic acid peel. Great for smoothing texture, improving radiance, and supporting a polished look with minimal irritation.",
              image: {
                src: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Clean aesthetic facial treatment scene",
                width: 900,
                height: 900,
              },
              price: { amount: 80, currency: "EUR" },
            },
            {
              id: "jan-marini-retinol-plus-facial",
              title: "Jan Marini Retinol Plus Facial",
              description:
                "A retinol-focused treatment designed to support smoother-looking skin and a more even tone over time. Ideal for dullness, uneven texture, and visible fine lines—best when paired with consistent SPF and a tailored home routine.",
              image: {
                src: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Skincare serum on a minimal background",
                width: 900,
                height: 900,
              },
              price: { amount: 100, currency: "EUR" },
            },
            {
              id: "jan-marini-clarify-facial",
              title: "Jan Marini Clarify Facial (Acne / Blemish Control)",
              description:
                "A clarifying facial aimed at reducing congestion and supporting clearer-looking skin. Helps address excess oil, blocked pores, and post-blemish dullness with a balanced approach that respects the skin barrier.",
              image: {
                src: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Skincare treatment tools laid out neatly",
                width: 900,
                height: 900,
              },
              price: { amount: 90, currency: "EUR" },
            },
            {
              id: "jan-marini-illuminate-facial",
              title:
                "Jan Marini Illuminate Facial (Brightening & Pigmentation)",
              description:
                "A brightening facial focused on improving the look of uneven tone and dullness. Supports a more luminous complexion by combining gentle resurfacing with targeted brightening steps.",
              image: {
                src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Bright, airy skincare workspace",
                width: 900,
                height: 900,
              },
              price: { amount: 90, currency: "EUR" },
            },
            {
              id: "jan-marini-age-intervention-facial",
              title: "Jan Marini Age Intervention Facial (Anti-Aging)",
              description:
                "A corrective facial designed to support firmer-looking skin and soften the appearance of fine lines. Combines professional-grade actives with barrier-friendly hydration for a refreshed, rested look.",
              image: {
                src: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Luxury skincare product on neutral tones",
                width: 900,
                height: 900,
              },
              price: { amount: 90, currency: "EUR" },
            },
            {
              id: "jan-marini-c-esta-vitamin-c-facial",
              title: "Jan Marini C-ESTA Vitamin C Facial",
              description:
                "An antioxidant-focused facial to support glow, visible brightness, and an even-looking complexion. Vitamin C-based steps help defend against oxidative stress while enhancing radiance.",
              image: {
                src: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Vitamin C skincare bottle on a light background",
                width: 900,
                height: 900,
              },
              price: { amount: 90, currency: "EUR" },
            },
          ],
        },
        {
          id: "chemical-peels",
          title: "Chemical peels",
          description:
            "Clinician-controlled exfoliation using acids to improve texture and tone. Peels can help soften the look of fine lines, reduce congestion, and brighten—depth is chosen based on your skin and downtime preferences.",
          image: {
            src: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Minimal skincare bottles on a shelf",
            width: 1000,
            height: 1000,
          },
          procedures: [
            {
              id: "tca-35",
              title: "TCA 35%",
              description:
                "A medium-depth trichloroacetic acid peel designed for more noticeable resurfacing. Helps improve the look of texture irregularities, uneven tone, and fine lines—downtime and peeling are expected and discussed in advance.",
              image: {
                src: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Clinical skincare bottles and droppers",
                width: 900,
                height: 900,
              },
              price: { amount: 150, currency: "EUR" },
            },
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
      ],
    };
