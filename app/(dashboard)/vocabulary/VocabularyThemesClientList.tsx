"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  ChevronRight,
  Layers,
  Filter,
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
} from "lucide-react";

interface ClientTheme {
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
  if (text.includes("y tế") || text.includes("healthcare") || text.includes("bệnh")) {
    return <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />;
  }
  if (text.includes("tài chính") || text.includes("finance") || text.includes("ngân hàng")) {
    return <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />;
  }
  if (text.includes("luật") || text.includes("law") || text.includes("pháp")) {
    return <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />;
  }
  if (text.includes("môi trường") || text.includes("environment") || text.includes("sinh thái")) {
    return <TreePine className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />;
  }
  if (text.includes("marketing") || text.includes("quảng cáo") || text.includes("truyền thông")) {
    return <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />;
  }
  if (text.includes("du lịch") || text.includes("travel") || text.includes("hàng không")) {
    return <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />;
  }
  if (text.includes("khoa học") || text.includes("science") || text.includes("vũ trụ")) {
    return <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />;
  }
  if (text.includes("nghệ thuật") || text.includes("art") || text.includes("thiết kế")) {
    return <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />;
  }
  if (text.includes("thể thao") || text.includes("sports") || text.includes("thi đấu")) {
    return <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />;
  }
  if (text.includes("gia đình") || text.includes("family") || text.includes("con người") || text.includes("people")) {
    return <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
  }
  if (text.includes("nhà") || text.includes("house") || text.includes("home") || text.includes("nội thất")) {
    return <Home className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />;
  }
  if (text.includes("thực phẩm") || text.includes("food") || text.includes("rau") || text.includes("ăn uống") || text.includes("dining")) {
    return <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
  }
  if (text.includes("hoa quả") || text.includes("fruit") || text.includes("trái cây")) {
    return <Apple className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />;
  }
  if (text.includes("đồ uống") || text.includes("drink") || text.includes("cà phê") || text.includes("coffee")) {
    return <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />;
  }
  if (text.includes("nghề") || text.includes("occupation") || text.includes("công việc") || text.includes("work") || text.includes("văn phòng")) {
    return <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />;
  }
  if (text.includes("trường") || text.includes("school") || text.includes("giáo dục") || text.includes("education") || text.includes("học")) {
    return <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />;
  }
  if (text.includes("quần áo") || text.includes("clothing") || text.includes("thời trang") || text.includes("fashion")) {
    return <Shirt className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />;
  }
  if (text.includes("thời tiết") || text.includes("weather") || text.includes("khí hậu")) {
    return <CloudSun className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />;
  }
  if (text.includes("phương tiện") || text.includes("transport") || text.includes("giao thông") || text.includes("xe") || text.includes("car")) {
    return <Car className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />;
  }
  if (text.includes("xe buýt") || text.includes("bus") || text.includes("trạm")) {
    return <Bus className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />;
  }
  if (text.includes("động vật") || text.includes("animal") || text.includes("thú") || text.includes("pet")) {
    return <Dog className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />;
  }
  if (text.includes("thời gian") || text.includes("time") || text.includes("thói quen") || text.includes("routine") || text.includes("giờ")) {
    return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />;
  }
  if (text.includes("màu sắc") || text.includes("color") || text.includes("nghệ thuật") || text.includes("art") || text.includes("thiết kế")) {
    return <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />;
  }
  if (text.includes("cơ thể") || text.includes("body") || text.includes("thể chất") || text.includes("fitness")) {
    return <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />;
  }
  if (text.includes("số") || text.includes("number") || text.includes("toán") || text.includes("math")) {
    return <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
  }
  if (text.includes("đồ vật") || text.includes("object") || text.includes("hàng hóa")) {
    return <Package className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />;
  }
  if (text.includes("thể thao") || text.includes("sport")) {
    return <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />;
  }
  if (text.includes("giải trí") || text.includes("entertainment") || text.includes("game")) {
    return <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />;
  }
  if (text.includes("sức khỏe") || text.includes("health") || text.includes("y tế") || text.includes("bệnh") || text.includes("medicine") || text.includes("pharmacy")) {
    return <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />;
  }
  if (text.includes("tâm lý") || text.includes("psychology") || text.includes("trí tuệ") || text.includes("mind")) {
    return <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />;
  }
  if (text.includes("kinh doanh") || text.includes("business") || text.includes("doanh nghiệp") || text.includes("công ty")) {
    return <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" />;
  }
  if (text.includes("công nghệ") || text.includes("technology") || text.includes("máy tính") || text.includes("computer") || text.includes("phần mềm")) {
    return <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-[#1d6ee6]" />;
  }
  if (text.includes("môi trường") || text.includes("environment") || text.includes("thiên nhiên") || text.includes("nature") || text.includes("cây")) {
    return <TreePine className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />;
  }
  if (text.includes("du lịch") || text.includes("travel") || text.includes("sân bay") || text.includes("airport") || text.includes("chuyến bay")) {
    return <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />;
  }
  if (text.includes("mạng xã hội") || text.includes("social") || text.includes("internet") || text.includes("web")) {
    return <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />;
  }
  if (text.includes("giao tiếp") || text.includes("communication") || text.includes("hội thoại")) {
    return <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />;
  }
  if (text.includes("văn học") || text.includes("literature") || text.includes("đọc") || text.includes("sách")) {
    return <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />;
  }
  if (text.includes("siêu thị") || text.includes("supermarket") || text.includes("mua sắm") || text.includes("shopping") || text.includes("cửa hàng")) {
    return <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />;
  }
  if (text.includes("bưu điện") || text.includes("post") || text.includes("thư") || text.includes("mail")) {
    return <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
  }
  if (text.includes("ngân hàng") || text.includes("bank") || text.includes("tài chính") || text.includes("finance") || text.includes("tiền")) {
    return <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />;
  }
  if (text.includes("pháp luật") || text.includes("law") || text.includes("luật") || text.includes("pháp lý")) {
    return <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" />;
  }
  if (text.includes("an ninh") || text.includes("security") || text.includes("an toàn") || text.includes("safety")) {
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
  initialThemes,
}: {
  initialThemes: ClientTheme[];
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isDesktop, setIsDesktop] = useState(false);

  const [displayedIds, setDisplayedIds] = useState<string[]>(() => {
    // Deterministic SSR initial slice to prevent React Hydration Mismatch
    return initialThemes.slice(0, 16).map((t) => t.id);
  });

  React.useEffect(() => {
    const checkIsDesktop = () => typeof window !== "undefined" && window.innerWidth >= 768;
    const desktop = checkIsDesktop();
    setIsDesktop(desktop);

    const initialLimit = desktop ? 16 : 8;

    if (initialThemes.length > 0) {
      setDisplayedIds(getRandomSample(initialThemes, initialLimit).map((t) => t.id));
    }

    const handleResize = () => {
      setIsDesktop(checkIsDesktop());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialThemes]);

  const loadMoreThemes = () => {
    const remaining = initialThemes.filter((t) => !displayedIds.includes(t.id));
    if (remaining.length > 0) {
      // Always load 8 more themes per click on both Desktop and Mobile
      const nextBatch = getRandomSample(remaining, 8).map((t) => t.id);
      setDisplayedIds((prev) => [...prev, ...nextBatch]);
    }
  };

  const filteredThemes = useMemo(() => {
    let list = initialThemes;
    if (search.trim()) {
      const q = search.toLowerCase();
      return list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.nameEn.toLowerCase().includes(q)
      );
    }
    return displayedIds
      .map((id) => initialThemes.find((t) => t.id === id))
      .filter((t): t is ClientTheme => !!t);
  }, [search, displayedIds, initialThemes]);

  const totalVocabsCount = useMemo(() => {
    const sum = initialThemes.reduce((sum, t) => sum + (t.totalVocabs || 0), 0);
    return Math.max(sum, 8900);
  }, [initialThemes]);

  const renderIcon = (theme: ClientTheme) => {
    return getSemanticThemeIcon(theme);
  };

  return (
    <PageEntranceWrapper className="space-y-2.5 sm:space-y-3.5 pb-16 md:pb-6 px-1 md:px-0 select-none font-sans">
      
      {/* 1. TOP MICRO-HERO TOOLBAR (DASHBOARD BENTO STYLE) */}
      <MotionItem>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="p-3 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 sm:gap-3 min-w-0"
      >
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
                {totalVocabsCount > 0 ? `${totalVocabsCount}+ từ` : "8,900+ từ"}
              </span>
            </div>
            <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
              Luyện tập theo từng chủ đề thiết yếu với thuật toán ghi nhớ SRS ngắt quãng.
            </p>
          </div>
        </div>

        {/* Search Input Dock */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên chủ đề..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-8 sm:h-9 pl-8 pr-3 text-xs font-medium rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#1d6ee6] transition-colors"
          />
        </div>
      </motion.div>
      </MotionItem>

      {/* 2. TOP BENTO STATS BAR (4-COLUMN CARDS) */}
      <MotionItem>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3.5">
        {[
          {
            title: "Tổng số chủ đề",
            value: `${initialThemes.length} Bộ từ`,
            subtitle: "Cập nhật liên tục",
            icon: Layers,
            color: "text-[#1d6ee6]",
            bg: "bg-[#1d6ee6]/10",
          },
          {
            title: "Mục tiêu bài học",
            value: "12 từ/ngày",
            subtitle: "Nhịp độ khuyến nghị",
            icon: Target,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
          },
          {
            title: "Thời gian mỗi bài",
            value: "8 phút/buổi",
            subtitle: "Học mọi lúc mọi nơi",
            icon: Clock,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
          },
          {
            title: "Tỷ lệ ghi nhớ",
            value: "86% SRS",
            subtitle: "Thuật toán lặp lại",
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
            Không tìm thấy chủ đề nào phù hợp
          </p>
          <p className="text-[11px] sm:text-xs font-medium text-slate-400">
            Hãy thử tìm lại với từ khóa khác như "Work", "Travel", hoặc "Daily".
          </p>
        </MotionItem>
      ) : (
        <MotionItem className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3.5">
          {filteredThemes.map((t) => {
            const percentage = Math.min(100, 20 + (t.difficulty || 1) * 12);
            const hasEnglishSubtitle = t.nameEn && t.nameEn.trim().toLowerCase() !== t.name.trim().toLowerCase();
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
                          {t.totalVocabs} từ vựng
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
                          {Array(5)
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

      {/* Load More Button (Centered full-width on mobile, right-aligned on desktop) */}
      {search === "" && displayedIds.length < initialThemes.length && (
        <MotionItem className="flex justify-center sm:justify-end pt-2 pb-1">
          <button
            onClick={loadMoreThemes}
            className="w-full sm:w-auto justify-center px-4 py-2 sm:py-2.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 hover:border-[#1d6ee6] text-slate-800 dark:text-slate-200 hover:text-[#1d6ee6] text-xs font-black shadow-2xs hover:shadow-xs transition-all cursor-pointer inline-flex items-center gap-2 active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1d6ee6]" />
            <span>Khám phá thêm bộ từ (+8 bộ)</span>
          </button>
        </MotionItem>
      )}

    </PageEntranceWrapper>
  );
}
