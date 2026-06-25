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
):
ComposerDestination[] {
  const selected = new Set(draft.destinationIds);
  return destinations.filter((destination) => selected.has(destination.id));
}

export function getComposerCharacterLimit(
  draft: ComposerDraft,
  destinations: readonly ComposerDestination[],
): number {
  const selected = getSelectedDestinations(draft, destinations).filter(
    (destination) => destination.connected,
  );

  if (selected.length === 0) {
    return 3000;
  }

  return Math.min(...selected.map((destination) => destination.characterLimit));
}

export function buildComposerPreviewText(draft: ComposerDraft): string {
  return [draft.caption.trim(), draft.hashtags.trim()]
    .filter(Boolean)
    .join("\n\n");
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
      message: "\u0628\u0631\u0627\u06cc \u0645\u062f\u06cc\u0631\u06cc\u062a\u0020\u062f\u0627\u062e\u0644\u06cc\u0020\u0645\u062d\u062a\u0648\u0627\u0020\u06cc\u06a9\u0020\u0639\u0646\u0648\u0627\u0646\u0020\u0648\u0627\u0631\u062f\u0020\u06a9\u0646\u06cc\u062f.",
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
      message: "\u0645\u062a\u0646\u060c\u0020\u0631\u0633\u0627\u0646\u0647\u0020\u06cc\u0627\u0020\u067e\u06cc\u0648\u0646\u062f\u0020\u0627\u0635\u0644\u06cc\u0020\u0645\u062d\u062a\u0648\u0627\u0020\u0647\u0646\u0648\u0632\u0020\u0648\u0627\u0631\u062f\u0020\u0646\u0634\u062f\u0647\u0020\u0627\u0633\u062a.",
    });
  }

  if (selected.length === 0) {
    issues.push({
      id: "destination-required",
      field: "destinations",
      severity: "error",
      message: "\u062d\u062f\u0627\u0642\u0644\u0020\u06cc\u06a9\u0020\u062d\u0633\u0627\u0628\u0020\u0645\u0642\u0635\u062f\u0020\u0627\u0646\u062a\u062e\u0627\u0628\u0020\u06a9\u0646\u06cc\u062f.",
    });
  }

  for (const destination of selected) {
    if (!destination.connected) {
      issues.push({
        id: `destination-disconnected-${destination.id}`,
        field: "destinations",
        severity: "error",
        message: "\u0627\u062a\u0635\u0627\u0644\u0020\u00ab{name}\u00bb\u0020\u0622\u0645\u0627\u062f\u067\u0620\u0646\u062a\u0634\u0627\u0631\u0020\u0646\u06cc\u0633\u062a.".replace(
          "{name}",
          destination.accountName,
        ),
      });
    }

    if (!destination.supports.includes(draft.contentType)) {
      issues.push({
        id: `destination-unsupported-${destination.id}`,
        field: "destinations",
        severity: "error",
        message: "\u0642\u0627\u0644\u0628\u0020\u0627\u0646\u062a\u062e\u0627\u0628\u200c\u0634\u062f\u0647\u0020\u062f\u0631\u0020\u00ab{name}\u00bb\u0020\u067e\u0634\u062a\u6cc\u0628\u0627\u0646\u06cc\u0020\u0646\u0645\u06cc\u200c\u0634\u0648\u062f.".replace(
          "{name}",
          destination.accountName,
        ),
      });
    }

    if (destination.mode === "manual") {
      issues.push({
        id: `destination-manual-${destination.id}`,
        field: "destinations",
        severity: "warning",
        message: "\u0627\u0646\u062a\u0634\u0627\u0631\u0020\u062f\u0631\u0020\u00ab{name}\u00bb\u0020\u0628\u0627\u6cc\u062f\u0020\u0628\u0647\u200c\u0635\u0648\u0631\u062a\u0020\u062f\u0633\u062a\u06cc\u0020\u062a\u06a9\u0645\u06cc\u0644\u0020\u0634\u0648\u062f.".replace(
          "{name}",
          destination.accountName,
        ),
      });
    }
  }

  if (mediaRequiredTypes.has(draft.contentType) && draft.media.length === 0) {
    issues.push({
      id: "media-required",
      field: "media",
      severity: "error",
      message: "\u0628\u0631\u0627\u06cc\u0020\u0642\u0627\u0644\u0628\u0020\u0627\u066\u062a\u062e\u0627\u0628\u200c\u0634\u062d\u0647\u0020\u062d\u062f\u0627\u0642\u0644\u0020\u06cc\u6a9\u0020\u0641\u0627\u06cc\u0644\u0020\u0631\u0633\u0627\u0646\u0647\u0020\u0644\u0627\u0632\u0645\u0020\u0627\u0633\u062a.",
    });
  }

  if (draft.contentType === "carousel" && draft.media.length === 1) {
    issues.push({
      id: "carousel-needs-more-media",
      field: "media",
      severity: "warning",
      message: "\u0628\u0631\u0627\u06cc\u0020\u0645\u062d\u062a\u0648\u0627\u06cc\u0020\u0686u0646\u062f\u0627\u0633\u0644\u0627\u06cc\u062f\u06cc\u0020\u0628\u0647\u062a\u0631\u0020\u0627\u0633\u062a\u0020\u062d\u062f\u0627\u0642\u0644\u0020\u062f\u0648\u0020\u0631\u0633\u0627\u066\u0647\u0020\u0627\u0636\u0627\u0641\u0647\u0020\u0634\u0648\u062d.",
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
        message: "\u6cc\u06a9\u0020\u0646\u0634\u0627\u0646\u06cc\u0020\u0645\u0639\u062a\u0628\u0631\u0020\u0628\u0627\u0020\u0068http\u0020\u6cc\u0627\u0020\u0068https\u0020\u0648\u0627\u0631\u062f\u0020\u06a9\u0646\u06cc\u062f.",
      });
    }
  }

  if (characterCount > characterLimit) {
    issues.push({
      id: "character-limit",
      field: "caption",
      severity: "error",
      message: "\u0645\u062a\u0646\u0020\u007cb{count}\u0020\u0646\u0648\u066cc\u0633\u0647\u0020\u0628\u06cc\u0634\u062a\u0631\u0020\u0627\u0632\u0020\u0645\u062d\u062f\u0648\u062f\u06cc\u062a\u0020\u0645\u0642\u0635\u062f\u0647\u0627\u0020\u0627\u0633\u062a.".replace(
        "{count}",
        String(characterCount - characterLimit),
      ),
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
      message: "\u062a\u0639\u062f\u0627\u062f\u0020\u0632\u06cc\u0627\u062f\u0020\u0647\u0634\u062a\u06af\u200c\u0647\u0627\u0020\u0645\u06cc\u062a\u0648\u0627\u066\u062f\u0020\u062e\u0648\u0627\u0646\u0627\u6cc\u0020\u0645\u062d\u062d\u062a\u0648\u0627\u0020\u0631\u0627\u0020\u06a9\u0627\u0647\u0634\u0020\u062f\u0647\u062f.",
    });
  }

  if (draft.approvalStatus === "pending") {
    issues.push({
      id: "approval-pending",
      field: "approval",
      severity: "error",
      message: "\u0645\u062d\u062a\u0648\u0627\u0020\u0647\u0646\u0648\u0632\u0020\u062f\u0631\u0020\u0627\u0646\u062a\u0638\u0627\u0631\u0020\u062a\u0623\u6cc\u06cc\u062f\u0020\u0627\u0633\u062a.",
    });
  }

  if (draft.approvalStatus === "rejected") {
    issues.push({
      id: "approval-rejected",
      field: "approval",
      severity: "error",
      message: "\u0646\u0633\u062e\u0647\u0020\u0641\u0639\u0644\u06cc\u0020\u0645\u062d\u062f\u062a\u0648\u0627\u0020\u0631\u062f\u0020\u0634\u062f\u0647\u0020\u0648\u0020\u0628\u0627\u06cc\u062f\u0020\u0627\u0635\u0644\u0627\u062d\u0020\u0634\u0648\u062f.",
    });
  }

  if (draft.scheduleMode === "scheduled") {
    if (!draft.scheduledAt) {
      issues.push({
        id: "schedule-required",
        field: "schedule",
        severity: "error",
        message: "\u0632\u0645\u0627\u0646\u0020\u0627\u0646\u062a\u0634\u0627\u0631\u0020\u0631\u0627\u0020\u0645\u0634\u062e\u0635\u0020\u06a9\u0646\u06cc\u062f.",
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
          message: "\u0632\u0645\u0627\u0646\u0020\u0627\u0646\u062a\u0634\u0627\u0631\u0020\u0628\u0627\u06cc\u062f\u0020\u062f\u0631\u0020\u0622\u06cc\u0646\u062f\u0647\u0020\u0628\u0627\u0634\u062f.",
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
