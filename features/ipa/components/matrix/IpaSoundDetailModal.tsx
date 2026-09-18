"use client";

import React, { useEffect, useState } from "react";
import { X, Sparkles, AlertTriangle, Lightbulb, ExternalLink, Volume2 } from "lucide-react";
import { IpaSound, getSoundDisplayHint } from "../../data/ipaData";
import { IpaSoundBadge } from "../shared/IpaSoundBadge";
import { IpaAudioPlayButton } from "../shared/IpaAudioPlayButton";
import { IpaMouthAnatomySvg } from "../shared/IpaMouthAnatomySvg";
import { IpaWordExampleCard } from "../shared/IpaWordExampleCard";
import { IpaSpeechRecorder } from "../shared/IpaSpeechRecorder";
import { playIpaIsolatedSound, stopIpaAudio } from "@/shared/utils/ipaAudioPlayer";

export interface IpaSoundDetailModalProps {
  sound: IpaSound | null;
  isOpen: boolean;
  onClose: () => void;
  onGoToPracticeLab?: (sound: IpaSound) => void;
}

export const IpaSoundDetailModal: React.FC<IpaSoundDetailModalProps> = ({
  sound,
  isOpen,
  onClose,
  onGoToPracticeLab,
}) => {
  const [isPlayingIsolated, setIsPlayingIsolated] = useState(false);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        stopIpaAudio();
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      stopIpaAudio();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !sound) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm select-none"
      onClick={() => {
        stopIpaAudio();
        onClose();
      }}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto hide-scrollbar rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="text-3xl sm:text-4xl font-black font-sans text-slate-900 dark:text-white tracking-wide leading-none">
                /{sound.symbol}/
              </div>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-1">
                {getSoundDisplayHint(sound)}
              </span>
            </div>
            <div className="space-y-1.5">
              <IpaSoundBadge sound={sound} size="md" showCategoryTag />
              <div className="flex items-center gap-2 text-xs pt-0.5">
                <span className="text-slate-400 dark:text-slate-500 font-medium">Từ mẫu:</span>
                <span className="font-bold text-slate-900 dark:text-white capitalize">
                  {sound.keyWord}
                </span>
                <span className="font-mono text-[11px] font-semibold text-[#0059bb] dark:text-sky-400">
                  {sound.keyWordPhonetic}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                stopIpaAudio();
                setIsPlayingIsolated(true);
                playIpaIsolatedSound(sound.id, {
                  onPlay: () => setIsPlayingIsolated(true),
                  onEnd: () => setIsPlayingIsolated(false),
                  onError: () => setIsPlayingIsolated(false),
                });
                setTimeout(() => setIsPlayingIsolated(false), 1400);
              }}
              className={`h-9 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all ${
                isPlayingIsolated
                  ? "bg-[#0059bb] text-white ring-2 ring-blue-400/40 animate-pulse"
                  : "bg-[#0059bb] hover:bg-[#004ba0] text-white shadow-2xs"
              }`}
              title={`Phát âm cô lập /${sound.symbol}/`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Âm /{sound.symbol}/</span>
            </button>

            <IpaAudioPlayButton
              text={sound.keyWord}
              size="md"
              variant="secondary"
              label={sound.keyWord}
            />

            <button
              type="button"
              onClick={() => {
                stopIpaAudio();
                onClose();
              }}
              className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer transition-colors"
              title="Đóng (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Left Column: Sơ Đồ Khẩu Hình SVG (5/12) */}
          <div className="md:col-span-5 space-y-3">
            <IpaMouthAnatomySvg sound={sound} />

            {/* Vietnamese instruction box */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-slate-900 dark:text-white mr-1">Cách phát âm:</span>
              {sound.vietnameseGuide}
            </div>
          </div>

          {/* Right Column: Tips, Common Mistakes & Microphone (7/12) */}
          <div className="md:col-span-7 space-y-4">
            {/* Tips & Common Mistakes */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-[#0059bb] dark:text-sky-400 mr-1">Mẹo chuẩn:</span>
                  {sound.practiceTip}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-rose-600 dark:text-rose-400 mr-1">Lỗi hay gặp:</span>
                  {sound.commonMistakes}
                </div>
              </div>
            </div>

            {/* Reusable Speech Recorder */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-white/5">
              <IpaSpeechRecorder
                targetWord={sound.keyWord}
                targetPhonetic={sound.keyWordPhonetic}
                acceptableWords={sound.examples.map((e) => e.word)}
                xpReward={10}
              />
            </div>
          </div>
        </div>

        {/* Word Examples Section */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-display">
              Từ vựng ví dụ thực tế ({sound.examples.length})
            </span>
            {onGoToPracticeLab && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGoToPracticeLab(sound);
                }}
                className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Vào phòng thực hành chuyên sâu</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {sound.examples.map((ex) => (
              <IpaWordExampleCard key={ex.word} example={ex} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
