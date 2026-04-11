import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  id?: string;
  hasContainer?: boolean;
}

export function Section({
  as: Comp = "section",
  className,
  children,
  id,
  hasContainer = true,
  ...rest
}: SectionProps) {
  return (
    <Comp
      id={id}
      className={cn(
        "py-16 md:py-24",
        id ? "scroll-mt-24 md:scroll-mt-28" : null,
        className,
      )}
      {...rest}
    >
      {hasContainer ? (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      ) : (
        children
      )}
    </Comp>
  );
}
