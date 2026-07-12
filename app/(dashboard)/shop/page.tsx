"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { Button, Card, Badge } from "@/components/ui";
import {
  Coins,
  ShieldAlert,
  Flame,
  Zap,
  Sparkles,
  Check,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useNotificationStore } from "@/lib/store/notificationStore";

interface ShopItem {
  id: string;
  name: string;
  desc: string;
  cost: number;
  icon: React.ReactNode;
  bgGradient: string;
}

export default function ShopPage() {
  const { addToast } = useNotificationStore();
  const { user, buyStreakFreeze, buyDoubleXp } = useAuthStore();
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const shopItems: ShopItem[] = [
    {
      id: "streak_freeze",
      name: "Streak Freeze (Bảo Hộ Lửa)",
      desc: "Giữ nguyên ngọn lửa Streak của bạn không bị dập tắt kể cả khi bạn bỏ lỡ 1 ngày không hoàn thành bài tập.",
      cost: 50,
      icon: <Flame className="h-7 w-7 text-orange-500 fill-orange-500 animate-pulse" />,
      bgGradient: "from-orange-500/10 via-orange-600/5 to-amber-500/10",
    },
    {
      id: "double_xp",
      name: "Nhân đôi XP (30 Phút)",
      desc: "Kích hoạt hiệu ứng tăng tốc nhân đôi toàn bộ điểm kinh nghiệm (XP) kiếm được từ mọi chế độ học tập trong 30 phút kế tiếp.",
      cost: 100,
      icon: <Zap className="h-7 w-7 text-yellow-500 fill-yellow-500 animate-bounce" style={{ animationDuration: "3s" }} />,
      bgGradient: "from-yellow-500/10 via-yellow-600/5 to-orange-500/10",
    },
    {
      id: "premium_owl",
      name: "Trang phục Cú Tốt Nghiệp",
      desc: "Trang bị cho cú avatar của bạn chiếc mũ tốt nghiệp danh tiếng nâng tầm đẳng cấp học viên.",
      cost: 250,
      icon: <Sparkles className="h-7 w-7 text-purple-400 animate-pulse" />,
      bgGradient: "from-purple-500/10 via-purple-600/5 to-pink-500/10",
    },
  ];

  const handlePurchase = (itemId: string, cost: number) => {
    if (!user) return;
    if ((user.coins || 0) < cost) {
      addToast({
        type: "warning",
        title: "Không đủ Coins",
        message: "Bạn không đủ Coins để mua vật phẩm này! Hãy tích cực học tập thêm nhé.",
      });
      return;
    }

    setPurchasingId(itemId);

    setTimeout(() => {
      let success = false;
      if (itemId === "streak_freeze") {
        success = buyStreakFreeze();
      } else if (itemId === "double_xp") {
        success = buyDoubleXp();
      } else {
        // Mock success for custom skin
        success = true;
        // Deduct coins locally
        useAuthStore.setState({
          user: {
            ...user,
            coins: (user.coins || 0) - cost,
          },
        });
      }

      setPurchasingId(null);
      if (success) {
        setSuccessId(itemId);
        setTimeout(() => setSuccessId(null), 2000);
      }
    }, 800);
  };

  return (
    <div className="mx-auto max-w-5xl animate-fade-in space-y-8">
      {/* Header banner */}
      <div className="bezel">
        <div className="bezel-inner bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 md:p-8 text-white rounded-[30px] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
              <ShoppingBag className="h-3.5 w-3.5" />
              Cửa hàng vật phẩm ảo
            </div>
            <h1 className="text-3xl font-black">Cửa hàng Gamification</h1>
            <p className="text-sm text-white/70 max-w-sm">
              Sử dụng số vàng tích lũy từ tiến trình học để trang bị bình năng lượng và trang phục hỗ trợ.
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl flex flex-col items-center min-w-[150px]">
            <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">Số vàng của bạn</span>
            <div className="flex items-center gap-1.5 mt-1">
              <Coins className="h-6 w-6 text-yellow-400 animate-bounce" />
              <span className="text-3xl font-black text-yellow-300">{user?.coins ?? 0}</span>
            </div>
            <span className="text-[10px] text-white/75 mt-1.5 font-bold">
              Đóng băng sở hữu: {user?.streakFreezes ?? 0} bình
            </span>
          </div>
        </div>
      </div>

      {/* Grid items */}
      <div className="grid gap-6 md:grid-cols-3">
        {shopItems.map((item) => {
          const isPurchasing = purchasingId === item.id;
          const isSuccess = successId === item.id;
          const canAfford = (user?.coins ?? 0) >= item.cost;

          return (
            <div key={item.id} className="bezel">
              <div className={`bezel-inner bg-gradient-to-br ${item.bgGradient} bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between h-full gap-5`}>
                <div className="space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center border border-black/5 dark:border-white/5 shadow-sm">
                    {item.icon}
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="text-base font-black text-slate-800 dark:text-slate-200">
                      {item.name}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-neutral-800/80 pt-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Coins className="h-4.5 w-4.5 text-yellow-500" />
                    <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                      {item.cost}
                    </span>
                  </div>

                  <Button
                    variant={isSuccess ? "success" : canAfford ? "primary" : "bezel"}
                    size="sm"
                    className="font-bold rounded-xl px-4 py-2 text-xs min-w-[85px] flex items-center justify-center"
                    disabled={isPurchasing || isSuccess}
                    onClick={() => handlePurchase(item.id, item.cost)}
                  >
                    {isSuccess ? (
                      <Check className="h-4 w-4" />
                    ) : isPurchasing ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      "Mua ngay"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
