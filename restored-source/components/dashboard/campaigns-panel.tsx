"use client";
import {
  ArrowLeft,
  Target,
  AlertCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";

export function CampaignsPanel() {
  const campaigns = [
    {
      name: "تخفیف‌های تابستانه",
      healthLabel: "در مسیر برنامه، با پیشرفت منظم انتشارها",
      healthColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      owner: "علی احمدی",
      daysRemaining: "۱۲ روز باقی‌مانده",
      pubProgress: 60,
      goalCompletion: "۲۵۰k بازدید",
      platforms: ["IG", "TG"],
      topBlocker: null,
    },
    {
      name: "معرفی ویژگی‌های نشرینو",
      healthLabel: "نیازمند توجه، به دلیل تأخیر در محتوای ویدیویی",
      healthColor: "text-amber-700 bg-amber-50 border-amber-200",
      owner: "سارا مرادی",
      daysRemaining: "۳ روز باقی‌مانده",
      pubProgress: 25,
      goalCompletion: "۵۰k دسترسی",
      platforms: ["LI", "IG", "TG"],
      topBlocker: "تأخیر در طراحی بنر",
    },
    {
      name: "مسابقه عکاسی",
      healthLabel: "در معرض ریسک، زیرا ۳ خروجی عقب افتاده است",
      healthColor: "text-rose-700 bg-rose-50 border-rose-200",
      owner: "محمد رضایی",
      daysRemaining: "پایان یافته",
      pubProgress: 85,
      goalCompletion: "۱۰۰k مشارکت",
      platforms: ["IG"],
      topBlocker: "تأییدیه بودجه",
    },
  ];

  return (
    <div className="n-panel p-4 md:p-5 h-full flex flex-col">
      <header className="flex items-center justify-between pb-4 shrink-0 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-2">
          <Target className="size-5 text-slate-700" />
          <h2 className="text-[14px] font-[800] text-slate-800 tracking-tight">وضعیت کمپین‌ها</h2>
        </div>
        <button className="text-[11px] font-[700] text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1">
          مشاهده همه <ArrowLeft className="size-3" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-1 -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="flex flex-col h-full gap-3">
          {campaigns.map((camp, i) => (
            <div
              key={i}
              className="flex flex-col lg:flex-row lg:items-center p-3 lg:p-4 rounded-[14px] bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:border-slate-200 hover:shadow-sm cursor-pointer"
            >
              {/* Info section */}
              <div className="flex flex-col lg:w-1/4 mb-3 lg:mb-0">
                <span className="text-[13px] font-[800] text-slate-800 truncate">{camp.name}</span>
                <div className="flex flex-col gap-1.5 mt-1.5">
                  <span className={`text-[10px] font-[750] px-1.5 py-0.5 rounded border w-fit max-w-full truncate ${camp.healthColor}`}>
                    {camp.healthLabel}
                  </span>
                  <span className="text-[10px] font-[600] text-slate-500 truncate">{camp.owner}</span>
                </div>
              </div>

              {/* Progress section (Primary bar) */}
              <div className="flex flex-col lg:w-2/5 px-0 lg:px-6 mb-3 lg:mb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-[600] text-slate-500">پیشرفت انتشار</span>
                  <span className="text-[10px] font-[800] text-slate-700 latin-number" dir="ltr">{camp.pubProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full" 
                    style={{ width: `${camp.pubProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1.5">
                  <span className="text-[10px] font-[600] text-slate-500 flex items-center gap-1">
                    <Clock className="size-3" /> {camp.daysRemaining}
                  </span>
                  <span className="text-[10px] font-[750] text-slate-700 flex items-center gap-1">
                    <Target className="size-3" /> {camp.goalCompletion}
                  </span>
                </div>
              </div>

              {/* Platforms & Blockers */}
              <div className="flex items-center justify-between lg:w-1/3 lg:ps-6 lg:border-r border-slate-200 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 mt-2 lg:mt-0">
                <div className="flex flex-col gap-1.5">
                  <div className="flex -space-x-1.5 space-x-reverse">
                    {camp.platforms.map((p, j) => (
                      <div key={j} className="size-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[7px] font-[800] text-slate-600 relative shadow-sm">
                        {p}
                      </div>
                    ))}
                  </div>
                  {camp.topBlocker ? (
                    <span className="text-[10px] font-[600] text-rose-600 flex items-center gap-1 truncate max-w-[120px]">
                      <AlertCircle className="size-3 shrink-0" /> {camp.topBlocker}
                    </span>
                  ) : (
                    <span className="text-[10px] font-[600] text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="size-3 shrink-0" /> بدون مسدودکننده
                    </span>
                  )}
                </div>
                
                <button className="size-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                  <ArrowLeft className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
