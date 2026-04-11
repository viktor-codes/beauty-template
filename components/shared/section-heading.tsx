import type { HTMLAttributes } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center" | "right";
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
  ...rest
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 max-w-2xl", alignClass[align], className)} {...rest}>
      {eyebrow ? (
        <div className={cn("mb-3", align === "center" && "flex justify-center")}>
          <Badge variant="accent">{eyebrow}</Badge>
        </div>
      ) : null}
      <h2 className="font-heading text-3xl tracking-tight text-primary md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}
