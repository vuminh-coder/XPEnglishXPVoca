"use client";

import React, { useState } from "react";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import { Bot, X, RotateCcw, Check } from "lucide-react";

export default function ChatbotHeader() {
  const { setIsOpen, clearMessages, dbData } = useAiChatbotStore();
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const user = dbData?.user || {
    currentStreak: 1,
    level: 1,
  };

  const handleConfirmReset = () => {
    clearMessages();
    setShowConfirmReset(false);
  };

  return (
    <div className="px-3.5 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between select-none shrink-0 gap-2">
      {/* Identity & Status */}
      <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
        <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-[#0059bb] dark:text-sky-400 shrink-0 shadow-2xs">
          <Bot className="w-4.5 h-4.5 stroke-[1.8]" />
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="font-bold text-[13px] text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
              XP Mentor
            </span>
            <span className="px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-[10px] font-bold border border-blue-200/60 dark:border-blue-800/40 shrink-0">
              Lv.{user.level}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0" />
            <span className="truncate">Trợ lý học tập • {user.currentStreak} ngày streak</span>
          </div>
        </div>
      </div>

      {/* Action Controls with Safety Confirmation & High-End Touch Targets */}
      <div className="flex items-center gap-1 shrink-0">
        {!showConfirmReset && (
          <span
            className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-[10px] font-bold border border-blue-200/60 dark:border-blue-800/40 shrink-0 select-none shadow-2xs"
            title="Phím tắt đóng/mở nhanh: Ctrl + /"
          >
            Ctrl + /
          </span>
        )}

        {showConfirmReset ? (
          <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/50 border border-rose-200/80 dark:border-rose-900/50 px-1.5 py-1 rounded-lg text-xs animate-in fade-in zoom-in-95 duration-150 shrink-0">
            <span className="text-[10.5px] font-semibold text-rose-600 dark:text-rose-400 px-0.5 whitespace-nowrap">
              Xóa chat?
            </span>
            <button
              type="button"
              onClick={handleConfirmReset}
              className="px-2 py-0.5 rounded-md bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] flex items-center gap-0.5 cursor-pointer transition-colors shadow-2xs active:scale-95"
              title="Xác nhận xóa toàn bộ cuộc trò chuyện"
            >
              <Check className="w-2.5 h-2.5 stroke-[2.5]" /> Có
            </button>
            <button
              type="button"
              onClick={() => setShowConfirmReset(false)}
              className="px-2 py-0.5 rounded-md bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-650 text-slate-700 dark:text-slate-200 font-semibold text-[10px] cursor-pointer transition-colors active:scale-95"
              title="Hủy thao tác"
            >
              Hủy
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowConfirmReset(true)}
            aria-label="Làm mới cuộc trò chuyện"
            title="Làm mới cuộc trò chuyện"
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4 stroke-[1.8]" />
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            setShowConfirmReset(false);
            setIsOpen(false);
          }}
          aria-label="Đóng trợ lý (Ctrl + /)"
          title="Đóng trợ lý (Ctrl + /)"
          className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
        >
          <X className="w-4 h-4 stroke-[1.8]" />
        </button>
      </div>
    </div>
  );
}
