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

const capsuleClass =
  "rounded-full px-2.5 py-1 text-xs font-medium tracking-wide uppercase transition-colors";

export interface LocaleSwitcherProps {
  className?: string;
}

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations("Locale");
  const otherLocales = routing.locales.filter((code) => code !== locale);

  return (
    <div
      className={cn("group/locale-switcher relative inline-flex", className)}
    >
      <span
        aria-current="page"
        className={cn(capsuleClass, "bg-primary text-background")}
      >
        {t(LOCALE_CODES[locale])}
      </span>

      {otherLocales.length > 0 ? (
        <nav
          aria-label={t("switchLanguage")}
          className={cn(
            "absolute left-1/2 top-full z-(--z-dropdown) hidden -translate-x-1/2 pt-2",
            "group-hover/locale-switcher:flex group-focus-within/locale-switcher:flex",
          )}
        >
          <div className="flex flex-col items-center gap-1">
            {otherLocales.map((code) => (
              <Link
                key={code}
                href={pathname}
                locale={code}
                className={cn(
                  capsuleClass,
                  "whitespace-nowrap bg-background text-muted shadow-sm ring-1 ring-border hover:bg-surface hover:text-primary",
                )}
              >
                {t(LOCALE_CODES[code])}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </div>
  );
}
