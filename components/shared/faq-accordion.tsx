import { AccordionItem } from "@/components/shared/accordion-item";
import type { FAQItem } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface FaqAccordionProps {
  items: FAQItem[];
  isContained?: boolean;
  className?: string;
  /** Default `3` under an `h2`; use `4` inside FAQ groups that already use `h3`. */
  itemHeadingLevel?: 3 | 4;
}

export function FaqAccordion({
  items,
  isContained = true,
  className,
  itemHeadingLevel = 3,
}: FaqAccordionProps) {
  return (
    <div className={cn(isContained && "mx-auto max-w-3xl", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id ?? `${item.question}-${index}`}
          itemId={item.id ?? `faq-${index}`}
          title={item.question}
          defaultIsOpen={item.isDefaultOpen}
          headingLevel={itemHeadingLevel}
        >
          {item.answer}
        </AccordionItem>
      ))}
    </div>
  );
}
