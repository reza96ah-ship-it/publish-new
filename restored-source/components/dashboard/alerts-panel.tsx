"use client";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert } from "lucide-react";
import { useState } from "react";

export function AlertsPanel() {
  const [alerts] = useState([
    {
      id: 1,
      title: "اتصال اینستاگرام قطع شده است. نیازمند احراز مجدد حساب کاربری.",
      severityBorder: "bg-rose-500",
      time: "۵ دقیقه پیش",
      action: "احراز مجدد",
    },
    {
      id: 2,
      title: "۳ انتشار ناموفق در تلگرام رخ داده است. خطای محدودیت ریت.",
      severityBorder: "bg-orange-500",
      time: "۱۵ دقیقه پیش",
      action: "بررسی خطاها",
    },
    {
      id: 3,
      title: "مجوز لینکدین تا ۳ روز دیگر منقضی می‌شود.",
      severityBorder: "bg-amber-500",
      time: "۴۵ دقیقه پیش",
      action: "تجدید مجوز",
    },
    {
      id: 4,
      title: "مصرف API روبیکا به ۸۵٪ رسید. احتمال قطعی سرویس.",
      severityBorder: "bg-blue-500",
      time: "۱ ساعت پیش",
      action: "مشاهده جزئیات",
    },
  ]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-[20px] p-5 h-full flex flex-col relative overflow-hidden border border-slate-100 shadow-sm"
    >
      <header className="flex items-center justify-between pb-4 shrink-0 relative z-10 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="size-5 text-blue-500" />
          <h2 className="text-sm font-[800] text-slate-800">
            هشدارهای نیازمند اقدام
          </h2>
        </div>
        <button className="text-[11px] font-[700] text-blue-600 hover:text-blue-800 transition-colors">
          مشاهده همه
        </button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto pe-1 no-scrollbar relative z-10">
        <AnimatePresence mode="popLayout">
          {alerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group/alert relative flex gap-3 p-3 transition-all rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 hover:shadow-sm cursor-pointer"
            >
              <div
                className={`shrink-0 w-1 rounded-full ${alert.severityBorder} self-stretch`}
              />

              <div className="flex-1 min-w-0 flex flex-col justify-center gap-2">
                <p className="text-[12px] font-[800] text-slate-800 truncate leading-snug">
                  {alert.title}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-[600] text-slate-500">
                    {alert.time}
                  </span>
                  <button className="text-[10px] font-[700] text-blue-600 hover:text-blue-800 bg-blue-100/50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition-colors">
                    {alert.action}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
