"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Headphones,
  Mic,
  Star,
  Maximize2,
  Minimize2,
  Keyboard,
  MoreHorizontal,
} from "lucide-react";
import { formatLevelBadge } from "./InteractiveTranscriptSidebar";

interface StudioTopHeaderProps {
  title: string;
  level?: string;
  currentMode: "listening" | "shadowing";
  lessonQueryId: string | number;
  isBookmarked?: boolean;
  accent?: string;
  onAccentChange?: (accent: string) => void;
  onToggleBookmark?: () => void;
  onBack: () => void;
  rightExtraActions?: React.ReactNode;
}

export function StudioTopHeader({
  title,
  level = "B2",
  currentMode,
  lessonQueryId,
  isBookmarked = false,
  accent = "en-US",
  onAccentChange,
  onToggleBookmark,
  onBack,
  rightExtraActions,
}: StudioTopHeaderProps) {
  const isListening = currentMode === "listening";
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-full px-3.5 sm:px-5 lg:px-6 h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-2 sm:gap-4 min-w-0 select-none">
      {/* 1. Left side: Back button, Level Badge, Title, Bookmark, Mode Switcher & Accent Switcher */}
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 overflow-hidden">
        <button
          type="button"
          onClick={onBack}
          className="px-2.5 sm:px-3 py-1.5 rounded-xl text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 active:scale-95 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs flex items-center gap-1.5 font-bold text-xs"
          title="Quay lại danh sách bài học"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
          <span className="hidden sm:inline">Quay lại</span>
        </button>

        {level && (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/70 dark:border-blue-800/60 shadow-2xs shrink-0">
            {formatLevelBadge(level)}
          </span>
        )}

        <h2
          className="text-sm sm:text-base lg:text-[15px] font-bold text-slate-900 dark:text-white font-sans truncate min-w-0 max-w-[150px] xs:max-w-[240px] sm:max-w-none"
          title={title}
        >
          {title}
        </h2>

        {onToggleBookmark && (
          <button
            type="button"
            onClick={onToggleBookmark}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer hidden xs:inline-flex"
            title={isBookmarked ? "Bỏ lưu bài học" : "Lưu bài học yêu thích"}
          >
            <Star
              className={`w-4 h-4 ${
                isBookmarked
                  ? "text-amber-500 fill-amber-500"
                  : "hover:stroke-amber-500"
              }`}
            />
          </button>
        )}

        {/* Micro Divider */}
        <div className="hidden xl:block w-[1px] h-4 bg-slate-200 dark:bg-slate-700 shrink-0 mx-0.5" />

        {/* Mode Switcher pill directly next to title */}
        <div className="p-0.5 sm:p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-0.5 shrink-0 ml-0.5">
          {/* Shadowing Tab Link */}
          <Link
            href={`/study/shadowing?id=${lessonQueryId}`}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer select-none ${
              !isListening
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
            title="Chuyển sang phòng luyện nói Shadowing"
          >
            <Mic className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">Nói</span>
          </Link>

          {/* Listening Tab Link */}
          <Link
            href={`/study/listening?id=${lessonQueryId}`}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer select-none ${
              isListening
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
            title="Phòng luyện nghe chép chính tả (Đang mở)"
          >
            <Headphones className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0 text-[#0059bb] dark:text-sky-400" />
            <span className="hidden sm:inline">Nghe</span>
          </Link>
        </div>

        {/* Micro Divider between Mode & Accent */}
        {onAccentChange && (
          <div className="hidden md:block w-[1px] h-4 bg-slate-200 dark:bg-slate-700 shrink-0 mx-0.5" />
        )}

        {/* Accent Switcher pill */}
        {onAccentChange && (
          <div className="hidden md:inline-flex p-0.5 sm:p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 items-center gap-0.5 shrink-0">
            {(["en-US", "en-GB", "en-AU"] as const).map((acc) => {
              const label = acc === "en-US" ? "US" : acc === "en-GB" ? "UK" : "AU";
              const isSelected =
                (accent || "en-US").toLowerCase().includes(label.toLowerCase()) ||
                (accent || "en-US").toLowerCase() === acc.toLowerCase();
              return (
                <button
                  key={acc}
                  type="button"
                  onClick={() => onAccentChange(acc)}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  title={`Đổi giọng đọc tiếng Anh ${label === "US" ? "Mỹ" : label === "UK" ? "Anh" : "Úc"}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Right side: Extra actions & Studio Toolbar Icons */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {rightExtraActions}

        {/* 3. Far Right Studio Toolbar Icons */}
        <div className="hidden md:flex items-center gap-0.5 text-slate-400 dark:text-slate-500 border-l border-slate-200 dark:border-slate-800 pl-2">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-md hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Toàn màn hình"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setShowKeyboardModal((p) => !p)}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              showKeyboardModal
                ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold"
                : "hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            title="Phím tắt luyện tập"
          >
            <Keyboard className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-md hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Tùy chọn khác"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KEYBOARD SHORTCUTS MODAL */}
      {showKeyboardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm sm:text-base font-display">
                <Keyboard className="w-4.5 h-4.5 text-blue-600 dark:text-sky-400" />
                <span>Bảng Phím Tắt Luyện Tập Studio</span>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyboardModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { key: "Space", desc: "Phát / Tạm dừng âm thanh câu" },
                { key: "Ctrl", desc: "Nghe lại câu hiện tại" },
                { key: "Enter", desc: "Chuyển sang câu tiếp theo" },
                { key: "Alt + H", desc: "Gợi ý chữ cái đầu của từ tiếp theo" },
                { key: "Alt + R", desc: "Hiển thị từ tiếp theo" },
                { key: "Alt + A", desc: "Hiển thị toàn bộ các từ trong câu" },
                { key: "← / →", desc: "Tua lùi 5s / Tua tiến 5s" },
                { key: "Shift + ← / →", desc: "Chuyển câu trước / câu tiếp theo" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                >
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{item.desc}</span>
                  <kbd className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono font-bold shadow-2xs">
                    {item.key}
                  </kbd>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowKeyboardModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
            >
              Đã hiểu & Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
