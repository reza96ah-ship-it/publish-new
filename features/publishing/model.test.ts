import { describe, expect, it } from "vitest";
import { publishingFixtures } from "./fixtures";
import {
  canPausePublishingJob,
  canResumePublishingJob,
  canRetryPublishingJob,
  countPublishingTab,
  filterPublishingJobs,
  sortPublishingJobs,
  summarizePublishingJobs,
} from "./model";

describe("publishing queue model", () => {
  it("prioritizes actionable failures before scheduled work", () => {
    const sorted = sortPublishingJobs(publishingFixtures);
    expect(sorted[0]?.status).toBe("failed");
    expect(sorted.at(-1)?.status).toBe("published");
  });

  it("filters by Persian text and platform", () => {
    const result = filterPublishingJobs(publishingFixtures, {
      tab: "all",
      query: "گزارش ماهانه",
      platform: "linkedin",
      status: "all",
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("job-1002");
  });

  it("filters action-required jobs", () => {
    const result = filterPublishingJobs(publishingFixtures, {
      tab: "action",
      query: "",
      platform: "all",
      status: "all",
    });

    expect(result.map((job) => job.status)).toEqual(
      expect.arrayContaining(["failed", "manual_required", "paused"]),
    );
  });

  it("builds operational summary counts", () => {
    const summary = summarizePublishingJobs(publishingFixtures);

    expect(summary.total).toBe(8);
    expect(summary.failed).toBe(1);
    expect(summary.paused).toBe(1);
    expect(summary.published).toBe(1);
    expect(summary.live).toBeGreaterThan(0);
    expect(summary.upcoming).toBeGreaterThan(0);
    expect(summary.action).toBeGreaterThan(0);
  });

  it("counts history independently from published-only summary", () => {
    expect(countPublishingTab(publishingFixtures, "history")).toBe(1);
    expect(countPublishingTab(publishingFixtures, "all")).toBe(8);
  });

  it("exposes only valid contextual operations", () => {
    const failed = publishingFixtures.find((job) => job.status === "failed");
    const paused = publishingFixtures.find((job) => job.status === "paused");
    const scheduled = publishingFixtures.find((job) => job.status === "scheduled");

    expect(failed && canRetryPublishingJob(failed)).toBe(true);
    expect(paused && canResumePublishingJob(paused)).toBe(true);
    expect(scheduled && canPausePublishingJob(scheduled)).toBe(true);
  });
});
