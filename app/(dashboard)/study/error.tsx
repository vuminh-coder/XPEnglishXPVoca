"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function StudyGroupError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Study module routing error caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 text-center select-none animate-fade-in">
      <div className="p-1 bg-slate-100 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-xs max-w-md w-full shadow-sm">
        <div className="p-6 bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-xs flex flex-col items-center space-y-5">
          <div className="w-12 h-12 rounded-xs bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <AlertCircle className="h-6 w-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">Không tải được học phần!</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Hệ thống không thể tải dữ liệu bài học hoặc bài thi. Có thể đường truyền internet không ổn định hoặc cơ sở dữ liệu quá tải.
            </p>
            {error.message && (
              <div className="text-[11px] font-mono p-2.5 bg-slate-50 dark:bg-neutral-950 rounded-xs text-slate-500 dark:text-neutral-400 max-h-24 overflow-y-auto break-all mt-3 border border-slate-200 dark:border-neutral-800 text-left">
                {error.message}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full pt-1">
            <button
              onClick={() => reset()}
              className="flex-1 py-2.5 px-4 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition shadow-2xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Thử lại</span>
            </button>
            <Link href="/study/practice" className="flex-1">
              <button
                className="w-full py-2.5 px-4 rounded-xs bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-neutral-700 transition"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Quay lại</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
