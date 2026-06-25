"use client";

import {
  AlertTriangle,
  CheckCircle2,
  ImageIcon,
  Link2,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { PLATFORM_LABELS } from "@/features/publishing/model";
import {
  buildComposerPreviewText,
  getSelectedDestinations,
} from "./model";
import type {
  ComposerDestination,
  ComposerDraft,
  ComposerReadiness,
} from "./types";
import { contentTypeLabels } from "./content-step";

export function ComposerPreview({
  draft,
  destinations,
  readiness,
}: {
  draft: ComposerDraft;
  destinations: readonly ComposerDestination[];
  readiness: ComposerReadiness;
}) {
  const selected = getSelectedDestinations(draft, destinations);
  const previewText = buildComposerPreviewText(draft);
  const primaryMedia = draft.media[0];

  return (
    <aside className="n-panel overflow-hidden xl:sticky xl:top-4">
      <header className="flex items-start justify-between gap-3 border-b border-[var(--n-panel-divider)] p-4">
        <div>
          <p className="text-xs font-semibold text-accent">پیش‌نمایش زنده</p>
          <h2 className="mt-1 text-base font-bold">
            {contentTypeLabels[draft.contentType]}
          </h2>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
            readiness.ready
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : "bg-amber-500/10 text-amber-700 dark:text-amber-300"
          }`}
        >
          {readiness.ready ? (
            <CheckCircle2 className="size-4" aria-hidden="true" />
          ) : (
            <AlertTriangle className="size-4" aria-hidden="true" />
          )}
          {readiness.ready ? "آماده" : "نیازمند بررسی"}
        </span>
      </header>

      <div className="p-4 sm:p-5">
        <div className="mx-auto max-w-sm overflow-hidden rounded-[28px] border border-slate-200/80 bg-white text-slate-900 shadow-xl shadow-slate-950/8 dark:border-white/10 dark:bg-slate-950 dark:text-white">
          <div className="flex items-center gap-3 border-b border-slate-200/70 px-4 py-3 dark:border-white/8">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-xs font-black text-white">
              N
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">نشرینو</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                پیش‌نمایش محتوای چندپلتفرمی
              </p>
            </div>
            <MoreHorizontal className="size-5 text-slate-400" aria-hidden="true" />
          </div>

          <div className="grid min-h-56 place-items-center overflow-hidden bg-slate-100 dark:bg-white/5">
            {primaryMedia?.previewUrl && primaryMedia.mimeType.startsWith("image/") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={primaryMedia.previewUrl}
                alt=""
                className="h-full max-h-[420px] w-full object-cover"
              />
            ) : draft.contentType === "link" && draft.linkUrl ? (
              <div className="flex flex-col items-center px-8 text-center">
                <Link2 className="size-8 text-accent" aria-hidden="true" />
                <p dir="ltr" className="mt-4 break-all text-xs text-slate-500">
                  {draft.linkUrl}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center px-8 text-center text-slate-400">
                <ImageIcon className="size-9" aria-hidden="true" />
                <p className="mt-3 text-xs leading-6">
                  {draft.media.length
                    ? `${draft.media.length.toLocaleString("fa-IR")} رسانه انتخاب شده است`
                    : "برای این محتوا هنوز رسانه‌ای انتخاب نشده است"}
                </p>
              </div>
            )}
          </div>

          <div className="p-4">
            <p className="whitespace-pre-wrap text-sm leading-8">
              {previewText || "متن پیش‌نمایش محتوا در این بخش نمایش داده می‌شود."}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-3 text-xs text-slate-500 dark:border-white/8 dark:text-slate-400">
              <span>
                {readiness.characterCount.toLocaleString("fa-IR")} /{" "}
                {readiness.characterLimit.toLocaleString("fa-IR")}
              </span>
              <span className="inline-flex items-center gap-1">
                <Send className="size-4" aria-hidden="true" />
                {draft.scheduleMode === "now" ? "اولین فرصت" : "زمان‌بندی‌شده"}
              </span>
            </div>
          </div>
        </div>

        <section className="mt-5">
          <h3 className="text-sm font-bold">مقصدهای انتخاب‌شده</h3>
          {selected.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.map((destination) => (
                <span
                  key={destination.id}
                  className="rounded-full border border-[var(--n-panel-divider)] bg-white/45 px-3 py-2 text-xs font-semibold dark:bg-white/5"
                >
                  {PLATFORM_LABELS[destination.platform]} ·{" "}
                  {destination.accountHandle ?? destination.accountName}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-xs leading-6 text-ink-secondary">
              هنوز مقصدی برای انتشار انتخاب نشده است.
            </p>
          )}
        </section>

        <section className="mt-5 grid grid-cols-2 gap-3">
          <PreviewFact label="عنوان داخلی" value={draft.title || "تعیین نشده"} />
          <PreviewFact
            label="کمپین"
            value={draft.campaignId ? "متصل به کمپین" : "بدون کمپین"}
          />
          <PreviewFact
            label="رسانه"
            value={`${draft.media.length.toLocaleString("fa-IR")} فایل`}
          />
          <PreviewFact
            label="تأیید"
            value={approvalLabel(draft.approvalStatus)}
          />
        </section>
      </div>
    </aside>
  );
}

function PreviewFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/35 p-3 dark:bg-white/[0.035]">
      <p className="text-[11px] text-ink-secondary">{label}</p>
      <p className="mt-1 truncate text-xs font-semibold">{value}</p>
    </div>
  );
}

function approvalLabel(status: ComposerDraft["approvalStatus"]): string {
  return {
    not_required: "بدون نیاز",
    pending: "در انتظار",
    approved: "تأییدشده",
    rejected: "ردشده",
  }[status];
}
