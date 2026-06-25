import type {
  ComposerDestination,
  ComposerDraft,
  ComposerReadiness,
  ComposerStepId,
  ComposerSubmission,
  ComposerValidationIssue,
} from "./types";

const mediaRequiredTypes = new Set(["image", "video", "carousel", "story"]);

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
      message: "Ø¨Ø±Ø§ÛŒ Ù…Ø¯ÛŒØ±ÛŒØª Ø¯Ø§Ø®Ù„ÛŒ Ù…Ø­ØªÙˆØ§ ÛŒÚ© Ø¹Ù†ÙˆØ§Ù† ÙˆØ§Ø±Ø¯ Ú©Ù†ÛŒØ¯.",
    });
  }

  const hasBody = Boolean(draft.caption.trim() || draft.media.length || draft.linkUrl.trim());
  if (!hasBody) {
    issues.push({
      id: "body-required",
      field: "caption",
      severity: "error",
      message: "Ù…ØªÙ†ØŒ Ø±Ø³Ø§Ù†Ù‡ ÛŒØ§ Ù¾ÛŒÙˆÙ†Ø¯ Ø§ØµÙ„ÛŒ Ù…Ø­ØªÙˆØ§ Ù‡Ù†ÙˆØ² ÙˆØ§Ø±Ø¯ Ù†Ø´Ø¯Ù‡ Ø§Ø³Øª.",
    });
  }

  if (selected.length === 0) {
    issues.push({
      id: "destination-required",
      field: "destinations",
      severity: "error",
      message: "Ø­Ø¯Ø§Ù‚Ù„ ÛŒÚ© Ø­Ø³Ø§Ø¨ Ù…Ù‚ØµØ¯ Ø§Ù†ØªØ®Ø§Ø¨ Ú©Ù†ÛŒØ¯.",
    });
  }

  for (const destination of selected) {
    if (!destination.connected) {
      issues.push({
        id: `destination-disconned-${destination.id}`,
        field: "destinations",
        severity: "error",
        message: `Ø§ØªØµØ§Ù„ Â«${destination.accountName}Â» Ø¢Ù…Ø§Ø¯Ù‡ Ø§Ù†ØªØ´Ø§Ø± Ù†ÛŒØ³Øª.`,
      });
    }

    if (!destination.supports.includes(draft.contentType)) {
      issues.push({
        id: `destination-unsupported-${destination.id}`,
        field: "destinations",
        severity: "error",
        message: `Ù‚Ø§Ù„Ø¨ Ø§Ù†ØªØ®Ø§Ø¨â€ŒØ´Ø¯Ù‡ Ø¯Ø± Â«${destination.accountName}Â» Ù¾Ø´ØªÛŒØ¨Ø§Ù†ÛŒ Ù†Ù…ÛŒâ€ŒØ´ÙˆØ¯.`,
      });
    }

    if (destination.mode === "manual") {
      issues.push({
        id: `destination-manual-${destination.id}`,
        field: "destinations",
        severity: "warning",
        message: `Ø§Ù†ØªØ´Ø§Ø± Ø¯Ø± Â«${destination.accountName}Â» Ø¨Ø§ÛŒØ¯ Ø¨Ù‡â€ŒØµÙˆØ±Øª Ø¯Ø³ØªÛŒ ØªÚ©Ù…ÛŒÙ„ Ø´ÙˆØ¯.`,
      });
    }
  }

  if (mediaRequiredTypes.has(draft.contentType) && draft.media.length === 0) {
    issues.push({
      id: "media-required",
      field: "media",
      severity: "error",
      message: "Ø¨Ø±Ø§ÛŒ Ù‚Ø§Ù„Ø¨ Ø§Ù†ØªØ®Ø§Ø¨â€ŒØ´Ø¯Ù‡ Ø­Ø¯Ø§Ù‚Ù„ ÛŒÚ© ÙØ§ÛŒÙ„ Ø±Ø³Ø§Ù†Ù‡ Ù„Ø§Ø²Ù… Ø§Ø³Øª.",
    });
  }

  if (draft.contentType === "carousel" && draft.media.length === 1) {
    issues.push({
      id: "carousel-needs-more-media",
      field: "media",
      severity: "warning",
      message: "Ø¨Ø±Ø§ÛŒ Ù…Ø­ØªÙˆØ§ÛŒ Ú†Ù†Ø¯Ø§Ø³Ù„Ø§ÛŒØ¯ÛŒ Ø¨Ù‡ØªØ± Ø§Ø³Øª Ø­Ø¯Ø§Ù‚Ù„ Ø¯Ùˆ Ø±Ø³Ø§Ù†Ù‡ Ø§Ø¶Ø§ÙÙ‡ Ø´ÙˆØ¯.",
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
        message: "ÛŒÚ© Ù†Ø´Ø§Ù†ÛŒ Ù…Ø¹ØªØ¨Ø± Ø¨Ø§ http ÛŒØ§ https ÙˆØ§Ø±Ø¯ Ú©Ù†ÛŒØ¯.",
      });
    }
  }

  if (characterCount > characterLimit) {
    issues.push({
      id: "character-limit",
      field: "caption",
      severity: "error",
      message: `Ù…ØªÙ† ${characterCount - characterLimit} Ù†ÙˆÛŒØ³Ù‡ Ø¨ÛŒØ´ØªØ± Ø§Ø² Ù…Ø­Ø¯ÙˆØ¯ÛŒØª Ù…Ù‚ØµØ¯Ù‡Ø§ Ø§Ø³Øª.`,
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
      message: "ØªØ¹Ø¯Ø§Ø¯ Ø²ÛŒØ§Ø¯ Ù‡Ø´ØªÚ¯â€ŒÙ‡Ø§ Ù…ÛŒâ€ŒØªÙˆØ§Ù†Ø¯ Ø®ÙˆØ§Ù†Ø§ÛŒÛŒ Ù…Ø­ØªÙˆØ§ Ø±Ø§ Ú©Ø§Ù‡Ø´ Ø¯Ù‡Ø¯.",
    });
  }

  if (draft.approvalStatus === "pending") {
    issues.push({
      id: "approval-pending",
      field: "approval",
      severity: "error",
      message: "Ù…Ø­ØªÙˆØ§ Ù‡Ù†ÙˆØ² Ø¯Ø± Ø§Ù†ØªØ¸Ø§Ø± ØªØ£ÛŒÛŒØ¯ Ø§Ø³Øª.",
    });
  }

  if (draft.approvalStatus === "rejected") {
    issues.push({
      id: "approval-rejected",
      field: "approval",
      severity: "error",
      message: "Ù†Ø³Ø®Ù‡ ÙØ¹Ù„ÛŒ Ù…Ø­ØªÙˆØ§ Ø±Ø¯ Ø´Ø¯Ù‡ Ùˆ Ø¨Ø§ÛŒØ¯ Ø§ØµÙ„Ø§Ø­ Ø´ÙˆØ¯.",
    });
  }

  if (draft.scheduleMode === "scheduled") {
    if (!draft.scheduledAt) {
      issues.push({
        id: "schedule-required",
        field: "schedule",
        severity: "error",
        message: "Ø²Ù…Ø§Ù† Ø§Ù†ØªØ´Ø§Ø± Ø±Ø§ Ù…Ø¶+¶-H6ªva¶ã6+Ëˆ‹ˆJNÂˆH[ÙHÂˆÛÛœİØÚY[Y]H™]È]J˜YœØÚY[Y]
NÂˆYˆ
[X™\‹š\Ó˜SŠØÚY[Y]™Ù][YJ
JHØÚY[Y]™Ù][YJ
HH›İË™Ù][YJ
JHÂˆ\ÜİY\Ëœ\Ú
ÂˆYˆœØÚY[KY]\™H‹ˆšY[ˆœØÚY[H‹ˆÙ]™\š]Nˆ™\œ›Üˆ‹ˆY\ÜØYÙNˆ¶,¶av)öaˆ6)öa¶*¶-6)ö,H6*6)öã6+È6+ö,H6(¶ã6a¶+öaÈ6*6)ö-6+Ëˆ‹ˆJNÂˆBˆBˆB‚ˆÛÛœİ\œ›ÜÛİ[H\ÜİY\Ë™š[\Š
\ÜİYJHOˆ\ÜİYKœÙ]™\š]HOOH™\œ›ÜˆŠK›[™İÂˆÛÛœİØ\›š[™ĞÛİ[H\ÜİY\Ë›[™İH\œ›ÜÛİ[Â‚ˆ™]\›ˆÂˆ™XYNˆ\œ›ÜÛİ[OOHˆ\œ›ÜÛİ[ˆØ\›š[™ĞÛİ[ˆ\ÜİY\ËˆÚ\˜Xİ\“[Z]ˆÚ\˜Xİ\Ûİ[ˆNÂŸB‚™^Ü[˜İ[ÛˆÛÛ\ÜÙ\”İ\\ĞÛÛ\]Jˆİ\ˆÛÛ\ÜÙ\”İ\Yˆ˜YˆÛÛ\ÜÙ\‘˜Yˆ\İ[˜][ÛœÎˆ™XYÛ›HÛÛ\ÜÙ\‘\İ[˜][Û–×KŠNˆ›ÛÛX[ˆÂˆYˆ
İ\OOH˜ÛÛ[ŠHÂˆ™]\›ˆ›ÛÛX[Š˜Y]Kš[J
H	‰ˆ
˜Y˜Ø\[Û‹š[J
H˜Y›[šÕ\›š[J
JJNÂˆB‚ˆYˆ
İ\OOH™\İ[˜][ÛœÈŠHÂˆ™]\›ˆÙ]Ù[XİY\İ[˜][ÛœÊ˜Y\İ[˜][ÛœÊKœÛÛYJˆ
\İ[˜][ÛŠHOˆ\İ[˜][Û‹˜ÛÛ›™XİYˆ
NÂˆB‚ˆYˆ
İ\OOH›YYXHŠHÂˆ™]\›ˆ[YYXT™\]Z\™Y\\Ëš\Ê˜Y˜ÛÛ[\JH˜Y›YYXK›[™İˆÂˆB‚ˆ™]\›ˆ˜[Y]PÛÛ\ÜÙ\‘˜Y
˜Y\İ[˜][ÛœÊKœ™XYNÂŸB‚™^Ü[˜İ[ÛˆÜ™X]PÛÛ\ÜÙ\”İX›Z\ÜÚ[ÛŠˆ˜YˆÛÛ\ÜÙ\‘˜YˆXİ[ÛˆÛÛ\ÜÙ\”İX›Z\ÜÚ[Û–È˜Xİ[Ûˆ—KˆİX›Z]Y]H™]È]J
KŠNˆÛÛ\ÜÙ\”İX›Z\ÜÚ[ÛˆÂˆ™]\›ˆÂˆ˜YˆÂˆ‹‹™˜Yˆ\]Y]ˆİX›Z]Y]ÒTÓÔİš[™Ê
KˆKˆXİ[Û‹ˆİX›Z]Y]ˆİX›Z]Y]ÒTÓÔİš[™Ê
KˆNÂŸB‚™^Ü[˜İ[Ûˆ˜Y›Ü”İÜ˜YÙJ˜YˆÛÛ\ÜÙ\‘˜Y
NˆÛÛ\ÜÙ\‘˜YÂˆ™]\›ˆÂˆ‹‹™˜YˆYYXNˆ˜Y›YYXK›X\

È™]šY]Õ\›ˆÜ™]šY]Õ\›‹‹›YYXHJHOˆYYXJKˆNÂŸB