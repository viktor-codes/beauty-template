"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ArrowRightIcon, CaretDownIcon } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";

import { cn } from "@/lib/cn";
import type { NavLink } from "@/lib/types/content";

const CLOSE_DELAY_MS = 250;

interface NavDropdownContextValue {
  activeHref: string | null;
  open: (href: string) => void;
  scheduleClose: () => void;
  cancelClose: () => void;
}

const NavDropdownContext = createContext<NavDropdownContextValue | null>(null);

function useNavDropdownContext(): NavDropdownContextValue {
  const context = useContext(NavDropdownContext);

  if (!context) {
    throw new Error(
      "NavDropdown components must be used within NavDropdownProvider",
    );
  }

  return context;
}

function useNavDropdownItem(href: string) {
  const { activeHref, open, scheduleClose, cancelClose } =
    useNavDropdownContext();
  const isOpen = activeHref === href;

  const triggerProps = {
    onMouseEnter: () => open(href),
    onMouseLeave: scheduleClose,
    onFocus: () => open(href),
    onBlur: scheduleClose,
  };

  const panelProps = {
    onMouseEnter: () => {
      cancelClose();
      open(href);
    },
    onMouseLeave: scheduleClose,
  };

  return { isOpen, triggerProps, panelProps };
}

export interface NavDropdownProviderProps {
  children: ReactNode;
}

export function NavDropdownProvider({ children }: NavDropdownProviderProps) {
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const open = useCallback(
    (href: string) => {
      cancelClose();
      setActiveHref(href);
    },
    [cancelClose],
  );

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setActiveHref(null);
      closeTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  }, [cancelClose]);

  return (
    <NavDropdownContext.Provider
      value={{ activeHref, open, scheduleClose, cancelClose }}
    >
      {children}
    </NavDropdownContext.Provider>
  );
}

export interface NavDropdownTriggerProps {
  link: NavLink;
  className?: string;
}

export interface NavDropdownPanelProps {
  link: NavLink;
  className?: string;
}

export function NavDropdownTrigger({
  link,
  className,
}: NavDropdownTriggerProps) {
  const { isOpen, triggerProps } = useNavDropdownItem(link.href);

  return (
    <div
      {...triggerProps}
      className={cn("hidden md:block", className)}
      data-open={isOpen || undefined}
    >
      <div className="flex items-end gap-1">
        <Link
          href={link.href}
          className="text-nav-link text-muted transition-colors hover:text-primary"
        >
          {link.label}
        </Link>
        <CaretDownIcon
          className={cn(
            "mb-1 h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-300",
            isOpen && "rotate-180",
          )}
          weight="light"
          aria-hidden
        />
      </div>
    </div>
  );
}

export function NavDropdownPanel({ link, className }: NavDropdownPanelProps) {
  const items = link.children ?? [];
  const viewAll = link.viewAll;
  const { isOpen, panelProps } = useNavDropdownItem(link.href);
  const columnCount = items.length + (viewAll ? 1 : 0);

  if (items.length === 0) return null;

  const gridStyle = {
    "--nav-dropdown-cols": columnCount,
  } as CSSProperties;

  return (
    <div
      {...panelProps}
      className={cn(
        "absolute inset-x-0 top-full z-(--z-dropdown) hidden pt-1.5 md:block",
        "transition-[opacity,visibility] duration-200",
        isOpen
          ? "visible opacity-100"
          : "pointer-events-none invisible opacity-0",
        className,
      )}
    >
      <div className="border border-t border-border bg-surface/95 shadow-[0_28px_56px_-16px_rgba(44,44,44,0.14)] backdrop-blur-md">
        <ul
          className="grid grid-cols-3 gap-px bg-border/70 lg:grid-cols-[repeat(var(--nav-dropdown-cols),minmax(0,1fr))]"
          style={gridStyle}
          role="list"
          aria-label={link.label}
        >
          {items.map((item) => (
            <li key={`${item.label}-${item.href}`} className="bg-surface/95">
              <Link
                href={item.href}
                className="group/item flex h-full min-h-28 flex-col justify-end px-3 py-4 transition-colors hover:bg-background sm:px-4"
              >
                <span className="font-heading text-base leading-snug text-primary transition-colors group-hover/item:text-accent">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
          {viewAll ? (
            <li
              key={`${viewAll.label}-${viewAll.href}`}
              className="bg-surface/95"
            >
              <Link
                href={viewAll.href}
                className="group/view-all flex h-full min-h-28 flex-col justify-end gap-2 px-3 py-4 transition-colors hover:bg-background sm:px-4"
              >
                <span className="font-heading text-base leading-snug text-accent transition-colors group-hover/view-all:text-primary">
                  {viewAll.label}
                </span>
                <ArrowRightIcon
                  className="h-4 w-4 text-accent transition-transform group-hover/view-all:translate-x-0.5"
                  weight="light"
                  aria-hidden
                />
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
