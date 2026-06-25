import { describe, expect, it } from "vitest";
import { DESKTOP_NAV_ITEMS, MOBILE_NAV_ITEMS, ROUTES, isRouteActive } from "./routes";

describe("application route registry", () => {
  it("defines paths for desktop navigation", () => {
    for (const item of DESKTOP_NAV_ITEMS) {
      expect(ROUTES[item.route].startsWith("/")).toBe(true);
    }
  });

  it("defines paths for mobile navigation", () => {
    for (const item of MOBILE_NAV_ITEMS) {
      expect(ROUTES[item.route].startsWith("/")).toBe(true);
    }
  });

  it("matches the dashboard only at the root path", () => {
    expect(isRouteActive("/", ROUTES.dashboard)).toBe(true);
    expect(isRouteActive("/calendar", ROUTES.dashboard)).toBe(false);
  });

  it("matches nested feature paths", () => {
    expect(isRouteActive("/queue/failed", ROUTES.publishing)).toBe(true);
    expect(isRouteActive("/campaigns/launch", ROUTES.campaigns)).toBe(true);
    expect(isRouteActive("/inbox", ROUTES.analytics)).toBe(false);
  });
});
