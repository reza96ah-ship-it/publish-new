import type { ComposerCampaignOption, ComposerDestination } from "./types";

export const composerDestinations: ComposerDestination[] = [
  {
    id: "destination-instagram-main",
    platform: "instagram",
    accountName: "نشرینو",
    accountHandle: "@nashrino_official",
    mode: "automatic",
    connected: true,
    supports: ["text", "image", "video", "carousel", "story", "link"],
    characterLimit: 2200,
  },
  {
    id: "destination-instagram-studio",
    platform: "instagram",
    accountName: "نشرینو استودیو",
    accountHandle: "@nashrino_studio",
    mode: "manual",
    connected: true,
    supports: ["image", "video", "carousel", "story"],
    characterLimit: 2200,
  },
  {
    id: "destination-telegram-main",
    platform: "telegram",
    accountName: "کانال نشرینو",
    accountHandle: "@nashrino",
    mode: "automatic",
    connected: true,
    supports: ["text", "image", "video", "carousel", "link"],
    characterLimit: 4096,
  },
  {
    id: "destination-linkedin-company",
    platform: "linkedin",
    accountName: "Nashrino",
    accountHandle: "nashrino-company",
    mode: "automatic",
    connected: true,
    supports: ["text", "image", "video", "link"],
    characterLimit: 3000,
  },
  {
    id: "destination-rubika-main",
    platform: "rubika",
    accountName: "نشرینو",
    accountHandle: "@nashrino",
    mode: "automatic",
    connected: false,
    supports: ["text", "image", "video", "link"],
    characterLimit: 3000,
  },
];

export const composerCampaigns: ComposerCampaignOption[] = [
  { id: "campaign-launch", name: "معرفی نسخه جدید", status: "active" },
  { id: "campaign-seasonal", name: "فروش پایان فصل", status: "active" },
  { id: "campaign-brand", name: "آگاهی از برند", status: "active" },
  { id: "campaign-research", name: "صدای مشتری", status: "draft" },
];
