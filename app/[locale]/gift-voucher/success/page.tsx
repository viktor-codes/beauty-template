import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/routing";
import { fetchGiftVoucherOrderBySession } from "@/lib/gift-voucher/order-repository";
import { retrieveCheckoutSession } from "@/lib/stripe/create-checkout-session";
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
    title: t("successTitle"),
    alternates: buildLanguageAlternates("/gift-voucher/success", appLocale),
    robots: { index: false, follow: false },
    openGraph: {
      title: `${t("successTitle")} | ${SITE_BRAND} · ${SITE_PRACTITIONER}`,
      url: "/gift-voucher/success",
      type: "website",
    },
  };
}

export default async function GiftVoucherSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { locale } = await params;
  const { session_id: sessionId } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("GiftVoucher");

  let voucherCode: string | null = null;

  if (sessionId) {
    const session = await retrieveCheckoutSession(sessionId);
    if (session?.payment_status === "paid") {
      const order = await fetchGiftVoucherOrderBySession(sessionId);
      voucherCode = order?.code ?? null;
    }
  }

  return (
    <main id="main-content" className="flex-1 pt-20 md:pt-0">
      <Section className="bg-background" aria-labelledby="gift-voucher-success-title">
        <SectionHeading
          titleId="gift-voucher-success-title"
          titleLevel={1}
          title={t("successTitle")}
          subtitle={t("successDescription")}
        />

        {voucherCode ? (
          <div className="mt-8 inline-flex flex-col rounded-2xl border border-border bg-surface/60 px-6 py-5">
            <span className="text-xs uppercase tracking-[0.16em] text-muted">
              {t("successCodeLabel")}
            </span>
            <span className="mt-2 font-heading text-3xl tracking-[0.12em] text-primary">
              {voucherCode}
            </span>
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/gift-voucher" variant="secondary" size="lg">
            {t("successBackLabel")}
          </Button>
          <Button href="/" size="lg">
            {t("successHomeLabel")}
          </Button>
        </div>
      </Section>
    </main>
  );
}
