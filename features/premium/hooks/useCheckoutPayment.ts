"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { PlanKey } from "../types";
import { PLANS } from "../constants";

export interface ReceiptData {
  orderId?: string;
  planName: string;
  planKey: PlanKey;
  amount: number;
  amountFormatted: string;
  transferSyntax: string;
  activatedAt: string;
  expiresAt: string;
  giftsAwarded: string[];
}

export function useCheckoutPayment() {
  const searchParams = useSearchParams();
  const { user, activateSubscription } = useAuthStore();
  const { addToast } = useNotificationStore();

  const initialPlanParam = searchParams.get("plan") as PlanKey;
  const [selectedKey, setSelectedKey] = useState<PlanKey>(
    initialPlanParam && PLANS[initialPlanParam] ? initialPlanParam : "yearly"
  );

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  // 15:00 countdown timer
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const plan = PLANS[selectedKey];

  const transferContent = useMemo(() => {
    if (!user?.id) return "XP PRO PROVIP";
    const userIdShort = user.id.startsWith("usr_")
      ? user.id.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase()
      : user.id.slice(0, 8).toUpperCase();
    return `XP PRO ${userIdShort}`;
  }, [user]);

  const vietQrUrl = useMemo(() => {
    const bank = "MB";
    const acc = "0386766688";
    const name = encodeURIComponent("XP ENGLISH VIP");
    const desc = encodeURIComponent(transferContent);
    return `https://img.vietqr.io/image/${bank}-${acc}-compact2.png?amount=${plan.totalPriceNum}&addInfo=${desc}&accountName=${name}`;
  }, [plan.totalPriceNum, transferContent]);

  // Pre-register order with backend if authenticated
  useEffect(() => {
    if (user?.id && user.id !== "local_user") {
      fetch("/api/subscription/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey: selectedKey }),
      }).catch((err) => console.log("[Pre-order notice]:", err));
    }
  }, [selectedKey, user?.id]);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    addToast({
      type: "success",
      title: "Đã sao chép!",
      message: `Đã sao chép ${fieldName} vào bộ nhớ tạm.`,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirmTransfer = useCallback(async () => {
    setIsVerifying(true);

    try {
      // 1. Poll server order verification status (activated only via bank webhook or Admin approval)
      const statusRes = await fetch("/api/subscription/checkout", { cache: "no-store" });
      if (statusRes.ok) {
        const statusJson = await statusRes.json();
        if (statusJson.success && statusJson.isPremium && statusJson.order?.status === "completed") {
          await activateSubscription(selectedKey, {
            isPremium: true,
            premiumTier: statusJson.profile?.premiumTier || selectedKey,
            premiumExpiresAt: statusJson.profile?.premiumExpiresAt,
            streakFreezes: statusJson.profile?.streakFreezes,
          });

          setReceiptData({
            orderId: statusJson.order.id,
            planName: plan.name,
            planKey: selectedKey,
            amount: plan.totalPriceNum,
            amountFormatted: plan.totalPriceFormatted,
            transferSyntax: statusJson.order.transferSyntax || transferContent,
            activatedAt: new Date().toLocaleDateString("vi-VN"),
            expiresAt: statusJson.profile?.premiumExpiresAt
              ? new Date(statusJson.profile.premiumExpiresAt).toLocaleDateString("vi-VN")
              : "Vĩnh viễn",
            giftsAwarded: ["Khiên Kim Cương Streak", "Đặc quyền VIP 2X XP"],
          });

          setIsVerifying(false);
          setIsSuccess(true);
          addToast({
            type: "success",
            title: "Kích hoạt Premium thành công!",
            message: `Chào mừng bạn đến với hội viên VIP ${plan.name}.`,
          });
          return;
        }
      }

      // 2. Notify server to record/keep pending order awaiting real payment reconciliation
      const res = await fetch("/api/subscription/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey: selectedKey }),
      });

      const json = await res.json();

      if (res.ok && json.success && json.data?.isPremium) {
        await activateSubscription(selectedKey, json.data);

        setReceiptData({
          orderId: json.data.orderId || `ORD-${Date.now().toString().slice(-6)}`,
          planName: plan.name,
          planKey: selectedKey,
          amount: plan.totalPriceNum,
          amountFormatted: plan.totalPriceFormatted,
          transferSyntax: transferContent,
          activatedAt: new Date().toLocaleDateString("vi-VN"),
          expiresAt: json.data.premiumExpiresAt
            ? new Date(json.data.premiumExpiresAt).toLocaleDateString("vi-VN")
            : "Vĩnh viễn",
          giftsAwarded: json.data.giftsAwarded || [],
        });

        setIsVerifying(false);
        setIsSuccess(true);
        addToast({
          type: "success",
          title: "Kích hoạt Premium thành công!",
          message: `Chào mừng bạn đến với hội viên VIP ${plan.name}.`,
        });
        return;
      }

      setIsVerifying(false);
      addToast({
        type: "info",
        title: "Đang chờ xác nhận thanh toán",
        message:
          json?.error ||
          "Hệ thống đã ghi nhận yêu cầu. Gói VIP sẽ được kích hoạt ngay khi giao dịch được đối soát thành công.",
      });
    } catch (err) {
      console.error("[Subscription verification error]:", err);
      setIsVerifying(false);
      addToast({
        type: "warning",
        title: "Chưa thể kiểm tra giao dịch",
        message: "Vui lòng đăng nhập và thử lại sau khi hoàn tất chuyển khoản.",
      });
    }
  }, [selectedKey, plan, transferContent, activateSubscription, addToast]);

  return {
    selectedKey,
    setSelectedKey,
    plan,
    timeLeft,
    formatTimer,
    transferContent,
    vietQrUrl,
    copiedField,
    handleCopy,
    isVerifying,
    isSuccess,
    receiptData,
    handleConfirmTransfer,
  };
}
