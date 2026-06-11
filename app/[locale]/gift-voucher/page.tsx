import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { GiftVoucherPageContent } from "@/components/features/gift-voucher-page-content";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/routing";
import { buildGiftableProcedures } from "@/lib/gift-voucher/build-giftable-procedures";
import { fetchGiftVoucherSettings } from "@/lib/sanity/fetch/fetch-gift-voucher-settings";
import { resolveServicesCatalog } from "@/lib/services";
import { buildLanguageAlternates } from "@/lib/i18n/metadata";
import { SITE_BRAND, SITE_PRACTITIONER } from "@/lib/site-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "GiftVoucher" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildLanguageAlternates("/gift-voucher", appLocale),
    openGraph: {
      title: `${t("metaTitle")} | ${SITE_BRAND} · ${SITE_PRACTITIONER}`,
      description: t("metaDescription"),
      url: "/gift-voucher",
      type: "website",
    },
  };
}

export default async function GiftVoucherPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations("GiftVoucher");

  const fallbacks = {
    heroTitle: t("heroTitle"),
    heroSubtitle: t("heroSubtitle"),
    termsBlurb: t("termsBlurb"),
  };

  const [catalog, settings] = await Promise.all([
    resolveServicesCatalog(appLocale),
    fetchGiftVoucherSettings(appLocale, fallbacks),
  ]);

  const procedures = buildGiftableProcedures(catalog);
  const heroTitle = settings.heroTitle || fallbacks.heroTitle;
  const heroSubtitle = settings.heroSubtitle || fallbacks.heroSubtitle;

  if (!settings.isEnabled) {
    return (
      <main id="main-content" className="flex-1 pt-20 md:pt-0">
        <Section className="bg-background">
          <SectionHeading
            titleId="gift-voucher-disabled-title"
            titleLevel={1}
            title={t("disabledTitle")}
            subtitle={t("disabledDescription")}
          />
          <Button href="/#contact" size="lg" className="mt-8">
            {t("contactCta")}
          </Button>
        </Section>
      </main>
    );
  }

  return (
    <main id="main-content" className="flex-1 pt-20 md:pt-0">
      <Section className="bg-background" aria-labelledby="gift-voucher-title">
        <SectionHeading
          titleId="gift-voucher-title"
          titleLevel={1}
          title={heroTitle}
          subtitle={heroSubtitle}
        />

        {procedures.length === 0 ? (
          <p className="mt-8 text-sm text-muted">{t("procedureEmpty")}</p>
        ) : (
          <GiftVoucherPageContent procedures={procedures} settings={settings} />
        )}
      </Section>
    </main>
  );
}
