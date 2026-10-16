"use client";

import React from "react";
import { motion } from "framer-motion";

interface StreakFlame3DProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
  showHalo?: boolean;
  showSparks?: boolean;
}

const SIZE_MAP = {
  xs: "w-6 h-6",
  sm: "w-8 h-8 sm:w-9 sm:h-9",
  md: "w-12 h-12 sm:w-14 sm:h-14",
  lg: "w-20 h-20 sm:w-24 sm:h-24",
  xl: "w-28 h-28 sm:w-32 sm:h-32",
};

/**
 * 3D Crystal Streak Flame Component (Duolingo & Apple Fitness Tier)
 * Features jewel-cut glass facets, blazing golden fire core, ambient halo glow,
 * and kinetic floating spark particles.
 */
export function StreakFlame3D({
  size = "lg",
  className = "",
  animate = true,
  showHalo = true,
  showSparks = true,
}: StreakFlame3DProps) {
  const sizeClasses = SIZE_MAP[size] || SIZE_MAP.lg;
  const isLarge = size === "lg" || size === "xl";

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeClasses} ${className}`}
    >
      {/* 1. Luminous Radial Ambient Backlight Halo */}
      {showHalo && (
        <motion.div
          animate={
            animate
              ? {
                  scale: [0.95, 1.1, 0.95],
                  opacity: [0.35, 0.65, 0.35],
                }
              : undefined
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-[-12%] rounded-full bg-gradient-to-t from-amber-500/30 via-orange-500/25 to-yellow-400/10 blur-xl pointer-events-none"
        />
      )}

      {/* 2. Micro Floating Spark Embers (Large Flame Only) */}
      {showSparks && isLarge && animate && (
        <>
          {/* Spark 1 - Top Left */}
          <motion.div
            className="absolute top-1 left-2 w-1.5 h-1.5 rounded-xs bg-gradient-to-tr from-amber-300 to-yellow-100 rotate-45 shadow-[0_0_6px_rgba(251,191,36,0.9)] pointer-events-none z-20"
            animate={{
              y: [0, -8, 0],
              x: [0, -2, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />

          {/* Spark 2 - Top Right */}
          <motion.div
            className="absolute top-3 right-3 w-1.5 h-1.5 rounded-xs bg-gradient-to-tr from-amber-400 to-yellow-200 rotate-45 shadow-[0_0_8px_rgba(245,158,11,0.9)] pointer-events-none z-20"
            animate={{
              y: [0, -10, 0],
              x: [0, 3, 0],
              opacity: [0.4, 0.95, 0.4],
              scale: [0.9, 1.25, 0.9],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />

          {/* Spark 3 - Far Right Accent */}
          <motion.div
            className="absolute top-0 right-1 w-1 h-1 rounded-xs bg-white rotate-45 shadow-[0_0_6px_rgba(255,255,255,0.95)] pointer-events-none z-20"
            animate={{
              y: [0, -6, 0],
              opacity: [0.2, 0.85, 0.2],
            }}
            transition={{
              duration: 2.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          />
        </>
      )}

      {/* 3. Master 3D Crystal Flame Asset */}
      <motion.div
        className="w-full h-full relative z-10 flex items-center justify-center"
        animate={
          animate
            ? {
                y: [0, -3.5, 0],
                scale: [1, 1.035, 1],
              }
            : undefined
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src="/images/streak-flame-crystal.png"
          alt="3D Crystal Streak Flame"
          className="w-full h-full object-contain drop-shadow-[0_8px_18px_rgba(245,158,11,0.4)] select-none pointer-events-none transition-transform duration-300 hover:scale-105 active:scale-95"
          loading="eager"
          decoding="async"
        />
      </motion.div>
    </div>
  );
}
