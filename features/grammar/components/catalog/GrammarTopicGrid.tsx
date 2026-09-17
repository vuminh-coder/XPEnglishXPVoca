"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { GrammarTopic, GrammarTopicStatus } from "../../types/grammarTypes";
import { GrammarTopicCard } from "./GrammarTopicCard";
import { useGrammarProgressStore } from "@/stores/grammarProgressStore";
import {
  containerVariants,
  itemVariants,
} from "@/shared/components/feedback/PageEntranceAnimation";

interface GrammarTopicGridProps {
  topics: GrammarTopic[];
  getTopicStatus: (id: string) => GrammarTopicStatus;
}

export function GrammarTopicGrid({
  topics,
  getTopicStatus,
}: GrammarTopicGridProps) {
  const { quizScores } = useGrammarProgressStore();

  if (topics.length === 0) {
    return (
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
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5"
    >
      {topics.map((topic) => {
        const status = getTopicStatus(topic.id);
        const scoreRecord = quizScores[topic.id];

        return (
          <motion.div key={topic.id} variants={itemVariants}>
            <GrammarTopicCard
              topic={topic}
              status={status}
              scoreRecord={scoreRecord}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
