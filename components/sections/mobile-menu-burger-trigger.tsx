"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

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
          <ListIcon className="h-6 w-6" weight="light" aria-hidden />
        )}
      </button>

      {isOpen ? (
        <div
          className="fixed inset-x-0 bottom-0 top-[73px] z-(--z-dropdown) overflow-y-auto bg-background px-4 py-6 md:hidden"
          id="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <nav aria-label="Primary mobile">
            <ul className="flex flex-col gap-1">
              {nav.links.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base text-primary hover:bg-surface"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6">
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
      ) : null}
    </>
  );
}
