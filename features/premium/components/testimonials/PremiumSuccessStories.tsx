"use client";

import React from "react";
import { Star, CheckCircle2, MessageSquareQuote } from "lucide-react";
import { SUCCESS_STORIES } from "../../constants";

export function PremiumSuccessStories() {
  return (
    <div className="space-y-6 pt-2">
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-400 text-[10.5px] font-bold uppercase tracking-wider">
          <MessageSquareQuote className="w-3 h-3 text-[#0059bb] dark:text-sky-400" />
          <span>Bảng Vàng Thành Tích</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
          Học Viên Đã Bứt Phá Như Thế Nào?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Kết quả thực tế từ những người đã tin chọn đồng hành cùng gói PRO VIP
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {SUCCESS_STORIES.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all select-none"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-800/40">
                  {item.badge}
                </span>
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(item.rating ?? 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-950/80 text-[#0059bb] dark:text-sky-300 font-bold text-xs flex items-center justify-center font-display border border-blue-200 dark:border-blue-800">
                  {item.initials}
                </div>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 bg-white dark:bg-slate-900 rounded-full absolute -bottom-0.5 -right-0.5" />
              </div>

              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {item.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
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
