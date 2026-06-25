import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden p-5">
      <div aria-hidden="true" className="ambient-mesh fixed inset-0" />
      <section className="n-panel relative z-10 w-full max-w-md p-8 text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-2xl font-black text-white">N</div>
        <h1 className="mt-5 text-2xl font-bold">ورود به نشرینو</h1>
        <p className="mt-2 text-sm text-ink-secondary">نسخه تثبیت اولیه رابط کاربری</p>
        <Link href="/" className="mt-7 flex min-h-12 items-center justify-center rounded-control bg-accent px-5 font-semibold text-white">ورود آزمایشی</Link>
      </section>
    </main>
  );
}
