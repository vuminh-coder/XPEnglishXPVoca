"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

/**
 * Standard Framer Motion Stagger Entrance Animation Variants (Dashboard Tier)
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
};

export interface PageEntranceWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  suppressHydrationWarning?: boolean;
}

/**
 * Page Entrance Animation Wrapper Component
 * Wraps page root with smooth stagger fade-in & slide-up animation on navigation entrance.
 */
export function PageEntranceWrapper({
  children,
  className = "",
  id,
  style,
  suppressHydrationWarning,
}: PageEntranceWrapperProps) {
  return (
    <motion.div
      id={id}
      style={style}
      suppressHydrationWarning={suppressHydrationWarning}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Motion Child Element Wrapper
 * Wraps inner cards, headers, grids to animate sequentially with stagger effect.
 */
export function MotionItem({
  children,
  className = "",
  id,
  style,
}: PageEntranceWrapperProps) {
  return (
    <motion.div id={id} style={style} variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
