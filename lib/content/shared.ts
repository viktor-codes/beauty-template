import {
  STUDIO_PHONE_DISPLAY,
  studioPhoneTelHref,
  studioPhoneTelegramHref,
  studioPhoneWhatsAppHref,
} from "@/lib/studio-phone";

export const INSTAGRAM_PROFILE_HREF =
  "https://www.instagram.com/innache.aesthetic.nurse/";

export const studioContact = {
  phone: STUDIO_PHONE_DISPLAY,
  email: "hello@studio.example.com",
  address: "120 Beauty Lane, Suite 4, New York, NY 10001",
  phoneTelHref: studioPhoneTelHref(),
  telegramHref: studioPhoneTelegramHref(),
  whatsappHref: studioPhoneWhatsAppHref(),
  directionsHref:
    "https://www.google.com/maps/search/?api=1&query=120%20Beauty%20Lane%20Suite%204%20New%20York%20NY%2010001",
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
