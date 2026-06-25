"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  composerStepIsComplete,
  createComposerSubmission,
  createEmptyComposerDraft,
  draftForStorage,
  validateComposerDraft,
} from "./model";
import {
  composerCampaigns,
  composerDestinations,
} from "./fixtures";
import { ContentStep } from "./content-step";
import { DestinationsStep } from "./destinations-step";
import { MediaStep } from "./media-step";
import { ReviewStep } from "./review-step";
import {
  ComposerFooter,
  ComposerHeader,
  ComposerStepRail,
  composerSteps,
} from "./composer-navigation";
import { ComposerPreview } from "./composer-preview";
import type {
  ComposerDraft,
  ComposerMediaAttachment,
  ComposerStepId,
  ComposerSubmission,
} from "./types";

const storageKey = "nashrino_composer_draft_v1";

export function ComposerWorkspace() {
  const [draft, setDraft] = useState<ComposerDraft>(() =>
    createEmptyComposerDraft(),
  );
  const [activeStep, setActiveStep] = useState<ComposerStepId>("content");
  const [hydrated, setHydrated] = useState(false);
  const [autosaveState, setAutosaveState] = useState<
    "idle" | "saving" | "saved" | "restored"
  >("idle");
  const [result, setResult] = useState<ComposerSubmission | null>(null);
  const [message, setMessage] = useState("");
  const objectUrlsRef = useRef(new Set<string>());

  const readiness = useMemo(
    () => validateComposerDraft(draft, composerDestinations),
    [draft],
  );

  const activeStepIndex = composerSteps.findIndex((step) => step.id === activeStep);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as ComposerDraft;
        setDraft({
          ...createEmptyComposerDraft(),
          ...parsed,
          media: parsed.media ?? [],
          destinationIds: parsed.destinationIds ?? [],
        });
        setAutosaveState("restored");
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    setAutosaveState("saving");
    const timeout = window.setTimeout(() => {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify(draftForStorage(draft)),
      );
      setAutosaveState("saved");
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [draft, hydrated]);

  useEffect(() => {
    const urls = objectUrlsRef.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

  function updateDraft(next: ComposerDraft) {
    setDraft(next);
    setResult(null);
    setMessage("");
  }

  function addMedia(files: FileList) {
    const additions = Array.from(files).map((file) => {
      const previewUrl = URL.createObjectURL(file);
      objectUrlsRef.current.add(previewUrl);

      return {
        id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
        name: file.name,
        mimeType: file.type || "application/octet-stream",
        sizeBytes: file.size,
        previewUrl,
      } satisfies ComposerMediaAttachment;
    });

    updateDraft({
      ...draft,
      media:
        draft.contentType === "carousel"
          ? [...draft.media, ...additions]
          : additions.slice(0, 1),
      updatedAt: new Date().toISOString(),
    });
  }

  function removeMedia(media: ComposerMediaAttachment) {
    if (media.previewUrl) {
      URL.revokeObjectURL(media.previewUrl);
      objectUrlsRef.current.delete(media.previewUrl);
    }

    updateDraft({
      ...draft,
      media: draft.media.filter((item) => item.id !== media.id),
      updatedAt: new Date().toISOString(),
    });
  }

  function goToStep(index: number) {
    const step = composerSteps[index];
    if (step) {
      setActiveStep(step.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function saveDraft() {
    const submission = createComposerSubmission(draft, "draft");
    setResult(submission);
    setMessage("پیش‌نویس در مرورگر ذخیره شد.");
    window.localStorage.setItem(
      storageKey,
      JSON.stringify(draftForStorage(submission.draft)),
    );
  }

  function submitContent() {
    const latestReadiness = validateComposerDraft(draft, composerDestinations);

    if (!latestReadiness.ready) {
      setActiveStep("review");
      setMessage("پیش از ثبت نهایی، موارد خطا را برطرف کنید.");
      return;
    }

    const action =
      draft.scheduleMode === "scheduled" ? "schedule" : "ready";
    const submission = createComposerSubmission(draft, action);
    setResult(submission);
    setMessage(
      action === "schedule"
        ? "محتوا با موفقیت برای زمان انتخاب‌شده آماده شد."
        : "محتوا برای انتشار در اولین فرصت آماده شد.",
    );
    window.localStorage.removeItem(storageKey);
  }

  function resetDraft() {
    for (const media of draft.media) {
      if (media.previewUrl) {
        URL.revokeObjectURL(media.previewUrl);
        objectUrlsRef.current.delete(media.previewUrl);
      }
    }

    setDraft(createEmptyComposerDraft());
    setActiveStep("content");
    setResult(null);
    setMessage("");
    setAutosaveState("idle");
    window.localStorage.removeItem(storageKey);
  }

  return (
    <div className="flex flex-col gap-4 pb-8 md:gap-5">
      <ComposerHeader
        autosaveState={autosaveState}
        readinessReady={readiness.ready}
        onReset={resetDraft}
      />

      {message ? (
        <div
          role="status"
          className={`rounded-2xl border px-4 py-3 text-sm ${
            result
              ? "border-emerald-500/20 bg-emerald-500/10"
              : "border-amber-500/20 bg-amber-500/10"
          }`}
        >
          {message}
        </div>
      ) : null}

      <ComposerStepRail
        draft={draft}
        activeStep={activeStep}
        onStepChange={setActiveStep}
      />

      <div className="grid items-start gap-4 xl:grid-cols-12">
        <section
          className="n-panel overflow-hidden xl:col-span-7"
          aria-label="فرم ساخت محتوا"
        >
          <div className="p-4 sm:p-6">
            {activeStep === "content" ? (
              <ContentStep
                draft={draft}
                characterCount={readiness.characterCount}
                characterLimit={readiness.characterLimit}
                onChange={updateDraft}
              />
            ) : null}

            {activeStep === "destinations" ? (
              <DestinationsStep
                draft={draft}
                destinations={composerDestinations}
                onChange={updateDraft}
              />
            ) : null}

            {activeStep === "media" ? (
              <MediaStep
                draft={draft}
                onAddMedia={addMedia}
                onRemoveMedia={removeMedia}
              />
            ) : null}

            {activeStep === "review" ? (
              <ReviewStep
                draft={draft}
                campaigns={composerCampaigns}
                readiness={readiness}
                onChange={updateDraft}
              />
            ) : null}
          </div>

          <ComposerFooter
            activeIndex={activeStepIndex}
            readinessReady={readiness.ready}
            scheduleMode={draft.scheduleMode}
            onPrevious={() => goToStep(activeStepIndex - 1)}
            onNext={() => goToStep(activeStepIndex + 1)}
            onSave={saveDraft}
            onSubmit={submitContent}
          />
        </section>

        <div className="xl:col-span-5">
          <ComposerPreview
            draft={draft}
            destinations={composerDestinations}
            readiness={readiness}
          />
        </div>
      </div>
    </div>
  );
}
