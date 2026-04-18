"use client";

import { useCookieConsent } from "@/components/consent/cookie-consent-context";
import { cn } from "@/lib/cn";

export interface CookieSettingsButtonProps {
  className?: string;
}

export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
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
      Cookie settings
    </button>
  );
}
