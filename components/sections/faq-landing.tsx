import { FaqAccordion } from "@/components/shared/faq-accordion";
import {
  FAQ_BENTO_ROOT_GRID,
  FAQ_BENTO_TOPIC_CHIPS,
  FAQ_BENTO_TOPIC_LINK,
  FAQ_GROUP_BENTO_XL,
  faqBentoTileClassName,
} from "@/lib/faq-bento-grid";
import type { FAQContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export function FaqLanding({ content }: { content: FAQContent }) {
  const groups = content.groups ?? [];

  if (groups.length === 0) {
    return <FaqAccordion items={content.items} />;
  }

  const introBullets = content.introBullets ?? [];
  const hasIntro = introBullets.length > 0;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className={FAQ_BENTO_ROOT_GRID}>
        {hasIntro ? (
          <div
            className={cn(
              faqBentoTileClassName(),
              "md:col-span-2 xl:col-span-8",
              "motion-safe:transition-shadow motion-safe:duration-300 hover:shadow-md",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">TL;DR</p>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
              {introBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                    aria-hidden
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <nav
          aria-label="FAQ topics"
          className={cn(
            faqBentoTileClassName(),
            hasIntro ? "md:col-span-2 xl:col-span-4" : "md:col-span-2 xl:col-span-12",
            "motion-safe:transition-shadow motion-safe:duration-300 hover:shadow-md",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Navigate
              </p>
              <p className="mt-2 font-heading text-h4 tracking-h4 text-primary">Pick a topic</p>
            </div>
            <span className="hidden rounded-full border border-(--color-border) bg-background px-2 py-1 font-mono text-[10px] text-muted sm:inline">
              {String(groups.length).padStart(2, "0")}
            </span>
          </div>
          <div className={FAQ_BENTO_TOPIC_CHIPS}>
            {groups.map((group) => (
              <a key={group.id} href={`#${group.id}`} className={FAQ_BENTO_TOPIC_LINK}>
                {group.title}
              </a>
            ))}
          </div>
        </nav>
        {groups.map((group) => (
          <section
            key={group.id}
            id={group.id}
            className={cn(
              faqBentoTileClassName({
                isAccent: group.id === "faq-group-safety",
                isEmphasis: group.id === "faq-group-planning",
              }),
              "scroll-mt-28 md:scroll-mt-24",
              "md:min-h-0",
              "motion-safe:transition-[box-shadow,transform] motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md",
              FAQ_GROUP_BENTO_XL[group.id] ?? "xl:col-span-4",
            )}
          >
            <div className="space-y-1.5">
              <h3 className="font-heading text-h4 tracking-h4 text-primary">{group.title}</h3>
              {group.subtitle ? (
                <p className="text-sm leading-relaxed text-muted">{group.subtitle}</p>
              ) : null}
            </div>
            <div className="mt-4 min-h-0 flex-1 border-t border-border/50 pt-1 sm:mt-5">
              <FaqAccordion items={group.items} isContained={false} />
            </div>
          </section>
        ))}

        <div
          className={cn(
            faqBentoTileClassName({ isAccent: true, isEmphasis: true }),
            "md:col-span-2 xl:col-span-12",
            "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
          )}
        >
          <div className="max-w-xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
              Next step
            </p>
            <p className="font-heading text-h4 tracking-h4 text-primary">Still deciding?</p>
            <p className="text-sm leading-relaxed text-muted">
              Share your goal, timeline, and downtime preference—I’ll narrow options quickly in consultation.
            </p>
          </div>
          <a
            href="#contact"
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-full",
              "bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-background",
              "transition-opacity hover:opacity-90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            )}
          >
            Book a consultation
          </a>
        </div>
      </div>
    </div>
  );
}
