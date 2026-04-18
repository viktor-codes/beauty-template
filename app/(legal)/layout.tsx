import { MarketingChrome } from "@/components/layouts/marketing-chrome";

export default function LegalPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MarketingChrome>{children}</MarketingChrome>;
}
