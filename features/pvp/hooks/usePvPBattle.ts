"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  PvPGameMode,
  PvPDifficulty,
  PvPMatchType,
  PvPGameState,
  Opponent,
  QuestionPackage,
} from "../types";
import {
  MOCK_OPPONENTS,
  getDifficultySettings,
  getAiDelay,
  getAiIsCorrect,
  scrambleWord,
  normalizeWordForCheck,
  DEFAULT_FALLBACK_QUESTIONS,
} from "../data/pvpData";
import { speakLessonText } from "@/shared/utils/ttsEngine";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { playPvPSound } from "../utils/pvpSoundEngine";

export function usePvPBattle() {
  const { user } = useAuthStore();
  const [matchType, setMatchType] = useState<PvPMatchType>("quick");
  const [gameState, setGameState] = useState<PvPGameState>("lobby");
  const [difficulty, setDifficulty] = useState<PvPDifficulty>("medium");
  const [gameMode, setGameMode] = useState<PvPGameMode>("quiz");

  // Room PIN state
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [isRoomLoading, setIsRoomLoading] = useState(false);
  const [roomError, setRoomError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [roomCountdown, setRoomCountdown] = useState(3);

  // Matchmaking & Battle State
  const [searchTime, setSearchTime] = useState(0);
  const [matchedOpponent, setMatchedOpponent] = useState<Opponent | null>(null);
  const [questions, setQuestions] = useState<QuestionPackage[]>(DEFAULT_FALLBACK_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [maxTimer, setMaxTimer] = useState(10);
  const [answered, setAnswered] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Scores
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [userResults, setUserResults] = useState<(boolean | null)[]>([]);
  const [oppResults, setOppResults] = useState<(boolean | null)[]>([]);
  const [opponentStatus, setOpponentStatus] = useState<"thinking" | "answered_correct" | "answered_incorrect">("thinking");

  // Spelling Mode
  const [spellingInput, setSpellingInput] = useState("");
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);

  // Post-match rewards
  const [xpAwarded, setXpAwarded] = useState(0);
  const [coinsAwarded, setCoinsAwarded] = useState(0);
  const [levelUp, setLevelUp] = useState(false);

  // Match history & stats
  const [matchStats, setMatchStats] = useState<{
    totalMatches: number;
    wins: number;
    draws: number;
    losses: number;
    winRate: number;
    totalXpGained: number;
  }>({
    totalMatches: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    winRate: 0,
    totalXpGained: 0,
  });
  const [recentMatches, setRecentMatches] = useState<Array<{
    id: string;
    opponent: string;
    userScore: number;
    oppScore: number;
    result: string;
    xpGained: number;
    createdAt: string;
  }>>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const searchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const aiTimerRef = useRef<NodeJS.Timeout | null>(null);
  const roundTimerRef = useRef<NodeJS.Timeout | null>(null);

  const loadMatchHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const res = await fetch("/api/pvp/match-submit", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.data) {
        if (data.data.stats) {
          setMatchStats(data.data.stats);
        }
        if (Array.isArray(data.data.recentMatches)) {
          setRecentMatches(data.data.recentMatches);
        }
      }
    } catch (e) {
      console.warn("Failed to load PvP match history:", e);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    loadMatchHistory();
  }, [loadMatchHistory]);

  const playWordAudio = useCallback((word: string) => {
    speakLessonText(word, {
      lessonId: "pvp_battle_audio",
      rate: 0.95,
    });
  }, []);

  const submitMatchResult = useCallback(
    async (finalUserScore: number, finalOppScore: number) => {
      const result = finalUserScore > finalOppScore ? "WIN" : finalUserScore === finalOppScore ? "DRAW" : "LOSE";

      try {
        const res = await fetch("/api/pvp/match-submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            opponent: matchedOpponent?.name || "Opponent Bot",
            userScore: finalUserScore,
            oppScore: finalOppScore,
            result,
          }),
        });
        const data = await res.json();
        const finalXp = data.success ? (data.data?.xpGained || (result === "WIN" ? 30 : result === "DRAW" ? 15 : 5)) : (result === "WIN" ? 30 : result === "DRAW" ? 15 : 5);
        const finalCoins = data.success ? (data.coinsAwarded || (result === "WIN" ? 20 : result === "DRAW" ? 10 : 2)) : (result === "WIN" ? 20 : 10);

        setXpAwarded(finalXp);
        setCoinsAwarded(finalCoins);
        setLevelUp(!!data.levelUp);

        // Immediate Client-Side User Store Sync for seamless UI feedback
        useUserStore.getState().awardXp(finalXp, "vocab");
        useUserStore.getState().awardCoins(finalCoins);
        useUserStore.getState().addPracticeTime(1, "vocab");
        useUserStore.getState().syncStreak(true);

        // Refresh stats
        loadMatchHistory();
      } catch (err) {
        console.warn("Failed to sync match result to server:", err);
        const fallbackXp = result === "WIN" ? 30 : result === "DRAW" ? 15 : 5;
        const fallbackCoins = result === "WIN" ? 20 : 10;
        setXpAwarded(fallbackXp);
        setCoinsAwarded(fallbackCoins);
        useUserStore.getState().awardXp(fallbackXp, "vocab");
        useUserStore.getState().awardCoins(fallbackCoins);
        useUserStore.getState().addPracticeTime(1, "vocab");
        useUserStore.getState().syncStreak(true);
      }
    },
    [matchedOpponent, loadMatchHistory]
  );

  const handleNextQuestion = useCallback(
    (nextIdx: number, currUserScore: number, currOppScore: number) => {
      if (nextIdx >= questions.length) {
        // Match Finished
        setGameState("results");
        if (currUserScore > currOppScore) {
          playPvPSound("victory");
        } else if (currUserScore < currOppScore) {
          playPvPSound("defeat");
        }
        submitMatchResult(currUserScore, currOppScore);
        return;
      }

      setCurrentQuestionIndex(nextIdx);
      const settings = getDifficultySettings(difficulty);
      setTimer(settings.timeLimit);
      setMaxTimer(settings.timeLimit);
      setAnswered(false);
      setSelectedOptionId(null);
      setSpellingInput("");

      const currentPkg = questions[nextIdx];
      if (currentPkg?.question) {
        setScrambledLetters(scrambleWord(currentPkg.question.word));
        if (gameMode === "listening") {
          playWordAudio(currentPkg.question.word);
        }
      }

      // Simulate Bot behavior in quick match
      if (matchType === "quick") {
        setOpponentStatus("thinking");
        const delay = getAiDelay(difficulty);
        const isAiCorrect = getAiIsCorrect(difficulty);

        if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
        aiTimerRef.current = setTimeout(() => {
          setOpponentStatus(isAiCorrect ? "answered_correct" : "answered_incorrect");
          setOppResults((prev) => {
            const next = [...prev];
            next[nextIdx] = isAiCorrect;
            return next;
          });
          if (isAiCorrect) {
            setOpponentScore((prev) => prev + 1);
          }
        }, delay);
      }
    },
    [questions, difficulty, gameMode, matchType, playWordAudio, submitMatchResult]
  );

  // Round Timer Loop
  useEffect(() => {
    if (gameState !== "battle") return;

    if (roundTimerRef.current) clearInterval(roundTimerRef.current);
    roundTimerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 4 && prev > 1) {
          playPvPSound("urgent_tick");
        }
        if (prev <= 1) {
          // Timeout for current question
          if (!answered) {
            playPvPSound("incorrect");
            setAnswered(true);
            setUserResults((prevRes) => {
              const next = [...prevRes];
              next[currentQuestionIndex] = false;
              return next;
            });
            setTimeout(() => {
              handleNextQuestion(currentQuestionIndex + 1, userScore, opponentScore);
            }, 1200);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (roundTimerRef.current) clearInterval(roundTimerRef.current);
    };
  }, [gameState, currentQuestionIndex, answered, userScore, opponentScore, handleNextQuestion]);

  const handleSelectOption = (optId: string, isCorrect: boolean) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOptionId(optId);

    const newUserScore = isCorrect ? userScore + 1 : userScore;
    if (isCorrect) {
      playPvPSound("correct");
      setUserScore(newUserScore);
    } else {
      playPvPSound("incorrect");
    }

    setUserResults((prev) => {
      const next = [...prev];
      next[currentQuestionIndex] = isCorrect;
      return next;
    });

    setTimeout(() => {
      handleNextQuestion(currentQuestionIndex + 1, newUserScore, opponentScore);
    }, 1200);
  };

  const handleLetterClick = (letter: string) => {
    if (answered) return;
    const nextVal = spellingInput + letter;
    setSpellingInput(nextVal);

    const targetWord = normalizeWordForCheck(questions[currentQuestionIndex].question.word);
    if (nextVal.length === targetWord.length) {
      const isCorrect = normalizeWordForCheck(nextVal) === targetWord;
      handleSelectOption("spelling_opt", isCorrect);
    }
  };

  const startMatch = async () => {
    setGameState("searching");
    setSearchTime(0);
    setMatchedOpponent(null);

    if (searchTimerRef.current) clearInterval(searchTimerRef.current);
    searchTimerRef.current = setInterval(() => {
      setSearchTime((t) => t + 1);
    }, 1000);

    // Mock quick matchmaking delay 1.5s
    setTimeout(() => {
      if (searchTimerRef.current) clearInterval(searchTimerRef.current);
      const chosenOpp = MOCK_OPPONENTS[Math.floor(Math.random() * MOCK_OPPONENTS.length)];
      setMatchedOpponent(chosenOpp);
      playPvPSound("match_found");

      const settings = getDifficultySettings(difficulty);
      const gameQs = DEFAULT_FALLBACK_QUESTIONS.slice(0, settings.totalQuestions);
      setQuestions(gameQs);
      setUserResults(Array(gameQs.length).fill(null));
      setOppResults(Array(gameQs.length).fill(null));
      setUserScore(0);
      setOpponentScore(0);

      setGameState("starting_count");
      setRoomCountdown(3);

      const countInterval = setInterval(() => {
        setRoomCountdown((c) => {
          if (c <= 1) {
            clearInterval(countInterval);
            setGameState("battle");
            handleNextQuestion(0, 0, 0);
            return 0;
          }
          playPvPSound("tick");
          return c - 1;
        });
      }, 1000);
    }, 1500);
  };

  const handleCreateRoom = () => {
    setIsRoomLoading(true);
    setTimeout(() => {
      const code = String(Math.floor(10000 + Math.random() * 90000));
      setRoomCode(code);
      setIsHost(true);
      setIsRoomLoading(false);
      setGameState("room_created");
    }, 600);
  };

  const handleJoinRoom = () => {
    if (!roomCodeInput.trim()) return;
    setIsRoomLoading(true);
    setTimeout(() => {
      setIsRoomLoading(false);
      startMatch();
    }, 600);
  };

  const handleCopyCode = () => {
    if (!roomCode) return;
    navigator.clipboard.writeText(roomCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleGiveUp = () => {
    setGameState("results");
    submitMatchResult(userScore, opponentScore + 5);
  };

  const handleRematch = () => {
    startMatch();
  };

  const handleReturnLobby = () => {
    setGameState("lobby");
  };

  return {
    matchType,
    setMatchType,
    gameState,
    setGameState,
    difficulty,
    setDifficulty,
    gameMode,
    setGameMode,
    roomCodeInput,
    setRoomCodeInput,
    roomCode,
    isHost,
    isRoomLoading,
    roomError,
    copiedCode,
    roomCountdown,
    searchTime,
    matchedOpponent,
    questions,
    currentQuestionIndex,
    timer,
    maxTimer,
    answered,
    selectedOptionId,
    userScore,
    opponentScore,
    userResults,
    oppResults,
    opponentStatus,
    spellingInput,
    setSpellingInput,
    scrambledLetters,
    xpAwarded,
    coinsAwarded,
    levelUp,
    startMatch,
    handleCreateRoom,
    handleJoinRoom,
    handleCopyCode,
    handleSelectOption,
    handleLetterClick,
    handleGiveUp,
    handleRematch,
    handleReturnLobby,
    playWordAudio,
    matchStats,
    recentMatches,
    isLoadingHistory,
    loadMatchHistory,
  };
}
