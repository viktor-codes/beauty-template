import Link from "next/link";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  return (
    <main id="main-content" className="flex-1 pt-19 md:pt-0">
      <Section className="bg-background">
        <SectionHeading
          eyebrow="Services"
          title="Explore all treatments"
          subtitle="This page will become the SEO hub for categories, subcategories, and individual procedures."
        />

        <div className="flex flex-wrap gap-4">
          <Button href="/#services" variant="secondary" size="lg">
            Back to landing
          </Button>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-medium text-background transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Book a consultation
          </Link>
        </div>
      </Section>
    </main>
  );
}

