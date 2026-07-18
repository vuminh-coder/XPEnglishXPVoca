"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  CheckCircle,
  XCircle,
  Volume2,
  Zap,
  Trophy,
  Mic,
  Globe,
  Eye,
  EyeOff,
  HelpCircle,
  BookOpen,
  ChevronRight,
  Bookmark,
  Sparkles,
  Volume1,
  BookMarked
} from "lucide-react";
import { MOCK_LESSONS_DATA } from "@/lib/data/listeningMockData";
import { ListeningLesson, TranscriptSentence, VocabularyItem, ListeningQuiz } from "@/lib/utils/listeningParser";

// ── Diff Word Interface & Helper Functions ──
interface DiffWord {
  text: string;
  type: "correct" | "missing" | "extra" | "typo";
  correctText?: string;
}

function getLevenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= a.length; i++) matrix[i] = [i];
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + (a[i - 1].toLowerCase() === b[j - 1].toLowerCase() ? 0 : 1) // substitution
      );
    }
  }
  return matrix[a.length][b.length];
}

function diffWords(originalText: string, typedText: string): DiffWord[] {
  const cleanAndSplit = (str: string) => 
    str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim().split(/\s+/).filter(Boolean);
  
  const origWords = cleanAndSplit(originalText);
  const typedWords = cleanAndSplit(typedText);

  const n = origWords.length;
  const m = typedWords.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (origWords[i - 1].toLowerCase() === typedWords[j - 1].toLowerCase()) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = n, j = m;
  const diff: DiffWord[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origWords[i - 1].toLowerCase() === typedWords[j - 1].toLowerCase()) {
      diff.push({ text: origWords[i - 1], type: "correct" });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      const typedWord = typedWords[j - 1];
      let isTypo = false;
      let matchIdx = -1;

      // Check nearby original words for close spelling match
      for (let k = Math.max(0, i - 2); k < Math.min(n, i + 2); k++) {
        const dist = getLevenshteinDistance(origWords[k], typedWord);
        if (dist <= 2 && dist > 0 && origWords[k].length > 2) {
          isTypo = true;
          matchIdx = k;
          break;
        }
      }

      if (isTypo && matchIdx !== -1) {
        diff.push({ text: typedWord, type: "typo", correctText: origWords[matchIdx] });
        i = matchIdx; // align original pointer
      } else {
        diff.push({ text: typedWord, type: "extra" });
      }
      j--;
    } else {
      diff.push({ text: origWords[i - 1], type: "missing" });
      i--;
    }
  }

  return diff.reverse();
}

// ── Waveform / Equalizer Micro-animation ──
function DynamicEqualizer({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center gap-[3px] h-5 px-1.5 select-none" aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-violet-500 rounded-full"
          initial={{ height: 4 }}
          animate={isPlaying ? {
            height: [6, 20, 8, 16, 4, 18, 6][(i + (isPlaying ? 1 : 0)) % 7],
          } : { height: 4 }}
          transition={isPlaying ? {
            repeat: Infinity,
            duration: 0.75 + i * 0.12,
            ease: "easeInOut",
            repeatType: "reverse"
          } : {}}
        />
      ))}
    </div>
  );
}

// ── Dictionary mini popup / drawer ──
interface DictionaryPopupProps {
  word: string | null;
  onClose: () => void;
  localVocabs: VocabularyItem[];
}

function DictionaryPopup({ word, onClose, localVocabs }: DictionaryPopupProps) {
  const { addToast } = useNotificationStore();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [localMatch, setLocalMatch] = useState<VocabularyItem | null>(null);

  useEffect(() => {
    if (!word) return;
    setLoading(true);
    setData(null);

    // Look for matching word in the lesson's core vocabulary list
    const cleaned = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    const match = localVocabs.find(v => 
      v.word.toLowerCase() === cleaned || 
      cleaned.startsWith(v.word.toLowerCase()) || 
      v.word.toLowerCase().startsWith(cleaned)
    );
    setLocalMatch(match || null);

    // Fetch from Google Dictionary API
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleaned}`)
      .then(res => (res.ok ? res.json() : null))
      .then(resData => {
        if (resData && resData[0]) {
          setData(resData[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [word, localVocabs]);

  if (!word) return null;

  const playPronunciation = (audioUrl: string) => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    audio.play().catch(() => {});
  };

  const handleSaveWord = () => {
    addToast({
      type: "success",
      title: "Đã thêm từ vựng!",
      message: `Đã lưu từ "${word}" vào Sổ từ vựng cá nhân.`
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/40 dark:bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-neutral-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          <div className="p-5 border-b border-slate-100 dark:border-neutral-800 flex justify-between items-center bg-slate-50 dark:bg-neutral-950/40">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-violet-500" />
              <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider font-display">Tra từ nhanh</h4>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold p-1 cursor-pointer"> đóng </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-6 w-1/3 bg-slate-200 dark:bg-neutral-800 rounded-md"></div>
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-neutral-800 rounded-md"></div>
                <div className="h-20 bg-slate-200 dark:bg-neutral-800 rounded-lg"></div>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white font-display flex items-center gap-3">
                    {word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")}
                    {localMatch && <Badge variant="primary">{localMatch.pos}</Badge>}
                  </h3>
                  
                  {/* IPA & Pronunciation Audio */}
                  {data && data.phonetics && (
                    <div className="flex items-center gap-2 mt-1.5">
                      {data.phonetics.find((p: any) => p.text) && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {data.phonetics.find((p: any) => p.text).text}
                        </span>
                      )}
                      {data.phonetics.find((p: any) => p.audio) && (
                        <button
                          onClick={() => playPronunciation(data.phonetics.find((p: any) => p.audio).audio)}
                          className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-850 text-violet-500 cursor-pointer"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Local matching details (Vietnam translation in context) */}
                {localMatch ? (
                  <div className="p-3 bg-violet-50/50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/30 rounded-xl">
                    <span className="text-[10px] uppercase tracking-wider text-violet-600 dark:text-violet-400 font-black">Nghĩa trong ngữ cảnh bài nghe</span>
                    <p className="text-xs font-black text-slate-800 dark:text-slate-250 mt-1">{localMatch.vietnamese}</p>
                    {localMatch.example && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic mt-1">E.g., {localMatch.example}</p>
                    )}
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                    Từ này không nằm trong danh mục học phần chính. Hiển thị nghĩa phổ thông:
                  </div>
                )}

                {/* Global definitions from API */}
                {data && data.meanings && (
                  <div className="space-y-3">
                    {data.meanings.slice(0, 2).map((meaning: any, mi: number) => (
                      <div key={mi} className="space-y-1.5">
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-350 capitalize italic">
                          {meaning.partOfSpeech}
                        </div>
                        <ul className="list-disc list-inside space-y-1 pl-1">
                          {meaning.definitions.slice(0, 2).map((def: any, di: number) => (
                            <li key={di} className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                              <span>{def.definition}</span>
                              {def.example && (
                                <span className="block text-[11px] text-slate-400 dark:text-slate-500 italic pl-4">
                                  "{def.example}"
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {!data && !localMatch && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold p-4 text-center">
                    Không tìm thấy định nghĩa từ trực tuyến. Vui lòng kiểm tra lại kết nối.
                  </div>
                )}
              </>
            )}
          </div>

          <div className="p-4 border-t border-slate-100 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950/40 flex gap-2 justify-end">
            <Button variant="secondary" size="sm" onClick={onClose} className="rounded-xl cursor-pointer">Đóng</Button>
            <Button variant="primary" size="sm" onClick={handleSaveWord} className="rounded-xl cursor-pointer text-white flex items-center gap-1">
              <Bookmark className="h-3.5 w-3.5" /> Lưu từ vựng
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ── Dictation Practice Component ──
interface DictationModeProps {
  lesson: ListeningLesson;
  onBack: () => void;
}

function DictationMode({ lesson, onBack }: { lesson: ListeningLesson; onBack: () => void }) {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Array<{ sentence: string; input: string; score: number }>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [hintIndex, setHintIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  const currentSent = lesson.transcript[currentIdx];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play audio for current sentence
  const playSentence = (rate = 1) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
      // Seek to current sentence start time
      audioRef.current.currentTime = currentSent.startTime;
      audioRef.current.play().catch(() => {
        // Fallback to TTS if audio element fails
        playTTS(currentSent.text, rate);
      });
      setIsPlaying(true);
    } else {
      playTTS(currentSent.text, rate);
    }
  };

  const playTTS = (text: string, rate: number) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  // Monitor time update to stop playback when sentence ends
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    if (audioRef.current.currentTime >= currentSent.endTime) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleRevealLetter = () => {
    const cleanWord = (w: string) => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
    const words = currentSent.text.split(/\s+/).filter(Boolean);
    
    // Find how many words the user typed
    const typedWords = input.trim().split(/\s+/).filter(Boolean);
    const nextWordIndex = typedWords.length;
    
    if (nextWordIndex < words.length) {
      const nextWord = cleanWord(words[nextWordIndex]);
      if (nextWord) {
        // Show first few letters of next word as hint
        const hintChar = nextWord.substring(0, hintIndex + 1);
        addToast({
          type: "info",
          title: "Gợi ý từ tiếp theo",
          message: `Từ tiếp theo bắt đầu bằng: "${hintChar.toUpperCase()}"`
        });
        setHintIndex(prev => prev + 1);
      }
    } else {
      addToast({
        type: "warning",
        title: "Đã hoàn thành",
        message: "Bạn đã gõ đủ số từ của câu này!"
      });
    }
  };

  const handleSubmit = () => {
    // Calculate accuracy percentage
    const diff = diffWords(currentSent.text, input);
    const correctCount = diff.filter(w => w.type === "correct").length;
    const totalCount = currentSent.text.split(/\s+/).filter(Boolean).length;
    const percent = Math.round((correctCount / totalCount) * 100);

    setSubmitted(true);
    setResults(prev => [...prev, { sentence: currentSent.text, input, score: percent }]);
  };

  const handleNext = () => {
    if (currentIdx < lesson.transcript.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setInput("");
      setSubmitted(false);
      setHintIndex(0);
      setIsPlaying(false);
    } else {
      setGameOver(true);
      const avgScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);
      const xp = Math.round(avgScore * 0.5) + 15;
      awardXp(xp);
      addToast({
        type: "xp",
        title: `+${xp} XP!`,
        message: `Hoàn thành Dictation bài ${lesson.title}!`
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setInput("");
    setSubmitted(false);
    setResults([]);
    setHintIndex(0);
    setGameOver(false);
    setIsPlaying(false);
  };

  if (gameOver) {
    const avgScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);
    return (
      <Card variant="bezel" className="p-8 text-center space-y-6 max-w-xl mx-auto">
        <Trophy className="h-14 w-14 text-amber-500 mx-auto animate-bounce" />
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">Hoàn thành Dictation</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Độ chính xác trung bình</p>
          <div className="text-4xl font-black text-violet-600 dark:text-violet-400 mt-2 font-display">{avgScore}%</div>
        </div>

        <div className="space-y-3 text-left max-h-[300px] overflow-y-auto pr-1">
          {results.map((r, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border text-xs leading-relaxed font-semibold ${
                r.score >= 80
                  ? "border-emerald-200 bg-emerald-50/20 dark:border-emerald-800/30 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                  : "border-rose-200 bg-rose-50/20 dark:border-rose-800/30 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-black text-slate-800 dark:text-slate-200">Câu {idx + 1}</span>
                <Badge variant={r.score >= 80 ? "success" : "danger"} className="font-bold">{r.score}%</Badge>
              </div>
              <p className="text-slate-800 dark:text-slate-200">✓ {r.sentence}</p>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Đã viết: {r.input || <span className="italic">(Để trống)</span>}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-center pt-2">
          <Button variant="secondary" size="sm" onClick={onBack}>← Quay lại</Button>
          <Button variant="primary" size="sm" onClick={handleRestart} className="text-white">
            <RotateCcw className="h-4 w-4 mr-1" /> Làm lại
          </Button>
        </div>
      </Card>
    );
  }

  // Calculate live characters visual hint
  const cleanWord = (w: string) => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
  const wordsList = currentSent.text.split(/\s+/).filter(Boolean);
  const visualHint = wordsList
    .map((w, index) => {
      const cleaned = cleanWord(w);
      const typed = input.split(/\s+/).filter(Boolean)[index] || "";
      if (typed.toLowerCase() === cleaned.toLowerCase()) {
        return w; // Word typed correctly
      }
      return "_".repeat(Math.max(3, cleaned.length)) + (w.length > cleaned.length ? w.slice(cleaned.length) : ""); // Mask
    })
    .join(" ");

  const comparison = submitted ? diffWords(currentSent.text, input) : [];
  const correctWords = comparison.filter(w => w.type === "correct").length;
  const accuracy = submitted ? Math.round((correctWords / wordsList.length) * 100) : 0;

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <audio
        ref={audioRef}
        src={lesson.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center justify-between">
        <Button variant="secondary" size="sm" onClick={onBack}>← Quay lại</Button>
        <Badge variant="primary" className="text-xs font-black px-3.5 py-1">Câu {currentIdx + 1}/{lesson.transcript.length}</Badge>
      </div>

      <div className="h-2 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIdx + 1) / lesson.transcript.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`dictation-${currentIdx}`}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ type: "spring", stiffness: 95, damping: 16 }}
        >
          <Card variant="bezel" className="p-6 space-y-6">
            <div className="text-center relative py-2 space-y-4">
              <p className="text-[11px] text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wider">
                Nghe và ghi chép lại chính xác tiếng Anh
              </p>

              <div className="flex justify-center items-center gap-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => playSentence(0.75)}
                  className="rounded-full py-2.5 px-4 flex items-center gap-1.5"
                  disabled={isPlaying}
                >
                  <Volume1 className="h-4 w-4" /> 0.75x (Chậm)
                </Button>

                <div className="relative inline-block">
                  {isPlaying && (
                    <motion.span
                      className="absolute -inset-3.5 rounded-full bg-violet-500/10 pointer-events-none"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.15, 0.6] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                    />
                  )}
                  <Button
                    variant="primary"
                    className="rounded-full w-14 h-14 shadow-glow flex items-center justify-center p-0 text-white"
                    onClick={() => playSentence(1.0)}
                  >
                    {isPlaying && playbackRate === 1.0 ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => playSentence(1.0)}
                  className="rounded-full py-2.5 px-4 flex items-center gap-1.5"
                  disabled={isPlaying}
                >
                  <Volume2 className="h-4 w-4" /> 1.0x (Chuẩn)
                </Button>
              </div>

              {/* Guide visualization line */}
              {!submitted && (
                <div className="bg-slate-50 dark:bg-neutral-950/50 py-3 px-4 border border-slate-100 dark:border-neutral-850 rounded-xl max-w-md mx-auto">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-black block uppercase mb-1">Gợi ý khuôn mẫu chữ</span>
                  <p className="font-mono text-xs tracking-wider text-slate-600 dark:text-slate-400 break-words leading-relaxed select-none">
                    {visualHint}
                  </p>
                </div>
              )}
            </div>

            {/* Input field with external label */}
            <div className="space-y-2">
              <label htmlFor="dictation-input" className="text-xs font-black text-slate-700 dark:text-slate-350 flex justify-between items-center">
                <span>VĂN BẢN NGHE ĐƯỢC:</span>
                {!submitted && (
                  <button
                    onClick={handleRevealLetter}
                    className="text-[11px] text-violet-500 hover:text-violet-600 font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <Sparkles className="h-3 w-3" /> Gợi ý chữ cái
                  </button>
                )}
              </label>
              <textarea
                id="dictation-input"
                className="w-full py-3.5 px-4 text-sm font-semibold rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-400/30 resize-none min-h-[90px] leading-relaxed transition-all"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Gõ chính xác những từ tiếng Anh bạn nghe được..."
                disabled={submitted}
              />
            </div>

            {/* Verification Diff result display */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase">Kết quả kiểm tra</span>
                  <Badge variant={accuracy >= 80 ? "success" : accuracy >= 50 ? "warning" : "danger"} className="font-black px-2.5">
                    Chính xác {accuracy}%
                  </Badge>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-wrap gap-x-2 gap-y-3.5 items-center leading-relaxed">
                  {comparison.map((w, idx) => {
                    if (w.type === "correct") {
                      return (
                        <span key={idx} className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                          {w.text}
                        </span>
                      );
                    }
                    if (w.type === "missing") {
                      return (
                        <span
                          key={idx}
                          className="text-sm font-bold text-slate-400 dark:text-slate-600 line-through decoration-rose-500 decoration-2 select-none"
                          title="Bị bỏ sót trong bài viết"
                        >
                          {w.text}
                        </span>
                      );
                    }
                    if (w.type === "typo") {
                      return (
                        <span
                          key={idx}
                          className="text-sm font-black text-amber-500 bg-amber-50 dark:bg-amber-950/20 px-1 border-b-2 border-dashed border-amber-400 cursor-help"
                          title={`Lỗi chính tả. Nên viết: ${w.correctText}`}
                        >
                          {w.text}
                        </span>
                      );
                    }
                    // extra words typed
                    return (
                      <span
                        key={idx}
                        className="text-sm font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/20 px-1 border border-rose-200 dark:border-rose-900/30 rounded"
                        title="Từ thừa / Không có trong câu gốc"
                      >
                        {w.text}
                      </span>
                    );
                  })}
                </div>

                {accuracy < 100 && (
                  <div className="p-3.5 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/10 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <span className="font-black uppercase tracking-wider block text-[10px] text-emerald-600 mb-0.5">Đáp án đúng</span>
                    ✓ {currentSent.text}
                  </div>
                )}
                {currentSent.vietnamese && (
                  <div className="p-3 bg-slate-50 dark:bg-neutral-900 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="font-black uppercase tracking-wider block text-[10px] text-slate-400 mb-0.5">Bản dịch Việt</span>
                    {currentSent.vietnamese}
                  </div>
                )}
              </motion.div>
            )}

            <div className="flex gap-2">
              {!submitted ? (
                <Button
                  variant="primary"
                  className="w-full py-4 text-white rounded-xl shadow-glow cursor-pointer"
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                >
                  Kiểm tra bài chép <CheckCircle className="h-4 w-4 ml-1.5" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="w-full py-4 text-white rounded-xl shadow-glow cursor-pointer"
                  onClick={handleNext}
                >
                  {currentIdx < lesson.transcript.length - 1 ? (
                    <>
                      Câu tiếp theo <ArrowRight className="h-4 w-4 ml-1.5" />
                    </>
                  ) : (
                    <>
                      Xem kết quả tổng kết <Trophy className="h-4 w-4 ml-1.5" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Listening Quiz Mode Component (TOEIC / Dialogue practice) ──
interface ListeningQuizModeProps {
  lesson: ListeningLesson;
  onBack: () => void;
}

function ListeningQuizMode({ lesson, onBack }: { lesson: ListeningQuizModeProps["lesson"]; onBack: () => void }) {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [activeTab, setActiveTab] = useState<"quiz" | "vocab">("quiz");
  
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [transcriptMode, setTranscriptMode] = useState<"en" | "bilingual" | "hide">("bilingual");
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Time syncer
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleDurationChange = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        // Fallback or handle error
      });
      setIsPlaying(true);
    }
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const changeRate = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const jumpSeconds = (amount: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + amount));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSentenceClick = (startTime: number) => {
    seek(startTime);
    if (!isPlaying) {
      togglePlay();
    }
  };

  // Find active sentence index
  const activeSentIndex = lesson.transcript.findIndex(
    s => currentTime >= s.startTime && currentTime < s.endTime
  );

  // Automatic scroll to keep active sentence centered
  useEffect(() => {
    if (activeSentIndex !== -1 && scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector(
        `[data-sentence-index="${activeSentIndex}"]`
      );
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [activeSentIndex]);

  const handleSubmitQuiz = () => {
    setShowResult(true);
    const correctCount = lesson.quizzes.filter(
      (q, idx) => answers[`${lesson.id}_${idx}`] === q.correctIndex
    ).length;
    
    const xp = correctCount * 10 + 15;
    awardXp(xp);
    addToast({
      type: "xp",
      title: `+${xp} XP!`,
      message: `Hoàn thành trắc nghiệm! Đúng ${correctCount}/${lesson.quizzes.length} câu.`
    });
  };

  // Check which word is currently highlighted (word level synchronization)
  const getActiveWordIndex = (sent: TranscriptSentence, sentenceTime: number): number => {
    if (!sent.words) return -1;
    const elapsedMs = sentenceTime * 1000;
    
    // Find the word with offset closest to but less than elapsedMs
    let activeIdx = -1;
    for (let i = 0; i < sent.words.length; i++) {
      if (sent.words[i].offset <= elapsedMs) {
        activeIdx = i;
      }
    }
    return activeIdx;
  };

  const renderKaraokeWords = (sent: TranscriptSentence, isActive: boolean) => {
    const originalWords = sent.text.split(/\s+/);
    
    // If not active sentence or no word level data, show normal layout
    if (!isActive || !sent.words || sent.words.length !== originalWords.length) {
      return originalWords.map((w, wi) => (
        <span
          key={wi}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedWord(w);
          }}
          className="hover:underline hover:text-violet-500 cursor-pointer transition-colors duration-150 inline-block mr-1"
        >
          {w}
        </span>
      ));
    }

    const elapsedMs = (currentTime - sent.startTime) * 1000;
    const activeWordIdx = getActiveWordIndex(sent, currentTime - sent.startTime);

    return originalWords.map((w, wi) => {
      const isWordHighlighted = activeWordIdx === wi;
      return (
        <span
          key={wi}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedWord(w);
          }}
          className={`hover:underline cursor-pointer transition-colors duration-150 inline-block mr-1 ${
            isWordHighlighted 
              ? "text-violet-600 dark:text-violet-400 bg-violet-100/50 dark:bg-violet-950/30 px-0.5 rounded font-black scale-105" 
              : ""
          }`}
        >
          {w}
        </span>
      );
    });
  };

  return (
    <div className="space-y-6">
      <audio
        ref={audioRef}
        src={lesson.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
        onEnded={handleEnded}
      />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button variant="secondary" size="sm" onClick={onBack}>← Quay lại</Button>
        <div className="flex gap-2">
          <Badge variant="primary">{lesson.category}</Badge>
          <Badge variant="neutral">{lesson.level}</Badge>
          <Badge variant="success">{lesson.duration}</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: Player & Karaoke Transcript */}
        <div className="lg:col-span-7 space-y-5">
          {/* Custom audio controller */}
          <Card variant="bezel" className="p-5 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Trình phát bài nghe</h3>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">
                    Click vào chữ để nhảy nhạc đến thời điểm tương ứng
                  </p>
                </div>
                <DynamicEqualizer isPlaying={isPlaying} />
              </div>

              {/* Progress Slider */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-400 w-9 select-none">
                  {Math.floor(currentTime / 60)}:
                  {String(Math.floor(currentTime % 60)).padStart(2, "0")}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={e => seek(Number(e.target.value))}
                  className="flex-1 h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
                <span className="text-[11px] font-bold text-slate-400 w-9 text-right select-none">
                  {Math.floor(duration / 60)}:
                  {String(Math.floor(duration % 60)).padStart(2, "0")}
                </span>
              </div>

              {/* Player buttons dashboard */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1.5">
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => jumpSeconds(-5)}
                    className="p-2.5 rounded-full"
                    title="Lùi lại 5 giây"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="primary"
                    className="rounded-full w-12 h-12 shadow-glow flex items-center justify-center p-0 text-white"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => jumpSeconds(5)}
                    className="p-2.5 rounded-full"
                    title="Tua nhanh 5 giây"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Playback speed slider controller */}
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span className="select-none">Tốc độ:</span>
                  <div className="flex border border-slate-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-neutral-950">
                    {[0.75, 1.0, 1.25].map(rate => (
                      <button
                        key={rate}
                        onClick={() => changeRate(rate)}
                        className={`px-3 py-1.5 text-[10px] font-bold select-none cursor-pointer border-r border-slate-200 dark:border-neutral-800 last:border-0 ${
                          playbackRate === rate 
                            ? "bg-violet-600 text-white dark:text-white" 
                            : "hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Karaoke Transcript container */}
          <Card variant="bezel" className="p-0 border border-slate-200 dark:border-neutral-800 overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-50 dark:bg-neutral-950/40 border-b border-slate-100 dark:border-neutral-850 flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-700 dark:text-slate-350 tracking-wider">HỘI THOẠI TRANSCRIPT</span>
              
              {/* Bilingual switcher */}
              <div className="flex border border-slate-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-950 p-0.5">
                <button
                  onClick={() => setTranscriptMode("en")}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition-all ${
                    transcriptMode === "en" ? "bg-slate-900 text-white dark:bg-neutral-800" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setTranscriptMode("bilingual")}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition-all ${
                    transcriptMode === "bilingual" ? "bg-slate-900 text-white dark:bg-neutral-800" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  EN-VI
                </button>
                <button
                  onClick={() => setTranscriptMode("hide")}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition-all ${
                    transcriptMode === "hide" ? "bg-slate-900 text-white dark:bg-neutral-800" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  ẨN
                </button>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="p-5 max-h-[350px] overflow-y-auto space-y-4 bg-white dark:bg-neutral-900 scrollbar-thin"
            >
              {transcriptMode === "hide" ? (
                <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs font-bold space-y-2">
                  <EyeOff className="h-8 w-8 mx-auto text-slate-300 dark:text-slate-700" />
                  <p>Bản ghi lời thoại đã bị ẩn để bạn tập trung lắng nghe thuần túy.</p>
                  <p className="text-[10px] text-slate-350">Bấm "EN" hoặc "EN-VI" ở thanh tùy chỉnh phía trên để mở lại.</p>
                </div>
              ) : (
                lesson.transcript.map((s, idx) => {
                  const isActive = activeSentIndex === idx;
                  return (
                    <motion.div
                      key={s.sentenceId}
                      data-sentence-index={idx}
                      onClick={() => handleSentenceClick(s.startTime)}
                      className={`p-3 rounded-xl transition-all duration-200 border cursor-pointer ${
                        isActive
                          ? "bg-violet-50/50 dark:bg-violet-950/10 border-violet-200 dark:border-violet-850 shadow-sm"
                          : "bg-white dark:bg-neutral-900 border-transparent hover:bg-slate-50 dark:hover:bg-neutral-850"
                      }`}
                      animate={isActive ? { scale: 1.01 } : { scale: 1 }}
                    >
                      {/* English Karaoke Text line */}
                      <p className={`text-sm leading-relaxed font-semibold transition-all duration-200 ${
                        isActive ? "text-violet-900 dark:text-violet-100 font-bold" : "text-slate-700 dark:text-slate-300"
                      }`}>
                        {renderKaraokeWords(s, isActive)}
                      </p>
                      
                      {/* Translation text */}
                      {transcriptMode === "bilingual" && s.vietnamese && (
                        <p className={`text-xs mt-1 transition-all ${
                          isActive ? "text-violet-600 dark:text-violet-400 font-bold" : "text-slate-400 dark:text-slate-500"
                        }`}>
                          {s.vietnamese}
                        </p>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Quiz Questions & Key Vocabulary Tabs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex border-b border-slate-200 dark:border-neutral-800">
            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex-1 pb-2.5 text-xs font-black tracking-wider uppercase border-b-2 cursor-pointer transition-all ${
                activeTab === "quiz"
                  ? "border-violet-500 text-slate-800 dark:text-white"
                  : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              CÂU HỎI TRẮC NGHIỆM
            </button>
            <button
              onClick={() => setActiveTab("vocab")}
              className={`flex-1 pb-2.5 text-xs font-black tracking-wider uppercase border-b-2 cursor-pointer transition-all ${
                activeTab === "vocab"
                  ? "border-violet-500 text-slate-800 dark:text-white"
                  : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              TỪ VỰNG TRỌNG TÂM
            </button>
          </div>

          {activeTab === "quiz" ? (
            <Card variant="bezel" className="p-5 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-5">
              <div className="space-y-4">
                {lesson.quizzes.map((q, qIndex) => {
                  const ansKey = `${lesson.id}_${qIndex}`;
                  const isCorrect = showResult && answers[ansKey] === q.correctIndex;
                  const isWrong = showResult && answers[ansKey] !== undefined && answers[ansKey] !== q.correctIndex;
                  
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border text-xs leading-relaxed font-semibold transition-all ${
                        isCorrect
                          ? "border-emerald-300 bg-emerald-50/20 dark:border-emerald-800/30 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400"
                          : isWrong
                          ? "border-rose-300 bg-rose-50/20 dark:border-rose-800/30 dark:bg-rose-950/20 text-rose-800 dark:text-rose-400"
                          : "border-slate-100 dark:border-neutral-850 bg-slate-50/40 dark:bg-neutral-950/40"
                      }`}
                    >
                      <p className="text-xs font-black text-slate-800 dark:text-slate-200 mb-3">
                        Q{qIndex + 1}. {q.question}
                      </p>
                      <div className="grid gap-2">
                        {q.options.map((option, optIdx) => {
                          const isSelected = answers[ansKey] === optIdx;
                          const isCorrectOption = showResult && optIdx === q.correctIndex;

                          return (
                            <button
                              key={optIdx}
                              onClick={() => !showResult && setAnswers(prev => ({ ...prev, [ansKey]: optIdx }))}
                              disabled={showResult}
                              className={`p-2.5 rounded-lg text-[11px] font-bold text-left transition-all border cursor-pointer leading-snug ${
                                isCorrectOption
                                  ? "border-emerald-400 bg-emerald-100/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300"
                                  : isSelected && isWrong
                                  ? "border-rose-400 bg-rose-100/50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300"
                                  : isSelected
                                  ? "border-violet-400 bg-violet-50/60 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400"
                                  : "border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-slate-500 dark:text-slate-400 hover:border-slate-350"
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>

                      {showResult && q.explanation && (
                        <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-neutral-800/50 text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
                          <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">Lời giải:</span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!showResult ? (
                <Button
                  variant="primary"
                  className="w-full py-4 text-white rounded-xl shadow-glow cursor-pointer"
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(answers).length < lesson.quizzes.length}
                >
                  <Zap className="h-4 w-4 mr-1 text-yellow-300 animate-bounce" /> Nộp bài trắc nghiệm
                </Button>
              ) : (
                <Button variant="secondary" className="w-full py-4 rounded-xl cursor-pointer" onClick={onBack}>
                  ← Quay lại menu chính
                </Button>
              )}
            </Card>
          ) : (
            <Card variant="bezel" className="p-4 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-3.5 max-h-[400px] overflow-y-auto">
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider select-none mb-1">
                Các từ cốt lõi của bài học
              </div>
              {lesson.vocabularyList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedWord(item.word)}
                  className="p-3 rounded-xl border border-slate-100 dark:border-neutral-850 bg-slate-50/40 dark:bg-neutral-950/40 hover:border-violet-200 dark:hover:border-violet-900/30 transition-all cursor-pointer group flex justify-between items-start"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black text-slate-800 dark:text-white group-hover:text-violet-500 transition-colors">
                        {item.word}
                      </span>
                      {item.pos && <Badge variant="neutral" className="py-0 px-1 text-[9px]">{item.pos}</Badge>}
                    </div>
                    {item.ipa && <span className="text-xs text-slate-400 dark:text-slate-500 font-mono block">{item.ipa}</span>}
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">{item.vietnamese}</p>
                    {item.example && (
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 italic mt-0.5 pl-1.5 border-l border-slate-200 dark:border-neutral-800">
                        E.g., {item.example}
                      </p>
                    )}
                  </div>
                  <button className="text-[10px] text-violet-500 group-hover:underline font-bold mt-1 shrink-0 flex items-center gap-0.5 cursor-pointer">
                    Tra từ <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>

      {/* Dictionary Drawer/Modal Overlay */}
      <DictionaryPopup
        word={selectedWord}
        onClose={() => setSelectedWord(null)}
        localVocabs={lesson.vocabularyList}
      />
    </div>
  );
}

// ── Main Page Component ──
export default function ListeningPage() {
  const [activeLesson, setActiveLesson] = useState<ListeningLesson | null>(null);
  const [activeMode, setActiveMode] = useState<"menu" | "quiz" | "dictation">("menu");

  const startLesson = (lesson: ListeningLesson, mode: "quiz" | "dictation") => {
    setActiveLesson(lesson);
    setActiveMode(mode);
  };

  const handleBackToMenu = () => {
    setActiveLesson(null);
    setActiveMode("menu");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-6" suppressHydrationWarning>
      <AnimatePresence mode="wait">
        {activeMode === "menu" && (
          <motion.div
            key="menu-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: "spring", stiffness: 85, damping: 15 }}
            className="space-y-6"
          >
            {/* Header section */}
            <div className="page-header space-y-1.5">
              <h1 className="text-3xl font-black tracking-tight flex items-center gap-2 text-slate-900 dark:text-white font-display">
                <Headphones className="h-7 w-7 text-violet-500 animate-pulse" />
                Luyện Nghe tiếng Anh Chuyên Sâu
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-bold max-w-[65ch]">
                Cải thiện khả năng nghe hiểu thực tế qua Karaoke Transcript (đồng bộ thời gian), Tra cứu từ vựng tương tác và luyện viết chính tả chính xác từng từ.
              </p>
            </div>

            {/* Grid of lessons list */}
            <div className="grid gap-6 sm:grid-cols-1">
              {MOCK_LESSONS_DATA.map((lesson) => (
                <Card
                  key={lesson.id}
                  variant="bezel"
                  className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-850 p-5 rounded-2xl relative overflow-hidden group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="primary" className="font-black px-2">{lesson.category}</Badge>
                        <Badge
                          variant={
                            lesson.level === "Easy"
                              ? "success"
                              : lesson.level === "Intermediate"
                              ? "warning"
                              : "danger"
                          }
                          className="font-black px-2"
                        >
                          {lesson.level}
                        </Badge>
                        <Badge variant="neutral" className="font-bold px-2">{lesson.duration}</Badge>
                      </div>

                      <h3 className="text-lg font-black text-slate-800 dark:text-white font-display group-hover:text-violet-500 transition-colors">
                        {lesson.title}
                      </h3>

                      {/* Display tag list */}
                      <div className="flex flex-wrap gap-1.5">
                        {lesson.tags?.map((tag) => (
                          <span key={tag} className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-neutral-950 px-2 py-0.5 rounded-full border border-slate-100 dark:border-neutral-850">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dual CTEs actions for each lesson */}
                    <div className="flex flex-wrap gap-2.5 md:self-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => startLesson(lesson, "dictation")}
                        className="rounded-xl flex items-center gap-1 text-slate-700 dark:text-slate-200"
                      >
                        <Mic className="h-4 w-4 text-violet-500" /> Nghe Chép Chính tả
                      </Button>
                      
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => startLesson(lesson, "quiz")}
                        className="rounded-xl text-white flex items-center gap-1 shadow-glow"
                      >
                        <Headphones className="h-4 w-4" /> Luyện Nghe Trắc nghiệm
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeMode === "dictation" && activeLesson && (
          <motion.div
            key="dictation-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: "spring", stiffness: 85, damping: 15 }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 select-none">
                <span>Trang học</span>
                <ChevronRight className="h-3 w-3" />
                <span>Luyện Nghe Chép chính tả</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-slate-700 dark:text-slate-350">{activeLesson.title}</span>
              </div>
              <DictationMode lesson={activeLesson} onBack={handleBackToMenu} />
            </div>
          </motion.div>
        )}

        {activeMode === "quiz" && activeLesson && (
          <motion.div
            key="quiz-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: "spring", stiffness: 85, damping: 15 }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 select-none">
                <span>Trang học</span>
                <ChevronRight className="h-3 w-3" />
                <span>Luyện Nghe Trắc nghiệm & Dịch nghĩa</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-slate-700 dark:text-slate-350">{activeLesson.title}</span>
              </div>
              <ListeningQuizMode lesson={activeLesson} onBack={handleBackToMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
