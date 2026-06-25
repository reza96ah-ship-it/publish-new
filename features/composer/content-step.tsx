"use client";

import {
  FileImage,
  FileText,
  Film,
  Layers3,
  Link2,
  Smartphone,
} from "lucide-react";
import type {
  ComposerContentType,
  ComposerDraft,
} from "./types";
import {
  Field,
  inputClassName,
  SectionTitle,
} from "./composer-shared";

export const contentTypeLabels: Record<ComposerContentType, string> = {
  text: "متن",
  image: "تصویر",
  video: "ویدئو",
  carousel: "چنداسلایدی",
  story: "داستان",
  link: "پیوند",
};

const contentTypeIcons = {
  text: FileText,
  image: FileImage,
  video: Film,
  carousel: Layers3,
  story: Smartphone,
  link: Link2,
} as const;

export function ContentStep({
  draft,
  characterCount,
  characterLimit,
  onChange,
}: {
  draft: ComposerDraft;
  characterCount: number;
  characterLimit: number;
  onChange: (next: ComposerDraft) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionTitle
        title="ساخت محتوا"
        description="قالب، عنوان داخلی و متن اصلی محتوا را مشخص کنید."
      />

      <fieldset>
        <legend className="text-sm font-semibold">قالب محتوا</legend>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {(Object.keys(contentTypeLabels) as ComposerContentType[]).map((type) => {
            const Icon = contentTypeIcons[type];
            const selected = draft.contentType === type;

            return (
              <button
                key={type}
                type="button"
                aria-pressed={selected}
                onClick={() =>
                  onChange({
                    ...draft,
                    contentType: type,
                    linkUrl: type === "link" ? draft.linkUrl : "",
                    updatedAt: new Date().toISOString(),
                  })
                }
                className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border px-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 ${
                  selected
                    ? "border-accent/30 bg-accent-soft text-accent"
                    : "border-[var(--n-panel-divider)] bg-white/35 text-ink-secondary hover:bg-[var(--n-hover)] dark:bg-white/[0.03]"
                }`}
              >
                <Icon className="size-5" aria-hidden="true" />
                {contentTypeLabels[type]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field label="عنوان داخلی" hint="این عنوان فقط در فضای کاری نشرینو دیده می‌شود.">
        <input
          value={draft.title}
          onChange={(event) =>
            onChange({
              ...draft,
              title: event.target.value,
              updatedAt: new Date().toISOString(),
            })
          }
          placeholder="برای نمونه: معرفی نسخه جدید در تابستان"
          className={inputClassName}
        />
      </Field>

      <Field
        label="متن و کپشن"
        hint={`${characterCount.toLocaleString("fa-IR")} از ${characterLimit.toLocaleString("fa-IR")} نویسه`}
        danger={characterCount > characterLimit}
      >
        <textarea
          value={draft.caption}
          onChange={(event) =>
            onChange({
              ...draft,
              caption: event.target.value,
              updatedAt: new Date().toISOString(),
            })
          }
          rows={9}
          placeholder="متن اصلی محتوا را وارد کنید…"
          className={`${inputClassName} resize-y py-3 leading-8`}
        />
      </Field>

      <Field label="هشتگ‌ها" hint="هشتگ‌ها را با فاصله از هم جدا کنید.">
        <input
          value={draft.hashtags}
          onChange={(event) =>
            onChange({
              ...draft,
              hashtags: event.target.value,
              updatedAt: new Date().toISOString(),
            })
          }
          placeholder="#نشرینو #مدیریت_محتوا"
          className={inputClassName}
        />
      </Field>

      {draft.contentType === "link" ? (
        <Field label="نشانی پیوند" hint="نشانی باید با http یا https آغاز شود.">
          <input
            dir="ltr"
            value={draft.linkUrl}
            onChange={(event) =>
              onChange({
                ...draft,
                linkUrl: event.target.value,
                updatedAt: new Date().toISOString(),
              })
            }
            placeholder="https://example.com/article"
            className={`${inputClassName} text-left`}
          />
        </Field>
      ) : null}
    </div>
  );
}
