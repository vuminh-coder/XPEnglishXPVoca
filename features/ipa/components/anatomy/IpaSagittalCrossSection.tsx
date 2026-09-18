"use client";

import React, { useId } from "react";
import { IpaSound } from "../../data/ipaData";
import { getSagittalGeometry } from "./anatomyGeometry";

export interface IpaSagittalCrossSectionProps {
  sound: IpaSound;
  className?: string;
  showLabels?: boolean;
  showPins?: boolean;
}

export const IpaSagittalCrossSection: React.FC<IpaSagittalCrossSectionProps> = ({
  sound,
  className = "",
  showLabels = true,
  showPins = true,
}) => {
  const uniqueId = useId().replace(/:/g, "_");
  const geo = getSagittalGeometry(sound);

  // Dynamic chin and lower jaw coordinates based on mandible drop
  const chinY = 262 + geo.mandibleDropY;
  const gnathionY = 278 + geo.mandibleDropY;
  const submentalY = 305 + geo.mandibleDropY * 0.5;

  return (
    <div className={`relative w-full aspect-[500/380] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors duration-300 ${className}`}>
      {/* Soft Blueprint / Medical Studio Ambient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_45%,rgba(0,89,187,0.06),transparent_70%)] dark:bg-[radial-gradient(circle_at_62%_45%,rgba(56,189,248,0.08),transparent_70%)] pointer-events-none" />
      
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
        viewBox="0 0 500 380"
        className="w-full h-full relative z-10 drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Sơ đồ giải phẫu khẩu hình âm /${sound.symbol}/`}
      >
        <defs>
          {/* Natural Living Tissue Tongue Gradient */}
          <linearGradient id={`tongueGrad_${uniqueId}`} x1="30%" y1="100%" x2="70%" y2="0%">
            <stop offset="0%" stopColor="#9f1239" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#e11d48" stopOpacity="0.88" />
            <stop offset="85%" stopColor="#fb7185" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fda4af" stopOpacity="0.95" />
          </linearGradient>

          {/* Cranial & Mandibular Bone Gradient */}
          <linearGradient id={`boneGrad_${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.6" />
          </linearGradient>

          {/* Bone Dark Mode Gradient */}
          <linearGradient id={`boneGradDark_${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#334155" stopOpacity="0.8" />
          </linearGradient>

          {/* Soft Palate Muscular Velvet Gradient */}
          <linearGradient id={`velumGrad_${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>

          {/* Nasal Cavity Soft Flow Gradient */}
          <radialGradient id={`nasalHaze_${uniqueId}`} cx="55%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#0284c7" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>

          {/* Airflow Glow Filter */}
          <filter id={`airflowGlow_${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Spotlight Pulsing Glow */}
          <filter id={`spotGlow_${uniqueId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 1. REAL HUMAN PROFILE SILHOUETTE                          */}
        {/* Safe boundary: Terminates cleanly at Y=310, above card   */}
        {/* ────────────────────────────────────────────────────────── */}
        {/* Cranial Vault, Forehead, Nose, Philtrum & Upper Lip */}
        <path
          d={`M 115,310 
             C 105,250 92,180 95,135 
             C 100,75 145,38 210,32 
             C 265,26 300,45 318,65 
             C 328,78 330,95 328,110 
             C 326,120 328,126 328,126 
             C 332,138 344,156 366,175 
             C 362,184 350,188 346,190 
             C 346,195 348,202 ${geo.upperLipX},${geo.upperLipY} 
             ${
               geo.lipsContact
                 ? `L 350,215`
                 : `C ${geo.upperLipX - 6},${geo.upperLipY + 4} 344,212 342,215`
             }`}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-400 dark:text-slate-600 transition-all duration-300"
        />

        {/* Lower Lip, Labiomental Groove, Chin & Neck (Ends safely at Y=310) */}
        <path
          d={`M ${geo.lipsContact ? "350,215" : "342,217"} 
             C 344,220 ${geo.lowerLipX},${geo.lowerLipY} ${geo.lowerLipX},${geo.lowerLipY} 
             C ${geo.lowerLipX - 6},${geo.lowerLipY + 8} 336,238 336,244 
             C 336,252 344,258 344,${chinY} 
             C 344,${chinY + 8} 336,${gnathionY} 334,${gnathionY} 
             C 310,${gnathionY + 10} 280,${submentalY} 265,${submentalY} 
             L 260,310`}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-400 dark:text-slate-600 transition-all duration-300"
        />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 2. REALISTIC NASAL CAVITY (KHOANG MŨI SINH HỌC)          */}
        {/* Continuous from nostril opening to nasopharynx           */}
        {/* ────────────────────────────────────────────────────────── */}
        <path
          d="M 346,190 
             C 335,160 295,145 240,150 
             C 215,155 204,165 200,175 
             L 240,188 
             C 285,185 320,186 338,190 
             Z"
          fill={`url(#nasalHaze_${uniqueId})`}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          className="text-slate-300 dark:text-slate-700"
        />
        {/* Nasal Turbinate Concha contours */}
        <path
          d="M 295,165 C 275,166 250,170 236,174"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          className="text-slate-300 dark:text-slate-700"
        />


        {/* ────────────────────────────────────────────────────────── */}
        {/* 3. HARD PALATE & MAXILLARY BONE (VÒM NGẠC CỨNG & XƯƠNG HÀM)*/}
        {/* Continuous bony palate separating nasal floor and oral roof */}
        {/* ────────────────────────────────────────────────────────── */}
        <path
          d="M 326,205 C 302,194 268,190 240,192 L 240,198 C 268,196 302,200 326,209 Z"
          fill={`url(#boneGrad_${uniqueId})`}
          stroke="#cbd5e1"
          strokeWidth="1.3"
          strokeLinejoin="round"
          className="text-slate-400 dark:text-slate-600 dark:fill-slate-800"
        />

        {/* Maxillary Alveolar Bone (Khối xương hàm trên nâng đỡ răng) */}
        <path
          d="M 330,190 C 336,190 342,193 344,204 L 332,204 C 328,198 326,192 330,190 Z"
          fill={`url(#boneGrad_${uniqueId})`}
          stroke="#cbd5e1"
          strokeWidth="1"
          className="dark:fill-slate-700 dark:stroke-slate-600"
        />

        {/* Alveolar Ridge Elevation (Gờ Chân Răng Trên / Lợi) */}
        <path
          d="M 318,206 C 322,204 326,204 330,202"
          stroke="#0059bb"
          strokeWidth="2.8"
          strokeLinecap="round"
          className="dark:stroke-sky-400 opacity-90"
        />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 4. UPPER INCISOR TOOTH & GINGIVA (RĂNG CỬA TRÊN CẮM XƯƠNG)*/}
        {/* ────────────────────────────────────────────────────────── */}
        {/* Upper Incisor Root (Chân răng cắm sâu vào xương hàm trên) */}
        <path
          d="M 334,204 L 338,193 L 342,205 Z"
          fill="#e2e8f0"
          stroke="#cbd5e1"
          strokeWidth="0.8"
          className="dark:fill-slate-700 dark:stroke-slate-600"
        />
        {/* Upper Gingiva / Gum collar (Nướu viền san hô ôm cổ răng) */}
        <path
          d="M 331,206 C 333,201 343,202 345,207 C 343,210 333,209 331,206 Z"
          fill="#fb7185"
          fillOpacity="0.9"
          stroke="#f43f5e"
          strokeWidth="0.8"
        />
        {/* Upper Incisor Crown (Thân men răng cửa trên khum nhẹ) */}
        <path
          d="M 334,204 L 342,205 L 340,217 C 337,218 334,218 332,216 Z"
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeLinejoin="round"
          className="drop-shadow-xs"
        />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 5. SOFT PALATE & UVULA (VÒM MỀM & LƯỠI GÀ ĐỘNG)          */}
        {/* Seamless muscular curtain extending from posterior palate */}
        {/* ────────────────────────────────────────────────────────── */}
        <path
          d={geo.velumPath}
          fill={`url(#velumGrad_${uniqueId})`}
          stroke="#be123c"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300 ease-out drop-shadow-xs"
        />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 6. POSTERIOR PHARYNGEAL WALL (THÀNH SAU HỌNG CONG SINH LÝ)*/}
        {/* Follows natural cervical lordosis of human spine          */}
        {/* ────────────────────────────────────────────────────────── */}
        {/* Outer muscular wall */}
        <path
          d="M 202,155 C 196,195 194,240 191,305"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          className="text-slate-200 dark:text-slate-800"
        />
        {/* Inner mucous lining */}
        <path
          d="M 205,155 C 199,195 197,240 194,305"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-slate-400 dark:text-slate-600"
        />

        {/* Epiglottis Flap (Nắp thanh môn bảo vệ đường thở) */}
        <path
          d="M 204,282 C 206,270 209,268 208,284 Z"
          fill="#f43f5e"
          fillOpacity="0.75"
          stroke="#be123c"
          strokeWidth="0.8"
        />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 7. LARYNX & VOCAL CORDS (THANH QUẢN & DÂY THANH)          */}
        {/* ────────────────────────────────────────────────────────── */}
        <g transform="translate(192, 306)">
          {/* Thyroid cartilage notch (Lồi sụn giáp quả táo Adam) */}
          <path
            d="M 0, -10 L 9, 0 L 0, 10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="text-slate-400 dark:text-slate-600"
          />
          {geo.isVoiced ? (
            /* Voiced: Vibrating glottis with acoustic ripples */
            <g className="cursor-pointer">
              <circle cx="5" cy="0" r="13" fill="#10b981" opacity="0.22" className="animate-ping" />
              <circle cx="5" cy="0" r="6.5" fill="#10b981" opacity="0.6" />
              <circle cx="5" cy="0" r="3.2" fill="#34d399" className="drop-shadow-[0_0_8px_#10b981]" />
              {/* Harmonic acoustic ripples */}
              <path
                d="M 15, -6 C 19, -2 19, 2 15, 6"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.8"
                className="animate-pulse"
              />
              <path
                d="M 21, -9 C 27, -3 27, 3 21, 9"
                stroke="#10b981"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.5"
              />
            </g>
          ) : (
            /* Voiceless: Open glottis slit */
            <g>
              <circle cx="5" cy="0" r="4.5" fill="#f59e0b" opacity="0.4" />
              <circle cx="5" cy="0" r="2.5" fill="#fbbf24" />
              <line x1="2" y1="-5" x2="8" y2="5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          )}
        </g>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 8. LOWER JAWBONE & LOWER INCISOR (XƯƠNG HÀM DƯỚI & RĂNG)  */}
        {/* Anatomically grounded mandible hugging chin silhouette     */}
        {/* ────────────────────────────────────────────────────────── */}
        {/* 8. LOWER JAWBONE & LOWER INCISOR (XƯƠNG HÀM DƯỚI & RĂNG)  */}
        {/* Anatomically grounded mandible hugging chin silhouette     */}
        {/* ────────────────────────────────────────────────────────── */}
        {/* Mandibular bone cross-section (Symphysis menti in chin) */}
        <path
          d={`M 337,${geo.lowerTeethY + 8} 
              C 339,242 342,258 338,270 
              C 334,276 324,277 318,274 
              C 314,270 314,258 316,${250 + geo.mandibleDropY * 0.8} 
              C 318,240 322,234 326,${geo.lowerTeethY + 8} Z`}
          fill={`url(#boneGrad_${uniqueId})`}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          className="text-slate-400 dark:text-slate-600 dark:fill-slate-800 transition-all duration-300"
        />

        {/* Lower Incisor Root (Chân răng cắm vào ổ răng hàm dưới) */}
        <path
          d={`M 328,${geo.lowerTeethY + 9} L 331,${geo.lowerTeethY + 19} L 335,${geo.lowerTeethY + 9} Z`}
          fill="#e2e8f0"
          stroke="#cbd5e1"
          strokeWidth="0.8"
          className="dark:fill-slate-700 dark:stroke-slate-600 transition-all duration-300"
        />

        {/* Lower Gingiva / Gum collar (Nướu viền san hô ôm chắc cổ răng) */}
        <path
          d={`M 325,${geo.lowerTeethY + 8} 
              C 325,${geo.lowerTeethY + 5} 327,${geo.lowerTeethY + 4} 329,${geo.lowerTeethY + 6} 
              L 333,${geo.lowerTeethY + 6} 
              C 335,${geo.lowerTeethY + 4} 337,${geo.lowerTeethY + 5} 337,${geo.lowerTeethY + 8} 
              C 336,${geo.lowerTeethY + 11} 326,${geo.lowerTeethY + 11} 325,${geo.lowerTeethY + 8} Z`}
          fill="#fb7185"
          fillOpacity="0.9"
          stroke="#f43f5e"
          strokeWidth="0.8"
          className="transition-all duration-300"
        />

        {/* Lower Incisor Tooth Crown (Thân răng cửa dưới) */}
        <path
          d={`M 328,${geo.lowerTeethY} C 330,${geo.lowerTeethY - 1} 334,${geo.lowerTeethY - 1} 336,${geo.lowerTeethY} L 335,${geo.lowerTeethY + 9} L 327,${geo.lowerTeethY + 9} Z`}
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeLinejoin="round"
          className="drop-shadow-xs transition-all duration-300"
        />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 9. NATURAL MUSCULAR TONGUE (KHỐI CƠ LƯỠI TỰ NHIÊN)        */}
        {/* Beautifully contoured organ resting inside oral cavity     */}
        {/* ────────────────────────────────────────────────────────── */}
        {/* Muscular Hydrostat Body */}
        <path
          d={geo.tongueBodyPath}
          fill={`url(#tongueGrad_${uniqueId})`}
          className="transition-all duration-300 ease-out drop-shadow-sm"
        />

        {/* Dorsal Surface Mucosa Layer & Papillae Highlight */}
        <path
          d={geo.tongueSurfacePath}
          stroke="#fecdd3"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-300 ease-out drop-shadow-[0_0_6px_rgba(254,205,211,0.6)]"
        />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 10. ACOUSTIC AIRFLOW STREAM (LUỒNG HƠI ÂM HỌC TINH TẾ)    */}
        {/* Soft, continuous streamline following natural vocal tract  */}
        {/* ────────────────────────────────────────────────────────── */}
        <path
          d={geo.airflowPath}
          stroke="#0284c7"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.55"
          className="dark:stroke-sky-400 transition-all duration-300"
        />

        {/* Subtle acoustic projection waves right at mouth opening */}
        {!geo.isNasal && (
          <g transform={`translate(${geo.upperLipX + 8}, ${(geo.upperLipY + geo.lowerLipY) / 2})`}>
            <path
              d="M 3,-6 C 7,-3 7,3 3,6"
              stroke="#0284c7"
              strokeWidth="1.4"
              strokeLinecap="round"
              className="opacity-40 dark:stroke-sky-400"
            />
            <path
              d="M 7,-10 C 13,-4 13,4 7,10"
              stroke="#0284c7"
              strokeWidth="1.1"
              strokeLinecap="round"
              className="opacity-25 dark:stroke-sky-400"
            />
          </g>
        )}

        {/* ────────────────────────────────────────────────────────── */}
        {/* 11. HOLOGRAPHIC POINT OF ARTICULATION SPOTLIGHT           */}
        {/* ────────────────────────────────────────────────────────── */}
        <g transform={`translate(${geo.spotlight.x}, ${geo.spotlight.y})`}>
          {/* Subtle Outer Pulsing Aura */}
          <circle
            cx="0"
            cy="0"
            r="8"
            fill="#0059bb"
            opacity="0.2"
            filter={`url(#spotGlow_${uniqueId})`}
            className="animate-pulse"
          />
          {/* Concentric Reticle Ring */}
          <circle
            cx="0"
            cy="0"
            r="4.5"
            stroke="#0059bb"
            strokeWidth="1.4"
            fill="rgba(0, 89, 187, 0.15)"
            className="dark:stroke-sky-400"
          />
          {/* Target Core Dot */}
          <circle
            cx="0"
            cy="0"
            r="1.8"
            fill="#ffffff"
            className="drop-shadow-[0_0_4px_#0059bb] dark:drop-shadow-[0_0_4px_#38bdf8]"
          />
        </g>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 12. DIRECT ANATOMICAL LABELS & PINS (NHÃN GIẢI PHẪU)      */}
        {/* Clean, borderless text labels for maximum visual clarity  */}
        {/* ────────────────────────────────────────────────────────── */}
        {showPins && (
          <g className="transition-opacity duration-300 pointer-events-none select-none">
            {geo.pins.map((pin) => {
              const isHardPalate = pin.id === "hard_palate";
              const isRightSide = pin.labelX > 300;

              const textAnchor = isHardPalate ? "middle" : isRightSide ? "start" : "end";
              const textX = pin.labelX;
              const textY = isHardPalate ? pin.labelY : pin.labelY + 3.5;

              const lineEndX = isHardPalate ? pin.labelX : isRightSide ? pin.labelX - 6 : pin.labelX + 6;
              const lineEndY = isHardPalate ? pin.labelY + 8 : pin.labelY;

              return (
                <g key={pin.id}>
                  {/* Micro target dot at the anatomical organ */}
                  <circle
                    cx={pin.targetX}
                    cy={pin.targetY}
                    r={2.2}
                    fill="#0059bb"
                    className="dark:fill-sky-400 opacity-90"
                  />

                  {/* Hairline leader line */}
                  <line
                    x1={pin.targetX}
                    y1={pin.targetY}
                    x2={lineEndX}
                    y2={lineEndY}
                    stroke="#94a3b8"
                    strokeWidth="0.85"
                    strokeDasharray="2.5 2"
                    className="opacity-75 dark:stroke-slate-500"
                  />

                  {/* Clean text label without border or box ("để lại mình chữ") */}
                  <text
                    x={textX}
                    y={textY}
                    textAnchor={textAnchor}
                    fontSize="10"
                    fontFamily="var(--font-sans), system-ui, -apple-system, sans-serif"
                    fontWeight="600"
                    letterSpacing="0.01em"
                    fill="#334155"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    style={{ paintOrder: "stroke fill" }}
                    className="dark:fill-slate-200 dark:stroke-slate-900 transition-colors"
                  >
                    {pin.labelVi}
                  </text>
                </g>
              );
            })}
          </g>
        )}
      </svg>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 13. FLOATING ARTICULATION BADGE (ZERO OVERLAP BY NECK)    */}
      {/* Safe zone at bottom-3: Neck stops at Y=310, zero clipping  */}
      {/* ────────────────────────────────────────────────────────── */}
      {showLabels && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-md text-xs min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#0059bb] dark:bg-sky-400 animate-pulse shrink-0" />
            <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
              {geo.spotlight.titleVi}
            </span>
          </div>

          <div className="hidden xs:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 text-[11px] font-medium shadow-sm">
            {geo.isVoiced ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Hữu thanh (Voiced)
              </span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Vô thanh (Voiceless)
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
