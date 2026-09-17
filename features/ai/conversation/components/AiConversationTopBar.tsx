"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Clock,
  RotateCcw,
  CheckCircle2,
  Check,
  MessageSquare,
} from "lucide-react";
import { Topic } from "../types";
import { TOPIC_ICONS } from "../data/aiTopics";

interface AiConversationTopBarProps {
  currentTopic: Topic;
  allTopics: Topic[];
  selectedTopicId: string;
  onSelectTopic: (topic: Topic) => void;
  isSessionCompleted: boolean;
  elapsedTime: number;
  formatElapsedTime: (seconds: number) => string;
  onRestartNewSession: () => void;
  onFinishConversation: () => void;
}

export function AiConversationTopBar({
  currentTopic,
  allTopics,
  selectedTopicId,
  onSelectTopic,
  isSessionCompleted,
  elapsedTime,
  formatElapsedTime,
  onRestartNewSession,
  onFinishConversation,
}: AiConversationTopBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="shrink-0 relative">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/50 flex items-center justify-center text-[#0059bb] dark:text-sky-400 shadow-2xs">
            {TOPIC_ICONS[currentTopic.id] || <MessageSquare className="w-4 h-4" />}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            {!isSessionCompleted ? (
              /* Topic Selector Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 hover:border-[#0059bb] text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 shadow-2xs cursor-pointer transition-all"
                >
                  <span className="truncate max-w-[170px] sm:max-w-[240px] font-display">
                    {currentTopic.name}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      className="absolute left-0 top-full mt-1.5 z-50 w-72 sm:w-80 max-w-[calc(100vw-2rem)] p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-1"
                    >
                      <div className="px-2.5 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Chọn chủ đề luyện viết:
                      </div>
                      {allTopics.map((topic) => {
                        const isSelected = topic.id === selectedTopicId;
                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => {
                              onSelectTopic(topic);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left p-2 rounded-xl flex items-center justify-between text-xs font-semibold cursor-pointer transition-all ${
                              isSelected
                                ? "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-bold border border-blue-200/60 dark:border-blue-800/40"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span>{TOPIC_ICONS[topic.id]}</span>
                              <div className="truncate">
                                <div className="text-xs font-bold truncate text-slate-900 dark:text-white">
                                  {topic.name}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                  {topic.description}
                                </div>
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="w-4 h-4 text-[#0059bb] shrink-0 stroke-[3]" />
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                Báo Cáo Buổi Luyện Viết
              </span>
            )}

            <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-xs font-bold font-mono border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
              {currentTopic.level}
            </span>
          </div>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
            {isSessionCompleted
              ? `Đã hoàn thành buổi đánh giá chủ đề "${currentTopic.name}"`
              : currentTopic.description}
          </p>
        </div>
      </div>

      {/* Mobile Right Action */}
      <div className="flex sm:hidden items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 pt-2">
        <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 text-xs font-bold font-mono tabular-nums flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>{formatElapsedTime(elapsedTime)}</span>
        </span>

        {isSessionCompleted ? (
          <button
            type="button"
            onClick={onRestartNewSession}
            className="h-8 px-3 rounded-xl bg-[#0059bb] text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Buổi mới</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onFinishConversation}
            className="h-8 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer active:scale-95 transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Chấm điểm</span>
          </button>
        )}
      </div>
    </div>
  );
}
