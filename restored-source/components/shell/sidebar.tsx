import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Send,
  Flag,
  Folder,
  Mail,
  BarChart3,
  Link2,
  Users,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";

export function Sidebar() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[var(--radius-panel)] bg-[#1e2333]/70 backdrop-blur-[28px] saturate-[1.2] border border-white/10 text-white/90 shadow-panel">
      {/* Brand Header */}
      <div className="shrink-0 px-4 pb-2 pt-6">
        <Link
          href="/"
          aria-label="صفحه اصلی نشرینو"
          className="flex min-h-12 items-center gap-3 px-2 transition-colors hover:text-white"
        >
          <div className="flex size-9 items-center justify-center rounded-[var(--radius-small)] bg-gradient-to-br from-[#45B2E8] to-[#5569F2] text-white shadow-inner">
            <span className="text-xl font-bold">N</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xl font-bold tracking-tight text-white">
              نشرینو
            </span>
            <span className="text-[9px] font-[600] tracking-widest text-white/40 mt-0.5 uppercase">
              NASHRINO
            </span>
          </div>
        </Link>
      </div>

      {/* User Profile */}
      <div className="px-4 py-4 shrink-0">
        <button className="w-full flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              alt="علی احمدی"
              className="size-10 rounded-full border border-white/10"
            />
            <div className="flex flex-col items-start text-start">
              <span className="text-[13px] font-[750] text-white">
                علی احمدی
              </span>
              <span className="text-[11px] text-white/50">مدیر عملیات</span>
            </div>
          </div>
          <ChevronDown className="size-4 text-white/40" />
        </button>
      </div>

      {/* Main Navigation (Scrollable internally) */}
      <nav
        aria-label="پیمایش اصلی"
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-2 space-y-1.5 no-scrollbar"
      >
        <SidebarNavItem
          href="/"
          icon={<LayoutDashboard className="size-5" />}
          active
        >
          داشبورد
        </SidebarNavItem>
        <SidebarNavItem href="/calendar" icon={<Calendar className="size-5" />}>
          تقویم محتوا
        </SidebarNavItem>
        <SidebarNavItem href="/publish" icon={<Send className="size-5" />}>
          انتشار
        </SidebarNavItem>
        <SidebarNavItem href="/campaigns" icon={<Flag className="size-5" />}>
          کمپین‌ها
        </SidebarNavItem>
        <SidebarNavItem href="/library" icon={<Folder className="size-5" />}>
          کتابخانه محتوا
        </SidebarNavItem>
        <SidebarNavItem
          href="/inbox"
          icon={<Mail className="size-5" />}
          badge={12}
        >
          صندوق ورودی
        </SidebarNavItem>
        <SidebarNavItem
          href="/analytics"
          icon={<BarChart3 className="size-5" />}
        >
          تحلیل و گزارش‌ها
        </SidebarNavItem>
        <SidebarNavItem href="/platforms" icon={<Link2 className="size-5" />}>
          پلتفرم‌ها و اتصال‌ها
        </SidebarNavItem>
        <SidebarNavItem href="/team" icon={<Users className="size-5" />}>
          تیم و نقش‌ها
        </SidebarNavItem>
        <SidebarNavItem href="/settings" icon={<Settings className="size-5" />}>
          تنظیمات
        </SidebarNavItem>
      </nav>

      {/* Bottom Actions */}
      <div className="shrink-0 p-4 space-y-3">
        <SidebarNavItem href="/help" icon={<HelpCircle className="size-5" />}>
          مرکز راهنما
        </SidebarNavItem>
        <div className="flex items-center justify-between p-1 rounded-full bg-black/20 border border-white/5 mx-2">
          <button className="flex-1 flex items-center justify-center p-1.5 rounded-full hover:text-white text-white/40 transition-colors">
            <Sun className="size-4" />
          </button>
          <button className="flex-1 flex items-center justify-center p-1.5 rounded-full bg-white/10 text-[#45B2E8] shadow-sm">
            <Moon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarNavItem({
  href,
  icon,
  children,
  active = false,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      data-active={active || undefined}
      className="
        flex min-h-[46px] items-center gap-3.5
        rounded-2xl px-4 text-[13px] font-[650] text-white/60
        transition-all hover:text-white hover:bg-white/5
        data-[active]:bg-gradient-to-l data-[active]:from-[#3445A8] data-[active]:to-[#4757CD] data-[active]:text-white data-[active]:shadow-md
      "
    >
      <div className="opacity-80 data-[active]:opacity-100 shrink-0">
        {icon}
      </div>
      <span className="flex-1 truncate">{children}</span>
      {badge && (
        <span className="flex h-5 items-center justify-center rounded-full bg-[#B34BD6] px-1.5 text-[10px] font-bold text-white shadow-sm shrink-0 min-w-5">
          {badge}
        </span>
      )}
    </Link>
  );
}
