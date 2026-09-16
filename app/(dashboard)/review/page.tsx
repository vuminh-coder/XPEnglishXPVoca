'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Zap,
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
  Compass,
  CheckCircle2,
  Check,
  Trophy,
  Target,
  Flame,
  GraduationCap,
  BookOpen,
  RotateCcw,
  X,
  Layers,
  Lightbulb,
  Brain,
} from 'lucide-react';

import { useVocabularyStore } from '@/stores/vocabularyStore';
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { speakLessonText } from '@/shared/utils/ttsEngine';
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from '@/shared/components/layout/AppTopHeader';
import { PageEntranceWrapper, MotionItem } from '@/shared/components/feedback/PageEntranceAnimation';
import { ReviewSkeleton } from '@/features/review';

const BOOKMARK_KEY = 'xp_bookmarked_words';

function getBookmarkedWords(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveBookmarkedWords(words: string[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(words));
  }
}

const VIETNAMESE_LONG_WEEKDAYS = [
  'Chủ Nhật',
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
];

export default function ReviewPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPos, setSelectedPos] = useState('all');
  const [selectedProficiency, setSelectedProficiency] = useState('all');
  const [selectedBookmark, setSelectedBookmark] = useState('all');
  const [expandedWordId, setExpandedWordId] = useState<string | null>(null);

  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const { learned, loadLearnedWords } = useVocabularyStore();
  const { user } = useAuthStore();
  const { addToast } = useNotificationStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load learned words from API/cache on page load
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

  const handleJumpToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  const formatLocalDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const monthYearTitle = `Tháng ${currentMonth.getMonth() + 1}, ${currentMonth.getFullYear()}`;

  // Generate calendar grid dates
  const calendarCells = useMemo(() => {
    const cells: Date[] = [];
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);

    // Convert getDay() [0:Sun, 1:Mon... 6:Sat] to Monday-start index [0:Mon, 1:Tue... 6:Sun]
    let startDayIdx = firstDayOfMonth.getDay() - 1;
    if (startDayIdx === -1) startDayIdx = 6;

    const totalDaysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    // Previous month tail days
    const prevMonthYear =
      currentMonth.getMonth() === 0 ? currentMonth.getFullYear() - 1 : currentMonth.getFullYear();
    const prevMonth = currentMonth.getMonth() === 0 ? 11 : currentMonth.getMonth() - 1;
    const totalDaysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

    for (let i = startDayIdx - 1; i >= 0; i--) {
      cells.push(new Date(prevMonthYear, prevMonth, totalDaysInPrevMonth - i));
    }

    // Current month days
    for (let i = 1; i <= totalDaysInMonth; i++) {
      cells.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }

    // Next month head days: dynamically fill to multiple of 7 (at least 35 days)
    const neededCells = Math.ceil(cells.length / 7) * 7;
    const targetTotal = Math.max(35, neededCells);
    const remainingCells = targetTotal - cells.length;
    const nextMonthYear =
      currentMonth.getMonth() === 11 ? currentMonth.getFullYear() + 1 : currentMonth.getFullYear();
    const nextMonth = currentMonth.getMonth() === 11 ? 0 : currentMonth.getMonth() + 1;
    for (let i = 1; i <= remainingCells; i++) {
      cells.push(new Date(nextMonthYear, nextMonth, i));
    }

    return cells;
  }, [currentMonth]);

  // Find due words count for a specific date cell
  const getDueCountForDate = (date: Date) => {
    const dateStr = formatLocalDate(date);
    return learned.filter(l => {
      if (!l.nextReview) return false;
      const nextDateStr = formatLocalDate(new Date(l.nextReview));
      return nextDateStr === dateStr;
    }).length;
  };

  // Check if a date has completed reviews
  const isDateCompleted = (date: Date) => {
    const dateStr = formatLocalDate(date);
    const hasPracticed = learned.some(
      l => l.lastPracticed && formatLocalDate(new Date(l.lastPracticed)) === dateStr
    );
    const dueCount = getDueCountForDate(date);
    return hasPracticed && dueCount === 0;
  };

  // Words due today
  const todayDueCount = useMemo(() => {
    const todayStr = formatLocalDate(new Date());
    return learned.filter(l => {
      if (!l.nextReview) return false;
      return formatLocalDate(new Date(l.nextReview)) === todayStr;
    }).length;
  }, [learned]);

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
      word: v.word || '',
      phonetic: v.phonetic || '',
      definition: v.definition || '',
      definitionVn: v.definitionVn || '',
      pos: v.pos || '',
      difficulty: v.difficulty || 1,
      frequency: v.frequency || 1,
      themeId: v.themeId || '',
      examples: v.examples || [],
      synonyms: v.synonyms || [],
      antonyms: v.antonyms || [],
      proficiency: v.proficiency ?? 0,
      nextReview: v.nextReview,
    }));
  }, [selectedDate, learned]);

  // Apply search and filter criteria to vocabulary list
  const selectedDateVocabs = useMemo(() => {
    return rawSelectedDateVocabs.filter(v => {
      const matchesSearch =
        v.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.definitionVn.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPos = selectedPos === 'all' || v.pos.toLowerCase() === selectedPos.toLowerCase();
      const matchesProficiency =
        selectedProficiency === 'all' || v.proficiency === parseInt(selectedProficiency, 10);
      const matchesBookmark = selectedBookmark === 'all' || bookmarkedIds.has(v.id);
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

  const strongRetentionCount = useMemo(() => {
    return learned.filter(l => (l.proficiency || 0) >= 4).length;
  }, [learned]);

  const needsReinforceCount = useMemo(() => {
    return learned.filter(l => (l.proficiency || 0) < 4).length;
  }, [learned]);

  const proficiencyDistribution = useMemo(() => {
    const dist = [0, 0, 0, 0, 0];
    learned.forEach(l => {
      const p = Math.max(1, Math.min(5, l.proficiency || 0));
      dist[p - 1]++;
    });
    return dist;
  }, [learned]);

  // Find the next upcoming date that has due words
  const nextUpcomingDue = useMemo(() => {
    const today = new Date();
    const todayStr = formatLocalDate(today);
    const sorted = [...learned]
      .filter(l => l.nextReview && formatLocalDate(new Date(l.nextReview)) >= todayStr)
      .sort((a, b) => new Date(a.nextReview!).getTime() - new Date(b.nextReview!).getTime());
    if (sorted.length > 0 && sorted[0].nextReview) {
      const nextDate = new Date(sorted[0].nextReview);
      return `${nextDate.getDate()} tháng ${nextDate.getMonth() + 1}`;
    }
    return null;
  }, [learned]);

  const speakWord = (wordText: string) => {
    speakLessonText(wordText, {
      lessonId: 'review_spaced_repetition',
      rate: 1.0,
    });
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
      type: updated ? 'success' : 'info',
      title: updated ? 'Đã lưu ghi nhớ' : 'Đã bỏ ghi nhớ',
      message: updated
        ? 'Đã thêm từ vựng vào danh sách ghi nhớ ôn tập.'
        : 'Đã bỏ từ vựng khỏi danh sách ghi nhớ.',
    });
  };

  // Selected date formatted text
  const selectedDateFormatted = `${VIETNAMESE_LONG_WEEKDAYS[selectedDate.getDay()]}, ${selectedDate.getDate()} tháng ${selectedDate.getMonth() + 1}, ${selectedDate.getFullYear()}`;
  const selectedDateQueryStr = formatLocalDate(selectedDate);

  const toggleExpandWord = (wordId: string) => {
    setExpandedWordId(prev => (prev === wordId ? null : wordId));
  };

  // Distinct POS values in the selected list
  const uniquePosList = useMemo(() => {
    const set = new Set<string>();
    rawSelectedDateVocabs.forEach(v => {
      if (v.pos) set.add(v.pos);
    });
    return Array.from(set);
  }, [rawSelectedDateVocabs]);

  // 4 Core Stat Cards configuration matching myvocab / dashboard
  const statCards = [
    {
      key: 'due',
      label: 'Cần ôn hôm nay',
      sublabel: todayDueCount > 0 ? 'Đang chờ ôn tập' : 'Đã hoàn tất 100%',
      count: todayDueCount,
      icon: <Flame className="w-5 h-5 text-amber-500" />,
      accentBg: 'bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800',
      progressPct: todayDueCount === 0 ? 100 : Math.max(10, Math.min(100, todayDueCount * 10)),
      progressColor: todayDueCount === 0 ? 'bg-emerald-500' : 'bg-amber-500',
      action: todayDueCount > 0 ? (
        <Link
          href="/study/practice?mode=review"
          className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1"
        >
          Ôn ngay <ArrowRight className="w-3 h-3" />
        </Link>
      ) : (
        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
          <Check className="w-3.5 h-3.5" /> Xong
        </span>
      ),
    },
    {
      key: 'retention',
      label: 'Tỷ lệ nhớ từ',
      sublabel: 'Chỉ số SM-2 tối ưu',
      count: `${retentionRate}%`,
      icon: <Target className="w-5 h-5 text-emerald-500" />,
      accentBg: 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800',
      progressPct: retentionRate,
      progressColor: 'bg-emerald-500',
      action: (
        <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
          Ổn định
        </span>
      ),
    },
    {
      key: 'mastered',
      label: 'Từ đã làm chủ',
      sublabel: 'Thành thạo cấp 5',
      count: masteredCount,
      icon: <Trophy className="w-5 h-5 text-[#0059bb] dark:text-sky-400" />,
      accentBg: 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800',
      progressPct: learned.length > 0 ? Math.round((masteredCount / learned.length) * 100) : 0,
      progressColor: 'bg-[#0059bb]',
      action: (
        <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
          {learned.length > 0 ? Math.round((masteredCount / learned.length) * 100) : 0}%
        </span>
      ),
    },
    {
      key: 'total',
      label: 'Tổng từ đang học',
      sublabel: 'Chu kỳ phản xạ SM-2',
      count: learned.length,
      icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
      accentBg: 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800',
      progressPct: Math.min(100, Math.max(5, Math.round((learned.length / 200) * 100))),
      progressColor: 'bg-indigo-500',
      action: (
        <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
          Chủ động
        </span>
      ),
    },
  ];

  if (!isMounted) {
    return <ReviewSkeleton />;
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-28 md:pb-12 text-slate-800 dark:text-slate-200" suppressHydrationWarning>
      
      {/* ─── 0. UNIVERSAL APP TOP HEADER (56px Baseline) ─── */}
      <AppTopHeader
        rightDesktopContent={
          <div className="flex items-center gap-2">
            <Link
              href="/study/practice?mode=review"
              className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 font-display"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Bắt Đầu Ôn Tập</span>
            </Link>
          </div>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active
            icon={<CalendarIcon className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
            label="Lịch Ôn Tập SM-2"
          />
          <HeaderPillItem
            href="/study/practice"
            icon={<Zap className="w-3.5 h-3.5 text-amber-500" />}
            label="Luyện Tập Ngay"
          />
          <HeaderPillItem
            href="/myvocab"
            icon={<Bookmark className="w-3.5 h-3.5 text-slate-500" />}
            label="Sổ Tay Từ Vựng"
            hideOnSmall
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* ─── MAIN CANVAS CONTAINER WITH PAGE ENTRANCE WRAPPER ─── */}
      <PageEntranceWrapper className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3 sm:py-5 space-y-4">

        {/* ─── 1. TOP 4 BENTO STATS CARDS ─── */}
        <MotionItem className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {statCards.map(s => (
            <div
              key={s.key}
              className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-[#0059bb]/40 transition-all flex flex-col justify-between space-y-2 sm:space-y-2.5"
            >
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 font-display truncate">
                  {s.label}
                </span>
                <div className={`p-1.5 sm:p-2 rounded-xl ${s.accentBg} shadow-2xs shrink-0`}>
                  {s.icon}
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-1.5">
                  <div className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight tabular-nums truncate">
                    {s.count}
                  </div>
                  <div className="shrink-0">{s.action}</div>
                </div>
                <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-400 mt-1 font-medium gap-1">
                  <span className="truncate min-w-0">{s.sublabel}</span>
                  <span className="font-mono text-[9.5px] sm:text-[10px] text-slate-400 shrink-0">{s.progressPct}%</span>
                </div>
                <div className="mt-1.5 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${s.progressColor}`}
                    style={{ width: `${s.progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </MotionItem>

        {/* ─── 2. MAIN BENTO GRID: CALENDAR (7) & PROFICIENCY DISTRIBUTION (5) ─── */}
        <MotionItem className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          
          {/* Left: Interactive SM-2 Calendar (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 h-full flex flex-col justify-between">
              
              <div>
                {/* Calendar Header with Quick Jump */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center border border-blue-200/80 dark:border-blue-800/40 shadow-2xs shrink-0">
                      <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white tracking-tight capitalize font-display">
                        {monthYearTitle}
                      </h2>
                      <p className="text-[10.5px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Chu kỳ lặp lại ngắt quãng SM-2
                      </p>
                    </div>
                  </div>

                  {/* Controls: "Hôm nay" & Prev/Next chevrons */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
                    <button
                      type="button"
                      onClick={handleJumpToToday}
                      className="h-8 px-2.5 sm:px-3 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0059bb] dark:hover:text-sky-400 bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-700 rounded-xl cursor-pointer transition-all active:scale-95 flex items-center gap-1.5 shadow-2xs shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Hôm nay
                    </button>

                    <div className="flex items-center gap-1 border border-slate-200/80 dark:border-slate-700 rounded-xl p-0.5 bg-slate-50 dark:bg-slate-900 shadow-2xs shrink-0">
                      <button
                        type="button"
                        className="h-7 w-7 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center cursor-pointer transition-all active:scale-95"
                        onClick={handlePrevMonth}
                        aria-label="Tháng trước"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="h-7 w-7 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center cursor-pointer transition-all active:scale-95"
                        onClick={handleNextMonth}
                        aria-label="Tháng sau"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Days of week Header */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center shrink-0 pt-2 pb-1">
                  {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                    <div
                      key={d}
                      className="text-[10.5px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-display"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid Cells (Dynamic & well-proportioned) */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
                  {calendarCells.map((cellDate, idx) => {
                    const isCurrentMonth = cellDate.getMonth() === currentMonth.getMonth();
                    const isToday = cellDate.toDateString() === new Date().toDateString();
                    const isSelected = cellDate.toDateString() === selectedDate.toDateString();
                    const dueCount = getDueCountForDate(cellDate);
                    const isCompleted = isDateCompleted(cellDate);

                    let cellClass =
                      'h-9 sm:h-11 rounded-lg sm:rounded-xl flex flex-col items-center justify-center text-xs font-bold relative select-none cursor-pointer transition-all duration-150 border ';

                    if (isSelected) {
                      cellClass +=
                        'bg-[#0059bb] text-white border-[#0059bb] shadow-md shadow-[#0059bb]/30 scale-[1.03] z-10 font-black';
                    } else if (isToday) {
                      cellClass +=
                        'bg-blue-50/80 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-300 border-2 border-[#0059bb] ring-2 ring-[#0059bb]/20 font-black';
                    } else if (isCompleted) {
                      cellClass +=
                        'border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100/50';
                    } else if (isCurrentMonth) {
                      cellClass +=
                        'border-slate-200/70 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60';
                    } else {
                      cellClass +=
                        'border-transparent text-slate-350 dark:text-slate-600 opacity-40 hover:bg-slate-50 dark:hover:bg-slate-900';
                    }

                    return (
                      <div
                        key={`${cellDate.toISOString()}-${idx}`}
                        onClick={() => setSelectedDate(cellDate)}
                        className={cellClass}
                      >
                        <span className={`font-mono tabular-nums leading-none ${dueCount > 0 ? '-mt-1 sm:-mt-0.5' : ''}`}>
                          {cellDate.getDate()}
                        </span>

                        {/* Due count indicator */}
                        {dueCount > 0 && (
                          <span
                            className={`absolute bottom-0.5 sm:bottom-1 px-1 min-w-3.5 sm:min-w-4 rounded-full flex items-center justify-center text-[7.5px] sm:text-[8.5px] font-black shadow-2xs leading-tight ${
                              isSelected
                                ? 'bg-amber-400 text-slate-950'
                                : 'bg-amber-500 text-white'
                            }`}
                          >
                            {dueCount}
                          </span>
                        )}

                        {/* Completed dot */}
                        {isCompleted && !dueCount && (
                          <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Calendar Legend */}
              <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[10.5px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-md bg-[#0059bb]" />
                  <span>Đang chọn</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-md border-2 border-[#0059bb] bg-blue-100 dark:bg-blue-950" />
                  <span>Hôm nay</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Có từ cần ôn</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Đã hoàn thành</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Spaced Repetition Analytics (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center border border-blue-200/80 dark:border-blue-800/40 shadow-2xs">
                      <Activity className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-display">
                        Phân Bố Cấp Độ Ghi Nhớ
                      </h3>
                      <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
                        5 cấp độ thành thạo SM-2
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                    {learned.length} từ
                  </span>
                </div>

                {/* 2-Box Mini Stat Summary Strip */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                        Đã Vững (Cấp 4-5)
                      </span>
                      <span className="text-base font-black font-mono tabular-nums text-emerald-800 dark:text-emerald-300">
                        {strongRetentionCount} <span className="text-[10px] font-sans font-medium text-emerald-600/80">từ</span>
                      </span>
                    </div>
                    <span className="text-xs font-black font-mono text-emerald-600 dark:text-emerald-400">
                      {learned.length > 0 ? Math.round((strongRetentionCount / learned.length) * 100) : 0}%
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                        Cần Ôn (Cấp 1-3)
                      </span>
                      <span className="text-base font-black font-mono tabular-nums text-amber-800 dark:text-amber-300">
                        {needsReinforceCount} <span className="text-[10px] font-sans font-medium text-amber-600/80">từ</span>
                      </span>
                    </div>
                    <span className="text-xs font-black font-mono text-amber-600 dark:text-amber-400">
                      {learned.length > 0 ? Math.round((needsReinforceCount / learned.length) * 100) : 0}%
                    </span>
                  </div>
                </div>

                {/* Level list items with compact gap */}
                <div className="space-y-2.5 pt-3">
                  {[
                    { level: 5, label: 'Làm chủ (Cấp 5)', color: 'bg-emerald-500', barBg: 'bg-emerald-500' },
                    { level: 4, label: 'Thành thạo (Cấp 4)', color: 'bg-[#0059bb]', barBg: 'bg-[#0059bb]' },
                    { level: 3, label: 'Nhớ tốt (Cấp 3)', color: 'bg-indigo-500', barBg: 'bg-indigo-500' },
                    { level: 2, label: 'Nhận biết (Cấp 2)', color: 'bg-amber-500', barBg: 'bg-amber-500' },
                    { level: 1, label: 'Bắt đầu (Cấp 1)', color: 'bg-rose-500', barBg: 'bg-rose-500' },
                  ].map(item => {
                    const count = proficiencyDistribution[item.level - 1];
                    const total = Math.max(1, learned.length);
                    const pct = Math.round((count / total) * 100);
                    return (
                      <div key={item.level} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${item.color}`} />
                            {item.label}
                          </span>
                          <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400">
                            {count} từ ({pct}%)
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${item.barBg}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Educational SRS Tip */}
              <div className="mt-3 p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                <Lightbulb className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-slate-900 dark:text-white font-bold">Mẹo SM-2:</strong> Ôn tập từ ở Cấp 1-2 trong vòng 24h giúp tăng 80% khả năng lưu giữ vào trí nhớ dài hạn.
                </p>
              </div>

            </div>
          </div>
        </MotionItem>

        {/* ─── 3. SELECTED DATE VOCABULARY LIST & ACTION HUB ─── */}
        <MotionItem className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
          
          {/* Header Panel inside card section */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center pb-3.5 border-b border-slate-100 dark:border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/80 dark:border-blue-800/40">
                  Lịch Ngày
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight font-display">
                  {selectedDateFormatted}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {rawSelectedDateVocabs.length > 0
                  ? `Có ${rawSelectedDateVocabs.length} từ vựng đã lên lịch ôn tập cho ngày này.`
                  : 'Lịch ôn tập ngày này hoàn toàn thông thoáng.'}
              </p>
            </div>

            {/* Quick CTAs */}
            <div className="flex items-center gap-2 flex-wrap">
              {rawSelectedDateVocabs.length > 0 ? (
                <Link
                  href={`/study/practice?mode=review&date=${selectedDateQueryStr}`}
                  className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95 font-display"
                >
                  <Zap className="w-4 h-4 text-amber-300" strokeWidth={2.4} />
                  <span>Ôn Tập Ngay (+15 XP/từ)</span>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200/80 dark:border-emerald-800/40 flex items-center gap-1.5 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Không có từ tồn đọng</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Filtering Toolbar (when words exist) */}
          {rawSelectedDateVocabs.length > 0 && (
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
              <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Filter className="w-3 h-3 text-[#0059bb]" /> Bộ lọc danh sách
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {/* Search Input with External Label */}
                <div>
                  <label
                    htmlFor="review-search-input"
                    className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1"
                  >
                    Từ vựng hoặc nghĩa
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                      id="review-search-input"
                      type="text"
                      placeholder="Tìm từ vựng, phiên âm, nghĩa tiếng Việt..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full h-9 pl-8 pr-8 text-xs font-medium rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0c0c0f] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 transition-all"
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* POS Select with External Label */}
                <div>
                  <label
                    htmlFor="review-pos-select"
                    className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1"
                  >
                    Từ loại (POS)
                  </label>
                  <select
                    id="review-pos-select"
                    value={selectedPos}
                    onChange={e => setSelectedPos(e.target.value)}
                    className="w-full h-9 px-2.5 text-xs font-bold rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0c0c0f] text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 cursor-pointer transition-all"
                  >
                    <option value="all">Tất cả từ loại</option>
                    {uniquePosList.map(pos => (
                      <option key={pos} value={pos}>
                        {pos.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Proficiency Select with External Label */}
                <div>
                  <label
                    htmlFor="review-level-select"
                    className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1"
                  >
                    Mức độ thành thạo
                  </label>
                  <select
                    id="review-level-select"
                    value={selectedProficiency}
                    onChange={e => setSelectedProficiency(e.target.value)}
                    className="w-full h-9 px-2.5 text-xs font-bold rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0c0c0f] text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 cursor-pointer transition-all"
                  >
                    <option value="all">Mọi cấp độ</option>
                    <option value="1">Cấp độ 1 (Bắt đầu)</option>
                    <option value="2">Cấp độ 2 (Nhận biết)</option>
                    <option value="3">Cấp độ 3 (Nhớ tốt)</option>
                    <option value="4">Cấp độ 4 (Thành thạo)</option>
                    <option value="5">Cấp độ 5 (Làm chủ)</option>
                  </select>
                </div>

                {/* Bookmark Select with External Label */}
                <div>
                  <label
                    htmlFor="review-bookmark-select"
                    className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1"
                  >
                    Trạng thái lưu trữ
                  </label>
                  <select
                    id="review-bookmark-select"
                    value={selectedBookmark}
                    onChange={e => setSelectedBookmark(e.target.value)}
                    className="w-full h-9 px-2.5 text-xs font-bold rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0c0c0f] text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 cursor-pointer transition-all"
                  >
                    <option value="all">Tất cả từ vựng</option>
                    <option value="bookmark">Chỉ từ đã lưu ⭐</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Word Cards Grid OR Content-Rich Multi-Column Action Hub (Zero Dead Space) */}
          {selectedDateVocabs.length === 0 ? (
            rawSelectedDateVocabs.length === 0 ? (
              /* Content-Rich 2-Column Action Hub */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch pt-1">
                {/* Left Col (5/12): Congratulatory Status Card */}
                <div className="lg:col-span-5 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40">
                        ĐÃ HOÀN TẤT
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        Tiến độ SM-2 tối ưu
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                      Không có từ vựng tồn đọng!
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Lịch ôn tập ngày này hoàn toàn thông thoáng. Hãy tiếp tục duy trì đà học bằng các chế độ bổ trợ bên cạnh.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-[#0c0c0f] border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                      <span>Từ cần ôn ngày này:</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">0 từ</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                      <span>Lịch ôn tiếp theo:</span>
                      <span className="font-mono font-bold text-[#0059bb] dark:text-sky-400">
                        {nextUpcomingDue || 'Đang cập nhật'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                      <span>Trạng thái chuỗi học:</span>
                      <span className="font-bold text-amber-500 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" /> Sẵn sàng
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Col (7/12): 3 Bento Recommended Action Cards */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Action 1: Early Review */}
                  <Link
                    href="/study/practice?mode=early-review"
                    className="p-3.5 rounded-xl bg-slate-50/80 hover:bg-white dark:bg-slate-900/50 dark:hover:bg-slate-900 border border-slate-200/80 hover:border-[#0059bb]/50 dark:border-slate-800 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-2.5 group shadow-2xs hover:shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center border border-blue-200/80 dark:border-blue-800/40">
                          <Compass className="w-4 h-4" />
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-[9.5px] font-black uppercase tracking-wider bg-blue-100/80 dark:bg-blue-950 text-[#0059bb] dark:text-sky-300">
                          +10 XP
                        </span>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors">
                          Ôn tập trước hạn
                        </h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                          Ôn trước các từ sắp đến hạn trong 2-3 ngày tới để giảm tải áp lực.
                        </p>
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-50/60 dark:bg-blue-950/30 text-[10px] font-semibold text-[#0059bb] dark:text-sky-300">
                        ⚡ Giảm tải ngày mai
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-[#0059bb] dark:text-sky-400">
                      <span>Bắt đầu ngay</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* Action 2: Focus Review */}
                  <Link
                    href="/study/practice?mode=focus-review"
                    className="p-3.5 rounded-xl bg-slate-50/80 hover:bg-white dark:bg-slate-900/50 dark:hover:bg-slate-900 border border-slate-200/80 hover:border-amber-400/50 dark:border-slate-800 dark:hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-2.5 group shadow-2xs hover:shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center border border-amber-200/80 dark:border-amber-800/40">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-[9.5px] font-black uppercase tracking-wider bg-amber-100/80 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                          +15 XP
                        </span>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          Luyện từ khó
                        </h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                          Củng cố phản xạ các từ ở Cấp 1-2 hoặc từ có tỷ lệ sai cao.
                        </p>
                      </div>
                      <div className="px-2 py-1 rounded-md bg-amber-50/60 dark:bg-amber-950/30 text-[10px] font-semibold text-amber-700 dark:text-amber-300">
                        🎯 Củng cố phản xạ
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-amber-600 dark:text-amber-400">
                      <span>Rèn luyện ngay</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* Action 3: Learn New Vocabs */}
                  <Link
                    href="/vocabulary"
                    className="p-3.5 rounded-xl bg-slate-50/80 hover:bg-white dark:bg-slate-900/50 dark:hover:bg-slate-900 border border-slate-200/80 hover:border-emerald-400/50 dark:border-slate-800 dark:hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-2.5 group shadow-2xs hover:shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-800/40">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-[9.5px] font-black uppercase tracking-wider bg-emerald-100/80 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          +20 XP
                        </span>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          Khám phá từ mới
                        </h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                          Mở rộng vốn từ với 215+ chủ đề chuyên biệt đa dạng.
                        </p>
                      </div>
                      <div className="px-2 py-1 rounded-md bg-emerald-50/60 dark:bg-emerald-950/30 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                        📚 215+ chủ đề
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <span>Khám phá ngay</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              /* No matching search results */
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center max-w-md mx-auto">
                <Search className="w-7 h-7 text-slate-400 mb-2" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  Không tìm thấy từ vựng phù hợp
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Không có từ vựng nào khớp với bộ lọc hoặc từ khóa tìm kiếm của bạn.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedPos('all');
                    setSelectedProficiency('all');
                    setSelectedBookmark('all');
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Đặt lại tất cả bộ lọc
                </button>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {selectedDateVocabs.map(v => {
                const isBookmarked = bookmarkedIds.has(v.id);
                const isExpanded = expandedWordId === v.id;

                return (
                  <div
                    key={v.id}
                    className="p-3.5 sm:p-4 rounded-xl bg-slate-50/70 hover:bg-white dark:bg-slate-900/50 dark:hover:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-[#0059bb]/40 hover:shadow-xs transition-all flex flex-col justify-between space-y-2.5"
                  >
                    <div>
                      {/* Word card top row header */}
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-[#0059bb] dark:text-sky-400 font-display select-all">
                            {v.word}
                          </span>
                          <span className="text-[9.5px] font-black px-1.5 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 rounded-md uppercase border border-blue-200/60 dark:border-blue-800/40">
                            {v.pos}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-1">
                          {/* Speak word audio utility */}
                          <button
                            type="button"
                            onClick={() => speakWord(v.word)}
                            className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-white dark:bg-slate-800 text-slate-600 hover:text-[#0059bb] dark:text-slate-400 dark:hover:text-sky-300 flex items-center justify-center cursor-pointer transition-all active:scale-95 border border-slate-200/60 dark:border-slate-700 shadow-2xs"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                          </button>
                          {/* Bookmark Toggle */}
                          <button
                            type="button"
                            onClick={() => handleToggleBookmark(v.id)}
                            className={`w-8 h-8 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center cursor-pointer transition-all active:scale-95 border shadow-2xs ${
                              isBookmarked
                                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-500 border-amber-200 dark:border-amber-900/40'
                                : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-amber-500 border-slate-200/60 dark:border-slate-700'
                            }`}
                            title={isBookmarked ? 'Bỏ lưu ghi nhớ' : 'Lưu ghi nhớ'}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                            ) : (
                              <Bookmark className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Definitions */}
                      <div className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 select-all">
                        {v.definitionVn}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 font-medium">
                        {v.definition}
                      </div>

                      {/* Expandable Synonyms/Examples */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs leading-relaxed font-sans overflow-hidden"
                          >
                            {v.phonetic && (
                              <div>
                                <span className="font-bold text-slate-400 block text-[10.5px]">Phiên âm:</span>
                                <span className="font-mono text-slate-700 dark:text-slate-300">
                                  {v.phonetic}
                                </span>
                              </div>
                            )}
                            {v.examples && v.examples.length > 0 && (
                              <div>
                                <span className="font-bold text-slate-400 block text-[10.5px]">Ví dụ:</span>
                                <p className="italic text-slate-700 dark:text-slate-300 font-medium">
                                  &ldquo;{v.examples[0]}&rdquo;
                                </p>
                              </div>
                            )}
                            {v.synonyms && v.synonyms.length > 0 && (
                              <div>
                                <span className="font-bold text-slate-400 block text-[10.5px]">Từ đồng nghĩa:</span>
                                <span className="text-[#0059bb] dark:text-sky-400 font-bold">
                                  {v.synonyms.join(', ')}
                                </span>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Card footer: expandable toggle & proficiency tracker */}
                    <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => toggleExpandWord(v.id)}
                        className="text-[11px] font-bold text-slate-500 hover:text-[#0059bb] dark:text-slate-400 dark:hover:text-sky-400 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            Thu gọn <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            Chi tiết &amp; ví dụ <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      {/* Proficiency Level visual indicators */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400">Cấp:</span>
                        <div className="flex gap-1">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < v.proficiency
                                    ? 'bg-[#0059bb]'
                                    : 'bg-slate-200 dark:bg-slate-800'
                                }`}
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </MotionItem>

      </PageEntranceWrapper>

      {/* ─── 4. MOBILE FLOATING THUMB-FRIENDLY ACTION BAR (Rule 13 Wadhah Aloui) ─── */}
      <div className="fixed bottom-[70px] left-3 right-3 z-30 sm:hidden">
        {rawSelectedDateVocabs.length > 0 ? (
          <Link
            href={`/study/practice?mode=review&date=${selectedDateQueryStr}`}
            className="w-full h-11 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold shadow-lg shadow-[#0059bb]/30 flex items-center justify-between transition-all active:scale-[0.98] border border-blue-400/30 backdrop-blur-md font-display"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5 text-amber-300" strokeWidth={2.4} />
              </div>
              <span className="truncate">Ôn Tập Ngày Này ({rawSelectedDateVocabs.length} từ)</span>
            </div>
            <span className="px-2 py-0.5 rounded-lg bg-white/20 text-[10px] font-black flex items-center gap-1 shrink-0">
              +15 XP <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ) : todayDueCount > 0 ? (
          <Link
            href="/study/practice?mode=review"
            className="w-full h-11 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold shadow-lg shadow-[#0059bb]/30 flex items-center justify-between transition-all active:scale-[0.98] border border-blue-400/30 backdrop-blur-md font-display"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-amber-400/30 flex items-center justify-center shrink-0">
                <Flame className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <span className="truncate">Ôn Tập Hôm Nay ({todayDueCount} từ)</span>
            </div>
            <span className="px-2 py-0.5 rounded-lg bg-white/20 text-[10px] font-black flex items-center gap-1 shrink-0">
              Bắt đầu <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ) : (
          <Link
            href="/study/practice?mode=early-review"
            className="w-full h-10 px-4 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-lg shadow-black/5 flex items-center justify-between transition-all active:scale-[0.98] backdrop-blur-md font-display"
          >
            <div className="flex items-center gap-2 text-[#0059bb] dark:text-sky-400 min-w-0">
              <Compass className="w-4 h-4 shrink-0" />
              <span className="truncate">Ôn trước hạn giảm tải</span>
            </div>
            <span className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400 flex items-center gap-1 shrink-0">
              +10 XP <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
