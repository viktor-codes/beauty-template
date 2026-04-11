import type { HTMLAttributes, ReactNode } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "default" | "accent" | "outline";
}

export function Badge(props: BadgeProps) {
  void props;
  return null;
}
