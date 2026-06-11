import { MarketingChrome } from "@/components/layouts/marketing-chrome";
import { getLandingContent } from "@/lib/content";
import type { AppLocale } from "@/i18n/routing";
import { resolveServicesCatalog } from "@/lib/services";

export default async function GiftVoucherLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const appLocale = locale as AppLocale;
  const [landingContent, catalog] = await Promise.all([
    getLandingContent(appLocale),
    resolveServicesCatalog(appLocale),
  ]);

  return (
    <MarketingChrome content={landingContent} catalog={catalog}>
      {children}
    </MarketingChrome>
  );
}
