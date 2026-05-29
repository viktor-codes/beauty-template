import type {
  ContactContent,
  ContactMessengerId,
  ContactMessengerLink,
  ContentLink,
  FooterContactBlock,
  FooterContent,
  FooterDeveloperCredit,
  FooterLegal,
  FooterLinkGroup,
  NavContent,
} from "@/lib/types/content";

import type { SanitySiteSettingsLike } from "@/lib/sanity/mappers/site-settings";

export interface SanityContentLinkLike {
  label?: string;
  href?: string;
}

export interface SanityNavLike {
  links?: SanityContentLinkLike[] | null;
  cta?: SanityContentLinkLike | null;
}

export interface SanityFooterLinkGroupLike {
  heading?: string;
  links?: SanityContentLinkLike[] | null;
}

export interface SanityContactMessengerLike {
  id?: string;
  href?: string;
  ariaLabel?: string;
}

export interface SanityContactLike {
  eyebrow?: string;
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  phoneLabel?: string;
  emailLabel?: string;
  locationTitle?: string;
  messengers?: SanityContactMessengerLike[] | null;
}

export interface SanityFooterContactLike {
  heading?: string;
  phone?: SanityContentLinkLike | null;
  email?: SanityContentLinkLike | null;
  address?: string;
  directionsHref?: string;
  directionsLabel?: string;
}

export interface SanityFooterDeveloperCreditLike {
  lead?: string;
  brandLabel?: string;
  tail?: string;
  href?: string;
}

export interface SanityFooterLike {
  brandTitle?: string;
  tagline?: string;
  navigation?: SanityFooterLinkGroupLike | null;
  services?: SanityFooterLinkGroupLike | null;
  contact?: SanityFooterContactLike | null;
  social?: SanityFooterLinkGroupLike | null;
  legal?: {
    notice?: string;
    links?: SanityContentLinkLike[] | null;
  } | null;
  developerCredit?: SanityFooterDeveloperCreditLike | null;
}

export function mapContentLinkSafe(
  raw: SanityContentLinkLike | null | undefined,
  fallback: ContentLink,
): ContentLink {
  const label = raw?.label?.trim();
  const href = raw?.href?.trim();
  if (!label || !href) return fallback;
  return { label, href };
}

function mapLinkGroupSafe(
  raw: SanityFooterLinkGroupLike | null | undefined,
  fallback: FooterLinkGroup,
): FooterLinkGroup {
  if (!raw?.links?.length) return fallback;

  const links = raw.links
    .map((link, index) => mapContentLinkSafe(link, fallback.links[index] ?? fallback.links[0]))
    .filter((link) => link.label && link.href);

  return {
    heading: raw.heading?.trim() || fallback.heading,
    links: links.length > 0 ? links : fallback.links,
  };
}

function mapDeveloperCreditSafe(
  raw: SanityFooterDeveloperCreditLike | null | undefined,
  fallback?: FooterDeveloperCredit,
): FooterDeveloperCredit | undefined {
  if (!raw?.brandLabel?.trim() || !raw.href?.trim()) return fallback;
  return {
    lead: raw.lead?.trim() ?? fallback?.lead ?? "",
    brandLabel: raw.brandLabel.trim(),
    tail: raw.tail?.trim() ?? fallback?.tail ?? "",
    href: raw.href.trim(),
  };
}

function mergeContactContentWithSettings(
  contact: ContactContent,
  settings: SanitySiteSettingsLike | null | undefined,
): ContactContent {
  if (!settings) return contact;

  const phone = settings.phone?.trim();
  const email = settings.email?.trim();
  const address = settings.address?.trim();
  const directionsHref = settings.directionsHref?.trim();

  return {
    ...contact,
    phone: phone || contact.phone,
    email: email || contact.email,
    address: address || contact.address,
    directionsHref: directionsHref || contact.directionsHref,
  };
}

function mergeFooterContactWithSettings(
  contact: FooterContactBlock,
  settings: SanitySiteSettingsLike | null | undefined,
): FooterContactBlock {
  if (!settings) return contact;

  const phone = settings.phone?.trim();
  const phoneHref = settings.phoneTelHref?.trim();
  const email = settings.email?.trim();
  const address = settings.address?.trim();
  const directionsHref = settings.directionsHref?.trim();

  return {
    ...contact,
    phone: phone
      ? {
          label: phone,
          href: phoneHref || contact.phone.href,
        }
      : contact.phone,
    email: email
      ? {
          label: email,
          href: `mailto:${email}`,
        }
      : contact.email,
    address: address || contact.address,
    directionsHref: directionsHref || contact.directionsHref,
  };
}

function isContactMessengerId(value: string): value is ContactMessengerId {
  return value === "telegram" || value === "whatsapp" || value === "instagram";
}

function mapMessengerSafe(
  raw: SanityContactMessengerLike,
  fallback: ContactMessengerLink,
): ContactMessengerLink {
  const idRaw = raw.id?.trim();
  const href = raw.href?.trim();
  const ariaLabel = raw.ariaLabel?.trim();
  if (!idRaw || !isContactMessengerId(idRaw) || !href || !ariaLabel) return fallback;
  return { id: idRaw, href, ariaLabel };
}

export function mapContactSafe(
  raw: SanityContactLike | null | undefined,
  fallback: ContactContent,
  settings?: SanitySiteSettingsLike | null,
): ContactContent {
  const messengers = raw?.messengers?.length
    ? raw.messengers
        .map((m, index) => mapMessengerSafe(m, fallback.messengers[index] ?? fallback.messengers[0]))
        .filter((m): m is ContactMessengerLink => Boolean(m.href && m.ariaLabel))
    : fallback.messengers;

  const contact: ContactContent = {
    eyebrow: raw?.eyebrow?.trim() || fallback.eyebrow,
    title: raw?.title?.trim() || fallback.title,
    description: raw?.description?.trim() || fallback.description,
    phone: raw?.phone?.trim() || fallback.phone,
    email: raw?.email?.trim() || fallback.email,
    address: raw?.address?.trim() || fallback.address,
    directionsHref: fallback.directionsHref,
    phoneLabel: raw?.phoneLabel?.trim() || fallback.phoneLabel,
    emailLabel: raw?.emailLabel?.trim() || fallback.emailLabel,
    locationTitle: raw?.locationTitle?.trim() || fallback.locationTitle,
    messengers: messengers.length > 0 ? messengers : fallback.messengers,
  };

  return mergeContactContentWithSettings(contact, settings);
}

function applySettingsToSocialLinks(
  group: FooterLinkGroup,
  settings: SanitySiteSettingsLike | null | undefined,
): FooterLinkGroup {
  const instagramUrl = settings?.instagramUrl?.trim();
  if (!instagramUrl) return group;

  return {
    ...group,
    links: group.links.map((link) => {
      const isInstagram =
        /instagram/i.test(link.label) ||
        /instagram/i.test(link.href) ||
        link.href.includes("instagram.com");
      return isInstagram ? { ...link, href: instagramUrl } : link;
    }),
  };
}

export function mapNavSafe(
  raw: SanityNavLike | null | undefined,
  fallback: NavContent,
): NavContent {
  if (!raw?.links?.length || !raw.cta) return fallback;

  const links = raw.links
    .map((link, index) => mapContentLinkSafe(link, fallback.links[index] ?? fallback.links[0]))
    .filter((l) => l.label && l.href);

  return {
    links: links.length > 0 ? links : fallback.links,
    cta: mapContentLinkSafe(raw.cta, fallback.cta),
  };
}

export function mapFooterSafe(
  raw: SanityFooterLike | null | undefined,
  fallback: FooterContent,
  settings?: SanitySiteSettingsLike | null,
): FooterContent {
  if (!raw) return fallback;

  const navigation = mapLinkGroupSafe(raw.navigation, fallback.navigation);
  const services = mapLinkGroupSafe(raw.services, fallback.services);
  const social = applySettingsToSocialLinks(
    mapLinkGroupSafe(raw.social, fallback.social),
    settings,
  );

  const contact = mergeFooterContactWithSettings(
    {
      heading: raw.contact?.heading?.trim() || fallback.contact.heading,
      phone: mapContentLinkSafe(raw.contact?.phone, fallback.contact.phone),
      email: mapContentLinkSafe(raw.contact?.email, fallback.contact.email),
      address: raw.contact?.address?.trim() || fallback.contact.address,
      directionsHref: raw.contact?.directionsHref?.trim() || fallback.contact.directionsHref,
      directionsLabel:
        raw.contact?.directionsLabel?.trim() || fallback.contact.directionsLabel,
    },
    settings,
  );

  const legalLinks = raw.legal?.links?.length
    ? raw.legal.links
        .map((link, index) =>
          mapContentLinkSafe(link, fallback.legal.links[index] ?? fallback.legal.links[0]),
        )
        .filter((l) => l.label && l.href)
    : fallback.legal.links;

  const legal: FooterLegal = {
    notice: raw.legal?.notice?.trim() || fallback.legal.notice,
    links: legalLinks.length > 0 ? legalLinks : fallback.legal.links,
  };

  const developerCredit =
    mapDeveloperCreditSafe(settings?.developerCredit, fallback.developerCredit) ??
    mapDeveloperCreditSafe(raw.developerCredit, fallback.developerCredit);

  return {
    brandTitle: raw.brandTitle?.trim() || fallback.brandTitle,
    tagline: raw.tagline?.trim() || fallback.tagline,
    navigation,
    services,
    contact,
    social,
    legal,
    developerCredit,
  };
}
