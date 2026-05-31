import type {
  ContentLink,
  NavContent,
  ServicesCategoryPreview,
} from "@/lib/types/content";

const TREATMENTS_HUB_HREF = "/treatments";
const NAV_DROPDOWN_CATEGORY_LIMIT = 5;

function isTreatmentsNavHref(href: string): boolean {
  const trimmed = href.trim();
  return (
    trimmed === TREATMENTS_HUB_HREF ||
    trimmed === "#treatments" ||
    trimmed === "/#treatments"
  );
}

/** Short titles only — excludes multi-word category names from the nav dropdown. */
function countTitleWords(title: string): number {
  return title
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function isNavDropdownCategoryTitle(title: string): boolean {
  return countTitleWords(title) <= 2;
}

/** Injects filtered treatment category links into the treatments nav item for desktop dropdown. */
export function enrichNavWithTreatmentCategories(
  nav: NavContent,
  categories: ServicesCategoryPreview[],
  viewAll: ContentLink,
): NavContent {
  const children = categories
    .filter(({ title }) => isNavDropdownCategoryTitle(title))
    .slice(0, NAV_DROPDOWN_CATEGORY_LIMIT)
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
