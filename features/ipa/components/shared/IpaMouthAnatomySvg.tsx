"use client";

import React, { useMemo } from "react";
import { IpaSound } from "../../data/ipaData";

export interface IpaMouthAnatomySvgProps {
  sound: IpaSound;
  className?: string;
}

export const IpaMouthAnatomySvg: React.FC<IpaMouthAnatomySvgProps> = ({
  sound,
  className = "",
}) => {
  // Derive dynamic anatomy coordinates based on sound parameters
  const anatomyConfig = useMemo(() => {
    const tp = sound.tonguePosition.toLowerCase();
    const ms = sound.mouthShape.toLowerCase();
    const jo = sound.jawOpening.toLowerCase();
    const isVoiced = sound.voicing === "voiced";
    const isNasal =
      sound.airflowManner.toLowerCase().includes("mũi") ||
      sound.id.startsWith("c_m") ||
      sound.id.startsWith("c_n") ||
      sound.id.startsWith("c_ng");

    // Dynamic tongue path
    let tonguePath = "M 75,175 Q 110,135 150,140 Q 185,145 195,150";

    if (tp.includes("cao") || tp.includes("high") || sound.symbol === "iː" || sound.symbol === "uː") {
      if (tp.includes("trước") || sound.symbol === "iː") {
        tonguePath = "M 75,175 Q 110,115 155,95 Q 190,92 200,120";
      } else {
        tonguePath = "M 75,175 Q 110,90 140,105 Q 175,130 195,155";
      }
    } else if (tp.includes("thấp") || tp.includes("low") || sound.symbol === "æ" || sound.symbol === "ɑː") {
      tonguePath = "M 75,175 Q 115,165 155,165 Q 185,165 200,165";
    } else if (sound.symbol === "θ" || sound.symbol === "ð") {
      tonguePath = "M 75,175 Q 120,135 160,130 Q 195,125 224,118";
    } else if (
      sound.symbol === "t" ||
      sound.symbol === "d" ||
      sound.symbol === "s" ||
      sound.symbol === "z" ||
      sound.symbol === "l"
    ) {
      tonguePath = "M 75,175 Q 120,135 160,125 Q 185,110 198,92";
    } else if (sound.symbol === "r") {
      tonguePath = "M 75,175 Q 120,130 155,115 Q 175,95 178,78";
    }

    // Lip opening bounds
    let upperLipY = 108;
    let lowerLipY = 142;

    if (ms.includes("tròn") || ms.includes("round") || sound.symbol === "uː" || sound.symbol === "ɔː" || sound.symbol === "w") {
      upperLipY = 115;
      lowerLipY = 135;
    } else if (ms.includes("bè") || ms.includes("spread") || sound.symbol === "iː") {
      upperLipY = 110;
      lowerLipY = 132;
    } else if (jo.includes("rộng") || jo.includes("open") || sound.symbol === "æ" || sound.symbol === "ɑː") {
      upperLipY = 102;
      lowerLipY = 155;
    }

    return {
      tonguePath,
      upperLipY,
      lowerLipY,
      isVoiced,
      isNasal,
    };
  }, [sound]);

  return (
    <div className={`space-y-3 select-none ${className}`}>
      {/* 1. Elegant SVG Articulation Graphic Canvas */}
      <div className="relative w-full aspect-[16/10] rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 p-3 flex items-center justify-center overflow-hidden shadow-inner">
        {/* Ambient radial accent background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(0,89,187,0.08),transparent_65%)] pointer-events-none" />

        <svg
          viewBox="0 0 280 200"
          className="w-full h-full max-h-[190px] drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="tongueFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#e11d48" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="palateRoof" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>

          {/* Hard & Soft Palate Roof */}
          <path
            d="M 85,115 Q 120,58 180,62 Q 210,65 220,95"
            stroke="url(#palateRoof)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Upper Gum Ridge */}
          <circle cx="204" cy="94" r="3" fill="#94a3b8" />

          {/* Upper Teeth */}
          <rect
            x="214"
            y="94"
            width="6"
            height="12"
            rx="1.5"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="0.8"
          />

          {/* Upper Lip */}
          <path
            d={`M 205,72 Q 235,76 228,${anatomyConfig.upperLipY} Q 218,${anatomyConfig.upperLipY + 4} 210,${anatomyConfig.upperLipY}`}
            fill="#fecdd3"
            stroke="#f43f5e"
            strokeWidth="1.2"
          />

          {/* Lower Teeth */}
          <rect
            x="212"
            y={anatomyConfig.lowerLipY - 14}
            width="6"
            height="11"
            rx="1.5"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="0.8"
          />

          {/* Lower Lip */}
          <path
            d={`M 205,170 Q 235,166 228,${anatomyConfig.lowerLipY} Q 218,${anatomyConfig.lowerLipY - 4} 210,${anatomyConfig.lowerLipY}`}
            fill="#fecdd3"
            stroke="#f43f5e"
            strokeWidth="1.2"
          />

          {/* Back Wall */}
          <path
            d="M 75,115 L 70,185"
            stroke="#94a3b8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Vocal Chords Vibration Dot */}
          <g transform="translate(64, 172)">
            <circle
              cx="0"
              cy="0"
              r={anatomyConfig.isVoiced ? "5.5" : "3.5"}
              fill={anatomyConfig.isVoiced ? "#10b981" : "#f59e0b"}
              className={anatomyConfig.isVoiced ? "animate-ping" : ""}
            />
            <circle
              cx="0"
              cy="0"
              r="4"
              fill={anatomyConfig.isVoiced ? "#10b981" : "#f59e0b"}
            />
          </g>

          {/* The Dynamic Smooth Tongue Body */}
          <path
            d={`${anatomyConfig.tonguePath} L 180,180 L 75,180 Z`}
            fill="url(#tongueFill)"
            opacity="0.8"
            className="transition-all duration-400 ease-out"
          />
          <path
            d={anatomyConfig.tonguePath}
            stroke="#fda4af"
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-400 ease-out"
          />

          {/* Airflow Guide Arrow */}
          <path
            d={
              anatomyConfig.isNasal
                ? "M 80,155 Q 95,95 130,70 Q 165,48 215,52"
                : "M 80,165 Q 115,125 155,105 Q 190,110 235,120"
            }
            stroke="#0059bb"
            strokeWidth="2"
            strokeDasharray="4 3"
            strokeLinecap="round"
            className="animate-pulse"
          />

          {/* Anatomical Text Callouts */}
          <text x="115" y="48" fill="#64748b" fontSize="8.5" fontWeight="600">
            Vòm ngạc
          </text>
          <text x="18" y="174" fill="#64748b" fontSize="8.5" fontWeight="600">
            Dây thanh
          </text>
          <text x="145" y="192" fill="#e11d48" fontSize="9" fontWeight="700">
            Lưỡi
          </text>
        </svg>

        {/* Current Sound Symbol Watermark */}
        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-white font-sans font-bold text-xs shadow-2xs">
          /{sound.symbol}/
        </div>
      </div>

      {/* 2. 3 Clean Floating Micro-Capsules (Replaces the ugly raw text lines) */}
      <div className="grid grid-cols-3 gap-2">
        {/* Lip Shape Capsule */}
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 text-center">
          <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-tight">Khẩu hình môi</div>
          <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
            {sound.mouthShape}
          </div>
        </div>

        {/* Tongue Position Capsule */}
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 text-center">
          <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-tight">Vị trí lưỡi</div>
          <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
            {sound.tonguePosition}
          </div>
        </div>

        {/* Voicing Capsule */}
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 text-center">
          <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-tight">Thanh quản</div>
          <div className="text-[11px] font-bold mt-0.5 flex items-center justify-center gap-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                sound.voicing === "voiced" ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span
              className={
                sound.voicing === "voiced"
                  ? "text-emerald-700 dark:text-emerald-400 truncate"
                  : "text-amber-700 dark:text-amber-400 truncate"
              }
            >
              {sound.voicing === "voiced" ? "Hữu thanh (Rung)" : "Vô thanh (Bật hơi)"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
