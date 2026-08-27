"use client";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PageEntranceWrapper, MotionItem } from "@/components/shared/PageEntranceAnimation";
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
  Zap,
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
} from "lucide-react";
import { BASIC_VOCABULARY_THEMES } from "@/lib/data/basicVocabularies";
import { ADVANCED_VOCABULARY_THEMES } from "@/lib/data/advancedVocabularies";

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
    return <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />;
  }
  if (text.includes("y tế") || text.includes("healthcare") || text.includes("bệnh") || text.includes("dược")) {
    return <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />;
  }
  if (text.includes("tài chính") || text.includes("finance") || text.includes("ngân hàng") || text.includes("tiền")) {
    return <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />;
  }
  if (text.includes("luật") || text.includes("law") || text.includes("pháp") || text.includes("tư pháp")) {
    return <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />;
  }
  if (text.includes("môi trường") || text.includes("environment") || text.includes("sinh thái") || text.includes("rừng")) {
    return <TreePine className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />;
  }
  if (text.includes("marketing") || text.includes("quảng cáo") || text.includes("truyền thông")) {
    return <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />;
  }
  if (text.includes("du lịch") || text.includes("travel") || text.includes("hàng không") || text.includes("sân bay")) {
    return <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />;
  }
  if (text.includes("khoa học") || text.includes("science") || text.includes("vũ trụ") || text.includes("nghiên cứu")) {
    return <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />;
  }
  if (text.includes("nghệ thuật") || text.includes("art") || text.includes("thiết kế") || text.includes("màu sắc")) {
    return <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />;
  }
  if (text.includes("thể thao") || text.includes("sports") || text.includes("thi đấu") || text.includes("bóng")) {
    return <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />;
  }
  if (text.includes("gia đình") || text.includes("family") || text.includes("con người") || text.includes("bạn bè") || text.includes("quan hệ")) {
    return <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
  }
  if (text.includes("nhà") || text.includes("house") || text.includes("home") || text.includes("nội thất") || text.includes("phòng")) {
    return <Home className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />;
  }
  if (text.includes("thực phẩm") || text.includes("food") || text.includes("ăn uống") || text.includes("ẩm thực") || text.includes("bánh")) {
    return <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
  }
  if (text.includes("hoa quả") || text.includes("fruit") || text.includes("trái cây") || text.includes("cây cối")) {
    return <Apple className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />;
  }
  if (text.includes("đồ uống") || text.includes("drink") || text.includes("cà phê") || text.includes("trà")) {
    return <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />;
  }
  if (text.includes("nghề") || text.includes("occupation") || text.includes("công việc") || text.includes("work") || text.includes("văn phòng") || text.includes("kinh doanh")) {
    return <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />;
  }
  if (text.includes("trường") || text.includes("school") || text.includes("giáo dục") || text.includes("education") || text.includes("học tập")) {
    return <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />;
  }
  if (text.includes("quần áo") || text.includes("clothing") || text.includes("thời trang") || text.includes("trang phục") || text.includes("phụ kiện")) {
    return <Shirt className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />;
  }
  if (text.includes("thời tiết") || text.includes("weather") || text.includes("khí hậu") || text.includes("thiên tai")) {
    return <CloudSun className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />;
  }
  if (text.includes("phương tiện") || text.includes("transport") || text.includes("giao thông") || text.includes("xe") || text.includes("car")) {
    return <Car className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />;
  }
  if (text.includes("xe buýt") || text.includes("bus") || text.includes("nhà ga")) {
    return <Bus className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />;
  }
  if (text.includes("động vật") || text.includes("animal") || text.includes("thú") || text.includes("sinh vật") || text.includes("côn trùng")) {
    return <Dog className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />;
  }
  if (text.includes("thời gian") || text.includes("time") || text.includes("lịch") || text.includes("giờ")) {
    return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />;
  }
  if (text.includes("cơ thể") || text.includes("body") || text.includes("cảm giác") || text.includes("vận động")) {
    return <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />;
  }
  if (text.includes("số") || text.includes("number") || text.includes("đo lường") || text.includes("hình học")) {
    return <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
  }
  if (text.includes("an toàn") || text.includes("safety") || text.includes("cảnh báo") || text.includes("luật lệ")) {
    return <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />;
  }

  const POOL = [
    <BookMarked key="b1" className="w-4 h-4 sm:w-5 sm:h-5 text-[#1d6ee6]" />,
    <Sparkles key="b2" className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />,
    <Compass key="b3" className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />,
    <Award key="b4" className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />,
    <Target key="b5" className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />,
    <Zap key="b6" className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />,
    <Layers key="b7" className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />,
  ];

  const sum = theme.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return POOL[sum % POOL.length];
}

// O(K) Fisher-Yates sampling algorithm for fast random sampling
function getRandomSample<T>(arr: T[], limit: number): T[] {
  const len = arr.length;
  if (len <= limit) return arr;
  const result: T[] = [];
  const used = new Set<number>();
  while (result.length < limit && used.size < len) {
    const idx = Math.floor(Math.random() * len);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
}

export default function VocabularyThemesClientList({
  initialBasicThemes,
  initialAdvancedThemes,
  initialThemes,
}: {
  initialBasicThemes?: ClientTheme[];
  initialAdvancedThemes?: ClientTheme[];
  initialThemes?: ClientTheme[];
}) {
  // Vocabulary Level Mode: "basic" (A1-A2, file 1) or "advanced" (B1-C2, file 2)
  const [levelMode, setLevelMode] = useState<"basic" | "advanced">("basic");
  const [search, setSearch] = useState("");

  // Source 1: Basic themes from lib/data/basicVocabularies.ts
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

  // Source 2: Advanced themes from lib/data/advancedVocabularies.ts
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

  // Active themes based on selected mode
  const currentThemesPool = useMemo(() => {
    return levelMode === "basic" ? basicThemesList : advancedThemesList;
  }, [levelMode, basicThemesList, advancedThemesList]);

  // Displayed theme IDs for progressive pagination (Default initial: 12 themes)
  const [displayedIds, setDisplayedIds] = useState<string[]>(() => {
    return basicThemesList.slice(0, 12).map((t) => t.id);
  });

  // Reset pagination when levelMode changes (Always 12 initial themes)
  useEffect(() => {
    const initialLimit = 12;
    setDisplayedIds(getRandomSample(currentThemesPool, initialLimit).map((t) => t.id));
    setSearch("");
  }, [levelMode, currentThemesPool]);

  const loadMoreThemes = () => {
    const remaining = currentThemesPool.filter((t) => !displayedIds.includes(t.id));
    if (remaining.length > 0) {
      const nextBatch = getRandomSample(remaining, 4).map((t) => t.id);
      setDisplayedIds((prev) => [...prev, ...nextBatch]);
    }
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
    return displayedIds
      .map((id) => currentThemesPool.find((t) => t.id === id))
      .filter((t): t is ClientTheme => !!t);
  }, [search, displayedIds, currentThemesPool]);

  const totalVocabsCount = useMemo(() => {
    if (levelMode === "basic") {
      return 1248;
    }
    return 8900;
  }, [levelMode]);

  const renderIcon = (theme: ClientTheme) => {
    return getSemanticThemeIcon(theme);
  };

  return (
    <PageEntranceWrapper className="space-y-2.5 sm:space-y-3.5 pb-16 md:pb-6 px-1 md:px-0 select-none font-sans">
      
      {/* 1. TOP DUAL-LEVEL SELECTOR & SEARCH TOOLBAR */}
      <MotionItem>
        <div className="p-3 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
          
          {/* Top Bar Header & Search */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 sm:gap-3 min-w-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 sm:p-2 rounded-xs bg-[#1d6ee6]/10 text-[#1d6ee6] shrink-0">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display truncate">
                    Kho Từ Vựng Tiếng Anh
                  </h1>
                  <span className="px-1.5 sm:px-2 py-0.5 rounded-xs text-[9px] sm:text-[10px] font-extrabold bg-[#1d6ee6]/10 text-[#1d6ee6] shrink-0">
                    {levelMode === "basic" ? "A1 - A2 Cơ bản" : "B1 - C2 Nâng cao"}
                  </span>
                </div>
                <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                  {levelMode === "basic"
                    ? "60 Chủ đề từ vựng cơ bản hàng ngày (1.248+ từ) chuẩn IPA & ví dụ song ngữ."
                    : "155 Chủ đề nâng cao, học thuật, TOEIC, IELTS & chuyên ngành (8.900+ từ)."}
                </p>
              </div>
            </div>

            {/* Search Input Dock */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={levelMode === "basic" ? "Tìm 60 chủ đề cơ bản..." : "Tìm 155 chủ đề nâng cao..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-8 sm:h-9 pl-8 pr-3 text-xs font-medium rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#1d6ee6] transition-colors"
              />
            </div>
          </div>

          {/* 2 DISTINCT LEVEL SWITCHER BUTTONS (NÚT 1: CƠ BẢN - NÚT 2: NÂNG CAO) */}
          <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 p-1 rounded-xs bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 w-full sm:w-auto">
              
              {/* NÚT 1: TỪ VỰNG CƠ BẢN */}
              <button
                type="button"
                onClick={() => setLevelMode("basic")}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xs text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
                  levelMode === "basic"
                    ? "bg-[#1d6ee6] text-white shadow-2xs font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-900 font-medium"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>Từ vựng cơ bản</span>
              </button>

              {/* NÚT 2: TỪ VỰNG NÂNG CAO */}
              <button
                type="button"
                onClick={() => setLevelMode("advanced")}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xs text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
                  levelMode === "advanced"
                    ? "bg-[#1d6ee6] text-white shadow-2xs font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-900 font-medium"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span>Từ vựng nâng cao</span>
              </button>
            </div>

            {/* Sub-counter tag */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                {levelMode === "basic" ? "60 chủ đề cơ bản" : "155 chủ đề nâng cao"}
              </span>
              <span>•</span>
              <span>{levelMode === "basic" ? "1.248+ từ vựng" : "8.900+ từ vựng"}</span>
            </div>
          </div>

        </div>
      </MotionItem>

      {/* 2. TOP BENTO STATS BAR (4-COLUMN CARDS) */}
      <MotionItem>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3.5">
          {[
            {
              title: levelMode === "basic" ? "Chủ đề cơ bản" : "Chủ đề nâng cao",
              value: levelMode === "basic" ? `${basicThemesList.length} Bộ cơ bản` : `${advancedThemesList.length} Bộ nâng cao`,
              subtitle: levelMode === "basic" ? "A1 - A2 Nền tảng" : "B1 - C2 Học thuật",
              icon: Layers,
              color: "text-[#1d6ee6]",
              bg: "bg-[#1d6ee6]/10",
            },
            {
              title: "Mục tiêu bài học",
              value: levelMode === "basic" ? "10 từ/ngày" : "15 từ/ngày",
              subtitle: "Nhịp độ khuyến nghị",
              icon: Target,
              color: "text-purple-500",
              bg: "bg-purple-500/10",
            },
            {
              title: "Thời gian mỗi bài",
              value: levelMode === "basic" ? "6 phút/buổi" : "10 phút/buổi",
              subtitle: "Ghi nhớ nhanh chóng",
              icon: Clock,
              color: "text-amber-500",
              bg: "bg-amber-500/10",
            },
            {
              title: "Chuẩn học tập",
              value: levelMode === "basic" ? "100% IPA & Ví dụ" : "86% SRS Memory",
              subtitle: levelMode === "basic" ? "Song ngữ chi tiết" : "Thuật toán ngắt quãng",
              icon: Zap,
              color: "text-emerald-500",
              bg: "bg-emerald-500/10",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-2 sm:p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-2 sm:gap-3 min-w-0"
              >
                <div className={`p-1.5 sm:p-2 rounded-xs ${item.bg} ${item.color} shrink-0`}>
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block truncate">
                    {item.title}
                  </span>
                  <p className="text-[11px] sm:text-xs font-black text-slate-900 dark:text-white font-display truncate whitespace-nowrap">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </MotionItem>

      {/* 3. MAIN BENTO THEMES GRID */}
      {filteredThemes.length === 0 ? (
        <MotionItem className="p-6 sm:p-8 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs text-center space-y-1.5">
          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
            Không tìm thấy chủ đề nào phù hợp với từ khóa &ldquo;{search}&rdquo;
          </p>
          <p className="text-[11px] sm:text-xs font-medium text-slate-400">
            {levelMode === "basic"
              ? "Hãy thử tìm các chủ đề cơ bản như: Chào hỏi, Gia đình, Số đếm, Động vật, Ăn uống..."
              : "Hãy thử tìm các chủ đề nâng cao như: CNTT, AI, Y tế, Tài chính, Luật pháp, Marketing..."}
          </p>
        </MotionItem>
      ) : (
        <MotionItem className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3.5">
          {filteredThemes.map((t) => {
            const percentage = Math.min(100, 20 + (t.difficulty || 1) * 12);
            return (
              <Link key={t.id} href={`/vocabulary/${t.id}`} className="group block min-w-0">
                <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs hover:shadow-xs hover:border-[#1d6ee6]/50 transition-all flex flex-col justify-between space-y-2 sm:space-y-3 h-full cursor-pointer">
                  
                  {/* Card Header: Icon + Title inline row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1.5 sm:p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 shrink-0">
                        {renderIcon(t)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate group-hover:text-[#1d6ee6] transition-colors">
                          {t.name}
                        </h3>
                        <p className="text-[10px] sm:text-xs font-medium text-slate-400 truncate">
                          {t.nameEn ? `${t.nameEn} • ` : ""}{t.totalVocabs} từ vựng
                        </p>
                      </div>
                    </div>

                    <span className="p-1 rounded-xs text-slate-400 group-hover:text-[#1d6ee6] group-hover:bg-[#1d6ee6]/10 transition-colors shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </div>

                  {/* Card Footer: Difficulty & Progress in 1 row */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
                    <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] font-bold text-slate-400">
                      <div className="flex items-center gap-1">
                        <span>Độ khó:</span>
                        <div className="flex items-center gap-0.5">
                          {Array(3)
                            .fill(0)
                            .map((_, i) => (
                              <span
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  i < (t.difficulty || 1)
                                    ? "bg-[#1d6ee6]"
                                    : "bg-slate-200 dark:bg-slate-800"
                                }`}
                              />
                            ))}
                        </div>
                        <span className="text-[9px] font-semibold text-slate-500 ml-0.5">
                          {t.difficulty === 1 ? "A1-A2" : t.difficulty === 2 ? "B1-B2" : "C1-C2"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Tiến trình:</span>
                        <span className="text-[#1d6ee6] font-black">{percentage}%</span>
                      </div>
                    </div>

                    <div className="w-full h-1 sm:h-1.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#1d6ee6] transition-all duration-300"
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

      {/* Load More Button */}
      {search === "" && displayedIds.length < currentThemesPool.length && (
        <MotionItem className="flex justify-center sm:justify-end pt-2 pb-1">
          <button
            onClick={loadMoreThemes}
            className="w-full sm:w-auto justify-center px-4 py-2 sm:py-2.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 hover:border-[#1d6ee6] text-slate-800 dark:text-slate-200 hover:text-[#1d6ee6] text-xs font-black shadow-2xs hover:shadow-xs transition-all cursor-pointer inline-flex items-center gap-2 active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1d6ee6]" />
            <span>Khám phá thêm chủ đề</span>
          </button>
        </MotionItem>
      )}

    </PageEntranceWrapper>
  );
}
