"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shuffle,
  Layers,
  SpellCheck,
  Flame,
  BookOpen,
  Bot,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { GameMode } from "../../types";

export interface GameCatalogGridProps {
  onSelectGame: (mode: GameMode) => void;
}

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

export function GameCatalogGrid({ onSelectGame }: GameCatalogGridProps) {
  const games = [
    {
      id: "scramble" as GameMode,
      title: "Word Scramble",
      subtitle: "Giải mã từ vựng & Combo Streak",
      description:
        "Sắp xếp lại các ký tự bị xáo trộn để tìm ra từ tiếng Anh chính xác với gợi ý ngữ nghĩa tiếng Việt. Tích lũy chuỗi Streak nhân đôi XP.",
      icon: Shuffle,
      iconBg: "from-[#0059bb] to-sky-600 shadow-blue-500/20",
      accentColor: "text-[#0059bb] dark:text-sky-400",
      borderHover: "hover:border-[#0059bb]",
      badgeVariant: "primary" as const,
      tag1: "8 từ",
      tag2: "~3 phút",
      xpReward: "+10~80 XP",
    },
    {
      id: "memory" as GameMode,
      title: "Memory Match",
      subtitle: "Lật thẻ trí nhớ Từ - Nghĩa",
      description:
        "Lật các thẻ bài để ghép đôi từ vựng tiếng Anh với nghĩa tương ứng. Rèn luyện phản xạ liên kết hình ảnh và nghĩa từ tức thì.",
      icon: Layers,
      iconBg: "from-emerald-500 to-teal-600 shadow-emerald-500/20",
      accentColor: "text-emerald-600 dark:text-emerald-400",
      borderHover: "hover:border-emerald-500",
      badgeVariant: "success" as const,
      tag1: "6 cặp",
      tag2: "~2 phút",
      xpReward: "+20~60 XP",
    },
    {
      id: "wordle" as GameMode,
      title: "Wordle English",
      subtitle: "Đoán từ 5 chữ cái 6 lượt",
      description:
        "Đoán từ vựng tiếng Anh 5 chữ cái bí ẩn với các tín hiệu màu trực quan. Hỗ trợ bàn phím ảo lẫn gõ phím vật lý cực nhạy.",
      icon: SpellCheck,
      iconBg: "from-amber-500 to-orange-500 shadow-amber-500/20",
      accentColor: "text-amber-600 dark:text-amber-400",
      borderHover: "hover:border-amber-500",
      badgeVariant: "warning" as const,
      tag1: "6 lượt",
      tag2: "5 ký tự",
      xpReward: "+25~60 XP",
    },
    {
      id: "blitz" as GameMode,
      title: "Word Blitz",
      subtitle: "Cuộc đua tốc độ & Cứu từ rơi",
      description:
        "Các từ vựng rơi xuống với tốc độ tăng dần. Gõ nhanh chính xác để bắn hạ từ trước vạch nguy hiểm. Trang bị 3 sinh mệnh kịch tính.",
      icon: Flame,
      iconBg: "from-rose-500 via-orange-500 to-amber-500 shadow-rose-500/20",
      accentColor: "text-rose-600 dark:text-rose-400",
      borderHover: "hover:border-rose-500",
      badgeVariant: "danger" as const,
      tag1: "3 Mạng",
      tag2: "Tốc độ cao",
      xpReward: "+30~100 XP",
    },
    {
      id: "sentence" as GameMode,
      title: "Sentence Scramble",
      subtitle: "Thợ xây trật tự câu ngữ pháp",
      description:
        "Ghép các khối từ vựng xáo trộn thành câu tiếng Anh hoàn chỉnh theo gợi ý nghĩa tiếng Việt. Phân tích cấu trúc S-V-O ngữ pháp tức thì.",
      icon: BookOpen,
      iconBg: "from-sky-500 to-blue-600 shadow-sky-500/20",
      accentColor: "text-sky-600 dark:text-sky-400",
      borderHover: "hover:border-sky-500",
      badgeVariant: "primary" as const,
      tag1: "8 câu",
      tag2: "Ngữ pháp S-V-O",
      xpReward: "+20~120 XP",
    },
    {
      id: "chain" as GameMode,
      title: "Word Chain AI",
      subtitle: "Đấu nối từ tiếng Anh với AI Mentor",
      description:
        "Nối chữ cái cuối cùng thành chữ đầu tiên của từ mới đối kháng trực tiếp với AI XP Mentor. Đếm ngược 12 giây mỗi lượt siêu hồi hộp.",
      icon: Bot,
      iconBg: "from-indigo-500 to-purple-600 shadow-indigo-500/20",
      accentColor: "text-indigo-600 dark:text-indigo-400",
      borderHover: "hover:border-indigo-500",
      badgeVariant: "legendary" as const,
      tag1: "Đấu AI 1v1",
      tag2: "12s/lượt",
      xpReward: "+30~100 XP",
    },
  ];

  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => {
        const Icon = game.icon;
        return (
          <motion.div
            key={game.id}
            variants={cardItemVariants}
            whileHover={{ translateY: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectGame(game.id)}
            className="cursor-pointer h-full"
          >
            <div
              className={`p-5 sm:p-6 flex flex-col justify-between h-full min-h-[260px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 ${game.borderHover} rounded-2xl relative overflow-hidden group shadow-2xs hover:shadow-lg transition-all duration-200`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${game.iconBg} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="h-6 w-6 stroke-[2.2]" />
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-[11px] font-bold shadow-2xs">
                    <Zap className="w-3 h-3 stroke-[2.5] text-amber-500" />
                    <span>{game.xpReward}</span>
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
                  <span>Chơi ngay</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
