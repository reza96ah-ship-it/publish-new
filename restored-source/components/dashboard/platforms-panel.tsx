"use client";
import {
  ShieldCheck,
  ChevronLeft,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";

export function PlatformsPanel() {
  const platforms = [
    {
      name: "اینستاگرام",
      // In a real app these would be real platform SVG files in /public/platforms
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
      state: "نیازمند احراز مجدد",
      stateColor: "text-amber-600 bg-amber-50 border-amber-200",
      accounts: 3,
      primaryIssue: "انقضای توکن حساب اصلی",
      lastSuccess: "۲ ساعت پیش",
    },
    {
      name: "تلگرام",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
      state: "متصل و پایدار",
      stateColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      accounts: 4,
      primaryIssue: null,
      lastSuccess: "هم‌اکنون",
    },
    {
      name: "لینکدین",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      state: "متصل و پایدار",
      stateColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      accounts: 1,
      primaryIssue: null,
      lastSuccess: "پنج دقیقه پیش",
    },
    {
      name: "روبیکا",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Rubika-Logo.png",
      state: "اختلال API",
      stateColor: "text-rose-700 bg-rose-50 border-rose-200",
      accounts: 2,
      primaryIssue: "خطای سرور ۵۰۰",
      lastSuccess: "۱ روز پیش",
    },
  ];

  return (
    <div className="n-panel p-4 md:p-5 h-full flex flex-col">
      <header className="flex items-center justify-between pb-4 shrink-0 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-slate-700" />
          <h2 className="text-[14px] font-[800] text-slate-800 tracking-tight">وضعیت پلتفرم‌ها</h2>
        </div>
        <button className="text-[11px] font-[700] text-slate-500 hover:text-slate-800 transition-colors">
          مدیریت اتصال‌ها
        </button>
      </header>

      <div className="flex flex-col gap-2 flex-1 overflow-y-auto no-scrollbar pe-1">
        {platforms.map((plat, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 p-3 rounded-[14px] bg-slate-50 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-8 rounded-[10px] bg-white border border-slate-200 p-1.5 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
                  {/* Using object-contain for logos to avoid cropping */}
                  <Image src={plat.logo} alt={plat.name} fill className="object-contain p-1.5" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] font-[800] text-slate-800 truncate">
                    {plat.name} <span className="text-[10px] font-[600] text-slate-500 font-normal">({plat.accounts} حساب)</span>
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-[9px] font-[800] px-1.5 py-0.5 rounded border ${plat.stateColor}`}>
                      {plat.state}
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="shrink-0 size-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 group-hover:text-slate-700 transition-colors">
                <ChevronLeft className="size-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-1 text-[10px] font-[600]">
              {plat.primaryIssue ? (
                <span className="text-rose-600 flex items-center gap-1 truncate">
                  <AlertTriangle className="size-3 shrink-0" /> {plat.primaryIssue}
                </span>
              ) : (
                <span className="text-slate-400 flex items-center gap-1 truncate">
                   بدون مشکل فعال
                </span>
              )}
              
              <span className="text-slate-500 shrink-0 flex items-center gap-1">
                 <RefreshCw className="size-3" />
                 {plat.lastSuccess}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
