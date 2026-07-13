'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useVocabularyStore } from '@/lib/store/vocabularyStore';
import { useAuthStore } from '@/lib/store/authStore';
import { useNotificationStore } from '@/lib/store/notificationStore';
import {
  Calendar as CalendarIcon,
  Zap,
  PartyPopper,
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Volume2,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Award,
  Activity,
  Sparkles,
  Smile,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';

const BOOKMARK_KEY = "xp_bookmarked_words";

function getBookmarkedWords(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveBookmarkedWords(words: string[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(words));
  }
}

export default function ReviewPage() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPos, setSelectedPos] = useState("all");
  const [selectedProficiency, setSelectedProficiency] = useState("all");
  const [selectedBookmark, setSelectedBookmark] = useState("all");
  const [expandedWordId, setExpandedWordId] = useState<string | null>(null);

  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const { learned, loadLearnedWords } = useVocabularyStore();
  const { user } = useAuthStore();
  const { addToast } = useNotificationStore();

  // Load learned words from the API/cache on page load
  useEffect(() => {
    if (user?.id) {
      loadLearnedWords(user.id);
    }
  }, [user?.id, loadLearnedWords]);

  useEffect(() => {
    setBookmarkedIds(new Set(getBookmarkedWords()));
  }, []);

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const formatLocalDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const monthYearTitle = currentMonth.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });

  // Generate calendar grid dates
  const calendarCells = useMemo(() => {
    const cells: Date[] = [];
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    
    // Convert getDay() [0:Sun, 1:Mon... 6:Sat] to Monday-start index [0:Mon, 1:Tue... 6:Sun]
    let startDayIdx = firstDayOfMonth.getDay() - 1;
    if (startDayIdx === -1) startDayIdx = 6;

    const totalDaysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

    // Previous month tail days
    const prevMonthYear = currentMonth.getMonth() === 0 ? currentMonth.getFullYear() - 1 : currentMonth.getFullYear();
    const prevMonth = currentMonth.getMonth() === 0 ? 11 : currentMonth.getMonth() - 1;
    const totalDaysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

    for (let i = startDayIdx - 1; i >= 0; i--) {
      cells.push(new Date(prevMonthYear, prevMonth, totalDaysInPrevMonth - i));
    }

    // Current month days
    for (let i = 1; i <= totalDaysInMonth; i++) {
      cells.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }

    // Next month head days (fill grid to multiple of 7)
    const remainingCells = 42 - cells.length;
    const nextMonthYear = currentMonth.getMonth() === 11 ? currentMonth.getFullYear() + 1 : currentMonth.getFullYear();
    const nextMonth = currentMonth.getMonth() === 11 ? 0 : currentMonth.getMonth() + 1;
    for (let i = 1; i <= remainingCells; i++) {
      cells.push(new Date(nextMonthYear, nextMonth, i));
    }

    return cells;
  }, [currentMonth]);

  // Find due words count for a specific date cell
  const getDueCountForDate = (date: Date) => {
    const dateStr = formatLocalDate(date); // YYYY-MM-DD
    return learned.filter(l => {
      if (!l.nextReview) return false;
      const nextDateStr = formatLocalDate(new Date(l.nextReview));
      return nextDateStr === dateStr;
    }).length;
  };

  // Check if a date has completed reviews (no due items and some practiced words today)
  const isDateCompleted = (date: Date) => {
    const dateStr = formatLocalDate(date);
    const hasPracticed = learned.some(
      (l) => l.lastPracticed && formatLocalDate(new Date(l.lastPracticed)) === dateStr
    );
    const dueCount = getDueCountForDate(date);
    return hasPracticed && dueCount === 0;
  };

  // Get full vocab list scheduled on the selectedDate
  const rawSelectedDateVocabs = useMemo(() => {
    const dateStr = formatLocalDate(selectedDate);
    const dueItemsForSelected = learned.filter(l => {
      if (!l.nextReview) return false;
      const nextDateStr = formatLocalDate(new Date(l.nextReview));
      return nextDateStr === dateStr;
    });

    return dueItemsForSelected.map(v => ({
      id: v.vocabId,
      word: v.word || "",
      phonetic: v.phonetic || "",
      definition: v.definition || "",
      definitionVn: v.definitionVn || "",
      pos: v.pos || "",
      difficulty: v.difficulty || 1,
      frequency: v.frequency || 1,
      themeId: v.themeId || "",
      examples: v.examples || [],
      synonyms: v.synonyms || [],
      antonyms: v.antonyms || [],
      proficiency: v.proficiency ?? 0,
      nextReview: v.nextReview
    }));
  }, [selectedDate, learned]);

  // Apply search and filter criteria to vocabulary list
  const selectedDateVocabs = useMemo(() => {
    return rawSelectedDateVocabs.filter(v => {
      const matchesSearch = v.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            v.definitionVn.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPos = selectedPos === "all" || v.pos.toLowerCase() === selectedPos.toLowerCase();
      const matchesProficiency = selectedProficiency === "all" || v.proficiency === parseInt(selectedProficiency, 10);
      const matchesBookmark = selectedBookmark === "all" || bookmarkedIds.has(v.id);
      return matchesSearch && matchesPos && matchesProficiency && matchesBookmark;
    });
  }, [rawSelectedDateVocabs, searchTerm, selectedPos, selectedProficiency, selectedBookmark, bookmarkedIds]);

  // Spaced Repetition Analytics calculations
  const retentionRate = useMemo(() => {
    if (learned.length === 0) return 100;
    const goodWords = learned.filter(l => l.proficiency >= 3).length;
    return Math.round((goodWords / learned.length) * 100);
  }, [learned]);

  const masteredCount = useMemo(() => {
    return learned.filter(l => l.proficiency === 5).length;
  }, [learned]);

  const proficiencyDistribution = useMemo(() => {
    const dist = [0, 0, 0, 0, 0];
    learned.forEach(l => {
      const p = Math.max(1, Math.min(5, l.proficiency || 0));
      dist[p - 1]++;
    });
    return dist;
  }, [learned]);

  const forecastTimeline = useMemo(() => {
    const timeline = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const forecastDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      const dateStr = formatLocalDate(forecastDate);
      const count = learned.filter(l => {
        if (!l.nextReview) return false;
        const nextDateStr = formatLocalDate(new Date(l.nextReview));
        return nextDateStr === dateStr;
      }).length;
      timeline.push({
        dayName: i === 0 ? "Hôm nay" : forecastDate.toLocaleDateString("vi-VN", { weekday: "short" }),
        dateNum: forecastDate.getDate(),
        count,
        dateStr
      });
    }
    return timeline;
  }, [learned]);

  const speakWord = (wordText: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(wordText);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleToggleBookmark = (wordId: string) => {
    const bookmarked = getBookmarkedWords();
    const idx = bookmarked.indexOf(wordId);
    let updated;
    if (idx >= 0) {
      bookmarked.splice(idx, 1);
      updated = false;
    } else {
      bookmarked.push(wordId);
      updated = true;
    }
    saveBookmarkedWords(bookmarked);
    setBookmarkedIds(new Set(bookmarked));
    addToast({
      type: updated ? "success" : "info",
      title: updated ? "Đã ghi nhớ" : "Đã bỏ ghi nhớ",
      message: updated ? "Đã thêm từ vựng vào danh sách ghi nhớ ôn tập." : "Đã bỏ từ vựng khỏi danh sách ghi nhớ.",
    });
  };

  // Selected date formatted text
  const selectedDateFormatted = selectedDate.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const selectedDateQueryStr = formatLocalDate(selectedDate);

  const toggleExpandWord = (wordId: string) => {
    setExpandedWordId(prev => prev === wordId ? null : wordId);
  };

  // Distinct POS values in the selected list for filtering dropdown
  const uniquePosList = useMemo(() => {
    const set = new Set<string>();
    rawSelectedDateVocabs.forEach(v => {
      if (v.pos) set.add(v.pos);
    });
    return Array.from(set);
  }, [rawSelectedDateVocabs]);

  return (
    <div className="space-y-8 pb-24 md:pb-8 font-sans antialiased" suppressHydrationWarning>
      
      {/* ─── Page Header ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 85, damping: 15 }}
        className="page-header"
      >
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
          Lịch ôn tập định kỳ
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-300 mt-1 font-semibold max-w-2xl leading-relaxed">
          Phân tích tần suất và lên lịch trình ôn tập từ vựng khoa học dựa trên thuật toán Spaced Repetition (Lặp lại ngắt quãng) tối ưu trí nhớ.
        </p>
      </motion.div>

      {/* ─── Bento Grid Layout ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Interactive Calendar (col-span-7) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="lg:col-span-7 flex flex-col"
        >
          <div className="bezel shadow-sm border border-slate-100/60 dark:border-neutral-850 h-full flex flex-col">
            <div className="bezel-inner p-6 bg-white dark:bg-neutral-900 rounded-[calc(2rem-6px)] h-full flex flex-col justify-between">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-neutral-850 mb-5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 text-cyan-500 flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight capitalize font-display">
                      {monthYearTitle}
                    </h3>
                    <span className="text-[9.5px] text-cyan-500 font-extrabold uppercase tracking-wider block mt-0.5">
                      Hệ thống phản xạ tự động
                    </span>
                  </div>
                </div>
                
                {/* Navigation Controls */}
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg cursor-pointer transition-colors"
                    onClick={handlePrevMonth}
                    aria-label="Tháng trước"
                  >
                    <ChevronLeft className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg cursor-pointer transition-colors"
                    onClick={handleNextMonth}
                    aria-label="Tháng sau"
                  >
                    <ChevronRight className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400" />
                  </Button>
                </div>
              </div>

              {/* Days of week Header */}
              <div className="grid grid-cols-7 gap-2.5 text-center shrink-0 mb-2">
                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                  <div key={d} className="text-[10px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-widest py-1 font-display">
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar Grid cells */}
              <div className="grid grid-cols-7 grid-rows-6 gap-2.5 text-center flex-1">
                <AnimatePresence mode="wait">
                  {calendarCells.map((cellDate, idx) => {
                    const isCurrentMonth = cellDate.getMonth() === currentMonth.getMonth();
                    const isToday = cellDate.toDateString() === new Date().toDateString();
                    const isSelected = cellDate.toDateString() === selectedDate.toDateString();
                    const dueCount = getDueCountForDate(cellDate);
                    const isCompleted = isDateCompleted(cellDate);

                    let dayStyle = "aspect-square lg:aspect-auto lg:h-full rounded-2xl flex flex-col items-center justify-center text-xs font-black relative select-none cursor-pointer transition-all duration-200 border ";
                    
                    if (isToday) {
                      dayStyle += "bg-gradient-to-tr from-cyan-400 to-indigo-500 text-white border-transparent shadow-sm ring-2 ring-offset-2 ring-cyan-400 dark:ring-offset-neutral-900 scale-102";
                    } else if (isSelected) {
                      dayStyle += "border-cyan-500 bg-cyan-50/40 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400 scale-[1.01]";
                    } else if (isCompleted) {
                      dayStyle += "border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10";
                    } else if (isCurrentMonth) {
                      dayStyle += "border-slate-100/40 dark:border-neutral-850/30 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-neutral-850/50";
                    } else {
                      dayStyle += "border-transparent text-slate-300 dark:text-slate-500 opacity-40 hover:bg-slate-50/50 dark:hover:bg-neutral-900/30";
                    }

                    return (
                      <motion.div
                        key={`${cellDate.toISOString()}-${idx}`}
                        onClick={() => setSelectedDate(cellDate)}
                        className={dayStyle}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-sans font-black">{cellDate.getDate()}</span>
                        
                        {/* Status circles indicators */}
                        {dueCount > 0 && !isToday && (
                          <span className="absolute bottom-1 w-3.5 h-3.5 rounded-full bg-cyan-500 text-white flex items-center justify-center text-[8px] font-black scale-90">
                            {dueCount}
                          </span>
                        )}
                        {isToday && dueCount > 0 && (
                          <span className="absolute bottom-1 w-3.5 h-3.5 rounded-full bg-amber-300 text-slate-900 flex items-center justify-center text-[8px] font-black scale-90">
                            {dueCount}
                          </span>
                        )}
                        {isCompleted && (
                          <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-emerald-500" />
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Spaced Repetition Analytics (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          
          {/* Scientific analytics summary box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.05 }}
            className="bezel border border-slate-100/60 dark:border-neutral-850 flex-1 flex flex-col"
          >
            <div className="bezel-inner p-6 bg-white dark:bg-neutral-900 rounded-[calc(2rem-6px)] space-y-5 h-full flex flex-col justify-between">
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider font-display">
                  Thống kê ghi nhớ
                </h4>
              </div>

              {/* Core Analytics Figures */}
              <div className="grid grid-cols-2 gap-4 shrink-0">
                <div className="p-3 bg-slate-50/50 dark:bg-neutral-950/20 rounded-xl border border-slate-100/30 dark:border-neutral-850/20">
                  <span className="text-[9px] uppercase font-black tracking-wider text-slate-400">Tỷ lệ nhớ từ</span>
                  <div className="text-xl font-black text-cyan-600 dark:text-cyan-400 mt-0.5">{retentionRate}%</div>
                </div>
                <div className="p-3 bg-slate-50/50 dark:bg-neutral-950/20 rounded-xl border border-slate-100/30 dark:border-neutral-850/20">
                  <span className="text-[9px] uppercase font-black tracking-wider text-slate-400">Đã làm chủ</span>
                  <div className="text-xl font-black text-indigo-650 dark:text-indigo-400 mt-0.5">{masteredCount} từ</div>
                </div>
              </div>

              {/* Level Distributions */}
              <div className="space-y-3 pt-1 flex-1 flex flex-col justify-end">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Phân bố trình độ ôn tập</span>
                
                {[
                  { level: 5, label: "Làm chủ", color: "bg-emerald-500" },
                  { level: 4, label: "Thành thạo", color: "bg-cyan-500" },
                  { level: 3, label: "Nhớ tốt", color: "bg-indigo-500" },
                  { level: 2, label: "Nhận biết", color: "bg-amber-500" },
                  { level: 1, label: "Bắt đầu", color: "bg-rose-500" }
                ].map((item) => {
                  const count = proficiencyDistribution[item.level - 1];
                  const total = Math.max(1, learned.length);
                  const pct = Math.round((count / total) * 100);
                  return (
                    <div key={item.level} className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-black text-slate-550 dark:text-slate-300">
                        <span className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                          Cấp độ {item.level} · {item.label}
                        </span>
                        <span className="font-mono tabular-nums">{count} từ ({pct}%)</span>
                      </div>
                      <div className="h-1 bg-slate-100 dark:bg-neutral-850 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${item.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </motion.div>

          {/* 7-day workload timeline forecast */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.1 }}
            className="bezel border border-slate-100/60 dark:border-neutral-850 shrink-0"
          >
            <div className="bezel-inner p-6 bg-white dark:bg-neutral-900 rounded-[calc(2rem-6px)] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/30 text-cyan-500 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider font-display">
                    Dự báo ôn tập 7 ngày
                  </h4>
                </div>
                <span className="text-[9px] text-slate-400 dark:text-slate-300 font-extrabold uppercase">Workload Timeline</span>
              </div>

              {/* Forecast Grid horizontal row */}
              <div className="grid grid-cols-7 gap-1 pt-2">
                {forecastTimeline.map((item, idx) => {
                  const maxCount = Math.max(...forecastTimeline.map(t => t.count), 1);
                  const barHeightPct = Math.max(10, Math.min(100, Math.round((item.count / maxCount) * 100)));
                  const isCellSelected = item.dateStr === selectedDateQueryStr;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedDate(new Date(item.dateStr))}
                      className={`flex flex-col items-center justify-end h-28 rounded-xl p-1 pb-2 cursor-pointer transition-all border ${
                        isCellSelected
                          ? "bg-cyan-500/10 border-cyan-400/40 text-cyan-600 dark:text-cyan-400"
                          : "bg-slate-50/50 hover:bg-slate-100/60 border-slate-100 dark:bg-neutral-950/20 dark:hover:bg-neutral-850/50 dark:border-neutral-850/50 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {/* Bar indicator */}
                      <div className="w-1.5 bg-slate-150 dark:bg-neutral-800 rounded-full h-12 flex flex-col justify-end overflow-hidden mb-2">
                        <motion.div
                          className={`w-full rounded-full ${item.count > 0 ? "bg-gradient-to-t from-cyan-500 to-indigo-500" : "bg-transparent"}`}
                          initial={{ height: 0 }}
                          animate={{ height: `${barHeightPct}%` }}
                          transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        />
                      </div>
                      <span className="text-[10px] font-black font-sans leading-none">{item.count}</span>
                      <span className="text-[8px] font-bold opacity-60 uppercase mt-1 text-center scale-90">{item.dayName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ─── Selected Date Word Cards Section (col-span-12) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.15 }}
        className="bezel border border-slate-100/60 dark:border-neutral-850"
      >
        <div className="bezel-inner p-6 bg-white dark:bg-neutral-900 rounded-[calc(2rem-6px)]">
          
          {/* Header Panel inside card section */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center pb-4 border-b border-slate-100 dark:border-neutral-850 mb-6">
            <div>
              <h3 className="text-[11px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-widest font-display">
                Danh sách ôn tập: {selectedDateFormatted}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-450 font-bold mt-0.5">
                Có {rawSelectedDateVocabs.length} từ vựng đã lên lịch trong ngày này.
              </p>
            </div>
            
            {/* Quick CTAs */}
            <div className="flex items-center gap-2">
              {rawSelectedDateVocabs.length > 0 ? (
                <Link 
                  href={`/study/practice?mode=review&date=${selectedDateQueryStr}`} 
                  className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-xl text-xs font-black py-2.5 px-5 shadow-sm hover:shadow-md cursor-pointer transition-shadow font-sans"
                >
                  <Zap className="w-3.5 h-3.5" strokeWidth={2.2} /> Ôn tập ngay (+15 XP/từ)
                </Link>
              ) : (
                /* Advanced review fallback options if selected date is clear */
                <div className="flex items-center gap-2">
                  <Link 
                    href="/study/practice?mode=early-review" 
                    className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-black py-2.5 px-4 cursor-pointer transition-all border border-indigo-200/50 dark:border-indigo-900/30 font-sans"
                  >
                    <Compass className="w-3.5 h-3.5" /> Ôn tập trước hạn
                  </Link>
                  <Link 
                    href="/study/practice?mode=focus-review" 
                    className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-955/20 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-black py-2.5 px-4 cursor-pointer transition-all border border-rose-200/50 dark:border-rose-900/30 font-sans"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Ôn tập từ khó
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Filtering bar */}
          {rawSelectedDateVocabs.length > 0 && (
            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 mb-6 bg-slate-50/50 dark:bg-neutral-950/20 p-3 rounded-2xl border border-slate-100/60 dark:border-neutral-850/50">
              
              {/* Search text input */}
              <div className="col-span-2 sm:flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="Tìm kiếm từ vựng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:border-cyan-500 bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
              </div>

              {/* POS Selection */}
              <div className="flex items-center gap-1 w-full sm:w-auto">
                <Filter className="h-3.5 w-3.5 text-slate-400 mr-1 shrink-0" />
                <select
                  value={selectedPos}
                  onChange={(e) => setSelectedPos(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white cursor-pointer font-sans"
                >
                  <option value="all">Tất cả từ loại</option>
                  {uniquePosList.map(pos => (
                    <option key={pos} value={pos}>{pos.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              {/* Level / Proficiency filter */}
              <div className="w-full sm:w-auto">
                <select
                  value={selectedProficiency}
                  onChange={(e) => setSelectedProficiency(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white cursor-pointer font-sans"
                >
                  <option value="all">Mọi cấp độ</option>
                  <option value="1">Cấp độ 1 (Bắt đầu)</option>
                  <option value="2">Cấp độ 2 (Nhận biết)</option>
                  <option value="3">Cấp độ 3 (Nhớ tốt)</option>
                  <option value="4">Cấp độ 4 (Thành thạo)</option>
                  <option value="5">Cấp độ 5 (Làm chủ)</option>
                </select>
              </div>

              {/* Bookmark filter */}
              <div className="col-span-2 sm:col-span-1 w-full sm:w-auto">
                <select
                  value={selectedBookmark}
                  onChange={(e) => setSelectedBookmark(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white cursor-pointer font-sans"
                >
                  <option value="all">Tất cả từ</option>
                  <option value="bookmark">Chỉ từ ghi nhớ ⭐</option>
                </select>
              </div>

            </div>
          )}

          {/* Cards container grid */}
          {selectedDateVocabs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <PartyPopper className="w-12 h-12 text-slate-350 dark:text-neutral-600 mb-4" strokeWidth={1.1} />
              <div className="text-sm font-black text-slate-800 dark:text-white mb-1 font-display">
                {rawSelectedDateVocabs.length === 0 ? "Hôm nay không có lịch ôn tập!" : "Không tìm thấy từ vựng phù hợp!"}
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs mb-6 leading-relaxed font-semibold">
                {rawSelectedDateVocabs.length === 0 
                  ? "Lịch ôn tập của bạn trống vào ngày này. Hãy tiếp tục khám phá và tích lũy thêm các từ mới!"
                  : "Không có từ vựng nào khớp với điều kiện tìm kiếm hoặc bộ lọc hiện tại của bạn."}
              </p>
              
              {rawSelectedDateVocabs.length === 0 && (
                <Link href="/vocabulary" className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-indigo-650 text-white rounded-xl text-xs font-black px-6 py-2.5 shadow-md hover:shadow-lg cursor-pointer transition-shadow font-sans">
                  Học từ vựng mới <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.2} />
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedDateVocabs.map(v => {
                const isBookmarked = bookmarkedIds.has(v.id);
                const isExpanded = expandedWordId === v.id;

                return (
                  <motion.div
                    key={v.id}
                    layout
                    className="bezel border border-slate-100/80 dark:border-neutral-850/60 overflow-hidden"
                  >
                    <div className="bezel-inner p-4.5 bg-white dark:bg-neutral-900 h-full flex flex-col justify-between">
                      <div>
                        {/* Word card top row header */}
                        <div className="flex justify-between items-start gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-lg text-cyan-600 dark:text-cyan-400 font-display select-all">
                              {v.word}
                            </span>
                            <span className="text-[9px] font-black px-1.5 py-0.5 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 rounded-md uppercase">
                              {v.pos}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {/* Speak word audio utility */}
                            <button
                              type="button"
                              onClick={() => speakWord(v.word)}
                              className="w-6.5 h-6.5 rounded-full bg-slate-50 dark:bg-neutral-850 text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-inner"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            {/* Bookmark Toggle */}
                            <button
                              type="button"
                              onClick={() => handleToggleBookmark(v.id)}
                              className={`w-6.5 h-6.5 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-inner ${
                                isBookmarked 
                                  ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400" 
                                  : "bg-slate-50 dark:bg-neutral-850 text-slate-400 hover:text-indigo-500"
                              }`}
                              title={isBookmarked ? "Bỏ lưu ghi nhớ" : "Lưu ghi nhớ"}
                            >
                              {isBookmarked ? (
                                <BookmarkCheck className="w-3.5 h-3.5" />
                              ) : (
                                <Bookmark className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Defs */}
                        <div className="text-xs text-slate-800 dark:text-white font-extrabold mb-1 select-all">
                          {v.definitionVn}
                        </div>
                        <div className="text-[12px] text-slate-500 dark:text-slate-450 leading-relaxed line-clamp-2 font-medium">
                          {v.definition}
                        </div>

                        {/* Expandable Synonyms/Antonyms/Examples */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-3.5 border-t border-slate-100 dark:border-neutral-850/50 space-y-2.5 text-[11.5px] leading-relaxed font-sans overflow-hidden"
                            >
                              {v.phonetic && (
                                <div>
                                  <span className="font-extrabold text-slate-400 dark:text-slate-400 block">Phiên âm:</span>
                                  <span className="font-mono text-slate-600 dark:text-slate-350">{v.phonetic}</span>
                                </div>
                              )}
                              {v.examples && v.examples.length > 0 && (
                                <div>
                                  <span className="font-extrabold text-slate-400 dark:text-slate-400 block">Ví dụ:</span>
                                  <p className="italic text-slate-650 dark:text-slate-300 font-medium">&ldquo;{v.examples[0]}&rdquo;</p>
                                </div>
                              )}
                              {v.synonyms && v.synonyms.length > 0 && (
                                <div>
                                  <span className="font-extrabold text-slate-400 dark:text-slate-400 block">Từ đồng nghĩa:</span>
                                  <span className="text-cyan-650 dark:text-cyan-400 font-bold">{v.synonyms.join(", ")}</span>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Card footer: expandable toggle & proficiency tracker */}
                      <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-neutral-850/50 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => toggleExpandWord(v.id)}
                          className="text-[10px] font-black text-slate-400 hover:text-cyan-600 dark:text-slate-500 dark:hover:text-cyan-400 flex items-center gap-0.5 cursor-pointer transition-colors"
                        >
                          {isExpanded ? (
                            <>Thu gọn <ChevronUp className="w-3.5 h-3.5" /></>
                          ) : (
                            <>Xem ví dụ &amp; đồng nghĩa <ChevronDown className="w-3.5 h-3.5" /></>
                          )}
                        </button>

                        {/* Proficiency Level visual indicators */}
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] font-bold text-slate-400 mr-1 scale-90">Thuần thục:</span>
                          <div className="flex gap-0.5">
                            {Array(5).fill(0).map((_, i) => (
                              <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  i < v.proficiency
                                    ? "bg-cyan-500"
                                    : "bg-slate-200 dark:bg-neutral-800"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </motion.div>

    </div>
  );
}
