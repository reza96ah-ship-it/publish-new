"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CalendarDays, FolderKanban, Home, Inbox, Library, Megaphone, Settings, Share2 } from "lucide-react";

const items = [
  { href: "/", label: "داشبورد", icon: Home },
  { href: "/calendar", label: "تقویم محتوا", icon: CalendarDays },
  { href: "/queue", label: "انتشار", icon: Share2 },
  { href: "/campaigns", label: "کمپین‌ها", icon: Megaphone },
  { href: "/content", label: "کتابخانه محتوا", icon: Library },
  { href: "/inbox", label: "صندوق ورودی", icon: Inbox },
  { href: "/analytics", label: "تحلیل و گزارش‌ها", icon: BarChart3 },
  { href: "/channels", label: "پلتفرم‌ها و اتصال‌ها", icon: FolderKanban },
  { href: "/settings", label: "تنظیمات", icon: Settings },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="n-glass-control flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] bg-slate-950/90 text-white">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-xl font-black shadow-lg">N</div>
        <div><p className="text-lg font-bold">نشرینو</p><p className="text-[11px] text-white/55">مرکز عملیات انتشار</p></div>
      </div>
      <nav aria-label="پیمایش اصلی" className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link key={href} href={href} onClick={onNavigate} aria-current={active ? "page" : undefined} className={`flex min-h-11 items-center gap-3 rounded-2xl px-3 text-sm font-medium transition ${active ? "bg-white/14 text-white" : "text-white/68 hover:bg-white/8 hover:text-white"}`}>
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <div className="rounded-2xl bg-white/7 p-3"><p className="text-sm font-semibold">فضای کاری نشرینو</p><p className="mt-1 text-xs text-white/52">مدیر عملیات</p></div>
      </div>
    </div>
  );
}
