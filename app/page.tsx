"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Users,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Star,
  LogIn,
  UserPlus,
  X,
  Menu,
  Play,
  CheckCircle,
} from "lucide-react";

export default function LandingPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && userId) {
      router.replace("/dashboard");
    }
  }, [isLoaded, userId, router]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] as any },
    },
  };

  // State dial config for brief audit
  // DESIGN_VARIANCE: 7 (Asymmetrical bento grid + card layouts)
  // MOTION_INTENSITY: 6 (Scroll triggers + SVG path animation)
  // VISUAL_DENSITY: 3 (Clean, airy, light/dark theme adaptive)
  console.log(
    "Reading this as: Landing page for design-conscious language learners, with an inspiring, personalized, and clean dark/light tech language, leaning toward Tailwind utilities + Framer Motion + Apple-style glassmorphic depth.",
  );

  return (
    <main
      id="app-content"
      className="min-h-[100dvh] flex flex-col justify-between bg-slate-50 dark:bg-[#030304] text-slate-900 dark:text-slate-100 overflow-x-hidden relative transition-colors duration-500"
    >
      {/* Background Ambient Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-sky-400/10 to-indigo-400/10 dark:from-sky-500/10 dark:to-indigo-500/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-violet-400/10 to-pink-400/10 dark:from-violet-500/10 dark:to-pink-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-blue-400/5 dark:bg-blue-500/5 blur-[150px] pointer-events-none z-0" />

      {/* Premium Sticky Full-Width Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 w-full h-14 border-b flex items-center z-50 backdrop-blur-xl transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-[#070708]/85 border-slate-200/80 dark:border-neutral-800/60 shadow-sm"
            : "bg-white/40 dark:bg-transparent border-slate-200/30 dark:border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 cursor-pointer group focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-xl px-1 py-0.5"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-sm shadow-md transition-transform group-hover:scale-105 text-white">
              🦉
            </div>
            <span className="font-display font-black text-[15px] tracking-tight bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
              XP English
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => scrollToSection("features")}
              className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-sky-550 dark:hover:text-sky-400 hover:bg-slate-200/50 dark:hover:bg-white/5 px-3 py-1.5 rounded-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500"
            >
              Tính năng
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-sky-550 dark:hover:text-sky-400 hover:bg-slate-200/50 dark:hover:bg-white/5 px-3 py-1.5 rounded-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500"
            >
              Đánh giá
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {isLoaded && userId ? (
              <Link
                href="/dashboard"
                className="focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-xl"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-glow hover:shadow-glow-lg transition-all group cursor-pointer"
                >
                  Vào Dashboard
                  <span className="w-4.5 h-4.5 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-2.5 h-2.5" strokeWidth={1.5} />
                  </span>
                </motion.button>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 px-3.5 py-1.5 hover:bg-slate-200/50 dark:hover:bg-white/5 rounded-xl transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500"
                >
                  <LogIn className="w-3.5 h-3.5" strokeWidth={1.3} />
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-xl"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, y: -0.5 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-glow hover:shadow-glow-lg transition-all group cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" strokeWidth={1.3} />
                    Đăng ký
                    <span className="w-4.5 h-4.5 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="w-2.5 h-2.5" strokeWidth={1.5} />
                    </span>
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger toggle */}
          <button
            className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center bg-slate-200/40 dark:bg-white/5 text-slate-700 dark:text-slate-300 cursor-pointer focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" strokeWidth={1.3} />
            ) : (
              <Menu className="w-4 h-4" strokeWidth={1.3} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu (Positions directly below the header) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-14 left-0 right-0 w-full bg-white/98 dark:bg-[#08080a]/98 border-b border-slate-200/80 dark:border-neutral-800/60 p-6 z-40 flex flex-col gap-5 shadow-2xl backdrop-blur-xl text-slate-900 dark:text-white max-h-[calc(100vh-3.5rem)] overflow-y-auto"
          >
            {/* Navigation links with chevron indicators (Rule 2 select options) */}
            <div className="flex flex-col w-full">
              <button
                onClick={() => scrollToSection("features")}
                className="flex items-center justify-between py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-neutral-900/65 w-full cursor-pointer focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-md px-1.5"
              >
                <span>Tính năng</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="flex items-center justify-between py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-neutral-900/65 w-full cursor-pointer focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-md px-1.5"
              >
                <span>Đánh giá</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Action buttons (Rule 18 single primary CTA) */}
            <div className="flex flex-col gap-3 mt-2">
              {isLoaded && userId ? (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-full"
                >
                  <button className="w-full bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-bold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 group cursor-pointer shadow-glow">
                    Vào Dashboard
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" strokeWidth={1.3} />
                    </span>
                  </button>
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-full"
                  >
                    <button className="w-full bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-bold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 group cursor-pointer shadow-glow">
                      Đăng ký miễn phí
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3" strokeWidth={1.3} />
                      </span>
                    </button>
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-full"
                  >
                    <button className="w-full bg-slate-100 dark:bg-neutral-900 border border-slate-200/50 dark:border-neutral-800/40 text-slate-800 dark:text-slate-200 font-bold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-200/60 dark:hover:bg-neutral-800/80">
                      Đăng nhập
                    </button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[95dvh] pt-28 md:pt-32 flex items-center z-10 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Half */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            <div className="inline-flex items-center gap-2 bg-sky-50 dark:bg-[#12121a] border border-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full px-3.5 py-1.5 text-[9px] uppercase tracking-[0.2em] font-extrabold w-max mb-6">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
              Nền tảng học thế hệ mới
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white mb-6 text-balance">
              Đột phá từ vựng cùng{" "}
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                XP English
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-650 dark:text-slate-400 max-w-xl leading-relaxed mb-8 font-semibold text-balance">
              Hệ sinh thái học tập cá nhân hóa. Ứng dụng phương pháp lặp lại
              ngắt quãng khoa học, thách đấu từ vựng PvP thời gian thực và tương
              tác phản xạ nói cùng Gia sư AI.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              {isLoaded && userId ? (
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-full"
                >
                  <motion.button
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-bold text-sm px-8 py-4 rounded-full flex items-center justify-center gap-2.5 shadow-glow hover:shadow-glow-lg transition-all cursor-pointer group"
                  >
                    Vào Học Ngay
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.3} />
                    </span>
                  </motion.button>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="w-full sm:w-auto focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-full"
                >
                  <motion.button
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-bold text-sm px-8 py-4 rounded-full flex items-center justify-center gap-2.5 shadow-glow hover:shadow-glow-lg transition-all cursor-pointer group"
                  >
                    Bắt đầu học miễn phí
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.3} />
                    </span>
                  </motion.button>
                </Link>
              )}
              <button
                onClick={() => scrollToSection("features")}
                className="w-full sm:w-auto text-center border border-slate-200 dark:border-neutral-800 rounded-full font-bold text-sm text-slate-700 dark:text-slate-300 px-8 py-4 hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500"
              >
                Khám phá tính năng
              </button>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-slate-200 dark:border-neutral-900">
              <div>
                <div className="text-3xl md:text-4xl font-display font-black text-sky-500">
                  15K+
                </div>
                <div className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider mt-1">
                  Học viên
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-black text-indigo-500">
                  5.000+
                </div>
                <div className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider mt-1">
                  Từ vựng
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-black text-pink-500">
                  98%
                </div>
                <div className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider mt-1">
                  Hiệu quả
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Card Mockup visual (Rule 10: Nested Doppelrand architecture) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            {/* Doppelrand Bezel Core Card */}
            <div className="bezel-outer p-1.5 bg-slate-200/50 dark:bg-white/5 border border-slate-300/10 dark:border-white/10 rounded-[1.5rem] w-full max-w-sm shadow-2xl relative z-10">
              <div className="bezel-inner rounded-[calc(1.5rem-6px)] p-6 bg-white dark:bg-[#0c0c0f]/90 border border-slate-100 dark:border-white/5 flex flex-col gap-5 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Audio player card header */}
                <div className="flex justify-between items-center">
                  <div className="bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider border border-sky-500/10">
                    BẬC CAO CẤP
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-neutral-900 px-2 py-1 rounded-md border border-slate-100 dark:border-white/5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300">
                      B2 / C1
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                    Wanderlust
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-slate-550 dark:text-slate-400 font-mono">
                      /ˈwɒn.dɚ.lʌst/
                    </span>
                    <button className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-sm cursor-pointer">
                      <Play className="w-2 h-2 fill-sky-500 dark:fill-sky-400 text-sky-500 dark:text-sky-400 ml-0.5" />
                    </button>
                  </div>
                </div>

                <div className="h-[1px] bg-slate-100 dark:bg-neutral-800" />

                <div>
                  <h4 className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider mb-1">
                    Định nghĩa tiếng Việt
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                    Khát khao mãnh liệt được đi du lịch, lang thang và khám phá
                    thế giới.
                  </p>
                </div>

                {/* Animated Circular Progress Ring */}
                <div className="mt-1 flex items-center justify-between bg-slate-50 dark:bg-neutral-900/60 p-3 rounded-xl border border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <svg className="w-8 h-8 -rotate-90">
                        <circle
                          cx="16"
                          cy="16"
                          r="13"
                          className="stroke-slate-200 dark:stroke-neutral-800"
                          strokeWidth="2.5"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="16"
                          cy="16"
                          r="13"
                          className="stroke-sky-550 dark:stroke-sky-400"
                          strokeWidth="2.5"
                          fill="transparent"
                          strokeDasharray="81.6"
                          initial={{ strokeDashoffset: 81.6 }}
                          animate={{ strokeDashoffset: 16.3 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      <span className="absolute text-[8px] font-black text-sky-600 dark:text-sky-400">
                        80%
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                        Trình độ nhớ
                      </span>
                      <span className="block text-[10px] font-black text-slate-800 dark:text-white">
                        Rất tốt
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/10 px-2 py-0.5 rounded">
                    ÔN: 4 ngày
                  </span>
                </div>
              </div>
            </div>

            {/* Ambient floating badges (balanced layout to prevent overlapping busy content regions) */}
            <div className="hidden sm:flex absolute top-[10%] right-[-50px] lg:right-[-70px] xl:right-[-90px] bg-white/90 dark:bg-neutral-900/90 border border-red-500 dark:border-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl items-center gap-2.5 z-20 shadow-xl transition-spring hover:-translate-y-1 text-slate-800 dark:text-white">
              <span className="text-base">🔥</span>
              <div>
                <span className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Streak liên tục
                </span>
                <span className="block text-[11px] font-black text-slate-900 dark:text-white">
                  15 Ngày Học
                </span>
              </div>
            </div>

            <div className="hidden sm:flex absolute bottom-[10%] left-[-50px] lg:left-[-70px] xl:left-[-90px] bg-white/90 dark:bg-neutral-900/90 border-1 border-blue-400 dark:border-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl items-center gap-2.5 z-20 shadow-xl transition-spring hover:-translate-y-1 text-slate-800 dark:text-white">
              <span className="text-base">🤖</span>
              <div>
                <span className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Phản xạ AI
                </span>
                <span className="block text-[11px] font-black text-slate-900 dark:text-white">
                  Giao tiếp Realtime
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Asymmetric Bento Grid Features (Layout Archetype 1) */}
      <section
        id="features"
        className="py-28 px-4 md:px-8 max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-[#12121a] border border-indigo-500/10 text-indigo-650 dark:text-indigo-400 rounded-full px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] font-extrabold mb-4">
            🚀 Hệ sinh thái học tập
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Giải pháp ghi nhớ toàn diện
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed max-w-md mx-auto font-medium">
            Hợp nhất phương pháp Spaced Repetition khoa học, tương tác thi đấu
            PvP và các buổi thực hành đa chiều để biến việc học ngoại ngữ thành
            thói quen.
          </p>
        </div>

        {/* Masonry CSS Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Spaced Repetition (col-span-2) - Shows Custom SVG Graph */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-2 bezel-outer p-1 bg-slate-200/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl hover:scale-[1.005] transition-spring"
          >
            <div className="bezel-inner rounded-[calc(1rem-2px)] p-6 bg-white dark:bg-[#0c0c0f]/80 h-full flex flex-col justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4 border border-sky-550/10">
                  <Brain className="w-5 h-5" strokeWidth={1.3} />
                </div>
                <h3 className="font-display font-black text-slate-900 dark:text-white text-lg md:text-xl">
                  Lặp lại ngắt quãng (Spaced Repetition)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold mt-2 max-w-md">
                  Thuật toán tự động dự đoán điểm rơi quên lãng của não bộ, nhắc
                  nhở ôn tập chính xác đúng thời điểm để khắc sâu từ vựng vào
                  trí nhớ dài hạn.
                </p>
              </div>

              {/* Dynamic SVG Memory Decay Chart */}
              <div className="w-full bg-slate-50 dark:bg-neutral-950 p-4 rounded-xl border border-slate-200/60 dark:border-white/5 mt-2">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                    Đồ thị lãng quên và điểm rơi ôn tập
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 font-mono">
                    100% Retain
                  </span>
                </div>
                <div className="relative h-20 w-full flex items-end">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                    <div className="border-b border-slate-300 dark:border-white w-full h-[1px]"></div>
                    <div className="border-b border-slate-300 dark:border-white w-full h-[1px]"></div>
                    <div className="border-b border-slate-300 dark:border-white w-full h-[1px]"></div>
                  </div>
                  {/* SVG Chart paths */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 300 80"
                    preserveAspectRatio="none"
                  >
                    {/* Decay Curve 1 */}
                    <path
                      d="M 0 10 Q 50 70 80 75"
                      fill="transparent"
                      className="stroke-rose-500/40"
                      strokeWidth="1.5"
                      strokeDasharray="3"
                    />
                    {/* Review Interval resetting */}
                    <path
                      d="M 0 10 Q 30 50 60 15 M 60 15 Q 110 55 140 20 M 140 20 Q 210 60 250 25"
                      fill="transparent"
                      className="stroke-sky-500 dark:stroke-sky-400"
                      strokeWidth="2"
                    />
                    {/* Dots at reset points */}
                    <circle
                      cx="60"
                      cy="15"
                      r="3"
                      className="fill-sky-500 dark:fill-sky-400"
                    />
                    <circle
                      cx="140"
                      cy="20"
                      r="3"
                      className="fill-sky-500 dark:fill-sky-400"
                    />
                  </svg>
                  <div className="absolute bottom-1 left-2 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-[8px] font-black px-1 py-0.5 rounded">
                    Không ôn tập (Quên bài)
                  </div>
                  <div className="absolute top-2 right-2 bg-sky-500/10 border border-sky-500/20 text-sky-655 dark:text-sky-400 text-[8px] font-black px-1 py-0.5 rounded">
                    Có ôn tập (Nhớ bài)
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: PVP Arena (col-span-1) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bezel-outer p-1 bg-slate-200/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl hover:scale-[1.005] transition-spring"
          >
            <div className="bezel-inner rounded-[calc(1rem-2px)] p-6 bg-white dark:bg-[#0c0c0f]/80 h-full flex flex-col justify-between gap-6">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 border border-indigo-550/10">
                  <Users className="w-5 h-5" strokeWidth={1.3} />
                </div>
                <h3 className="font-display font-black text-slate-900 dark:text-white text-lg">
                  Đấu trường PvP
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold mt-2">
                  Cạnh tranh so tài từ vựng trực tiếp theo thời gian thực cùng
                  bạn học toàn quốc, gia tăng động lực rèn luyện mỗi ngày.
                </p>
              </div>

              {/* PvP matchmaking visual */}
              <div className="bg-slate-50 dark:bg-neutral-950 p-3.5 rounded-xl border border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center text-[10px] font-bold border border-sky-500/20">
                    HA
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                    You
                  </span>
                </div>
                <span className="text-[9px] font-mono font-black text-rose-500 tracking-wider">
                  VS
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                    MinhDuc
                  </span>
                  <div className="w-7 h-7 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center text-[10px] font-bold border border-pink-500/20">
                    MD
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: AI Speech Coach (col-span-3) - Displays simulated chat bubbles */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-3 bezel-outer p-1 bg-slate-200/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl hover:scale-[1.002] transition-spring"
          >
            <div className="bezel-inner rounded-[calc(1rem-2px)] p-6 bg-white dark:bg-[#0c0c0f]/80 h-full flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-md flex flex-col justify-center">
                <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-4 border border-pink-550/10">
                  <MessageSquare className="w-5 h-5" strokeWidth={1.3} />
                </div>
                <h3 className="font-display font-black text-slate-900 dark:text-white text-lg md:text-xl">
                  Gia sư AI phản xạ
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold mt-2">
                  Trò chuyện nói nói và gõ phản xạ trực tiếp 1-1 với trợ lý AI
                  bản ngữ. Hệ thống sẽ phân tích cú pháp, sửa lỗi chính tả, cải
                  thiện từ vựng và chấm phát âm tức thì.
                </p>
              </div>

              {/* Simulated chat preview interface */}
              <div className="flex-1 max-w-md bg-slate-50 dark:bg-neutral-950/70 p-4 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col gap-3.5 shadow-inner">
                {/* AI Bubble */}
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-pink-550/20 text-pink-600 dark:text-pink-400 flex items-center justify-center text-xs font-black shrink-0 border border-pink-500/10">
                    🤖
                  </div>
                  <div className="bg-white dark:bg-[#121216] border border-slate-100 dark:border-white/5 px-3 py-2 rounded-2xl rounded-tl-none">
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200">
                      How would you describe your perfect vacation? ✈️
                    </p>
                  </div>
                </div>

                {/* User Bubble */}
                <div className="flex gap-2 justify-end">
                  <div className="bg-sky-500/10 border border-sky-500/15 px-3 py-2 rounded-2xl rounded-tr-none">
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200">
                      I have a strong{" "}
                      <span className="text-sky-600 dark:text-sky-400 font-bold underline">
                        wanderlust
                      </span>
                      , so I love exploring alps!
                    </p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center text-[10px] font-black shrink-0 border border-sky-500/10">
                    HA
                  </div>
                </div>

                {/* Instant Feedback Badge */}
                <div className="flex items-center gap-2 bg-white dark:bg-[#0c0c0f] border border-emerald-500/20 px-3 py-2 rounded-lg">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-350 leading-none">
                    Feedback: Cấu trúc tốt! Dùng từ chính xác.{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-black">
                      +15 XP
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-28 bg-slate-100/40 dark:bg-[#070709]/60 border-y border-slate-200 dark:border-neutral-900 relative z-10 px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-1.5 bg-slate-200/40 border border-sky-500/10 text-sky-400 rounded-full px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] font-extrabold mb-4">
              💬 Đánh giá
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Cảm nhận học viên
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review Card 1 */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bezel-outer p-1 bg-slate-200/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl"
            >
              <div className="bezel-inner p-6 bg-white dark:bg-[#0c0c0f]/80 h-full flex flex-col justify-between gap-6">
                <div>
                  <div className="flex gap-0.5 text-amber-500 text-xs mb-3">
                    ⭐⭐⭐⭐⭐
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed font-semibold">
                    &quot;Nhờ lộ trình từ vựng thông minh của XP Voca, mình đã
                    tăng vốn từ vượt bậc và đạt IELTS 7.5.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-105 dark:border-white/5">
                  <div className="w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-xs font-bold text-sky-600 dark:text-sky-400 shadow-sm">
                    HA
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Hoàng Anh
                    </h4>
                    <span className="text-[10px] text-slate-500 font-medium">
                      IELTS Candidate
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Review Card 2 */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bezel-outer p-1 bg-slate-200/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl"
            >
              <div className="bezel-inner p-6 bg-white dark:bg-[#0c0c0f]/80 h-full flex flex-col justify-between gap-6">
                <div>
                  <div className="flex gap-0.5 text-amber-500 text-xs mb-3">
                    ⭐⭐⭐⭐⭐
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-355 leading-relaxed font-semibold">
                    &quot;Giao diện tối giản, tập trung. Các bài nghe viết chính
                    tả (Dictation) cải thiện rất nhanh phản xạ nghe.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-105 dark:border-white/5">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-650 dark:text-indigo-400 shadow-sm">
                    MĐ
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Minh Đức
                    </h4>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Software Engineer
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Review Card 3 */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bezel-outer p-1 bg-slate-200/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl"
            >
              <div className="bezel-inner p-6 bg-white dark:bg-[#0c0c0f]/80 h-full flex flex-col justify-between gap-6">
                <div>
                  <div className="flex gap-0.5 text-amber-500 text-xs mb-3">
                    ⭐⭐⭐⭐⭐
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-355 leading-relaxed font-semibold">
                    &quot;Học từ vựng không còn nhàm chán nhờ Spaced Repetition
                    và các mini game thi đua PvP hào hứng.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-105 dark:border-white/5">
                  <div className="w-8 h-8 rounded-full bg-pink-50 dark:bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-xs font-bold text-pink-600 dark:text-pink-400 shadow-sm">
                    MT
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Minh Thư
                    </h4>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Teacher
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Studio Footer */}
      <footer className="w-full mt-auto bg-white dark:bg-[#030304] border-t border-slate-200 dark:border-neutral-900 py-6 md:py-4 relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col md:flex-row justify-between items-center md:items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <Link
              href="/"
              className="flex items-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-lg w-max"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-xs shadow-md text-white">
                🦉
              </div>
              <span className="font-display font-black text-[15px] tracking-tight bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
                XP English
              </span>
            </Link>
            <p className="text-[11px] text-slate-500 dark:text-neutral-450 leading-relaxed max-w-xs font-semibold">
              Nền tảng học từ vựng thông minh thế hệ mới.
            </p>
          </div>

          {/* Inline Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-2.5 text-xs font-bold w-full md:w-auto">
            <Link
              href="/vocabulary"
              className="text-slate-500 dark:text-neutral-450 hover:text-sky-550 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-md"
            >
              Bộ từ vựng
            </Link>
            <Link
              href="/review"
              className="text-slate-500 dark:text-neutral-450 hover:text-sky-550 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-md"
            >
              Lịch ôn tập
            </Link>
            <Link
              href="/community"
              className="text-slate-500 dark:text-neutral-450 hover:text-sky-550 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-md"
            >
              Cộng đồng
            </Link>
            <a
              href="mailto:support@xpenglish.com"
              className="text-slate-500 dark:text-neutral-450 hover:text-sky-550 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sky-500 rounded-md"
            >
              Liên hệ
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
          <div className="w-full pt-4 border-t border-slate-100 dark:border-neutral-900/40 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-2">
            <span className="text-[10px] text-slate-400 dark:text-neutral-500 font-semibold">
              © 2026 XP English / XP Voca. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
