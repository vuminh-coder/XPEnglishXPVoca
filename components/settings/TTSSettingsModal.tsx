"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Settings, Sparkles, Check, X, Sliders, Globe, UserCheck } from "lucide-react";
import { getTTSSettings, saveTTSSettings, speakLessonText, getCategorizedVoices, TTSMode, TTSSettings } from "@/lib/utils/ttsEngine";

interface TTSSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TTSSettingsModal({ isOpen, onClose }: TTSSettingsModalProps) {
  const [settings, setSettings] = useState<TTSSettings>(getTTSSettings());
  const [voiceCount, setVoiceCount] = useState<number>(0);
  const [isPlayingTest, setIsPlayingTest] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setSettings(getTTSSettings());
      const profiles = getCategorizedVoices();
      setVoiceCount(profiles.length);

      // Handle voice load on Chrome
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = () => {
          setVoiceCount(getCategorizedVoices().length);
        };
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleModeChange = (mode: TTSMode) => {
    const updated = saveTTSSettings({ mode });
    setSettings(updated);
  };

  const handleSpeedChange = (speed: number) => {
    const updated = saveTTSSettings({ speed });
    setSettings(updated);
  };

  const handlePitchToggle = (pitchShift: boolean) => {
    const updated = saveTTSSettings({ pitchShift });
    setSettings(updated);
  };

  const handleTestVoice = () => {
    if (isPlayingTest) return;
    setIsPlayingTest(true);
    
    const sampleTexts: Record<TTSMode, string> = {
      lesson_random: "Welcome to XP English! This lesson voice is dynamically generated for you.",
      us: "Hello! This is a natural American English voice profile.",
      uk: "Brilliant! You are listening to a clear British English accent.",
      au: "G'day mate! Experience learning with an Australian accent.",
      multi_speaker: "Speaker one: Good morning! Speaker two: Hello, how can I help you today?",
    };

    speakLessonText(sampleTexts[settings.mode], {
      lessonId: "test_demo_lesson",
      speakerIndex: 0,
      rate: settings.speed,
      onEnd: () => setIsPlayingTest(false),
      onError: () => setIsPlayingTest(false),
    });
  };

  const modes: { id: TTSMode; label: string; desc: string; icon: string }[] = [
    {
      id: "lesson_random",
      label: "🎲 Ngẫu Nhiên Theo Bài (Khuyên Dùng)",
      desc: "Mỗi bài học tự động gán bộ giọng đọc đặc trưng nhất quán",
      icon: "✨",
    },
    {
      id: "multi_speaker",
      label: "🎭 Phân Vai Hội Thoại A/B",
      desc: "Tự động xoay giọng Nam/Nữ và US/UK khi 2 nhân vật giao tiếp",
      icon: "👥",
    },
    {
      id: "us",
      label: "🇺🇸 Ưu Tiên Giọng Mỹ (en-US)",
      desc: "Phát âm chuẩn giọng Mỹ cho từ vựng và bài nghe",
      icon: "🇺🇸",
    },
    {
      id: "uk",
      label: "🇬🇧 Ưu Tiên Giọng Anh (en-GB)",
      desc: "Phát âm chuẩn giọng Anh-Anh mượt mà",
      icon: "🇬🇧",
    },
    {
      id: "au",
      label: "🇦🇺 Ưu Tiên Giọng Úc (en-AU)",
      desc: "Giọng phát âm bản xứ Úc tự nhiên",
      icon: "🇦🇺",
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Volume2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Cài Đặt Giọng Đọc (TTS)</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {voiceCount > 0
                    ? `Đã phát hiện ${voiceCount} giọng đọc trên thiết bị`
                    : "Đang kết nối hệ thống giọng đọc thông minh..."}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-neutral-800 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="my-5 space-y-5">
            {/* Mode selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
                Chế Độ Phát Âm & Đa Dạng Giọng
              </label>
              <div className="space-y-2">
                {modes.map((m) => {
                  const isSelected = settings.mode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => handleModeChange(m.id)}
                      className={`w-full text-left p-3 rounded-xl border transition flex items-start gap-3 ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 dark:border-indigo-500"
                          : "border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 bg-slate-50/50 dark:bg-neutral-850/50"
                      }`}
                    >
                      <span className="text-xl leading-none mt-0.5">{m.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold text-sm ${isSelected ? "text-indigo-700 dark:text-indigo-300" : "text-slate-800 dark:text-slate-200"}`}>
                            {m.label}
                          </span>
                          {isSelected && <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{m.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Speed slider */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-850 border border-slate-100 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-indigo-500" />
                  Tốc độ đọc từ vựng / câu
                </label>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md">
                  {settings.speed.toFixed(2)}x
                </span>
              </div>
              <input
                type="range"
                min="0.75"
                max="1.25"
                step="0.05"
                value={settings.speed}
                onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-medium">
                <span>Chậm (0.75x)</span>
                <span>Chuẩn (1.0x)</span>
                <span>Nhanh (1.25x)</span>
              </div>
            </div>

            {/* Micro Pitch Variation Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-neutral-800">
              <div>
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 block">
                  Ngữ điệu tự nhiên (Micro Pitch Shift)
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Tự động điều chỉnh độ trầm bổng nhẹ để không bị giọng robot
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.pitchShift}
                onChange={(e) => handlePitchToggle(e.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-neutral-800 pt-4">
            <button
              onClick={handleTestVoice}
              disabled={isPlayingTest}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition disabled:opacity-50"
            >
              <Play className={`h-4 w-4 text-indigo-600 dark:text-indigo-400 ${isPlayingTest ? "animate-spin" : ""}`} />
              {isPlayingTest ? "Đang phát thử..." : "Nghe thử giọng mẫu"}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-md shadow-indigo-500/20"
            >
              Đã Xong
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
