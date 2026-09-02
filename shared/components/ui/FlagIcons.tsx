import React from "react";

interface FlagIconProps {
  className?: string;
}

/**
 * High-definition Vietnam Flag SVG Icon
 * Ratio 3:2 with accurate star geometry centered at (15, 10)
 * No intrusive borders, smooth rounded corners and crisp rendering
 */
export function VietnamFlag({ className = "w-5 h-3.5" }: FlagIconProps) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={`inline-block shrink-0 rounded-[2.5px] shadow-[0_1px_2px_rgba(0,0,0,0.12)] overflow-hidden ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cờ Việt Nam"
    >
      {/* Red Background */}
      <rect width="30" height="20" fill="#da251d" />
      {/* 5-point Gold Star centered at (15, 10) with Outer Radius R=6 */}
      <polygon
        points="15,4 16.35,8.15 20.71,8.15 17.18,10.71 18.53,14.85 15,12.29 11.47,14.85 12.82,10.71 9.29,8.15 13.65,8.15"
        fill="#ffeb00"
      />
    </svg>
  );
}

/**
 * High-definition United States Flag SVG Icon
 * Ratio 3:2 with 13 stripes and blue starfield
 * No intrusive borders, smooth rounded corners
 */
export function USFlag({ className = "w-5 h-3.5" }: FlagIconProps) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={`inline-block shrink-0 rounded-[2.5px] shadow-[0_1px_2px_rgba(0,0,0,0.12)] overflow-hidden ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cờ Hoa Kỳ"
    >
      {/* 13 Stripes */}
      <rect width="30" height="20" fill="#b22234" />
      <rect y="1.54" width="30" height="1.54" fill="#ffffff" />
      <rect y="4.62" width="30" height="1.54" fill="#ffffff" />
      <rect y="7.69" width="30" height="1.54" fill="#ffffff" />
      <rect y="10.77" width="30" height="1.54" fill="#ffffff" />
      <rect y="13.85" width="30" height="1.54" fill="#ffffff" />
      <rect y="16.92" width="30" height="1.54" fill="#ffffff" />

      {/* Canton Blue field */}
      <rect width="12" height="10.77" fill="#3c3b6e" />

      {/* Stars Grid */}
      <g fill="#ffffff">
        <circle cx="2" cy="1.8" r="0.55" />
        <circle cx="4" cy="1.8" r="0.55" />
        <circle cx="6" cy="1.8" r="0.55" />
        <circle cx="8" cy="1.8" r="0.55" />
        <circle cx="10" cy="1.8" r="0.55" />

        <circle cx="3" cy="3.6" r="0.55" />
        <circle cx="5" cy="3.6" r="0.55" />
        <circle cx="7" cy="3.6" r="0.55" />
        <circle cx="9" cy="3.6" r="0.55" />

        <circle cx="2" cy="5.4" r="0.55" />
        <circle cx="4" cy="5.4" r="0.55" />
        <circle cx="6" cy="5.4" r="0.55" />
        <circle cx="8" cy="5.4" r="0.55" />
        <circle cx="10" cy="5.4" r="0.55" />

        <circle cx="3" cy="7.2" r="0.55" />
        <circle cx="5" cy="7.2" r="0.55" />
        <circle cx="7" cy="7.2" r="0.55" />
        <circle cx="9" cy="7.2" r="0.55" />

        <circle cx="2" cy="9.0" r="0.55" />
        <circle cx="4" cy="9.0" r="0.55" />
        <circle cx="6" cy="9.0" r="0.55" />
        <circle cx="8" cy="9.0" r="0.55" />
        <circle cx="10" cy="9.0" r="0.55" />
      </g>
    </svg>
  );
}

/**
 * High-definition United Kingdom (Union Jack) Flag SVG Icon
 * Ratio 2:1
 */
export function UKFlag({ className = "w-5 h-3.5" }: FlagIconProps) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={`inline-block shrink-0 rounded-[2.5px] shadow-[0_1px_2px_rgba(0,0,0,0.12)] overflow-hidden ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cờ Vương Quốc Anh"
    >
      <clipPath id="uk-clip-s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="uk-clip-t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#uk-clip-s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-clip-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
