import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

export function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <section className="n-panel min-h-[60vh] p-6 sm:p-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center py-20 text-center">
        <div className="grid size-16 place-items-center rounded-[22px] bg-accent-soft text-accent"><Construction className="size-7" /></div>
        <h1 className="mt-6 text-2xl font-bold">{title}</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-ink-secondary">{description}</p>
        <p className="mt-2 text-xs text-ink-secondary">این بخش در مرحله بعد از تثبیت پوسته و مسیرهای اصلی بازگردانی می‌شود.</p>
        <Link href="/" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-control bg-accent px-5 text-sm font-semibold text-white">بازگشت به داشبورد<ArrowLeft className="size-4" /></Link>
      </div>
    </section>
  );
}
