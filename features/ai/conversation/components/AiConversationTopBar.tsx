"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  ChevronDown,
  CheckCircle2,
  Bot,
  SlidersHorizontal,
  Search,
  X,
  Volume2,
  VolumeX,
  History,
} from "lucide-react";
import { Topic, AiPersona, ConversationDifficulty } from "../types";
import { TOPIC_ICONS } from "../data/aiTopics";

interface AiConversationTopBarProps {
  currentTopic: Topic;
  allTopics?: Topic[];
  selectedTopicId?: string;
  onSelectTopic?: (topic: Topic) => void;
  isSessionCompleted?: boolean;
  elapsedTime?: number;
  formatElapsedTime?: (seconds: number) => string;
  onRestartNewSession?: () => void;
  onFinishConversation?: () => void;
  currentPersona?: AiPersona;
  allPersonas?: AiPersona[];
  onSelectPersona?: (persona: AiPersona) => void;
  currentDifficulty?: ConversationDifficulty;
  onSelectDifficulty?: (diff: ConversationDifficulty) => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  onOpenHistoryDrawer?: () => void;
  pastSessionsCount?: number;
}

const DIFFICULTIES: ConversationDifficulty[] = ["Beginner", "Intermediate", "Advanced"];

export function AiConversationTopBar({
  currentTopic,
  allTopics = [],
  onSelectTopic,
  onFinishConversation,
  currentPersona,
  allPersonas = [],
  onSelectPersona,
  currentDifficulty = "Beginner",
  onSelectDifficulty,
  soundEnabled = true,
  onToggleSound,
  onOpenHistoryDrawer,
  pastSessionsCount = 0,
}: AiConversationTopBarProps) {
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [topicSearchQuery, setTopicSearchQuery] = useState("");
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsTopicOpen(false);
        setIsPersonaOpen(false);
        setIsDiffOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTopics = allTopics.filter(
    (t) =>
      t.name.toLowerCase().includes(topicSearchQuery.toLowerCase()) ||
      t.nameEn.toLowerCase().includes(topicSearchQuery.toLowerCase()),
  );

  return (
    <div
      ref={containerRef}
      className="relative z-30 flex items-center justify-between gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800/80 shrink-0"
    >
      {/* Left: Topic Selector + Persona + Difficulty (Single Row) */}
      <div className="flex items-center gap-1.5 min-w-0">
        {/* 1. Topic Dropdown Selector (Rule 2: Searchable & Scrollable) */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => {
              setIsTopicOpen(!isTopicOpen);
              setIsPersonaOpen(false);
              setIsDiffOpen(false);
            }}
            className="h-8.5 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/90 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-extrabold text-slate-900 dark:text-white inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs whitespace-nowrap"
            title="Đổi kịch bản tình huống giao tiếp"
          >
            <span className="shrink-0 flex items-center">
              {TOPIC_ICONS[currentTopic.id] || (
                <MessageSquare className="w-3.5 h-3.5 text-[#0059bb]" strokeWidth={2.2} />
              )}
            </span>
            <span>{currentTopic.name}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
                isTopicOpen ? "rotate-180 text-[#0059bb]" : ""
              }`}
              strokeWidth={2.2}
            />
          </button>

          {isTopicOpen && allTopics.length > 0 && (
            <div className="absolute left-0 top-full mt-1.5 w-80 sm:w-88 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* Rule 2 & Rule 12: Search input inside topic selector */}
              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={topicSearchQuery}
                  onChange={(e) => setTopicSearchQuery(e.target.value)}
                  placeholder="Gõ tên chủ đề (VD: Nhà hàng, Sân bay, AI)..."
                  aria-label="Tìm kiếm chủ đề hội thoại"
                  className="w-full pl-8 pr-7 py-1.5 text-xs font-semibold bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb]"
                />
                {topicSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setTopicSearchQuery("")}
                    aria-label="Xóa tìm kiếm chủ đề"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="space-y-1 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
                {filteredTopics.length === 0 ? (
                  <p className="text-xs font-semibold text-slate-400 text-center py-4">
                    Không tìm thấy chủ đề phù hợp
                  </p>
                ) : (
                  filteredTopics.map((topic) => {
                    const isSelected = topic.id === currentTopic.id;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => {
                          setIsTopicOpen(false);
                          setTopicSearchQuery("");
                          onSelectTopic?.(topic);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? "bg-blue-50/90 dark:bg-sky-950/50 text-[#0059bb] dark:text-sky-400 font-bold border border-blue-200/60 dark:border-sky-800/50"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="shrink-0">
                            {TOPIC_ICONS[topic.id] || <MessageSquare className="w-4 h-4" />}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold leading-snug">{topic.name}</p>
                            <p className="text-xs text-slate-400 font-semibold">
                              {topic.nameEn} • {topic.level}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* 2. Persona Selector Dropdown */}
        {currentPersona && allPersonas.length > 0 && (
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsPersonaOpen(!isPersonaOpen);
                setIsTopicOpen(false);
                setIsDiffOpen(false);
              }}
              className="h-8.5 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              title="Đổi bạn học AI & giọng phát âm"
            >
              <Bot className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0" />
              <span>{currentPersona.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {isPersonaOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-60 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl p-1.5 z-50">
                <p className="px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Chọn đối tác AI
                </p>
                {allPersonas.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setIsPersonaOpen(false);
                      onSelectPersona?.(p);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                      p.id === currentPersona.id
                        ? "bg-blue-50 dark:bg-sky-950/50 text-[#0059bb] dark:text-sky-400 font-bold"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                    }`}
                  >
                    <div>
                      <p className="font-bold">
                        {p.name} ({p.roleTitle})
                      </p>
                      <p className="text-xs text-slate-400">{p.description}</p>
                    </div>
                    {p.id === currentPersona.id && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0059bb] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Difficulty Selector Dropdown */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => {
              setIsDiffOpen(!isDiffOpen);
              setIsTopicOpen(false);
              setIsPersonaOpen(false);
            }}
            className="h-8.5 px-2 xl:px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
            title="Đổi độ khó câu trả lời AI"
          >
            <SlidersHorizontal className="w-3 h-3 text-slate-500 shrink-0" />
            <span>
              {currentDifficulty === "Beginner"
                ? "Dễ"
                : currentDifficulty === "Intermediate"
                  ? "Vừa"
                  : "Khó"}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
          </button>

          {isDiffOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl p-1.5 z-50">
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => {
                    setIsDiffOpen(false);
                    onSelectDifficulty?.(diff);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    currentDifficulty === diff
                      ? "bg-blue-50 dark:bg-sky-950/50 text-[#0059bb] dark:text-sky-400"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <span>
                    {diff === "Beginner"
                      ? "Dễ (Beginner)"
                      : diff === "Intermediate"
                        ? "Vừa (Intermediate)"
                        : "Khó (Advanced)"}
                  </span>
                  {currentDifficulty === diff && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0059bb]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Studio Controls (Sound, History, Tonal Emerald Evaluate) */}
      <div className="flex items-center gap-1.5 shrink-0">
        {onToggleSound && (
          <button
            type="button"
            onClick={onToggleSound}
            title={soundEnabled ? "Tắt tự động phát âm" : "Bật tự động phát âm"}
            className={`h-8.5 px-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              soundEnabled
                ? "bg-blue-50/80 dark:bg-sky-950/40 text-[#0059bb] dark:text-sky-400 border-blue-200/70 dark:border-sky-800/50"
                : "bg-slate-50 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 shrink-0" />
            )}
            <span>{soundEnabled ? "Bật âm" : "Tắt âm"}</span>
          </button>
        )}

        {onOpenHistoryDrawer && (
          <button
            type="button"
            onClick={() => {
              setIsTopicOpen(false);
              setIsPersonaOpen(false);
              setIsDiffOpen(false);
              onOpenHistoryDrawer();
            }}
            className="h-8.5 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            title="Xem lịch sử hội thoại AI"
          >
            <History className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0" />
            <span>Lịch sử</span>
            {pastSessionsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-950 text-[#0059bb] dark:text-sky-300 text-xs font-extrabold font-mono">
                {pastSessionsCount}
              </span>
            )}
          </button>
        )}

        {/* Rule 18: Secondary Tonal Emerald Pill (Single Primary CTA reserved for Mic/Send) */}
        {onFinishConversation && (
          <button
            type="button"
            onClick={() => {
              setIsTopicOpen(false);
              setIsPersonaOpen(false);
              setIsDiffOpen(false);
              onFinishConversation();
            }}
            className="h-8.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-600 dark:bg-emerald-950/50 dark:hover:bg-emerald-600 text-emerald-700 hover:text-white dark:text-emerald-300 dark:hover:text-white border border-emerald-200/90 dark:border-emerald-800/70 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            title="Hoàn thành và chấm điểm buổi nói"
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Chấm điểm</span>
          </button>
        )}
      </div>
    </div>
  );
}
