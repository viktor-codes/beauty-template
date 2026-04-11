import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  itemId: string;
  title: string;
  children: ReactNode;
  defaultIsOpen?: boolean;
}

export function AccordionItem({
  itemId,
  title,
  children,
  defaultIsOpen,
  className,
  ...rest
}: AccordionItemProps) {
  return (
    <div className={cn("border-b border-border", className)} {...rest}>
      <details
        id={itemId}
        className="group"
        {...(defaultIsOpen !== undefined ? { open: defaultIsOpen } : {})}
      >
        <summary className="cursor-pointer list-none py-4 font-medium text-primary marker:hidden [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-4">
            {title}
            <span
              className="text-muted transition-transform group-open:rotate-180"
              aria-hidden
            >
              ⌄
            </span>
          </span>
        </summary>
        <div className="pb-4 text-sm leading-relaxed text-muted">{children}</div>
      </details>
    </div>
  );
}
