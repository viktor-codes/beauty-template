import {
  STUDIO_PHONE_DISPLAY,
  studioPhoneTelHref,
  studioPhoneTelegramHref,
  studioPhoneWhatsAppHref,
} from "@/lib/studio-phone";

export const INSTAGRAM_PROFILE_HREF =
  "https://www.instagram.com/innache.aesthetic.nurse/";

/** Canonical studio address (Athlone) — used on site, in Schema.org, and Sanity seed. */
export const studioAddress = {
  line1: "Gray, unit 6",
  line2: "The Skinbar · Inna Chernovol, Inish house",
  line3: "Golden Island, Athlone, Co. Westmeath, N37 R658",
  locality: "Athlone",
  region: "Co. Westmeath",
  postalCode: "N37 R658",
  country: "IE",
} as const;

export const studioAddressDisplay = [
  studioAddress.line1,
  studioAddress.line2,
  studioAddress.line3,
].join("\n");

export const studioContact = {
  phone: STUDIO_PHONE_DISPLAY,
  email: "hello@studio.example.com",
  address: studioAddressDisplay,
  phoneTelHref: studioPhoneTelHref(),
  telegramHref: studioPhoneTelegramHref(),
  whatsappHref: studioPhoneWhatsAppHref(),
  directionsHref: "https://maps.app.goo.gl/aemu5BKFy1ks5YvX7",
} as const;

export const brandLogos = [
  { src: "/logos/esse.png", alt: "Esse", width: 140, height: 44 },
  { src: "/logos/jan-marini.png", alt: "Jan Marini", width: 140, height: 44 },
  { src: "/logos/obagi.png", alt: "Obagi", width: 140, height: 44 },
  { src: "/logos/is-clinical.png", alt: "Is Clinical", width: 140, height: 44 },
  { src: "/logos/zo.png", alt: "ZO Skin Health", width: 140, height: 44 },
  { src: "/logos/elemis.png", alt: "Elemis", width: 140, height: 44 },
] as const;

export const heroImage = {
  src: "/hero.webp",
  width: 920,
  height: 1170,
} as const;
