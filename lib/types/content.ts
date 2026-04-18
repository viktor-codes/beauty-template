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

export interface AboutBrandLogo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  description: string;
  stats: AboutStat[];
  brandsEyebrow: string;
  brandLogos: AboutBrandLogo[];
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

export interface FAQGroup {
  id: string;
  title: string;
  subtitle?: string;
  items: FAQItem[];
}

export interface FAQContent {
  eyebrow: string;
  title: string;
  description?: string;
  introBullets?: string[];
  groups?: FAQGroup[];
  items: FAQItem[];
}

/** Drives which Phosphor icon renders for a messenger row. */
export type ContactMessengerId = "telegram" | "whatsapp" | "instagram";

export interface ContactMessengerLink {
  id: ContactMessengerId;
  href: string;
  ariaLabel: string;
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  phoneLabel: string;
  emailLabel: string;
  /** Heading above the address line (e.g. studio name). */
  locationTitle: string;
  messengers: ContactMessengerLink[];
}

export interface FooterLegal {
  notice: string;
  links: ContentLink[];
}

export interface FooterLinkGroup {
  heading: string;
  links: ContentLink[];
}

export interface FooterContactBlock {
  heading: string;
  phone: ContentLink;
  email: ContentLink;
  /** Plain address line (no HTML). */
  address: string;
  /** Optional maps / directions URL. */
  directionsHref?: string;
  directionsLabel?: string;
}

export interface FooterDeveloperCredit {
  /** Text before the linked brand name. */
  lead: string;
  /** Linked studio / brand label. */
  brandLabel: string;
  /** Text after the link. */
  tail: string;
  /** Destination URL (e.g. portfolio). */
  href: string;
}

export interface FooterContent {
  brandTitle: string;
  tagline: string;
  navigation: FooterLinkGroup;
  services: FooterLinkGroup;
  contact: FooterContactBlock;
  social: FooterLinkGroup;
  legal: FooterLegal;
  /** Optional bottom credit line with link to designer/dev site. */
  developerCredit?: FooterDeveloperCredit;
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
