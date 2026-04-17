/**
 * Single-locale landing copy. Replace with next-intl message loaders later;
 * keep `LandingContent` as the source-of-truth shape (mirrors future JSON namespaces).
 */

import type { LandingContent } from "@/lib/types/content";

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
    eyebrow: "Cosmetology studio",
    title: "Confidence that shows in every reflection",
    subtitle:
      "Personalized treatments, calm atmosphere, and results you can see—without the hard sell.",
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
    title: "The Skinbar by Inna Chernovol",
    description:
      "Welcome to The Skinbar by Inna Chernovol, where fulfilling your beauty goals is our priority.\n\nWith over 15 years of experience, I specialize in aesthetic treatments that help you feel rejuvenated and confident. Whether it’s enhancing your lips or providing advanced laser treatments, I offer personalized care using high-quality products to ensure your safety, comfort, and effective results.\n\nTogether, we can create a personalized plan for your unique beauty journey.",
    stats: [
      { value: "15+", label: "Years of practice" },
      { value: "2.5k+", label: "Treatments performed" },
      { value: "4.9", label: "Average client rating" },
    ],
  },
  services: {
    eyebrow: "What we offer",
    title: "Treatments designed around you",
    description:
      "From maintenance facials to advanced protocols—always explained in plain language, always optional add-ons, never pressure.",
    categories: [
      {
        id: "services-category-skin",
        title: "Skin & maintenance",
        description:
          "Facials, peels, and skin-first protocols chosen for clarity, glow, and long-term balance.",
        href: "/services",
      },
      {
        id: "services-category-injections",
        title: "Injectables (natural results)",
        description:
          "Hydration, collagen support, and subtle structure—planned conservatively and safely.",
        href: "/services",
      },
      {
        id: "services-category-advanced",
        title: "Advanced clinic treatments",
        description:
          "Device-based tightening and resurfacing when you want more visible change with a protocol.",
        href: "/services",
      },
      {
        id: "services-category-laser",
        title: "Laser hair removal",
        description:
          "Course-based sessions tailored to hair type and skin tone for consistent, comfortable results.",
        href: "/services",
      },
    ],
    goals: [
      { id: "goal-glow", title: "Glow", href: "/services" },
      { id: "goal-texture", title: "Texture", href: "/services" },
      { id: "goal-acne", title: "Acne control", href: "/services" },
      { id: "goal-pigmentation", title: "Pigmentation", href: "/services" },
      { id: "goal-firmness", title: "Firmness", href: "/services" },
      { id: "goal-hair", title: "Hair loss", href: "/services" },
    ],
    cta: { label: "View all services", href: "/services" },
  },
  gallery: {
    eyebrow: "Results & mood",
    title: "A glimpse inside the studio",
    instagramUrl: "https://www.instagram.com/",
  },
  reviews: {
    eyebrow: "Client voices",
    title: "What people say after their visits",
    items: [
      {
        quote:
          "Clear explanations, zero rush, and my skin has never looked this even.",
        authorName: "Alex M.",
        authorRole: "First-time peel client",
      },
      {
        quote:
          "Finally a place that listens. The plan felt personal, not like a template.",
        authorName: "Jordan K.",
      },
      {
        quote:
          "Calm space, steady hands, and results I still notice months later.",
        authorName: "Sam R.",
        authorRole: "Facial series",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions we hear often",
    items: [
      {
        question: "How do I prepare for my first visit?",
        answer:
          "Arrive with clean skin, avoid strong retinoids 48–72 hours before unless we say otherwise, and bring a list of products you use daily.",
      },
      {
        question: "Is there downtime after treatments?",
        answer:
          "It depends on the protocol. We always outline downtime, sun care, and what to skip before events.",
      },
      {
        question: "Do you offer packages?",
        answer:
          "Yes—bundles are optional and explained upfront. You can start with a single session and decide later.",
      },
    ],
  },
  contact: {
    eyebrow: "Get in touch",
    title: "We are one message away",
    description:
      "Call, email, or use the form—we reply within one business day.",
    phone: "+1 (555) 010-0199",
    email: "hello@studio.example.com",
    address: "120 Beauty Lane, Suite 4, New York, NY 10001",
  },
  footer: {
    tagline: "Cosmetology studio · thoughtful care, visible results",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
    legal: {
      notice: "© 2026 Studio Example. All rights reserved.",
      links: [
        { label: "Privacy policy", href: "#" },
        { label: "Terms of use", href: "#" },
      ],
    },
  },
} satisfies LandingContent;

export type { LandingContent } from "@/lib/types/content";
