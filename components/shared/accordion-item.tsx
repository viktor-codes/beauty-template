import type { HTMLAttributes, ReactNode } from "react";

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  itemId: string;
  title: string;
  children: ReactNode;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function AccordionItem(props: AccordionItemProps) {
  void props;
  return null;
}
