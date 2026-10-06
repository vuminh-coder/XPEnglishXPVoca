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
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { Topic, AiPersona } from "../types";
import { TOPIC_ICONS } from "../data/aiTopics";
import { AI_PERSONAS, DEFAULT_AI_PERSONA } from "../data/aiPersonas";

export type ConversationDifficulty = "Beginner" | "Intermediate" | "Advanced";

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
  // Persona & Difficulty Extensions
  currentPersona?: AiPersona;
  allPersonas?: AiPersona[];
  onSelectPersona?: (persona: AiPersona) => void;
  currentDifficulty?: ConversationDifficulty;
  onSelectDifficulty?: (difficulty: ConversationDifficulty) => void;
}

const DIFFICULTY_CONFIG: Record<
  ConversationDifficulty,
  { label: string; badgeClass: string; desc: string }
> = {
  Beginner: {
    label: "Beginner",
    badgeClass:
      "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/70 dark:border-emerald-800/50",
    desc: "A1-A2: Câu ngắn gọn, từ vựng thông dụng dễ tiếp thu",
  },
  Intermediate: {
    label: "Intermediate",
    badgeClass:
      "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border-blue-200/70 dark:border-blue-800/50",
    desc: "B1-B2: Giao tiếp tự nhiên, cụm từ đàm thoại hàng ngày",
  },
  Advanced: {
    label: "Advanced",
    badgeClass:
      "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/70 dark:border-purple-800/50",
    desc: "C1-C2: Thành ngữ bản xứ, từ vựng chuyên sâu & phản biện",
  },
};

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
  currentPersona = DEFAULT_AI_PERSONA,
  allPersonas = AI_PERSONAS,
  onSelectPersona,
  currentDifficulty,
  onSelectDifficulty,
}: AiConversationTopBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const personaRef = useRef<HTMLDivElement>(null);
  const difficultyRef = useRef<HTMLDivElement>(null);

  const activeLevel: ConversationDifficulty =
    currentDifficulty || (currentTopic.level as ConversationDifficulty) || "Beginner";

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
      if (personaRef.current && !personaRef.current.contains(target)) {
        setIsPersonaOpen(false);
      }
      if (difficultyRef.current && !difficultyRef.current.contains(target)) {
        setIsDifficultyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="shrink-0 relative">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/50 flex items-center justify-center text-[#0059bb] dark:text-sky-400 shadow-2xs">
            {TOPIC_ICONS[currentTopic.id] || <MessageSquare className="w-4 h-4" />}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {!isSessionCompleted ? (
              <>
                {/* 1. Topic Selector Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                      setIsPersonaOpen(false);
                      setIsDifficultyOpen(false);
                    }}
                    className="px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 hover:border-[#0059bb] text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                  >
                    <span className="truncate max-w-[140px] sm:max-w-[200px] font-display">
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
                          Chọn chủ đề hội thoại:
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

                {/* 2. Persona Selector Dropdown */}
                {onSelectPersona && (
                  <div className="relative" ref={personaRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsPersonaOpen(!isPersonaOpen);
                        setIsDropdownOpen(false);
                        setIsDifficultyOpen(false);
                      }}
                      className="px-2 py-1 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/50 hover:border-purple-500 text-xs font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                      title="Chọn Persona AI"
                    >
                      <span className="text-sm" aria-hidden>{currentPersona.avatarEmoji}</span>
                      <span className="truncate max-w-[90px] sm:max-w-[120px]">
                        {currentPersona.name}
                      </span>
                      <ChevronDown
                        className={`w-3 h-3 text-purple-400 shrink-0 transition-transform ${
                          isPersonaOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isPersonaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.98 }}
                          className="absolute left-0 top-full mt-1.5 z-50 w-72 sm:w-80 max-w-[calc(100vw-2rem)] p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-1"
                        >
                          <div className="px-2.5 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                            <span>Chọn Persona Bạn Học AI:</span>
                          </div>
                          {allPersonas.map((persona) => {
                            const isSelected = persona.id === currentPersona.id;
                            return (
                              <button
                                key={persona.id}
                                type="button"
                                onClick={() => {
                                  onSelectPersona(persona);
                                  setIsPersonaOpen(false);
                                }}
                                className={`w-full text-left p-2 rounded-xl flex items-center justify-between text-xs font-semibold cursor-pointer transition-all ${
                                  isSelected
                                    ? "bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 font-bold border border-purple-300 dark:border-purple-800"
                                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-transparent"
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className="text-xl shrink-0">{persona.avatarEmoji}</span>
                                  <div className="truncate">
                                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                      <span>{persona.name}</span>
                                      <span className="text-[10px] font-normal text-purple-600 dark:text-purple-400 font-mono">
                                        ({persona.roleTitle})
                                      </span>
                                    </div>
                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                      {persona.description}
                                    </div>
                                  </div>
                                </div>
                                {isSelected && (
                                  <Check className="w-4 h-4 text-purple-600 shrink-0 stroke-[3]" />
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* 3. Difficulty Level Selector */}
                {onSelectDifficulty ? (
                  <div className="relative" ref={difficultyRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsDifficultyOpen(!isDifficultyOpen);
                        setIsDropdownOpen(false);
                        setIsPersonaOpen(false);
                      }}
                      className={`px-2 py-0.5 rounded-lg text-xs font-bold font-mono border shadow-2xs flex items-center gap-1 cursor-pointer transition-all active:scale-95 ${DIFFICULTY_CONFIG[activeLevel].badgeClass}`}
                      title="Chọn độ khó hội thoại"
                    >
                      <span>{activeLevel}</span>
                      <SlidersHorizontal className="w-2.5 h-2.5 opacity-70" />
                    </button>

                    <AnimatePresence>
                      {isDifficultyOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.98 }}
                          className="absolute left-0 top-full mt-1.5 z-50 w-64 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-1"
                        >
                          <div className="px-2.5 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Độ khó thích ứng AI:
                          </div>
                          {(["Beginner", "Intermediate", "Advanced"] as ConversationDifficulty[]).map(
                            (diff) => {
                              const isSelected = diff === activeLevel;
                              const cfg = DIFFICULTY_CONFIG[diff];
                              return (
                                <button
                                  key={diff}
                                  type="button"
                                  onClick={() => {
                                    onSelectDifficulty(diff);
                                    setIsDifficultyOpen(false);
                                  }}
                                  className={`w-full text-left p-2 rounded-xl flex items-center justify-between text-xs transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-slate-100 dark:bg-slate-800 font-bold"
                                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span
                                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono border ${cfg.badgeClass}`}
                                      >
                                        {diff}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                      {cfg.desc}
                                    </p>
                                  </div>
                                  {isSelected && (
                                    <Check className="w-4 h-4 text-[#0059bb] shrink-0 stroke-[3]" />
                                  )}
                                </button>
                              );
                            }
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs font-bold font-mono border shadow-2xs ${DIFFICULTY_CONFIG[activeLevel].badgeClass}`}
                  >
                    {activeLevel}
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                Báo Cáo Buổi Hội Thoại
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate mt-0.5">
            {isSessionCompleted
              ? `Đã hoàn thành buổi hội thoại chủ đề "${currentTopic.name}" với ${currentPersona.name}`
              : `${currentTopic.description} • Đồng hành: ${currentPersona.name} (${currentPersona.roleTitle})`}
          </p>
        </div>
      </div>

      {/* Desktop / Mobile Action Area */}
      <div className="flex items-center justify-between sm:justify-end gap-2 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 pt-1.5 sm:pt-0 mt-0.5 sm:mt-0">
        <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 text-[11px] font-bold font-mono tabular-nums flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
          <span>{formatElapsedTime(elapsedTime)}</span>
        </span>

        {isSessionCompleted ? (
          <button
            type="button"
            onClick={onRestartNewSession}
            className="h-8 px-3 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Luyện Lại</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onFinishConversation}
            className="h-8 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Chấm Điểm & Kết Thúc</span>
          </button>
        )}
      </div>
    </div>
  );
}
