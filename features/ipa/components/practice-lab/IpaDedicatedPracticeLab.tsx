"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  Layers,
  Award,
  ArrowRight,
  Compass,
} from "lucide-react";
import { ALL_IPA_SOUNDS, IpaSound, getSoundDisplayHint } from "../../data/ipaData";
import { IpaSoundBadge } from "../shared/IpaSoundBadge";
import { IpaAudioPlayButton } from "../shared/IpaAudioPlayButton";
import { IpaMouthAnatomySvg } from "../shared/IpaMouthAnatomySvg";
import { IpaWordExampleCard } from "../shared/IpaWordExampleCard";
import { IpaSpeechRecorder } from "../shared/IpaSpeechRecorder";

export interface IpaDedicatedPracticeLabProps {
  initialSoundId?: string;
  className?: string;
}

export const IpaDedicatedPracticeLab: React.FC<IpaDedicatedPracticeLabProps> = ({
  initialSoundId,
  className = "",
}) => {
  const [selectedSoundId, setSelectedSoundId] = useState<string>(
    initialSoundId || ALL_IPA_SOUNDS[0].id
  );
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [accent, setAccent] = useState<"en-US" | "en-GB" | "en-AU">("en-US");
  const [activeWordTarget, setActiveWordTarget] = useState<string | null>(null);

  // Current Sound Object
  const currentSound = useMemo(() => {
    return (
      ALL_IPA_SOUNDS.find((s) => s.id === selectedSoundId) || ALL_IPA_SOUNDS[0]
    );
  }, [selectedSoundId]);

  // Current index for Prev/Next navigation
  const currentIndex = useMemo(() => {
    return ALL_IPA_SOUNDS.findIndex((s) => s.id === currentSound.id);
  }, [currentSound.id]);

  const handlePrevSound = useCallback(() => {
    const prevIdx = (currentIndex - 1 + ALL_IPA_SOUNDS.length) % ALL_IPA_SOUNDS.length;
    setSelectedSoundId(ALL_IPA_SOUNDS[prevIdx].id);
    setActiveWordTarget(null);
  }, [currentIndex]);

  const handleNextSound = useCallback(() => {
    const nextIdx = (currentIndex + 1) % ALL_IPA_SOUNDS.length;
    setSelectedSoundId(ALL_IPA_SOUNDS[nextIdx].id);
    setActiveWordTarget(null);
  }, [currentIndex]);

  // Current target word for microphone practice
  const currentPracticeWord = activeWordTarget || currentSound.keyWord;
  const currentPracticePhonetic = activeWordTarget
    ? currentSound.examples.find((e) => e.word === activeWordTarget)?.phonetic
    : currentSound.keyWordPhonetic;

  return (
    <div className={`space-y-6 select-none ${className}`}>
      {/* 1. TOP CAROUSEL SELECTOR PILLS (44 SOUNDS FAST PICKER) */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#0059bb]" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
              Chọn âm luyện tập ({currentIndex + 1}/44)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrevSound}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
              title="Âm trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextSound}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
              title="Âm tiếp theo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 44 Sound Pills Scrollable Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
          {ALL_IPA_SOUNDS.map((sound, idx) => {
            const isSelected = sound.id === currentSound.id;
            return (
              <button
                key={sound.id}
                type="button"
                onClick={() => {
                  setSelectedSoundId(sound.id);
                  setActiveWordTarget(null);
                }}
                className={`px-3 py-1.5 rounded-xl font-sans font-bold text-xs shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0059bb] text-white shadow-sm ring-2 ring-blue-400/30 scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                /{sound.symbol}/
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. DEDICATED 2-COLUMN BALANCED STUDIO (6/12 - 6/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* ──────────────────────────────────────────────────────── */}
        {/* LEFT COLUMN: ANATOMY & PHYSIOLOGY MATRIX (6/12) */}
        {/* ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 space-y-5">
          {/* Sound Overview & Accent Controls */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <IpaSoundBadge sound={currentSound} size="md" showCategoryTag />
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black font-sans text-slate-900 dark:text-white tracking-wide">
                    /{currentSound.symbol}/
                  </span>
                  <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                    {getSoundDisplayHint(currentSound)}
                  </span>
                </div>

                {/* Elegant Keyword Capsule right under the phonetic symbol */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5 shadow-2xs">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Từ mẫu:</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white capitalize">
                    {currentSound.keyWord}
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#0059bb] dark:text-sky-400">
                    {currentSound.keyWordPhonetic}
                  </span>
                </div>
              </div>

              {/* Accent & Rate Switchers */}
              <div className="flex flex-col items-end gap-2">
                {/* Accent pills */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  {(["en-US", "en-GB", "en-AU"] as const).map((acc) => (
                    <button
                      key={acc}
                      type="button"
                      onClick={() => setAccent(acc)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        accent === acc
                          ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-2xs"
                          : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {acc === "en-US" ? "Mỹ (US)" : acc === "en-GB" ? "Anh (UK)" : "Úc (AU)"}
                    </button>
                  ))}
                </div>

                {/* Speed buttons */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  {[0.75, 1.0].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setPlaybackRate(rate)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        playbackRate === rate
                          ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-2xs"
                          : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>

                {/* Main Play Audio Button */}
                <IpaAudioPlayButton
                  text={currentSound.audioSampleText}
                  rate={playbackRate}
                  accent={accent}
                  size="md"
                  variant="primary"
                  label="Nghe âm mẫu"
                />
              </div>
            </div>

            {/* Sơ đồ khẩu hình SVG tương tác */}
            <div className="pt-2">
              <div className="text-xs font-black uppercase tracking-wider text-slate-400 font-display mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#0059bb]" />
                <span>Sơ đồ giải phẫu khẩu hình (Sagittal Cross-Section)</span>
              </div>
              <IpaMouthAnatomySvg sound={currentSound} />
            </div>

            {/* Hướng dẫn phát âm tiếng Việt */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-slate-900 dark:text-white mr-1.5">
                Cách phát âm chuẩn:
              </span>
              {currentSound.vietnameseGuide}
            </div>
          </div>

          {/* Ma trận 4 thông số giải phẫu + Mẹo sư phạm */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 font-display">
              Thông số cấu âm & Mẹo độc quyền
            </h4>

            {/* 4 Anatomical Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Khẩu hình môi</div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {currentSound.mouthShape}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Vị trí lưỡi</div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {currentSound.tonguePosition}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Độ mở hàm</div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {currentSound.jawOpening}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Thanh quản</div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      currentSound.voicing === "voiced" ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                  <span>
                    {currentSound.voicing === "voiced" ? "Rung (Voiced)" : "Không rung (Voiceless)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Mẹo chuẩn & Cảnh báo lỗi sai */}
            <div className="space-y-2 pt-1">
              <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-[#0059bb] dark:text-sky-400 mr-1">Mẹo chuẩn:</span>
                  {currentSound.practiceTip}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-rose-600 dark:text-rose-400 mr-1">Lỗi hay gặp:</span>
                  {currentSound.commonMistakes}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────── */}
        {/* RIGHT COLUMN: AI SPEECH LAB & EXAMPLES (6/12) */}
        {/* ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 space-y-5">
          {/* AI Microphone Studio Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                  Phòng Thu Âm AI Microphone
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
                +15 XP & +5 Vàng
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Bật micro và phát âm to rõ từ mục tiêu bên dưới. Hệ thống AI sẽ phân tích âm lượng, cao độ và đối sánh với mẫu chuẩn bản xứ.
            </p>

            {/* Reusable Speech Recorder */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-white/5">
              <IpaSpeechRecorder
                targetWord={currentPracticeWord}
                targetPhonetic={currentPracticePhonetic}
                acceptableWords={currentSound.examples.map((e) => e.word)}
                xpReward={15}
              />
            </div>

            {/* Bottom Next Sound CTA */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400 font-medium">
                Đã luyện xong âm /{currentSound.symbol}/?
              </span>
              <button
                type="button"
                onClick={handleNextSound}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                <span>Âm tiếp theo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Word Examples Practice Deck */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 font-display">
                Từ vựng ví dụ thực tế ({currentSound.examples.length})
              </h4>
              <span className="text-[10px] text-slate-400 font-normal">
                Bấm vào thẻ để chọn từ này làm mẫu thu âm
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentSound.examples.map((example) => {
                const isTarget = activeWordTarget === example.word;
                return (
                  <IpaWordExampleCard
                    key={example.word}
                    example={example}
                    rate={playbackRate}
                    accent={accent}
                    className={isTarget ? "ring-2 ring-[#0059bb] bg-blue-50/80 dark:bg-blue-950/40" : ""}
                    onSelect={(ex) => setActiveWordTarget(ex.word)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
