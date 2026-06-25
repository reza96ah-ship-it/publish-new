"use client";
import { motion } from "motion/react";
import { Activity, Heart, MessageSquare, Target, Users } from "lucide-react";

export function KeyMetrics() {
  const metrics = [
    {
      label: "سلامت انتشار",
      value: "۹۶٪",
      trend: "+۳.۲٪",
      positive: true,
      icon: Activity,
      subtitle: "نرخ موفقیت انتشار",
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      chart: (
        <svg
          viewBox="0 0 100 30"
          className="w-full h-8 mt-4 stroke-indigo-400 fill-none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,25 C10,25 15,10 25,10 C35,10 40,28 50,28 C60,28 65,5 75,5 C85,5 90,20 100,20"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "کمپین‌های فعال",
      value: "۷",
      trend: "",
      positive: true,
      icon: Target,
      subtitle: "۴ مسیر | ۲ ریسک | ۰ متوقف",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      chart: (
        <svg
          viewBox="0 0 100 30"
          className="w-full h-8 mt-4 stroke-orange-400 fill-none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,15 L10,12 L20,20 L30,5 L40,15 L50,18 L60,8 L70,22 L80,10 L90,15 L100,5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "تعامل کل",
      value: "۸۵۶K",
      trend: "+۲۶.۷٪",
      positive: true,
      icon: MessageSquare,
      subtitle: "لایک، نظر، اشتراک‌گذاری و کلیک",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      chart: (
        <svg
          viewBox="0 0 100 30"
          className="w-full h-8 mt-4 stroke-emerald-400 fill-none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,28 Q10,25 20,20 T40,15 T60,5 T80,15 T100,2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "دسترسی و مشاهده",
      value: "۲.۴۸M",
      trend: "+۲۱.۴٪",
      positive: true,
      icon: Heart,
      subtitle: "نمایش کل ۳.۶۸M",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      chart: (
        <svg
          viewBox="0 0 100 30"
          className="w-full h-8 mt-4 stroke-pink-400 fill-none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,25 C15,25 25,5 40,15 C55,25 65,10 80,18 C90,23 95,10 100,10"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "رشد مخاطبان",
      value: "۱۲,۴۸۰",
      trend: "+۱۸.۶٪",
      positive: true,
      icon: Users,
      subtitle: "رشد خالص",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      chart: (
        <div className="w-full h-8 mt-4 flex items-end justify-between gap-0.5 px-1">
          {[4, 6, 5, 8, 7, 10, 9, 12, 11, 15, 14, 18, 16, 20, 24, 22].map(
            (h, i) => (
              <div
                key={i}
                className="bg-blue-400 rounded-t-sm w-full"
                style={{ height: `${h * 4}%` }}
              />
            ),
          )}
        </div>
      ),
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex overflow-x-auto pb-4 -mb-4 snap-x snap-mandatory gap-4 lg:grid lg:grid-cols-3 xl:grid-cols-5 lg:overflow-visible lg:pb-0 lg:mb-0 no-scrollbar"
    >
      {metrics.map((m, i) => (
        <motion.div
          key={i}
          variants={item}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group bg-white rounded-[20px] p-4 flex flex-col shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md cursor-default relative overflow-hidden shrink-0 w-[220px] lg:w-auto snap-center"
        >
          <div className="flex items-start justify-between relative z-10 mb-2">
            <span className="text-[13px] font-[750] text-slate-700">
              {m.label}
            </span>
            <div
              className={`size-9 rounded-[12px] ${m.bg} ${m.color} flex items-center justify-center`}
            >
              <m.icon className="size-4.5" />
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10 mt-1">
            <span
              className="latin-number text-xl md:text-2xl font-[800] tracking-tight text-slate-800"
              dir="ltr"
            >
              {m.value}
            </span>
            {m.trend && (
              <span
                className={`flex items-center gap-0.5 text-[12px] font-[750] ${m.positive ? "text-emerald-500" : "text-rose-500"}`}
                dir="ltr"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={m.positive ? "" : "rotate-180"}
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
                {m.trend}
              </span>
            )}
          </div>

          <p className="text-[10px] md:text-[11px] font-[600] text-slate-400 mt-2">
            {m.subtitle}
          </p>

          {m.chart}
        </motion.div>
      ))}
    </motion.div>
  );
}
