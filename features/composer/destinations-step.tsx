"use client";

import Link from "next/link";
import {
  AlertCircle,
  Check,
  ExternalLink,
} from "lucide-react";
import { PLATFORM_LABELS } from "@/features/publishing/model";
import { ROUTES } from "@/lib/routes";
import type {
  ComposerDestination,
  ComposerDraft,
} from "./types";
import {
  platformMark,
  SectionTitle,
  StatusPill,
} from "./composer-shared";
import { contentTypeLabels } from "./content-step";

export function DestinationsStep({
  draft,
  destinations,
  onChange,
}: {
  draft: ComposerDraft;
  destinations: readonly ComposerDestination[];
  onChange: (next: ComposerDraft) => void;
}) {
  function toggleDestination(destination: ComposerDestination) {
    const selected = draft.destinationIds.includes(destination.id);
    const destinationIds = selected
      ? draft.destinationIds.filter((id) => id !== destination.id)
      : [...draft.destinationIds, destination.id];

    onChange({
      ...draft,
      destinationIds,
      updatedAt: new Date().toISOString(),
    });
  }

  return (
    <div className="space-y-5">
      <SectionTitle
        title="انتخاب مقصدها"
        description="یک یا چند حساب را برای انتشار هم‌زمان انتخاب کنید."
      />

      <div className="grid gap-3 md:grid-cols-2">
        {destinations.map((destination) => {
          const selected = draft.destinationIds.includes(destination.id);
          const compatible = destination.supports.includes(draft.contentType);
          const disabled = !destination.connected || !compatible;

          return (
            <article
              key={destination.id}
              className={`rounded-2xl border p-4 transition ${
                selected
                  ? "border-accent/35 bg-accent-soft"
                  : "border-[var(--n-panel-divider)] bg-white/35 dark:bg-white/[0.03]"
              } ${disabled ? "opacity-75" : ""}`}
            >
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/70 text-xs font-black text-accent shadow-sm dark:bg-white/8">
                  {platformMark(destination.platform)}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold">
                      {destination.accountName}
                    </h3>
                    <StatusPill
                      tone={
                        !destination.connected
                          ? "danger"
                          : destination.mode === "manual"
                            ? "warning"
                            : "success"
                      }
                    >
                      {!destination.connected
                        ? "قطع اتصال"
                        : destination.mode === "manual"
                          ? "انتشار دستی"
                          : "انتشار خودکار"}
                    </StatusPill>
                  </div>
                  <p className="mt-1 text-xs text-ink-secondary">
                    {PLATFORM_LABELS[destination.platform]}
                    {destination.accountHandle
                      ? ` · ${destination.accountHandle}`
                      : ""}
                  </p>
                  {!compatible ? (
                    <p className="mt-2 flex items-center gap-1 text-xs text-rose-700 dark:text-rose-300">
                      <AlertCircle className="size-4" aria-hidden="true" />
                      قالب {contentTypeLabels[draft.contentType]} پشتیبانی نمی‌شود.
                    </p>
                  ) : null}
                </div>

                {destination.connected && compatible ? (
                  <button
                    type="button"
                    aria-label={`${selected ? "حذف" : "انتخاب"} ${destination.accountName}`}
                    aria-pressed={selected}
                    onClick={() => toggleDestination(destination)}
                    className={`grid size-10 shrink-0 place-items-center rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 ${
                      selected
                        ? "border-accent bg-accent text-white"
                        : "border-[var(--n-panel-divider)] hover:bg-[var(--n-hover)]"
                    }`}
                  >
                    {selected ? (
                      <Check className="size-5" aria-hidden="true" />
                    ) : (
                      <span className="size-3 rounded-full border border-current" />
                    )}
                  </button>
                ) : null}
              </div>

              {!destination.connected ? (
                <Link
                  href={ROUTES.channels}
                  className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-xl bg-rose-500/10 px-3 text-xs font-semibold text-rose-700 dark:text-rose-300"
                >
                  مدیریت اتصال
                  <ExternalLink className="size-4" aria-hidden="true" />
                </Link>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
