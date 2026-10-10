"use client";

import React, { useRef, useState, useEffect } from "react";
import { Search, RefreshCw, X, ChevronLeft, ChevronRight } from "lucide-react";

export interface ExamFilterToolbarProps {
  filterType: string;
  setFilterType: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalCount?: number;
  filteredCount?: number;
  onRefresh?: () => void;
}

const CATEGORY_TABS = [
  { id: "ALL", label: "Tất cả bộ đề" },
  { id: "TOEIC_LR", label: "TOEIC Nghe & Đọc" },
  { id: "IELTS_FULL", label: "IELTS Academic" },
  { id: "TOEIC_SPEAKING_WRITING", label: "TOEIC Nói & Viết" },
  { id: "TOEIC_FULL", label: "TOEIC 4 Kỹ Năng" },
];

export function ExamFilterToolbar({
  filterType,
  setFilterType,
  searchQuery,
  setSearchQuery,
  totalCount,
  filteredCount,
  onRefresh,
}: ExamFilterToolbarProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Monitor scrollability for smooth fade masks
  const checkScroll = () => {
    const el = tabsScrollRef.current;
    if (!el) return;
    const hasLeft = el.scrollLeft > 6;
    const hasRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 6;
    setCanScrollLeft(hasLeft);
    setCanScrollRight(hasRight);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = tabsScrollRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -220 : 220;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(checkScroll, 250);
  };

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    if (onRefresh) {
      onRefresh();
    }
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-3 pt-1">
      {/* ────────────────────────────────────────────────────────────────────────── */}
      {/* 1. TẦNG 1: DẢI TABS DANH MỤC BỘ ĐỀ TOÀN DẢI (KHÔNG BỊ CHÈN ÉP, KHÔNG CẮT CHỮ) */}
      {/* ────────────────────────────────────────────────────────────────────────── */}
      <div className="relative group/tabs">
        {/* Left Scroll Indicator / Gradient Fade Mask */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-50 dark:from-slate-950 via-slate-50/90 dark:via-slate-950/90 to-transparent z-10 flex items-center justify-start pointer-events-none">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="pointer-events-auto w-6.5 h-6.5 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer active:scale-95 transition-transform"
              aria-label="Cuộn sang trái"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Right Scroll Indicator / Gradient Fade Mask */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-50 dark:from-slate-950 via-slate-50/90 dark:via-slate-950/90 to-transparent z-10 flex items-center justify-end pointer-events-none">
            <button
              type="button"
              onClick={() => handleScroll("right")}
              className="pointer-events-auto w-6.5 h-6.5 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer active:scale-95 transition-transform"
              aria-label="Cuộn sang phải"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tabs Scroll Container */}
        <div
          ref={tabsScrollRef}
          onScroll={checkScroll}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-0.5 px-0.5 select-none"
        >
          {CATEGORY_TABS.map((tab) => {
            const isActive = filterType === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterType(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap select-none flex items-center justify-center shrink-0 ${
                  isActive
                    ? "bg-[#0059bb] text-white shadow-xs"
                    : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────── */}
      {/* 2. TẦNG 2: THANH TÌM KIẾM & BỘ CÔNG CỤ (SEARCH & ACTIONS DOCK) */}
      {/* ────────────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200/80 dark:border-slate-800">
        {/* Quick Search Input (Chuẩn Agency h-9.5) */}
        <div className="relative flex-1 sm:max-w-md lg:max-w-lg">
          <Search
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            strokeWidth={2}
          />
          <input
            type="text"
            placeholder="Tìm theo tên đề thi, mã đề (ví dụ: TOEIC 2026, IELTS 4K, ETS)..."
            aria-label="Tìm kiếm tên đề thi"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9.5 pl-10 pr-9 text-xs sm:text-sm font-medium rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/15 shadow-2xs transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Xóa từ khóa tìm kiếm"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Metric Counter & Refresh Action */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          {/* Result Metric Counter */}
          <div className="text-xs sm:text-[13.5px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5 px-1 whitespace-nowrap">
            {searchQuery.trim() !== "" ? (
              <span>
                Khớp{" "}
                <span className="font-bold font-mono text-sm sm:text-[15px] text-[#0059bb] dark:text-sky-400 tabular-nums">
                  {filteredCount ?? 0}
                </span>
                /{totalCount ?? 0} đề
              </span>
            ) : (
              <span>
                <span className="font-bold font-mono text-sm sm:text-[15px] text-slate-900 dark:text-white tabular-nums">
                  {filteredCount ?? 0}
                </span>{" "}
                đề thi khả dụng
              </span>
            )}
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={handleRefreshClick}
            disabled={isRefreshing}
            className="h-9.5 px-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs shrink-0 active:scale-95 disabled:opacity-60"
            title="Làm mới danh sách bộ đề"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
            <span className="hidden xs:inline">Làm mới</span>
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────── */}
      {/* 3. DÒNG THÔNG BÁO TÌM KIẾM (KHI CÓ TỪ KHÓA) */}
      {/* ────────────────────────────────────────────────────────────────────────── */}
      {searchQuery.trim() !== "" && (
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 px-0.5">
          <span>
            Kết quả tìm kiếm cho: &ldquo;<span className="text-slate-800 dark:text-slate-200 font-bold">{searchQuery}</span>&rdquo;
          </span>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-[#0059bb] hover:underline cursor-pointer"
          >
            Xóa tìm kiếm
          </button>
        </div>
      )}
    </div>
  );
}
