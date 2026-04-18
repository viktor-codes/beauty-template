import Link from "next/link";

import type { ContentLink, FooterLinkGroup } from "@/lib/types/content";

function isHttpUrl(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function FooterNavLinks({ links }: { links: ContentLink[] }) {
  const linkClass =
    "text-sm text-muted transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <ul className="mt-4 space-y-4">
      {links.map((link) => {
        const isExternal = isHttpUrl(link.href);

        if (isExternal) {
          return (
            <li key={`${link.label}-${link.href}`}>
              <a
                href={link.href}
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </li>
          );
        }

        return (
          <li key={`${link.label}-${link.href}`}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function SiteFooterLinkGroup({ group }: { group: FooterLinkGroup }) {
  return (
    <div>
      <p className="font-heading text-sm font-medium tracking-wide text-primary">
        {group.heading}
      </p>
      <FooterNavLinks links={group.links} />
    </div>
  );
}
