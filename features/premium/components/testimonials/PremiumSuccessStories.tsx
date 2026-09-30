"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { SUCCESS_STORIES } from "../../constants";

export function PremiumSuccessStories() {
  return (
    <div className="space-y-4">
      <div className="text-center max-w-lg mx-auto space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display tracking-tight">
          Học Viên Đã Bứt Phá
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Cảm nhận thực tế từ những học viên đã tin tưởng lựa chọn XP Pro
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SUCCESS_STORIES.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                  {item.badge}
                </span>
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(item.rating ?? 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400 stroke-none"
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[#0059bb] dark:text-sky-300 font-bold text-xs flex items-center justify-center font-display border border-blue-200/60 dark:border-blue-800/60 shrink-0">
                {item.initials}
              </div>

              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {item.name}
                </div>
                <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">
                  {item.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
