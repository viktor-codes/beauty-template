import type { HTMLAttributes } from "react";

export interface TestimonialCardProps extends HTMLAttributes<HTMLElement> {
  quote: string;
  authorName: string;
  authorRole?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export function TestimonialCard(props: TestimonialCardProps) {
  void props;
  return null;
}
