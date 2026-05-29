import type { ServiceCategory } from "@/lib/types/services";

import { deviceImage, injectionImage, proc } from "@/lib/services/helpers";

export const cosmetologyCategory: ServiceCategory = {
  id: "cosmetology",
  title: "Cosmetology",
  description:
    "Injectable and device-led cosmetology protocols—from neuromodulators and contouring to biostimulators, biorevitalisation, and targeted correction.",
  image: injectionImage,
  subcategories: [
    {
      id: "hifu-face-lift",
      title: "HIFU face lift",
      description:
        "Non-surgical ultrasound lifting that targets deeper support layers for gradual firmness and lift.",
      procedures: [
        proc(
          "hifu-face-lift",
          "HIFU Face Lift",
          "High-intensity focused ultrasound (HIFU) stimulates collagen remodeling in the SMAS layer. Results build over 8–12 weeks with minimal downtime.",
          300,
        ),
      ],
    },
    {
      id: "botox",
      title: "Botox",
      description:
        "Neuromodulator treatments to soften expression lines and address targeted concerns—planned for natural movement.",
      procedures: [
        proc(
          "botox-full-face",
          "Botox — full face",
          "Full-face neuromodulator protocol to soften dynamic lines while keeping expression natural.",
          400,
        ),
        proc(
          "botox-3-zones",
          "Botox — 3 zones",
          "Three-area protocol (commonly forehead, frown, and crow's feet)—ideal for a refreshed, balanced look.",
          200,
        ),
        proc(
          "botox-2-zones",
          "Botox — 2 zones",
          "Two-area protocol tailored to your primary concern areas.",
          170,
        ),
        proc(
          "botox-1-zone",
          "Botox — 1 zone",
          "Single-area treatment for focused correction.",
          100,
        ),
        proc(
          "botox-hyperhidrosis",
          "Botox — hyperhidrosis",
          "Targeted protocol to reduce excessive sweating in treated areas.",
          250,
        ),
      ],
    },
    {
      id: "face-contouring",
      title: "Face contouring",
      description:
        "Hyaluronic acid contouring to restore structure, balance proportions, and support natural-looking definition.",
      procedures: [
        proc("revolax-1ml", "Revolax 1 ml", "HA contouring for subtle structure and balance.", 200),
        proc("revolax-2ml", "Revolax 2 ml", "Extended HA contouring for more visible structural support.", 350),
        proc("revolax-3ml", "Revolax 3 ml", "Comprehensive HA contouring session.", 410),
        proc(
          "algeness-1-5ml-contouring",
          "Algeness 1.5 ml",
          "Natural-origin filler for soft contour and skin quality support.",
          350,
        ),
        proc("algeness-3ml", "Algeness 3 ml", "Larger-volume Algeness contouring protocol.", 500),
      ],
    },
    {
      id: "lip-fillers",
      title: "Lip fillers",
      description:
        "Lip enhancement with HA fillers—shape, definition, and hydration with balanced proportions.",
      procedures: [
        proc(
          "stylage-m",
          "Stylage M",
          "HA lip filler selected for definition and natural-looking volume.",
          220,
        ),
        proc(
          "revolax-lips",
          "Revolax",
          "HA lip enhancement focused on symmetry, border definition, and soft volume.",
          200,
        ),
        proc(
          "regenovue-deep",
          "Regenovue deep",
          "HA filler for structure and volume with a smooth, natural finish.",
          200,
        ),
        proc(
          "lips-with-strips",
          "Lips with strips — full protocol",
          "Complete lip protocol including strips for enhanced shaping and support—priced as a full treatment.",
          300,
        ),
      ],
    },
    {
      id: "wrinkle-augmentation",
      title: "Augmentation of wrinkles",
      description:
        "Targeted HA correction for fine lines and delicate areas requiring soft, precise placement.",
      procedures: [
        proc(
          "belotero-soft-1ml",
          "Belotero soft 1 ml",
          "Soft HA designed for fine lines and delicate skin zones.",
          250,
        ),
        proc(
          "revolax-1ml-wrinkles",
          "Revolax 1 ml",
          "HA correction for visible lines and subtle volume support.",
          200,
        ),
      ],
    },
    {
      id: "plla-vector-lifting",
      title: "PLLA — vector face lifting",
      description:
        "Poly-L-lactic acid biostimulation for gradual firmness and vector lifting over a treatment course.",
      procedures: [
        proc(
          "elastifill-6ml",
          "ElastiFill 6 ml",
          "PLLA-based protocol supporting firmer-looking skin and structural lift over time.",
          500,
        ),
        proc(
          "lenisna-6ml",
          "Lenisna 6 ml",
          "Biostimulatory PLLA protocol for skin density and elasticity.",
          500,
        ),
        proc(
          "juvelook-eye-2ml",
          "Juvelook Eyes 2 ml",
          "Targeted PLLA protocol for delicate periorbital skin quality.",
          250,
        ),
      ],
    },
    {
      id: "collagen-stimulators",
      title: "Collagen stimulators",
      description:
        "Biostimulatory injectables that activate your own collagen remodeling for firmer, healthier-looking skin.",
      procedures: [
        proc(
          "radiesse-1-5ml-lidocaine",
          "Radiesse 1.5 ml (with lidocaine)",
          "CaHA biostimulator for support and long-term collagen remodeling.",
          350,
        ),
        proc(
          "algeness-1-5ml-collagen",
          "Algeness 1.5 ml",
          "Natural-origin biostimulator supporting skin quality and structure.",
          350,
        ),
        proc(
          "revacoll-prp-extra-11ml",
          "REVACOLL+ PRP extra 11 ml",
          "Combined regenerative protocol with PRP extra for skin renewal and density.",
          350,
        ),
        proc(
          "revacoll-dmae-5ml",
          "REVACOLL+ DMAE 5 ml",
          "Firming-focused protocol supporting tone and elasticity.",
          250,
        ),
        proc(
          "revacoll-ha-5ml",
          "REVACOLL+ HA 5 ml",
          "Hydration and skin quality support with hyaluronic components.",
          250,
        ),
        proc(
          "lennea-booster-pdrn",
          "Lennea Booster (PDRN)",
          "Regenerative booster for hydration, texture, and barrier support.",
          250,
        ),
      ],
    },
    {
      id: "biorevitalisation",
      title: "Biorevitalisation",
      description:
        "Skin boosters and HA protocols for hydration, glow, and elasticity—ideal for tired or dehydrated skin.",
      procedures: [
        proc(
          "profhilo-2ml",
          "Profhilo 2 ml",
          "High-concentration HA bio-remodeling for firmness and radiance.",
          200,
        ),
        proc(
          "aquashine-ptx",
          "Aquashine PTX",
          "Skin booster for hydration, elasticity, and fine-line softening.",
          160,
        ),
        proc(
          "hyalual-1-1",
          "Hyalual 1.1%",
          "HA biorevitalisation at 1.1% concentration.",
          160,
        ),
        proc(
          "hyalual-2-2",
          "Hyalual 2.2%",
          "HA biorevitalisation at 2.2% concentration.",
          160,
        ),
        proc("plinest", "Plinest", "Polynucleotide protocol for skin density and quality.", 160),
        proc(
          "aqualight-monaco-2ml",
          "Aqualight cocktail Monaco 2 ml",
          "Brightening hydration cocktail for glow and comfort.",
          160,
        ),
        proc(
          "pure-skin-3ml",
          "Pure skin 3 ml",
          "Skin quality booster supporting clarity and hydration.",
          140,
        ),
        proc(
          "exopeptide-5ml",
          "ExoPeptide 5 ml",
          "Peptide-rich regenerative protocol for texture and radiance.",
          160,
        ),
        proc(
          "combo-dna-f-2-5ml",
          "Combo DNA f 2.5 ml",
          "Polynucleotide + HA protocol for regeneration and glow.",
          170,
        ),
      ],
    },
    {
      id: "treatments-under-eyes",
      title: "Treatments under eyes",
      description:
        "Delicate periorbital protocols for hydration, fine lines, and tired-looking under-eye skin.",
      procedures: [
        proc("plinest-eye", "Plinest eye", "Eye-area polynucleotide protocol for skin quality.", 160),
        proc(
          "mesoten-eye-3ml",
          "Mesoten eye 3 ml",
          "Targeted mesotherapy-style protocol for the under-eye area.",
          160,
        ),
        proc(
          "combo-dna-i-1-1ml",
          "Combo DNA i 1.1 ml",
          "Polynucleotide eye protocol for hydration and fine lines.",
          150,
        ),
      ],
    },
    {
      id: "mesotherapy-for-hair-loss",
      title: "Mesotherapy for hair loss",
      description:
        "Scalp microinjections to support follicle health and improve the look of density over a course.",
      procedures: [
        proc(
          "prp-extra-hair",
          "PRP extra",
          "Platelet-rich plasma for scalp regeneration and hair vitality support.",
          140,
        ),
        proc(
          "dermaheal-hl",
          "Dermaheal HL",
          "Scalp mesotherapy cocktail for shedding and density support.",
          90,
        ),
      ],
    },
    {
      id: "sclerotherapy",
      title: "Sclerotherapy",
      description:
        "Injection treatment for spider veins and small varicose veins—the vessel fades as blood reroutes.",
      procedures: [
        proc(
          "sclerotherapy-1-vial",
          "1 vial",
          "Sclerotherapy session using one vial of sclerosant.",
          200,
        ),
        proc(
          "sclerotherapy-2-vials",
          "2 vials",
          "Extended session for larger areas using two vials.",
          360,
        ),
      ],
    },
    {
      id: "plasma-therapy",
      title: "Plasma therapy",
      description:
        "Autologous PRP and PRF protocols for regeneration, texture, and skin quality.",
      procedures: [
        proc(
          "prp-extra-plasma",
          "PRP extra",
          "Platelet-rich plasma processed for enhanced growth-factor concentration.",
          140,
        ),
        proc(
          "prf",
          "PRF",
          "Platelet-rich fibrin for gradual regenerative signaling.",
          90,
        ),
      ],
    },
    {
      id: "rf-microneedling-and-dermapen",
      title: "RF microneedling & Dermapen",
      description:
        "Collagen-induction and RF protocols for texture, pores, and skin renewal—with optional exosomes.",
      image: deviceImage,
      procedures: [
        proc(
          "rf-microneedling",
          "RF microneedling",
          "Radiofrequency microneedling for texture, pores, and fine lines.",
          150,
        ),
        proc(
          "rf-microneedling-exosomes",
          "RF microneedling + exosomes",
          "Enhanced RF protocol with exosomes for recovery and glow.",
          200,
        ),
        proc(
          "dermapen",
          "Dermapen",
          "Microneedling collagen induction with minimal downtime.",
          100,
        ),
        proc(
          "dermapen-exosomes",
          "Dermapen + exosomes",
          "Microneedling paired with exosomes for regeneration support.",
          150,
        ),
      ],
    },
    {
      id: "lipolytics",
      title: "Lipolytics",
      description: "Injectable fat-dissolving protocols for targeted body contour support.",
      procedures: [
        proc(
          "dermaheal-ll-5ml",
          "Dermaheal LL 5 ml",
          "Lipolytic mesotherapy cocktail for localized fat reduction support.",
          100,
        ),
      ],
    },
  ],
};
