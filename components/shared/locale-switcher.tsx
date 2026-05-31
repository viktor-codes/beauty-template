"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const LOCALE_CODES: Record<AppLocale, "enShort" | "ukShort" | "ruShort"> = {
  en: "enShort",
  uk: "ukShort",
  ru: "ruShort",
};

export interface LocaleSwitcherProps {
  className?: string;
}

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations("Locale");

  return (
    <nav
      aria-label={t("switchLanguage")}
      className={cn("inline-flex items-center gap-1", className)}
    >
      {routing.locales.map((code) => {
        const isActive = locale === code;

        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium tracking-wide uppercase transition-colors",
              isActive
                ? "bg-primary text-background"
                : "text-muted hover:bg-surface hover:text-primary",
            )}
          >
            {t(LOCALE_CODES[code])}
          </Link>
        );
      })}
    </nav>
  );
}
