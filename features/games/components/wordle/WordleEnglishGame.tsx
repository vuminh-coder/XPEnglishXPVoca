"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, Delete, Sparkles, HelpCircle } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { WordleLetterStatus, WordleRowState } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { GameResultScreen } from "../shared/GameResultScreen";

export interface WordleEnglishGameProps {
  pool: any[];
  onBack: () => void;
}

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const FALLBACK_WORDS = [
  { word: "BRAIN", definitionVn: "Bộ não, trí tuệ", ipa: "/breɪn/" },
  { word: "SMART", definitionVn: "Thông minh, sáng dạ", ipa: "/smɑːrt/" },
  { word: "LEARN", definitionVn: "Học tập, tiếp thu kiến thức", ipa: "/lɜːrn/" },
  { word: "FOCUS", definitionVn: "Tập trung cao độ", ipa: "/ˈfoʊ.kəs/" },
  { word: "HABIT", definitionVn: "Thói quen rèn luyện", ipa: "/ˈhæb.ɪt/" },
  { word: "SKILL", definitionVn: "Kỹ năng chuyên môn", ipa: "/skɪl/" },
  { word: "POWER", definitionVn: "Sức mạnh, năng lượng", ipa: "/ˈpaʊ.ɚ/" },
  { word: "VOICE", definitionVn: "Tiếng nói, phát âm", ipa: "/vɔɪs/" },
  { word: "PEACE", definitionVn: "Bình yên, thanh thản", ipa: "/piːs/" },
  { word: "DREAM", definitionVn: "Ước mơ, mục tiêu hoài bão", ipa: "/driːm/" },
  { word: "LIGHT", definitionVn: "Ánh sáng, sự khai sáng", ipa: "/laɪt/" },
  { word: "WATER", definitionVn: "Nguồn nước trong lành", ipa: "/ˈwɑː.t̬ɚ/" },
  { word: "PLANT", definitionVn: "Cây cỏ, gieo mầm", ipa: "/plænt/" },
  { word: "EARTH", definitionVn: "Trái đất, mảnh đất", ipa: "/ɝːθ/" },
  { word: "HEART", definitionVn: "Trái tim nhiệt huyết", ipa: "/hɑːrt/" },
  { word: "SMILE", definitionVn: "Nụ cười rạng rỡ", ipa: "/smaɪl/" },
  { word: "GUIDE", definitionVn: "Chỉ dẫn, người dẫn đường", ipa: "/ɡaɪd/" },
  { word: "SHARE", definitionVn: "Chia sẻ, đồng hành", ipa: "/ʃer/" },
  { word: "SOLVE", definitionVn: "Giải quyết bài toán khó", ipa: "/sɑːlv/" },
  { word: "VALUE", definitionVn: "Giá trị cốt lõi", ipa: "/ˈvæl.juː/" },
];

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

export function WordleEnglishGame({ pool, onBack }: WordleEnglishGameProps) {
  const { awardXp, awardCoins } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [targetPackage, setTargetPackage] = useState<{
    word: string;
    definitionVn: string;
    ipa?: string;
  }>({ word: "SMART", definitionVn: "Thông minh, sáng dạ", ipa: "/smɑːrt/" });

  const [guesses, setGuesses] = useState<WordleRowState[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [shakeRow, setShakeRow] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [letterStatuses, setLetterStatuses] = useState<Record<string, WordleLetterStatus>>({});

  // Initialize a new word
  const initGame = useCallback(() => {
    // Try to find valid 5-letter words from pool
    const fiveLetterWords = (pool || [])
      .filter(
        (item) =>
          item.word &&
          item.word.trim().length === WORD_LENGTH &&
          /^[a-zA-Z]+$/.test(item.word.trim())
      )
      .map((item) => ({
        word: item.word.trim().toUpperCase(),
        definitionVn: item.definitionVn || "Từ vựng tiếng Anh thông dụng",
        ipa: item.ipa || "",
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
    setLetterStatuses({});
  }, [pool]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Evaluate guess when submitted
  const handleGuessSubmit = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH) {
      setShakeRow(true);
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
      gameAudio.playVictoryFanfare();
      setIsWon(true);
      setIsGameOver(true);

      const xpMap = [60, 50, 40, 35, 30, 25];
      const earnedXp = xpMap[currentRow] || 25;

      awardXp(earnedXp);
      awardCoins?.(5);

      fetch("/api/games/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameType: "wordle",
          score: earnedXp,
          xpGained: earnedXp,
          coinsGained: 5,
          moves: currentRow + 1,
        }),
      }).catch((err) => console.warn("Failed to save wordle record to DB:", err));

      addToast({
        type: "xp",
        title: `+${earnedXp} XP & +5 Vàng!`,
        message: `Tuyệt vời! Bạn đoán đúng từ "${targetWord}" sau ${currentRow + 1} lượt!`,
      });
    } else {
      if (currentRow + 1 >= MAX_ATTEMPTS) {
        // Game Over - Lost
        gameAudio.playWrongBuzzer();
        setIsWon(false);
        setIsGameOver(true);

        addToast({
          type: "info",
          title: `Hết lượt đoán!`,
          message: `Từ chính xác là "${targetWord}". Cố gắng lần sau nhé!`,
        });
      } else {
        gameAudio.playFlipSound();
        setCurrentRow((r) => r + 1);
        setCurrentGuess("");
      }
    }
  }, [
    currentGuess,
    targetPackage.word,
    currentRow,
    letterStatuses,
    awardXp,
    awardCoins,
    addToast,
  ]);

  // Key press handlers
  const handleKeyPress = useCallback(
    (key: string) => {
      if (isGameOver) return;

      if (key === "ENTER") {
        handleGuessSubmit();
      } else if (key === "BACKSPACE" || key === "DELETE") {
        gameAudio.playFlipSound();
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        gameAudio.playFlipSound();
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
    const earnedXp = xpMap[currentRow] || 25;
    return (
      <GameResultScreen
        title={`Chính Xác: ${targetPackage.word}!`}
        subtitle={`${targetPackage.definitionVn} ${targetPackage.ipa ? `(${targetPackage.ipa})` : ""} - Hoàn thành sau ${currentRow + 1} lượt đoán.`}
        score={earnedXp}
        xpEarned={earnedXp}
        coinsEarned={5}
        onBack={onBack}
        onRestart={initGame}
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 select-none max-w-lg mx-auto">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="py-1.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>Quay lại</span>
        </button>

        <div className="flex items-center gap-2">
          <Badge variant="warning" size="sm">
            <Sparkles className="w-3 h-3 mr-1 text-amber-500 stroke-[2.5]" />
            Lượt {Math.min(currentRow + 1, MAX_ATTEMPTS)}/{MAX_ATTEMPTS}
          </Badge>

          <button
            type="button"
            onClick={() => setShowHint((h) => !h)}
            title="Gợi ý nghĩa tiếng Việt"
            className="py-1.5 px-2.5 rounded-full bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 active:scale-95 shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Gợi ý</span>
          </button>

          <button
            type="button"
            onClick={initGame}
            title="Làm mới từ khác"
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer active:scale-90"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Optional Hint Banner */}
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 text-center space-y-0.5 shadow-2xs"
        >
          <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            Nghĩa từ vựng
          </span>
          <p className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 font-semibold">
            {targetPackage.definitionVn}
          </p>
        </motion.div>
      )}

      {/* Main 6x5 Wordle Board */}
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
                  <div
                    key={colIndex}
                    className={`w-11 h-12 sm:w-13 sm:h-14 rounded-xl border flex items-center justify-center text-lg sm:text-xl font-black font-display uppercase transition-all duration-200 select-none shadow-2xs ${tileBg}`}
                  >
                    {char}
                  </div>
                );
              })}
            </motion.div>
          );
        })}
      </div>

      {/* Lost Game Banner */}
      {isGameOver && !isWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/60 text-center space-y-2 shadow-2xs"
        >
          <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            Đáp án chính xác
          </div>
          <div className="text-xl font-black text-rose-700 dark:text-rose-300 font-display">
            {targetPackage.word} {targetPackage.ipa ? `(${targetPackage.ipa})` : ""}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
            {targetPackage.definitionVn}
          </p>
          <div className="pt-2 flex justify-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold"
            >
              Quay lại
            </button>
            <button
              type="button"
              onClick={initGame}
              className="py-1.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-500/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Thử lại từ khác</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Virtual QWERTY Keyboard */}
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
                  className={`h-10 sm:h-11 rounded-lg border text-xs sm:text-sm font-bold flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-90 select-none shadow-2xs ${
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
