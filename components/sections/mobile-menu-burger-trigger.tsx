"use client";

import { ListHeartIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { NavContent } from "@/lib/types/content";

const iconFrameClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary";

export interface MobileMenuBurgerTriggerProps {
  nav: NavContent;
}

export function MobileMenuBurgerTrigger({ nav }: MobileMenuBurgerTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={cn(
          iconFrameClass,
          "shrink-0 transition-colors hover:bg-surface",
        )}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" weight="light" aria-hidden />
        ) : (
          <ListHeartIcon className="h-6 w-6" weight="light" aria-hidden />
        )}
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-x-0 top-19 bottom-0 z-(--z-dropdown) bg-primary/20 backdrop-blur-[2px] md:hidden"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="fixed left-4 right-4 top-21 z-(--z-overlay) max-h-[calc(100dvh-5.25rem-0.75rem)] overflow-y-auto rounded-3xl border border-border bg-background px-4 pb-6 pt-4 shadow-xl md:hidden"
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <nav aria-label="Primary mobile">
              <ul className="flex flex-col gap-2">
                {nav.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-xl px-3 py-4 text-base text-primary transition-colors hover:bg-surface"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4">
              <Button
                href={nav.cta.href}
                size="lg"
                className="w-full justify-center"
                onClick={() => setIsOpen(false)}
              >
                {nav.cta.label}
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
