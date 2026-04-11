import type { ElementType, HTMLAttributes, ReactNode } from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  id?: string;
}

export function Section(props: SectionProps) {
  void props;
  return null;
}
