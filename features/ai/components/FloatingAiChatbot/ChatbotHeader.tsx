"use client";

import React from "react";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import {
  Bot,
  X,
  Minus,
  RotateCcw,
  Sparkles,
  Flame,
  Zap,
} from "lucide-react";

export default function ChatbotHeader() {
  const {
    isMinimized,
    setIsMinimized,
    setIsOpen,
    clearMessages,
    dbData,
  } = useAiChatbotStore();

  const user = dbData?.user || {
    currentStreak: 1,
    level: 1,
  };

  return (
    <div className="px-3.5 py-2.5 bg-gradient-to-r from-[#0059bb] via-[#004ba0] to-indigo-700 text-white rounded-t-2xl flex items-center justify-between shadow-xs select-none">
      {/* Identity & Status */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="relative shrink-0">
          <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          {/* Green Online Dot */}
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full animate-pulse" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xs tracking-tight text-white drop-shadow-xs">
              XP AI Mentor
            </span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[9px] font-bold text-sky-100 flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              Pro
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-blue-100/90">
            <span className="flex items-center gap-0.5 font-bold text-amber-300">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
              {user.currentStreak} ngày
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5 font-bold text-emerald-300">
              <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
              Lv.{user.level}
            </span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={clearMessages}
          title="Làm mới cuộc trò chuyện"
          className="p-1.5 rounded-lg hover:bg-white/15 active:scale-95 text-blue-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsMinimized(!isMinimized)}
          title={isMinimized ? "Mở rộng" : "Thu nhỏ"}
          className="p-1.5 rounded-lg hover:bg-white/15 active:scale-95 text-blue-100 transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsOpen(false)}
          title="Đóng"
          className="p-1.5 rounded-lg hover:bg-white/15 active:scale-95 text-blue-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
