"use client";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Button, Badge } from "@/shared/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import {
  Coins,
  Flame,
  Zap,
  Sparkles,
  Check,
  ShoppingBag,
  Shirt,
  ShieldCheck,
  Crown,
  Trophy,
  ArrowRight,
  UserCheck,
  PackageCheck,
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import { useNotificationStore } from "@/stores/notificationStore";

interface ShopItem {
  id: string;
  name: string;
  desc: string;
  cost: number;
  icon: React.ReactNode;
  accentBg: string;
  accentText: string;
  category: "consumable" | "cosmetic";
  tag: string;
}

export default function ShopPage() {
  const { addToast } = useNotificationStore();
  const { user, buyStreakFreeze, buyDoubleXp } = useAuthStore();
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<Set<string>>(new Set());
  const [isEquipping, setIsEquipping] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<"all" | "consumable" | "cosmetic">("all");

  useEffect(() => {
    if (!user) return;
    fetch("/api/shop/inventory")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.purchaseLogs) {
          const purchased = new Set<string>(
            data.purchaseLogs.map((log: any) => log.itemId)
          );
          setPurchasedItems(purchased);
        }
      })
      .catch((err) => console.error("Error loading shop inventory:", err));
  }, [user]);

  const shopItems: ShopItem[] = [
    {
      id: "streak_freeze",
      name: "Bảo Hộ Lửa (Streak Freeze)",
      desc: "Bảo vệ chuỗi ngọn lửa Streak của bạn không bị ngắt quãng khi bạn lỡ bận 1 ngày không học.",
      cost: 50,
      icon: <Flame className="w-5 h-5 text-orange-500 stroke-[2.2] animate-pulse" />,
      accentBg: "bg-orange-50 dark:bg-orange-950/40 border-orange-200/50 dark:border-orange-900/40",
      accentText: "text-orange-600 dark:text-orange-400",
      category: "consumable",
      tag: "Vật phẩm Hỗ trợ",
    },
    {
      id: "double_xp",
      name: "Thẻ Nhân Đôi XP (30 Phút)",
      desc: "Tăng gấp đôi 2x toàn bộ số điểm XP nhận được khi luyện tập bài học trong 30 phút kế tiếp.",
      cost: 100,
      icon: <Zap className="w-5 h-5 text-amber-500 stroke-[2.2] animate-bounce" />,
      accentBg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200/50 dark:border-amber-900/40",
      accentText: "text-amber-600 dark:text-amber-400",
      category: "consumable",
      tag: "Vật phẩm Hỗ trợ",
    },
    {
      id: "energy_boost",
      name: "Bình Tăng Tốc Năng Lượng (Energy Boost)",
      desc: "Hồi phục toàn bộ năng lượng luyện tập lập tức, mở khóa không giới hạn lượt làm bài thi trong ngày.",
      cost: 75,
      icon: <Coins className="w-5 h-5 text-emerald-500 stroke-[2.2]" />,
      accentBg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/50 dark:border-emerald-900/40",
      accentText: "text-emerald-600 dark:text-emerald-400",
      category: "consumable",
      tag: "Vật phẩm Hỗ trợ",
    },
    {
      id: "super_streak_shield",
      name: "Khiên Kim Cương (Streak Shield 3 Ngày)",
      desc: "Khiên phòng thủ tối thượng bảo vệ chuỗi Streak liên tục trong 3 ngày vắng mặt không bị mất điểm.",
      cost: 120,
      icon: <ShieldCheck className="w-5 h-5 text-sky-500 stroke-[2.2]" />,
      accentBg: "bg-sky-50 dark:bg-sky-950/40 border-sky-200/50 dark:border-sky-900/40",
      accentText: "text-sky-600 dark:text-sky-400",
      category: "consumable",
      tag: "Vật phẩm Hỗ trợ",
    },
    {
      id: "premium_owl",
      name: "Trang Phục Cú Tốt Nghiệp",
      desc: "Đội chiếc mũ cử nhân uy phong cho Avatar Cú, khẳng định đẳng cấp học viên xuất sắc.",
      cost: 250,
      icon: <Sparkles className="w-5 h-5 text-purple-500 stroke-[2.2]" />,
      accentBg: "bg-purple-50 dark:bg-purple-950/40 border-purple-200/50 dark:border-purple-900/40",
      accentText: "text-purple-600 dark:text-purple-400",
      category: "cosmetic",
      tag: "Trang phục Avatar",
    },
    {
      id: "cyber_glasses",
      name: "Kính Cyberpunk Tương Lai",
      desc: "Trang bị kính thực tế ảo Cyberpunk công nghệ cao cực chất cho Avatar học viên.",
      cost: 200,
      icon: <Shirt className="w-5 h-5 text-cyan-500 stroke-[2.2]" />,
      accentBg: "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200/50 dark:border-cyan-900/40",
      accentText: "text-cyan-600 dark:text-cyan-400",
      category: "cosmetic",
      tag: "Trang phục Avatar",
    },
    {
      id: "golden_badge",
      name: "Vương Miện Hoàng Gia (Royal Crown)",
      desc: "Đội vương miện hoàng gia tỏa ánh kim chói lóa, nâng tầm vị thế dẫn đầu bảng xếp hạng Leaderboard.",
      cost: 300,
      icon: <Crown className="w-5 h-5 text-amber-500 stroke-[2.2]" />,
      accentBg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200/50 dark:border-amber-900/40",
      accentText: "text-amber-600 dark:text-amber-400",
      category: "cosmetic",
      tag: "Trang phục Avatar",
    },
    {
      id: "ielts_champion_cape",
      name: "Áo Choàng Quán Quân IELTS 8.5+",
      desc: "Khoác lên mình áo choàng siêu anh hùng danh giá dành riêng cho các chiến binh IELTS đỉnh cao.",
      cost: 350,
      icon: <Trophy className="w-5 h-5 text-rose-500 stroke-[2.2]" />,
      accentBg: "bg-rose-50 dark:bg-rose-950/40 border-rose-200/50 dark:border-rose-900/40",
      accentText: "text-rose-600 dark:text-rose-400",
      category: "cosmetic",
      tag: "Trang phục Avatar",
    },
  ];

  const filteredItems = shopItems.filter(
    (item) => categoryFilter === "all" || item.category === categoryFilter
  );

  const handlePurchase = async (itemId: string, cost: number) => {
    if (!user) return;
    if ((user.coins || 0) < cost) {
      addToast({
        type: "warning",
        title: "Không đủ Vàng 🪙",
        message: "Bạn chưa đủ số Vàng tích lũy để mua vật phẩm này! Hãy chăm chỉ làm bài tập nhé.",
      });
      return;
    }

    setPurchasingId(itemId);

    try {
      let success = false;
      if (itemId === "streak_freeze") {
        success = await buyStreakFreeze();
      } else if (itemId === "double_xp") {
        success = await buyDoubleXp();
      } else {
        const res = await fetch("/api/shop/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemId }),
        });
        const data = await res.json();
        if (data.success) {
          success = true;
          useAuthStore.setState({
            user: {
              ...user,
              coins: data.coins,
            },
          });
          setPurchasedItems((prev) => {
            const next = new Set(prev);
            next.add(itemId);
            return next;
          });
        }
      }

      if (success) {
        setSuccessId(itemId);
        addToast({
          type: "success",
          title: "Mua thành công! 🎉",
          message: "Giao dịch hoàn tất. Vật phẩm đã được thêm vào kho đồ của bạn.",
        });
        setTimeout(() => setSuccessId(null), 2000);
      } else {
        addToast({
          type: "error",
          title: "Giao dịch thất bại",
          message: "Đã xảy ra lỗi trong quá trình thực hiện thanh toán.",
        });
      }
    } catch (e) {
      console.error(e);
      addToast({
        type: "error",
        title: "Lỗi kết nối",
        message: "Không thể kết nối tới máy chủ.",
      });
    } finally {
      setPurchasingId(null);
    }
  };

  const itemEmojiMap: Record<string, { emoji: string; name: string }> = {
    premium_owl: { emoji: "🎓", name: "Mũ tốt nghiệp cử nhân" },
    cyber_glasses: { emoji: "🕶️", name: "Kính Cyberpunk tương lai" },
    golden_badge: { emoji: "👑", name: "Vương miện hoàng gia" },
    ielts_champion_cape: { emoji: "🦸", name: "Áo choàng quán quân IELTS" },
  };

  const handleEquip = async (itemId: string, equip: boolean) => {
    if (!user) return;
    setIsEquipping(itemId);

    try {
      const res = await fetch("/api/shop/equip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, equip }),
      });
      const data = await res.json();
      if (data.success) {
        const itemInfo = itemEmojiMap[itemId] || { emoji: "🦉", name: "Vật phẩm" };
        addToast({
          type: "success",
          title: equip ? `Trang bị thành công! ${itemInfo.emoji}` : "Đã tháo trang bị",
          message: equip
            ? `${itemInfo.name} đã được trang bị cho Avatar của bạn.`
            : "Đã khôi phục Avatar mặc định.",
        });

        useAuthStore.setState({
          user: {
            ...user,
            avatarEmoji: equip ? itemInfo.emoji : "🦉",
          },
        });
      } else {
        addToast({
          type: "error",
          title: "Không thể trang bị",
          message: data.error || "Giao dịch thất bại.",
        });
      }
    } catch (e) {
      console.error(e);
      addToast({
        type: "error",
        title: "Lỗi hệ thống",
        message: "Không thể kết nối tới máy chủ.",
      });
    } finally {
      setIsEquipping(null);
    }
  };

  const isOwlEquipped = user?.avatarEmoji === "🎓";

  return (
    <PageEntranceWrapper className="space-y-4 pb-16 md:pb-6 select-none font-sans" suppressHydrationWarning>
      
      {/* 0. HERO SPOTLIGHT BANNER (AGENCY DASHBOARD TIER) */}
      <MotionItem className="p-4 sm:p-5 rounded-lg bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] text-white shadow-xs relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center gap-1 font-display">
                <ShoppingBag className="w-3.5 h-3.5 text-amber-300" /> Cửa Hàng Vật Phẩm Ảo
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/15 text-white border border-white/20 font-mono">
                Gamification Rewards
              </span>
            </div>

            <h1 className="text-base sm:text-xl font-black font-display tracking-tight text-white flex items-center gap-2 pt-0.5">
              Cửa Hàng Vật Phẩm & Vật Phẩm Ảo
              <Sparkles className="w-4 h-4 text-amber-300" />
            </h1>
            <p className="text-xs text-blue-100/90 max-w-2xl font-medium leading-relaxed">
              Dùng số Vàng tích lũy từ tiến trình học tập để mua thẻ tăng tốc, bảo hộ ngọn lửa Streak và mở khóa trang phục Avatar độc quyền. 🪙
            </p>
          </div>

          {/* Current Gold Balance Widget */}
          <div className="p-3 rounded-md bg-amber-400/15 border border-amber-300/30 flex items-center gap-3 shrink-0 self-start md:self-center shadow-2xs">
            <div className="w-9 h-9 rounded-md bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shrink-0 shadow-2xs">
              <Coins className="w-5 h-5 stroke-[2.2] animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-200 block font-display">
                Số Vàng Của Bạn
              </span>
              <div className="text-lg font-black font-mono text-amber-300 leading-tight">
                {user?.coins ?? 0} <span className="text-xs font-bold text-amber-200/80">Vàng</span>
              </div>
            </div>
          </div>
        </div>
      </MotionItem>

      {/* 1. BENTO GRID LAYOUT (Cột Trái 7/12 - Cột Phải 5/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        
        {/* CỘT TRÁI: SHOP CATALOG (7/12 Width) */}
        <div className="lg:col-span-7 space-y-3.5">
          
          {/* Category Filter Pills Bar */}
          <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5 font-display">
                <ShoppingBag className="w-3.5 h-3.5 stroke-[2.2]" /> DANH MỤC VẬT PHẨM
              </h3>
              <span className="text-[10px] font-bold text-slate-400">3 Vật phẩm sẵn sàng</span>
            </div>

            <div className="p-0.5 bg-slate-100 dark:bg-slate-950 rounded-md flex items-center gap-0.5 border border-slate-200/50 dark:border-white/5">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`flex-1 py-1.5 px-3 rounded text-xs font-bold transition-all cursor-pointer text-center ${
                  categoryFilter === "all"
                    ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Tất cả vật phẩm
              </button>
              <button
                onClick={() => setCategoryFilter("consumable")}
                className={`flex-1 py-1.5 px-3 rounded text-xs font-bold transition-all cursor-pointer text-center ${
                  categoryFilter === "consumable"
                    ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Vật phẩm hỗ trợ
              </button>
              <button
                onClick={() => setCategoryFilter("cosmetic")}
                className={`flex-1 py-1.5 px-3 rounded text-xs font-bold transition-all cursor-pointer text-center ${
                  categoryFilter === "cosmetic"
                    ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Trang phục Avatar
              </button>
            </div>
          </div>

          {/* Shop Item Cards Stream */}
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const isPurchasing = purchasingId === item.id;
              const isSuccess = successId === item.id;
              const canAfford = (user?.coins ?? 0) >= item.cost;
              const isPurchased = purchasedItems.has(item.id);
              const isEquipped = item.id in itemEmojiMap && user?.avatarEmoji === itemEmojiMap[item.id].emoji;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 transition-all hover:border-blue-500/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-md ${item.accentBg} flex items-center justify-center shrink-0 shadow-2xs`}>
                        {item.icon}
                      </div>

                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                            {item.name}
                          </h3>
                          <span className={`px-2 py-0.2 rounded text-[9px] font-black ${item.accentBg} ${item.accentText}`}>
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Price Pill */}
                    <div className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-xs font-black font-mono shrink-0 flex items-center gap-1 shadow-2xs">
                      <Coins className="w-3.5 h-3.5 text-amber-500" />
                      <span>{item.cost} Vàng</span>
                    </div>
                  </div>

                  {/* Action Bar Strip */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5">
                    <span className="text-[10px] font-bold text-slate-400">
                      {item.category === "cosmetic"
                        ? isPurchased ? "Mở khóa vĩnh viễn" : "Vật phẩm thời trang"
                        : "Vật phẩm tiêu hao"}
                    </span>

                    {item.category === "cosmetic" && isPurchased ? (
                      <button
                        onClick={() => handleEquip(item.id, !isEquipped)}
                        disabled={isEquipping === item.id}
                        className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1 font-display ${
                          isEquipped
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-[#0059bb] hover:bg-[#004799] text-white"
                        }`}
                      >
                        {isEquipping === item.id ? (
                          "Đang xử lý..."
                        ) : isEquipped ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Đang sử dụng
                          </>
                        ) : (
                          "Trang bị ngay"
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchase(item.id, item.cost)}
                        disabled={isPurchasing || isSuccess}
                        className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1 font-display ${
                          isSuccess
                            ? "bg-emerald-600 text-white"
                            : canAfford
                            ? "bg-[#0059bb] hover:bg-[#004799] text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        {isSuccess ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Mua thành công!
                          </>
                        ) : isPurchasing ? (
                          "Đang xử lý..."
                        ) : canAfford ? (
                          "Mua ngay"
                        ) : (
                          "Không đủ Vàng"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* CỘT PHẢI: MY INVENTORY & GOLD EARNING TIPS (5/12 Width) */}
        <div className="lg:col-span-5 space-y-3.5">
          
          {/* Widget 1: My Inventory & Active Boosts */}
          <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white font-display flex items-center gap-1.5">
                <PackageCheck className="w-3.5 h-3.5 text-[#0059bb]" /> Tủ Đồ & Vật Phẩm Sở Hữu
              </h3>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-[#0059bb] dark:text-sky-300">
                Kho đồ
              </span>
            </div>

            {/* Current Equipped Avatar Box */}
            <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 space-y-2.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#0059bb] text-white flex items-center justify-center font-black text-lg shrink-0 shadow-2xs font-display">
                    {user?.avatarEmoji || "🦉"}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-display">
                      Avatar Hiện Tại
                    </h4>
                    <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                      {user?.avatarEmoji === "🎓" ? "Cú Tốt Nghiệp 🎓"
                        : user?.avatarEmoji === "🕶️" ? "Kính Cyberpunk 🕶️"
                        : user?.avatarEmoji === "👑" ? "Vương Miện Hoàng Gia 👑"
                        : user?.avatarEmoji === "🦸" ? "Áo Choàng IELTS 8.5+ 🦸"
                        : "Avatar Mặc Định 🦉"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Purchased cosmetics quick equip list */}
              {Array.from(purchasedItems).filter(id => id in itemEmojiMap).length > 0 && (
                <div className="pt-2 border-t border-slate-200/40 dark:border-white/5 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Trang phục đã sở hữu:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from(purchasedItems).filter(id => id in itemEmojiMap).map((itemId) => {
                      const item = itemEmojiMap[itemId];
                      const isEquipped = user?.avatarEmoji === item.emoji;
                      return (
                        <button
                          key={itemId}
                          onClick={() => handleEquip(itemId, !isEquipped)}
                          disabled={isEquipping === itemId}
                          className={`px-2 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer border ${
                            isEquipped
                              ? "bg-[#0059bb] text-white border-[#0059bb] shadow-2xs"
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          <span>{item.emoji}</span>
                          <span>{isEquipped ? "Đang mặc" : "Mặc"}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Active Consumables Inventory Strip */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2.5 rounded bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200/60 dark:border-orange-900/40 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">Bảo Hộ Lửa</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white font-mono">{user?.streakFreezes || 0} bình</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">Nhân Đôi XP</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white font-mono">30 Phút</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 2: How to Earn Gold Tips */}
          <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-1.5 text-amber-500">
                <Coins className="w-3.5 h-3.5 stroke-[2.2]" />
                <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                  Mẹo Tích Lũy Vàng
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">Cơ chế thưởng</span>
            </div>

            <div className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 truncate">
                  🔥 Điểm danh chuỗi Streak mỗi ngày
                </span>
                <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 font-mono">+15 Vàng</span>
              </div>

              <div className="p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 truncate">
                  🎯 Hoàn thành Thử thách Hàng ngày
                </span>
                <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 font-mono">+20 Vàng</span>
              </div>

              <div className="p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 truncate">
                  ⚔️ Chiến thắng trận đấu PvP Từ Vựng
                </span>
                <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 font-mono">+50 Vàng</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </PageEntranceWrapper>
  );
}
