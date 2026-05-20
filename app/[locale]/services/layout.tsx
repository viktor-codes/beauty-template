import { MarketingChrome } from "@/components/layouts/marketing-chrome";
import { getLandingContent } from "@/lib/content";
import type { AppLocale } from "@/i18n/routing";

export default async function ServicesLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const landingContent = getLandingContent(locale as AppLocale);

  return <MarketingChrome content={landingContent}>{children}</MarketingChrome>;
}
