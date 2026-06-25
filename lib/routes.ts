export const ROUTES = {
  dashboard: "/",
  compose: "/compose",
  calendar: "/calendar",
  publishing: "/queue",
  campaigns: "/campaigns",
  content: "/content",
  inbox: "/inbox",
  analytics: "/analytics",
  channels: "/channels",
  settings: "/settings",
  login: "/login",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

export const DESKTOP_NAV_ITEMS = [
  { route: "dashboard", label: "داشبورد" },
  { route: "calendar", label: "تقویم محتوا" },
  { route: "publishing", label: "انتشار" },
  { route: "campaigns", label: "کمپین‌ها" },
  { route: "content", label: "کتابخانه محتوا" },
  { route: "inbox", label: "صندوق ورودی" },
  { route: "analytics", label: "تحلیل و گزارش‌ها" },
  { route: "channels", label: "پلتفرم‌ها و اتصال‌ها" },
  { route: "settings", label: "تنظیمات" },
] as const;

export const MOBILE_NAV_ITEMS = [
  { route: "dashboard", label: "خانه" },
  { route: "publishing", label: "انتشار" },
  { route: "calendar", label: "تقویم" },
  { route: "inbox", label: "صندوق" },
] as const;

export function isRouteActive(pathname: string, href: AppRoute): boolean {
  return href === ROUTES.dashboard ? pathname === href : pathname.startsWith(href);
}
