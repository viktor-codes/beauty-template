"use client";

import type { ReactElement } from "react";

import { cn } from "@/lib/cn";

export interface TooltipProps {
  label: string;
  children: ReactElement;
  className?: string;
}

/**
 * Visual-only hint for icon-only controls. Keeps `aria-hidden` on the bubble so
 * `aria-label` on the trigger is not duplicated for screen readers.
 */
export function Tooltip({ label, children, className }: TooltipProps) {
  return (
    <span className={cn("group/tooltip relative inline-flex", className)}>
      {children}
      <span
        className={cn(
          "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 max-w-[min(100vw-2rem,16rem)] -translate-x-1/2",
          "rounded-lg bg-primary px-2.5 py-1.5 text-center text-xs font-medium leading-snug whitespace-normal text-background shadow-md",
          "opacity-0 transition-opacity duration-200 motion-reduce:transition-none",
          "[@media(hover:hover)]:group-hover/tooltip:opacity-100",
          /* :focus-within stays true after a mouse click; :focus-visible matches keyboard focus */
          "group-focus-visible/tooltip:opacity-100",
        )}
        aria-hidden
      >
        {label}
      </span>
    </span>
  );
}
