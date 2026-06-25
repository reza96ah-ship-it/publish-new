"use client";

import type {
  ComposerCampaignOption,
  ComposerDraft,
  ComposerReadiness,
} from "./types";
import {
  Field,
  inputClassName,
  SectionTitle,
} from "./composer-shared";

export function ReviewStep({
  draft,
  campaigns,
  readiness,
  onChange,
}: {
  draft: ComposerDraft;
  campaigns: readonly ComposerCampaignOption[];
  readiness: ComposerReadiness;
  onChange: (next: ComposerDraft) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionTitle
        title="بازبینی و زمان‌بندی"
        description="کمپین، تأیید، زمان انتشار و آمادگی نهایی را بررسی کنید."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="کمپین">
          <select
            value={draft.campaignId ?? ""}
            onChange={(event) =>
              onChange({
                ...draft,
                campaignId: event.target.value || undefined,
                updatedAt: new Date().toISOString(),
              })
            }
            className={inputClassName}
          >
            <option value="">بدون کمپین</option>
            {campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
                {campaign.status === "draft" ? " · پیش‌نویس" : ""}
              </option>
            ))}
          </select>
        </Field>

        <Field label="وضعیت تأیید">
          <select
            value={draft.approvalStatus}
            onChange={(event) =>
              onChange({
                ...draft,
                approvalStatus: event.target.value as ComposerDraft["approvalStatus"],
                updatedAt: new Date().toISOString(),
              })
            }
            className={inputClassName}
          >
            <option value="not_required">بدون نیاز به تأیید</option>
            <option value="approved">تأییدشده</option>
            <option value="pending">در انتظار تأیید</option>
            <option value="rejected">ردشده</option>
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold">روش انتشار</legend>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { value: "now", label: "انتشار در اولین فرصت" },
            { value: "scheduled", label: "زمان‌بندی برای آینده" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={draft.scheduleMode === option.value}
              onClick={() =>
                onChange({
                  ...draft,
                  scheduleMode: option.value as ComposerDraft["scheduleMode"],
                  scheduledAt:
                    option.value === "now" ? undefined : draft.scheduledAt,
                  updatedAt: new Date().toISOString(),
                })
              }
              className={`min-h-12 rounded-2xl border px-3 text-sm font-semibold ${
                draft.scheduleMode === option.value
                  ? "border-accent/35 bg-accent-soft text-accent"
                  : "border-[var(--n-panel-divider)] hover:bg-[var(--n-hover)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      {draft.scheduleMode === "scheduled" ? (
        <Field label="زمان انتشار" hint="منطقه زمانی: تهران">
          <input
            type="datetime-local"
            value={draft.scheduledAt ?? ""}
            onChange={(event) =>
              onChange({
                ...draft,
                scheduledAt: event.target.value,
                updatedAt: new Date().toISOString(),
              })
            }
            className={inputClassName}
          />
        </Field>
      ) : null}

      <Field label="یادداشت داخلی" hint="این یادداشت در محتوای منتشرشده نمایش داده نمی‌شود.">
        <textarea
          value={draft.internalNote}
          onChange={(event) =>
            onChange({
              ...draft,
              internalNote: event.target.value,
              updatedAt: new Date().toISOString(),
            })
          }
          rows={4}
          placeholder="توضیح برای تیم محتوا یا مسئول انتشار…"
          className={`${inputClassName} resize-y py-3 leading-7`}
        />
      </Field>

      <section
        className={`rounded-[22px] border p-4 ${
          readiness.ready
            ? "border-emerald-500/20 bg-emerald-500/8"
            : "border-amber-500/20 bg-amber-500/8"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-bold">
            {readiness.ready ? "محتوا آماده انتشار است" : "موارد نیازمند بررسی"}
          </h3>
          <span className="text-xs font-semibold text-ink-secondary">
            {readiness.errorCount} خطا · {readiness.warningCount} هشدار
          </span>
        </div>

        {readiness.issues.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {readiness.issues.map((issue) => (
              <li
                key={issue.id}
                className="flex items-start gap-2 text-xs leading-6 text-ink-secondary"
              >
                <span
                  className={`mt-2 size-2 shrink-0 rounded-full ${
                    issue.severity === "error" ? "bg-rose-500" : "bg-amber-500"
                  }`}
                />
                {issue.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-xs leading-6 text-ink-secondary">
            مقصدها، قالب، متن و زمان‌بندی با محدودیت‌های فعلی سازگار هستند.
          </p>
        )}
      </section>
    </div>
  );
}
