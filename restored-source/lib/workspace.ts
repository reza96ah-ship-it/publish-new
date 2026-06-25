export async function loadWorkspaceOverview() { return { store: null }; }
export type StoreProfile = any;
export type WorkspaceOverview = any;
export function notifyWorkspaceUpdated() {}
export function isRubikaTestFresh() { return false; }
export const isRubikaConnected = (val: any) => false;
export const rubikaStatusLabel = (val: any) => '';
export const isStoreConfigured = (val: any) => false;
export const workspaceUpdatedEvent = 'workspace-updated';
export type RubikaSettings = any;
export type ReadinessStep = any;
export const buildReadinessSteps = (a: any, b: any, c: any) => [];
export const nextReadinessStep = (a: any) => null;
