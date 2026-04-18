/** Minimal typing for Google tag / Consent Mode on window (loaded at runtime). */

export {};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
