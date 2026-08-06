'use client';
import React, { useState } from 'react';

// Helper to format clean display names without @ or duplicate bracket usernames or raw email strings
export const formatCleanName = (name?: string) => {
  if (!name) return 'Học viên XP';
  let clean = name.trim().replace(/^@+/, '').split(' (')[0].trim();
  if (clean.includes('@')) {
    clean = clean.split('@')[0];
    clean = clean.replace(/[._-]/g, ' ');
    clean = clean
      .split(' ')
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }
  return clean || 'Học viên XP';
};

export interface UserAvatarProps {
  avatar?: string;
  avatarUrl?: string;
  imageUrl?: string;
  emoji?: string;
  name?: string;
  size?: string;
  className?: string;
}

// Universal Component to render Google/Facebook OAuth avatar image with self-healing onError fallback
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

  if (src && (src.startsWith('http') || src.startsWith('/')) && !imgError) {
    return (
      <img
        src={src}
        alt={name || 'User Avatar'}
        onError={() => setImgError(true)}
        className={`${size} rounded-full object-cover shrink-0 border border-slate-200/80 dark:border-white/10 shadow-2xs ${className}`}
      />
    );
  }

  const cleanName = formatCleanName(name);
  const initial = cleanName.charAt(0).toUpperCase() || 'X';

  return (
    <div
      className={`${size} rounded-full bg-[#0059bb] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs font-display ${className}`}
    >
      <span>{emoji || initial}</span>
    </div>
  );
};

export default UserAvatar;
