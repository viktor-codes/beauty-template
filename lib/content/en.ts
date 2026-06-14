import type { LandingContent } from "@/lib/types/content";

import { contactFormCopyByLocale } from "./contact-form-copy";
import { faqGroupsEn, faqItemsEn } from "./faq/en";
import {
  brandLogos,
  heroImage,
  INSTAGRAM_PROFILE_HREF,
  studioContact,
} from "./shared";

export const enLandingContent = {
  nav: {
    links: [
      { label: "About", href: "#about" },
      { label: "Treatments", href: "/treatments" },
      { label: "Gallery", href: "#gallery" },
      { label: "Reviews", href: "#reviews" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: { label: "Consultation", href: "#contact" },
  },
  hero: {
    eyebrow: "The Skinbar · Inna Chernovol",
    title: "Confidence that shows in every reflection",
    subtitle:
      "I personalise every treatment plan in a calm space—results you can see without the hard sell.",
    primaryCta: { label: "Book a Consultation", href: "#contact" },
    secondaryCta: { label: "View treatments", href: "/treatments" },
    image: {
      ...heroImage,
      alt: "Calm treatment room with natural light and minimal decor",
    },
  },
  about: {
    eyebrow: "About Inna",
    title: "The Skinbar by Inna Chernovol",
    description:
      "Welcome to The Skinbar by Inna Chernovol, where your goals are my priority.\n\nWith over 15 years of experience, I specialize in aesthetic treatments that help you feel rejuvenated and confident. Whether it’s enhancing your lips or providing advanced laser treatments, I offer personalised care using high-quality products to ensure your safety, comfort, and effective results.\n\nI’ll build a personalised plan with you for your unique beauty journey.",
    stats: [
      { value: "15+", label: "Years of practice" },
      { value: "2.5k+", label: "Treatments performed" },
      { value: "4.9", label: "Average client rating" },
    ],
    brandsEyebrow: "Trusted brands I work with",
    brandLogos: [...brandLogos],
  },
  services: {
    eyebrow: "What I offer",
    title: "Treatments designed around you",
    description:
      "From facials to advanced protocols—I explain everything in plain language. Ethical, evidence-based recommendations with zero obligation.",
    categories: [
      {
        id: "services-category-cosmetology",
        title: "Cosmetology",
        description:
          "Injectables, biostimulators, biorevitalisation, and device-led protocols for face and skin.",
        href: "/treatments/cosmetology",
        featuredInNav: true,
      },
      {
        id: "services-category-body",
        title: "Body treatment",
        description:
          "CRYO and Emsculpt for body contour and muscle tone.",
        href: "/treatments/body-treatment",
        featuredInNav: true,
      },
      {
        id: "services-category-vitamins",
        title: "Vitamin shots",
        description:
          "Intramuscular vitamin injections for energy, immunity, and skin support.",
        href: "/treatments/vitamin-shots",
        featuredInNav: true,
      },
      {
        id: "services-category-blood",
        title: "Blood tests",
        description:
          "Wellness and fertility panels to guide personalised treatment planning.",
        href: "/treatments/blood-tests",
        featuredInNav: true,
      },
      {
        id: "services-category-skin",
        title: "Facials & peels",
        description:
          "Jan Marini facials and clinician-controlled peels for clarity, glow, and balance.",
        href: "/treatments/aesthetic-treatments",
      },
      {
        id: "services-category-injections",
        title: "Injectables",
        description:
          "Hydration, collagen support, and subtle structure—planned conservatively and safely.",
        href: "/treatments/aesthetic-injections",
        featuredInNav: true,
      },
      {
        id: "services-category-advanced",
        title: "Advanced clinic treatments",
        description:
          "Device-based tightening and resurfacing when you want more visible change with a protocol.",
        href: "/treatments/advanced-aesthetic-treatments",
      },
      {
        id: "services-category-laser",
        title: "Laser hair removal",
        description:
          "Course-based sessions tailored to hair type and skin tone for consistent, comfortable results.",
        href: "/treatments/laser-hair-removal",
      },
    ],
    goalsHeading: "or choose by your concern",
    goals: [
      { id: "goal-glow", title: "Glow", href: "/treatments/concerns/glow" },
      {
        id: "goal-texture",
        title: "Texture",
        href: "/treatments/concerns/texture",
      },
      { id: "goal-acne", title: "Acne control", href: "/treatments/concerns/acne" },
      {
        id: "goal-pigmentation",
        title: "Pigmentation",
        href: "/treatments/concerns/pigmentation",
      },
      {
        id: "goal-firmness",
        title: "Firmness",
        href: "/treatments/concerns/firmness",
      },
      { id: "goal-hair", title: "Hair loss", href: "/treatments/concerns/hair" },
    ],
    cta: { label: "View all treatments", href: "/treatments" },
  },
  gallery: {
    eyebrow: "Results & mood",
    title: "A glimpse inside The Skinbar",
    instagramUrl: INSTAGRAM_PROFILE_HREF,
  },
  reviews: {
    eyebrow: "Client voices",
    title: "What people say after their visits",
    viewOnInstagramLabel: "View on Instagram",
    items: [
      {
        quote:
          "I am absolutely glowing! Inna, I had to share this with you. A few days after my biorevitalisation, my skin feels completely reborn. My friends keep commenting on how much the texture has smoothed out and how lifted my face looks. I feel so refreshed and confident. Can't wait for my next session this autumn!",
        authorName: "Verified client",
        authorRole: "Biorevitalisation & glow",
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
          "My skin is literally radiant. I am so impressed with the Esse products! My skin has never looked this radiant and healthy. Everything you and I chose works so well together. It's clear you only select the highest quality skincare lines/products for your clients.",
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
    nextStep: {
      eyebrow: "Next step",
      title: "Still deciding?",
      description:
        "Share your goal, timeline, and downtime preference—I’ll narrow options quickly in consultation.",
    },
    groups: faqGroupsEn,
    items: faqItemsEn,
  },
  contactForm: contactFormCopyByLocale.en,
  contact: {
    eyebrow: "Get in touch",
    title: "Schedule Your Visit",
    description:
      "Call, email, or use the form — contact me in a way that's convenient for you.",
    phone: studioContact.phone,
    email: studioContact.email,
    address: studioContact.address,
    directionsHref: studioContact.directionsHref,
    phoneLabel: "Phone",
    emailLabel: "Email",
    locationTitle: "The Skinbar · Inna Chernovol",
    messengers: [
      {
        id: "telegram",
        href: studioContact.telegramHref,
        ariaLabel: "Open Telegram",
      },
      {
        id: "whatsapp",
        href: studioContact.whatsappHref,
        ariaLabel: "Open WhatsApp",
      },
      {
        id: "instagram",
        href: INSTAGRAM_PROFILE_HREF,
        ariaLabel: "Open Instagram",
      },
    ],
  },
  footer: {
    brandTitle: "The Skinbar · Inna Chernovol",
    tagline:
      "Thoughtful care, visible results — personalised aesthetic treatments in a calm studio setting.",
    navigation: {
      heading: "Navigate",
      links: [
        { label: "About", href: "/#about" },
        { label: "Treatments", href: "/treatments" },
        { label: "Gallery", href: "/#gallery" },
        { label: "Reviews", href: "/#reviews" },
        { label: "FAQ", href: "/#faq" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    services: {
      heading: "Main categories",
      links: [
        { label: "Cosmetology", href: "/treatments/cosmetology" },
        { label: "Body treatment", href: "/treatments/body-treatment" },
        { label: "Facials & peels", href: "/treatments/aesthetic-treatments" },
        { label: "Blood tests", href: "/treatments/blood-tests" },
        { label: "All treatments", href: "/treatments" },
      ],
    },
    contact: {
      heading: "Studio",
      phone: { label: studioContact.phone, href: studioContact.phoneTelHref },
      email: {
        label: studioContact.email,
        href: `mailto:${studioContact.email}`,
      },
      address: studioContact.address,
      directionsHref: studioContact.directionsHref,
      directionsLabel: "Directions",
    },
    social: {
      heading: "Follow",
      links: [{ label: "Instagram", href: INSTAGRAM_PROFILE_HREF }],
    },
    legal: {
      notice: "© 2026 Inna Chernovol · The Skinbar. All rights reserved.",
      links: [
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms of use", href: "/terms" },
      ],
    },
    developerCredit: {
      lead: "Design & build — ",
      brandLabel: "RuraMade",
      tail: " · independent digital studio.",
      href: "https://ruramade.dev",
    },
  },
} satisfies LandingContent;
