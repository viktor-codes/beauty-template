"use client";

import type { ReactNode } from "react";

import { NavDropdownProvider } from "@/components/sections/nav-dropdown";
import { cn } from "@/lib/cn";

const headerContainerClass =
  "relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8";

export interface SiteHeaderContainerProps {
  children: ReactNode;
  className?: string;
}

export function SiteHeaderContainer({
  children,
  className,
}: SiteHeaderContainerProps) {
  return (
    <NavDropdownProvider>
      <div className={cn(headerContainerClass, className)}>{children}</div>
    </NavDropdownProvider>
  );
}
