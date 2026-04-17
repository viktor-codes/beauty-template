import { AccordionItem } from "@/components/shared/accordion-item";
import type { FAQItem } from "@/lib/types/content";

export interface FaqAccordionProps {
  items: FAQItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="mx-auto max-w-3xl">
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
