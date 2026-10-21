"use client";
import React from "react";
import {
  Link as LinkIcon,
  X,
  Loader2,
  Plus,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { YouTubeVideoItem } from "@/stores/videoStore";

export interface YouTubeImportDeckProps {
  youtubeInput: string;
  setYoutubeInput: (val: string) => void;
  importCategory: YouTubeVideoItem["category"];
  setImportCategory: (val: YouTubeVideoItem["category"]) => void;
  importLevel: YouTubeVideoItem["level"];
  setImportLevel: (val: YouTubeVideoItem["level"]) => void;
  isImporting: boolean;
  importError: string | null;
  setImportError: (err: string | null) => void;
  onImport: (e: React.FormEvent) => void;
  hasActiveVideo?: boolean;
  onOpenXpSubModal?: () => void;
}

export function YouTubeImportDeck({
  youtubeInput,
  setYoutubeInput,
  importCategory,
  setImportCategory,
  importLevel,
  setImportLevel,
  isImporting,
  importError,
  setImportError,
  onImport,
}: YouTubeImportDeckProps) {
  return (
    <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
            <LinkIcon className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
            Trích xuất phụ đề từ YouTube
          </h3>
        </div>
      </div>

      <form onSubmit={onImport} className="space-y-3">
        {/* External Label (UI/UX Rule 6) */}
        <div className="space-y-1.5">
          <label
            htmlFor="youtube-url-input"
            className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-display"
          >
            <span>Đường dẫn video YouTube cần học:</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                id="youtube-url-input"
                type="url"
                value={youtubeInput}
                onChange={(e) => {
                  setYoutubeInput(e.target.value);
                  setImportError(null);
                }}
                placeholder="Dán link YouTube (VD: https://www.youtube.com/watch?v=gN78u1P3j9Y)..."
                className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:border-[#0059bb] focus:ring-1 focus:ring-[#0059bb] focus:outline-hidden transition-all pr-8"
              />
              {youtubeInput && (
                <button
                  type="button"
                  onClick={() => setYoutubeInput("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isImporting || !youtubeInput.trim()}
              className="py-2.5 px-5 rounded-xl bg-[#0059bb] hover:bg-[#004899] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-[#0059bb]/20 flex items-center justify-center gap-2 cursor-pointer font-sans shrink-0 active:scale-95"
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang tải phụ đề...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Nhập Video YouTube</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Category & Level Selectors - Balanced 2-Column Dock (UI/UX Rule 14 & Rule 6) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs">
          {/* Cụm 1: Chủ đề (Phân loại) */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="import-category-select"
              className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0 font-display"
            >
              Chủ đề:
            </label>
            <div className="relative">
              <select
                id="import-category-select"
                value={importCategory}
                onChange={(e) => setImportCategory(e.target.value as any)}
                className="py-1.5 pl-3 pr-7 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-hidden hover:bg-slate-200/70 dark:hover:bg-slate-700/70 transition-colors shadow-2xs appearance-none"
              >
                <option value="Communication">Giao tiếp (Communication)</option>
                <option value="Business">Kinh doanh (Business)</option>
                <option value="TED Talks">TED Talks</option>
                <option value="Movies">Phim ảnh (Movies)</option>
                <option value="News">Tin tức (News)</option>
                <option value="IELTS/TOEIC">IELTS / TOEIC</option>
                <option value="General">Tổng hợp (General)</option>
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Cụm 2: Độ khó (Segmented Control 3 nút bấm trực diện chuẩn Rule 14) */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0 font-display">
              Độ khó:
            </span>
            <div className="p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 inline-flex items-center gap-0.5">
              {[
                { id: "Easy" as const, label: "Dễ", color: "text-emerald-700 dark:text-emerald-400" },
                { id: "Medium" as const, label: "Trung bình", color: "text-sky-700 dark:text-sky-400" },
                { id: "Hard" as const, label: "Khó", color: "text-amber-700 dark:text-amber-400" },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setImportLevel(lvl.id)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    importLevel === lvl.id
                      ? `bg-white dark:bg-slate-900 shadow-2xs ${lvl.color}`
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>

      {/* Skeleton Loading Card Preview (UI/UX Rule 1) */}
      {isImporting && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-blue-200 dark:border-blue-900/50 space-y-3 animate-pulse">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Đang kết nối YouTube Server & Trích xuất phụ đề song ngữ chuẩn mili-giây...
            </span>
            <span className="text-[10px] font-mono text-slate-400">Vui lòng chờ giây lát</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-lg sm:col-span-1" />
            <div className="space-y-2 sm:col-span-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-1/2" />
              <div className="h-2 bg-slate-100 dark:bg-slate-800/60 rounded w-1/4" />
            </div>
          </div>
        </div>
      )}

      {importError && (
        <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{importError}</span>
        </div>
      )}
    </div>
  );
}
