"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Check,
  ChevronRight,
  Sparkles,
  Volume2,
  ListOrdered,
  RefreshCw,
  Clock,
  BookOpen,
  ArrowRight,
  Headphones,
} from "lucide-react";

import { LessonCoverImage } from "@/shared/components/feedback/LessonCoverImage";

export interface TranscriptSentence {
  id?: number | string;
  text: string;
  vietnamese?: string;
  translation?: string;
  ipa?: string;
  startTime?: number;
  endTime?: number;
}

export interface KeyVocabItem {
  word: string;
  ipa?: string;
  meaning?: string;
  example?: string;
  type?: string;
}

interface InteractiveTranscriptSidebarProps {
  transcript: TranscriptSentence[];
  currentIndex: number;
  completedSentences: { [idx: number]: boolean };
  onSelectSentence: (idx: number) => void;
  onReplaySentence?: (idx: number) => void;
  onNextSentence?: () => void;
  onResetProgress?: () => void;
  keyVocabularies?: KeyVocabItem[];
  onWordClick?: (word: string) => void;
  isPlaying?: boolean;
  className?: string;
  recommendedLessons?: any[];
  completedLessonIds?: (string | number)[];
  onSelectLesson?: (lessonId: string | number) => void;
  onShuffleRecommendations?: () => void;
}

export function InteractiveTranscriptSidebar({
  transcript = [],
  currentIndex = 0,
  completedSentences = {},
  onSelectSentence,
  onReplaySentence,
  onNextSentence,
  onResetProgress,
  keyVocabularies = [],
  onWordClick,
  isPlaying = false,
  className = "",
  recommendedLessons = [],
  completedLessonIds = [],
  onSelectLesson,
  onShuffleRecommendations,
}: InteractiveTranscriptSidebarProps) {
  const [activeTab, setActiveTab] = useState<"transcript" | "tips">("transcript");
  const [showAllTexts, setShowAllTexts] = useState(false);
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const sentenceRefs = useRef<{ [idx: number]: HTMLDivElement | null }>({});

  const totalCount = transcript.length;
  const completedCount = Object.values(completedSentences).filter(Boolean).length;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Tự động cuộn đến câu đang học
  useEffect(() => {
    if (activeTab === "transcript" && sentenceRefs.current[currentIndex]) {
      sentenceRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentIndex, activeTab]);

  return (
    <div
      className={`w-full h-full bg-[#f8fafc] dark:bg-slate-900/90 flex flex-col overflow-hidden font-sans ${className}`}
    >
      {/* 1. TOP TABS: PHỤ ĐỀ vs GỢI Ý BÀI HỌC (CỠ CHỮ RÕ RÀNG, KHOẢNG CÁCH THOÁNG ĐÃNG) */}
      <div className="flex items-center border-b border-slate-100 dark:border-slate-800/80 px-5 pt-3 gap-7 sm:gap-8 shrink-0">
        {/* Tab 1: Phụ đề */}
        <button
          type="button"
          onClick={() => setActiveTab("transcript")}
          className={`pb-2.5 text-sm sm:text-[15px] flex items-center gap-2 cursor-pointer select-none transition-all relative ${
            activeTab === "transcript"
              ? "font-bold text-slate-900 dark:text-white"
              : "font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <ListOrdered className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
          <span>Phụ đề</span>

          {activeTab === "transcript" && (
            <motion.div
              layoutId="activeTabUnderline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-600/80 dark:bg-slate-300/80 rounded-full"
            />
          )}
        </button>

        {/* Tab 2: Gợi ý bài học */}
        <button
          type="button"
          onClick={() => setActiveTab("tips")}
          className={`pb-2.5 text-sm sm:text-[15px] flex items-center gap-2 cursor-pointer select-none transition-all relative ${
            activeTab === "tips"
              ? "font-bold text-slate-900 dark:text-white"
              : "font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-500 stroke-[2]" />
          <span>Gợi ý bài học</span>

          {activeTab === "tips" && (
            <motion.div
              layoutId="activeTabUnderline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-600/80 dark:bg-slate-300/80 rounded-full"
            />
          )}
        </button>
      </div>

      {/* 2. TAB 1: PHỤ ĐỀ (TÔNG MÀU SÁNG, TINH TẾ) */}
      {activeTab === "transcript" && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Header Tiến độ & Đặt lại tiến độ / Toggle Hiện — KHỚP 100% ẢNH MẪU */}
          <div className="space-y-1 px-5 pt-3.5 pb-2 shrink-0">
            {/* Dòng 1: [ 1/14 ] bên trái, [ ↺ Đặt lại tiến độ   Hiện (O) ] bên phải */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xl sm:text-2xl font-extrabold font-sans tracking-tight text-slate-900 dark:text-white leading-none block">
                  {completedCount}/{totalCount}
                </span>
                <span className="text-xs sm:text-[13px] font-normal text-slate-500 dark:text-slate-400 block mt-1">
                  Tiến độ
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 pt-0.5">
                {onResetProgress && (
                  <button
                    type="button"
                    onClick={onResetProgress}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                    title="Đặt lại tiến độ bài học này"
                  >
                    <RotateCcw className="w-3.5 h-3.5 stroke-[1.75]" />
                    <span className="font-normal">Đặt lại tiến độ</span>
                  </button>
                )}

                <div className="flex items-center gap-2 select-none">
                  <span className="font-normal text-slate-600 dark:text-slate-400">Hiện</span>
                  <button
                    type="button"
                    onClick={() => setShowAllTexts((prev) => !prev)}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out flex items-center cursor-pointer ${
                      showAllTexts
                        ? "bg-slate-900 dark:bg-emerald-500 justify-end"
                        : "bg-slate-200 dark:bg-slate-700 justify-start"
                    }`}
                  >
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="w-4 h-4 rounded-full bg-white shadow-xs"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Dòng 2: Thanh tiến độ bo tròn chuẩn ảnh */}
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full bg-slate-900 dark:bg-emerald-400 rounded-full"
              />
            </div>
          </div>

          {/* DANH SÁCH CÁC CÂU TRONG BÀI — TƯƠI SÁNG, NỔI BẬT, ICON RÕ NÉT */}
          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3 px-5 pb-5">
            {transcript.map((sentence, idx) => {
              const isCurrent = idx === currentIndex;
              const isCompleted = !!completedSentences[idx];

              // 1. THẺ CÂU ĐANG HỌC (#3 ĐANG HỌC - Tươi sáng, viền Emerald nổi bật, badge xanh ngọc, icon to rõ)
              if (isCurrent) {
                return (
                  <motion.div
                    key={sentence.id || idx}
                    ref={(el) => {
                      sentenceRefs.current[idx] = el;
                    }}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 sm:p-4.5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/25 border-2 border-emerald-500 dark:border-emerald-500/80 shadow-xs space-y-2 transition-all select-none"
                  >
                    {/* Header: [ (✓) #idx ĐANG HỌC ] bên trái, [ ↺ > ] bên phải */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {/* Vòng tròn xanh lá viền mỏng tích checkmark w-6 h-6 */}
                        <div className="w-6 h-6 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 shadow-2xs">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>

                        {/* Số thứ tự câu #idx */}
                        <span className="text-[14.5px] sm:text-base font-bold text-emerald-950 dark:text-emerald-200">
                          #{idx + 1}
                        </span>

                        {/* Huy hiệu ĐANG HỌC xanh ngọc tươi sáng */}
                        <span className="px-2.5 py-0.5 rounded-[5px] bg-emerald-600 dark:bg-emerald-500 text-white font-extrabold text-[10.5px] tracking-wide uppercase shadow-2xs">
                          ĐANG HỌC
                        </span>
                      </div>

                      {/* Nút hành động góc phải: [ ↺ ] và [ > ] */}
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                        {onReplaySentence && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onReplaySentence(idx);
                            }}
                            className="p-1.5 rounded-lg hover:text-emerald-950 dark:hover:text-white hover:bg-emerald-100/60 dark:hover:bg-emerald-950/50 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                            title="Nghe lại câu này"
                          >
                            <RotateCcw className="w-4.5 h-4.5 stroke-[2]" />
                          </button>
                        )}
                        <div className="p-1.5 text-emerald-600 dark:text-emerald-400">
                          <ChevronRight className="w-4.5 h-4.5 stroke-[2]" />
                        </div>
                      </div>
                    </div>

                    {/* Nội dung câu tiếng Anh */}
                    <p className="text-sm sm:text-[14.5px] font-semibold text-slate-900 dark:text-white leading-relaxed pt-0.5">
                      {sentence.text}
                    </p>
                  </motion.div>
                );
              }

              // 2. THẺ CÂU ĐÃ HOÀN THÀNH (#2 - Nền trắng tinh khiết, viền thanh nhã, icon to rõ [ (✓) #2 ] và [ ↺ > ])
              if (isCompleted) {
                return (
                  <div
                    key={sentence.id || idx}
                    ref={(el) => {
                      sentenceRefs.current[idx] = el;
                    }}
                    onClick={() => onSelectSentence(idx)}
                    className="p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2 cursor-pointer transition-all hover:border-slate-300 dark:hover:border-slate-700 select-none"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {/* Vòng tròn xanh lá viền mỏng tích checkmark w-6 h-6 */}
                        <div className="w-6 h-6 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="text-[14.5px] sm:text-base font-semibold text-slate-700 dark:text-slate-300">
                          #{idx + 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                        {onReplaySentence && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onReplaySentence(idx);
                            }}
                            className="p-1.5 rounded-lg hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Nghe lại câu này"
                          >
                            <RotateCcw className="w-4.5 h-4.5 stroke-[1.75]" />
                          </button>
                        )}
                        <div className="p-1.5">
                          <ChevronRight className="w-4.5 h-4.5 stroke-[1.75]" />
                        </div>
                      </div>
                    </div>

                    <p className="text-sm sm:text-[14.5px] font-normal text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
                      {sentence.text}
                    </p>
                  </div>
                );
              }

              // 3. CÂU CHƯA HỌC / PENDING (#1, #4, #5 - Dạng vòng tròn rỗng xám w-6 h-6 + chuỗi chấm dạng từ)
              return (
                <div
                  key={sentence.id || idx}
                  ref={(el) => {
                    sentenceRefs.current[idx] = el;
                  }}
                  onClick={() => onSelectSentence(idx)}
                  className="py-3 px-1.5 cursor-pointer group transition-all select-none space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Vòng tròn xám rỗng ◯ w-6 h-6 */}
                      <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-slate-400 transition-colors shrink-0" />

                      {/* Số thứ tự #1, #4... */}
                      <span className="text-sm sm:text-[14.5px] font-normal text-slate-500 dark:text-slate-400">
                        #{idx + 1}
                      </span>
                    </div>

                    {/* Tag Mới nếu là câu đầu */}
                    {idx === 0 && !showAllTexts && (
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/60 shadow-2xs">
                          Mới
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Chuỗi dấu chấm masked text •••••• •••• */}
                  <div className="pl-9">
                    {showAllTexts ? (
                      <p className="text-sm sm:text-[14.5px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {sentence.text}
                      </p>
                    ) : (
                      <div className="text-slate-300 dark:text-slate-600 text-xs sm:text-[13px] font-mono tracking-widest leading-loose select-none">
                        {sentence.text
                          .split(" ")
                          .map((word, wIdx) => (
                            <span key={wIdx} className="mr-1.5 inline-block">
                              {"•".repeat(Math.max(2, Math.min(8, word.length)))}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. TAB 2: CHUYÊN BIỆT GỢI Ý BÀI HỌC (DEDICATED RECOMMENDED LESSONS WITH COVER IMAGES) */}
      {activeTab === "tips" && (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Header gợi ý bài học */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-100 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Bài học đề xuất dành cho bạn:</span>
            </div>

            {onShuffleRecommendations && (
              <button
                type="button"
                onClick={onShuffleRecommendations}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                title="Đổi danh sách gợi ý ngẫu nhiên"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Đổi gợi ý</span>
              </button>
            )}
          </div>

          {/* Danh sách thẻ bài học đề xuất dạng Horizontal Media Card chuẩn Rule 10 */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-3.5 sm:p-4 space-y-2.5">
            {recommendedLessons && recommendedLessons.length > 0 ? (
              recommendedLessons.map((lesson) => {
                const isLessonCompleted =
                  completedLessonIds.includes(lesson.id) ||
                  completedLessonIds.includes(String(lesson.id));

                return (
                  <motion.div
                    key={lesson.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectLesson && onSelectLesson(lesson.id)}
                    className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/70 dark:hover:border-emerald-500/60 transition-all cursor-pointer shadow-2xs hover:shadow-xs group select-none flex gap-2.5 sm:gap-3 items-center relative overflow-hidden"
                  >
                    {/* 1. Ảnh bìa bài học (LessonCoverImage) kích thước chuẩn tỷ lệ */}
                    <div className="w-[88px] sm:w-[96px] h-[68px] sm:h-[72px] shrink-0 rounded-lg overflow-hidden relative bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-800">
                      <LessonCoverImage
                        lesson={lesson}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        showBadge={false}
                      />

                      {/* Huy hiệu Cấp độ góc dưới */}
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-[4px] text-[9px] font-mono font-bold bg-slate-900/85 text-white backdrop-blur-xs z-20 shadow-2xs border border-white/10">
                        {lesson.level || "A1 - A2"}
                      </span>
                    </div>

                    {/* 2. Cột thông tin chi tiết bài học bên phải */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-1.5">
                      {/* Dòng 1: Danh mục & Trạng thái đã học/mới */}
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-[10.5px] font-medium text-slate-500 dark:text-slate-400 truncate">
                          {lesson.category || "Giao tiếp"}
                        </span>

                        {isLessonCompleted ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] text-[9.5px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                            <span>Đã học</span>
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded-[4px] text-[9.5px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40 shrink-0">
                            Mới
                          </span>
                        )}
                      </div>

                      {/* Dòng 2: Tiêu đề bài học */}
                      <h4 className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                        {lesson.title}
                      </h4>

                      {/* Dòng 3: Thông số & Nút Học ngay */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80 text-[10px] sm:text-[10.5px] text-slate-400 dark:text-slate-500 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{lesson.duration || "3:00"}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Headphones className="w-3 h-3 text-slate-400" />
                            <span>{lesson.transcript?.length || 10} câu</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-0.5 font-semibold text-[11px] text-slate-600 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors shrink-0">
                          <span>Học</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs font-medium space-y-2">
                <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto" />
                <p>Không có bài học gợi ý nào khác.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
