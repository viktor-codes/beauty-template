"use client";

import Script from "next/script";
import { useCallback, useRef } from "react";

import { updateGtagAnalyticsConsent } from "@/lib/cookie-consent/gtag-consent";

export interface GoogleAnalyticsLoaderProps {
  measurementId: string;
}

export function GoogleAnalyticsLoader({
  measurementId,
}: GoogleAnalyticsLoaderProps) {
  const hasConfigured = useRef(false);

  const onLoad = useCallback(() => {
    if (hasConfigured.current) return;
    hasConfigured.current = true;
    updateGtagAnalyticsConsent(true);
    if (typeof window.gtag === "function") {
      window.gtag("config", measurementId);
    }
  }, [measurementId]);

  if (!measurementId) return null;

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
      strategy="afterInteractive"
      onLoad={onLoad}
    />
  );
}
