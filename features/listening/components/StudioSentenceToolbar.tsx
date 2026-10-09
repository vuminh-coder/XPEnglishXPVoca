"use client";

import React from "react";
import { BookmarkPlus, Flag, Combine, Eye, EyeOff } from "lucide-react";

export interface StudioSentenceToolbarProps {
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onReport: () => void;
  fontSizeLevel: number;
  onAdjustFontSize: (delta: number) => void;
  autoNextSentence: boolean;
  onToggleAutoNext: (enabled: boolean) => void;
  hideTranslation: boolean;
  onToggleHideTranslation: (hidden: boolean) => void;
  canMergeNext?: boolean;
  isMergedWithNext?: boolean;
  onToggleMergeNext?: () => void;
  className?: string;
}

/**
 * StudioSentenceToolbar: Shared utility toolbar for current sentence actions
 * across Dictation and Shadowing studios. Provides bookmarker, error reporting,
 * font scaling, automatic sentence progression, translation toggle,
 * and optional multi-sentence merging.
 */
export const StudioSentenceToolbar: React.FC<StudioSentenceToolbarProps> = React.memo(
  function StudioSentenceToolbar({
    isBookmarked,
    onToggleBookmark,
    onReport,
    fontSizeLevel,
    onAdjustFontSize,
    autoNextSentence,
    onToggleAutoNext,
    hideTranslation,
    onToggleHideTranslation,
    canMergeNext = false,
    isMergedWithNext = false,
    onToggleMergeNext,
    className = "",
  }) {
    return (
      <div
        className={`w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs font-medium select-none ${className}`}
      >
        {/* Left Action Group: Bookmark, Report, Optional Merge */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
          {/* Bookmark */}
          <button
            type="button"
            onClick={onToggleBookmark}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
              isBookmarked
                ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/60 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            title={
              isBookmarked
                ? "Đã lưu câu này vào sổ tay (Nhấp để hủy)"
                : "Lưu câu này vào sổ tay luyện tập"
            }
          >
            <BookmarkPlus
              className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`}
            />
            <span>Lưu câu</span>
          </button>

          {/* Report */}
          <button
            type="button"
            onClick={onReport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer select-none active:scale-95"
            title="Báo cáo lỗi câu này"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Báo cáo</span>
          </button>

          {/* Optional: Merge with Next (for long sentence/conversational shadowing) */}
          {canMergeNext && onToggleMergeNext && (
            <button
              type="button"
              onClick={onToggleMergeNext}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
                isMergedWithNext
                  ? "text-[#0059bb] dark:text-sky-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/90 dark:border-blue-800/80 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              title={
                isMergedWithNext
                  ? "Đang ghép 2 câu liên tiếp (Nhấn để tách lại câu đơn)"
                  : "Ghép câu kế tiếp để luyện đoạn hội thoại dài tự nhiên"
              }
            >
              <Combine className="w-3.5 h-3.5" />
              <span>
                {isMergedWithNext ? "Tách câu đơn" : "Ghép câu kế tiếp (+1)"}
              </span>
            </button>
          )}
        </div>

        {/* Right Settings Group: Font Size, Auto-Next, Hide Translation */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* Font Scaling: -A / +A */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => onAdjustFontSize(-1)}
              disabled={fontSizeLevel <= 0}
              className="px-2 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-slate-600 cursor-pointer rounded transition-colors"
              title="Giảm cỡ chữ"
            >
              -A
            </button>
            <span className="w-px h-3 bg-slate-300 dark:bg-slate-600" />
            <button
              type="button"
              onClick={() => onAdjustFontSize(1)}
              disabled={fontSizeLevel >= 3}
              className="px-2 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-slate-600 cursor-pointer rounded transition-colors"
              title="Tăng cỡ chữ"
            >
              +A
            </button>
          </div>

          {/* Auto Next Switch */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={autoNextSentence}
              onChange={(e) => onToggleAutoNext(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-8 h-4 rounded-full transition-colors relative ${
                autoNextSentence
                  ? "bg-slate-900 dark:bg-white"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full transition-transform absolute top-0.5 left-0.5 ${
                  autoNextSentence
                    ? "translate-x-4 bg-white dark:bg-slate-900"
                    : "translate-x-0 bg-white dark:bg-slate-300"
                }`}
              />
            </div>
            <span>Tự động tiếp</span>
          </label>

          {/* Hide/Show Translation Switch */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={hideTranslation}
              onChange={(e) => onToggleHideTranslation(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-8 h-4 rounded-full transition-colors relative ${
                hideTranslation
                  ? "bg-slate-900 dark:bg-white"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full transition-transform absolute top-0.5 left-0.5 ${
                  hideTranslation
                    ? "translate-x-4 bg-white dark:bg-slate-900"
                    : "translate-x-0 bg-white dark:bg-slate-300"
                }`}
              />
            </div>
            <span className="flex items-center gap-1">
              {hideTranslation ? (
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <Eye className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              )}
              <span>Ẩn dịch</span>
            </span>
          </label>
        </div>
      </div>
    );
  }
);
