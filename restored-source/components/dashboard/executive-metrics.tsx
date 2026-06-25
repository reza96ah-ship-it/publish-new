"use client";

import { motion } from "motion/react";

const metrics = [
  {
    id: "engagement",
    title: "تعامل کل",
    value: "142.5K",
    trend: "۱۲.۵٪ افزایش",
    trendUp: true,
    context: "نسبت به ۳۰ روز قبل",
    chartData: [40, 45, 42, 50, 48, 55, 60],
  },
  {
    id: "reach",
    title: "دسترسی و مشاهده",
    value: "2.4M",
    trend: "۸.۲٪ افزایش",
    trendUp: true,
    context: "مجموع پلتفرم‌ها",
    chartData: [60, 58, 65, 62, 70, 68, 75],
  },
  {
    id: "audience",
    title: "رشد مخاطبان",
    value: "12,450+",
    trend: "۴.۱٪ افزایش",
    trendUp: true,
    context: "نسبت به دوره قبل",
    chartData: [30, 35, 33, 40, 45, 42, 50],
  },
  {
    id: "campaigns",
    title: "کمپین‌های فعال",
    value: "4",
    trend: "۱ کاهش",
    trendUp: false,
    context: "درحال اجرا",
    chartData: [3, 4, 4, 3, 4, 5, 4],
  },
];

export function ExecutiveMetrics() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="n-panel p-4 flex flex-col"
        >
          <span className="text-[12px] font-[700] text-slate-600 mb-2">{metric.title}</span>
          
          <span className="text-2xl font-[800] text-slate-800 latin-number tracking-tight leading-none mb-1" dir="ltr">
            {metric.value}
          </span>

          <div className="flex justify-between items-end mt-auto pt-3">
             <div className="flex flex-col gap-0.5">
               <div className={`text-[11px] font-[700] ${metric.trendUp ? "text-emerald-600" : "text-amber-600"} latin-number`}>
                 {metric.trend}
               </div>
               <span className="text-[9px] font-[600] text-slate-400">{metric.context}</span>
             </div>

             {/* Minimal meaningful sparkline */}
             <div className="w-16 h-8 flex items-end gap-[2px] opacity-70">
               {metric.chartData.map((val, idx) => (
                 <div 
                   key={idx}
                   className={`flex-1 rounded-t-[2px] ${metric.trendUp ? "bg-blue-200" : "bg-slate-200"}`}
                   style={{ height: `${(val / 100) * 100}%` }}
                 />
               ))}
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
