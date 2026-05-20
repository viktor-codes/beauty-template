import { MarketingChrome } from "@/components/layouts/marketing-chrome";
import { getLandingContent } from "@/lib/content";
import type { AppLocale } from "@/i18n/routing";

export default async function LegalPagesLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const landingContent = await getLandingContent(locale as AppLocale);

  return <MarketingChrome content={landingContent}>{children}</MarketingChrome>;
}
