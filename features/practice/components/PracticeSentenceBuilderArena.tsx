"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { PracticeWord, SentenceWordToken } from "../types";
import {
  playSuccessDing,
  playWrongBuzz,
  playTilePop,
} from "@/shared/utils/soundEffects";
import { useAuthStore } from "@/stores/authStore";

interface PracticeSentenceBuilderArenaProps {
  currentWord: PracticeWord;
  vocabs: PracticeWord[];
  playWordAudio?: (text: string) => void;
  onNextQuestion: () => void;
  currentIndex: number;
  totalWords: number;
}

// Clean punctuation for matching
function cleanToken(str: string): string {
  return str.replace(/[.,!?;:"'()]/g, "").trim().toLowerCase();
}

function cleanSentence(str: string): string {
  return str
    .split(/\s+/)
    .map(cleanToken)
    .filter(Boolean)
    .join(" ");
}

export function PracticeSentenceBuilderArena({
  currentWord,
  vocabs,
  playWordAudio,
  onNextQuestion,
  currentIndex,
  totalWords,
}: PracticeSentenceBuilderArenaProps) {
  const awardXp = useAuthStore((s) => s.awardXp);

  // Target sentence in English and prompt in Vietnamese
  const targetEnSentence = useMemo(() => {
    if (currentWord?.example && currentWord.example.trim().length > 3) {
      return currentWord.example.trim();
    }
    return `We use ${currentWord.word} in our daily conversation.`;
  }, [currentWord]);

  const promptViSentence = useMemo(() => {
    if (currentWord?.exampleVi && currentWord.exampleVi.trim().length > 3) {
      return currentWord.exampleVi.trim();
    }
    return `Hãy dịch câu sử dụng từ "${currentWord.word}" (${currentWord.meaning}).`;
  }, [currentWord]);

  // Break sentence into words and add 2-3 distractor words
  const initialWordTokens = useMemo(() => {
    const rawWords = targetEnSentence
      .split(/\s+/)
      .map((w) => w.replace(/[.,!?;:"'()]/g, "").trim())
      .filter((w) => w.length > 0);

    const tokens: SentenceWordToken[] = rawWords.map((word, idx) => ({
      id: `target_${word}_${idx}`,
      text: word,
      isDistractor: false,
    }));

    // Find 2 distractor words from other vocabs
    const otherWords = vocabs
      .filter((v) => v.word !== currentWord.word)
      .map((v) => v.word);

    const distractorCandidates = ["always", "never", "very", "often", "they", "we", "with", ...otherWords];
    const pickedDistractors = distractorCandidates
      .filter((w) => !rawWords.map((rw) => rw.toLowerCase()).includes(w.toLowerCase()))
      .slice(0, 2);

    pickedDistractors.forEach((dist, idx) => {
      tokens.push({
        id: `distractor_${dist}_${idx}`,
        text: dist,
        isDistractor: true,
      });
    });

    // Scramble tokens using deterministic Fisher-Yates
    const scrambled = [...tokens];
    for (let i = scrambled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
    }

    return scrambled;
  }, [targetEnSentence, vocabs, currentWord]);

  // State
  const [bankTokens, setBankTokens] = useState<SentenceWordToken[]>(initialWordTokens);
  const [placedTokens, setPlacedTokens] = useState<SentenceWordToken[]>([]);
  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "incorrect">("idle");
  const [showHint, setShowHint] = useState(false);

  // Reset when currentWord changes
  useEffect(() => {
    setBankTokens(initialWordTokens);
    setPlacedTokens([]);
    setFeedbackState("idle");
    setShowHint(false);
  }, [initialWordTokens]);

  // Handle clicking a token in the Word Bank -> moves to Answer Tray
  const handleSelectBankToken = useCallback(
    (token: SentenceWordToken) => {
      if (feedbackState !== "idle") return;
      playTilePop();
      setBankTokens((prev) => prev.filter((t) => t.id !== token.id));
      setPlacedTokens((prev) => [...prev, token]);
    },
    [feedbackState]
  );

  // Handle clicking a token in the Answer Tray -> returns to Word Bank
  const handleRemovePlacedToken = useCallback(
    (token: SentenceWordToken) => {
      if (feedbackState !== "idle") return;
      playTilePop();
      setPlacedTokens((prev) => prev.filter((t) => t.id !== token.id));
      setBankTokens((prev) => [...prev, token]);
    },
    [feedbackState]
  );

  // Handle Check
  const handleCheckAnswer = () => {
    if (placedTokens.length === 0) return;

    const placedSentenceClean = cleanSentence(placedTokens.map((t) => t.text).join(" "));
    const targetSentenceClean = cleanSentence(targetEnSentence);

    if (placedSentenceClean === targetSentenceClean) {
      // CORRECT!
      playSuccessDing();
      setFeedbackState("correct");
      awardXp(15);
      if (playWordAudio) {
        playWordAudio(targetEnSentence);
      }
    } else {
      // INCORRECT!
      playWrongBuzz();
      setFeedbackState("incorrect");
    }
  };

  const handleRetry = () => {
    setFeedbackState("idle");
  };

  const handleNext = () => {
    onNextQuestion();
  };

  const handleSpeakSentence = () => {
    if (playWordAudio) {
      playWordAudio(targetEnSentence);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between min-h-0 space-y-3 sm:space-y-4">
      {/* 1. TOP HEADER & PROMPT BOX */}
      <div className="space-y-3 shrink-0">
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
          <span className="uppercase tracking-wider">Dịch và ghép câu tiếng Anh</span>
          <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400">
            Câu {currentIndex + 1}/{totalWords}
          </span>
        </div>

        {/* Vietnamese Prompt Card with Character Dialogue Style */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-start gap-3">
          <button
            type="button"
            onClick={handleSpeakSentence}
            className="w-10 h-10 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-sm active:scale-95 transition-transform"
            title="Nghe phát âm câu tiếng Anh mẫu"
          >
            <Volume2 className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0 pt-0.5 space-y-1">
            <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <span>Nghĩa tiếng Việt</span>
              <span className="px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/60 text-[#0059bb] dark:text-blue-300 text-[10px] font-black">
                {currentWord.word}
              </span>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {promptViSentence}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowHint((prev) => !prev)}
            className="p-2 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            title="Xem gợi ý"
          >
            <Lightbulb className={`w-4 h-4 ${showHint ? "text-amber-500 fill-amber-500" : ""}`} />
          </button>
        </div>

        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>Từ khóa chính cần dùng: <strong className="font-bold underline">{currentWord.word}</strong> ({currentWord.meaning})</span>
          </motion.div>
        )}
      </div>

      {/* 2. ANSWER TRAY (KHAY GHÉP CÂU HOÀN CHỈNH) */}
      <div className="flex-1 flex flex-col min-h-[110px] sm:min-h-[140px] p-3 sm:p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 relative overflow-y-auto">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 select-none">
          Câu bạn đang ghép:
        </div>

        {placedTokens.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-xs sm:text-sm text-slate-400 italic select-none">
            Chạm các khối từ bên dưới để xếp thành câu hoàn chỉnh...
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 sm:gap-2.5 items-center content-start">
            <AnimatePresence>
              {placedTokens.map((token) => (
                <motion.button
                  key={token.id}
                  layout
                  initial={{ scale: 0.8, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  type="button"
                  onClick={() => handleRemovePlacedToken(token)}
                  className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border-2 border-b-4 border-[#0059bb] border-b-[#004899] bg-white dark:bg-slate-800 text-[#0059bb] dark:text-blue-300 text-sm sm:text-base font-bold shadow-xs active:border-b-2 active:translate-y-0.5 cursor-pointer hover:bg-blue-50/50 transition-all select-none"
                >
                  {token.text}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* 3. WORD BANK (NGÂN HÀNG KHỐI TỪ VỰNG DUOLINGO TILES) */}
      <div className="space-y-2 shrink-0">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
          Khối từ vựng (Word Bank):
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-2.5 min-h-[90px] p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 items-center justify-center content-center">
          {bankTokens.length === 0 ? (
            <span className="text-xs text-slate-400 select-none">Đã chọn hết tất cả các khối từ.</span>
          ) : (
            bankTokens.map((token) => (
              <motion.button
                key={token.id}
                layout
                whileTap={{ y: 2 }}
                type="button"
                onClick={() => handleSelectBankToken(token)}
                className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm sm:text-base font-bold shadow-xs hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 active:border-b-2 active:translate-y-0.5 cursor-pointer transition-all select-none"
              >
                {token.text}
              </motion.button>
            ))
          )}
        </div>
      </div>

      {/* 4. DUOLINGO BOTTOM ACTION & SLIDE-UP FEEDBACK SHEET */}
      <div className="pt-2 shrink-0">
        {feedbackState === "idle" ? (
          <div className="flex items-center justify-end">
            <button
              type="button"
              disabled={placedTokens.length === 0}
              onClick={handleCheckAnswer}
              className="w-full sm:w-auto min-w-[160px] h-12 px-6 rounded-2xl border-2 border-b-4 border-[#004899] bg-[#0059bb] hover:bg-[#004899] disabled:opacity-40 disabled:pointer-events-none text-white text-sm sm:text-base font-bold shadow-md shadow-blue-500/20 active:border-b-2 active:translate-y-0.5 cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Kiểm Tra</span>
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg
              ${
                feedbackState === "correct"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-100"
                  : "border-rose-500 bg-rose-50 dark:bg-rose-950/80 text-rose-900 dark:text-rose-100"
              }
            `}
          >
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {feedbackState === "correct" ? (
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <XCircle className="w-6 h-6 stroke-[2.5]" />
                </div>
              )}

              <div className="space-y-0.5 min-w-0">
                <div className="text-base font-black flex items-center gap-2">
                  <span>{feedbackState === "correct" ? "Chính xác! Bạn làm rất tốt!" : "Chưa chính xác!"}</span>
                  {feedbackState === "correct" && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold">
                      +15 XP
                    </span>
                  )}
                </div>
                {feedbackState === "incorrect" && (
                  <p className="text-xs sm:text-sm text-rose-800 dark:text-rose-200">
                    Đáp án đúng: <strong className="font-bold underline">{targetEnSentence}</strong>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              {feedbackState === "incorrect" && (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="flex-1 sm:flex-initial h-11 px-4 rounded-xl border border-rose-300 dark:border-rose-700 bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-300 text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-rose-100 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Thử lại</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className={`
                  flex-1 sm:flex-initial h-11 px-6 rounded-xl border-2 border-b-4 text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer active:border-b-2 active:translate-y-0.5 transition-all shadow-md
                  ${
                    feedbackState === "correct"
                      ? "border-emerald-600 bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
                      : "border-rose-600 bg-rose-500 hover:bg-rose-600 shadow-rose-500/20"
                  }
                `}
              >
                <span>Tiếp Tục</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
