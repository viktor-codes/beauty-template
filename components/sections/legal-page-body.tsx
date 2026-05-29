import { LegalPortableText } from "@/components/sections/legal-portable-text";
import { cn } from "@/lib/cn";
import type { LegalPageContent } from "@/lib/types/legal";

const hrClass = "border-border";
const h2Class =
  "type-h3 scroll-mt-24 font-heading font-medium tracking-tight text-primary";

export interface LegalPageBodyProps {
  sections: LegalPageContent["sections"];
  slug: LegalPageContent["slug"];
}

export function LegalPageBody({ sections, slug }: LegalPageBodyProps) {
  return (
    <>
      {sections.map((section, index) => {
        const sectionId = `${slug}-s${index + 1}`;

        return (
          <div key={sectionId}>
            {index > 0 ? <hr className={cn(hrClass, "my-6")} /> : null}
            <section aria-labelledby={sectionId}>
              <h2 id={sectionId} className={h2Class}>
                {section.heading}
              </h2>
              <div className="mt-4">
                <LegalPortableText value={section.body} />
              </div>
            </section>
          </div>
        );
      })}
    </>
  );
}
