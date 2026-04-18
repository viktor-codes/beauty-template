"use client";

import type { ReactNode } from "react";

import { CookieConsentProvider, useCookieConsent } from "@/components/consent/cookie-consent-context";
import { CookieConsentDialog } from "@/components/consent/cookie-consent-dialog";
import { GoogleAnalyticsLoader } from "@/components/consent/google-analytics-loader";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

function ConditionalGoogleAnalytics() {
  const { analyticsEnabled } = useCookieConsent();
  if (!analyticsEnabled || !GA_MEASUREMENT_ID) return null;
  return <GoogleAnalyticsLoader measurementId={GA_MEASUREMENT_ID} />;
}

export function CookieConsentRoot({ children }: { children: ReactNode }) {
  return (
    <CookieConsentProvider>
      {children}
      <CookieConsentDialog />
      <ConditionalGoogleAnalytics />
    </CookieConsentProvider>
  );
}
