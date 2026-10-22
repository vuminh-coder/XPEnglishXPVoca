"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Link as LinkIcon,
  X,
  Loader2,
  Plus,
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Briefcase,
  Sparkles,
  Film,
  Newspaper,
  GraduationCap,
  Layers,
  Check,
} from "lucide-react";
import { YouTubeVideoItem } from "@/stores/videoStore";

interface CategoryOption {
  value: YouTubeVideoItem["category"];
  labelVn: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgLight: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    value: "Communication",
    labelVn: "Giao tiếp",
    labelEn: "Communication",
    icon: MessageSquare,
    color: "text-blue-600 dark:text-sky-400",
    bgLight: "bg-blue-50 dark:bg-blue-950/60",
  },
  {
    value: "Business",
    labelVn: "Kinh doanh",
    labelEn: "Business",
    icon: Briefcase,
    color: "text-amber-600 dark:text-amber-400",
    bgLight: "bg-amber-50 dark:bg-amber-950/60",
  },
  {
    value: "TED Talks",
    labelVn: "TED Talks",
    labelEn: "Tư duy & Thuyết trình",
    icon: Sparkles,
    color: "text-purple-600 dark:text-purple-400",
    bgLight: "bg-purple-50 dark:bg-purple-950/60",
  },
  {
    value: "Movies",
    labelVn: "Phim ảnh",
    labelEn: "Movies & Cinema",
    icon: Film,
    color: "text-rose-600 dark:text-rose-400",
    bgLight: "bg-rose-50 dark:bg-rose-950/60",
  },
  {
    value: "News",
    labelVn: "Tin tức",
    labelEn: "News & Thời sự",
    icon: Newspaper,
    color: "text-emerald-600 dark:text-emerald-400",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/60",
  },
  {
    value: "IELTS/TOEIC",
    labelVn: "IELTS / TOEIC",
    labelEn: "Academic & Exam Prep",
    icon: GraduationCap,
    color: "text-indigo-600 dark:text-indigo-400",
    bgLight: "bg-indigo-50 dark:bg-indigo-950/60",
  },
  {
    value: "General",
    labelVn: "Tổng hợp",
    labelEn: "Đời sống & Kiến thức",
    icon: Layers,
    color: "text-slate-600 dark:text-slate-400",
    bgLight: "bg-slate-100 dark:bg-slate-800",
  },
];

function removeVietnameseAccents(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

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
  hasActiveVideo,
}: YouTubeImportDeckProps) {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [highlightedCategoryIdx, setHighlightedCategoryIdx] = useState(0);
  const categoryComboboxRef = useRef<HTMLDivElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isImporting) {
      setIsMobileExpanded(true);
    }
  }, [isImporting]);

  useEffect(() => {
    const handleOpen = () => setIsMobileExpanded(true);
    window.addEventListener("open-youtube-import", handleOpen);
    return () => window.removeEventListener("open-youtube-import", handleOpen);
  }, []);

  const selectedOption = useMemo(() => {
    return (
      CATEGORY_OPTIONS.find((opt) => opt.value === importCategory) ||
      CATEGORY_OPTIONS[0]
    );
  }, [importCategory]);

  const filteredCategories = useMemo(() => {
    if (!isSearching || !categorySearch.trim()) return CATEGORY_OPTIONS;
    const q = removeVietnameseAccents(categorySearch.trim());
    return CATEGORY_OPTIONS.filter((opt) => {
      const vn = removeVietnameseAccents(opt.labelVn);
      const en = opt.labelEn.toLowerCase();
      const val = opt.value.toLowerCase();
      return vn.includes(q) || en.includes(q) || val.includes(q);
    });
  }, [isSearching, categorySearch]);

  const handleOpenCombobox = () => {
    setIsCategoryOpen(true);
    setIsSearching(false);
    setCategorySearch("");
    setTimeout(() => {
      categoryInputRef.current?.focus();
      categoryInputRef.current?.select();
    }, 10);
  };

  const handleCloseCombobox = () => {
    setIsCategoryOpen(false);
    setIsSearching(false);
    setCategorySearch("");
  };

  const handleSelectCategory = (val: YouTubeVideoItem["category"]) => {
    setImportCategory(val);
    handleCloseCombobox();
  };

  // Close combobox when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        categoryComboboxRef.current &&
        !categoryComboboxRef.current.contains(e.target as Node)
      ) {
        handleCloseCombobox();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isCategoryOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        handleOpenCombobox();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedCategoryIdx((prev) =>
        prev < filteredCategories.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedCategoryIdx((prev) =>
        prev > 0 ? prev - 1 : filteredCategories.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCategories[highlightedCategoryIdx]) {
        handleSelectCategory(filteredCategories[highlightedCategoryIdx].value);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCloseCombobox();
    }
  };

  return (
    <div className="space-y-3">
      {hasActiveVideo && !isMobileExpanded && (
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileExpanded(true)}
            className="w-full py-2.5 px-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-[#0059bb]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[#0059bb] dark:text-sky-400">
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Nhập video YouTube khác</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
              <span>Mở form</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

      <div
        className={`${
          hasActiveVideo && !isMobileExpanded ? "hidden md:block " : ""
        }p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
              <LinkIcon className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
              Trích xuất phụ đề từ YouTube
            </h3>
          </div>
          {hasActiveVideo && (
            <button
              type="button"
              onClick={() => setIsMobileExpanded(false)}
              className="md:hidden text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium py-1 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Thu gọn
            </button>
          )}
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

        {/* Category & Level Selectors - Balanced 2-Column Dock (UI/UX Rule 14, Rule 6 & Rule 2) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs">
          {/* Cụm 1: Chủ đề - Ô input gợi ý thông minh (Smart Suggestion Combobox - UI/UX Rule 2) */}
          <div ref={categoryComboboxRef} className="flex items-center gap-2 relative">
            <label
              htmlFor="import-category-input"
              className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0 font-display cursor-pointer"
              onClick={handleOpenCombobox}
            >
              Chủ đề:
            </label>
            <div className="relative w-full sm:w-72">
              <div
                className={`flex items-center gap-2 py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 border transition-all cursor-pointer ${
                  isCategoryOpen
                    ? "border-[#0059bb] ring-2 ring-[#0059bb]/20 bg-white dark:bg-slate-900 shadow-xs"
                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 shadow-2xs"
                }`}
                onClick={() => {
                  if (!isCategoryOpen) {
                    handleOpenCombobox();
                  }
                }}
              >
                {/* Active Category Icon */}
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${selectedOption.bgLight} ${selectedOption.color}`}
                >
                  <selectedOption.icon className="w-3.5 h-3.5" />
                </div>

                {/* Input with live search or selected title */}
                <input
                  ref={categoryInputRef}
                  id="import-category-input"
                  type="text"
                  value={isSearching ? categorySearch : `${selectedOption.labelVn} (${selectedOption.value})`}
                  onChange={(e) => {
                    setIsSearching(true);
                    setCategorySearch(e.target.value);
                    if (!isCategoryOpen) setIsCategoryOpen(true);
                    setHighlightedCategoryIdx(0);
                  }}
                  onFocus={handleOpenCombobox}
                  onKeyDown={handleCategoryKeyDown}
                  placeholder="Tìm hoặc chọn chủ đề..."
                  className="w-full bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-hidden cursor-text placeholder:text-slate-400 placeholder:font-normal"
                />

                {/* Clear or Toggle Chevron */}
                {isSearching && categorySearch ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCategorySearch("");
                      setIsSearching(false);
                      categoryInputRef.current?.focus();
                    }}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded cursor-pointer shrink-0"
                    title="Xóa tìm kiếm"
                  >
                    <X className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isCategoryOpen) {
                        handleCloseCombobox();
                      } else {
                        handleOpenCombobox();
                      }
                    }}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded cursor-pointer shrink-0"
                  >
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isCategoryOpen ? "rotate-180 text-[#0059bb]" : ""
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* INVISIBLE FIXED BACKDROP TO PREVENT ACCIDENTAL VIDEO CLICKS */}
              {isCategoryOpen && (
                <div
                  className="fixed inset-0 z-30"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseCombobox();
                  }}
                />
              )}

              {/* FLOATING SMART SUGGESTION DROPDOWN */}
              {isCategoryOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/90 rounded-xl shadow-2xl shadow-slate-900/15 dark:shadow-black/70 p-1.5 z-40 max-h-[360px] overflow-y-auto space-y-0.5 animate-in fade-in-0 zoom-in-95 duration-150">
                  <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 mb-1">
                    <span>Gợi ý chủ đề</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
                      {filteredCategories.length} mục
                    </span>
                  </div>

                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((opt, idx) => {
                      const isSelected = opt.value === importCategory;
                      const isHighlighted = idx === highlightedCategoryIdx;
                      const IconComp = opt.icon;

                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onMouseEnter={() => setHighlightedCategoryIdx(idx)}
                          onClick={() => handleSelectCategory(opt.value)}
                          className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer ${
                            isHighlighted
                              ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                          } ${isSelected ? "font-bold text-[#0059bb] dark:text-sky-400 bg-blue-50/50 dark:bg-blue-950/30" : ""}`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${opt.bgLight} ${opt.color}`}
                            >
                              <IconComp className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="truncate font-bold leading-tight">
                                {opt.labelVn}
                              </span>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate leading-tight">
                                {opt.labelEn}
                              </span>
                            </div>
                          </div>

                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0 stroke-[2.5]" />
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <div className="py-4 text-center text-xs text-slate-400">
                      Không tìm thấy chủ đề phù hợp
                    </div>
                  )}
                </div>
              )}
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
    </div>
  );
}
