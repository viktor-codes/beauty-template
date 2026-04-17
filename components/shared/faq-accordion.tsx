import { AccordionItem } from "@/components/shared/accordion-item";
import type { FAQItem } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface FaqAccordionProps {
  items: FAQItem[];
  isContained?: boolean;
  className?: string;
}

export function FaqAccordion({ items, isContained = true, className }: FaqAccordionProps) {
  return (
    <div className={cn(isContained && "mx-auto max-w-3xl", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id ?? `${item.question}-${index}`}
          itemId={item.id ?? `faq-${index}`}
          title={item.question}
          defaultIsOpen={item.isDefaultOpen}
        >
          {item.answer}
        </AccordionItem>
      ))}
    </div>
  );
}
