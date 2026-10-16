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
 * 4-Pointed Sparkle Star with pure SVG radial glow (Zero square clipping / zero box artifact)
 */
function SparkleStar({
  size = 14,
  variant = "amber",
  uid = "s1",
  className = "",
}: {
  size?: number;
  variant?: "amber" | "blue" | "white";
  uid?: string;
  className?: string;
}) {
  const gradId = `star-grad-${variant}-${uid}`;
  const glowId = `star-glow-${variant}-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-6 -6 36 36"
      fill="none"
      style={{ overflow: "visible" }}
      className={`select-none pointer-events-none shrink-0 overflow-visible ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {variant === "amber" && (
          <>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fde047" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </>
        )}
        {variant === "blue" && (
          <>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#93c5fd" />
              <stop offset="75%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#0059bb" />
            </linearGradient>
            <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#0059bb" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0059bb" stopOpacity="0" />
            </radialGradient>
          </>
        )}
        {variant === "white" && (
          <>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
            <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#fef08a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
            </radialGradient>
          </>
        )}
      </defs>

      {/* 1. Pure Circular SVG Radial Glow (Eliminates CSS drop-shadow square edges) */}
      <circle cx="12" cy="12" r="13" fill={`url(#${glowId})`} />

      {/* 2. Crisp Center Spark Diamond */}
      <path
        d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z"
        fill={`url(#${gradId})`}
      />
    </svg>
  );
}

/**
 * Glowing Micro Fire Ember using pure CSS radial gradient (Zero box-shadow / zero square artifact)
 */
function FloatingEmber({
  size = 6,
  color = "amber",
  className = "",
}: {
  size?: number;
  color?: "amber" | "orange" | "gold";
  className?: string;
}) {
  const gradient =
    color === "amber"
      ? "radial-gradient(circle, #ffffff 0%, #fde047 35%, #f59e0b 70%, rgba(245,158,11,0) 100%)"
      : color === "orange"
      ? "radial-gradient(circle, #ffffff 0%, #fb923c 40%, #ea580c 70%, rgba(234,88,12,0) 100%)"
      : "radial-gradient(circle, #ffffff 0%, #fef08a 45%, #eab308 75%, rgba(234,179,8,0) 100%)";

  return (
    <div
      style={{
        width: size * 2.2,
        height: size * 2.2,
        background: gradient,
      }}
      className={`rounded-full select-none pointer-events-none shrink-0 overflow-visible ${className}`}
    />
  );
}

/**
 * 3D Stylized Streak Flame Mascot Component (Duolingo & Apple Tier)
 * Features smooth organic curving flame tongues, glossy enamel luster,
 * glowing white-hot core, amber-gold fire, royal blue brand harmony rim,
 * pure circular radial ambient glow, and kinetic floating sparkles & embers.
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
  const isMedium = size === "md";

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none overflow-visible ${sizeClasses} ${className}`}
    >
      {/* 1. Luminous Pure Circular Radial Ambient Glow (Zero square blur artifacts) */}
      {showHalo && (
        <motion.div
          animate={
            animate
              ? {
                  scale: [0.95, 1.08, 0.95],
                  opacity: [0.35, 0.6, 0.35],
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
              "radial-gradient(circle, rgba(245,158,11,0.28) 0%, rgba(249,115,22,0.18) 42%, rgba(0,89,187,0.1) 70%, rgba(0,0,0,0) 100%)",
          }}
          className="absolute inset-[-15%] rounded-full pointer-events-none overflow-visible"
        />
      )}

      {/* 2. Kinetic Floating Stars & Thermal Fire Embers (Zero square boundaries) */}
      {showSparks && animate && (
        <>
          {/* A. Top-Right Main Golden Sparkle Star */}
          {(isLarge || isMedium) && (
            <motion.div
              className="absolute -top-1 -right-2 sm:-right-3 pointer-events-none z-20 overflow-visible"
              animate={{
                y: [0, -7, 0],
                x: [0, 2, 0],
                rotate: [0, 20, -10, 0],
                scale: [0.85, 1.25, 0.85],
                opacity: [0.45, 1, 0.45],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <SparkleStar size={isLarge ? 16 : 12} variant="amber" uid={`${baseId}-tr`} />
            </motion.div>
          )}

          {/* B. Top-Left Golden Sparkle Star */}
          {isLarge && (
            <motion.div
              className="absolute top-1 -left-2 sm:-left-3 pointer-events-none z-20 overflow-visible"
              animate={{
                y: [0, -6, 0],
                x: [0, -2, 0],
                rotate: [0, -15, 10, 0],
                scale: [0.75, 1.15, 0.75],
                opacity: [0.35, 0.95, 0.35],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              <SparkleStar size={13} variant="amber" uid={`${baseId}-tl`} />
            </motion.div>
          )}

          {/* C. Apex Peak White-Hot Sparkle */}
          {isLarge && (
            <motion.div
              className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none z-20 overflow-visible"
              animate={{
                y: [0, -4, 0],
                scale: [0.65, 1.15, 0.65],
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: 2.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              }}
            >
              <SparkleStar size={10} variant="white" uid={`${baseId}-top`} />
            </motion.div>
          )}

          {/* D. Left Flank Rising Thermal Ember (Drifts up and fades out) */}
          {(isLarge || isMedium) && (
            <motion.div
              className="absolute bottom-6 -left-1 sm:-left-2 pointer-events-none z-20 overflow-visible"
              animate={{
                y: [0, -16, -30],
                x: [0, -3, -1],
                scale: [0.5, 1.1, 0.4],
                opacity: [0, 0.85, 0],
              }}
              transition={{
                duration: 2.9,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.2,
              }}
            >
              <FloatingEmber size={isLarge ? 6 : 4} color="amber" />
            </motion.div>
          )}

          {/* E. Right Flank Rising Thermal Ember */}
          {isLarge && (
            <motion.div
              className="absolute bottom-8 -right-1 sm:-right-2 pointer-events-none z-20 overflow-visible"
              animate={{
                y: [0, -18, -34],
                x: [0, 3, 1],
                scale: [0.6, 1.2, 0.4],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 3.3,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1.1,
              }}
            >
              <FloatingEmber size={5} color="orange" />
            </motion.div>
          )}

          {/* F. Base Royal Blue Brand Sparkle (Harmonizes with brand color #0059bb) */}
          {isLarge && (
            <motion.div
              className="absolute bottom-0 -left-1 sm:left-0 pointer-events-none z-20 overflow-visible"
              animate={{
                y: [0, -4, 0],
                rotate: [0, 30, 0],
                scale: [0.7, 1.1, 0.7],
                opacity: [0.25, 0.8, 0.25],
              }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            >
              <SparkleStar size={11} variant="blue" uid={`${baseId}-blue`} />
            </motion.div>
          )}

          {/* G. Mid-Right Golden Micro-Orb */}
          {isLarge && (
            <motion.div
              className="absolute top-1/2 -right-2.5 -translate-y-1/2 pointer-events-none z-20 overflow-visible"
              animate={{
                y: [0, -8, 0],
                x: [0, 2, 0],
                opacity: [0.25, 0.85, 0.25],
                scale: [0.8, 1.15, 0.8],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4,
              }}
            >
              <FloatingEmber size={4} color="gold" />
            </motion.div>
          )}
        </>
      )}

      {/* 3. Master 3D Stylized Flame Asset */}
      <motion.div
        className="w-full h-full relative z-10 flex items-center justify-center overflow-visible"
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
            filter: "drop-shadow(0px 6px 14px rgba(245, 158, 11, 0.35))",
          }}
          loading="eager"
          decoding="async"
        />
      </motion.div>
    </div>
  );
}
