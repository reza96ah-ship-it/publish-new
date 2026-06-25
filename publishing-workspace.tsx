"use client";
import { motion } from "motion/react";
import {
  CheckCircle,
  XCircle,
  Hand,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";

export function DecisionCenterPanel() {
  const decisions = [
    {
      id: 1,
      type: "approval",
      title: "پست‌های در انتظار تأیید",
      desc: "۲ مورد در صف - قدیمی‌ترین: ۳ ساعت پیش",
      action: "بررسی و تأیید",
      icon: CheckCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      ctaColor: "bg-blue-600 text-white hover:bg-blue-700",
    },
    {
      id: 2,
      type: "rejected",
      title: "محتوای ردشده",
      desc: "۱ مورد - نیازمند ویرایش متن و رسانه",
      action: "مشاهده و ویرایش",
      icon: XCircle,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
      ctaColor:
        "bg-white text-rose-600 hover:bg-rose-50 border border-rose-200",
    },
    {
      id: 3,
      type: "manual",
      title: "انتشارهای دستی نزدیک",
      desc: "۱ مورد اینستاگرام - امروز ۱۸:۰۰",
      action: "انتشار دستی",
      icon: Hand,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
      ctaColor:
        "bg-white text-orange-600 hover:bg-orange-50 border border-orange-200",
    },
    {
      id: 4,
      type: "expiry",
      title: "مجوزهای در آستانه انقضا",
      desc: "لینکدین نشرینو - ۳ روز آینده",
      action: "مدیریت مجوزها",
      icon: ShieldAlert,
      color: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-200",
      ctaColor:
        "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-2 px-1">
        <h2 className="text-sm font-[800] text-slate-800">نیازمند تصمیم شما</h2>
        <span className="flex size-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">
          {decisions.length}
        </span>
      </div>

      <div className="flex overflow-x-auto pb-4 -mb-4 snap-x snap-mandatory gap-4 lg:grid lg:grid-cols-4 lg:pb-0 lg:mb-0 lg:overflow-visible no-scrollbar">
        {decisions.map((decision, i) => (
          <motion.div
            key={decision.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className={`w-[260px] md:w-[280px] lg:w-auto shrink-0 snap-center flex flex-col gap-3 rounded-[20px] p-4 bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-slate-200`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${decision.bg} ${decision.color}`}
              >
                <decision.icon className="size-5" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <h3 className="text-[13px] font-[800] text-slate-800 truncate">
                  {decision.title}
                </h3>
                <p className="text-[10px] font-[600] text-slate-500 mt-1 truncate">
                  {decision.desc}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-2 flex justify-end">
              <button
                className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-[750] transition-colors ${decision.ctaColor}`}
              >
                {decision.action}
                {decision.type === "approval" && (
                  <ArrowLeft className="size-3" />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
