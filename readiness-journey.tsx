"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, MoreHorizontal, Inbox, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const primaryTask = {
  id: 0,
  type: "critical",
  title: "۲ انتشار اینستاگرام ناموفق است",
  context: "کمپین معرفی محصول تحت تأثیر قرار گرفته",
  time: "۸ دقیقه پیش",
  action: "بررسی و تلاش مجدد",
};

const secondaryTasks = [
  {
    id: 1,
    title: "۳ پست در انتظار تأیید",
    icon: CheckCircle2,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    id: 2,
    title: "مجوز LinkedIn تا دو روز دیگر منقضی می‌شود",
    icon: ShieldAlert,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    id: 3,
    title: "۵ پیام نزدیک به نقض زمان پاسخ",
    icon: Inbox,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    id: 4,
    title: "اتصال Rubika قطع است",
    icon: AlertTriangle,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
];

function XCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

export function ActionCenter() {
  const [activeTab, setActiveTab] = useState<"all" | "mine" | "alerts" | "inbox">("all");

  return (
    <div className="n-panel h-full flex flex-col">
      <div className="p-4 border-b border-slate-100 shrink-0">
        <h2 className="text-[14px] font-[800] text-slate-800 tracking-tight">مرکز اقدام</h2>
        
        <div className="flex items-center gap-1 mt-3 overflow-x-auto no-scrollbar">
          <TabButton active={activeTab === "all"} onClick={() => setActiveTab("all")}>همه موارد</TabButton>
          <TabButton active={activeTab === "mine"} onClick={() => setActiveTab("mine")}>اقدامات من</TabButton>
          <TabButton active={activeTab === "alerts"} onClick={() => setActiveTab("alerts")}>هشدارهای مهم</TabButton>
          <TabButton active={activeTab === "inbox"} onClick={() => setActiveTab("inbox")}>صندوق ورودی</TabButton>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {/* Primary Action */}
          <motion.div
            key="primary-task"
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3 p-4 bg-rose-50 border border-rose-200 rounded-[16px] shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-1.5 h-full bg-rose-500 rounded-r-[16px]" />
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-xl bg-white border border-rose-200 flex items-center justify-center shrink-0 shadow-sm text-rose-600">
                <AlertTriangle className="size-5" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[13px] font-[800] text-rose-900">{primaryTask.title}</span>
                <span className="text-[11px] font-[600] text-rose-700/80 mt-1">{primaryTask.context}</span>
                <span className="text-[10px] font-[750] text-rose-600/70 mt-2">{primaryTask.time}</span>
              </div>
            </div>
            <button className="mt-1 w-full text-[12px] font-[800] py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-sm">
              {primaryTask.action}
            </button>
          </motion.div>

          {/* Secondary Actions */}
          <div className="flex flex-col gap-2 mt-1">
            {secondaryTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="group flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-[12px] hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className={`size-8 rounded-[10px] ${task.bg} ${task.border} border flex items-center justify-center shrink-0`}>
                  <task.icon className={`size-4 ${task.color}`} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[11px] font-[750] text-slate-800 truncate">{task.title}</span>
                </div>
                <MoreHorizontal className="size-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabButton({ active, children, onClick }: { active: boolean, children: React.ReactNode, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-[11px] font-[700] whitespace-nowrap transition-colors ${
        active 
          ? "bg-slate-800 text-white shadow-sm" 
          : "bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}
