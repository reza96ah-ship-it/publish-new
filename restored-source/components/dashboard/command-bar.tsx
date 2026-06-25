"use client";
import { Calendar, Filter, RefreshCw, Search, Plus } from "lucide-react";

export function CommandBar() {
  return (
    <div className="hidden lg:flex items-center justify-between px-5 h-[64px] n-glass-control rounded-2xl relative z-20">
      
      {/* Right side / Inline start */}
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-[10px] bg-gradient-to-br from-blue-600 to-indigo-600 shadow-sm flex items-center justify-center text-white font-[800] text-xs">
          ن
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-[800] text-slate-800 tracking-tight leading-tight">
            داشبورد اصلی
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="size-1.5 rounded-full bg-emerald-500 shadow-sm" />
            <span className="text-[10px] font-[600] text-slate-500">
              فضای کاری نشرینو • متصل
            </span>
          </div>
        </div>
      </div>

      {/* Center / Command palette trigger */}
      <button className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 h-10 w-[380px] bg-slate-100/50 hover:bg-slate-100 border border-slate-200/60 rounded-xl transition-colors text-slate-400 group">
        <Search className="size-4 shrink-0" />
        <span className="text-[12px] font-[500] truncate">
          جستجو در محتوا، کمپین، حساب یا شناسه...
        </span>
        <div className="ms-auto flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
          <kbd className="font-sans text-[10px] font-[700] px-1.5 py-0.5 rounded border border-slate-200 bg-white">⌘</kbd>
          <kbd className="font-sans text-[10px] font-[700] px-1.5 py-0.5 rounded border border-slate-200 bg-white">K</kbd>
        </div>
      </button>

      {/* Left side / Inline end */}
      <div className="flex items-center gap-2.5">
        <button className="flex items-center gap-2 h-10 px-3.5 bg-white border border-slate-200/80 rounded-[12px] text-[12px] font-[650] text-slate-600 hover:text-slate-800 transition-all hover:bg-slate-50 shadow-sm">
          <Calendar className="size-4 opacity-70" />
          ۳۰ روز گذشته
        </button>

        <button className="flex items-center justify-center size-10 bg-white border border-slate-200/80 rounded-[12px] text-slate-600 hover:text-slate-800 transition-all hover:bg-slate-50 shadow-sm">
          <Filter className="size-4 opacity-70" />
        </button>

        <button className="flex items-center justify-center size-10 bg-white border border-slate-200/80 rounded-[12px] text-slate-600 hover:text-slate-800 transition-all hover:bg-slate-50 shadow-sm">
          <RefreshCw className="size-4 opacity-70" />
        </button>

        <div className="w-px h-6 bg-slate-200 mx-1"></div>

        <button className="flex items-center gap-2 h-10 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-[12px] text-[12px] font-[700] transition-colors shadow-sm">
          <Plus className="size-4 opacity-80" />
          محتوای جدید
        </button>
      </div>
    </div>
  );
}
