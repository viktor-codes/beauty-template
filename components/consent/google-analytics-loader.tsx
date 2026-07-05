"use client";

import { useEffect, useRef } from "react";

import { updateGtagAnalyticsConsent } from "@/lib/cookie-consent/gtag-consent";

export interface GoogleAnalyticsLoaderProps {
  measurementId: string;
}

export function GoogleAnalyticsLoader({
  measurementId,
}: GoogleAnalyticsLoaderProps) {
  const hasConfigured = useRef(false);

  useEffect(() => {
    if (hasConfigured.current) return;

    const configureAnalytics = () => {
      if (hasConfigured.current || typeof window.gtag !== "function") return;

      hasConfigured.current = true;
      updateGtagAnalyticsConsent(true);
      window.gtag("config", measurementId);
    };

    configureAnalytics();

    const intervalId = window.setInterval(configureAnalytics, 100);
    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [measurementId]);

  useEffect(() => {
    if (!measurementId) return;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [measurementId]);

  if (!measurementId) return null;

  return null;
}
