"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  FolderKanban,
  Home,
  Inbox,
  Library,
  Megaphone,
  Settings,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { DESKTOP_NAV_ITEMS, ROUTES, isRouteActive } from "@/lib/routes";

const iconByRoute: Record<(typeof DESKTOP_NAV_ITEMS)[number]["route"], LucideIcon> = {
  dashboard: Home,
  calendar: CalendarDays,
  publishing: Share2,
  campaigns: Megaphone,
  content: Library,
  inbox: Inbox,
  analytics: BarChart3,
  channels: FolderKanban,
  settings: Settings,
};

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="n-glass-control flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] bg-slate-950/90 text-white">
      <Link
        href={ROUTES.dashboard}
        onClick={onNavigate}
        aria-label="صفحه اصلی نشرینو"
        className="flex items-center gap-3 px-5 py-5"
      >
        <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-xl font-black shadow-lg">
          N
        </div>
        <div>
          <p className="text-lg font-bold">نشرینو</p>
          <p className="text-[11px] text-white/55">مرکز عملیات انتشار</p>
        </div>
      </Link>

      <nav
        aria-label="پیمایش اصلی"
        className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-2"
      >
        {DESKTOP_NAV_ITEMS.map(({ route, label }) => {
          const href = ROUTES[route];
          const Icon = iconByRoute[route];
          const active = isRouteActive(pathname, href);

          return (
            <Link
              key={route}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-2xl px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 ${
                active
                  ? "bg-white/14 text-white"
                  : "text-white/68 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className="rounded-2xl bg-white/7 p-3">
          <p className="text-sm font-semibold">فضای کاری نشرینو</p>
          <p className="mt-1 text-xs text-white/52">مدیر عملیات</p>
        </div>
      </div>
    </div>
  );
}
