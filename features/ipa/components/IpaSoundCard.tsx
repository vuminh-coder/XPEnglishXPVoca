"use client";

import React from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { IpaSound } from "../data/ipaData";

interface IpaSoundCardProps {
  sound: IpaSound;
  isSelected: boolean;
  isPlaying: boolean;
  onSelect: (sound: IpaSound) => void;
  onPlayAudio: (sound: IpaSound, e: React.MouseEvent) => void;
}

export const IpaSoundCard: React.FC<IpaSoundCardProps> = ({
  sound,
  isSelected,
  isPlaying,
  onSelect,
  onPlayAudio,
}) => {
  // Category-based semantic color styling (Rule 20: 60-30-10)
  const getBadgeStyle = () => {
    if (sound.category === "monophthong") {
      return {
        pill: "bg-blue-50 dark:bg-blue-950/50 text-[#0059bb] dark:text-sky-400 border-blue-200/70 dark:border-blue-800/50",
        symbol: "text-[#0059bb] dark:text-sky-400 group-hover:text-blue-600",
        accent: "bg-[#0059bb]",
        tag: sound.vowelLength === "long" ? "Nguyên âm dài" : "Nguyên âm ngắn",
      };
    }
    if (sound.category === "diphthong") {
      return {
        pill: "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200/70 dark:border-purple-800/50",
        symbol: "text-purple-600 dark:text-purple-400 group-hover:text-purple-500",
        accent: "bg-purple-600",
        tag: "Nguyên âm đôi",
      };
    }
    if (sound.voicing === "voiced") {
      return {
        pill: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/70 dark:border-emerald-800/50",
        symbol: "text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500",
        accent: "bg-emerald-600",
        tag: "Phụ âm hữu thanh",
      };
    }
    return {
      pill: "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200/70 dark:border-amber-800/50",
      symbol: "text-amber-600 dark:text-amber-400 group-hover:text-amber-500",
      accent: "bg-amber-500",
      tag: "Phụ âm vô thanh",
    };
  };

  const style = getBadgeStyle();

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      onClick={() => onSelect(sound)}
      className={`group relative p-1.5 rounded-2xl transition-all duration-200 cursor-pointer select-none ${
        isSelected
          ? "bg-blue-100 dark:bg-blue-900/40 ring-2 ring-[#0059bb] shadow-md shadow-blue-500/10"
          : "bg-slate-100/90 dark:bg-slate-800/50 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:shadow-xs border border-slate-200/70 dark:border-white/5"
      }`}
    >
      {/* Inner Core Container (Double-Bezel Architecture) */}
      <div className="rounded-xl p-3 bg-white dark:bg-slate-900 flex flex-col justify-between h-full min-h-[110px] border border-slate-100 dark:border-white/5 relative overflow-hidden">
        {/* Top Header: Badge & Audio Trigger */}
        <div className="flex items-center justify-between gap-1 w-full">
          <span
            className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-md border tracking-tight ${style.pill}`}
          >
            {sound.name}
          </span>

          <button
            type="button"
            onClick={(e) => onPlayAudio(sound, e)}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isPlaying
                ? "bg-[#0059bb] text-white animate-pulse shadow-sm"
                : "bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-[#0059bb] dark:text-slate-400 dark:hover:text-sky-300"
            }`}
            title={`Nghe phát âm âm /${sound.symbol}/`}
            aria-label={`Nghe phát âm âm ${sound.symbol}`}
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Large Phonetic Symbol */}
        <div className="text-center py-1">
          <div
            className={`text-2xl sm:text-3xl font-black font-mono tracking-tight transition-colors ${style.symbol}`}
          >
            /{sound.symbol}/
          </div>
        </div>

        {/* Bottom Footer: Keyword & Phonetic */}
        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-white/5">
          <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
            {sound.keyWord}
          </span>
          <span className="text-slate-600 dark:text-slate-300 font-mono text-[10px]">
            {sound.keyWordPhonetic}
          </span>
        </div>

        {/* Sound Wave Indicator when playing */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 animate-pulse" />
        )}
      </div>
    </motion.div>
  );
};
