import { Montserrat, Playfair_Display } from "next/font/google";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { ConsentModeDefaultScript } from "@/components/consent/consent-mode-default-script";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600"],
  preload: true,
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["500", "700"],
  preload: true,
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${montserrat.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <ConsentModeDefaultScript />
        {children}
      </body>
    </html>
  );
}
