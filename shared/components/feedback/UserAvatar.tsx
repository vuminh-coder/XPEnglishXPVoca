'use client';
import React, { useState } from 'react';

import { formatCleanName } from "@/shared/utils/formatName";
export { formatCleanName };

export interface UserAvatarProps {
  avatar?: string;
  avatarUrl?: string;
  imageUrl?: string;
  emoji?: string;
  name?: string;
  size?: string;
  className?: string;
}

const AVATAR_BG_COLORS = [
  '0059bb', // Royal Blue
  '7c3aed', // Purple
  '059669', // Emerald
  'd97706', // Amber
  'db2777', // Pink
  '2563eb', // Blue
  '0891b2', // Cyan
  '4f46e5', // Indigo
];

const getAvatarBg = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_BG_COLORS.length;
  return AVATAR_BG_COLORS[index];
};

// Universal Component to render Google/Facebook OAuth avatar image with UI-Avatars fallback
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
  const src = avatar || avatarUrl || imageUrl;
  const cleanName = formatCleanName(name);

  // If real image URL exists (e.g., Google/Facebook OAuth or uploaded picture) and not errored
  if (src && (src.startsWith('http') || src.startsWith('/')) && !imgError) {
    return (
      <img
        src={src}
        alt={cleanName}
        onError={() => setImgError(true)}
        className={`${size} rounded-full object-cover shrink-0 border border-slate-200/80 dark:border-white/10 shadow-2xs ${className}`}
      />
    );
  }

  // If user has a custom emoji (other than default owl 🦉)
  if (emoji && emoji !== '🦉') {
    return (
      <div
        className={`${size} rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs border border-slate-200/80 dark:border-white/10 ${className}`}
      >
        <span>{emoji}</span>
      </div>
    );
  }

  // UI-Avatars Fallback with deterministic color and initials (e.g. "Minh Vu Van" -> "MV")
  const bgHex = getAvatarBg(cleanName);
  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=${bgHex}&color=fff&font-size=0.4`;

  return (
    <img
      src={fallbackSrc}
      alt={cleanName}
      className={`${size} rounded-full object-cover shrink-0 border border-slate-200/80 dark:border-white/10 shadow-2xs ${className}`}
    />
  );
};

export default UserAvatar;
