import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const pClass =
  "text-base leading-[var(--text-base--line-height)] text-primary/90";
const h3Class = "type-h4 mt-6 text-primary";
const listClass =
  "list-disc space-y-2 pl-6 text-base leading-[var(--text-base--line-height)] text-primary/90 marker:text-accent";
const linkClass =
  "text-accent underline underline-offset-2 transition-colors hover:text-primary";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={pClass}>{children}</p>,
    h3: ({ children }) => <h3 className={h3Class}>{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className={listClass}>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-primary">{children}</strong>
    ),
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href.trim() : "";
      if (!href) return <>{children}</>;

      if (href.startsWith("/")) {
        return (
          <Link href={href} className={linkClass}>
            {children}
          </Link>
        );
      }

      return (
        <a href={href} className={linkClass}>
          {children}
        </a>
      );
    },
  },
};

export interface LegalPortableTextProps {
  value: PortableTextBlock[];
  className?: string;
}

export function LegalPortableText({ value, className }: LegalPortableTextProps) {
  if (!value.length) return null;

  return (
    <div className={cn("space-y-4", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
