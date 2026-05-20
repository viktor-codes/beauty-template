import { MarketingChrome } from "@/components/layouts/marketing-chrome";

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MarketingChrome>{children}</MarketingChrome>;
}

