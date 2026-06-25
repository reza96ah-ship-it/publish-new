import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-canvas p-6 text-center">
      <div className="n-panel max-w-md p-8">
        <p className="text-sm font-semibold text-accent">خطای ۴۰۴</p>
        <h1 className="mt-3 text-2xl font-bold">این صفحه پیدا نشد</h1>
        <Link href="/" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-control bg-accent px-5 text-sm font-semibold text-white">بازگشت به داشبورد</Link>
      </div>
    </main>
  );
}
