import type {
  ContentLink,
  NavContent,
  ServicesCategoryPreview,
} from "@/lib/types/content";

const TREATMENTS_HUB_HREF = "/treatments";

function isTreatmentsNavHref(href: string): boolean {
  const trimmed = href.trim();
  return (
    trimmed === TREATMENTS_HUB_HREF ||
    trimmed === "#treatments" ||
    trimmed === "/#treatments"
  );
}

/** Injects featured treatment category links into the treatments nav item for desktop dropdown. */
export function enrichNavWithTreatmentCategories(
  nav: NavContent,
  categories: ServicesCategoryPreview[],
  viewAll: ContentLink,
): NavContent {
  const children = categories
    .filter(({ featuredInNav }) => featuredInNav === true)
    .map(({ title, href }) => ({
      label: title,
      href,
    }));

  return {
    ...nav,
    links: nav.links.map((link) => {
      if (!isTreatmentsNavHref(link.href)) return link;

      return {
        ...link,
        href: TREATMENTS_HUB_HREF,
        children,
        viewAll: {
          label: viewAll.label,
          href: viewAll.href,
        },
      };
    }),
  };
}
