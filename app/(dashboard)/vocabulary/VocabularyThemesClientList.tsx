"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import {
  Search,
  BookOpen,
  GraduationCap,
  Briefcase,
  Plane,
  ArrowUpRight,
  Sparkles,
  Clock,
  Target,
  FileText,
  Layers,
  Users,
  Home,
  Utensils,
  Shirt,
  CloudSun,
  Car,
  Dog,
  Palette,
  Activity,
  Calculator,
  Package,
  Apple,
  Coffee,
  Trophy,
  Gamepad2,
  Stethoscope,
  Building2,
  Cpu,
  TreePine,
  Brain,
  Globe,
  MessageSquare,
  ShoppingBag,
  Mail,
  Landmark,
  Bus,
  ShieldCheck,
  Coins,
  Scale,
  Award,
  BookMarked,
  Compass,
  CheckCircle2,
  Flame,
  X,
} from "lucide-react";
import { BASIC_VOCABULARY_THEMES } from "@/features/vocabulary/data/basicVocabularies";
import { ADVANCED_VOCABULARY_THEMES } from "@/features/vocabulary/data/advancedVocabularies";

export interface ClientTheme {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  totalVocabs: number;
  difficulty: number;
}

export function getSemanticThemeIcon(theme: { id: string; name: string; nameEn?: string }) {
  const text = `${theme.name} ${theme.nameEn || ""}`.toLowerCase();

  if (text.includes("cntt") || text.includes("ai") || text.includes("lập trình") || text.includes("it")) {
    return <Cpu className="w-5 h-5 text-sky-500" />;
  }
  if (text.includes("y tế") || text.includes("healthcare") || text.includes("bệnh") || text.includes("dược")) {
    return <Stethoscope className="w-5 h-5 text-rose-500" />;
  }
  if (text.includes("tài chính") || text.includes("finance") || text.includes("ngân hàng") || text.includes("tiền")) {
    return <Coins className="w-5 h-5 text-emerald-600" />;
  }
  if (text.includes("luật") || text.includes("law") || text.includes("pháp") || text.includes("tư pháp")) {
    return <Scale className="w-5 h-5 text-indigo-600" />;
  }
  if (text.includes("môi trường") || text.includes("environment") || text.includes("sinh thái") || text.includes("rừng")) {
    return <TreePine className="w-5 h-5 text-emerald-600" />;
  }
  if (text.includes("marketing") || text.includes("quảng cáo") || text.includes("truyền thông")) {
    return <MessageSquare className="w-5 h-5 text-amber-500" />;
  }
  if (text.includes("du lịch") || text.includes("travel") || text.includes("hàng không") || text.includes("sân bay")) {
    return <Plane className="w-5 h-5 text-cyan-500" />;
  }
  if (text.includes("khoa học") || text.includes("science") || text.includes("vũ trụ") || text.includes("nghiên cứu")) {
    return <Brain className="w-5 h-5 text-purple-600" />;
  }
  if (text.includes("nghệ thuật") || text.includes("art") || text.includes("thiết kế") || text.includes("màu sắc")) {
    return <Palette className="w-5 h-5 text-pink-500" />;
  }
  if (text.includes("thể thao") || text.includes("sports") || text.includes("thi đấu") || text.includes("bóng")) {
    return <Trophy className="w-5 h-5 text-orange-500" />;
  }
  if (text.includes("gia đình") || text.includes("family") || text.includes("con người") || text.includes("bạn bè") || text.includes("quan hệ")) {
    return <Users className="w-5 h-5 text-blue-500" />;
  }
  if (text.includes("nhà") || text.includes("house") || text.includes("home") || text.includes("nội thất") || text.includes("phòng")) {
    return <Home className="w-5 h-5 text-emerald-600" />;
  }
  if (text.includes("thực phẩm") || text.includes("food") || text.includes("ăn uống") || text.includes("ẩm thực") || text.includes("bánh")) {
    return <Utensils className="w-5 h-5 text-rose-500" />;
  }
  if (text.includes("hoa quả") || text.includes("fruit") || text.includes("trái cây") || text.includes("cây cối")) {
    return <Apple className="w-5 h-5 text-pink-600" />;
  }
  if (text.includes("đồ uống") || text.includes("drink") || text.includes("cà phê") || text.includes("trà")) {
    return <Coffee className="w-5 h-5 text-amber-700" />;
  }
  if (text.includes("nghề") || text.includes("occupation") || text.includes("công việc") || text.includes("work") || text.includes("văn phòng") || text.includes("kinh doanh")) {
    return <Briefcase className="w-5 h-5 text-amber-500" />;
  }
  if (text.includes("trường") || text.includes("school") || text.includes("giáo dục") || text.includes("education") || text.includes("học tập")) {
    return <GraduationCap className="w-5 h-5 text-indigo-500" />;
  }
  if (text.includes("quần áo") || text.includes("clothing") || text.includes("thời trang") || text.includes("trang phục") || text.includes("phụ kiện")) {
    return <Shirt className="w-5 h-5 text-pink-500" />;
  }
  if (text.includes("thời tiết") || text.includes("weather") || text.includes("khí hậu") || text.includes("thiên tai")) {
    return <CloudSun className="w-5 h-5 text-sky-400" />;
  }
  if (text.includes("phương tiện") || text.includes("transport") || text.includes("giao thông") || text.includes("xe") || text.includes("car")) {
    return <Car className="w-5 h-5 text-purple-500" />;
  }
  if (text.includes("xe buýt") || text.includes("bus") || text.includes("nhà ga")) {
    return <Bus className="w-5 h-5 text-amber-600" />;
  }
  if (text.includes("động vật") || text.includes("animal") || text.includes("thú") || text.includes("sinh vật") || text.includes("côn trùng")) {
    return <Dog className="w-5 h-5 text-teal-500" />;
  }
  if (text.includes("thời gian") || text.includes("time") || text.includes("lịch") || text.includes("giờ")) {
    return <Clock className="w-5 h-5 text-rose-500" />;
  }
  if (text.includes("cơ thể") || text.includes("body") || text.includes("cảm giác") || text.includes("vận động")) {
    return <Activity className="w-5 h-5 text-emerald-500" />;
  }
  if (text.includes("số") || text.includes("number") || text.includes("đo lường") || text.includes("hình học")) {
    return <Calculator className="w-5 h-5 text-blue-600" />;
  }
  if (text.includes("an toàn") || text.includes("safety") || text.includes("cảnh báo") || text.includes("luật lệ")) {
    return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
  }

  const POOL = [
    <BookMarked key="b1" className="w-5 h-5 text-[#0059bb]" />,
    <Sparkles key="b2" className="w-5 h-5 text-purple-500" />,
    <Compass key="b3" className="w-5 h-5 text-amber-500" />,
    <Award key="b4" className="w-5 h-5 text-emerald-500" />,
    <Target key="b5" className="w-5 h-5 text-rose-500" />,
    <Layers key="b7" className="w-5 h-5 text-indigo-500" />,
  ];

  const sum = theme.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return POOL[sum % POOL.length];
}

export default function VocabularyThemesClientList({
  initialBasicThemes,
  initialAdvancedThemes,
}: {
  initialBasicThemes?: ClientTheme[];
  initialAdvancedThemes?: ClientTheme[];
  initialThemes?: ClientTheme[];
}) {
  // Vocabulary Level Mode: "basic" (A1-A2) or "advanced" (B1-C2)
  const [levelMode, setLevelMode] = useState<"basic" | "advanced">("basic");
  const [search, setSearch] = useState("");
  const [displayedCount, setDisplayedCount] = useState(16);

  // Source 1: Basic themes (A1-A2)
  const basicThemesList: ClientTheme[] = useMemo(() => {
    if (initialBasicThemes && initialBasicThemes.length > 0) return initialBasicThemes;
    return BASIC_VOCABULARY_THEMES.map((t) => ({
      id: t.id,
      name: t.name,
      nameEn: t.nameEn,
      icon: t.icon,
      totalVocabs: t.totalVocabs || 20,
      difficulty: t.difficulty,
    }));
  }, [initialBasicThemes]);

  // Source 2: Advanced themes (B1-C2)
  const advancedThemesList: ClientTheme[] = useMemo(() => {
    if (initialAdvancedThemes && initialAdvancedThemes.length > 0) return initialAdvancedThemes;
    return ADVANCED_VOCABULARY_THEMES.map((t) => ({
      id: t.id,
      name: t.name,
      nameEn: t.nameEn,
      icon: t.icon,
      totalVocabs: t.totalVocabs || 35,
      difficulty: t.difficulty,
    }));
  }, [initialAdvancedThemes]);

  // Active themes pool based on selected level
  const currentThemesPool = useMemo(() => {
    return levelMode === "basic" ? basicThemesList : advancedThemesList;
  }, [levelMode, basicThemesList, advancedThemesList]);

  const handleLevelChange = (mode: "basic" | "advanced") => {
    setLevelMode(mode);
    setDisplayedCount(16);
    setSearch("");
  };

  const loadMoreThemes = () => {
    setDisplayedCount((prev) => prev + 12);
  };

  const filteredThemes = useMemo(() => {
    let list = currentThemesPool;
    if (search.trim()) {
      const q = search.toLowerCase();
      return list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.nameEn.toLowerCase().includes(q)
      );
    }
    return list.slice(0, displayedCount);
  }, [search, displayedCount, currentThemesPool]);

  return (
    <PageEntranceWrapper className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans">
      
      {/* 0. BRAND TOP HEADER (Unified 56px Baseline with Pill Actions) */}
      <AppTopHeader
        rightDesktopContent={
          <Link
            href="/study/practice"
            className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer font-display active:scale-95 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-200 fill-sky-200/40" />
            <span>Luyện Trí Nhớ Flashcards</span>
          </Link>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active={levelMode === "basic"}
            onClick={() => handleLevelChange("basic")}
            icon={<BookOpen className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
            label="60 Chủ Đề Cơ Bản"
          />
          <HeaderPillItem
            active={levelMode === "advanced"}
            onClick={() => handleLevelChange("advanced")}
            icon={<GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
            label="155 Chủ Đề Nâng Cao"
          />
          <HeaderPillItem
            href="/study/practice"
            icon={<BookOpen className="w-3.5 h-3.5 text-emerald-500" />}
            label="Luyện từ vựng"
            hideOnSmall
          />
          <HeaderPillItem
            href="/study/exam-prep"
            icon={<FileText className="w-3.5 h-3.5 text-rose-500" />}
            label="Thi thử đề"
            hideOnMedium
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        
        {/* 1. HERO STUDIO TOOLBAR & LEVEL SELECTOR */}
        <MotionItem>
          <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden space-y-4">
            {/* Top ambient blue accent glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#0059bb]/60 to-transparent" />

            {/* Top Bar Header & Search */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 min-w-0">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-[#0059bb] dark:text-sky-400 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-2xs">
                  {levelMode === "basic" ? (
                    <BookOpen className="w-6 h-6 stroke-[2]" />
                  ) : (
                    <GraduationCap className="w-6 h-6 stroke-[2]" />
                  )}
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Kho Từ Vựng Tiếng Anh Thông Minh
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium truncate mt-1">
                    {levelMode === "basic"
                      ? "60 Chủ đề từ vựng giao tiếp hàng ngày chuẩn phiên âm IPA & ví dụ song ngữ."
                      : "155 Chủ đề học thuật, TOEIC, IELTS & chuyên ngành kèm phương pháp Spaced Repetition."}
                  </p>
                </div>
              </div>

              {/* Search Input Dock */}
              <div className="relative w-full lg:w-80 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={
                    levelMode === "basic"
                      ? "Tìm trong 60 chủ đề cơ bản..."
                      : "Tìm trong 155 chủ đề nâng cao..."
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-10 pl-10 pr-8 text-sm font-medium rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0059bb]/20 focus:border-[#0059bb] transition-all shadow-2xs"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </MotionItem>

        {/* 2. TOP BENTO STATS BAR (4 DOUBLE-BEZEL METRIC CARDS - CLEAN, BALANCED & NO TEXT WRAP) */}
        <MotionItem>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                title: "Bộ Chủ Đề",
                value: levelMode === "basic" ? `${basicThemesList.length} Chủ Đề` : `${advancedThemesList.length} Chủ Đề`,
                icon: Layers,
                color: "text-[#0059bb] dark:text-sky-400",
                bg: "bg-blue-500/10",
                borderColor: "border-blue-500/20",
              },
              {
                title: "Kho Từ Vựng",
                value: levelMode === "basic" ? "1.248+ Từ" : "8.900+ Từ",
                icon: BookMarked,
                color: "text-emerald-600 dark:text-emerald-400",
                bg: "bg-emerald-500/10",
                borderColor: "border-emerald-500/20",
              },
              {
                title: "Mục Tiêu Học",
                value: levelMode === "basic" ? "10 Từ / Ngày" : "15 Từ / Ngày",
                icon: Clock,
                color: "text-amber-600 dark:text-amber-400",
                bg: "bg-amber-500/10",
                borderColor: "border-amber-500/20",
              },
              {
                title: "Trí Nhớ SRS",
                value: "86% Ghi Nhớ",
                icon: Sparkles,
                color: "text-purple-600 dark:text-purple-400",
                bg: "bg-purple-500/10",
                borderColor: "border-purple-500/20",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between min-h-[92px] group"
                >
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs sm:text-[13px] font-bold">
                    <span>{item.title}</span>
                    <div className={`w-8 h-8 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2.5">
                    <span className={`text-xl sm:text-2xl font-black font-display tracking-tight ${item.color} whitespace-nowrap truncate block`}>
                      {item.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </MotionItem>

        {/* 3. MAIN BENTO THEMES GRID */}
        {filteredThemes.length === 0 ? (
          <MotionItem className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-base font-bold text-slate-900 dark:text-white font-display">
              Không tìm thấy chủ đề nào phù hợp với từ khóa &ldquo;{search}&rdquo;
            </p>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              {levelMode === "basic"
                ? "Hãy thử tìm các chủ đề quen thuộc: Chào hỏi, Gia đình, Số đếm, Động vật, Mua sắm, Ăn uống..."
                : "Hãy thử tìm các chủ đề nâng cao: CNTT & AI, Y tế, Tài chính, Pháp luật, Marketing, Khoa học..."}
            </p>
            <button
              type="button"
              onClick={() => setSearch("")}
              className="h-10 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer active:scale-95 inline-flex items-center gap-1.5 mt-2"
            >
              <X className="w-4 h-4" />
              <span>Xóa Từ Khóa Tìm Kiếm</span>
            </button>
          </MotionItem>
        ) : (
          <MotionItem className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
            {filteredThemes.map((t) => {
              const percentage = Math.min(100, 25 + (t.difficulty || 1) * 15);
              return (
                <Link key={t.id} href={`/vocabulary/${t.id}`} className="group block min-w-0">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-[#0059bb]/50 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-3.5 h-full cursor-pointer relative overflow-hidden">
                    
                    {/* Card Header: Icon + Title + Trailing Arrow */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                          {getSemanticThemeIcon(t)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white font-display truncate group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors">
                            {t.name}
                          </h3>
                          <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {t.nameEn ? `${t.nameEn} • ` : ""}{t.totalVocabs} từ
                          </p>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-[#0059bb] group-hover:text-white dark:group-hover:bg-[#0059bb] dark:group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-2xs">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Card Footer: Clean Level Pill & Progress Percentage */}
                    <div className="space-y-2 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                          {t.difficulty === 1 ? "A1 - A2" : t.difficulty === 2 ? "B1 - B2" : "C1 - C2"}
                        </span>

                        <span className="text-[#0059bb] dark:text-sky-400 font-mono font-black">
                          {percentage}%
                        </span>
                      </div>

                      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#0059bb] to-sky-500 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                  </div>
                </Link>
              );
            })}
          </MotionItem>
        )}

        {/* Load More Button Aligned to Right Corner */}
        {search === "" && (
          <MotionItem className="pt-4 pb-4 flex justify-center sm:justify-end">
            {displayedCount < currentThemesPool.length ? (
              <button
                type="button"
                onClick={loadMoreThemes}
                className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/50 text-slate-900 dark:text-white hover:text-[#0059bb] dark:hover:text-sky-400 font-display text-sm font-bold shadow-sm hover:shadow-md transition-all duration-300 inline-flex items-center justify-center gap-2.5 sm:gap-3 group active:scale-[0.98] cursor-pointer"
              >
                <div className="w-7 h-7 rounded-xl bg-blue-500/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>Xem Thêm Chủ Đề</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-mono font-bold group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors">
                  +{currentThemesPool.length - displayedCount}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold font-display shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Đã hiển thị trọn bộ {currentThemesPool.length} chủ đề</span>
              </div>
            )}
          </MotionItem>
        )}

      </div>

    </PageEntranceWrapper>
  );
}
