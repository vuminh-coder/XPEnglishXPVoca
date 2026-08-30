"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
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
  BookOpen,
  Headphones,
  Trophy,
  Flame,
  FolderPlus,
  Mic,
  ShieldCheck,
  CheckCircle2,
  Zap,
  BarChart3,
} from "lucide-react";

export default function LandingPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" as any },
    },
  };

  return (
    <main
      id="app-content"
      className="min-h-[100dvh] flex flex-col justify-between bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-slate-100 overflow-x-hidden relative select-none font-sans"
    >
      {/* Background Mesh Gradients */}
      <div className="hidden md:block absolute top-[-5%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-[#0059bb]/10 dark:bg-[#0059bb]/15 blur-[120px] pointer-events-none z-0" />
      <div className="hidden md:block absolute bottom-[15%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-[120px] pointer-events-none z-0" />

      {/* Sticky Top Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 w-full h-14 border-b flex items-center z-50 backdrop-blur-md transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 dark:bg-[#08080b]/95 border-slate-200/90 dark:border-slate-800 shadow-2xs"
            : "bg-white/80 dark:bg-transparent border-slate-200/60 dark:border-slate-800/80"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 leading-none">
              <span className="text-[#0059bb] dark:text-sky-400">XP</span> English
              <span className="text-amber-500 font-normal">|</span>
              <span className="text-amber-500">XP Voca</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => scrollToSection("features")}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 px-3.5 py-2 rounded-xl cursor-pointer transition-colors"
            >
              Tính năng nổi bật
            </button>
            <button
              onClick={() => scrollToSection("vocab-library")}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 px-3.5 py-2 rounded-xl cursor-pointer transition-colors"
            >
              Kho từ vựng
            </button>
            <button
              onClick={() => scrollToSection("ai-tutor")}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 px-3.5 py-2 rounded-xl cursor-pointer transition-colors"
            >
              Gia sư AI 1-1
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 px-3.5 py-2 rounded-xl cursor-pointer transition-colors"
            >
              Đánh giá học viên
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {user ? (
              <Link href="/dashboard">
                <button className="bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs h-9 px-4 rounded-xl flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer">
                  <span>Vào Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 h-9 px-3.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Đăng nhập</span>
                </Link>
                <Link href="/register">
                  <button className="bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs h-9 px-4 rounded-xl flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer">
                    <UserPlus className="w-3.5 h-3.5 text-amber-300" />
                    <span>Bắt đầu miễn phí</span>
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 cursor-pointer border border-slate-200/80 dark:border-slate-700/60 active:scale-95 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-14 left-0 right-0 bg-white dark:bg-[#08080b] border-b border-slate-200/90 dark:border-slate-800 p-4 z-40 flex flex-col gap-3 shadow-xl backdrop-blur-md text-slate-900 dark:text-white"
          >
            <div className="flex flex-col gap-1">
              <button
                onClick={() => scrollToSection("features")}
                className="flex items-center justify-between py-2.5 px-3 text-xs font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 w-full rounded-xl"
              >
                <span>Tính năng nổi bật</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => scrollToSection("vocab-library")}
                className="flex items-center justify-between py-2.5 px-3 text-xs font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 w-full rounded-xl"
              >
                <span>Kho từ vựng</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => scrollToSection("ai-tutor")}
                className="flex items-center justify-between py-2.5 px-3 text-xs font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 w-full rounded-xl"
              >
                <span>Gia sư AI 1-1</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="flex items-center justify-between py-2.5 px-3 text-xs font-bold text-slate-800 dark:text-slate-100 w-full rounded-xl"
              >
                <span>Đánh giá học viên</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {user ? (
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full h-10 bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-2xs cursor-pointer">
                    <span>Vào Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              ) : (
                <>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full h-10 bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-2xs cursor-pointer">
                      <span>Bắt đầu học miễn phí</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full h-10 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
                      <span>Đăng nhập</span>
                    </button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO SECTION */}
      <section className="relative pt-20 pb-10 md:pt-28 md:pb-16 px-4 md:px-6 max-w-7xl mx-auto z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Hero Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 text-left"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#0059bb] dark:text-sky-400 rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wide mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Nền Tảng Học Từ Vựng Thế Hệ Mới</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight text-slate-900 dark:text-white mb-4">
              Chinh Phục Từ Vựng Tiếng Anh Cùng
              <br />
              <span className="inline-block mt-1 font-black">
                <span className="text-[#0059bb] dark:text-sky-400">XP</span> English{" "}
                <span className="text-amber-500 font-normal">|</span>{" "}
                <span className="text-amber-500">XP Voca</span>
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-6 max-w-xl">
              Học thông minh qua thuật toán <strong className="text-[#0059bb] dark:text-sky-400 font-bold">Spaced Repetition</strong> khoa học,
              thách đấu <strong className="text-amber-500 font-bold">PvP thời gian thực</strong> & <strong className="text-purple-600 dark:text-purple-400 font-bold">trợ lý gia sư AI 24/7</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
              {user ? (
                <Link href="/dashboard">
                  <button className="h-11 bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs sm:text-sm px-6 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer">
                    <span>Vào Học Ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              ) : (
                <Link href="/register">
                  <button className="h-11 bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs sm:text-sm px-6 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer">
                    <span>Bắt đầu miễn phí</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              )}
              <button
                onClick={() => scrollToSection("features")}
                className="h-11 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-300 px-5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Khám phá tính năng
              </button>
            </div>

            {/* Clean Stats Row */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-5 border-t border-slate-200/90 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-center sm:text-left">
                <div className="text-lg sm:text-xl md:text-2xl font-display font-black text-[#0059bb] dark:text-sky-400">
                  15K+
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                  Học viên
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-center sm:text-left">
                <div className="text-lg sm:text-xl md:text-2xl font-display font-black text-amber-500">
                  5,000+
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                  Từ vựng
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-center sm:text-left">
                <div className="text-lg sm:text-xl md:text-2xl font-display font-black text-emerald-500">
                  98%
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                  Ghi nhớ lâu
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-center sm:text-left">
                <div className="text-lg sm:text-xl md:text-2xl font-display font-black text-purple-500">
                  400+
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                  Bài luyện tập
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive Flashcard Widget - Flush to Right Margin with Perfect Proportion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center lg:justify-end items-center relative w-full"
          >
            <div className="w-full max-w-[410px] rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-md shadow-slate-900/5 relative z-10 space-y-3.5 sm:space-y-4">
              
              {/* Header Badges */}
              <div className="flex justify-between items-center gap-2">
                <span className="bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 text-[11px] font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-wide border border-blue-200 dark:border-blue-800">
                  BẬC CAO CẤP
                </span>
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
                    B2 / C1
                  </span>
                </div>
              </div>

              {/* Main Word & Pronunciation */}
              <div>
                <h3 className="text-2xl sm:text-[28px] font-display font-black text-slate-900 dark:text-white tracking-tight leading-none">
                  Wanderlust
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono font-semibold">
                    /ˈwɒn.dɚ.lʌst/
                  </span>
                  <button
                    onClick={playAudioSample}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs ${
                      isPlayingAudio
                        ? "bg-[#0059bb] text-white"
                        : "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800"
                    }`}
                    title="Phát âm IPA"
                  >
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </button>
                </div>
              </div>

              <div className="h-[1px] bg-slate-100 dark:bg-slate-800" />

              {/* Vietnamese Definition */}
              <div>
                <h4 className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider mb-1">
                  Định nghĩa tiếng Việt
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  Khát khao mãnh liệt được đi du lịch, lang thang và khám phá thế giới.
                </p>
              </div>

              {/* Retention Status & Next Review */}
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border-2 border-[#0059bb] flex items-center justify-center text-[10px] font-black text-[#0059bb] dark:text-sky-400 font-mono shrink-0">
                    80%
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide">
                      Trình độ nhớ
                    </span>
                    <span className="block text-xs font-bold text-slate-900 dark:text-white">
                      Rất tốt
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-lg shrink-0">
                  ÔN: 4 ngày
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: BENTO GRID 5 ECOSYSTEM FEATURES */}
      <section id="features" className="py-12 md:py-16 lg:py-24 px-4 md:px-6 max-w-7xl mx-auto w-full z-10">
        {/* Bento Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#0059bb] dark:text-sky-400 rounded-lg px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <span>HỆ SINH THÁI HỌC TẬP TOÀN DIỆN</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            5 Đột Phá Giúp Bạn{" "}
            <span className="text-[#0059bb] dark:text-sky-400">Thuộc Bài Nhanh</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-xl mx-auto">
            Hợp nhất phương pháp <strong className="text-[#0059bb] dark:text-sky-400 font-bold">Spaced Repetition</strong> khoa học & kho từ vựng đa dạng,
            kết hợp <strong className="text-amber-500 font-bold">đấu trường PvP</strong> thời gian thực cùng <strong className="text-purple-600 dark:text-purple-400 font-bold">trợ lý AI 24/7</strong>.
          </p>
        </div>

        {/* 5 Balanced Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          
          {/* Card 1: Spaced Repetition SRS (Row 1 - 2 Cols) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-2 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-7 shadow-2xs flex flex-col justify-between gap-5"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center border border-blue-200 dark:border-blue-800 shrink-0 shadow-2xs">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="font-display font-black text-slate-900 dark:text-white text-base sm:text-xl leading-snug">
                  Lặp lại ngắt quãng (<span className="text-[#0059bb] dark:text-sky-400">SRS</span>)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Thuật toán tự động dự đoán điểm rơi quên lãng của não bộ,
                nhắc nhở ôn tập đúng thời điểm vàng để ghi nhớ từ vựng vĩnh viễn.
              </p>
            </div>

            {/* Dynamic SVG Chart */}
            <div className="w-full bg-slate-50 dark:bg-neutral-950 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[10px] sm:text-xs font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-wider">
                  Đồ thị lãng quên & điểm rơi ôn tập SRS
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-200/60 dark:bg-neutral-800 px-2 py-0.5 rounded-md shrink-0">
                  100% RETAIN
                </span>
              </div>
              <div className="relative h-24 sm:h-28 w-full">
                <svg className="w-full h-full" viewBox="0 0 350 90" preserveAspectRatio="none">
                  <path d="M 10 15 Q 70 75 120 85" fill="transparent" className="stroke-rose-500/60" strokeWidth="2" strokeDasharray="4" />
                  <path d="M 10 15 Q 45 60 85 20 M 85 20 Q 140 65 175 25 M 175 25 Q 240 60 330 30" fill="transparent" className="stroke-[#0059bb] dark:stroke-sky-400" strokeWidth="2.2" />
                  <circle cx="85" cy="20" r="4" className="fill-[#0059bb] dark:fill-sky-400 stroke-white dark:stroke-neutral-900" strokeWidth="2" />
                  <circle cx="175" cy="25" r="4" className="fill-[#0059bb] dark:fill-sky-400 stroke-white dark:stroke-neutral-900" strokeWidth="2" />
                </svg>
              </div>

              {/* Clean Legend Bar Below SVG */}
              <div className="flex items-center justify-between text-xs font-bold mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Không ôn (Quên bài)
                </span>
                <span className="text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0059bb] dark:bg-sky-400" />
                  Có ôn (Nhớ 98%)
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Kho Từ Vựng & Custom Sets (Row 1 - 1 Col) */}
          <motion.div
            id="vocab-library"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-7 shadow-2xs flex flex-col justify-between gap-5"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-800 shrink-0 shadow-2xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-display font-black text-slate-900 dark:text-white text-base sm:text-xl leading-snug">
                  Kho Từ Vựng & <span className="text-amber-500">Bộ Từ Riêng</span>
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Kho từ chuẩn IELTS, TOEIC, VSTEP & Oxford 3000 kèm tính năng tự tạo bộ từ vựng cá nhân hóa.
              </p>
            </div>

            <div className="flex flex-col gap-2 bg-slate-50 dark:bg-neutral-950 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0059bb]" /> IELTS Academic
                </span>
                <span className="text-xs text-slate-400 font-mono font-semibold">1,200 từ</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> TOEIC Chuyên Ngành
                </span>
                <span className="text-xs text-slate-400 font-mono font-semibold">900 từ</span>
              </div>
              <div className="flex justify-between items-center pt-1.5 border-t border-slate-200/60 dark:border-slate-800">
                <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5">
                  <FolderPlus className="w-4 h-4" /> Bộ từ của tôi
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">Tùy chỉnh</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Đấu Trường PvP (Row 2 - Col 1) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-6 shadow-2xs flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-200 dark:border-rose-800 shrink-0 shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-display font-black text-slate-900 dark:text-white text-base sm:text-lg leading-snug">
                  Đấu Trường <span className="text-rose-600 dark:text-rose-400">PvP Trực Tiếp</span>
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                So tài từ vựng trực tiếp theo thời gian thực, thách đấu hào hứng cùng bạn học toàn quốc.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-neutral-950 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-[#0059bb] dark:text-sky-400 flex items-center justify-center text-xs font-bold border border-blue-500/30">
                  HA
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Bạn</span>
              </div>
              <span className="text-[10px] font-black text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-md">VS</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">MinhDuc</span>
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold border border-amber-500/30">
                  MD
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Dictation & IPA (Row 2 - Col 2) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-6 shadow-2xs flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-200 dark:border-purple-800 shrink-0 shadow-2xs">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="font-display font-black text-slate-900 dark:text-white text-base sm:text-lg leading-snug">
                  Nghe Chính Tả & <span className="text-purple-600 dark:text-purple-400">Phát Âm IPA</span>
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Luyện nghe chép chính tả Dictation chuyên sâu & chuẩn hóa phát âm giọng bản ngữ chính xác.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-neutral-950 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Dictation Mode</span>
              </div>
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-2.5 py-1 rounded-md border border-purple-200 dark:border-purple-800">Phản xạ</span>
            </div>
          </motion.div>

          {/* Card 5: Bảng Xếp Hạng & XP (Row 2 - Col 3) */}
          <motion.div
            id="leaderboard"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-6 shadow-2xs flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 shrink-0 shadow-2xs">
                  <Trophy className="w-5 h-5" />
                </div>
                <h3 className="font-display font-black text-slate-900 dark:text-white text-base sm:text-lg leading-snug">
                  Bảng Xếp Hạng & <span className="text-emerald-600 dark:text-emerald-400">Thăng Cấp XP</span>
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Tích lũy kinh nghiệm XP qua mỗi bài học, thăng hạng bảng vinh danh tuần & giữ ngọn lửa Streak.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-neutral-950 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center shadow-2xs">1</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">HoangAnh</span>
              </div>
              <span className="text-xs font-bold text-amber-500 flex items-center gap-1 font-mono">
                <Flame className="w-4 h-4 fill-amber-500" /> 2,450 XP
              </span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 3: SPOTLIGHT AI TUTOR 1-1 DEMO */}
      <section id="ai-tutor" className="py-10 md:py-16 px-4 md:px-6 max-w-7xl mx-auto w-full z-10">
        <div className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between gap-6 items-center">
          <div className="max-w-md text-left space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-200 dark:border-purple-800 shrink-0 shadow-2xs">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-display font-black text-slate-900 dark:text-white text-lg sm:text-2xl leading-snug">
                Gia Sư Trợ Lý <span className="text-[#0059bb] dark:text-sky-400">AI 24/7</span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Trò chuyện phản xạ 1-1 trực tiếp cùng <strong className="text-[#0059bb] dark:text-sky-400 font-bold">trợ lý AI bản ngữ</strong>.
              Phân tích ngữ cảnh, phát hiện lỗi sai & <strong className="text-emerald-600 dark:text-emerald-400 font-bold">cộng thưởng XP lập tức</strong>.
            </p>
          </div>

          <div className="w-full md:max-w-md bg-slate-50 dark:bg-neutral-950 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex gap-2.5">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold shrink-0">🤖</div>
              <div className="bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-slate-800 px-4 py-2.5 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-semibold shadow-2xs">
                How would you describe your perfect vacation? ✈️
              </div>
            </div>
            <div className="flex gap-2.5 justify-end">
              <div className="bg-blue-50 dark:bg-blue-950/40 border border-[#0059bb]/30 px-4 py-2.5 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-semibold shadow-2xs">
                I have a strong <span className="text-amber-500 font-bold underline">wanderlust</span>, so I love exploring!
              </div>
              <div className="w-8 h-8 rounded-full bg-[#0059bb]/20 text-[#0059bb] dark:text-sky-400 flex items-center justify-center text-xs font-bold shrink-0">HA</div>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-[#0c0c0f] border border-emerald-500/40 px-3.5 py-2.5 rounded-xl">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Cấu trúc tốt! Dùng từ chính xác. <span className="text-emerald-600 dark:text-emerald-400 font-black">+15 XP</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: ANALYTICS & SRS CALENDAR PREVIEW */}
      <section className="py-8 md:py-12 px-4 md:px-6 max-w-7xl mx-auto w-full z-10">
        <div className="rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 dark:border-slate-800 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-left space-y-1.5">
            <span className="text-[10px] sm:text-xs font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-lg inline-block shadow-2xs">
              BÁO CÁO THÔNG MINH
            </span>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-display font-black text-slate-900 dark:text-white leading-snug">
              Theo Dõi Tiến Độ &{" "}
              <span className="text-emerald-600 dark:text-emerald-400">Bản Đồ Nhiệt Ghi Nhớ</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              Thống kê chỉ số thuộc bài, đếm số từ đã ôn tập & lập lịch nhắc nhớ <strong className="text-[#0059bb] dark:text-sky-400 font-bold">Spaced Repetition</strong> cá nhân hóa mỗi ngày.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            {user ? (
              <Link href="/dashboard" className="w-full sm:w-auto block">
                <button className="w-full sm:w-auto h-11 bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs sm:text-sm px-6 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer">
                  <span>Xem Báo Cáo Của Bạn</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            ) : (
              <Link href="/register" className="w-full sm:w-auto block">
                <button className="w-full sm:w-auto h-11 bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs sm:text-sm px-6 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer">
                  <span>Trải Nghiệm Ngay Miễn Phí</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS */}
      <section id="testimonials" className="py-12 md:py-16 lg:py-24 bg-slate-100/60 dark:bg-[#08080b] border-y border-slate-200/90 dark:border-slate-800 px-4 md:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Testimonials Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <div className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 rounded-lg px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
              <span>ĐÁNH GIÁ TỪ HỌC VIÊN</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Học Viên Nói Gì Về <span className="text-[#0059bb] dark:text-sky-400">XP English?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {/* Review 1 */}
            <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-6 shadow-2xs flex flex-col justify-between gap-4">
              <div>
                <div className="flex gap-1 text-amber-400 text-sm mb-2.5">★ ★ ★ ★ ★</div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  &quot;Nhờ lộ trình Spaced Repetition của XP Voca, mình đã tăng vốn từ vượt bậc và đạt IELTS 7.5 thành công.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-xs font-black text-[#0059bb] dark:text-sky-400">HA</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Hoàng Anh</h4>
                  <span className="text-[11px] text-slate-400 font-semibold">IELTS Candidate (7.5 Overall)</span>
                </div>
              </div>
            </motion.div>

            {/* Review 2 */}
            <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-6 shadow-2xs flex flex-col justify-between gap-4">
              <div>
                <div className="flex gap-1 text-amber-400 text-sm mb-2.5">★ ★ ★ ★ ★</div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  &quot;Giao diện tối giản, tập trung. Bài viết chính tả Dictation cải thiện rất nhanh phản xạ nghe của mình.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-xs font-black text-amber-600 dark:text-amber-400">MĐ</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Minh Đức</h4>
                  <span className="text-[11px] text-slate-400 font-semibold">Software Engineer</span>
                </div>
              </div>
            </motion.div>

            {/* Review 3 */}
            <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-6 shadow-2xs flex flex-col justify-between gap-4">
              <div>
                <div className="flex gap-1 text-amber-400 text-sm mb-2.5">★ ★ ★ ★ ★</div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  &quot;Học từ vựng không còn nhàm chán nhờ Spaced Repetition và các mini game thi đua PvP hào hứng mỗi tối.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-xs font-black text-purple-600 dark:text-purple-400">MT</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Minh Thư</h4>
                  <span className="text-[11px] text-slate-400 font-semibold">English Teacher</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6: BOTTOM CTA BANNER */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 max-w-7xl mx-auto w-full z-10 text-center">
        <div className="rounded-2xl bg-gradient-to-br from-[#0059bb] via-[#004799] to-[#002855] text-white py-12 md:py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-4 md:gap-5 relative overflow-hidden shadow-xl border border-blue-400/20">
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

          {/* Premium Pill Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-amber-300 shadow-xs relative z-10">
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>BẮT ĐẦU HỌC MIỄN PHÍ NGAY</span>
          </div>

          {/* High Contrast Bold Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight max-w-4xl leading-snug sm:leading-tight text-white relative z-10">
            <span>
              Sẵn Sàng{" "}
              <span className="text-amber-300 font-black drop-shadow-xs">
                Bứt Phá Từ Vựng
              </span>
              {" "}Cùng{" "}
              <span className="text-emerald-300 font-black drop-shadow-xs">
                XP English?
              </span>
            </span>
          </h2>

          {/* High-legibility Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-blue-100/90 font-medium max-w-lg leading-relaxed relative z-10">
            Gia nhập cộng đồng hơn 15,000+ học viên thông minh ngay hôm nay.
            Bắt đầu hành trình chinh phục tiếng Anh hoàn toàn miễn phí!
          </p>

          {/* Glowing CTA Button */}
          <div className="mt-2 relative z-10">
            {user ? (
              <Link href="/dashboard">
                <button className="h-12 bg-white text-[#0059bb] hover:bg-amber-300 hover:text-slate-900 font-black text-xs md:text-sm px-8 md:px-10 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer">
                  <span>Vào Dashboard Ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            ) : (
              <Link href="/register">
                <button className="h-12 bg-white text-[#0059bb] hover:bg-amber-300 hover:text-slate-900 font-black text-xs md:text-sm px-8 md:px-10 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer">
                  <span>Đăng Ký Học Miễn Phí</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full mt-auto bg-white dark:bg-[#040406] border-t border-slate-200/90 dark:border-slate-800 py-8 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] z-10">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 leading-none">
                <span className="text-[#0059bb] dark:text-sky-400">XP</span> English
                <span className="text-amber-500 font-normal">|</span>
                <span className="text-amber-500">XP Voca</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Nền tảng học từ vựng tiếng Anh thông minh thế hệ mới.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 text-xs font-bold">
            <Link href="/vocabulary" className="text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 transition-colors">
              Kho từ vựng
            </Link>
            <Link href="/roadmap" className="text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 transition-colors">
              Lộ trình AI
            </Link>
            <Link href="/community" className="text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 transition-colors">
              Cộng đồng
            </Link>
            <a href="mailto:support@xpenglish.com" className="text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 transition-colors">
              Liên hệ hỗ trợ
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center md:text-left">
          <span className="text-xs text-slate-400 font-medium">
            © 2026 XP English / XP Voca. Đã bảo lưu mọi quyền.
          </span>
        </div>
      </footer>
    </main>
  );
}
