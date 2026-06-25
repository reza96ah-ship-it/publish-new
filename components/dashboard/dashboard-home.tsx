import Link from "next/link";
import { AlertTriangle, ArrowLeft, BarChart3, CalendarClock, CheckCircle2, Clock3, Eye, Filter, Heart, Inbox, Megaphone, MoreHorizontal, Plus, RefreshCw, Search, Send, ShieldAlert, TrendingUp, Users } from "lucide-react";

const jobs = [
  { title: "معرفی محصول جدید تابستانه", account: "Instagram · @nashrino", time: "امروز، ۱۴:۳۰", state: "در حال بارگذاری", progress: 65, tone: "warning" },
  { title: "گزارش ماهانه عملکرد", account: "LinkedIn · Nashrino", time: "امروز، ۱۵:۰۰", state: "در صف انتشار", progress: 20, tone: "info" },
  { title: "پیشنهاد ویژه پایان هفته", account: "Telegram · @nashrino", time: "امروز، ۱۶:۴۵", state: "نیازمند اقدام", progress: 0, tone: "danger" },
  { title: "پشت صحنه تیم محتوا", account: "Rubika · Nashrino", time: "فردا، ۰۹:۰۰", state: "زمان‌بندی‌شده", progress: 0, tone: "success" },
];

const actions = [
  { title: "۲ انتشار اینستاگرام ناموفق است", detail: "کمپین معرفی محصول تحت تأثیر قرار گرفته", action: "بررسی", tone: "danger" },
  { title: "۳ پست در انتظار تأیید", detail: "نزدیک‌ترین انتشار تا ۲ ساعت دیگر", action: "تأیید", tone: "warning" },
  { title: "مجوز لینکدین رو به انقضا است", detail: "۲ روز تا پایان اعتبار", action: "تمدید", tone: "info" },
  { title: "۵ پیام نزدیک به نقض زمان پاسخ", detail: "صندوق ورودی تیم فروش", action: "پاسخ", tone: "warning" },
];

const campaigns = [
  { title: "معرفی نسخه جدید", health: "در مسیر برنامه", days: "۱۲ روز باقی‌مانده", progress: 72, goal: "هدف تعامل ۶۸٪" },
  { title: "فروش پایان فصل", health: "نیازمند توجه", days: "۶ روز باقی‌مانده", progress: 48, goal: "هدف کلیک ۵۴٪" },
  { title: "آگاهی از برند", health: "در معرض ریسک", days: "۱۸ روز باقی‌مانده", progress: 35, goal: "هدف دسترسی ۴۱٪" },
];

const platforms = [
  { name: "اینستاگرام", state: "نیازمند احراز مجدد", detail: "۱ حساب مسئله‌دار", tone: "danger" },
  { name: "تلگرام", state: "عملیاتی", detail: "۲ کانال متصل", tone: "success" },
  { name: "لینکدین", state: "عملکرد کاهش‌یافته", detail: "همگام‌سازی با تأخیر", tone: "warning" },
  { name: "روبیکا", state: "عملیاتی", detail: "۱ کانال متصل", tone: "success" },
];

const toneClasses = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-rose-500",
  info: "bg-sky-500",
};

export function DashboardHome() {
  return (
    <div className="flex flex-col gap-4 pb-8 md:gap-5">
      <DashboardCommandBar />

      <section aria-label="خلاصه عملیات" className="grid gap-4 xl:grid-cols-3">
        <OperationalCard icon={CheckCircle2} title="سلامت انتشار" value="۹۶٪" detail="۴۱۲ موفق · ۹ ناموفق · ۷ با تأخیر" action="مشاهده موارد مسئله‌دار" href="/queue" tone="success" />
        <OperationalCard icon={CalendarClock} title="انتشار بعدی" value="امروز، ۱۴:۳۰" detail="معرفی محصول جدید · اینستاگرام" action="مشاهده برنامه" href="/calendar" tone="info" />
        <OperationalCard icon={ShieldAlert} title="نیازمند اقدام" value="۱۲ مورد" detail="تأیید، خطا، مجوز و پیام‌های فوری" action="مشاهده اقدامات" href="/inbox" tone="danger" />
      </section>

      <section aria-label="آمارهای کلیدی" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <MetricCard icon={Heart} label="تعامل کل" value="۱۲۸ هزار" trend="۱۸٫۶٪ افزایش" />
        <MetricCard icon={Eye} label="دسترسی و مشاهده" value="۴۸۲ هزار" trend="۱۲٫۴٪ افزایش" />
        <MetricCard icon={Users} label="رشد مخاطبان" value="۳٬۲۴۰+" trend="۸٫۱٪ افزایش" />
        <MetricCard icon={Megaphone} label="کمپین‌های فعال" value="۷" trend="۲ مورد نیازمند توجه" />
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="n-panel min-w-0 overflow-hidden xl:col-span-8">
          <PanelHeader title="نبض انتشار" subtitle="صف زنده پردازش و انتشار محتوا" action="مشاهده همه" href="/queue" />
          <div className="grid grid-cols-4 border-y border-[var(--n-panel-divider)] bg-white/25 px-4 py-3 text-center text-xs dark:bg-white/[0.025]">
            <Summary label="در صف" value="۸" />
            <Summary label="در حال پردازش" value="۳" />
            <Summary label="نیازمند اقدام" value="۲" />
            <Summary label="ناموفق" value="۴" />
          </div>
          <div className="divide-y divide-[var(--n-panel-divider)]">
            {jobs.map((job) => (
              <article key={job.title} className="grid gap-3 px-4 py-4 transition hover:bg-[var(--n-hover)] sm:grid-cols-[minmax(0,1fr)_150px_150px_auto] sm:items-center">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-100 to-cyan-100 text-accent dark:from-violet-500/15 dark:to-cyan-500/10"><Send className="size-5" /></div>
                  <div className="min-w-0"><h3 className="truncate text-sm font-semibold">{job.title}</h3><p dir="ltr" className="mt-1 truncate text-start text-xs text-ink-secondary">{job.account}</p></div>
                </div>
                <p className="text-xs text-ink-secondary">{job.time}</p>
                <div><div className="flex items-center gap-2 text-xs"><span className={`size-2 rounded-full ${toneClasses[job.tone as keyof typeof toneClasses]}`} /><span>{job.state}</span></div>{job.progress > 0 ? <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200/60 dark:bg-white/10"><div className="h-full rounded-full bg-accent" style={{ width: `${job.progress}%` }} /></div> : null}</div>
                <button type="button" aria-label={`اقدامات ${job.title}`} className="grid size-10 place-items-center rounded-xl hover:bg-[var(--n-hover)]"><MoreHorizontal className="size-5" /></button>
              </article>
            ))}
          </div>
        </div>

        <div className="n-panel overflow-hidden xl:col-span-4">
          <PanelHeader title="مرکز اقدام" subtitle="اولویت‌های شخصی و هشدارهای مهم" action="مشاهده همه" href="/inbox" />
          <div className="space-y-2 p-3">
            {actions.map((item, index) => (
              <article key={item.title} className={`rounded-2xl border border-[var(--n-panel-divider)] p-3 ${index === 0 ? "bg-rose-500/[0.07]" : "bg-white/25 dark:bg-white/[0.025]"}`}>
                <div className="flex items-start gap-3"><span className={`mt-1 size-2.5 shrink-0 rounded-full ${toneClasses[item.tone as keyof typeof toneClasses]}`} /><div className="min-w-0 flex-1"><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-1 text-xs leading-6 text-ink-secondary">{item.detail}</p></div></div>
                <button type="button" className="mt-3 min-h-9 rounded-xl bg-accent-soft px-3 text-xs font-semibold text-accent">{item.action}</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="n-panel overflow-hidden xl:col-span-8">
          <PanelHeader title="وضعیت کمپین‌ها" subtitle="پیشرفت انتشار و تحقق هدف" action="مشاهده کمپین‌ها" href="/campaigns" />
          <div className="divide-y divide-[var(--n-panel-divider)]">
            {campaigns.map((campaign) => (
              <article key={campaign.title} className="grid gap-3 px-4 py-4 md:grid-cols-[minmax(0,1fr)_180px_140px] md:items-center">
                <div><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-semibold">{campaign.title}</h3><span className="rounded-full bg-accent-soft px-2 py-1 text-[11px] font-semibold text-accent">{campaign.health}</span></div><p className="mt-1 text-xs text-ink-secondary">{campaign.days} · {campaign.goal}</p></div>
                <div><div className="mb-2 flex justify-between text-xs text-ink-secondary"><span>تحقق برنامه</span><span>{campaign.progress}٪</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-200/60 dark:bg-white/10"><div className="h-full rounded-full bg-accent" style={{ width: `${campaign.progress}%` }} /></div></div>
                <div className="flex items-center gap-2 text-xs text-ink-secondary"><span className="grid size-7 place-items-center rounded-lg bg-pink-500/10 text-pink-600">I</span><span className="grid size-7 place-items-center rounded-lg bg-sky-500/10 text-sky-600">T</span><span className="grid size-7 place-items-center rounded-lg bg-blue-500/10 text-blue-600">L</span></div>
              </article>
            ))}
          </div>
        </div>

        <div className="n-panel overflow-hidden xl:col-span-4">
          <PanelHeader title="وضعیت پلتفرم‌ها" subtitle="سلامت اتصال و همگام‌سازی" action="مدیریت اتصال‌ها" href="/channels" />
          <div className="divide-y divide-[var(--n-panel-divider)]">
            {platforms.map((platform) => (
              <Link key={platform.name} href="/channels" className="flex items-center gap-3 px-4 py-4 transition hover:bg-[var(--n-hover)]">
                <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-slate-100 font-bold text-slate-700 dark:bg-white/8 dark:text-white">{platform.name.slice(0, 1)}</div>
                <div className="min-w-0 flex-1"><h3 className="text-sm font-semibold">{platform.name}</h3><p className="mt-1 truncate text-xs text-ink-secondary">{platform.state} · {platform.detail}</p></div>
                <span className={`size-2.5 rounded-full ${toneClasses[platform.tone as keyof typeof toneClasses]}`} />
                <ArrowLeft className="size-4 text-ink-secondary" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function DashboardCommandBar() {
  return (
    <header className="n-glass-control hidden min-h-16 items-center gap-3 rounded-[24px] px-4 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,560px)_auto]">
      <div><h1 className="text-lg font-bold">داشبورد اصلی</h1><p className="mt-1 text-xs text-ink-secondary">وضعیت زنده عملیات انتشار</p></div>
      <label className="flex min-h-11 items-center gap-2 rounded-2xl border border-[var(--n-panel-divider)] bg-white/45 px-3 dark:bg-white/5"><Search className="size-4 text-ink-secondary" /><input aria-label="جستجوی سراسری" placeholder="جستجو در محتوا، کمپین یا حساب…" className="w-full bg-transparent text-sm outline-none" /></label>
      <div className="flex items-center gap-2"><button type="button" className="grid size-11 place-items-center rounded-xl hover:bg-[var(--n-hover)]" aria-label="به‌روزرسانی"><RefreshCw className="size-4" /></button><button type="button" className="flex min-h-11 items-center gap-2 rounded-xl border border-[var(--n-panel-divider)] px-3 text-sm"><Filter className="size-4" />فیلترها</button><Link href="/compose" className="flex min-h-11 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white"><Plus className="size-4" />محتوای جدید</Link></div>
    </header>
  );
}

function OperationalCard({ icon: Icon, title, value, detail, action, href, tone }: { icon: typeof CheckCircle2; title: string; value: string; detail: string; action: string; href: string; tone: keyof typeof toneClasses }) {
  return <article className="n-panel p-5"><div className="flex items-start justify-between gap-4"><div className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent"><Icon className="size-5" /></div><span className={`mt-1 size-2.5 rounded-full ${toneClasses[tone]}`} /></div><p className="mt-5 text-sm font-medium text-ink-secondary">{title}</p><p className="mt-1 text-2xl font-bold">{value}</p><p className="mt-2 text-xs leading-6 text-ink-secondary">{detail}</p><Link href={href} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent">{action}<ArrowLeft className="size-4" /></Link></article>;
}

function MetricCard({ icon: Icon, label, value, trend }: { icon: typeof Heart; label: string; value: string; trend: string }) {
  return <article className="n-panel p-4 sm:p-5"><div className="flex items-center justify-between"><Icon className="size-5 text-accent" /><TrendingUp className="size-4 text-success" /></div><p className="mt-5 text-xs font-medium text-ink-secondary">{label}</p><p className="mt-1 text-xl font-bold sm:text-2xl">{value}</p><p className="mt-2 text-[11px] text-ink-secondary">{trend}</p></article>;
}

function PanelHeader({ title, subtitle, action, href }: { title: string; subtitle: string; action: string; href: string }) {
  return <header className="flex items-start justify-between gap-4 px-4 py-4"><div><h2 className="text-base font-bold">{title}</h2><p className="mt-1 text-xs text-ink-secondary">{subtitle}</p></div><Link href={href} className="shrink-0 text-xs font-semibold text-accent">{action}</Link></header>;
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div><p className="text-lg font-bold">{value}</p><p className="mt-1 text-[11px] text-ink-secondary">{label}</p></div>;
}
