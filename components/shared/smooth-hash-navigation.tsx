"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clearHashFromUrl(): void {
  if (!window.location.hash) return;

  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}`,
  );
}

function scrollToHashDestination(hash: string): boolean {
  if (!hash || hash === "#") return false;

  const id = decodeURIComponent(hash.slice(1));
  if (!id) return false;

  const destination = document.getElementById(id);
  if (!destination) return false;

  destination.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });

  return true;
}

/**
 * Same-page #hash navigation: scrollIntoView({ behavior: 'smooth' }) is reliable
 * in Safari; CSS scroll-behavior alone often still jumps for anchor clicks.
 */
export function SmoothHashNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const el = (event.target as Element | null)?.closest("a[href]");
      if (!el || !(el instanceof HTMLAnchorElement)) return;

      let url: URL;
      try {
        url = new URL(el.href);
      } catch {
        return;
      }

      if (
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search
      ) {
        return;
      }

      const hash = url.hash;
      if (!hash || hash === "#") return;

      if (!scrollToHashDestination(hash)) return;
      event.preventDefault();
      clearHashFromUrl();
      window.setTimeout(clearHashFromUrl, 0);
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;

    const frameId = window.requestAnimationFrame(() => {
      if (scrollToHashDestination(window.location.hash)) {
        clearHashFromUrl();
        window.setTimeout(clearHashFromUrl, 0);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname]);

  return null;
}
