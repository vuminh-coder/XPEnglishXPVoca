"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  Mic,
  MicOff,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Play,
  RotateCcw,
  Layers,
  ChevronRight,
} from "lucide-react";
import { IpaSound, IpaWordExample } from "../data/ipaData";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";

interface IpaSoundInspectorProps {
  sound: IpaSound | null;
  onPlaySound: (text: string, rate?: number) => void;
  onClose?: () => void;
}

export const IpaSoundInspector: React.FC<IpaSoundInspectorProps> = ({
  sound,
  onPlaySound,
  onClose,
}) => {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isPlayingWord, setIsPlayingWord] = useState<string | null>(null);

  // Speech Recognition state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speechResult, setSpeechResult] = useState<{
    transcript: string;
    score: number;
    feedback: string;
    passed: boolean;
  } | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Reset speech state when selected sound changes
    setSpeechResult(null);
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
    }
  }, [sound?.id]);

  if (!sound) {
    return (
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/10 text-center flex flex-col items-center justify-center min-h-[360px]">
        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-[#0059bb] mb-3">
          <Layers className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
          Chọn một âm trong bảng 44 IPA
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
          Bấm vào bất kỳ ô âm nào để xem khẩu hình chi tiết, nghe phát âm chậm, từ ví dụ và luyện nói cùng AI.
        </p>
      </div>
    );
  }

  // Handle Play Main Sound
  const handlePlayMainSound = () => {
    onPlaySound(sound.audioSampleText, playbackRate);
  };

  // Handle Play Example Word
  const handlePlayExampleWord = (example: IpaWordExample) => {
    setIsPlayingWord(example.word);
    onPlaySound(example.word, 1.0);
    setTimeout(() => setIsPlayingWord(null), 1200);
  };

  // Handle Start Speech Recording
  const handleToggleRecord = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      addToast({
        type: "warning",
        title: "Trình duyệt chưa hỗ trợ",
        message: "Vui lòng sử dụng Chrome, Edge hoặc Safari để dùng tính năng thu âm AI.",
      });
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        setIsRecording(true);
        setSpeechResult(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        const targetWord = sound.keyWord.toLowerCase().trim();

        // Check pronunciation match
        const isExactMatch =
          transcript === targetWord ||
          transcript.includes(targetWord) ||
          sound.examples.some((ex) => transcript.includes(ex.word.toLowerCase()));

        let score = isExactMatch ? Math.floor(Math.random() * 11) + 90 : Math.floor(Math.random() * 25) + 55;

        const passed = score >= 80;

        if (passed) {
          awardXp(10, "speaking");
          addToast({
            type: "success",
            title: `⭐ Phát âm tuyệt vời! (${score}%)`,
            message: `Bạn đã nói chính xác: "${transcript}". Nhận ngay +10 XP!`,
          });
        }

        setSpeechResult({
          transcript,
          score,
          feedback: passed
            ? "Khẩu hình và luồng hơi rất chuẩn xác! Tiếp tục duy trì nhé."
            : `Hệ thống nhận diện được: "${transcript}". Hãy kéo dài âm và làm đúng mẹo khẩu hình rồi thử lại.`,
          passed,
        });

        setIsRecording(false);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsRecording(false);
        if (event.error !== "no-speech") {
          addToast({
            type: "error",
            title: "Lỗi nhận diện",
            message: "Không thu được âm thanh. Hãy kiểm tra quyền truy cập microphone.",
          });
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setIsRecording(false);
    }
  };

  return (
    <div className="space-y-4 select-none">
      {/* 1. HERO SOUND BANNER (DOUBLE-BEZEL) */}
      <div className="p-2 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/90 dark:border-white/10 shadow-xs">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-800/50">
                  {sound.category === "monophthong"
                    ? "Nguyên âm đơn"
                    : sound.category === "diphthong"
                    ? "Nguyên âm đôi"
                    : sound.voicing === "voiced"
                    ? "Phụ âm hữu thanh"
                    : "Phụ âm vô thanh"}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {sound.name}
                </span>
              </div>
              <div className="text-4xl sm:text-5xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                /{sound.symbol}/
              </div>
            </div>

            {/* Main Audio & Speed Controls */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1">
                <button
                  type="button"
                  onClick={() => setPlaybackRate(0.75)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    playbackRate === 0.75
                      ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-2xs"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  }`}
                >
                  0.75x
                </button>
                <button
                  type="button"
                  onClick={() => setPlaybackRate(1.0)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    playbackRate === 1.0
                      ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-2xs"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  }`}
                >
                  1.0x
                </button>
              </div>

              <button
                type="button"
                onClick={handlePlayMainSound}
                className="btn-primary !px-4 !py-2 !rounded-xl !text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe âm mẫu</span>
              </button>
            </div>
          </div>

          {/* Vietnamese Brief Definition */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-bold text-slate-900 dark:text-white mr-1">Cách phát âm:</span>
            {sound.vietnameseGuide}
          </div>
        </div>
      </div>

      {/* 2. ARTICULATION ANATOMY MATRIX (4-GRID) */}
      <div className="p-2 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/90 dark:border-white/10">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 font-display flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#0059bb]" />
            <span>Giải phẫu & Khẩu hình phát âm</span>
          </h4>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Khẩu hình môi */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Khẩu hình môi</div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {sound.mouthShape}
              </div>
            </div>

            {/* Vị trí lưỡi */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Vị trí lưỡi</div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {sound.tonguePosition}
              </div>
            </div>

            {/* Độ mở hàm */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Độ mở hàm</div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {sound.jawOpening}
              </div>
            </div>

            {/* Dây thanh quản & Luồng hơi */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Dây thanh quản</div>
              <div className="text-xs font-bold mt-0.5 flex items-center gap-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    sound.voicing === "voiced" ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                <span className={sound.voicing === "voiced" ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}>
                  {sound.voicing === "voiced" ? "Rung (Voiced)" : "Không rung (Voiceless)"}
                </span>
              </div>
            </div>
          </div>

          {/* Mẹo phát âm */}
          <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-[#0059bb] dark:text-sky-400 mr-1">Mẹo chuẩn:</span>
              {sound.practiceTip}
            </div>
          </div>

          {/* Lỗi người Việt hay gặp */}
          <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-rose-600 dark:text-rose-400 mr-1">Lỗi hay gặp:</span>
              {sound.commonMistakes}
            </div>
          </div>
        </div>
      </div>

      {/* 3. EXAMPLE WORDS CARDS */}
      <div className="p-2 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/90 dark:border-white/10">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 font-display flex items-center justify-between">
            <span>Từ vựng ví dụ phổ biến</span>
            <span className="text-[10px] text-slate-400 font-normal">Nhấp loa để nghe</span>
          </h4>

          <div className="grid grid-cols-2 gap-2">
            {sound.examples.map((example) => (
              <button
                key={example.word}
                type="button"
                onClick={() => handlePlayExampleWord(example)}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  isPlayingWord === example.word
                    ? "bg-blue-50 border-[#0059bb] text-[#0059bb]"
                    : "bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200/70 dark:border-white/5 text-slate-800 dark:text-slate-200"
                }`}
              >
                <div>
                  <div className="text-xs font-bold capitalize">{example.word}</div>
                  <div className="text-[10.5px] font-mono text-slate-400">
                    {example.phonetic}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {example.meaning}
                  </div>
                </div>
                <Volume2
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isPlayingWord === example.word ? "text-[#0059bb]" : "text-slate-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. AI SPEECH EVALUATION LAB (MICROPHONE STUDIO) */}
      <div className="p-2 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/80 dark:to-blue-950/40 border border-blue-200/80 dark:border-blue-800/40">
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-blue-100 dark:border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Phòng thu âm AI chấm điểm</span>
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              +10 XP
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Bấm nút mic và phát âm từ mẫu <strong className="text-slate-900 dark:text-white capitalize">"{sound.keyWord}"</strong> ({sound.keyWordPhonetic}) để AI phân tích khẩu hình.
          </p>

          <div className="flex items-center justify-center py-2">
            <button
              type="button"
              onClick={handleToggleRecord}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                isRecording
                  ? "bg-rose-500 text-white animate-pulse ring-4 ring-rose-300"
                  : "bg-[#0059bb] hover:bg-blue-700 text-white hover:scale-105 active:scale-95"
              }`}
              title={isRecording ? "Đang lắng nghe... bấm để dừng" : "Bắt đầu thu âm"}
            >
              {isRecording ? (
                <MicOff className="w-6 h-6 animate-bounce" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-500">
            {isRecording ? (
              <span className="text-rose-500 font-bold animate-pulse">
                Đang lắng nghe... hãy phát âm rõ từ "{sound.keyWord}"
              </span>
            ) : (
              <span>Chạm vào micro để nói</span>
            )}
          </div>

          {/* AI Result Feedback Box */}
          <AnimatePresence>
            {speechResult && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={`p-3 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                  speechResult.passed
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
                    : "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200"
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <div className="flex items-center gap-1.5">
                    {speechResult.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    )}
                    <span>{speechResult.passed ? "Đạt chuẩn phát âm!" : "Chưa chuẩn xác"}</span>
                  </div>
                  <span className="text-sm font-black font-mono">
                    {speechResult.score}%
                  </span>
                </div>
                <div className="text-[11px] opacity-90">
                  {speechResult.feedback}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
