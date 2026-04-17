import type { ServicesCatalog } from "@/lib/types/services";

export const servicesCatalog: ServicesCatalog = {
  id: "services",
  title: "Services",
  description:
    "Dermatology-informed treatments designed to improve skin quality, restore balance, and support natural-looking results.",
  categories: [
    {
      id: "aesthetic-treatments",
      title: "Aesthetic treatments",
      description:
        "Non-invasive and minimally invasive treatments focused on texture, clarity, and glow—ideal for ongoing skin maintenance and targeted correction.",
      image: {
        src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&h=800&q=80",
        alt: "Soft, clean skincare setting",
        width: 1200,
        height: 800,
      },
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
            {
              id: "prx-t33",
              title: "PRX-T33",
              description:
                "A next-generation TCA-based “biorevitalizing” peel (commonly described as 33% TCA combined with hydrogen peroxide) designed to stimulate regeneration with minimal visible peeling. Often chosen for glow, texture refinement, and early laxity with little downtime.",
              image: {
                src: "https://images.unsplash.com/photo-1556228724-4b3a8f2a9b55?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Skincare bottles with a clean clinical feel",
                width: 900,
                height: 900,
              },
              price: { amount: 100, currency: "EUR" },
            },
            {
              id: "obagi-blue-peel-4-layers",
              title: "Obagi Blue Peel (4 layers)",
              description:
                "A TCA-based peel applied in multiple coats to control depth. Helps refine tone, texture, and the look of photodamage—peeling typically starts after a couple of days and recovery guidance is provided to protect results.",
              image: {
                src: "https://images.unsplash.com/photo-1556228724-4b3a8f2a9b55?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Close-up of skincare droppers and bottles",
                width: 900,
                height: 900,
              },
              price: { amount: 80, currency: "EUR" },
            },
            {
              id: "carbon-peel",
              title: "Carbon Peel",
              description:
                "Also known as a “Hollywood peel”: a carbon lotion is applied and then activated with a laser to deeply cleanse the pores and gently exfoliate. Popular for oily or congested skin and for a quick, event-ready glow with minimal downtime.",
              image: {
                src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Aesthetic skincare setting with soft light",
                width: 900,
                height: 900,
              },
              price: { amount: 80, currency: "EUR" },
            },
            {
              id: "extractions-plus-obagi-peel",
              title: "Extractions + Obagi Peel",
              description:
                "A combined treatment pairing professional extractions with a controlled peel for clearer-looking pores and a smoother surface. Best for congestion-prone skin that needs both purification and refinement in one visit.",
              image: {
                src: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Professional skincare tools and products",
                width: 900,
                height: 900,
              },
              price: { amount: 80, currency: "EUR" },
            },
          ],
        },
      ],
    },
    {
      id: "aesthetic-injections",
      title: "Aesthetic injections",
      description:
        "Injectable treatments aimed at hydration, structure, and skin quality—planned with a natural-result philosophy and an emphasis on safety and anatomy.",
      image: {
        src: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=1200&h=800&q=80",
        alt: "Minimal medical aesthetic setting",
        width: 1200,
        height: 800,
      },
      subcategories: [
        {
          id: "lip-fillers",
          title: "Lip fillers",
          description:
            "Hyaluronic acid (HA) fillers designed to enhance lip shape, definition, and volume while keeping proportions balanced. Results are immediate; swelling is temporary and typically settles within days.",
          image: {
            src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Aesthetic consultation and clean clinic environment",
            width: 1000,
            height: 1000,
          },
          procedures: [
            {
              id: "stylage-m",
              title: "Stilage M",
              description:
                "An HA-based filler option selected for natural-looking enhancement and definition. The approach is tailored to your anatomy to improve symmetry and restore softness without an overfilled appearance.",
              image: {
                src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Minimal clinic scene for injectable aesthetics",
                width: 900,
                height: 900,
              },
              price: { amount: 200, currency: "EUR" },
            },
            {
              id: "neuramis-deep",
              title: "Neuramis Deep",
              description:
                "An HA-based filler used to build soft structure and volume. Ideal for clients who want a refined, hydrated look with careful attention to lip border and balance.",
              image: {
                src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Clean clinical environment for injectables",
                width: 900,
                height: 900,
              },
              price: { amount: 180, currency: "EUR" },
            },
            {
              id: "sypha",
              title: "Sypha",
              description:
                "An HA-based lip filler choice aimed at improving lip proportions, hydration, and definition. We prioritize subtle, natural volume and a smooth finish.",
              image: {
                src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Aesthetic medicine workspace",
                width: 900,
                height: 900,
              },
              price: { amount: 200, currency: "EUR" },
            },
          ],
        },
      ],
    },
  ],
};

export function getServicesCategory(slug: string) {
  return servicesCatalog.categories.find((c) => c.id === slug) ?? null;
}

export function getServicesSubcategory(categorySlug: string, subcategorySlug: string) {
  const category = getServicesCategory(categorySlug);
  if (!category) return null;
  return category.subcategories.find((s) => s.id === subcategorySlug) ?? null;
}

export function getServicesProcedure(
  categorySlug: string,
  subcategorySlug: string,
  procedureSlug: string,
) {
  const subcategory = getServicesSubcategory(categorySlug, subcategorySlug);
  if (!subcategory) return null;
  return subcategory.procedures.find((p) => p.id === procedureSlug) ?? null;
}

