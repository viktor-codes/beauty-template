/**
 * Single-locale landing copy. Replace with next-intl message loaders later;
 * keep `LandingContent` as the source-of-truth shape (mirrors future JSON namespaces).
 */

import type { FAQGroup, LandingContent } from "@/lib/types/content";

const INSTAGRAM_PROFILE_HREF =
  "https://www.instagram.com/innache.aesthetic.nurse/";

const landingFaqGroups = [
  {
    id: "faq-group-planning",
    title: "Planning & expectations",
    subtitle: "How I choose treatments, what “realistic” means, and how courses are structured.",
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

const landingFaqItemsAll = landingFaqGroups.flatMap((group) => group.items);

export const content = {
  nav: {
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Gallery", href: "#gallery" },
      { label: "Reviews", href: "#reviews" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Book a consultation", href: "#contact" },
  },
  hero: {
    eyebrow: "Skinbar · Inna Chernovol",
    title: "Confidence that shows in every reflection",
    subtitle:
      "I personalize every treatment plan in a calm space—results you can see without the hard sell.",
    primaryCta: { label: "Book a consultation", href: "#contact" },
    secondaryCta: { label: "View services", href: "#services" },
    image: {
      src: "/hero.webp",
      alt: "Calm treatment room with natural light and minimal decor",
      width: 920,
      height: 1170,
    },
  },
  about: {
    eyebrow: "About Inna",
    title: "Skinbar by Inna Chernovol",
    description:
      "Welcome to Skinbar by Inna Chernovol, where your goals are my priority.\n\nWith over 15 years of experience, I specialize in aesthetic treatments that help you feel rejuvenated and confident. Whether it’s enhancing your lips or providing advanced laser treatments, I offer personalized care using high-quality products to ensure your safety, comfort, and effective results.\n\nI’ll build a personalized plan with you for your unique beauty journey.",
    stats: [
      { value: "15+", label: "Years of practice" },
      { value: "2.5k+", label: "Treatments performed" },
      { value: "4.9", label: "Average client rating" },
    ],
    brandsEyebrow: "Trusted brands I work with",
    brandLogos: [
      { src: "/logos/esse.png", alt: "Esse", width: 140, height: 44 },
      { src: "/logos/jan-marini.png", alt: "Jan Marini", width: 140, height: 44 },
      { src: "/logos/obagi.png", alt: "Obagi", width: 140, height: 44 },
      { src: "/logos/is-clinical.png", alt: "Is Clinical", width: 140, height: 44 },
      { src: "/logos/zo.png", alt: "ZO Skin Health", width: 140, height: 44 },
      { src: "/logos/elemis.png", alt: "Elemis", width: 140, height: 44 },
    ],
  },
  services: {
    eyebrow: "What I offer",
    title: "Treatments designed around you",
    description:
      "From maintenance facials to advanced protocols—I explain everything in plain language, optional add-ons only, never pressure.",
    categories: [
      {
        id: "services-category-skin",
        title: "Skin & maintenance",
        description:
          "Facials, peels, and skin-first protocols chosen for clarity, glow, and long-term balance.",
        href: "/services/aesthetic-treatments",
      },
      {
        id: "services-category-injections",
        title: "Injectables (natural results)",
        description:
          "Hydration, collagen support, and subtle structure—planned conservatively and safely.",
        href: "/services/aesthetic-injections",
      },
      {
        id: "services-category-advanced",
        title: "Advanced clinic treatments",
        description:
          "Device-based tightening and resurfacing when you want more visible change with a protocol.",
        href: "/services/advanced-aesthetic-treatments",
      },
      {
        id: "services-category-laser",
        title: "Laser hair removal",
        description:
          "Course-based sessions tailored to hair type and skin tone for consistent, comfortable results.",
        href: "/services/laser-hair-removal",
      },
    ],
    goals: [
      { id: "goal-glow", title: "Glow", href: "/services?goal=glow" },
      { id: "goal-texture", title: "Texture", href: "/services?goal=texture" },
      { id: "goal-acne", title: "Acne control", href: "/services?goal=acne" },
      {
        id: "goal-pigmentation",
        title: "Pigmentation",
        href: "/services?goal=pigmentation",
      },
      {
        id: "goal-firmness",
        title: "Firmness",
        href: "/services?goal=firmness",
      },
      { id: "goal-hair", title: "Hair loss", href: "/services?goal=hair" },
    ],
    cta: { label: "View all services", href: "/services" },
  },
  gallery: {
    eyebrow: "Results & mood",
    title: "A glimpse inside Skinbar",
    instagramUrl: INSTAGRAM_PROFILE_HREF,
  },
  reviews: {
    eyebrow: "Client voices",
    title: "What people say after their visits",
    items: [
      {
        quote:
          "I am absolutely glowing! Inna, I had to share this with you. A few days after my biorevitalization, my skin feels completely reborn. My friends keep commenting on how much the texture has smoothed out and how lifted my face looks. I feel so refreshed and confident. Can't wait for my next session this autumn!",
        authorName: "Verified client",
        authorRole: "Biorevitalization & glow",
      },
      {
        quote:
          "A true professional and a wonderful person. It's rare to find such a perfect balance of deep expertise and genuine care. Inna is not just a master of her craft; she truly understands what your skin needs. I'm so happy to have finally found my go-to aesthetician!",
        authorName: "Verified client",
        authorRole: "Professionalism & personal touch",
      },
      {
        quote:
          "Skin like silk. Thank you so much for the amazing work! My skin feels like silk after the carbon peeling. And that lip treatment you recommended? You were absolutely right — I'm officially obsessed. See you again very soon!",
        authorName: "Verified client",
        authorRole: "Carbon peeling & lips",
      },
      {
        quote:
          "Baby-soft skin, zero pain. The PRX-T33 treatment is a game-changer. My skin feels as soft as a baby's. It's the perfect solution for a quick glow-up before an event without any downtime or discomfort. So happy with the results!",
        authorName: "Verified client",
        authorRole: "PRX-T33 peeling",
      },
      {
        quote:
          "My skin is literally radiant. I am so impressed with the Esse products! My skin has never looked this bright and healthy. Everything you and I chose works so well together. It's clear you only select the highest quality cosmetics for your clients.",
        authorName: "Verified client",
        authorRole: "Esse skincare results",
      },
      {
        quote:
          "Efficient and painless. I am so satisfied with the results of my laser hair removal sessions. It's completely painless and highly effective. Inna makes the whole process so comfortable. Highly recommend to anyone looking for smooth skin for the summer!",
        authorName: "Verified client",
        authorRole: "Laser hair removal",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "FAQ — before you book",
    description:
      "Clear, evidence-informed answers to the questions clients ask before booking.",
    introBullets: [
      "Pick a topic—open only what you need.",
      "Courses, downtime, and safety rules are grouped so nothing important gets buried.",
      "If you’re unsure, start with Planning & expectations, then jump to your treatment category.",
    ],
    groups: landingFaqGroups,
    items: landingFaqItemsAll,
  },
  contact: {
    eyebrow: "Get in touch",
    title: "I’m one message away",
    description:
      "Call, email, or use the form—I reply within one business day.",
    phone: "+1 (555) 010-0199",
    email: "hello@studio.example.com",
    address: "120 Beauty Lane, Suite 4, New York, NY 10001",
  },
  footer: {
    tagline: "Skinbar · Inna Chernovol · thoughtful care, visible results",
    links: [
      { label: "Instagram", href: INSTAGRAM_PROFILE_HREF },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
    legal: {
      notice: "© 2026 Inna Chernovol · Skinbar. All rights reserved.",
      links: [
        { label: "Privacy policy", href: "#" },
        { label: "Terms of use", href: "#" },
      ],
    },
  },
} satisfies LandingContent;

export type { LandingContent } from "@/lib/types/content";
