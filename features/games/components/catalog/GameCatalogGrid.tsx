"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shuffle,
  Layers,
  SpellCheck,
  Zap,
  Clock,
  ArrowRight,
  Flame,
  BookOpen,
  Filter,
  Image as ImageIcon,
  Headphones,
  Trophy,
  Swords,
  Brain,
  Sparkles,
  AlignLeft,
  KeyRound,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { GameMode, VocabDeckType } from "../../types";
import { getAllBestRecords } from "../../utils/gameRecords";
import { GameDeckSelector } from "../shared/GameDeckSelector";

export interface GameCatalogGridProps {
  onSelectGame: (mode: GameMode) => void;
  selectedDeck?: VocabDeckType;
  onSelectDeck?: (deck: VocabDeckType) => void;
  activePoolCount?: number;
}

type FilterCategory = "all" | "speed" | "media" | "memory";

const cardItemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 15,
    },
  },
} as const;

export function GameCatalogGrid({
  onSelectGame,
  selectedDeck,
  onSelectDeck,
  activePoolCount,
}: GameCatalogGridProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterCategory>("all");
  const bestRecords = getAllBestRecords();

  const games = [
    {
      id: "scramble" as GameMode,
      category: "speed" as FilterCategory,
      title: "Word Scramble",
      subtitle: "Giải mã từ vựng & Ghép ký tự",
      description:
        "Chạm hoặc gõ các chữ cái bị xáo trộn để giải mã từ vựng tiếng Anh. Hỗ trợ phát âm chuẩn, chuỗi Combo Streak nhân đôi điểm số và gợi ý thông minh.",
      icon: Shuffle,
      iconBg: "from-[#0059bb] to-sky-600 shadow-blue-500/20",
      accentColor: "text-[#0059bb] dark:text-sky-400",
      borderHover: "hover:border-[#0059bb]",
      badgeVariant: "primary" as const,
      tag1: "8 từ",
      tag2: "2.5 phút",
      difficulty: "Trung bình",
      xpReward: "+15~60 XP",
    },
    {
      id: "blitz" as GameMode,
      category: "speed" as FilterCategory,
      title: "Speed Blitz",
      subtitle: "Phản xạ nghĩa từ 60 giây",
      description:
        "Thử thách tốc độ đỉnh cao: Chọn nhanh nghĩa tiếng Việt chính xác trong tích tắc. Kích hoạt chế độ Fever Mode với chuỗi Combo x1 - x5 cực cuốn.",
      icon: Flame,
      iconBg: "from-amber-500 to-rose-500 shadow-amber-500/20",
      accentColor: "text-amber-600 dark:text-amber-400",
      borderHover: "hover:border-amber-500",
      badgeVariant: "warning" as const,
      tag1: "60 giây",
      tag2: "Tốc độ",
      difficulty: "Nhanh",
      xpReward: "+20~60 XP",
    },
    {
      id: "memory" as GameMode,
      category: "memory" as FilterCategory,
      title: "Memory Match",
      subtitle: "Lật thẻ 3D Từ - Nghĩa",
      description:
        "Lật các thẻ bài 3D để ghép đôi từ vựng tiếng Anh với nghĩa tương ứng. Chọn cấp độ 4, 6 hoặc 8 cặp để rèn luyện trí nhớ không gian và phản xạ tức thì.",
      icon: Layers,
      iconBg: "from-emerald-500 to-teal-600 shadow-emerald-500/20",
      accentColor: "text-emerald-600 dark:text-emerald-400",
      borderHover: "hover:border-emerald-500",
      badgeVariant: "success" as const,
      tag1: "4-8 cặp",
      tag2: "2 phút",
      difficulty: "Linh hoạt",
      xpReward: "+20~60 XP",
    },
    {
      id: "wordle" as GameMode,
      category: "memory" as FilterCategory,
      title: "Wordle English",
      subtitle: "Đoán từ 5 chữ cái 6 lượt",
      description:
        "Giải mã từ bí ẩn 5 chữ cái qua các tín hiệu màu sắc trực quan. Hỗ trợ mở gợi ý ký tự, nghe phát âm sau ván đấu và lưu vào sổ tay ôn tập.",
      icon: KeyRound,
      iconBg: "from-purple-600 to-indigo-600 shadow-purple-500/20",
      accentColor: "text-purple-600 dark:text-purple-400",
      borderHover: "hover:border-purple-500",
      badgeVariant: "legendary" as const,
      tag1: "6 lượt",
      tag2: "5 ký tự",
      difficulty: "Thách thức",
      xpReward: "+25~60 XP",
    },
    {
      id: "sentence" as GameMode,
      category: "memory" as FilterCategory,
      title: "Sentence Builder",
      subtitle: "Ghép câu chuẩn ngữ pháp",
      description:
        "Sắp xếp các khối từ vựng để tạo thành câu hoàn chỉnh đúng ngữ pháp và cấu trúc ngữ cảnh. Giúp ghi nhớ collocations tự nhiên và tăng phản xạ viết.",
      icon: AlignLeft,
      iconBg: "from-indigo-600 to-blue-700 shadow-indigo-500/20",
      accentColor: "text-indigo-600 dark:text-indigo-400",
      borderHover: "hover:border-indigo-500",
      badgeVariant: "primary" as const,
      tag1: "5 câu",
      tag2: "3 phút",
      difficulty: "Ngữ cảnh",
      xpReward: "+20~60 XP",
    },
    {
      id: "picture" as GameMode,
      category: "media" as FilterCategory,
      title: "PictoWord Match",
      subtitle: "Đoán từ qua hình ảnh trực quan",
      description:
        "Kích hoạt liên kết vật thể và từ vựng qua kho ảnh chụp nghệ thuật HD. Hỗ trợ zoom ảnh sắc nét, gợi ý ngữ cảnh và phát âm chuẩn giọng bản xứ.",
      icon: ImageIcon,
      iconBg: "from-cyan-500 to-blue-600 shadow-cyan-500/20",
      accentColor: "text-cyan-600 dark:text-cyan-400",
      borderHover: "hover:border-cyan-500",
      badgeVariant: "primary" as const,
      tag1: "8 ảnh",
      tag2: "2.5 phút",
      difficulty: "Trực quan",
      xpReward: "+20~60 XP",
    },
    {
      id: "audio" as GameMode,
      category: "media" as FilterCategory,
      title: "Audio Ear Challenge",
      subtitle: "Nhận diện âm thanh bản xứ",
      description:
        "Luyện phản xạ thính giác với phát âm chuẩn người bản xứ. Nghe từ ở 2 tốc độ 1.0x và 0.75x để chọn đúng từ vựng trước khi nhìn mặt chữ.",
      icon: Headphones,
      iconBg: "from-cyan-600 to-blue-700 shadow-cyan-500/20",
      accentColor: "text-cyan-600 dark:text-cyan-400",
      borderHover: "hover:border-cyan-500",
      badgeVariant: "primary" as const,
      tag1: "8 câu",
      tag2: "2.5 phút",
      difficulty: "Thính giác",
      xpReward: "+20~60 XP",
    },
    {
      id: "pvp" as any,
      category: "speed" as FilterCategory,
      title: "Đấu Trường 1v1 PvP",
      subtitle: "So tài từ vựng thời gian thực",
      description:
        "Thách đấu từ vựng 1v1 trực tiếp ngẫu nhiên hoặc tạo phòng so tài với bạn bè. 15 câu trắc nghiệm tốc độ cao với 3 trái tim sinh mệnh và leo thang xếp hạng ELO.",
      icon: Swords,
      iconBg: "from-rose-500 to-red-600 shadow-rose-500/20",
      accentColor: "text-rose-600 dark:text-rose-400",
      borderHover: "hover:border-rose-500",
      badgeVariant: "danger" as const,
      tag1: "15 câu",
      tag2: "1v1 Live",
      difficulty: "Đối kháng",
      xpReward: "+30~100 XP",
      href: "/study/pvp",
    },
    {
      id: "daily_quest" as any,
      category: "memory" as FilterCategory,
      title: "Thử Thách Gauntlet",
      subtitle: "Chuỗi 3 Game Liên Hoàn",
      description:
        "Kích hoạt thử thách liên hoàn 3 ván mini game bất kỳ trong ngày để bảo vệ chuỗi Streak ngọn lửa, mở khóa rương báu XP và nhận danh hiệu Kiện tướng.",
      icon: Trophy,
      iconBg: "from-amber-500 to-yellow-600 shadow-amber-500/20",
      accentColor: "text-amber-600 dark:text-amber-400",
      borderHover: "hover:border-amber-500",
      badgeVariant: "warning" as const,
      tag1: "3 ván",
      tag2: "Hằng ngày",
      difficulty: "Nhiệm vụ",
      xpReward: "+100 XP Bonus",
      actionType: "random_game",
    },
  ];

  const filteredGames = games.filter(
    (g) => filter === "all" || g.category === filter
  );

  const FILTER_TABS: {
    id: FilterCategory;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: "all", label: `Tất cả (${games.length})`, icon: Sparkles },
    { id: "speed", label: "Phản xạ & Tốc độ", icon: Zap },
    { id: "media", label: "Hình ảnh & Âm thanh", icon: Headphones },
    { id: "memory", label: "Trí nhớ & Cấu trúc", icon: Brain },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Unified Studio Control Toolbar: Category Filter on Left, Deck Selector on Right */}
      <div className="relative z-30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
          {FILTER_TABS.map((tab) => {
            const isActive = filter === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#0059bb] text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                <TabIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right side: Deck Selector & Active Count */}
        {selectedDeck && onSelectDeck && (
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <GameDeckSelector
              currentDeck={selectedDeck}
              onSelectDeck={onSelectDeck}
              poolCount={activePoolCount || 0}
            />
            {activePoolCount !== undefined && (
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 hidden md:inline-flex items-center">
                <strong className="text-slate-800 dark:text-slate-200 mr-1 font-mono">{activePoolCount}</strong> từ
              </span>
            )}
          </div>
        )}
      </div>

      {/* Grid of Game Bento Cards */}
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 relative z-0">
        <AnimatePresence>
          {filteredGames.map((game) => {
            const Icon = game.icon;
            const best = bestRecords[game.id];

            return (
              <motion.div
                key={game.id}
                variants={cardItemVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                whileHover={{ translateY: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if ((game as any).href) {
                    router.push((game as any).href);
                  } else if ((game as any).actionType === "random_game") {
                    const playableModes: GameMode[] = ["scramble", "blitz", "memory", "wordle", "sentence", "picture", "audio"];
                    const randomMode = playableModes[Math.floor(Math.random() * playableModes.length)];
                    onSelectGame(randomMode);
                  } else {
                    onSelectGame(game.id as GameMode);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if ((game as any).href) {
                      router.push((game as any).href);
                    } else if ((game as any).actionType === "random_game") {
                      const playableModes: GameMode[] = ["scramble", "blitz", "memory", "wordle", "sentence", "picture", "audio"];
                      const randomMode = playableModes[Math.floor(Math.random() * playableModes.length)];
                      onSelectGame(randomMode);
                    } else {
                      onSelectGame(game.id as GameMode);
                    }
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Chơi mini game ${game.title}`}
                className="cursor-pointer h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0059bb]"
              >
                <div
                  className={`p-5 sm:p-6 flex flex-col justify-between h-full min-h-[270px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 ${game.borderHover} rounded-3xl relative overflow-hidden group shadow-2xs hover:shadow-xl transition-all duration-200`}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div
                        className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${game.iconBg} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300`}
                      >
                        <Icon className="h-6 w-6 stroke-[2.2]" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        {best && best.bestScore > 0 && (
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 shadow-2xs">
                            <Trophy className="w-3 h-3 text-amber-500" />
                            <span>Kỷ lục: {best.bestScore}đ</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-[11px] font-bold shadow-2xs">
                          <Zap className="w-3 h-3 stroke-[2.5] text-amber-500 fill-amber-500" />
                          <span>{game.xpReward}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3
                        className={`text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display group-hover:${game.accentColor} transition-colors`}
                      >
                        {game.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-400">
                        {game.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {game.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-1.5">
                      <Badge variant={game.badgeVariant} size="sm">
                        {game.tag1}
                      </Badge>
                      <Badge variant="neutral" size="sm">
                        {game.tag2}
                      </Badge>
                    </div>

                    <span
                      className={`text-xs font-bold ${game.accentColor} group-hover:translate-x-1 transition-transform inline-flex items-center gap-1`}
                    >
                      <span>
                        {(game as any).href
                          ? "Đấu ngay"
                          : (game as any).actionType === "random_game"
                          ? "Chơi ngay"
                          : "Vào chơi"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
