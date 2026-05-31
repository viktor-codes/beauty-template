import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "uk", "ru"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // WHY: OS Accept-Language often lists ru above the browser UI language.
  // First-visit matching runs client-side via navigator.languages (en/uk only).
  localeDetection: false,
  localeCookie: false,
});

export type AppLocale = (typeof routing.locales)[number];
