import { cache } from "react";

import type { AppLocale } from "@/i18n/routing";
import { readLocalizedValue } from "@/lib/i18n/pick-locale-field";
import { getSanityClient } from "@/lib/sanity/client";
import { giftVoucherSettingsQuery } from "@/lib/sanity/queries/gift-voucher";
import type { GiftVoucherSettings } from "@/lib/types/gift-voucher";

interface SanityGiftVoucherSettingsLike {
  isEnabled?: boolean;
  heroTitle?: { en?: string; uk?: string; ru?: string };
  heroSubtitle?: { en?: string; uk?: string; ru?: string };
  termsBlurb?: { en?: string; uk?: string; ru?: string };
  validityMonths?: number;
}

const DEFAULT_SETTINGS: GiftVoucherSettings = {
  isEnabled: true,
  heroTitle: "",
  heroSubtitle: "",
  termsBlurb: "",
  validityMonths: 12,
};

function mapGiftVoucherSettings(
  raw: SanityGiftVoucherSettingsLike | null | undefined,
  locale: AppLocale,
  fallbacks: Pick<GiftVoucherSettings, "heroTitle" | "heroSubtitle" | "termsBlurb">,
): GiftVoucherSettings {
  if (!raw) {
    return { ...DEFAULT_SETTINGS, ...fallbacks };
  }

  return {
    isEnabled: raw.isEnabled !== false,
    heroTitle: readLocalizedValue(raw.heroTitle, locale, fallbacks.heroTitle),
    heroSubtitle: readLocalizedValue(
      raw.heroSubtitle,
      locale,
      fallbacks.heroSubtitle,
    ),
    termsBlurb: readLocalizedValue(raw.termsBlurb, locale, fallbacks.termsBlurb),
    validityMonths:
      typeof raw.validityMonths === "number" && raw.validityMonths > 0
        ? raw.validityMonths
        : DEFAULT_SETTINGS.validityMonths,
  };
}

export const fetchGiftVoucherSettings = cache(
  async (
    locale: AppLocale,
    fallbacks: Pick<GiftVoucherSettings, "heroTitle" | "heroSubtitle" | "termsBlurb">,
  ): Promise<GiftVoucherSettings> => {
    const client = getSanityClient();
    if (!client) {
      return { ...DEFAULT_SETTINGS, ...fallbacks };
    }

    const raw = await client.fetch<SanityGiftVoucherSettingsLike | null>(
      giftVoucherSettingsQuery,
    );

    return mapGiftVoucherSettings(raw, locale, fallbacks);
  },
);
