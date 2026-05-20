import type { FAQGroup } from "@/lib/types/content";

export const faqGroupsEn = [
  {
    id: "faq-group-planning",
    title: "Planning & expectations",
    subtitle:
      "How I choose treatments, what “realistic” means, and how courses are structured.",
    items: [
      {
        id: "faq-how-do-i-choose-the-right-treatment",
        question: "How do I choose the right treatment for my skin goals?",
        answer:
          "I start with a consultation and a quick skin assessment (concerns, sensitivities, medical history, downtime preferences, and your timeline). From there, I recommend the smallest effective plan—often a combination of professional treatments plus a simple home routine (especially daily SPF).",
        isDefaultOpen: true,
      },
      {
        id: "faq-what-results-can-i-realistically-expect",
        question: "What results can I realistically expect—and how fast?",
        answer:
          "Some treatments give an immediate “fresh” glow (facials, carbon peel). Collagen-stimulating procedures (HIFU, RF microneedling, collagen stimulators) build gradually—typically over weeks to a few months. Your results depend on baseline skin condition, consistency (courses matter), and aftercare (sun protection is critical).",
      },
      {
        id: "faq-how-many-sessions-do-i-need",
        question: "How many sessions will I need?",
        answer:
          "It depends on the concern and the treatment intensity. Many skin-quality protocols are planned as a course (commonly 3–6 sessions) with maintenance. During consultation, I’ll outline a schedule with milestones so you know what to expect and when.",
      },
    ],
  },
  {
    id: "faq-group-peels",
    title: "Peels & resurfacing",
    subtitle: "Safety, downtime, and the prep rules that prevent bad outcomes.",
    items: [
      {
        id: "faq-are-chemical-peels-safe",
        question: "Are chemical peels safe? What is the downtime?",
        answer:
          "When performed by trained professionals, peels are generally safe—but the recovery depends on peel depth. Light peels can have mild redness and flaking for a few days. Medium/deeper peels may involve more noticeable peeling and longer recovery. Post-peel care and strict sun avoidance during healing are essential to reduce the risk of pigmentation issues and scarring.",
      },
      {
        id: "faq-can-i-get-a-peel-if-i-use-retinol-or-acne-medications",
        question:
          "Can I get a peel if I use retinoids, acids, or acne medications?",
        answer:
          "Possibly, but your routine may need a short pause to protect your skin barrier and reduce irritation. If you’ve used isotretinoin (Accutane) recently, certain resurfacing procedures may be postponed. I’ll give you a simple pre- and post-care plan tailored to your current skincare and medications.",
      },
      {
        id: "faq-cold-sores-and-treatments",
        question:
          "I get cold sores. Can I still do peels, lip fillers, or microneedling?",
        answer:
          "Yes, but please tell me in advance. Some procedures can trigger a herpes flare in people with a history of cold sores. In many cases, prophylactic antiviral medication is recommended. I’ll guide you based on your history and the treatment area.",
      },
    ],
  },
  {
    id: "faq-group-injectables",
    title: "Injectables & biostimulation",
    subtitle: "Natural-looking planning, real risks, and how options differ.",
    items: [
      {
        id: "faq-filler-safety-and-risks",
        question: "How safe are dermal fillers? What are the real risks?",
        answer:
          "Most side effects are temporary (swelling, bruising, tenderness). The rare but most serious risk is accidental injection into a blood vessel, which can cause skin injury and, in extreme cases, vision problems. This is why provider training, anatomy knowledge, and an emergency protocol matter. Hyaluronic acid fillers are reversible with hyaluronidase if needed.",
      },
      {
        id: "faq-lip-filler-natural-look",
        question:
          "Will lip fillers look natural? Can you avoid the 'overfilled' look?",
        answer:
          "Yes. My approach prioritizes proportion, symmetry, and soft definition. I can build gradually over multiple visits if you want a subtle change. Temporary swelling right after treatment can make lips look larger for a few days before settling.",
      },
      {
        id: "faq-collagen-stimulators-vs-ha-fillers",
        question: "Collagen stimulators vs. HA fillers: what’s the difference?",
        answer:
          "HA fillers primarily add immediate volume and definition. Collagen stimulators are designed to trigger your body’s collagen remodeling, so results are more gradual and tend to look very natural. Which one is right depends on whether you need structure now, skin quality improvement over time, or both.",
      },
      {
        id: "faq-prp-vs-prf",
        question: "PRP vs. PRF: what’s the difference?",
        answer:
          "Both use your own blood-derived platelets to support regeneration. PRP is typically a platelet-rich plasma with a faster release of growth factors. PRF forms a fibrin matrix and may release growth factors more gradually. I recommend based on the area, your goals, and recovery preferences.",
      },
    ],
  },
  {
    id: "faq-group-devices",
    title: "Device treatments",
    subtitle: "What it feels like, and what “no downtime” really means.",
    items: [
      {
        id: "faq-hifu-what-it-feels-like",
        question: "Does HIFU hurt and when will I see results?",
        answer:
          "Sensation varies: many people feel warmth, tingling, or brief discomfort during pulses. There’s usually no downtime. Some tightening can be subtle at first, with the most noticeable change commonly appearing over 8–12 weeks as collagen remodels.",
      },
      {
        id: "faq-rf-microneedling-downtime",
        question: "What is the downtime for RF microneedling?",
        answer:
          "Expect redness and mild swelling similar to a sunburn for about 1–3 days (sometimes longer depending on intensity). Makeup is usually paused for at least 24–48 hours. Texture and tone improvements build over time, with collagen-driven changes typically developing over the following months.",
      },
    ],
  },
  {
    id: "faq-group-laser-veins",
    title: "Laser hair removal & veins",
    subtitle: "Courses, prep, and what changes after treatment day.",
    items: [
      {
        id: "faq-laser-hair-removal-sessions",
        question: "How many laser hair removal sessions do I need?",
        answer:
          "Hair grows in cycles, so a course is required to target follicles effectively. The exact number depends on the area, hair thickness/color, and hormonal factors. I’ll set expectations and spacing during consultation to keep results consistent and safe.",
      },
      {
        id: "faq-laser-hair-removal-prep",
        question: "How should I prepare for laser hair removal?",
        answer:
          "Typically: shave the area before your appointment, avoid tanning/sunburn, and skip waxing/epilators before sessions (they remove the follicle the laser targets). I’ll provide a precise prep checklist for your areas and skin type.",
      },
      {
        id: "faq-sclerotherapy-what-to-expect",
        question: "What should I expect after sclerotherapy?",
        answer:
          "It’s usually an in-office procedure with quick recovery. Compression stockings are commonly recommended for a short period, and walking is encouraged. Results are not instant—spider veins often fade over weeks, and larger veins may take longer. A series may be needed depending on the pattern and vein size.",
      },
    ],
  },
  {
    id: "faq-group-safety",
    title: "Safety & when to wait",
    subtitle: "Non-negotiables that protect your skin and your results.",
    items: [
      {
        id: "faq-when-not-to-book",
        question: "When should I postpone treatment?",
        answer:
          "Please postpone if you’re unwell, have an active skin infection, open wounds in the treatment area, a fresh sunburn, or an uncontrolled flare of a skin condition. If you’re pregnant or breastfeeding, some procedures and ingredients may not be recommended—tell me and I’ll suggest safer options.",
      },
    ],
  },
] satisfies FAQGroup[];

export const faqItemsEn = faqGroupsEn.flatMap((group) => group.items);
