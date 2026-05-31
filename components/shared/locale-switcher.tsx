"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const LOCALE_CODES: Record<AppLocale, "enShort" | "ukShort" | "ruShort"> = {
  en: "enShort",
  uk: "ukShort",
  ru: "ruShort",
};

const capsuleClass =
  "rounded-full px-3 py-2 text-xs font-medium tracking-wide uppercase transition-colors";

const MENU_PLACEMENT_STYLES = {
  bottom: {
    nav: "absolute left-1/2 top-full z-(--z-dropdown) -translate-x-1/2 pt-2",
    list: "flex flex-col items-center gap-1",
  },
  right: {
    nav: "absolute left-full top-1/2 z-(--z-dropdown) -translate-y-1/2 pl-2",
    list: "flex flex-row items-center gap-1",
  },
} as const;

export interface LocaleSwitcherProps {
  className?: string;
  menuPlacement?: keyof typeof MENU_PLACEMENT_STYLES;
}

export function LocaleSwitcher({
  className,
  menuPlacement = "bottom",
}: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations("Locale");
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const otherLocales = routing.locales.filter((code) => code !== locale);
  const isTapMenu = menuPlacement === "right";
  const placement = MENU_PLACEMENT_STYLES[menuPlacement];
  const currentLocaleLabel = t(LOCALE_CODES[locale]);

  useEffect(() => {
    if (!isTapMenu || !isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isTapMenu]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "group/locale-switcher relative inline-flex",
        isTapMenu && isOpen && "z-(--z-dropdown)",
        className,
      )}
    >
      {isTapMenu ? (
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-haspopup="true"
          aria-label={`${t("switchLanguage")}: ${currentLocaleLabel}`}
          className="text-muted"
          onClick={() => setIsOpen((open) => !open)}
        >
          {currentLocaleLabel}
        </button>
      ) : (
        <span aria-current="page" className="text-muted">
          {currentLocaleLabel}
        </span>
      )}

      {otherLocales.length > 0 ? (
        <nav
          id={menuId}
          aria-label={t("switchLanguage")}
          className={cn(
            placement.nav,
            isTapMenu
              ? isOpen
                ? "flex"
                : "hidden"
              : "hidden group-hover/locale-switcher:flex group-focus-within/locale-switcher:flex",
          )}
        >
          <div className={placement.list}>
            {otherLocales.map((code) => (
              <Link
                key={code}
                href={pathname}
                locale={code}
                onClick={isTapMenu ? () => setIsOpen(false) : undefined}
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
