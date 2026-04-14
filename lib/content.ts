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
      src: "/newera.png",
      alt: "Calm treatment room with natural light and minimal decor",
      width: 920,
      height: 1170,
    },
  },
  about: {
    eyebrow: "About the studio",
    title: "Where expertise meets a gentle touch",
    description:
      "We focus on skin health, natural-looking outcomes, and clear expectations from the first visit. Every plan is tailored to your goals, schedule, and comfort level.",
    stats: [
      { value: "10+", label: "Years of practice" },
      { value: "2.5k+", label: "Treatments performed" },
      { value: "4.9", label: "Average client rating" },
    ],
  },
  services: {
    eyebrow: "What we offer",
    title: "Treatments designed around you",
    description:
      "From maintenance facials to advanced protocols—always explained in plain language, always optional add-ons, never pressure.",
    items: [
      {
        title: "Skin analysis & consultation",
        description:
          "A full assessment and a roadmap so you know what to expect, when, and why.",
      },
      {
        title: "Facial treatments",
        description:
          "Deep cleansing, hydration, and glow-focused protocols for everyday radiance.",
      },
      {
        title: "Peels & renewal",
        description:
          "Controlled exfoliation to refine texture and even tone with careful aftercare.",
      },
      {
        title: "Body care",
        description:
          "Targeted rituals for smooth, nourished skin beyond the face.",
      },
    ],
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
