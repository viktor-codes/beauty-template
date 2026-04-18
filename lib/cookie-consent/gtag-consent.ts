/**
 * Updates Google Consent Mode v2 flags when gtag is available (stub or full).
 */

export function updateGtagAnalyticsConsent(isGranted: boolean): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("consent", "update", {
    analytics_storage: isGranted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}
