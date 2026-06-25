import type { PublishingPlatform } from "@/features/publishing/types";

export type ComposerContentType = "text" | "image" | "video" | "carousel" | "story" | "link";
export type ComposerApprovalStatus = "not_required" | "pending" | "approved" | "rejected";
export type ComposerScheduleMode = "now" | "scheduled";
export type ComposerStepId = "content" | "destinations" | "media" | "review";

export interface ComposerDestination {
  id: string;
  platform: PublishingPlatform;
  accountName: string;
  accountHandle?: string;
  mode: "automatic" | "manual";
  connected: boolean;
  supports: ComposerContentType[];
  characterLimit: number;
}

export interface ComposerMediaAttachment {
  id: string;
  name: string;
  mimeType: string;
  sizeBytes: number;
  previewUrl?: string;
}

export interface ComposerCampaignOption {
  id: string;
  name: string;
  status: "active" | "draft";
}

export interface ComposerDraft {
  id: string;
  title: string;
  caption: string;
  hashtags: string;
  linkUrl: string;
  internalNote: string;
  contentType: ComposerContentType;
  destinationIds: string[];
  media: ComposerMediaAttachment[];
  campaignId?: string;
  approvalStatus: ComposerApprovalStatus;
  scheduleMode: ComposerScheduleMode;
  scheduledAt?: string;
  timezone: "Asia/Tehran";
  updatedAt: string;
}

export interface ComposerValidationIssue {
  id: string;
  field: "title" | "caption" | "destinations" | "media" | "link" | "schedule" | "approval";
  severity: "error" | "warning";
  message: string;
}

export interface ComposerReadiness {
  ready: boolean;
  errorCount: number;
  warningCount: number;
  issues: ComposerValidationIssue[];
  characterLimit: number;
  characterCount: number;
}

export interface ComposerSubmission {
  draft: ComposerDraft;
  action: "draft" | "ready" | "schedule";
  submittedAt: string;
}
