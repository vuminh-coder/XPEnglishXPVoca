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
  Columns,
  Rows,
  Layout,
} from "lucide-react";

interface StudioTopHeaderProps {
  title: string;
  level?: string;
  currentMode: "listening" | "shadowing";
  lessonQueryId: string | number;
  isBookmarked?: boolean;
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
      {/* 1. Left side: Back button, Level Badge, Title, Bookmark, Mode Switcher */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 overflow-hidden">
        <button
          type="button"
          onClick={onBack}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 active:scale-95 border border-slate-200/60 dark:border-slate-800 shadow-2xs"
          title="Quay lại danh sách bài học"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
        </button>

        <h2
          className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white font-sans truncate min-w-0 max-w-[150px] xs:max-w-[240px] sm:max-w-none"
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
              className={`w-4.5 h-4.5 ${
                isBookmarked
                  ? "text-amber-500 fill-amber-500"
                  : "hover:stroke-amber-500"
              }`}
            />
          </button>
        )}

        {/* Mode Switcher pill directly next to title */}
        <div className="p-0.5 sm:p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-0.5 shrink-0 ml-0.5 sm:ml-1">
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
            <Headphones className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0 text-blue-600 dark:text-sky-400" />
            <span className="hidden sm:inline">Nghe</span>
          </Link>
        </div>
      </div>

      {/* 2. Right side: Extra actions & Studio Toolbar Icons */}
      <div className="flex items-center gap-3 shrink-0">
        {rightExtraActions}

        {/* 3. Far Right Studio Toolbar Icons */}
        <div className="hidden md:flex items-center gap-0.5 text-slate-400 dark:text-slate-500 border-l border-slate-200 dark:border-slate-800 pl-2">
          <button
            type="button"
            className="p-1.5 rounded-md hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Đổi bố cục xem"
          >
            <Layout className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-md hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Chia đôi màn hình dọc"
          >
            <Columns className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-md hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Chia đôi màn hình ngang"
          >
            <Rows className="w-4 h-4" />
          </button>
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
            className="p-1.5 rounded-md hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
    </div>
  );
}
