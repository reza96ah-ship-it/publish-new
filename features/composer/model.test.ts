import { describe, expect, it } from "vitest";
import { composerDestinations } from "./fixtures";
import {
  buildComposerPreviewText,
  composerStepIsComplete,
  createComposerSubmission,
  createEmptyComposerDraft,
  getComposerCharacterLimit,
  validateComposerDraft,
} from "./model";

describe("composer model", () => {
  it("creates a safe empty draft", () => {
    const draft = createEmptyComposerDraft(new Date("2026-06-25T08:00:00Z"));
    expect(draft.timezone).toBe("Asia/Tehran");
    expect(draft.destinationIds).toEqual([]);
    expect(draft.contentType).toBe("text");
  });

  it("reports required content and destination issues", () => {
    const readiness = validateComposerDraft(
      createEmptyComposerDraft(new Date("2026-06-25T08:00:00Z")),
      composerDestinations,
      new Date("2026-06-25T08:00:00Z"),
    );

    expect(readiness.ready).toBe(false);
    expect(readiness.issues.map((issue) => issue.field)).toEqual(
      expect.arrayContaining(["title", "caption", "destinations", "schedule"]),
    );
  });

  it("uses the strictest selected destination character limit", () => {
    const draft = {
      ...createEmptyComposerDraft(),
      destinationIds: [
        "destination-instagram-main",
        "destination-telegram-main",
      ],
    };

    expect(getComposerCharacterLimit(draft, composerDestinations)).toBe(2200);
  });

  it("accepts a complete scheduled text post", () => {
    const draft = {
      ...createEmptyComposerDraft(new Date("2026-06-25T08:00:00Z")),
      title: "گزارش هفتگی",
      caption: "خلاصه‌ای از عملکرد این هفته منتشر شد.",
      hashtags: "#نشرینو #گزارش",
      destinationIds: ["destination-telegram-main"],
      scheduledAt: "2026-06-26T08:00:00Z",
    };

    const readiness = validateComposerDraft(
      draft,
      composerDestinations,
      new Date("2026-06-25T08:00:00Z"),
    );

    expect(readiness.ready).toBe(true);
    expect(buildComposerPreviewText(draft)).toContain("#نشرینو");
    expect(composerStepIsComplete("review", draft, composerDestinations)).toBe(true);
  });

  it("blocks unsupported or disconnected destinations", () => {
    const draft = {
      ...createEmptyComposerDraft(new Date("2026-06-25T08:00:00Z")),
      title: "داستان روزانه",
      caption: "نمونه داستان",
      contentType: "story" as const,
      destinationIds: ["destination-rubika-main"],
      media: [
        {
          id: "media-1",
          name: "story.jpg",
          mimeType: "image/jpeg",
          sizeBytes: 1200,
        },
      ],
      scheduledAt: "2026-06-26T08:00:00Z",
    };

    const readiness = validateComposerDraft(
      draft,
      composerDestinations,
      new Date("2026-06-25T08:00:00Z"),
    );

    expect(readiness.ready).toBe(false);
    expect(readiness.issues.some((issue) => issue.id.includes("disconnected"))).toBe(true);
    expect(readiness.issues.some((issue) => issue.id.includes("unsupported"))).toBe(true);
  });

  it("creates an immutable submission envelope", () => {
    const draft = createEmptyComposerDraft(new Date("2026-06-25T08:00:00Z"));
    const submission = createComposerSubmission(
      draft,
      "draft",
      new Date("2026-06-25T09:00:00Z"),
    );

    expect(submission.action).toBe("draft");
    expect(submission.submittedAt).toBe("2026-06-25T09:00:00.000Z");
    expect(submission.draft).not.toBe(draft);
  });
});
