import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "default" | "accent" | "outline";
}

const variantClass: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-surface text-muted",
  accent: "bg-accent/15 text-accent",
  outline: "border border-border text-muted",
};

export function Badge({
  children,
  className,
  variant = "default",
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider",
        variantClass[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
