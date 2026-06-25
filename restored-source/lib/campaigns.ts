export function buildCampaignFilterOptions(posts: any, campaigns: any) { return []; }
export function campaignColorForPost(post: any, campaigns: any) { return ""; }
export function campaignKeyForPost(post: any) { return ""; }
export function campaignLabelForPost(post: any, campaigns: any) { return ""; }
export async function loadCampaigns() { return []; }
export type Campaign = any;
export type CampaignStatus = any;
export const createCampaign = async (val: any): Promise<any> => {};
export const updateCampaign = async (id: any, val: any): Promise<any> => {};
export const assignPostsToCampaign = async (a: any, b: any): Promise<{ updated_count: number, skipped_post_ids: string[], post_ids: string[] }> => { return { updated_count: 0, skipped_post_ids: [], post_ids: [] }; };
