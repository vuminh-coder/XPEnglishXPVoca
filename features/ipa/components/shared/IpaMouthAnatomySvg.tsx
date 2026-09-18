"use client";

import React, { useMemo } from "react";
import { IpaSound } from "../../data/ipaData";

export interface IpaMouthAnatomySvgProps {
  sound: IpaSound;
  width?: number;
  height?: number;
  className?: string;
}

export const IpaMouthAnatomySvg: React.FC<IpaMouthAnatomySvgProps> = ({
  sound,
  width = 280,
  height = 220,
  className = "",
}) => {
  // Derive dynamic anatomy coordinates based on sound parameters
  const anatomyConfig = useMemo(() => {
    const tp = sound.tonguePosition.toLowerCase();
    const ms = sound.mouthShape.toLowerCase();
    const jo = sound.jawOpening.toLowerCase();
    const isVoiced = sound.voicing === "voiced";
    const isNasal = sound.airflowManner.toLowerCase().includes("mũi") || sound.id.startsWith("c_m") || sound.id.startsWith("c_n") || sound.id.startsWith("c_ng");

    // 1. Tongue curve path:
    // M 80,180 (back/hyoid) ... Q control point ... End at tip
    let tonguePath = "M 80,180 Q 110,135 150,140 Q 185,145 195,150"; // default neutral

    if (tp.includes("cao") || tp.includes("high") || sound.symbol === "iː" || sound.symbol === "uː") {
      // High tongue position
      if (tp.includes("trước") || sound.symbol === "iː") {
        // High front: tip raises towards hard palate
        tonguePath = "M 80,180 Q 110,120 155,100 Q 190,95 200,125";
      } else {
        // High back: back of tongue raises towards soft palate (like /u:/)
        tonguePath = "M 80,180 Q 110,95 140,110 Q 175,135 195,160";
      }
    } else if (tp.includes("thấp") || tp.includes("low") || sound.symbol === "æ" || sound.symbol === "ɑː") {
      // Low tongue flat on mouth floor
      tonguePath = "M 80,180 Q 115,165 155,165 Q 185,165 200,165";
    } else if (sound.symbol === "θ" || sound.symbol === "ð") {
      // Interdental: tip protrudes between teeth
      tonguePath = "M 80,180 Q 120,140 160,135 Q 195,130 222,122";
    } else if (sound.symbol === "t" || sound.symbol === "d" || sound.symbol === "s" || sound.symbol === "z" || sound.symbol === "l") {
      // Alveolar: tip touches upper gum ridge
      tonguePath = "M 80,180 Q 120,140 160,130 Q 185,115 198,98";
    } else if (sound.symbol === "r") {
      // Retroflex: tip curls upward
      tonguePath = "M 80,180 Q 120,135 155,120 Q 175,100 178,82";
    }

    // 2. Lip Opening (Upper lip Y, Lower lip Y)
    let upperLipY = 110;
    let lowerLipY = 145;
    let lipShapeLabel = "Thả lỏng tự nhiên";

    if (ms.includes("tròn") || ms.includes("round") || sound.symbol === "uː" || sound.symbol === "ɔː" || sound.symbol === "w") {
      upperLipY = 118;
      lowerLipY = 138;
      lipShapeLabel = "Chu tròn môi (Rounded)";
    } else if (ms.includes("bè") || ms.includes("spread") || sound.symbol === "iː") {
      upperLipY = 112;
      lowerLipY = 135;
      lipShapeLabel = "Bè rộng như cười (Spread)";
    } else if (jo.includes("rộng") || jo.includes("open") || sound.symbol === "æ" || sound.symbol === "ɑː") {
      upperLipY = 105;
      lowerLipY = 158;
      lipShapeLabel = "Hàm mở rộng (Open)";
    }

    return {
      tonguePath,
      upperLipY,
      lowerLipY,
      lipShapeLabel,
      isVoiced,
      isNasal,
    };
  }, [sound]);

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* SVG Canvas Container */}
      <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-2xl bg-slate-900 border border-slate-800 p-2 shadow-inner overflow-hidden flex items-center justify-center">
        {/* Soft radial background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(0,89,187,0.18),transparent_70%)] pointer-events-none" />

        <svg
          viewBox="0 0 280 210"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradient for Tongue Surface */}
            <linearGradient id="tongueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e11d48" stopOpacity="0.95" />
            </linearGradient>

            {/* Gradient for Palate/Bone */}
            <linearGradient id="palateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>

          {/* 1. Hard & Soft Palate Roof (Vòm miệng) */}
          <path
            d="M 90,120 Q 120,60 180,65 Q 210,68 220,100"
            stroke="url(#palateGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Upper Gum Ridge (Chân răng trên) */}
          <circle cx="205" cy="98" r="3.5" fill="#94a3b8" />

          {/* Upper Teeth (Răng trên) */}
          <rect
            x="215"
            y="98"
            width="6"
            height="12"
            rx="1.5"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="0.8"
          />

          {/* Upper Lip (Môi trên) */}
          <path
            d={`M 205,75 Q 235,80 228,${anatomyConfig.upperLipY} Q 218,${anatomyConfig.upperLipY + 4} 210,${anatomyConfig.upperLipY}`}
            fill="#fda4af"
            stroke="#f43f5e"
            strokeWidth="1.2"
          />

          {/* 2. Lower Jaw, Teeth & Lip */}
          {/* Lower Teeth (Răng dưới) */}
          <rect
            x="213"
            y={anatomyConfig.lowerLipY - 14}
            width="6"
            height="11"
            rx="1.5"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="0.8"
          />

          {/* Lower Lip (Môi dưới) */}
          <path
            d={`M 205,175 Q 235,170 228,${anatomyConfig.lowerLipY} Q 218,${anatomyConfig.lowerLipY - 4} 210,${anatomyConfig.lowerLipY}`}
            fill="#fda4af"
            stroke="#f43f5e"
            strokeWidth="1.2"
          />

          {/* 3. Pharyngeal Wall & Vocal Chords Box (Thanh quản) */}
          <path
            d="M 80,120 L 75,190"
            stroke="#475569"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Vocal Chords Vibration Indicator */}
          <g transform="translate(68, 175)">
            <circle
              cx="0"
              cy="0"
              r={anatomyConfig.isVoiced ? "6" : "4"}
              fill={anatomyConfig.isVoiced ? "#10b981" : "#f59e0b"}
              className={anatomyConfig.isVoiced ? "animate-ping" : ""}
            />
            <circle
              cx="0"
              cy="0"
              r="4.5"
              fill={anatomyConfig.isVoiced ? "#10b981" : "#f59e0b"}
            />
            {anatomyConfig.isVoiced && (
              <path
                d="M -6,-5 Q -10,0 -6,5 M -10,-8 Q -16,0 -10,8"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </g>

          {/* 4. THE DYNAMIC TONGUE (Lưỡi biến đổi tọa độ) */}
          {/* Tongue body fill */}
          <path
            d={`${anatomyConfig.tonguePath} L 180,185 L 80,185 Z`}
            fill="url(#tongueGrad)"
            opacity="0.85"
            className="transition-all duration-500 ease-out"
          />
          {/* Tongue surface stroke */}
          <path
            d={anatomyConfig.tonguePath}
            stroke="#ffe4e6"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />

          {/* 5. Airflow Arrow (Luồng hơi) */}
          <path
            d={
              anatomyConfig.isNasal
                ? "M 85,160 Q 100,100 135,75 Q 170,50 220,55" // Nasal path up through nose cavity
                : "M 85,170 Q 120,130 160,110 Q 195,115 240,125" // Oral path out through lips
            }
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="4 3"
            strokeLinecap="round"
            className="animate-pulse"
          />

          {/* 6. High-Contrast Anatomical Labels */}
          <text x="120" y="52" fill="#94a3b8" fontSize="8.5" fontWeight="600">
            Vòm ngạc cứng
          </text>
          <text x="22" y="178" fill="#94a3b8" fontSize="8.5" fontWeight="600">
            Dây thanh
          </text>
          <text x="145" y="198" fill="#fda4af" fontSize="9" fontWeight="700">
            Lưỡi
          </text>
        </svg>

        {/* Current Sound Symbol Badge Floating */}
        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono font-bold text-sm shadow-xs flex items-center gap-1.5">
          <span className="text-sky-400">/{sound.symbol}/</span>
        </div>
      </div>

      {/* Anatomy Status Subtext */}
      <div className="w-full mt-2.5 px-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
        <span className="truncate">
          Môi: <strong className="text-slate-800 dark:text-slate-200">{sound.mouthShape}</strong>
        </span>
        <span className="truncate">
          Thanh quản:{" "}
          <strong className={sound.voicing === "voiced" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}>
            {sound.voicing === "voiced" ? "Rung (Voiced)" : "Không rung (Voiceless)"}
          </strong>
        </span>
      </div>
    </div>
  );
};
