/**
 * Content model for the landing page.
 * Section keys align with future next-intl namespaces (e.g. messages.nav, messages.hero).
 */

export interface ContentLink {
  label: string;
  href: string;
}

export interface NavContent {
  links: ContentLink[];
  cta: ContentLink;
}

export interface HeroImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: ContentLink;
  secondaryCta: ContentLink;
  image: HeroImage;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  description: string;
  stats: AboutStat[];
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServicesCategoryPreview {
  id: string;
  title: string;
  description: string;
  href: string;
}

export interface ServicesGoalPreview {
  id: string;
  title: string;
  href: string;
}

export interface ServicesContent {
  eyebrow: string;
  title: string;
  description: string;
  categories: ServicesCategoryPreview[];
  goals: ServicesGoalPreview[];
  cta: ContentLink;
}

export interface GalleryContent {
  eyebrow: string;
  title: string;
  instagramUrl: string;
}

export interface ReviewItem {
  quote: string;
  authorName: string;
  authorRole?: string;
}

export interface ReviewsContent {
  eyebrow: string;
  title: string;
  items: ReviewItem[];
}

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  isDefaultOpen?: boolean;
}

export interface FAQContent {
  eyebrow: string;
  title: string;
  description?: string;
  items: FAQItem[];
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  description: string;
  phone: string;
  email: string;
  address: string;
}

export interface FooterLegal {
  notice: string;
  links: ContentLink[];
}

export interface FooterContent {
  tagline: string;
  links: ContentLink[];
  legal: FooterLegal;
}

export interface LandingContent {
  nav: NavContent;
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  gallery: GalleryContent;
  reviews: ReviewsContent;
  faq: FAQContent;
  contact: ContactContent;
  footer: FooterContent;
}
