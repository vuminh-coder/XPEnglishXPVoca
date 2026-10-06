"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  CloudRain,
  Waves,
  Flame,
  Wind,
  Sliders,
  Sparkles,
  ChevronDown,
  X,
} from "lucide-react";
import {
  ambientSynthesizer,
  AMBIENCE_TRACKS,
  AmbienceType,
} from "@/features/listening/services/ambientAudioSynthesizer";

interface StudyAmbienceDockProps {
  className?: string;
  onTrackChanged?: (track: AmbienceType) => void;
}

export const StudyAmbienceDock: React.FC<StudyAmbienceDockProps> = ({
  className = "",
  onTrackChanged,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState<AmbienceType>("none");
  const [volume, setVolume] = useState<number>(35); // 0 to 100

  // Restore saved preference on client mount
  useEffect(() => {
    try {
      const savedTrack = localStorage.getItem("xp_study_ambience_track") as AmbienceType;
      const savedVol = localStorage.getItem("xp_study_ambience_volume");
      if (savedVol) {
        const v = parseInt(savedVol, 10);
        if (!isNaN(v)) {
          setVolume(v);
          ambientSynthesizer.setVolume(v / 100);
        }
      }
      if (savedTrack && savedTrack !== "none") {
        setActiveTrack(savedTrack);
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const handleSelectTrack = (trackId: AmbienceType) => {
    if (activeTrack === trackId) {
      // Toggle off
      setActiveTrack("none");
      ambientSynthesizer.stop();
      try {
        localStorage.setItem("xp_study_ambience_track", "none");
      } catch {}
      if (onTrackChanged) onTrackChanged("none");
    } else {
      setActiveTrack(trackId);
      ambientSynthesizer.play(trackId);
      try {
        localStorage.setItem("xp_study_ambience_track", trackId);
      } catch {}
      if (onTrackChanged) onTrackChanged(trackId);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    ambientSynthesizer.setVolume(newVol / 100);
    try {
      localStorage.setItem("xp_study_ambience_volume", newVol.toString());
    } catch {}
  };

  const currentTrackInfo = AMBIENCE_TRACKS.find((t) => t.id === activeTrack) || AMBIENCE_TRACKS[0];
  const isPlaying = activeTrack !== "none";

  const renderIcon = (id: AmbienceType, size: string = "w-4 h-4") => {
    switch (id) {
      case "rain":
        return <CloudRain className={size} />;
      case "waves":
        return <Waves className={size} />;
      case "fireplace":
        return <Flame className={size} />;
      case "forest":
        return <Wind className={size} />;
      default:
        return <VolumeX className={size} />;
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Compact Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border shadow-xs cursor-pointer select-none ${
          isPlaying
            ? "bg-[#0059bb]/10 border-[#0059bb]/40 text-[#0059bb] dark:bg-sky-500/20 dark:border-sky-500/40 dark:text-sky-300 ring-2 ring-[#0059bb]/20"
            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
        }`}
        title="Không gian âm thanh tập trung (Study With Me Ambience)"
        aria-label="Cài đặt âm thanh nền tập trung"
      >
        <div className="relative flex items-center justify-center">
          {renderIcon(activeTrack, "w-3.5 h-3.5")}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          )}
        </div>
        <span className="hidden sm:inline font-sans">
          {isPlaying ? currentTrackInfo.nameVn : "Âm thanh tập trung"}
        </span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Floating Ambience Control Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-72 sm:w-80 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Không gian tập trung (Study With Me)</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sound Selection Grid (4 sounds + Off) */}
            <div className="grid grid-cols-2 gap-2 mb-3.5">
              {AMBIENCE_TRACKS.filter((t) => t.id !== "none").map((track) => {
                const isSelected = activeTrack === track.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => handleSelectTrack(track.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0059bb]/10 border-[#0059bb] text-[#0059bb] dark:bg-sky-500/20 dark:border-sky-400 dark:text-sky-300 font-bold shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 font-medium"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected
                          ? "bg-[#0059bb] text-white dark:bg-sky-500"
                          : "bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {renderIcon(track.id, "w-4 h-4")}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs truncate">{track.nameVn}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                        {track.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Volume Slider with Rule 6 External Label & Rule 15 Box Border */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  <span>Âm lượng âm nền</span>
                </div>
                <span className="font-mono text-slate-500 dark:text-slate-400">{volume}%</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <VolumeX className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0059bb] dark:accent-sky-400"
                />
                <Volume2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>
            </div>

            {/* Quick Turn Off Button */}
            {isPlaying && (
              <button
                type="button"
                onClick={() => handleSelectTrack("none")}
                className="w-full mt-2.5 py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-center cursor-pointer"
              >
                Tắt âm thanh tập trung
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
