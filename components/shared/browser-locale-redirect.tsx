"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  AUTO_DETECT_LOCALES,
  matchLocaleFromLanguageTags,
} from "@/lib/i18n/match-locale";

const AUTO_DETECT_SESSION_KEY = "locale-auto-detected";

export function BrowserLocaleRedirect() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (hasRedirected.current || sessionStorage.getItem(AUTO_DETECT_SESSION_KEY)) {
      return;
    }

    sessionStorage.setItem(AUTO_DETECT_SESSION_KEY, "1");

    if (locale !== routing.defaultLocale) {
      return;
    }

    const detected = matchLocaleFromLanguageTags(
      navigator.languages,
      routing.defaultLocale,
      AUTO_DETECT_LOCALES,
    );

    if (detected === locale) {
      return;
    }

    hasRedirected.current = true;
    router.replace(pathname, { locale: detected });
  }, [locale, pathname, router]);

  return null;
}
