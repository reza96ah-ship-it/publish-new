import type {
  ComposerContentType,
  ComposerDestination,
  ComposerDraft,
  ComposerReadiness,
  ComposerStepId,
  ComposerSubmission,
  ComposerValidationIssue,
} from "./types";

const mediaRequiredTypes = new Set<ComposerContentType>([
  "image",
  "video",
  "carousel",
  "story",
]);

export function createEmptyComposerDraft(now = new Date()): ComposerDraft {
  return {
    id: `draft-${now.getTime()}`,
    title: "",
    caption: "",
    hashtags: "",
    linkUrl: "",
    internalNote: "",
    contentType: "text",
    destinationIds: [],
    media: [],
    approvalStatus: "not_required",
    scheduleMode: "scheduled",
    scheduledAt: "",
    timezone: "Asia/Tehran",
    updatedAt: now.toISOString(),
  };
}

export function getSelectedDestinations(
  draft: ComposerDraft,
  destinations: readonly ComposerDestination[],
): ComposerDestination[] {
  const selectedIds = new Set(draft.destinationIds);
  return destinations.filter((destination) => selectedIds.has(destination.id));
}

export function getComposerCharacterLimit(
  draft: ComposerDraft,
  destinations: readonly ComposerDestination[],
): number {
  const connectedDestinations = getSelectedDestinations(draft, destinations).filter(
    (destination) => destination.connected,
  );

  if (connectedDestinations.length === 0) {
    return 3000;
  }

  return Math.min(
    ...connectedDestinations.map((destination) => destination.characterLimit),
  );
}

export function buildComposerPreviewText(draft: ComposerDraft): string {
  return [draft.caption.trim(), draft.hashtags.trim()].filter(Boolean).join("\n\n");
}

export function validateComposerDraft(
  draft: ComposerDraft,
  destinations: readonly ComposerDestination[],
  now = new Date(),
): ComposerReadiness {
  const issues: ComposerValidationIssue[] = [];
  const selected = getSelectedDestinations(draft, destinations);
  const characterLimit = getComposerCharacterLimit(draft, destinations);
  const characterCount = buildComposerPreviewText(draft).length;

  if (!draft.title.trim()) {
    issues.push({
      id: "title-required",
      field: "title",
      severity: "error",
      message: "برای مدیریت داخلی محتوا یک عنوان وارد کنید.",
    });
  }

  const hasBody = Boolean(
    draft.caption.trim() || draft.media.length > 0 || draft.linkUrl.trim(),
  );

  if (!hasBody) {
    issues.push({
      id: "body-required",
      field: "caption",
      severity: "error",
      message: "متن، رسانه یا پیوند اصلی محتوا هنوز وارد نشده است.",
    });
  }

  if (selected.length === 0) {
    issues.push({
      id: "destination-required",
      field: "destinations",
      severity: "error",
      message: "حداقل یک حساب مقصد انتخاب کنید.",
    });
  }

  for (const destination of selected) {
    if (!destination.connected) {
      issues.push({
        id: `destination-disconnected-${destination.id}`,
        field: "destinations",
        severity: "error",
        message: `اتصال «${destination.accountName}» آماده انتشار نیست.`,
      });
    }

    if (!destination.supports.includes(draft.contentType)) {
      issues.push({
        id: `destination-unsupported-${destination.id}`,
        field: "destinations",
        severity: "error",
        message: `قالب انتخاب‌شده در «${destination.accountName}» پشتیبانی نمی‌شود.`,
      });
    }

    if (destination.mode === "manual") {
      issues.push({
        id: `destination-manual-${destination.id}`,
        field: "destinations",
        severity: "warning",
        message: `انتشار در «${destination.accountName}» باید به‌صورت دستی تکمیل شود.`,
      });
    }
  }

  if (mediaRequiredTypes.has(draft.contentType) && draft.media.length === 0) {
    issues.push({
      id: "media-required",
      field: "media",
      severity: "error",
      message: "برای قالب انتخاب‌شده حداقل یک فایل رسانه لازم است.",
    });
  }

  if (draft.contentType === "carousel" && draft.media.length === 1) {
    issues.push({
      id: "carousel-needs-more-media",
      field: "media",
      severity: "warning",
      message: "برای محتوای چنداسلایدی بهتر است حداقل دو رسانه اضافه شود.",
    });
  }

  if (draft.contentType === "link") {
    try {
      const url = new URL(draft.linkUrl);
      if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error("unsupported protocol");
      }
    } catch {
      issues.push({
        id: "link-invalid",
        field: "link",
        severity: "error",
        message: "یک نشانی معتبر با http یا https وارد کنید.",
      });
    }
  }

  if (characterCount > characterLimit) {
    issues.push({
      id: "character-limit",
      field: "caption",
      severity: "error",
      message: `متن ${characterCount - characterLimit} نویسه بیشتر از محدودیت مقصدها است.`,
    });
  }

  const hashtagCount = draft.hashtags
    .split(/\s+/)
    .filter((item) => item.startsWith("#")).length;

  if (hashtagCount > 20) {
    issues.push({
      id: "hashtag-count",
      field: "caption",
      severity: "warning",
      message: "تعداد زیاد هشتگ‌ها می‌تواند خوانایی محتوا را کاهش دهد.",
    });
  }

  if (draft.approvalStatus === "pending") {
    issues.push({
      id: "approval-pending",
      field: "approval",
      severity: "error",
      message: "محتوا هنوز در انتظار تأیید است.",
    });
  }

  if (draft.approvalStatus === "rejected") {
    issues.push({
      id: "approval-rejected",
      field: "approval",
      severity: "error",
      message: "نسخه فعلی محتوا رد شده و باید اصلاح شود.",
    });
  }

  if (draft.scheduleMode === "scheduled") {
    if (!draft.scheduledAt) {
      issues.push({
        id: "schedule-required",
        field: "schedule",
        severity: "error",
        message: "زمان انتشار را مشخص کنید.",
      });
    } else {
      const scheduledAt = new Date(draft.scheduledAt);
      if (
        Number.isNaN(scheduledAt.getTime()) ||
        scheduledAt.getTime() <= now.getTime()
      ) {
        issues.push({
          id: "schedule-future",
          field: "schedule",
          severity: "error",
          message: "زمان انتشار باید در آینده باشد.",
        });
      }
    }
  }

  const errorCount = issues.filter((issue) => issue.severity === "error").length;
  const warningCount = issues.length - errorCount;

  return {
    ready: errorCount === 0,
    errorCount,
    warningCount,
    issues,
    characterLimit,
    characterCount,
  };
}

export function composerStepIsComplete(
  step: ComposerStepId,
  draft: ComposerDraft,
  destinations: readonly ComposerDestination[],
): boolean {
  if (step === "content") {
    return Boolean(
      draft.title.trim() &&
        (draft.caption.trim() || draft.linkUrl.trim() || draft.media.length > 0),
    );
  }

  if (step === "destinations") {
    return getSelectedDestinations(draft, destinations).some(
      (destination) => destination.connected,
    );
  }

  if (step === "media") {
    return !mediaRequiredTypes.has(draft.contentType) || draft.media.length > 0;
  }

  return validateComposerDraft(draft, destinations).ready;
}

export function createComposerSubmission(
  draft: ComposerDraft,
  action: ComposerSubmission["action"],
  submittedAt = new Date(),
): ComposerSubmission {
  const timestamp = submittedAt.toISOString();

  return {
    draft: {
      ...draft,
      media: draft.media.map((media) => ({ ...media })),
      destinationIds: [...draft.destinationIds],
      updatedAt: timestamp,
    },
    action,
    submittedAt: timestamp,
  };
}

export function draftForStorage(draft: ComposerDraft): ComposerDraft {
  return {
    ...draft,
    destinationIds: [...draft.destinationIds],
    media: draft.media.map((media) => ({
      id: media.id,
      name: media.name,
      mimeType: media.mimeType,
      sizeBytes: media.sizeBytes,
    })),
  };
}
