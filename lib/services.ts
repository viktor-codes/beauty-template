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
        src: "/peel.webp",
        alt: "Skincare products and towels in a calm setting",
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
        src: "/injection.webp",
        alt: "Clean clinical aesthetic setting for injectables",
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
        {
          id: "collagen-stimulators",
          title: "Collagen stimulators",
          description:
            "Biostimulatory injectables designed to activate your own collagen remodeling. Results develop gradually and look natural—ideal for firmness, skin quality, and subtle structural support.",
          image: {
            src: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Clinical aesthetic tools and neutral tones",
            width: 1000,
            height: 1000,
          },
          procedures: [
            {
              id: "radiesse-1-5ml-lidocaine",
              title: "Radiesse 1.5 ml (with lidocaine)",
              description:
                "A calcium hydroxylapatite (CaHA) biostimulator that provides immediate support and promotes collagen remodeling over time. Often used to improve firmness and contour with long-lasting, natural-looking results.",
              image: {
                src: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Minimal medical aesthetic setup",
                width: 900,
                height: 900,
              },
              price: { amount: 350, currency: "EUR" },
            },
            {
              id: "radiesse-flash",
              title: "Radiesse FLASH",
              description:
                "A Radiesse-based protocol focused on collagen stimulation and skin quality improvement. Recommended when the goal is visible firmness and refined texture without a “filled” look.",
              image: {
                src: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Clean clinic setting with medical tools",
                width: 900,
                height: 900,
              },
              price: { amount: 350, currency: "EUR" },
            },
            {
              id: "sculptra-plla",
              title: "Sculptra (PLLA)",
              description:
                "A poly-L-lactic acid (PLLA) collagen stimulator that works gradually over weeks to months. Ideal for improving firmness and volume loss in a subtle way, with results designed to build naturally over time.",
              image: {
                src: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Aesthetic injectable treatment concept",
                width: 900,
                height: 900,
              },
              price: { amount: 500, currency: "EUR" },
            },
            {
              id: "lenisna-6ml",
              title: "Lenisna 6 ml",
              description:
                "A biostimulatory treatment aimed at improving skin quality and supporting firmer-looking tissue. Best for clients seeking gradual, natural-looking improvement in texture and elasticity.",
              image: {
                src: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Aesthetic medical setting with soft light",
                width: 900,
                height: 900,
              },
              price: { amount: 500, currency: "EUR" },
            },
            {
              id: "juvelook-eye-2ml",
              title: "Juvelook Eye 2 ml",
              description:
                "A targeted collagen-stimulating protocol designed for delicate under-eye skin quality concerns such as crepiness and fine lines. Treatment planning prioritizes safety for this sensitive area.",
              image: {
                src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Close-up skincare concept for eye area",
                width: 900,
                height: 900,
              },
              price: { amount: 250, currency: "EUR" },
            },
            {
              id: "nythia-5ml",
              title: "Nythia 5 ml",
              description:
                "A biostimulatory option selected to improve skin density and overall quality. Designed for clients who want a refreshed look that builds gradually.",
              image: {
                src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Minimal skincare concept for skin renewal",
                width: 900,
                height: 900,
              },
              price: { amount: 250, currency: "EUR" },
            },
            {
              id: "revacoll-dmae-5ml",
              title: "Revacoll + DMAE 5 ml",
              description:
                "A firming-focused injectable protocol designed to support skin tone and elasticity. Best for clients seeking a subtle tightening effect paired with improved skin feel.",
              image: {
                src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Clinical skincare concept image",
                width: 900,
                height: 900,
              },
              price: { amount: 250, currency: "EUR" },
            },
            {
              id: "lennea-booster-pdrn",
              title: "Lennea Booster (PDRN)",
              description:
                "A regenerative “skin booster” style treatment focused on improving hydration, texture, and barrier support. Often chosen when the goal is healthier-looking skin rather than volume.",
              image: {
                src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Skincare regeneration concept",
                width: 900,
                height: 900,
              },
              price: { amount: 250, currency: "EUR" },
            },
          ],
        },
        {
          id: "biorevitalisation",
          title: "Biorevitalisation",
          description:
            "Hydrating and regenerative injectables (often hyaluronic acid and skin boosters) aimed at improving elasticity, glow, and comfort. Ideal for dryness, fine lines, and “tired” skin.",
          image: {
            src: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Skincare hydration concept with serum",
            width: 1000,
            height: 1000,
          },
          procedures: [
            {
              id: "profhilo-2ml",
              title: "Profhilo 2 ml",
              description:
                "A high-concentration hyaluronic acid injectable designed for deep hydration and skin “bio-remodeling.” It spreads evenly to improve firmness and glow rather than creating focal volume.",
              image: {
                src: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Hydrating serum bottle on neutral background",
                width: 900,
                height: 900,
              },
              price: { amount: 200, currency: "EUR" },
            },
            {
              id: "exosomes",
              title: "Exosomes",
              description:
                "A regenerative-focused protocol designed to support skin recovery and overall quality, often used to enhance texture and radiance. Best suited for clients aiming for gradual, skin-health-first improvement.",
              image: {
                src: "https://images.unsplash.com/photo-1556228724-4b3a8f2a9b55?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Clinical skincare products on a clean surface",
                width: 900,
                height: 900,
              },
              price: { amount: 160, currency: "EUR" },
            },
            {
              id: "aquashine-ptx",
              title: "Aquashine PTX",
              description:
                "A skin booster-style injectable designed to support hydration, elasticity, and a smoother-looking surface. Often chosen for glow and fine-line softening with minimal downtime.",
              image: {
                src: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Skincare bottles representing hydration treatment",
                width: 900,
                height: 900,
              },
              price: { amount: 160, currency: "EUR" },
            },
            {
              id: "rejuaran-i-eyes",
              title: "Reguran I (Eyes)",
              description:
                "A polynucleotide (PN/PDRN-style) eye-area protocol focused on improving skin quality, hydration, and fine lines in delicate periorbital skin. Planned conservatively for safety around the eyes.",
              image: {
                src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Under-eye skincare concept",
                width: 900,
                height: 900,
              },
              price: { amount: 160, currency: "EUR" },
            },
            {
              id: "rejuaran-s",
              title: "Reguran S",
              description:
                "A polynucleotide-based regenerative protocol often chosen for improving texture and the look of post-acne marks and unevenness. Supports skin repair pathways with a skin-quality focus.",
              image: {
                src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Skincare regeneration concept image",
                width: 900,
                height: 900,
              },
              price: { amount: 160, currency: "EUR" },
            },
            {
              id: "rejuaran-hb-plus",
              title: "Reguran HB Plus",
              description:
                "A combined regeneration + hydration protocol designed to improve skin comfort and glow. Suitable for dryness and early fine lines when the goal is healthier-looking, more resilient skin.",
              image: {
                src: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Hydration-focused skincare concept",
                width: 900,
                height: 900,
              },
              price: { amount: 170, currency: "EUR" },
            },
            {
              id: "rejuaran-healer",
              title: "Reguran Healer",
              description:
                "A polynucleotide-based skin booster designed for overall skin quality: hydration, elasticity, and a smoother-looking texture. Results build gradually across sessions.",
              image: {
                src: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Skin healing and hydration concept",
                width: 900,
                height: 900,
              },
              price: { amount: 180, currency: "EUR" },
            },
            {
              id: "neauvia-hydra-deluxe",
              title: "Neauvia Hydra Deluxe",
              description:
                "A hydration-first skin booster designed to improve softness, glow, and skin comfort. Ideal for dehydrated, dull, or stressed skin that needs a visible refresh.",
              image: {
                src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Bright skincare setup symbolizing hydration",
                width: 900,
                height: 900,
              },
              price: { amount: 120, currency: "EUR" },
            },
            {
              id: "hyalual-1-1-2-2",
              title: "Hyalual 1.1% / 2.2%",
              description:
                "Hyaluronic-acid-based biorevitalization designed to improve hydration and elasticity. Concentration and protocol are selected based on skin needs and desired intensity.",
              image: {
                src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Hyaluronic hydration skincare concept",
                width: 900,
                height: 900,
              },
              price: { amount: 160, currency: "EUR" },
            },
            {
              id: "plinest",
              title: "Plinest / Plinest Eye",
              description:
                "A polynucleotide-based regenerative protocol aimed at improving skin density and quality. Often chosen for fine lines, texture refinement, and delicate areas (including the eye area with an appropriate protocol).",
              image: {
                src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Delicate skincare concept for eye area",
                width: 900,
                height: 900,
              },
              price: { amount: 160, currency: "EUR" },
            },
            {
              id: "nucleofill-20-25",
              title: "Nucleofill 20 / 25",
              description:
                "A biorevitalization protocol designed to support hydration and skin quality with a regenerative approach. Best for clients seeking a natural-looking refresh and improved elasticity.",
              image: {
                src: "https://images.unsplash.com/photo-1556228724-4b3a8f2a9b55?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Clinical skincare products representing skin boosters",
                width: 900,
                height: 900,
              },
              price: { amount: 180, currency: "EUR" },
            },
            {
              id: "mesowharton",
              title: "MesoWharton",
              description:
                "An injectable skin rejuvenation protocol designed to support elasticity and overall skin quality over a course of sessions. Commonly planned as a series to build cumulative improvement.",
              image: {
                src: "https://images.unsplash.com/photo-1556228724-4b3a8f2a9b55?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Clinical skincare setting for injectable protocols",
                width: 900,
                height: 900,
              },
              price: { amount: 190, currency: "EUR" },
            },
            {
              id: "mesoxanthin",
              title: "MesoXanthin",
              description:
                "A course-based injectable protocol focused on improving the look of tone, radiance, and early signs of aging. Designed for gradual, natural-looking enhancement of skin quality.",
              image: {
                src: "https://images.unsplash.com/photo-1556228724-4b3a8f2a9b55?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Aesthetic injection concept for skin quality",
                width: 900,
                height: 900,
              },
              price: { amount: 190, currency: "EUR" },
            },
            {
              id: "mesoeye",
              title: "MesoEye",
              description:
                "An eye-area focused protocol designed to support hydration and improve the look of fine lines and tiredness around the eyes. Planned as a series for best results.",
              image: {
                src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Eye-area skincare and rejuvenation concept",
                width: 900,
                height: 900,
              },
              price: { amount: 190, currency: "EUR" },
            },
            {
              id: "mesosculpt",
              title: "Mesosculpt",
              description:
                "A mesotherapy-style protocol used to support skin quality and a smoother-looking texture. Treatment planning focuses on gradual improvement over multiple sessions.",
              image: {
                src: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Minimal skincare bottles representing mesotherapy",
                width: 900,
                height: 900,
              },
              price: { amount: 190, currency: "EUR" },
            },
          ],
        },
        {
          id: "mesotherapy-for-hair-loss",
          title: "Mesotherapy for hair loss",
          description:
            "Scalp microinjections of supportive ingredients (vitamins, peptides, and hair-focused actives) designed to nourish follicles and improve the look of density. Best as part of a structured hair plan.",
          image: {
            src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Healthy hair texture and clean beauty concept",
            width: 1000,
            height: 1000,
          },
          procedures: [
            {
              id: "dermaheal-hl",
              title: "Dermaheal HL",
              description:
                "A scalp-focused mesotherapy protocol designed to support hair vitality and reduce the appearance of shedding over time. Often recommended as a course to build cumulative improvement.",
              image: {
                src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Hair and scalp care concept",
                width: 900,
                height: 900,
              },
              price: { amount: 80, currency: "EUR" },
            },
          ],
        },
        {
          id: "plasma-therapy",
          title: "Plasma therapy",
          description:
            "Autologous regenerative treatments using your own blood-derived platelet concentrates to support healing and collagen remodeling. Often chosen for skin quality, texture, and recovery support.",
          image: {
            src: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Clinical setting representing regenerative therapy",
            width: 1000,
            height: 1000,
          },
          procedures: [
            {
              id: "prp",
              title: "PRP",
              description:
                "Platelet-rich plasma therapy: your blood is processed to concentrate platelets and growth factors, then applied or injected to support regeneration. Commonly used to improve texture and support a healthy glow over time.",
              image: {
                src: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Minimal clinical equipment concept",
                width: 900,
                height: 900,
              },
              price: { amount: 80, currency: "EUR" },
            },
            {
              id: "prf",
              title: "PRF",
              description:
                "Platelet-rich fibrin: a next-generation platelet concentrate that forms a natural fibrin matrix and may release growth factors more gradually. Often chosen when a longer regenerative signal is desired.",
              image: {
                src: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Regenerative aesthetic therapy concept",
                width: 900,
                height: 900,
              },
              price: { amount: 90, currency: "EUR" },
            },
          ],
        },
        {
          id: "sclerotherapy",
          title: "Sclerotherapy",
          description:
            "A minimally invasive vein treatment where a sclerosant is injected to close targeted spider veins or small varicose veins. The treated vein gradually fades as blood reroutes to healthier vessels.",
          image: {
            src: "https://images.unsplash.com/photo-1580281657527-47f249e8f9b8?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Minimal medical treatment setting",
            width: 1000,
            height: 1000,
          },
          procedures: [
            {
              id: "sclerotherapy-1-vial",
              title: "1 vial",
              description:
                "In-office sclerotherapy session using one vial of sclerosant, selected based on vein size and pattern. Aftercare typically includes compression and activity guidance to support results.",
              image: {
                src: "https://images.unsplash.com/photo-1580281657527-47f249e8f9b8?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Clinical setting for vein treatment",
                width: 900,
                height: 900,
              },
              price: { amount: 190, currency: "EUR" },
            },
            {
              id: "sclerotherapy-2-vials",
              title: "2 vials",
              description:
                "Extended sclerotherapy session for larger treatment areas or more extensive patterns using two vials. Your plan is based on clinical assessment and expected response.",
              image: {
                src: "https://images.unsplash.com/photo-1580281657527-47f249e8f9b8?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Medical aesthetics concept for sclerotherapy",
                width: 900,
                height: 900,
              },
              price: { amount: 350, currency: "EUR" },
            },
          ],
        },
      ],
    },
    {
      id: "advanced-aesthetic-treatments",
      title: "Advanced aesthetic treatments",
      description:
        "Device-based and advanced clinic treatments designed for tightening, resurfacing, and targeted correction—ideal when you want more visible change with structured protocols.",
      image: {
        src: "/device.webp",
        alt: "Modern aesthetic device in a minimal clinic",
        width: 1200,
        height: 800,
      },
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
          procedures: [
            {
              id: "hifu-face-lift",
              title: "HIFU Face Lift",
              description:
                "A non-surgical tightening treatment that delivers focused ultrasound energy to precise depths (including the SMAS layer). Results build gradually over 8–12 weeks as collagen remodels, with minimal downtime.",
              image: {
                src: "https://images.unsplash.com/photo-1582719478185-2f5b8b6b7b5b?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Aesthetic ultrasound device concept",
                width: 900,
                height: 900,
              },
              price: { amount: 300, currency: "EUR" },
            },
          ],
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
          procedures: [
            {
              id: "rf-microneedling",
              title: "RF Microneedling",
              description:
                "A collagen-induction treatment designed to refine pores, smooth texture, and soften the look of scars and fine lines. Expect short downtime (often redness for 1–3 days) with results improving over weeks.",
              image: {
                src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Microneedling device in a modern clinic",
                width: 900,
                height: 900,
              },
              price: { amount: 125, currency: "EUR" },
            },
            {
              id: "rf-microneedling-exosomes",
              title: "RF Microneedling + Exosomes",
              description:
                "An enhanced protocol pairing RF microneedling with a regenerative-focused step to support recovery and skin quality. Designed for clients who want texture refinement plus an extra glow and comfort boost.",
              image: {
                src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Skin rejuvenation device concept",
                width: 900,
                height: 900,
              },
              price: { amount: 180, currency: "EUR" },
            },
          ],
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
          procedures: [
            {
              id: "skin-tag-papilloma-removal-from-50",
              title: "Skin Tag / Papilloma Removal",
              description:
                "Removal of unwanted skin tags or papillomas with a technique chosen based on size, location, and skin type. Pricing starts from the listed amount after assessment.",
              image: {
                src: "https://images.unsplash.com/photo-1580281658629-34f6a0f2b1d3?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Minimal clinic setting for minor procedure",
                width: 900,
                height: 900,
              },
              price: { amount: 50, currency: "EUR" },
            },
          ],
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
    },
    {
      id: "laser-hair-removal",
      title: "Laser hair removal",
      description:
        "Laser treatments designed to reduce unwanted hair by targeting follicles. Results build over a course of sessions, with protocols tailored to hair thickness, skin tone, and treatment area.",
      image: {
        src: "/laser.webp",
        alt: "Laser treatment room with soft neutral tones",
        width: 1200,
        height: 800,
      },
      subcategories: [
        {
          id: "laser-hair-removal-sets",
          title: "Laser hair removal — sets",
          description:
            "Curated combinations for popular areas to streamline planning and value. Best results come from a course of sessions timed to your hair growth cycle.",
          image: {
            src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Laser hair removal treatment concept",
            width: 1000,
            height: 1000,
          },
          procedures: [
            {
              id: "upper-lip-and-chin",
              title: "Upper Lip & Chin",
              description:
                "A focused set targeting visible facial hair for a cleaner look and smoother feel. Treatment settings are adjusted carefully for facial skin sensitivity.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser treatment concept for facial area",
                width: 900,
                height: 900,
              },
              price: { amount: 40, currency: "EUR" },
            },
            {
              id: "bikini-and-abdominal-line",
              title: "Bikini + Abdominal Line",
              description:
                "A set designed for a neat bikini line and a smoother abdominal line. Comfort measures and a conservative start are used when needed.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal concept for bikini line",
                width: 900,
                height: 900,
              },
              price: { amount: 50, currency: "EUR" },
            },
            {
              id: "underarms-and-full-bikini",
              title: "Underarms + Full Bikini",
              description:
                "A popular set for long-lasting smoothness in high-friction areas. Treatment is planned to reduce irritation and help prevent ingrowns over time.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal concept for underarms",
                width: 900,
                height: 900,
              },
              price: { amount: 60, currency: "EUR" },
            },
            {
              id: "underarms-and-lower-legs",
              title: "Underarms + Lower Legs",
              description:
                "A time-saving set focused on everyday smoothness for underarms and lower legs. Best results are achieved with a planned course and consistent spacing.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal concept for legs",
                width: 900,
                height: 900,
              },
              price: { amount: 80, currency: "EUR" },
            },
            {
              id: "underarms-full-bikini-and-lower-legs",
              title: "Underarms + Full Bikini + Lower Legs",
              description:
                "A comprehensive set for smoother skin across key areas. Your plan is tailored to hair type and skin tone for safety and consistency.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal concept for multiple areas",
                width: 900,
                height: 900,
              },
              price: { amount: 100, currency: "EUR" },
            },
            {
              id: "underarms-full-bikini-and-full-legs",
              title: "Underarms + Full Bikini + Full Legs",
              description:
                "A full-coverage set designed to significantly reduce unwanted hair across underarms, bikini, and legs. Best as a structured course aligned to growth cycles.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal set concept for full legs",
                width: 900,
                height: 900,
              },
              price: { amount: 110, currency: "EUR" },
            },
            {
              id: "full-bikini-and-lower-legs",
              title: "Full Bikini + Lower Legs",
              description:
                "A set focused on smoother bikini area and lower legs. Treatment parameters are adjusted for sensitive areas and comfort.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal concept for bikini and legs",
                width: 900,
                height: 900,
              },
              price: { amount: 90, currency: "EUR" },
            },
            {
              id: "full-bikini-and-full-legs",
              title: "Full Bikini + Full Legs",
              description:
                "A high-value set for smoother bikini area and legs. Recommended as a course for sustained reduction and best long-term result.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal concept for full legs",
                width: 900,
                height: 900,
              },
              price: { amount: 100, currency: "EUR" },
            },
            {
              id: "underarms-and-full-legs",
              title: "Underarms + Full Legs",
              description:
                "A practical set for a consistently smooth feel in underarms and legs. Scheduling is tailored to hair growth cycles for optimal reduction.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal concept for underarms and legs",
                width: 900,
                height: 900,
              },
              price: { amount: 90, currency: "EUR" },
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

