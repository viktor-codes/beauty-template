import Link from "next/link";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface ServiceCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  href?: string;
  icon?: ReactNode;
}

export function ServiceCard({
  title,
  description,
  href,
  icon,
  className,
  ...rest
}: ServiceCardProps) {
  const inner = (
    <>
      {icon ? <div className="mb-4 text-accent">{icon}</div> : null}
      <h3 className="font-heading text-xl text-primary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </>
  );

  const cardClass = cn(
    "rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-md",
    href && "block h-full",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cn(cardClass, "no-underline")}>
        {inner}
      </Link>
    );
  }

  return (
    <div className={cardClass} {...rest}>
      {inner}
    </div>
  );
}
