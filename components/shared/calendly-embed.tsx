import type { HTMLAttributes } from "react";

export interface CalendlyEmbedProps extends HTMLAttributes<HTMLDivElement> {
  calendlyUrl: string;
  height?: number;
  minHeight?: number;
}

export function CalendlyEmbed(props: CalendlyEmbedProps) {
  void props;
  return null;
}
