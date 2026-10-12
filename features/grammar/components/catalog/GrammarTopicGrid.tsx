"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RefreshCw, CheckCircle2 } from "lucide-react";
import { GrammarTopic, GrammarTopicStatus } from "../../types/grammarTypes";
import { GrammarTopicCard, GrammarTopicCardShimmer } from "./GrammarTopicCard";
import { useGrammarProgressStore, GrammarFilterLevel } from "@/stores/grammarProgressStore";

interface GrammarTopicGridProps {
  topics: GrammarTopic[];
  getTopicStatus: (id: string) => GrammarTopicStatus;
  activeLevel?: GrammarFilterLevel;
  searchQuery?: string;
  isSwitchingCategory?: boolean;
  allBasicTopics?: GrammarTopic[];
  allIntermediateTopics?: GrammarTopic[];
  allAdvancedTopics?: GrammarTopic[];
  completedTopics?: GrammarTopic[];
  displayedBasicTopics?: GrammarTopic[];
  displayedIntermediateTopics?: GrammarTopic[];
  displayedAdvancedTopics?: GrammarTopic[];
  onShuffleBasic?: () => void;
  onShuffleIntermediate?: () => void;
  onShuffleAdvanced?: () => void;
  isShufflingBasic?: boolean;
  isShufflingIntermediate?: boolean;
  isShufflingAdvanced?: boolean;
}

export function GrammarTopicGrid({
  topics,
  getTopicStatus,
  activeLevel = "all",
  searchQuery = "",
  isSwitchingCategory = false,
  allBasicTopics = [],
  allIntermediateTopics = [],
  allAdvancedTopics = [],
  completedTopics = [],
  displayedBasicTopics = [],
  displayedIntermediateTopics = [],
  displayedAdvancedTopics = [],
  onShuffleBasic,
  onShuffleIntermediate,
  onShuffleAdvanced,
  isShufflingBasic = false,
  isShufflingIntermediate = false,
  isShufflingAdvanced = false,
}: GrammarTopicGridProps) {
  const { quizScores } = useGrammarProgressStore();

  const isSearching = Boolean(searchQuery && searchQuery.trim().length > 0);

  // Fast 180ms Shimmer Sweep between Level Tabs (0px CLS, identical to Dictation)
  if (isSwitchingCategory) {
    return (
      <motion.div
        key="grammar-shimmer-sweep"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
      >
        {Array.from({ length: 8 }, (_, i) => (
          <GrammarTopicCardShimmer key={i} />
        ))}
      </motion.div>
    );
  }

  // Search Results View
  if (isSearching) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
            Kết quả tìm kiếm cho: &ldquo;{searchQuery}&rdquo;
          </h3>
          <span className="text-xs font-mono font-bold text-slate-400">
            {topics.length} chuyên đề
          </span>
        </div>

        {topics.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto shadow-2xs">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Không tìm thấy chuyên đề ngữ pháp phù hợp
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Thử thay đổi từ khóa tìm kiếm hoặc bấm &quot;Tất Cả&quot; để xem toàn bộ 60 chuyên đề ngữ pháp.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {topics.map((topic) => (
              <GrammarTopicCard
                key={topic.id}
                topic={topic}
                status={getTopicStatus(topic.id)}
                scoreRecord={quizScores[topic.id]}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Filter Tab: "completed"
  if (activeLevel === "completed") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs border border-emerald-200/60 dark:border-emerald-800/40 shadow-2xs">
              ĐÃ HỌC
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
              Chuyên đề bạn đã hoàn thành
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
            {completedTopics.length} bài
          </span>
        </div>

        {completedTopics.length === 0 ? (
          <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 shadow-2xs">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-500 opacity-40" />
            <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">
              Bạn chưa hoàn thành chuyên đề nào
            </p>
            <p className="mt-1 text-slate-500">
              Hãy chọn một bài học ở mục Nền Tảng hoặc Bứt Phá để bắt đầu luyện thi nhé!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {completedTopics.map((topic) => (
              <GrammarTopicCard
                key={topic.id}
                topic={topic}
                status={getTopicStatus(topic.id)}
                scoreRecord={quizScores[topic.id]}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Filter Tab: "basic"
  if (activeLevel === "basic") {
    const list = allBasicTopics.length > 0 ? allBasicTopics : topics;
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
              A1 - A2
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
              Tất cả chuyên đề nền tảng (500+)
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            {list.length} bài
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {list.map((topic) => (
            <GrammarTopicCard
              key={topic.id}
              topic={topic}
              status={getTopicStatus(topic.id)}
              scoreRecord={quizScores[topic.id]}
            />
          ))}
        </div>
      </div>
    );
  }

  // Filter Tab: "intermediate"
  if (activeLevel === "intermediate") {
    const list = allIntermediateTopics.length > 0 ? allIntermediateTopics : topics;
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs border border-amber-200/60 dark:border-amber-800/40 shadow-2xs">
              B1 - B2
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
              Tất cả chuyên đề bứt phá (750+)
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            {list.length} bài
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {list.map((topic) => (
            <GrammarTopicCard
              key={topic.id}
              topic={topic}
              status={getTopicStatus(topic.id)}
              scoreRecord={quizScores[topic.id]}
            />
          ))}
        </div>
      </div>
    );
  }

  // Filter Tab: "advanced"
  if (activeLevel === "advanced") {
    const list = allAdvancedTopics.length > 0 ? allAdvancedTopics : topics;
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs border border-purple-200/60 dark:border-purple-800/40 shadow-2xs">
              C1 - C2
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
              Tất cả chuyên đề chinh phục (900+)
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            {list.length} bài
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {list.map((topic) => (
            <GrammarTopicCard
              key={topic.id}
              topic={topic}
              status={getTopicStatus(topic.id)}
              scoreRecord={quizScores[topic.id]}
            />
          ))}
        </div>
      </div>
    );
  }

  // DEFAULT VIEW: activeLevel === "all" -> 3 Curated Level Rows (Exact Dictation Architecture)
  const basicList = displayedBasicTopics.length > 0 ? displayedBasicTopics : topics.slice(0, 8);
  const intermediateList =
    displayedIntermediateTopics.length > 0 ? displayedIntermediateTopics : topics.slice(20, 28);
  const advancedList =
    displayedAdvancedTopics.length > 0 ? displayedAdvancedTopics : topics.slice(40, 48);

  return (
    <div className="space-y-8">
      {/* ── ROW 1: BÀI HỌC CƠ BẢN (A1 - A2 / 500+) ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
              A1 - A2
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
              Ngữ pháp nền tảng{" "}
              <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">
                (Thì cơ bản, Danh từ, Giới từ & Trọng tâm TOEIC 500+)
              </span>
            </h2>
          </div>

          {onShuffleBasic && (
            <button
              type="button"
              onClick={onShuffleBasic}
              className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-blue-600 dark:text-sky-400 ${
                  isShufflingBasic ? "animate-spin" : ""
                }`}
              />
              <span>Đổi bài ngẫu nhiên</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {isShufflingBasic
            ? Array.from({ length: 8 }, (_, i) => <GrammarTopicCardShimmer key={i} />)
            : basicList.map((topic) => (
                <GrammarTopicCard
                  key={topic.id}
                  topic={topic}
                  status={getTopicStatus(topic.id)}
                  scoreRecord={quizScores[topic.id]}
                />
              ))}
        </div>
      </div>

      {/* ── ROW 2: BÀI HỌC TRUNG CẤP (B1 - B2 / 750+) ── */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs border border-amber-200/60 dark:border-amber-800/40 shadow-2xs">
              B1 - B2
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
              Ngữ pháp bứt phá{" "}
              <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">
                (Thì hoàn thành, Câu bị động & Điều kiện 0-1-2)
              </span>
            </h2>
          </div>

          {onShuffleIntermediate && (
            <button
              type="button"
              onClick={onShuffleIntermediate}
              className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-amber-600 dark:text-amber-400 ${
                  isShufflingIntermediate ? "animate-spin" : ""
                }`}
              />
              <span>Đổi bài ngẫu nhiên</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {isShufflingIntermediate
            ? Array.from({ length: 8 }, (_, i) => <GrammarTopicCardShimmer key={i} />)
            : intermediateList.map((topic) => (
                <GrammarTopicCard
                  key={topic.id}
                  topic={topic}
                  status={getTopicStatus(topic.id)}
                  scoreRecord={quizScores[topic.id]}
                />
              ))}
        </div>
      </div>

      {/* ── ROW 3: BÀI HỌC NÂNG CAO (C1 - C2 / 900+) ── */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs border border-purple-200/60 dark:border-purple-800/40 shadow-2xs">
              C1 - C2
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
              Ngữ pháp chinh phục{" "}
              <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">
                (Đảo ngữ, Thể giả định, Mệnh đề phân từ & Cấu trúc song hành)
              </span>
            </h2>
          </div>

          {onShuffleAdvanced && (
            <button
              type="button"
              onClick={onShuffleAdvanced}
              className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-purple-600 dark:text-purple-400 ${
                  isShufflingAdvanced ? "animate-spin" : ""
                }`}
              />
              <span>Đổi bài ngẫu nhiên</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {isShufflingAdvanced
            ? Array.from({ length: 8 }, (_, i) => <GrammarTopicCardShimmer key={i} />)
            : advancedList.map((topic) => (
                <GrammarTopicCard
                  key={topic.id}
                  topic={topic}
                  status={getTopicStatus(topic.id)}
                  scoreRecord={quizScores[topic.id]}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

