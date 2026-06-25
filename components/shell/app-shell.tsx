"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Home,
  Inbox,
  Menu,
  Plus,
  Share2,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  MOBILE_NAV_ITEMS,
  ROUTES,
  isRouteActive,
} from "@/lib/routes";
import { AmbientMesh } from "./ambient-mesh";
import { Sidebar } from "./sidebar";

const mobileIconByRoute: Record<
  (typeof MOBILE_NAV_ITEMS)[number]["route"],
  LucideIcon
> = {
  dashboard: Home,
  publishing: Share2,
  calendar: CalendarDays,
  inbox: Inbox,
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const closeDrawer = () => {
    setOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  return (
    <div className="relative h-dvh overflow-hidden">
      <AmbientMesh />

      <div className="relative z-10 flex h-full min-h-0 gap-4 p-3 sm:p-4 lg:p-5">
        <aside
          aria-label="ناحیه پیمایش نشرینو"
          className="hidden w-[272px] shrink-0 lg:block"
        >
          <Sidebar />
        </aside>

        <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden rounded-[30px]">
          <header className="n-glass-control absolute inset-x-3 top-3 z-40 flex min-h-14 items-center justify-between rounded-2xl px-3 lg:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              aria-label="باز کردن منو"
              aria-expanded={open}
              aria-controls="mobile-navigation-dialog"
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-xl hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>

            <div className="text-center">
              <p className="text-sm font-bold">نشرینو</p>
              <p className="text-[10px] text-ink-secondary">مرکز عملیات</p>
            </div>

            <Link
              href={ROUTES.compose}
              aria-label="محتوای جدید"
              className="grid size-11 place-items-center rounded-xl bg-accent text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45"
            >
              <Plus className="size-5" aria-hidden="true" />
            </Link>
          </header>

          <main
            id="main-content"
            tabIndex={-1}
            className="absolute inset-0 overflow-x-clip overflow-y-auto px-1 pb-24 pt-20 focus:outline-none sm:px-2 lg:pb-6 lg:pt-1"
          >
            <div className="mx-auto w-full max-w-[1600px] p-2 sm:p-3 lg:p-4">
              {children}
            </div>
          </main>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-label="بستن منو"
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          <aside
            ref={dialogRef}
            id="mobile-navigation-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            className="absolute inset-y-0 right-0 w-[min(86vw,320px)] p-3"
          >
            <h2 id="mobile-navigation-title" className="sr-only">
              منوی اصلی نشرینو
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="بستن منو"
              onClick={closeDrawer}
              className="absolute left-6 top-6 z-10 grid size-10 place-items-center rounded-xl bg-white/10 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <Sidebar onNavigate={closeDrawer} />
          </aside>
        </div>
      ) : null}

      <nav
        aria-label="پیمایش موبایل"
        className="n-glass-control fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-50 grid h-[68px] grid-cols-5 items-center rounded-[24px] px-2 lg:hidden"
      >
        {MOBILE_NAV_ITEMS.slice(0, 2).map(({ route, label }) => {
          const href = ROUTES[route];
          return (
            <MobileItem
              key={route}
              href={href}
              label={label}
              active={isRouteActive(pathname, href)}
              icon={mobileIconByRoute[route]}
            />
          );
        })}

        <Link
          href={ROUTES.compose}
          aria-label="محتوای جدید"
          className="mx-auto grid size-12 -translate-y-3 place-items-center rounded-2xl bg-accent text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45"
        >
          <Plus className="size-6" aria-hidden="true" />
        </Link>

        {MOBILE_NAV_ITEMS.slice(2).map(({ route, label }) => {
          const href = ROUTES[route];
          return (
            <MobileItem
              key={route}
              href={href}
              label={label}
              active={isRouteActive(pathname, href)}
              icon={mobileIconByRoute[route]}
            />
          );
        })}
      </nav>
    </div>
  );
}

function MobileItem({
  href,
  label,
  active,
  icon: Icon,
}: {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 ${
        active ? "text-accent" : "text-ink-secondary"
      }`}
    >
      <Icon className="size-5" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}
