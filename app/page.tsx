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
  Shield,
  Zap,
  BookOpen,
} from "lucide-react";

export default function LandingPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

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

  const playAudioSample = () => {
    setIsPlayingAudio(true);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Wanderlust");
      utterance.lang = "en-US";
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 1200);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as any },
    },
  };

  return (
    <main
      id="app-content"
      className="min-h-[100dvh] flex flex-col justify-between bg-slate-50 dark:bg-[#030304] text-slate-900 dark:text-slate-100 overflow-x-hidden relative transition-colors duration-500 select-none"
    >
      {/* Background Ambient Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-sky-400/10 to-indigo-400/10 dark:from-sky-500/15 dark:to-indigo-500/15 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-violet-400/10 to-amber-400/10 dark:from-violet-500/15 dark:to-amber-500/15 blur-[120px] pointer-events-none z-0" />

      {/* Premium Sticky Full-Width Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 w-full h-14 md:h-16 border-b flex items-center z-50 backdrop-blur-xl transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-[#070708]/90 border-slate-200/80 dark:border-neutral-800/80 shadow-md"
            : "bg-white/60 dark:bg-transparent border-slate-200/40 dark:border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 cursor-pointer group focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-blue-500 rounded-xl px-1 py-0.5"
          >
            <div className="w-9.5 h-9.5 md:w-11 md:h-11 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/50 dark:border-neutral-800 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 overflow-hidden">
              <img src="/mascot.png" alt="Mascot" className="w-[90%] h-[90%] object-contain" />
            </div>
            <span className="font-display font-black text-base md:text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="text-[#0059bb] dark:text-blue-400">XP</span> English
              <span className="text-amber-500 font-normal">|</span>
              <span className="text-amber-500">Voca</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => scrollToSection("features")}
              className="text-xs font-black text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-white/5 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              Tính năng nổi bật
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-xs font-black text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-white/5 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              Đánh giá học viên
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {isLoaded && userId ? (
              <Link
                href="/dashboard"
                className="focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-blue-500 rounded-xl"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-[#0059bb] via-blue-600 to-indigo-600 text-white font-black text-xs h-9.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all group cursor-pointer border border-blue-400/20"
                >
                  Vào Dashboard
                  <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
                  </span>
                </motion.button>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-black text-slate-700 dark:text-slate-300 h-9.5 px-3.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" strokeWidth={2} />
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-blue-500 rounded-xl"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, y: -0.5 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-[#0059bb] via-blue-600 to-indigo-600 text-white font-black text-xs h-9.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all group cursor-pointer border border-blue-400/20"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-amber-300" strokeWidth={2} />
                    Bắt đầu miễn phí
                    <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
                    </span>
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger toggle */}
          <button
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 cursor-pointer border border-slate-200/60 dark:border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4.5 h-4.5" strokeWidth={2} />
            ) : (
              <Menu className="w-4.5 h-4.5" strokeWidth={2} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed top-14 md:top-16 left-0 right-0 w-full bg-white/98 dark:bg-[#08080a]/98 border-b border-slate-200/80 dark:border-neutral-800/80 p-4 sm:p-5 z-40 flex flex-col gap-3.5 shadow-2xl backdrop-blur-2xl text-slate-900 dark:text-white rounded-b-2xl"
          >
            <div className="flex flex-col w-full gap-1">
              <button
                onClick={() => scrollToSection("features")}
                className="flex items-center justify-between py-3.5 px-3 text-sm font-black text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-neutral-900/80 w-full cursor-pointer rounded-xl hover:bg-blue-50/60 dark:hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#0059bb] dark:text-blue-400" strokeWidth={2} />
                  <span>Tính năng nổi bật</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="flex items-center justify-between py-3.5 px-3 text-sm font-black text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-neutral-900/80 w-full cursor-pointer rounded-xl hover:bg-blue-50/60 dark:hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500/20" strokeWidth={2} />
                  <span>Đánh giá học viên</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="flex flex-col gap-2.5 mt-2">
              {isLoaded && userId ? (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full"
                >
                  <button className="w-full h-11 bg-gradient-to-r from-[#0059bb] via-blue-600 to-indigo-600 text-white font-black text-sm rounded-xl flex items-center justify-center gap-2.5 cursor-pointer shadow-md border border-blue-400/20 active:scale-[0.98] transition-all">
                    Vào Dashboard
                    <span className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-white" strokeWidth={2.5} />
                    </span>
                  </button>
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <button className="w-full h-11 bg-gradient-to-r from-[#0059bb] via-blue-600 to-indigo-600 text-white font-black text-sm rounded-xl flex items-center justify-center gap-2.5 cursor-pointer shadow-md border border-blue-400/20 active:scale-[0.98] transition-all">
                      Bắt đầu học miễn phí
                      <span className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-white" strokeWidth={2.5} />
                      </span>
                    </button>
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <button className="w-full h-11 bg-slate-100 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-slate-800 dark:text-slate-200 font-black text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-all">
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
      <section className="relative min-h-[90dvh] pt-24 md:pt-32 flex items-center z-10 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Headline & High-Impact Copy */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-500/20 dark:border-blue-400/20 text-[#0059bb] dark:text-blue-400 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-black w-max mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" strokeWidth={2} />
              <span>Nền Tảng Học Từ Vựng Thế Hệ Mới</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black leading-[1.08] tracking-tight text-slate-900 dark:text-white mb-5 text-balance">
              Chinh Phục Từ Vựng Tiếng Anh Cùng{" "}
              <span className="bg-gradient-to-r from-[#0059bb] via-blue-600 to-amber-500 bg-clip-text text-transparent">
                XP English
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-8 font-semibold text-balance">
              Học thông minh qua Spaced Repetition khoa học, thách đấu PvP thời gian thực & gia sư phản xạ AI 24/7.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              {isLoaded && userId ? (
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto"
                >
                  <motion.button
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto h-12 bg-gradient-to-r from-[#0059bb] via-blue-600 to-indigo-600 text-white font-black text-sm px-7 rounded-2xl flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer group border border-blue-400/20"
                  >
                    Vào Học Ngay
                    <span className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="w-3 h-3 text-white" strokeWidth={2.5} />
                    </span>
                  </motion.button>
                </Link>
              ) : (
                <Link
                  href="/register"
                  className="w-full sm:w-auto"
                >
                  <motion.button
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto h-12 bg-gradient-to-r from-[#0059bb] via-blue-600 to-indigo-600 text-white font-black text-sm px-7 rounded-2xl flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer group border border-blue-400/20"
                  >
                    Bắt đầu học miễn phí
                    <span className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="w-3 h-3 text-white" strokeWidth={2.5} />
                    </span>
                  </motion.button>
                </Link>
              )}
              <button
                onClick={() => scrollToSection("features")}
                className="w-full sm:w-auto h-12 border border-slate-300 dark:border-neutral-800 rounded-2xl font-black text-sm text-slate-800 dark:text-slate-200 px-6 hover:bg-slate-100 dark:hover:bg-neutral-800/80 hover:text-[#0059bb] dark:hover:text-blue-400 transition-all cursor-pointer active:scale-[0.98]"
              >
                Khám phá tính năng
              </button>
            </div>

            {/* Key stats Bento Chips (Updated Vocabulary count to dynamic 5,000+) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-slate-200/80 dark:border-neutral-850">
              <div>
                <div className="text-2xl md:text-3xl font-display font-black text-[#0059bb] dark:text-blue-400">
                  15K+
                </div>
                <div className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-wider mt-1">
                  Học viên
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-display font-black text-amber-500">
                  5,000+
                </div>
                <div className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-wider mt-1">
                  Từ vựng
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-display font-black text-emerald-500">
                  98%
                </div>
                <div className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-wider mt-1">
                  Ghi nhớ lâu
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Live Flashcard Mockup Visual */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            {/* Doppelrand Bezel Card */}
            <div className="bezel-outer p-1.5 bg-slate-200/50 dark:bg-white/5 border border-slate-300/20 dark:border-white/10 rounded-[1.75rem] w-full max-w-sm shadow-2xl relative z-10">
              <div className="bezel-inner rounded-[calc(1.75rem-6px)] p-6 bg-white dark:bg-[#0c0c0f]/95 border border-slate-100 dark:border-white/5 flex flex-col gap-5 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Card header */}
                <div className="flex justify-between items-center">
                  <span className="bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[9.5px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider border border-sky-500/10">
                    BẬC CAO CẤP
                  </span>
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-neutral-900 px-2 py-1 rounded-md border border-slate-100 dark:border-white/5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[9.5px] font-bold text-slate-600 dark:text-slate-300">
                      B2 / C1
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                    Wanderlust
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-semibold">
                      /ˈwɒn.dɚ.lʌst/
                    </span>
                    <button
                      onClick={playAudioSample}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isPlayingAudio
                          ? "bg-sky-500 text-white scale-110 shadow-md"
                          : "bg-sky-500/20 text-sky-600 dark:text-sky-400 hover:scale-105"
                      }`}
                      title="Phát âm thử"
                    >
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </button>
                  </div>
                </div>

                <div className="h-[1px] bg-slate-100 dark:bg-neutral-800" />

                <div>
                  <h4 className="text-[9.5px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-wider mb-1">
                    Định nghĩa tiếng Việt
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                    Khát khao mãnh liệt được đi du lịch, lang thang và khám phá thế giới.
                  </p>
                </div>

                {/* Memory Decay Progress Ring */}
                <div className="mt-1 flex items-center justify-between bg-slate-50 dark:bg-neutral-950 p-3 rounded-xl border border-slate-100 dark:border-white/5">
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
                          className="stroke-sky-500 dark:stroke-sky-400"
                          strokeWidth="2.5"
                          fill="transparent"
                          strokeDasharray="81.6"
                          initial={{ strokeDashoffset: 81.6 }}
                          animate={{ strokeDashoffset: 16.3 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      <span className="absolute text-[8.5px] font-black text-sky-600 dark:text-sky-400">
                        80%
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                        Trình độ nhớ
                      </span>
                      <span className="block text-[10.5px] font-black text-slate-800 dark:text-white">
                        Rất tốt
                      </span>
                    </div>
                  </div>
                  <span className="text-[9.5px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/15 px-2 py-0.5 rounded">
                    ÔN: 4 ngày
                  </span>
                </div>
              </div>
            </div>

            {/* Ambient Floating Badges */}
            <div className="hidden sm:flex absolute top-[12%] right-[-50px] lg:right-[-70px] xl:right-[-85px] bg-white/95 dark:bg-neutral-900/95 border border-amber-500/30 dark:border-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl items-center gap-2 z-20 shadow-xl text-slate-800 dark:text-white">
              <span className="text-base">🔥</span>
              <div>
                <span className="block text-[8.5px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Streak liên tục
                </span>
                <span className="block text-[11px] font-black text-slate-900 dark:text-white">
                  15 Ngày Học
                </span>
              </div>
            </div>

            <div className="hidden sm:flex absolute bottom-[12%] left-[-50px] lg:left-[-70px] xl:left-[-85px] bg-white/95 dark:bg-neutral-900/95 border border-blue-500/30 dark:border-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl items-center gap-2 z-20 shadow-xl text-slate-800 dark:text-white">
              <span className="text-base">🤖</span>
              <div>
                <span className="block text-[8.5px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
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

      {/* Asymmetric Bento Grid Features Section */}
      <section
        id="features"
        className="py-20 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-500/20 dark:border-blue-400/20 text-[#0059bb] dark:text-blue-400 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-black mb-3 shadow-xs">
            <span>🚀 HỆ SINH THÁI HỌC TẬP</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Giải pháp ghi nhớ toàn diện
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed max-w-md mx-auto font-semibold">
            Hợp nhất phương pháp Spaced Repetition khoa học, thách đấu PvP và phản xạ 1-1 cùng AI.
          </p>
        </div>

        {/* Masonry Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Spaced Repetition */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-2 bezel-outer p-1 bg-slate-200/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl"
          >
            <div className="bezel-inner rounded-[calc(1rem-2px)] p-6 bg-white dark:bg-[#0c0c0f]/80 h-full flex flex-col justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#0059bb] dark:text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20 shadow-xs">
                  <Brain className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="font-display font-black text-slate-900 dark:text-white text-lg md:text-xl">
                  Lặp lại ngắt quãng (Spaced Repetition)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold mt-2 max-w-md">
                  Thuật toán tự động dự đoán điểm rơi quên lãng của não bộ, nhắc nhở ôn tập chính xác đúng thời điểm để ghi nhớ vĩnh viễn.
                </p>
              </div>

              {/* Dynamic SVG Memory Decay Chart */}
              <div className="w-full bg-slate-50/80 dark:bg-neutral-950 p-4 rounded-xl border border-slate-200/80 dark:border-white/10 mt-2 shadow-inner">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] sm:text-xs font-black text-[#0059bb] dark:text-blue-400 uppercase tracking-wider">
                    Đồ thị lãng quên & điểm rơi ôn tập
                  </span>
                  <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 font-mono bg-slate-200/60 dark:bg-neutral-800 px-2 py-0.5 rounded">
                    100% RETAIN
                  </span>
                </div>
                <div className="relative h-28 sm:h-32 w-full flex items-end">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                    <div className="border-b border-slate-300 dark:border-white w-full h-[1px]" />
                    <div className="border-b border-slate-300 dark:border-white w-full h-[1px]" />
                    <div className="border-b border-slate-300 dark:border-white w-full h-[1px]" />
                  </div>

                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 350 90"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 10 15 Q 70 75 120 85"
                      fill="transparent"
                      className="stroke-rose-500/60"
                      strokeWidth="2"
                      strokeDasharray="4"
                    />
                    <path
                      d="M 10 15 Q 45 60 85 20 M 85 20 Q 140 65 175 25 M 175 25 Q 240 60 330 30"
                      fill="transparent"
                      className="stroke-[#0059bb] dark:stroke-blue-400"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="85"
                      cy="20"
                      r="4"
                      className="fill-[#0059bb] dark:fill-blue-400 stroke-white dark:stroke-neutral-900"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="175"
                      cy="25"
                      r="4"
                      className="fill-[#0059bb] dark:fill-blue-400 stroke-white dark:stroke-neutral-900"
                      strokeWidth="1.5"
                    />
                  </svg>

                  <div className="absolute bottom-2 left-2 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-[9px] sm:text-[10px] font-black px-2 py-1 rounded-md shadow-xs z-10 backdrop-blur-sm">
                    Không ôn tập (Quên bài)
                  </div>
                  <div className="absolute top-2 right-2 bg-blue-500/10 border border-blue-500/30 text-[#0059bb] dark:text-blue-400 text-[9px] sm:text-[10px] font-black px-2 py-1 rounded-md shadow-xs z-10 backdrop-blur-sm">
                    Có ôn tập (Nhớ 98%)
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: PVP Arena */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bezel-outer p-1 bg-slate-200/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl"
          >
            <div className="bezel-inner rounded-[calc(1rem-2px)] p-6 bg-white dark:bg-[#0c0c0f]/80 h-full flex flex-col justify-between gap-6">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20 shadow-xs">
                  <Users className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="font-display font-black text-slate-900 dark:text-white text-lg md:text-xl">
                  Đấu trường PvP
                </h3>
                <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-relaxed font-semibold mt-2">
                  Cạnh tranh so tài từ vựng trực tiếp theo thời gian thực cùng bạn học toàn quốc, bứt phá phản xạ.
                </p>
              </div>

              {/* PvP matchmaking visual */}
              <div className="bg-slate-50/80 dark:bg-neutral-950 p-4 rounded-xl border border-slate-200/80 dark:border-white/10 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-[#0059bb] dark:text-blue-400 flex items-center justify-center text-xs font-black border border-blue-500/30">
                    HA
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    You
                  </span>
                </div>
                <span className="text-xs font-black text-rose-500 bg-rose-500/10 border border-rose-500/25 px-2.5 py-0.5 rounded-full tracking-wider">
                  VS
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    MinhDuc
                  </span>
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-black border border-amber-500/30">
                    MD
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: AI Speech Coach */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-3 bezel-outer p-1 bg-slate-200/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl"
          >
            <div className="bezel-inner rounded-[calc(1rem-2px)] p-6 bg-white dark:bg-[#0c0c0f]/80 h-full flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-md flex flex-col justify-center">
                <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-4 border border-pink-500/20 shadow-xs">
                  <MessageSquare className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="font-display font-black text-slate-900 dark:text-white text-lg md:text-xl">
                  Gia sư AI phản xạ
                </h3>
                <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-relaxed font-semibold mt-2">
                  Trò chuyện nói và gõ phản xạ trực tiếp 1-1 với trợ lý AI bản ngữ. Hệ thống tự động sửa lỗi và cộng điểm thưởng XP.
                </p>
              </div>

              {/* Chat preview */}
              <div className="flex-1 max-w-md bg-slate-50/80 dark:bg-neutral-950/80 p-4 rounded-xl border border-slate-200/80 dark:border-white/10 flex flex-col gap-3 shadow-inner">
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center text-xs font-black shrink-0 border border-pink-500/20">
                    🤖
                  </div>
                  <div className="bg-white dark:bg-[#121216] border border-slate-200/80 dark:border-white/10 px-3.5 py-2 rounded-2xl rounded-tl-none shadow-xs">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      How would you describe your perfect vacation? ✈️
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <div className="bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 px-3.5 py-2 rounded-2xl rounded-tr-none shadow-xs">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      I have a strong{" "}
                      <span className="text-amber-500 dark:text-amber-400 font-black underline decoration-amber-500/50 decoration-2">
                        wanderlust
                      </span>
                      , so I love exploring!
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 text-[#0059bb] dark:text-blue-400 flex items-center justify-center text-xs font-black shrink-0 border border-blue-500/20">
                    HA
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white dark:bg-[#0c0c0f] border border-emerald-500/30 px-3 py-2 rounded-xl shadow-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={2} />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-snug">
                    Cấu trúc tốt! Dùng từ chính xác.{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-black ml-1">
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
        className="py-20 sm:py-24 bg-slate-100/50 dark:bg-[#070709]/60 border-y border-slate-200/80 dark:border-neutral-900 relative z-10 px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-500/25 dark:border-amber-400/25 text-amber-600 dark:text-amber-400 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-black mb-3 shadow-xs">
              <span>💬 ĐÁNH GIÁ TỪ HỌC VIÊN</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Cảm nhận học viên
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Review Card 1 */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bezel-outer p-1 bg-slate-200/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl"
            >
              <div className="bezel-inner p-6 bg-white dark:bg-[#0c0c0f]/80 h-full flex flex-col justify-between gap-5">
                <div>
                  <div className="flex gap-1 text-amber-400 text-sm mb-2.5">
                    ★ ★ ★ ★ ★
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                    &quot;Nhờ lộ trình từ vựng thông minh của XP Voca, mình đã tăng vốn từ vượt bậc và đạt IELTS 7.5.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3.5 border-t border-slate-100 dark:border-white/10">
                  <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-xs font-black text-[#0059bb] dark:text-blue-400">
                    HA
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                      Hoàng Anh
                    </h4>
                    <span className="text-[10.5px] text-slate-400 font-bold">
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
              <div className="bezel-inner p-6 bg-white dark:bg-[#0c0c0f]/80 h-full flex flex-col justify-between gap-5">
                <div>
                  <div className="flex gap-1 text-amber-400 text-sm mb-2.5">
                    ★ ★ ★ ★ ★
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                    &quot;Giao diện tối giản, tập trung. Bài viết chính tả (Dictation) cải thiện rất nhanh phản xạ nghe.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3.5 border-t border-slate-100 dark:border-white/10">
                  <div className="w-9 h-9 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-xs font-black text-amber-600 dark:text-amber-400">
                    MĐ
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                      Minh Đức
                    </h4>
                    <span className="text-[10.5px] text-slate-400 font-bold">
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
              <div className="bezel-inner p-6 bg-white dark:bg-[#0c0c0f]/80 h-full flex flex-col justify-between gap-5">
                <div>
                  <div className="flex gap-1 text-amber-400 text-sm mb-2.5">
                    ★ ★ ★ ★ ★
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                    &quot;Học từ vựng không còn nhàm chán nhờ Spaced Repetition và các mini game thi đua PvP hào hứng.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3.5 border-t border-slate-100 dark:border-white/10">
                  <div className="w-9 h-9 rounded-full bg-pink-50 dark:bg-pink-500/10 border border-pink-500/25 flex items-center justify-center text-xs font-black text-pink-600 dark:text-pink-400">
                    MT
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                      Minh Thư
                    </h4>
                    <span className="text-[10.5px] text-slate-400 font-bold">
                      English Teacher
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Studio Footer */}
      <footer className="w-full mt-auto bg-white dark:bg-[#030304] border-t border-slate-200 dark:border-neutral-900 py-8 md:py-6 relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col md:flex-row justify-between items-center md:items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <Link
              href="/"
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/50 dark:border-neutral-800 flex items-center justify-center shadow-sm overflow-hidden">
                <img src="/mascot.png" alt="Mascot" className="w-[90%] h-[90%] object-contain" />
              </div>
              <span className="font-display font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="text-[#0059bb] dark:text-blue-400">XP</span> English
                <span className="text-amber-500 font-normal">|</span>
                <span className="text-amber-500">Voca</span>
              </span>
            </Link>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs font-semibold">
              Nền tảng học từ vựng thông minh thế hệ mới.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-3 text-xs sm:text-sm font-bold w-full md:w-auto">
            <Link
              href="/vocabulary"
              className="text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-blue-400 transition-colors"
            >
              Bộ từ vựng
            </Link>
            <Link
              href="/review"
              className="text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-blue-400 transition-colors"
            >
              Lịch ôn tập
            </Link>
            <Link
              href="/community"
              className="text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-blue-400 transition-colors"
            >
              Cộng đồng
            </Link>
            <a
              href="mailto:support@xpenglish.com"
              className="text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-blue-400 transition-colors"
            >
              Liên hệ
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
          <div className="w-full pt-4 border-t border-slate-100 dark:border-neutral-900/60 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-2">
            <span className="text-xs text-slate-500 dark:text-neutral-400 font-semibold">
              © 2026 XP English / XP Voca. Đã bảo lưu mọi quyền.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

