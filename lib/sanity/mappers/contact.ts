import type {
  ContactContent,
  ContactMessengerId,
  ContactMessengerLink,
} from "@/lib/types/content";

import type { SanitySiteSettingsLike } from "@/lib/sanity/mappers/site-settings";

interface SanityContactMessengerLike {
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

function mergeWithSiteSettings(
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
  if (!raw?.title?.trim()) {
    return mergeWithSiteSettings(fallback, settings);
  }

  const messengers = (raw.messengers ?? [])
    .map((m, index) => mapMessengerSafe(m, fallback.messengers[index] ?? fallback.messengers[0]))
    .filter((m): m is ContactMessengerLink => Boolean(m.href && m.ariaLabel));

  const contact: ContactContent = {
    eyebrow: raw.eyebrow?.trim() || fallback.eyebrow,
    title: raw.title.trim(),
    description: raw.description?.trim() || fallback.description,
    phone: raw.phone?.trim() || fallback.phone,
    email: raw.email?.trim() || fallback.email,
    address: raw.address?.trim() || fallback.address,
    directionsHref: fallback.directionsHref,
    phoneLabel: raw.phoneLabel?.trim() || fallback.phoneLabel,
    emailLabel: raw.emailLabel?.trim() || fallback.emailLabel,
    locationTitle: raw.locationTitle?.trim() || fallback.locationTitle,
    messengers: messengers.length > 0 ? messengers : fallback.messengers,
  };

  return mergeWithSiteSettings(contact, settings);
}
