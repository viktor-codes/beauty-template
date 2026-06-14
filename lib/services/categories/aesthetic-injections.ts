import type { ServiceCategory } from "@/lib/types/services";

import { injectionImage } from "@/lib/services/helpers";

export const aestheticInjectionsCategory: ServiceCategory = {
  id: "aesthetic-injections",
  title: "Aesthetic injections",
  description:
    "Injectable treatments aimed at hydration, structure, and skin quality—planned with a natural-result philosophy and an emphasis on safety and anatomy.",
  image: injectionImage,
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
                "An HA-based lip filler choice aimed at improving lip proportions, hydration, and definition. I prioritize subtle, natural volume and a smooth finish.",
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
              id: "combo-dna-i-1-1ml-legacy",
              title: "Combo DNA i 1.1 ml",
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
              id: "combo-dna-f-2-5ml-legacy",
              title: "Combo DNA f 2.5 ml",
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
              id: "plinest-eye-legacy",
              title: "Plinest eye",
              description:
                "Eye-area polynucleotide protocol for periorbital skin quality and fine lines.",
              image: {
                src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Under-eye skincare concept",
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
              id: "prp-extra-hair-legacy",
              title: "PRP extra",
              description:
                "Platelet-rich plasma for scalp support and hair vitality—often planned as a course.",
              image: {
                src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Hair and scalp care concept",
                width: 900,
                height: 900,
              },
              price: { amount: 140, currency: "EUR" },
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
              id: "prp-extra-legacy",
              title: "PRP extra",
              description:
                "Platelet-rich plasma with enhanced processing for regeneration, texture, and skin quality support.",
              image: {
                src: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Minimal clinical equipment concept",
                width: 900,
                height: 900,
              },
              price: { amount: 140, currency: "EUR" },
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
          procedures: [],
        },
      ],
    };
