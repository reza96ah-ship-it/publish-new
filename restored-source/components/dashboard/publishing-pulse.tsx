"use client";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  MoreHorizontal,
  PlayCircle,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

export function PublishingPulse() {
  const [filter, setFilter] = useState("all");

  const allItems = [
    {
      id: 1,
      title: "معرفی محصول جدید تابستانه",
      desc: "توی این پست درباره ویژگی‌های...",
      account: "nashrino_official",
      accountCount: "+2",
      platform: "Instagram",
      status: "در حال پردازش",
      type: "live",
      schedule: "امروز، ۱۰:۳۰",
      processLabel: "پردازش در پلتفرم",
      progress: 65,
      assignee: "علی احمدی",
      assigneeAvatar: "https://i.pravatar.cc/150?u=1",
      campaign: "تخفیف‌های تابستانه",
      platformColor: "text-pink-600",
      platformBg: "bg-pink-100",
      thumbnail: "https://picsum.photos/seed/product1/100/100",
    },
    {
      id: 2,
      title: "نکات مهم بازاریابی دیجیتال",
      desc: "در این مقاله به بررسی جدیدترین...",
      account: "nashrino_blog",
      accountCount: "",
      platform: "LinkedIn",
      status: "در حال بارگذاری",
      type: "live",
      schedule: "امروز، ۱۲:۰۰",
      processLabel: "بارگذاری رسانه",
      progress: 40,
      assignee: "سارا مرادی",
      assigneeAvatar: "https://i.pravatar.cc/150?u=2",
      campaign: "Nashrino Co.",
      platformColor: "text-blue-600",
      platformBg: "bg-blue-100",
      thumbnail: "https://picsum.photos/seed/article2/100/100",
    },
    {
      id: 3,
      title: "تخفیف ویژه آخر هفته",
      desc: "فرصت محدود! فقط تا پایان...",
      account: "nashrino_shop",
      accountCount: "",
      platform: "Rubika",
      status: "نیازمند اقدام",
      type: "action",
      schedule: "۱۲ دقیقه تأخیر",
      processLabel: "خطا در اتصال",
      progress: 100,
      assignee: "محمد رضایی",
      assigneeAvatar: "https://i.pravatar.cc/150?u=3",
      campaign: "بدون کمپین",
      platformColor: "text-purple-600",
      platformBg: "bg-purple-100",
      thumbnail: "https://picsum.photos/seed/sale3/100/100",
    },
    {
      id: 4,
      title: "گزارش عملکرد ماهانه",
      desc: "نگاهی به دستاوردهای تیم...",
      account: "nashrino_channel",
      accountCount: "+1",
      platform: "Telegram",
      status: "منتشر شد",
      type: "success",
      schedule: "دیروز، ۱۸:۰۰",
      processLabel: "تأیید شد",
      progress: 100,
      assignee: "فرناز اسدی",
      assigneeAvatar: "https://i.pravatar.cc/150?u=4",
      campaign: "گزارشات سازمانی",
      platformColor: "text-sky-600",
      platformBg: "bg-sky-100",
      thumbnail: "https://picsum.photos/seed/report4/100/100",
    },
    {
      id: 5,
      title: "وبینار مدیریت شبکه‌های اجتماعی",
      desc: "ثبت‌نام وبینار رایگان مدیریت...",
      account: "nashrino_academy",
      accountCount: "",
      platform: "Instagram",
      status: "در صف",
      type: "scheduled",
      schedule: "فردا، ۰۹:۰۰",
      processLabel: "در انتظار سرور",
      progress: 0,
      assignee: "حسین کریمی",
      assigneeAvatar: "https://i.pravatar.cc/150?u=5",
      campaign: "آکادمی نشرینو",
      platformColor: "text-pink-600",
      platformBg: "bg-pink-100",
      thumbnail: "https://picsum.photos/seed/webinar5/100/100",
    },
  ];

  const items = allItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "live") return item.type === "live";
    if (filter === "action") return item.type === "action";
    return true;
  });

  const getStatusIcon = (type: string) => {
    switch (type) {
      case "live":
        return <PlayCircle className="size-4 text-blue-500" />;
      case "scheduled":
        return <Clock className="size-4 text-slate-400" />;
      case "action":
        return <AlertCircle className="size-4 text-orange-500" />;
      case "success":
        return <CheckCircle2 className="size-4 text-emerald-500" />;
      default:
        return null;
    }
  };

  const getStatusBg = (type: string) => {
    switch (type) {
      case "live":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "scheduled":
        return "bg-slate-100 text-slate-600 border-slate-200";
      case "action":
        return "bg-orange-500/10 text-orange-600 border-orange-200";
      case "success":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      default:
        return "";
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-[20px] p-5 h-full flex flex-col relative overflow-hidden group border border-slate-100 shadow-sm"
    >
      <header className="flex flex-col gap-4 shrink-0 relative z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-[800] text-slate-800 flex items-center gap-2">
            نبض انتشار (صف پردازش زنده)
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-rose-500"></span>
            </span>
          </h2>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-lg font-[800] text-slate-800">۲</span>
            <span className="text-[9px] font-[600] text-slate-500 mt-0.5 text-center">
              در صف
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-lg font-[800] text-slate-800">۲</span>
            <span className="text-[9px] font-[600] text-slate-500 mt-0.5 text-center">
              انتشار بعدی
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-lg font-[800] text-slate-800">۸</span>
            <span className="text-[9px] font-[600] text-slate-500 mt-0.5 text-center">
              در حال پردازش
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-lg font-[800] text-slate-800">۳</span>
            <span className="text-[9px] font-[600] text-slate-500 mt-0.5 text-center">
              نیازمند اقدام
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-sm font-[800] text-slate-800">۲۵ دقیقه</span>
            <span className="text-[9px] font-[600] text-slate-500 mt-0.5 text-center">
              بیشترین انتظار
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-0 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setFilter("live")}
              className={`relative pb-3 text-[12px] font-[750] transition-colors ${filter === "live" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
            >
              زنده
              {filter === "live" && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setFilter("upcoming")}
              className={`relative pb-3 text-[12px] font-[650] transition-colors ${filter === "upcoming" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
            >
              پیش رو
            </button>
            <button
              onClick={() => setFilter("action")}
              className={`relative pb-3 text-[12px] font-[650] transition-colors ${filter === "action" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
            >
              نیازمند اقدام
            </button>
            <button
              onClick={() => setFilter("history")}
              className={`relative pb-3 text-[12px] font-[650] transition-colors ${filter === "history" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
            >
              تاریخچه
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`relative pb-3 text-[12px] font-[650] transition-colors ${filter === "all" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
            >
              همه
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-x-hidden overflow-y-auto mt-3 no-scrollbar relative z-10 -mx-5 px-5 lg:-mx-0 lg:px-0 lg:overflow-x-auto lg:overflow-y-hidden">
        <div className="lg:min-w-[1000px] flex flex-col h-full">
          {/* Table Header */}
          <div className="hidden lg:grid grid-cols-[130px_minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_120px_minmax(0,1.2fr)_100px_40px] gap-3 px-3 py-1 mb-2 border-b border-slate-100 pb-2 shrink-0">
            <span className="text-[10px] font-[650] text-slate-400">وضعیت</span>
            <span className="text-[10px] font-[650] text-slate-400">محتوا</span>
            <span className="text-[10px] font-[650] text-slate-400">
              پلتفرم و حساب
            </span>
            <span className="text-[10px] font-[650] text-slate-400">کمپین</span>
            <span className="text-[10px] font-[650] text-slate-400">
              زمان‌بندی
            </span>
            <span className="text-[10px] font-[650] text-slate-400">
              روند پردازش
            </span>
            <span className="text-[10px] font-[650] text-slate-400">مسئول</span>
            <span className="text-[10px] font-[650] text-slate-400 text-center">
              اقدامات
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 lg:space-y-1 pe-1 no-scrollbar pb-2">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="group/row flex flex-col lg:grid lg:grid-cols-[130px_minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_120px_minmax(0,1.2fr)_100px_40px] lg:items-center gap-3 lg:gap-3 rounded-2xl p-4 lg:px-3 lg:py-2.5 transition-all bg-slate-50 lg:bg-transparent border border-slate-100 lg:border-transparent hover:bg-slate-50 cursor-pointer lg:hover:border-slate-100 shadow-sm lg:shadow-none"
                >
                  {/* Top row on mobile: Status + Actions */}
                  <div className="flex items-center justify-between lg:contents">
                    {/* Status */}
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border ${getStatusBg(item.type)} w-max`}
                    >
                      {getStatusIcon(item.type)}
                      <span className="text-[10px] font-[750]">
                        {item.status}
                      </span>
                    </div>

                    {/* Actions (Mobile Only) */}
                    <button className="grid size-8 lg:hidden place-items-center rounded-xl hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex items-center gap-3">
                    <div className="size-10 lg:size-8 rounded-lg shrink-0 bg-slate-100 border border-slate-200 overflow-hidden relative shadow-sm">
                      <Image src={item.thumbnail} alt={item.title} fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] lg:text-[12px] font-[750] text-slate-700">
                        {item.title}
                      </p>
                      <p className="truncate text-[11px] lg:text-[10px] font-[500] text-slate-500 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Columns / Mobile Grid */}
                  <div className="flex flex-col lg:contents mt-2 lg:mt-0 gap-2">
                    {/* Platform and Account */}
                    <div className="min-w-0 flex items-center gap-2">
                      <div
                        className={`size-6 rounded-full shrink-0 ${item.platformBg} ${item.platformColor} flex items-center justify-center font-bold text-[10px]`}
                      >
                        {item.platform[0]}
                      </div>
                      <span
                        className="truncate text-[11px] font-[600] text-slate-600"
                        dir="ltr"
                      >
                        {item.account}
                      </span>
                      {item.accountCount && (
                        <span className="text-[10px] font-[750] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md shrink-0">
                          {item.accountCount}
                        </span>
                      )}
                    </div>

                    {/* Campaign (Desktop Only) */}
                    <div className="hidden lg:flex min-w-0 flex-col justify-center">
                      <span className="text-[11px] font-[650] text-slate-700 truncate">
                        {item.campaign}
                      </span>
                    </div>

                    {/* Schedule */}
                    <div className="min-w-0 flex flex-col justify-center">
                      <span className="text-[11px] font-[650] text-slate-600 truncate">
                        زمان: {item.schedule}
                      </span>
                    </div>
                  </div>

                  {/* Processing Time */}
                  <div className="flex flex-col gap-1.5 lg:pe-4 mt-1 lg:mt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-[600] text-slate-500">
                        {item.processLabel}
                      </span>
                      {item.progress > 0 && (
                        <span
                          className="text-[10px] font-[700] text-blue-600 latin-number"
                          dir="ltr"
                        >
                          {item.progress}%
                        </span>
                      )}
                    </div>
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.type === "action" ? "bg-rose-500" : item.type === "success" ? "bg-emerald-500" : "bg-blue-500"}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Assignee (Desktop) */}
                  <div className="hidden lg:flex items-center gap-2">
                    <div className="size-6 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative shadow-sm shrink-0">
                      <Image src={item.assigneeAvatar} alt={item.assignee} fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-[10px] font-[650] text-slate-600 truncate">
                      {item.assignee}
                    </span>
                  </div>

                  {/* Actions (Desktop) */}
                  <div className="hidden lg:flex justify-center">
                    <button className="grid size-8 place-items-center rounded-xl hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="pt-3 mt-auto border-t border-slate-100 flex justify-center shrink-0">
        <button className="text-[11px] font-[700] text-blue-600 flex items-center gap-1 hover:text-blue-700 transition-colors">
          مشاهده همه انتشارها
        </button>
      </div>
    </motion.section>
  );
}
