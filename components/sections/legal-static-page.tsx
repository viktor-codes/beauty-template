import type { ReactNode } from "react";

import { Section } from "@/components/shared/section";

export interface LegalStaticPageProps {
  title: string;
  children: ReactNode;
}

export function LegalStaticPage({ title, children }: LegalStaticPageProps) {
  return (
    <Section>
      <article className="mx-auto max-w-3xl">
        <h1 className="type-h2 tracking-tight text-primary">{title}</h1>
        <div className="mt-8 space-y-6 text-base text-primary/90">
          {children}
        </div>
      </article>
    </Section>
  );
}
