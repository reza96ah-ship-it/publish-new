"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  ImagePlus,
  Save,
  Send,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { composerStepIsComplete } from "./model";
import { composerDestinations } from "./fixtures";
import type {
  ComposerDraft,
  ComposerStepId,
} from "./types";

export const composerSteps: Array<{
  id: ComposerStepId;
  label: string;
  helper: string;
  icon: LucideIcon;
}> = [
  { id: "content", label: "محتوا", helper: "قالب، عنوان و متن", icon: FileText },
  { id: "destinations", label: "مقصدها", helper: "حساب‌ها و سازگاری", icon: Share2 },
  { id: "media", label: "رسانه", helper: "تصویر و ویدئو", icon: ImagePlus },
  { id: "review", label: "بازبینی", helper: "زمان و آمادگی", icon: CheckCircle2 },
];

export function ComposerHeader({
  autosaveState,
  readinessReady,
  onReset,
}: {
  autosaveState: "idle" | "saving" | "saved" | "restored";
  readinessReady: boolean;
  onReset: () => void;
}) {
  const autosaveLabels = {
    idle: "بدون تغییر ذخیره‌نشده",
    saving: "در حال ذخیره…",
    saved: "پیش‌نویس ذخیره شد",
    restored: "پیش‌نویس قبلی بازیابی شد",
  };

  return (
    <header className="n-glass-control flex flex-col gap-4 rounded-[24px] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-semibold text-accent">استودیوی محتوا</p>
        <h1 className="mt-1 text-2xl font-bold">محتوای جدید</h1>
        <p className="mt-2 text-sm leading-7 text-ink-secondary">
          محتوا را یک‌بار بسازید، برای مقصدهای مختلف بازبینی کنید و با اطمینان زمان‌بندی کنید.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[var(--n-panel-divider)] bg-white/35 px-3 py-2 text-xs font-semibold text-ink-secondary dark:bg-white/5">
          {autosaveLabels[autosaveState]}
        </span>
        <span className={`rounded-full px-3 py-2 text-xs font-semibold ${readinessReady ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-amber-500/10 text-amber-700 dark:text-amber-300"}`}>
          {readinessReady ? "آماده ثبت" : "در حال تکمیل"}
        </span>
        <button type="button" onClick={onReset} className="min-h-10 rounded-xl border border-[var(--n-panel-divider)] px-3 text-xs font-semibold hover:bg-[var(--n-hover)]">
          محتوای تازه
        </button>
      </div>
    </header>
  );
}

export function ComposerStepRail({
  draft,
  activeStep,
  onStepChange,
}: {
  draft: ComposerDraft;
  activeStep: ComposerStepId;
  onStepChange: (step: ComposerStepId) => void;
}) {
  return (
    <nav aria-label="مراحل ساخت محتوا" className="n-panel overflow-x-auto p-2">
      <ol className="grid min-w-[680px] grid-cols-4 gap-2">
        {composerSteps.map((step, index) => {
          const Icon = step.icon;
          const active = activeStep === step.id;
          const complete = composerStepIsComplete(step.id, draft, composerDestinations);
          return (
            <li key={step.id}>
              <button type="button" aria-current={active ? "step" : undefined} onClick={() => onStepChange(step.id)} className={`flex min-h-16 w-full items-center gap-3 rounded-2xl px-3 text-start transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 ${active ? "bg-accent text-white" : "hover:bg-[var(--n-hover)]"}`}>
                <span className={`grid size-9 shrink-0 place-items-center rounded-xl border text-xs font-bold ${active ? "border-white/25 bg-white/15" : complete ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-[var(--n-panel-divider)]"}`}>
                  {complete && !active ? <Check className="size-4" aria-hidden="true" /> : <Icon className="size-4" aria-hidden="true" />}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{index + 1}. {step.label}</span>
                  <span className={`mt-1 block truncate text-[11px] ${active ? "text-white/70" : "text-ink-secondary"}`}>{step.helper}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function ComposerFooter({
  activeIndex,
  readinessReady,
  scheduleMode,
  onPrevious,
  onNext,
  onSave,
  onSubmit,
}: {
  activeIndex: number;
  readinessReady: boolean;
  scheduleMode: ComposerDraft["scheduleMode"];
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  onSubmit: () => void;
}) {
  const finalStep = activeIndex === composerSteps.length - 1;
  return (
    <footer className="flex flex-col gap-3 border-t border-[var(--n-panel-divider)] bg-white/25 p-4 dark:bg-white/[0.025] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-2">
        <button type="button" onClick={onPrevious} disabled={activeIndex === 0} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--n-panel-divider)] px-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40">
          <ArrowRight className="size-4" aria-hidden="true" />مرحله قبل
        </button>
        {!finalStep ? (
          <button type="button" onClick={onNext} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white">
            مرحله بعد<ArrowLeft className="size-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={onSave} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--n-panel-divider)] px-3 text-sm font-semibold sm:flex-none">
          <Save className="size-4" aria-hidden="true" />ذخیره پیش‌نویس
        </button>
        {finalStep ? (
          <button type="button" onClick={onSubmit} aria-disabled={!readinessReady} className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white sm:flex-none ${readinessReady ? "bg-accent" : "bg-amber-600 hover:bg-amber-700"}`}>
            <Send className="size-4" aria-hidden="true" />{scheduleMode === "scheduled" ? "ثبت زمان‌بندی" : "آماده انتشار"}
          </button>
        ) : null}
      </div>
    </footer>
  );
}
