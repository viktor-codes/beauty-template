import type { HTMLAttributes, ReactNode } from "react";

export interface ServiceCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  href?: string;
  icon?: ReactNode;
}

export function ServiceCard(props: ServiceCardProps) {
  void props;
  return null;
}
