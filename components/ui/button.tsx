import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    [
      "relative border border-primary/90 bg-primary text-background",
      "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_2px_8px_-2px_rgba(0,0,0,0.18)]",
      "hover:brightness-105",
      "motion-safe:hover:-translate-y-0.5",
      "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_22px_-6px_rgba(0,0,0,0.26)]",
      "active:translate-y-0 active:brightness-100",
      "active:shadow-[inset_0_2px_10px_rgba(0,0,0,0.28)]",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    ].join(" "),
  secondary:
    [
      "relative border border-border/90 bg-linear-to-b from-background to-surface/65 text-primary",
      "shadow-[0_2px_8px_-3px_rgba(44,44,44,0.07)]",
      "hover:border-accent/30 hover:bg-surface",
      "motion-safe:hover:-translate-y-0.5",
      "hover:shadow-[0_8px_20px_-8px_rgba(44,44,44,0.11)]",
      "active:translate-y-0 active:shadow-[0_2px_6px_-3px_rgba(44,44,44,0.09)]",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    ].join(" "),
  ghost:
    [
      "text-primary underline-offset-4 shadow-none",
      "hover:bg-surface/55 hover:underline",
      "motion-safe:hover:-translate-y-px",
      "active:translate-y-0",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    ].join(" "),
};

const sizeClass: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export function Button({
  children,
  className,
  type = "button",
  variant = "primary",
  size = "md",
  isDisabled,
  href,
  target,
  rel,
  onClick,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium no-underline",
    "transition-[color,background-color,box-shadow,transform,border-color,filter] duration-200 ease-out",
    "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:transform-none",
    variantClass[variant],
    sizeClass[size],
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={target}
        rel={rel}
        aria-disabled={isDisabled ? true : undefined}
        tabIndex={isDisabled ? -1 : undefined}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
