import type {
  PublishingFilters,
  PublishingJob,
  PublishingJobStatus,
  PublishingPlatform,
  PublishingQueueTab,
  PublishingStatusMeta,
  PublishingSummary,
} from "./types";

export const STATUS_META: Record<PublishingJobStatus, PublishingStatusMeta> = {
  scheduled: { label: "زمان‌بندی‌شده", severity: "neutral", group: "upcoming", active: false },
  queued: { label: "در صف انتشار", severity: "info", group: "upcoming", active: false },
  validating: { label: "در حال اعتبارسنجی", severity: "info", group: "live", active: true },
  preparing_media: { label: "در حال آماده‌سازی رسانه", severity: "info", group: "live", active: true },
  uploading: { label: "در حال بارگذاری", severity: "info", group: "live", active: true },
  processing: { label: "در حال پردازش پلتفرم", severity: "info", group: "live", active: true },
  publishing: { label: "در حال انتشار", severity: "info", group: "live", active: true },
  verifying: { label: "در حال راستی‌آزمایی", severity: "info", group: "live", active: true },
  retrying: { label: "در حال تلاش مجدد", severity: "warning", group: "live", active: true },
  manual_required: { label: "نیازمند انتشار دستی", severity: "warning", group: "action", active: false },
  paused: { label: "متوقف‌شده", severity: "warning", group: "action", active: false },
  published: { label: "منتشر شد", severity: "success", group: "history", active: false },
  failed: { label: "ناموفق", severity: "critical", group: "action", active: false },
  cancelled: { label: "لغوشده", severity: "neutral", group: "history", active: false },
};

export const PLATFORM_LABELS: Record<PublishingPlatform, string> = {
  instagram: "اینستاگرام",
  telegram: "تلگرام",
  linkedin: "لینکدین",
  rubika: "روبیکا",
};

const priorityByStatus: Record<PublishingJobStatus, number> = {
  failed: 0,
  manual_required: 1,
  retrying: 2,
  publishing: 3,
  uploading: 4,
  processing: 5,
  verifying: 6,
  validating: 7,
  preparing_media: 8,
  paused: 9,
  queued: 10,
  scheduled: 11,
  published: 12,
  cancelled: 13,
};

function timestamp(value?: string): number {
  if (!value) return Number.MAX_SAFE_INTEGER;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
}

function searchableText(job: PublishingJob): string {
  const targetText = job.targets
    .map((target) => `${target.accountName} ${target.accountHandle ?? ""} ${PLATFORM_LABELS[target.platform]}`)
    .join(" ");

  return [
    job.title,
    job.captionPreview,
    job.campaign?.name ?? "",
    job.responsible?.name ?? "",
    job.latestError?.title ?? "",
    job.latestError?.message ?? "",
    targetText,
  ]
    .join(" ")
    .toLocaleLowerCase("fa-IR");
}

export function sortPublishingJobs(jobs: readonly PublishingJob[]): PublishingJob[] {
  return [...jobs].sort((first, second) => {
    const priorityDifference = priorityByStatus[first.status] - priorityByStatus[second.status];
    if (priorityDifference !== 0) return priorityDifference;
    return timestamp(first.scheduledAt ?? first.startedAt) - timestamp(second.scheduledAt ?? second.startedAt);
  });
}

export function filterPublishingJobs(
  jobs: readonly PublishingJob[],
  filters: PublishingFilters,
): PublishingJob[] {
  const query = filters.query.trim().toLocaleLowerCase("fa-IR");

  return sortPublishingJobs(
    jobs.filter((job) => {
      if (filters.tab !== "all" && STATUS_META[job.status].group !== filters.tab) return false;
      if (filters.status !== "all" && job.status !== filters.status) return false;
      if (
        filters.platform !== "all" &&
        !job.targets.some((target) => target.platform === filters.platform)
      ) return false;
      return query.length === 0 || searchableText(job).includes(query);
    }),
  );
}

export function summarizePublishingJobs(jobs: readonly PublishingJob[]): PublishingSummary {
  const summary: PublishingSummary = {
    total: jobs.length,
    live: 0,
    upcoming: 0,
    action: 0,
    failed: 0,
    paused: 0,
    published: 0,
  };

  for (const job of jobs) {
    const group = STATUS_META[job.status].group;
    if (group === "live") summary.live += 1;
    if (group === "upcoming") summary.upcoming += 1;
    if (group === "action") summary.action += 1;
    if (job.status === "failed") summary.failed += 1;
    if (job.status === "paused") summary.paused += 1;
    if (job.status === "published") summary.published += 1;
  }

  return summary;
}

export function countPublishingTab(
  jobs: readonly PublishingJob[],
  tab: PublishingQueueTab,
): number {
  if (tab === "all") return jobs.length;
  return jobs.filter((job) => STATUS_META[job.status].group === tab).length;
}

export function canRetryPublishingJob(job: PublishingJob): boolean {
  return job.status === "failed" && job.latestError?.retryable === true && job.retryCount < job.maxRetryCount;
}

export function canPausePublishingJob(job: PublishingJob): boolean {
  return STATUS_META[job.status].active || job.status === "queued" || job.status === "scheduled";
}

export function canResumePublishingJob(job: PublishingJob): boolean {
  return job.status === "paused";
}

export function formatPublishingDate(value?: string): string {
  if (!value) return "بدون زمان‌بندی";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "زمان نامعتبر";

  return new Intl.DateTimeFormat("fa-IR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
