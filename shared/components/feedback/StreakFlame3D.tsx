"use client";

import React, { useId } from "react";
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
 * Micro Spark Diamond (Crisp 4-point tiny fire spark, NO circle background, NO box clipping)
 */
function MicroSpark({
  size = 7,
  uid = "s1",
  className = "",
}: {
  size?: number;
  uid?: string;
  className?: string;
}) {
  const gradId = `spark-grad-${uid}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={`select-none pointer-events-none shrink-0 overflow-visible ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* 4-pointed diamond star: crisp, tiny, NO background circles */}
      <path
        d="M8 0C8 4.4 4.4 8 0 8C4.4 8 8 11.6 8 16C8 11.6 11.6 8 16 8C11.6 8 8 4.4 8 0Z"
        fill={`url(#${gradId})`}
      />
    </svg>
  );
}

/**
 * 3D Stylized Streak Flame Mascot Component (Duolingo & Apple Tier)
 * Minimalist, elegant design with organic 3D flame and 3 tiny subtle ambient sparks.
 */
export function StreakFlame3D({
  size = "lg",
  className = "",
  animate = true,
  showHalo = true,
  showSparks = true,
}: StreakFlame3DProps) {
  const baseId = useId().replace(/:/g, "_");
  const sizeClasses = SIZE_MAP[size] || SIZE_MAP.lg;
  const isLarge = size === "lg" || size === "xl";

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeClasses} ${className}`}
    >
      {/* 1. Subtle Ambient Backlight Glow (Soft ellipse, tapered naturally to 0) */}
      {showHalo && (
        <motion.div
          animate={
            animate
              ? {
                  scale: [0.96, 1.05, 0.96],
                  opacity: [0.25, 0.45, 0.25],
                }
              : undefined
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(245,158,11,0.2) 0%, rgba(249,115,22,0.12) 40%, rgba(0,0,0,0) 70%)",
          }}
          className="absolute inset-[-12%] pointer-events-none"
        />
      )}

      {/* 2. Exactly 3 Tiny Subtle Flying Sparks (Chỉ mấy cái nhỏ nhỏ bay, không hình tròn thừa) */}
      {showSparks && isLarge && animate && (
        <>
          {/* Spark 1 - Upper Right (Tia lửa nhỏ 7px phía trên bên phải) */}
          <motion.div
            className="absolute top-1 -right-1 sm:-right-2 pointer-events-none z-20"
            animate={{
              y: [0, -6, 0],
              x: [0, 2, 0],
              rotate: [0, 15, -10, 0],
              scale: [0.85, 1.15, 0.85],
              opacity: [0.4, 0.95, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <MicroSpark size={7} uid={`${baseId}-tr`} />
          </motion.div>

          {/* Spark 2 - Upper Left (Tia lửa nhỏ 5px phía trên bên trái) */}
          <motion.div
            className="absolute top-3 -left-1 sm:-left-2 pointer-events-none z-20"
            animate={{
              y: [0, -5, 0],
              x: [0, -2, 0],
              rotate: [0, -15, 10, 0],
              scale: [0.8, 1.1, 0.8],
              opacity: [0.35, 0.85, 0.35],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <MicroSpark size={5} uid={`${baseId}-tl`} />
          </motion.div>

          {/* Spark 3 - Left Drift (1 chấm tàn lửa li ti 2px bay nhẹ bốc lên rồi tan biến) */}
          <motion.div
            className="absolute bottom-7 left-0 pointer-events-none z-20"
            animate={{
              y: [0, -14, -24],
              x: [0, -3, -1],
              opacity: [0, 0.8, 0],
              scale: [0.6, 1, 0.4],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.3,
            }}
          >
            <div className="w-1 h-1 rounded-full bg-amber-300" />
          </motion.div>
        </>
      )}

      {/* 3. Master 3D Stylized Flame Mascot (Mấy cái khác giữ nguyên 100%) */}
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
          alt="3D Stylized Streak Flame Mascot"
          className="w-full h-full object-contain select-none pointer-events-none transition-transform duration-300 hover:scale-105 active:scale-95"
          style={{
            filter: "drop-shadow(0px 6px 14px rgba(245, 158, 11, 0.32))",
          }}
          loading="eager"
          decoding="async"
        />
      </motion.div>
    </div>
  );
}
