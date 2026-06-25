"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, Inbox, Menu, Plus, Share2, X } from "lucide-react";
import { AmbientMesh } from "./ambient-mesh";
import { Sidebar } from "./sidebar";

const mobileItems = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/queue", label: "انتشار", icon: Share2 },
  { href: "/calendar", label: "تقویم", icon: CalendarDays },
  { href: "/inbox", label: "صندوق", icon: Inbox },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="relative h-dvh overflow-hidden">
      <AmbientMesh />
      <div className="relative z-10 flex h-full min-h-0 gap-4 p-3 sm:p-4 lg:p-5">
        <aside className="hidden w-[272px] shrink-0 lg:block"><Sidebar /></aside>
        <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden rounded-[30px]">
          <header className="n-glass-control absolute inset-x-3 top-3 z-40 flex min-h-14 items-center justify-between rounded-2xl px-3 lg:hidden">
            <button type="button" aria-label="باز کردن منو" aria-expanded={open} onClick={() => setOpen(true)} className="grid size-11 place-items-center rounded-xl hover:bg-white/10"><Menu className="size-5" /></button>
            <div className="text-center"><p className="text-sm font-bold">نشرینو</p><p className="text-[10px] text-ink-secondary">مرکز عملیات</p></div>
            <Link href="/compose" aria-label="محتوای جدید" className="grid size-11 place-items-center rounded-xl bg-accent text-white"><Plus className="size-5" /></Link>
          </header>
          <main id="main-content" tabIndex={-1} className="absolute inset-0 overflow-y-auto overflow-x-clip px-1 pb-24 pt-20 focus:outline-none sm:px-2 lg:pb-6 lg:pt-1">
            <div className="mx-auto w-full max-w-[1600px] p-2 sm:p-3 lg:p-4">{children}</div>
          </main>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button aria-label="بستن منو" className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside role="dialog" aria-modal="true" aria-label="منوی اصلی" className="absolute inset-y-0 right-0 w-[min(86vw,320px)] p-3">
            <button type="button" aria-label="بستن منو" onClick={() => setOpen(false)} className="absolute left-6 top-6 z-10 grid size-10 place-items-center rounded-xl bg-white/10 text-white"><X className="size-5" /></button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      ) : null}

      <nav aria-label="پیمایش موبایل" className="n-glass-control fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-50 grid h-[68px] grid-cols-5 items-center rounded-[24px] px-2 lg:hidden">
        {mobileItems.slice(0, 2).map(({ href, label, icon: Icon }) => <MobileItem key={href} href={href} label={label} active={href === "/" ? pathname === "/" : pathname.startsWith(href)} icon={Icon} />)}
        <Link href="/compose" aria-label="محتوای جدید" className="mx-auto grid size-12 -translate-y-3 place-items-center rounded-2xl bg-accent text-white shadow-lg"><Plus className="size-6" /></Link>
        {mobileItems.slice(2).map(({ href, label, icon: Icon }) => <MobileItem key={href} href={href} label={label} active={pathname.startsWith(href)} icon={Icon} />)}
      </nav>
    </div>
  );
}

function MobileItem({ href, label, active, icon: Icon }: { href: string; label: string; active: boolean; icon: typeof Home }) {
  return <Link href={href} className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium ${active ? "text-accent" : "text-ink-secondary"}`}><Icon className="size-5" /><span>{label}</span></Link>;
}
