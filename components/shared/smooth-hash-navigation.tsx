"use client";

import { useEffect } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Same-page #hash navigation: scrollIntoView({ behavior: 'smooth' }) is reliable
 * in Safari; CSS scroll-behavior alone often still jumps for anchor clicks.
 */
export function SmoothHashNavigation() {
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

      const id = decodeURIComponent(hash.slice(1));
      if (!id) return;

      const destination = document.getElementById(id);
      if (!destination) return;

      event.preventDefault();
      destination.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
      window.history.pushState(
        null,
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
