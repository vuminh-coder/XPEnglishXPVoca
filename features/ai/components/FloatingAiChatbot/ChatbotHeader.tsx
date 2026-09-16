"use client";
import React from "react";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import { Sparkles, X, Compass, MessageSquare, Lightbulb, Minimize2, Maximize2 } from "lucide-react";

export default function ChatbotHeader() {
  const { activeTab, setActiveTab, setIsOpen, isMinimized, setIsMinimized } = useAiChatbotStore();

  return (
    <div className="border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-t-2xl p-3 sm:p-3.5 space-y-2.5 select-none">
      {/* Top bar: Identity & Controls */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0059bb] to-[#8b5cf6] flex items-center justify-center text-white shadow-md shadow-[#0059bb]/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                XP AI Mentor
              </h3>
              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase bg-purple-50 dark:bg-purple-950/60 text-[#8b5cf6] border border-purple-200/60 dark:border-purple-800/40">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium truncate">
              Trợ lý học tập & Lộ trình thông minh
            </p>
          </div>
        </div>

        {/* Window controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            title={isMinimized ? "Phóng to" : "Thu nhỏ"}
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center transition-colors cursor-pointer"
            title="Đóng (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3-Tab Segment Navigation (Rule 14) */}
      {!isMinimized && (
        <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("chat")}
            className={`h-7.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer truncate ${
              activeTab === "chat"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 font-bold shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Gia Sư AI</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("roadmap")}
            className={`h-7.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer truncate ${
              activeTab === "roadmap"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 font-bold shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Lộ Trình</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("suggestions")}
            className={`h-7.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer truncate ${
              activeTab === "suggestions"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 font-bold shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 shrink-0 text-amber-500" />
            <span className="truncate">Gợi Ý</span>
          </button>
        </div>
      )}
    </div>
  );
}
