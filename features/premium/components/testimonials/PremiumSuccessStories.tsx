"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { SUCCESS_STORIES } from "../../constants";

export function PremiumSuccessStories() {
  return (
    <div className="space-y-4 sm:space-y-5 pt-1">
      <div className="text-center max-w-xl mx-auto space-y-1">
        <Badge variant="primary" size="sm">Bảng Vàng Thành Tích</Badge>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
          Học Viên Đã Bứt Phá Như Thế Nào?
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Kết quả thực tế từ những người đã tin chọn đồng hành cùng gói Pro VIP
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {SUCCESS_STORIES.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all select-none"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 shadow-2xs">
                  {item.badge}
                </span>
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(item.rating ?? 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400 stroke-[2.2]"
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
              {/* Concentric Aura Avatar Ring with Verified Student Badge */}
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#0059bb] via-sky-400 to-amber-300 ring-1.5 ring-blue-500/20 shadow-2xs shrink-0">
                <div className="w-8.5 h-8.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-[#0059bb] dark:text-sky-300 font-bold text-xs flex items-center justify-center font-display">
                  {item.initials}
                </div>
                <CheckCircle2 className="w-3 h-3 text-emerald-500 bg-white dark:bg-slate-900 rounded-full absolute -bottom-0.5 -right-0.5" />
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
