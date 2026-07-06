'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MOCK_VOCABULARIES } from '@/lib/constants/vocabularies';
import { useVocabularyStore } from '@/lib/store/vocabularyStore';
import { useAuthStore } from '@/lib/store/authStore';
import { Calendar as CalendarIcon, Zap, PartyPopper, ArrowRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';

export default function ReviewPage() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const { learned, loadLearnedWords } = useVocabularyStore();
  const { user } = useAuthStore();

  // Load learned words from the API/cache on page load
  React.useEffect(() => {
    if (user?.id) {
      loadLearnedWords(user.id);
    }
  }, [user?.id, loadLearnedWords]);

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

    // Next month head days to complete the calendar grid
    const remaining = cells.length % 7;
    if (remaining > 0) {
      const nextMonthYear = currentMonth.getMonth() === 11 ? currentMonth.getFullYear() + 1 : currentMonth.getFullYear();
      const nextMonth = currentMonth.getMonth() === 11 ? 0 : currentMonth.getMonth() + 1;
      const cellsToAdd = 7 - remaining;
      for (let i = 1; i <= cellsToAdd; i++) {
        cells.push(new Date(nextMonthYear, nextMonth, i));
      }
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

  // Get full vocab list scheduled on the selectedDate
  const selectedDateVocabs = useMemo(() => {
    const dateStr = formatLocalDate(selectedDate);
    const dueItemsForSelected = learned.filter(l => {
      if (!l.nextReview) return false;
      const nextDateStr = formatLocalDate(new Date(l.nextReview));
      return nextDateStr === dateStr;
    });

    const ids = dueItemsForSelected.map(i => i.vocabId);
    return MOCK_VOCABULARIES.filter(v => ids.includes(v.id)).map(v => {
      const learnedInfo = dueItemsForSelected.find(i => i.vocabId === v.id);
      return {
        ...v,
        proficiency: learnedInfo?.proficiency ?? 0,
        nextReview: learnedInfo?.nextReview
      };
    });
  }, [selectedDate, learned]);

  // Selected date formatted text
  const selectedDateFormatted = selectedDate.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const selectedDateQueryStr = formatLocalDate(selectedDate);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Page Header */}
      <div className="page-header animate-fade-in-down mb-6">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
          Lịch ôn tập định kỳ
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium max-w-xl">
          Sử dụng thuật toán lặp lại ngắt quãng (Spaced Repetition) để phân tích tần suất ôn tập từ vựng khoa học nhất.
        </p>
      </div>

      {/* Calendar — Double-Bezel */}
      <div className="bezel mb-6 animate-scale-in">
        <div className="bezel-inner p-6 bg-white dark:bg-neutral-900">
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.04] dark:border-white/[0.04] mb-5">
            <div className="flex items-center gap-3">
              <div className="icon-well bg-cyan-50 dark:bg-cyan-950/30 text-cyan-500">
                <CalendarIcon className="w-[18px] h-[18px]" strokeWidth={1.8} />
              </div>
              <h3 className="text-base font-black text-gray-900 dark:text-gray-100 tracking-tight capitalize font-display">
                {monthYearTitle}
              </h3>
            </div>
            
            {/* Month Navigation Control Actions */}
            <div className="flex items-center gap-1.5 font-sans">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-lg"
                onClick={handlePrevMonth}
                aria-label="Tháng trước"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-lg"
                onClick={handleNextMonth}
                aria-label="Tháng sau"
              >
                <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </Button>
              <span className="ml-2 text-[10px] text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-emerald-200/50 dark:border-emerald-900/30">
                Spaced Repetition Active
              </span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
              <div key={d} className="text-[11px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-wider py-1 font-display">
                {d}
              </div>
            ))}

            {calendarCells.map((cellDate, idx) => {
              const isCurrentMonth = cellDate.getMonth() === currentMonth.getMonth();
              const isToday = cellDate.toDateString() === new Date().toDateString();
              const isSelected = cellDate.toDateString() === selectedDate.toDateString();
              const dueCount = getDueCountForDate(cellDate);

              let cellStyle = "aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold relative select-none cursor-pointer transition-all duration-200 ";
              
              if (isToday) {
                cellStyle += "bg-gradient-to-tr from-cyan-400 to-blue-500 text-white shadow-sm ring-2 ring-offset-2 ring-cyan-400 dark:ring-offset-neutral-900";
              } else if (isSelected) {
                cellStyle += "border-2 border-cyan-500 bg-cyan-50/40 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400";
              } else if (isCurrentMonth) {
                cellStyle += "text-gray-900 dark:text-gray-100 hover:bg-slate-50 dark:hover:bg-neutral-800";
              } else {
                cellStyle += "text-slate-350 dark:text-neutral-700 opacity-40 hover:bg-slate-50 dark:hover:bg-neutral-800";
              }

              return (
                <div 
                  key={idx} 
                  className={cellStyle}
                  onClick={() => setSelectedDate(cellDate)}
                >
                  <span>{cellDate.getDate()}</span>
                  {dueCount > 0 && (
                    <span className={`absolute bottom-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                      isToday
                        ? "bg-amber-300 text-slate-900"
                        : "bg-cyan-500 text-white"
                    }`}>
                      {dueCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Due list — Double-Bezel */}
      <div className="bezel animate-fade-in-up">
        <div className="bezel-inner p-6 bg-white dark:bg-neutral-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center pb-4 border-b border-black/[0.04] dark:border-white/[0.04] mb-5">
            <div>
              <h3 className="text-[11px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-[0.15em] font-display">
                Danh sách ôn tập: {selectedDateFormatted}
              </h3>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                Có {selectedDateVocabs.length} từ vựng cần ôn tập vào ngày này.
              </p>
            </div>
            {selectedDateVocabs.length > 0 && (
              <Link 
                href={`/study/practice?mode=review&date=${selectedDateQueryStr}`} 
                className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs font-black py-2.5 px-5 tactile shadow-sm self-start sm:self-center font-sans"
              >
                <Zap className="w-3.5 h-3.5" strokeWidth={2} /> Ôn tập ngay
              </Link>
            )}
          </div>

          {selectedDateVocabs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <PartyPopper className="w-12 h-12 text-slate-400 dark:text-neutral-600 mb-4" strokeWidth={1.2} />
              <div className="text-sm font-black text-gray-900 dark:text-white mb-1 font-display">
                Tuyệt vời! Không có lịch ôn tập
              </div>
              <p className="text-xs text-slate-450 dark:text-slate-500 max-w-xs mb-6 leading-relaxed font-semibold">
                Bạn đã hoàn thành xuất sắc các lịch trình ôn tập. Hãy tiếp tục học thêm từ vựng mới!
              </p>
              <Link href="/vocabulary" className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs font-black px-6 py-2.5 shadow-md tactile font-sans">
                Học từ mới <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedDateVocabs.map(v => (
                <div key={v.id} className="bezel lift group">
                  <div className="bezel-inner p-4 bg-white dark:bg-neutral-900 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-base text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 transition-colors font-display">
                            {v.word}
                          </span>
                          <span className="text-[9px] font-black px-2 py-0.5 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 rounded-full uppercase">
                            {v.pos}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-[9px] text-amber-500 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-full font-black uppercase border border-amber-200/50 dark:border-amber-900/30">
                          <Clock className="w-3 h-3" strokeWidth={1.8} /> Đến hạn
                        </span>
                      </div>
                      <div className="text-xs text-gray-900 dark:text-gray-100 font-extrabold mb-1">
                        {v.definitionVn}
                      </div>
                      <div className="text-[12px] text-slate-500 dark:text-slate-450 leading-relaxed line-clamp-2 font-medium">
                        {v.definition}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/[0.03] dark:border-white/[0.03]">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 dark:text-slate-500">
                        <span>Độ thuần thục:</span>
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
