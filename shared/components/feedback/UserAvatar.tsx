'use client';
import React, { useState } from 'react';
import { formatCleanName } from "@/shared/utils/formatName";
export { formatCleanName };

export interface UserAvatarProps {
  avatar?: string | null;
  avatarUrl?: string | null;
  imageUrl?: string | null;
  emoji?: string | null;
  name?: string | null;
  size?: string;
  className?: string;
}

const AVATAR_BG_COLORS = [
  '#0059bb', // Royal Blue
  '#7c3aed', // Purple
  '#059669', // Emerald
  '#d97706', // Amber
  '#db2777', // Pink
  '#2563eb', // Blue
  '#0891b2', // Cyan
  '#4f46e5', // Indigo
];

const getAvatarBg = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_BG_COLORS.length;
  return AVATAR_BG_COLORS[index];
};

const getInitials = (name: string) => {
  if (!name) return 'XP';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const SIZE_MAP: Record<string, string> = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-14 h-14",
};

/**
 * Universal Resilient User Avatar Component.
 * Guaranteed 100% immunity to broken images, 403 Google CDN blocks, and network failures:
 * 1. Tier 1: Real photo image URL (Google OAuth / Facebook / Upload) with `referrerPolicy="no-referrer"`.
 * 2. Tier 2: Avatar Emoji (custom or selected learner emoji).
 * 3. Tier 3: Zero-dependency inline CSS/SVG initials circle (never fails even offline).
 */
export const UserAvatar = ({
  avatar,
  avatarUrl,
  imageUrl,
  emoji,
  name,
  size = "w-8 h-8",
  className = "",
}: UserAvatarProps) => {
  const [imgError, setImgError] = useState(false);

  // Normalize candidate image sources, filtering out invalid string representations
  const candidate = avatar || avatarUrl || imageUrl;
  const rawSrc = typeof candidate === 'string' ? candidate.trim() : '';
  const isValidSrc =
    rawSrc.length > 0 &&
    rawSrc !== 'null' &&
    rawSrc !== 'undefined' &&
    (rawSrc.startsWith('http://') ||
      rawSrc.startsWith('https://') ||
      rawSrc.startsWith('/') ||
      rawSrc.startsWith('data:image/'));

  const cleanName = formatCleanName(name || undefined);
  const sizeClass =
    SIZE_MAP[size] ||
    (size.includes("w-") || size.includes("h-") ? size : `w-8 h-8 ${size}`);

  // Tier 1: Valid real image URL with referrerPolicy protection
  if (isValidSrc && !imgError) {
    return (
      <img
        src={rawSrc}
        alt={cleanName}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`${sizeClass} rounded-full object-cover aspect-square shrink-0 border border-slate-200/80 dark:border-white/10 shadow-2xs ${className}`}
      />
    );
  }

  // Tier 2: Selected Avatar Emoji
  if (emoji && typeof emoji === 'string' && emoji.trim().length > 0) {
    return (
      <div
        className={`${sizeClass} rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold text-xs select-none shrink-0 shadow-2xs border border-slate-200/80 dark:border-white/10 aspect-square ${className}`}
        title={cleanName}
      >
        <span className="text-[1.05em] leading-none select-none">{emoji}</span>
      </div>
    );
  }

  // Tier 3: Deterministic Zero-Dependency Initials Badge (Never fails, 0ms latency)
  const bgHex = getAvatarBg(cleanName);
  const initials = getInitials(cleanName);

  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center font-bold text-white uppercase select-none shrink-0 aspect-square shadow-2xs border border-white/20 ${className}`}
      style={{ backgroundColor: bgHex }}
      title={cleanName}
    >
      <span className="text-[0.72em] font-sans font-black tracking-wider leading-none">
        {initials}
      </span>
    </div>
  );
};

export default UserAvatar;
