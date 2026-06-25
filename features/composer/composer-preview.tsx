"use client";

import {
  AlertTriangle,
  CheckCircle2,
  ImageIcon,
  Link2,
  MoreHorizontal,
  Send,} from "lucide-react";
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
          <p className="text-xs font-semibold text-accent">Ù¾ÛŒØ´â€ŒÙ†Ù…Ø§ÛŒØ´ Ø²Ù†Ø¯Ù‡</p>
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
          {readiness.ready ? "Ø¢Ù…Ø§Ø¯Ù‡" : "Ù†ÛŒØ§Ø²Ù…Ù†Ø¯ Ø¨Ø±Ø±Ø³ÛŒ"}
        </span>
      </header>

      <div className="p-4 sm:p-5">
        <div className="mx-auto max-w-sm overflow-hidden rounded-[28px] border border-slate-200/80 bg-white text-slate-900 shadow-xl shadow-slate-950/8 dark:border-white/10 dark:bg-slate-950 dark:text-white">
          <div className="flex items-center gap-3 border-b border-slate-200/70 px-4 py-3 dark:border-white/8">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-xs font-black text-white">
              N
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">Ù†Ø´Ø±ÙŒÙ†Ùˆ</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Ù¾ÛŒØ´â€ŒÙ†Ù…Ø§ÛŒØµ Ù…Ø­ØªÙˆØ§ÛŒ Ú†Ù†Ø¯Ù¾Ù„ØªÙØ±Ù…ÛŒ
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
                    ? `${draft.media.length.toLocaleString("fa-IR")} Ø±Ø³Ø§Ù†Ù‡ Ø§Ù†ØªØ®Ø§Ø¨ Ø´Ø¯Ù‡ Ø§Ø³Øª`
                    : "Ø¨Ø±Ø§ÛŒ Ø§ÛŒÙ† Ù…Ø­ØªÙˆØ§ Ù‡Ù†ÙˆØ² Ø±Ø³Ø§Ù†Ù‡â€ŒØ§ÛŒ Ø§Ù†ØªØ®Ø§Ø¨ Ù†Ø´Ø¯Ù‡ Ø§Ø³Øª")}
                </p>
              </div>
            )}
          </div>

          <div className="p-4">
            <p className="whitespace-pre-wrap text-sm leading-8">
              {previewText || "Ù…ØªÙ† Ù¾ÛŒØ´â€ŒÙ†Ù…Ø§ÛŒØ´ Ù…Ø­ØªÙˆØ§ Ø¯Ø± Ø§ÛŒÙ† Ø¨Ø®Ø´ Ù†Ù…Ø§ÛŒØ´ Ø¯Ø§Ø¯Ù‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯."}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-3 text-xs text-slate-500 dark:border-white/8 dark:text-slate-400">
              <span>
                {readiness.characterCount.toLocaleString("fa-IR")} /{" "}
                {readiness.characterLimit.toLocaleString("fa-IR")}
              </span>
              <span className="inline-flex items-center gap-1">
                <Send className="size-4" aria-hidden="true" />
                {draft.scheduleMode === "now" ? "Ø§ÙˆÙ„Ø¨ÛŒÙ† ÙØ±ØµØª" : "Ø²Ù…Ø§Ù†â€ŒØ¨Ù†Ø¯ÛŒâ€ŒØ´Ø¯Ù‡"}
              </span>
            </div>
          </div>
        </div>

        <section className="mt-5">
          <h3 className="text-sm font-bold">Ù…Ù‚ØµØ¯Ù‡Ø§ÛŒ Ø§Ù†ØªØ®Ø§Ø¨â€ŒØ´Ø¯Ù‡</h3>
          {selected.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.map((destination) => (
                <span
                  key={destination.id}
                  className="rounded-full border border-[var(--n-panel-divider)] bg-white/45 px-3 py-2 text-xs font-semibold dark:bg-white/5"
                >
                  {PLATFORM_LABELS[destination.platform]} Â·{" "}
                  {destination.accountHandle ?? destination.accountName}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-xs leading-6 text-ink-secondary">
              Ù‡Ù†ÙˆØ²ffb×b¿n0ƒb£bÇbŸn0ƒbŸfb«bÓbŸbÄƒbŸfb«b»bŸb ƒfbÓb¿fƒbŸbÏb¨¸(€€€€€€€€€€€€ğ½Àø(€€€€€€€€€€¥ô(€€€€€€€€ğ½Í•Ñ¥½¸ø((€€€€€€€€ñÍ•Ñ¥½¸±…ÍÍ9…µ”ô‰µĞ´ÔÉ¥É¥µ½±Ì´È…À´Ìˆø(€€€€€€€€€€ñAÉ•Ù¥•İ…Ğ±…‰•°ô‹bçff#bŸfƒb¿bŸb»fn0ˆÙ…±Õ”õí‘É…™Ğ¹Ñ¥Ñ±”ñğ€‹b«bçf3n3fƒfnÓb¿f‰ô€¼ø(€€€€€€€€€€ñAÉ•Ù¥•İ…Ğ(€€€€€€€€€€€±…‰•°ô‹j§ffón3fˆ(€€€€€€€€€€€Ù…±Õ”õí‘É…™Ğ¹…µÁ…¥¹%€ü€‹fb«b×fƒb£fƒj§ffûn3fˆ€è€‹b£b¿f#fƒj§ffûn3f‰ô(€€€€€€€€€€¼ø(€€€€€€€€€€ñAÉ•Ù¥•İ…Ğ(€€€€€€€€€€€±…‰•°ô‹bÇbÏbŸffˆ(€€€€€€€€€€€Ù…±Õ”õí€‘í‘É…™Ğ¹µ•‘¥„¹±•¹Ñ ¹Ñ½1½…±•MÑÉ¥¹œ ‰™„µ%Hˆ¥ôƒfbŸn3fô(€€€€€€€€€€¼ø(€€€€€€€€€€ñAÉ•Ù¥•İ…Ğ(€€€€€€€€€€€±…‰•°ô‹b«bn3n3b¼ˆ(€€€€€€€€€€€Ù…±Õ”õí…ÁÁÉ½Ù…±1…‰•°¡‘É…™Ğ¹…ÁÁÉ½Ù…±MÑ…ÑÕÌ¥ô(€€€€€€€€€€¼ø(€€€€€€€€ğ½Í•Ñ¥½¸ø(€€€€€€ğ½‘¥Øø(€€€€ğ½…Í¥‘”ø(€€¤ì)ô()™Õ¹Ñ¥½¸AÉ•Ù¥•İ…Ğ¡ì±…‰•°°Ù…±Õ”ôèì±…‰•°èÍÑÉ¥¹œìÙ…±Õ”èÍÑÉ¥¹œô¤ì(€É•ÑÕÉ¸€ (€€€€ñ‘¥Ø±…ÍÍ9…µ”ô‰É½Õ¹‘•´Éá°‰œµİ¡¥Ñ”¼ÌÔÀ´Ì‘…É¬é‰œµİ¡¥Ñ”½lÀ¸ÀÌÕtˆø(€€€€€€ñÀ±…ÍÍ9…µ”ô‰Ñ•áĞµlÄÅÁátÑ•áĞµ¥¹¬µÍ•½¹‘…Éäˆùí±…‰•±ôğ½Àø(€€€€€€ñÀ±…ÍÍ9…µ”ô‰µĞ´ÄÑÉÕ¹…Ñ”Ñ•áĞµáÌ™½¹ĞµÍ•µ¥‰½±ˆùíÙ…±Õ•ôğ½Àø(€€€€ğ½‘¥Øø(€€¤ì)ô()™Õ¹Ñ¥½¸…ÁÁÉ½Ù…±1…‰•°¡ÍÑ…ÑÕÌè½µÁ½Í•ÉÉ…™Ñl‰…ÁÁÉ½Ù…±MÑ…ÑÕÌ‰t¤èÍÑÉ¥¹œì(€É•ÑÕÉ¸ì(€€€¹½Ñ}É•ÅÕ¥É•è€‹b£b¿f#fƒfn3bŸbÈˆ°(€€€Á•¹‘¥¹œè€‹b¿bÄƒbŸfb«bãbŸbÄˆ°(€€€…ÁÁÉ½Ù•è€‹b«bn3n3b¿bÓb¿fˆ°(€€€É•©•Ñ•è€‹bÇb¿bÓb¿fˆ°(€õmÍÑ…ÑÕÍtì)ô