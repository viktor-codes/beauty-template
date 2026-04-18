import type { HTMLAttributes } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center" | "right";
  /** Page title on hub/category routes; default `2` keeps landing sections as `h2`. */
  titleLevel?: 1 | 2;
  /** Sets `id` on the title heading (for `aria-labelledby` on parent sections). */
  titleId?: string;
}

const alignClass: Record<NonNullable<SectionHeadingProps["align"]>, string> = {
  left: "text-left",
  center: "mx-auto text-center",
  right: "ml-auto text-right",
};

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "left",
  className,
  titleLevel = 2,
  titleId,
  ...rest
}: SectionHeadingProps) {
  const TitleTag = titleLevel === 1 ? "h1" : "h2";

  return (
    <div className={cn("mb-10 max-w-2xl", alignClass[align], className)} {...rest}>
      {eyebrow ? (
        <div className={cn("mb-4", align === "center" && "flex justify-center")}>
          <Badge variant="accent">{eyebrow}</Badge>
        </div>
      ) : null}
      <TitleTag
        id={titleId}
        className="type-h2 tracking-tight text-primary"
      >
        {title}
      </TitleTag>
      {subtitle ? (
        <p className="type-body mt-4 text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}
