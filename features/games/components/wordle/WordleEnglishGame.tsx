"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  RotateCcw,
  Delete,
  Sparkles,
  HelpCircle,
  Volume2,
  VolumeX,
  Lightbulb,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { useNotificationStore } from "@/stores/notificationStore";
import { WordleLetterStatus, WordleRowState, GameReviewItem } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { triggerHaptic } from "../../utils/gameFx";
import { GameResultScreen } from "../shared/GameResultScreen";
import { recordGameSession } from "../../utils/recordGameSession";
import { safeSpeakText } from "@/shared/utils/mobileAudio";

export interface WordleEnglishGameProps {
  pool: any[];
  onBack: () => void;
}

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const FALLBACK_WORDS = [
  { word: "BRAIN", definitionVn: "Bộ não, trí tuệ", ipa: "/breɪn/", pos: "noun" },
  { word: "SMART", definitionVn: "Thông minh, sáng dạ", ipa: "/smɑːrt/", pos: "adj" },
  { word: "LEARN", definitionVn: "Học tập, tiếp thu kiến thức", ipa: "/lɜːrn/", pos: "verb" },
  { word: "FOCUS", definitionVn: "Tập trung cao độ", ipa: "/ˈfoʊ.kəs/", pos: "verb" },
  { word: "HABIT", definitionVn: "Thói quen rèn luyện", ipa: "/ˈhæb.ɪt/", pos: "noun" },
  { word: "SKILL", definitionVn: "Kỹ năng chuyên môn", ipa: "/skɪl/", pos: "noun" },
  { word: "POWER", definitionVn: "Sức mạnh, năng lượng", ipa: "/ˈpaʊ.ɚ/", pos: "noun" },
  { word: "VOICE", definitionVn: "Tiếng nói, phát âm", ipa: "/vɔɪs/", pos: "noun" },
  { word: "PEACE", definitionVn: "Bình yên, thanh thản", ipa: "/piːs/", pos: "noun" },
  { word: "DREAM", definitionVn: "Ước mơ, hoài bão", ipa: "/driːm/", pos: "noun" },
  { word: "LIGHT", definitionVn: "Ánh sáng, sự khai sáng", ipa: "/laɪt/", pos: "noun" },
  { word: "WATER", definitionVn: "Nguồn nước trong lành", ipa: "/ˈwɑː.t̬ɚ/", pos: "noun" },
  { word: "PLANT", definitionVn: "Cây cỏ, gieo mầm", ipa: "/plænt/", pos: "noun" },
  { word: "EARTH", definitionVn: "Trái đất, mảnh đất", ipa: "/ɝːθ/", pos: "noun" },
  { word: "HEART", definitionVn: "Trái tim nhiệt huyết", ipa: "/hɑːrt/", pos: "noun" },
  { word: "SMILE", definitionVn: "Nụ cười rạng rỡ", ipa: "/smaɪl/", pos: "noun" },
  { word: "GUIDE", definitionVn: "Chỉ dẫn, người dẫn đường", ipa: "/ɡaɪd/", pos: "verb" },
  { word: "SHARE", definitionVn: "Chia sẻ, đồng hành", ipa: "/ʃer/", pos: "verb" },
  { word: "SOLVE", definitionVn: "Giải quyết bài toán khó", ipa: "/sɑːlv/", pos: "verb" },
  { word: "VALUE", definitionVn: "Giá trị cốt lõi", ipa: "/ˈvæl.juː/", pos: "noun" },
];

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

export function WordleEnglishGame({ pool, onBack }: WordleEnglishGameProps) {
  const { addToast } = useNotificationStore();

  const [targetPackage, setTargetPackage] = useState<{
    id?: string;
    word: string;
    definitionVn: string;
    ipa?: string;
    pos?: string;
    example?: string;
  }>({ word: "SMART", definitionVn: "Thông minh, sáng dạ", ipa: "/smɑːrt/", pos: "adj" });

  const [guesses, setGuesses] = useState<WordleRowState[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [shakeRow, setShakeRow] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [revealedLetter, setRevealedLetter] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [letterStatuses, setLetterStatuses] = useState<Record<string, WordleLetterStatus>>({});
  const [rewards, setRewards] = useState<{ xp: number; coins: number }>({ xp: 0, coins: 0 });
  const [reviewItems, setReviewItems] = useState<GameReviewItem[]>([]);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    setIsMuted(gameAudio.isMuted());
  }, []);

  const toggleAudio = () => {
    const next = gameAudio.toggleMute();
    setIsMuted(next);
  };

  const speakTarget = (w: string) => {
    safeSpeakText(w, { lang: "en-US", rate: 0.9 });
  };

  // Initialize a new word
  const initGame = useCallback(() => {
    const fiveLetterWords = (pool || [])
      .filter(
        (item) =>
          item.word &&
          item.word.trim().length === WORD_LENGTH &&
          /^[a-zA-Z]+$/.test(item.word.trim())
      )
      .map((item) => ({
        id: String(item.id || item.word),
        word: item.word.trim().toUpperCase(),
        definitionVn: item.definitionVn || item.definition || "Từ vựng tiếng Anh thông dụng",
        ipa: item.phonetic || item.ipa || "",
        pos: item.pos,
        example: item.examples?.[0],
      }));

    const candidateList =
      fiveLetterWords.length >= 3 ? fiveLetterWords : FALLBACK_WORDS;
    const randomPick =
      candidateList[Math.floor(Math.random() * candidateList.length)];

    setTargetPackage(randomPick);
    setGuesses(
      Array.from({ length: MAX_ATTEMPTS }, () => ({
        letters: Array(WORD_LENGTH).fill(""),
        statuses: Array(WORD_LENGTH).fill("empty"),
      }))
    );
    setCurrentGuess("");
    setCurrentRow(0);
    setIsGameOver(false);
    setIsWon(false);
    setShakeRow(false);
    setShowHint(false);
    setRevealedLetter(null);
    setLetterStatuses({});
    setRewards({ xp: 0, coins: 0 });
    setReviewItems([]);
    startTimeRef.current = Date.now();
  }, [pool]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Hint: Reveal one random correct letter
  const handleRevealLetter = () => {
    if (revealedLetter || isGameOver) return;
    const targetWord = targetPackage.word;
    const targetChars = targetWord.split("");
    // Pick first character not yet revealed in letterStatuses as correct
    const unrevealed = targetChars.filter(
      (c) => letterStatuses[c] !== "correct"
    );
    const pick = unrevealed.length > 0 ? unrevealed[0] : targetChars[0];

    setRevealedLetter(pick);
    setLetterStatuses((prev) => ({ ...prev, [pick]: "correct" }));
    triggerHaptic("tap");
        gameAudio.playTap();
    addToast({
      type: "info",
      title: "Gợi ý ký tự!",
      message: `Từ này chắc chắn chứa ký tự "${pick}".`,
    });
  };

  // Evaluate guess when submitted
  const handleGuessSubmit = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH) {
      setShakeRow(true);
      triggerHaptic("warning");
      gameAudio.playWrongBuzzer();
      setTimeout(() => setShakeRow(false), 500);
      return;
    }

    const targetWord = targetPackage.word;
    const guessLetters = currentGuess.toUpperCase().split("");
    const targetLetters = targetWord.split("");
    const newStatuses: WordleLetterStatus[] = Array(WORD_LENGTH).fill("absent");
    const targetLetterCounts: Record<string, number> = {};

    targetLetters.forEach((l) => {
      targetLetterCounts[l] = (targetLetterCounts[l] || 0) + 1;
    });

    // First pass: mark correct positions
    guessLetters.forEach((letter, i) => {
      if (letter === targetLetters[i]) {
        newStatuses[i] = "correct";
        targetLetterCounts[letter] -= 1;
      }
    });

    // Second pass: mark present letters in wrong positions
    guessLetters.forEach((letter, i) => {
      if (newStatuses[i] !== "correct") {
        if (targetLetterCounts[letter] && targetLetterCounts[letter] > 0) {
          newStatuses[i] = "present";
          targetLetterCounts[letter] -= 1;
        } else {
          newStatuses[i] = "absent";
        }
      }
    });

    // Update keyboard statuses
    const updatedKeyboard = { ...letterStatuses };
    guessLetters.forEach((letter, i) => {
      const currentStat = updatedKeyboard[letter];
      const newStat = newStatuses[i];
      if (newStat === "correct") {
        updatedKeyboard[letter] = "correct";
      } else if (newStat === "present" && currentStat !== "correct") {
        updatedKeyboard[letter] = "present";
      } else if (!currentStat) {
        updatedKeyboard[letter] = newStat;
      }
    });
    setLetterStatuses(updatedKeyboard);

    // Update rows
    setGuesses((prev) => {
      const next = [...prev];
      next[currentRow] = {
        letters: guessLetters,
        statuses: newStatuses,
      };
      return next;
    });

    const isGuessCorrect = currentGuess.toUpperCase() === targetWord;

    if (isGuessCorrect) {
      triggerHaptic("victory");
      gameAudio.playVictoryFanfare();
      speakTarget(targetWord);
      setIsWon(true);
      setIsGameOver(true);

      const review: GameReviewItem = {
        id: targetPackage.id,
        word: targetPackage.word,
        phonetic: targetPackage.ipa,
        pos: targetPackage.pos,
        definitionVn: targetPackage.definitionVn,
        example: targetPackage.example,
        isCorrect: true,
        userAnswer: currentGuess,
        correctAnswer: targetPackage.word,
      };
      setReviewItems([review]);

      const durationSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
      recordGameSession({
        gameType: "wordle",
        score: (MAX_ATTEMPTS - currentRow) * 10,
        attempts: currentRow + 1,
        durationSeconds,
      }).then((res) => {
        if (res.success && (res.xpGained > 0 || res.coinsGained > 0)) {
          setRewards({ xp: res.xpGained, coins: res.coinsGained });
          addToast({
            type: "info",
            title: `+${res.xpGained} XP & +${res.coinsGained} Vàng!`,
            message: `Tuyệt vời! Bạn đoán đúng từ "${targetWord}" sau ${currentRow + 1} lượt!`,
          });
        }
      });
    } else {
      if (currentRow + 1 >= MAX_ATTEMPTS) {
        // Game Over - Lost
        triggerHaptic("warning");
      gameAudio.playWrongBuzzer();
        setIsWon(false);
        setIsGameOver(true);

        const review: GameReviewItem = {
          id: targetPackage.id,
          word: targetPackage.word,
          phonetic: targetPackage.ipa,
          pos: targetPackage.pos,
          definitionVn: targetPackage.definitionVn,
          example: targetPackage.example,
          isCorrect: false,
          userAnswer: currentGuess,
          correctAnswer: targetPackage.word,
        };
        setReviewItems([review]);

        addToast({
          type: "info",
          title: `Hết lượt đoán!`,
          message: `Từ chính xác là "${targetWord}". Hãy lưu vào sổ tay ôn tập nhé!`,
        });
      } else {
        triggerHaptic("tap");
        gameAudio.playFlipSound();
        setCurrentRow((r) => r + 1);
        setCurrentGuess("");
      }
    }
  }, [
    currentGuess,
    targetPackage,
    currentRow,
    letterStatuses,
    addToast,
  ]);

  // Key press handlers
  const handleKeyPress = useCallback(
    (key: string) => {
      if (isGameOver) return;

      if (key === "ENTER") {
        handleGuessSubmit();
      } else if (key === "BACKSPACE" || key === "DELETE") {
        triggerHaptic("tap");
        gameAudio.playTap();
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        triggerHaptic("tap");
        gameAudio.playTap();
        setCurrentGuess((prev) => prev + key);
      }
    },
    [isGameOver, handleGuessSubmit, currentGuess.length]
  );

  // Physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key.toUpperCase();
      if (key === "ENTER") {
        e.preventDefault();
        handleKeyPress("ENTER");
      } else if (key === "BACKSPACE") {
        e.preventDefault();
        handleKeyPress("BACKSPACE");
      } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  if (isGameOver && isWon) {
    const xpMap = [60, 50, 40, 35, 30, 25];
    const earnedScore = xpMap[currentRow] || 25;
    const duration = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
    const accuracy = Math.round(((MAX_ATTEMPTS - currentRow) / MAX_ATTEMPTS) * 100);

    return (
      <GameResultScreen
        title={`Chính Xác: ${targetPackage.word}!`}
        subtitle={`${targetPackage.definitionVn} ${targetPackage.ipa ? `(${targetPackage.ipa})` : ""} - Hoàn thành xuất sắc sau ${currentRow + 1} lượt đoán.`}
        score={earnedScore}
        xpEarned={rewards.xp}
        coinsEarned={rewards.coins}
        accuracy={accuracy}
        durationSeconds={duration}
        reviewItems={reviewItems}
        onBack={onBack}
        onRestart={initGame}
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 select-none max-w-lg mx-auto">
      {/* 1. Top Header Bar */}
      <div className="flex items-center justify-between">
        

        <div className="flex items-center gap-2">
          {/* Mute button */}
          <button
            type="button"
            onClick={toggleAudio}
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            className="p-2.5 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer active:scale-90"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-500" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-amber-500" />
            )}
          </button>

          <Badge variant="warning" size="sm">
            <Sparkles className="w-3 h-3 mr-1 text-amber-500 stroke-[2.5]" />
            Lượt {Math.min(currentRow + 1, MAX_ATTEMPTS)}/{MAX_ATTEMPTS}
          </Badge>

          <button
            type="button"
            onClick={() => setShowHint((h) => !h)}
            title="Gợi ý nghĩa tiếng Việt"
            className="py-1.5 px-2.5 rounded-full bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60 text-xs font-bold min-h-[44px] transition-all cursor-pointer flex items-center gap-1 active:scale-95 shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Nghĩa</span>
          </button>

          {!revealedLetter && (
            <button
              type="button"
              onClick={handleRevealLetter}
              title="Mở 1 ký tự gợi ý"
              className="py-1.5 px-2.5 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 border border-blue-200/80 dark:border-blue-800/60 text-xs font-bold min-h-[44px] transition-all cursor-pointer flex items-center gap-1 active:scale-95 shadow-2xs"
            >
              <Lightbulb className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Gợi ký tự</span>
            </button>
          )}

          <button
            type="button"
            onClick={initGame}
            title="Làm mới từ khác"
            className="p-2.5 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer active:scale-90"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* 2. Optional Hint Banner */}
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 text-center space-y-0.5 shadow-2xs"
        >
          <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            Nghĩa từ vựng
          </span>
          <p className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 font-semibold">
            {targetPackage.definitionVn}
          </p>
        </motion.div>
      )}

      {/* 3. Main 6x5 Wordle Board */}
      <div className="flex flex-col items-center gap-1.5 sm:gap-2 py-1">
        {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => {
          const isCurrentRow = rowIndex === currentRow && !isGameOver;
          const rowData = guesses[rowIndex] || {
            letters: Array(WORD_LENGTH).fill(""),
            statuses: Array(WORD_LENGTH).fill("empty"),
          };

          return (
            <motion.div
              key={rowIndex}
              animate={
                isCurrentRow && shakeRow
                  ? { x: [-6, 6, -5, 5, -2, 2, 0] }
                  : { x: 0 }
              }
              transition={{ duration: 0.3 }}
              className="flex gap-1.5 sm:gap-2"
            >
              {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                let char = rowData.letters[colIndex] || "";
                let status = rowData.statuses[colIndex];

                // If this is active typing row
                if (isCurrentRow) {
                  char = currentGuess[colIndex] || "";
                  status = "empty";
                }

                let tileBg =
                  "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white";

                if (status === "correct") {
                  tileBg =
                    "bg-emerald-500 border-emerald-600 text-white shadow-md shadow-emerald-500/20";
                } else if (status === "present") {
                  tileBg =
                    "bg-amber-500 border-amber-600 text-white shadow-md shadow-amber-500/20";
                } else if (status === "absent") {
                  tileBg =
                    "bg-slate-400 dark:bg-slate-700 border-slate-400 dark:border-slate-600 text-white opacity-85";
                } else if (char) {
                  tileBg =
                    "bg-blue-50/60 dark:bg-slate-800 border-[#0059bb] text-[#0059bb] dark:text-sky-400 scale-105";
                }

                return (
                  <motion.div
                    key={colIndex}
                    initial={status !== "empty" ? { rotateX: 90 } : {}}
                    animate={status !== "empty" ? { rotateX: 0 } : {}}
                    transition={{
                      duration: 0.35,
                      delay: colIndex * 0.08,
                      ease: "easeOut",
                    }}
                    className={`w-11 h-12 sm:w-13 sm:h-14 rounded-2xl border flex items-center justify-center text-lg sm:text-xl font-black font-display uppercase transition-all duration-200 select-none shadow-2xs ${tileBg}`}
                  >
                    {char}
                  </motion.div>
                );
              })}
            </motion.div>
          );
        })}
      </div>

      {/* 4. Lost Game Banner */}
      {isGameOver && !isWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/60 text-center space-y-2 shadow-2xs"
        >
          <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            Đáp án chính xác
          </div>
          <div className="text-xl font-black text-rose-700 dark:text-rose-300 font-display flex items-center justify-center gap-2">
            <span>{targetPackage.word} {targetPackage.ipa ? `(${targetPackage.ipa})` : ""}</span>
            <button
              type="button"
              onClick={() => speakTarget(targetPackage.word)}
              title="Nghe phát âm"
              className="p-2.5 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center bg-rose-200/60 dark:bg-rose-800 text-rose-800 dark:text-rose-200 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
            {targetPackage.definitionVn}
          </p>
          <div className="pt-2 flex justify-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold cursor-pointer"
            >
              Quay lại
            </button>
            <button
              type="button"
              onClick={initGame}
              className="py-1.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-500/20 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Thử lại từ khác</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* 5. Virtual QWERTY Keyboard */}
      <div className="space-y-1.5 pt-2">
        {KEYBOARD_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5">
            {row.map((key) => {
              const status = letterStatuses[key];
              const isAction = key === "ENTER" || key === "BACKSPACE";

              let keyStyle =
                "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-700/80";

              if (status === "correct") {
                keyStyle = "bg-emerald-500 text-white border-emerald-600";
              } else if (status === "present") {
                keyStyle = "bg-amber-500 text-white border-amber-600";
              } else if (status === "absent") {
                keyStyle =
                  "bg-slate-300 dark:bg-slate-900/60 text-slate-400 dark:text-slate-500 border-transparent opacity-60";
              }

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleKeyPress(key)}
                  className={`h-10 sm:h-11 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-90 select-none shadow-2xs ${
                    isAction ? "px-2 sm:px-3 text-[11px] font-black" : "w-8 sm:w-9"
                  } ${keyStyle}`}
                >
                  {key === "BACKSPACE" ? (
                    <Delete className="w-4 h-4 stroke-[2.2]" />
                  ) : (
                    key
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
