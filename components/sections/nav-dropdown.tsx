"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";

import { cn } from "@/lib/cn";
import type { NavLink } from "@/lib/types/content";

export interface NavDropdownProps {
  link: NavLink;
  className?: string;
}

export function NavDropdown({ link, className }: NavDropdownProps) {
  const items = link.children ?? [];

  return (
    <div
      className={cn("group/nav-dropdown relative hidden md:block", className)}
    >
      <div className="flex items-center gap-0.5">
        <Link
          href={link.href}
          className="text-lg text-muted transition-colors hover:text-primary"
        >
          {link.label}
        </Link>
        <CaretDownIcon
          className="h-3.5 w-3.5 text-muted transition-transform duration-200 group-hover/nav-dropdown:rotate-180 group-focus-within/nav-dropdown:rotate-180 motion-reduce:transition-none"
          weight="light"
          aria-hidden
        />
      </div>

      <div
        className={cn(
          "absolute left-1/2 top-full z-(--z-dropdown) hidden min-w-[22rem] max-w-[28rem] -translate-x-1/2 pt-3",
          "group-hover/nav-dropdown:block group-focus-within/nav-dropdown:block",
        )}
      >
        <div className="rounded-2xl border border-border bg-background p-3 shadow-lg">
          <ul
            className="grid grid-cols-2 gap-1"
            role="list"
            aria-label={link.label}
          >
            {items.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 text-sm text-primary transition-colors hover:bg-surface"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
