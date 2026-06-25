export type PublishingPlatform = "instagram" | "telegram" | "linkedin" | "rubika";

export type PublishingContentType =
  | "text"
  | "image"
  | "video"
  | "carousel"
  | "story"
  | "link";

export type PublishingJobStatus =
  | "scheduled"
  | "queued"
  | "validating"
  | "preparing_media"
  | "uploading"
  | "processing"
  | "publishing"
  | "verifying"
  | "retrying"
  | "manual_required"
  | "paused"
  | "published"
  | "failed"
  | "cancelled";

export type PublishingStage =
  | "validation"
  | "media_preparation"
  | "upload"
  | "platform_processing"
  | "publish_request"
  | "verification"
  | "result_recording";

export type PublishingQueueTab = "live" | "upcoming" | "action" | "history" | "all";
export type PublishingSeverity = "neutral" | "info" | "success" | "warning" | "critical";
export type PublishingDataState = "ready" | "loading" | "empty" | "error" | "partial" | "stale" | "restricted";

export interface PublishingUserSummary {
  id: string;
  name: string;
  initials: string;
  role: string;
}

export interface PublishingError {
  code: string;
  title: string;
  message: string;
  retryable: boolean;
  occurredAt: string;
}

export interface PublishingTarget {
  id: string;
  platform: PublishingPlatform;
  accountId: string;
  accountName: string;
  accountHandle?: string;
  status: PublishingJobStatus;
  progress: number;
  platformPostId?: string;
  publishedUrl?: string;
  latestError?: PublishingError;
}

export interface PublishingTimelineEvent {
  id: string;
  stage: PublishingStage;
  status: "completed" | "active" | "pending" | "failed";
  label: string;
  startedAt?: string;
  completedAt?: string;
  detail?: string;
}

export interface PublishingJob {
  id: string;
  contentId: string;
  title: string;
  captionPreview: string;
  contentType: PublishingContentType;
  campaign?: { id: string; name: string };
  status: PublishingJobStatus;
  progress: number;
  scheduledAt?: string;
  startedAt?: string;
  completedAt?: string;
  estimatedCompletionAt?: string;
  delaySeconds?: number;
  retryCount: number;
  maxRetryCount: number;
  approvalStatus: "approved" | "pending" | "rejected" | "not_required";
  responsible?: PublishingUserSummary;
  targets: PublishingTarget[];
  timeline: PublishingTimelineEvent[];
  latestError?: PublishingError;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface PublishingFilters {
  tab: PublishingQueueTab;
  query: string;
  platform: PublishingPlatform | "all";
  status: PublishingJobStatus | "all";
}

export interface PublishingSummary {
  total: number;
  live: number;
  upcoming: number;
  action: number;
  failed: number;
  paused: number;
  published: number;
}

export interface PublishingStatusMeta {
  label: string;
  severity: PublishingSeverity;
  group: Exclude<PublishingQueueTab, "all">;
  active: boolean;
}
