"use client";

import React, { useId } from "react";
import { IpaSound } from "../../data/ipaData";
import { getFrontalLipGeometry } from "./anatomyGeometry";

export interface IpaFrontalLipShapeProps {
  sound: IpaSound;
  className?: string;
  showLabels?: boolean;
}

export const IpaFrontalLipShape: React.FC<IpaFrontalLipShapeProps> = ({
  sound,
  className = "",
  showLabels = true,
}) => {
  const uniqueId = useId().replace(/:/g, "_");
  const lip = getFrontalLipGeometry(sound);

  // Center coordinate of mouth canvas (360 x 260)
  const cx = 180;
  const cy = 125;

  // Aperture dimensions
  const hw = lip.width;
  const hh = lip.height;
  const isClosed = lip.category === "bilabial_closed";
  const isLabioDental = lip.category === "labiodental";

  // Outer lip contour bounds
  const outerW = hw * lip.outerScaleX + 35;
  const outerUpperH = 34 * lip.outerScaleY;
  const outerLowerH = 42 * lip.outerScaleY;

  return (
    <div className={`relative w-full aspect-[500/380] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors duration-300 ${className}`}>
      {/* Soft Blueprint Ambient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,89,187,0.06),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.08),transparent_70%)] pointer-events-none" />
      
      {/* Precision Micro-Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#0059bb 1px, transparent 1px), linear-gradient(90deg, #0059bb 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <svg
        viewBox="0 0 360 260"
        className="w-full h-full relative z-10 drop-shadow-sm max-h-[300px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Khẩu hình môi trực diện của âm /${sound.symbol}/`}
      >
        <defs>
          {/* Realistic Lip Flesh Gradient (Upper Lip) */}
          <linearGradient id={`upperLipGrad_${uniqueId}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="40%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>

          {/* Realistic Lip Flesh Gradient (Lower Lip) */}
          <linearGradient id={`lowerLipGrad_${uniqueId}`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="50%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#9f1239" />
          </linearGradient>

          {/* Oral Cavity Dark Depth */}
          <radialGradient id={`oralDepth_${uniqueId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="75%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#334155" />
          </radialGradient>

          {/* Tongue Color Gradient */}
          <linearGradient id={`tongueFrontGrad_${uniqueId}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#fecdd3" />
            <stop offset="60%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#9f1239" />
          </linearGradient>

          {/* Lip Specular Sheen Filter */}
          <filter id={`lipGlow_${uniqueId}`} x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 1. SURROUNDING FACIAL SHADOW (SOFT CHIN CONTOUR)          */}
        {/* ────────────────────────────────────────────────────────── */}
        {/* Soft sub-labial chin groove reflection */}
        <ellipse
          cx={cx}
          cy={cy + outerLowerH + 6}
          rx={outerW * 0.4}
          ry={3.5}
          fill="#000000"
          fillOpacity="0.05"
          className="dark:fill-slate-700"
        />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 2. ORAL CAVITY INTERIOR & TEETH (WHEN MOUTH IS OPEN)     */}
        {/* ────────────────────────────────────────────────────────── */}
        {!isClosed && (
          <g>
            {/* Oral Aperture Cavity Background */}
            <path
              d={`M ${cx - hw},${cy + lip.cornerDrop} 
                 C ${cx - hw * 0.5},${cy - hh} ${cx + hw * 0.5},${cy - hh} ${cx + hw},${cy + lip.cornerDrop} 
                 C ${cx + hw * 0.5},${cy + hh} ${cx - hw * 0.5},${cy + hh} ${cx - hw},${cy + lip.cornerDrop} Z`}
              fill={`url(#oralDepth_${uniqueId})`}
              stroke="#0f172a"
              strokeWidth="0.8"
            />

            {/* Tongue Visibility Inside Oral Cavity */}
            {lip.tongueVisibility === "protruding" && (
              /* Interdental /θ/, /ð/: Tongue tip resting between teeth */
              <g>
                <path
                  d={`M ${cx - 24},${cy + 2} 
                     C ${cx - 24},${cy + 16} ${cx - 14},${cy + 20} ${cx},${cy + 20} 
                     C ${cx + 14},${cy + 20} ${cx + 24},${cy + 16} ${cx + 24},${cy + 2} 
                     Z`}
                  fill={`url(#tongueFrontGrad_${uniqueId})`}
                  stroke="#fda4af"
                  strokeWidth="1.5"
                  className="drop-shadow-md animate-pulse"
                />
                <line x1={cx} y1={cy + 4} x2={cx} y2={cy + 17} stroke="#be123c" strokeWidth={1.5} strokeLinecap="round" opacity={0.6} />
              </g>
            )}

            {lip.tongueVisibility === "raised_alveolar" && (
              /* Alveolar contact /l/, /t/, /d/: Tongue blade arched behind upper teeth */
              <path
                d={`M ${cx - 32},${cy + 4} Q ${cx},${cy - 2} ${cx + 32},${cy + 4} Q ${cx},${cy + 12} ${cx - 32},${cy + 4} Z`}
                fill={`url(#tongueFrontGrad_${uniqueId})`}
                stroke="#fda4af"
                strokeWidth="1"
              />
            )}

            {lip.tongueVisibility === "elevated_back" && (
              /* Back vowels /ɔː/, /uː/, /oʊ/: Arched tongue dorsum clearly visible in oral depth */
              <g>
                <path
                  d={`M ${cx - hw * 0.75},${cy + hh * 0.6} 
                     C ${cx - hw * 0.45},${cy - hh * 0.15} ${cx + hw * 0.45},${cy - hh * 0.15} ${cx + hw * 0.75},${cy + hh * 0.6} 
                     C ${cx + hw * 0.45},${cy + hh * 0.85} ${cx - hw * 0.45},${cy + hh * 0.85} ${cx - hw * 0.75},${cy + hh * 0.6} Z`}
                  fill={`url(#tongueFrontGrad_${uniqueId})`}
                  stroke="#fda4af"
                  strokeWidth="1.2"
                  className="drop-shadow-xs"
                />
                <path
                  d={`M ${cx},${cy + hh * 0.05} L ${cx},${cy + hh * 0.5}`}
                  stroke="#be123c"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  opacity={0.4}
                />
              </g>
            )}

            {lip.tongueVisibility === "low_flat" && (
              /* Open vowels: Tongue flat on floor of mouth */
              <path
                d={`M ${cx - hw * 0.75},${cy + hh * 0.3} Q ${cx},${cy + hh * 0.2} ${cx + hw * 0.75},${cy + hh * 0.3} Q ${cx},${cy + hh} ${cx - hw * 0.75},${cy + hh * 0.3} Z`}
                fill={`url(#tongueFrontGrad_${uniqueId})`}
                stroke="#fda4af"
                strokeWidth="1"
                opacity={0.85}
              />
            )}

            {/* Upper Dental Arch (Cung Răng Trên Tự Nhiên) */}
            {lip.showUpperTeeth && (
              <g className="drop-shadow-xs">
                {/* Scalloped Gingiva / Gum Margin */}
                <path
                  d={`M ${cx - 44},${cy - hh * 0.35} 
                     Q ${cx - 24},${cy - hh * 0.7} ${cx},${cy - hh * 0.75} 
                     Q ${cx + 24},${cy - hh * 0.7} ${cx + 44},${cy - hh * 0.35}`}
                  stroke="#fb7185"
                  strokeWidth="2.2"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Central Incisors (Răng cửa giữa to bản, hơi khum nhẹ) */}
                <path
                  d={`M ${cx - 15},${cy - hh * 0.7} L ${cx - 1},${cy - hh * 0.7} L ${cx - 1},${cy - hh * 0.7 + 13} Q ${cx - 8},${cy - hh * 0.7 + 13.5} ${cx - 15},${cy - hh * 0.7 + 12.5} Z`}
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />
                <path
                  d={`M ${cx + 1},${cy - hh * 0.7} L ${cx + 15},${cy - hh * 0.7} L ${cx + 15},${cy - hh * 0.7 + 12.5} Q ${cx + 8},${cy - hh * 0.7 + 13.5} ${cx + 1},${cy - hh * 0.7 + 13} Z`}
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />
                {/* Lateral Incisors (Răng cửa bên thon gọn, cao hơn nhẹ) */}
                <path
                  d={`M ${cx - 28},${cy - hh * 0.58} L ${cx - 16},${cy - hh * 0.65} L ${cx - 16},${cy - hh * 0.65 + 11.5} L ${cx - 28},${cy - hh * 0.58 + 10.5} Z`}
                  fill="#f1f5f9"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />
                <path
                  d={`M ${cx + 16},${cy - hh * 0.65} L ${cx + 28},${cy - hh * 0.58} L ${cx + 28},${cy - hh * 0.58 + 10.5} L ${cx + 16},${cy - hh * 0.65 + 11.5} Z`}
                  fill="#f1f5f9"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />
                {/* Canines (Răng nanh vát nhẹ ở rìa) */}
                <path
                  d={`M ${cx - 39},${cy - hh * 0.44} L ${cx - 29},${cy - hh * 0.52} L ${cx - 29},${cy - hh * 0.52 + 10} L ${cx - 39},${cy - hh * 0.44 + 8.5} Z`}
                  fill="#e2e8f0"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />
                <path
                  d={`M ${cx + 29},${cy - hh * 0.52} L ${cx + 39},${cy - hh * 0.44} L ${cx + 39},${cy - hh * 0.44 + 8.5} L ${cx + 29},${cy - hh * 0.52 + 10} Z`}
                  fill="#e2e8f0"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />
              </g>
            )}

            {/* Lower Dental Arch (Cung Răng Dưới Tự Nhiên) */}
            {lip.showLowerTeeth && lip.teethGap > 6 && !isLabioDental && (
              <g className="drop-shadow-xs">
                {/* Central & Lateral Lower Incisors with gentle smile curve */}
                <path
                  d={`M ${cx - 13},${cy + hh * 0.6 - 7} L ${cx - 1},${cy + hh * 0.6 - 7} L ${cx - 1},${cy + hh * 0.6 + 4} L ${cx - 13},${cy + hh * 0.6 + 4} Z`}
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="0.75"
                />
                <path
                  d={`M ${cx + 1},${cy + hh * 0.6 - 7} L ${cx + 13},${cy + hh * 0.6 - 7} L ${cx + 13},${cy + hh * 0.6 + 4} L ${cx + 1},${cy + hh * 0.6 + 4} Z`}
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="0.75"
                />
                <path
                  d={`M ${cx - 25},${cy + hh * 0.52 - 6} L ${cx - 14},${cy + hh * 0.58 - 7} L ${cx - 14},${cy + hh * 0.58 + 4} L ${cx - 25},${cy + hh * 0.52 + 3} Z`}
                  fill="#f1f5f9"
                  stroke="#cbd5e1"
                  strokeWidth="0.75"
                />
                <path
                  d={`M ${cx + 14},${cy + hh * 0.58 - 7} L ${cx + 25},${cy + hh * 0.52 - 6} L ${cx + 25},${cy + hh * 0.52 + 3} L ${cx + 14},${cy + hh * 0.58 + 4} Z`}
                  fill="#f1f5f9"
                  stroke="#cbd5e1"
                  strokeWidth="0.75"
                />
              </g>
            )}
          </g>
        )}

        {/* ────────────────────────────────────────────────────────── */}
        {/* 3. REALISTIC UPPER LIP (CUPID'S BOW & SEAMLESS CORNERS)   */}
        {/* ────────────────────────────────────────────────────────── */}
        <path
          d={`M ${cx - outerW},${cy + lip.cornerDrop} 
             C ${cx - outerW * 0.5},${cy - outerUpperH} ${cx - 14},${cy - outerUpperH - 4} ${cx - 4},${cy - outerUpperH + 1} 
             C ${cx - 1},${cy - outerUpperH + 3} ${cx + 1},${cy - outerUpperH + 3} ${cx + 4},${cy - outerUpperH + 1} 
             C ${cx + 14},${cy - outerUpperH - 4} ${cx + outerW * 0.5},${cy - outerUpperH} ${cx + outerW},${cy + lip.cornerDrop} 
             ${
               isClosed
                 ? `Q ${cx},${cy + lip.cornerDrop + 1} ${cx - outerW},${cy + lip.cornerDrop} Z`
                 : `C ${cx + hw * 0.8},${cy - hh * 0.4} ${cx + hw * 0.4},${cy - hh} ${cx},${cy - hh} 
                    C ${cx - hw * 0.4},${cy - hh} ${cx - hw * 0.8},${cy - hh * 0.4} ${cx - outerW},${cy + lip.cornerDrop} Z`
             }`}
          fill={`url(#upperLipGrad_${uniqueId})`}
          stroke="#be123c"
          strokeWidth="1.3"
          strokeLinejoin="round"
          className="drop-shadow-sm transition-all duration-300"
        />

        {/* Cupid's bow highlight sheen */}
        <path
          d={`M ${cx - 12},${cy - outerUpperH + 1} Q ${cx - 4},${cy - outerUpperH + 4} ${cx},${cy - outerUpperH + 4} Q ${cx + 4},${cy - outerUpperH + 4} ${cx + 12},${cy - outerUpperH + 1}`}
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={0.45}
        />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 4. REALISTIC LOWER LIP (FULL POUT & SEAMLESS CORNERS)     */}
        {/* ────────────────────────────────────────────────────────── */}
        <path
          d={`M ${cx - outerW},${cy + lip.cornerDrop} 
             C ${cx - outerW * 0.55},${cy + outerLowerH} ${cx + outerW * 0.55},${cy + outerLowerH} ${cx + outerW},${cy + lip.cornerDrop} 
             ${
               isClosed
                 ? `Q ${cx},${cy + lip.cornerDrop - 1} ${cx - outerW},${cy + lip.cornerDrop} Z`
                 : isLabioDental
                 ? `Q ${cx},${cy + 2} ${cx - outerW},${cy + lip.cornerDrop} Z`
                 : `C ${cx + hw * 0.8},${cy + hh * 0.4} ${cx + hw * 0.4},${cy + hh} ${cx},${cy + hh} 
                    C ${cx - hw * 0.4},${cy + hh} ${cx - hw * 0.8},${cy + hh * 0.4} ${cx - outerW},${cy + lip.cornerDrop} Z`
             }`}
          fill={`url(#lowerLipGrad_${uniqueId})`}
          stroke="#be123c"
          strokeWidth="1.3"
          strokeLinejoin="round"
          className="drop-shadow-sm transition-all duration-300"
        />

        {/* Lower lip central fullness reflection */}
        <path
          d={`M ${cx - 22},${cy + outerLowerH * 0.52} Q ${cx},${cy + outerLowerH * 0.62} ${cx + 22},${cy + outerLowerH * 0.52}`}
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity={0.4}
        />

        {/* Delicate commissure angle creases (Khóe miệng mềm mại) */}
        <path
          d={`M ${cx - outerW + 3},${cy + lip.cornerDrop - 1} Q ${cx - outerW - 1},${cy + lip.cornerDrop} ${cx - outerW + 3},${cy + lip.cornerDrop + 2}`}
          stroke="#881337"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d={`M ${cx + outerW - 3},${cy + lip.cornerDrop - 1} Q ${cx + outerW + 1},${cy + lip.cornerDrop} ${cx + outerW - 3},${cy + lip.cornerDrop + 2}`}
          stroke="#881337"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Labiodental /f/, /v/ special visual cue: Upper front teeth cutting into lower lip */}
        {isLabioDental && (
          <g transform={`translate(${cx - 18}, ${cy - 4})`} className="drop-shadow-md">
            <rect x={0} y={0} width={17} height={12} rx={2} fill="#ffffff" stroke="#cbd5e1" strokeWidth={0.8} />
            <rect x={19} y={0} width={17} height={12} rx={2} fill="#ffffff" stroke="#cbd5e1" strokeWidth={0.8} />
            <path d="M -4,11 Q 18,14 40,11" stroke="#be123c" strokeWidth={1.5} fill="none" />
          </g>
        )}

        {/* ────────────────────────────────────────────────────────── */}
        {/* 5. RADIAL PUCKERING CREASES (FOR ROUNDED VOWELS /uː/, /w/) */}
        {/* ────────────────────────────────────────────────────────── */}
        {lip.lipPuckered && (
          <g stroke="#be123c" strokeWidth="1.2" strokeLinecap="round" opacity={0.55}>
            <line x1={cx - 16} y1={cy - outerUpperH + 4} x2={cx - 12} y2={cy - outerUpperH + 12} />
            <line x1={cx + 16} y1={cy - outerUpperH + 4} x2={cx + 12} y2={cy - outerUpperH + 12} />
            <line x1={cx - 18} y1={cy + outerLowerH - 6} x2={cx - 14} y2={cy + outerLowerH - 14} />
            <line x1={cx + 18} y1={cy + outerLowerH - 6} x2={cx + 14} y2={cy + outerLowerH - 14} />
          </g>
        )}

        {/* ────────────────────────────────────────────────────────── */}
        {/* 6. OUTWARD ACOUSTIC EMISSION PARTICLES                    */}
        {/* ────────────────────────────────────────────────────────── */}
        <g transform={`translate(${cx}, ${cy})`}>
          <circle cx={0} cy={0} r={hw * 1.1 + 12} stroke="#0059bb" strokeWidth={1.5} strokeDasharray="4 6" className="animate-ping opacity-30 dark:stroke-sky-400" />
        </g>
      </svg>

      {/* Frontal Configuration Label Pill */}
      {showLabels && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-md text-xs">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
            <span className="font-bold text-slate-800 dark:text-slate-200 shrink-0">
              Khẩu hình mặt trước
            </span>
            <span className="hidden sm:inline text-slate-400 dark:text-slate-500">|</span>
            <span className="text-slate-600 dark:text-slate-300 truncate max-w-[280px]">
              {lip.descriptionVi}
            </span>
          </div>

          <div className="hidden xs:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300 shadow-sm">
            <span>{lip.category.replace(/_/g, " ").toUpperCase()}</span>
          </div>
        </div>
      )}
    </div>
  );
};
