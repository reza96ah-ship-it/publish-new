import type { ComposerDestination } from "./types";

export function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-1 text-sm leading-7 text-ink-secondary">{description}</p>
    </header>
  );
}

export function Field({
  label,
  hint,
  danger = false,
  children,
}: {
  label: string;
  hint?: string;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold">{label}</span>
        {hint ? (
          <span
            className={`text-[11px] ${
              danger ? "text-rose-700 dark:text-rose-300" : "text-ink-secondary"
            }`}
          >
            {hint}
          </span>
        ) : null}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function StatusPill({
  tone,
  children,
}: {
  tone: "success" | "warning" | "danger";
  children: React.ReactNode;
}) {
  const classes = {
    success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    warning: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    danger: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  };

  return (
    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${classes[tone]}`}>
      {children}
    </span>
  );
}

export function platformMark(
  platform: ComposerDestination["platform"],
): string {
  const marks = {
    instagram: "IG",
    telegram: "TG",
    linkedin: "IN",
    rubika: "RB",
  } as const;

  return marks[platform];
}

export function formatFileSize(sizeBytes: number): string {
  if (sizeBytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(sizeBytes / 1024)).toLocaleString("fa-IR")} کیلوبایت`;
  }

  return `${(sizeBytes / (1024 * 1024)).toLocaleString("fa-IR", {
    maximumFractionDigits: 1,
  })} مگابایت`;
}

export const inputClassName =
  "min-h-12 w-full rounded-2xl border border-[var(--n-panel-divider)] bg-white/55 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-accent/40 focus:ring-2 focus:ring-accent/15 dark:bg-white/5";
