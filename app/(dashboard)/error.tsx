"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalDashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Dashboard routing error caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center select-none animate-fade-in">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-xl flex flex-col items-center space-y-5 relative overflow-hidden">
        {/* Top ambient glow line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />

        {/* Hero Icon Badge */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-800/80 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-sm shrink-0">
          <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
        </div>

        {/* Typography & Explanation */}
        <div className="space-y-2 max-w-sm">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            Đã xảy ra sự cố!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Hệ thống gặp lỗi không mong muốn hoặc không thể tải dữ liệu. Vui lòng kiểm tra kết nối và thử lại.
          </p>

          {error.message && (
            <div className="text-xs font-mono p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-200/70 dark:border-rose-900/40 text-rose-700 dark:text-rose-300 max-h-24 overflow-y-auto break-all mt-3 text-left">
              {error.message}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 h-11 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Thử lại</span>
          </button>
          <Link href="/dashboard" className="flex-1">
            <button
              type="button"
              className="w-full h-11 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer border border-slate-200/80 dark:border-slate-700 transition-all active:scale-95"
            >
              <Home className="w-4 h-4" />
              <span>Trang chủ</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
