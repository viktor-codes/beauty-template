import type { AppLocale } from "@/i18n/routing";
import type {
  ContentLink,
  FAQGroup,
  FAQItem,
  HeroContent,
  LandingContent,
} from "@/lib/types/content";

function toSlug(id: string | undefined) {
  if (!id?.trim()) return undefined;
  return { _type: "slug" as const, current: id.trim() };
}

function mapLink(link: ContentLink) {
  return { _type: "contentLink" as const, label: link.label, href: link.href };
}

function mapHero(hero: HeroContent) {
  return {
    _type: "landingHeroSection" as const,
    eyebrow: hero.eyebrow,
    title: hero.title,
    subtitle: hero.subtitle,
    primaryCtaLabel: hero.primaryCta.label,
    secondaryCtaLabel: hero.secondaryCta.label,
    primaryCtaHref: hero.primaryCta.href,
    secondaryCtaHref: hero.secondaryCta.href,
  };
}

function mapFaqItem(item: FAQItem) {
  return {
    _type: "faqItem" as const,
    id: toSlug(item.id),
    question: item.question,
    answer: item.answer,
    isDefaultOpen: item.isDefaultOpen ?? false,
  };
}

function mapFaqGroup(group: FAQGroup) {
  return {
    _type: "faqGroup" as const,
    id: toSlug(group.id),
    title: group.title,
    subtitle: group.subtitle,
    items: group.items.map(mapFaqItem),
  };
}

/** Maps static LandingContent into a Sanity landingPage document (no image assets). */
export function mapLandingContentToSanityDocument(
  locale: AppLocale,
  content: LandingContent,
) {
  return {
    _id: `landingPage-${locale}`,
    _type: "landingPage" as const,
    language: locale,
    nav: {
      _type: "landingNavSection" as const,
      links: content.nav.links.map(mapLink),
      cta: mapLink(content.nav.cta),
    },
    hero: mapHero(content.hero),
    about: {
      _type: "landingAboutSection" as const,
      eyebrow: content.about.eyebrow,
      title: content.about.title,
      description: content.about.description,
      stats: content.about.stats.map((s) => ({
        _type: "aboutStat" as const,
        value: s.value,
        label: s.label,
      })),
      brandsEyebrow: content.about.brandsEyebrow,
    },
    services: {
      _type: "landingServicesSection" as const,
      eyebrow: content.services.eyebrow,
      title: content.services.title,
      description: content.services.description,
      goals: content.services.goals.map((g) => ({
        _type: "servicesGoalPreview" as const,
        id: g.id,
        title: g.title,
        href: g.href,
      })),
      cta: mapLink(content.services.cta),
    },
    gallery: {
      _type: "landingGallerySection" as const,
      eyebrow: content.gallery.eyebrow,
      title: content.gallery.title,
      instagramUrl: content.gallery.instagramUrl,
    },
    reviews: {
      _type: "landingReviewsSection" as const,
      eyebrow: content.reviews.eyebrow,
      title: content.reviews.title,
      items: content.reviews.items.map((r) => ({
        _type: "reviewItem" as const,
        quote: r.quote,
        authorName: r.authorName,
        authorRole: r.authorRole,
      })),
    },
    faq: {
      _type: "landingFaqSection" as const,
      eyebrow: content.faq.eyebrow,
      title: content.faq.title,
      description: content.faq.description,
      introBullets: content.faq.introBullets,
      groups: content.faq.groups?.map(mapFaqGroup),
      items: content.faq.items.map(mapFaqItem),
    },
    contact: {
      _type: "landingContactSection" as const,
      eyebrow: content.contact.eyebrow,
      title: content.contact.title,
      description: content.contact.description,
      phone: content.contact.phone,
      email: content.contact.email,
      address: content.contact.address,
      phoneLabel: content.contact.phoneLabel,
      emailLabel: content.contact.emailLabel,
      locationTitle: content.contact.locationTitle,
      messengers: content.contact.messengers.map((m) => ({
        _type: "contactMessenger" as const,
        id: m.id,
        href: m.href,
        ariaLabel: m.ariaLabel,
      })),
    },
    footer: {
      _type: "landingFooterSection" as const,
      brandTitle: content.footer.brandTitle,
      tagline: content.footer.tagline,
      navigation: {
        _type: "footerLinkGroup" as const,
        heading: content.footer.navigation.heading,
        links: content.footer.navigation.links.map(mapLink),
      },
      services: {
        _type: "footerLinkGroup" as const,
        heading: content.footer.services.heading,
        links: content.footer.services.links.map(mapLink),
      },
      contact: {
        _type: "footerContactBlock" as const,
        heading: content.footer.contact.heading,
        phone: mapLink(content.footer.contact.phone),
        email: mapLink(content.footer.contact.email),
        address: content.footer.contact.address,
        directionsHref: content.footer.contact.directionsHref,
        directionsLabel: content.footer.contact.directionsLabel,
      },
      social: {
        _type: "footerLinkGroup" as const,
        heading: content.footer.social.heading,
        links: content.footer.social.links.map(mapLink),
      },
      legal: {
        _type: "footerLegal" as const,
        notice: content.footer.legal.notice,
        links: content.footer.legal.links.map(mapLink),
      },
    },
  };
}
