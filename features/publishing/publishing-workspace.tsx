"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  CirclePause,
  CirclePlay,
  Clock3,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Send,
  ShieldAlert,
  X,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";
import {
  canPausePublishingJob,
  canResumePublishingJob,
  canRetryPublishingJob,
  countPublishingTab,
  filterPublishingJobs,
  formatPublishingDate,
  PLATFORM_LABELS,
  STATUS_META,
  summarizePublishingJobs,
} from "./model";
import type {
  PublishingDataState,
  PublishingFilters,
  PublishingJob,
  PublishingJobStatus,
  PublishingPlatform,
  PublishingQueueTab,
  PublishingSeverity,
} from "./types";

const tabs: Array<{ value: PublishingQueueTab; label: string }> = [
  { value: "live", label: "زنده" },
  { value: "upcoming", label: "پیش رو" },
  { value: "action", label: "نیازمند اقدام" },
  { value: "history", label: "تاریخچه" },
  { value: "all", label: "همه" },
];

const platformOptions: Array<{ value: PublishingPlatform | "all"; label: string }> = [
  { value: "all", label: "همه پلتفرم‌ها" },
  { value: "instagram", label: "اینستاگرام" },
  { value: "telegram", label: "تلگرام" },
  { value: "linkedin", label: "لینکدین" },
  { value: "rubika", label: "روبیکا" },
];

const statusOptions: Array<{ value: PublishingJobStatus | "all"; label: string }> = [
  { value: "all", label: "همه وضعیت‌ها" },
  ...Object.entries(STATUS_META).map(([value, meta]) => ({
    value: value as PublishingJobStatus,
    label: meta.label,
  })),
];

const severityClasses: Record<PublishingSeverity, string> = {
  neutral: "bg-slate-500",
  info: "bg-sky-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  critical: "bg-rose-500",
};

const platformMarks: Record<PublishingPlatform, string> = {
  instagram: "IG",
  telegram: "TG",
  linkedin: "IN",
  rubika: "RB",
};

export function PublishingWorkspace({
  initialJobs,
  dataState = "ready",
}: {
  initialJobs: PublishingJob[];
  dataState?: PublishingDataState;
}) {
  const [jobs, setJobs] = useState(initialJobs);
  const [filters, setFilters] = useState<PublishingFilters>({
    tab: "all",
    query: "",
    platform: "all",
    status: "all",
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string>("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const summary = useMemo(() => summarizePublishingJobs(jobs), [jobs]);
  const visibleJobs = useMemo(
    () => filterPublishingJobs(jobs, filters),
    [filters, jobs],
  );
  const selectedJob = useMemo(
    () => jobs.find((job) => job.id === selectedId) ?? null,
    [jobs, selectedId],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedJob && !dialog.open) {
      dialog.showModal();
    } else if (!selectedJob && dialog.open) {
      dialog.close();
    }
  }, [selectedJob]);

  function replaceJob(jobId: string, update: (job: PublishingJob) => PublishingJob) {
    setJobs((current) =>
      current.map((job) => (job.id === jobId ? update(job) : job)),
    );
  }

  function retryJob(job: PublishingJob) {
    if (!canRetryPublishingJob(job)) return;
    replaceJob(job.id, (current) => ({
      ...current,
      status: "retrying",
      progress: 8,
      retryCount: current.retryCount + 1,
      latestError: undefined,
      updatedAt: new Date().toISOString(),
      version: current.version + 1,
      targets: current.targets.map((target) => ({
        ...target,
        status: "retrying",
        progress: 8,
        latestError: undefined,
      })),
    }));
    setNotice(`«${job.title}» برای تلاش مجدد آماده شد.`);
  }

  function pauseJob(job: PublishingJob) {
    if (!canPausePublishingJob(job)) return;
    replaceJob(job.id, (current) => ({
      ...current,
      status: "paused",
      updatedAt: new Date().toISOString(),
      version: current.version + 1,
      targets: current.targets.map((target) => ({ ...target, status: "paused" })),
    }));
    setNotice(`انتشار «${job.title}» متوقف شد.`);
  }

  function resumeJob(job: PublishingJob) {
    if (!canResumePublishingJob(job)) return;
    replaceJob(job.id, (current) => ({
      ...current,
      status: "queued",
      updatedAt: new Date().toISOString(),
      version: current.version + 1,
      targets: current.targets.map((target) => ({ ...target, status: "queued" })),
    }));
    setNotice(`«${job.title}» دوباره وارد صف شد.`);
  }

  function rescheduleJob(job: PublishingJob) {
    const scheduledAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    replaceJob(job.id, (current) => ({
      ...current,
      status: "scheduled",
      progress: 0,
      scheduledAt,
      updatedAt: new Date().toISOString(),
      version: current.version + 1,
      targets: current.targets.map((target) => ({
        ...target,
        status: "scheduled",
        progress: 0,
      })),
    }));
    setNotice(`زمان انتشار «${job.title}» یک ساعت به تعویق افتاد.`);
  }

  function completeManualJob(job: PublishingJob) {
    if (job.status !== "manual_required") return;
    replaceJob(job.id, (current) => ({
      ...current,
      status: "published",
      progress: 100,
      completedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: current.version + 1,
      targets: current.targets.map((target) => ({
        ...target,
        status: "published",
        progress: 100,
      })),
    }));
    setNotice(`انتشار دستی «${job.title}» ثبت شد.`);
  }

  function cancelJob(job: PublishingJob) {
    replaceJob(job.id, (current) => ({
      ...current,
      status: "cancelled",
      updatedAt: new Date().toISOString(),
      version: current.version + 1,
      targets: current.targets.map((target) => ({ ...target, status: "cancelled" })),
    }));
    setNotice(`«${job.title}» لغو شد.`);
  }

  return (
    <div className="flex flex-col gap-4 pb-8 md:gap-5">
      <PublishingHeader total={summary.total} actionCount={summary.action} />

      {notice ? (
        <div role="status" className="flex items-start justify-between gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm">
          <span>{notice}</span>
          <button
            type="button"
            aria-label="بستن پیام"
            onClick={() => setNotice("")}
            className="grid size-8 shrink-0 place-items-center rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      <DataStateNotice state={dataState} />

      <section aria-label="خلاصه صف انتشار" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard icon={Send} label="در حال اجرا" value={summary.live} tone="info" onClick={() => setFilters((current) => ({ ...current, tab: "live" }))} />
        <SummaryCard icon={CalendarClock} label="پیش رو" value={summary.upcoming} tone="neutral" onClick={() => setFilters((current) => ({ ...current, tab: "upcoming" }))} />
        <SummaryCard icon={ShieldAlert} label="نیازمند اقدام" value={summary.action} tone="warning" onClick={() => setFilters((current) => ({ ...current, tab: "action" }))} />
        <SummaryCard icon={AlertTriangle} label="ناموفق" value={summary.failed} tone="critical" onClick={() => setFilters((current) => ({ ...current, tab: "action", status: "failed" }))} />
      </section>

      <section className="n-panel overflow-hidden" aria-labelledby="publishing-queue-title">
        <div className="border-b border-[var(--n-panel-divider)] p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 id="publishing-queue-title" className="text-lg font-bold">صف انتشار</h2>
              <p className="mt-1 text-sm text-ink-secondary">وضعیت پردازش، خطاها و خروجی‌های پیش رو را کنترل کنید.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setJobs(initialJobs)} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--n-panel-divider)] px-3 text-sm font-semibold hover:bg-[var(--n-hover)]">
                <RefreshCw className="size-4" aria-hidden="true" />
                بازنشانی داده نمایشی
              </button>
              <Link href={ROUTES.compose} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white">
                <Plus className="size-4" aria-hidden="true" />
                محتوای جدید
              </Link>
            </div>
          </div>

          <div className="mt-5 flex gap-1 overflow-x-auto rounded-2xl border border-[var(--n-panel-divider)] bg-white/35 p-1 dark:bg-white/[0.03]" role="tablist" aria-label="گروه وضعیت انتشار">
            {tabs.map((tab) => {
              const active = filters.tab === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilters((current) => ({ ...current, tab: tab.value }))}
                  className={`min-h-10 shrink-0 rounded-xl px-3 text-xs font-semibold transition ${active ? "bg-accent text-white shadow-sm" : "text-ink-secondary hover:bg-[var(--n-hover)] hover:text-ink-primary"}`}
                >
                  {tab.label} · {countPublishingTab(jobs, tab.value)}
                </button>
              );
            })}
          </div>

          <div className="mt-4 grid gap-2 lg:grid-cols-[minmax(240px,1fr)_190px_190px]">
            <label className="flex min-h-11 items-center gap-2 rounded-xl border border-[var(--n-panel-divider)] bg-white/45 px-3 dark:bg-white/5">
              <Search className="size-4 text-ink-secondary" aria-hidden="true" />
              <span className="sr-only">جستجو در صف انتشار</span>
              <input
                value={filters.query}
                onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))}
                placeholder="جستجو در عنوان، کمپین، حساب یا خطا…"
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>

            <FilterSelect
              label="پلتفرم"
              value={filters.platform}
              options={platformOptions}
              onChange={(value) => setFilters((current) => ({ ...current, platform: value as PublishingPlatform | "all" }))}
            />
            <FilterSelect
              label="وضعیت"
              value={filters.status}
              options={statusOptions}
              onChange={(value) => setFilters((current) => ({ ...current, status: value as PublishingJobStatus | "all" }))}
            />
          </div>
        </div>

        {dataState === "loading" ? <LoadingRows /> : null}
        {dataState === "restricted" ? <RestrictedState /> : null}
        {dataState !== "loading" && dataState !== "restricted" ? (
          visibleJobs.length > 0 ? (
            <div>
              <div className="hidden grid-cols-[minmax(260px,1fr)_190px_150px_150px_48px] gap-3 border-b border-[var(--n-panel-divider)] px-5 py-3 text-xs font-semibold text-ink-secondary lg:grid">
                <span>محتوا و مقصد</span><span>وضعیت</span><span>زمان</span><span>مسئول</span><span className="sr-only">اقدامات</span>
              </div>
              <div className="divide-y divide-[var(--n-panel-divider)]">
                {visibleJobs.map((job) => (
                  <PublishingRow key={job.id} job={job} onOpen={() => setSelectedId(job.id)} />
                ))}
              </div>
            </div>
          ) : (
            <EmptyQueue filtered={jobs.length > 0} onReset={() => setFilters({ tab: "all", query: "", platform: "all", status: "all" })} />
          )
        ) : null}
      </section>

      <dialog
        ref={dialogRef}
        onClose={() => setSelectedId(null)}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-ink-primary backdrop:bg-slate-950/45 backdrop:backdrop-blur-sm"
      >
        {selectedJob ? (
          <div className="flex h-full justify-end" dir="rtl">
            <aside className="h-full w-full overflow-y-auto border-s border-[var(--n-panel-divider)] bg-[var(--n-panel-bg)] p-4 shadow-2xl sm:w-[min(92vw,520px)] sm:p-5">
              <JobDetails
                job={selectedJob}
                onClose={() => dialogRef.current?.close()}
                onRetry={() => retryJob(selectedJob)}
                onPause={() => pauseJob(selectedJob)}
                onResume={() => resumeJob(selectedJob)}
                onReschedule={() => rescheduleJob(selectedJob)}
                onCompleteManual={() => completeManualJob(selectedJob)}
                onCancel={() => cancelJob(selectedJob)}
              />
            </aside>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}

function PublishingHeader({ total, actionCount }: { total: number; actionCount: number }) {
  return (
    <header className="n-glass-control flex flex-col gap-4 rounded-[24px] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-semibold text-accent">فضای انتشار</p>
        <h1 className="mt-1 text-2xl font-bold">مدیریت انتشار</h1>
        <p className="mt-2 text-sm leading-7 text-ink-secondary">صف زنده، زمان‌بندی، خطاها و عملیات اصلاحی همه مقصدها.</p>
      </div>
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        <span className="rounded-full bg-accent-soft px-3 py-2 text-accent">{total} کار ثبت‌شده</span>
        <span className={`rounded-full px-3 py-2 ${actionCount ? "bg-amber-500/12 text-amber-700 dark:text-amber-300" : "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300"}`}>{actionCount ? `${actionCount} مورد نیازمند اقدام` : "بدون مانع فعال"}</span>
      </div>
    </header>
  );
}

function SummaryCard({ icon: Icon, label, value, tone, onClick }: { icon: typeof Send; label: string; value: number; tone: PublishingSeverity; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="n-panel flex min-h-28 items-center gap-3 p-4 text-start transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45">
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent"><Icon className="size-5" aria-hidden="true" /></span>
      <span><span className="block text-2xl font-bold">{value}</span><span className="mt-1 block text-xs text-ink-secondary">{label}</span></span>
      <span className={`ms-auto size-2.5 rounded-full ${severityClasses[tone]}`} />
    </button>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: Array<{ value: string; label: string }>; onChange: (value: string) => void }) {
  return (
    <label className="flex min-h-11 items-center gap-2 rounded-xl border border-[var(--n-panel-divider)] bg-white/45 px-3 dark:bg-white/5">
      <Filter className="size-4 shrink-0 text-ink-secondary" aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none">
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function PublishingRow({ job, onOpen }: { job: PublishingJob; onOpen: () => void }) {
  const meta = STATUS_META[job.status];
  const primaryTarget = job.targets[0];
  return (
    <article className="grid gap-3 px-4 py-4 transition hover:bg-[var(--n-hover)] lg:grid-cols-[minmax(260px,1fr)_190px_150px_150px_48px] lg:items-center lg:px-5">
      <button type="button" onClick={onOpen} className="flex min-w-0 items-center gap-3 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-100 to-cyan-100 text-sm font-bold text-accent dark:from-violet-500/15 dark:to-cyan-500/10">{primaryTarget ? platformMarks[primaryTarget.platform] : "--"}</span>
        <span className="min-w-0"><span className="block truncate text-sm font-semibold">{job.title}</span><span className="mt-1 block truncate text-xs text-ink-secondary">{primaryTarget ? `${PLATFORM_LABELS[primaryTarget.platform]} · ${primaryTarget.accountHandle ?? primaryTarget.accountName}` : "بدون مقصد"}</span><span className="mt-1 block truncate text-[11px] text-ink-secondary lg:hidden">{job.campaign?.name ?? "بدون کمپین"}</span></span>
      </button>
      <div><div className="flex items-center gap-2 text-xs font-semibold"><span className={`size-2.5 rounded-full ${severityClasses[meta.severity]}`} /><span>{meta.label}</span></div>{meta.active || job.status === "retrying" ? <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200/60 dark:bg-white/10"><div className="h-full rounded-full bg-accent" style={{ width: `${job.progress}%` }} /></div> : null}</div>
      <div className="flex items-center gap-2 text-xs text-ink-secondary"><Clock3 className="size-4" aria-hidden="true" /><span>{formatPublishingDate(job.scheduledAt ?? job.startedAt)}</span></div>
      <div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">{job.responsible?.initials ?? "--"}</span><span className="text-xs text-ink-secondary">{job.responsible?.name ?? "بدون مسئول"}</span></div>
      <button type="button" onClick={onOpen} aria-label={`مشاهده جزئیات ${job.title}`} className="grid size-10 place-items-center rounded-xl hover:bg-[var(--n-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45"><MoreHorizontal className="size-5" aria-hidden="true" /></button>
    </article>
  );
}

function JobDetails({ job, onClose, onRetry, onPause, onResume, onReschedule, onCompleteManual, onCancel }: { job: PublishingJob; onClose: () => void; onRetry: () => void; onPause: () => void; onResume: () => void; onReschedule: () => void; onCompleteManual: () => void; onCancel: () => void }) {
  const meta = STATUS_META[job.status];
  return (
    <div>
      <header className="flex items-start justify-between gap-4 border-b border-[var(--n-panel-divider)] pb-4">
        <div><p className="text-xs font-semibold text-accent">جزئیات انتشار</p><h2 className="mt-1 text-xl font-bold">{job.title}</h2><p className="mt-2 text-sm leading-7 text-ink-secondary">{job.captionPreview}</p></div>
        <button type="button" onClick={onClose} aria-label="بستن جزئیات" className="grid size-11 shrink-0 place-items-center rounded-xl hover:bg-[var(--n-hover)]"><X className="size-5" /></button>
      </header>

      <div className="grid grid-cols-2 gap-3 py-4">
        <Detail label="وضعیت" value={meta.label} />
        <Detail label="زمان" value={formatPublishingDate(job.scheduledAt ?? job.startedAt)} />
        <Detail label="کمپین" value={job.campaign?.name ?? "بدون کمپین"} />
        <Detail label="مسئول" value={job.responsible?.name ?? "بدون مسئول"} />
        <Detail label="تلاش مجدد" value={`${job.retryCount} از ${job.maxRetryCount}`} />
        <Detail label="تأیید محتوا" value={approvalLabel(job.approvalStatus)} />
      </div>

      {job.latestError ? (
        <section className="rounded-2xl border border-rose-500/20 bg-rose-500/8 p-4">
          <div className="flex items-center gap-2 font-semibold text-rose-700 dark:text-rose-300"><AlertTriangle className="size-5" /><h3>{job.latestError.title}</h3></div>
          <p className="mt-2 text-sm leading-7 text-ink-secondary">{job.latestError.message}</p>
          <code dir="ltr" className="mt-3 block text-start text-xs text-ink-secondary">{job.latestError.code}</code>
        </section>
      ) : null}

      <section className="mt-5">
        <h3 className="text-sm font-bold">مقصدهای انتشار</h3>
        <div className="mt-3 space-y-2">{job.targets.map((target) => <div key={target.id} className="flex items-center gap-3 rounded-2xl border border-[var(--n-panel-divider)] p-3"><span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-xs font-bold text-accent">{platformMarks[target.platform]}</span><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{PLATFORM_LABELS[target.platform]}</p><p dir="ltr" className="truncate text-start text-xs text-ink-secondary">{target.accountHandle ?? target.accountName}</p></div><span className="text-xs font-semibold">{STATUS_META[target.status].label}</span></div>)}</div>
      </section>

      <section className="mt-5">
        <h3 className="text-sm font-bold">خط زمانی پردازش</h3>
        <ol className="mt-3 space-y-0">{job.timeline.map((event, index) => <li key={event.id} className="relative flex gap-3 pb-4"><span className={`relative z-10 mt-1 size-3 shrink-0 rounded-full ${event.status === "completed" ? "bg-emerald-500" : event.status === "failed" ? "bg-rose-500" : event.status === "active" ? "bg-sky-500" : "bg-slate-300 dark:bg-slate-600"}`} />{index < job.timeline.length - 1 ? <span className="absolute bottom-0 right-[5px] top-3 w-px bg-[var(--n-panel-divider)]" /> : null}<div><p className="text-sm font-semibold">{event.label}</p>{event.detail ? <p className="mt-1 text-xs text-ink-secondary">{event.detail}</p> : null}</div></li>)}</ol>
      </section>

      <footer className="sticky bottom-0 mt-5 flex flex-wrap gap-2 border-t border-[var(--n-panel-divider)] bg-[var(--n-panel-bg)] py-4">
        {canRetryPublishingJob(job) ? <ActionButton icon={RotateCcw} label="تلاش مجدد" onClick={onRetry} primary /> : null}
        {canPausePublishingJob(job) ? <ActionButton icon={CirclePause} label="توقف" onClick={onPause} /> : null}
        {canResumePublishingJob(job) ? <ActionButton icon={CirclePlay} label="ادامه" onClick={onResume} primary /> : null}
        {job.status === "manual_required" ? <ActionButton icon={CheckCircle2} label="ثبت انتشار دستی" onClick={onCompleteManual} primary /> : null}
        {job.status !== "published" && job.status !== "cancelled" ? <ActionButton icon={CalendarClock} label="یک ساعت تأخیر" onClick={onReschedule} /> : null}
        {job.status !== "published" && job.status !== "cancelled" ? <ActionButton icon={X} label="لغو انتشار" onClick={onCancel} critical /> : null}
      </footer>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick, primary = false, critical = false }: { icon: typeof Eye; label: string; onClick: () => void; primary?: boolean; critical?: boolean }) {
  return <button type="button" onClick={onClick} className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 ${primary ? "bg-accent text-white" : critical ? "border border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300" : "border border-[var(--n-panel-divider)] hover:bg-[var(--n-hover)]"}`}><Icon className="size-4" aria-hidden="true" />{label}</button>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-white/35 p-3 dark:bg-white/[0.035]"><p className="text-[11px] text-ink-secondary">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div>;
}

function approvalLabel(status: PublishingJob["approvalStatus"]): string {
  const labels = { approved: "تأییدشده", pending: "در انتظار تأیید", rejected: "ردشده", not_required: "بدون نیاز به تأیید" } as const;
  return labels[status];
}

function DataStateNotice({ state }: { state: PublishingDataState }) {
  if (state === "ready" || state === "loading" || state === "empty" || state === "restricted") return null;
  const copy = state === "partial" ? "بخشی از داده‌های پلتفرم‌ها هنوز همگام نشده است." : state === "stale" ? "آخرین داده دریافت‌شده قدیمی است؛ وضعیت اتصال را بررسی کنید." : "دریافت اطلاعات صف با خطا روبه‌رو شد.";
  return <div role={state === "error" ? "alert" : "status"} className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm">{copy}</div>;
}

function LoadingRows() {
  return <div aria-label="در حال بارگذاری" aria-busy="true" className="space-y-1 p-4">{Array.from({ length: 5 }, (_, index) => <div key={index} className="h-20 animate-pulse rounded-2xl bg-slate-200/55 dark:bg-white/6" />)}</div>;
}

function RestrictedState() {
  return <div className="p-10 text-center"><ShieldAlert className="mx-auto size-8 text-ink-secondary" /><h3 className="mt-4 font-bold">دسترسی مشاهده صف وجود ندارد</h3><p className="mt-2 text-sm text-ink-secondary">برای مشاهده عملیات انتشار، مجوز نقش خود را با مدیر فضای کاری بررسی کنید.</p></div>;
}

function EmptyQueue({ filtered, onReset }: { filtered: boolean; onReset: () => void }) {
  return <div className="p-10 text-center"><Send className="mx-auto size-8 text-ink-secondary" /><h3 className="mt-4 font-bold">{filtered ? "موردی با این فیلتر پیدا نشد" : "صف انتشار خالی است"}</h3><p className="mt-2 text-sm text-ink-secondary">{filtered ? "فیلترها را تغییر دهید یا همه موارد را نمایش دهید." : "برای شروع، یک محتوای جدید ایجاد و زمان‌بندی کنید."}</p>{filtered ? <button type="button" onClick={onReset} className="mt-5 min-h-11 rounded-xl border border-[var(--n-panel-divider)] px-4 text-sm font-semibold">پاک‌کردن فیلترها</button> : <Link href={ROUTES.compose} className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-accent px-4 text-sm font-semibold text-white">محتوای جدید<ChevronLeft className="ms-2 size-4" /></Link>}</div>;
}
