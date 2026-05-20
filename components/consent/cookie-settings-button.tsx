"use client";

import { useTranslations } from "next-intl";

import { useCookieConsent } from "@/components/consent/cookie-consent-context";
import { cn } from "@/lib/cn";

export interface CookieSettingsButtonProps {
  className?: string;
}

export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
  const t = useTranslations("Cookie");
  const { openPreferences } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className={cn(
        "text-sm text-muted transition-colors hover:text-primary",
        className,
      )}
    >
      {t("settings")}
    </button>
  );
}
