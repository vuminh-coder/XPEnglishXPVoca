"use client";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "@/components/ui";
import {
  Coins,
  Flame,
  Zap,
  Sparkles,
  Check,
  ShoppingBag,
  Shirt,
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
  category: "consumable" | "cosmetic";
}

export default function ShopPage() {
  const { addToast } = useNotificationStore();
  const { user, buyStreakFreeze, buyDoubleXp } = useAuthStore();
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<Set<string>>(new Set());
  const [isEquipping, setIsEquipping] = useState<string | null>(null);

  // Fetch shop inventory on mount
  useEffect(() => {
    if (!user) return;
    fetch("/api/shop/inventory")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.purchaseLogs) {
          const purchased = new Set<string>(
            data.purchaseLogs.map((log: any) => log.itemId),
          );
          setPurchasedItems(purchased);
        }
      })
      .catch((err) => console.error("Error loading shop inventory:", err));
  }, [user]);

  const shopItems: ShopItem[] = [
    {
      id: "streak_freeze",
      name: "Streak Freeze (Bảo Hộ Lửa)",
      desc: "Giữ nguyên ngọn lửa Streak của bạn không bị dập tắt kể cả khi bạn bỏ lỡ 1 ngày không học.",
      cost: 50,
      icon: (
        <Flame className="h-7 w-7 text-orange-500 fill-orange-500 animate-pulse" />
      ),
      bgGradient: "from-orange-500/10 via-orange-600/5 to-amber-500/10",
      category: "consumable",
    },
    {
      id: "double_xp",
      name: "Nhân đôi XP (30 Phút)",
      desc: "Kích hoạt hiệu ứng tăng tốc nhân đôi toàn bộ điểm kinh nghiệm (XP) kiếm được trong 30 phút kế tiếp.",
      cost: 100,
      icon: (
        <Zap
          className="h-7 w-7 text-yellow-500 fill-yellow-500 animate-bounce"
          style={{ animationDuration: "3s" }}
        />
      ),
      bgGradient: "from-yellow-500/10 via-yellow-600/5 to-orange-500/10",
      category: "consumable",
    },
    {
      id: "premium_owl",
      name: "Trang phục Cú Tốt Nghiệp",
      desc: "Trang bị cho cú avatar của bạn chiếc mũ tốt nghiệp danh tiếng nâng tầm đẳng cấp học viên.",
      cost: 250,
      icon: <Sparkles className="h-7 w-7 text-purple-400 animate-pulse" />,
      bgGradient: "from-purple-500/10 via-purple-600/5 to-pink-500/10",
      category: "cosmetic",
    },
  ];

  const handlePurchase = async (itemId: string, cost: number) => {
    if (!user) return;
    if ((user.coins || 0) < cost) {
      addToast({
        type: "warning",
        title: "Không đủ Coins",
        message:
          "Bạn không đủ Coins để mua vật phẩm này! Hãy tích cực học tập thêm nhé.",
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
        // Cosmetic / custom item purchase via backend API
        const res = await fetch("/api/shop/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemId }),
        });
        const data = await res.json();
        if (data.success) {
          success = true;
          // Deduct coins locally
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
          title: "Mua thành công!",
          message: `Giao dịch hoàn tất. Bạn đã mua thành công vật phẩm này.`,
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
        addToast({
          type: "success",
          title: equip ? "Đã trang bị!" : "Đã tháo trang bị",
          message: equip
            ? "Mũ tốt nghiệp đã được trang bị cho cú của bạn."
            : "Đã khôi phục avatar cú mặc định.",
        });

        // Update local user state
        useAuthStore.setState({
          user: {
            ...user,
            avatarEmoji: equip ? "🎓" : "🦉",
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

  return (
    <div
      className="mx-auto max-w-5xl animate-fade-in space-y-8 pb-10"
      suppressHydrationWarning
    >
      {/* Header banner */}
      <div className="bezel">
        <div className="bezel-inner bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 md:p-8 text-white rounded-[30px] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.2em] text-blue-600 font-sans">
              <ShoppingBag className="h-4 w-4" />
              Cửa hàng vật phẩm ảo
            </div>
            <h1 className="text-3xl font-black font-sans">
              Cửa hàng Gamification
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-sm font-sans">
              Sử dụng số vàng tích lũy từ tiến trình học để trang bị bình năng
              lượng và trang phục hỗ trợ.
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl flex flex-col items-center min-w-[180px]">
            <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider font-sans">
              Số vàng của bạn
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <Coins className="h-6 w-6 text-yellow-400 animate-bounce" />
              <span className="text-3xl font-black text-yellow-300 tabular-nums font-sans">
                {user?.coins ?? 0}
              </span>
            </div>
            <span className="text-[10px] text-amber-200 mt-1.5 font-bold font-sans">
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
          const isPurchased = purchasedItems.has(item.id);
          const isEquipped =
            user?.avatarEmoji === "🎓" && item.id === "premium_owl";

          return (
            <div key={item.id} className="bezel">
              <div
                className={`bezel-inner bg-gradient-to-br ${item.bgGradient} bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between h-full gap-5`}
              >
                <div className="space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center border border-black/5 dark:border-white/5 shadow-sm">
                    {item.icon}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-black text-slate-800 dark:text-slate-200 font-sans">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-neutral-800/80 pt-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Coins className="h-4.5 w-4.5 text-yellow-500" />
                    <span className="text-sm font-black text-slate-800 dark:text-slate-200 font-sans">
                      {item.cost}
                    </span>
                  </div>

                  {item.category === "cosmetic" && isPurchased ? (
                    <Button
                      variant={isEquipped ? "success" : "bezel"}
                      size="sm"
                      className={`font-bold rounded-xl px-4 py-2 text-xs min-w-[95px] flex items-center justify-center font-sans ${isEquipped ? "text-white dark:text-white" : ""}`}
                      disabled={isEquipping === item.id}
                      onClick={() => handleEquip(item.id, !isEquipped)}
                    >
                      {isEquipping === item.id ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></div>
                      ) : isEquipped ? (
                        "Đang dùng"
                      ) : (
                        "Trang bị"
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant={
                        isSuccess ? "success" : canAfford ? "primary" : "bezel"
                      }
                      size="sm"
                      className={`font-bold rounded-xl px-4 py-2 text-xs min-w-[95px] flex items-center justify-center font-sans ${
                        (isSuccess || canAfford) ? "text-white dark:text-white" : ""
                      }`}
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
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
