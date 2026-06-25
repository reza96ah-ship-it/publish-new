import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SkipLink } from "@/components/shell/skip-link";

export const metadata = {
  title: "نشرینو",
  description: "سامانه مدیریت انتشار و عملیات شبکه‌های اجتماعی",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="min-h-dvh overflow-hidden bg-canvas font-sans text-ink-primary antialiased">
        <SkipLink />
        <ThemeProvider>{children}</ThemeProvider>
        <div id="portal-root" />
      </body>
    </html>
  );
}
