import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  itemId: string;
  title: string;
  children: ReactNode;
  defaultIsOpen?: boolean;
  /** Use `4` when a parent block already uses `h3` (e.g. FAQ bento group titles). */
  headingLevel?: 3 | 4;
}

export function AccordionItem({
  itemId,
  title,
  children,
  defaultIsOpen,
  headingLevel = 3,
  className,
  ...rest
}: AccordionItemProps) {
  const QuestionTag = headingLevel === 4 ? "h4" : "h3";

  return (
    <div className={cn("border-b border-border", className)} {...rest}>
      <details
        id={itemId}
        className="group"
        {...(defaultIsOpen !== undefined ? { open: defaultIsOpen } : {})}
      >
        <summary className="cursor-pointer list-none py-4 marker:hidden [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-4">
            <QuestionTag className="min-w-0 flex-1 font-medium text-primary">
              {title}
            </QuestionTag>
            <span
              className="shrink-0 text-muted transition-transform group-open:rotate-180"
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
