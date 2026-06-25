import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/shell/skip-link";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/toast-provider";

// Initialize the Variable font
const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "نشرینو",
    template: "%s | نشرینو",
  },
  description: "سامانه مدیریت انتشار و عملیات شبکه‌های اجتماعی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazir.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh w-full overflow-hidden bg-canvas text-ink-primary font-sans" suppressHydrationWarning>
        <SkipLink />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>

        <div id="portal-root" />
      </body>
    </html>
  );
}
