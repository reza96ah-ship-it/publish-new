"use client";

import { Activity, Clock, AlertTriangle, ArrowLeft, CheckCircle2, XCircle, RefreshCw, Send, ShieldAlert, Inbox } from "lucide-react";
import Image from "next/image";

export function OperationalSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      
      {/* 1. Publishing Health */}
      <div className="n-panel p-5 flex flex-col justify-between">
        <header className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
            <Activity className="size-5" />
          </div>
          <div>
            <h2 className="text-[13px] font-[800] text-slate-800">سلامت انتشار</h2>
            <p className="text-[11px] font-[600] text-slate-500 mt-0.5">روند ۲۴ ساعت گذشته</p>
          </div>
        </header>

        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center justify-between">
             <span className="text-[12px] font-[600] text-slate-600">نرخ موفقیت</span>
             <span className="text-[14px] font-[800] text-emerald-600 latin-number" dir="ltr">98.5%</span>
          </div>
          <div className="flex items-center justify-between">
             <span className="text-[12px] font-[600] text-slate-600 flex items-center gap-1.5"><XCircle className="size-3.5 text-rose-500" /> خطای انتشار</span>
             <span className="text-[13px] font-[750] text-slate-800 latin-number" dir="ltr">2</span>
          </div>
          <div className="flex items-center justify-between">
             <span className="text-[12px] font-[600] text-slate-600 flex items-center gap-1.5"><Clock className="size-3.5 text-amber-500" /> با تأخیر</span>
             <span className="text-[13px] font-[750] text-slate-800 latin-number" dir="ltr">1</span>
          </div>
          <div className="flex items-center justify-between">
             <span className="text-[12px] font-[600] text-slate-600 flex items-center gap-1.5"><RefreshCw className="size-3.5 text-blue-500" /> تلاش مجدد</span>
             <span className="text-[13px] font-[750] text-slate-800 latin-number" dir="ltr">4</span>
          </div>
        </div>

        <button className="mt-4 w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-slate-700">
          <span className="text-[11px] font-[700]">مشاهده موارد مسئله‌دار</span>
          <ArrowLeft className="size-3.5 text-slate-400" />
        </button>
      </div>

      {/* 2. Next Publishing Event */}
      <div className="n-panel p-5 flex flex-col justify-between">
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
              <Send className="size-5" />
            </div>
            <div>
              <h2 className="text-[13px] font-[800] text-slate-800">انتشار بعدی</h2>
              <p className="text-[11px] font-[600] text-slate-500 mt-0.5 text-indigo-600">۱۵ دقیقه دیگر</p>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100">
             <div className="size-12 rounded-lg bg-slate-200 overflow-hidden relative shrink-0">
               <Image src="https://picsum.photos/seed/vibrant/100/100" alt="Thumbnail" fill className="object-cover" referrerPolicy="no-referrer" />
             </div>
             <div className="flex flex-col min-w-0">
               <span className="text-[12px] font-[750] text-slate-800 truncate">معرفی قابلیت‌های جدید سیستم</span>
               <span className="text-[10px] font-[600] text-slate-500 truncate mt-0.5" dir="ltr">Instagram • @nashrino</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
             <div className="flex flex-col gap-1 p-2 bg-slate-50 rounded-xl border border-slate-100">
               <span className="text-[10px] font-[600] text-slate-500">زمانبندی</span>
               <span className="text-[11px] font-[750] text-slate-800">امروز، ۱۴:۳۰</span>
             </div>
             <div className="flex flex-col gap-1 p-2 bg-slate-50 rounded-xl border border-slate-100">
               <span className="text-[10px] font-[600] text-slate-500">وضعیت تأیید</span>
               <span className="text-[11px] font-[750] text-emerald-600 flex items-center gap-1"><CheckCircle2 className="size-3" /> تأیید شده</span>
             </div>
          </div>
        </div>

        <button className="mt-4 w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-slate-700">
          <span className="text-[11px] font-[700]">مشاهده برنامه</span>
          <ArrowLeft className="size-3.5 text-slate-400" />
        </button>
      </div>

      {/* 3. Action Required */}
      <div className="n-panel p-5 flex flex-col justify-between">
        <header className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0 shadow-sm">
            <AlertTriangle className="size-5" />
          </div>
          <div>
            <h2 className="text-[13px] font-[800] text-slate-800">نیازمند اقدام</h2>
            <p className="text-[11px] font-[600] text-slate-500 mt-0.5">موارد ضروری در انتظار شما</p>
          </div>
        </header>

        <div className="flex-1 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
             <span className="text-[12px] font-[600] text-slate-700 flex items-center gap-2"><CheckCircle2 className="size-4 text-amber-500" /> در انتظار تأیید</span>
             <span className="size-6 rounded-md bg-amber-50 flex items-center justify-center text-[12px] font-[800] text-amber-600 latin-number" dir="ltr">3</span>
          </div>
          <div className="flex items-center justify-between">
             <span className="text-[12px] font-[600] text-slate-700 flex items-center gap-2"><XCircle className="size-4 text-rose-500" /> انتشار ناموفق</span>
             <span className="size-6 rounded-md bg-rose-50 flex items-center justify-center text-[12px] font-[800] text-rose-600 latin-number" dir="ltr">2</span>
          </div>
          <div className="flex items-center justify-between">
             <span className="text-[12px] font-[600] text-slate-700 flex items-center gap-2"><ShieldAlert className="size-4 text-orange-500" /> مجوزهای در حال انقضا</span>
             <span className="size-6 rounded-md bg-orange-50 flex items-center justify-center text-[12px] font-[800] text-orange-600 latin-number" dir="ltr">1</span>
          </div>
          <div className="flex items-center justify-between">
             <span className="text-[12px] font-[600] text-slate-700 flex items-center gap-2"><Inbox className="size-4 text-blue-500" /> پیام‌های در خطر SLA</span>
             <span className="size-6 rounded-md bg-blue-50 flex items-center justify-center text-[12px] font-[800] text-blue-600 latin-number" dir="ltr">5</span>
          </div>
        </div>

        <button className="mt-4 w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-slate-700">
          <span className="text-[11px] font-[700]">مشاهده اقدامات</span>
          <ArrowLeft className="size-3.5 text-slate-400" />
        </button>
      </div>

    </div>
  );
}
