"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Check,
  MessageSquare,
  Sparkles,
  SlidersHorizontal,
  Search,
  Bot,
  Briefcase,
  GraduationCap,
  X,
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
  elapsedTime?: number;
  formatElapsedTime?: (seconds: number) => string;
  onRestartNewSession?: () => void;
  onFinishConversation?: () => void;
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

const PERSONA_ICONS: Record<string, React.ReactNode> = {
  native_friend: <Bot className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />,
  strict_interviewer: <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
  patient_tutor: <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
  challenging_debater: <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
};

export function AiConversationTopBar({
  currentTopic,
  allTopics,
  selectedTopicId,
  onSelectTopic,
  isSessionCompleted,
  currentPersona = DEFAULT_AI_PERSONA,
  allPersonas = AI_PERSONAS,
  onSelectPersona,
  currentDifficulty,
  onSelectDifficulty,
}: AiConversationTopBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
  const [topicSearchQuery, setTopicSearchQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const personaRef = useRef<HTMLDivElement>(null);
  const difficultyRef = useRef<HTMLDivElement>(null);

  const activeLevel: ConversationDifficulty =
    currentDifficulty || (currentTopic.level as ConversationDifficulty) || "Beginner";

  // Lọc chủ đề theo từ khóa tìm kiếm
  const filteredTopics = useMemo(() => {
    if (!topicSearchQuery.trim()) return allTopics;
    const q = topicSearchQuery.toLowerCase();
    return allTopics.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.nameEn.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [allTopics, topicSearchQuery]);

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
    <div className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3 shrink-0 select-none">
      {/* CỘT TRÁI: TOPIC ICON & TOPIC SELECTOR VỚI TÌM KIẾM */}
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="shrink-0">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/50 flex items-center justify-center text-[#0059bb] dark:text-sky-400 shadow-2xs">
            {TOPIC_ICONS[currentTopic.id] || <MessageSquare className="w-4 h-4" />}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {!isSessionCompleted ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                    setIsPersonaOpen(false);
                    setIsDifficultyOpen(false);
                  }}
                  className="h-8.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100/90 dark:bg-slate-800/90 dark:hover:bg-slate-700/80 border border-slate-200/90 dark:border-slate-700 hover:border-[#0059bb] text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-95"
                >
                  <span className="truncate max-w-[200px] sm:max-w-[280px] font-display">
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
                      className="absolute left-0 top-full mt-1.5 z-50 w-72 sm:w-84 max-w-[calc(100vw-2rem)] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col"
                    >
                      {/* Ô TÌM KIẾM CHỦ ĐỀ */}
                      <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={topicSearchQuery}
                            onChange={(e) => setTopicSearchQuery(e.target.value)}
                            placeholder="Tìm kiếm chủ đề hội thoại..."
                            className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200/80 dark:border-slate-700 focus:outline-none focus:border-[#0059bb] transition-colors"
                            autoFocus
                          />
                          {topicSearchQuery && (
                            <button
                              type="button"
                              onClick={() => setTopicSearchQuery("")}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* DANH SÁCH CHỦ ĐỀ */}
                      <div className="max-h-64 overflow-y-auto scrollbar-thin p-1.5 space-y-1">
                        {filteredTopics.length > 0 ? (
                          filteredTopics.map((topic) => {
                            const isSelected = topic.id === selectedTopicId;
                            return (
                              <button
                                key={topic.id}
                                type="button"
                                onClick={() => {
                                  onSelectTopic(topic);
                                  setIsDropdownOpen(false);
                                  setTopicSearchQuery("");
                                }}
                                className={`w-full text-left p-2 rounded-xl flex items-center justify-between text-xs font-semibold cursor-pointer transition-all ${
                                  isSelected
                                    ? "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-bold border border-blue-200/60 dark:border-blue-800/40"
                                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-transparent"
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className="shrink-0">{TOPIC_ICONS[topic.id] || <MessageSquare className="w-4 h-4" />}</span>
                                  <div className="truncate">
                                    <div className="text-xs font-bold truncate text-slate-900 dark:text-white">
                                      {topic.name}
                                    </div>
                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                      {topic.nameEn} • {topic.level}
                                    </div>
                                  </div>
                                </div>
                                {isSelected && (
                                  <Check className="w-4 h-4 text-[#0059bb] shrink-0 stroke-[3]" />
                                )}
                              </button>
                            );
                          })
                        ) : (
                          <div className="py-6 text-center text-xs text-slate-400">
                            Không tìm thấy chủ đề phù hợp
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                Báo Cáo Buổi Hội Thoại
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
            {isSessionCompleted
              ? `Đã hoàn thành buổi hội thoại chủ đề "${currentTopic.name}"`
              : currentTopic.description}
          </p>
        </div>
      </div>

      {/* CỘT PHẢI: THAY THẾ CHỖ VỪA XÓA BẰNG CỤM PERSONA & ĐỘ KHÓ VỚI ICON VÀ MÀU SẮC HỢP LÝ */}
      {!isSessionCompleted && (
        <div className="flex items-center gap-2 shrink-0">
          {/* 1. Persona Selector Dropdown */}
          {onSelectPersona && (
            <div className="relative" ref={personaRef}>
              <button
                type="button"
                onClick={() => {
                  setIsPersonaOpen(!isPersonaOpen);
                  setIsDropdownOpen(false);
                  setIsDifficultyOpen(false);
                }}
                className="h-8.5 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/90 dark:bg-slate-800/90 dark:hover:bg-slate-700/80 border border-slate-200/90 dark:border-slate-700 hover:border-[#0059bb] text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-95"
                title="Chọn Huấn luyện viên AI (Persona)"
              >
                <span className="w-5 h-5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-2xs">
                  {PERSONA_ICONS[currentPersona.id] || <Bot className="w-3.5 h-3.5 text-[#0059bb]" />}
                </span>
                <span className="truncate max-w-[100px] text-xs font-bold">
                  {currentPersona.name}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-slate-400 shrink-0 transition-transform ${
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
                    className="absolute right-0 top-full mt-1.5 z-50 w-72 sm:w-80 max-w-[calc(100vw-2rem)] p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-1"
                  >
                    <div className="px-2.5 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-[#0059bb]" />
                      <span>Huấn luyện viên AI:</span>
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
                              ? "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-bold border border-blue-200/70 dark:border-blue-800/50"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                              {PERSONA_ICONS[persona.id] || <Bot className="w-4 h-4 text-[#0059bb]" />}
                            </span>
                            <div className="truncate">
                              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>{persona.name}</span>
                                <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400 font-mono">
                                  ({persona.roleTitle})
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                {persona.description}
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
          )}

          {/* 2. Difficulty Level Selector */}
          {onSelectDifficulty ? (
            <div className="relative" ref={difficultyRef}>
              <button
                type="button"
                onClick={() => {
                  setIsDifficultyOpen(!isDifficultyOpen);
                  setIsDropdownOpen(false);
                  setIsPersonaOpen(false);
                }}
                className="h-8.5 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/90 dark:bg-slate-800/90 dark:hover:bg-slate-700/80 border border-slate-200/90 dark:border-slate-700 hover:border-[#0059bb] text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-95"
                title="Chọn độ khó hội thoại"
              >
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono border ${DIFFICULTY_CONFIG[activeLevel].badgeClass}`}>
                  {activeLevel}
                </span>
                <SlidersHorizontal className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {isDifficultyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    className="absolute right-0 top-full mt-1.5 z-50 w-64 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-1"
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
        </div>
      )}
    </div>
  );
}
