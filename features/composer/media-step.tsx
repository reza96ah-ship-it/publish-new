"use client";

import {
  ImagePlus,
  MessageSquareText,
  Trash2,
  Upload,
} from "lucide-react";
import type {
  ComposerDraft,
  ComposerMediaAttachment,
} from "./types";
import {
  formatFileSize,
  SectionTitle,
} from "./composer-shared";

export function MediaStep({
  draft,
  onAddMedia,
  onRemoveMedia,
}: {
  draft: ComposerDraft;
  onAddMedia: (files: FileList) => void;
  onRemoveMedia: (media: ComposerMediaAttachment) => void;
}) {
  const requiresMedia = ["image", "video", "carousel", "story"].includes(
    draft.contentType,
  );

  return (
    <div className="space-y-5">
      <SectionTitle
        title="رسانه"
        description={
          requiresMedia
            ? "برای قالب انتخاب‌شده حداقل یک رسانه اضافه کنید."
            : "افزودن رسانه در این قالب اختیاری است."
        }
      />

      <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-accent/35 bg-accent-soft/60 p-6 text-center transition hover:bg-accent-soft focus-within:ring-2 focus-within:ring-accent/45">
        <Upload className="size-7 text-accent" aria-hidden="true" />
        <span className="mt-3 text-sm font-semibold">انتخاب تصویر یا ویدئو</span>
        <span className="mt-2 text-xs leading-6 text-ink-secondary">
          برای محتوای چنداسلایدی می‌توانید چند فایل را هم‌زمان انتخاب کنید.
        </span>
        <input
          type="file"
          accept="image/*,video/*"
          multiple={draft.contentType === "carousel"}
          onChange={(event) => {
            if (event.target.files?.length) {
              onAddMedia(event.target.files);
              event.target.value = "";
            }
          }}
          className="sr-only"
        />
      </label>

      {draft.media.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {draft.media.map((media) => (
            <article
              key={media.id}
              className="overflow-hidden rounded-2xl border border-[var(--n-panel-divider)] bg-white/35 dark:bg-white/[0.03]"
            >
              <div className="grid aspect-[16/9] place-items-center overflow-hidden bg-slate-100 dark:bg-white/5">
                {media.previewUrl && media.mimeType.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={media.previewUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImagePlus className="size-8 text-ink-secondary" aria-hidden="true" />
                )}
              </div>
              <div className="flex items-center gap-3 p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{media.name}</p>
                  <p className="mt-1 text-xs text-ink-secondary">
                    {formatFileSize(media.sizeBytes)}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`حذف ${media.name}`}
                  onClick={() => onRemoveMedia(media)}
                  className="grid size-10 place-items-center rounded-xl text-rose-700 hover:bg-rose-500/10 dark:text-rose-300"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--n-panel-divider)] bg-white/25 p-5 text-center dark:bg-white/[0.025]">
          <MessageSquareText className="mx-auto size-6 text-ink-secondary" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold">هنوز رسانه‌ای انتخاب نشده است</p>
          <p className="mt-2 text-xs text-ink-secondary">
            پیش‌نمایش متن همچنان در کنار فرم قابل مض)�a�+�a�6)�,�*�������]���
_B��]���
NB