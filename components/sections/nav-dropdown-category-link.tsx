"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";

import { getTreatmentCategoryIconSrc } from "@/lib/nav/get-treatment-category-icon";
import type { ContentLink } from "@/lib/types/content";

export interface NavDropdownCategoryLinkProps {
  item: ContentLink;
}

export function NavDropdownCategoryLink({
  item,
}: NavDropdownCategoryLinkProps) {
  const iconSrc = getTreatmentCategoryIconSrc(item.href);

  return (
    <Link
      href={item.href}
      className="group/item relative flex h-full min-h-20 flex-col justify-center overflow-hidden px-4 pb-4 pt-6 transition-colors hover:bg-background"
    >
      {/* Текст гарантированно выше иконки благодаря z-10 */}
      <span className="relative z-10 font-heading text-base leading-snug text-primary transition-colors group-hover/item:text-accent">
        {item.label}
      </span>

      {iconSrc ? (
        <Image
          src={iconSrc}
          alt=""
          width={110} // Увеличили базовый размер для оптимизации Next.js
          height={110}
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 z-0 h-28 w-28 object-contain object-bottom-right opacity-[0.25] transition-all duration-300 group-hover/item:bottom-1 group-hover/item:opacity-40"
        />
      ) : null}
    </Link>
  );
}
