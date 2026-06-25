"use client";

import { AmbientMesh } from "./ambient-mesh";
import { useState } from "react";
import { X, Home, Send, Calendar, Inbox, MoreHorizontal, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AppShellProps = {
  sidebar?: React.ReactNode;
  topBar?: React.ReactNode;
  children: React.ReactNode;
};

export function AppShell({ sidebar, topBar: _topBar, children }: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "خانه", href: "/" },
    { icon: Send, label: "انتشار", href: "/publishing" },
    { icon: Calendar, label: "تقویم", href: "/calendar" },
    { icon: Inbox, label: "ورودی", href: "/inbox" },
  ];

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {/* 
        Sibling Layer 1: Ambient Mesh 
        Isolated GPU layer, never scrolls. 
      */}
      <AmbientMesh />

      {/* 
        Sibling Layer 2: Interactive Application 
      */}
      <div
        className="
          relative z-10
          flex flex-col lg:flex-row h-full min-h-0 w-full
          lg:gap-[var(--shell-gap)]
          lg:p-[var(--shell-gutter)]
        "
      >
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 n-glass-control border-b border-white/20 shrink-0 z-40">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-gradient-to-br from-[#45B2E8] to-[#2E8BB8] flex items-center justify-center text-white font-black text-[15px] shadow-sm">
              ن
            </div>
            <span className="text-sm font-[800] text-slate-800 tracking-tight">نشرینو</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="size-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm relative"
          >
            <div className="absolute -top-1 -right-1 size-3 rounded-full bg-rose-500 border-2 border-white"></div>
            <Inbox className="size-5" />
          </button>
        </header>

        {/* Mobile Drawer Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm lg:hidden"
              />
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 z-50 w-[280px] bg-white shadow-2xl lg:hidden flex flex-col"
              >
                <div className="flex items-center justify-between p-4 border-b border-slate-100 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-xl bg-gradient-to-br from-[#45B2E8] to-[#2E8BB8] flex items-center justify-center text-white font-black text-[15px] shadow-sm">
                      ن
                    </div>
                    <span className="text-sm font-[800] text-slate-800 tracking-tight">منو نشرینو</span>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
                  {sidebar}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <aside
          aria-label="ناحیه پیمایش نشرینو"
          className="
            hidden min-h-0
            w-[var(--sidebar-expanded)]
            shrink-0
            lg:flex lg:flex-col
          "
        >
          {sidebar}
        </aside>

        {/* Primary Workspace Area */}
        <div
          className="
            relative min-h-0 min-w-0 flex-1
            overflow-hidden
            lg:rounded-[var(--radius-panel)]
          "
        >
          {/* Master Scroll Owner (Main Stage) */}
          <main
            id="main-content"
            tabIndex={-1}
            className="
              absolute inset-0
              overflow-x-clip overflow-y-auto
              overscroll-y-contain
              [scrollbar-gutter:stable]
              focus:outline-none
            "
          >
            <div
              className="
                mx-auto min-h-full
                w-full max-w-[var(--stage-max-width)]
                px-3
                pb-[calc(80px+max(24px,env(safe-area-inset-bottom)))]
                lg:pb-[max(24px,env(safe-area-inset-bottom))]
                pt-[max(12px,var(--shell-gap))]
                sm:px-4
                xl:px-5
              "
            >
              {children}
            </div>
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 n-glass-control border-t border-slate-200 pb-[env(safe-area-inset-bottom)]">
          <div className="flex items-center justify-around h-[68px] px-2 relative">
            
            {/* Floating Create Action */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <button className="flex items-center gap-1.5 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-full shadow-lg shadow-blue-500/30 font-[700] text-[13px] tracking-tight hover:shadow-xl hover:-translate-y-0.5 transition-all">
                <Plus className="size-4" />
                محتوای جدید
              </button>
            </div>

            <div className="flex items-center w-full justify-between px-2 pt-2">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors ${
                      isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <div className={`relative ${isActive ? "bg-blue-50 text-blue-600" : ""} p-1.5 rounded-xl transition-colors`}>
                      <item.icon className="size-[22px]" />
                    </div>
                    <span className={`text-[10px] font-[750] ${isActive ? "text-blue-600" : "text-slate-500"}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
              
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors ${
                  isMobileMenuOpen ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <div className={`relative ${isMobileMenuOpen ? "bg-blue-50 text-blue-600" : ""} p-1.5 rounded-xl transition-colors`}>
                  <MoreHorizontal className="size-[22px]" />
                </div>
                <span className={`text-[10px] font-[750] ${isMobileMenuOpen ? "text-blue-600" : "text-slate-500"}`}>
                  بیشتر
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
